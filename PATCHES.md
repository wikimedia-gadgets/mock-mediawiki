
Last updated from commit [abc8f2aa067488673b70fe6e838af67f685f6fc9](https://github.com/wikimedia/mediawiki/blob/abc8f2aa067488673b70fe6e838af67f685f6fc9) on [wikimedia/mediawiki](https://github.com/wikimedia/mediawiki).

| File         | Original file | Patches  | 
|--------------|---------------|----------|
| mediawiki.js |  [resources/src/startup/mediawiki.js] | Stubbed the 2000-line long mw.loader as it is useless in node.js |
| util/util.js | [resources/src/mediawiki.util/util.js] | None |
| util/jquery.accessKeyLabel.js | [resources/src/mediawiki.util/jquery.accessKeyLabel.js] | None |
| Title/Title.js| [resources/src/mediawiki.Title/Title.js] | Changed import `require( 'mediawiki.String' )` to `require( '../String' )` |
| Title/phpCharToUpper.json | [resources/src/mediawiki.Title/phpCharToUpper.json] | None |
| String.js | [resources/src/mediawiki.String.js]  | None |

Extra files added: util/config.json.

[resources/src/startup/mediawiki.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/startup/mediawiki.js
[resources/src/mediawiki.util/util.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.util/util.js
[resources/src/mediawiki.util/jquery.accessKeyLabel.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.util/jquery.accessKeyLabel.js
[resources/src/mediawiki.Title/Title.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.Title/Title.js
[resources/src/mediawiki.Title/phpCharToUpper.json]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.Title/phpCharToUpper.json
[resources/src/mediawiki.String.js]: https://github.com/wikimedia/mediawiki/blob/master/resources/src/mediawiki.String.js
