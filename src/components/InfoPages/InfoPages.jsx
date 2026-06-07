import Link from 'next/link';
import {
	FiClock,
	FiCode,
	FiGlobe,
	FiHelpCircle,
	FiLayers,
	FiMail,
	FiMessageCircle,
	FiMonitor,
	FiSearch,
	FiSend,
	FiStar,
	FiUsers,
} from 'react-icons/fi';
import { FaArrowRightLong } from 'react-icons/fa6';
import FaqAccordion from './FaqAccordion';
import styles from './InfoPages.module.css';

const tools = [
	'Figma',
	'Webflow',
	'Next.js',
	'Tailwind CSS',
	'TypeScript',
	'Framer',
	'Notion',
	'GitHub',
];

const values = [
	{
		icon: FiStar,
		title: 'Design sensitivity',
		text: 'Refined visual systems, thoughtful typography, and brand-aware interfaces that feel intentional and timeless.',
	},
	{
		icon: FiCode,
		title: 'Frontend precision',
		text: 'Clean, responsive builds with a focus on performance, accessibility, and pixel-perfect implementation.',
	},
	{
		icon: FiUsers,
		title: 'Collaborative process',
		text: 'Clear communication, transparency, and a partner mindset to ensure a smooth and successful project from start to finish.',
	},
];

const journey = [
	{
		year: '2020',
		text: 'Began freelancing and building custom landing pages.',
	},
	{
		year: '2021',
		text: 'Expanded into brand websites and UI/UX.',
	},
	{
		year: '2023',
		text: 'Focused on premium product and service websites.',
	},
	{
		year: 'Today',
		text: 'Helping brands create elegant digital experiences.',
	},
];

const contactCards = [
	{
		icon: FiMail,
		title: 'Email',
		text: 'hello@maria.dev',
	},
	{
		icon: FiClock,
		title: 'Response time',
		text: 'Usually within 1-2 business days',
	},
	{
		icon: FiLayers,
		title: 'Services',
		tags: ['Landing pages', 'Brand websites', 'Frontend build', 'UI/UX'],
	},
	{
		icon: FiGlobe,
		title: 'Open to collaborations worldwide',
		text: 'I work with clients across different time zones.',
	},
];

const quickSteps = [
	{
		icon: FiLayers,
		step: 'Step 01',
		title: 'Tell me about your project',
		text: 'Share your ideas, goals, and what success looks like.',
	},
	{
		icon: FiSearch,
		step: 'Step 02',
		title: "I'll review the details",
		text: "I'll review your project and reply with initial thoughts.",
	},
	{
		icon: FiSend,
		step: 'Step 03',
		title: 'We plan the next steps',
		text: "Together we'll define the plan, timeline, and deliverables.",
	},
];

const faqProcess = [
	{
		icon: FiSearch,
		title: 'Discovery',
		text: 'We align on goals, audience, and requirements.',
	},
	{
		icon: FiMonitor,
		title: 'Design & Build',
		text: 'I design and develop with care and precision.',
	},
	{
		icon: FiSend,
		title: 'Launch',
		text: 'We test, refine, and launch your website with confidence.',
	},
];

const PageButton = ({ href, children, variant = 'primary' }) => (
	<Link className={`${styles.button} ${styles[variant]}`} href={href}>
		{children}
		<FaArrowRightLong aria-hidden="true" />
	</Link>
);

const Hero = ({ label, title, text, children }) => (
	<section className={styles.hero}>
		<p className={styles.label}>{label}</p>
		<h1>{title}</h1>
		<p className={styles.lead}>{text}</p>
		{children && <div className={styles.heroActions}>{children}</div>}
	</section>
);

const IconBadge = ({ icon: Icon }) => (
	<span className={styles.iconBadge} aria-hidden="true">
		<Icon />
	</span>
);

const FeatureCard = ({ icon, title, text }) => (
	<article className={styles.featureCard}>
		<IconBadge icon={icon} />
		<h3>{title}</h3>
		<p>{text}</p>
	</article>
);

const CtaPanel = ({ icon, title, text, buttonText, href }) => (
	<section className={styles.ctaPanel}>
		{icon && <IconBadge icon={icon} />}
		<div>
			<h2>{title}</h2>
			<p>{text}</p>
		</div>
		<PageButton href={href}>{buttonText}</PageButton>
	</section>
);

