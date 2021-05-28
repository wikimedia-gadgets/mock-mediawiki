## mock-mediawiki
![Node.js CI](https://github.com/wikimedia-gadgets/mock-mediawiki/workflows/test/badge.svg)
[![NPM version](https://img.shields.io/npm/v/mock-mediawiki.svg)](https://www.npmjs.com/package/mock-mediawiki)

Honest MediaWiki JS interface mocking in Node.js.

No unnecessary changes to the original source files. Directly copied from MediaWiki core with [bare minimum modifications](https://github.com/wikimedia-gadgets/mock-mediawiki/blob/main/PATCHES.md). Currently includes mw.config, mw.util, mw.Title, mw.Api, mw.user, mw.hook, mw.html, mw.Uri, mw.storage, mw.language, mw.template, and mw.Message. jQuery is also included from [its npm package](https://www.npmjs.com/package/jquery).

To stay true to the original source, `mw` and `$` are made available as globals, rather than exported from the module. 

Licensed under the _Lesser_ General Public License. Can be used from any repository regardless of license. (Note that on the other hand, MW source code copied directly may only be pasted into repos with GPL-compatible licenses).

[![Download stats](https://nodei.co/npm/mock-mediawiki.png?downloads=true&downloadRank=true)](https://nodei.co/npm/mock-mediawiki/)

## How to use

### Use with Jest

If you're using Jest's default test environment `jest-environment-jsdom`, just tweak your `jest.config.js` to include:
```
    "setupFilesAfterEnv": ["mock-mediawiki"] 
```

Done! All your Jest tests will now have access to `mw` and `$` as globals. This setup works with both CommonJS module format and ESM.

Jest exposes globally most browser-only globals available via jsdom. So if your gadget code includes references to `HTMLSpanElement` or `XMLDocument` et al, they'll just work!

Use of mw.Api for making API calls from JSDOM has only been verified working with Jest. For this, ensure that you set a `testURL` property in `jest.config.js` that is on the same domain as the API endpoint URL which can be set as `api = new mw.Api({ ajax: { url: '<APIURL>' } })`.

### Use with other test runners

Other test runners don't usually have JSDOM integrated. You need to install jsdom separately (`npm i -D jsdom`) and then include the following in your test files:

CommonJS:
```js
require('mock-mediawiki/with-jsdom');
```

ESM:
```js
import 'mock-mediawiki/with-jsdom';
```

Or even better, consider using [jsdom-global](https://www.npmjs.com/package/jsdom-global) which sets up JSDOM similar to how Jest does it; and then just do `require('mock-mediawiki)` or its ESM equivalent.

It is assumed that ESM tests undergo transformation to CommonJS as part of some build step. Use of this package with native Node.js ESM packages is not supported because of its internal reliance on `require()`.

### Notes

If your tests are in TypeScript, you'll need to additionally have [types-mediawiki](https://github.com/wikimedia-gadgets/types-mediawiki). However, note that types-mediawiki covers type definitions for more modules, so TypeScript-based IntelliSense could be somewhat misleading.

For using mw.storage, you must give JSDOM a URL (for jest this is done via `testURL` in jest.config.js, for jsdom or jsdom-global, provide `url` param to the constructor). 

For mw.language, [convertGrammar specialisations](https://github.com/wikimedia/mediawiki/tree/master/resources/src/mediawiki.language/languages) for non-English languages aren't included (since whether to load them or not depends on the wgUserLanguage). 

Please file an issue if anything doesn't work.

### To-do

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

- [ ] Add mw.language 
- [ ] Add mediawiki.JQueryMsg, mw.cldr, mw.libs.pluralRuleParser 
- [ ] Add mw.cookie
- [ ] Add mw.template