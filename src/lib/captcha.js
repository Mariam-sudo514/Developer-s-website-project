import { createHmac, randomInt, timingSafeEqual } from 'node:crypto';

const CAPTCHA_TTL_SECONDS = 10 * 60;
const CAPTCHA_LENGTH = 5;
const CAPTCHA_CHARACTERS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const CAPTCHA_COOKIE = 'captcha_challenge';
const captchaAnswerPattern = /^[A-Z0-9]{5}$/;

const getSecret = () => process.env.CAPTCHA_SECRET;

const signCaptcha = (code, expiresAt, secret) =>
	createHmac('sha256', secret).update(`${code}.${expiresAt}`).digest('base64url');

const escapeXml = (value) =>
	value.replace(/[&<>'"]/g, (character) => {
		const entities = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			"'": '&apos;',
			'"': '&quot;',
		};
		return entities[character];
	});

const createCaptchaSvg = (code) => {
	const width = 180;
	const height = 58;
	const characters = [...code]
		.map((character, index) => {
			const x = 28 + index * 31 + randomInt(-3, 4);
			const y = 39 + randomInt(-4, 5);
			const rotation = randomInt(-12, 13);
			return `<text x="${x}" y="${y}" transform="rotate(${rotation} ${x} ${y})">${escapeXml(character)}</text>`;
		})
		.join('');

	const lines = Array.from({ length: 3 }, () => {
		const x1 = randomInt(8, 26);
		const y1 = randomInt(10, 50);
		const x2 = randomInt(150, 174);
		const y2 = randomInt(10, 50);
		return `<path d="M${x1} ${y1} C${randomInt(48, 78)} ${randomInt(4, 54)}, ${randomInt(102, 132)} ${randomInt(4, 54)}, ${x2} ${y2}" />`;
	}).join('');

	const noise = Array.from({ length: 12 }, () => {
		const cx = randomInt(8, width - 7);
		const cy = randomInt(7, height - 6);
		return `<circle cx="${cx}" cy="${cy}" r="${randomInt(1, 3) / 2}" />`;
	}).join('');

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="captcha-title">
	<title id="captcha-title">Security verification code</title>
	<rect width="${width}" height="${height}" rx="12" fill="#eef1f7" />
	<g fill="none" stroke="#7777f0" stroke-width="1.1" opacity=".72">${lines}</g>
	<g fill="#07152d" font-family="Arial, sans-serif" font-size="26" font-weight="800" letter-spacing="1">${characters}</g>
	<g fill="#4b4b98" opacity=".62">${noise}</g>
</svg>`;
};

export const CAPTCHA_COOKIE_NAME = CAPTCHA_COOKIE;
export const CAPTCHA_TTL = CAPTCHA_TTL_SECONDS;

export const createCaptchaChallenge = () => {
	const secret = getSecret();
	if (!secret) {
		return null;
	}

	let code = '';
	for (let index = 0; index < CAPTCHA_LENGTH; index += 1) {
		code += CAPTCHA_CHARACTERS[randomInt(0, CAPTCHA_CHARACTERS.length)];
	}

	const expiresAt = Math.floor(Date.now() / 1000) + CAPTCHA_TTL_SECONDS;
	const signature = signCaptcha(code, expiresAt, secret);

	return {
		cookieValue: `${expiresAt}.${signature}`,
		expiresAt,
		svg: createCaptchaSvg(code),
	};
};

export const verifyCaptcha = ({ answer, cookieValue }) => {
	const secret = getSecret();
	if (!secret) {
		return { valid: false, reason: 'configuration' };
	}

	if (typeof answer !== 'string' || typeof cookieValue !== 'string' || !answer.trim() || !cookieValue) {
		return { valid: false, reason: 'missing' };
	}

	const normalizedAnswer = answer.trim().toUpperCase();
	if (!captchaAnswerPattern.test(normalizedAnswer)) {
		return { valid: false, reason: 'incorrect' };
	}

	const cookieParts = cookieValue.split('.');
	if (cookieParts.length !== 2 || !/^\d+$/.test(cookieParts[0]) || !cookieParts[1]) {
		return { valid: false, reason: 'invalid' };
	}

	const expiresAt = Number(cookieParts[0]);
	if (!Number.isSafeInteger(expiresAt)) {
		return { valid: false, reason: 'invalid' };
	}

	if (expiresAt <= Math.floor(Date.now() / 1000)) {
		return { valid: false, reason: 'expired' };
	}

	const expectedSignature = signCaptcha(normalizedAnswer, expiresAt, secret);
	const receivedSignatureBuffer = Buffer.from(cookieParts[1], 'utf8');
	const expectedSignatureBuffer = Buffer.from(expectedSignature, 'utf8');

	if (
		receivedSignatureBuffer.length !== expectedSignatureBuffer.length ||
		!timingSafeEqual(receivedSignatureBuffer, expectedSignatureBuffer)
	) {
		return { valid: false, reason: 'incorrect' };
	}

	return { valid: true, reason: 'valid' };
};
