## mock-mediawiki
![Node.js CI](https://github.com/wikimedia-gadgets/mock-mediawiki/workflows/test/badge.svg)
[![NPM version](https://img.shields.io/npm/v/mock-mediawiki.svg)](https://www.npmjs.com/package/mock-mediawiki)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Honest MediaWiki JS interface mocking in Node.js.

No unnecessary changes to the original source files. Directly copied from MediaWiki core with [bare minimum modifications](https://github.com/wikimedia-gadgets/mock-mediawiki/blob/main/PATCHES.md). Includes mw.config, mw.util, mw.Title, mw.Api, mw.user, mw.loader, mw.hook, mw.html, mw.Uri, mw.storage, mw.language, mw.template, mw.Message and mw.jqueryMsg. jQuery is also included from [its npm package](https://www.npmjs.com/package/jquery).

To stay true to the original source, `mw` and `$` are made available as globals, rather than exported from the module.

Licensed under the _Lesser_ General Public License. Can be used from any repository regardless of license. (Note that on the other hand, MW source code copied directly may only be pasted into repos with GPL-compatible licenses).

[![Download stats](https://nodei.co/npm/mock-mediawiki.png?downloads=true&downloadRank=true)](https://nodei.co/npm/mock-mediawiki/)

## How to use

### Use with Jest

If you're using Jest, tweak your `jest.config.js` to include: (jsdom testEnvironment used to be the default till Jest v26)
```
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["mock-mediawiki"],
    "testURL": "https://test.wikipedia.org" // this is only needed if you plan to use mw.Api or mw.storage
```

Done! All your Jest tests will now have access to `mw` and `$` as globals. This setup works with both CommonJS module format and ESM.

Jest exposes globally most DOM APIs available via jsdom. So if your gadget code includes references to `HTMLSpanElement` or `XMLDocument` et al, they'll just work!

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

Or even better, consider using [jsdom-global](https://www.npmjs.com/package/jsdom-global) which injects DOM APIs globally (similar to how Jest does it) and also gives you control over the JSDOM configuration options. Then do `require('mock-mediawiki')` or its ESM equivalent. That is,

```js
require('jsdom-global')(undefined, { /*... jsdom config parameters ...*/ });
require('mock-mediawiki');
```

It is assumed that ESM tests undergo transformation to CommonJS as part of some build step. Use of this package with native Node.js ESM packages is not supported because of its internal reliance on `require()`.

### Notes

If your tests are in TypeScript, you'll need to additionally have [types-mediawiki](https://github.com/wikimedia-gadgets/types-mediawiki).

For using `mw.storage`, you must give JSDOM a URL (for Jest this is done via `testURL` in jest.config.js, for jsdom or jsdom-global, provide `url` param to the constructor). `mock-mediawiki/with-jsdom` sets this to `https://test.wikipedia.org`. If you need it to be something different, consider using jsdom-global or jest instead.

For using `mw.Api` to make API calls from JSDOM, ensure that your JSDOM URL (see above) is on the same domain as the API URL of mw.Api, which can be set explicitly set via its constructor (`api = new mw.Api({ ajax: { url: '<APIURL>' } })`) or implicitly set through `mw.config.get('wgScriptPath')`. Otherwise, you'd get a CORS error. This can also be worked around by using `origin: '*'` in API calls.

It is possible to use `mw.loader` for loading and executing scripts with `runScripts: 'dangerously'` in the JSDOM config (this is on by default in Jest). Do not execute anything from untrusted sources – read more [here](https://github.com/jsdom/jsdom#executing-scripts).

For `mw.language`, [convertGrammar specialisations](https://github.com/wikimedia/mediawiki/tree/master/resources/src/mediawiki.language/languages) for non-English languages aren't included (since whether to load them or not depends on the wgUserLanguage).

Please file an issue if anything doesn't work.
