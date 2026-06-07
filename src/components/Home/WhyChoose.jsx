import styles from './WhyChoose.module.css';

const whyItems = [
	{
		title: 'Design-led development',
		text: 'A refined visual approach combined with clean, thoughtful frontend execution',
	},
	{
		title: 'Built with precision',
		text: 'Every layout, interaction, and responsive detail is crafted with care',
	},
	{
		title: 'Seamless process',
		text: 'Clear communication, reliable delivery, and guidance from first idea to launch',
	},
];

const WhyChoose = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2>Why choose me</h2>
				<div className={styles.grid}>
					{whyItems.map((item) => (
						<article className={styles.card} key={item.title}>
							<h3>{item.title}</h3>
							<p>{item.text}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhyChoose;
