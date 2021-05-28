const {JSDOM} = require('jsdom');
global.window = new JSDOM('<!DOCTYPE html>', {
	pretendToBeVisual: true,
	runScripts: 'dangerously',
	url: 'https://test.wikipedia.org/'
}).window;
global.document = window.document;
global.location = window.location;

module.exports = require('./index');