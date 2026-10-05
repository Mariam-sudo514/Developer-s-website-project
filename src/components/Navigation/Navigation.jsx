'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { persistTheme } from '@/lib/theme.mjs';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Navigation.module.css';

const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/about', label: 'About me' },
	{ href: '/faq', label: 'FAQs' },
];

const currentLink = (pathname, href) => {
	if (pathname === href || (href === '/faq' && pathname === '/getExample')) {
		return 'page';
	}
	if (href !== '/' && pathname?.startsWith(`${href}/`)) {
		return 'location';
	}
	return undefined;
};

const Navigation = () => {
	const pathname = usePathname();
	const [theme, setTheme] = useState('light');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigationRef = useRef(null);
	const menuButtonRef = useRef(null);
	const panelRef = useRef(null);
	const desktopLinksRef = useRef(null);
	const menuId = 'primary-navigation-menu';

	useEffect(() => {
		const currentTheme =
			document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
		setTheme(currentTheme);
	}, []);

	useEffect(() => {
		if (!isMenuOpen) {
			return undefined;
		}

		const closeOnOutsideClick = (event) => {
			if (!navigationRef.current?.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};

		const closeOnEscape = (event) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				setIsMenuOpen(false);
				menuButtonRef.current?.focus();
			}
		};

		const closeOnFocusOutside = (event) => {
			if (!navigationRef.current?.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('focusin', closeOnFocusOutside);
		document.addEventListener('pointerdown', closeOnOutsideClick);
		document.addEventListener('keydown', closeOnEscape);

		return () => {
			document.removeEventListener('focusin', closeOnFocusOutside);
			document.removeEventListener('pointerdown', closeOnOutsideClick);
			document.removeEventListener('keydown', closeOnEscape);
		};
	}, [isMenuOpen]);

	useEffect(() => {
		const mobileLayout = window.matchMedia('(max-width: 880px)');
		const closeOnDesktop = () => {
			if (mobileLayout.matches) return;

			const focused = document.activeElement;
			if (
				focused === menuButtonRef.current ||
				panelRef.current?.contains(focused)
			) {
				const target =
					desktopLinksRef.current?.querySelector('[aria-current]') ||
					desktopLinksRef.current?.querySelector('a');
				target?.focus({ preventScroll: true });
			}
			setIsMenuOpen(false);
		};

		mobileLayout.addEventListener('change', closeOnDesktop);
		return () => mobileLayout.removeEventListener('change', closeOnDesktop);
	}, []);

	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	const toggleTheme = () => {
		const nextTheme = theme === 'dark' ? 'light' : 'dark';

		document.documentElement.dataset.theme = nextTheme;
		setTheme(nextTheme);
		persistTheme(nextTheme, window);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<nav
			className={styles.navigationShell}
			ref={navigationRef}
			aria-label="Primary navigation"
		>
			<div className={styles.navigation}>
				<svg
					aria-hidden="true"
					className={styles.filterDefinitions}
					focusable="false"
				>
					<defs>
						<filter
							colorInterpolationFilters="sRGB"
							height="100%"
							id="navigation-refraction"
							width="100%"
							x="0%"
							y="0%"
						>
							<feTurbulence
								baseFrequency="0.008 0.024"
								numOctaves="1"
								result="refractionNoise"
								seed="17"
								type="fractalNoise"
							/>
							<feDisplacementMap
								in="SourceGraphic"
								in2="refractionNoise"
								scale="10"
								xChannelSelector="R"
								yChannelSelector="G"
							/>
						</filter>
					</defs>
				</svg>
				<div className={styles.distortionLayer} aria-hidden="true" />
				<div className={styles.links} ref={desktopLinksRef}>
					{navLinks.map((link) => {
						const current = currentLink(pathname, link.href);

						return (
							<Link
								key={link.href}
								href={link.href}
								className={`${styles.link} ${current ? styles.active : ''}`}
								aria-current={current}
							>
								{link.label}
							</Link>
						);
					})}
				</div>
				<div className={styles.themeWrapper}>
					<ThemeToggle theme={theme} onToggle={toggleTheme} />
				</div>
				<button
					ref={menuButtonRef}
					aria-controls={menuId}
					aria-expanded={isMenuOpen}
					aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
					className={styles.menuButton}
					onClick={() => setIsMenuOpen((current) => !current)}
					type="button"
				>
					<span>Menu</span>
					<span className={styles.menuMark} aria-hidden="true">
						<span />
						<span />
					</span>
				</button>
			</div>
			{isMenuOpen ? (
				<div className={styles.panel} id={menuId} ref={panelRef}>
					<div className={styles.panelLinks}>
						{navLinks.map((link) => {
							const current = currentLink(pathname, link.href);

							return (
								<Link
									aria-current={current}
									className={`${styles.panelLink} ${
										current ? styles.panelLinkActive : ''
									}`}
									href={link.href}
									key={link.href}
									onClick={closeMenu}
								>
									{link.label}
								</Link>
							);
						})}
					</div>
					<div className={styles.panelActions}>
						<Link
							className={styles.panelCta}
							href="/contacts"
							onClick={closeMenu}
						>
							<span>Start a project</span>
							<FaArrowRightLong aria-hidden="true" className={styles.panelCtaIcon} />
						</Link>
						<Link
							className={`${styles.panelCta} ${styles.panelContactCta}`}
							href="/contacts"
							onClick={closeMenu}
						>
							<span>Contact me</span>
							<FaArrowRightLong aria-hidden="true" className={styles.panelCtaIcon} />
						</Link>
					</div>
				</div>
			) : null}
		</nav>
	);
};

export default Navigation;
