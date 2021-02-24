const assert = require('assert');

require('../with-jsdom'); // jest's deps include jsdom, so we haven't explicitly put jsdom as a dev-dep!

describe('test', function () {

	it('mw.Title works with correct wgLegalTitleChars mocking', () => {
		assert.strictEqual(new mw.Title('Template:Foo').getMainText(), 'Foo');
		assert(mw.Title.newFromText('File:Michał Cieślak Sejm 2016.JPG') !== null);
		assert(mw.Title.newFromText('Talk:Template:Foo') === null);
	});

	it('Other stuff', () => {
		assert($.extend instanceof Function);
		assert(mw.config instanceof mw.Map);
		assert(mw.util.escapeRegExp("a?:$") === "a\\?:\\$");
	});

});