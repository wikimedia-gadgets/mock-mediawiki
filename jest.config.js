module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['.'],
	testEnvironmentOptions: {
		url: 'https://test.wikipedia.org/'
	}
};
