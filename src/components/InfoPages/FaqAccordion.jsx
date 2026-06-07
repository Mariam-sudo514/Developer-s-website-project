'use client';

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styles from './InfoPages.module.css';

const faqItems = [
	{
		question: 'What kind of projects do you work on?',
		answer:
			'I work on landing pages, portfolio sites, service websites, and custom brand websites tailored to your goals and audience.',
	},
	{
		question: 'Do you design and develop the website?',
		answer:
			'Yes. I handle both UI design and frontend development to ensure a cohesive, high-quality digital experience.',
	},
	{
		question: 'How long does a project usually take?',
		answer:
			'Project timing depends on the scope and requirements, but most projects typically take 2 to 6 weeks from start to finish.',
	},
	{
		question: 'Do you work with Webflow or custom code?',
		answer:
			"Both are possible. I'll recommend the best approach based on your goals, content needs, and the level of flexibility you require.",
	},
	{
		question: 'How many revisions are included?',
		answer:
			'Most projects include focused revision rounds at key stages so we can refine direction, content, and details before launch.',
	},
	{
		question: 'Can you redesign an existing website?',
		answer:
			'Yes. I can review your current website, identify what needs to improve, and rebuild it with a cleaner structure and stronger visual direction.',
	},
	{
		question: 'Do you offer ongoing support after launch?',
		answer:
			'Yes. I can help with post-launch updates, small improvements, and guidance after your website is live.',
	},
	{
		question: 'How do we get started?',
		answer:
			'Send a short message with your goals, timeline, and project context. I will review the details and suggest the next step.',
	},
];

const FaqAccordion = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleItem = (index) => {
		setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
	};

	return (
		<div className={styles.faqList}>
			{faqItems.map((item, index) => {
				const isOpen = openIndex === index;
				const buttonId = `faq-button-${index}`;
				const panelId = `faq-panel-${index}`;

				return (
					<article
						className={`${styles.faqItem} ${
							isOpen ? styles.faqItemOpen : ''
						}`}
						key={item.question}
					>
						<button
							aria-controls={panelId}
							aria-expanded={isOpen}
							className={styles.faqToggle}
							id={buttonId}
							onClick={() => toggleItem(index)}
							type="button"
						>
							<span>{item.question}</span>
							<span
								aria-hidden="true"
								className={`${styles.faqArrow} ${
									isOpen ? styles.faqArrowOpen : ''
								}`}
							>
								<FiChevronDown />
							</span>
						</button>
						<div
							aria-hidden={!isOpen}
							aria-labelledby={buttonId}
							className={`${styles.faqPanel} ${
								isOpen ? styles.faqPanelOpen : ''
							}`}
							id={panelId}
							role="region"
						>
							<div className={styles.faqPanelInner}>
								<p>{item.answer}</p>
							</div>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export default FaqAccordion;
