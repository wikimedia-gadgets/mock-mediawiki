global.$ = global.jQuery = require('jquery');

global.$VARS = { // needed in ./mediawiki
    wgLegacyJavaScriptGlobals: false,
};
require('./mediawiki');
global.mw = global.mediaWiki = window.mw;

require('./config_data');
require('./util/util');
require('./Title/Title');

module.exports = {
    setPage: function (pageName, pageId, pageIsRedirect, pageRestrictions) {
        mw.config.set('wgPageName', pageName);
        mw.config.set('wgArticleId', pageId);
        mw.config.set('wgIsRedirect', pageIsRedirect);
        mw.config.set('wgRestrictionEdit', pageRestrictions);
    },
    setUser: function (userName, userGroups) {
        mw.config.get('wgUserName', userName);
        mw.config.get('wgUserGroups', userGroups);
    }
}
