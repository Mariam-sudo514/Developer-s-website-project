import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { CAPTCHA_COOKIE_NAME, verifyCaptcha } from '@/lib/captcha';
import { readJsonBody, RequestBodyError } from '@/lib/readJsonBody.mjs';
import { getEmailDeliveryConfig, sendContactEmail } from '@/lib/emailDelivery.mjs';

export const runtime = 'nodejs';

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 160;
const MIN_DETAILS_LENGTH = 20;
const MAX_DETAILS_LENGTH = 5000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const projectTypes = new Set([
	'Website',
	'Web application',
	'Full-stack development',
	'Frontend implementation',
	'Existing project improvements',
	'Other',
]);

const budgetRanges = new Set([
	'Up to $1,000',
	'$1,000 - $3,000',
	'$3,000 - $7,000',
	"Let's discuss",
	'Not sure yet',
]);

const trimString = (value) => (typeof value === 'string' ? value.trim() : '');

const response = (body, status) => NextResponse.json(body, { status });

function normalizePayload(body) {
	if (!body || typeof body !== 'object' || Array.isArray(body)) {
		return null;
	}

	const name = trimString(body.name);
	const email = trimString(body.email);
	const company = trimString(body.company);
	const projectType = trimString(body.projectType);
	const budget = trimString(body.budget);
	const details = trimString(body.details);
	const captchaAnswer = typeof body.captchaAnswer === 'string' ? body.captchaAnswer.trim() : '';
	const website = trimString(body.website);

	if (
		!name ||
		name.length > MAX_NAME_LENGTH ||
		!email ||
		email.length > MAX_EMAIL_LENGTH ||
		!emailPattern.test(email) ||
		company.length > MAX_COMPANY_LENGTH ||
		!projectTypes.has(projectType) ||
		!budgetRanges.has(budget) ||
		details.length < MIN_DETAILS_LENGTH ||
		details.length > MAX_DETAILS_LENGTH ||
		body.privacyConsent !== true ||
		!captchaAnswer
	) {
		return null;
	}

	return { name, email, company, projectType, budget, details, captchaAnswer, website };
}

export async function POST(request) {
	let body;

	try {
		body = await readJsonBody(request);
	} catch (error) {
		return response(
			{
				success: false,
				message: error instanceof RequestBodyError
				    ? error.message
				    : 'Please check the form details.',
			},
			error instanceof RequestBodyError ? error.status : 400,
		);
	}

	const payload = normalizePayload(body);
	if (!payload) {
		return response(
			{ success: false, message: 'Please check the form details.' },
			400,
		);
	}

	const captchaSecret = process.env.CAPTCHA_SECRET;
	if (!captchaSecret) {
		console.error('[contact] CAPTCHA_SECRET is not configured.');
		return response(
			{ success: false, message: 'Something went wrong. Please try again.' },
			503,
		);
	}

	const cookieStore = await cookies();
	const captchaCookieValue = cookieStore.get(CAPTCHA_COOKIE_NAME)?.value || '';
	const captchaResult = verifyCaptcha({
		answer: payload.captchaAnswer,
		cookieValue: captchaCookieValue,
	});

	if (!captchaResult.valid) {
		return response(
			{
				success: false,
				message:
					captchaResult.reason === 'expired'
						? 'Security code expired. Please try again.'
						: 'Incorrect security code. Please try again.',
			},
			400,
		);
	}

	if (payload.website) {
		return response(
			{ success: false, message: 'Please check the form details.' },
			400,
		);
	}

	const deliveryConfig = getEmailDeliveryConfig();

	if (!deliveryConfig) {
		console.error('[contact] Server delivery configuration is missing.');
		return response(
			{ success: false, message: 'Something went wrong. Please try again.' },
			503,
		);
	}

	const emailText = [
		`Name: ${payload.name}`,
		`Email: ${payload.email}`,
		`Company: ${payload.company || 'Not provided'}`,
		`Project type: ${payload.projectType}`,
		`Budget: ${payload.budget}`,
		'',
		'Project details:',
		payload.details,
	].join('\n');

	try {
		await sendContactEmail(deliveryConfig, {
			replyTo: payload.email,
			subject: `New portfolio inquiry from ${payload.name}`,
			text: emailText,
		});
	} catch {
		console.error(`[contact] ${deliveryConfig.transport} request failed.`);
		return response(
			{ success: false, message: 'Something went wrong. Please try again.' },
			502,
		);
	}

	return response({ success: true }, 200);
}
