
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
		expect(rights.length).toEqual(0);
	});

});