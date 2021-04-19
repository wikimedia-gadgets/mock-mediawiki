
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

});