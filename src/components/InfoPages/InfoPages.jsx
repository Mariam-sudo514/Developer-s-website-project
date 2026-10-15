import ButtonLink from '@/components/Shared/ButtonLink/ButtonLink';
import {
	FiClock,
	FiCode,
	FiGlobe,
	FiMail,
	FiMonitor,
	FiSearch,
	FiSend,
	FiStar,
	FiUsers,
} from 'react-icons/fi';
import { FaArrowRightLong } from 'react-icons/fa6';
import HomeCta from '../Home/HomeCta';
import ContactForm from './ContactForm';
import FaqAccordion from './FaqAccordion';
import styles from './InfoPages.module.css';

const tools = [
	{ name: 'JavaScript', badge: 'JS' },
	{ name: 'TypeScript', badge: 'TS' },
	{ name: 'React.js', badge: 'Re' },
	{ name: 'Next.js', badge: 'Ne' },
	{ name: 'Node.js', badge: 'No' },
	{ name: 'Tailwind CSS', badge: 'Ta' },
	{ name: 'Figma', badge: 'Fi' },
	{ name: 'GitHub', badge: 'Gi' },
];

const values = [
	{
		icon: FiStar,
		title: 'Design sensitivity',
		text: 'A strong visual foundation for translating ideas and design systems into clear, responsive interfaces without losing the details that make a product feel intentional.',
	},
	{
		icon: FiCode,
		title: 'Full-stack execution',
		text: 'From React interfaces and application logic to Node.js server-side functionality and API integration, I build connected experiences across the stack.',
	},
	{
		icon: FiUsers,
		title: 'Product-minded development',
		text: 'I think beyond individual screens — considering usability, structure, maintainability, performance, and how each part supports the product as a whole.',
	},
];

const journey = [
	{
		year: '2020',
		text: 'Began freelancing and building custom landing pages.',
	},
	{
		year: '2021',
		text: 'Expanded into brand websites, UI/UX, and more complex frontend development.',
	},
	{
		year: '2023',
		text: 'Focused on larger web projects while deepening application architecture and development skills.',
	},
	{
		year: 'Today',
		text: 'Working across frontend and backend with React, Next.js, TypeScript, and Node.js.',
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

const PageButton = ({ href, children, variant = 'primary', className = '' }) => (
	<ButtonLink className={className} href={href} variant={variant}>
		{children}
		<FaArrowRightLong aria-hidden="true" />
	</ButtonLink>
);

const Hero = ({ label, title, text, children, useContainer = false }) => {
	const content = (
		<>
			<p className={styles.label}>{label}</p>
			<h1>{title}</h1>
			<p className={styles.lead}>{text}</p>
			{children && <div className={styles.heroActions}>{children}</div>}
		</>
	);

	return (
		<section className={styles.hero}>
			{useContainer ? (
				<div className={`siteContainer ${styles.faqHeroContainer}`}>
					{content}
				</div>
			) : (
				content
			)}
		</section>
	);
};

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
	<div className={`${styles.page} ${styles.aboutPage}`}>
		<Hero
			label="ABOUT ME"
			title="Thoughtful design. Full-stack development. Human-centered experiences."
			text="I'm Maria, a full-stack developer with a strong design background, focused on building thoughtful, responsive web products from interface to application logic."
		>
			<PageButton href="/contacts">Let&apos;s work together</PageButton>
			<PageButton href="/#selected-work" variant="secondary">
				View selected work
			</PageButton>
		</Hero>

		<section className={styles.aboutIntro}>
			<div className={styles.portrait}>
				<img
					alt="Maria, full-stack developer"
					className={styles.portraitImage}
					src="/my photo/Professional portrait with a laptop.png"
				/>
			</div>

			<div className={styles.copyBlock}>
				<h2>A little about me</h2>
				<p>
					I combine design thinking with full-stack development to build web
					experiences that are clear, responsive, and well structured. I care about
					how an interface looks and feels, but also about the architecture and logic
					behind it.
				</p>
				<p>
					My core stack includes JavaScript, TypeScript, React, Next.js, and Node.js.
					I work across UI implementation, application logic, routing, APIs,
					integrations, and the technical details that turn a design into a complete
					working product.
				</p>
				<p>
					I value clean structure, thoughtful technical decisions, and reliable
					execution. My goal is to build products that are intuitive for users,
					maintainable in code, and ready to grow as requirements evolve.
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
						<div className={styles.toolCard} key={tool.name}>
							<span aria-hidden="true">{tool.badge}</span>
							<strong>{tool.name}</strong>
						</div>
					))}
				</div>
			</div>
		</section>

		<CtaPanel
			title="Let's build something thoughtful together"
			text="Have a project in mind? Let's turn it into a thoughtful, well-built product — from interface to application logic."
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
			<ContactForm />

			<aside className={styles.contactInfo} aria-labelledby="get-in-touch-title">
				<h2 id="get-in-touch-title">GET IN TOUCH</h2>

				<div className={styles.contactDetails}>
					<div className={styles.contactDetail}>
						<IconBadge icon={FiMail} />
						<div>
							<h3>Email</h3>
							<a className={styles.contactEmail} href="mailto:maria.dev.contact@gmail.com">
								maria.dev.contact@gmail.com
							</a>
						</div>
					</div>

					<div className={styles.contactDetail}>
						<IconBadge icon={FiClock} />
						<div>
							<h3>Response time</h3>
							<p>Usually within 1–2 business days</p>
						</div>
					</div>

					<div className={styles.contactDetail}>
						<IconBadge icon={FiGlobe} />
						<div>
							<h3>Worldwide</h3>
							<p>Remote collaboration across time zones</p>
						</div>
					</div>
				</div>

				<div className={styles.contactDivider} aria-hidden="true" />

				<div className={styles.nextSteps}>
					<p className={styles.contactEyebrow}>WHAT HAPPENS NEXT</p>
					<ol className={styles.nextStepsList}>
						<li className={styles.nextStep}>
							<span>01</span>
							<div>
								<h3>Send your inquiry</h3>
								<p>Tell me about your project.</p>
							</div>
						</li>
						<li className={styles.nextStep}>
							<span>02</span>
							<div>
								<h3>I review the details</h3>
								<p>I&apos;ll get back to you within 1–2 business days.</p>
							</div>
						</li>
						<li className={styles.nextStep}>
							<span>03</span>
							<div>
								<h3>We discuss next steps</h3>
								<p>We define the scope, timeline, and how we can work together.</p>
							</div>
						</li>
					</ol>
				</div>
			</aside>
		</section>
	</div>
);

export const FaqPageContent = () => (
	<div className={`${styles.page} ${styles.faqPage}`}>
		<Hero
			label="FAQS"
			title="Frequently asked questions"
			text="Find answers to common questions about my process, timelines, pricing, revisions, and how we can work together."
			useContainer
		>
			<PageButton href="/contacts">Start a project</PageButton>
		</Hero>

		<section className={`siteContainer ${styles.faqLayout}`}>
			<h2 className={styles.faqSectionTitle}>Need something specific?</h2>
			<FaqAccordion className={styles.faqProcessAccordion} />
		</section>

		<section className={`siteContainer ${styles.processRow}`}>
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

		<HomeCta
			title="Still have a question?"
			text="Have a project or something specific you'd like to discuss? I'd be happy to hear from you."
		/>
	</div>
);