export const AboutPageContent = () => (
	<div className={styles.page}>
		<Hero
			label="ABOUT ME"
			title="Thoughtful design. Clean code. Human-centered experiences."
			text="I'm Maria, a frontend developer and designer focused on creating elegant, responsive websites for brands that value detail, clarity, and intentional experiences."
		>
			<PageButton href="/contacts">Let's work together</PageButton>
			<PageButton href="/#selected-work" variant="secondary">
				View selected work
			</PageButton>
		</Hero>

		<section className={styles.aboutIntro}>
			<div
				className={styles.portrait}
				role="img"
				aria-label="Designer working on a laptop in a calm workspace"
			>
				<span className={styles.screen} />
				<span className={styles.notebook} />
				<span className={styles.cup} />
			</div>

			<div className={styles.copyBlock}>
				<h2>A little about me</h2>
				<p>
					I blend design thinking with frontend craftsmanship to build
					websites that are not just beautiful, but purposeful and effective.
					Every project starts with understanding your brand, your audience,
					and your goals.
				</p>
				<p>
					With a background in both design and development, I bring a holistic
					approach to every build — from structure and content to interaction
					and performance. I believe great websites are defined by clarity,
					usability, and attention to detail.
				</p>
				<p>
					I work closely with founders and teams who care about quality and
					want a partner who communicates clearly, thinks ahead, and delivers
					with care.
				</p>
			</div>
		</section>

		<section className={styles.sectionBlock}>
			<h2>What I bring</h2>
			<div className={styles.threeGrid}>
				{values.map((item) => (
					<FeatureCard key={item.title} {...item} />
				))}
			</div>
		</section>

		<section className={styles.splitSection}>
			<div>
				<h2>My journey</h2>
				<div className={styles.timeline}>
					{journey.map((item) => (
						<article className={styles.timelineItem} key={item.year}>
							<span>{item.year}</span>
							<p>{item.text}</p>
						</article>
					))}
				</div>
			</div>

			<div>
				<h2>Tools I use</h2>
				<div className={styles.toolsGrid}>
					{tools.map((tool) => (
						<div className={styles.toolCard} key={tool}>
							<span aria-hidden="true">{tool.slice(0, 2)}</span>
							<strong>{tool}</strong>
						</div>
					))}
				</div>
			</div>
		</section>

		<CtaPanel
			title="Let's create something elegant together"
			text="Have a project in mind or just want to say hello? I'd love to hear from you."
			buttonText="Start a project"
			href="/contacts"
		/>
	</div>
);

export const ContactPageContent = () => (
	<div className={styles.page}>
		<Hero
			label="CONTACT"
			title="Let's build something thoughtful together"
			text="Have a project in mind? I'd love to hear about your goals, timeline, and how I can help bring your ideas to life."
		/>

		<section className={styles.contactLayout}>
			<form className={styles.formCard}>
				<label>
					<span>Your name</span>
					<input type="text" placeholder="Enter your full name" />
				</label>
				<label>
					<span>Email</span>
					<input type="email" placeholder="Enter your email address" />
				</label>
				<label>
					<span>Company</span>
					<input type="text" placeholder="Your company or brand" />
				</label>
				<label>
					<span>Project type</span>
					<select defaultValue="">
						<option value="" disabled>
							Select project type
						</option>
					</select>
				</label>
				<label>
					<span>Budget range</span>
					<select defaultValue="">
						<option value="" disabled>
							Select budget range
						</option>
					</select>
				</label>
				<label>
					<span>Project details</span>
					<textarea placeholder="Tell me about your project, goals, timeline, and any specific needs..." />
				</label>
				<button className={`${styles.button} ${styles.primary}`} type="button">
					Send inquiry <FaArrowRightLong aria-hidden="true" />
				</button>
			</form>

			<div className={styles.contactCards}>
				{contactCards.map((card) => (
					<article className={styles.infoCard} key={card.title}>
						<IconBadge icon={card.icon} />
						<div>
							<h2>{card.title}</h2>
							{card.text && <p>{card.text}</p>}
							{card.tags && (
								<div className={styles.pills}>
									{card.tags.map((tag) => (
										<span key={tag}>{tag}</span>
									))}
								</div>
							)}
						</div>
					</article>
				))}
			</div>
		</section>

		<section className={styles.sectionBlock}>
			<h2>Prefer a quick overview?</h2>
			<div className={styles.threeGrid}>
				{quickSteps.map((step) => (
					<article className={styles.stepCard} key={step.step}>
						<IconBadge icon={step.icon} />
						<div>
							<span>{step.step}</span>
							<h3>{step.title}</h3>
							<p>{step.text}</p>
						</div>
					</article>
				))}
			</div>
		</section>

		<CtaPanel
			title="Ready when you are"
			text="Whether you need a full website, a redesign, or a focused frontend solution — I'm here to help."
			buttonText="Book a call"
			href="/contacts"
		/>
	</div>
);

export const FaqPageContent = () => (
	<div className={`${styles.page} ${styles.faqPage}`}>
		<Hero
			label="FAQS"
			title="Frequently asked questions"
			text="Find answers to common questions about my process, timelines, pricing, revisions, and how we can work together."
		>
			<PageButton href="/contacts">Start a project</PageButton>
		</Hero>

		<section className={styles.faqLayout}>
			<aside className={styles.questionCard}>
				<IconBadge icon={FiHelpCircle} />
				<h2>Need something specific?</h2>
				<p>
					If you have a question that isn't covered here or want to discuss
					your project, I'm happy to help.
				</p>
				<PageButton href="/contacts" variant="secondary">
					Contact me
				</PageButton>
			</aside>

			<FaqAccordion />
		</section>

		<section className={styles.processRow}>
			{faqProcess.map((item) => (
				<article className={styles.processCard} key={item.title}>
					<IconBadge icon={item.icon} />
					<div>
						<h2>{item.title}</h2>
						<p>{item.text}</p>
					</div>
				</article>
			))}
		</section>

		<CtaPanel
			icon={FiMessageCircle}
			title="Still have questions?"
			text="I'd love to hear from you. Send me a message and I'll get back to you as soon as possible."
			buttonText="Contact me"
			href="/contacts"
		/>
	</div>
);
