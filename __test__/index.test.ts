import { request } from './app';

describe('GET / check app is healthy', () => {
	it('responds with text', async () => {
		const resp = await request.get('/');
		expect(resp.text).toBe('App is running.');
	});
});
