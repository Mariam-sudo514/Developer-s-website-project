
import './_styles/globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
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
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function () {
								try {
									var cookieTheme = document.cookie
										.split('; ')
										.find(function (row) { return row.indexOf('theme=') === 0; });
									var savedTheme = window.localStorage && window.localStorage.getItem('theme');
									var savedCookieTheme = cookieTheme && cookieTheme.split('=')[1];
									savedTheme = savedTheme || savedCookieTheme;
									var theme = savedTheme === 'dark' ? 'dark' : 'light';
									document.documentElement.dataset.theme = theme;
								} catch (error) {
									document.documentElement.dataset.theme = 'light';
								}
							})();
						`,
					}}
				/>
				<BackgroundDecor/>

				<div className={styles.page}>
					<Header />
					<main className={styles.main}>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
