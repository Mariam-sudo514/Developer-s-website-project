import Link from 'next/link';
import styles from './ButtonLink.module.css';

const ButtonLink = ({ children, href, variant = 'primary', className = '' }) => {
	const classNames = [styles.button, styles[variant], className]
		.filter(Boolean)
		.join(' ');

	return (
		<Link className={classNames} href={href}>
			{children}
		</Link>
	);
};

export default ButtonLink;
