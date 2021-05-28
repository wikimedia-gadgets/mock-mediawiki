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

	it('Uri', () => {
		const uri = new mw.Uri(
			'https://en.wikipedia.org/wiki/Wikipedia:Bots/Requests_for_approval?useskin=modern#Current_requests_for_approval'
		);
		assert.deepEqual(uri, {
			"arrayParams": false,
			"fragment": "Current_requests_for_approval",
			"host": "en.wikipedia.org",
			"password": undefined,
			"path": "/wiki/Wikipedia:Bots/Requests_for_approval",
			"protocol": "https",
			"port": undefined,
			"query": {
				"useskin": "modern"
			},
			"user": undefined
		});
	});

	it('storage', () => {
		mw.storage.set('test', 'test-value');
		assert.strictEqual(mw.storage.get('test'), 'test-value');
		mw.storage.session.set('xx', 'test-xx-value');
		assert.strictEqual(mw.storage.session.get('xx'), 'test-xx-value');
	});

	it('template', () => {
		let output = mw.template.compile('<div>Text</div>', 'html');
		assert.ok(output.render()[0] instanceof window.HTMLDivElement);
	});

	it('language', () => {
		assert.strictEqual(mw.language.convertNumber(345543), '345,543');
		assert.strictEqual(mw.language.convertPlural(0, ['horse', 'horses']),'horses');
	});

});