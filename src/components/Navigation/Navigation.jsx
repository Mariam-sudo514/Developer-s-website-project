'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Navigation.module.css';

const navLinks = [
	{href: '/', label: 'Home'},
	{href: '/projects', label: 'Projects'},
	{href: '/about',  label: 'About me'},
	{href: '/getExample', label: 'FAQs'},
]

const Navigation = () => {
	const pathname = usePathname();
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		const currentTheme =
			document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
		setTheme(currentTheme);
	}, []);

	const toggleTheme = () => {
		const nextTheme = theme === 'dark' ? 'light' : 'dark';

		document.documentElement.dataset.theme = nextTheme;
		try {
			window.localStorage?.setItem('theme', nextTheme);
		} catch (error) {
			// Theme still switches when storage is unavailable.
		}
		document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`;
		setTheme(nextTheme);
	};

	return (
		<nav className={styles.navigation} aria-label="Primary navigation">
			<div className={styles.links}>
			{navLinks.map((link) => {
					const isActive = pathname === link.href;

					return (
						<Link
							key={link.href}
							href={link.href}
							className={`${styles.link} ${isActive ? styles.active : ''}`}
							aria-current={isActive ? 'page' : undefined}
						>
							{link.label}
						</Link>
					);
				})}
			</div>
			<div className={styles.themeWrapper}>
				<ThemeToggle theme={theme} onToggle={toggleTheme} />
			</div>
		</nav>
	);
};

export default Navigation;
