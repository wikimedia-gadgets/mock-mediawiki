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

	it('loader', async function () {
		this.timeout(10000);
		const data = await $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*');
		assert.deepEqual(data,{ batchcomplete: '' });
		// Loading the gadget also triggers mw.loader.implement()!
		await mw.loader.getScript('https://test.wikipedia.org/w/load.php?modules=ext.gadget.morebits');
		await sleep(300); // Execution of the loaded script won't be done unless we sleep
		assert.ok(window.Morebits);
		mw.loader.addStyleTag('body { font-size: 10px; }');
	});

	it('api with login', async () => {
		if (process.env.WMF_USERNAME && process.env.WMF_PASSWORD) {
			let api = new mw.Api({
				ajax: {
					url: 'https://test.wikipedia.org/w/api.php'
				}
			});
			await api.login(process.env.WMF_USERNAME, process.env.WMF_PASSWORD);
			const token = await api.getEditToken();
			assert.match(token,/\w{10}\+\\$/);
		} else {
			console.error('No environment variables passed for authentication!'); // soft pass
		}
	}, 10000);

	it('user', async () => {
		let rights = await mw.user.getRights();
		assert.strictEqual(rights.length,0);
	});

});

function sleep(ms) {
	return new Promise(((resolve, reject) => {
		setTimeout(function () {
			resolve();
		}, ms);
	}));
}