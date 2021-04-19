
Last updated from commit [bdd211fb801ee056a3c89e2291cb26ca2961f701](https://github.com/wikimedia/mediawiki/tree/bdd211fb801ee056a3c89e2291cb26ca2961f701) on [wikimedia/mediawiki](https://github.com/wikimedia/mediawiki).

| File         | Original file | Patches  | 
|--------------|---------------|----------|
| mediawiki.js |  [resources/src/startup/mediawiki.js] | None |
| mediawiki.base.js | [resources/src/mediawiki.base/mediawiki.base.js] | Removed the last few lines: `while ( queue[ 0 ] ) { window.RLQ.push( queue.shift() ); }` 
| legacy.wikibits.js | [resources/src/mediawiki.base/legacy.wikibits.js] | None
| mediawiki.errorLogger.js | [resources/src/mediawiki.base/mediawiki.errorLogger.js] | None
| util/util.js | [resources/src/mediawiki.util/util.js] | None |
| util/jquery.accessKeyLabel.js | [resources/src/mediawiki.util/jquery.accessKeyLabel.js] | None |
| Title/Title.js| [resources/src/mediawiki.Title/Title.js] | Changed import `require( 'mediawiki.String' )` to `require( '../String' )` |
| Title/phpCharToUpper.json | [resources/src/mediawiki.Title/phpCharToUpper.json] | None |
| String.js | [resources/src/mediawiki.String.js]  | None |

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
