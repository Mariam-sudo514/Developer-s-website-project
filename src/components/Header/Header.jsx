import Link from 'next/link';
import ContactButton from '../ContactButton/ContactButton';
import Navigation from '../Navigation/Navigation';
import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles.header}>
			<Link className={styles.logo} href="/">
				Maria.dev
			</Link>

			<Navigation />

			<ContactButton className={styles.contact} />
		</header>
	);
};

export default Header;
