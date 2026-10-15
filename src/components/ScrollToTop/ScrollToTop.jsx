'use client';

import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import styles from './ScrollToTop.module.css';

const SCROLL_THRESHOLD = 500;

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [hasFocus, setHasFocus] = useState(false);
	const isShown = isVisible || hasFocus;

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.scrollY > SCROLL_THRESHOLD);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		document.getElementById('main-content')?.focus({ preventScroll: true });
		window.scrollTo({
			top: 0,
			behavior: prefersReducedMotion ? 'instant' : 'smooth',
		});
	};

	return (
		<button
			aria-hidden={!isShown}
			aria-label="Back to top"
			className={`${styles.button} ${isShown ? styles.visible : ''}`}
			onClick={scrollToTop}
			onFocus={() => setHasFocus(true)}
			onBlur={() => setHasFocus(false)}
			tabIndex={isShown ? 0 : -1}
			type="button"
		>
			<FiArrowUp aria-hidden="true" className={styles.icon} />
		</button>
	);
};

export default ScrollToTop;
