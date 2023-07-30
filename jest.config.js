/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	coverageThreshold: {
		global: {
			lines: 80,
		},
	},
};
