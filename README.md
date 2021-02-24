## mock-mediawiki

Honest MediaWiki JS interface mocking in Node.js.

No unnecessary changes to original source files. Directly copied from MediaWiki core. 

Licensed under the _Lesser_ General Public License. Can be used from any repository regardless of license. (Note that the same is not true for MW code copied directly from mediawiki core).

## How to use 

### Use with Jest

If you're using Jest's default test environment `jest-environment-jsdom`, just tweak your `jest.config.js` to include:
```
    "setupFilesAfterEnv": ["mock-mediawiki"] 
```

Done! All your Jest test will now have access to `mw` and `$` as globals. This setup works with both CommonJS module format and ESM. 

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

If your tests are in TypeScript, you should additionally install `types-mediawiki` for the type definitions. However, note that types-mediawiki covers more modules, so TypeScript-based IntelliSense can be misleading.

### TODO

[ PRs Welcome ]

- [ ] Add mw.Uri
- [ ] Add mw.language maybe?