global.$ = global.jQuery = require("jquery");

global.$VARS = {
	// needed in ./mediawiki
	wgLegacyJavaScriptGlobals: false,
};
require("./lib/mediawiki");
global.mw = global.mediaWiki = window.mw;

require("./config_data");
require("./lib/util/util");
require("./lib/Title/Title");

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
