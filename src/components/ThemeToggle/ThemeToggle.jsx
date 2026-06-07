'use client';

import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ theme, onToggle }) => {
	return (
		<button
			className={styles.toggle}
			type="button"
			onClick={onToggle}
			aria-label="Toggle color theme"
			aria-pressed={theme === 'dark'}
		>
			<span className={theme === 'light' ? styles.active : ''}>Light</span>
			<span className={theme === 'dark' ? styles.active : ''}>Dark</span>
		</button>
	);
};

export default ThemeToggle;
