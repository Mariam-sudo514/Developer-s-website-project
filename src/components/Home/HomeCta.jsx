import ContactButton from '../ContactButton/ContactButton';
import styles from './HomeCta.module.css';

const HomeCta = () => {
	return (
		<section className={styles.cta}>
			<div>
				<h2>Let's create something elegant together</h2>
				<p>
					Have a project in mind or just want to say hello? I'd love to hear
					from you.
				</p>
			</div>
			<ContactButton compact />
		</section>
	);
};

export default HomeCta;
