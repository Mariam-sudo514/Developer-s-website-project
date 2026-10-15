// Keep this bootstrap self-contained: it runs before React hydrates.
export const themeInitScript = `
(function () {
	var theme;
	try {
		var stored = window.localStorage.getItem('theme');
		if (stored === 'light' || stored === 'dark') theme = stored;
	} catch (error) {}

	if (!theme) {
		try {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].trim();
				if (cookie === 'theme=light' || cookie === 'theme=dark') {
					theme = cookie.slice(6);
					break;
				}
			}
		} catch (error) {}
	}
	document.documentElement.dataset.theme = theme || 'light';
})();
`;

export function persistTheme(theme, browser) {
	if (theme !== 'light' && theme !== 'dark') return;

	try {
		browser.localStorage.setItem('theme', theme);
	} catch (error) {
		// A blocked storage area must not prevent the cookie fallback.
	}
	try {
		browser.document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
	} catch (error) {
		// The current page still uses the selected theme if persistence is blocked.
	}
}
