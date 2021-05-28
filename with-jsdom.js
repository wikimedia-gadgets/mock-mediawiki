const {JSDOM} = require('jsdom');
global.window = new JSDOM('<!DOCTYPE html>', {
	pretendToBeVisual: true,
	runScripts: 'dangerously',
	url: 'http://localhost:8080/index.php/Main_Page'
}).window;
global.document = window.document;
global.location = window.location;

module.exports = require('./index');