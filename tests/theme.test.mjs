import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import { persistTheme, themeInitScript } from '../src/lib/theme.mjs';

function bootstrap({ stored, cookie = '', storageBlocked = false, cookieBlocked = false } = {}) {
	const document = {
		documentElement: { dataset: {} },
		get cookie() {
			if (cookieBlocked) throw new Error('Cookie access blocked');
			return cookie;
		},
	};
	const window = {
		get localStorage() {
			if (storageBlocked) throw new Error('Storage access blocked');
			return { getItem: () => stored ?? null };
		},
	};
	vm.runInNewContext(themeInitScript, { window, document });
	return document.documentElement.dataset.theme;
}

test('stored light and dark themes take precedence over the cookie', () => {
	assert.equal(bootstrap({ stored: 'light', cookie: 'theme=dark' }), 'light');
	assert.equal(bootstrap({ stored: 'dark', cookie: 'theme=light' }), 'dark');
});

test('a blocked localStorage getter still permits the cookie fallback', () => {
	assert.equal(bootstrap({ storageBlocked: true, cookie: 'theme=dark' }), 'dark');
});

test('invalid or absent stored values fall back to an exact theme cookie', () => {
	assert.equal(bootstrap({ stored: 'sepia', cookie: 'other=1;theme=dark; third=3' }), 'dark');
	assert.equal(bootstrap({ cookie: 'other=1; theme=dark' }), 'dark');
	assert.equal(bootstrap({ cookie: 'not-theme=dark; theme=invalid' }), 'light');
});

test('blocked cookie reads do not discard a valid stored preference', () => {
	assert.equal(bootstrap({ stored: 'dark', cookieBlocked: true }), 'dark');
});

test('unavailable persistence or invalid preferences default to light', () => {
	assert.equal(bootstrap({ storageBlocked: true, cookieBlocked: true }), 'light');
	assert.equal(bootstrap({ stored: 'invalid', cookie: 'theme=invalid' }), 'light');
	assert.equal(bootstrap(), 'light');
});

test('persistence writes the same preference to storage and the cookie', () => {
	const document = {};
	const writes = [];
	persistTheme('dark', { document, localStorage: { setItem: (...args) => writes.push(args) } });
	assert.deepEqual(writes, [['theme', 'dark']]);
	assert.equal(document.cookie, 'theme=dark; path=/; max-age=31536000; SameSite=Lax');
});

test('a blocked storage write still updates the fallback cookie', () => {
	const document = {};
	persistTheme('light', {
		document,
		localStorage: { setItem: () => { throw new Error('Storage is full'); } },
	});
	assert.match(document.cookie, /^theme=light;/);
});

test('blocked cookie writes do not prevent storage writes or throw to the UI', () => {
	const writes = [];
	const document = { set cookie(value) { throw new Error('Cookies blocked: ' + value); } };
	assert.doesNotThrow(() => persistTheme('dark', {
		document,
		localStorage: { setItem: (...args) => writes.push(args) },
	}));
	assert.deepEqual(writes, [['theme', 'dark']]);
	assert.doesNotThrow(() => persistTheme('dark', {
		document,
		get localStorage() { throw new Error('Storage blocked'); },
	}));
});
