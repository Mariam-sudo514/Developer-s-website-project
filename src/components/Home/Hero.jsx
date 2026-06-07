import ButtonLink from './ButtonLink';
import styles from './Hero.module.css';

const Hero = () => {
	return (
		<section className={styles.section}>
			<div className={`${styles.container} ${styles.content}`}>
				<h1>Elegant websites for brands that value detail</h1>
				<p>
					With a background in web design and 3 years of frontend experience,
					I build thoughtful, responsive websites that feel elegant, intuitive,
					and professionally executed.
				</p>
				<div className={styles.actions}>
					<ButtonLink href="#selected-work">View selected work</ButtonLink>
					<ButtonLink href="/contacts" variant="secondary">
						Start a project <span aria-hidden="true">→</span>
					</ButtonLink>
				</div>
			</div>
		</section>
	);
};

export default Hero;
