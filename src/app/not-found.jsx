import ButtonLink from '@/components/Shared/ButtonLink/ButtonLink';
import styles from '@/components/InfoPages/InfoPages.module.css';

const NotFound = () => {
	return (
		<div className={styles.page}>
			<section className={`${styles.hero} ${styles.notFoundHero}`}>
				<p className={styles.label}>404</p>
				<h1>Page not found</h1>
				<p className={styles.lead}>
					The page you&apos;re looking for may have moved, or the link is no
					longer available.
				</p>
				<div className={styles.heroActions}>
					<ButtonLink href="/" variant="primary">
						Back to home <span aria-hidden="true">→</span>
					</ButtonLink>
					<ButtonLink href="/projects" variant="secondary">
						View projects <span aria-hidden="true">→</span>
					</ButtonLink>
				</div>
			</section>
		</div>
	);
};

export default NotFound;
