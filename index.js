global.$ = global.jQuery = require("jquery");

// needed in ./lib/mediawiki
global.$VARS = {
	wgLegacyJavaScriptGlobals: false,
};
require("./lib/mediawiki");
global.mw = global.mediaWiki = window.mw;
require("./lib/mediawiki.base");
require("./lib/util/util");
require("./lib/Title/Title");

require("./stubs/mw.loader");

module.exports = {
	setPage: function (pageName, pageId, pageIsRedirect, pageRestrictions) {
		mw.config.set("wgPageName", pageName);
		if (pageId) {
			mw.config.set("wgArticleId", pageId);
		}
		if (pageIsRedirect !== undefined && pageIsRedirect !== null) {
			mw.config.set("wgIsRedirect", pageIsRedirect);
		}
		if (pageRestrictions) {
			mw.config.set("wgRestrictionEdit", pageRestrictions);
		}
	},
	setUser: function (userName, userGroups) {
		mw.config.get("wgUserName", userName);
		if (userGroups) {
			mw.config.get("wgUserGroups", userGroups);
		}
	},
};
