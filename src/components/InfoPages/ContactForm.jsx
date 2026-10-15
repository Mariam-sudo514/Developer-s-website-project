'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FiRefreshCw } from 'react-icons/fi';
import buttonStyles from '@/components/Shared/ButtonLink/ButtonLink.module.css';
import styles from './InfoPages.module.css';

const initialValues = {
	name: '',
	email: '',
	company: '',
	projectType: '',
	budget: '',
	details: '',
	privacyConsent: false,
	website: '',
};

const projectTypes = [
	'Website',
	'Web application',
	'Full-stack development',
	'Frontend implementation',
	'Existing project improvements',
	'Other',
];

const budgetRanges = [
	'Up to $1,000',
	'$1,000 - $3,000',
	'$3,000 - $7,000',
	"Let's discuss",
	'Not sure yet',
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CAPTCHA_ERROR_MESSAGE = 'Incorrect security code. Please try again.';
const CAPTCHA_EXPIRED_MESSAGE = 'Security code expired. Please try again.';

const requestCaptchaImage = async () => {
	const response = await fetch(`/api/captcha?t=${Date.now()}`, { cache: 'no-store' });
	const contentType = response.headers.get('content-type') || '';

	if (!response.ok || !contentType.includes('image/svg+xml')) {
		throw new Error('Captcha request failed');
	}

	const imageBlob = await response.blob();
	return URL.createObjectURL(imageBlob);
};

function validate(values, captchaImageUrl, captchaAnswer) {
	const name = values.name.trim();
	const email = values.email.trim();
	const company = values.company.trim();
	const details = values.details.trim();

	if (!name || name.length > 100) {
		return 'Please enter your name.';
	}

	if (!email || email.length > 254 || !emailPattern.test(email)) {
		return 'Please enter a valid email address.';
	}

	if (company.length > 160) {
		return 'Please keep the company name under 160 characters.';
	}

	if (!projectTypes.includes(values.projectType)) {
		return 'Please select a project type.';
	}

	if (!budgetRanges.includes(values.budget)) {
		return 'Please select a budget range.';
	}

	if (details.length < 20 || details.length > 5000) {
		return 'Please share at least a little more about the project.';
	}

	if (!values.privacyConsent) {
		return 'Please accept the Privacy Policy before sending.';
	}

	if (!captchaImageUrl) {
		return 'Security check is still loading. Please try again.';
	}

	if (!/^[a-zA-Z0-9]{5}$/.test(captchaAnswer.trim())) {
		return 'Please enter the 5-character security code.';
	}

	return '';
}

const ContactForm = () => {
	const [values, setValues] = useState(initialValues);
	const [status, setStatus] = useState({ type: '', message: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [captchaImageUrl, setCaptchaImageUrl] = useState('');
	const [captchaAnswer, setCaptchaAnswer] = useState('');
	const [captchaLoading, setCaptchaLoading] = useState(true);
	const [captchaError, setCaptchaError] = useState('');
	const captchaImageUrlRef = useRef('');

	const loadCaptcha = useCallback(async () => {
		setCaptchaLoading(true);
		setCaptchaError('');
		setCaptchaAnswer('');
		setCaptchaImageUrl('');

		if (captchaImageUrlRef.current) {
			URL.revokeObjectURL(captchaImageUrlRef.current);
			captchaImageUrlRef.current = '';
		}

		try {
			const nextImageUrl = await requestCaptchaImage();
			captchaImageUrlRef.current = nextImageUrl;
			setCaptchaImageUrl(nextImageUrl);
		} catch {
			setCaptchaError('Security check is temporarily unavailable. Please try again.');
		} finally {
			setCaptchaLoading(false);
		}
	}, []);

	useEffect(() => {
		loadCaptcha();

		return () => {
			if (captchaImageUrlRef.current) {
				URL.revokeObjectURL(captchaImageUrlRef.current);
			}
		};
	}, [loadCaptcha]);

	const handleChange = (event) => {
		const { checked, name, type, value } = event.target;
		setValues((currentValues) => ({
			...currentValues,
			[name]: type === 'checkbox' ? checked : value,
		}));
		if (status.message) {
			setStatus({ type: '', message: '' });
		}
	};

	const handleCaptchaAnswerChange = (event) => {
		setCaptchaAnswer(event.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 5));
		if (status.message) {
			setStatus({ type: '', message: '' });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (isSubmitting) {
			return;
		}

		const validationMessage = validate(values, captchaImageUrl, captchaAnswer);
		if (validationMessage) {
			setStatus({ type: 'error', message: validationMessage });
			return;
		}

		setIsSubmitting(true);
		setStatus({ type: 'loading', message: 'Sending...' });

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...values,
					name: values.name.trim(),
					email: values.email.trim(),
					company: values.company.trim(),
					details: values.details.trim(),
					captchaAnswer: captchaAnswer.trim(),
				}),
			});
			const data = await response.json().catch(() => null);

			if (!response.ok || data?.success !== true) {
				throw new Error(
					response.status === 400 &&
						[CAPTCHA_ERROR_MESSAGE, CAPTCHA_EXPIRED_MESSAGE].includes(data?.message)
						? data.message
						: 'Contact submission failed',
				);
			}

			setValues(initialValues);
			setStatus({
				type: 'success',
				message: 'Thank you. Your inquiry has been sent.',
			});
			await loadCaptcha();
		} catch (error) {
			setStatus({
				type: 'error',
				message:
					error instanceof Error &&
						[CAPTCHA_ERROR_MESSAGE, CAPTCHA_EXPIRED_MESSAGE].includes(error.message)
						? error.message
						: 'Something went wrong. Please try again.',
			});
			await loadCaptcha();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form className={styles.formCard} noValidate onSubmit={handleSubmit}>
			<div className={styles.formHeader}>
				<p className={styles.label}>PROJECT INQUIRY</p>
				<h2>Share the first details</h2>
				<p>
					A short overview is enough for now. Share your goals, timeline,
					and any context that will help shape the next steps.
				</p>
			</div>
			<label htmlFor="contact-name">
				<span>Your name</span>
				<input
					autoComplete="name"
					id="contact-name"
					name="name"
					onChange={handleChange}
					placeholder="Enter your full name"
					required
					type="text"
					value={values.name}
				/>
			</label>
			<label htmlFor="contact-email">
				<span>Email</span>
				<input
					autoComplete="email"
					id="contact-email"
					name="email"
					onChange={handleChange}
					placeholder="Enter your email address"
					required
					type="email"
					value={values.email}
				/>
			</label>
			<label htmlFor="contact-company">
				<span>Company (optional)</span>
				<input
					autoComplete="organization"
					id="contact-company"
					name="company"
					onChange={handleChange}
					placeholder="Your company or brand"
					type="text"
					value={values.company}
				/>
			</label>
			<label htmlFor="contact-project-type">
				<span>Project type</span>
				<span className={styles.selectField}>
					<select
						id="contact-project-type"
						name="projectType"
						onChange={handleChange}
						required
						value={values.projectType}
					>
						<option value="" disabled>
							Select project type
						</option>
						{projectTypes.map((projectType) => (
							<option key={projectType} value={projectType}>
								{projectType}
							</option>
						))}
					</select>
				</span>
			</label>
			<label htmlFor="contact-budget">
				<span>Budget range</span>
				<span className={styles.selectField}>
					<select
						id="contact-budget"
						name="budget"
						onChange={handleChange}
						required
						value={values.budget}
					>
						<option value="" disabled>
							Select budget range
						</option>
						{budgetRanges.map((budgetRange) => (
							<option key={budgetRange} value={budgetRange}>
								{budgetRange}
							</option>
						))}
					</select>
				</span>
			</label>
			<label htmlFor="contact-details">
				<span>Project details</span>
				<textarea
					id="contact-details"
					name="details"
					onChange={handleChange}
					placeholder="Tell me about your project, goals, required functionality, timeline, and any existing design or technical requirements..."
					required
					value={values.details}
				/>
			</label>
			<div className={styles.consentField}>
				<input
					checked={values.privacyConsent}
					id="privacy-consent"
					name="privacyConsent"
					onChange={handleChange}
					required
					type="checkbox"
				/>
				<label htmlFor="privacy-consent">
					I agree to the processing of my personal data in accordance with the{' '}
					<a href="/privacy">Privacy Policy</a>.
				</label>
			</div>
			<div className={styles.captchaField}>
				<div className={styles.captchaHeader}>
					<span className={styles.captchaLabel}>Security check</span>
				</div>
				<div className={styles.captchaVisual}>
					{captchaLoading ? (
						<span aria-live="polite" className={styles.captchaPlaceholder}>
							Loading security check...
						</span>
					) : captchaImageUrl ? (
						<img
							alt="Security verification code"
							className={styles.captchaImage}
							src={captchaImageUrl}
						/>
					) : (
						<span aria-live="polite" className={styles.captchaPlaceholder}>
							{captchaError}
						</span>
					)}
					<button
						aria-label="Generate a new security code"
						className={styles.captchaRefresh}
						disabled={captchaLoading || isSubmitting}
						onClick={loadCaptcha}
						type="button"
					>
						<FiRefreshCw aria-hidden="true" />
					</button>
				</div>
				<label htmlFor="captcha-answer">
					<span>Enter the code</span>
					<input
						autoComplete="off"
						id="captcha-answer"
						maxLength={5}
						name="captchaAnswer"
						onChange={handleCaptchaAnswerChange}
						placeholder="Enter the code"
						spellCheck={false}
						type="text"
						value={captchaAnswer}
					/>
				</label>
			</div>
			{status.message && (
				<p
					aria-live="polite"
					className={`${styles.formStatus} ${
						status.type === 'success' ? styles.formStatusSuccess : styles.formStatusError
					}`}
				>
					{status.message}
				</p>
			)}
			<button
				className={`${buttonStyles.button} ${buttonStyles.primary}`}
				disabled={isSubmitting || captchaLoading || !captchaImageUrl}
				type="submit"
			>
				{isSubmitting ? 'Sending...' : 'Send inquiry'} <FaArrowRightLong aria-hidden="true" />
			</button>
			<div aria-hidden="true" className={styles.honeypot}>
				<label htmlFor="contact-website">Website</label>
				<input
					autoComplete="off"
					id="contact-website"
					name="website"
					onChange={handleChange}
					tabIndex={-1}
					type="text"
					value={values.website}
				/>
			</div>
		</form>
	);
};

export default ContactForm;
