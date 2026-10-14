import infoStyles from '@/components/InfoPages/InfoPages.module.css';
import styles from './PrivacyPage.module.css';

export const metadata = {
	title: 'Privacy Policy | Maria.dev',
	description: 'Privacy information for Maria.dev, including how contact form data is handled.',
};

const ExternalLink = ({ href, children }) => (
	<a href={href} rel="noopener noreferrer" target="_blank">
		{children}
	</a>
);

const PrivacyPage = () => (
	<div className={`${infoStyles.page} ${styles.privacyPage}`}>
		<section className={`${infoStyles.hero} ${styles.privacyHero}`}>
			<p className={infoStyles.label}>PRIVACY</p>
			<h1>Privacy Policy</h1>
			<p className={infoStyles.lead}>
				This Privacy Policy explains what information is collected when you contact me
				through this website, why it is processed, and how it is handled.
			</p>
			<p className={styles.lastUpdated}>Last updated: September 3, 2026</p>
		</section>

		<article className={styles.policy}>
			<section className={styles.policySection}>
				<div className={styles.sectionHeading}>
					<span>01</span>
					<h2>Information I collect</h2>
				</div>
				<p>
					When you use the contact form, you may provide your name, email address, company
					(if provided), project type, budget range, and project details. The form also
					requires a consent choice before a message can be submitted.
				</p>
				<p>
					The form includes a hidden honeypot field to help identify automated submissions.
					It is not intended to collect information from ordinary visitors.
				</p>
			</section>

			<section className={styles.policySection}>
				<div className={styles.sectionHeading}>
					<span>02</span>
					<h2>Why I use this information</h2>
				</div>
				<p>
					Information from an inquiry is used to review your request, respond to you,
					discuss the project you described, and prepare relevant next steps.
				</p>
			</section>

			<section className={styles.policySection}>
				<div className={styles.sectionHeading}>
					<span>03</span>
					<h2>Email delivery</h2>
				</div>
				<p>
					After successful validation and anti-spam verification, the inquiry is sent
					through Resend, the email delivery provider configured for this website. The
					message includes the form details and uses the sender&apos;s email as Reply-To.
				</p>
				<p>
					You can read the{' '}
					<ExternalLink href="https://resend.com/legal/privacy-policy">
						Resend Privacy Policy
					</ExternalLink>{' '}
					for information about Resend&apos;s own data practices.
				</p>
			</section>

			<section className={styles.policySection}>
				<div className={styles.sectionHeading}>
					<span>04</span>
					<h2>How information is stored</h2>
				</div>
				<p>
					This website does not currently maintain its own database of contact form
					submissions. Accepted messages are delivered by email through Resend.
				</p>
			</section>

			<section className={styles.policySection}>
				<div className={styles.sectionHeading}>
					<span>05</span>
					<h2>How long information is kept</h2>
				</div>
				<p>
					Information from inquiries is kept only for as long as reasonably necessary to
					respond to the request, manage the related communication, and meet applicable
					legal or administrative requirements. No specific retention period is defined
					in the current application code.
				</p>
			</section>

			<section className={styles.policySection}>
				<div className={styles.sectionHeading}>
					<span>06</span>
					<h2>Sharing with service providers</h2>
				</div>
				<p>
					Inquiry information is not sold. It is shared with Resend for email delivery,
					as needed to operate the contact form. No other processors are configured in
					the current application code.
				</p>
			</section>

			<section className={styles.policySection}>
				<div className={styles.sectionHeading}>
					<span>07</span>
					<h2>Cookies and tracking</h2>
				</div>
				<p>
					The site uses a cookie named <code>theme</code> and a <code>theme</code> value in
					localStorage to remember the selected Light or Dark theme. These are used for
					presentation preferences, not analytics or advertising.
				</p>
				<p>
					No analytics scripts, advertising scripts, or marketing tracking cookies are
					configured in the current project.
				</p>
			</section>

			<section className={styles.policySection}>
				<div className={styles.sectionHeading}>
					<span>08</span>
					<h2>Your choices and rights</h2>
				</div>
				<p>
					For questions about information you submitted, or to ask about access,
					correction, or deletion, contact me using the address below. Requests may need
					to be verified and are handled subject to applicable requirements.
				</p>
			</section>

			<section className={styles.policySection}>
				<div className={styles.sectionHeading}>
					<span>09</span>
					<h2>Contact</h2>
				</div>
				<p>
					For privacy-related questions, contact:{' '}
					<a href="mailto:maria.dev.contact@gmail.com">maria.dev.contact@gmail.com</a>
				</p>
			</section>

			<section className={styles.policySection}>
				<div className={styles.sectionHeading}>
					<span>10</span>
					<h2>Changes to this policy</h2>
				</div>
				<p>
					If the way this website handles information changes, this page will be updated
					and its “Last updated” date will be changed accordingly.
				</p>
			</section>
		</article>
	</div>
);

export default PrivacyPage;
