const path = require("path");
const fs = require("fs");

if (!process.env.MW_PATH) {
	console.error("MW_PATH environment variable must be set to the path to the mediawiki repository");
}

const MOCK_MEDIAWIKI_PATH_PREFIX = path.join(__dirname, 'lib');
const REAL_MEDIAWIKI_PATH_PREFIX = path.join(process.env.MW_PATH, 'resources');

const FILE_MAPPING = {
	'CLDRPluralRuleParser/CLDRPluralRuleParser.js': 'lib/CLDRPluralRuleParser/CLDRPluralRuleParser.js',

	'mediawiki.api/AbortablePromise.js': 'src/mediawiki.api/AbortablePromise.js',
	'mediawiki.api/AbortController.js': 'src/mediawiki.api/AbortController.js',
	'mediawiki.api/category.js': 'src/mediawiki.api/category.js',
	'mediawiki.api/edit.js': 'src/mediawiki.api/edit.js',
	'mediawiki.api/index.js': 'src/mediawiki.api/index.js',
	'mediawiki.api/login.js': 'src/mediawiki.api/login.js',
	'mediawiki.api/messages.js': 'src/mediawiki.api/messages.js',
	'mediawiki.api/options.js': 'src/mediawiki.api/options.js',
	'mediawiki.api/parse.js': 'src/mediawiki.api/parse.js',
	'mediawiki.api/rest.js': 'src/mediawiki.api/rest.js',
	'mediawiki.api/rollback.js': 'src/mediawiki.api/rollback.js',
	'mediawiki.api/upload.js': 'src/mediawiki.api/upload.js',
	'mediawiki.api/user.js': 'src/mediawiki.api/user.js',
	'mediawiki.api/watch.js': 'src/mediawiki.api/watch.js',

	'mediawiki.base/mediawiki.base.js': 'src/mediawiki.base/mediawiki.base.js',
	'mediawiki.base/errorLogger.js': 'src/mediawiki.base/errorLogger.js',
	'mediawiki.base/log.js': 'src/mediawiki.base/log.js',

	'mediawiki.cldr/index.js': 'src/mediawiki.cldr/index.js',

	'mediawiki.cookie/index.js': 'src/mediawiki.cookie/index.js',
	'mediawiki.cookie/jar.js': 'src/mediawiki.cookie/jar.js',
	'mediawiki.cookie/jquery.js': 'src/mediawiki.cookie/jquery.js',
	'mediawiki.cookie/types.js': 'src/mediawiki.cookie/types.js',

	'mediawiki.jqueryMsg/mediawiki.jqueryMsg.js': 'src/mediawiki.jqueryMsg/mediawiki.jqueryMsg.js',

	'mediawiki.language/mediawiki.language.fallback.js': 'src/mediawiki.language/mediawiki.language.fallback.js',
	'mediawiki.language/mediawiki.language.init.js': 'src/mediawiki.language/mediawiki.language.init.js',
	'mediawiki.language/mediawiki.language.js': 'src/mediawiki.language/mediawiki.language.js',
	'mediawiki.language/mediawiki.language.numbers.js': 'src/mediawiki.language/mediawiki.language.numbers.js',

	'mediawiki.language.months/months.js': 'src/mediawiki.language.months/months.js',
	'mediawiki.language.names/names.js': 'src/mediawiki.language.names/names.js',
	'mediawiki.language.specialCharacters/specialCharacters.js': 'src/mediawiki.language.specialCharacters/specialCharacters.js',
	'mediawiki.language.specialCharacters/specialcharacters.json': 'src/mediawiki.language.specialcharacters/specialcharacters.json',

	'mediawiki.storage/index.js': 'src/mediawiki.storage/index.js',
	'mediawiki.storage/SafeStorage.js': 'src/mediawiki.storage/SafeStorage.js',

	'mediawiki.Title/Title.js': 'src/mediawiki.Title/Title.js',
	'mediawiki.Title/phpCharToUpper.json': 'src/mediawiki.Title/phpCharToUpper.json',

	'mediawiki.Uri/Uri.js': 'src/mediawiki.Uri/Uri.js',

	'mediawiki.util/util.js': 'src/mediawiki.util/util.js',
	'mediawiki.util/jquery.accessKeyLabel.js': 'src/mediawiki.util/jquery.accessKeyLabel.js',

	'startup/mediawiki.js': 'src/startup/mediawiki.js',
	'startup/mediawiki.loader.js': 'src/startup/mediawiki.loader.js',
	'startup/mediawiki.requestIdleCallback.js': 'src/startup/mediawiki.requestIdleCallback.js',
	'startup/mediawiki.clientprefs.js': 'src/startup/clientprefs.js',
	'startup/profiler.js': 'src/startup/profiler.js',
	'startup/startup.js': 'src/startup/startup.js',

	'mediawiki.String.js': 'src/mediawiki.String.js',
	'mediawiki.template.js': 'src/mediawiki.template.js',
	'mediawiki.user.js': 'src/mediawiki.user.js',
}

const REPLACEMENTS = [
	{
		file: 'mediawiki.base/mediawiki.base.js',
		pattern: `while ( queue[ 0 ] ) {`,
		replaceWith: 'while ( queue && queue[ 0 ] ) {'
	},
	{
		file: 'mediawiki.cldr/index.js',
		pattern: "require( 'mediawiki.libs.pluralruleparser' )",
		replaceWith: "mw.libs.pluralRuleParser",
	},
	{
		file: 'mediawiki.Title/Title.js',
		pattern: "require( 'mediawiki.String' )",
		replaceWith: "require( '../mediawiki.String' )",
	},
	{
		file: 'mediawiki.jqueryMsg/mediawiki.jqueryMsg.js',
		pattern: "require( 'mediawiki.String' )",
		replaceWith: "require( '../mediawiki.String' )",
	},
	{
		file: 'mediawiki.jqueryMsg/mediawiki.jqueryMsg.js',
		pattern: "require( 'mediawiki.util' )",
		replaceWith: "require( '../mediawiki.util/util' )",
	}
];

for (const [localFile, mwFile] of Object.entries(FILE_MAPPING)) {
	fs.mkdirSync(path.dirname(path.join(MOCK_MEDIAWIKI_PATH_PREFIX, localFile)), { recursive: true });
	fs.copyFileSync(path.join(REAL_MEDIAWIKI_PATH_PREFIX, mwFile), path.join(MOCK_MEDIAWIKI_PATH_PREFIX, localFile));
}

// Apply text substitutions
for (const replacement of REPLACEMENTS) {
	const file = path.join(MOCK_MEDIAWIKI_PATH_PREFIX, replacement.file);
	const content = fs.readFileSync(file, 'utf8');
	const newContent = content.replace(replacement.pattern, replacement.replaceWith);
	fs.writeFileSync(file, newContent, 'utf8');
}
