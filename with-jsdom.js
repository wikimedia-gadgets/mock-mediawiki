const {JSDOM} = require('jsdom');
global.window = new JSDOM('', {pretendToBeVisual: true}).window;
global.document = window.document;

module.exports = require('./index');