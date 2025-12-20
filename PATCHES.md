
Last updated from commit [4c5619526da25126e7ee23a655ceaa0806a9381c](https://github.com/wikimedia/mediawiki/tree/4c5619526da25126e7ee23a655ceaa0806a9381c) on [wikimedia/mediawiki](https://github.com/wikimedia/mediawiki).

See the file `sync.js` for a full list of files and original locations.

| Module                | Original files                        | Patches                                                                             
|-----------------------|---------------------------------------|-------------------------------------------------------------------------------------
| startup               | [resources/src/startup]               | None                                                                                                            |
| mediawiki.base        | [resources/src/mediawiki.base]        | In mediawiki.base.js, replaced `while ( queue[ 0 ] ) {` with `while ( queue && queue[ 0 ] ) {`                  
| mediawiki.util        | [resources/src/mediawiki.util]        | None                                                                                                            |
| mediawiki.Title       | [resources/src/mediawiki.Title]       | In Title.js, changed import `require( 'mediawiki.String' )` to `require( '../mediawiki.String' )`               |
| mediawiki.String.js   | [resources/src/mediawiki.String.js]   | None                                                                                                            |
| mediawiki.user.js     | [resources/src/mediawiki.user.js]     | None                                                                                                            
| mediawiki.api         | [resources/src/mediawiki.api]         | None                                                                                                            
| mediawiki.Uri         | [resources/src/mediawiki.Uri]         | None                                                                                                            
| mediawiki.storage     | [resources/src/mediawiki.storage]     | None                                                                                                            
| mediawiki.template.js | [resources/src/mediawiki.template.js] | None                                                                                                            
| mediawiki.language    | [resources/src/mediawiki.language]    | None                                                                                                            
| mediawiki.cldr        | [resources/src/mediawiki.cldr]        | In index.js, changed `require( 'mediawiki.libs.pluralruleparser' )` to `mw.libs.pluralRuleParser`               
| mediawiki.cookie      | [resources/src/mediawiki.cookie]      | None                                                                                                            
| CLDRPluralRuleParser  | [resources/lib/CLDRPluralRuleParser]  | None                                                                                                            
| mediawiki.jqueryMsg   | [resources/src/mediawiki.jqueryMsg]   | In mediawiki.jqueryMsg.js, changed `require( 'mediawiki.String' )` to `require( '../mediawiki.String' )` and `require( 'mediawiki.util' )` to `require( '../mediawiki.util/util' )`

Extra files added:
- By supplying suitable values of our own: `mediawiki.base/config.json`, `mediawiki.base/user.json` (In real MediaWiki,
  this is generated based on wiki configurations by the PHP backend, so there's nowhere we can copy the files from.)
- By copying from mw.loader.moduleRegistry['<MODULE_NAME>'].packageExports['<FILE_NAME>']: `mediawiki.util/config.json`,
  `mediawiki.util/portletLinkOptions.json`, `mediawiki.cookie/config.json`, `mediawiki.jqueryMsg/parserDefaults.json`,
  `mediawiki.language/names.json`, `mediawiki.util/infinityValues.json`

[resources/src/startup]: https://github.com/wikimedia/mediawiki/blob/4c5619526da25126/resources/src/startup
[resources/src/mediawiki.base]: https://github.com/wikimedia/mediawiki/blob/4c5619526da25126/resources/src/mediawiki.base
[resources/src/mediawiki.util]: https://github.com/wikimedia/mediawiki/blob/4c5619526da25126/resources/src/mediawiki.util
[resources/src/mediawiki.Title]: https://github.com/wikimedia/mediawiki/blob/4c5619526da25126/resources/src/mediawiki.Title
[resources/src/mediawiki.String.js]: https://github.com/wikimedia/mediawiki/blob/4c5619526da25126/resources/src/mediawiki.String.js
[resources/src/mediawiki.user.js]: https://github.com/wikimedia/mediawiki/tree/4c5619526da25126/resources/src/mediawiki.user.js
[resources/src/mediawiki.api]: https://github.com/wikimedia/mediawiki/tree/4c5619526da25126/resources/src/mediawiki.api
[resources/src/mediawiki.Uri]: https://github.com/wikimedia/mediawiki/blob/4c5619526da25126/resources/src/mediawiki.Uri
[resources/src/mediawiki.storage]: https://github.com/wikimedia/mediawiki/tree/4c5619526da25126/resources/src/mediawiki.storage.js
[resources/src/mediawiki.template.js]: https://github.com/wikimedia/mediawiki/blob/4c5619526da25126/resources/src/mediawiki.template.js
[resources/src/mediawiki.language]: https://github.com/wikimedia/mediawiki/tree/4c5619526da25126/resources/src/mediawiki.language
[resources/src/mediawiki.cldr]: https://github.com/wikimedia/mediawiki/tree/4c5619526da25126/resources/src/mediawiki.cldr
[resources/src/mediawiki.cookie]: https://github.com/wikimedia/mediawiki/tree/4c5619526da25126/resources/src/mediawiki.cookie
[resources/lib/CLDRPluralRuleParser]: https://github.com/wikimedia/mediawiki/tree/4c5619526da25126/resources/lib/CLDRPluralRuleParser
[resources/src/mediawiki.jqueryMsg]: https://github.com/wikimedia/mediawiki/tree/4c5619526da25126/resources/src/mediawiki.jqueryMsg
