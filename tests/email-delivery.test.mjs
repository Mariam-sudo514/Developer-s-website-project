import assert from 'node:assert/strict';
import test from 'node:test';
import { getEmailDeliveryConfig, sendContactEmail } from '../src/lib/emailDelivery.mjs';

const recipient = 'recipient@example.invalid';
const message = {
	replyTo: 'visitor@example.invalid',
	subject: 'New portfolio inquiry from Test Visitor',
	text: 'Test inquiry with Unicode: Привет 🙂',
};
const localEnv = { NODE_ENV: 'development', EMAIL_TRANSPORT: 'mailpit', CONTACT_TO_EMAIL: recipient };
const resendEnv = {
	NODE_ENV: 'production',
	EMAIL_TRANSPORT: 'resend',
	CONTACT_TO_EMAIL: recipient,
	CONTACT_FROM_EMAIL: 'sender@example.invalid',
	RESEND_API_KEY: 'test-key-not-a-real-credential',
};
const forbidFetch = async () => assert.fail('Mailpit must never call Resend.');
const forbidSmtp = () => assert.fail('Resend must never create an SMTP connection.');

test('unset transport preserves Resend and its required server configuration', () => {
	const { EMAIL_TRANSPORT: omitted, ...env } = resendEnv;
	assert.equal(omitted, 'resend');
	assert.deepEqual(getEmailDeliveryConfig(env), {
		transport: 'resend', to: recipient, from: env.CONTACT_FROM_EMAIL, apiKey: env.RESEND_API_KEY,
	});
	for (const name of ['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL']) {
		assert.equal(getEmailDeliveryConfig({ ...env, [name]: '' }), null);
	}
});

test('Mailpit requires development mode and only accepts loopback SMTP', () => {
	for (const NODE_ENV of ['production', 'test', undefined]) {
		assert.equal(getEmailDeliveryConfig({ ...localEnv, NODE_ENV }), null);
	}
	assert.equal(getEmailDeliveryConfig({ ...localEnv, MAILPIT_SMTP_HOST: 'smtp.example.invalid' }), null);
	assert.equal(getEmailDeliveryConfig({ ...localEnv, CONTACT_TO_EMAIL: '' }), null);
	for (const MAILPIT_SMTP_PORT of ['0', '25', '2525', '65536', '1025.5', 'not-a-port']) {
		assert.equal(getEmailDeliveryConfig({ ...localEnv, MAILPIT_SMTP_PORT }), null);
	}
});

test('unknown or empty transport fails closed, even with valid Resend settings', () => {
	for (const EMAIL_TRANSPORT of ['mailpt', '', 'smtp']) {
		assert.equal(getEmailDeliveryConfig({ ...resendEnv, EMAIL_TRANSPORT }), null);
	}
});

test('Mailpit delivers locally without Resend credentials and preserves the visitor Reply-To', async () => {
	const config = getEmailDeliveryConfig(localEnv);
	let options;
	let captured;
	let closed = 0;
	await sendContactEmail(config, message, {
		fetchEmail: forbidFetch,
		createTransport(value) {
			options = value;
			return {
				async sendMail(value) { captured = value; },
				close() { closed++; },
			};
		},
	});
	assert.equal(options.host, '127.0.0.1');
	assert.equal(options.port, 1025);
	assert.equal(options.secure, false);
	assert.equal(options.connectionTimeout, 10_000);
	assert.equal(options.greetingTimeout, 10_000);
	assert.equal(options.socketTimeout, 10_000);
	assert.equal(options.disableFileAccess, true);
	assert.equal(options.disableUrlAccess, true);
	assert.deepEqual(captured, { from: 'no-reply@localhost', to: [recipient], ...message });
	assert.equal(closed, 1);
});

test('SMTP failure closes the transport without falling back to Resend', async () => {
	let closed = 0;
	const config = getEmailDeliveryConfig({ ...resendEnv, ...localEnv });
	await assert.rejects(sendContactEmail(config, message, {
		fetchEmail: forbidFetch,
		createTransport: () => ({
			async sendMail() { throw new Error('Local SMTP unavailable.'); },
			close() { closed++; },
		}),
	}), /Local SMTP unavailable/);
	assert.equal(closed, 1);
});

test('Resend keeps the existing API payload and Reply-To without creating SMTP', async () => {
	let request;
	await sendContactEmail(getEmailDeliveryConfig(resendEnv), message, {
		createTransport: forbidSmtp,
		async fetchEmail(url, options) {
			request = { url, options };
			return { ok: true };
		},
	});
	assert.equal(request.url, 'https://api.resend.com/emails');
	assert.equal(request.options.method, 'POST');
	assert.equal(request.options.headers.Authorization, `Bearer ${resendEnv.RESEND_API_KEY}`);
	assert.equal(request.options.headers['Content-Type'], 'application/json');
	assert.equal(request.options.signal.aborted, false);
	assert.deepEqual(JSON.parse(request.options.body), {
		from: resendEnv.CONTACT_FROM_EMAIL, to: [recipient], reply_to: message.replyTo,
		subject: message.subject, text: message.text,
	});
});

test('Resend rejection and network failure do not fall back to SMTP', async () => {
	const config = getEmailDeliveryConfig(resendEnv);
	await assert.rejects(sendContactEmail(config, message, {
		createTransport: forbidSmtp,
		fetchEmail: async () => ({ ok: false }),
	}), /Resend rejected/);
	await assert.rejects(sendContactEmail(config, message, {
		createTransport: forbidSmtp,
		fetchEmail: async () => { throw new Error('Mock network failure.'); },
	}), /Mock network failure/);
});
