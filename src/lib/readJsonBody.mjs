const MAX_BODY_BYTES = 32 * 1024;
const BODY_TIMEOUT_MS = 10_000;

export class RequestBodyError extends Error {
	constructor(message, status) {
		super(message);
		this.name = 'RequestBodyError';
		this.status = status;
	}
}

export async function readJsonBody(
	request,
	{ maxBytes = MAX_BODY_BYTES, timeoutMs = BODY_TIMEOUT_MS } = {},
) {
	if (!request.body) {
		throw new RequestBodyError('Please check the form details.', 400);
	}

	const reader = request.body.getReader();
	let timeoutId;

	try {
		const contentType = request.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
		if (contentType !== 'application/json') {
			throw new RequestBodyError('Please send the form as JSON.', 415);
		}

		const contentLength = request.headers.get('content-length');
		if (contentLength !== null && !/^\d+$/.test(contentLength)) {
			throw new RequestBodyError('Please check the form details.', 400);
		}
		if (contentLength !== null && Number(contentLength) > maxBytes) {
			throw new RequestBodyError('Your request is too large. Please shorten it.', 413);
		}

		const buffer = new Uint8Array(maxBytes);
		let byteLength = 0;
		const readBody = async () => {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				// Count received bytes even when Content-Length is missing or incorrect.
				if (value.byteLength > maxBytes - byteLength) {
					throw new RequestBodyError('Your request is too large. Please shorten it.', 413);
				}
				buffer.set(value, byteLength);
				byteLength += value.byteLength;
			}
			const text = new TextDecoder('utf-8', { fatal: true }).decode(buffer.subarray(0, byteLength));
			return JSON.parse(text);
		};
		const deadline = new Promise((_, reject) => {
			timeoutId = setTimeout(() => {
				reject(new RequestBodyError('The request took too long. Please try again.', 408));
			}, timeoutMs);
		});

		return await Promise.race([readBody(), deadline]);
	} catch (error) {
		// Cancelling the source must not hold up an error response.
		void reader.cancel().catch(() => {});
		if (error instanceof RequestBodyError) throw error;
		throw new RequestBodyError('Please check the form details.', 400);
	} finally {
		clearTimeout(timeoutId);
		reader.releaseLock();
	}
}
