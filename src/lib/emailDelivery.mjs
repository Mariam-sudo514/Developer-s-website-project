import nodemailer from 'nodemailer';

const EMAIL_TIMEOUT_MS = 10_000;

// Only imported by the server-side contact route.
export function getEmailDeliveryConfig(env = process.env) {
	const transport = env.EMAIL_TRANSPORT ?? 'resend';
	const to = env.CONTACT_TO_EMAIL;
	if (!to) return null;

	if (transport === 'mailpit') {
		const host = env.MAILPIT_SMTP_HOST || '127.0.0.1';
		const port = Number(env.MAILPIT_SMTP_PORT || '1025');
		if (
			env.NODE_ENV !== 'development' ||
			host !== '127.0.0.1' ||
			port !== 1025
		) return null;

		return {
			transport,
			to,
			from: env.MAILPIT_FROM_EMAIL || 'no-reply@localhost',
			host,
			port,
		};
	}

	if (transport !== 'resend' || !env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) {
		return null;
	}

	return { transport, to, from: env.CONTACT_FROM_EMAIL, apiKey: env.RESEND_API_KEY };
}

export async function sendContactEmail(
	config,
	message,
	{ createTransport = nodemailer.createTransport, fetchEmail = globalThis.fetch } = {},
) {
	if (config.transport === 'mailpit') {
		const smtp = createTransport({
			host: config.host,
			port: config.port,
			secure: false,
			connectionTimeout: EMAIL_TIMEOUT_MS,
			greetingTimeout: EMAIL_TIMEOUT_MS,
			socketTimeout: EMAIL_TIMEOUT_MS,
			disableFileAccess: true,
			disableUrlAccess: true,
		});

		try {
			await smtp.sendMail({
				from: config.from,
				to: [config.to],
				replyTo: message.replyTo,
				subject: message.subject,
				text: message.text,
			});
		} finally {
			smtp.close();
		}
		return;
	}

	if (config.transport !== 'resend') throw new Error('Unsupported email transport.');

	const result = await fetchEmail('https://api.resend.com/emails', {
		signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
		method: 'POST',
		headers: {
			Authorization: `Bearer ${config.apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: config.from,
			to: [config.to],
			reply_to: message.replyTo,
			subject: message.subject,
			text: message.text,
		}),
	});
	if (!result.ok) throw new Error('Resend rejected the email request.');
}
