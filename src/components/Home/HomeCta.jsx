import ContactButton from '../ContactButton/ContactButton';
import styles from './HomeCta.module.css';

const HomeCta = ({
	title = "Let's create something elegant together",
	text = "Have a project in mind or just want to say hello? I'd love to hear from you.",
}) => {
	return (
		<section className={styles.cta}>
			<div>
				<h2>{title}</h2>
				<p>{text}</p>
			</div>
			<ContactButton />
		</section>
	);
};

export default HomeCta;
