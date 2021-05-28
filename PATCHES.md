
Last updated from commit [bdd211fb801ee056a3c89e2291cb26ca2961f701](https://github.com/wikimedia/mediawiki/tree/bdd211fb801ee056a3c89e2291cb26ca2961f701) on [wikimedia/mediawiki](https://github.com/wikimedia/mediawiki).

mw.user and mw.Api uploaded from c60ccf4e6d4932dddc2efd72a8abf6e56243f086. mw.Uri, mw.template, mw.language and mw.storage uploaded from 4444264dfe31453398aa4876df253394bf26e428.

(TODO: update everything to same commit ID)

| File         | Original file | Patches  | 
|--------------|---------------|----------|
| startup/mediawiki.js |  [resources/src/startup/mediawiki.js] | None |
| mediawiki.base/mediawiki.base.js | [resources/src/mediawiki.base/mediawiki.base.js] | Removed the last few lines: `while ( queue[ 0 ] ) { window.RLQ.push( queue.shift() ); }` 
| mediawiki.base/legacy.wikibits.js | [resources/src/mediawiki.base/legacy.wikibits.js] | None
| mediawiki.base/mediawiki.errorLogger.js | [resources/src/mediawiki.base/mediawiki.errorLogger.js] | None
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
| CLDRPluralRuleParser/CLDRPluralRuleParser.js | [resources/lib/CLDRPluralRuleParser/CLDRPluralRuleParser.js] | None

Extra files added: `config.json`, `util/config.json` (In real MediaWiki, these are generated on-the-fly based on wiki configurations by the backend PHP, so there's nowhere we can copy the files from.)

[resources/src/startup/mediawiki.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/startup/mediawiki.js
[resources/src/mediawiki.base/mediawiki.base.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.base/mediawiki.base.js
[resources/src/mediawiki.base/legacy.wikibits.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.base/legacy.wikibits.js
[resources/src/mediawiki.base/mediawiki.errorLogger.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.base/mediawiki.errorLogger.js
[resources/src/mediawiki.util/util.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.util/util.js
[resources/src/mediawiki.util/jquery.accessKeyLabel.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.util/jquery.accessKeyLabel.js
[resources/src/mediawiki.Title/Title.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.Title/Title.js
[resources/src/mediawiki.Title/phpCharToUpper.json]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.Title/phpCharToUpper.json
[resources/src/mediawiki.String.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.String.js
[resources/src/mediawiki.user.js]: https://github.com/wikimedia/mediawiki/tree/master/resources/src/mediawiki.user.js
[resources/src/mediawiki.api]: https://github.com/wikimedia/mediawiki/tree/master/resources/src/mediawiki.api
[resources/src/mediawiki.Uri/Uri.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.Uri/Uri.js
[resources/src/mediawiki.storage.js]: https://github.com/wikimedia/mediawiki/tree/master/resources/src/mediawiki.storage.js
[resources/src/mediawiki.template.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.template.js
[resources/src/mediawiki.language]: https://github.com/wikimedia/mediawiki/tree/master/resources/src/mediawiki.language
[resources/src/mediawiki.cldr/index.js]: https://github.com/wikimedia/mediawiki/tree/master/resources/src/mediawiki.cldr/index.js
[resources/lib/CLDRPluralRuleParser/CLDRPluralRuleParser.js]: https://github.com/wikimedia/mediawiki/tree/master/resources/lib/CLDRPluralRuleParser/CLDRPluralRuleParser.js