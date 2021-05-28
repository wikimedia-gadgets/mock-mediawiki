global.$ = global.jQuery = require("jquery");

// needed in ./lib/mediawiki
global.$VARS = {
	wgLegacyJavaScriptGlobals: false,
};
require("./lib/startup/mediawiki");
global.mw = global.mediaWiki = window.mw;
require("./lib/mediawiki.base/mediawiki.base");
require("./lib/mediawiki.util/util");
require("./lib/mediawiki.Title/Title");
require("./lib/mediawiki.Uri/Uri");
require("./lib/mediawiki.user");
require("./lib/mediawiki.api/index");
require("./lib/mediawiki.api/login");
require("./lib/mediawiki.api/messages");
require("./lib/mediawiki.api/edit");
require("./lib/mediawiki.api/category");
require("./lib/mediawiki.api/parse");
require("./lib/mediawiki.api/options");
require("./lib/mediawiki.api/rollback");
require("./lib/mediawiki.api/upload");
require("./lib/mediawiki.api/user");
require("./lib/mediawiki.api/watch");
require("./lib/mediawiki.storage");
require("./lib/mediawiki.template");
require("./lib/mediawiki.language/mediawiki.language.init");
require("./lib/mediawiki.language/mediawiki.language");
require("./lib/mediawiki.language/mediawiki.language.fallback");
require("./lib/mediawiki.language/mediawiki.language.months");
require("./lib/mediawiki.language/mediawiki.language.names");
require("./lib/mediawiki.language/mediawiki.language.numbers");
require("./lib/mediawiki.language/mediawiki.language.specialCharacters");

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
