import { NextResponse } from 'next/server';
import {
	CAPTCHA_COOKIE_NAME,
	CAPTCHA_TTL,
	createCaptchaChallenge,
} from '@/lib/captcha';

export async function GET() {
	const challenge = createCaptchaChallenge();

	if (!challenge) {
		console.error('[captcha] CAPTCHA_SECRET is not configured.');
		return NextResponse.json(
			{ success: false, message: 'Something went wrong. Please try again.' },
			{ status: 503 },
		);
	}

	const response = new NextResponse(challenge.svg, {
		status: 200,
		headers: {
			'Cache-Control': 'no-store',
			'Content-Type': 'image/svg+xml; charset=utf-8',
		},
	});

	response.cookies.set({
		name: CAPTCHA_COOKIE_NAME,
		value: challenge.cookieValue,
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/api',
		maxAge: CAPTCHA_TTL,
	});

	return response;
}
