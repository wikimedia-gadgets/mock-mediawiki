
Last updated from commit [7c895219365380e9a2c939c2c16348c8b60ac8ba](https://github.com/wikimedia/mediawiki/tree/7c895219365380e9a2c939c2c16348c8b60ac8ba) on [wikimedia/mediawiki](https://github.com/wikimedia/mediawiki).

| File         | Original file | Patches  | 
|--------------|---------------|----------|
| startup/mediawiki.js |  [resources/src/startup/mediawiki.js] | None |
| startup/mediawiki.loader.js |  [resources/src/startup/mediawiki.loader.js] | None |
| startup/mediawiki.requestIdleCallback.js |  [resources/src/startup/mediawiki.requestIdleCallback.js] | None |
| startup/profiler.js |  [resources/src/startup/profiler.js] | None |
| startup/startup.js |  [resources/src/startup/startup.js] | None |
| mediawiki.base/mediawiki.base.js | [resources/src/mediawiki.base/mediawiki.base.js] | Replaced `while ( queue[ 0 ] ) {` with `while ( queue && queue[ 0 ] ) {` 
| mediawiki.base/legacy.wikibits.js | [resources/src/mediawiki.base/legacy.wikibits.js] | None
| mediawiki.base/errorLogger.js | [resources/src/mediawiki.base/errorLogger.js] | None
| mediawiki.base/log.js | [resources/src/mediawiki.base/log.js] | None
| mediawiki.util/util.js | [resources/src/mediawiki.util/util.js] | None |
| mediawiki.util/jquery.accessKeyLabel.js | [resources/src/mediawiki.util/jquery.accessKeyLabel.js] | None |
| mediawiki.Title/Title.js| [resources/src/mediawiki.Title/Title.js] | Changed import `require( 'mediawiki.String' )` to `require( '../mediawiki.String' )` |
| mediawiki.Title/phpCharToUpper.json | [resources/src/mediawiki.Title/phpCharToUpper.json] | None |
| mediawiki.String.js | [resources/src/mediawiki.String.js]  | None |
| mediawiki.user.js | [resources/src/mediawiki.user.js] | None
| All 12 mw.Api files | [resources/src/mediawiki.api] | None 
| mediawiki.Uri/Uri.js | [resources/src/mediawiki.Uri/Uri.js] | None 
| mediawiki.storage.js | [resources/src/mediawiki.storage.js] | None
| mediawiki.template.js | [resources/src/mediawiki.template.js] | None
| All 8 mw.language files | [resources/src/mediawiki.language] | None
| mediawiki.cldr/index.js | [resources/src/mediawiki.cldr/index.js] | Changed `require( 'mediawiki.libs.pluralruleparser' )` to `mw.libs.pluralRuleParser`
| mediawiki.cookie/index.js | [resources/src/mediawiki.cookie/index.js] | None
| CLDRPluralRuleParser/CLDRPluralRuleParser.js | [resources/lib/CLDRPluralRuleParser/CLDRPluralRuleParser.js] | None
| mediawiki.jqueryMsg/mediawiki.jqueryMsg.js | [resources/src/mediawiki.jqueryMsg/mediawiki.jqueryMsg.js] | Changed import `require( 'mediawiki.String' )` to `require( '../mediawiki.String' )`

Extra files added: 
- By supplying suitable values of our own: `mediawiki.base/config.json` (In real MediaWiki, this is generated based on wiki configurations by the backend PHP, so there's nowhere we can copy the files from.)
- By copying from mw.loader.moduleRegistry['<MODULE_NAME>'].packageExports['<FILE_NAME>']: `mediawiki.util/config.json`, `mediawiki.util/portletLinkOptions.json`, `mediawiki.cookie/config.json`, `mediawiki.jqueryMsg/parserDefaults.json`, `mediawiki.language/names.json`, `mediawiki.Uri/loose.regexp.js`, `mediawiki.Uri/strict.regexp.js`.

[resources/src/startup/mediawiki.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/startup/mediawiki.js
[resources/src/startup/mediawiki.loader.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/startup/mediawiki.loader.js
[resources/src/startup/mediawiki.requestIdleCallback.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/startup/mediawiki.requestIdleCallback.js
[resources/src/startup/profiler.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/startup/profiler.js
[resources/src/startup/startup.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/startup/startup.js
[resources/src/mediawiki.base/mediawiki.base.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/mediawiki.base/mediawiki.base.js
[resources/src/mediawiki.base/legacy.wikibits.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/mediawiki.base/legacy.wikibits.js
[resources/src/mediawiki.base/errorLogger.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/mediawiki.base/errorLogger.js
[resources/src/mediawiki.base/log.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/mediawiki.base/log.js
[resources/src/mediawiki.util/util.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/mediawiki.util/util.js
[resources/src/mediawiki.util/jquery.accessKeyLabel.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/mediawiki.util/jquery.accessKeyLabel.js
[resources/src/mediawiki.Title/Title.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/mediawiki.Title/Title.js
[resources/src/mediawiki.Title/phpCharToUpper.json]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/mediawiki.Title/phpCharToUpper.json
[resources/src/mediawiki.String.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/mediawiki.String.js
[resources/src/mediawiki.user.js]: https://github.com/wikimedia/mediawiki/tree/7c8952193/resources/src/mediawiki.user.js
[resources/src/mediawiki.api]: https://github.com/wikimedia/mediawiki/tree/7c8952193/resources/src/mediawiki.api
[resources/src/mediawiki.Uri/Uri.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/mediawiki.Uri/Uri.js
[resources/src/mediawiki.storage.js]: https://github.com/wikimedia/mediawiki/tree/7c8952193/resources/src/mediawiki.storage.js
[resources/src/mediawiki.template.js]: https://github.com/wikimedia/mediawiki/blob/7c8952193/resources/src/mediawiki.template.js
[resources/src/mediawiki.language]: https://github.com/wikimedia/mediawiki/tree/7c8952193/resources/src/mediawiki.language
[resources/src/mediawiki.cldr/index.js]: https://github.com/wikimedia/mediawiki/tree/7c8952193/resources/src/mediawiki.cldr/index.js
[resources/src/mediawiki.cookie/index.js]: https://github.com/wikimedia/mediawiki/tree/7c8952193/resources/src/mediawiki.cookie/index.js
[resources/lib/CLDRPluralRuleParser/CLDRPluralRuleParser.js]: https://github.com/wikimedia/mediawiki/tree/7c8952193/resources/lib/CLDRPluralRuleParser/CLDRPluralRuleParser.js
[resources/src/mediawiki.jqueryMsg/mediawiki.jqueryMsg.js]: https://github.com/wikimedia/mediawiki/tree/7c8952193/resources/src/mediawiki.jqueryMsg/mediawiki.jqueryMsg.js
