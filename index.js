global.$ = global.jQuery = require("jquery");

// needed in ./lib/startup/mediawiki
global.$VARS = {
	wgLegacyJavaScriptGlobals: false,
	baseModules: []
};
global.$CODE = {
	consoleLog: function () {},
	maybeRedefineFallbacksForTest: function () {},
	registrations: function () {},
	defineLoader: function () {},
	profileExecuteStart: function () {},
	profileScriptStart: function () {},
	profileScriptEnd: function () {},
	profileExecuteEnd: function () {}
};
require("./lib/startup/mediawiki");
global.mw = global.mediaWiki = window.mw;
require("./lib/startup/mediawiki.requestIdleCallback");
require("./lib/startup/mediawiki.loader");
require("./lib/startup/startup");
require("./lib/startup/profiler");
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
require("./lib/jquery.cookie/jquery.cookie");
require("./lib/mediawiki.cookie/index");
require("./lib/CLDRPluralRuleParser/CLDRPluralRuleParser");
mw.libs.pluralRuleParser = window.pluralRuleParser;
require("./lib/mediawiki.cldr/index");
require("./lib/mediawiki.language/mediawiki.language.init");
require("./lib/mediawiki.language/mediawiki.language");
require("./lib/mediawiki.language/mediawiki.language.fallback");
require("./lib/mediawiki.language/mediawiki.language.months");
require("./lib/mediawiki.language/mediawiki.language.names");
require("./lib/mediawiki.language/mediawiki.language.numbers");
require("./lib/mediawiki.language/mediawiki.language.specialCharacters");
require("./lib/mediawiki.jqueryMsg/mediawiki.jqueryMsg");

exports.$ = $;
exports.mw = mw;

exports.setPage = function (pageName, pageId, pageIsRedirect, pageRestrictions) {
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
};

exports.setUser = function (userName, userGroups) {
	mw.config.get("wgUserName", userName);
	if (userGroups) {
		mw.config.get("wgUserGroups", userGroups);
	}
};
