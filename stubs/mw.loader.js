// Stub mw.loader, since the real implementations won't work in Node.js

mw.loader = {
	addStyleTag: function () { return document.createElement('script') },
	getModuleNames: function () { return []; },
	getScript: function () {},
	load: function () {},
	register: function () {},
	state: function () {},
	using: function () { return $.Deferred().resolve(); }
};