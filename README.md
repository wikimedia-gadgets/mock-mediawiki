## mock-mediawiki
![Node.js CI](https://github.com/wikimedia-gadgets/mock-mediawiki/workflows/test/badge.svg)
[![NPM version](https://img.shields.io/npm/v/mock-mediawiki.svg)](https://www.npmjs.com/package/mock-mediawiki)

Honest MediaWiki JS interface mocking in Node.js.

No unnecessary changes to the original source files. Directly copied from MediaWiki core with [bare minimum modifications](https://github.com/wikimedia-gadgets/mock-mediawiki/blob/main/PATCHES.md). Currently includes mw.config, mw.util, and mw.Title. jQuery is also included from the npm package.

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

### Use with other test runners

Other test runners don't usually have jsdom integrated. You need to install jsdom separately (`npm i -D jsdom`) and then include the following in your test files:

CommonJS:
```js
require('mock-mediawiki/with-jsdom');
```

ESM:
```js
import 'mock-mediawiki/with-jsdom';
```
It is assumed that ESM tests undergo transformation to CommonJS as part of some build step. Use of this package with native Node.js ESM packages is not supported because of its internal reliance on `require()`.

----

If your tests are in TypeScript, you'll need to additionally have [types-mediawiki](https://github.com/wikimedia-gadgets/types-mediawiki). However, note that types-mediawiki covers type definitions for more modules, so TypeScript-based IntelliSense could be somewhat misleading.

Please file an issue if anything doesn't work.

### To-do

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

- [ ] Add mw.Uri
- [ ] Add mw.language maybe?