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
require("./lib/user");
require("./lib/api/index");
require("./lib/api/login");
require("./lib/api/messages");
require("./lib/api/edit");
require("./lib/api/category");
require("./lib/api/parse");
require("./lib/api/options");
require("./lib/api/rollback");
require("./lib/api/upload");
require("./lib/api/user");
require("./lib/api/watch");

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
