module.exports = {
	preset: 'ts-jest',
	globalSetup: './jest.global-setup.js',
	testEnvironment: 'node',
	setupFiles: ["./scripts/setEnvVars.js"]
}