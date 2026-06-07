import styles from './Services.module.css';

const services = [
	{
		number: '01',
		title: 'Signature landing pages',
		text: 'Focused, elegant pages designed to present your offer clearly and convert with confidence',
	},
	{
		number: '02',
		title: 'Custom brand websites',
		text: 'Refined multi-page websites for brands that need a polished, credible digital presence',
	},
	{
		number: '03',
		title: 'Precision Frontend Build',
		text: 'Clean, responsive development with attention to structure, performance, and every visual detail',
	},
];

const Services = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2>Services</h2>
				<div className={styles.grid}>
					{services.map((service) => (
						<article className={styles.card} key={service.number}>
							<span className={styles.number}>{service.number}</span>
							<div className={styles.texts}>
								<h3>{service.title}</h3>
								<p>{service.text}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
