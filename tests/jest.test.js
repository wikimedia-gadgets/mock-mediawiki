
describe('test', function () {

	test('mw.Title works with correct wgLegalTitleChars mocking', () => {
		expect(new mw.Title('Template:Foo').getMainText()).toBe('Foo');
		expect(mw.Title.newFromText('File:Michał Cieślak Sejm 2016.JPG')).not.toBeNull();
		expect(mw.Title.newFromText('Talk:Template:Foo')).toBeNull();
	});

	test('Other stuff', () => {
		expect(mw.config.get('wgPageName')).toEqual('TestPage');
		expect($.extend).toBeInstanceOf(Function);
		expect(mw.config).toBeInstanceOf(mw.Map);
		expect(mw.util.escapeRegExp("a?:$")).toBe("a\\?:\\$");
	});

	test('Uri', () => {
		const uri = new mw.Uri(
			'https://en.wikipedia.org/wiki/Wikipedia:Bots/Requests_for_approval?useskin=modern#Current_requests_for_approval'
		);
		expect(uri).toStrictEqual({
			"arrayParams": false,
			"fragment": "Current_requests_for_approval",
			"protocol": "https",
			"host": "en.wikipedia.org",
			"password": undefined,
			"path": "/wiki/Wikipedia:Bots/Requests_for_approval",
			"port": undefined,
			"query": {
				"useskin": "modern"
			},
			"user": undefined
		});
	});

	test('storage', () => {
		mw.storage.set('test', 'test-value');
		expect(mw.storage.get('test')).toBe('test-value');
		mw.storage.session.set('xx', 'test-xx-value');
		expect(mw.storage.session.get('xx')).toBe('test-xx-value')
	});

	test('template', () => {
		let output = mw.template.compile('<div>Text</div>', 'html');
		expect(output.render()[0]).toBeInstanceOf(HTMLDivElement);
	});

	test('language', () => {
		expect(mw.language.convertNumber(345543)).toBe('345,543');
		expect(mw.language.convertPlural(0, ['horse', 'horses'])).toBe('horses');
	});

	test('loader', async () => {
		const data = await $.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*');
		expect(data).toStrictEqual({ batchcomplete: '' });
		// Loading the gadget also triggers mw.loader.implement()!
		await mw.loader.getScript('https://test.wikipedia.org/w/load.php?modules=ext.gadget.select2');
		await sleep(300); // Execution of the loaded script won't be done unless we sleep
		expect($.fn.select2).toBeTruthy();
		mw.loader.addStyleTag('body { font-size: 10px; }');
	}, 10000);

	test('cookie', () => {
		mw.cookie.set('key', 'value');
		expect(mw.cookie.get('key')).toBe('value');
	});

	test('api', async () => {
		let api = new mw.Api({
			ajax: {
				url: 'https://test.wikipedia.org/w/api.php'
			}
		});
		let apiResult = await api.get({ action: 'query' });
		expect(apiResult).toStrictEqual({ batchcomplete: '' });
	});

	test('api with login', async () => {
		if (process.env.WMF_USERNAME && process.env.WMF_PASSWORD) {
			let api = new mw.Api({
				ajax: {
					url: 'https://test.wikipedia.org/w/api.php'
				}
			});
			await api.login(process.env.WMF_USERNAME, process.env.WMF_PASSWORD);
			const token = await api.getEditToken();
			expect(token).toMatch(/\w{10}\+\\$/);
		} else {
			console.error('No environment variables passed for authentication!'); // soft pass
		}
	}, 10000);

	test('user', async () => {
		let rights = await mw.user.getRights();
		expect(rights.length).toBeGreaterThan(10);
	});

});

function sleep(ms) {
	return new Promise(((resolve, reject) => {
		setTimeout(function () {
			resolve();
		}, ms);
	}));
}