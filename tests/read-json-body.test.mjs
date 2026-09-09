import assert from 'node:assert/strict';
import test from 'node:test';
import { readJsonBody, RequestBodyError } from '../src/lib/readJsonBody.mjs';

const encode = (text) => new TextEncoder().encode(text);
const rejectedWith = (status) => (error) =>
	error instanceof RequestBodyError && error.status === status;

function streamedRequest(chunks, { headers = {}, stall = false, cancel = () => {} } = {}) {
	let index = 0;
	return new Request('http://localhost/api/contact', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...headers },
		duplex: 'half',
		body: new ReadableStream({
			pull(controller) {
				if (index < chunks.length) controller.enqueue(chunks[index++]);
				else if (!stall) controller.close();
			},
			cancel,
		}, { highWaterMark: 0 }),
	});
}

test('accepts a full Unicode message, including split UTF-8 characters', async () => {
	const payload = { name: 'Мария', details: 'Я'.repeat(4998) + '🙂' };
	const bytes = encode(JSON.stringify(payload));
	const request = streamedRequest([bytes.slice(0, 10), bytes.slice(10, 11), bytes.slice(11)], {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
	assert.deepEqual(await readJsonBody(request), payload);
});

test('accepts the exact byte limit and rejects one byte more', async () => {
	const atLimit = encode('"' + 'a'.repeat(32 * 1024 - 2) + '"');
	assert.equal((await readJsonBody(streamedRequest([atLimit]))).length, 32 * 1024 - 2);
	await assert.rejects(
		readJsonBody(streamedRequest([atLimit, encode(' ')])),
		rejectedWith(413),
	);
});

for (const headers of [{}, { 'Content-Length': '2' }]) {
	test(`counts streamed bytes with ${headers['Content-Length'] ? 'understated' : 'no'} Content-Length`, async () => {
		let cancelled = false;
		const request = streamedRequest([encode('"'), encode('界'.repeat(11_000))], {
			headers,
			stall: true,
			cancel() { cancelled = true; },
		});
		await assert.rejects(readJsonBody(request), rejectedWith(413));
		assert.equal(cancelled, true);
		assert.equal(request.body.locked, false);
	});
}

test('rejects a declared oversized body before reading it', async () => {
	let reads = 0;
	let cancelled = false;
	const request = {
		headers: new Headers({ 'Content-Type': 'application/json', 'Content-Length': '32769' }),
		body: new ReadableStream({
			pull() { reads++; },
			cancel() { cancelled = true; },
		}, { highWaterMark: 0 }),
	};
	await assert.rejects(readJsonBody(request), rejectedWith(413));
	assert.equal(reads, 0);
	assert.equal(cancelled, true);
});

test('rejects malformed JSON and invalid UTF-8', async () => {
	for (const bytes of [encode('{broken'), encode(''), new Uint8Array([34, 255, 34])]) {
		await assert.rejects(readJsonBody(streamedRequest([bytes])), rejectedWith(400));
	}
});

test('rejects unsupported content types and malformed length headers', async () => {
	await assert.rejects(readJsonBody(streamedRequest([encode('{}')], {
		headers: { 'Content-Type': 'text/plain' },
	})), rejectedWith(415));
	await assert.rejects(readJsonBody(streamedRequest([encode('{}')], {
		headers: { 'Content-Length': '-1' },
	})), rejectedWith(400));
});

test('times out an unfinished upload without waiting for source cancellation', { timeout: 1000 }, async () => {
	let cancelled = false;
	const request = streamedRequest([encode('{')], {
		stall: true,
		cancel() {
			cancelled = true;
			return new Promise(() => {});
		},
	});
	await assert.rejects(readJsonBody(request, { timeoutMs: 20 }), rejectedWith(408));
	assert.equal(cancelled, true);
	assert.equal(request.body.locked, false);
});
