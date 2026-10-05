
import './_styles/globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import { themeInitScript } from '@/lib/theme.mjs';
import styles from './_styles/Layout.module.css';
import './_styles/reset.css';

import BackgroundDecor from '@/components/BackgroundDecor/BackgroundDecor';
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
});

const montserrat = Montserrat({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-montserrat', // Имя переменной для CSS
});

export const metadata = {
	title: 'Maria.dev',
	description: 'Elegant websites for brands that value detail',
	openGraph: {
		siteName: 'Maria.dev',
		description: 'Elegant websites for brands that value detail'
	}
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${inter.variable} ${montserrat.variable}`} data-theme="light" suppressHydrationWarning>
			<body>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
				<BackgroundDecor/>

				<div className={styles.page}>
					<Header />
					<main className={styles.main} id="main-content" tabIndex={-1}>
						{children}
					</main>
					<Footer />
				</div>
				<ScrollToTop />
			</body>
		</html>
	);
}
