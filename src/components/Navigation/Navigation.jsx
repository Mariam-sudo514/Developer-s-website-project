'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
	const [mobilePosition, setMobilePosition] = useState(null);
	const anchorRef = useRef(null);
	const navigationRef = useRef(null);
	const menuButtonRef = useRef(null);
	const panelRef = useRef(null);
	const desktopLinksRef = useRef(null);
	const menuId = 'primary-navigation-menu';

	useLayoutEffect(() => {
		const mobileLayout = window.matchMedia('(max-width: 880px)');
		const updatePosition = () => {
			if (!mobileLayout.matches) {
				anchorRef.current?.style.removeProperty('--mobile-navigation-width');
				anchorRef.current?.style.removeProperty('--mobile-navigation-height');
				setMobilePosition(null);
				return;
			}

			const anchor = anchorRef.current;
			const navigation = navigationRef.current;
			if (!anchor || !navigation) return;

			// Reserve the controls' original flex position without fixing the logo.
			const { width, height } = navigation.getBoundingClientRect();
			anchor.style.setProperty('--mobile-navigation-width', `${width}px`);
			anchor.style.setProperty('--mobile-navigation-height', `${height}px`);
			const { left } = anchor.getBoundingClientRect();
			setMobilePosition((current) => current?.left === left ? current : { left });
		};

		const observer = new ResizeObserver(updatePosition);
		observer.observe(anchorRef.current);
		window.addEventListener('resize', updatePosition);
		mobileLayout.addEventListener('change', updatePosition);
		document.fonts.ready.then(updatePosition);
		updatePosition();

		return () => {
			observer.disconnect();
			window.removeEventListener('resize', updatePosition);
			mobileLayout.removeEventListener('change', updatePosition);
		};
	}, []);

	useEffect(() => {
		const currentTheme =
			document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
		setTheme(currentTheme);
	}, []);

	useEffect(() => {
		if (!isMenuOpen || !window.matchMedia('(max-width: 880px)').matches) {
			return undefined;
		}

		const { body, documentElement } = document;
		const { scrollX, scrollY } = window;
		const bodyStyles = {
			position: body.style.position,
			top: body.style.top,
			left: body.style.left,
			width: body.style.width,
			overflowX: body.style.overflowX,
			overflowY: body.style.overflowY,
			paddingRight: body.style.paddingRight,
		};
		const rootStyles = {
			overflowX: documentElement.style.overflowX,
			overflowY: documentElement.style.overflowY,
		};
		const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
		const bodyPaddingRight = getComputedStyle(body).paddingRight;

		Object.assign(documentElement.style, {
			overflowX: 'hidden',
			overflowY: 'hidden',
		});
		Object.assign(body.style, {
			position: 'fixed',
			top: `${-scrollY}px`,
			left: `${-scrollX}px`,
			width: '100%',
			overflowX: 'hidden',
			overflowY: 'hidden',
		});
		if (scrollbarWidth > 0) {
			body.style.paddingRight = `${parseFloat(bodyPaddingRight) + scrollbarWidth}px`;
		}

		const closeOnEscape = (event) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				setIsMenuOpen(false);
				menuButtonRef.current?.focus({ preventScroll: true });
			}
		};

		document.addEventListener('keydown', closeOnEscape);

		return () => {
			document.removeEventListener('keydown', closeOnEscape);
			Object.assign(body.style, bodyStyles);
			Object.assign(documentElement.style, rootStyles);
			window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
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

	const navigation = (
		<nav
			className={`${styles.navigationShell} ${mobilePosition ? styles.mobileFixed : ''}`}
			ref={navigationRef}
			style={mobilePosition || undefined}
			aria-label="Primary navigation"
		>
			{isMenuOpen ? (
				<div className={styles.backdrop} aria-hidden="true" onClick={closeMenu} />
			) : null}
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
					</div>
				</div>
			) : null}
		</nav>
	);

	return (
		<div className={styles.navigationAnchor} ref={anchorRef}>
			{mobilePosition ? createPortal(navigation, document.body) : navigation}
		</div>
	);
};

export default Navigation;
