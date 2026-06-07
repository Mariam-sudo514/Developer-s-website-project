import Link from 'next/link';
import styles from './ContactButton.module.css';
import { FaArrowRightLong } from "react-icons/fa6";

const ContactButton = ({ className = '', compact = false }) => {
	const classNames = [styles.button, compact ? styles.compact : '', className]
		.filter(Boolean)
		.join(' ');

	return (
		<Link className={classNames} href="/contacts">
			Contact me <span className={styles.icon} aria-hidden="true"><FaArrowRightLong /></span>
		</Link>
	);
};

export default ContactButton;
