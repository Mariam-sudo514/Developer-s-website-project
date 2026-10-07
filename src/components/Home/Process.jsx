import styles from './Process.module.css';
import FaqAccordion from '../InfoPages/FaqAccordion';
import infoStyles from '../InfoPages/InfoPages.module.css';

const processItems = ['Discovery', 'Structure & Flow', 'Development', 'Launch'];

const processAnswer =
	'We begin with a focused conversation to understand your goals, audience, brand direction, and the role your website needs to play. This helps create a clear foundation before any design or development work begins.';

const Process = () => {
	const accordionItems = processItems.map((item) => ({
		question: item,
		answer: processAnswer,
	}));

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2>Process</h2>
				<FaqAccordion
					items={accordionItems}
					idPrefix="process"
					className={infoStyles.processFaqList}
				/>
			</div>
		</section>
	);
};

export default Process;
