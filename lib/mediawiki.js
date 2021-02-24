/**
 * Base library for MediaWiki.
 *
 * Exposed globally as `mw`, with `mediaWiki` as alias.
 *
 * @class mw
 * @singleton
 */
/* global $VARS, $CODE */

( function () {
    'use strict';

    var mw, StringSet, log,
        hasOwn = Object.hasOwnProperty,
        console = window.console;

    /**
     * FNV132 hash function
     *
     * This function implements the 32-bit version of FNV-1.
     * It is equivalent to hash( 'fnv132', ... ) in PHP, except
     * its output is base 36 rather than hex.
     * See <https://en.wikipedia.org/wiki/Fowler–Noll–Vo_hash_function>
     *
     * @private
     * @param {string} str String to hash
     * @return {string} hash as an seven-character base 36 string
     */
    function fnv132( str ) {
        var hash = 0x811C9DC5,
            i = 0;

        /* eslint-disable no-bitwise */
        for ( ; i < str.length; i++ ) {
            hash += ( hash << 1 ) + ( hash << 4 ) + ( hash << 7 ) + ( hash << 8 ) + ( hash << 24 );
            hash ^= str.charCodeAt( i );
        }

        hash = ( hash >>> 0 ).toString( 36 ).slice( 0, 5 );
        while ( hash.length < 5 ) {
            hash = '0' + hash;
        }
        /* eslint-enable no-bitwise */

        return hash;
    }

    function defineFallbacks() {
        // <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set>
        /**
         * @private
         * @class StringSet
         */
        StringSet = window.Set || function () {
            var set = Object.create( null );
            return {
                add: function ( value ) {
                    set[ value ] = true;
                },
                has: function ( value ) {
                    return value in set;
                }
            };
        };
    }

    /**
     * Alias property to the global object.
     *
     * @private
     * @static
     * @member mw.Map
     * @param {mw.Map} map
     * @param {string} key
     * @param {Mixed} value
     */
    function setGlobalMapValue( map, key, value ) {
        map.values[ key ] = value;
        log.deprecate(
            window,
            key,
            value,
            // Deprecation notice for mw.config globals (T58550, T72470)
            map === mw.config && 'Use mw.config instead.'
        );
    }

    /**
     * Log a message to window.console, if possible.
     *
     * Useful to force logging of some errors that are otherwise hard to detect (i.e., this logs
     * also in production mode). Gets console references in each invocation instead of caching the
     * reference, so that debugging tools loaded later are supported (e.g. Firebug Lite in IE).
     *
     * @private
     * @param {string} topic Stream name passed by mw.track
     * @param {Object} data Data passed by mw.track
     * @param {Error} [data.exception]
     * @param {string} data.source Error source
     * @param {string} [data.module] Name of module which caused the error
     */
    function logError( topic, data ) {
        var msg,
            e = data.exception;

        if ( console && console.log ) {
            msg = ( e ? 'Exception' : 'Error' ) +
                ' in ' + data.source +
                ( data.module ? ' in module ' + data.module : '' ) +
                ( e ? ':' : '.' );

            console.log( msg );

            // If we have an exception object, log it to the warning channel to trigger
            // proper stacktraces in browsers that support it.
            if ( e && console.warn ) {
                console.warn( e );
            }
        }
    }

    /**
     * Create an object that can be read from or written to via methods that allow
     * interaction both with single and multiple properties at once.
     *
     * @private
     * @class mw.Map
     *
     * @constructor
     * @param {boolean} [global=false] Whether to synchronise =values to the global
     *  window object (for backwards-compatibility with mw.config; T72470). Values are
     *  copied in one direction only. Changes to globals do not reflect in the map.
     */
    function Map( global ) {
        this.values = Object.create( null );
        if ( global === true ) {
            // Override #set to also set the global variable
            this.set = function ( selection, value ) {
                var s;
                if ( arguments.length > 1 ) {
                    if ( typeof selection === 'string' ) {
                        setGlobalMapValue( this, selection, value );
                        return true;
                    }
                } else if ( typeof selection === 'object' ) {
                    for ( s in selection ) {
                        setGlobalMapValue( this, s, selection[ s ] );
                    }
                    return true;
                }
                return false;
            };
        }
    }

    Map.prototype = {
        constructor: Map,

        /**
         * Get the value of one or more keys.
         *
         * If called with no arguments, all values are returned.
         *
         * @param {string|Array} [selection] Key or array of keys to retrieve values for.
         * @param {Mixed} [fallback=null] Value for keys that don't exist.
         * @return {Mixed|Object|null} If selection was a string, returns the value,
         *  If selection was an array, returns an object of key/values.
         *  If no selection is passed, a new object with all key/values is returned.
         */
        get: function ( selection, fallback ) {
            var results, i;
            fallback = arguments.length > 1 ? fallback : null;

            if ( Array.isArray( selection ) ) {
                results = {};
                for ( i = 0; i < selection.length; i++ ) {
                    if ( typeof selection[ i ] === 'string' ) {
                        results[ selection[ i ] ] = selection[ i ] in this.values ?
                            this.values[ selection[ i ] ] :
                            fallback;
                    }
                }
                return results;
            }

            if ( typeof selection === 'string' ) {
                return selection in this.values ?
                    this.values[ selection ] :
                    fallback;
            }

            if ( selection === undefined ) {
                results = {};
                for ( i in this.values ) {
                    results[ i ] = this.values[ i ];
                }
                return results;
            }

            // Invalid selection key
            return fallback;
        },

        /**
         * Set one or more key/value pairs.
         *
         * @param {string|Object} selection Key to set value for, or object mapping keys to values
         * @param {Mixed} [value] Value to set (optional, only in use when key is a string)
         * @return {boolean} True on success, false on failure
         */
        set: function ( selection, value ) {
            var s;
            // Use `arguments.length` because `undefined` is also a valid value.
            if ( arguments.length > 1 ) {
                // Set one key
                if ( typeof selection === 'string' ) {
                    this.values[ selection ] = value;
                    return true;
                }
            } else if ( typeof selection === 'object' ) {
                // Set multiple keys
                for ( s in selection ) {
                    this.values[ s ] = selection[ s ];
                }
                return true;
            }
            return false;
        },

        /**
         * Check if a given key exists in the map.
         *
         * @param {string} selection Key to check
         * @return {boolean} True if the key exists
         */
        exists: function ( selection ) {
            return typeof selection === 'string' && selection in this.values;
        }
    };

    defineFallbacks();

    /**
     * Write a verbose message to the browser's console in debug mode.
     *
     * This method is mainly intended for verbose logging. It is a no-op in production mode.
     * In ResourceLoader debug mode, it will use the browser's console if available.
     *
     * See {@link mw.log} for other logging methods.
     *
     * @member mw
     * @param {...string} msg Messages to output to console.
     */
    log = function () {};

    // Note: Keep list of log methods in sync with restoration in mediawiki.log.js!

    /**
     * Collection of methods to help log messages to the console.
     *
     * @class mw.log
     * @singleton
     */

    /**
     * Write a message to the browser console's warning channel.
     *
     * This method is a no-op in browsers that don't implement the Console API.
     *
     * @param {...string} msg Messages to output to console
     */
    log.warn = console && console.warn ?
        Function.prototype.bind.call( console.warn, console ) :
        function () {};

    /**
     * Write a message to the browser console's error channel.
     *
     * Most browsers also print a stacktrace when calling this method if the
     * argument is an Error object.
     *
     * This method is a no-op in browsers that don't implement the Console API.
     *
     * @since 1.26
     * @param {...Mixed} msg Messages to output to console
     */
    log.error = console && console.error ?
        Function.prototype.bind.call( console.error, console ) :
        function () {};

    /**
     * Create a property on a host object that, when accessed, will produce
     * a deprecation warning in the console.
     *
     * @param {Object} obj Host object of deprecated property
     * @param {string} key Name of property to create in `obj`
     * @param {Mixed} val The value this property should return when accessed
     * @param {string} [msg] Optional text to include in the deprecation message
     * @param {string} [logName] Name for the feature for logging and tracking
     *  purposes. Except for properties of the window object, tracking is only
     *  enabled if logName is set.
     */
    log.deprecate = function ( obj, key, val, msg, logName ) {
        var stacks;
        function maybeLog() {
            var name = logName || key,
                trace = new Error().stack;
            if ( !stacks ) {
                stacks = new StringSet();
            }
            if ( !stacks.has( trace ) ) {
                stacks.add( trace );
                if ( logName || obj === window ) {
                    mw.track( 'mw.deprecate', name );
                }
                mw.log.warn(
                    'Use of "' + name + '" is deprecated.' + ( msg ? ' ' + msg : '' )
                );
            }
        }
        // Support: Safari 5.0
        // Throws "not supported on DOM Objects" for Node or Element objects (incl. document)
        // Safari 4.0 doesn't have this method, and it was fixed in Safari 5.1.
        try {
            Object.defineProperty( obj, key, {
                configurable: true,
                enumerable: true,
                get: function () {
                    maybeLog();
                    return val;
                },
                set: function ( newVal ) {
                    maybeLog();
                    val = newVal;
                }
            } );
        } catch ( err ) {
            obj[ key ] = val;
        }
    };

    /**
     * @class mw
     */
    mw = {
        redefineFallbacksForTest: window.QUnit && defineFallbacks,

        /**
         * Get the current time, measured in milliseconds since January 1, 1970 (UTC).
         *
         * On browsers that implement the Navigation Timing API, this function will produce
         * floating-point values with microsecond precision that are guaranteed to be monotonic.
         * On all other browsers, it will fall back to using `Date`.
         *
         * @return {number} Current time
         */
        now: function () {
            // Optimisation: Make startup initialisation faster by defining the
            // shortcut on first call, not at module definition.
            var perf = window.performance,
                navStart = perf && perf.timing && perf.timing.navigationStart;

            // Define the relevant shortcut
            mw.now = navStart && perf.now ?
                function () { return navStart + perf.now(); } :
                Date.now;

            return mw.now();
        },

        /**
         * List of all analytic events emitted so far.
         *
         * Exposed only for use by mediawiki.base.
         *
         * @private
         * @property {Array}
         */
        trackQueue: [],

        track: function ( topic, data ) {
            mw.trackQueue.push( { topic: topic, data: data } );
            // This method is extended by mediawiki.base to also fire events.
        },

        /**
         * Track an early error event via mw.track and send it to the window console.
         *
         * @private
         * @param {string} topic Topic name
         * @param {Object} data Data describing the event, encoded as an object; see mw#logError
         */
        trackError: function ( topic, data ) {
            mw.track( topic, data );
            logError( topic, data );
        },

        // Expose Map constructor
        Map: Map,

        /**
         * Map of configuration values.
         *
         * Check out [the complete list of configuration values](https://www.mediawiki.org/wiki/Manual:Interface/JavaScript#mw.config)
         * on mediawiki.org.
         *
         * If `$wgLegacyJavaScriptGlobals` is true, this Map will add its values to the
         * global `window` object.
         *
         * @property {mw.Map} config
         */
        config: new Map( $VARS.wgLegacyJavaScriptGlobals ),

        /**
         * Store for messages.
         *
         * @property {mw.Map}
         */
        messages: new Map(),

        /**
         * Store for templates associated with a module.
         *
         * @property {mw.Map}
         */
        templates: new Map(),

        // Expose mw.log
        log: log,

        // MOCK-MEDIAWIKI: mw.loader can't do anything in node, we stub everything
        // with empty functions
        /**
         * Client for ResourceLoader server end point.
         *
         * This client is in charge of maintaining the module registry and state
         * machine, initiating network (batch) requests for loading modules, as
         * well as dependency resolution and execution of source code.
         *
         * For more information, refer to
         * <https://www.mediawiki.org/wiki/ResourceLoader/Features>
         *
         * @class mw.loader
         * @singleton
         */
        loader: {
            addStyleTag: function () { return document.createElement('script') },
            getModuleNames: function () { return []; },
            getScript: function () {},
            load: function () {},
            register: function () {},
            state: function () {},
            using: function () { return $.Deferred().resolve(); }
        }
    };

    // Attach to window and globally alias
    window.mw = window.mediaWiki = mw;
}() );