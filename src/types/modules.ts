import { AwilixContainer } from 'awilix';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'dev' | 'prod' | 'local';
			PORT: string;
			DB_HOST: string;
			DB_USER: string;
			DB_PASSWORD: string;
			DB_DATABASE: string;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		interface Request {
			container: AwilixContainer;
		}
	}
}

export {};
