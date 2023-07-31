import cors from 'cors';

export const available_table_names = ['posts', 'users'];

export const whitelistedOrigions = ['https://www.example.com'];

export const customCors = cors({
	origin(requestOrigin, callback) {
		if (!requestOrigin) {
			callback(null, true);
		} else {
			if (
				requestOrigin &&
				whitelistedOrigions.includes(requestOrigin)
			) {
				callback(null, true);
			} else {
				callback(
					new Error(`Not allowed by CORS for ${requestOrigin}`)
				);
			}
		}
	},
});
