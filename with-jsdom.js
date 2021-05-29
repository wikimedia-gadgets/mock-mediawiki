const jsdom = require('jsdom');
global.window = new jsdom.JSDOM('<!DOCTYPE html>', {
	pretendToBeVisual: true,
	runScripts: 'dangerously',
	url: 'https://test.wikipedia.org/',
	resources: new jsdom.ResourceLoader({
		// tweak jsdom user agent to add "mock-mediawiki"
		userAgent: `Mozilla/5.0 (${process.platform || "unknown OS"}) AppleWebKit/537.36 (KHTML, like Gecko) jsdom mock-mediawiki`,
	})
}).window;
global.document = window.document;
global.location = window.location;

module.exports = require('./index');