/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	/*global THREE*/
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _jquery = __webpack_require__(/*! jquery */ 1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(/*! OrbitControls */ 2);
	
	// import FaceTracker from './facetracker'
	
	var _face = __webpack_require__(/*! ./face */ 3);
	
	var _face2 = _interopRequireDefault(_face);
	
	__webpack_require__(/*! ./main.sass */ 39);
	
	document.body.innerHTML = __webpack_require__(/*! ./body.jade */ 43)();
	
	var toTypedArray = function toTypedArray(type, array) {
	  var typed = new type(array.length);
	  array.forEach(function (v, i) {
	    return typed[i] = v;
	  });
	  return typed;
	};
	
	var ExportApp = (function () {
	  function ExportApp() {
	    _classCallCheck(this, ExportApp);
	
	    this.animate = this.animate.bind(this);
	
	    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000);
	    this.camera.position.z = 400;
	
	    this.controls = new THREE.OrbitControls(this.camera);
	
	    this.scene = new THREE.Scene();
	
	    this.renderer = new THREE.WebGLRenderer();
	    this.renderer.setSize(window.innerWidth, window.innerHeight);
	
	    var container = document.querySelector('.container');
	    container.appendChild(this.renderer.domElement);
	
	    this.face = new _face2['default']();
	    this.face.scale.set(200, 200, 200);
	    this.scene.add(this.face);
	
	    this.convert();
	
	    window.addEventListener('resize', this.onResize.bind(this));
	
	    this.animate();
	  }
	
	  _createClass(ExportApp, [{
	    key: 'convert',
	    value: function convert() {
	      var data = encodeURIComponent(JSON.stringify(this.face['export']()));
	      (0, _jquery2['default'])('<a class="download" href="data:application/json,' + data + '" download="face2.json">Download JSON</a>').appendTo(document.body);
	    }
	  }, {
	    key: 'animate',
	    value: function animate(t) {
	      requestAnimationFrame(this.animate);
	
	      // this.face.animate(t)
	
	      this.controls.update();
	      this.renderer.render(this.scene, this.camera);
	    }
	  }, {
	    key: 'onResize',
	    value: function onResize() {
	      this.camera.aspect = window.innerWidth / window.innerHeight;
	      this.camera.updateProjectionMatrix();
	      this.renderer.setSize(window.innerWidth, window.innerHeight);
	    }
	  }]);
	
	  return ExportApp;
	})();
	
	var ImportApp = (function () {
	  function ImportApp() {
	    _classCallCheck(this, ImportApp);
	
	    this.animate = this.animate.bind(this);
	
	    this.initScene();
	    this.initObjects();
	
	    this.animate();
	  }
	
	  _createClass(ImportApp, [{
	    key: 'initScene',
	    value: function initScene() {
	      this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000);
	      this.camera.position.z = 400;
	
	      this.controls = new THREE.OrbitControls(this.camera);
	
	      this.scene = new THREE.Scene();
	
	      this.renderer = new THREE.WebGLRenderer();
	      this.renderer.setSize(window.innerWidth, window.innerHeight);
	
	      var container = document.querySelector('.container');
	      container.appendChild(this.renderer.domElement);
	
	      window.addEventListener('resize', this.onResize.bind(this));
	    }
	  }, {
	    key: 'initObjects',
	    value: function initObjects() {
	      var data = __webpack_require__(/*! ./data/face2.json */ 49);
	
	      var position = toTypedArray(Float32Array, data.face.position);
	      // let index = toTypedArray(Uint16Array, data.face.index)
	      // console.log(data.mouth.index)
	      var index = new Uint16Array(data.face.index.length + data.rightEye.index.length + data.leftEye.index.length + data.mouth.index.length);
	      data.face.index.forEach(function (i, j) {
	        return index[j] = i;
	      });
	      var offset = data.face.index.length;
	      data.rightEye.index.forEach(function (i, j) {
	        return index[j + offset] = i;
	      });
	      offset += data.rightEye.index.length;
	      data.leftEye.index.forEach(function (i, j) {
	        return index[j + offset] = i;
	      });
	      offset += data.leftEye.index.length;
	      data.mouth.index.forEach(function (i, j) {
	        return index[j + offset] = i;
	      });
	
	      var geometry = new THREE.BufferGeometry();
	      geometry.dynamic = true;
	      geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));
	      geometry.setIndex(new THREE.BufferAttribute(index, 1));
	
	      var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
	
	      this.face = new THREE.Mesh(geometry, material);
	      this.face.scale.set(200, 200, 200);
	      this.scene.add(this.face);
	    }
	  }, {
	    key: 'animate',
	    value: function animate(t) {
	      requestAnimationFrame(this.animate);
	
	      // this.face.animate(t)
	
	      this.controls.update();
	      this.renderer.render(this.scene, this.camera);
	    }
	  }, {
	    key: 'onResize',
	    value: function onResize() {
	      this.camera.aspect = window.innerWidth / window.innerHeight;
	      this.camera.updateProjectionMatrix();
	      this.renderer.setSize(window.innerWidth, window.innerHeight);
	    }
	  }]);
	
	  return ImportApp;
	})();
	
	new ExportApp();
	// new ImportApp()

/***/ },
/* 1 */
/*!*********************************!*\
  !*** ./~/jquery/dist/jquery.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.1.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-04-28T16:01Z
	 */
	
	(function( global, factory ) {
	
		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}
	
	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//
	
	var arr = [];
	
	var slice = arr.slice;
	
	var concat = arr.concat;
	
	var push = arr.push;
	
	var indexOf = arr.indexOf;
	
	var class2type = {};
	
	var toString = class2type.toString;
	
	var hasOwn = class2type.hasOwnProperty;
	
	var support = {};
	
	
	
	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,
	
		version = "2.1.4",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	
		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
	
	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// Start with an empty selector
		selector: "",
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?
	
				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :
	
				// Return all the elements in a clean array
				slice.call( this );
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor(null);
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},
	
		isArray: Array.isArray,
	
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},
	
		isNumeric: function( obj ) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		},
	
		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}
	
			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
	
			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},
	
		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call(obj) ] || "object" :
				typeof obj;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;
	
			code = jQuery.trim( code );
	
			if ( code ) {
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf("use strict") === 1 ) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval
					indirect( code );
				}
			}
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
	
		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );
	
			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );
	
						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );
	
						if ( value === false ) {
							break;
						}
					}
				}
	
			// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );
	
						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );
	
						if ( value === false ) {
							break;
						}
					}
				}
			}
	
			return obj;
		},
	
		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;
	
			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
			return proxy;
		},
	
		now: Date.now,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});
	
	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	
	function isArraylike( obj ) {
	
		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = "length" in obj && obj.length,
			type = jQuery.type( obj );
	
		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}
	
		if ( obj.nodeType === 1 && length ) {
			return true;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.0-pre
	 * http://sizzlejs.com/
	 *
	 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-12-16
	 */
	(function( window ) {
	
	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,
	
		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
	
		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},
	
		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,
	
		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},
	
		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
		// Regular expressions
	
		// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	
		// Loosely modeled on CSS identifier characters
		// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace( "w", "w#" ),
	
		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",
	
		pseudos = ":(" + characterEncoding + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",
	
		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),
	
		matchExpr = {
			"ID": new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},
	
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,
	
		rnative = /^[^{]+\{\s*\[native \w/,
	
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
		rsibling = /[+~]/,
		rescape = /'|\\/g,
	
		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},
	
		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};
	
	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?
	
			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :
	
			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}
	
	function Sizzle( selector, context, results, seed ) {
		var match, elem, m, nodeType,
			// QSA vars
			i, groups, old, nid, newContext, newSelector;
	
		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
	
		context = context || document;
		results = results || [];
		nodeType = context.nodeType;
	
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
	
			return results;
		}
	
		if ( !seed && documentIsHTML ) {
	
			// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
				// Speed-up: Sizzle("#ID")
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						elem = context.getElementById( m );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document (jQuery #6963)
						if ( elem && elem.parentNode ) {
							// Handle the case where IE, Opera, and Webkit return items
							// by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						// Context is not a document
						if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
							contains( context, elem ) && elem.id === m ) {
							results.push( elem );
							return results;
						}
					}
	
				// Speed-up: Sizzle("TAG")
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;
	
				// Speed-up: Sizzle(".CLASS")
				} else if ( (m = match[3]) && support.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}
	
			// QSA path
			if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType !== 1 && selector;
	
				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );
	
					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";
	
					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + toSelector( groups[i] );
					}
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
					newSelector = groups.join(",");
				}
	
				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}
	
		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];
	
		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");
	
		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = attrs.length;
	
		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );
	
		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}
	
		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}
	
		return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;
	
				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}
	
	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;
	
		// If no document and documentElement is available, return
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	
		// Set our document
		document = doc;
		docElem = doc.documentElement;
		parent = doc.defaultView;
	
		// Support: IE>8
		// If iframe document is assigned to "document" variable and if iframe has been reloaded,
		// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
		// IE6-8 do not support the defaultView property so parent will be undefined
		if ( parent && parent !== parent.top ) {
			// IE11 does not have attachEvent, so all must suffer
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}
	
		/* Support tests
		---------------------------------------------------------------------- */
		documentIsHTML = !isXML( doc );
	
		/* Attributes
		---------------------------------------------------------------------- */
	
		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});
	
		/* getElement(s)By*
		---------------------------------------------------------------------- */
	
		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( doc.createComment("") );
			return !div.getElementsByTagName("*").length;
		});
	
		// Support: IE<9
		support.getElementsByClassName = rnative.test( doc.getElementsByClassName );
	
		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
		});
	
		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];
	
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}
	
		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );
	
				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :
	
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );
	
				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}
	
					return tmp;
				}
				return results;
			};
	
		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};
	
		/* QSA/matchesSelector
		---------------------------------------------------------------------- */
	
		// QSA and matchesSelector support
	
		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];
	
		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];
	
		if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\f]' msallowcapture=''>" +
					"<option selected=''></option></select>";
	
				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}
	
				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}
	
				// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}
	
				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
	
				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});
	
			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = doc.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );
	
				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}
	
				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}
	
		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {
	
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );
	
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}
	
		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );
	
		// Element contains another
		// Purposefully does not implement inclusive descendent
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};
	
		/* Sorting
		---------------------------------------------------------------------- */
	
		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {
	
			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}
	
			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :
	
				// Otherwise we know they are disconnected
				1;
	
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
				// Choose the first element that is related to our preferred document
				if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}
	
				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}
	
			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];
	
			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === doc ? -1 :
					b === doc ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
	
			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}
	
			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}
	
			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}
	
			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :
	
				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};
	
		return doc;
	};
	
	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );
	
		if ( support.matchesSelector && documentIsHTML &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
			try {
				var ret = matches.call( elem, expr );
	
				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}
	
		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;
	
		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;
	
		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );
	
		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}
	
		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;
	
		return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;
	
		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	
		return ret;
	};
	
	Expr = Sizzle.selectors = {
	
		// Can be adjusted by the user
		cacheLength: 50,
	
		createPseudo: markFunction,
	
		match: matchExpr,
	
		attrHandle: {},
	
		find: {},
	
		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},
	
		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );
	
				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
	
				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}
	
				return match.slice( 0, 4 );
			},
	
			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();
	
				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}
	
					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}
	
				return match;
			},
	
			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];
	
				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}
	
				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";
	
				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}
	
				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},
	
		filter: {
	
			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},
	
			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];
	
				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},
	
			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );
	
					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}
	
					result += "";
	
					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},
	
			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";
	
				return first === 1 && last === 0 ?
	
					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :
	
					function( elem, context, xml ) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;
	
						if ( parent ) {
	
							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}
	
							start = [ forward ? parent.firstChild : parent.lastChild ];
	
							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || (parent[ expando ] = {});
								cache = outerCache[ type ] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[ nodeIndex ];
	
								while ( (node = ++nodeIndex && node && node[ dir ] ||
	
									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}
	
							// Use previously-cached element index if available
							} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
								diff = cache[1];
	
							// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
							} else {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
										}
	
										if ( node === elem ) {
											break;
										}
									}
								}
							}
	
							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},
	
			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );
	
				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}
	
				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}
	
				return fn;
			}
		},
	
		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );
	
				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;
	
						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),
	
			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),
	
			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),
	
			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),
	
			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},
	
			"root": function( elem ) {
				return elem === docElem;
			},
	
			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},
	
			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},
	
			"disabled": function( elem ) {
				return elem.disabled === true;
			},
	
			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},
	
			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},
	
			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},
	
			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},
	
			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},
	
			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},
	
			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
	
					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},
	
			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),
	
			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),
	
			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),
	
			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];
	
		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}
	
		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;
	
		while ( soFar ) {
	
			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}
	
			matched = false;
	
			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}
	
			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}
	
			if ( !matched ) {
				break;
			}
		}
	
		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};
	
	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;
	
		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :
	
			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, outerCache,
					newCache = [ dirruns, doneName ];
	
				// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
							if ( (oldCache = outerCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
	
								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								outerCache[ dir ] = newCache;
	
								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}
	
	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}
	
	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}
	
	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;
	
		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}
	
		return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,
	
				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,
	
				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
						// ...intermediate processing is necessary
						[] :
	
						// ...otherwise use results directly
						results :
					matcherIn;
	
			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}
	
			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );
	
				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}
	
			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}
	
					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
	
							seed[temp] = !(results[temp] = elem);
						}
					}
				}
	
			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}
	
	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,
	
			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];
	
		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}
	
		return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;
	
				if ( outermost ) {
					outermostContext = context !== document && context;
				}
	
				// Add elements passing elementMatchers directly to results
				// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}
	
					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}
	
						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}
	
				// Apply set filters to unmatched elements
				matchedCount += i;
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}
	
					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}
	
						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}
	
					// Add matches to results
					push.apply( results, setMatched );
	
					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {
	
						Sizzle.uniqueSort( results );
					}
				}
	
				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}
	
				return unmatched;
			};
	
		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];
	
		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}
	
			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	
			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};
	
	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );
	
		results = results || [];
	
		// Try to minimize operations if there is no seed and only one group
		if ( match.length === 1 ) {
	
			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {
	
				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
	
				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}
	
				selector = selector.slice( tokens.shift().value.length );
			}
	
			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];
	
				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {
	
						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}
	
						break;
					}
				}
			}
		}
	
		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}
	
	return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
	
	
	
	var risSimple = /^.[^:#\[\.,]*$/;
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			});
	
		}
	
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			});
	
		}
	
		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}
	
			qualifier = jQuery.filter( qualifier, elements );
		}
	
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
		});
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	};
	
	jQuery.fn.extend({
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector || [], false) );
		},
		not: function( selector ) {
			return this.pushStack( winnow(this, selector || [], true) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	});
	
	
	// Initialize a jQuery object
	
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	
		init = jQuery.fn.init = function( selector, context ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;
	
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );
	
						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}
	
						this.context = document;
						this.selector = selector;
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready( selector ) :
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.extend({
		dir: function( elem, dir, until ) {
			var matched = [],
				truncate = until !== undefined;
	
			while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
				if ( elem.nodeType === 1 ) {
					if ( truncate && jQuery( elem ).is( until ) ) {
						break;
					}
					matched.push( elem );
				}
			}
			return matched;
		},
	
		sibling: function( n, elem ) {
			var matched = [];
	
			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}
	
			return matched;
		}
	});
	
	jQuery.fn.extend({
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter(function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;
	
			for ( ; i < l; i++ ) {
				for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :
	
						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors)) ) {
	
						matched.push( cur );
						break;
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
		},
	
		// Determine the position of an element within the set
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.unique(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});
	
	function sibling( cur, dir ) {
		while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.unique( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	});
	var rnotwhite = (/\S+/g);
	
	
	
	// String to Object options format cache
	var optionsCache = {};
	
	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );
	
		var // Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( list && ( !fired || stack ) ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	jQuery.extend({
	
		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Keep pipe for back-compat
			promise.pipe = promise.then;
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];
	
				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;
	
					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}
	
				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,
	
				// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
	
				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
	
				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},
	
				progressValues, progressContexts, resolveContexts;
	
			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}
	
			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}
	
			return deferred.promise();
		}
	});
	
	
	// The deferred used on DOM ready
	var readyList;
	
	jQuery.fn.ready = function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );
	
		return this;
	};
	
	jQuery.extend({
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},
	
		// Handle when the DOM is ready
		ready: function( wait ) {
	
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}
	
			// Remember that the DOM is ready
			jQuery.isReady = true;
	
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}
	
			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
	
			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	});
	
	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	}
	
	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {
	
			readyList = jQuery.Deferred();
	
			// Catch cases where $(document).ready() is called after the browser event has already occurred.
			// We once tried to use readyState "interactive" here, but it caused issues like the one
			// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				setTimeout( jQuery.ready );
	
			} else {
	
				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed, false );
	
				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed, false );
			}
		}
		return readyList.promise( obj );
	};
	
	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();
	
	
	
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}
	
		return chainable ?
			elems :
	
			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[0], key ) : emptyGet;
	};
	
	
	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function( owner ) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	
	function Data() {
		// Support: Android<4,
		// Old WebKit does not have Object.preventExtensions/freeze method,
		// return new empty object instead with no [[set]] accessor
		Object.defineProperty( this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});
	
		this.expando = jQuery.expando + Data.uid++;
	}
	
	Data.uid = 1;
	Data.accepts = jQuery.acceptData;
	
	Data.prototype = {
		key: function( owner ) {
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return the key for a frozen object.
			if ( !Data.accepts( owner ) ) {
				return 0;
			}
	
			var descriptor = {},
				// Check if the owner object already has a cache key
				unlock = owner[ this.expando ];
	
			// If not, create one
			if ( !unlock ) {
				unlock = Data.uid++;
	
				// Secure it in a non-enumerable, non-writable property
				try {
					descriptor[ this.expando ] = { value: unlock };
					Object.defineProperties( owner, descriptor );
	
				// Support: Android<4
				// Fallback to a less secure definition
				} catch ( e ) {
					descriptor[ this.expando ] = unlock;
					jQuery.extend( owner, descriptor );
				}
			}
	
			// Ensure the cache object
			if ( !this.cache[ unlock ] ) {
				this.cache[ unlock ] = {};
			}
	
			return unlock;
		},
		set: function( owner, data, value ) {
			var prop,
				// There may be an unlock assigned to this node,
				// if there is no entry for this "owner", create one inline
				// and set the unlock as though an owner entry had always existed
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];
	
			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
				// Fresh assignments by object are shallow copied
				if ( jQuery.isEmptyObject( cache ) ) {
					jQuery.extend( this.cache[ unlock ], data );
				// Otherwise, copy the properties one-by-one to the cache object
				} else {
					for ( prop in data ) {
						cache[ prop ] = data[ prop ];
					}
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			// Either a valid cache is found, or will be created.
			// New caches will be created and the unlock returned,
			// allowing direct access to the newly created
			// empty data object. A valid owner object must be provided.
			var cache = this.cache[ this.key( owner ) ];
	
			return key === undefined ?
				cache : cache[ key ];
		},
		access: function( owner, key, value ) {
			var stored;
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					((key && typeof key === "string") && value === undefined) ) {
	
				stored = this.get( owner, key );
	
				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase(key) );
			}
	
			// [*]When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];
	
			if ( key === undefined ) {
				this.cache[ unlock ] = {};
	
			} else {
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}
	
				i = name.length;
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
		},
		hasData: function( owner ) {
			return !jQuery.isEmptyObject(
				this.cache[ owner[ this.expando ] ] || {}
			);
		},
		discard: function( owner ) {
			if ( owner[ this.expando ] ) {
				delete this.cache[ owner[ this.expando ] ];
			}
		}
	};
	var data_priv = new Data();
	
	var data_user = new Data();
	
	
	
	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
	
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;
	
	function dataAttr( elem, key, data ) {
		var name;
	
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch( e ) {}
	
				// Make sure we set the data so it isn't changed later
				data_user.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}
	
	jQuery.extend({
		hasData: function( elem ) {
			return data_user.hasData( elem ) || data_priv.hasData( elem );
		},
	
		data: function( elem, name, data ) {
			return data_user.access( elem, name, data );
		},
	
		removeData: function( elem, name ) {
			data_user.remove( elem, name );
		},
	
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to data_priv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return data_priv.access( elem, name, data );
		},
	
		_removeData: function( elem, name ) {
			data_priv.remove( elem, name );
		}
	});
	
	jQuery.fn.extend({
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = data_user.get( elem );
	
					if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {
	
							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice(5) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						data_priv.set( elem, "hasDataAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					data_user.set( this, key );
				});
			}
	
			return access( this, function( value ) {
				var data,
					camelKey = jQuery.camelCase( key );
	
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
					// Attempt to get data from the cache
					// with the key as-is
					data = data_user.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to get data from the cache
					// with the key camelized
					data = data_user.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}
	
					// We tried really hard, but the data doesn't exist.
					return;
				}
	
				// Set the data...
				this.each(function() {
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = data_user.get( this, camelKey );
	
					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					data_user.set( this, camelKey, value );
	
					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf("-") !== -1 && data !== undefined ) {
						data_user.set( this, key, value );
					}
				});
			}, null, value, arguments.length > 1, null, true );
		},
	
		removeData: function( key ) {
			return this.each(function() {
				data_user.remove( this, key );
			});
		}
	});
	
	
	jQuery.extend({
		queue: function( elem, type, data ) {
			var queue;
	
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = data_priv.get( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = data_priv.access( elem, type, jQuery.makeArray(data) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}
	
			if ( fn ) {
	
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}
	
			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},
	
		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return data_priv.get( elem, key ) || data_priv.access( elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove( elem, [ type + "queue", key ] );
				})
			});
		}
	});
	
	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}
	
			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );
	
					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );
	
					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};
	
			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
	
			while ( i-- ) {
				tmp = data_priv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
	
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	var isHidden = function( elem, el ) {
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
		};
	
	var rcheckableType = (/^(?:checkbox|radio)$/i);
	
	
	
	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );
	
		// Support: Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
	
		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	})();
	var strundefined = typeof undefined;
	
	
	
	support.focusinBubbles = "onfocusin" in window;
	
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.hasData( elem ) && data_priv.get( elem );
	
			if ( !elemData || !(events = elemData.events) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;
				data_priv.remove( elem, "events" );
			}
		},
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];
	
			cur = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {
	
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
					jQuery.acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		dispatch: function( event ) {
	
			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );
	
			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.disabled !== true || event.type !== "click" ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}
	
			return handlerQueue;
		},
	
		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
	
		fixHooks: {},
	
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {
	
				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}
	
				return event;
			}
		},
	
		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;
	
				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
	
					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}
	
				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}
	
				return event;
			}
		},
	
		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}
	
			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];
	
			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
	
			event = new jQuery.Event( originalEvent );
	
			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}
	
			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}
	
			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}
	
			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},
	
		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},
	
		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	};
	
	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e && e.preventDefault ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e && e.stopPropagation ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
	
			this.isImmediatePropagationStopped = returnTrue;
	
			if ( e && e.stopImmediatePropagation ) {
				e.stopImmediatePropagation();
			}
	
			this.stopPropagation();
		}
	};
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// Support: Chrome 15+
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});
	
	// Support: Firefox, Chrome, Safari
	// Create "bubbling" focus and blur events
	if ( !support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						data_priv.remove( doc, fix );
	
					} else {
						data_priv.access( doc, fix, attaches );
					}
				}
			};
		});
	}
	
	jQuery.fn.extend({
	
		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;
	
			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}
	
			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}
	
			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},
	
		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	});
	
	
	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	
		// We have to close these tags to support XHTML (#13200)
		wrapMap = {
	
			// Support: IE9
			option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
			thead: [ 1, "<table>", "</table>" ],
			col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
			_default: [ 0, "", "" ]
		};
	
	// Support: IE9
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	// Support: 1.x compatibility
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?
	
			elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
			elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
	
		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute("type");
		}
	
		return elem;
	}
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			data_priv.set(
				elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( data_priv.hasData( src ) ) {
			pdataOld = data_priv.access( src );
			pdataCur = data_priv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( data_user.hasData( src ) ) {
			udataOld = data_user.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			data_user.set( dest, udataCur );
		}
	}
	
	function getAll( context, tag ) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
				context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
				[];
	
		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}
	
	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		buildFragment: function( elems, context, scripts, selection ) {
			var elem, tmp, tag, wrap, contains, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;
	
			for ( ; i < l; i++ ) {
				elem = elems[ i ];
	
				if ( elem || elem === 0 ) {
	
					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );
	
					// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild( context.createElement("div") );
	
						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;
						tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];
	
						// Descend through wrappers to the right content
						j = wrap[ 0 ];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}
	
						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, tmp.childNodes );
	
						// Remember the top-level container
						tmp = fragment.firstChild;
	
						// Ensure the created nodes are orphaned (#12392)
						tmp.textContent = "";
					}
				}
			}
	
			// Remove wrapper from fragment
			fragment.textContent = "";
	
			i = 0;
			while ( (elem = nodes[ i++ ]) ) {
	
				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}
	
				contains = jQuery.contains( elem.ownerDocument, elem );
	
				// Append to fragment
				tmp = getAll( fragment.appendChild( elem ), "script" );
	
				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}
	
				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}
	
			return fragment;
		},
	
		cleanData: function( elems ) {
			var data, elem, type, key,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
				if ( jQuery.acceptData( elem ) ) {
					key = elem[ data_priv.expando ];
	
					if ( key && (data = data_priv.cache[ key ]) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
						if ( data_priv.cache[ key ] ) {
							// Discard any remaining `private` data
							delete data_priv.cache[ key ];
						}
					}
				}
				// Discard any remaining `user` data
				delete data_user.cache[ elem[ data_user.expando ] ];
			}
		}
	});
	
	jQuery.fn.extend({
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each(function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length );
		},
	
		append: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			});
		},
	
		prepend: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			});
		},
	
		before: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},
	
		after: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},
	
		remove: function( selector, keepData /* Internal Use Only */ ) {
			var elem,
				elems = selector ? jQuery.filter( selector, this ) : this,
				i = 0;
	
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}
	
				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}
	
			return this;
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; (elem = this[i]) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map(function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = value.replace( rxhtmlTag, "<$1></$2>" );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var arg = arguments[ 0 ];
	
			// Make the changes, replacing each context element with the new content
			this.domManip( arguments, function( elem ) {
				arg = this.parentNode;
	
				jQuery.cleanData( getAll( this ) );
	
				if ( arg ) {
					arg.replaceChild( elem, this );
				}
			});
	
			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},
	
		detach: function( selector ) {
			return this.remove( selector, true );
		},
	
		domManip: function( args, callback ) {
	
			// Flatten any nested arrays
			args = concat.apply( [], args );
	
			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[ 0 ],
				isFunction = jQuery.isFunction( value );
	
			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction ||
					( l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[ 0 ] = value.call( this, index, self.html() );
					}
					self.domManip( args, callback );
				});
			}
	
			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;
	
				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}
	
				if ( first ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;
	
					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;
	
						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );
	
							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								// Support: QtWebKit
								// jQuery.merge because push.apply(_, arraylike) throws
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}
	
						callback.call( this[ i ], node, i );
					}
	
					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;
	
						// Reenable scripts
						jQuery.map( scripts, restoreScript );
	
						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {
	
								if ( node.src ) {
									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl ) {
										jQuery._evalUrl( node.src );
									}
								} else {
									jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
								}
							}
						}
					}
				}
			}
	
			return this;
		}
	});
	
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	});
	
	
	var iframe,
		elemdisplay = {};
	
	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var style,
			elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
	
			// getDefaultComputedStyle might be reliably used only on attached element
			display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?
	
				// Use of this method is a temporary fix (more like optimization) until something better comes along,
				// since it was removed from specification and supported only in FF
				style.display : jQuery.css( elem[ 0 ], "display" );
	
		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();
	
		return display;
	}
	
	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];
	
		if ( !display ) {
			display = actualDisplay( nodeName, doc );
	
			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {
	
				// Use the already-created iframe if possible
				iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );
	
				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;
	
				// Support: IE
				doc.write();
				doc.close();
	
				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}
	
			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}
	
		return display;
	}
	var rmargin = (/^margin/);
	
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
	
	var getStyles = function( elem ) {
			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			if ( elem.ownerDocument.defaultView.opener ) {
				return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
			}
	
			return window.getComputedStyle( elem, null );
		};
	
	
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;
	
		computed = computed || getStyles( elem );
	
		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
		}
	
		if ( computed ) {
	
			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}
	
			// Support: iOS < 6
			// A tribute to the "awesome hack by Dean Edwards"
			// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
	
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
	
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
	
		return ret !== undefined ?
			// Support: IE
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}
	
	
	function addGetHookIf( conditionFn, hookFn ) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}
	
				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply( this, arguments );
			}
		};
	}
	
	
	(function() {
		var pixelPositionVal, boxSizingReliableVal,
			docElem = document.documentElement,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );
	
		if ( !div.style ) {
			return;
		}
	
		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
		container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
			"position:absolute";
		container.appendChild( div );
	
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computePixelPositionAndBoxSizingReliable() {
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
				"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
				"border:1px;padding:1px;width:4px;position:absolute";
			div.innerHTML = "";
			docElem.appendChild( container );
	
			var divStyle = window.getComputedStyle( div, null );
			pixelPositionVal = divStyle.top !== "1%";
			boxSizingReliableVal = divStyle.width === "4px";
	
			docElem.removeChild( container );
		}
	
		// Support: node.js jsdom
		// Don't assume that getComputedStyle is a property of the global object
		if ( window.getComputedStyle ) {
			jQuery.extend( support, {
				pixelPosition: function() {
	
					// This test is executed only once but we still do memoizing
					// since we can use the boxSizingReliable pre-computing.
					// No need to check if the test was already performed, though.
					computePixelPositionAndBoxSizingReliable();
					return pixelPositionVal;
				},
				boxSizingReliable: function() {
					if ( boxSizingReliableVal == null ) {
						computePixelPositionAndBoxSizingReliable();
					}
					return boxSizingReliableVal;
				},
				reliableMarginRight: function() {
	
					// Support: Android 2.3
					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// This support function is only executed once so no memoizing is needed.
					var ret,
						marginDiv = div.appendChild( document.createElement( "div" ) );
	
					// Reset CSS: box-sizing; display; margin; border; padding
					marginDiv.style.cssText = div.style.cssText =
						// Support: Firefox<29, Android 2.3
						// Vendor-prefix box-sizing
						"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
						"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					docElem.appendChild( container );
	
					ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );
	
					docElem.removeChild( container );
					div.removeChild( marginDiv );
	
					return ret;
				}
			});
		}
	})();
	
	
	// A method for quickly swapping in/out CSS properties to get correct calculations.
	jQuery.swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};
	
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}
	
		ret = callback.apply( elem, args || [] );
	
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	
		return ret;
	};
	
	
	var
		// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
		rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),
	
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
	
		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
	
	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {
	
		// Shortcut for names that are not vendor prefixed
		if ( name in style ) {
			return name;
		}
	
		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}
	
		return origName;
	}
	
	function setPositiveNumber( elem, value, subtract ) {
		var matches = rnumsplit.exec( value );
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
	}
	
	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,
	
			val = 0;
	
		for ( ; i < 4; i += 2 ) {
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}
	
			if ( isBorderBox ) {
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}
	
				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}
	
		return val;
	}
	
	function getWidthOrHeight( elem, name, extra ) {
	
		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	
		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}
	
			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test(val) ) {
				return val;
			}
	
			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );
	
			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}
	
		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}
	
	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;
	
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
	
			values[ index ] = data_priv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}
	
				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
				}
			} else {
				hidden = isHidden( elem );
	
				if ( display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	
		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}
	
		return elements;
	}
	
	jQuery.extend({
	
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
	
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
	
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
	
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;
	
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );
	
			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}
	
				// If a number, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}
	
				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
					style[ name ] = value;
				}
	
			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );
	
			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );
	
			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}
	
			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}
	
			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}
	
			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
			}
			return val;
		}
	});
	
	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
	
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
						jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						}) :
						getWidthOrHeight( elem, name, extra );
				}
			},
	
			set: function( elem, value, extra ) {
				var styles = extra && getStyles( elem );
				return setPositiveNumber( elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					) : 0
				);
			}
		};
	});
	
	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return jQuery.swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);
	
	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},
	
					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ];
	
				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	
		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	});
	
	jQuery.fn.extend({
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;
	
				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;
	
					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}
	
					return map;
				}
	
				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}
	
			return this.each(function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			});
		}
	});
	
	
	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];
	
			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];
	
			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;
	
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;
	
				if ( tween.elem[ tween.prop ] != null &&
					(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
					return tween.elem[ tween.prop ];
				}
	
				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};
	
	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};
	
	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		}
	};
	
	jQuery.fx = Tween.prototype.init;
	
	// Back Compat <1.8 extension point
	jQuery.fx.step = {};
	
	
	
	
	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
		rrun = /queueHooks$/,
		animationPrefilters = [ defaultPrefilter ],
		tweeners = {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value ),
					target = tween.cur(),
					parts = rfxnum.exec( value ),
					unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
					// Starting value computation is required for potential unit mismatches
					start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
						rfxnum.exec( jQuery.css( tween.elem, prop ) ),
					scale = 1,
					maxIterations = 20;
	
				if ( start && start[ 3 ] !== unit ) {
					// Trust units reported by jQuery.css
					unit = unit || start[ 3 ];
	
					// Make sure we update the tween properties later on
					parts = parts || [];
	
					// Iteratively approximate from a nonzero starting point
					start = +target || 1;
	
					do {
						// If previous iteration zeroed out, double until we get *something*.
						// Use string for doubling so we don't accidentally see scale as unchanged below
						scale = scale || ".5";
	
						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );
	
					// Update scale, tolerating zero or NaN from tween.cur(),
					// break the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}
	
				// Update tween properties
				if ( parts ) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					// If a +=/-= token was provided, we're doing a relative animation
					tween.end = parts[ 1 ] ?
						start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
						+parts[ 2 ];
				}
	
				return tween;
			} ]
		};
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return ( fxNow = jQuery.now() );
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };
	
		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}
	
		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}
	
		return attrs;
	}
	
	function createTween( value, prop, animation ) {
		var tween,
			collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( (tween = collection[ index ].call( animation, prop, value )) ) {
	
				// We're done with this property
				return tween;
			}
		}
	}
	
	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = data_priv.get( elem, "fxshow" );
	
		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
	
			anim.always(function() {
				// Ensure the complete handler is called before this completes
				anim.always(function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				});
			});
		}
	
		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );
	
			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;
	
			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}
	
		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	
		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
	
					// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
	
			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}
	
		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = data_priv.access( elem, "fxshow", {} );
			}
	
			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done(function() {
					jQuery( elem ).hide();
				});
			}
			anim.done(function() {
				var prop;
	
				data_priv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			});
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
	
				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}
	
		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
			style.display = display;
		}
	}
	
	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;
	
		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}
	
			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}
	
			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];
	
				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}
	
	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always( function() {
				// Don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
	
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}
	
				deferred.notifyWith( elem, [ animation, percent, remaining ]);
	
				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, { specialEasing: {} }, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}
	
					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			}),
			props = animation.props;
	
		propFilter( props, animation.opts.specialEasing );
	
		for ( ; index < length ; index++ ) {
			result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				return result;
			}
		}
	
		jQuery.map( props, createTween, animation );
	
		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}
	
		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);
	
		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
	
		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.split(" ");
			}
	
			var prop,
				index = 0,
				length = props.length;
	
			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				tweeners[ prop ] = tweeners[ prop ] || [];
				tweeners[ prop ].unshift( callback );
			}
		},
	
		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				animationPrefilters.unshift( callback );
			} else {
				animationPrefilters.push( callback );
			}
		}
	});
	
	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};
	
		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
	
		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}
	
		// Queueing
		opt.old = opt.complete;
	
		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
	
			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};
	
		return opt;
	};
	
	jQuery.fn.extend({
		fadeTo: function( speed, to, easing, callback ) {
	
			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()
	
				// Animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
					// Empty animations, or finishing resolves immediately
					if ( empty || data_priv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;
	
			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};
	
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = data_priv.get( this );
	
				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}
	
				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			});
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = data_priv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
	
				// Enable finishing flag on private data
				data.finish = true;
	
				// Empty the queue first
				jQuery.queue( this, type, [] );
	
				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}
	
				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}
	
				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}
	
				// Turn off finishing flag
				delete data.finish;
			});
		}
	});
	
	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	});
	
	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});
	
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
	
		fxNow = jQuery.now();
	
		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}
	
		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};
	
	jQuery.fx.interval = 13;
	
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};
	
	jQuery.fx.stop = function() {
		clearInterval( timerId );
		timerId = null;
	};
	
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};
	
	
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";
	
		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	};
	
	
	(function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
	
		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
	
		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;
	
		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();
	
	
	var nodeHook, boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend({
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		}
	});
	
	jQuery.extend({
		attr: function( elem, name, value ) {
			var hooks, ret,
				nType = elem.nodeType;
	
			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === strundefined ) {
				return jQuery.prop( elem, name, value );
			}
	
			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
			}
	
			if ( value !== undefined ) {
	
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
	
				} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;
	
				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}
	
			} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;
	
			} else {
				ret = jQuery.find.attr( elem, name );
	
				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},
	
		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;
	
					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
						// Set corresponding property to false
						elem[ propName ] = false;
					}
	
					elem.removeAttribute( name );
				}
			}
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		}
	});
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	});
	
	
	
	
	var rfocusable = /^(?:input|select|textarea|button)$/i;
	
	jQuery.fn.extend({
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			return this.each(function() {
				delete this[ jQuery.propFix[ name ] || name ];
			});
		}
	});
	
	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
	
		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;
	
			// Don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );
	
			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
					ret :
					( elem[ name ] = value );
	
			} else {
				return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
					ret :
					elem[ name ];
			}
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
					return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
						elem.tabIndex :
						-1;
				}
			}
		}
	});
	
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}
	
	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	});
	
	
	
	
	var rclass = /[\t\r\n\f]/g;
	
	jQuery.fn.extend({
		addClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}
	
			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( rnotwhite ) || [];
	
				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						" "
					);
	
					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( rnotwhite ) || [];
	
				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						""
					);
	
					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim( cur ) : "";
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value;
	
			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}
	
			return this.each(function() {
				if ( type === "string" ) {
					// Toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						classNames = value.match( rnotwhite ) || [];
	
					while ( (className = classNames[ i++ ]) ) {
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( type === strundefined || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						data_priv.set( this, "__className__", this.className );
					}
	
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
				}
			});
		},
	
		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}
	
			return false;
		}
	});
	
	
	
	
	var rreturn = /\r/g;
	
	jQuery.fn.extend({
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}
	
					ret = elem.value;
	
					return typeof ret === "string" ?
						// Handle most common string cases
						ret.replace(rreturn, "") :
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}
	
				return;
			}
	
			isFunction = jQuery.isFunction( value );
	
			return this.each(function( i ) {
				var val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
	
				} else if ( typeof val === "number" ) {
					val += "";
	
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					});
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});
	
	jQuery.extend({
		valHooks: {
			option: {
				get: function( elem ) {
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						jQuery.trim( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;
	
					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// IE6-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;
	
					while ( i-- ) {
						option = options[ i ];
						if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
							optionSet = true;
						}
					}
	
					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});
	
	// Radios and checkboxes getter/setter
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});
	
	
	
	
	// Return jQuery for attributes-only inclusion
	
	
	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	});
	
	jQuery.fn.extend({
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		},
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		}
	});
	
	
	var nonce = jQuery.now();
	
	var rquery = (/\?/);
	
	
	
	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};
	
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	
	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),
	
		// Document location
		ajaxLocation = window.location.href,
	
		// Segment location into parts
		ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];
	
			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType[0] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );
	
					// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s[ "throws" ] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend({
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
	
			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
				.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];
	
			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
				);
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?
	
						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :
	
						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// Aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}
	
				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Called once
				if ( state === 2 ) {
					return;
				}
	
				// State is "done" now
				state = 2;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	});
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});
	
	
	jQuery._evalUrl = function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};
	
	
	jQuery.fn.extend({
		wrapAll: function( html ) {
			var wrap;
	
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapAll( html.call(this, i) );
				});
			}
	
			if ( this[ 0 ] ) {
	
				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}
	
				wrap.map(function() {
					var elem = this;
	
					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}
	
					return elem;
				}).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapInner( html.call(this, i) );
				});
			}
	
			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			});
		},
	
		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );
	
			return this.each(function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},
	
		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		}
	});
	
	
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};
	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
	
	
	
	
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	function buildParams( prefix, obj, traditional, add ) {
		var name;
	
		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});
	
		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};
	
		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});
	
		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}
	
		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};
	
	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map(function() {
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			})
			.filter(function() {
				var type = this.type;
	
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			})
			.map(function( i, elem ) {
				var val = jQuery( this ).val();
	
				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		}
	});
	
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest();
		} catch( e ) {}
	};
	
	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			// file protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	// Support: IE9
	// Open requests must be manually aborted on unload (#5280)
	// See https://support.microsoft.com/kb/2856746 for more info
	if ( window.attachEvent ) {
		window.attachEvent( "onunload", function() {
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]();
			}
		});
	}
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport(function( options ) {
		var callback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;
	
					xhr.open( options.type, options.url, options.async, options.username, options.password );
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								delete xhrCallbacks[ id ];
								callback = xhr.onload = xhr.onerror = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
									complete(
										// file: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
										// Support: IE9
										// Accessing binary-data responseText throws an exception
										// (#11426)
										typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined,
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					xhr.onerror = callback("error");
	
					// Create the abort callback
					callback = xhrCallbacks[ id ] = callback("abort");
	
					try {
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});
	
	
	
	
	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	});
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery("<script>").prop({
						async: true,
						charset: s.scriptCharset,
						src: s.url
					}).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});
	
	
	
	
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	});
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
			);
	
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;
	
			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}
	
			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};
	
			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// Restore preexisting value
				window[ callbackName ] = overwritten;
	
				// Save back as free
				if ( s[ callbackName ] ) {
					// make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
	
					// save the callback name for future use
					oldCallbacks.push( callbackName );
				}
	
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}
	
				responseContainer = overwritten = undefined;
			});
	
			// Delegate to script
			return "script";
		}
	});
	
	
	
	
	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;
	
		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}
	
		parsed = jQuery.buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	
	// Keep a copy of the old load method
	var _load = jQuery.fn.load;
	
	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}
	
		var selector, type, response,
			self = this,
			off = url.indexOf(" ");
	
		if ( off >= 0 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}
	
		// If it's a function
		if ( jQuery.isFunction( params ) ) {
	
			// We assume that it's the callback
			callback = params;
			params = undefined;
	
		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}
	
		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax({
				url: url,
	
				// if "type" variable is undefined, then "GET" method will be used
				type: type,
				dataType: "html",
				data: params
			}).done(function( responseText ) {
	
				// Save response for use in complete callback
				response = arguments;
	
				self.html( selector ?
	
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
					// Otherwise use the full result
					responseText );
	
			}).complete( callback && function( jqXHR, status ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			});
		}
	
		return this;
	};
	
	
	
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	});
	
	
	
	
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
	
	
	
	
	var docElem = window.document.documentElement;
	
	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}
	
	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};
	
			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf("auto") > -1;
	
			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
	
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
	
			} else {
				curElem.css( props );
			}
		}
	};
	
	jQuery.fn.extend({
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each(function( i ) {
						jQuery.offset.setOffset( this, options, i );
					});
			}
	
			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;
	
			if ( !doc ) {
				return;
			}
	
			docElem = doc.documentElement;
	
			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}
	
			// Support: BlackBerry 5, iOS 3 (original iPhone)
			// If we don't have gBCR, just use 0,0 rather than error
			if ( typeof elem.getBoundingClientRect !== strundefined ) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},
	
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}
	
			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };
	
			// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
	
			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();
	
				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}
	
				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}
	
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},
	
		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;
	
				while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
					offsetParent = offsetParent.offsetParent;
				}
	
				return offsetParent || docElem;
			});
		}
	});
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );
	
				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : window.pageXOffset,
						top ? val : window.pageYOffset
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});
	
	// Support: Safari<7+, Chrome<37+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	});
	
	
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
				return access( this, function( elem, type, value ) {
					var doc;
	
					if ( jQuery.isWindow( elem ) ) {
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}
	
					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;
	
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}
	
					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :
	
						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		});
	});
	
	
	// The number of elements contained in the matched element set
	jQuery.fn.size = function() {
		return this.length;
	};
	
	jQuery.fn.andSelf = jQuery.fn.addBack;
	
	
	
	
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	
	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	
	
	
	var
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$;
	
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
	
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
	
		return jQuery;
	};
	
	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( typeof noGlobal === strundefined ) {
		window.jQuery = window.$ = jQuery;
	}
	
	
	
	
	return jQuery;
	
	}));


/***/ },
/* 2 */
/*!**************************************!*\
  !*** ./web_modules/OrbitControls.js ***!
  \**************************************/
/***/ function(module, exports) {

	/**
	 * @author qiao / https://github.com/qiao
	 * @author mrdoob / http://mrdoob.com
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author erich666 / http://erichaines.com
	 */
	/*global THREE, console */
	
	( function () {
	
		                                                                                              function OrbitConstraint ( object ) {
	
			                                                                                              this.object = object;
	
			// "target" sets the location of focus, where the object orbits around
			// and where it pans with respect to.
			                                                                                              this.target = new THREE.Vector3();
	
			// Limits to how far you can dolly in and out ( PerspectiveCamera only )
			                                                                                              this.minDistance = 0;
			                                                                                              this.maxDistance = Infinity;
	
			// Limits to how far you can zoom in and out ( OrthographicCamera only )
			                                                                                              this.minZoom = 0;
			                                                                                              this.maxZoom = Infinity;
	
			// How far you can orbit vertically, upper and lower limits.
			// Range is 0 to Math.PI radians.
			                                                                                              this.minPolarAngle = 0; // radians
			                                                                                              this.maxPolarAngle = Math.PI; // radians
	
			// How far you can orbit horizontally, upper and lower limits.
			// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
			                                                                                              this.minAzimuthAngle = - Infinity; // radians
			                                                                                              this.maxAzimuthAngle = Infinity; // radians
	
			// Set to true to enable damping (inertia)
			// If damping is enabled, you must call controls.update() in your animation loop
			                                                                                              this.enableDamping = false;
			                                                                                              this.dampingFactor = 0.25;
	
			////////////
			// internals
	
			                                                                                              var scope = this;
	
			                                                                                              var EPS = 0.000001;
	
			// Current position in spherical coordinate system.
			                                                                                              var theta;
			                                                                                              var phi;
	
			// Pending changes
			                                                                                              var phiDelta = 0;
			                                                                                              var thetaDelta = 0;
			                                                                                              var scale = 1;
			                                                                                              var panOffset = new THREE.Vector3();
			                                                                                              var zoomChanged = false;
	
			// API
	
			                                                                                              this.getPolarAngle = function () {
	
				                                                                                              return phi;
	
			};
	
			                                                                                              this.getAzimuthalAngle = function () {
	
				                                                                                              return theta;
	
			};
	
			                                                                                              this.rotateLeft = function ( angle ) {
	
				                                                                                              thetaDelta -= angle;
	
			};
	
			                                                                                              this.rotateUp = function ( angle ) {
	
				                                                                                              phiDelta -= angle;
	
			};
	
			// pass in distance in world space to move left
			                                                                                              this.panLeft = function() {
	
				                                                                                              var v = new THREE.Vector3();
	
				                                                                                              return function panLeft ( distance ) {
	
					                                                                                              var te = this.object.matrix.elements;
	
					// get X column of matrix
					                                                                                              v.set( te[ 0 ], te[ 1 ], te[ 2 ] );
					                                                                                              v.multiplyScalar( - distance );
	
					                                                                                              panOffset.add( v );
	
				};
	
			}();
	
			// pass in distance in world space to move up
			                                                                                              this.panUp = function() {
	
				                                                                                              var v = new THREE.Vector3();
	
				                                                                                              return function panUp ( distance ) {
	
					                                                                                              var te = this.object.matrix.elements;
	
					// get Y column of matrix
					                                                                                              v.set( te[ 4 ], te[ 5 ], te[ 6 ] );
					                                                                                              v.multiplyScalar( distance );
	
					                                                                                              panOffset.add( v );
	
				};
	
			}();
	
			// pass in x,y of change desired in pixel space,
			// right and down are positive
			                                                                                              this.pan = function ( deltaX, deltaY, screenWidth, screenHeight ) {
	
				                                                                                              if ( scope.object instanceof THREE.PerspectiveCamera ) {
	
					// perspective
					                                                                                              var position = scope.object.position;
					                                                                                              var offset = position.clone().sub( scope.target );
					                                                                                              var targetDistance = offset.length();
	
					// half of the fov is center to top of screen
					                                                                                              targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );
	
					// we actually don't use screenWidth, since perspective camera is fixed to screen height
					                                                                                              scope.panLeft( 2 * deltaX * targetDistance / screenHeight );
					                                                                                              scope.panUp( 2 * deltaY * targetDistance / screenHeight );
	
				} else if ( scope.object instanceof THREE.OrthographicCamera ) {
	
					// orthographic
					                                                                                              scope.panLeft( deltaX * ( scope.object.right - scope.object.left ) / screenWidth );
					                                                                                              scope.panUp( deltaY * ( scope.object.top - scope.object.bottom ) / screenHeight );
	
				} else {
	
					// camera neither orthographic or perspective
					                                                                                              console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
	
				}
	
			};
	
			                                                                                              this.dollyIn = function ( dollyScale ) {
	
				                                                                                              if ( scope.object instanceof THREE.PerspectiveCamera ) {
	
					                                                                                              scale /= dollyScale;
	
				} else if ( scope.object instanceof THREE.OrthographicCamera ) {
	
					                                                                                              scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom * dollyScale ) );
					                                                                                              scope.object.updateProjectionMatrix();
					                                                                                              zoomChanged = true;
	
				} else {
	
					                                                                                              console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
	
				}
	
			};
	
			                                                                                              this.dollyOut = function ( dollyScale ) {
	
				                                                                                              if ( scope.object instanceof THREE.PerspectiveCamera ) {
	
					                                                                                              scale *= dollyScale;
	
				} else if ( scope.object instanceof THREE.OrthographicCamera ) {
	
					                                                                                              scope.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / dollyScale ) );
					                                                                                              scope.object.updateProjectionMatrix();
					                                                                                              zoomChanged = true;
	
				} else {
	
					                                                                                              console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
	
				}
	
			};
	
			                                                                                              this.update = function() {
	
				                                                                                              var offset = new THREE.Vector3();
	
				// so camera.up is the orbit axis
				                                                                                              var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
				                                                                                              var quatInverse = quat.clone().inverse();
	
				                                                                                              var lastPosition = new THREE.Vector3();
				                                                                                              var lastQuaternion = new THREE.Quaternion();
	
				                                                                                              return function () {
	
					                                                                                              var position = this.object.position;
	
					                                                                                              offset.copy( position ).sub( this.target );
	
					// rotate offset to "y-axis-is-up" space
					                                                                                              offset.applyQuaternion( quat );
	
					// angle from z-axis around y-axis
	
					                                                                                              theta = Math.atan2( offset.x, offset.z );
	
					// angle from y-axis
	
					                                                                                              phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );
	
					                                                                                              theta += thetaDelta;
					                                                                                              phi += phiDelta;
	
					// restrict theta to be between desired limits
					                                                                                              theta = Math.max( this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, theta ) );
	
					// restrict phi to be between desired limits
					                                                                                              phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );
	
					// restrict phi to be betwee EPS and PI-EPS
					                                                                                              phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );
	
					                                                                                              var radius = offset.length() * scale;
	
					// restrict radius to be between desired limits
					                                                                                              radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );
	
					// move target to panned location
					                                                                                              this.target.add( panOffset );
	
					                                                                                              offset.x = radius * Math.sin( phi ) * Math.sin( theta );
					                                                                                              offset.y = radius * Math.cos( phi );
					                                                                                              offset.z = radius * Math.sin( phi ) * Math.cos( theta );
	
					// rotate offset back to "camera-up-vector-is-up" space
					                                                                                              offset.applyQuaternion( quatInverse );
	
					                                                                                              position.copy( this.target ).add( offset );
	
					                                                                                              this.object.lookAt( this.target );
	
					                                                                                              if ( this.enableDamping === true ) {
	
						                                                                                              thetaDelta *= ( 1 - this.dampingFactor );
						                                                                                              phiDelta *= ( 1 - this.dampingFactor );
	
					} else {
	
						                                                                                              thetaDelta = 0;
						                                                                                              phiDelta = 0;
	
					}
	
					                                                                                              scale = 1;
					                                                                                              panOffset.set( 0, 0, 0 );
	
					// update condition is:
					// min(camera displacement, camera rotation in radians)^2 > EPS
					// using small-angle approximation cos(x/2) = 1 - x^2 / 8
	
					                                                                                              if ( zoomChanged ||
						 lastPosition.distanceToSquared( this.object.position ) > EPS ||
					    8 * ( 1 - lastQuaternion.dot( this.object.quaternion ) ) > EPS ) {
	
						                                                                                              lastPosition.copy( this.object.position );
						                                                                                              lastQuaternion.copy( this.object.quaternion );
						                                                                                              zoomChanged = false;
	
						                                                                                              return true;
	
					}
	
					                                                                                              return false;
	
				};
	
			}();
	
		}
	
	
		// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
		// the "up" direction as +Y, unlike the TrackballControls. Touch on tablet and phones is
		// supported.
		//
		//    Orbit - left mouse / touch: one finger move
		//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
		//    Pan - right mouse, or arrow keys / touch: three finter swipe
	
		                                                                                              THREE.OrbitControls = function ( object, domElement ) {
	
			                                                                                              var constraint = new OrbitConstraint( object );
	
			                                                                                              this.domElement = ( domElement !== undefined ) ? domElement : document;
	
			// API
	
			                                                                                              Object.defineProperty( this, 'constraint', {
	
				                                                                                              get: function() {
	
					                                                                                              return constraint;
	
				}
	
			} );
	
			                                                                                              this.getPolarAngle = function () {
	
				                                                                                              return constraint.getPolarAngle();
	
			};
	
			                                                                                              this.getAzimuthalAngle = function () {
	
				                                                                                              return constraint.getAzimuthalAngle();
	
			};
	
			// Set to false to disable this control
			                                                                                              this.enabled = true;
	
			// center is old, deprecated; use "target" instead
			                                                                                              this.center = this.target;
	
			// This option actually enables dollying in and out; left as "zoom" for
			// backwards compatibility.
			// Set to false to disable zooming
			                                                                                              this.enableZoom = true;
			                                                                                              this.zoomSpeed = 1.0;
	
			// Set to false to disable rotating
			                                                                                              this.enableRotate = true;
			                                                                                              this.rotateSpeed = 1.0;
	
			// Set to false to disable panning
			                                                                                              this.enablePan = true;
			                                                                                              this.keyPanSpeed = 7.0;	// pixels moved per arrow key push
	
			// Set to true to automatically rotate around the target
			// If auto-rotate is enabled, you must call controls.update() in your animation loop
			                                                                                              this.autoRotate = false;
			                                                                                              this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
	
			// Set to false to disable use of the keys
			                                                                                              this.enableKeys = true;
	
			// The four arrow keys
			                                                                                              this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
	
			// Mouse buttons
			                                                                                              this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };
	
			////////////
			// internals
	
			                                                                                              var scope = this;
	
			                                                                                              var rotateStart = new THREE.Vector2();
			                                                                                              var rotateEnd = new THREE.Vector2();
			                                                                                              var rotateDelta = new THREE.Vector2();
	
			                                                                                              var panStart = new THREE.Vector2();
			                                                                                              var panEnd = new THREE.Vector2();
			                                                                                              var panDelta = new THREE.Vector2();
	
			                                                                                              var dollyStart = new THREE.Vector2();
			                                                                                              var dollyEnd = new THREE.Vector2();
			                                                                                              var dollyDelta = new THREE.Vector2();
	
			                                                                                              var STATE = { NONE : - 1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };
	
			                                                                                              var state = STATE.NONE;
	
			// for reset
	
			                                                                                              this.target0 = this.target.clone();
			                                                                                              this.position0 = this.object.position.clone();
			                                                                                              this.zoom0 = this.object.zoom;
	
			// events
	
			                                                                                              var changeEvent = { type: 'change' };
			                                                                                              var startEvent = { type: 'start' };
			                                                                                              var endEvent = { type: 'end' };
	
			// pass in x,y of change desired in pixel space,
			// right and down are positive
			                                                                                              function pan( deltaX, deltaY ) {
	
				                                                                                              var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
				                                                                                              constraint.pan( deltaX, deltaY, element.clientWidth, element.clientHeight );
	
			}
	
			                                                                                              this.update = function () {
	
				                                                                                              if ( this.autoRotate && state === STATE.NONE ) {
	
					                                                                                              constraint.rotateLeft( getAutoRotationAngle() );
	
				}
	
				                                                                                              if ( constraint.update() === true ) {
	
					                                                                                              this.dispatchEvent( changeEvent );
	
				}
	
			};
	
			                                                                                              this.reset = function () {
	
				                                                                                              state = STATE.NONE;
	
				                                                                                              this.target.copy( this.target0 );
				                                                                                              this.object.position.copy( this.position0 );
				                                                                                              this.object.zoom = this.zoom0;
	
				                                                                                              this.object.updateProjectionMatrix();
				                                                                                              this.dispatchEvent( changeEvent );
	
				                                                                                              this.update();
	
			};
	
			                                                                                              function getAutoRotationAngle() {
	
				                                                                                              return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
	
			}
	
			                                                                                              function getZoomScale() {
	
				                                                                                              return Math.pow( 0.95, scope.zoomSpeed );
	
			}
	
			                                                                                              function onMouseDown( event ) {
	
				                                                                                              if ( scope.enabled === false ) return;
	
				                                                                                              event.preventDefault();
	
				                                                                                              if ( event.button === scope.mouseButtons.ORBIT ) {
	
					                                                                                              if ( scope.enableRotate === false ) return;
	
					                                                                                              state = STATE.ROTATE;
	
					                                                                                              rotateStart.set( event.clientX, event.clientY );
	
				} else if ( event.button === scope.mouseButtons.ZOOM ) {
	
					                                                                                              if ( scope.enableZoom === false ) return;
	
					                                                                                              state = STATE.DOLLY;
	
					                                                                                              dollyStart.set( event.clientX, event.clientY );
	
				} else if ( event.button === scope.mouseButtons.PAN ) {
	
					                                                                                              if ( scope.enablePan === false ) return;
	
					                                                                                              state = STATE.PAN;
	
					                                                                                              panStart.set( event.clientX, event.clientY );
	
				}
	
				                                                                                              if ( state !== STATE.NONE ) {
	
					                                                                                              document.addEventListener( 'mousemove', onMouseMove, false );
					                                                                                              document.addEventListener( 'mouseup', onMouseUp, false );
					                                                                                              scope.dispatchEvent( startEvent );
	
				}
	
			}
	
			                                                                                              function onMouseMove( event ) {
	
				                                                                                              if ( scope.enabled === false ) return;
	
				                                                                                              event.preventDefault();
	
				                                                                                              var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
				                                                                                              if ( state === STATE.ROTATE ) {
	
					                                                                                              if ( scope.enableRotate === false ) return;
	
					                                                                                              rotateEnd.set( event.clientX, event.clientY );
					                                                                                              rotateDelta.subVectors( rotateEnd, rotateStart );
	
					// rotating across whole screen goes 360 degrees around
					                                                                                              constraint.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
	
					// rotating up and down along whole screen attempts to go 360, but limited to 180
					                                                                                              constraint.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );
	
					                                                                                              rotateStart.copy( rotateEnd );
	
				} else if ( state === STATE.DOLLY ) {
	
					                                                                                              if ( scope.enableZoom === false ) return;
	
					                                                                                              dollyEnd.set( event.clientX, event.clientY );
					                                                                                              dollyDelta.subVectors( dollyEnd, dollyStart );
	
					                                                                                              if ( dollyDelta.y > 0 ) {
	
						                                                                                              constraint.dollyIn( getZoomScale() );
	
					} else if ( dollyDelta.y < 0 ) {
	
						                                                                                              constraint.dollyOut( getZoomScale() );
	
					}
	
					                                                                                              dollyStart.copy( dollyEnd );
	
				} else if ( state === STATE.PAN ) {
	
					                                                                                              if ( scope.enablePan === false ) return;
	
					                                                                                              panEnd.set( event.clientX, event.clientY );
					                                                                                              panDelta.subVectors( panEnd, panStart );
	
					                                                                                              pan( panDelta.x, panDelta.y );
	
					                                                                                              panStart.copy( panEnd );
	
				}
	
				                                                                                              if ( state !== STATE.NONE ) scope.update();
	
			}
	
			                                                                                              function onMouseUp( /* event */ ) {
	
				                                                                                              if ( scope.enabled === false ) return;
	
				                                                                                              document.removeEventListener( 'mousemove', onMouseMove, false );
				                                                                                              document.removeEventListener( 'mouseup', onMouseUp, false );
				                                                                                              scope.dispatchEvent( endEvent );
				                                                                                              state = STATE.NONE;
	
			}
	
			                                                                                              function onMouseWheel( event ) {
	
				                                                                                              if ( scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE ) return;
	
				                                                                                              event.preventDefault();
				                                                                                              event.stopPropagation();
	
				                                                                                              var delta = 0;
	
				                                                                                              if ( event.wheelDelta !== undefined ) {
	
					// WebKit / Opera / Explorer 9
	
					                                                                                              delta = event.wheelDelta;
	
				} else if ( event.detail !== undefined ) {
	
					// Firefox
	
					                                                                                              delta = - event.detail;
	
				}
	
				                                                                                              if ( delta > 0 ) {
	
					                                                                                              constraint.dollyOut( getZoomScale() );
	
				} else if ( delta < 0 ) {
	
					                                                                                              constraint.dollyIn( getZoomScale() );
	
				}
	
				                                                                                              scope.update();
				                                                                                              scope.dispatchEvent( startEvent );
				                                                                                              scope.dispatchEvent( endEvent );
	
			}
	
			                                                                                              function onKeyDown( event ) {
	
				                                                                                              if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;
	
				                                                                                              switch ( event.keyCode ) {
	
					                                                                                              case scope.keys.UP:
						                                                                                                                                                                                            pan( 0, scope.keyPanSpeed );
						                                                                                                                                                                                            scope.update();
						                                                                                                                                                                                            break;
	
					                                                                                              case scope.keys.BOTTOM:
						                                                                                                                                                                                            pan( 0, - scope.keyPanSpeed );
						                                                                                                                                                                                            scope.update();
						                                                                                                                                                                                            break;
	
					                                                                                              case scope.keys.LEFT:
						                                                                                                                                                                                            pan( scope.keyPanSpeed, 0 );
						                                                                                                                                                                                            scope.update();
						                                                                                                                                                                                            break;
	
					                                                                                              case scope.keys.RIGHT:
						                                                                                                                                                                                            pan( - scope.keyPanSpeed, 0 );
						                                                                                                                                                                                            scope.update();
						                                                                                                                                                                                            break;
	
				}
	
			}
	
			                                                                                              function touchstart( event ) {
	
				                                                                                              if ( scope.enabled === false ) return;
	
				                                                                                              switch ( event.touches.length ) {
	
					                                                                                              case 1:	// one-fingered touch: rotate
	
						                                                                                                                                                                                            if ( scope.enableRotate === false ) return;
	
						                                                                                                                                                                                            state = STATE.TOUCH_ROTATE;
	
						                                                                                                                                                                                            rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						                                                                                                                                                                                            break;
	
					                                                                                              case 2:	// two-fingered touch: dolly
	
						                                                                                                                                                                                            if ( scope.enableZoom === false ) return;
	
						                                                                                                                                                                                            state = STATE.TOUCH_DOLLY;
	
						                                                                                                                                                                                            var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
						                                                                                                                                                                                            var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
						                                                                                                                                                                                            var distance = Math.sqrt( dx * dx + dy * dy );
						                                                                                                                                                                                            dollyStart.set( 0, distance );
						                                                                                                                                                                                            break;
	
					                                                                                              case 3: // three-fingered touch: pan
	
						                                                                                                                                                                                            if ( scope.enablePan === false ) return;
	
						                                                                                                                                                                                            state = STATE.TOUCH_PAN;
	
						                                                                                                                                                                                            panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						                                                                                                                                                                                            break;
	
					                                                                                              default:
	
						                                                                                                                                                                                            state = STATE.NONE;
	
				}
	
				                                                                                              if ( state !== STATE.NONE ) scope.dispatchEvent( startEvent );
	
			}
	
			                                                                                              function touchmove( event ) {
	
				                                                                                              if ( scope.enabled === false ) return;
	
				                                                                                              event.preventDefault();
				                                                                                              event.stopPropagation();
	
				                                                                                              var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
	
				                                                                                              switch ( event.touches.length ) {
	
					                                                                                              case 1: // one-fingered touch: rotate
	
						                                                                                                                                                                                            if ( scope.enableRotate === false ) return;
						                                                                                                                                                                                            if ( state !== STATE.TOUCH_ROTATE ) return;
	
						                                                                                                                                                                                            rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						                                                                                                                                                                                            rotateDelta.subVectors( rotateEnd, rotateStart );
	
						// rotating across whole screen goes 360 degrees around
						                                                                                                                                                                                            constraint.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );
						// rotating up and down along whole screen attempts to go 360, but limited to 180
						                                                                                                                                                                                            constraint.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );
	
						                                                                                                                                                                                            rotateStart.copy( rotateEnd );
	
						                                                                                                                                                                                            scope.update();
						                                                                                                                                                                                            break;
	
					                                                                                              case 2: // two-fingered touch: dolly
	
						                                                                                                                                                                                            if ( scope.enableZoom === false ) return;
						                                                                                                                                                                                            if ( state !== STATE.TOUCH_DOLLY ) return;
	
						                                                                                                                                                                                            var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
						                                                                                                                                                                                            var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
						                                                                                                                                                                                            var distance = Math.sqrt( dx * dx + dy * dy );
	
						                                                                                                                                                                                            dollyEnd.set( 0, distance );
						                                                                                                                                                                                            dollyDelta.subVectors( dollyEnd, dollyStart );
	
						                                                                                                                                                                                            if ( dollyDelta.y > 0 ) {
	
							                                                                                              constraint.dollyOut( getZoomScale() );
	
						} else if ( dollyDelta.y < 0 ) {
	
							                                                                                              constraint.dollyIn( getZoomScale() );
	
						}
	
						                                                                                                                                                                                            dollyStart.copy( dollyEnd );
	
						                                                                                                                                                                                            scope.update();
						                                                                                                                                                                                            break;
	
					                                                                                              case 3: // three-fingered touch: pan
	
						                                                                                                                                                                                            if ( scope.enablePan === false ) return;
						                                                                                                                                                                                            if ( state !== STATE.TOUCH_PAN ) return;
	
						                                                                                                                                                                                            panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
						                                                                                                                                                                                            panDelta.subVectors( panEnd, panStart );
	
						                                                                                                                                                                                            pan( panDelta.x, panDelta.y );
	
						                                                                                                                                                                                            panStart.copy( panEnd );
	
						                                                                                                                                                                                            scope.update();
						                                                                                                                                                                                            break;
	
					                                                                                              default:
	
						                                                                                                                                                                                            state = STATE.NONE;
	
				}
	
			}
	
			                                                                                              function touchend( /* event */ ) {
	
				                                                                                              if ( scope.enabled === false ) return;
	
				                                                                                              scope.dispatchEvent( endEvent );
				                                                                                              state = STATE.NONE;
	
			}
	
			                                                                                              function contextmenu( event ) {
	
				                                                                                              event.preventDefault();
	
			}
	
			                                                                                              this.dispose = function() {
	
				                                                                                              this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
				                                                                                              this.domElement.removeEventListener( 'mousedown', onMouseDown, false );
				                                                                                              this.domElement.removeEventListener( 'mousewheel', onMouseWheel, false );
				                                                                                              this.domElement.removeEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox
	
				                                                                                              this.domElement.removeEventListener( 'touchstart', touchstart, false );
				                                                                                              this.domElement.removeEventListener( 'touchend', touchend, false );
				                                                                                              this.domElement.removeEventListener( 'touchmove', touchmove, false );
	
				                                                                                              document.removeEventListener( 'mousemove', onMouseMove, false );
				                                                                                              document.removeEventListener( 'mouseup', onMouseUp, false );
	
				                                                                                              window.removeEventListener( 'keydown', onKeyDown, false );
	
			};
	
			                                                                                              this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	
			                                                                                              this.domElement.addEventListener( 'mousedown', onMouseDown, false );
			                                                                                              this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
			                                                                                              this.domElement.addEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox
	
			                                                                                              this.domElement.addEventListener( 'touchstart', touchstart, false );
			                                                                                              this.domElement.addEventListener( 'touchend', touchend, false );
			                                                                                              this.domElement.addEventListener( 'touchmove', touchmove, false );
	
			                                                                                              window.addEventListener( 'keydown', onKeyDown, false );
	
			// force an update at start
			                                                                                              this.update();
	
		};
	
		                                                                                              THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
		                                                                                              THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;
	
		                                                                                              Object.defineProperties( THREE.OrbitControls.prototype, {
	
			                                                                                              object: {
	
				                                                                                              get: function () {
	
					                                                                                              return this.constraint.object;
	
				}
	
			},
	
			                                                                                              target: {
	
				                                                                                              get: function () {
	
					                                                                                              return this.constraint.target;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              console.warn( 'THREE.OrbitControls: target is now immutable. Use target.set() instead.' );
					                                                                                              this.constraint.target.copy( value );
	
				}
	
			},
	
			                                                                                              minDistance : {
	
				                                                                                              get: function () {
	
					                                                                                              return this.constraint.minDistance;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              this.constraint.minDistance = value;
	
				}
	
			},
	
			                                                                                              maxDistance : {
	
				                                                                                              get: function () {
	
					                                                                                              return this.constraint.maxDistance;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              this.constraint.maxDistance = value;
	
				}
	
			},
	
			                                                                                              minZoom : {
	
				                                                                                              get: function () {
	
					                                                                                              return this.constraint.minZoom;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              this.constraint.minZoom = value;
	
				}
	
			},
	
			                                                                                              maxZoom : {
	
				                                                                                              get: function () {
	
					                                                                                              return this.constraint.maxZoom;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              this.constraint.maxZoom = value;
	
				}
	
			},
	
			                                                                                              minPolarAngle : {
	
				                                                                                              get: function () {
	
					                                                                                              return this.constraint.minPolarAngle;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              this.constraint.minPolarAngle = value;
	
				}
	
			},
	
			                                                                                              maxPolarAngle : {
	
				                                                                                              get: function () {
	
					                                                                                              return this.constraint.maxPolarAngle;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              this.constraint.maxPolarAngle = value;
	
				}
	
			},
	
			                                                                                              minAzimuthAngle : {
	
				                                                                                              get: function () {
	
					                                                                                              return this.constraint.minAzimuthAngle;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              this.constraint.minAzimuthAngle = value;
	
				}
	
			},
	
			                                                                                              maxAzimuthAngle : {
	
				                                                                                              get: function () {
	
					                                                                                              return this.constraint.maxAzimuthAngle;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              this.constraint.maxAzimuthAngle = value;
	
				}
	
			},
	
			                                                                                              enableDamping : {
	
				                                                                                              get: function () {
	
					                                                                                              return this.constraint.enableDamping;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              this.constraint.enableDamping = value;
	
				}
	
			},
	
			                                                                                              dampingFactor : {
	
				                                                                                              get: function () {
	
					                                                                                              return this.constraint.dampingFactor;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              this.constraint.dampingFactor = value;
	
				}
	
			},
	
			// backward compatibility
	
			                                                                                              noZoom: {
	
				                                                                                              get: function () {
	
					                                                                                              console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
					                                                                                              return ! this.enableZoom;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
					                                                                                              this.enableZoom = ! value;
	
				}
	
			},
	
			                                                                                              noRotate: {
	
				                                                                                              get: function () {
	
					                                                                                              console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
					                                                                                              return ! this.enableRotate;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
					                                                                                              this.enableRotate = ! value;
	
				}
	
			},
	
			                                                                                              noPan: {
	
				                                                                                              get: function () {
	
					                                                                                              console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
					                                                                                              return ! this.enablePan;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
					                                                                                              this.enablePan = ! value;
	
				}
	
			},
	
			                                                                                              noKeys: {
	
				                                                                                              get: function () {
	
					                                                                                              console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
					                                                                                              return ! this.enableKeys;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
					                                                                                              this.enableKeys = ! value;
	
				}
	
			},
	
			                                                                                              staticMoving : {
	
				                                                                                              get: function () {
	
					                                                                                              console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
					                                                                                              return ! this.constraint.enableDamping;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
					                                                                                              this.constraint.enableDamping = ! value;
	
				}
	
			},
	
			                                                                                              dynamicDampingFactor : {
	
				                                                                                              get: function () {
	
					                                                                                              console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
					                                                                                              return this.constraint.dampingFactor;
	
				},
	
				                                                                                              set: function ( value ) {
	
					                                                                                              console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
					                                                                                              this.constraint.dampingFactor = value;
	
				}
	
			}
	
		} );
	
	}() );


/***/ },
/* 3 */
/*!*********************!*\
  !*** ./src/face.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	/*global THREE*/
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	__webpack_require__(/*! OBJLoader */ 4);
	
	var _glMatrix = __webpack_require__(/*! gl-matrix */ 5);
	
	var toTypedArray = function toTypedArray(type, array) {
	  var typed = new type(array.length);
	  array.forEach(function (v, i) {
	    return typed[i] = v;
	  });
	  return typed;
	};
	
	var Node = (function () {
	  function Node(index, position) {
	    _classCallCheck(this, Node);
	
	    this.index = index;
	    this.position = position;
	    this.connection = [];
	    this.distanceToFP = [];
	    this.weights = [];
	  }
	
	  _createClass(Node, [{
	    key: 'nearestFeaturePointIndex',
	    value: function nearestFeaturePointIndex() {
	      var index = 0;
	      var distance = this.distanceToFP[0];
	      this.distanceToFP.forEach(function (d, i) {
	        if (d < distance) {
	          distance = d;
	          index = i;
	        }
	      });
	      return index;
	    }
	  }]);
	
	  return Node;
	})();
	
	var _default = (function (_THREE$Mesh) {
	  _inherits(_default, _THREE$Mesh);
	
	  function _default(tracker) {
	    _classCallCheck(this, _default);
	
	    var geometry = new THREE.JSONLoader().parse(__webpack_require__(/*! ./data/face3.json */ 47)).geometry;
	    // let geometry = new THREE.BufferGeometry()
	    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, wireframe: true });
	    // let material = new THREE.ShaderMaterial({
	    //   uniforms: {
	    //     map: { type: 't', value: null }
	    //   },
	    //   vertexShader: require('raw!./face.vert'),
	    //   fragmentShader: require('raw!./face.frag'),
	    //   side: THREE.DoubleSide
	    // })
	    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, geometry, material);
	
	    this.tracker = tracker;
	
	    // this.initGeometry()
	    this.initFeaturePoints();
	    // this.initTexture()
	    // this.initMesh()
	    this.initEyeMouth();
	    this.deformVertices();
	  }
	
	  _createClass(_default, [{
	    key: 'initGeometry',
	    value: function initGeometry() {
	      var obj = __webpack_require__(/*! raw!./data/face.obj */ 16);
	      var position = [];
	      var index = [];
	      obj.split(/\n|\r/).forEach(function (line) {
	        var tokens = line.split(' ');
	        switch (tokens[0]) {
	          case 'v':
	            position.push(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3]));
	            break;
	          case 'f':
	            index.push(parseInt(tokens[1]) - 1, parseInt(tokens[2]) - 1, parseInt(tokens[3]) - 1);
	            break;
	        }
	      });
	      position = toTypedArray(Float32Array, position);
	      index = toTypedArray(Uint16Array, index);
	      this.geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));
	      this.geometry.setIndex(new THREE.BufferAttribute(index, 1));
	
	      var vertexDistance = [];
	      var setDistance = function setDistance(a, b) {
	        if (!vertexDistance[a]) {
	          vertexDistance[a] = [];
	        }
	        if (vertexDistance[a][b]) {
	          return;
	        }
	        var pa = [position[a * 3 + 0], position[a * 3 + 1], position[a * 3 + 2]];
	        var pb = [position[b * 3 + 0], position[b * 3 + 1], position[b * 3 + 2]];
	        vertexDistance[a][b] = _glMatrix.vec3.dist(pa, pb);
	      };
	      for (var i = 0; i < index.length; i += 3) {
	        setDistance(index[i + 0], index[i + 1]);
	        setDistance(index[i + 0], index[i + 2]);
	        setDistance(index[i + 1], index[i + 0]);
	        setDistance(index[i + 1], index[i + 2]);
	        setDistance(index[i + 2], index[i + 0]);
	        setDistance(index[i + 2], index[i + 1]);
	      }
	
	      this.featurePoints = __webpack_require__(/*! ./data/fp.json */ 17).map(function (p, i) {
	        var index = -1;
	        if (i == 41 || _glMatrix.vec3.length(p) > 0) {
	          var distance = Number.MAX_VALUE;
	          for (var _i = 0; _i < position.length; _i += 3) {
	            var d = _glMatrix.vec3.distance(p, [position[_i], position[_i + 1], position[_i + 2]]);
	            if (d < distance) {
	              distance = d;
	              index = _i;
	            }
	          }
	        }
	        return { vertexIndex: index };
	      });
	      // console.table(this.featurePoints)
	    }
	  }, {
	    key: 'initFeaturePoints',
	    value: function initFeaturePoints() {
	      var _this = this;
	
	      this.featurePointIndices = __webpack_require__(/*! ./data/fp.json */ 17).map(function (pa, i) {
	        var p = new THREE.Vector3(pa[0], pa[1], pa[2]);
	        return i == 41 || p.length() > 0 ? _this.findNearestIndex(_this.geometry.vertices, p) : -1;
	      });
	
	      this.buildConnectionData(this.geometry);
	
	      this.featurePointIndices.forEach(function (index, i) {
	        _this.nodes.forEach(function (node) {
	          return node.distanceToFP[i] = Number.MAX_VALUE;
	        });
	        if (index >= 0) {
	          _this.calcDistanceToFeaturePoint(i);
	        }
	      });
	
	      this.nodes.forEach(this.calcWeightForNode.bind(this));
	
	      var cube = new THREE.BoxGeometry(0.02, 0.02, 0.02);
	      this.featurePoints = this.featurePointIndices.map(function (i) {
	        if (i < 0) return;
	        var material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.7, depthTest: false });
	        // material.color.setHSL(Math.random(), 0.7, 0.5);
	        var mesh = new THREE.Mesh(cube, material);
	        // mesh.visible = false
	        mesh.vertexIndex = i;
	        mesh.position.copy(_this.geometry.vertices[i]);
	        _this.add(mesh);
	        return mesh;
	      });
	
	      var v1 = this.featurePoints[14].position.clone();
	      var v0 = this.featurePoints[0].position.clone();
	      var center = new THREE.Vector3().lerpVectors(v1, v0, 0.5);
	      var scale = v1.clone().sub(center).x;
	      for (var i = 71; i < this.featurePoints.length; i++) {
	        var fp = this.featurePoints[i];
	        var ip = fp.position.clone().sub(center);
	        ip.multiplyScalar(1 / scale);
	        fp.initialPosition = ip;
	      }
	    }
	  }, {
	    key: 'findNearestIndex',
	    value: function findNearestIndex(vertices, target) {
	      var distance = Number.MAX_VALUE;
	      var index = 0;
	      vertices.forEach(function (v, i) {
	        var d = v.distanceToSquared(target);
	        if (d < distance) {
	          distance = d;
	          index = i;
	        }
	      });
	      return index;
	    }
	  }, {
	    key: 'buildConnectionData',
	    value: function buildConnectionData(geometry) {
	      var _this2 = this;
	
	      this.nodes = geometry.vertices.map(function (v, i) {
	        return new Node(i, v.clone());
	      });
	
	      var connected = {};
	      var connect = function connect(a, b) {
	        var key = a << 16 | b;
	        if (connected[key]) return;
	        _this2.nodes[a].connection.push(_this2.nodes[b]);
	        connected[key] = true;
	        _this2.nodes[b].connection.push(_this2.nodes[a]);
	        connected[b << 16 | a] = true;
	      };
	      geometry.faces.forEach(function (f) {
	        connect(f.a, f.b);
	        connect(f.b, f.c);
	        connect(f.c, f.a);
	      });
	    }
	  }, {
	    key: 'calcDistanceToFeaturePoint',
	    value: function calcDistanceToFeaturePoint(index) {
	      // this.nodes.forEach((node) => node.distanceToFP[index] = Number.MAX_VALUE)
	      var start = this.nodes[this.featurePointIndices[index]];
	      start.distanceToFP[index] = 0;
	      var processing = [start];
	
	      var _loop = function () {
	        var next = [];
	        processing.forEach(function (node) {
	          node.connection.forEach(function (connected) {
	            var distance = node.distanceToFP[index] + node.position.distanceTo(connected.position);
	            if (distance < connected.distanceToFP[index]) {
	              connected.distanceToFP[index] = distance;
	              next.push(connected);
	            }
	          });
	        });
	        processing = next;
	      };
	
	      while (processing.length) {
	        _loop();
	      }
	    }
	  }, {
	    key: 'calcWeightForNode',
	    value: function calcWeightForNode(node) {
	      var _this3 = this;
	
	      var nearest = node.nearestFeaturePointIndex();
	      var fp1 = this.nodes[this.featurePointIndices[nearest]];
	      var p = node.position.clone().sub(fp1.position);
	      var angles = this.featurePointIndices.map(function (index, i) {
	        if (index < 0) return NaN;
	        var node = _this3.nodes[index].position.clone().sub(fp1.position);
	        var angle = p.angleTo(node);
	        return { index: i, angle: angle };
	      }).filter(function (a) {
	        return !isNaN(a.angle) && a.angle < Math.PI / 2;
	      }).sort(function (a, b) {
	        return a.angle - b.angle;
	      });
	
	      var d = 0;
	      switch (angles.length) {
	        case 0:
	          break;
	        case 1:
	          d = fp1.distanceToFP[angles[0].index] / Math.cos(angles[0].angle);
	          break;
	        default:
	          var d2 = fp1.distanceToFP[angles[0].index];
	          var d3 = fp1.distanceToFP[angles[1].index];
	          var cos2 = Math.cos(angles[0].angle);
	          var cos3 = Math.cos(angles[1].angle);
	          d = (d2 * cos2 + d3 * cos3) / (cos2 + cos3);
	          break;
	      }
	
	      if (d == 0) {
	        node.weights = this.featurePointIndices.map(function (id, i) {
	          return i == nearest ? 1 : 0;
	        });
	      } else {
	        (function () {
	          var HALF_PI = Math.PI / 2;
	          node.weights = [];
	          node.weights[nearest] = Math.max(0, Math.sin(HALF_PI * (1.0 - node.distanceToFP[nearest] / d)));
	          angles.forEach(function (a) {
	            if (node.distanceToFP[a.index] < d) {
	              node.weights[a.index] = Math.sin(HALF_PI * (1.0 - node.distanceToFP[a.index] / d));
	            }
	          });
	        })();
	      }
	
	      node.weights = node.weights.map(function (w, i) {
	        return { i: i, w: w };
	      }).sort(function (a, b) {
	        return b.w - a.w;
	      }).filter(function (w) {
	        return w.w > 0;
	      }).slice(0, 4);
	      // let total = node.weights.reduce((p, w) => p + w.w, 0)
	      // node.weights.forEach((w) => {
	      //   w.w /= total
	      // })
	      // console.log(node.index, node.weights);
	
	      node.weights.forEach(function (w) {
	        var d = node.distanceToFP[w.i];
	        w.f = d == 0 ? 1 : w.w / (d * d);
	      });
	      // console.log(node.weights)
	    }
	  }, {
	    key: 'initTexture',
	    value: function initTexture() {
	      var _this4 = this;
	
	      this.textureCanvas = document.createElement('canvas');
	      this.textureCanvas.id = 'texture';
	      this.textureCanvas.width = 512;
	      this.textureCanvas.height = 512;
	      this.textureContext = this.textureCanvas.getContext('2d');
	      __webpack_require__(/*! ctx-get-transform */ 18)(this.textureContext);
	      this.textureContext.fillStyle = 'white';
	      this.textureContext.fillRect(0, 0, this.textureCanvas.width, this.textureCanvas.height);
	      // document.body.appendChild(this.textureCanvas);
	
	      this.texture = new THREE.Texture(this.textureCanvas);
	      this.texture.needsUpdate = true;
	      // this.material.map = this.texture;
	      this.material.uniforms.map.value = this.texture;
	
	      if (this.tracker.currentPosition) {
	        (function () {
	          var min = [Number.MAX_VALUE, Number.MAX_VALUE];
	          var max = [Number.MIN_VALUE, Number.MIN_VALUE];
	          _this4.tracker.currentPosition.forEach(function (p) {
	            var x = p[0];
	            var y = p[1];
	            if (x < min[0]) min[0] = x;
	            if (x > max[0]) max[0] = x;
	            if (y < min[1]) min[1] = y;
	            if (y > max[1]) max[1] = y;
	          });
	          var center = _this4.tracker.currentPosition[33];
	          var size = Math.max(center[0] - min[0], max[0] - center[0], center[1] - min[1], max[1] - center[1]);
	          _this4.textureContext.save();
	          var scale = 256 * 0.95 / size;
	          _this4.textureContext.translate(256, 256);
	          _this4.textureContext.scale(scale, scale);
	          _this4.textureContext.translate(-center[0], -center[1]);
	          _this4.textureContext.drawImage(_this4.tracker.target, 0, 0);
	          var mtx = _this4.textureContext.getTransform();
	          // this.textureContext.drawImage(this.tracker.debugCanvas, 0, 0);
	          _this4.textureContext.restore();
	
	          var fpuv = [];
	
	          _this4.textureContext.save();
	          _this4.textureContext.fillStyle = 'rgba(128, 255, 0, 0.5)';
	          _this4.tracker.currentPosition.forEach(function (p) {
	            var q = _glMatrix.vec2.transformMat3(_glMatrix.vec2.create(), p, mtx);
	            fpuv.push([q[0] / 256 - 1, q[1] / 256 - 1]);
	          });
	
	          {
	            _this4.textureContext.fillStyle = 'red';
	            var v1 = _this4.tracker.currentPosition[14];
	            var v0 = _this4.tracker.currentPosition[0];
	            var _center = _glMatrix.vec2.lerp(_glMatrix.vec2.create(), v1, v0, 0.5);
	            var xAxis = _glMatrix.vec2.sub(_glMatrix.vec2.create(), v1, _center);
	            var _scale = _glMatrix.vec2.len(xAxis);
	            var rotation = _glMatrix.mat3.create();
	            _glMatrix.mat3.rotate(rotation, rotation, Math.atan2(xAxis[1], xAxis[0]));
	            for (var i = 71; i < _this4.featurePoints.length; i++) {
	              var fp = _this4.featurePoints[i].initialPosition;
	              var p = _glMatrix.vec2.scale(_glMatrix.vec2.create(), [fp.x, -fp.y], _scale);
	              _glMatrix.vec2.transformMat3(p, p, rotation);
	              _glMatrix.vec2.add(p, p, _center);
	              _glMatrix.vec2.transformMat3(p, p, mtx);
	              // this.textureContext.fillRect(p[0] - 3, p[1] - 3, 6, 6);
	              fpuv.push([p[0] / 256 - 1, p[1] / 256 - 1]);
	            }
	          }
	
	          _this4.featurePointUV = fpuv;
	
	          _this4.textureContext.fillStyle = 'rgba(0, 0, 255, 0.5)';
	
	          var displacement = _this4.featurePoints.map(function (mesh, i) {
	            if (!mesh) return;
	            var node = _this4.nodes[mesh.vertexIndex];
	            return [fpuv[i][0] - node.position.x, -fpuv[i][1] - node.position.y];
	          });
	
	          var uvs = _this4.nodes.map(function (target) {
	            var p = _glMatrix.vec2.create();
	            if (target.weights.length == 1) {
	              var w = target.weights[0];
	              _glMatrix.vec2.add(p, [target.position.x, target.position.y], _glMatrix.vec2.scale([], displacement[w.i], w.w));
	            } else {
	              (function () {
	                var a = _glMatrix.vec2.create();
	                var b = 0;
	                target.weights.forEach(function (w) {
	                  var dp = _glMatrix.vec2.scale([], displacement[w.i], w.w);
	                  var dist = 1.0 / (target.distanceToFP[w.i] * target.distanceToFP[w.i]);
	                  _glMatrix.vec2.add(a, a, _glMatrix.vec2.scale(dp, dp, dist));
	                  b += w.w * dist;
	                });
	                _glMatrix.vec2.scale(a, a, 1 / b);
	                _glMatrix.vec2.add(p, [target.position.x, target.position.y], a);
	              })();
	            }
	            return [(p[0] * 256 + 256) / 512, (p[1] * 256 + 256) / 512];
	          });
	
	          _this4.geometry.faces.forEach(function (face, i) {
	            var uv = _this4.geometry.faceVertexUvs[0][i];
	            uv[0].x = uvs[face.a][0];
	            uv[0].y = uvs[face.a][1];
	            uv[1].x = uvs[face.b][0];
	            uv[1].y = uvs[face.b][1];
	            uv[2].x = uvs[face.c][0];
	            uv[2].y = uvs[face.c][1];
	          });
	          _this4.geometry.uvsNeedUpdate = true;
	
	          _this4.textureContext.restore();
	        })();
	      }
	    }
	  }, {
	    key: 'initMesh',
	    value: function initMesh() {
	      var _this5 = this;
	
	      if (this.tracker.normalizedPosition) {
	        this.tracker.normalizedPosition.forEach(function (np, i) {
	          var fp = _this5.featurePoints[i];
	          if (fp) {
	            // let scale = (500 - fp.localToWorld(new THREE.Vector3()).z) / 500 * 0.5;
	            var _scale2 = (500 - fp.position.z * 150) / 500 * 0.5;
	            // scale = 0.3;
	            // fp.position.x += (np[0] * scale - fp.position.x) * 0.3;
	            // fp.position.y += (-np[1] * scale - fp.position.y) * 0.3;
	            fp.position.x = np[0] * _scale2;
	            fp.position.y = -np[1] * _scale2;
	            // fp.position.z *= 2 * scale;
	          }
	        });
	
	        // console.log(this.featurePoints);
	        // [33, 41, 62, 34, 35, 36, 42, 37, 43, 38, 39, 40].forEach((i) => {
	        //   let fp = this.featurePoints[i];
	        //   fp.position.x += 0.2;
	        // });
	
	        var v1 = this.featurePoints[14].position.clone();
	        var v0 = this.featurePoints[0].position.clone();
	        var center = new THREE.Vector3().lerpVectors(v1, v0, 0.5);
	        var rotation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), v1.clone().sub(center).normalize());
	        var scale = v1.clone().sub(center).length();
	        for (var i = 71; i < this.featurePoints.length; i++) {
	          var fp = this.featurePoints[i];
	          fp.position.copy(fp.initialPosition.clone().multiplyScalar(scale).applyQuaternion(rotation).add(center));
	        }
	      }
	    }
	  }, {
	    key: 'initEyeMouth',
	    value: function initEyeMouth() {
	      var _this6 = this;
	
	      // let faceUVs = []
	      // this.geometry.faces.forEach((face, i) => {
	      //   let uv = this.geometry.faceVertexUvs[0][i]
	      //   faceUVs[face.a] = uv[0]
	      //   faceUVs[face.b] = uv[1]
	      //   faceUVs[face.c] = uv[2]
	      // })
	
	      var geometry = new THREE.JSONLoader().parse(__webpack_require__(/*! ./data/eyemouth3.json */ 48)).geometry;
	
	      var vertexIndices = geometry.vertices.map(function (v) {
	        var dist = Number.MAX_VALUE;
	        var index = -1;
	        _this6.geometry.vertices.forEach(function (fv, i) {
	          var d = fv.distanceToSquared(v);
	          if (d < dist) {
	            dist = d;
	            index = i;
	          }
	        });
	        v.copy(_this6.geometry.vertices[index]);
	        v.followVertex = index;
	        return index;
	      });
	
	      // geometry.faces.forEach((face, i) => {
	      //   geometry.faceVertexUvs[0][i] = [
	      //     faceUVs[vertexIndices[face.a]],
	      //     faceUVs[vertexIndices[face.b]],
	      //     faceUVs[vertexIndices[face.c]]
	      //   ]
	      // })
	      this.eyemouth = new THREE.Mesh(geometry, this.material);
	      this.add(this.eyemouth);
	    }
	  }, {
	    key: 'deformVertices',
	    value: function deformVertices() {
	      var _this7 = this;
	
	      var vertices = this.geometry.vertices;
	
	      var displacement = this.featurePoints.map(function (mesh) {
	        if (!mesh) return;
	        var node = _this7.nodes[mesh.vertexIndex];
	        return mesh.position.clone().sub(node.position);
	      });
	
	      this.nodes.forEach(function (target) {
	        if (target.weights.length == 1) {
	          var w = target.weights[0];
	          vertices[target.index].copy(target.position).add(displacement[w.i].clone().multiplyScalar(w.w));
	        } else {
	          (function () {
	            var a = new THREE.Vector3();
	            var b = 0;
	            target.weights.forEach(function (w) {
	              // let dp = displacement[w.i].clone().multiplyScalar(w.w)
	              // let dist = 1.0 / (target.distanceToFP[w.i] * target.distanceToFP[w.i])
	              // a.add(dp.multiplyScalar(dist))
	              // b += w.w * dist
	              a.add(displacement[w.i].clone().multiplyScalar(w.f));
	              b += w.f;
	            });
	            a.multiplyScalar(1 / b);
	            vertices[target.index].copy(target.position).add(a);
	          })();
	        }
	      });
	
	      this.geometry.verticesNeedUpdate = true;
	
	      this.eyemouth.geometry.vertices.forEach(function (v) {
	        v.copy(_this7.geometry.vertices[v.followVertex]);
	      });
	      this.eyemouth.geometry.verticesNeedUpdate = true;
	    }
	  }, {
	    key: 'animate',
	    value: function animate(t) {
	      var _this8 = this;
	
	      [56, 57, 58, 51, 52, 53, 54, 55, 4, 5, 6, 7, 8, 9, 10].forEach(function (i) {
	        var p = _this8.featurePoints[i];
	        if (p) {
	          var node = _this8.nodes[p.vertexIndex];
	          p.position.y = node.position.y - (Math.sin(t * 0.005) + 1) * 0.05;
	        }
	      });
	
	      // [33, 41, 62, 34, 35, 36, 42, 37, 43, 38, 39, 40].forEach((i) => {
	      //   let p = this.featurePoints[i]
	      //   if (p) {
	      //     let node = this.nodes[p.vertexIndex]
	      //     p.position.x = node.position.x + Math.sin(t * 0.001) * 0.1
	      //   }
	      // })
	
	      this.featurePoints.forEach(function (p) {
	        if (p) {
	          var node = _this8.nodes[p.vertexIndex];
	          p.position.x = node.position.x + Math.sin(t * 0.001 + node.position.y * 3) * 0.2;
	        }
	      });
	
	      this.deformVertices();
	    }
	  }, {
	    key: 'export',
	    value: function _export() {
	      return {
	        face: this.exportFace(),
	        rightEye: this.exportRightEye(),
	        leftEye: this.exportLeftEye(),
	        mouth: this.exportMouth()
	      };
	    }
	  }, {
	    key: 'exportFace',
	    value: function exportFace() {
	      var position = [];
	      this.geometry.vertices.forEach(function (v) {
	        position.push(parseFloat(v.x.toPrecision(4)), parseFloat(v.y.toPrecision(4)), parseFloat(v.z.toPrecision(4)));
	      });
	
	      var index = [];
	      this.geometry.faces.forEach(function (f) {
	        index.push(f.a, f.b, f.c);
	      });
	
	      var featurePoint = this.featurePoints.map(function (fp) {
	        return fp ? fp.vertexIndex : -1;
	      });
	
	      var weight = this.nodes.map(function (node) {
	        return node.weights.map(function (w) {
	          return [w.i, parseFloat(w.f.toPrecision(4))];
	        });
	      });
	
	      return {
	        position: position,
	        index: index,
	        featurePoint: featurePoint,
	        weight: weight
	      };
	    }
	  }, {
	    key: 'exportRightEye',
	    value: function exportRightEye() {
	      var _this9 = this;
	
	      var index = [];
	      var add = function add(i) {
	        var v = _this9.eyemouth.geometry.vertices[i];
	        if (v.x < 0 && v.y > 0) {
	          index.push(v.followVertex);
	        }
	      };
	      this.eyemouth.geometry.faces.forEach(function (f) {
	        add(f.a);
	        add(f.b);
	        add(f.c);
	      });
	      return { index: index };
	    }
	  }, {
	    key: 'exportLeftEye',
	    value: function exportLeftEye() {
	      var _this10 = this;
	
	      var index = [];
	      var add = function add(i) {
	        var v = _this10.eyemouth.geometry.vertices[i];
	        if (v.x > 0 && v.y > 0) {
	          index.push(v.followVertex);
	        }
	      };
	      this.eyemouth.geometry.faces.forEach(function (f) {
	        add(f.a);
	        add(f.b);
	        add(f.c);
	      });
	      return { index: index };
	    }
	  }, {
	    key: 'exportMouth',
	    value: function exportMouth() {
	      var _this11 = this;
	
	      var index = [];
	      var add = function add(i) {
	        var v = _this11.eyemouth.geometry.vertices[i];
	        if (v.y < 0) {
	          index.push(v.followVertex);
	        }
	      };
	      this.eyemouth.geometry.faces.forEach(function (f) {
	        add(f.a);
	        add(f.b);
	        add(f.c);
	      });
	      return { index: index };
	    }
	  }]);
	
	  return _default;
	})(THREE.Mesh);
	
	exports['default'] = _default;
	module.exports = exports['default'];

/***/ },
/* 4 */
/*!**********************************!*\
  !*** ./web_modules/OBJLoader.js ***!
  \**********************************/
/***/ function(module, exports) {

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */
	
	THREE.OBJLoader = function ( manager ) {
	
		this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
	
	};
	
	THREE.OBJLoader.prototype = {
	
		constructor: THREE.OBJLoader,
	
		load: function ( url, onLoad, onProgress, onError ) {
	
			var scope = this;
	
			var loader = new THREE.XHRLoader( scope.manager );
			loader.setCrossOrigin( this.crossOrigin );
			loader.load( url, function ( text ) {
	
				onLoad( scope.parse( text ) );
	
			}, onProgress, onError );
	
		},
	
		setCrossOrigin: function ( value ) {
	
			this.crossOrigin = value;
	
		},
	
		parse: function ( text ) {
	
			console.time( 'OBJLoader' );
	
			var object, objects = [];
			var geometry, material;
	
			function parseVertexIndex( value ) {
	
				var index = parseInt( value );
	
				return ( index >= 0 ? index - 1 : index + vertices.length / 3 ) * 3;
	
			}
	
			function parseNormalIndex( value ) {
	
				var index = parseInt( value );
	
				return ( index >= 0 ? index - 1 : index + normals.length / 3 ) * 3;
	
			}
	
			function parseUVIndex( value ) {
	
				var index = parseInt( value );
	
				return ( index >= 0 ? index - 1 : index + uvs.length / 2 ) * 2;
	
			}
	
			function addVertex( a, b, c ) {
	
				geometry.vertices.push(
					vertices[ a ], vertices[ a + 1 ], vertices[ a + 2 ],
					vertices[ b ], vertices[ b + 1 ], vertices[ b + 2 ],
					vertices[ c ], vertices[ c + 1 ], vertices[ c + 2 ]
				);
	
			}
	
			function addNormal( a, b, c ) {
	
				geometry.normals.push(
					normals[ a ], normals[ a + 1 ], normals[ a + 2 ],
					normals[ b ], normals[ b + 1 ], normals[ b + 2 ],
					normals[ c ], normals[ c + 1 ], normals[ c + 2 ]
				);
	
			}
	
			function addUV( a, b, c ) {
	
				geometry.uvs.push(
					uvs[ a ], uvs[ a + 1 ],
					uvs[ b ], uvs[ b + 1 ],
					uvs[ c ], uvs[ c + 1 ]
				);
	
			}
	
			function addFace( a, b, c, d,  ua, ub, uc, ud, na, nb, nc, nd ) {
	
				var ia = parseVertexIndex( a );
				var ib = parseVertexIndex( b );
				var ic = parseVertexIndex( c );
				var id;
	
				if ( d === undefined ) {
	
					addVertex( ia, ib, ic );
	
				} else {
	
					id = parseVertexIndex( d );
	
					addVertex( ia, ib, id );
					addVertex( ib, ic, id );
	
				}
	
				if ( ua !== undefined ) {
	
					ia = parseUVIndex( ua );
					ib = parseUVIndex( ub );
					ic = parseUVIndex( uc );
	
					if ( d === undefined ) {
	
						addUV( ia, ib, ic );
	
					} else {
	
						id = parseUVIndex( ud );
	
						addUV( ia, ib, id );
						addUV( ib, ic, id );
	
					}
	
				}
	
				if ( na !== undefined ) {
	
					ia = parseNormalIndex( na );
					ib = parseNormalIndex( nb );
					ic = parseNormalIndex( nc );
	
					if ( d === undefined ) {
	
						addNormal( ia, ib, ic );
	
					} else {
	
						id = parseNormalIndex( nd );
	
						addNormal( ia, ib, id );
						addNormal( ib, ic, id );
	
					}
	
				}
	
			}
	
			// create mesh if no objects in text
	
			if ( /^o /gm.test( text ) === false ) {
	
				geometry = {
					vertices: [],
					normals: [],
					uvs: []
				};
	
				material = {
					name: ''
				};
	
				object = {
					name: '',
					geometry: geometry,
					material: material
				};
	
				objects.push( object );
	
			}
	
			var vertices = [];
			var normals = [];
			var uvs = [];
	
			// v float float float
	
			var vertex_pattern = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
	
			// vn float float float
	
			var normal_pattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
	
			// vt float float
	
			var uv_pattern = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
	
			// f vertex vertex vertex ...
	
			var face_pattern1 = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/;
	
			// f vertex/uv vertex/uv vertex/uv ...
	
			var face_pattern2 = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/;
	
			// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...
	
			var face_pattern3 = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/;
	
			// f vertex//normal vertex//normal vertex//normal ...
	
			var face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;
	
			//
	
			var lines = text.split( '\n' );
	
			for ( var i = 0; i < lines.length; i ++ ) {
	
				var line = lines[ i ];
				line = line.trim();
	
				var result;
	
				if ( line.length === 0 || line.charAt( 0 ) === '#' ) {
	
					continue;
	
				} else if ( ( result = vertex_pattern.exec( line ) ) !== null ) {
	
					// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
	
					vertices.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] ),
						parseFloat( result[ 3 ] )
					);
	
				} else if ( ( result = normal_pattern.exec( line ) ) !== null ) {
	
					// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
	
					normals.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] ),
						parseFloat( result[ 3 ] )
					);
	
				} else if ( ( result = uv_pattern.exec( line ) ) !== null ) {
	
					// ["vt 0.1 0.2", "0.1", "0.2"]
	
					uvs.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] )
					);
	
				} else if ( ( result = face_pattern1.exec( line ) ) !== null ) {
	
					// ["f 1 2 3", "1", "2", "3", undefined]
	
					addFace(
						result[ 1 ], result[ 2 ], result[ 3 ], result[ 4 ]
					);
	
				} else if ( ( result = face_pattern2.exec( line ) ) !== null ) {
	
					// ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3", undefined, undefined, undefined]
	
					addFace(
						result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
						result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
					);
	
				} else if ( ( result = face_pattern3.exec( line ) ) !== null ) {
	
					// ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3", undefined, undefined, undefined, undefined]
	
					addFace(
						result[ 2 ], result[ 6 ], result[ 10 ], result[ 14 ],
						result[ 3 ], result[ 7 ], result[ 11 ], result[ 15 ],
						result[ 4 ], result[ 8 ], result[ 12 ], result[ 16 ]
					);
	
				} else if ( ( result = face_pattern4.exec( line ) ) !== null ) {
	
					// ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3", undefined, undefined, undefined]
	
					addFace(
						result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
						undefined, undefined, undefined, undefined,
						result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
					);
	
				} else if ( /^o /.test( line ) ) {
	
					geometry = {
						vertices: [],
						normals: [],
						uvs: []
					};
	
					material = {
						name: ''
					};
	
					object = {
						name: line.substring( 2 ).trim(),
						geometry: geometry,
						material: material
					};
	
					objects.push( object )
	
				} else if ( /^g /.test( line ) ) {
	
					// group
	
				} else if ( /^usemtl /.test( line ) ) {
	
					// material
	
					material.name = line.substring( 7 ).trim();
	
				} else if ( /^mtllib /.test( line ) ) {
	
					// mtl file
	
				} else if ( /^s /.test( line ) ) {
	
					// smooth shading
	
				} else {
	
					// console.log( "THREE.OBJLoader: Unhandled line " + line );
	
				}
	
			}
	
			var container = new THREE.Object3D();
	
			for ( var i = 0, l = objects.length; i < l; i ++ ) {
	
				object = objects[ i ];
				geometry = object.geometry;
	
				var buffergeometry = new THREE.BufferGeometry();
	
				buffergeometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry.vertices ), 3 ) );
	
				if ( geometry.normals.length > 0 ) {
	
					buffergeometry.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( geometry.normals ), 3 ) );
	
				}
	
				if ( geometry.uvs.length > 0 ) {
	
					buffergeometry.addAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry.uvs ), 2 ) );
	
				}
	
				material = new THREE.MeshLambertMaterial();
				material.name = object.material.name;
	
				var mesh = new THREE.Mesh( buffergeometry, material );
				mesh.name = object.name;
	
				container.add( mesh );
	
			}
	
			console.timeEnd( 'OBJLoader' );
	
			return container;
	
		}
	
	};


/***/ },
/* 5 */
/*!**************************************!*\
  !*** ./~/gl-matrix/src/gl-matrix.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview gl-matrix - High performance matrix and vector operations
	 * @author Brandon Jones
	 * @author Colin MacKenzie IV
	 * @version 2.3.0
	 */
	
	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	// END HEADER
	
	exports.glMatrix = __webpack_require__(/*! ./gl-matrix/common.js */ 6);
	exports.mat2 = __webpack_require__(/*! ./gl-matrix/mat2.js */ 7);
	exports.mat2d = __webpack_require__(/*! ./gl-matrix/mat2d.js */ 8);
	exports.mat3 = __webpack_require__(/*! ./gl-matrix/mat3.js */ 9);
	exports.mat4 = __webpack_require__(/*! ./gl-matrix/mat4.js */ 10);
	exports.quat = __webpack_require__(/*! ./gl-matrix/quat.js */ 11);
	exports.vec2 = __webpack_require__(/*! ./gl-matrix/vec2.js */ 14);
	exports.vec3 = __webpack_require__(/*! ./gl-matrix/vec3.js */ 12);
	exports.vec4 = __webpack_require__(/*! ./gl-matrix/vec4.js */ 13);

/***/ },
/* 6 */
/*!*********************************************!*\
  !*** ./~/gl-matrix/src/gl-matrix/common.js ***!
  \*********************************************/
/***/ function(module, exports) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	
	/**
	 * @class Common utilities
	 * @name glMatrix
	 */
	var glMatrix = {};
	
	// Constants
	glMatrix.EPSILON = 0.000001;
	glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
	glMatrix.RANDOM = Math.random;
	
	/**
	 * Sets the type of array used when creating new vectors and matrices
	 *
	 * @param {Type} type Array type, such as Float32Array or Array
	 */
	glMatrix.setMatrixArrayType = function(type) {
	    GLMAT_ARRAY_TYPE = type;
	}
	
	var degree = Math.PI / 180;
	
	/**
	* Convert Degree To Radian
	*
	* @param {Number} Angle in Degrees
	*/
	glMatrix.toRadian = function(a){
	     return a * degree;
	}
	
	module.exports = glMatrix;


/***/ },
/* 7 */
/*!*******************************************!*\
  !*** ./~/gl-matrix/src/gl-matrix/mat2.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	
	var glMatrix = __webpack_require__(/*! ./common.js */ 6);
	
	/**
	 * @class 2x2 Matrix
	 * @name mat2
	 */
	var mat2 = {};
	
	/**
	 * Creates a new identity mat2
	 *
	 * @returns {mat2} a new 2x2 matrix
	 */
	mat2.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};
	
	/**
	 * Creates a new mat2 initialized with values from an existing matrix
	 *
	 * @param {mat2} a matrix to clone
	 * @returns {mat2} a new 2x2 matrix
	 */
	mat2.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};
	
	/**
	 * Copy the values from one mat2 to another
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};
	
	/**
	 * Set a mat2 to the identity matrix
	 *
	 * @param {mat2} out the receiving matrix
	 * @returns {mat2} out
	 */
	mat2.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};
	
	/**
	 * Transpose the values of a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a1 = a[1];
	        out[1] = a[2];
	        out[2] = a1;
	    } else {
	        out[0] = a[0];
	        out[1] = a[2];
	        out[2] = a[1];
	        out[3] = a[3];
	    }
	    
	    return out;
	};
	
	/**
	 * Inverts a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.invert = function(out, a) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	
	        // Calculate the determinant
	        det = a0 * a3 - a2 * a1;
	
	    if (!det) {
	        return null;
	    }
	    det = 1.0 / det;
	    
	    out[0] =  a3 * det;
	    out[1] = -a1 * det;
	    out[2] = -a2 * det;
	    out[3] =  a0 * det;
	
	    return out;
	};
	
	/**
	 * Calculates the adjugate of a mat2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	mat2.adjoint = function(out, a) {
	    // Caching this value is nessecary if out == a
	    var a0 = a[0];
	    out[0] =  a[3];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] =  a0;
	
	    return out;
	};
	
	/**
	 * Calculates the determinant of a mat2
	 *
	 * @param {mat2} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat2.determinant = function (a) {
	    return a[0] * a[3] - a[2] * a[1];
	};
	
	/**
	 * Multiplies two mat2's
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the first operand
	 * @param {mat2} b the second operand
	 * @returns {mat2} out
	 */
	mat2.multiply = function (out, a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
	    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	    out[0] = a0 * b0 + a2 * b1;
	    out[1] = a1 * b0 + a3 * b1;
	    out[2] = a0 * b2 + a2 * b3;
	    out[3] = a1 * b2 + a3 * b3;
	    return out;
	};
	
	/**
	 * Alias for {@link mat2.multiply}
	 * @function
	 */
	mat2.mul = mat2.multiply;
	
	/**
	 * Rotates a mat2 by the given angle
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2} out
	 */
	mat2.rotate = function (out, a, rad) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = a0 *  c + a2 * s;
	    out[1] = a1 *  c + a3 * s;
	    out[2] = a0 * -s + a2 * c;
	    out[3] = a1 * -s + a3 * c;
	    return out;
	};
	
	/**
	 * Scales the mat2 by the dimensions in the given vec2
	 *
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the matrix to rotate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat2} out
	 **/
	mat2.scale = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0 * v0;
	    out[1] = a1 * v0;
	    out[2] = a2 * v1;
	    out[3] = a3 * v1;
	    return out;
	};
	
	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2.identity(dest);
	 *     mat2.rotate(dest, dest, rad);
	 *
	 * @param {mat2} out mat2 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2} out
	 */
	mat2.fromRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = c;
	    out[1] = s;
	    out[2] = -s;
	    out[3] = c;
	    return out;
	}
	
	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2.identity(dest);
	 *     mat2.scale(dest, dest, vec);
	 *
	 * @param {mat2} out mat2 receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat2} out
	 */
	mat2.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    return out;
	}
	
	/**
	 * Returns a string representation of a mat2
	 *
	 * @param {mat2} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat2.str = function (a) {
	    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};
	
	/**
	 * Returns Frobenius norm of a mat2
	 *
	 * @param {mat2} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat2.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
	};
	
	/**
	 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
	 * @param {mat2} L the lower triangular matrix 
	 * @param {mat2} D the diagonal matrix 
	 * @param {mat2} U the upper triangular matrix 
	 * @param {mat2} a the input matrix to factorize
	 */
	
	mat2.LDU = function (L, D, U, a) { 
	    L[2] = a[2]/a[0]; 
	    U[0] = a[0]; 
	    U[1] = a[1]; 
	    U[3] = a[3] - L[2] * U[1]; 
	    return [L, D, U];       
	}; 
	
	
	module.exports = mat2;


/***/ },
/* 8 */
/*!********************************************!*\
  !*** ./~/gl-matrix/src/gl-matrix/mat2d.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	
	var glMatrix = __webpack_require__(/*! ./common.js */ 6);
	
	/**
	 * @class 2x3 Matrix
	 * @name mat2d
	 * 
	 * @description 
	 * A mat2d contains six elements defined as:
	 * <pre>
	 * [a, c, tx,
	 *  b, d, ty]
	 * </pre>
	 * This is a short form for the 3x3 matrix:
	 * <pre>
	 * [a, c, tx,
	 *  b, d, ty,
	 *  0, 0, 1]
	 * </pre>
	 * The last row is ignored so the array is shorter and operations are faster.
	 */
	var mat2d = {};
	
	/**
	 * Creates a new identity mat2d
	 *
	 * @returns {mat2d} a new 2x3 matrix
	 */
	mat2d.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(6);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	};
	
	/**
	 * Creates a new mat2d initialized with values from an existing matrix
	 *
	 * @param {mat2d} a matrix to clone
	 * @returns {mat2d} a new 2x3 matrix
	 */
	mat2d.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(6);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    return out;
	};
	
	/**
	 * Copy the values from one mat2d to another
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the source matrix
	 * @returns {mat2d} out
	 */
	mat2d.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    return out;
	};
	
	/**
	 * Set a mat2d to the identity matrix
	 *
	 * @param {mat2d} out the receiving matrix
	 * @returns {mat2d} out
	 */
	mat2d.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	};
	
	/**
	 * Inverts a mat2d
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the source matrix
	 * @returns {mat2d} out
	 */
	mat2d.invert = function(out, a) {
	    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
	        atx = a[4], aty = a[5];
	
	    var det = aa * ad - ab * ac;
	    if(!det){
	        return null;
	    }
	    det = 1.0 / det;
	
	    out[0] = ad * det;
	    out[1] = -ab * det;
	    out[2] = -ac * det;
	    out[3] = aa * det;
	    out[4] = (ac * aty - ad * atx) * det;
	    out[5] = (ab * atx - aa * aty) * det;
	    return out;
	};
	
	/**
	 * Calculates the determinant of a mat2d
	 *
	 * @param {mat2d} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat2d.determinant = function (a) {
	    return a[0] * a[3] - a[1] * a[2];
	};
	
	/**
	 * Multiplies two mat2d's
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the first operand
	 * @param {mat2d} b the second operand
	 * @returns {mat2d} out
	 */
	mat2d.multiply = function (out, a, b) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
	    out[0] = a0 * b0 + a2 * b1;
	    out[1] = a1 * b0 + a3 * b1;
	    out[2] = a0 * b2 + a2 * b3;
	    out[3] = a1 * b2 + a3 * b3;
	    out[4] = a0 * b4 + a2 * b5 + a4;
	    out[5] = a1 * b4 + a3 * b5 + a5;
	    return out;
	};
	
	/**
	 * Alias for {@link mat2d.multiply}
	 * @function
	 */
	mat2d.mul = mat2d.multiply;
	
	/**
	 * Rotates a mat2d by the given angle
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2d} out
	 */
	mat2d.rotate = function (out, a, rad) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	    out[0] = a0 *  c + a2 * s;
	    out[1] = a1 *  c + a3 * s;
	    out[2] = a0 * -s + a2 * c;
	    out[3] = a1 * -s + a3 * c;
	    out[4] = a4;
	    out[5] = a5;
	    return out;
	};
	
	/**
	 * Scales the mat2d by the dimensions in the given vec2
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to translate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat2d} out
	 **/
	mat2d.scale = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0 * v0;
	    out[1] = a1 * v0;
	    out[2] = a2 * v1;
	    out[3] = a3 * v1;
	    out[4] = a4;
	    out[5] = a5;
	    return out;
	};
	
	/**
	 * Translates the mat2d by the dimensions in the given vec2
	 *
	 * @param {mat2d} out the receiving matrix
	 * @param {mat2d} a the matrix to translate
	 * @param {vec2} v the vec2 to translate the matrix by
	 * @returns {mat2d} out
	 **/
	mat2d.translate = function(out, a, v) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
	        v0 = v[0], v1 = v[1];
	    out[0] = a0;
	    out[1] = a1;
	    out[2] = a2;
	    out[3] = a3;
	    out[4] = a0 * v0 + a2 * v1 + a4;
	    out[5] = a1 * v0 + a3 * v1 + a5;
	    return out;
	};
	
	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.rotate(dest, dest, rad);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat2d} out
	 */
	mat2d.fromRotation = function(out, rad) {
	    var s = Math.sin(rad), c = Math.cos(rad);
	    out[0] = c;
	    out[1] = s;
	    out[2] = -s;
	    out[3] = c;
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	}
	
	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.scale(dest, dest, vec);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat2d} out
	 */
	mat2d.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = v[1];
	    out[4] = 0;
	    out[5] = 0;
	    return out;
	}
	
	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat2d.identity(dest);
	 *     mat2d.translate(dest, dest, vec);
	 *
	 * @param {mat2d} out mat2d receiving operation result
	 * @param {vec2} v Translation vector
	 * @returns {mat2d} out
	 */
	mat2d.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    out[4] = v[0];
	    out[5] = v[1];
	    return out;
	}
	
	/**
	 * Returns a string representation of a mat2d
	 *
	 * @param {mat2d} a matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat2d.str = function (a) {
	    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
	                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
	};
	
	/**
	 * Returns Frobenius norm of a mat2d
	 *
	 * @param {mat2d} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat2d.frob = function (a) { 
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
	}; 
	
	module.exports = mat2d;


/***/ },
/* 9 */
/*!*******************************************!*\
  !*** ./~/gl-matrix/src/gl-matrix/mat3.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	
	var glMatrix = __webpack_require__(/*! ./common.js */ 6);
	
	/**
	 * @class 3x3 Matrix
	 * @name mat3
	 */
	var mat3 = {};
	
	/**
	 * Creates a new identity mat3
	 *
	 * @returns {mat3} a new 3x3 matrix
	 */
	mat3.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(9);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	};
	
	/**
	 * Copies the upper-left 3x3 values into the given mat3.
	 *
	 * @param {mat3} out the receiving 3x3 matrix
	 * @param {mat4} a   the source 4x4 matrix
	 * @returns {mat3} out
	 */
	mat3.fromMat4 = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[4];
	    out[4] = a[5];
	    out[5] = a[6];
	    out[6] = a[8];
	    out[7] = a[9];
	    out[8] = a[10];
	    return out;
	};
	
	/**
	 * Creates a new mat3 initialized with values from an existing matrix
	 *
	 * @param {mat3} a matrix to clone
	 * @returns {mat3} a new 3x3 matrix
	 */
	mat3.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(9);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};
	
	/**
	 * Copy the values from one mat3 to another
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};
	
	/**
	 * Set a mat3 to the identity matrix
	 *
	 * @param {mat3} out the receiving matrix
	 * @returns {mat3} out
	 */
	mat3.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	};
	
	/**
	 * Transpose the values of a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a01 = a[1], a02 = a[2], a12 = a[5];
	        out[1] = a[3];
	        out[2] = a[6];
	        out[3] = a01;
	        out[5] = a[7];
	        out[6] = a02;
	        out[7] = a12;
	    } else {
	        out[0] = a[0];
	        out[1] = a[3];
	        out[2] = a[6];
	        out[3] = a[1];
	        out[4] = a[4];
	        out[5] = a[7];
	        out[6] = a[2];
	        out[7] = a[5];
	        out[8] = a[8];
	    }
	    
	    return out;
	};
	
	/**
	 * Inverts a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.invert = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],
	
	        b01 = a22 * a11 - a12 * a21,
	        b11 = -a22 * a10 + a12 * a20,
	        b21 = a21 * a10 - a11 * a20,
	
	        // Calculate the determinant
	        det = a00 * b01 + a01 * b11 + a02 * b21;
	
	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;
	
	    out[0] = b01 * det;
	    out[1] = (-a22 * a01 + a02 * a21) * det;
	    out[2] = (a12 * a01 - a02 * a11) * det;
	    out[3] = b11 * det;
	    out[4] = (a22 * a00 - a02 * a20) * det;
	    out[5] = (-a12 * a00 + a02 * a10) * det;
	    out[6] = b21 * det;
	    out[7] = (-a21 * a00 + a01 * a20) * det;
	    out[8] = (a11 * a00 - a01 * a10) * det;
	    return out;
	};
	
	/**
	 * Calculates the adjugate of a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	mat3.adjoint = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8];
	
	    out[0] = (a11 * a22 - a12 * a21);
	    out[1] = (a02 * a21 - a01 * a22);
	    out[2] = (a01 * a12 - a02 * a11);
	    out[3] = (a12 * a20 - a10 * a22);
	    out[4] = (a00 * a22 - a02 * a20);
	    out[5] = (a02 * a10 - a00 * a12);
	    out[6] = (a10 * a21 - a11 * a20);
	    out[7] = (a01 * a20 - a00 * a21);
	    out[8] = (a00 * a11 - a01 * a10);
	    return out;
	};
	
	/**
	 * Calculates the determinant of a mat3
	 *
	 * @param {mat3} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat3.determinant = function (a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8];
	
	    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
	};
	
	/**
	 * Multiplies two mat3's
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the first operand
	 * @param {mat3} b the second operand
	 * @returns {mat3} out
	 */
	mat3.multiply = function (out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],
	
	        b00 = b[0], b01 = b[1], b02 = b[2],
	        b10 = b[3], b11 = b[4], b12 = b[5],
	        b20 = b[6], b21 = b[7], b22 = b[8];
	
	    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
	    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
	    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
	
	    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
	    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
	    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
	
	    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
	    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
	    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
	    return out;
	};
	
	/**
	 * Alias for {@link mat3.multiply}
	 * @function
	 */
	mat3.mul = mat3.multiply;
	
	/**
	 * Translate a mat3 by the given vector
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to translate
	 * @param {vec2} v vector to translate by
	 * @returns {mat3} out
	 */
	mat3.translate = function(out, a, v) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],
	        x = v[0], y = v[1];
	
	    out[0] = a00;
	    out[1] = a01;
	    out[2] = a02;
	
	    out[3] = a10;
	    out[4] = a11;
	    out[5] = a12;
	
	    out[6] = x * a00 + y * a10 + a20;
	    out[7] = x * a01 + y * a11 + a21;
	    out[8] = x * a02 + y * a12 + a22;
	    return out;
	};
	
	/**
	 * Rotates a mat3 by the given angle
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat3} out
	 */
	mat3.rotate = function (out, a, rad) {
	    var a00 = a[0], a01 = a[1], a02 = a[2],
	        a10 = a[3], a11 = a[4], a12 = a[5],
	        a20 = a[6], a21 = a[7], a22 = a[8],
	
	        s = Math.sin(rad),
	        c = Math.cos(rad);
	
	    out[0] = c * a00 + s * a10;
	    out[1] = c * a01 + s * a11;
	    out[2] = c * a02 + s * a12;
	
	    out[3] = c * a10 - s * a00;
	    out[4] = c * a11 - s * a01;
	    out[5] = c * a12 - s * a02;
	
	    out[6] = a20;
	    out[7] = a21;
	    out[8] = a22;
	    return out;
	};
	
	/**
	 * Scales the mat3 by the dimensions in the given vec2
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to rotate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat3} out
	 **/
	mat3.scale = function(out, a, v) {
	    var x = v[0], y = v[1];
	
	    out[0] = x * a[0];
	    out[1] = x * a[1];
	    out[2] = x * a[2];
	
	    out[3] = y * a[3];
	    out[4] = y * a[4];
	    out[5] = y * a[5];
	
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    return out;
	};
	
	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.translate(dest, dest, vec);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {vec2} v Translation vector
	 * @returns {mat3} out
	 */
	mat3.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 1;
	    out[5] = 0;
	    out[6] = v[0];
	    out[7] = v[1];
	    out[8] = 1;
	    return out;
	}
	
	/**
	 * Creates a matrix from a given angle
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.rotate(dest, dest, rad);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat3} out
	 */
	mat3.fromRotation = function(out, rad) {
	    var s = Math.sin(rad), c = Math.cos(rad);
	
	    out[0] = c;
	    out[1] = s;
	    out[2] = 0;
	
	    out[3] = -s;
	    out[4] = c;
	    out[5] = 0;
	
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	}
	
	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat3.identity(dest);
	 *     mat3.scale(dest, dest, vec);
	 *
	 * @param {mat3} out mat3 receiving operation result
	 * @param {vec2} v Scaling vector
	 * @returns {mat3} out
	 */
	mat3.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	
	    out[3] = 0;
	    out[4] = v[1];
	    out[5] = 0;
	
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 1;
	    return out;
	}
	
	/**
	 * Copies the values from a mat2d into a mat3
	 *
	 * @param {mat3} out the receiving matrix
	 * @param {mat2d} a the matrix to copy
	 * @returns {mat3} out
	 **/
	mat3.fromMat2d = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = 0;
	
	    out[3] = a[2];
	    out[4] = a[3];
	    out[5] = 0;
	
	    out[6] = a[4];
	    out[7] = a[5];
	    out[8] = 1;
	    return out;
	};
	
	/**
	* Calculates a 3x3 matrix from the given quaternion
	*
	* @param {mat3} out mat3 receiving operation result
	* @param {quat} q Quaternion to create matrix from
	*
	* @returns {mat3} out
	*/
	mat3.fromQuat = function (out, q) {
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,
	
	        xx = x * x2,
	        yx = y * x2,
	        yy = y * y2,
	        zx = z * x2,
	        zy = z * y2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;
	
	    out[0] = 1 - yy - zz;
	    out[3] = yx - wz;
	    out[6] = zx + wy;
	
	    out[1] = yx + wz;
	    out[4] = 1 - xx - zz;
	    out[7] = zy - wx;
	
	    out[2] = zx - wy;
	    out[5] = zy + wx;
	    out[8] = 1 - xx - yy;
	
	    return out;
	};
	
	/**
	* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
	*
	* @param {mat3} out mat3 receiving operation result
	* @param {mat4} a Mat4 to derive the normal matrix from
	*
	* @returns {mat3} out
	*/
	mat3.normalFromMat4 = function (out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
	
	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,
	
	        // Calculate the determinant
	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	
	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;
	
	    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	
	    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	
	    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	
	    return out;
	};
	
	/**
	 * Returns a string representation of a mat3
	 *
	 * @param {mat3} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat3.str = function (a) {
	    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
	                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
	                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
	};
	
	/**
	 * Returns Frobenius norm of a mat3
	 *
	 * @param {mat3} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat3.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
	};
	
	
	module.exports = mat3;


/***/ },
/* 10 */
/*!*******************************************!*\
  !*** ./~/gl-matrix/src/gl-matrix/mat4.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	
	var glMatrix = __webpack_require__(/*! ./common.js */ 6);
	
	/**
	 * @class 4x4 Matrix
	 * @name mat4
	 */
	var mat4 = {};
	
	/**
	 * Creates a new identity mat4
	 *
	 * @returns {mat4} a new 4x4 matrix
	 */
	mat4.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(16);
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};
	
	/**
	 * Creates a new mat4 initialized with values from an existing matrix
	 *
	 * @param {mat4} a matrix to clone
	 * @returns {mat4} a new 4x4 matrix
	 */
	mat4.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(16);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};
	
	/**
	 * Copy the values from one mat4 to another
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    out[4] = a[4];
	    out[5] = a[5];
	    out[6] = a[6];
	    out[7] = a[7];
	    out[8] = a[8];
	    out[9] = a[9];
	    out[10] = a[10];
	    out[11] = a[11];
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};
	
	/**
	 * Set a mat4 to the identity matrix
	 *
	 * @param {mat4} out the receiving matrix
	 * @returns {mat4} out
	 */
	mat4.identity = function(out) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	};
	
	/**
	 * Transpose the values of a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.transpose = function(out, a) {
	    // If we are transposing ourselves we can skip a few steps but have to cache some values
	    if (out === a) {
	        var a01 = a[1], a02 = a[2], a03 = a[3],
	            a12 = a[6], a13 = a[7],
	            a23 = a[11];
	
	        out[1] = a[4];
	        out[2] = a[8];
	        out[3] = a[12];
	        out[4] = a01;
	        out[6] = a[9];
	        out[7] = a[13];
	        out[8] = a02;
	        out[9] = a12;
	        out[11] = a[14];
	        out[12] = a03;
	        out[13] = a13;
	        out[14] = a23;
	    } else {
	        out[0] = a[0];
	        out[1] = a[4];
	        out[2] = a[8];
	        out[3] = a[12];
	        out[4] = a[1];
	        out[5] = a[5];
	        out[6] = a[9];
	        out[7] = a[13];
	        out[8] = a[2];
	        out[9] = a[6];
	        out[10] = a[10];
	        out[11] = a[14];
	        out[12] = a[3];
	        out[13] = a[7];
	        out[14] = a[11];
	        out[15] = a[15];
	    }
	    
	    return out;
	};
	
	/**
	 * Inverts a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.invert = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
	
	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,
	
	        // Calculate the determinant
	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	
	    if (!det) { 
	        return null; 
	    }
	    det = 1.0 / det;
	
	    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
	
	    return out;
	};
	
	/**
	 * Calculates the adjugate of a mat4
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the source matrix
	 * @returns {mat4} out
	 */
	mat4.adjoint = function(out, a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
	
	    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
	    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
	    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
	    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
	    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
	    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
	    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
	    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
	    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
	    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
	    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
	    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
	    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
	    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
	    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
	    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
	    return out;
	};
	
	/**
	 * Calculates the determinant of a mat4
	 *
	 * @param {mat4} a the source matrix
	 * @returns {Number} determinant of a
	 */
	mat4.determinant = function (a) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
	
	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32;
	
	    // Calculate the determinant
	    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	};
	
	/**
	 * Multiplies two mat4's
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the first operand
	 * @param {mat4} b the second operand
	 * @returns {mat4} out
	 */
	mat4.multiply = function (out, a, b) {
	    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
	
	    // Cache only the current line of the second matrix
	    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
	    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
	
	    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
	    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
	
	    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
	    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
	
	    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
	    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
	    return out;
	};
	
	/**
	 * Alias for {@link mat4.multiply}
	 * @function
	 */
	mat4.mul = mat4.multiply;
	
	/**
	 * Translate a mat4 by the given vector
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to translate
	 * @param {vec3} v vector to translate by
	 * @returns {mat4} out
	 */
	mat4.translate = function (out, a, v) {
	    var x = v[0], y = v[1], z = v[2],
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23;
	
	    if (a === out) {
	        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
	        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
	        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
	        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	    } else {
	        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];
	
	        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
	        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
	        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;
	
	        out[12] = a00 * x + a10 * y + a20 * z + a[12];
	        out[13] = a01 * x + a11 * y + a21 * z + a[13];
	        out[14] = a02 * x + a12 * y + a22 * z + a[14];
	        out[15] = a03 * x + a13 * y + a23 * z + a[15];
	    }
	
	    return out;
	};
	
	/**
	 * Scales the mat4 by the dimensions in the given vec3
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {vec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 **/
	mat4.scale = function(out, a, v) {
	    var x = v[0], y = v[1], z = v[2];
	
	    out[0] = a[0] * x;
	    out[1] = a[1] * x;
	    out[2] = a[2] * x;
	    out[3] = a[3] * x;
	    out[4] = a[4] * y;
	    out[5] = a[5] * y;
	    out[6] = a[6] * y;
	    out[7] = a[7] * y;
	    out[8] = a[8] * z;
	    out[9] = a[9] * z;
	    out[10] = a[10] * z;
	    out[11] = a[11] * z;
	    out[12] = a[12];
	    out[13] = a[13];
	    out[14] = a[14];
	    out[15] = a[15];
	    return out;
	};
	
	/**
	 * Rotates a mat4 by the given angle around the given axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {vec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */
	mat4.rotate = function (out, a, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t,
	        a00, a01, a02, a03,
	        a10, a11, a12, a13,
	        a20, a21, a22, a23,
	        b00, b01, b02,
	        b10, b11, b12,
	        b20, b21, b22;
	
	    if (Math.abs(len) < glMatrix.EPSILON) { return null; }
	    
	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;
	
	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;
	
	    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
	    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
	    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];
	
	    // Construct the elements of the rotation matrix
	    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
	    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
	    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;
	
	    // Perform rotation-specific matrix multiplication
	    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
	    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
	    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
	    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
	    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
	    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
	    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
	    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
	    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
	    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
	    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
	    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
	
	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }
	    return out;
	};
	
	/**
	 * Rotates a matrix by the given angle around the X axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.rotateX = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];
	
	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[0]  = a[0];
	        out[1]  = a[1];
	        out[2]  = a[2];
	        out[3]  = a[3];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }
	
	    // Perform axis-specific matrix multiplication
	    out[4] = a10 * c + a20 * s;
	    out[5] = a11 * c + a21 * s;
	    out[6] = a12 * c + a22 * s;
	    out[7] = a13 * c + a23 * s;
	    out[8] = a20 * c - a10 * s;
	    out[9] = a21 * c - a11 * s;
	    out[10] = a22 * c - a12 * s;
	    out[11] = a23 * c - a13 * s;
	    return out;
	};
	
	/**
	 * Rotates a matrix by the given angle around the Y axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.rotateY = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a20 = a[8],
	        a21 = a[9],
	        a22 = a[10],
	        a23 = a[11];
	
	    if (a !== out) { // If the source and destination differ, copy the unchanged rows
	        out[4]  = a[4];
	        out[5]  = a[5];
	        out[6]  = a[6];
	        out[7]  = a[7];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }
	
	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c - a20 * s;
	    out[1] = a01 * c - a21 * s;
	    out[2] = a02 * c - a22 * s;
	    out[3] = a03 * c - a23 * s;
	    out[8] = a00 * s + a20 * c;
	    out[9] = a01 * s + a21 * c;
	    out[10] = a02 * s + a22 * c;
	    out[11] = a03 * s + a23 * c;
	    return out;
	};
	
	/**
	 * Rotates a matrix by the given angle around the Z axis
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.rotateZ = function (out, a, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad),
	        a00 = a[0],
	        a01 = a[1],
	        a02 = a[2],
	        a03 = a[3],
	        a10 = a[4],
	        a11 = a[5],
	        a12 = a[6],
	        a13 = a[7];
	
	    if (a !== out) { // If the source and destination differ, copy the unchanged last row
	        out[8]  = a[8];
	        out[9]  = a[9];
	        out[10] = a[10];
	        out[11] = a[11];
	        out[12] = a[12];
	        out[13] = a[13];
	        out[14] = a[14];
	        out[15] = a[15];
	    }
	
	    // Perform axis-specific matrix multiplication
	    out[0] = a00 * c + a10 * s;
	    out[1] = a01 * c + a11 * s;
	    out[2] = a02 * c + a12 * s;
	    out[3] = a03 * c + a13 * s;
	    out[4] = a10 * c - a00 * s;
	    out[5] = a11 * c - a01 * s;
	    out[6] = a12 * c - a02 * s;
	    out[7] = a13 * c - a03 * s;
	    return out;
	};
	
	/**
	 * Creates a matrix from a vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, dest, vec);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {vec3} v Translation vector
	 * @returns {mat4} out
	 */
	mat4.fromTranslation = function(out, v) {
	    out[0] = 1;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;
	    return out;
	}
	
	/**
	 * Creates a matrix from a vector scaling
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.scale(dest, dest, vec);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {vec3} v Scaling vector
	 * @returns {mat4} out
	 */
	mat4.fromScaling = function(out, v) {
	    out[0] = v[0];
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = v[1];
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = v[2];
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}
	
	/**
	 * Creates a matrix from a given angle around a given axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotate(dest, dest, rad, axis);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {vec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */
	mat4.fromRotation = function(out, rad, axis) {
	    var x = axis[0], y = axis[1], z = axis[2],
	        len = Math.sqrt(x * x + y * y + z * z),
	        s, c, t;
	    
	    if (Math.abs(len) < glMatrix.EPSILON) { return null; }
	    
	    len = 1 / len;
	    x *= len;
	    y *= len;
	    z *= len;
	    
	    s = Math.sin(rad);
	    c = Math.cos(rad);
	    t = 1 - c;
	    
	    // Perform rotation-specific matrix multiplication
	    out[0] = x * x * t + c;
	    out[1] = y * x * t + z * s;
	    out[2] = z * x * t - y * s;
	    out[3] = 0;
	    out[4] = x * y * t - z * s;
	    out[5] = y * y * t + c;
	    out[6] = z * y * t + x * s;
	    out[7] = 0;
	    out[8] = x * z * t + y * s;
	    out[9] = y * z * t - x * s;
	    out[10] = z * z * t + c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}
	
	/**
	 * Creates a matrix from the given angle around the X axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateX(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromXRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    
	    // Perform axis-specific matrix multiplication
	    out[0]  = 1;
	    out[1]  = 0;
	    out[2]  = 0;
	    out[3]  = 0;
	    out[4] = 0;
	    out[5] = c;
	    out[6] = s;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = -s;
	    out[10] = c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}
	
	/**
	 * Creates a matrix from the given angle around the Y axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateY(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromYRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    
	    // Perform axis-specific matrix multiplication
	    out[0]  = c;
	    out[1]  = 0;
	    out[2]  = -s;
	    out[3]  = 0;
	    out[4] = 0;
	    out[5] = 1;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = s;
	    out[9] = 0;
	    out[10] = c;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}
	
	/**
	 * Creates a matrix from the given angle around the Z axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.rotateZ(dest, dest, rad);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat4} out
	 */
	mat4.fromZRotation = function(out, rad) {
	    var s = Math.sin(rad),
	        c = Math.cos(rad);
	    
	    // Perform axis-specific matrix multiplication
	    out[0]  = c;
	    out[1]  = s;
	    out[2]  = 0;
	    out[3]  = 0;
	    out[4] = -s;
	    out[5] = c;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 1;
	    out[11] = 0;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	    return out;
	}
	
	/**
	 * Creates a matrix from a quaternion rotation and vector translation
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslation = function (out, q, v) {
	    // Quaternion math
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,
	
	        xx = x * x2,
	        xy = x * y2,
	        xz = x * z2,
	        yy = y * y2,
	        yz = y * z2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;
	
	    out[0] = 1 - (yy + zz);
	    out[1] = xy + wz;
	    out[2] = xz - wy;
	    out[3] = 0;
	    out[4] = xy - wz;
	    out[5] = 1 - (xx + zz);
	    out[6] = yz + wx;
	    out[7] = 0;
	    out[8] = xz + wy;
	    out[9] = yz - wx;
	    out[10] = 1 - (xx + yy);
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;
	    
	    return out;
	};
	
	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @param {vec3} s Scaling vector
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslationScale = function (out, q, v, s) {
	    // Quaternion math
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,
	
	        xx = x * x2,
	        xy = x * y2,
	        xz = x * z2,
	        yy = y * y2,
	        yz = y * z2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2,
	        sx = s[0],
	        sy = s[1],
	        sz = s[2];
	
	    out[0] = (1 - (yy + zz)) * sx;
	    out[1] = (xy + wz) * sx;
	    out[2] = (xz - wy) * sx;
	    out[3] = 0;
	    out[4] = (xy - wz) * sy;
	    out[5] = (1 - (xx + zz)) * sy;
	    out[6] = (yz + wx) * sy;
	    out[7] = 0;
	    out[8] = (xz + wy) * sz;
	    out[9] = (yz - wx) * sz;
	    out[10] = (1 - (xx + yy)) * sz;
	    out[11] = 0;
	    out[12] = v[0];
	    out[13] = v[1];
	    out[14] = v[2];
	    out[15] = 1;
	    
	    return out;
	};
	
	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     mat4.translate(dest, origin);
	 *     var quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *     mat4.translate(dest, negativeOrigin);
	 *
	 * @param {mat4} out mat4 receiving operation result
	 * @param {quat4} q Rotation quaternion
	 * @param {vec3} v Translation vector
	 * @param {vec3} s Scaling vector
	 * @param {vec3} o The origin vector around which to scale and rotate
	 * @returns {mat4} out
	 */
	mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
	  // Quaternion math
	  var x = q[0], y = q[1], z = q[2], w = q[3],
	      x2 = x + x,
	      y2 = y + y,
	      z2 = z + z,
	
	      xx = x * x2,
	      xy = x * y2,
	      xz = x * z2,
	      yy = y * y2,
	      yz = y * z2,
	      zz = z * z2,
	      wx = w * x2,
	      wy = w * y2,
	      wz = w * z2,
	      
	      sx = s[0],
	      sy = s[1],
	      sz = s[2],
	
	      ox = o[0],
	      oy = o[1],
	      oz = o[2];
	      
	  out[0] = (1 - (yy + zz)) * sx;
	  out[1] = (xy + wz) * sx;
	  out[2] = (xz - wy) * sx;
	  out[3] = 0;
	  out[4] = (xy - wz) * sy;
	  out[5] = (1 - (xx + zz)) * sy;
	  out[6] = (yz + wx) * sy;
	  out[7] = 0;
	  out[8] = (xz + wy) * sz;
	  out[9] = (yz - wx) * sz;
	  out[10] = (1 - (xx + yy)) * sz;
	  out[11] = 0;
	  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
	  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
	  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
	  out[15] = 1;
	        
	  return out;
	};
	
	mat4.fromQuat = function (out, q) {
	    var x = q[0], y = q[1], z = q[2], w = q[3],
	        x2 = x + x,
	        y2 = y + y,
	        z2 = z + z,
	
	        xx = x * x2,
	        yx = y * x2,
	        yy = y * y2,
	        zx = z * x2,
	        zy = z * y2,
	        zz = z * z2,
	        wx = w * x2,
	        wy = w * y2,
	        wz = w * z2;
	
	    out[0] = 1 - yy - zz;
	    out[1] = yx + wz;
	    out[2] = zx - wy;
	    out[3] = 0;
	
	    out[4] = yx - wz;
	    out[5] = 1 - xx - zz;
	    out[6] = zy + wx;
	    out[7] = 0;
	
	    out[8] = zx + wy;
	    out[9] = zy - wx;
	    out[10] = 1 - xx - yy;
	    out[11] = 0;
	
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = 0;
	    out[15] = 1;
	
	    return out;
	};
	
	/**
	 * Generates a frustum matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {Number} left Left bound of the frustum
	 * @param {Number} right Right bound of the frustum
	 * @param {Number} bottom Bottom bound of the frustum
	 * @param {Number} top Top bound of the frustum
	 * @param {Number} near Near bound of the frustum
	 * @param {Number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.frustum = function (out, left, right, bottom, top, near, far) {
	    var rl = 1 / (right - left),
	        tb = 1 / (top - bottom),
	        nf = 1 / (near - far);
	    out[0] = (near * 2) * rl;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = (near * 2) * tb;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = (right + left) * rl;
	    out[9] = (top + bottom) * tb;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = (far * near * 2) * nf;
	    out[15] = 0;
	    return out;
	};
	
	/**
	 * Generates a perspective projection matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} fovy Vertical field of view in radians
	 * @param {number} aspect Aspect ratio. typically viewport width/height
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.perspective = function (out, fovy, aspect, near, far) {
	    var f = 1.0 / Math.tan(fovy / 2),
	        nf = 1 / (near - far);
	    out[0] = f / aspect;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = f;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = (far + near) * nf;
	    out[11] = -1;
	    out[12] = 0;
	    out[13] = 0;
	    out[14] = (2 * far * near) * nf;
	    out[15] = 0;
	    return out;
	};
	
	/**
	 * Generates a perspective projection matrix with the given field of view.
	 * This is primarily useful for generating projection matrices to be used
	 * with the still experiemental WebVR API.
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
	    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
	        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
	        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
	        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
	        xScale = 2.0 / (leftTan + rightTan),
	        yScale = 2.0 / (upTan + downTan);
	
	    out[0] = xScale;
	    out[1] = 0.0;
	    out[2] = 0.0;
	    out[3] = 0.0;
	    out[4] = 0.0;
	    out[5] = yScale;
	    out[6] = 0.0;
	    out[7] = 0.0;
	    out[8] = -((leftTan - rightTan) * xScale * 0.5);
	    out[9] = ((upTan - downTan) * yScale * 0.5);
	    out[10] = far / (near - far);
	    out[11] = -1.0;
	    out[12] = 0.0;
	    out[13] = 0.0;
	    out[14] = (far * near) / (near - far);
	    out[15] = 0.0;
	    return out;
	}
	
	/**
	 * Generates a orthogonal projection matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} left Left bound of the frustum
	 * @param {number} right Right bound of the frustum
	 * @param {number} bottom Bottom bound of the frustum
	 * @param {number} top Top bound of the frustum
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	mat4.ortho = function (out, left, right, bottom, top, near, far) {
	    var lr = 1 / (left - right),
	        bt = 1 / (bottom - top),
	        nf = 1 / (near - far);
	    out[0] = -2 * lr;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    out[4] = 0;
	    out[5] = -2 * bt;
	    out[6] = 0;
	    out[7] = 0;
	    out[8] = 0;
	    out[9] = 0;
	    out[10] = 2 * nf;
	    out[11] = 0;
	    out[12] = (left + right) * lr;
	    out[13] = (top + bottom) * bt;
	    out[14] = (far + near) * nf;
	    out[15] = 1;
	    return out;
	};
	
	/**
	 * Generates a look-at matrix with the given eye position, focal point, and up axis
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {vec3} eye Position of the viewer
	 * @param {vec3} center Point the viewer is looking at
	 * @param {vec3} up vec3 pointing up
	 * @returns {mat4} out
	 */
	mat4.lookAt = function (out, eye, center, up) {
	    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
	        eyex = eye[0],
	        eyey = eye[1],
	        eyez = eye[2],
	        upx = up[0],
	        upy = up[1],
	        upz = up[2],
	        centerx = center[0],
	        centery = center[1],
	        centerz = center[2];
	
	    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
	        Math.abs(eyey - centery) < glMatrix.EPSILON &&
	        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
	        return mat4.identity(out);
	    }
	
	    z0 = eyex - centerx;
	    z1 = eyey - centery;
	    z2 = eyez - centerz;
	
	    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
	    z0 *= len;
	    z1 *= len;
	    z2 *= len;
	
	    x0 = upy * z2 - upz * z1;
	    x1 = upz * z0 - upx * z2;
	    x2 = upx * z1 - upy * z0;
	    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
	    if (!len) {
	        x0 = 0;
	        x1 = 0;
	        x2 = 0;
	    } else {
	        len = 1 / len;
	        x0 *= len;
	        x1 *= len;
	        x2 *= len;
	    }
	
	    y0 = z1 * x2 - z2 * x1;
	    y1 = z2 * x0 - z0 * x2;
	    y2 = z0 * x1 - z1 * x0;
	
	    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
	    if (!len) {
	        y0 = 0;
	        y1 = 0;
	        y2 = 0;
	    } else {
	        len = 1 / len;
	        y0 *= len;
	        y1 *= len;
	        y2 *= len;
	    }
	
	    out[0] = x0;
	    out[1] = y0;
	    out[2] = z0;
	    out[3] = 0;
	    out[4] = x1;
	    out[5] = y1;
	    out[6] = z1;
	    out[7] = 0;
	    out[8] = x2;
	    out[9] = y2;
	    out[10] = z2;
	    out[11] = 0;
	    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
	    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
	    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
	    out[15] = 1;
	
	    return out;
	};
	
	/**
	 * Returns a string representation of a mat4
	 *
	 * @param {mat4} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	mat4.str = function (a) {
	    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
	                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
	                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
	                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
	};
	
	/**
	 * Returns Frobenius norm of a mat4
	 *
	 * @param {mat4} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	mat4.frob = function (a) {
	    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
	};
	
	
	module.exports = mat4;


/***/ },
/* 11 */
/*!*******************************************!*\
  !*** ./~/gl-matrix/src/gl-matrix/quat.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	
	var glMatrix = __webpack_require__(/*! ./common.js */ 6);
	var mat3 = __webpack_require__(/*! ./mat3.js */ 9);
	var vec3 = __webpack_require__(/*! ./vec3.js */ 12);
	var vec4 = __webpack_require__(/*! ./vec4.js */ 13);
	
	/**
	 * @class Quaternion
	 * @name quat
	 */
	var quat = {};
	
	/**
	 * Creates a new identity quat
	 *
	 * @returns {quat} a new quaternion
	 */
	quat.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};
	
	/**
	 * Sets a quaternion to represent the shortest rotation from one
	 * vector to another.
	 *
	 * Both vectors are assumed to be unit length.
	 *
	 * @param {quat} out the receiving quaternion.
	 * @param {vec3} a the initial vector
	 * @param {vec3} b the destination vector
	 * @returns {quat} out
	 */
	quat.rotationTo = (function() {
	    var tmpvec3 = vec3.create();
	    var xUnitVec3 = vec3.fromValues(1,0,0);
	    var yUnitVec3 = vec3.fromValues(0,1,0);
	
	    return function(out, a, b) {
	        var dot = vec3.dot(a, b);
	        if (dot < -0.999999) {
	            vec3.cross(tmpvec3, xUnitVec3, a);
	            if (vec3.length(tmpvec3) < 0.000001)
	                vec3.cross(tmpvec3, yUnitVec3, a);
	            vec3.normalize(tmpvec3, tmpvec3);
	            quat.setAxisAngle(out, tmpvec3, Math.PI);
	            return out;
	        } else if (dot > 0.999999) {
	            out[0] = 0;
	            out[1] = 0;
	            out[2] = 0;
	            out[3] = 1;
	            return out;
	        } else {
	            vec3.cross(tmpvec3, a, b);
	            out[0] = tmpvec3[0];
	            out[1] = tmpvec3[1];
	            out[2] = tmpvec3[2];
	            out[3] = 1 + dot;
	            return quat.normalize(out, out);
	        }
	    };
	})();
	
	/**
	 * Sets the specified quaternion with values corresponding to the given
	 * axes. Each axis is a vec3 and is expected to be unit length and
	 * perpendicular to all other specified axes.
	 *
	 * @param {vec3} view  the vector representing the viewing direction
	 * @param {vec3} right the vector representing the local "right" direction
	 * @param {vec3} up    the vector representing the local "up" direction
	 * @returns {quat} out
	 */
	quat.setAxes = (function() {
	    var matr = mat3.create();
	
	    return function(out, view, right, up) {
	        matr[0] = right[0];
	        matr[3] = right[1];
	        matr[6] = right[2];
	
	        matr[1] = up[0];
	        matr[4] = up[1];
	        matr[7] = up[2];
	
	        matr[2] = -view[0];
	        matr[5] = -view[1];
	        matr[8] = -view[2];
	
	        return quat.normalize(out, quat.fromMat3(out, matr));
	    };
	})();
	
	/**
	 * Creates a new quat initialized with values from an existing quaternion
	 *
	 * @param {quat} a quaternion to clone
	 * @returns {quat} a new quaternion
	 * @function
	 */
	quat.clone = vec4.clone;
	
	/**
	 * Creates a new quat initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {quat} a new quaternion
	 * @function
	 */
	quat.fromValues = vec4.fromValues;
	
	/**
	 * Copy the values from one quat to another
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the source quaternion
	 * @returns {quat} out
	 * @function
	 */
	quat.copy = vec4.copy;
	
	/**
	 * Set the components of a quat to the given values
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {quat} out
	 * @function
	 */
	quat.set = vec4.set;
	
	/**
	 * Set a quat to the identity quaternion
	 *
	 * @param {quat} out the receiving quaternion
	 * @returns {quat} out
	 */
	quat.identity = function(out) {
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 1;
	    return out;
	};
	
	/**
	 * Sets a quat from the given angle and rotation axis,
	 * then returns it.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {vec3} axis the axis around which to rotate
	 * @param {Number} rad the angle in radians
	 * @returns {quat} out
	 **/
	quat.setAxisAngle = function(out, axis, rad) {
	    rad = rad * 0.5;
	    var s = Math.sin(rad);
	    out[0] = s * axis[0];
	    out[1] = s * axis[1];
	    out[2] = s * axis[2];
	    out[3] = Math.cos(rad);
	    return out;
	};
	
	/**
	 * Adds two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {quat} out
	 * @function
	 */
	quat.add = vec4.add;
	
	/**
	 * Multiplies two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {quat} out
	 */
	quat.multiply = function(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = b[0], by = b[1], bz = b[2], bw = b[3];
	
	    out[0] = ax * bw + aw * bx + ay * bz - az * by;
	    out[1] = ay * bw + aw * by + az * bx - ax * bz;
	    out[2] = az * bw + aw * bz + ax * by - ay * bx;
	    out[3] = aw * bw - ax * bx - ay * by - az * bz;
	    return out;
	};
	
	/**
	 * Alias for {@link quat.multiply}
	 * @function
	 */
	quat.mul = quat.multiply;
	
	/**
	 * Scales a quat by a scalar number
	 *
	 * @param {quat} out the receiving vector
	 * @param {quat} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {quat} out
	 * @function
	 */
	quat.scale = vec4.scale;
	
	/**
	 * Rotates a quaternion by the given angle about the X axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateX = function (out, a, rad) {
	    rad *= 0.5; 
	
	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = Math.sin(rad), bw = Math.cos(rad);
	
	    out[0] = ax * bw + aw * bx;
	    out[1] = ay * bw + az * bx;
	    out[2] = az * bw - ay * bx;
	    out[3] = aw * bw - ax * bx;
	    return out;
	};
	
	/**
	 * Rotates a quaternion by the given angle about the Y axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateY = function (out, a, rad) {
	    rad *= 0.5; 
	
	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        by = Math.sin(rad), bw = Math.cos(rad);
	
	    out[0] = ax * bw - az * by;
	    out[1] = ay * bw + aw * by;
	    out[2] = az * bw + ax * by;
	    out[3] = aw * bw - ay * by;
	    return out;
	};
	
	/**
	 * Rotates a quaternion by the given angle about the Z axis
	 *
	 * @param {quat} out quat receiving operation result
	 * @param {quat} a quat to rotate
	 * @param {number} rad angle (in radians) to rotate
	 * @returns {quat} out
	 */
	quat.rotateZ = function (out, a, rad) {
	    rad *= 0.5; 
	
	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bz = Math.sin(rad), bw = Math.cos(rad);
	
	    out[0] = ax * bw + ay * bz;
	    out[1] = ay * bw - ax * bz;
	    out[2] = az * bw + aw * bz;
	    out[3] = aw * bw - az * bz;
	    return out;
	};
	
	/**
	 * Calculates the W component of a quat from the X, Y, and Z components.
	 * Assumes that quaternion is 1 unit in length.
	 * Any existing W component will be ignored.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate W component of
	 * @returns {quat} out
	 */
	quat.calculateW = function (out, a) {
	    var x = a[0], y = a[1], z = a[2];
	
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
	    return out;
	};
	
	/**
	 * Calculates the dot product of two quat's
	 *
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @returns {Number} dot product of a and b
	 * @function
	 */
	quat.dot = vec4.dot;
	
	/**
	 * Performs a linear interpolation between two quat's
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {quat} out
	 * @function
	 */
	quat.lerp = vec4.lerp;
	
	/**
	 * Performs a spherical linear interpolation between two quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {quat} out
	 */
	quat.slerp = function (out, a, b, t) {
	    // benchmarks:
	    //    http://jsperf.com/quaternion-slerp-implementations
	
	    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
	        bx = b[0], by = b[1], bz = b[2], bw = b[3];
	
	    var        omega, cosom, sinom, scale0, scale1;
	
	    // calc cosine
	    cosom = ax * bx + ay * by + az * bz + aw * bw;
	    // adjust signs (if necessary)
	    if ( cosom < 0.0 ) {
	        cosom = -cosom;
	        bx = - bx;
	        by = - by;
	        bz = - bz;
	        bw = - bw;
	    }
	    // calculate coefficients
	    if ( (1.0 - cosom) > 0.000001 ) {
	        // standard case (slerp)
	        omega  = Math.acos(cosom);
	        sinom  = Math.sin(omega);
	        scale0 = Math.sin((1.0 - t) * omega) / sinom;
	        scale1 = Math.sin(t * omega) / sinom;
	    } else {        
	        // "from" and "to" quaternions are very close 
	        //  ... so we can do a linear interpolation
	        scale0 = 1.0 - t;
	        scale1 = t;
	    }
	    // calculate final values
	    out[0] = scale0 * ax + scale1 * bx;
	    out[1] = scale0 * ay + scale1 * by;
	    out[2] = scale0 * az + scale1 * bz;
	    out[3] = scale0 * aw + scale1 * bw;
	    
	    return out;
	};
	
	/**
	 * Performs a spherical linear interpolation with two control points
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a the first operand
	 * @param {quat} b the second operand
	 * @param {quat} c the third operand
	 * @param {quat} d the fourth operand
	 * @param {Number} t interpolation amount
	 * @returns {quat} out
	 */
	quat.sqlerp = (function () {
	  var temp1 = quat.create();
	  var temp2 = quat.create();
	  
	  return function (out, a, b, c, d, t) {
	    quat.slerp(temp1, a, d, t);
	    quat.slerp(temp2, b, c, t);
	    quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
	    
	    return out;
	  };
	}());
	
	/**
	 * Calculates the inverse of a quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate inverse of
	 * @returns {quat} out
	 */
	quat.invert = function(out, a) {
	    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
	        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
	        invDot = dot ? 1.0/dot : 0;
	    
	    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
	
	    out[0] = -a0*invDot;
	    out[1] = -a1*invDot;
	    out[2] = -a2*invDot;
	    out[3] = a3*invDot;
	    return out;
	};
	
	/**
	 * Calculates the conjugate of a quat
	 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quat to calculate conjugate of
	 * @returns {quat} out
	 */
	quat.conjugate = function (out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = a[3];
	    return out;
	};
	
	/**
	 * Calculates the length of a quat
	 *
	 * @param {quat} a vector to calculate length of
	 * @returns {Number} length of a
	 * @function
	 */
	quat.length = vec4.length;
	
	/**
	 * Alias for {@link quat.length}
	 * @function
	 */
	quat.len = quat.length;
	
	/**
	 * Calculates the squared length of a quat
	 *
	 * @param {quat} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 * @function
	 */
	quat.squaredLength = vec4.squaredLength;
	
	/**
	 * Alias for {@link quat.squaredLength}
	 * @function
	 */
	quat.sqrLen = quat.squaredLength;
	
	/**
	 * Normalize a quat
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {quat} a quaternion to normalize
	 * @returns {quat} out
	 * @function
	 */
	quat.normalize = vec4.normalize;
	
	/**
	 * Creates a quaternion from the given 3x3 rotation matrix.
	 *
	 * NOTE: The resultant quaternion is not normalized, so you should be sure
	 * to renormalize the quaternion yourself where necessary.
	 *
	 * @param {quat} out the receiving quaternion
	 * @param {mat3} m rotation matrix
	 * @returns {quat} out
	 * @function
	 */
	quat.fromMat3 = function(out, m) {
	    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
	    // article "Quaternion Calculus and Fast Animation".
	    var fTrace = m[0] + m[4] + m[8];
	    var fRoot;
	
	    if ( fTrace > 0.0 ) {
	        // |w| > 1/2, may as well choose w > 1/2
	        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
	        out[3] = 0.5 * fRoot;
	        fRoot = 0.5/fRoot;  // 1/(4w)
	        out[0] = (m[5]-m[7])*fRoot;
	        out[1] = (m[6]-m[2])*fRoot;
	        out[2] = (m[1]-m[3])*fRoot;
	    } else {
	        // |w| <= 1/2
	        var i = 0;
	        if ( m[4] > m[0] )
	          i = 1;
	        if ( m[8] > m[i*3+i] )
	          i = 2;
	        var j = (i+1)%3;
	        var k = (i+2)%3;
	        
	        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
	        out[i] = 0.5 * fRoot;
	        fRoot = 0.5 / fRoot;
	        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
	        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
	        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
	    }
	    
	    return out;
	};
	
	/**
	 * Returns a string representation of a quatenion
	 *
	 * @param {quat} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	quat.str = function (a) {
	    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};
	
	module.exports = quat;


/***/ },
/* 12 */
/*!*******************************************!*\
  !*** ./~/gl-matrix/src/gl-matrix/vec3.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	
	var glMatrix = __webpack_require__(/*! ./common.js */ 6);
	
	/**
	 * @class 3 Dimensional Vector
	 * @name vec3
	 */
	var vec3 = {};
	
	/**
	 * Creates a new, empty vec3
	 *
	 * @returns {vec3} a new 3D vector
	 */
	vec3.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    return out;
	};
	
	/**
	 * Creates a new vec3 initialized with values from an existing vector
	 *
	 * @param {vec3} a vector to clone
	 * @returns {vec3} a new 3D vector
	 */
	vec3.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};
	
	/**
	 * Creates a new vec3 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} a new 3D vector
	 */
	vec3.fromValues = function(x, y, z) {
	    var out = new glMatrix.ARRAY_TYPE(3);
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};
	
	/**
	 * Copy the values from one vec3 to another
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the source vector
	 * @returns {vec3} out
	 */
	vec3.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    return out;
	};
	
	/**
	 * Set the components of a vec3 to the given values
	 *
	 * @param {vec3} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @returns {vec3} out
	 */
	vec3.set = function(out, x, y, z) {
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    return out;
	};
	
	/**
	 * Adds two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    return out;
	};
	
	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    return out;
	};
	
	/**
	 * Alias for {@link vec3.subtract}
	 * @function
	 */
	vec3.sub = vec3.subtract;
	
	/**
	 * Multiplies two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    return out;
	};
	
	/**
	 * Alias for {@link vec3.multiply}
	 * @function
	 */
	vec3.mul = vec3.multiply;
	
	/**
	 * Divides two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    return out;
	};
	
	/**
	 * Alias for {@link vec3.divide}
	 * @function
	 */
	vec3.div = vec3.divide;
	
	/**
	 * Returns the minimum of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    return out;
	};
	
	/**
	 * Returns the maximum of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    return out;
	};
	
	/**
	 * Scales a vec3 by a scalar number
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec3} out
	 */
	vec3.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    return out;
	};
	
	/**
	 * Adds two vec3's after scaling the second operand by a scalar value
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec3} out
	 */
	vec3.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    return out;
	};
	
	/**
	 * Calculates the euclidian distance between two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec3.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2];
	    return Math.sqrt(x*x + y*y + z*z);
	};
	
	/**
	 * Alias for {@link vec3.distance}
	 * @function
	 */
	vec3.dist = vec3.distance;
	
	/**
	 * Calculates the squared euclidian distance between two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec3.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2];
	    return x*x + y*y + z*z;
	};
	
	/**
	 * Alias for {@link vec3.squaredDistance}
	 * @function
	 */
	vec3.sqrDist = vec3.squaredDistance;
	
	/**
	 * Calculates the length of a vec3
	 *
	 * @param {vec3} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec3.length = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    return Math.sqrt(x*x + y*y + z*z);
	};
	
	/**
	 * Alias for {@link vec3.length}
	 * @function
	 */
	vec3.len = vec3.length;
	
	/**
	 * Calculates the squared length of a vec3
	 *
	 * @param {vec3} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec3.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    return x*x + y*y + z*z;
	};
	
	/**
	 * Alias for {@link vec3.squaredLength}
	 * @function
	 */
	vec3.sqrLen = vec3.squaredLength;
	
	/**
	 * Negates the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to negate
	 * @returns {vec3} out
	 */
	vec3.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    return out;
	};
	
	/**
	 * Returns the inverse of the components of a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to invert
	 * @returns {vec3} out
	 */
	vec3.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  out[2] = 1.0 / a[2];
	  return out;
	};
	
	/**
	 * Normalize a vec3
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a vector to normalize
	 * @returns {vec3} out
	 */
	vec3.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2];
	    var len = x*x + y*y + z*z;
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len);
	        out[0] = a[0] * len;
	        out[1] = a[1] * len;
	        out[2] = a[2] * len;
	    }
	    return out;
	};
	
	/**
	 * Calculates the dot product of two vec3's
	 *
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec3.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	};
	
	/**
	 * Computes the cross product of two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @returns {vec3} out
	 */
	vec3.cross = function(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2],
	        bx = b[0], by = b[1], bz = b[2];
	
	    out[0] = ay * bz - az * by;
	    out[1] = az * bx - ax * bz;
	    out[2] = ax * by - ay * bx;
	    return out;
	};
	
	/**
	 * Performs a linear interpolation between two vec3's
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1],
	        az = a[2];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    out[2] = az + t * (b[2] - az);
	    return out;
	};
	
	/**
	 * Performs a hermite interpolation with two control points
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {vec3} c the third operand
	 * @param {vec3} d the fourth operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.hermite = function (out, a, b, c, d, t) {
	  var factorTimes2 = t * t,
	      factor1 = factorTimes2 * (2 * t - 3) + 1,
	      factor2 = factorTimes2 * (t - 2) + t,
	      factor3 = factorTimes2 * (t - 1),
	      factor4 = factorTimes2 * (3 - 2 * t);
	  
	  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	  
	  return out;
	};
	
	/**
	 * Performs a bezier interpolation with two control points
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the first operand
	 * @param {vec3} b the second operand
	 * @param {vec3} c the third operand
	 * @param {vec3} d the fourth operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec3} out
	 */
	vec3.bezier = function (out, a, b, c, d, t) {
	  var inverseFactor = 1 - t,
	      inverseFactorTimesTwo = inverseFactor * inverseFactor,
	      factorTimes2 = t * t,
	      factor1 = inverseFactorTimesTwo * inverseFactor,
	      factor2 = 3 * t * inverseFactorTimesTwo,
	      factor3 = 3 * factorTimes2 * inverseFactor,
	      factor4 = factorTimes2 * t;
	  
	  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	  
	  return out;
	};
	
	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec3} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec3} out
	 */
	vec3.random = function (out, scale) {
	    scale = scale || 1.0;
	
	    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
	    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
	    var zScale = Math.sqrt(1.0-z*z) * scale;
	
	    out[0] = Math.cos(r) * zScale;
	    out[1] = Math.sin(r) * zScale;
	    out[2] = z * scale;
	    return out;
	};
	
	/**
	 * Transforms the vec3 with a mat4.
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec3} out
	 */
	vec3.transformMat4 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2],
	        w = m[3] * x + m[7] * y + m[11] * z + m[15];
	    w = w || 1.0;
	    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
	    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
	    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
	    return out;
	};
	
	/**
	 * Transforms the vec3 with a mat3.
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {mat4} m the 3x3 matrix to transform with
	 * @returns {vec3} out
	 */
	vec3.transformMat3 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2];
	    out[0] = x * m[0] + y * m[3] + z * m[6];
	    out[1] = x * m[1] + y * m[4] + z * m[7];
	    out[2] = x * m[2] + y * m[5] + z * m[8];
	    return out;
	};
	
	/**
	 * Transforms the vec3 with a quat
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec3} a the vector to transform
	 * @param {quat} q quaternion to transform with
	 * @returns {vec3} out
	 */
	vec3.transformQuat = function(out, a, q) {
	    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations
	
	    var x = a[0], y = a[1], z = a[2],
	        qx = q[0], qy = q[1], qz = q[2], qw = q[3],
	
	        // calculate quat * vec
	        ix = qw * x + qy * z - qz * y,
	        iy = qw * y + qz * x - qx * z,
	        iz = qw * z + qx * y - qy * x,
	        iw = -qx * x - qy * y - qz * z;
	
	    // calculate result * inverse quat
	    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	    return out;
	};
	
	/**
	 * Rotate a 3D vector around the x-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateX = function(out, a, b, c){
	   var p = [], r=[];
		  //Translate point to the origin
		  p[0] = a[0] - b[0];
		  p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	
		  //perform rotation
		  r[0] = p[0];
		  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
		  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);
	
		  //translate to correct position
		  out[0] = r[0] + b[0];
		  out[1] = r[1] + b[1];
		  out[2] = r[2] + b[2];
	
	  	return out;
	};
	
	/**
	 * Rotate a 3D vector around the y-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateY = function(out, a, b, c){
	  	var p = [], r=[];
	  	//Translate point to the origin
	  	p[0] = a[0] - b[0];
	  	p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	  
	  	//perform rotation
	  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
	  	r[1] = p[1];
	  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
	  
	  	//translate to correct position
	  	out[0] = r[0] + b[0];
	  	out[1] = r[1] + b[1];
	  	out[2] = r[2] + b[2];
	  
	  	return out;
	};
	
	/**
	 * Rotate a 3D vector around the z-axis
	 * @param {vec3} out The receiving vec3
	 * @param {vec3} a The vec3 point to rotate
	 * @param {vec3} b The origin of the rotation
	 * @param {Number} c The angle of rotation
	 * @returns {vec3} out
	 */
	vec3.rotateZ = function(out, a, b, c){
	  	var p = [], r=[];
	  	//Translate point to the origin
	  	p[0] = a[0] - b[0];
	  	p[1] = a[1] - b[1];
	  	p[2] = a[2] - b[2];
	  
	  	//perform rotation
	  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
	  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
	  	r[2] = p[2];
	  
	  	//translate to correct position
	  	out[0] = r[0] + b[0];
	  	out[1] = r[1] + b[1];
	  	out[2] = r[2] + b[2];
	  
	  	return out;
	};
	
	/**
	 * Perform some operation over an array of vec3s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec3.forEach = (function() {
	    var vec = vec3.create();
	
	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 3;
	        }
	
	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }
	
	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
	        }
	        
	        return a;
	    };
	})();
	
	/**
	 * Get the angle between two 3D vectors
	 * @param {vec3} a The first operand
	 * @param {vec3} b The second operand
	 * @returns {Number} The angle in radians
	 */
	vec3.angle = function(a, b) {
	   
	    var tempA = vec3.fromValues(a[0], a[1], a[2]);
	    var tempB = vec3.fromValues(b[0], b[1], b[2]);
	 
	    vec3.normalize(tempA, tempA);
	    vec3.normalize(tempB, tempB);
	 
	    var cosine = vec3.dot(tempA, tempB);
	
	    if(cosine > 1.0){
	        return 0;
	    } else {
	        return Math.acos(cosine);
	    }     
	};
	
	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec3} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec3.str = function (a) {
	    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
	};
	
	module.exports = vec3;


/***/ },
/* 13 */
/*!*******************************************!*\
  !*** ./~/gl-matrix/src/gl-matrix/vec4.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	
	var glMatrix = __webpack_require__(/*! ./common.js */ 6);
	
	/**
	 * @class 4 Dimensional Vector
	 * @name vec4
	 */
	var vec4 = {};
	
	/**
	 * Creates a new, empty vec4
	 *
	 * @returns {vec4} a new 4D vector
	 */
	vec4.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = 0;
	    out[1] = 0;
	    out[2] = 0;
	    out[3] = 0;
	    return out;
	};
	
	/**
	 * Creates a new vec4 initialized with values from an existing vector
	 *
	 * @param {vec4} a vector to clone
	 * @returns {vec4} a new 4D vector
	 */
	vec4.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};
	
	/**
	 * Creates a new vec4 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {vec4} a new 4D vector
	 */
	vec4.fromValues = function(x, y, z, w) {
	    var out = new glMatrix.ARRAY_TYPE(4);
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};
	
	/**
	 * Copy the values from one vec4 to another
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the source vector
	 * @returns {vec4} out
	 */
	vec4.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    out[2] = a[2];
	    out[3] = a[3];
	    return out;
	};
	
	/**
	 * Set the components of a vec4 to the given values
	 *
	 * @param {vec4} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 * @returns {vec4} out
	 */
	vec4.set = function(out, x, y, z, w) {
	    out[0] = x;
	    out[1] = y;
	    out[2] = z;
	    out[3] = w;
	    return out;
	};
	
	/**
	 * Adds two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    out[2] = a[2] + b[2];
	    out[3] = a[3] + b[3];
	    return out;
	};
	
	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    out[2] = a[2] - b[2];
	    out[3] = a[3] - b[3];
	    return out;
	};
	
	/**
	 * Alias for {@link vec4.subtract}
	 * @function
	 */
	vec4.sub = vec4.subtract;
	
	/**
	 * Multiplies two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    out[2] = a[2] * b[2];
	    out[3] = a[3] * b[3];
	    return out;
	};
	
	/**
	 * Alias for {@link vec4.multiply}
	 * @function
	 */
	vec4.mul = vec4.multiply;
	
	/**
	 * Divides two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    out[2] = a[2] / b[2];
	    out[3] = a[3] / b[3];
	    return out;
	};
	
	/**
	 * Alias for {@link vec4.divide}
	 * @function
	 */
	vec4.div = vec4.divide;
	
	/**
	 * Returns the minimum of two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    out[2] = Math.min(a[2], b[2]);
	    out[3] = Math.min(a[3], b[3]);
	    return out;
	};
	
	/**
	 * Returns the maximum of two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {vec4} out
	 */
	vec4.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    out[2] = Math.max(a[2], b[2]);
	    out[3] = Math.max(a[3], b[3]);
	    return out;
	};
	
	/**
	 * Scales a vec4 by a scalar number
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec4} out
	 */
	vec4.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    out[2] = a[2] * b;
	    out[3] = a[3] * b;
	    return out;
	};
	
	/**
	 * Adds two vec4's after scaling the second operand by a scalar value
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec4} out
	 */
	vec4.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    out[2] = a[2] + (b[2] * scale);
	    out[3] = a[3] + (b[3] * scale);
	    return out;
	};
	
	/**
	 * Calculates the euclidian distance between two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec4.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2],
	        w = b[3] - a[3];
	    return Math.sqrt(x*x + y*y + z*z + w*w);
	};
	
	/**
	 * Alias for {@link vec4.distance}
	 * @function
	 */
	vec4.dist = vec4.distance;
	
	/**
	 * Calculates the squared euclidian distance between two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec4.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1],
	        z = b[2] - a[2],
	        w = b[3] - a[3];
	    return x*x + y*y + z*z + w*w;
	};
	
	/**
	 * Alias for {@link vec4.squaredDistance}
	 * @function
	 */
	vec4.sqrDist = vec4.squaredDistance;
	
	/**
	 * Calculates the length of a vec4
	 *
	 * @param {vec4} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec4.length = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    return Math.sqrt(x*x + y*y + z*z + w*w);
	};
	
	/**
	 * Alias for {@link vec4.length}
	 * @function
	 */
	vec4.len = vec4.length;
	
	/**
	 * Calculates the squared length of a vec4
	 *
	 * @param {vec4} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec4.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    return x*x + y*y + z*z + w*w;
	};
	
	/**
	 * Alias for {@link vec4.squaredLength}
	 * @function
	 */
	vec4.sqrLen = vec4.squaredLength;
	
	/**
	 * Negates the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to negate
	 * @returns {vec4} out
	 */
	vec4.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    out[2] = -a[2];
	    out[3] = -a[3];
	    return out;
	};
	
	/**
	 * Returns the inverse of the components of a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to invert
	 * @returns {vec4} out
	 */
	vec4.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  out[2] = 1.0 / a[2];
	  out[3] = 1.0 / a[3];
	  return out;
	};
	
	/**
	 * Normalize a vec4
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a vector to normalize
	 * @returns {vec4} out
	 */
	vec4.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2],
	        w = a[3];
	    var len = x*x + y*y + z*z + w*w;
	    if (len > 0) {
	        len = 1 / Math.sqrt(len);
	        out[0] = x * len;
	        out[1] = y * len;
	        out[2] = z * len;
	        out[3] = w * len;
	    }
	    return out;
	};
	
	/**
	 * Calculates the dot product of two vec4's
	 *
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec4.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	};
	
	/**
	 * Performs a linear interpolation between two vec4's
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the first operand
	 * @param {vec4} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec4} out
	 */
	vec4.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1],
	        az = a[2],
	        aw = a[3];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    out[2] = az + t * (b[2] - az);
	    out[3] = aw + t * (b[3] - aw);
	    return out;
	};
	
	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec4} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec4} out
	 */
	vec4.random = function (out, scale) {
	    scale = scale || 1.0;
	
	    //TODO: This is a pretty awful way of doing this. Find something better.
	    out[0] = glMatrix.RANDOM();
	    out[1] = glMatrix.RANDOM();
	    out[2] = glMatrix.RANDOM();
	    out[3] = glMatrix.RANDOM();
	    vec4.normalize(out, out);
	    vec4.scale(out, out, scale);
	    return out;
	};
	
	/**
	 * Transforms the vec4 with a mat4.
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec4} out
	 */
	vec4.transformMat4 = function(out, a, m) {
	    var x = a[0], y = a[1], z = a[2], w = a[3];
	    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
	    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
	    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
	    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
	    return out;
	};
	
	/**
	 * Transforms the vec4 with a quat
	 *
	 * @param {vec4} out the receiving vector
	 * @param {vec4} a the vector to transform
	 * @param {quat} q quaternion to transform with
	 * @returns {vec4} out
	 */
	vec4.transformQuat = function(out, a, q) {
	    var x = a[0], y = a[1], z = a[2],
	        qx = q[0], qy = q[1], qz = q[2], qw = q[3],
	
	        // calculate quat * vec
	        ix = qw * x + qy * z - qz * y,
	        iy = qw * y + qz * x - qx * z,
	        iz = qw * z + qx * y - qy * x,
	        iw = -qx * x - qy * y - qz * z;
	
	    // calculate result * inverse quat
	    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
	    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
	    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
	    out[3] = a[3];
	    return out;
	};
	
	/**
	 * Perform some operation over an array of vec4s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec4.forEach = (function() {
	    var vec = vec4.create();
	
	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 4;
	        }
	
	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }
	
	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
	        }
	        
	        return a;
	    };
	})();
	
	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec4} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec4.str = function (a) {
	    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
	};
	
	module.exports = vec4;


/***/ },
/* 14 */
/*!*******************************************!*\
  !*** ./~/gl-matrix/src/gl-matrix/vec2.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */
	
	var glMatrix = __webpack_require__(/*! ./common.js */ 6);
	
	/**
	 * @class 2 Dimensional Vector
	 * @name vec2
	 */
	var vec2 = {};
	
	/**
	 * Creates a new, empty vec2
	 *
	 * @returns {vec2} a new 2D vector
	 */
	vec2.create = function() {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = 0;
	    out[1] = 0;
	    return out;
	};
	
	/**
	 * Creates a new vec2 initialized with values from an existing vector
	 *
	 * @param {vec2} a vector to clone
	 * @returns {vec2} a new 2D vector
	 */
	vec2.clone = function(a) {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};
	
	/**
	 * Creates a new vec2 initialized with the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} a new 2D vector
	 */
	vec2.fromValues = function(x, y) {
	    var out = new glMatrix.ARRAY_TYPE(2);
	    out[0] = x;
	    out[1] = y;
	    return out;
	};
	
	/**
	 * Copy the values from one vec2 to another
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the source vector
	 * @returns {vec2} out
	 */
	vec2.copy = function(out, a) {
	    out[0] = a[0];
	    out[1] = a[1];
	    return out;
	};
	
	/**
	 * Set the components of a vec2 to the given values
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @returns {vec2} out
	 */
	vec2.set = function(out, x, y) {
	    out[0] = x;
	    out[1] = y;
	    return out;
	};
	
	/**
	 * Adds two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.add = function(out, a, b) {
	    out[0] = a[0] + b[0];
	    out[1] = a[1] + b[1];
	    return out;
	};
	
	/**
	 * Subtracts vector b from vector a
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.subtract = function(out, a, b) {
	    out[0] = a[0] - b[0];
	    out[1] = a[1] - b[1];
	    return out;
	};
	
	/**
	 * Alias for {@link vec2.subtract}
	 * @function
	 */
	vec2.sub = vec2.subtract;
	
	/**
	 * Multiplies two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.multiply = function(out, a, b) {
	    out[0] = a[0] * b[0];
	    out[1] = a[1] * b[1];
	    return out;
	};
	
	/**
	 * Alias for {@link vec2.multiply}
	 * @function
	 */
	vec2.mul = vec2.multiply;
	
	/**
	 * Divides two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.divide = function(out, a, b) {
	    out[0] = a[0] / b[0];
	    out[1] = a[1] / b[1];
	    return out;
	};
	
	/**
	 * Alias for {@link vec2.divide}
	 * @function
	 */
	vec2.div = vec2.divide;
	
	/**
	 * Returns the minimum of two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.min = function(out, a, b) {
	    out[0] = Math.min(a[0], b[0]);
	    out[1] = Math.min(a[1], b[1]);
	    return out;
	};
	
	/**
	 * Returns the maximum of two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec2} out
	 */
	vec2.max = function(out, a, b) {
	    out[0] = Math.max(a[0], b[0]);
	    out[1] = Math.max(a[1], b[1]);
	    return out;
	};
	
	/**
	 * Scales a vec2 by a scalar number
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec2} out
	 */
	vec2.scale = function(out, a, b) {
	    out[0] = a[0] * b;
	    out[1] = a[1] * b;
	    return out;
	};
	
	/**
	 * Adds two vec2's after scaling the second operand by a scalar value
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @param {Number} scale the amount to scale b by before adding
	 * @returns {vec2} out
	 */
	vec2.scaleAndAdd = function(out, a, b, scale) {
	    out[0] = a[0] + (b[0] * scale);
	    out[1] = a[1] + (b[1] * scale);
	    return out;
	};
	
	/**
	 * Calculates the euclidian distance between two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} distance between a and b
	 */
	vec2.distance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1];
	    return Math.sqrt(x*x + y*y);
	};
	
	/**
	 * Alias for {@link vec2.distance}
	 * @function
	 */
	vec2.dist = vec2.distance;
	
	/**
	 * Calculates the squared euclidian distance between two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} squared distance between a and b
	 */
	vec2.squaredDistance = function(a, b) {
	    var x = b[0] - a[0],
	        y = b[1] - a[1];
	    return x*x + y*y;
	};
	
	/**
	 * Alias for {@link vec2.squaredDistance}
	 * @function
	 */
	vec2.sqrDist = vec2.squaredDistance;
	
	/**
	 * Calculates the length of a vec2
	 *
	 * @param {vec2} a vector to calculate length of
	 * @returns {Number} length of a
	 */
	vec2.length = function (a) {
	    var x = a[0],
	        y = a[1];
	    return Math.sqrt(x*x + y*y);
	};
	
	/**
	 * Alias for {@link vec2.length}
	 * @function
	 */
	vec2.len = vec2.length;
	
	/**
	 * Calculates the squared length of a vec2
	 *
	 * @param {vec2} a vector to calculate squared length of
	 * @returns {Number} squared length of a
	 */
	vec2.squaredLength = function (a) {
	    var x = a[0],
	        y = a[1];
	    return x*x + y*y;
	};
	
	/**
	 * Alias for {@link vec2.squaredLength}
	 * @function
	 */
	vec2.sqrLen = vec2.squaredLength;
	
	/**
	 * Negates the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to negate
	 * @returns {vec2} out
	 */
	vec2.negate = function(out, a) {
	    out[0] = -a[0];
	    out[1] = -a[1];
	    return out;
	};
	
	/**
	 * Returns the inverse of the components of a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to invert
	 * @returns {vec2} out
	 */
	vec2.inverse = function(out, a) {
	  out[0] = 1.0 / a[0];
	  out[1] = 1.0 / a[1];
	  return out;
	};
	
	/**
	 * Normalize a vec2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a vector to normalize
	 * @returns {vec2} out
	 */
	vec2.normalize = function(out, a) {
	    var x = a[0],
	        y = a[1];
	    var len = x*x + y*y;
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len);
	        out[0] = a[0] * len;
	        out[1] = a[1] * len;
	    }
	    return out;
	};
	
	/**
	 * Calculates the dot product of two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	vec2.dot = function (a, b) {
	    return a[0] * b[0] + a[1] * b[1];
	};
	
	/**
	 * Computes the cross product of two vec2's
	 * Note that the cross product must by definition produce a 3D vector
	 *
	 * @param {vec3} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {vec3} out
	 */
	vec2.cross = function(out, a, b) {
	    var z = a[0] * b[1] - a[1] * b[0];
	    out[0] = out[1] = 0;
	    out[2] = z;
	    return out;
	};
	
	/**
	 * Performs a linear interpolation between two vec2's
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @param {Number} t interpolation amount between the two inputs
	 * @returns {vec2} out
	 */
	vec2.lerp = function (out, a, b, t) {
	    var ax = a[0],
	        ay = a[1];
	    out[0] = ax + t * (b[0] - ax);
	    out[1] = ay + t * (b[1] - ay);
	    return out;
	};
	
	/**
	 * Generates a random vector with the given scale
	 *
	 * @param {vec2} out the receiving vector
	 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
	 * @returns {vec2} out
	 */
	vec2.random = function (out, scale) {
	    scale = scale || 1.0;
	    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
	    out[0] = Math.cos(r) * scale;
	    out[1] = Math.sin(r) * scale;
	    return out;
	};
	
	/**
	 * Transforms the vec2 with a mat2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat2 = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[2] * y;
	    out[1] = m[1] * x + m[3] * y;
	    return out;
	};
	
	/**
	 * Transforms the vec2 with a mat2d
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2d} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat2d = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[2] * y + m[4];
	    out[1] = m[1] * x + m[3] * y + m[5];
	    return out;
	};
	
	/**
	 * Transforms the vec2 with a mat3
	 * 3rd vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat3} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat3 = function(out, a, m) {
	    var x = a[0],
	        y = a[1];
	    out[0] = m[0] * x + m[3] * y + m[6];
	    out[1] = m[1] * x + m[4] * y + m[7];
	    return out;
	};
	
	/**
	 * Transforms the vec2 with a mat4
	 * 3rd vector component is implicitly '0'
	 * 4th vector component is implicitly '1'
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat4} m matrix to transform with
	 * @returns {vec2} out
	 */
	vec2.transformMat4 = function(out, a, m) {
	    var x = a[0], 
	        y = a[1];
	    out[0] = m[0] * x + m[4] * y + m[12];
	    out[1] = m[1] * x + m[5] * y + m[13];
	    return out;
	};
	
	/**
	 * Perform some operation over an array of vec2s.
	 *
	 * @param {Array} a the array of vectors to iterate over
	 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
	 * @param {Number} offset Number of elements to skip at the beginning of the array
	 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
	 * @param {Function} fn Function to call for each vector in the array
	 * @param {Object} [arg] additional argument to pass to fn
	 * @returns {Array} a
	 * @function
	 */
	vec2.forEach = (function() {
	    var vec = vec2.create();
	
	    return function(a, stride, offset, count, fn, arg) {
	        var i, l;
	        if(!stride) {
	            stride = 2;
	        }
	
	        if(!offset) {
	            offset = 0;
	        }
	        
	        if(count) {
	            l = Math.min((count * stride) + offset, a.length);
	        } else {
	            l = a.length;
	        }
	
	        for(i = offset; i < l; i += stride) {
	            vec[0] = a[i]; vec[1] = a[i+1];
	            fn(vec, vec, arg);
	            a[i] = vec[0]; a[i+1] = vec[1];
	        }
	        
	        return a;
	    };
	})();
	
	/**
	 * Returns a string representation of a vector
	 *
	 * @param {vec2} vec vector to represent as a string
	 * @returns {String} string representation of the vector
	 */
	vec2.str = function (a) {
	    return 'vec2(' + a[0] + ', ' + a[1] + ')';
	};
	
	module.exports = vec2;


/***/ },
/* 15 */,
/* 16 */
/*!******************************************!*\
  !*** ./~/raw-loader!./src/data/face.obj ***!
  \******************************************/
/***/ function(module, exports) {

	module.exports = "# Blender v2.76 (sub 0) OBJ File: 'face.blend'\n# www.blender.org\nv 0.038152 -0.063653 0.023119\nv 0.038493 -0.104621 0.052808\nv 0.092976 -0.119867 -0.021141\nv 0.038533 -0.148960 0.056111\nv 0.033863 -0.177500 0.034778\nv 0.080272 -0.171101 -0.007969\nv 0.091498 -0.151409 -0.011075\nv 0.014672 -0.190260 0.009363\nv 0.030795 -0.200985 -0.023699\nv 0.042429 -0.008568 -0.014100\nv 0.076827 -0.041401 -0.071837\nv 0.121243 -0.054658 -0.100737\nv 0.234283 -0.085533 -0.138323\nv 0.221874 -0.230809 -0.144174\nv 0.290564 -0.191496 -0.196317\nv 0.306483 -0.240744 -0.225450\nv 0.176093 -0.132913 -0.113097\nv 0.134935 -0.163211 -0.102034\nv 0.193472 -0.303309 -0.119153\nv 0.172963 -0.257925 -0.113391\nv 0.241987 -0.279391 -0.157915\nv 0.268343 -0.139532 -0.163265\nv 0.200158 -0.180280 -0.128637\nv 0.153183 -0.207138 -0.106757\nv 0.316047 -0.286909 -0.248207\nv 0.256453 -0.324421 -0.170077\nv 0.206227 -0.339919 -0.126553\nv 0.194203 -0.398041 -0.122565\nv 0.238439 -0.412053 -0.167834\nv 0.152893 -0.360546 -0.110787\nv 0.165999 -0.347759 -0.116507\nv 0.156827 -0.337468 -0.100273\nv 0.167924 -0.375573 -0.111517\nv 0.075563 -0.304321 -0.021487\nv 0.138900 -0.319522 -0.073007\nv 0.141856 -0.352417 -0.120460\nv 0.148223 -0.345814 -0.124744\nv 0.154150 -0.345961 -0.118449\nv 0.141140 -0.341957 -0.113448\nv 0.149351 -0.339445 -0.104638\nv 0.147383 -0.353823 -0.114221\nv 0.066305 -0.381269 -0.067569\nv 0.132517 -0.328741 -0.079014\nv 0.121892 -0.336462 -0.092747\nv 0.181297 -0.344482 -0.117068\nv 0.167479 -0.324306 -0.103252\nv 0.077238 -0.429326 -0.063530\nv 0.144112 -0.294698 -0.079721\nv 0.115996 -0.384963 -0.081272\nv 0.072600 -0.321020 -0.028674\nv 0.089321 -0.289214 -0.036301\nv 0.066498 -0.330196 -0.049199\nv 0.125010 -0.219718 -0.086196\nv 0.055363 -0.234699 -0.037596\nv 0.107404 -0.175854 -0.086100\nv 0.118593 -0.151122 -0.086707\nv 0.118192 -0.589743 -0.105229\nv 0.318452 -0.428674 -0.312063\nv 0.320751 -0.358534 -0.278810\nv 0.350139 -0.383595 -0.367148\nv 0.345195 -0.320538 -0.332002\nv 0.382181 -0.311069 -0.446371\nv 0.374865 -0.262788 -0.402268\nv 0.119531 0.629772 -0.317195\nv 0.328603 0.551081 -0.438663\nv 0.238096 0.605111 -0.367836\nv 0.410397 -0.186291 -0.529966\nv 0.396799 0.238236 -0.364573\nv 0.429268 0.230814 -0.572498\nv 0.437400 0.136356 -0.579237\nv 0.438263 0.053781 -0.580183\nv 0.408718 -0.125430 -0.478940\nv 0.409743 -0.081674 -0.455694\nv 0.436235 -0.014008 -0.572424\nv 0.428942 -0.089156 -0.558807\nv 0.412560 0.345047 -0.549472\nv 0.325277 0.475826 -0.388484\nv 0.390805 0.446999 -0.515934\nv 0.229002 -0.510218 -0.208261\nv 0.095841 -0.470373 -0.075102\nv 0.138419 0.136589 -0.156835\nv 0.110219 0.107480 -0.159984\nv 0.136326 0.088892 -0.157315\nv 0.186106 0.067243 -0.151745\nv 0.232322 0.061815 -0.160961\nv 0.284292 0.077634 -0.190588\nv 0.321543 0.110253 -0.231047\nv 0.318381 0.134581 -0.204874\nv 0.233523 0.170065 -0.155951\nv 0.089221 0.110177 -0.142426\nv 0.122035 0.145683 -0.128418\nv 0.120067 0.069882 -0.143441\nv 0.189081 0.040545 -0.145002\nv 0.238084 0.035599 -0.162214\nv 0.294716 0.056692 -0.197803\nv 0.336740 0.102368 -0.243338\nv 0.331825 0.142094 -0.200533\nv 0.239806 0.174021 -0.134133\nv 0.151382 0.127287 -0.162529\nv 0.128763 0.108124 -0.167775\nv 0.151120 0.106789 -0.165163\nv 0.185716 0.092715 -0.156667\nv 0.229700 0.086897 -0.161883\nv 0.279699 0.095986 -0.188890\nv 0.309714 0.116233 -0.222450\nv 0.305157 0.125845 -0.201761\nv 0.232182 0.156804 -0.157400\nv 0.142249 0.113507 -0.175351\nv 0.065585 0.119462 -0.100974\nv 0.108741 0.172508 -0.080994\nv 0.183153 -0.010510 -0.129515\nv 0.253825 -0.003445 -0.154543\nv 0.318923 0.027415 -0.206963\nv 0.362239 0.086195 -0.259092\nv 0.352279 0.176820 -0.193060\nv 0.252282 0.216997 -0.104641\nv 0.036195 0.081635 -0.052848\nv 0.034089 0.128873 -0.062444\nv 0.074965 0.045805 -0.096762\nv 0.072843 0.239325 -0.047672\nv 0.253892 0.288032 -0.101722\nv 0.251058 0.335162 -0.119951\nv 0.118887 0.335748 -0.067855\nv 0.120000 0.417536 -0.103944\nv 0.123493 0.527591 -0.188838\nv 0.244879 0.511883 -0.250066\nv 0.253284 0.397936 -0.163006\nv 0.356352 0.358700 -0.365330\nv 0.370070 0.212799 -0.248551\nv 0.388782 0.058426 -0.287901\nv 0.349565 -0.022660 -0.220536\nv 0.284991 -0.064413 -0.162758\nv 0.308989 -0.116614 -0.191262\nv 0.324462 -0.168301 -0.230756\nv 0.333789 -0.214756 -0.265984\nv 0.338473 -0.256922 -0.295368\nv 0.363227 -0.069628 -0.251188\nv 0.370468 -0.165309 -0.331720\nv 0.371912 -0.204505 -0.363676\nv 0.367015 -0.121330 -0.293244\nv 0.416582 0.045594 -0.399157\nv 0.414590 -0.027461 -0.427616\nv 0.111010 -0.373207 -0.086188\nv 0.067721 -0.389327 -0.055536\nv 0.113613 -0.519425 -0.077045\nv 0.106631 -0.366109 -0.094343\nv 0.071127 -0.408695 -0.050584\nv 0.183143 0.147974 -0.159898\nv 0.182252 0.159993 -0.156366\nv 0.185157 0.201684 -0.088473\nv 0.181263 0.164348 -0.131359\nv 0.290459 0.161487 -0.167135\nv 0.279843 0.158310 -0.179454\nv 0.304534 0.203156 -0.141132\nv 0.277173 0.145921 -0.180998\nv 0.309939 0.263023 -0.150639\nv 0.179534 0.277732 -0.074890\nv 0.126596 -0.408323 -0.084668\nv 0.040271 -0.281992 -0.020561\nv 0.087979 -0.090294 -0.036241\nv 0.124979 -0.127185 -0.096468\nv 0.000000 -0.059517 0.039227\nv -0.038152 -0.063653 0.023119\nv -0.038493 -0.104621 0.052808\nv 0.000000 -0.103534 0.069954\nv -0.092976 -0.119867 -0.021141\nv 0.000000 0.000000 -0.000000\nv -0.038533 -0.148960 0.056111\nv 0.000000 -0.153536 0.071614\nv 0.000000 -0.184766 0.047131\nv -0.033863 -0.177500 0.034778\nv -0.080272 -0.171101 -0.007969\nv -0.091498 -0.151409 -0.011075\nv 0.000000 -0.195266 0.010965\nv -0.014672 -0.190260 0.009363\nv 0.000000 -0.208472 -0.016970\nv -0.030795 -0.200985 -0.023699\nv -0.042429 -0.008568 -0.014100\nv -0.076827 -0.041401 -0.071837\nv -0.121243 -0.054658 -0.100737\nv -0.234283 -0.085533 -0.138323\nv -0.221874 -0.230809 -0.144174\nv -0.290564 -0.191496 -0.196317\nv -0.306483 -0.240744 -0.225450\nv -0.176093 -0.132913 -0.113097\nv -0.134935 -0.163211 -0.102034\nv -0.193472 -0.303309 -0.119153\nv -0.172963 -0.257925 -0.113391\nv -0.241987 -0.279391 -0.157915\nv -0.268343 -0.139532 -0.163265\nv -0.200158 -0.180280 -0.128637\nv -0.153183 -0.207138 -0.106757\nv -0.316047 -0.286909 -0.248207\nv -0.256453 -0.324421 -0.170077\nv -0.206227 -0.339919 -0.126553\nv -0.194203 -0.398041 -0.122565\nv -0.238439 -0.412053 -0.167834\nv -0.152893 -0.360546 -0.110787\nv -0.165999 -0.347759 -0.116507\nv -0.156827 -0.337468 -0.100273\nv -0.167924 -0.375573 -0.111517\nv -0.075563 -0.304321 -0.021487\nv 0.000000 -0.306744 -0.005393\nv -0.138900 -0.319522 -0.073007\nv -0.141856 -0.352417 -0.120460\nv -0.148223 -0.345814 -0.124744\nv -0.154150 -0.345961 -0.118449\nv -0.141140 -0.341957 -0.113448\nv -0.149351 -0.339445 -0.104638\nv -0.147383 -0.353823 -0.114221\nv -0.066305 -0.381269 -0.067569\nv -0.132517 -0.328741 -0.079014\nv -0.121892 -0.336462 -0.092747\nv -0.181297 -0.344482 -0.117068\nv -0.167479 -0.324306 -0.103252\nv -0.077238 -0.429326 -0.063530\nv -0.144112 -0.294698 -0.079721\nv -0.115996 -0.384963 -0.081272\nv -0.072600 -0.321020 -0.028674\nv 0.000000 -0.321081 -0.008766\nv -0.089321 -0.289214 -0.036301\nv -0.066498 -0.330196 -0.049199\nv 0.000000 -0.329258 -0.030311\nv 0.000000 -0.288915 -0.013667\nv -0.125010 -0.219718 -0.086196\nv -0.055363 -0.234699 -0.037596\nv 0.000000 -0.242487 -0.027512\nv -0.107404 -0.175854 -0.086100\nv -0.118593 -0.151122 -0.086707\nv -0.118192 -0.589743 -0.105229\nv -0.318452 -0.428674 -0.312063\nv -0.320751 -0.358534 -0.278810\nv -0.350139 -0.383595 -0.367148\nv -0.345195 -0.320538 -0.332002\nv -0.382181 -0.311069 -0.446371\nv -0.374865 -0.262788 -0.402268\nv -0.119531 0.629772 -0.317195\nv 0.000000 0.636507 -0.295534\nv -0.328603 0.551081 -0.438663\nv -0.238096 0.605111 -0.367836\nv -0.410397 -0.186291 -0.529966\nv -0.396799 0.238236 -0.364573\nv -0.429268 0.230814 -0.572498\nv -0.437400 0.136356 -0.579237\nv -0.438263 0.053781 -0.580183\nv -0.408718 -0.125430 -0.478940\nv -0.409743 -0.081674 -0.455694\nv -0.436235 -0.014008 -0.572424\nv -0.428942 -0.089156 -0.558807\nv -0.412560 0.345047 -0.549472\nv -0.325277 0.475826 -0.388484\nv -0.390805 0.446999 -0.515934\nv -0.229002 -0.510218 -0.208261\nv -0.095841 -0.470373 -0.075102\nv -0.138419 0.136589 -0.156835\nv -0.110219 0.107480 -0.159984\nv -0.136326 0.088892 -0.157315\nv -0.186106 0.067243 -0.151745\nv -0.232322 0.061815 -0.160961\nv -0.284292 0.077634 -0.190588\nv -0.321543 0.110253 -0.231047\nv -0.318381 0.134581 -0.204874\nv -0.233523 0.170065 -0.155951\nv -0.089221 0.110177 -0.142426\nv -0.122035 0.145683 -0.128418\nv -0.120067 0.069882 -0.143441\nv -0.189081 0.040545 -0.145002\nv -0.238084 0.035599 -0.162214\nv -0.294716 0.056692 -0.197803\nv -0.336740 0.102368 -0.243338\nv -0.331825 0.142094 -0.200533\nv -0.239806 0.174021 -0.134133\nv -0.151382 0.127287 -0.162529\nv -0.128763 0.108124 -0.167775\nv -0.151120 0.106789 -0.165163\nv -0.185716 0.092715 -0.156667\nv -0.229700 0.086897 -0.161883\nv -0.279699 0.095986 -0.188890\nv -0.309714 0.116233 -0.222450\nv -0.305157 0.125845 -0.201761\nv -0.232182 0.156804 -0.157400\nv -0.142249 0.113507 -0.175351\nv -0.065585 0.119462 -0.100974\nv -0.108741 0.172508 -0.080994\nv -0.183153 -0.010510 -0.129515\nv -0.253825 -0.003445 -0.154543\nv -0.318923 0.027415 -0.206963\nv -0.362239 0.086195 -0.259092\nv -0.352279 0.176820 -0.193060\nv -0.252282 0.216997 -0.104641\nv -0.036195 0.081635 -0.052848\nv -0.034089 0.128873 -0.062444\nv -0.074965 0.045805 -0.096762\nv -0.072843 0.239325 -0.047672\nv -0.253892 0.288032 -0.101722\nv 0.000000 0.088374 -0.040325\nv 0.000000 0.131250 -0.051931\nv 0.000000 0.243711 -0.043212\nv -0.251058 0.335162 -0.119951\nv -0.118887 0.335748 -0.067855\nv 0.000000 0.332601 -0.061220\nv -0.120000 0.417536 -0.103944\nv -0.123493 0.527591 -0.188838\nv -0.244879 0.511883 -0.250066\nv -0.253284 0.397936 -0.163006\nv -0.356352 0.358700 -0.365330\nv 0.000000 0.419184 -0.091933\nv 0.000000 0.535880 -0.173559\nv -0.370070 0.212799 -0.248551\nv -0.388782 0.058426 -0.287901\nv -0.349565 -0.022660 -0.220536\nv -0.284991 -0.064413 -0.162758\nv -0.308989 -0.116614 -0.191262\nv -0.324462 -0.168301 -0.230756\nv -0.333789 -0.214756 -0.265984\nv -0.338473 -0.256922 -0.295368\nv -0.363227 -0.069628 -0.251188\nv -0.370468 -0.165309 -0.331720\nv -0.371912 -0.204505 -0.363676\nv -0.367015 -0.121330 -0.293244\nv -0.416582 0.045594 -0.399157\nv -0.414590 -0.027461 -0.427616\nv -0.111010 -0.373207 -0.086188\nv -0.067721 -0.389327 -0.055536\nv -0.113613 -0.519425 -0.077045\nv -0.106631 -0.366109 -0.094343\nv -0.071127 -0.408695 -0.050584\nv 0.000000 -0.382922 -0.038809\nv 0.000000 -0.391953 -0.027089\nv 0.000000 -0.440253 -0.035507\nv 0.000000 -0.527330 -0.039309\nv 0.000000 -0.605289 -0.070169\nv 0.000000 -0.475131 -0.049614\nv -0.183143 0.147974 -0.159898\nv -0.182252 0.159993 -0.156366\nv -0.185157 0.201684 -0.088473\nv -0.181263 0.164348 -0.131359\nv -0.290459 0.161487 -0.167135\nv -0.279843 0.158310 -0.179454\nv -0.304534 0.203156 -0.141132\nv -0.277173 0.145921 -0.180998\nv -0.309939 0.263023 -0.150639\nv -0.179534 0.277732 -0.074890\nv -0.126596 -0.408323 -0.084668\nv 0.000000 -0.415177 -0.022688\nv -0.040271 -0.281992 -0.020561\nv -0.087979 -0.090294 -0.036241\nv -0.124979 -0.127185 -0.096468\ns off\nf 1 162 165\nf 165 2 1\nf 117 296 167\nf 167 10 117\nf 119 117 10\nf 10 11 119\nf 2 165 169\nf 169 4 2\nf 2 4 7\nf 7 3 2\nf 169 170 5\nf 5 4 169\nf 4 5 6\nf 6 7 4\nf 8 5 170\nf 170 174 8\nf 9 8 174\nf 174 176 9\nf 6 5 8\nf 8 9 6\nf 167 162 1\nf 1 10 167\nf 12 119 11\nf 111 119 12\nf 13 111 12\nf 12 17 13\nf 14 21 16\nf 16 15 14\nf 20 19 21\nf 21 14 20\nf 15 22 23\nf 23 14 15\nf 14 23 24\nf 24 20 14\nf 25 16 21\nf 21 26 25\nf 26 21 19\nf 19 27 26\nf 59 25 26\nf 26 29 59\nf 29 26 27\nf 27 28 29\nf 35 32 46\nf 47 330 333\nf 47 80 158\nf 30 49 158\nf 35 48 51\nf 31 45 46\nf 30 31 38\nf 37 36 41\nf 44 39 40\nf 39 37 38\nf 35 34 50\nf 32 35 43\nf 38 31 32\nf 43 50 52\nf 31 30 33\nf 50 34 203\nf 50 220 223\nf 33 28 27\nf 27 45 33\nf 46 45 27\nf 27 19 46\nf 48 46 19\nf 19 20 48\nf 20 24 53\nf 53 48 20\nf 54 51 53\nf 51 48 53\nf 203 34 159\nf 203 159 224\nf 55 53 24\nf 24 18 55\nf 54 53 55\nf 55 9 54\nf 176 227 54\nf 54 9 176\nf 18 24 23\nf 23 17 18\nf 17 23 22\nf 22 13 17\nf 55 7 6\nf 6 9 55\nf 56 55 18\nf 331 145 80\nf 224 159 227\nf 79 58 59\nf 59 29 79\nf 58 60 61\nf 61 59 58\nf 62 63 61\nf 61 60 62\nf 70 69 68\nf 68 141 70\nf 71 70 141\nf 141 142 71\nf 73 72 75\nf 75 74 73\nf 63 62 67\nf 128 68 69\nf 69 76 128\nf 128 76 78\nf 78 77 128\nf 80 28 158\nf 7 56 3\nf 55 56 7\nf 34 51 159\nf 29 145 57\nf 57 79 29\nf 81 91 90\nf 90 82 81\nf 93 84 83\nf 83 92 93\nf 85 84 93\nf 93 94 85\nf 86 95 96\nf 96 87 86\nf 87 96 97\nf 97 88 87\nf 128 156 68\nf 99 81 82\nf 82 100 99\nf 84 102 101\nf 101 83 84\nf 103 102 84\nf 84 85 103\nf 105 104 86\nf 86 87 105\nf 99 100 108\nf 149 148 107\nf 150 151 98\nf 82 90 92\nf 92 83 82\nf 100 82 83\nf 83 101 100\nf 95 86 85\nf 85 94 95\nf 86 104 103\nf 103 85 86\nf 81 99 148\nf 89 98 151\nf 90 91 110\nf 110 109 90\nf 93 92 119\nf 119 111 93\nf 94 93 111\nf 111 112 94\nf 96 95 113\nf 113 114 96\nf 97 96 114\nf 114 115 97\nf 151 91 81\nf 116 154 156\nf 92 90 109\nf 109 119 92\nf 95 94 112\nf 112 113 95\nf 118 117 119\nf 119 109 118\nf 120 118 109\nf 109 110 120\nf 115 129 156\nf 129 68 156\nf 297 296 117\nf 117 118 297\nf 298 297 118\nf 118 120 298\nf 122 127 124\nf 124 123 122\nf 156 128 127\nf 127 122 156\nf 123 124 307\nf 307 301 123\nf 125 124 127\nf 127 126 125\nf 126 127 128\nf 128 77 126\nf 307 124 125\nf 125 308 307\nf 65 66 126\nf 77 65 126\nf 238 308 125\nf 125 64 238\nf 115 114 130\nf 130 129 115\nf 131 130 114\nf 114 113 131\nf 132 131 113\nf 113 112 132\nf 13 132 112\nf 112 111 13\nf 132 13 22\nf 22 133 132\nf 134 15 16\nf 16 135 134\nf 133 22 15\nf 15 134 133\nf 135 16 25\nf 25 136 135\nf 25 59 61\nf 61 136 25\nf 131 132 133\nf 133 137 131\nf 140 134 135\nf 135 138 140\nf 137 133 134\nf 134 140 137\nf 138 135 136\nf 136 139 138\nf 136 61 63\nf 63 139 136\nf 130 131 137\nf 137 141 130\nf 142 140 138\nf 138 73 142\nf 141 137 140\nf 140 142 141\nf 73 138 139\nf 139 72 73\nf 139 63 67\nf 67 72 139\nf 129 130 141\nf 141 68 129\nf 88 106 105\nf 105 87 88\nf 161 11 160\nf 142 73 74\nf 74 71 142\nf 125 126 66\nf 66 64 125\nf 77 78 65\nf 30 41 143\nf 29 28 80\nf 80 145 29\nf 54 159 51\nf 159 54 227\nf 108 100 101\nf 123 301 298\nf 298 120 123\nf 123 120 157\nf 150 157 120\nf 110 91 151\nf 115 154 152\nf 152 153 88\nf 106 88 153\nf 154 116 98\nf 89 153 152\nf 107 155 153\nf 123 157 122\nf 121 156 122\nf 121 122 157\nf 116 121 157\nf 28 33 158\nf 72 67 75\nf 146 143 41\nf 332 57 145\nf 160 1 2\nf 2 3 160\nf 10 1 160\nf 160 11 10\nf 11 161 12\nf 17 12 161\nf 161 18 17\nf 47 158 49\nf 144 147 49\nf 147 345 330\nf 147 144 329\nf 144 42 328\nf 18 161 56\nf 3 56 161\nf 161 160 3\nf 143 146 42\nf 163 165 162\nf 165 163 164\nf 291 167 296\nf 167 291 178\nf 293 178 291\nf 178 293 179\nf 164 169 165\nf 169 164 168\nf 164 173 168\nf 173 164 166\nf 169 171 170\nf 171 169 168\nf 168 172 171\nf 172 168 173\nf 175 170 171\nf 170 175 174\nf 177 174 175\nf 174 177 176\nf 172 175 171\nf 175 172 177\nf 167 163 162\nf 163 167 178\nf 180 179 293\nf 285 180 293\nf 181 180 285\nf 180 181 185\nf 182 184 189\nf 184 182 183\nf 188 189 187\nf 189 188 182\nf 183 191 190\nf 191 183 182\nf 182 192 191\nf 192 182 188\nf 193 189 184\nf 189 193 194\nf 194 187 189\nf 187 194 195\nf 232 194 193\nf 194 232 197\nf 197 195 194\nf 195 197 196\nf 204 217 215\nf 216 254 333\nf 216 344 254\nf 198 201 344\nf 204 202 221\nf 199 200 215\nf 207 199 198\nf 206 207 210\nf 213 212 209\nf 207 206 208\nf 219 202 204\nf 212 204 200\nf 207 209 200\nf 222 219 212\nf 199 214 201\nf 219 220 203\nf 223 220 219\nf 201 195 196\nf 195 201 214\nf 215 195 214\nf 195 215 187\nf 217 187 215\nf 187 217 188\nf 188 225 192\nf 225 188 217\nf 226 225 221\nf 221 225 217\nf 203 346 202\nf 203 224 346\nf 228 192 225\nf 192 228 186\nf 226 228 225\nf 228 226 177\nf 176 226 227\nf 226 176 177\nf 186 191 192\nf 191 186 185\nf 185 190 191\nf 190 185 181\nf 228 172 173\nf 172 228 177\nf 229 186 228\nf 331 333 254\nf 224 227 346\nf 253 232 231\nf 232 253 197\nf 231 234 233\nf 234 231 232\nf 235 234 236\nf 234 235 233\nf 244 242 243\nf 242 244 321\nf 245 321 244\nf 321 245 322\nf 247 249 246\nf 249 247 248\nf 236 241 235\nf 306 243 242\nf 243 306 250\nf 306 252 250\nf 252 306 251\nf 254 344 196\nf 173 166 229\nf 228 173 229\nf 202 346 221\nf 197 230 325\nf 230 197 253\nf 255 264 265\nf 264 255 256\nf 267 257 258\nf 257 267 266\nf 259 267 258\nf 267 259 268\nf 260 270 269\nf 270 260 261\nf 261 271 270\nf 271 261 262\nf 306 242 342\nf 273 256 255\nf 256 273 274\nf 258 275 276\nf 275 258 257\nf 277 258 276\nf 258 277 259\nf 279 260 278\nf 260 279 261\nf 273 282 274\nf 281 334 335\nf 272 337 336\nf 256 266 264\nf 266 256 257\nf 274 257 256\nf 257 274 275\nf 269 259 260\nf 259 269 268\nf 260 277 278\nf 277 260 259\nf 334 273 255\nf 263 335 337\nf 264 284 265\nf 284 264 283\nf 267 293 266\nf 293 267 285\nf 268 285 267\nf 285 268 286\nf 270 287 269\nf 287 270 288\nf 271 288 270\nf 288 271 289\nf 255 265 337\nf 290 295 342\nf 266 283 264\nf 283 266 293\nf 269 286 268\nf 286 269 287\nf 292 293 291\nf 293 292 283\nf 294 283 292\nf 283 294 284\nf 342 309 289\nf 309 342 242\nf 297 291 296\nf 291 297 292\nf 298 292 297\nf 292 298 294\nf 299 302 305\nf 302 299 300\nf 342 305 306\nf 305 342 299\nf 300 307 302\nf 307 300 301\nf 303 305 302\nf 305 303 304\nf 304 306 305\nf 306 304 251\nf 307 303 302\nf 303 307 308\nf 239 304 240\nf 251 304 239\nf 238 303 308\nf 303 238 237\nf 289 310 288\nf 310 289 309\nf 311 288 310\nf 288 311 287\nf 312 287 311\nf 287 312 286\nf 181 286 312\nf 286 181 285\nf 312 190 181\nf 190 312 313\nf 314 184 183\nf 184 314 315\nf 313 183 190\nf 183 313 314\nf 315 193 184\nf 193 315 316\nf 193 234 232\nf 234 193 316\nf 311 313 312\nf 313 311 317\nf 320 315 314\nf 315 320 318\nf 317 314 313\nf 314 317 320\nf 318 316 315\nf 316 318 319\nf 316 236 234\nf 236 316 319\nf 310 317 311\nf 317 310 321\nf 322 318 320\nf 318 322 247\nf 321 320 317\nf 320 321 322\nf 247 319 318\nf 319 247 246\nf 319 241 236\nf 241 319 246\nf 309 321 310\nf 321 309 242\nf 262 279 280\nf 279 262 261\nf 348 347 179\nf 322 248 247\nf 248 322 245\nf 303 240 304\nf 240 303 237\nf 251 239 252\nf 198 218 323\nf 197 254 196\nf 254 197 325\nf 226 221 346\nf 346 227 226\nf 282 275 274\nf 300 298 301\nf 298 300 294\nf 300 343 294\nf 294 343 336\nf 337 265 284\nf 289 271 338\nf 338 271 262\nf 339 262 280\nf 340 338 272\nf 338 339 263\nf 281 263 339\nf 300 299 343\nf 295 299 342\nf 295 343 299\nf 343 295 290\nf 196 344 201\nf 246 249 241\nf 210 323 326\nf 332 331 325\nf 347 164 163\nf 164 347 166\nf 178 347 163\nf 347 178 179\nf 179 180 348\nf 185 348 180\nf 348 185 186\nf 218 344 216\nf 324 323 218\nf 327 216 330\nf 329 324 327\nf 328 211 324\nf 186 229 348\nf 166 348 229\nf 348 166 347\nf 211 326 323\nf 48 35 46\nf 80 47 333\nf 33 30 158\nf 34 35 51\nf 32 31 46\nf 41 30 38\nf 38 37 41\nf 43 44 40\nf 40 39 38\nf 43 35 50\nf 40 32 43\nf 40 38 32\nf 44 43 52\nf 45 31 33\nf 220 50 203\nf 52 50 223\nf 333 331 80\nf 89 149 107\nf 116 150 98\nf 149 81 148\nf 149 89 151\nf 149 151 81\nf 121 116 156\nf 154 115 156\nf 49 30 143\nf 110 150 120\nf 150 110 151\nf 97 115 152\nf 97 152 88\nf 155 106 153\nf 152 154 98\nf 98 89 152\nf 89 107 153\nf 150 116 157\nf 36 146 41\nf 331 332 145\nf 147 47 49\nf 143 144 49\nf 47 147 330\nf 345 147 329\nf 329 144 328\nf 144 143 42\nf 200 204 215\nf 330 216 333\nf 218 198 344\nf 217 204 221\nf 214 199 215\nf 210 207 198\nf 205 206 210\nf 208 213 209\nf 209 207 208\nf 212 219 204\nf 209 212 200\nf 199 207 200\nf 213 222 212\nf 198 199 201\nf 202 219 203\nf 222 223 219\nf 325 331 254\nf 263 281 335\nf 290 272 336\nf 335 334 255\nf 272 263 337\nf 335 255 337\nf 340 290 342\nf 340 342 289\nf 210 198 323\nf 284 294 336\nf 336 337 284\nf 340 289 338\nf 339 338 262\nf 341 339 280\nf 290 340 272\nf 272 338 263\nf 341 281 339\nf 336 343 290\nf 205 210 326\nf 230 332 325\nf 327 218 216\nf 327 324 218\nf 345 327 330\nf 345 329 327\nf 329 328 324\nf 324 211 323\n"

/***/ },
/* 17 */
/*!**************************!*\
  !*** ./src/data/fp.json ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = [
		[
			-0.4374,
			0.136356,
			-0.579237
		],
		[
			-0.436235,
			-0.014008,
			-0.572424
		],
		[
			-0.410397,
			-0.186291,
			-0.529966
		],
		[
			-0.382181,
			-0.311069,
			-0.446371
		],
		[
			-0.318452,
			-0.428674,
			-0.312063
		],
		[
			-0.229002,
			-0.510218,
			-0.208261
		],
		[
			-0.118192,
			-0.589743,
			-0.105229
		],
		[
			0,
			-0.605289,
			-0.070169
		],
		[
			0.118192,
			-0.589743,
			-0.105229
		],
		[
			0.229002,
			-0.510218,
			-0.208261
		],
		[
			0.318452,
			-0.428674,
			-0.312063
		],
		[
			0.382181,
			-0.311069,
			-0.446371
		],
		[
			0.410397,
			-0.186291,
			-0.529966
		],
		[
			0.436235,
			-0.014008,
			-0.572424
		],
		[
			0.4374,
			0.136356,
			-0.579237
		],
		[
			0.37007,
			0.212799,
			-0.248551
		],
		[
			0.309939,
			0.263192,
			-0.150639
		],
		[
			0.179534,
			0.277732,
			-0.07489
		],
		[
			0.072843,
			0.239325,
			-0.047672
		],
		[
			-0.37007,
			0.212799,
			-0.248551
		],
		[
			-0.309939,
			0.263192,
			-0.150639
		],
		[
			-0.179534,
			0.277732,
			-0.07489
		],
		[
			-0.072843,
			0.239325,
			-0.047672
		],
		[
			-0.309714,
			0.116233,
			-0.22245
		],
		[
			-0.232182,
			0.156804,
			-0.1574
		],
		[
			-0.142249,
			0.113507,
			-0.175351
		],
		[
			-0.2297,
			0.086897,
			-0.161883
		],
		[
			0,
			0,
			0
		],
		[
			0.309714,
			0.116233,
			-0.22245
		],
		[
			0.232182,
			0.156804,
			-0.1574
		],
		[
			0.142249,
			0.113507,
			-0.175351
		],
		[
			0.2297,
			0.086897,
			-0.161883
		],
		[
			0,
			0,
			0
		],
		[
			0,
			0.088374,
			-0.040324
		],
		[
			-0.076827,
			-0.041401,
			-0.071837
		],
		[
			-0.124979,
			-0.127185,
			-0.096468
		],
		[
			-0.107404,
			-0.175854,
			-0.0861
		],
		[
			0,
			-0.208472,
			-0.01697
		],
		[
			0.107404,
			-0.175854,
			-0.0861
		],
		[
			0.124979,
			-0.127185,
			-0.096468
		],
		[
			0.076827,
			-0.041401,
			-0.071837
		],
		[
			0,
			0,
			0
		],
		[
			-0.033863,
			-0.1775,
			0.034778
		],
		[
			0.033863,
			-0.1775,
			0.034778
		],
		[
			-0.15415,
			-0.345961,
			-0.118449
		],
		[
			-0.089321,
			-0.289214,
			-0.036301
		],
		[
			-0.040271,
			-0.281992,
			-0.020561
		],
		[
			0,
			-0.288915,
			-0.013667
		],
		[
			0.040271,
			-0.281992,
			-0.020561
		],
		[
			0.089321,
			-0.289214,
			-0.036301
		],
		[
			0.15415,
			-0.345961,
			-0.118449
		],
		[
			0.126596,
			-0.408323,
			-0.084668
		],
		[
			0.077238,
			-0.429326,
			-0.06353
		],
		[
			0,
			-0.440253,
			-0.035507
		],
		[
			-0.077238,
			-0.429326,
			-0.06353
		],
		[
			-0.126596,
			-0.408323,
			-0.084668
		],
		[
			-0.066305,
			-0.381269,
			-0.067569
		],
		[
			0,
			-0.382922,
			-0.038809
		],
		[
			0.066305,
			-0.381269,
			-0.067569
		],
		[
			0.066498,
			-0.330196,
			-0.049199
		],
		[
			0,
			-0.329258,
			-0.030311
		],
		[
			-0.066498,
			-0.330196,
			-0.049199
		],
		[
			0,
			-0.103534,
			0.069954
		],
		[
			-0.277173,
			0.145921,
			-0.180998
		],
		[
			-0.183143,
			0.147974,
			-0.159898
		],
		[
			-0.185716,
			0.092715,
			-0.156667
		],
		[
			-0.279699,
			0.095986,
			-0.18889
		],
		[
			0.277173,
			0.145921,
			-0.180998
		],
		[
			0.183143,
			0.147974,
			-0.159898
		],
		[
			0.185716,
			0.092715,
			-0.156667
		],
		[
			0.279699,
			0.095986,
			-0.18889
		],
		[
			0.429268,
			0.230814,
			-0.572498
		],
		[
			0.390805,
			0.446999,
			-0.515934
		],
		[
			0.328603,
			0.551081,
			-0.438663
		],
		[
			0.119531,
			0.629772,
			-0.317195
		],
		[
			0,
			0.636507,
			-0.295534
		],
		[
			-0.119531,
			0.629772,
			-0.317195
		],
		[
			-0.328603,
			0.551081,
			-0.438663
		],
		[
			-0.390805,
			0.446999,
			-0.515934
		],
		[
			-0.429268,
			0.230814,
			-0.572498
		]
	];

/***/ },
/* 18 */
/*!**************************************************!*\
  !*** ./~/ctx-get-transform/ctx-get-transform.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var mat3 = __webpack_require__(/*! gl-mat3 */ 19);
	
	module.exports = monkeyPatchCtxToAddGetTransform;
	
	function monkeyPatchCtxToAddGetTransform(ctx) {
	
	  var mat = [1, 0, 0, 0, 1, 0, 0, 0, 1];
	  var stack = [];
	  var v2scratch = [0, 0, 0];
	  var m3scratch = [1, 0, 0, 0, 1, 0, 0, 0, 1];
	
	  ctx.getTransform = function tGetTransform() {
	    return mat;
	  };
	
	  (function(save) {
	    ctx.save = function tSave(){
	      stack.push(mat3.clone(mat));
	      return save.call(ctx);
	    };
	  })(ctx.save);
	
	  (function(restore) {
	    ctx.restore = function tRestore(){
	      mat = stack.pop();
	      return restore.call(ctx);
	    };
	  })(ctx.restore);
	
	  (function(scale) {
	    ctx.scale = function tScale(sx, sy){
	      v2scratch[0] = sx;
	      v2scratch[1] = sy;
	      mat3.scale(mat, mat, v2scratch);
	      return scale.call(ctx, sx, sy);
	    };
	  })(ctx.scale);
	
	  (function(rotate) {
	    ctx.rotate = function tRotate(radians){
	      mat3.rotate(mat, mat, radians);
	      return rotate.call(ctx, radians);
	    };
	  })(ctx.rotate);
	
	  (function(translate) {
	    ctx.translate = function tTranslate(dx, dy){
	      v2scratch[0] = dx;
	      v2scratch[1] = dy;
	
	      mat3.translate(mat, mat, v2scratch);
	      return translate.call(ctx, dx, dy);
	    };
	  })(ctx.translate);
	
	  (function(transform) {
	    ctx.transform = function tTransform(a, b, c, d, e, f){
	      m3scratch[0] = a;
	      m3scratch[1] = c;
	      m3scratch[2] = e;
	      m3scratch[3] = b;
	      m3scratch[4] = d;
	      m3scratch[5] = f;
	
	      mat3.multiply(mat, math, m3scratch);
	      return transform.call(ctx, a, b, c, d, e, f);
	    };
	  })(ctx.transform);
	
	  (function(setTransform) {
	    ctx.setTransform = function tSetTransform(a, b, c, d, e, f){
	      mat[0] = a;
	      mat[1] = c;
	      mat[2] = e;
	      mat[3] = b;
	      mat[4] = d;
	      mat[5] = f;
	      return setTransform.call(ctx, a, b, c, d, e, f);
	    };
	  })(ctx.setTransform);
	
	  return ctx;
	}


/***/ },
/* 19 */
/*!************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/index.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  adjoint: __webpack_require__(/*! ./adjoint */ 20)
	  , clone: __webpack_require__(/*! ./clone */ 21)
	  , copy: __webpack_require__(/*! ./copy */ 22)
	  , create: __webpack_require__(/*! ./create */ 23)
	  , determinant: __webpack_require__(/*! ./determinant */ 24)
	  , frob: __webpack_require__(/*! ./frob */ 25)
	  , fromMat2: __webpack_require__(/*! ./from-mat2 */ 26)
	  , fromMat4: __webpack_require__(/*! ./from-mat4 */ 27)
	  , fromQuat: __webpack_require__(/*! ./from-quat */ 28)
	  , identity: __webpack_require__(/*! ./identity */ 29)
	  , invert: __webpack_require__(/*! ./invert */ 30)
	  , multiply: __webpack_require__(/*! ./multiply */ 31)
	  , normalFromMat4: __webpack_require__(/*! ./normal-from-mat4 */ 32)
	  , rotate: __webpack_require__(/*! ./rotate */ 33)
	  , scale: __webpack_require__(/*! ./scale */ 34)
	  , str: __webpack_require__(/*! ./str */ 35)
	  , translate: __webpack_require__(/*! ./translate */ 36)
	  , transpose: __webpack_require__(/*! ./transpose */ 37)
	}


/***/ },
/* 20 */
/*!**************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/adjoint.js ***!
  \**************************************************/
/***/ function(module, exports) {

	module.exports = adjoint
	
	/**
	 * Calculates the adjugate of a mat3
	 *
	 * @alias mat3.adjoint
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	function adjoint(out, a) {
	  var a00 = a[0], a01 = a[1], a02 = a[2]
	  var a10 = a[3], a11 = a[4], a12 = a[5]
	  var a20 = a[6], a21 = a[7], a22 = a[8]
	
	  out[0] = (a11 * a22 - a12 * a21)
	  out[1] = (a02 * a21 - a01 * a22)
	  out[2] = (a01 * a12 - a02 * a11)
	  out[3] = (a12 * a20 - a10 * a22)
	  out[4] = (a00 * a22 - a02 * a20)
	  out[5] = (a02 * a10 - a00 * a12)
	  out[6] = (a10 * a21 - a11 * a20)
	  out[7] = (a01 * a20 - a00 * a21)
	  out[8] = (a00 * a11 - a01 * a10)
	
	  return out
	}


/***/ },
/* 21 */
/*!************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/clone.js ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = clone
	
	/**
	 * Creates a new mat3 initialized with values from an existing matrix
	 *
	 * @alias mat3.clone
	 * @param {mat3} a matrix to clone
	 * @returns {mat3} a new 3x3 matrix
	 */
	function clone(a) {
	  var out = new Float32Array(9)
	  out[0] = a[0]
	  out[1] = a[1]
	  out[2] = a[2]
	  out[3] = a[3]
	  out[4] = a[4]
	  out[5] = a[5]
	  out[6] = a[6]
	  out[7] = a[7]
	  out[8] = a[8]
	  return out
	}


/***/ },
/* 22 */
/*!***********************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/copy.js ***!
  \***********************************************/
/***/ function(module, exports) {

	module.exports = copy
	
	/**
	 * Copy the values from one mat3 to another
	 *
	 * @alias mat3.copy
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	function copy(out, a) {
	  out[0] = a[0]
	  out[1] = a[1]
	  out[2] = a[2]
	  out[3] = a[3]
	  out[4] = a[4]
	  out[5] = a[5]
	  out[6] = a[6]
	  out[7] = a[7]
	  out[8] = a[8]
	  return out
	}


/***/ },
/* 23 */
/*!*************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/create.js ***!
  \*************************************************/
/***/ function(module, exports) {

	module.exports = create
	
	/**
	 * Creates a new identity mat3
	 *
	 * @alias mat3.create
	 * @returns {mat3} a new 3x3 matrix
	 */
	function create() {
	  var out = new Float32Array(9)
	  out[0] = 1
	  out[1] = 0
	  out[2] = 0
	  out[3] = 0
	  out[4] = 1
	  out[5] = 0
	  out[6] = 0
	  out[7] = 0
	  out[8] = 1
	  return out
	}


/***/ },
/* 24 */
/*!******************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/determinant.js ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = determinant
	
	/**
	 * Calculates the determinant of a mat3
	 *
	 * @alias mat3.determinant
	 * @param {mat3} a the source matrix
	 * @returns {Number} determinant of a
	 */
	function determinant(a) {
	  var a00 = a[0], a01 = a[1], a02 = a[2]
	  var a10 = a[3], a11 = a[4], a12 = a[5]
	  var a20 = a[6], a21 = a[7], a22 = a[8]
	
	  return a00 * (a22 * a11 - a12 * a21)
	       + a01 * (a12 * a20 - a22 * a10)
	       + a02 * (a21 * a10 - a11 * a20)
	}


/***/ },
/* 25 */
/*!***********************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/frob.js ***!
  \***********************************************/
/***/ function(module, exports) {

	module.exports = frob
	
	/**
	 * Returns Frobenius norm of a mat3
	 *
	 * @alias mat3.frob
	 * @param {mat3} a the matrix to calculate Frobenius norm of
	 * @returns {Number} Frobenius norm
	 */
	function frob(a) {
	  return Math.sqrt(
	      a[0]*a[0]
	    + a[1]*a[1]
	    + a[2]*a[2]
	    + a[3]*a[3]
	    + a[4]*a[4]
	    + a[5]*a[5]
	    + a[6]*a[6]
	    + a[7]*a[7]
	    + a[8]*a[8]
	  )
	}


/***/ },
/* 26 */
/*!****************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/from-mat2.js ***!
  \****************************************************/
/***/ function(module, exports) {

	module.exports = fromMat2d
	
	/**
	 * Copies the values from a mat2d into a mat3
	 *
	 * @alias mat3.fromMat2d
	 * @param {mat3} out the receiving matrix
	 * @param {mat2d} a the matrix to copy
	 * @returns {mat3} out
	 **/
	function fromMat2d(out, a) {
	  out[0] = a[0]
	  out[1] = a[1]
	  out[2] = 0
	
	  out[3] = a[2]
	  out[4] = a[3]
	  out[5] = 0
	
	  out[6] = a[4]
	  out[7] = a[5]
	  out[8] = 1
	
	  return out
	}


/***/ },
/* 27 */
/*!****************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/from-mat4.js ***!
  \****************************************************/
/***/ function(module, exports) {

	module.exports = fromMat4
	
	/**
	 * Copies the upper-left 3x3 values into the given mat3.
	 *
	 * @alias mat3.fromMat4
	 * @param {mat3} out the receiving 3x3 matrix
	 * @param {mat4} a   the source 4x4 matrix
	 * @returns {mat3} out
	 */
	function fromMat4(out, a) {
	  out[0] = a[0]
	  out[1] = a[1]
	  out[2] = a[2]
	  out[3] = a[4]
	  out[4] = a[5]
	  out[5] = a[6]
	  out[6] = a[8]
	  out[7] = a[9]
	  out[8] = a[10]
	  return out
	}


/***/ },
/* 28 */
/*!****************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/from-quat.js ***!
  \****************************************************/
/***/ function(module, exports) {

	module.exports = fromQuat
	
	/**
	* Calculates a 3x3 matrix from the given quaternion
	*
	* @alias mat3.fromQuat
	* @param {mat3} out mat3 receiving operation result
	* @param {quat} q Quaternion to create matrix from
	*
	* @returns {mat3} out
	*/
	function fromQuat(out, q) {
	  var x = q[0]
	  var y = q[1]
	  var z = q[2]
	  var w = q[3]
	
	  var x2 = x + x
	  var y2 = y + y
	  var z2 = z + z
	
	  var xx = x * x2
	  var yx = y * x2
	  var yy = y * y2
	  var zx = z * x2
	  var zy = z * y2
	  var zz = z * z2
	  var wx = w * x2
	  var wy = w * y2
	  var wz = w * z2
	
	  out[0] = 1 - yy - zz
	  out[3] = yx - wz
	  out[6] = zx + wy
	
	  out[1] = yx + wz
	  out[4] = 1 - xx - zz
	  out[7] = zy - wx
	
	  out[2] = zx - wy
	  out[5] = zy + wx
	  out[8] = 1 - xx - yy
	
	  return out
	}


/***/ },
/* 29 */
/*!***************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/identity.js ***!
  \***************************************************/
/***/ function(module, exports) {

	module.exports = identity
	
	/**
	 * Set a mat3 to the identity matrix
	 *
	 * @alias mat3.identity
	 * @param {mat3} out the receiving matrix
	 * @returns {mat3} out
	 */
	function identity(out) {
	  out[0] = 1
	  out[1] = 0
	  out[2] = 0
	  out[3] = 0
	  out[4] = 1
	  out[5] = 0
	  out[6] = 0
	  out[7] = 0
	  out[8] = 1
	  return out
	}


/***/ },
/* 30 */
/*!*************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/invert.js ***!
  \*************************************************/
/***/ function(module, exports) {

	module.exports = invert
	
	/**
	 * Inverts a mat3
	 *
	 * @alias mat3.invert
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	function invert(out, a) {
	  var a00 = a[0], a01 = a[1], a02 = a[2]
	  var a10 = a[3], a11 = a[4], a12 = a[5]
	  var a20 = a[6], a21 = a[7], a22 = a[8]
	
	  var b01 = a22 * a11 - a12 * a21
	  var b11 = -a22 * a10 + a12 * a20
	  var b21 = a21 * a10 - a11 * a20
	
	  // Calculate the determinant
	  var det = a00 * b01 + a01 * b11 + a02 * b21
	
	  if (!det) return null
	  det = 1.0 / det
	
	  out[0] = b01 * det
	  out[1] = (-a22 * a01 + a02 * a21) * det
	  out[2] = (a12 * a01 - a02 * a11) * det
	  out[3] = b11 * det
	  out[4] = (a22 * a00 - a02 * a20) * det
	  out[5] = (-a12 * a00 + a02 * a10) * det
	  out[6] = b21 * det
	  out[7] = (-a21 * a00 + a01 * a20) * det
	  out[8] = (a11 * a00 - a01 * a10) * det
	
	  return out
	}


/***/ },
/* 31 */
/*!***************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/multiply.js ***!
  \***************************************************/
/***/ function(module, exports) {

	module.exports = multiply
	
	/**
	 * Multiplies two mat3's
	 *
	 * @alias mat3.multiply
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the first operand
	 * @param {mat3} b the second operand
	 * @returns {mat3} out
	 */
	function multiply(out, a, b) {
	  var a00 = a[0], a01 = a[1], a02 = a[2]
	  var a10 = a[3], a11 = a[4], a12 = a[5]
	  var a20 = a[6], a21 = a[7], a22 = a[8]
	
	  var b00 = b[0], b01 = b[1], b02 = b[2]
	  var b10 = b[3], b11 = b[4], b12 = b[5]
	  var b20 = b[6], b21 = b[7], b22 = b[8]
	
	  out[0] = b00 * a00 + b01 * a10 + b02 * a20
	  out[1] = b00 * a01 + b01 * a11 + b02 * a21
	  out[2] = b00 * a02 + b01 * a12 + b02 * a22
	
	  out[3] = b10 * a00 + b11 * a10 + b12 * a20
	  out[4] = b10 * a01 + b11 * a11 + b12 * a21
	  out[5] = b10 * a02 + b11 * a12 + b12 * a22
	
	  out[6] = b20 * a00 + b21 * a10 + b22 * a20
	  out[7] = b20 * a01 + b21 * a11 + b22 * a21
	  out[8] = b20 * a02 + b21 * a12 + b22 * a22
	
	  return out
	}


/***/ },
/* 32 */
/*!***********************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/normal-from-mat4.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	module.exports = normalFromMat4
	
	/**
	* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
	*
	* @alias mat3.normalFromMat4
	* @param {mat3} out mat3 receiving operation result
	* @param {mat4} a Mat4 to derive the normal matrix from
	*
	* @returns {mat3} out
	*/
	function normalFromMat4(out, a) {
	  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3]
	  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7]
	  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11]
	  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]
	
	  var b00 = a00 * a11 - a01 * a10
	  var b01 = a00 * a12 - a02 * a10
	  var b02 = a00 * a13 - a03 * a10
	  var b03 = a01 * a12 - a02 * a11
	  var b04 = a01 * a13 - a03 * a11
	  var b05 = a02 * a13 - a03 * a12
	  var b06 = a20 * a31 - a21 * a30
	  var b07 = a20 * a32 - a22 * a30
	  var b08 = a20 * a33 - a23 * a30
	  var b09 = a21 * a32 - a22 * a31
	  var b10 = a21 * a33 - a23 * a31
	  var b11 = a22 * a33 - a23 * a32
	
	  // Calculate the determinant
	  var det = b00 * b11
	          - b01 * b10
	          + b02 * b09
	          + b03 * b08
	          - b04 * b07
	          + b05 * b06
	
	  if (!det) return null
	  det = 1.0 / det
	
	  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det
	  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det
	  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det
	
	  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det
	  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det
	  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det
	
	  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det
	  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det
	  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det
	
	  return out
	}


/***/ },
/* 33 */
/*!*************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/rotate.js ***!
  \*************************************************/
/***/ function(module, exports) {

	module.exports = rotate
	
	/**
	 * Rotates a mat3 by the given angle
	 *
	 * @alias mat3.rotate
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @returns {mat3} out
	 */
	function rotate(out, a, rad) {
	  var a00 = a[0], a01 = a[1], a02 = a[2]
	  var a10 = a[3], a11 = a[4], a12 = a[5]
	  var a20 = a[6], a21 = a[7], a22 = a[8]
	
	  var s = Math.sin(rad)
	  var c = Math.cos(rad)
	
	  out[0] = c * a00 + s * a10
	  out[1] = c * a01 + s * a11
	  out[2] = c * a02 + s * a12
	
	  out[3] = c * a10 - s * a00
	  out[4] = c * a11 - s * a01
	  out[5] = c * a12 - s * a02
	
	  out[6] = a20
	  out[7] = a21
	  out[8] = a22
	
	  return out
	}


/***/ },
/* 34 */
/*!************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/scale.js ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = scale
	
	/**
	 * Scales the mat3 by the dimensions in the given vec2
	 *
	 * @alias mat3.scale
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to rotate
	 * @param {vec2} v the vec2 to scale the matrix by
	 * @returns {mat3} out
	 **/
	function scale(out, a, v) {
	  var x = v[0]
	  var y = v[1]
	
	  out[0] = x * a[0]
	  out[1] = x * a[1]
	  out[2] = x * a[2]
	
	  out[3] = y * a[3]
	  out[4] = y * a[4]
	  out[5] = y * a[5]
	
	  out[6] = a[6]
	  out[7] = a[7]
	  out[8] = a[8]
	
	  return out
	}


/***/ },
/* 35 */
/*!**********************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/str.js ***!
  \**********************************************/
/***/ function(module, exports) {

	module.exports = str
	
	/**
	 * Returns a string representation of a mat3
	 *
	 * @alias mat3.str
	 * @param {mat3} mat matrix to represent as a string
	 * @returns {String} string representation of the matrix
	 */
	function str(a) {
	  return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
	                   a[3] + ', ' + a[4] + ', ' + a[5] + ', ' +
	                   a[6] + ', ' + a[7] + ', ' + a[8] + ')'
	}


/***/ },
/* 36 */
/*!****************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/translate.js ***!
  \****************************************************/
/***/ function(module, exports) {

	module.exports = translate
	
	/**
	 * Translate a mat3 by the given vector
	 *
	 * @alias mat3.translate
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the matrix to translate
	 * @param {vec2} v vector to translate by
	 * @returns {mat3} out
	 */
	function translate(out, a, v) {
	  var a00 = a[0], a01 = a[1], a02 = a[2]
	  var a10 = a[3], a11 = a[4], a12 = a[5]
	  var a20 = a[6], a21 = a[7], a22 = a[8]
	  var x = v[0], y = v[1]
	
	  out[0] = a00
	  out[1] = a01
	  out[2] = a02
	
	  out[3] = a10
	  out[4] = a11
	  out[5] = a12
	
	  out[6] = x * a00 + y * a10 + a20
	  out[7] = x * a01 + y * a11 + a21
	  out[8] = x * a02 + y * a12 + a22
	
	  return out
	}


/***/ },
/* 37 */
/*!****************************************************!*\
  !*** ./~/ctx-get-transform/~/gl-mat3/transpose.js ***!
  \****************************************************/
/***/ function(module, exports) {

	module.exports = transpose
	
	/**
	 * Transpose the values of a mat3
	 *
	 * @alias mat3.transpose
	 * @param {mat3} out the receiving matrix
	 * @param {mat3} a the source matrix
	 * @returns {mat3} out
	 */
	function transpose(out, a) {
	  // If we are transposing ourselves we can skip a few steps but have to cache some values
	  if (out === a) {
	    var a01 = a[1], a02 = a[2], a12 = a[5]
	    out[1] = a[3]
	    out[2] = a[6]
	    out[3] = a01
	    out[5] = a[7]
	    out[6] = a02
	    out[7] = a12
	  } else {
	    out[0] = a[0]
	    out[1] = a[3]
	    out[2] = a[6]
	    out[3] = a[1]
	    out[4] = a[4]
	    out[5] = a[7]
	    out[6] = a[2]
	    out[7] = a[5]
	    out[8] = a[8]
	  }
	
	  return out
	}


/***/ },
/* 38 */,
/* 39 */
/*!***********************!*\
  !*** ./src/main.sass ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../~/css-loader!./../~/autoprefixer-loader!./../~/sass-loader?indentedSyntax!./main.sass */ 40);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../~/style-loader/addStyles.js */ 42)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/sass-loader/index.js?indentedSyntax!./main.sass", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/sass-loader/index.js?indentedSyntax!./main.sass");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 40 */
/*!*********************************************************************************************!*\
  !*** ./~/css-loader!./~/autoprefixer-loader!./~/sass-loader?indentedSyntax!./src/main.sass ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 41)();
	// imports
	
	
	// module
	exports.push([module.id, "html, body {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  overflow: hidden; }\n\n#tracker {\n  position: absolute;\n  left: 0;\n  top: 0;\n  -webkit-transform-origin: left top;\n      -ms-transform-origin: left top;\n          transform-origin: left top;\n  -webkit-transform: scale(0.7, 0.7);\n      -ms-transform: scale(0.7, 0.7);\n          transform: scale(0.7, 0.7); }\n  #tracker canvas {\n    position: absolute;\n    left: 0;\n    top: 0;\n    z-index: 10; }\n\n#texture {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  -webkit-transform-origin: left bottom;\n      -ms-transform-origin: left bottom;\n          transform-origin: left bottom; }\n\n#tracker-debug {\n  position: absolute;\n  left: 0;\n  top: 0;\n  -webkit-transform: scale(-1, 1);\n      -ms-transform: scale(-1, 1);\n          transform: scale(-1, 1); }\n\n.download {\n  position: absolute;\n  left: 5px;\n  bottom: 5px;\n  color: white;\n  font: 20px sans-serif; }\n", ""]);
	
	// exports


/***/ },
/* 41 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 42 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 43 */
/*!***********************!*\
  !*** ./src/body.jade ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(/*! ./~/jade/lib/runtime.js */ 44);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/Users/hiko/Dropbox (dotby.jp)/My Projects/KAMRA - Artificial Emotions/repos/experiments/08 - Model Converter/src/body.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	var self = locals || {};
	jade_debug.unshift(new jade.DebugItem( 0, "/Users/hiko/Dropbox (dotby.jp)/My Projects/KAMRA - Artificial Emotions/repos/experiments/08 - Model Converter/src/body.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/Users/hiko/Dropbox (dotby.jp)/My Projects/KAMRA - Artificial Emotions/repos/experiments/08 - Model Converter/src/body.jade" ));
	buf.push("<div class=\"container\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 2, "/Users/hiko/Dropbox (dotby.jp)/My Projects/KAMRA - Artificial Emotions/repos/experiments/08 - Model Converter/src/body.jade" ));
	buf.push("<div id=\"tracker\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, ".container\n#tracker\n  ");
	}
	}

/***/ },
/* 44 */
/*!*******************************!*\
  !*** ./~/jade/lib/runtime.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	
	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;
	
	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}
	
	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(/*! fs */ 45).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};
	
	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 45 */
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 46 */,
/* 47 */
/*!*****************************!*\
  !*** ./src/data/face3.json ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = {
		"uvs": [
			[
				0.52566,
				0.374223,
				0.504916,
				0.375871,
				0.505848,
				0.345665,
				0.528607,
				0.350494,
				0.519484,
				0.490005,
				0.5,
				0.5,
				0.503147,
				0.421119,
				0.528313,
				0.409645,
				0.54375,
				0.44326,
				0.555144,
				0.374112,
				0.504424,
				0.331276,
				0.541957,
				0.338758,
				0.558214,
				0.326584,
				0.560701,
				0.337914,
				0.503702,
				0.321065,
				0.542704,
				0.326908,
				0.554691,
				0.320009,
				0.519904,
				0.315689,
				0.504295,
				0.310721,
				0.522816,
				0.302927,
				0.504825,
				0.299632,
				0.574401,
				0.368897,
				0.596764,
				0.406642,
				0.623516,
				0.367345,
				0.601244,
				0.330403,
				0.618014,
				0.26588,
				0.629771,
				0.240433,
				0.665361,
				0.25166,
				0.655213,
				0.288071,
				0.594265,
				0.250074,
				0.604639,
				0.227713,
				0.641314,
				0.339034,
				0.608328,
				0.303834,
				0.581874,
				0.283982,
				0.671362,
				0.224058,
				0.638485,
				0.203897,
				0.610918,
				0.20123,
				0.675735,
				0.182554,
				0.625332,
				0.156878,
				0.600193,
				0.178312,
				0.578024,
				0.213405,
				0.58208,
				0.203625,
				0.581722,
				0.224956,
				0.591788,
				0.210932,
				0.535642,
				0.167778,
				0.499048,
				0.163089,
				0.546215,
				0.145107,
				0.498835,
				0.14364,
				0.562467,
				0.180702,
				0.581068,
				0.196416,
				0.55864,
				0.191814,
				0.588405,
				0.190298,
				0.548249,
				0.219915,
				0.558026,
				0.224343,
				0.590444,
				0.199285,
				0.598154,
				0.20059,
				0.584517,
				0.20021,
				0.578061,
				0.197721,
				0.568726,
				0.205436,
				0.577912,
				0.20261,
				0.574461,
				0.208978,
				0.545657,
				0.213344,
				0.542183,
				0.209568,
				0.500475,
				0.214076,
				0.500674,
				0.221446,
				0.500211,
				0.209243,
				0.567775,
				0.277726,
				0.53501,
				0.266427,
				0.526381,
				0.236423,
				0.500878,
				0.230686,
				0.55695,
				0.305503,
				0.575865,
				0.313122,
				0.502579,
				0.266901,
				0.568214,
				0.319318,
				0.496085,
				0.084947,
				0.560455,
				0.102261,
				0.626133,
				0.08481,
				0.675363,
				0.143644,
				0.692479,
				0.170507,
				0.691059,
				0.207932,
				0.71148,
				0.216895,
				0.708645,
				0.244194,
				0.738212,
				0.483192,
				0.732869,
				0.536346,
				0.710376,
				0.544563,
				0.724192,
				0.438429,
				0.742939,
				0.433283,
				0.731006,
				0.390617,
				0.731042,
				0.361105,
				0.731612,
				0.337735,
				0.741533,
				0.35562,
				0.744797,
				0.393529,
				0.733022,
				0.306385,
				0.687883,
				0.612282,
				0.722443,
				0.599997,
				0.709456,
				0.657839,
				0.672481,
				0.676483,
				0.567533,
				0.04035,
				0.564424,
				0.48865,
				0.557976,
				0.494276,
				0.542197,
				0.478266,
				0.550664,
				0.474921,
				0.594075,
				0.440782,
				0.591023,
				0.456014,
				0.564345,
				0.465473,
				0.557454,
				0.456572,
				0.617631,
				0.451676,
				0.621495,
				0.43637,
				0.643679,
				0.459864,
				0.649233,
				0.448583,
				0.674488,
				0.471875,
				0.666731,
				0.475633,
				0.671225,
				0.491958,
				0.664518,
				0.487925,
				0.656408,
				0.556242,
				0.570634,
				0.48432,
				0.559257,
				0.474959,
				0.589547,
				0.469614,
				0.5705,
				0.4745,
				0.616061,
				0.464807,
				0.660778,
				0.478563,
				0.641303,
				0.469229,
				0.565868,
				0.477618,
				0.615758,
				0.50585,
				0.58629,
				0.499598,
				0.615012,
				0.499189,
				0.586389,
				0.493479,
				0.628526,
				0.529499,
				0.59599,
				0.522551,
				0.618975,
				0.507798,
				0.58664,
				0.501972,
				0.559685,
				0.512187,
				0.536455,
				0.488854,
				0.63081,
				0.414851,
				0.662707,
				0.43322,
				0.687788,
				0.464113,
				0.682346,
				0.512519,
				0.654403,
				0.524204,
				0.63113,
				0.566272,
				0.518502,
				0.508033,
				0.549975,
				0.55205,
				0.694476,
				0.533995,
				0.499916,
				0.516857,
				0.499699,
				0.554159,
				0.630204,
				0.590837,
				0.630866,
				0.623586,
				0.566046,
				0.636373,
				0.567284,
				0.593495,
				0.499534,
				0.633325,
				0.497686,
				0.593474,
				0.556046,
				0.703933,
				0.626932,
				0.690962,
				0.489329,
				0.706744,
				0.673572,
				0.71598,
				0.620931,
				0.744638,
				0.487742,
				0.761463,
				0.555142,
				0.758631,
				0.702775,
				0.450934,
				0.678963,
				0.405376,
				0.647222,
				0.37838,
				0.659121,
				0.355222,
				0.675431,
				0.296418,
				0.681031,
				0.263514,
				0.685541,
				0.235731,
				0.688722,
				0.376013,
				0.698023,
				0.339417,
				0.706772,
				0.307041,
				0.708593,
				0.283309,
				0.657469,
				0.483436,
				0.576727,
				0.332351,
				0.558105,
				0.350068,
				0.558602,
				0.198544,
				0.597146,
				0.558461,
				0.648505,
				0.501399,
				0.643111,
				0.499731,
				0.641923,
				0.493463,
				0.557748,
				0.201282,
				0.495081,
				0.025,
				0.535887,
				0.181641,
				0.540052,
				0.197304,
				0.498845,
				0.17791,
				0.498718,
				0.191917,
				0.498703,
				0.196874,
				0.54021,
				0.202155,
				0.482418,
				0.373936,
				0.481736,
				0.35029,
				0.481262,
				0.489878,
				0.477058,
				0.409173,
				0.45714,
				0.442152,
				0.447685,
				0.372406,
				0.465595,
				0.33783,
				0.447564,
				0.325236,
				0.443197,
				0.336331,
				0.464287,
				0.325824,
				0.451841,
				0.318879,
				0.487692,
				0.315263,
				0.485849,
				0.302652,
				0.428295,
				0.367157,
				0.400287,
				0.40356,
				0.374196,
				0.364226,
				0.40111,
				0.328736,
				0.382147,
				0.263606,
				0.324859,
				0.249192,
				0.366897,
				0.2379,
				0.342828,
				0.286048,
				0.405039,
				0.247731,
				0.39212,
				0.224751,
				0.394432,
				0.301872,
				0.356884,
				0.33604,
				0.420799,
				0.281919,
				0.315085,
				0.221588,
				0.352414,
				0.201346,
				0.382259,
				0.197929,
				0.308296,
				0.18051,
				0.364677,
				0.154835,
				0.393428,
				0.175576,
				0.418195,
				0.210707,
				0.415332,
				0.222556,
				0.411929,
				0.200232,
				0.403209,
				0.207844,
				0.460888,
				0.165932,
				0.449006,
				0.14316,
				0.431331,
				0.178265,
				0.412812,
				0.192974,
				0.4057,
				0.187294,
				0.435695,
				0.189366,
				0.451085,
				0.218308,
				0.440391,
				0.222476,
				0.403424,
				0.195834,
				0.395598,
				0.197165,
				0.409359,
				0.196757,
				0.415876,
				0.194332,
				0.426447,
				0.202414,
				0.421138,
				0.20607,
				0.416068,
				0.199211,
				0.453463,
				0.211569,
				0.456715,
				0.207664,
				0.435139,
				0.275746,
				0.468201,
				0.26535,
				0.475359,
				0.23545,
				0.447636,
				0.303517,
				0.427985,
				0.311364,
				0.435697,
				0.317614,
				0.431207,
				0.100758,
				0.357901,
				0.083709,
				0.30744,
				0.141889,
				0.29268,
				0.205215,
				0.290478,
				0.168366,
				0.271838,
				0.213848,
				0.274869,
				0.240775,
				0.245332,
				0.476143,
				0.282103,
				0.537359,
				0.249153,
				0.529428,
				0.264217,
				0.431275,
				0.240632,
				0.425674,
				0.254885,
				0.383485,
				0.253653,
				0.354241,
				0.242556,
				0.348357,
				0.25308,
				0.331498,
				0.238835,
				0.385547,
				0.251978,
				0.300554,
				0.296911,
				0.606092,
				0.257879,
				0.593389,
				0.269081,
				0.651541,
				0.305336,
				0.671014,
				0.419689,
				0.039544,
				0.428257,
				0.485816,
				0.452499,
				0.476048,
				0.435248,
				0.491465,
				0.443024,
				0.472515,
				0.399928,
				0.437005,
				0.429105,
				0.462542,
				0.40235,
				0.452194,
				0.436981,
				0.453962,
				0.37604,
				0.447153,
				0.372996,
				0.432089,
				0.349144,
				0.454477,
				0.317461,
				0.465605,
				0.343917,
				0.44331,
				0.325096,
				0.469402,
				0.320873,
				0.485871,
				0.327392,
				0.481843,
				0.341487,
				0.550099,
				0.422345,
				0.481656,
				0.434106,
				0.4725,
				0.422785,
				0.471912,
				0.403601,
				0.465961,
				0.377389,
				0.46022,
				0.33101,
				0.472342,
				0.351443,
				0.463815,
				0.427432,
				0.475149,
				0.375897,
				0.501301,
				0.376568,
				0.494652,
				0.405726,
				0.496577,
				0.405598,
				0.490552,
				0.366655,
				0.524947,
				0.372754,
				0.503264,
				0.399737,
				0.519098,
				0.405523,
				0.498747,
				0.437,
				0.509693,
				0.461347,
				0.487233,
				0.364182,
				0.410576,
				0.330377,
				0.427776,
				0.30437,
				0.457741,
				0.312461,
				0.505956,
				0.366833,
				0.561313,
				0.340416,
				0.518402,
				0.480526,
				0.507422,
				0.449558,
				0.550082,
				0.302105,
				0.526672,
				0.368203,
				0.586178,
				0.430478,
				0.633933,
				0.366348,
				0.618796,
				0.431787,
				0.590764,
				0.423077,
				0.702188,
				0.356973,
				0.686429,
				0.303289,
				0.710684,
				0.355283,
				0.741137,
				0.42045,
				0.756705,
				0.289836,
				0.444268,
				0.315273,
				0.400316,
				0.350235,
				0.374769,
				0.337228,
				0.351619,
				0.318554,
				0.294381,
				0.307154,
				0.260991,
				0.299045,
				0.233287,
				0.303946,
				0.371246,
				0.289679,
				0.33454,
				0.27808,
				0.3022,
				0.275663,
				0.278841,
				0.334391,
				0.477451,
				0.426431,
				0.330891,
				0.445555,
				0.348526,
				0.435931,
				0.196086,
				0.401555,
				0.554608,
				0.343604,
				0.495794,
				0.348842,
				0.494172,
				0.349974,
				0.487879,
				0.436838,
				0.198653,
				0.460453,
				0.179815,
				0.455677,
				0.195129,
				0.455426,
				0.199913
			]
		],
		"name": "faceGeometry",
		"faces": [
			40,
			0,
			1,
			2,
			0,
			1,
			2,
			0,
			1,
			2,
			40,
			2,
			3,
			0,
			2,
			3,
			0,
			2,
			3,
			0,
			40,
			4,
			5,
			6,
			4,
			5,
			6,
			4,
			5,
			6,
			40,
			6,
			7,
			4,
			6,
			7,
			4,
			6,
			7,
			4,
			40,
			8,
			4,
			7,
			8,
			4,
			7,
			8,
			4,
			7,
			40,
			7,
			9,
			8,
			7,
			9,
			8,
			7,
			9,
			8,
			40,
			3,
			2,
			10,
			3,
			2,
			10,
			3,
			2,
			10,
			40,
			10,
			11,
			3,
			10,
			11,
			3,
			10,
			11,
			3,
			40,
			3,
			11,
			12,
			3,
			11,
			12,
			3,
			11,
			12,
			40,
			12,
			13,
			3,
			12,
			13,
			3,
			12,
			13,
			3,
			40,
			10,
			14,
			15,
			10,
			14,
			15,
			10,
			14,
			15,
			40,
			15,
			11,
			10,
			15,
			11,
			10,
			15,
			11,
			10,
			40,
			11,
			15,
			16,
			11,
			15,
			16,
			11,
			15,
			16,
			40,
			16,
			12,
			11,
			16,
			12,
			11,
			16,
			12,
			11,
			40,
			17,
			15,
			14,
			17,
			15,
			14,
			17,
			15,
			14,
			40,
			14,
			18,
			17,
			14,
			18,
			17,
			14,
			18,
			17,
			40,
			19,
			17,
			18,
			19,
			17,
			18,
			19,
			17,
			18,
			40,
			18,
			20,
			19,
			18,
			20,
			19,
			18,
			20,
			19,
			40,
			16,
			15,
			17,
			16,
			15,
			17,
			16,
			15,
			17,
			40,
			17,
			19,
			16,
			17,
			19,
			16,
			17,
			19,
			16,
			40,
			6,
			1,
			0,
			6,
			1,
			0,
			6,
			1,
			0,
			40,
			0,
			7,
			6,
			0,
			7,
			6,
			0,
			7,
			6,
			40,
			21,
			8,
			9,
			21,
			8,
			9,
			21,
			8,
			9,
			40,
			22,
			8,
			21,
			22,
			8,
			21,
			22,
			8,
			21,
			40,
			23,
			22,
			21,
			23,
			22,
			21,
			23,
			22,
			21,
			40,
			21,
			24,
			23,
			21,
			24,
			23,
			21,
			24,
			23,
			40,
			25,
			26,
			27,
			25,
			26,
			27,
			25,
			26,
			27,
			40,
			27,
			28,
			25,
			27,
			28,
			25,
			27,
			28,
			25,
			40,
			29,
			30,
			26,
			29,
			30,
			26,
			29,
			30,
			26,
			40,
			26,
			25,
			29,
			26,
			25,
			29,
			26,
			25,
			29,
			40,
			28,
			31,
			32,
			28,
			31,
			32,
			28,
			31,
			32,
			40,
			32,
			25,
			28,
			32,
			25,
			28,
			32,
			25,
			28,
			40,
			25,
			32,
			33,
			25,
			32,
			33,
			25,
			32,
			33,
			40,
			33,
			29,
			25,
			33,
			29,
			25,
			33,
			29,
			25,
			40,
			34,
			27,
			26,
			34,
			27,
			26,
			34,
			27,
			26,
			40,
			26,
			35,
			34,
			26,
			35,
			34,
			26,
			35,
			34,
			40,
			35,
			26,
			30,
			35,
			26,
			30,
			35,
			26,
			30,
			40,
			30,
			36,
			35,
			30,
			36,
			35,
			30,
			36,
			35,
			40,
			37,
			34,
			35,
			37,
			34,
			35,
			37,
			34,
			35,
			40,
			35,
			38,
			37,
			35,
			38,
			37,
			35,
			38,
			37,
			40,
			38,
			35,
			36,
			38,
			35,
			36,
			38,
			35,
			36,
			40,
			36,
			39,
			38,
			36,
			39,
			38,
			36,
			39,
			38,
			40,
			40,
			41,
			42,
			40,
			41,
			42,
			40,
			41,
			42,
			40,
			41,
			43,
			42,
			41,
			43,
			42,
			41,
			43,
			42,
			40,
			44,
			45,
			46,
			44,
			45,
			46,
			44,
			45,
			46,
			40,
			45,
			47,
			46,
			45,
			47,
			46,
			45,
			47,
			46,
			40,
			44,
			46,
			48,
			44,
			46,
			48,
			44,
			46,
			48,
			40,
			49,
			50,
			51,
			49,
			50,
			51,
			49,
			50,
			51,
			40,
			50,
			48,
			51,
			50,
			48,
			51,
			50,
			48,
			51,
			40,
			40,
			42,
			52,
			40,
			42,
			52,
			40,
			42,
			52,
			40,
			42,
			53,
			52,
			42,
			53,
			52,
			42,
			53,
			52,
			40,
			54,
			55,
			41,
			54,
			55,
			41,
			54,
			55,
			41,
			40,
			55,
			43,
			41,
			55,
			43,
			41,
			55,
			43,
			41,
			40,
			49,
			54,
			56,
			49,
			54,
			56,
			49,
			54,
			56,
			40,
			57,
			49,
			56,
			57,
			49,
			56,
			57,
			49,
			56,
			40,
			58,
			59,
			60,
			58,
			59,
			60,
			58,
			59,
			60,
			40,
			59,
			41,
			60,
			59,
			41,
			60,
			59,
			41,
			60,
			40,
			41,
			59,
			56,
			41,
			59,
			56,
			41,
			59,
			56,
			40,
			60,
			40,
			61,
			60,
			40,
			61,
			60,
			40,
			61,
			40,
			40,
			52,
			61,
			40,
			52,
			61,
			40,
			52,
			61,
			40,
			41,
			40,
			60,
			41,
			40,
			60,
			41,
			40,
			60,
			40,
			56,
			54,
			41,
			56,
			54,
			41,
			56,
			54,
			41,
			40,
			58,
			60,
			62,
			58,
			60,
			62,
			58,
			60,
			62,
			40,
			60,
			61,
			62,
			60,
			61,
			62,
			60,
			61,
			62,
			40,
			54,
			49,
			55,
			54,
			49,
			55,
			54,
			49,
			55,
			40,
			49,
			51,
			55,
			49,
			51,
			55,
			49,
			51,
			55,
			40,
			61,
			52,
			63,
			61,
			52,
			63,
			61,
			52,
			63,
			40,
			52,
			64,
			63,
			52,
			64,
			63,
			52,
			64,
			63,
			40,
			62,
			61,
			65,
			62,
			61,
			65,
			62,
			61,
			65,
			40,
			61,
			63,
			65,
			61,
			63,
			65,
			61,
			63,
			65,
			40,
			51,
			39,
			36,
			51,
			39,
			36,
			51,
			39,
			36,
			40,
			36,
			55,
			51,
			36,
			55,
			51,
			36,
			55,
			51,
			40,
			43,
			55,
			36,
			43,
			55,
			36,
			43,
			55,
			36,
			40,
			36,
			30,
			43,
			36,
			30,
			43,
			36,
			30,
			43,
			40,
			42,
			43,
			30,
			42,
			43,
			30,
			42,
			43,
			30,
			40,
			30,
			29,
			42,
			30,
			29,
			42,
			30,
			29,
			42,
			40,
			29,
			33,
			66,
			29,
			33,
			66,
			29,
			33,
			66,
			40,
			66,
			42,
			29,
			66,
			42,
			29,
			66,
			42,
			29,
			40,
			67,
			53,
			66,
			67,
			53,
			66,
			67,
			53,
			66,
			40,
			53,
			42,
			66,
			53,
			42,
			66,
			53,
			42,
			66,
			40,
			64,
			52,
			68,
			64,
			52,
			68,
			64,
			52,
			68,
			40,
			64,
			68,
			69,
			64,
			68,
			69,
			64,
			68,
			69,
			40,
			70,
			66,
			33,
			70,
			66,
			33,
			70,
			66,
			33,
			40,
			33,
			71,
			70,
			33,
			71,
			70,
			33,
			71,
			70,
			40,
			67,
			66,
			70,
			67,
			66,
			70,
			67,
			66,
			70,
			40,
			70,
			19,
			67,
			70,
			19,
			67,
			70,
			19,
			67,
			40,
			20,
			72,
			67,
			20,
			72,
			67,
			20,
			72,
			67,
			40,
			67,
			19,
			20,
			67,
			19,
			20,
			67,
			19,
			20,
			40,
			71,
			33,
			32,
			71,
			33,
			32,
			71,
			33,
			32,
			40,
			32,
			24,
			71,
			32,
			24,
			71,
			32,
			24,
			71,
			40,
			24,
			32,
			31,
			24,
			32,
			31,
			24,
			32,
			31,
			40,
			31,
			23,
			24,
			31,
			23,
			24,
			31,
			23,
			24,
			40,
			70,
			12,
			16,
			70,
			12,
			16,
			70,
			12,
			16,
			40,
			16,
			19,
			70,
			16,
			19,
			70,
			16,
			19,
			70,
			40,
			73,
			70,
			71,
			73,
			70,
			71,
			73,
			70,
			71,
			40,
			74,
			75,
			47,
			74,
			75,
			47,
			74,
			75,
			47,
			40,
			75,
			46,
			47,
			75,
			46,
			47,
			75,
			46,
			47,
			40,
			69,
			68,
			72,
			69,
			68,
			72,
			69,
			68,
			72,
			40,
			76,
			77,
			37,
			76,
			77,
			37,
			76,
			77,
			37,
			40,
			37,
			38,
			76,
			37,
			38,
			76,
			37,
			38,
			76,
			40,
			77,
			78,
			79,
			77,
			78,
			79,
			77,
			78,
			79,
			40,
			79,
			37,
			77,
			79,
			37,
			77,
			79,
			37,
			77,
			40,
			80,
			81,
			79,
			80,
			81,
			79,
			80,
			81,
			79,
			40,
			79,
			78,
			80,
			79,
			78,
			80,
			79,
			78,
			80,
			40,
			82,
			83,
			84,
			82,
			83,
			84,
			82,
			83,
			84,
			40,
			84,
			85,
			82,
			84,
			85,
			82,
			84,
			85,
			82,
			40,
			86,
			82,
			85,
			86,
			82,
			85,
			86,
			82,
			85,
			40,
			85,
			87,
			86,
			85,
			87,
			86,
			85,
			87,
			86,
			40,
			88,
			89,
			90,
			88,
			89,
			90,
			88,
			89,
			90,
			40,
			90,
			91,
			88,
			90,
			91,
			88,
			90,
			91,
			88,
			40,
			81,
			80,
			92,
			81,
			80,
			92,
			81,
			80,
			92,
			40,
			93,
			84,
			83,
			93,
			84,
			83,
			93,
			84,
			83,
			40,
			83,
			94,
			93,
			83,
			94,
			93,
			83,
			94,
			93,
			40,
			93,
			94,
			95,
			93,
			94,
			95,
			93,
			94,
			95,
			40,
			95,
			96,
			93,
			95,
			96,
			93,
			95,
			96,
			93,
			40,
			46,
			39,
			48,
			46,
			39,
			48,
			46,
			39,
			48,
			40,
			12,
			73,
			13,
			12,
			73,
			13,
			12,
			73,
			13,
			40,
			70,
			73,
			12,
			70,
			73,
			12,
			70,
			73,
			12,
			40,
			52,
			53,
			68,
			52,
			53,
			68,
			52,
			53,
			68,
			40,
			38,
			75,
			97,
			38,
			75,
			97,
			38,
			75,
			97,
			40,
			97,
			76,
			38,
			97,
			76,
			38,
			97,
			76,
			38,
			40,
			98,
			99,
			100,
			98,
			99,
			100,
			98,
			99,
			100,
			40,
			100,
			101,
			98,
			100,
			101,
			98,
			100,
			101,
			98,
			40,
			102,
			103,
			104,
			102,
			103,
			104,
			102,
			103,
			104,
			40,
			104,
			105,
			102,
			104,
			105,
			102,
			104,
			105,
			102,
			40,
			106,
			103,
			102,
			106,
			103,
			102,
			106,
			103,
			102,
			40,
			102,
			107,
			106,
			102,
			107,
			106,
			102,
			107,
			106,
			40,
			108,
			109,
			110,
			108,
			109,
			110,
			108,
			109,
			110,
			40,
			110,
			111,
			108,
			110,
			111,
			108,
			110,
			111,
			108,
			40,
			111,
			110,
			112,
			111,
			110,
			112,
			111,
			110,
			112,
			40,
			112,
			113,
			111,
			112,
			113,
			111,
			112,
			113,
			111,
			40,
			93,
			114,
			84,
			93,
			114,
			84,
			93,
			114,
			84,
			40,
			115,
			98,
			101,
			115,
			98,
			101,
			115,
			98,
			101,
			40,
			101,
			116,
			115,
			101,
			116,
			115,
			101,
			116,
			115,
			40,
			103,
			117,
			118,
			103,
			117,
			118,
			103,
			117,
			118,
			40,
			118,
			104,
			103,
			118,
			104,
			103,
			118,
			104,
			103,
			40,
			119,
			117,
			103,
			119,
			117,
			103,
			119,
			117,
			103,
			40,
			103,
			106,
			119,
			103,
			106,
			119,
			103,
			106,
			119,
			40,
			120,
			121,
			108,
			120,
			121,
			108,
			120,
			121,
			108,
			40,
			108,
			111,
			120,
			108,
			111,
			120,
			108,
			111,
			120,
			40,
			115,
			116,
			122,
			115,
			116,
			122,
			115,
			116,
			122,
			40,
			123,
			124,
			125,
			123,
			124,
			125,
			123,
			124,
			125,
			40,
			124,
			126,
			125,
			124,
			126,
			125,
			124,
			126,
			125,
			40,
			127,
			128,
			129,
			127,
			128,
			129,
			127,
			128,
			129,
			40,
			128,
			130,
			129,
			128,
			130,
			129,
			128,
			130,
			129,
			40,
			101,
			100,
			105,
			101,
			100,
			105,
			101,
			100,
			105,
			40,
			105,
			104,
			101,
			105,
			104,
			101,
			105,
			104,
			101,
			40,
			116,
			101,
			104,
			116,
			101,
			104,
			116,
			101,
			104,
			40,
			104,
			118,
			116,
			104,
			118,
			116,
			104,
			118,
			116,
			40,
			109,
			108,
			106,
			109,
			108,
			106,
			109,
			108,
			106,
			40,
			106,
			107,
			109,
			106,
			107,
			109,
			106,
			107,
			109,
			40,
			108,
			121,
			119,
			108,
			121,
			119,
			108,
			121,
			119,
			40,
			119,
			106,
			108,
			119,
			106,
			108,
			119,
			106,
			108,
			40,
			124,
			98,
			126,
			124,
			98,
			126,
			124,
			98,
			126,
			40,
			98,
			115,
			126,
			98,
			115,
			126,
			98,
			115,
			126,
			40,
			123,
			129,
			124,
			123,
			129,
			124,
			123,
			129,
			124,
			40,
			129,
			130,
			124,
			129,
			130,
			124,
			129,
			130,
			124,
			40,
			100,
			99,
			131,
			100,
			99,
			131,
			100,
			99,
			131,
			40,
			131,
			132,
			100,
			131,
			132,
			100,
			131,
			132,
			100,
			40,
			102,
			105,
			8,
			102,
			105,
			8,
			102,
			105,
			8,
			40,
			8,
			22,
			102,
			8,
			22,
			102,
			8,
			22,
			102,
			40,
			107,
			102,
			22,
			107,
			102,
			22,
			107,
			102,
			22,
			40,
			22,
			133,
			107,
			22,
			133,
			107,
			22,
			133,
			107,
			40,
			110,
			109,
			134,
			110,
			109,
			134,
			110,
			109,
			134,
			40,
			134,
			135,
			110,
			134,
			135,
			110,
			134,
			135,
			110,
			40,
			112,
			110,
			135,
			112,
			110,
			135,
			112,
			110,
			135,
			40,
			135,
			136,
			112,
			135,
			136,
			112,
			135,
			136,
			112,
			40,
			124,
			130,
			98,
			124,
			130,
			98,
			124,
			130,
			98,
			40,
			130,
			99,
			98,
			130,
			99,
			98,
			130,
			99,
			98,
			40,
			127,
			137,
			138,
			127,
			137,
			138,
			127,
			137,
			138,
			40,
			137,
			114,
			138,
			137,
			114,
			138,
			137,
			114,
			138,
			40,
			105,
			100,
			132,
			105,
			100,
			132,
			105,
			100,
			132,
			40,
			132,
			8,
			105,
			132,
			8,
			105,
			132,
			8,
			105,
			40,
			109,
			107,
			133,
			109,
			107,
			133,
			109,
			107,
			133,
			40,
			133,
			134,
			109,
			133,
			134,
			109,
			133,
			134,
			109,
			40,
			139,
			4,
			8,
			139,
			4,
			8,
			139,
			4,
			8,
			40,
			8,
			132,
			139,
			8,
			132,
			139,
			8,
			132,
			139,
			40,
			140,
			139,
			132,
			140,
			139,
			132,
			140,
			139,
			132,
			40,
			132,
			131,
			140,
			132,
			131,
			140,
			132,
			131,
			140,
			40,
			137,
			136,
			114,
			137,
			136,
			114,
			137,
			136,
			114,
			40,
			136,
			141,
			114,
			136,
			141,
			114,
			136,
			141,
			114,
			40,
			141,
			84,
			114,
			141,
			84,
			114,
			141,
			84,
			114,
			40,
			142,
			5,
			4,
			142,
			5,
			4,
			142,
			5,
			4,
			40,
			4,
			139,
			142,
			4,
			139,
			142,
			4,
			139,
			142,
			40,
			143,
			142,
			139,
			143,
			142,
			139,
			143,
			142,
			139,
			40,
			139,
			140,
			143,
			139,
			140,
			143,
			139,
			140,
			143,
			40,
			144,
			145,
			146,
			144,
			145,
			146,
			144,
			145,
			146,
			40,
			146,
			147,
			144,
			146,
			147,
			144,
			146,
			147,
			144,
			40,
			114,
			93,
			145,
			114,
			93,
			145,
			114,
			93,
			145,
			40,
			145,
			144,
			114,
			145,
			144,
			114,
			145,
			144,
			114,
			40,
			147,
			146,
			148,
			147,
			146,
			148,
			147,
			146,
			148,
			40,
			148,
			149,
			147,
			148,
			149,
			147,
			148,
			149,
			147,
			40,
			150,
			146,
			145,
			150,
			146,
			145,
			150,
			146,
			145,
			40,
			145,
			151,
			150,
			145,
			151,
			150,
			145,
			151,
			150,
			40,
			151,
			145,
			93,
			151,
			145,
			93,
			151,
			145,
			93,
			40,
			93,
			96,
			151,
			93,
			96,
			151,
			93,
			96,
			151,
			40,
			148,
			146,
			150,
			148,
			146,
			150,
			148,
			146,
			150,
			40,
			150,
			152,
			148,
			150,
			152,
			148,
			150,
			152,
			148,
			40,
			153,
			154,
			151,
			153,
			154,
			151,
			153,
			154,
			151,
			40,
			96,
			153,
			151,
			96,
			153,
			151,
			96,
			153,
			151,
			40,
			155,
			152,
			150,
			155,
			152,
			150,
			155,
			152,
			150,
			40,
			150,
			156,
			155,
			150,
			156,
			155,
			150,
			156,
			155,
			40,
			136,
			135,
			157,
			136,
			135,
			157,
			136,
			135,
			157,
			40,
			157,
			141,
			136,
			157,
			141,
			136,
			157,
			141,
			136,
			40,
			158,
			157,
			135,
			158,
			157,
			135,
			158,
			157,
			135,
			40,
			135,
			134,
			158,
			135,
			134,
			158,
			135,
			134,
			158,
			40,
			159,
			158,
			134,
			159,
			158,
			134,
			159,
			158,
			134,
			40,
			134,
			133,
			159,
			134,
			133,
			159,
			134,
			133,
			159,
			40,
			23,
			159,
			133,
			23,
			159,
			133,
			23,
			159,
			133,
			40,
			133,
			22,
			23,
			133,
			22,
			23,
			133,
			22,
			23,
			40,
			159,
			23,
			31,
			159,
			23,
			31,
			159,
			23,
			31,
			40,
			31,
			160,
			159,
			31,
			160,
			159,
			31,
			160,
			159,
			40,
			161,
			28,
			27,
			161,
			28,
			27,
			161,
			28,
			27,
			40,
			27,
			162,
			161,
			27,
			162,
			161,
			27,
			162,
			161,
			40,
			160,
			31,
			28,
			160,
			31,
			28,
			160,
			31,
			28,
			40,
			28,
			161,
			160,
			28,
			161,
			160,
			28,
			161,
			160,
			40,
			162,
			27,
			34,
			162,
			27,
			34,
			162,
			27,
			34,
			40,
			34,
			163,
			162,
			34,
			163,
			162,
			34,
			163,
			162,
			40,
			34,
			37,
			79,
			34,
			37,
			79,
			34,
			37,
			79,
			40,
			79,
			163,
			34,
			79,
			163,
			34,
			79,
			163,
			34,
			40,
			158,
			159,
			160,
			158,
			159,
			160,
			158,
			159,
			160,
			40,
			160,
			164,
			158,
			160,
			164,
			158,
			160,
			164,
			158,
			40,
			165,
			161,
			162,
			165,
			161,
			162,
			165,
			161,
			162,
			40,
			162,
			166,
			165,
			162,
			166,
			165,
			162,
			166,
			165,
			40,
			164,
			160,
			161,
			164,
			160,
			161,
			164,
			160,
			161,
			40,
			161,
			165,
			164,
			161,
			165,
			164,
			161,
			165,
			164,
			40,
			166,
			162,
			163,
			166,
			162,
			163,
			166,
			162,
			163,
			40,
			163,
			167,
			166,
			163,
			167,
			166,
			163,
			167,
			166,
			40,
			163,
			79,
			81,
			163,
			79,
			81,
			163,
			79,
			81,
			40,
			81,
			167,
			163,
			81,
			167,
			163,
			81,
			167,
			163,
			40,
			157,
			158,
			164,
			157,
			158,
			164,
			157,
			158,
			164,
			40,
			164,
			85,
			157,
			164,
			85,
			157,
			164,
			85,
			157,
			40,
			87,
			165,
			166,
			87,
			165,
			166,
			87,
			165,
			166,
			40,
			166,
			88,
			87,
			166,
			88,
			87,
			166,
			88,
			87,
			40,
			85,
			164,
			165,
			85,
			164,
			165,
			85,
			164,
			165,
			40,
			165,
			87,
			85,
			165,
			87,
			85,
			165,
			87,
			85,
			40,
			88,
			166,
			167,
			88,
			166,
			167,
			88,
			166,
			167,
			40,
			167,
			89,
			88,
			167,
			89,
			88,
			167,
			89,
			88,
			40,
			167,
			81,
			92,
			167,
			81,
			92,
			167,
			81,
			92,
			40,
			92,
			89,
			167,
			92,
			89,
			167,
			92,
			89,
			167,
			40,
			141,
			157,
			85,
			141,
			157,
			85,
			141,
			157,
			85,
			40,
			85,
			84,
			141,
			85,
			84,
			141,
			85,
			84,
			141,
			40,
			113,
			168,
			120,
			113,
			168,
			120,
			113,
			168,
			120,
			40,
			120,
			111,
			113,
			120,
			111,
			113,
			120,
			111,
			113,
			40,
			169,
			9,
			170,
			169,
			9,
			170,
			169,
			9,
			170,
			40,
			87,
			88,
			91,
			87,
			88,
			91,
			87,
			88,
			91,
			40,
			91,
			86,
			87,
			91,
			86,
			87,
			91,
			86,
			87,
			40,
			150,
			151,
			154,
			150,
			151,
			154,
			150,
			151,
			154,
			40,
			154,
			156,
			150,
			154,
			156,
			150,
			154,
			156,
			150,
			40,
			96,
			95,
			153,
			96,
			95,
			153,
			96,
			95,
			153,
			40,
			49,
			171,
			50,
			49,
			171,
			50,
			49,
			171,
			50,
			40,
			38,
			39,
			46,
			38,
			39,
			46,
			38,
			39,
			46,
			40,
			46,
			75,
			38,
			46,
			75,
			38,
			46,
			75,
			38,
			40,
			67,
			68,
			53,
			67,
			68,
			53,
			67,
			68,
			53,
			40,
			68,
			67,
			72,
			68,
			67,
			72,
			68,
			67,
			72,
			40,
			122,
			116,
			118,
			122,
			116,
			118,
			122,
			116,
			118,
			40,
			147,
			149,
			143,
			147,
			149,
			143,
			147,
			149,
			143,
			40,
			143,
			140,
			147,
			143,
			140,
			147,
			143,
			140,
			147,
			40,
			147,
			140,
			172,
			147,
			140,
			172,
			147,
			140,
			172,
			40,
			131,
			128,
			140,
			131,
			128,
			140,
			131,
			128,
			140,
			40,
			128,
			172,
			140,
			128,
			172,
			140,
			128,
			172,
			140,
			40,
			128,
			131,
			130,
			128,
			131,
			130,
			128,
			131,
			130,
			40,
			131,
			99,
			130,
			131,
			99,
			130,
			131,
			99,
			130,
			40,
			136,
			137,
			112,
			136,
			137,
			112,
			136,
			137,
			112,
			40,
			137,
			173,
			112,
			137,
			173,
			112,
			137,
			173,
			112,
			40,
			173,
			174,
			112,
			173,
			174,
			112,
			173,
			174,
			112,
			40,
			174,
			113,
			112,
			174,
			113,
			112,
			174,
			113,
			112,
			40,
			175,
			168,
			174,
			175,
			168,
			174,
			175,
			168,
			174,
			40,
			168,
			113,
			174,
			168,
			113,
			174,
			168,
			113,
			174,
			40,
			137,
			127,
			173,
			137,
			127,
			173,
			137,
			127,
			173,
			40,
			127,
			129,
			173,
			127,
			129,
			173,
			127,
			129,
			173,
			40,
			129,
			123,
			173,
			129,
			123,
			173,
			129,
			123,
			173,
			40,
			123,
			174,
			173,
			123,
			174,
			173,
			123,
			174,
			173,
			40,
			125,
			175,
			123,
			125,
			175,
			123,
			125,
			175,
			123,
			40,
			175,
			174,
			123,
			175,
			174,
			123,
			175,
			174,
			123,
			40,
			147,
			172,
			144,
			147,
			172,
			144,
			147,
			172,
			144,
			40,
			138,
			114,
			144,
			138,
			114,
			144,
			138,
			114,
			144,
			40,
			138,
			144,
			172,
			138,
			144,
			172,
			138,
			144,
			172,
			40,
			128,
			127,
			172,
			128,
			127,
			172,
			128,
			127,
			172,
			40,
			127,
			138,
			172,
			127,
			138,
			172,
			127,
			138,
			172,
			40,
			39,
			51,
			48,
			39,
			51,
			48,
			39,
			51,
			48,
			40,
			89,
			92,
			90,
			89,
			92,
			90,
			89,
			92,
			90,
			40,
			57,
			176,
			49,
			57,
			176,
			49,
			57,
			176,
			49,
			40,
			176,
			171,
			49,
			176,
			171,
			49,
			176,
			171,
			49,
			40,
			177,
			97,
			74,
			177,
			97,
			74,
			177,
			97,
			74,
			40,
			97,
			75,
			74,
			97,
			75,
			74,
			97,
			75,
			74,
			40,
			170,
			0,
			3,
			170,
			0,
			3,
			170,
			0,
			3,
			40,
			3,
			13,
			170,
			3,
			13,
			170,
			3,
			13,
			170,
			40,
			7,
			0,
			170,
			7,
			0,
			170,
			7,
			0,
			170,
			40,
			170,
			9,
			7,
			170,
			9,
			7,
			170,
			9,
			7,
			40,
			9,
			169,
			21,
			9,
			169,
			21,
			9,
			169,
			21,
			40,
			24,
			21,
			169,
			24,
			21,
			169,
			24,
			21,
			169,
			40,
			169,
			71,
			24,
			169,
			71,
			24,
			169,
			71,
			24,
			40,
			178,
			44,
			50,
			178,
			44,
			50,
			178,
			44,
			50,
			40,
			44,
			48,
			50,
			44,
			48,
			50,
			44,
			48,
			50,
			40,
			179,
			178,
			171,
			179,
			178,
			171,
			179,
			178,
			171,
			40,
			178,
			50,
			171,
			178,
			50,
			171,
			178,
			50,
			171,
			40,
			178,
			180,
			44,
			178,
			180,
			44,
			178,
			180,
			44,
			40,
			180,
			45,
			44,
			180,
			45,
			44,
			180,
			45,
			44,
			40,
			180,
			178,
			181,
			180,
			178,
			181,
			180,
			178,
			181,
			40,
			178,
			179,
			181,
			178,
			179,
			181,
			178,
			179,
			181,
			40,
			181,
			179,
			182,
			181,
			179,
			182,
			181,
			179,
			182,
			40,
			179,
			183,
			182,
			179,
			183,
			182,
			179,
			183,
			182,
			40,
			71,
			169,
			73,
			71,
			169,
			73,
			71,
			169,
			73,
			40,
			13,
			73,
			169,
			13,
			73,
			169,
			13,
			73,
			169,
			40,
			169,
			170,
			13,
			169,
			170,
			13,
			169,
			170,
			13,
			40,
			179,
			171,
			183,
			179,
			171,
			183,
			179,
			171,
			183,
			40,
			171,
			176,
			183,
			171,
			176,
			183,
			171,
			176,
			183,
			40,
			184,
			2,
			1,
			184,
			2,
			1,
			184,
			2,
			1,
			40,
			2,
			184,
			185,
			2,
			184,
			185,
			2,
			184,
			185,
			40,
			186,
			6,
			5,
			186,
			6,
			5,
			186,
			6,
			5,
			40,
			6,
			186,
			187,
			6,
			186,
			187,
			6,
			186,
			187,
			40,
			188,
			187,
			186,
			188,
			187,
			186,
			188,
			187,
			186,
			40,
			187,
			188,
			189,
			187,
			188,
			189,
			187,
			188,
			189,
			40,
			185,
			10,
			2,
			185,
			10,
			2,
			185,
			10,
			2,
			40,
			10,
			185,
			190,
			10,
			185,
			190,
			10,
			185,
			190,
			40,
			185,
			191,
			190,
			185,
			191,
			190,
			185,
			191,
			190,
			40,
			191,
			185,
			192,
			191,
			185,
			192,
			191,
			185,
			192,
			40,
			10,
			193,
			14,
			10,
			193,
			14,
			10,
			193,
			14,
			40,
			193,
			10,
			190,
			193,
			10,
			190,
			193,
			10,
			190,
			40,
			190,
			194,
			193,
			190,
			194,
			193,
			190,
			194,
			193,
			40,
			194,
			190,
			191,
			194,
			190,
			191,
			194,
			190,
			191,
			40,
			195,
			14,
			193,
			195,
			14,
			193,
			195,
			14,
			193,
			40,
			14,
			195,
			18,
			14,
			195,
			18,
			14,
			195,
			18,
			40,
			196,
			18,
			195,
			196,
			18,
			195,
			196,
			18,
			195,
			40,
			18,
			196,
			20,
			18,
			196,
			20,
			18,
			196,
			20,
			40,
			194,
			195,
			193,
			194,
			195,
			193,
			194,
			195,
			193,
			40,
			195,
			194,
			196,
			195,
			194,
			196,
			195,
			194,
			196,
			40,
			6,
			184,
			1,
			6,
			184,
			1,
			6,
			184,
			1,
			40,
			184,
			6,
			187,
			184,
			6,
			187,
			184,
			6,
			187,
			40,
			197,
			189,
			188,
			197,
			189,
			188,
			197,
			189,
			188,
			40,
			198,
			197,
			188,
			198,
			197,
			188,
			198,
			197,
			188,
			40,
			199,
			197,
			198,
			199,
			197,
			198,
			199,
			197,
			198,
			40,
			197,
			199,
			200,
			197,
			199,
			200,
			197,
			199,
			200,
			40,
			201,
			202,
			203,
			201,
			202,
			203,
			201,
			202,
			203,
			40,
			202,
			201,
			204,
			202,
			201,
			204,
			202,
			201,
			204,
			40,
			205,
			203,
			206,
			205,
			203,
			206,
			205,
			203,
			206,
			40,
			203,
			205,
			201,
			203,
			205,
			201,
			203,
			205,
			201,
			40,
			204,
			207,
			208,
			204,
			207,
			208,
			204,
			207,
			208,
			40,
			207,
			204,
			201,
			207,
			204,
			201,
			207,
			204,
			201,
			40,
			201,
			209,
			207,
			201,
			209,
			207,
			201,
			209,
			207,
			40,
			209,
			201,
			205,
			209,
			201,
			205,
			209,
			201,
			205,
			40,
			210,
			203,
			202,
			210,
			203,
			202,
			210,
			203,
			202,
			40,
			203,
			210,
			211,
			203,
			210,
			211,
			203,
			210,
			211,
			40,
			211,
			206,
			203,
			211,
			206,
			203,
			211,
			206,
			203,
			40,
			206,
			211,
			212,
			206,
			211,
			212,
			206,
			211,
			212,
			40,
			213,
			211,
			210,
			213,
			211,
			210,
			213,
			211,
			210,
			40,
			211,
			213,
			214,
			211,
			213,
			214,
			211,
			213,
			214,
			40,
			214,
			212,
			211,
			214,
			212,
			211,
			214,
			212,
			211,
			40,
			212,
			214,
			215,
			212,
			214,
			215,
			212,
			214,
			215,
			40,
			216,
			217,
			218,
			216,
			217,
			218,
			216,
			217,
			218,
			40,
			217,
			219,
			218,
			217,
			219,
			218,
			217,
			219,
			218,
			40,
			220,
			221,
			45,
			220,
			221,
			45,
			220,
			221,
			45,
			40,
			221,
			47,
			45,
			221,
			47,
			45,
			221,
			47,
			45,
			40,
			220,
			222,
			221,
			220,
			222,
			221,
			220,
			222,
			221,
			40,
			223,
			224,
			225,
			223,
			224,
			225,
			223,
			224,
			225,
			40,
			224,
			222,
			225,
			224,
			222,
			225,
			224,
			222,
			225,
			40,
			216,
			226,
			217,
			216,
			226,
			217,
			216,
			226,
			217,
			40,
			226,
			227,
			217,
			226,
			227,
			217,
			226,
			227,
			217,
			40,
			228,
			218,
			229,
			228,
			218,
			229,
			228,
			218,
			229,
			40,
			218,
			219,
			229,
			218,
			219,
			229,
			218,
			219,
			229,
			40,
			230,
			228,
			223,
			230,
			228,
			223,
			230,
			228,
			223,
			40,
			230,
			223,
			231,
			230,
			223,
			231,
			230,
			223,
			231,
			40,
			232,
			233,
			234,
			232,
			233,
			234,
			232,
			233,
			234,
			40,
			233,
			218,
			234,
			233,
			218,
			234,
			233,
			218,
			234,
			40,
			218,
			230,
			234,
			218,
			230,
			234,
			218,
			230,
			234,
			40,
			233,
			235,
			216,
			233,
			235,
			216,
			233,
			235,
			216,
			40,
			235,
			226,
			216,
			235,
			226,
			216,
			235,
			226,
			216,
			40,
			233,
			216,
			218,
			233,
			216,
			218,
			233,
			216,
			218,
			40,
			230,
			218,
			228,
			230,
			218,
			228,
			230,
			218,
			228,
			40,
			232,
			236,
			233,
			232,
			236,
			233,
			232,
			236,
			233,
			40,
			236,
			235,
			233,
			236,
			235,
			233,
			236,
			235,
			233,
			40,
			228,
			229,
			223,
			228,
			229,
			223,
			228,
			229,
			223,
			40,
			229,
			224,
			223,
			229,
			224,
			223,
			229,
			224,
			223,
			40,
			235,
			63,
			226,
			235,
			63,
			226,
			235,
			63,
			226,
			40,
			63,
			64,
			226,
			63,
			64,
			226,
			63,
			64,
			226,
			40,
			236,
			65,
			235,
			236,
			65,
			235,
			236,
			65,
			235,
			40,
			65,
			63,
			235,
			65,
			63,
			235,
			65,
			63,
			235,
			40,
			224,
			212,
			215,
			224,
			212,
			215,
			224,
			212,
			215,
			40,
			212,
			224,
			229,
			212,
			224,
			229,
			212,
			224,
			229,
			40,
			219,
			212,
			229,
			219,
			212,
			229,
			219,
			212,
			229,
			40,
			212,
			219,
			206,
			212,
			219,
			206,
			212,
			219,
			206,
			40,
			217,
			206,
			219,
			217,
			206,
			219,
			217,
			206,
			219,
			40,
			206,
			217,
			205,
			206,
			217,
			205,
			206,
			217,
			205,
			40,
			205,
			237,
			209,
			205,
			237,
			209,
			205,
			237,
			209,
			40,
			237,
			205,
			217,
			237,
			205,
			217,
			237,
			205,
			217,
			40,
			238,
			237,
			227,
			238,
			237,
			227,
			238,
			237,
			227,
			40,
			227,
			237,
			217,
			227,
			237,
			217,
			227,
			237,
			217,
			40,
			64,
			239,
			226,
			64,
			239,
			226,
			64,
			239,
			226,
			40,
			64,
			69,
			239,
			64,
			69,
			239,
			64,
			69,
			239,
			40,
			240,
			209,
			237,
			240,
			209,
			237,
			240,
			209,
			237,
			40,
			209,
			240,
			241,
			209,
			240,
			241,
			209,
			240,
			241,
			40,
			238,
			240,
			237,
			238,
			240,
			237,
			238,
			240,
			237,
			40,
			240,
			238,
			196,
			240,
			238,
			196,
			240,
			238,
			196,
			40,
			20,
			238,
			72,
			20,
			238,
			72,
			20,
			238,
			72,
			40,
			238,
			20,
			196,
			238,
			20,
			196,
			238,
			20,
			196,
			40,
			241,
			207,
			209,
			241,
			207,
			209,
			241,
			207,
			209,
			40,
			207,
			241,
			200,
			207,
			241,
			200,
			207,
			241,
			200,
			40,
			200,
			208,
			207,
			200,
			208,
			207,
			200,
			208,
			207,
			40,
			208,
			200,
			199,
			208,
			200,
			199,
			208,
			200,
			199,
			40,
			240,
			194,
			191,
			240,
			194,
			191,
			240,
			194,
			191,
			40,
			194,
			240,
			196,
			194,
			240,
			196,
			194,
			240,
			196,
			40,
			242,
			241,
			240,
			242,
			241,
			240,
			242,
			241,
			240,
			40,
			74,
			47,
			243,
			74,
			47,
			243,
			74,
			47,
			243,
			40,
			47,
			221,
			243,
			47,
			221,
			243,
			47,
			221,
			243,
			40,
			69,
			72,
			239,
			69,
			72,
			239,
			69,
			72,
			239,
			40,
			244,
			213,
			245,
			244,
			213,
			245,
			244,
			213,
			245,
			40,
			213,
			244,
			214,
			213,
			244,
			214,
			213,
			244,
			214,
			40,
			245,
			246,
			247,
			245,
			246,
			247,
			245,
			246,
			247,
			40,
			246,
			245,
			213,
			246,
			245,
			213,
			246,
			245,
			213,
			40,
			248,
			246,
			249,
			248,
			246,
			249,
			248,
			246,
			249,
			40,
			246,
			248,
			247,
			246,
			248,
			247,
			246,
			248,
			247,
			40,
			250,
			251,
			252,
			250,
			251,
			252,
			250,
			251,
			252,
			40,
			251,
			250,
			253,
			251,
			250,
			253,
			251,
			250,
			253,
			40,
			254,
			253,
			250,
			254,
			253,
			250,
			254,
			253,
			250,
			40,
			253,
			254,
			255,
			253,
			254,
			255,
			253,
			254,
			255,
			40,
			256,
			257,
			258,
			256,
			257,
			258,
			256,
			257,
			258,
			40,
			257,
			256,
			259,
			257,
			256,
			259,
			257,
			256,
			259,
			40,
			249,
			260,
			248,
			249,
			260,
			248,
			249,
			260,
			248,
			40,
			261,
			252,
			251,
			261,
			252,
			251,
			261,
			252,
			251,
			40,
			252,
			261,
			262,
			252,
			261,
			262,
			252,
			261,
			262,
			40,
			261,
			263,
			262,
			261,
			263,
			262,
			261,
			263,
			262,
			40,
			263,
			261,
			264,
			263,
			261,
			264,
			263,
			261,
			264,
			40,
			221,
			222,
			215,
			221,
			222,
			215,
			221,
			222,
			215,
			40,
			191,
			192,
			242,
			191,
			192,
			242,
			191,
			192,
			242,
			40,
			240,
			191,
			242,
			240,
			191,
			242,
			240,
			191,
			242,
			40,
			226,
			239,
			227,
			226,
			239,
			227,
			226,
			239,
			227,
			40,
			214,
			265,
			243,
			214,
			265,
			243,
			214,
			265,
			243,
			40,
			265,
			214,
			244,
			265,
			214,
			244,
			265,
			214,
			244,
			40,
			266,
			267,
			268,
			266,
			267,
			268,
			266,
			267,
			268,
			40,
			267,
			266,
			269,
			267,
			266,
			269,
			267,
			266,
			269,
			40,
			270,
			271,
			272,
			270,
			271,
			272,
			270,
			271,
			272,
			40,
			271,
			270,
			273,
			271,
			270,
			273,
			271,
			270,
			273,
			40,
			274,
			270,
			272,
			274,
			270,
			272,
			274,
			270,
			272,
			40,
			270,
			274,
			275,
			270,
			274,
			275,
			270,
			274,
			275,
			40,
			276,
			277,
			278,
			276,
			277,
			278,
			276,
			277,
			278,
			40,
			277,
			276,
			279,
			277,
			276,
			279,
			277,
			276,
			279,
			40,
			279,
			280,
			277,
			279,
			280,
			277,
			279,
			280,
			277,
			40,
			280,
			279,
			281,
			280,
			279,
			281,
			280,
			279,
			281,
			40,
			261,
			251,
			282,
			261,
			251,
			282,
			261,
			251,
			282,
			40,
			283,
			269,
			266,
			283,
			269,
			266,
			283,
			269,
			266,
			40,
			269,
			283,
			284,
			269,
			283,
			284,
			269,
			283,
			284,
			40,
			272,
			285,
			286,
			272,
			285,
			286,
			272,
			285,
			286,
			40,
			285,
			272,
			271,
			285,
			272,
			271,
			285,
			272,
			271,
			40,
			287,
			272,
			286,
			287,
			272,
			286,
			287,
			272,
			286,
			40,
			272,
			287,
			274,
			272,
			287,
			274,
			272,
			287,
			274,
			40,
			288,
			276,
			289,
			288,
			276,
			289,
			288,
			276,
			289,
			40,
			276,
			288,
			279,
			276,
			288,
			279,
			276,
			288,
			279,
			40,
			283,
			290,
			284,
			283,
			290,
			284,
			283,
			290,
			284,
			40,
			291,
			292,
			293,
			291,
			292,
			293,
			291,
			292,
			293,
			40,
			292,
			294,
			293,
			292,
			294,
			293,
			292,
			294,
			293,
			40,
			295,
			296,
			297,
			295,
			296,
			297,
			295,
			296,
			297,
			40,
			296,
			298,
			297,
			296,
			298,
			297,
			296,
			298,
			297,
			40,
			269,
			273,
			267,
			269,
			273,
			267,
			269,
			273,
			267,
			40,
			273,
			269,
			271,
			273,
			269,
			271,
			273,
			269,
			271,
			40,
			284,
			271,
			269,
			284,
			271,
			269,
			284,
			271,
			269,
			40,
			271,
			284,
			285,
			271,
			284,
			285,
			271,
			284,
			285,
			40,
			278,
			274,
			276,
			278,
			274,
			276,
			278,
			274,
			276,
			40,
			274,
			278,
			275,
			274,
			278,
			275,
			274,
			278,
			275,
			40,
			276,
			287,
			289,
			276,
			287,
			289,
			276,
			287,
			289,
			40,
			287,
			276,
			274,
			287,
			276,
			274,
			287,
			276,
			274,
			40,
			293,
			294,
			266,
			293,
			294,
			266,
			293,
			294,
			266,
			40,
			294,
			283,
			266,
			294,
			283,
			266,
			294,
			283,
			266,
			40,
			291,
			293,
			296,
			291,
			293,
			296,
			291,
			293,
			296,
			40,
			293,
			298,
			296,
			293,
			298,
			296,
			293,
			298,
			296,
			40,
			267,
			299,
			268,
			267,
			299,
			268,
			267,
			299,
			268,
			40,
			299,
			267,
			300,
			299,
			267,
			300,
			299,
			267,
			300,
			40,
			270,
			188,
			273,
			270,
			188,
			273,
			270,
			188,
			273,
			40,
			188,
			270,
			198,
			188,
			270,
			198,
			188,
			270,
			198,
			40,
			275,
			198,
			270,
			275,
			198,
			270,
			275,
			198,
			270,
			40,
			198,
			275,
			301,
			198,
			275,
			301,
			198,
			275,
			301,
			40,
			277,
			302,
			278,
			277,
			302,
			278,
			277,
			302,
			278,
			40,
			302,
			277,
			303,
			302,
			277,
			303,
			302,
			277,
			303,
			40,
			280,
			303,
			277,
			280,
			303,
			277,
			280,
			303,
			277,
			40,
			303,
			280,
			304,
			303,
			280,
			304,
			303,
			280,
			304,
			40,
			293,
			266,
			298,
			293,
			266,
			298,
			293,
			266,
			298,
			40,
			266,
			268,
			298,
			266,
			268,
			298,
			266,
			268,
			298,
			40,
			295,
			305,
			306,
			295,
			305,
			306,
			295,
			305,
			306,
			40,
			305,
			282,
			306,
			305,
			282,
			306,
			305,
			282,
			306,
			40,
			273,
			300,
			267,
			273,
			300,
			267,
			273,
			300,
			267,
			40,
			300,
			273,
			188,
			300,
			273,
			188,
			300,
			273,
			188,
			40,
			278,
			301,
			275,
			278,
			301,
			275,
			278,
			301,
			275,
			40,
			301,
			278,
			302,
			301,
			278,
			302,
			301,
			278,
			302,
			40,
			307,
			188,
			186,
			307,
			188,
			186,
			307,
			188,
			186,
			40,
			188,
			307,
			300,
			188,
			307,
			300,
			188,
			307,
			300,
			40,
			308,
			300,
			307,
			308,
			300,
			307,
			308,
			300,
			307,
			40,
			300,
			308,
			299,
			300,
			308,
			299,
			300,
			308,
			299,
			40,
			306,
			282,
			304,
			306,
			282,
			304,
			306,
			282,
			304,
			40,
			282,
			309,
			304,
			282,
			309,
			304,
			282,
			309,
			304,
			40,
			309,
			282,
			251,
			309,
			282,
			251,
			309,
			282,
			251,
			40,
			142,
			186,
			5,
			142,
			186,
			5,
			142,
			186,
			5,
			40,
			186,
			142,
			307,
			186,
			142,
			307,
			186,
			142,
			307,
			40,
			143,
			307,
			142,
			143,
			307,
			142,
			143,
			307,
			142,
			40,
			307,
			143,
			308,
			307,
			143,
			308,
			307,
			143,
			308,
			40,
			310,
			311,
			312,
			310,
			311,
			312,
			310,
			311,
			312,
			40,
			311,
			310,
			313,
			311,
			310,
			313,
			311,
			310,
			313,
			40,
			282,
			312,
			261,
			282,
			312,
			261,
			282,
			312,
			261,
			40,
			312,
			282,
			310,
			312,
			282,
			310,
			312,
			282,
			310,
			40,
			313,
			148,
			311,
			313,
			148,
			311,
			313,
			148,
			311,
			40,
			148,
			313,
			149,
			148,
			313,
			149,
			148,
			313,
			149,
			40,
			314,
			312,
			311,
			314,
			312,
			311,
			314,
			312,
			311,
			40,
			312,
			314,
			315,
			312,
			314,
			315,
			312,
			314,
			315,
			40,
			315,
			261,
			312,
			315,
			261,
			312,
			315,
			261,
			312,
			40,
			261,
			315,
			264,
			261,
			315,
			264,
			261,
			315,
			264,
			40,
			148,
			314,
			311,
			148,
			314,
			311,
			148,
			314,
			311,
			40,
			314,
			148,
			152,
			314,
			148,
			152,
			314,
			148,
			152,
			40,
			316,
			315,
			317,
			316,
			315,
			317,
			316,
			315,
			317,
			40,
			264,
			315,
			316,
			264,
			315,
			316,
			264,
			315,
			316,
			40,
			155,
			314,
			152,
			155,
			314,
			152,
			155,
			314,
			152,
			40,
			314,
			155,
			318,
			314,
			155,
			318,
			314,
			155,
			318,
			40,
			304,
			319,
			303,
			304,
			319,
			303,
			304,
			319,
			303,
			40,
			319,
			304,
			309,
			319,
			304,
			309,
			319,
			304,
			309,
			40,
			320,
			303,
			319,
			320,
			303,
			319,
			320,
			303,
			319,
			40,
			303,
			320,
			302,
			303,
			320,
			302,
			303,
			320,
			302,
			40,
			321,
			302,
			320,
			321,
			302,
			320,
			321,
			302,
			320,
			40,
			302,
			321,
			301,
			302,
			321,
			301,
			302,
			321,
			301,
			40,
			199,
			301,
			321,
			199,
			301,
			321,
			199,
			301,
			321,
			40,
			301,
			199,
			198,
			301,
			199,
			198,
			301,
			199,
			198,
			40,
			321,
			208,
			199,
			321,
			208,
			199,
			321,
			208,
			199,
			40,
			208,
			321,
			322,
			208,
			321,
			322,
			208,
			321,
			322,
			40,
			323,
			202,
			204,
			323,
			202,
			204,
			323,
			202,
			204,
			40,
			202,
			323,
			324,
			202,
			323,
			324,
			202,
			323,
			324,
			40,
			322,
			204,
			208,
			322,
			204,
			208,
			322,
			204,
			208,
			40,
			204,
			322,
			323,
			204,
			322,
			323,
			204,
			322,
			323,
			40,
			324,
			210,
			202,
			324,
			210,
			202,
			324,
			210,
			202,
			40,
			210,
			324,
			325,
			210,
			324,
			325,
			210,
			324,
			325,
			40,
			210,
			246,
			213,
			210,
			246,
			213,
			210,
			246,
			213,
			40,
			246,
			210,
			325,
			246,
			210,
			325,
			246,
			210,
			325,
			40,
			320,
			322,
			321,
			320,
			322,
			321,
			320,
			322,
			321,
			40,
			322,
			320,
			326,
			322,
			320,
			326,
			322,
			320,
			326,
			40,
			327,
			324,
			323,
			327,
			324,
			323,
			327,
			324,
			323,
			40,
			324,
			327,
			328,
			324,
			327,
			328,
			324,
			327,
			328,
			40,
			326,
			323,
			322,
			326,
			323,
			322,
			326,
			323,
			322,
			40,
			323,
			326,
			327,
			323,
			326,
			327,
			323,
			326,
			327,
			40,
			328,
			325,
			324,
			328,
			325,
			324,
			328,
			325,
			324,
			40,
			325,
			328,
			329,
			325,
			328,
			329,
			325,
			328,
			329,
			40,
			325,
			249,
			246,
			325,
			249,
			246,
			325,
			249,
			246,
			40,
			249,
			325,
			329,
			249,
			325,
			329,
			249,
			325,
			329,
			40,
			319,
			326,
			320,
			319,
			326,
			320,
			319,
			326,
			320,
			40,
			326,
			319,
			253,
			326,
			319,
			253,
			326,
			319,
			253,
			40,
			255,
			328,
			327,
			255,
			328,
			327,
			255,
			328,
			327,
			40,
			328,
			255,
			256,
			328,
			255,
			256,
			328,
			255,
			256,
			40,
			253,
			327,
			326,
			253,
			327,
			326,
			253,
			327,
			326,
			40,
			327,
			253,
			255,
			327,
			253,
			255,
			327,
			253,
			255,
			40,
			256,
			329,
			328,
			256,
			329,
			328,
			256,
			329,
			328,
			40,
			329,
			256,
			258,
			329,
			256,
			258,
			329,
			256,
			258,
			40,
			329,
			260,
			249,
			329,
			260,
			249,
			329,
			260,
			249,
			40,
			260,
			329,
			258,
			260,
			329,
			258,
			260,
			329,
			258,
			40,
			309,
			253,
			319,
			309,
			253,
			319,
			309,
			253,
			319,
			40,
			253,
			309,
			251,
			253,
			309,
			251,
			253,
			309,
			251,
			40,
			281,
			288,
			330,
			281,
			288,
			330,
			281,
			288,
			330,
			40,
			288,
			281,
			279,
			288,
			281,
			279,
			288,
			281,
			279,
			40,
			331,
			332,
			189,
			331,
			332,
			189,
			331,
			332,
			189,
			40,
			255,
			259,
			256,
			255,
			259,
			256,
			255,
			259,
			256,
			40,
			259,
			255,
			254,
			259,
			255,
			254,
			259,
			255,
			254,
			40,
			314,
			317,
			315,
			314,
			317,
			315,
			314,
			317,
			315,
			40,
			317,
			314,
			318,
			317,
			314,
			318,
			317,
			314,
			318,
			40,
			264,
			316,
			263,
			264,
			316,
			263,
			264,
			316,
			263,
			40,
			225,
			333,
			223,
			225,
			333,
			223,
			225,
			333,
			223,
			40,
			214,
			221,
			215,
			214,
			221,
			215,
			214,
			221,
			215,
			40,
			221,
			214,
			243,
			221,
			214,
			243,
			221,
			214,
			243,
			40,
			238,
			227,
			239,
			238,
			227,
			239,
			238,
			227,
			239,
			40,
			239,
			72,
			238,
			239,
			72,
			238,
			239,
			72,
			238,
			40,
			290,
			285,
			284,
			290,
			285,
			284,
			290,
			285,
			284,
			40,
			313,
			143,
			149,
			313,
			143,
			149,
			313,
			143,
			149,
			40,
			143,
			313,
			308,
			143,
			313,
			308,
			143,
			313,
			308,
			40,
			313,
			334,
			308,
			313,
			334,
			308,
			313,
			334,
			308,
			40,
			299,
			308,
			297,
			299,
			308,
			297,
			299,
			308,
			297,
			40,
			308,
			334,
			297,
			308,
			334,
			297,
			308,
			334,
			297,
			40,
			297,
			298,
			299,
			297,
			298,
			299,
			297,
			298,
			299,
			40,
			298,
			268,
			299,
			298,
			268,
			299,
			298,
			268,
			299,
			40,
			304,
			280,
			306,
			304,
			280,
			306,
			304,
			280,
			306,
			40,
			280,
			335,
			306,
			280,
			335,
			306,
			280,
			335,
			306,
			40,
			335,
			280,
			336,
			335,
			280,
			336,
			335,
			280,
			336,
			40,
			280,
			281,
			336,
			280,
			281,
			336,
			280,
			281,
			336,
			40,
			337,
			336,
			330,
			337,
			336,
			330,
			337,
			336,
			330,
			40,
			336,
			281,
			330,
			336,
			281,
			330,
			336,
			281,
			330,
			40,
			306,
			335,
			295,
			306,
			335,
			295,
			306,
			335,
			295,
			40,
			335,
			296,
			295,
			335,
			296,
			295,
			335,
			296,
			295,
			40,
			296,
			335,
			291,
			296,
			335,
			291,
			296,
			335,
			291,
			40,
			335,
			336,
			291,
			335,
			336,
			291,
			335,
			336,
			291,
			40,
			292,
			291,
			337,
			292,
			291,
			337,
			292,
			291,
			337,
			40,
			291,
			336,
			337,
			291,
			336,
			337,
			291,
			336,
			337,
			40,
			313,
			310,
			334,
			313,
			310,
			334,
			313,
			310,
			334,
			40,
			305,
			310,
			282,
			305,
			310,
			282,
			305,
			310,
			282,
			40,
			305,
			334,
			310,
			305,
			334,
			310,
			305,
			334,
			310,
			40,
			297,
			334,
			295,
			297,
			334,
			295,
			297,
			334,
			295,
			40,
			334,
			305,
			295,
			334,
			305,
			295,
			334,
			305,
			295,
			40,
			215,
			222,
			224,
			215,
			222,
			224,
			215,
			222,
			224,
			40,
			258,
			257,
			260,
			258,
			257,
			260,
			258,
			257,
			260,
			40,
			231,
			223,
			338,
			231,
			223,
			338,
			231,
			223,
			338,
			40,
			223,
			333,
			338,
			223,
			333,
			338,
			223,
			333,
			338,
			40,
			177,
			74,
			265,
			177,
			74,
			265,
			177,
			74,
			265,
			40,
			74,
			243,
			265,
			74,
			243,
			265,
			74,
			243,
			265,
			40,
			332,
			185,
			184,
			332,
			185,
			184,
			332,
			185,
			184,
			40,
			185,
			332,
			192,
			185,
			332,
			192,
			185,
			332,
			192,
			40,
			187,
			332,
			184,
			187,
			332,
			184,
			187,
			332,
			184,
			40,
			332,
			187,
			189,
			332,
			187,
			189,
			332,
			187,
			189,
			40,
			189,
			197,
			331,
			189,
			197,
			331,
			189,
			197,
			331,
			40,
			200,
			331,
			197,
			200,
			331,
			197,
			200,
			331,
			197,
			40,
			331,
			200,
			241,
			331,
			200,
			241,
			331,
			200,
			241,
			40,
			339,
			225,
			220,
			339,
			225,
			220,
			339,
			225,
			220,
			40,
			225,
			222,
			220,
			225,
			222,
			220,
			225,
			222,
			220,
			40,
			340,
			333,
			339,
			340,
			333,
			339,
			340,
			333,
			339,
			40,
			333,
			225,
			339,
			333,
			225,
			339,
			333,
			225,
			339,
			40,
			339,
			220,
			180,
			339,
			220,
			180,
			339,
			220,
			180,
			40,
			220,
			45,
			180,
			220,
			45,
			180,
			220,
			45,
			180,
			40,
			180,
			181,
			339,
			180,
			181,
			339,
			180,
			181,
			339,
			40,
			181,
			340,
			339,
			181,
			340,
			339,
			181,
			340,
			339,
			40,
			181,
			182,
			340,
			181,
			182,
			340,
			181,
			182,
			340,
			40,
			182,
			341,
			340,
			182,
			341,
			340,
			182,
			341,
			340,
			40,
			241,
			242,
			331,
			241,
			242,
			331,
			241,
			242,
			331,
			40,
			192,
			331,
			242,
			192,
			331,
			242,
			192,
			331,
			242,
			40,
			331,
			192,
			332,
			331,
			192,
			332,
			331,
			192,
			332,
			40,
			340,
			341,
			333,
			340,
			341,
			333,
			340,
			341,
			333,
			40,
			341,
			338,
			333,
			341,
			338,
			333,
			341,
			338,
			333
		],
		"vertices": [
			0.038152,
			-0.063653,
			0.023119,
			0,
			-0.059517,
			0.039227,
			0,
			-0.103534,
			0.069954,
			0.038493,
			-0.104621,
			0.052808,
			0.036195,
			0.081635,
			-0.052848,
			0,
			0.088374,
			-0.040325,
			0,
			0,
			0,
			0.042429,
			-0.008568,
			-0.0141,
			0.074965,
			0.045805,
			-0.096762,
			0.076827,
			-0.041401,
			-0.071837,
			0,
			-0.153536,
			0.071614,
			0.038533,
			-0.14896,
			0.056111,
			0.091498,
			-0.151409,
			-0.011075,
			0.092976,
			-0.119867,
			-0.021141,
			0,
			-0.184766,
			0.047131,
			0.033863,
			-0.1775,
			0.034778,
			0.080272,
			-0.171101,
			-0.007969,
			0.014672,
			-0.19026,
			0.009363,
			0,
			-0.195266,
			0.010965,
			0.030795,
			-0.200985,
			-0.023699,
			0,
			-0.208472,
			-0.01697,
			0.121243,
			-0.054658,
			-0.100737,
			0.183153,
			-0.01051,
			-0.129515,
			0.234283,
			-0.085533,
			-0.138323,
			0.176093,
			-0.132913,
			-0.113097,
			0.221874,
			-0.230809,
			-0.144174,
			0.241987,
			-0.279391,
			-0.157915,
			0.306483,
			-0.240744,
			-0.22545,
			0.290564,
			-0.191496,
			-0.196317,
			0.172963,
			-0.257925,
			-0.113391,
			0.193472,
			-0.303309,
			-0.119153,
			0.268343,
			-0.139532,
			-0.163265,
			0.200158,
			-0.18028,
			-0.128637,
			0.153183,
			-0.207138,
			-0.106757,
			0.316047,
			-0.286909,
			-0.248207,
			0.256453,
			-0.324421,
			-0.170077,
			0.206227,
			-0.339919,
			-0.126553,
			0.320751,
			-0.358534,
			-0.27881,
			0.238439,
			-0.412053,
			-0.167834,
			0.194203,
			-0.398041,
			-0.122565,
			0.1389,
			-0.319522,
			-0.073007,
			0.149351,
			-0.339445,
			-0.104638,
			0.144112,
			-0.294698,
			-0.079721,
			0.167479,
			-0.324306,
			-0.103252,
			0.077238,
			-0.429326,
			-0.06353,
			0,
			-0.440253,
			-0.035507,
			0.095841,
			-0.470373,
			-0.075102,
			0,
			-0.475131,
			-0.049614,
			0.126596,
			-0.408323,
			-0.084668,
			0.147383,
			-0.353823,
			-0.114221,
			0.115996,
			-0.384963,
			-0.081272,
			0.167924,
			-0.375573,
			-0.111517,
			0.075563,
			-0.304321,
			-0.021487,
			0.089321,
			-0.289214,
			-0.036301,
			0.165999,
			-0.347759,
			-0.116507,
			0.181297,
			-0.344482,
			-0.117068,
			0.15415,
			-0.345961,
			-0.118449,
			0.141856,
			-0.352417,
			-0.12046,
			0.121892,
			-0.336462,
			-0.092747,
			0.14114,
			-0.341957,
			-0.113448,
			0.132517,
			-0.328741,
			-0.079014,
			0.0726,
			-0.32102,
			-0.028674,
			0.066498,
			-0.330196,
			-0.049199,
			0,
			-0.321081,
			-0.008766,
			0,
			-0.306744,
			-0.005393,
			0,
			-0.329258,
			-0.030311,
			0.12501,
			-0.219718,
			-0.086196,
			0.055363,
			-0.234699,
			-0.037596,
			0.040271,
			-0.281992,
			-0.020561,
			0,
			-0.288915,
			-0.013667,
			0.107404,
			-0.175854,
			-0.0861,
			0.134935,
			-0.163211,
			-0.102034,
			0,
			-0.242487,
			-0.027512,
			0.118593,
			-0.151122,
			-0.086707,
			0,
			-0.52733,
			-0.039309,
			0.113613,
			-0.519425,
			-0.077045,
			0.229002,
			-0.510218,
			-0.208261,
			0.318452,
			-0.428674,
			-0.312063,
			0.350139,
			-0.383595,
			-0.367148,
			0.345195,
			-0.320538,
			-0.332002,
			0.382181,
			-0.311069,
			-0.446371,
			0.374865,
			-0.262788,
			-0.402268,
			0.4374,
			0.136356,
			-0.579237,
			0.429268,
			0.230814,
			-0.572498,
			0.396799,
			0.238236,
			-0.364573,
			0.416582,
			0.045594,
			-0.399157,
			0.438263,
			0.053781,
			-0.580183,
			0.41459,
			-0.027461,
			-0.427616,
			0.409743,
			-0.081674,
			-0.455694,
			0.408718,
			-0.12543,
			-0.47894,
			0.428942,
			-0.089156,
			-0.558807,
			0.436235,
			-0.014008,
			-0.572424,
			0.410397,
			-0.186291,
			-0.529966,
			0.356352,
			0.3587,
			-0.36533,
			0.41256,
			0.345047,
			-0.549472,
			0.390805,
			0.446999,
			-0.515934,
			0.325277,
			0.475826,
			-0.388484,
			0.118192,
			-0.589743,
			-0.105229,
			0.138419,
			0.136589,
			-0.156835,
			0.122035,
			0.145683,
			-0.128418,
			0.089221,
			0.110177,
			-0.142426,
			0.110219,
			0.10748,
			-0.159984,
			0.189081,
			0.040545,
			-0.145002,
			0.186106,
			0.067243,
			-0.151745,
			0.136326,
			0.088892,
			-0.157315,
			0.120067,
			0.069882,
			-0.143441,
			0.232322,
			0.061815,
			-0.160961,
			0.238084,
			0.035599,
			-0.162214,
			0.284292,
			0.077634,
			-0.190588,
			0.294716,
			0.056692,
			-0.197803,
			0.33674,
			0.102368,
			-0.243338,
			0.321543,
			0.110253,
			-0.231047,
			0.331825,
			0.142094,
			-0.200533,
			0.318381,
			0.134581,
			-0.204874,
			0.309939,
			0.263023,
			-0.150639,
			0.151382,
			0.127287,
			-0.162529,
			0.128763,
			0.108124,
			-0.167775,
			0.185716,
			0.092715,
			-0.156667,
			0.15112,
			0.106789,
			-0.165163,
			0.2297,
			0.086897,
			-0.161883,
			0.309714,
			0.116233,
			-0.22245,
			0.279699,
			0.095986,
			-0.18889,
			0.142249,
			0.113507,
			-0.175351,
			0.233523,
			0.170065,
			-0.155951,
			0.182252,
			0.159993,
			-0.156366,
			0.232182,
			0.156804,
			-0.1574,
			0.183143,
			0.147974,
			-0.159898,
			0.252282,
			0.216997,
			-0.104641,
			0.185157,
			0.201684,
			-0.088473,
			0.239806,
			0.174021,
			-0.134133,
			0.181263,
			0.164348,
			-0.131359,
			0.108741,
			0.172508,
			-0.080994,
			0.065585,
			0.119462,
			-0.100974,
			0.253825,
			-0.003445,
			-0.154543,
			0.318923,
			0.027415,
			-0.206963,
			0.362239,
			0.086195,
			-0.259092,
			0.352279,
			0.17682,
			-0.19306,
			0.304534,
			0.203156,
			-0.141132,
			0.253892,
			0.288032,
			-0.101722,
			0.034089,
			0.128873,
			-0.062444,
			0.072843,
			0.239325,
			-0.047672,
			0.37007,
			0.212799,
			-0.248551,
			0,
			0.13125,
			-0.051931,
			0,
			0.243711,
			-0.043212,
			0.251058,
			0.335162,
			-0.119951,
			0.253284,
			0.397936,
			-0.163006,
			0.12,
			0.417536,
			-0.103944,
			0.118887,
			0.335748,
			-0.067855,
			0,
			0.419184,
			-0.091933,
			0,
			0.332601,
			-0.06122,
			0.123493,
			0.527591,
			-0.188838,
			0.244879,
			0.511883,
			-0.250066,
			0,
			0.53588,
			-0.173559,
			0.328603,
			0.551081,
			-0.438663,
			0.238096,
			0.605111,
			-0.367836,
			0,
			0.636507,
			-0.295534,
			0.119531,
			0.629772,
			-0.317195,
			0.388782,
			0.058426,
			-0.287901,
			0.349565,
			-0.02266,
			-0.220536,
			0.284991,
			-0.064413,
			-0.162758,
			0.308989,
			-0.116614,
			-0.191262,
			0.324462,
			-0.168301,
			-0.230756,
			0.333789,
			-0.214756,
			-0.265984,
			0.338473,
			-0.256922,
			-0.295368,
			0.363227,
			-0.069628,
			-0.251188,
			0.367015,
			-0.12133,
			-0.293244,
			0.370468,
			-0.165309,
			-0.33172,
			0.371912,
			-0.204505,
			-0.363676,
			0.305157,
			0.125845,
			-0.201761,
			0.124979,
			-0.127185,
			-0.096468,
			0.087979,
			-0.090294,
			-0.036241,
			0.11101,
			-0.373207,
			-0.086188,
			0.179534,
			0.277732,
			-0.07489,
			0.290459,
			0.161487,
			-0.167135,
			0.279843,
			0.15831,
			-0.179454,
			0.277173,
			0.145921,
			-0.180998,
			0.106631,
			-0.366109,
			-0.094343,
			0,
			-0.605289,
			-0.070169,
			0.071127,
			-0.408695,
			-0.050584,
			0.067721,
			-0.389327,
			-0.055536,
			0,
			-0.415177,
			-0.022688,
			0,
			-0.391953,
			-0.027089,
			0,
			-0.382922,
			-0.038809,
			0.066305,
			-0.381269,
			-0.067569,
			-0.038152,
			-0.063653,
			0.023119,
			-0.038493,
			-0.104621,
			0.052808,
			-0.036195,
			0.081635,
			-0.052848,
			-0.042429,
			-0.008568,
			-0.0141,
			-0.074965,
			0.045805,
			-0.096762,
			-0.076827,
			-0.041401,
			-0.071837,
			-0.038533,
			-0.14896,
			0.056111,
			-0.091498,
			-0.151409,
			-0.011075,
			-0.092976,
			-0.119867,
			-0.021141,
			-0.033863,
			-0.1775,
			0.034778,
			-0.080272,
			-0.171101,
			-0.007969,
			-0.014672,
			-0.19026,
			0.009363,
			-0.030795,
			-0.200985,
			-0.023699,
			-0.121243,
			-0.054658,
			-0.100737,
			-0.183153,
			-0.01051,
			-0.129515,
			-0.234283,
			-0.085533,
			-0.138323,
			-0.176093,
			-0.132913,
			-0.113097,
			-0.221874,
			-0.230809,
			-0.144174,
			-0.306483,
			-0.240744,
			-0.22545,
			-0.241987,
			-0.279391,
			-0.157915,
			-0.290564,
			-0.191496,
			-0.196317,
			-0.172963,
			-0.257925,
			-0.113391,
			-0.193472,
			-0.303309,
			-0.119153,
			-0.200158,
			-0.18028,
			-0.128637,
			-0.268343,
			-0.139532,
			-0.163265,
			-0.153183,
			-0.207138,
			-0.106757,
			-0.316047,
			-0.286909,
			-0.248207,
			-0.256453,
			-0.324421,
			-0.170077,
			-0.206227,
			-0.339919,
			-0.126553,
			-0.320751,
			-0.358534,
			-0.27881,
			-0.238439,
			-0.412053,
			-0.167834,
			-0.194203,
			-0.398041,
			-0.122565,
			-0.1389,
			-0.319522,
			-0.073007,
			-0.144112,
			-0.294698,
			-0.079721,
			-0.149351,
			-0.339445,
			-0.104638,
			-0.167479,
			-0.324306,
			-0.103252,
			-0.077238,
			-0.429326,
			-0.06353,
			-0.095841,
			-0.470373,
			-0.075102,
			-0.126596,
			-0.408323,
			-0.084668,
			-0.147383,
			-0.353823,
			-0.114221,
			-0.167924,
			-0.375573,
			-0.111517,
			-0.115996,
			-0.384963,
			-0.081272,
			-0.075563,
			-0.304321,
			-0.021487,
			-0.089321,
			-0.289214,
			-0.036301,
			-0.165999,
			-0.347759,
			-0.116507,
			-0.181297,
			-0.344482,
			-0.117068,
			-0.15415,
			-0.345961,
			-0.118449,
			-0.141856,
			-0.352417,
			-0.12046,
			-0.121892,
			-0.336462,
			-0.092747,
			-0.132517,
			-0.328741,
			-0.079014,
			-0.14114,
			-0.341957,
			-0.113448,
			-0.0726,
			-0.32102,
			-0.028674,
			-0.066498,
			-0.330196,
			-0.049199,
			-0.12501,
			-0.219718,
			-0.086196,
			-0.055363,
			-0.234699,
			-0.037596,
			-0.040271,
			-0.281992,
			-0.020561,
			-0.107404,
			-0.175854,
			-0.0861,
			-0.134935,
			-0.163211,
			-0.102034,
			-0.118593,
			-0.151122,
			-0.086707,
			-0.113613,
			-0.519425,
			-0.077045,
			-0.229002,
			-0.510218,
			-0.208261,
			-0.318452,
			-0.428674,
			-0.312063,
			-0.345195,
			-0.320538,
			-0.332002,
			-0.350139,
			-0.383595,
			-0.367148,
			-0.382181,
			-0.311069,
			-0.446371,
			-0.374865,
			-0.262788,
			-0.402268,
			-0.4374,
			0.136356,
			-0.579237,
			-0.396799,
			0.238236,
			-0.364573,
			-0.429268,
			0.230814,
			-0.572498,
			-0.416582,
			0.045594,
			-0.399157,
			-0.438263,
			0.053781,
			-0.580183,
			-0.41459,
			-0.027461,
			-0.427616,
			-0.409743,
			-0.081674,
			-0.455694,
			-0.428942,
			-0.089156,
			-0.558807,
			-0.408718,
			-0.12543,
			-0.47894,
			-0.436235,
			-0.014008,
			-0.572424,
			-0.410397,
			-0.186291,
			-0.529966,
			-0.356352,
			0.3587,
			-0.36533,
			-0.41256,
			0.345047,
			-0.549472,
			-0.390805,
			0.446999,
			-0.515934,
			-0.325277,
			0.475826,
			-0.388484,
			-0.118192,
			-0.589743,
			-0.105229,
			-0.138419,
			0.136589,
			-0.156835,
			-0.089221,
			0.110177,
			-0.142426,
			-0.122035,
			0.145683,
			-0.128418,
			-0.110219,
			0.10748,
			-0.159984,
			-0.189081,
			0.040545,
			-0.145002,
			-0.136326,
			0.088892,
			-0.157315,
			-0.186106,
			0.067243,
			-0.151745,
			-0.120067,
			0.069882,
			-0.143441,
			-0.232322,
			0.061815,
			-0.160961,
			-0.238084,
			0.035599,
			-0.162214,
			-0.284292,
			0.077634,
			-0.190588,
			-0.33674,
			0.102368,
			-0.243338,
			-0.294716,
			0.056692,
			-0.197803,
			-0.321543,
			0.110253,
			-0.231047,
			-0.331825,
			0.142094,
			-0.200533,
			-0.318381,
			0.134581,
			-0.204874,
			-0.309939,
			0.263023,
			-0.150639,
			-0.151382,
			0.127287,
			-0.162529,
			-0.128763,
			0.108124,
			-0.167775,
			-0.15112,
			0.106789,
			-0.165163,
			-0.185716,
			0.092715,
			-0.156667,
			-0.2297,
			0.086897,
			-0.161883,
			-0.309714,
			0.116233,
			-0.22245,
			-0.279699,
			0.095986,
			-0.18889,
			-0.142249,
			0.113507,
			-0.175351,
			-0.233523,
			0.170065,
			-0.155951,
			-0.232182,
			0.156804,
			-0.1574,
			-0.182252,
			0.159993,
			-0.156366,
			-0.183143,
			0.147974,
			-0.159898,
			-0.252282,
			0.216997,
			-0.104641,
			-0.239806,
			0.174021,
			-0.134133,
			-0.185157,
			0.201684,
			-0.088473,
			-0.181263,
			0.164348,
			-0.131359,
			-0.108741,
			0.172508,
			-0.080994,
			-0.065585,
			0.119462,
			-0.100974,
			-0.253825,
			-0.003445,
			-0.154543,
			-0.318923,
			0.027415,
			-0.206963,
			-0.362239,
			0.086195,
			-0.259092,
			-0.352279,
			0.17682,
			-0.19306,
			-0.253892,
			0.288032,
			-0.101722,
			-0.304534,
			0.203156,
			-0.141132,
			-0.034089,
			0.128873,
			-0.062444,
			-0.072843,
			0.239325,
			-0.047672,
			-0.37007,
			0.212799,
			-0.248551,
			-0.251058,
			0.335162,
			-0.119951,
			-0.12,
			0.417536,
			-0.103944,
			-0.253284,
			0.397936,
			-0.163006,
			-0.118887,
			0.335748,
			-0.067855,
			-0.123493,
			0.527591,
			-0.188838,
			-0.244879,
			0.511883,
			-0.250066,
			-0.328603,
			0.551081,
			-0.438663,
			-0.238096,
			0.605111,
			-0.367836,
			-0.119531,
			0.629772,
			-0.317195,
			-0.388782,
			0.058426,
			-0.287901,
			-0.349565,
			-0.02266,
			-0.220536,
			-0.284991,
			-0.064413,
			-0.162758,
			-0.308989,
			-0.116614,
			-0.191262,
			-0.324462,
			-0.168301,
			-0.230756,
			-0.333789,
			-0.214756,
			-0.265984,
			-0.338473,
			-0.256922,
			-0.295368,
			-0.363227,
			-0.069628,
			-0.251188,
			-0.367015,
			-0.12133,
			-0.293244,
			-0.370468,
			-0.165309,
			-0.33172,
			-0.371912,
			-0.204505,
			-0.363676,
			-0.305157,
			0.125845,
			-0.201761,
			-0.124979,
			-0.127185,
			-0.096468,
			-0.087979,
			-0.090294,
			-0.036241,
			-0.11101,
			-0.373207,
			-0.086188,
			-0.179534,
			0.277732,
			-0.07489,
			-0.290459,
			0.161487,
			-0.167135,
			-0.279843,
			0.15831,
			-0.179454,
			-0.277173,
			0.145921,
			-0.180998,
			-0.106631,
			-0.366109,
			-0.094343,
			-0.071127,
			-0.408695,
			-0.050584,
			-0.067721,
			-0.389327,
			-0.055536,
			-0.066305,
			-0.381269,
			-0.067569
		],
		"metadata": {
			"type": "Geometry",
			"uvs": 1,
			"faces": 616,
			"vertices": 342,
			"normals": 342,
			"generator": "io_three",
			"version": 3
		},
		"normals": [
			0.599322,
			0.445174,
			0.665273,
			0,
			0.562334,
			0.826868,
			0,
			0.304147,
			0.952605,
			0.591968,
			0.284341,
			0.754112,
			0.614307,
			0.267067,
			0.742454,
			0,
			0.336619,
			0.941618,
			0,
			0.480361,
			0.877041,
			0.655019,
			0.372814,
			0.657216,
			0.681539,
			0.233375,
			0.693533,
			0.792444,
			0.276498,
			0.543596,
			0,
			-0.305185,
			0.952269,
			0.568834,
			-0.238197,
			0.787164,
			0.868679,
			-0.150212,
			0.471999,
			0.86758,
			0.219581,
			0.44612,
			0,
			-0.815241,
			0.579089,
			0.435194,
			-0.756951,
			0.487411,
			0.64922,
			-0.637135,
			0.415357,
			0.331217,
			-0.881497,
			0.336467,
			0,
			-0.931211,
			0.364422,
			0.431166,
			-0.561083,
			0.706565,
			0,
			-0.631611,
			0.775262,
			0.442976,
			0.119327,
			0.888516,
			0.345775,
			0.17127,
			0.922513,
			0.408429,
			0.004639,
			0.912748,
			0.370251,
			-0.02649,
			0.928526,
			0.580157,
			-0.004303,
			0.814478,
			0.668599,
			0.036378,
			0.742698,
			0.783868,
			-0.129124,
			0.607318,
			0.681661,
			-0.186254,
			0.707511,
			0.571215,
			0.135838,
			0.809442,
			0.593097,
			0.064455,
			0.802515,
			0.554491,
			-0.172033,
			0.814203,
			0.475509,
			-0.064455,
			0.877316,
			0.483688,
			0.084811,
			0.87109,
			0.860622,
			-0.120884,
			0.494644,
			0.749718,
			-0.05298,
			0.659627,
			0.573901,
			-0.043367,
			0.817743,
			0.886227,
			-0.180242,
			0.426679,
			0.755058,
			-0.210669,
			0.620838,
			0.578906,
			-0.155766,
			0.800348,
			0.703818,
			-0.312204,
			0.638081,
			0.145787,
			-0.779717,
			0.608905,
			0.662648,
			0.068392,
			0.745781,
			0.42909,
			-0.280892,
			0.858455,
			0.436537,
			-0.18424,
			0.880581,
			0,
			-0.383068,
			0.923704,
			0.394421,
			-0.016633,
			0.91876,
			0,
			-0.109165,
			0.994018,
			0.45912,
			-0.007965,
			0.888333,
			-0.035188,
			0.652058,
			0.757317,
			0.409772,
			0.275338,
			0.869625,
			0.359996,
			0.15418,
			0.920103,
			0.414045,
			0.003357,
			0.910245,
			0.521714,
			0.268258,
			0.809839,
			-0.020386,
			-0.037294,
			0.999084,
			0.306894,
			-0.177557,
			0.935026,
			-0.267739,
			-0.273507,
			0.923826,
			-0.252785,
			0.871426,
			0.420331,
			0.171117,
			-0.909452,
			0.378918,
			-0.06006,
			-0.926328,
			0.371868,
			0.313639,
			-0.804895,
			0.503677,
			0.290475,
			-0.695059,
			0.657643,
			0.143406,
			-0.918241,
			0.369091,
			0,
			-0.633503,
			0.773705,
			0,
			0.066012,
			0.997803,
			0,
			-0.93292,
			0.360027,
			0.548906,
			0.210517,
			0.808924,
			0.41081,
			0.158361,
			0.897855,
			0.203436,
			0.295389,
			0.933439,
			0,
			0.363659,
			0.931516,
			0.686422,
			-0.153172,
			0.710868,
			0.459731,
			-0.019074,
			0.887814,
			0,
			0.026337,
			0.999634,
			0.817591,
			-0.135197,
			0.559679,
			0,
			-0.094394,
			0.995514,
			0.480331,
			-0.11594,
			0.86935,
			0.787988,
			-0.295419,
			0.540117,
			0.870113,
			-0.222083,
			0.439924,
			0.926664,
			-0.124912,
			0.354472,
			0.935575,
			-0.113742,
			0.334269,
			0.959532,
			-0.090152,
			0.266701,
			0.95706,
			-0.106784,
			0.269387,
			0.988891,
			0.050386,
			0.139714,
			0.975402,
			0.118748,
			0.185675,
			0.953978,
			0.20661,
			0.2172,
			0.980865,
			-0.027039,
			0.192724,
			0.99176,
			-0.009857,
			0.127567,
			0.976165,
			-0.122257,
			0.179235,
			0.972991,
			-0.144505,
			0.179968,
			0.970244,
			-0.134953,
			0.200934,
			0.978027,
			-0.090609,
			0.187719,
			0.986633,
			-0.046419,
			0.156133,
			0.971191,
			-0.120792,
			0.205298,
			0.902585,
			0.287729,
			0.3202,
			0.954192,
			0.092807,
			0.284371,
			0.921323,
			0.191656,
			0.338206,
			0.868465,
			0.276345,
			0.411542,
			0.522141,
			-0.309458,
			0.794733,
			0.329905,
			-0.600879,
			0.72805,
			0.413739,
			-0.750816,
			0.514847,
			0.79165,
			-0.043641,
			0.609394,
			0.51033,
			-0.00882,
			0.85989,
			0.286294,
			0.277779,
			0.916959,
			0.076662,
			0.227058,
			0.970855,
			0.13715,
			0.434431,
			0.890164,
			0.421735,
			0.514145,
			0.746818,
			0.375469,
			0.073183,
			0.923917,
			0.392804,
			0.195227,
			0.898618,
			0.585406,
			0.049593,
			0.809198,
			0.575121,
			0.153111,
			0.803583,
			0.376965,
			-0.333598,
			0.86404,
			0.477401,
			-0.320719,
			0.818049,
			0.336558,
			-0.598193,
			0.727226,
			0.263741,
			-0.637257,
			0.724082,
			0.795068,
			0.228736,
			0.561693,
			0.243843,
			-0.427625,
			0.870418,
			0.313608,
			0.030427,
			0.949034,
			-0.035798,
			0.189062,
			0.981292,
			-0.026246,
			0.488388,
			0.872189,
			0.326273,
			0.087252,
			0.941221,
			0.5056,
			-0.340526,
			0.792688,
			0.598224,
			0.0759,
			0.797693,
			0.498581,
			-0.029908,
			0.866298,
			0.155065,
			-0.771233,
			0.617328,
			0.234016,
			-0.726341,
			0.646229,
			0.221046,
			-0.140477,
			0.965056,
			0.081637,
			-0.283944,
			0.955321,
			0.40788,
			-0.303201,
			0.861202,
			0.28428,
			-0.453413,
			0.844722,
			0.200903,
			-0.824274,
			0.529313,
			0.275002,
			-0.860225,
			0.429365,
			0.264504,
			-0.541948,
			0.797662,
			0.71807,
			-0.174047,
			0.673849,
			0.418104,
			0.207953,
			0.884243,
			0.59621,
			0.196539,
			0.778375,
			0.520066,
			-0.24012,
			0.819636,
			0.790826,
			-0.137791,
			0.596271,
			0.577502,
			-0.265938,
			0.771844,
			0.496353,
			0.182012,
			0.848781,
			0.522019,
			-0.028352,
			0.852443,
			0.169958,
			-0.074679,
			0.982604,
			0.920499,
			0.234321,
			0.312632,
			0,
			0.074343,
			0.997223,
			0,
			0.031587,
			0.999481,
			0.543626,
			0.382977,
			0.746818,
			0.652486,
			0.470199,
			0.594226,
			0.237953,
			0.50206,
			0.831416,
			0.199255,
			0.275338,
			0.940458,
			0,
			0.478896,
			0.877834,
			0,
			0.265328,
			0.964141,
			0.269448,
			0.66802,
			0.693594,
			0.630757,
			0.553484,
			0.54384,
			0,
			0.676321,
			0.736564,
			0.838679,
			0.339244,
			0.426008,
			0.558702,
			0.663961,
			0.496963,
			0,
			0.77926,
			0.626667,
			0.284707,
			0.754234,
			0.591632,
			0.918912,
			-0.020783,
			0.393841,
			0.758965,
			0.024598,
			0.650624,
			0.558214,
			0.010132,
			0.829615,
			0.713004,
			-0.165563,
			0.681295,
			0.823054,
			-0.19599,
			0.533067,
			0.890957,
			-0.16306,
			0.42378,
			0.926695,
			-0.138462,
			0.349284,
			0.891079,
			-0.151708,
			0.427686,
			0.92877,
			-0.184484,
			0.32139,
			0.944487,
			-0.176061,
			0.277322,
			0.952605,
			-0.155583,
			0.261361,
			0.497238,
			-0.478164,
			0.72393,
			0.640614,
			0.077853,
			0.763878,
			0.845668,
			0.369762,
			0.384808,
			0.235237,
			0.634541,
			0.736198,
			0.302835,
			0.064302,
			0.950865,
			0.130375,
			-0.80398,
			0.580157,
			0.174169,
			-0.68746,
			0.705008,
			0.450056,
			-0.201056,
			0.870052,
			0.081027,
			0.787927,
			0.61037,
			0,
			-0.368053,
			0.929777,
			0.473373,
			-0.064486,
			0.878475,
			0.325419,
			0.56502,
			0.758141,
			0,
			-0.147191,
			0.989105,
			0,
			0.490127,
			0.871639,
			0,
			0.797723,
			0.602985,
			0.130741,
			0.827479,
			0.546007,
			-0.599322,
			0.445174,
			0.665273,
			-0.591968,
			0.284341,
			0.754112,
			-0.614307,
			0.267067,
			0.742454,
			-0.655019,
			0.372814,
			0.657216,
			-0.681539,
			0.233375,
			0.693533,
			-0.792444,
			0.276498,
			0.543596,
			-0.568834,
			-0.238197,
			0.787164,
			-0.868679,
			-0.150212,
			0.471999,
			-0.86758,
			0.219581,
			0.44612,
			-0.435194,
			-0.756951,
			0.487411,
			-0.64922,
			-0.637135,
			0.415357,
			-0.331217,
			-0.881497,
			0.336467,
			-0.431166,
			-0.561083,
			0.706565,
			-0.442976,
			0.119327,
			0.888516,
			-0.345775,
			0.17127,
			0.922513,
			-0.408429,
			0.004639,
			0.912748,
			-0.370251,
			-0.02649,
			0.928526,
			-0.580157,
			-0.004303,
			0.814478,
			-0.783868,
			-0.129124,
			0.607318,
			-0.668599,
			0.036378,
			0.742698,
			-0.681661,
			-0.186254,
			0.707511,
			-0.571215,
			0.135838,
			0.809442,
			-0.593097,
			0.064455,
			0.802515,
			-0.475509,
			-0.064455,
			0.877316,
			-0.554491,
			-0.172033,
			0.814203,
			-0.483688,
			0.084811,
			0.87109,
			-0.860622,
			-0.120884,
			0.494644,
			-0.749718,
			-0.05298,
			0.659627,
			-0.573901,
			-0.043367,
			0.817743,
			-0.886227,
			-0.180242,
			0.426679,
			-0.755058,
			-0.210669,
			0.620838,
			-0.578906,
			-0.155766,
			0.800348,
			-0.703818,
			-0.312204,
			0.638081,
			-0.662648,
			0.068392,
			0.745781,
			-0.145787,
			-0.779717,
			0.608905,
			-0.42909,
			-0.280892,
			0.858455,
			-0.436537,
			-0.18424,
			0.880581,
			-0.394421,
			-0.016633,
			0.91876,
			-0.45912,
			-0.007965,
			0.888333,
			0.035188,
			0.652058,
			0.757317,
			-0.359996,
			0.15418,
			0.920103,
			-0.409772,
			0.275338,
			0.869625,
			-0.414045,
			0.003357,
			0.910245,
			-0.521714,
			0.268258,
			0.809839,
			0.020386,
			-0.037294,
			0.999084,
			-0.306894,
			-0.177557,
			0.935026,
			0.267739,
			-0.273507,
			0.923826,
			0.252785,
			0.871426,
			0.420331,
			-0.171117,
			-0.909452,
			0.378918,
			-0.313639,
			-0.804895,
			0.503677,
			0.06006,
			-0.926328,
			0.371868,
			-0.290475,
			-0.695059,
			0.657643,
			-0.143406,
			-0.918241,
			0.369091,
			-0.548906,
			0.210517,
			0.808924,
			-0.41081,
			0.158361,
			0.897855,
			-0.203436,
			0.295389,
			0.933439,
			-0.686422,
			-0.153172,
			0.710868,
			-0.459731,
			-0.019074,
			0.887814,
			-0.817591,
			-0.135197,
			0.559679,
			-0.480331,
			-0.11594,
			0.86935,
			-0.787988,
			-0.295419,
			0.540117,
			-0.870113,
			-0.222083,
			0.439924,
			-0.935575,
			-0.113742,
			0.334269,
			-0.926664,
			-0.124912,
			0.354472,
			-0.959532,
			-0.090152,
			0.266701,
			-0.95706,
			-0.106784,
			0.269387,
			-0.988891,
			0.050386,
			0.139714,
			-0.953978,
			0.20661,
			0.2172,
			-0.975402,
			0.118748,
			0.185675,
			-0.980865,
			-0.027039,
			0.192724,
			-0.99176,
			-0.009857,
			0.127567,
			-0.976165,
			-0.122257,
			0.179235,
			-0.972991,
			-0.144505,
			0.179968,
			-0.978027,
			-0.090609,
			0.187719,
			-0.970244,
			-0.134953,
			0.200934,
			-0.986633,
			-0.046419,
			0.156133,
			-0.971191,
			-0.120792,
			0.205298,
			-0.902585,
			0.287729,
			0.3202,
			-0.954192,
			0.092807,
			0.284371,
			-0.921323,
			0.191656,
			0.338206,
			-0.868465,
			0.276345,
			0.411542,
			-0.522141,
			-0.309458,
			0.794733,
			-0.329905,
			-0.600879,
			0.72805,
			-0.79165,
			-0.043641,
			0.609394,
			-0.413739,
			-0.750816,
			0.514847,
			-0.51033,
			-0.00882,
			0.85989,
			-0.286294,
			0.277779,
			0.916959,
			-0.13715,
			0.434431,
			0.890164,
			-0.076662,
			0.227058,
			0.970855,
			-0.421735,
			0.514145,
			0.746818,
			-0.375469,
			0.073183,
			0.923917,
			-0.392804,
			0.195227,
			0.898618,
			-0.585406,
			0.049593,
			0.809198,
			-0.376965,
			-0.333598,
			0.86404,
			-0.575121,
			0.153111,
			0.803583,
			-0.477401,
			-0.320719,
			0.818049,
			-0.336558,
			-0.598193,
			0.727226,
			-0.263741,
			-0.637257,
			0.724082,
			-0.795068,
			0.228736,
			0.561693,
			-0.243843,
			-0.427625,
			0.870418,
			-0.313608,
			0.030427,
			0.949034,
			0.026246,
			0.488388,
			0.872189,
			0.035798,
			0.189062,
			0.981292,
			-0.326273,
			0.087252,
			0.941221,
			-0.5056,
			-0.340526,
			0.792688,
			-0.598224,
			0.0759,
			0.797693,
			-0.498581,
			-0.029908,
			0.866298,
			-0.155065,
			-0.771233,
			0.617328,
			-0.221046,
			-0.140477,
			0.965056,
			-0.234016,
			-0.726341,
			0.646229,
			-0.081637,
			-0.283975,
			0.955321,
			-0.40788,
			-0.303201,
			0.861202,
			-0.200903,
			-0.824274,
			0.529313,
			-0.28428,
			-0.453413,
			0.844722,
			-0.275002,
			-0.860225,
			0.429365,
			-0.264504,
			-0.541948,
			0.797662,
			-0.71807,
			-0.174047,
			0.673849,
			-0.418104,
			0.207953,
			0.884243,
			-0.59621,
			0.196539,
			0.778375,
			-0.520066,
			-0.24012,
			0.819636,
			-0.790826,
			-0.137791,
			0.596271,
			-0.496353,
			0.182012,
			0.848781,
			-0.577502,
			-0.265938,
			0.771844,
			-0.522019,
			-0.028352,
			0.852443,
			-0.169958,
			-0.074679,
			0.982604,
			-0.920499,
			0.234321,
			0.312632,
			-0.543626,
			0.382977,
			0.746818,
			-0.237953,
			0.50206,
			0.831416,
			-0.652486,
			0.470199,
			0.594226,
			-0.199255,
			0.275338,
			0.940458,
			-0.269448,
			0.66802,
			0.693594,
			-0.630757,
			0.553484,
			0.54384,
			-0.838679,
			0.339244,
			0.426008,
			-0.558702,
			0.663961,
			0.496963,
			-0.284707,
			0.754234,
			0.591632,
			-0.918912,
			-0.020783,
			0.393841,
			-0.758965,
			0.024598,
			0.650624,
			-0.558214,
			0.010132,
			0.829615,
			-0.713004,
			-0.165563,
			0.681295,
			-0.823054,
			-0.19599,
			0.533067,
			-0.890957,
			-0.16306,
			0.42378,
			-0.926695,
			-0.138462,
			0.349284,
			-0.891079,
			-0.151708,
			0.427686,
			-0.92877,
			-0.184484,
			0.32139,
			-0.944487,
			-0.176061,
			0.277322,
			-0.952605,
			-0.155583,
			0.261361,
			-0.497238,
			-0.478164,
			0.72393,
			-0.640614,
			0.077853,
			0.763878,
			-0.845668,
			0.369762,
			0.384808,
			-0.235237,
			0.634541,
			0.736198,
			-0.302835,
			0.064302,
			0.950865,
			-0.130375,
			-0.80398,
			0.580157,
			-0.174169,
			-0.68746,
			0.705008,
			-0.450056,
			-0.201056,
			0.870052,
			-0.081027,
			0.787927,
			0.61037,
			-0.473373,
			-0.064486,
			0.878475,
			-0.325419,
			0.56502,
			0.758141,
			-0.130741,
			0.827479,
			0.546007
		]
	};

/***/ },
/* 48 */
/*!*********************************!*\
  !*** ./src/data/eyemouth3.json ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = {
		"uvs": [
			[
				0,
				1
			]
		],
		"name": "eyemouthGeometry",
		"faces": [
			40,
			0,
			1,
			2,
			0,
			0,
			0,
			0,
			1,
			2,
			40,
			0,
			3,
			4,
			0,
			0,
			0,
			0,
			3,
			4,
			40,
			5,
			4,
			6,
			0,
			0,
			0,
			5,
			4,
			6,
			40,
			1,
			7,
			8,
			0,
			0,
			0,
			1,
			7,
			8,
			40,
			9,
			10,
			6,
			0,
			0,
			0,
			9,
			10,
			6,
			40,
			11,
			12,
			13,
			0,
			0,
			0,
			11,
			12,
			13,
			40,
			14,
			15,
			16,
			0,
			0,
			0,
			14,
			15,
			16,
			40,
			17,
			12,
			18,
			0,
			0,
			0,
			17,
			12,
			18,
			40,
			19,
			15,
			14,
			0,
			0,
			0,
			19,
			15,
			14,
			40,
			20,
			19,
			21,
			0,
			0,
			0,
			20,
			19,
			21,
			40,
			11,
			13,
			21,
			0,
			0,
			0,
			11,
			13,
			21,
			40,
			18,
			12,
			11,
			0,
			0,
			0,
			18,
			12,
			11,
			40,
			2,
			1,
			8,
			0,
			0,
			0,
			2,
			1,
			8,
			40,
			3,
			0,
			2,
			0,
			0,
			0,
			3,
			0,
			2,
			40,
			5,
			0,
			4,
			0,
			0,
			0,
			5,
			0,
			4,
			40,
			10,
			5,
			6,
			0,
			0,
			0,
			10,
			5,
			6,
			40,
			21,
			19,
			14,
			0,
			0,
			0,
			21,
			19,
			14,
			40,
			21,
			13,
			20,
			0,
			0,
			0,
			21,
			13,
			20
		],
		"vertices": [
			0.2297,
			0.086897,
			-0.161883,
			0.279699,
			0.095986,
			-0.18889,
			0.277173,
			0.145921,
			-0.180998,
			0.232182,
			0.156804,
			-0.1574,
			0.183143,
			0.147974,
			-0.159898,
			0.185716,
			0.092715,
			-0.156667,
			0.151382,
			0.127287,
			-0.162529,
			0.309714,
			0.116233,
			-0.22245,
			0.305157,
			0.125845,
			-0.201761,
			0.142249,
			0.113507,
			-0.175351,
			0.15112,
			0.106789,
			-0.165163,
			-0.185716,
			0.092715,
			-0.156667,
			-0.151382,
			0.127287,
			-0.162529,
			-0.183143,
			0.147974,
			-0.159898,
			-0.279699,
			0.095986,
			-0.18889,
			-0.305157,
			0.125845,
			-0.201761,
			-0.309714,
			0.116233,
			-0.22245,
			-0.142249,
			0.113507,
			-0.175351,
			-0.15112,
			0.106789,
			-0.165163,
			-0.277173,
			0.145921,
			-0.180998,
			-0.232182,
			0.156804,
			-0.1574,
			-0.2297,
			0.086897,
			-0.161883
		],
		"metadata": {
			"type": "Geometry",
			"uvs": 1,
			"faces": 18,
			"vertices": 22,
			"normals": 22,
			"generator": "io_three",
			"version": 3
		},
		"normals": [
			0.261391,
			-0.043886,
			0.964202,
			0.568438,
			-0.176824,
			0.803491,
			0.491897,
			-0.09476,
			0.865444,
			0.212317,
			-0.07004,
			0.97467,
			-0.032289,
			0.009156,
			0.99942,
			0.006287,
			0.035463,
			0.999329,
			-0.348064,
			-0.028626,
			0.93701,
			0.775628,
			-0.489608,
			0.398297,
			0.707297,
			-0.334635,
			0.622669,
			-0.774926,
			-0.070772,
			0.62804,
			-0.495315,
			-0.104465,
			0.862392,
			-0.006287,
			0.035463,
			0.999329,
			0.348064,
			-0.028626,
			0.93701,
			0.032289,
			0.009156,
			0.99942,
			-0.568438,
			-0.176824,
			0.803491,
			-0.707297,
			-0.334635,
			0.622669,
			-0.775628,
			-0.489608,
			0.398297,
			0.774926,
			-0.070772,
			0.62804,
			0.495315,
			-0.104465,
			0.862392,
			-0.491897,
			-0.09476,
			0.865444,
			-0.212317,
			-0.07004,
			0.97467,
			-0.261391,
			-0.043886,
			0.964202
		]
	};

/***/ },
/* 49 */
/*!*****************************!*\
  !*** ./src/data/face2.json ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = {
		"face": {
			"position": [
				0.03815,
				-0.06365,
				0.02312,
				0.03849,
				-0.1046,
				0.05281,
				0.09298,
				-0.1199,
				-0.02114,
				0.03853,
				-0.149,
				0.05611,
				0.03386,
				-0.1775,
				0.03478,
				0.08027,
				-0.1711,
				-0.007969,
				0.0915,
				-0.1514,
				-0.01107,
				0.01467,
				-0.1903,
				0.009363,
				0.03079,
				-0.201,
				-0.0237,
				0.04243,
				-0.008568,
				-0.0141,
				0.07683,
				-0.0414,
				-0.07184,
				0.1212,
				-0.05466,
				-0.1007,
				0.2343,
				-0.08553,
				-0.1383,
				0.2219,
				-0.2308,
				-0.1442,
				0.2906,
				-0.1915,
				-0.1963,
				0.3065,
				-0.2407,
				-0.2255,
				0.1761,
				-0.1329,
				-0.1131,
				0.1349,
				-0.1632,
				-0.102,
				0.1935,
				-0.3033,
				-0.1192,
				0.173,
				-0.2579,
				-0.1134,
				0.242,
				-0.2794,
				-0.1579,
				0.2683,
				-0.1395,
				-0.1633,
				0.2002,
				-0.1803,
				-0.1286,
				0.1532,
				-0.2071,
				-0.1068,
				0.316,
				-0.2869,
				-0.2482,
				0.2565,
				-0.3244,
				-0.1701,
				0.2062,
				-0.3399,
				-0.1266,
				0.1942,
				-0.398,
				-0.1226,
				0.2384,
				-0.4121,
				-0.1678,
				0.1529,
				-0.3605,
				-0.1108,
				0.166,
				-0.3478,
				-0.1165,
				0.1568,
				-0.3375,
				-0.1003,
				0.1679,
				-0.3756,
				-0.1115,
				0.07556,
				-0.3043,
				-0.02149,
				0.1389,
				-0.3195,
				-0.07301,
				0.1419,
				-0.3524,
				-0.1205,
				0.1482,
				-0.3458,
				-0.1247,
				0.1542,
				-0.346,
				-0.1184,
				0.1411,
				-0.342,
				-0.1134,
				0.1494,
				-0.3394,
				-0.1046,
				0.1474,
				-0.3538,
				-0.1142,
				0.06631,
				-0.3813,
				-0.06757,
				0.1325,
				-0.3287,
				-0.07901,
				0.1219,
				-0.3365,
				-0.09275,
				0.1813,
				-0.3445,
				-0.1171,
				0.1675,
				-0.3243,
				-0.1033,
				0.07724,
				-0.4293,
				-0.06353,
				0.1441,
				-0.2947,
				-0.07972,
				0.116,
				-0.385,
				-0.08127,
				0.0726,
				-0.321,
				-0.02867,
				0.08932,
				-0.2892,
				-0.0363,
				0.0665,
				-0.3302,
				-0.0492,
				0.125,
				-0.2197,
				-0.0862,
				0.05536,
				-0.2347,
				-0.0376,
				0.1074,
				-0.1759,
				-0.0861,
				0.1186,
				-0.1511,
				-0.08671,
				0.1182,
				-0.5897,
				-0.1052,
				0.3185,
				-0.4287,
				-0.3121,
				0.3208,
				-0.3585,
				-0.2788,
				0.3501,
				-0.3836,
				-0.3671,
				0.3452,
				-0.3205,
				-0.332,
				0.3822,
				-0.3111,
				-0.4464,
				0.3749,
				-0.2628,
				-0.4023,
				0.1195,
				0.6298,
				-0.3172,
				0.3286,
				0.5511,
				-0.4387,
				0.2381,
				0.6051,
				-0.3678,
				0.4104,
				-0.1863,
				-0.53,
				0.3968,
				0.2382,
				-0.3646,
				0.4293,
				0.2308,
				-0.5725,
				0.4374,
				0.1364,
				-0.5792,
				0.4383,
				0.05378,
				-0.5802,
				0.4087,
				-0.1254,
				-0.4789,
				0.4097,
				-0.08167,
				-0.4557,
				0.4362,
				-0.01401,
				-0.5724,
				0.4289,
				-0.08916,
				-0.5588,
				0.4126,
				0.345,
				-0.5495,
				0.3253,
				0.4758,
				-0.3885,
				0.3908,
				0.447,
				-0.5159,
				0.229,
				-0.5102,
				-0.2083,
				0.09584,
				-0.4704,
				-0.0751,
				0.1384,
				0.1366,
				-0.1568,
				0.1102,
				0.1075,
				-0.16,
				0.1363,
				0.08889,
				-0.1573,
				0.1861,
				0.06724,
				-0.1517,
				0.2323,
				0.06182,
				-0.161,
				0.2843,
				0.07763,
				-0.1906,
				0.3215,
				0.1103,
				-0.231,
				0.3184,
				0.1346,
				-0.2049,
				0.2335,
				0.1701,
				-0.156,
				0.08922,
				0.1102,
				-0.1424,
				0.122,
				0.1457,
				-0.1284,
				0.1201,
				0.06988,
				-0.1434,
				0.1891,
				0.04054,
				-0.145,
				0.2381,
				0.0356,
				-0.1622,
				0.2947,
				0.05669,
				-0.1978,
				0.3367,
				0.1024,
				-0.2433,
				0.3318,
				0.1421,
				-0.2005,
				0.2398,
				0.174,
				-0.1341,
				0.1514,
				0.1273,
				-0.1625,
				0.1288,
				0.1081,
				-0.1678,
				0.1511,
				0.1068,
				-0.1652,
				0.1857,
				0.09272,
				-0.1567,
				0.2297,
				0.0869,
				-0.1619,
				0.2797,
				0.09599,
				-0.1889,
				0.3097,
				0.1162,
				-0.2225,
				0.3052,
				0.1258,
				-0.2018,
				0.2322,
				0.1568,
				-0.1574,
				0.1422,
				0.1135,
				-0.1754,
				0.06559,
				0.1195,
				-0.101,
				0.1087,
				0.1725,
				-0.08099,
				0.1832,
				-0.01051,
				-0.1295,
				0.2538,
				-0.003445,
				-0.1545,
				0.3189,
				0.02741,
				-0.207,
				0.3622,
				0.08619,
				-0.2591,
				0.3523,
				0.1768,
				-0.1931,
				0.2523,
				0.217,
				-0.1046,
				0.03619,
				0.08163,
				-0.05285,
				0.03409,
				0.1289,
				-0.06244,
				0.07497,
				0.0458,
				-0.09676,
				0.07284,
				0.2393,
				-0.04767,
				0.2539,
				0.288,
				-0.1017,
				0.2511,
				0.3352,
				-0.12,
				0.1189,
				0.3357,
				-0.06785,
				0.12,
				0.4175,
				-0.1039,
				0.1235,
				0.5276,
				-0.1888,
				0.2449,
				0.5119,
				-0.2501,
				0.2533,
				0.3979,
				-0.163,
				0.3564,
				0.3587,
				-0.3653,
				0.3701,
				0.2128,
				-0.2486,
				0.3888,
				0.05843,
				-0.2879,
				0.3496,
				-0.02266,
				-0.2205,
				0.285,
				-0.06441,
				-0.1628,
				0.309,
				-0.1166,
				-0.1913,
				0.3245,
				-0.1683,
				-0.2308,
				0.3338,
				-0.2148,
				-0.266,
				0.3385,
				-0.2569,
				-0.2954,
				0.3632,
				-0.06963,
				-0.2512,
				0.3705,
				-0.1653,
				-0.3317,
				0.3719,
				-0.2045,
				-0.3637,
				0.367,
				-0.1213,
				-0.2932,
				0.4166,
				0.04559,
				-0.3992,
				0.4146,
				-0.02746,
				-0.4276,
				0.111,
				-0.3732,
				-0.08619,
				0.06772,
				-0.3893,
				-0.05554,
				0.1136,
				-0.5194,
				-0.07705,
				0.1066,
				-0.3661,
				-0.09434,
				0.07113,
				-0.4087,
				-0.05058,
				0.1831,
				0.148,
				-0.1599,
				0.1823,
				0.16,
				-0.1564,
				0.1852,
				0.2017,
				-0.08847,
				0.1813,
				0.1643,
				-0.1314,
				0.2905,
				0.1615,
				-0.1671,
				0.2798,
				0.1583,
				-0.1795,
				0.3045,
				0.2032,
				-0.1411,
				0.2772,
				0.1459,
				-0.181,
				0.3099,
				0.263,
				-0.1506,
				0.1795,
				0.2777,
				-0.07489,
				0.1266,
				-0.4083,
				-0.08467,
				0.04027,
				-0.282,
				-0.02056,
				0.08798,
				-0.09029,
				-0.03624,
				0.125,
				-0.1272,
				-0.09647,
				0,
				-0.05952,
				0.03923,
				-0.03815,
				-0.06365,
				0.02312,
				-0.03849,
				-0.1046,
				0.05281,
				0,
				-0.1035,
				0.06995,
				-0.09298,
				-0.1199,
				-0.02114,
				0,
				0,
				0,
				-0.03853,
				-0.149,
				0.05611,
				0,
				-0.1535,
				0.07161,
				0,
				-0.1848,
				0.04713,
				-0.03386,
				-0.1775,
				0.03478,
				-0.08027,
				-0.1711,
				-0.007969,
				-0.0915,
				-0.1514,
				-0.01107,
				0,
				-0.1953,
				0.01097,
				-0.01467,
				-0.1903,
				0.009363,
				0,
				-0.2085,
				-0.01697,
				-0.03079,
				-0.201,
				-0.0237,
				-0.04243,
				-0.008568,
				-0.0141,
				-0.07683,
				-0.0414,
				-0.07184,
				-0.1212,
				-0.05466,
				-0.1007,
				-0.2343,
				-0.08553,
				-0.1383,
				-0.2219,
				-0.2308,
				-0.1442,
				-0.2906,
				-0.1915,
				-0.1963,
				-0.3065,
				-0.2407,
				-0.2255,
				-0.1761,
				-0.1329,
				-0.1131,
				-0.1349,
				-0.1632,
				-0.102,
				-0.1935,
				-0.3033,
				-0.1192,
				-0.173,
				-0.2579,
				-0.1134,
				-0.242,
				-0.2794,
				-0.1579,
				-0.2683,
				-0.1395,
				-0.1633,
				-0.2002,
				-0.1803,
				-0.1286,
				-0.1532,
				-0.2071,
				-0.1068,
				-0.316,
				-0.2869,
				-0.2482,
				-0.2565,
				-0.3244,
				-0.1701,
				-0.2062,
				-0.3399,
				-0.1266,
				-0.1942,
				-0.398,
				-0.1226,
				-0.2384,
				-0.4121,
				-0.1678,
				-0.1529,
				-0.3605,
				-0.1108,
				-0.166,
				-0.3478,
				-0.1165,
				-0.1568,
				-0.3375,
				-0.1003,
				-0.1679,
				-0.3756,
				-0.1115,
				-0.07556,
				-0.3043,
				-0.02149,
				0,
				-0.3067,
				-0.005393,
				-0.1389,
				-0.3195,
				-0.07301,
				-0.1419,
				-0.3524,
				-0.1205,
				-0.1482,
				-0.3458,
				-0.1247,
				-0.1542,
				-0.346,
				-0.1184,
				-0.1411,
				-0.342,
				-0.1134,
				-0.1494,
				-0.3394,
				-0.1046,
				-0.1474,
				-0.3538,
				-0.1142,
				-0.06631,
				-0.3813,
				-0.06757,
				-0.1325,
				-0.3287,
				-0.07901,
				-0.1219,
				-0.3365,
				-0.09275,
				-0.1813,
				-0.3445,
				-0.1171,
				-0.1675,
				-0.3243,
				-0.1033,
				-0.07724,
				-0.4293,
				-0.06353,
				-0.1441,
				-0.2947,
				-0.07972,
				-0.116,
				-0.385,
				-0.08127,
				-0.0726,
				-0.321,
				-0.02867,
				0,
				-0.3211,
				-0.008766,
				-0.08932,
				-0.2892,
				-0.0363,
				-0.0665,
				-0.3302,
				-0.0492,
				0,
				-0.3293,
				-0.03031,
				0,
				-0.2889,
				-0.01367,
				-0.125,
				-0.2197,
				-0.0862,
				-0.05536,
				-0.2347,
				-0.0376,
				0,
				-0.2425,
				-0.02751,
				-0.1074,
				-0.1759,
				-0.0861,
				-0.1186,
				-0.1511,
				-0.08671,
				-0.1182,
				-0.5897,
				-0.1052,
				-0.3185,
				-0.4287,
				-0.3121,
				-0.3208,
				-0.3585,
				-0.2788,
				-0.3501,
				-0.3836,
				-0.3671,
				-0.3452,
				-0.3205,
				-0.332,
				-0.3822,
				-0.3111,
				-0.4464,
				-0.3749,
				-0.2628,
				-0.4023,
				-0.1195,
				0.6298,
				-0.3172,
				0,
				0.6365,
				-0.2955,
				-0.3286,
				0.5511,
				-0.4387,
				-0.2381,
				0.6051,
				-0.3678,
				-0.4104,
				-0.1863,
				-0.53,
				-0.3968,
				0.2382,
				-0.3646,
				-0.4293,
				0.2308,
				-0.5725,
				-0.4374,
				0.1364,
				-0.5792,
				-0.4383,
				0.05378,
				-0.5802,
				-0.4087,
				-0.1254,
				-0.4789,
				-0.4097,
				-0.08167,
				-0.4557,
				-0.4362,
				-0.01401,
				-0.5724,
				-0.4289,
				-0.08916,
				-0.5588,
				-0.4126,
				0.345,
				-0.5495,
				-0.3253,
				0.4758,
				-0.3885,
				-0.3908,
				0.447,
				-0.5159,
				-0.229,
				-0.5102,
				-0.2083,
				-0.09584,
				-0.4704,
				-0.0751,
				-0.1384,
				0.1366,
				-0.1568,
				-0.1102,
				0.1075,
				-0.16,
				-0.1363,
				0.08889,
				-0.1573,
				-0.1861,
				0.06724,
				-0.1517,
				-0.2323,
				0.06182,
				-0.161,
				-0.2843,
				0.07763,
				-0.1906,
				-0.3215,
				0.1103,
				-0.231,
				-0.3184,
				0.1346,
				-0.2049,
				-0.2335,
				0.1701,
				-0.156,
				-0.08922,
				0.1102,
				-0.1424,
				-0.122,
				0.1457,
				-0.1284,
				-0.1201,
				0.06988,
				-0.1434,
				-0.1891,
				0.04054,
				-0.145,
				-0.2381,
				0.0356,
				-0.1622,
				-0.2947,
				0.05669,
				-0.1978,
				-0.3367,
				0.1024,
				-0.2433,
				-0.3318,
				0.1421,
				-0.2005,
				-0.2398,
				0.174,
				-0.1341,
				-0.1514,
				0.1273,
				-0.1625,
				-0.1288,
				0.1081,
				-0.1678,
				-0.1511,
				0.1068,
				-0.1652,
				-0.1857,
				0.09272,
				-0.1567,
				-0.2297,
				0.0869,
				-0.1619,
				-0.2797,
				0.09599,
				-0.1889,
				-0.3097,
				0.1162,
				-0.2225,
				-0.3052,
				0.1258,
				-0.2018,
				-0.2322,
				0.1568,
				-0.1574,
				-0.1422,
				0.1135,
				-0.1754,
				-0.06559,
				0.1195,
				-0.101,
				-0.1087,
				0.1725,
				-0.08099,
				-0.1832,
				-0.01051,
				-0.1295,
				-0.2538,
				-0.003445,
				-0.1545,
				-0.3189,
				0.02741,
				-0.207,
				-0.3622,
				0.08619,
				-0.2591,
				-0.3523,
				0.1768,
				-0.1931,
				-0.2523,
				0.217,
				-0.1046,
				-0.03619,
				0.08163,
				-0.05285,
				-0.03409,
				0.1289,
				-0.06244,
				-0.07497,
				0.0458,
				-0.09676,
				-0.07284,
				0.2393,
				-0.04767,
				-0.2539,
				0.288,
				-0.1017,
				0,
				0.08837,
				-0.04032,
				0,
				0.1313,
				-0.05193,
				0,
				0.2437,
				-0.04321,
				-0.2511,
				0.3352,
				-0.12,
				-0.1189,
				0.3357,
				-0.06785,
				0,
				0.3326,
				-0.06122,
				-0.12,
				0.4175,
				-0.1039,
				-0.1235,
				0.5276,
				-0.1888,
				-0.2449,
				0.5119,
				-0.2501,
				-0.2533,
				0.3979,
				-0.163,
				-0.3564,
				0.3587,
				-0.3653,
				0,
				0.4192,
				-0.09193,
				0,
				0.5359,
				-0.1736,
				-0.3701,
				0.2128,
				-0.2486,
				-0.3888,
				0.05843,
				-0.2879,
				-0.3496,
				-0.02266,
				-0.2205,
				-0.285,
				-0.06441,
				-0.1628,
				-0.309,
				-0.1166,
				-0.1913,
				-0.3245,
				-0.1683,
				-0.2308,
				-0.3338,
				-0.2148,
				-0.266,
				-0.3385,
				-0.2569,
				-0.2954,
				-0.3632,
				-0.06963,
				-0.2512,
				-0.3705,
				-0.1653,
				-0.3317,
				-0.3719,
				-0.2045,
				-0.3637,
				-0.367,
				-0.1213,
				-0.2932,
				-0.4166,
				0.04559,
				-0.3992,
				-0.4146,
				-0.02746,
				-0.4276,
				-0.111,
				-0.3732,
				-0.08619,
				-0.06772,
				-0.3893,
				-0.05554,
				-0.1136,
				-0.5194,
				-0.07705,
				-0.1066,
				-0.3661,
				-0.09434,
				-0.07113,
				-0.4087,
				-0.05058,
				0,
				-0.3829,
				-0.03881,
				0,
				-0.392,
				-0.02709,
				0,
				-0.4403,
				-0.03551,
				0,
				-0.5273,
				-0.03931,
				0,
				-0.6053,
				-0.07017,
				0,
				-0.4751,
				-0.04961,
				-0.1831,
				0.148,
				-0.1599,
				-0.1823,
				0.16,
				-0.1564,
				-0.1852,
				0.2017,
				-0.08847,
				-0.1813,
				0.1643,
				-0.1314,
				-0.2905,
				0.1615,
				-0.1671,
				-0.2798,
				0.1583,
				-0.1795,
				-0.3045,
				0.2032,
				-0.1411,
				-0.2772,
				0.1459,
				-0.181,
				-0.3099,
				0.263,
				-0.1506,
				-0.1795,
				0.2777,
				-0.07489,
				-0.1266,
				-0.4083,
				-0.08467,
				0,
				-0.4152,
				-0.02269,
				-0.04027,
				-0.282,
				-0.02056,
				-0.08798,
				-0.09029,
				-0.03624,
				-0.125,
				-0.1272,
				-0.09647
			],
			"index": [
				0,
				161,
				164,
				164,
				1,
				0,
				116,
				295,
				166,
				166,
				9,
				116,
				118,
				116,
				9,
				9,
				10,
				118,
				1,
				164,
				168,
				168,
				3,
				1,
				1,
				3,
				6,
				6,
				2,
				1,
				168,
				169,
				4,
				4,
				3,
				168,
				3,
				4,
				5,
				5,
				6,
				3,
				7,
				4,
				169,
				169,
				173,
				7,
				8,
				7,
				173,
				173,
				175,
				8,
				5,
				4,
				7,
				7,
				8,
				5,
				166,
				161,
				0,
				0,
				9,
				166,
				11,
				118,
				10,
				110,
				118,
				11,
				12,
				110,
				11,
				11,
				16,
				12,
				13,
				20,
				15,
				15,
				14,
				13,
				19,
				18,
				20,
				20,
				13,
				19,
				14,
				21,
				22,
				22,
				13,
				14,
				13,
				22,
				23,
				23,
				19,
				13,
				24,
				15,
				20,
				20,
				25,
				24,
				25,
				20,
				18,
				18,
				26,
				25,
				58,
				24,
				25,
				25,
				28,
				58,
				28,
				25,
				26,
				26,
				27,
				28,
				34,
				31,
				47,
				31,
				45,
				47,
				46,
				329,
				79,
				329,
				332,
				79,
				46,
				79,
				157,
				29,
				48,
				32,
				48,
				157,
				32,
				34,
				47,
				33,
				47,
				50,
				33,
				30,
				44,
				31,
				44,
				45,
				31,
				40,
				29,
				37,
				29,
				30,
				37,
				36,
				35,
				37,
				35,
				40,
				37,
				43,
				38,
				42,
				38,
				39,
				42,
				39,
				38,
				37,
				38,
				36,
				37,
				42,
				34,
				49,
				34,
				33,
				49,
				39,
				31,
				42,
				31,
				34,
				42,
				37,
				30,
				39,
				30,
				31,
				39,
				43,
				42,
				51,
				42,
				49,
				51,
				30,
				29,
				44,
				29,
				32,
				44,
				49,
				33,
				219,
				33,
				202,
				219,
				51,
				49,
				222,
				49,
				219,
				222,
				32,
				27,
				26,
				26,
				44,
				32,
				45,
				44,
				26,
				26,
				18,
				45,
				47,
				45,
				18,
				18,
				19,
				47,
				19,
				23,
				52,
				52,
				47,
				19,
				53,
				50,
				52,
				50,
				47,
				52,
				202,
				33,
				158,
				202,
				158,
				223,
				54,
				52,
				23,
				23,
				17,
				54,
				53,
				52,
				54,
				54,
				8,
				53,
				175,
				226,
				53,
				53,
				8,
				175,
				17,
				23,
				22,
				22,
				16,
				17,
				16,
				22,
				21,
				21,
				12,
				16,
				54,
				6,
				5,
				5,
				8,
				54,
				55,
				54,
				17,
				330,
				144,
				332,
				144,
				79,
				332,
				223,
				158,
				226,
				78,
				57,
				58,
				58,
				28,
				78,
				57,
				59,
				60,
				60,
				58,
				57,
				61,
				62,
				60,
				60,
				59,
				61,
				69,
				68,
				67,
				67,
				140,
				69,
				70,
				69,
				140,
				140,
				141,
				70,
				72,
				71,
				74,
				74,
				73,
				72,
				62,
				61,
				66,
				127,
				67,
				68,
				68,
				75,
				127,
				127,
				75,
				77,
				77,
				76,
				127,
				79,
				27,
				157,
				6,
				55,
				2,
				54,
				55,
				6,
				33,
				50,
				158,
				28,
				144,
				56,
				56,
				78,
				28,
				80,
				90,
				89,
				89,
				81,
				80,
				92,
				83,
				82,
				82,
				91,
				92,
				84,
				83,
				92,
				92,
				93,
				84,
				85,
				94,
				95,
				95,
				86,
				85,
				86,
				95,
				96,
				96,
				87,
				86,
				127,
				155,
				67,
				98,
				80,
				81,
				81,
				99,
				98,
				83,
				101,
				100,
				100,
				82,
				83,
				102,
				101,
				83,
				83,
				84,
				102,
				104,
				103,
				85,
				85,
				86,
				104,
				98,
				99,
				107,
				88,
				148,
				106,
				148,
				147,
				106,
				115,
				149,
				97,
				149,
				150,
				97,
				81,
				89,
				91,
				91,
				82,
				81,
				99,
				81,
				82,
				82,
				100,
				99,
				94,
				85,
				84,
				84,
				93,
				94,
				85,
				103,
				102,
				102,
				84,
				85,
				148,
				80,
				147,
				80,
				98,
				147,
				88,
				97,
				148,
				97,
				150,
				148,
				89,
				90,
				109,
				109,
				108,
				89,
				92,
				91,
				118,
				118,
				110,
				92,
				93,
				92,
				110,
				110,
				111,
				93,
				95,
				94,
				112,
				112,
				113,
				95,
				96,
				95,
				113,
				113,
				114,
				96,
				148,
				150,
				80,
				150,
				90,
				80,
				115,
				153,
				120,
				153,
				155,
				120,
				91,
				89,
				108,
				108,
				118,
				91,
				94,
				93,
				111,
				111,
				112,
				94,
				117,
				116,
				118,
				118,
				108,
				117,
				119,
				117,
				108,
				108,
				109,
				119,
				153,
				114,
				155,
				114,
				128,
				155,
				128,
				67,
				155,
				296,
				295,
				116,
				116,
				117,
				296,
				297,
				296,
				117,
				117,
				119,
				297,
				121,
				126,
				123,
				123,
				122,
				121,
				155,
				127,
				126,
				126,
				121,
				155,
				122,
				123,
				306,
				306,
				300,
				122,
				124,
				123,
				126,
				126,
				125,
				124,
				125,
				126,
				127,
				127,
				76,
				125,
				306,
				123,
				124,
				124,
				307,
				306,
				64,
				65,
				125,
				76,
				64,
				125,
				237,
				307,
				124,
				124,
				63,
				237,
				114,
				113,
				129,
				129,
				128,
				114,
				130,
				129,
				113,
				113,
				112,
				130,
				131,
				130,
				112,
				112,
				111,
				131,
				12,
				131,
				111,
				111,
				110,
				12,
				131,
				12,
				21,
				21,
				132,
				131,
				133,
				14,
				15,
				15,
				134,
				133,
				132,
				21,
				14,
				14,
				133,
				132,
				134,
				15,
				24,
				24,
				135,
				134,
				24,
				58,
				60,
				60,
				135,
				24,
				130,
				131,
				132,
				132,
				136,
				130,
				139,
				133,
				134,
				134,
				137,
				139,
				136,
				132,
				133,
				133,
				139,
				136,
				137,
				134,
				135,
				135,
				138,
				137,
				135,
				60,
				62,
				62,
				138,
				135,
				129,
				130,
				136,
				136,
				140,
				129,
				141,
				139,
				137,
				137,
				72,
				141,
				140,
				136,
				139,
				139,
				141,
				140,
				72,
				137,
				138,
				138,
				71,
				72,
				138,
				62,
				66,
				66,
				71,
				138,
				128,
				129,
				140,
				140,
				67,
				128,
				87,
				105,
				104,
				104,
				86,
				87,
				160,
				10,
				159,
				141,
				72,
				73,
				73,
				70,
				141,
				124,
				125,
				65,
				65,
				63,
				124,
				76,
				77,
				64,
				29,
				40,
				48,
				40,
				142,
				48,
				28,
				27,
				79,
				79,
				144,
				28,
				53,
				158,
				50,
				158,
				53,
				226,
				107,
				99,
				100,
				122,
				300,
				297,
				297,
				119,
				122,
				122,
				119,
				156,
				109,
				149,
				119,
				149,
				156,
				119,
				149,
				109,
				150,
				109,
				90,
				150,
				114,
				153,
				96,
				153,
				151,
				96,
				151,
				152,
				96,
				152,
				87,
				96,
				154,
				105,
				152,
				105,
				87,
				152,
				153,
				115,
				151,
				115,
				97,
				151,
				97,
				88,
				151,
				88,
				152,
				151,
				106,
				154,
				88,
				154,
				152,
				88,
				122,
				156,
				121,
				120,
				155,
				121,
				120,
				121,
				156,
				149,
				115,
				156,
				115,
				120,
				156,
				27,
				32,
				157,
				71,
				66,
				74,
				35,
				145,
				40,
				145,
				142,
				40,
				331,
				56,
				330,
				56,
				144,
				330,
				159,
				0,
				1,
				1,
				2,
				159,
				9,
				0,
				159,
				159,
				10,
				9,
				10,
				160,
				11,
				16,
				11,
				160,
				160,
				17,
				16,
				146,
				46,
				48,
				46,
				157,
				48,
				143,
				146,
				142,
				146,
				48,
				142,
				146,
				344,
				46,
				344,
				329,
				46,
				344,
				146,
				328,
				146,
				143,
				328,
				328,
				143,
				327,
				143,
				41,
				327,
				17,
				160,
				55,
				2,
				55,
				160,
				160,
				159,
				2,
				143,
				142,
				41,
				142,
				145,
				41,
				162,
				164,
				161,
				164,
				162,
				163,
				290,
				166,
				295,
				166,
				290,
				177,
				292,
				177,
				290,
				177,
				292,
				178,
				163,
				168,
				164,
				168,
				163,
				167,
				163,
				172,
				167,
				172,
				163,
				165,
				168,
				170,
				169,
				170,
				168,
				167,
				167,
				171,
				170,
				171,
				167,
				172,
				174,
				169,
				170,
				169,
				174,
				173,
				176,
				173,
				174,
				173,
				176,
				175,
				171,
				174,
				170,
				174,
				171,
				176,
				166,
				162,
				161,
				162,
				166,
				177,
				179,
				178,
				292,
				284,
				179,
				292,
				180,
				179,
				284,
				179,
				180,
				184,
				181,
				183,
				188,
				183,
				181,
				182,
				187,
				188,
				186,
				188,
				187,
				181,
				182,
				190,
				189,
				190,
				182,
				181,
				181,
				191,
				190,
				191,
				181,
				187,
				192,
				188,
				183,
				188,
				192,
				193,
				193,
				186,
				188,
				186,
				193,
				194,
				231,
				193,
				192,
				193,
				231,
				196,
				196,
				194,
				193,
				194,
				196,
				195,
				203,
				216,
				199,
				216,
				214,
				199,
				215,
				253,
				329,
				253,
				332,
				329,
				215,
				343,
				253,
				197,
				200,
				217,
				200,
				343,
				217,
				203,
				201,
				216,
				201,
				220,
				216,
				198,
				199,
				213,
				199,
				214,
				213,
				209,
				206,
				197,
				206,
				198,
				197,
				205,
				206,
				204,
				206,
				209,
				204,
				212,
				211,
				207,
				211,
				208,
				207,
				208,
				206,
				207,
				206,
				205,
				207,
				211,
				218,
				203,
				218,
				201,
				203,
				208,
				211,
				199,
				211,
				203,
				199,
				206,
				208,
				198,
				208,
				199,
				198,
				212,
				221,
				211,
				221,
				218,
				211,
				198,
				213,
				197,
				213,
				200,
				197,
				218,
				219,
				201,
				219,
				202,
				201,
				221,
				222,
				218,
				222,
				219,
				218,
				200,
				194,
				195,
				194,
				200,
				213,
				214,
				194,
				213,
				194,
				214,
				186,
				216,
				186,
				214,
				186,
				216,
				187,
				187,
				224,
				191,
				224,
				187,
				216,
				225,
				224,
				220,
				220,
				224,
				216,
				202,
				345,
				201,
				202,
				223,
				345,
				227,
				191,
				224,
				191,
				227,
				185,
				225,
				227,
				224,
				227,
				225,
				176,
				175,
				225,
				226,
				225,
				175,
				176,
				185,
				190,
				191,
				190,
				185,
				184,
				184,
				189,
				190,
				189,
				184,
				180,
				227,
				171,
				172,
				171,
				227,
				176,
				228,
				185,
				227,
				330,
				332,
				324,
				332,
				253,
				324,
				223,
				226,
				345,
				252,
				231,
				230,
				231,
				252,
				196,
				230,
				233,
				232,
				233,
				230,
				231,
				234,
				233,
				235,
				233,
				234,
				232,
				243,
				241,
				242,
				241,
				243,
				320,
				244,
				320,
				243,
				320,
				244,
				321,
				246,
				248,
				245,
				248,
				246,
				247,
				235,
				240,
				234,
				305,
				242,
				241,
				242,
				305,
				249,
				305,
				251,
				249,
				251,
				305,
				250,
				253,
				343,
				195,
				172,
				165,
				228,
				227,
				172,
				228,
				201,
				345,
				220,
				196,
				229,
				324,
				229,
				196,
				252,
				254,
				263,
				264,
				263,
				254,
				255,
				266,
				256,
				257,
				256,
				266,
				265,
				258,
				266,
				257,
				266,
				258,
				267,
				259,
				269,
				268,
				269,
				259,
				260,
				260,
				270,
				269,
				270,
				260,
				261,
				305,
				241,
				341,
				272,
				255,
				254,
				255,
				272,
				273,
				257,
				274,
				275,
				274,
				257,
				256,
				276,
				257,
				275,
				257,
				276,
				258,
				278,
				259,
				277,
				259,
				278,
				260,
				272,
				281,
				273,
				262,
				280,
				334,
				280,
				333,
				334,
				289,
				271,
				335,
				271,
				336,
				335,
				255,
				265,
				263,
				265,
				255,
				256,
				273,
				256,
				255,
				256,
				273,
				274,
				268,
				258,
				259,
				258,
				268,
				267,
				259,
				276,
				277,
				276,
				259,
				258,
				334,
				333,
				254,
				333,
				272,
				254,
				262,
				334,
				271,
				334,
				336,
				271,
				263,
				283,
				264,
				283,
				263,
				282,
				266,
				292,
				265,
				292,
				266,
				284,
				267,
				284,
				266,
				284,
				267,
				285,
				269,
				286,
				268,
				286,
				269,
				287,
				270,
				287,
				269,
				287,
				270,
				288,
				334,
				254,
				336,
				254,
				264,
				336,
				289,
				294,
				339,
				294,
				341,
				339,
				265,
				282,
				263,
				282,
				265,
				292,
				268,
				285,
				267,
				285,
				268,
				286,
				291,
				292,
				290,
				292,
				291,
				282,
				293,
				282,
				291,
				282,
				293,
				283,
				339,
				341,
				288,
				341,
				308,
				288,
				308,
				341,
				241,
				296,
				290,
				295,
				290,
				296,
				291,
				297,
				291,
				296,
				291,
				297,
				293,
				298,
				301,
				304,
				301,
				298,
				299,
				341,
				304,
				305,
				304,
				341,
				298,
				299,
				306,
				301,
				306,
				299,
				300,
				302,
				304,
				301,
				304,
				302,
				303,
				303,
				305,
				304,
				305,
				303,
				250,
				306,
				302,
				301,
				302,
				306,
				307,
				238,
				303,
				239,
				250,
				303,
				238,
				237,
				302,
				307,
				302,
				237,
				236,
				288,
				309,
				287,
				309,
				288,
				308,
				310,
				287,
				309,
				287,
				310,
				286,
				311,
				286,
				310,
				286,
				311,
				285,
				180,
				285,
				311,
				285,
				180,
				284,
				311,
				189,
				180,
				189,
				311,
				312,
				313,
				183,
				182,
				183,
				313,
				314,
				312,
				182,
				189,
				182,
				312,
				313,
				314,
				192,
				183,
				192,
				314,
				315,
				192,
				233,
				231,
				233,
				192,
				315,
				310,
				312,
				311,
				312,
				310,
				316,
				319,
				314,
				313,
				314,
				319,
				317,
				316,
				313,
				312,
				313,
				316,
				319,
				317,
				315,
				314,
				315,
				317,
				318,
				315,
				235,
				233,
				235,
				315,
				318,
				309,
				316,
				310,
				316,
				309,
				320,
				321,
				317,
				319,
				317,
				321,
				246,
				320,
				319,
				316,
				319,
				320,
				321,
				246,
				318,
				317,
				318,
				246,
				245,
				318,
				240,
				235,
				240,
				318,
				245,
				308,
				320,
				309,
				320,
				308,
				241,
				261,
				278,
				279,
				278,
				261,
				260,
				347,
				346,
				178,
				321,
				247,
				246,
				247,
				321,
				244,
				302,
				239,
				303,
				239,
				302,
				236,
				250,
				238,
				251,
				197,
				217,
				209,
				217,
				322,
				209,
				196,
				253,
				195,
				253,
				196,
				324,
				225,
				220,
				345,
				345,
				226,
				225,
				281,
				274,
				273,
				299,
				297,
				300,
				297,
				299,
				293,
				299,
				342,
				293,
				283,
				293,
				335,
				293,
				342,
				335,
				335,
				336,
				283,
				336,
				264,
				283,
				288,
				270,
				339,
				270,
				337,
				339,
				337,
				270,
				338,
				270,
				261,
				338,
				340,
				338,
				279,
				338,
				261,
				279,
				339,
				337,
				289,
				337,
				271,
				289,
				271,
				337,
				262,
				337,
				338,
				262,
				280,
				262,
				340,
				262,
				338,
				340,
				299,
				298,
				342,
				294,
				298,
				341,
				294,
				342,
				298,
				335,
				342,
				289,
				342,
				294,
				289,
				195,
				343,
				200,
				245,
				248,
				240,
				204,
				209,
				325,
				209,
				322,
				325,
				331,
				330,
				229,
				330,
				324,
				229,
				346,
				163,
				162,
				163,
				346,
				165,
				177,
				346,
				162,
				346,
				177,
				178,
				178,
				179,
				347,
				184,
				347,
				179,
				347,
				184,
				185,
				326,
				217,
				215,
				217,
				343,
				215,
				323,
				322,
				326,
				322,
				217,
				326,
				326,
				215,
				344,
				215,
				329,
				344,
				344,
				328,
				326,
				328,
				323,
				326,
				328,
				327,
				323,
				327,
				210,
				323,
				185,
				228,
				347,
				165,
				347,
				228,
				347,
				165,
				346,
				323,
				210,
				322,
				210,
				325,
				322
			],
			"featurePoint": [
				243,
				247,
				240,
				234,
				230,
				252,
				229,
				331,
				56,
				78,
				57,
				61,
				66,
				73,
				69,
				128,
				155,
				156,
				119,
				308,
				341,
				342,
				293,
				278,
				280,
				281,
				276,
				-1,
				104,
				106,
				107,
				102,
				-1,
				295,
				178,
				347,
				227,
				175,
				54,
				160,
				10,
				166,
				170,
				4,
				206,
				220,
				345,
				223,
				158,
				50,
				37,
				157,
				46,
				329,
				215,
				343,
				210,
				327,
				41,
				51,
				222,
				221,
				164,
				340,
				333,
				275,
				277,
				154,
				147,
				101,
				103,
				68,
				77,
				64,
				63,
				237,
				236,
				238,
				251,
				242
			],
			"weight": [
				[
					[
						62,
						184
					],
					[
						41,
						158.7
					],
					[
						40,
						43.28
					],
					[
						39,
						31.58
					]
				],
				[
					[
						62,
						558.3
					],
					[
						43,
						150.3
					],
					[
						41,
						56.34
					],
					[
						37,
						34.13
					]
				],
				[
					[
						39,
						119.9
					],
					[
						40,
						82.75
					],
					[
						38,
						64.52
					],
					[
						43,
						42.93
					]
				],
				[
					[
						43,
						756.6
					],
					[
						62,
						115.9
					],
					[
						41,
						17.22
					],
					[
						40,
						7.316
					]
				],
				[
					[
						43,
						1
					]
				],
				[
					[
						43,
						246.7
					],
					[
						38,
						143.8
					],
					[
						37,
						115.5
					],
					[
						39,
						57.39
					]
				],
				[
					[
						38,
						118.9
					],
					[
						43,
						99.01
					],
					[
						39,
						53
					],
					[
						37,
						41.37
					]
				],
				[
					[
						43,
						839.8
					],
					[
						37,
						453
					],
					[
						42,
						223.5
					],
					[
						47,
						49.15
					]
				],
				[
					[
						37,
						905.4
					],
					[
						43,
						143.9
					],
					[
						48,
						63.22
					],
					[
						38,
						52.32
					]
				],
				[
					[
						41,
						464.3
					],
					[
						40,
						160.7
					],
					[
						39,
						15.67
					],
					[
						43,
						9.369
					]
				],
				[
					[
						40,
						1
					]
				],
				[
					[
						40,
						332.5
					],
					[
						39,
						186.3
					],
					[
						38,
						59.87
					],
					[
						69,
						25.53
					]
				],
				[
					[
						39,
						50.42
					],
					[
						31,
						24.74
					],
					[
						69,
						19.57
					],
					[
						70,
						16.07
					]
				],
				[
					[
						38,
						45.31
					],
					[
						49,
						22.26
					],
					[
						50,
						21.84
					],
					[
						59,
						13.52
					]
				],
				[
					[
						38,
						17.02
					],
					[
						39,
						16.53
					],
					[
						10,
						10.43
					],
					[
						50,
						8.543
					]
				],
				[
					[
						10,
						20.79
					],
					[
						50,
						14.13
					],
					[
						38,
						12.65
					],
					[
						11,
						11.65
					]
				],
				[
					[
						39,
						338.8
					],
					[
						31,
						11.48
					],
					[
						69,
						9.669
					],
					[
						50,
						9.088
					]
				],
				[
					[
						38,
						851
					],
					[
						39,
						697.8
					],
					[
						40,
						49.17
					],
					[
						69,
						8.808
					]
				],
				[
					[
						50,
						157.2
					],
					[
						38,
						34.37
					],
					[
						39,
						24.82
					],
					[
						40,
						9.086
					]
				],
				[
					[
						38,
						70.14
					],
					[
						49,
						54.62
					],
					[
						50,
						53.21
					],
					[
						59,
						28.42
					]
				],
				[
					[
						50,
						44.94
					],
					[
						38,
						24.04
					],
					[
						39,
						18.3
					],
					[
						10,
						12.93
					]
				],
				[
					[
						39,
						36.03
					],
					[
						31,
						13.92
					],
					[
						70,
						10.73
					],
					[
						69,
						10.72
					]
				],
				[
					[
						38,
						84.13
					],
					[
						39,
						79.85
					],
					[
						50,
						13.43
					],
					[
						31,
						6.565
					]
				],
				[
					[
						38,
						280.5
					],
					[
						49,
						54.27
					],
					[
						50,
						24.47
					],
					[
						59,
						20.83
					]
				],
				[
					[
						10,
						39.47
					],
					[
						11,
						19.77
					],
					[
						50,
						17.42
					],
					[
						51,
						10.38
					]
				],
				[
					[
						50,
						61.07
					],
					[
						9,
						21.18
					],
					[
						10,
						18.19
					],
					[
						39,
						9.052
					]
				],
				[
					[
						50,
						324.2
					],
					[
						9,
						18.34
					],
					[
						10,
						5.692
					]
				],
				[
					[
						50,
						164.9
					],
					[
						51,
						146.3
					],
					[
						52,
						37.55
					],
					[
						9,
						17.92
					]
				],
				[
					[
						9,
						86.53
					],
					[
						50,
						50.32
					],
					[
						51,
						47.4
					],
					[
						52,
						23.34
					]
				],
				[
					[
						50,
						3628
					],
					[
						51,
						126.5
					],
					[
						58,
						54.83
					],
					[
						52,
						43.88
					]
				],
				[
					[
						50,
						6770
					],
					[
						9,
						5.144
					]
				],
				[
					[
						50,
						1592
					],
					[
						59,
						67.65
					],
					[
						51,
						51.61
					],
					[
						49,
						49.06
					]
				],
				[
					[
						50,
						683.2
					],
					[
						51,
						268.7
					],
					[
						52,
						56.81
					],
					[
						58,
						49.07
					]
				],
				[
					[
						49,
						1559
					],
					[
						59,
						564
					],
					[
						48,
						562.4
					],
					[
						47,
						133.9
					]
				],
				[
					[
						50,
						244.7
					],
					[
						59,
						115.9
					],
					[
						49,
						85.91
					],
					[
						48,
						42.91
					]
				],
				[
					[
						50,
						5075
					],
					[
						51,
						120.3
					],
					[
						58,
						102.4
					],
					[
						59,
						60.96
					]
				],
				[
					[
						50,
						13370
					],
					[
						58,
						86.03
					],
					[
						59,
						76.08
					],
					[
						52,
						53.01
					]
				],
				[
					[
						50,
						1
					]
				],
				[
					[
						50,
						4740
					],
					[
						59,
						85.95
					],
					[
						51,
						72.88
					],
					[
						58,
						53.88
					]
				],
				[
					[
						50,
						3880
					],
					[
						59,
						69.03
					],
					[
						51,
						63.63
					],
					[
						58,
						42.67
					]
				],
				[
					[
						50,
						7868
					],
					[
						51,
						61.81
					],
					[
						58,
						18.79
					]
				],
				[
					[
						58,
						1
					]
				],
				[
					[
						50,
						380.8
					],
					[
						59,
						146.8
					],
					[
						49,
						42.51
					],
					[
						48,
						13.54
					]
				],
				[
					[
						50,
						491.6
					],
					[
						59,
						159
					],
					[
						49,
						23.3
					],
					[
						51,
						17.33
					]
				],
				[
					[
						50,
						1286
					],
					[
						9,
						12.43
					],
					[
						10,
						3.562
					]
				],
				[
					[
						50,
						562.7
					],
					[
						49,
						74.11
					],
					[
						59,
						63.94
					],
					[
						48,
						33.98
					]
				],
				[
					[
						52,
						1
					]
				],
				[
					[
						49,
						198
					],
					[
						50,
						177.2
					],
					[
						38,
						58.81
					],
					[
						51,
						31.06
					]
				],
				[
					[
						51,
						1491
					],
					[
						52,
						262.1
					],
					[
						58,
						251.7
					],
					[
						50,
						225.1
					]
				],
				[
					[
						59,
						1794
					],
					[
						49,
						476.4
					],
					[
						48,
						228.4
					],
					[
						47,
						51.81
					]
				],
				[
					[
						49,
						1
					]
				],
				[
					[
						59,
						1
					]
				],
				[
					[
						38,
						427.1
					],
					[
						49,
						96.32
					],
					[
						48,
						32.64
					],
					[
						50,
						24.41
					]
				],
				[
					[
						48,
						358.3
					],
					[
						49,
						237.6
					],
					[
						37,
						234.6
					],
					[
						38,
						112.6
					]
				],
				[
					[
						38,
						1
					]
				],
				[
					[
						39,
						1386
					],
					[
						38,
						1333
					],
					[
						37,
						16.79
					],
					[
						43,
						14.61
					]
				],
				[
					[
						8,
						1
					]
				],
				[
					[
						10,
						1
					]
				],
				[
					[
						10,
						163.2
					],
					[
						11,
						25.02
					],
					[
						50,
						12.97
					],
					[
						51,
						9.276
					]
				],
				[
					[
						10,
						147.6
					],
					[
						11,
						62.76
					],
					[
						12,
						0.07065
					]
				],
				[
					[
						10,
						76.51
					],
					[
						11,
						67.21
					],
					[
						12,
						14.61
					],
					[
						50,
						8.035
					]
				],
				[
					[
						11,
						1
					]
				],
				[
					[
						11,
						226.6
					],
					[
						12,
						38.44
					],
					[
						10,
						18.73
					],
					[
						13,
						5.036
					]
				],
				[
					[
						74,
						1
					]
				],
				[
					[
						73,
						1
					]
				],
				[
					[
						73,
						50.21
					],
					[
						74,
						46.26
					],
					[
						75,
						4.941
					]
				],
				[
					[
						12,
						1
					]
				],
				[
					[
						15,
						57.47
					],
					[
						71,
						13.05
					],
					[
						14,
						7.937
					],
					[
						72,
						2.027
					]
				],
				[
					[
						71,
						1
					]
				],
				[
					[
						14,
						1
					]
				],
				[
					[
						13,
						184
					],
					[
						14,
						116.3
					],
					[
						71,
						5.152
					]
				],
				[
					[
						12,
						154.6
					],
					[
						13,
						32.12
					],
					[
						14,
						6.246
					],
					[
						71,
						2.37
					]
				],
				[
					[
						12,
						56.21
					],
					[
						13,
						49.02
					],
					[
						14,
						8.312
					],
					[
						15,
						3.74
					]
				],
				[
					[
						13,
						1
					]
				],
				[
					[
						13,
						151.3
					],
					[
						12,
						75.93
					]
				],
				[
					[
						72,
						67.56
					],
					[
						71,
						56.41
					],
					[
						14,
						7.653
					]
				],
				[
					[
						73,
						119
					],
					[
						72,
						43.72
					],
					[
						74,
						5.3
					],
					[
						16,
						4.685
					]
				],
				[
					[
						72,
						1
					]
				],
				[
					[
						9,
						1
					]
				],
				[
					[
						52,
						439.2
					],
					[
						51,
						182.1
					],
					[
						8,
						39.39
					]
				],
				[
					[
						30,
						672.2
					],
					[
						68,
						442.2
					],
					[
						29,
						83.68
					],
					[
						67,
						22.39
					]
				],
				[
					[
						30,
						738.8
					],
					[
						18,
						14.14
					],
					[
						40,
						13.62
					],
					[
						33,
						12.56
					]
				],
				[
					[
						30,
						628.6
					],
					[
						69,
						242.5
					],
					[
						31,
						82.59
					],
					[
						40,
						17.77
					]
				],
				[
					[
						69,
						1482
					],
					[
						31,
						414.6
					],
					[
						40,
						17.36
					],
					[
						39,
						14.24
					]
				],
				[
					[
						31,
						1568
					],
					[
						40,
						15.04
					],
					[
						39,
						12.71
					],
					[
						38,
						8.022
					]
				],
				[
					[
						70,
						2769
					],
					[
						40,
						8.129
					],
					[
						39,
						6.942
					],
					[
						38,
						4.922
					]
				],
				[
					[
						28,
						4001
					],
					[
						15,
						36.53
					],
					[
						14,
						1.09
					],
					[
						13,
						0.6092
					]
				],
				[
					[
						28,
						1364
					],
					[
						67,
						290.9
					],
					[
						29,
						62.2
					],
					[
						15,
						40.86
					]
				],
				[
					[
						29,
						5556
					],
					[
						16,
						27.28
					],
					[
						17,
						25.24
					],
					[
						15,
						13.55
					]
				],
				[
					[
						30,
						233.4
					],
					[
						18,
						23.35
					],
					[
						33,
						20.86
					],
					[
						40,
						12.55
					]
				],
				[
					[
						30,
						177.5
					],
					[
						68,
						139.3
					],
					[
						29,
						43.6
					],
					[
						18,
						36.5
					]
				],
				[
					[
						30,
						205.6
					],
					[
						69,
						109.9
					],
					[
						40,
						29.63
					],
					[
						33,
						22.63
					]
				],
				[
					[
						69,
						343.6
					],
					[
						31,
						169.2
					],
					[
						40,
						23.97
					],
					[
						39,
						19.34
					]
				],
				[
					[
						31,
						365.1
					],
					[
						40,
						18.58
					],
					[
						39,
						15.35
					],
					[
						38,
						9.125
					]
				],
				[
					[
						70,
						525.1
					],
					[
						40,
						8.493
					],
					[
						39,
						7.091
					],
					[
						38,
						5.1
					]
				],
				[
					[
						28,
						730.1
					],
					[
						15,
						30.19
					],
					[
						14,
						1.626
					],
					[
						13,
						1.051
					]
				],
				[
					[
						28,
						503.6
					],
					[
						67,
						157.3
					],
					[
						15,
						45.13
					],
					[
						29,
						28.51
					]
				],
				[
					[
						29,
						717.5
					],
					[
						17,
						12.05
					],
					[
						16,
						3.677
					]
				],
				[
					[
						30,
						2227
					],
					[
						68,
						636
					],
					[
						69,
						126.5
					],
					[
						29,
						76.08
					]
				],
				[
					[
						30,
						3716
					],
					[
						40,
						11.69
					],
					[
						18,
						10.11
					],
					[
						33,
						8.918
					]
				],
				[
					[
						30,
						4170
					],
					[
						69,
						468.2
					]
				],
				[
					[
						69,
						1
					]
				],
				[
					[
						31,
						1
					]
				],
				[
					[
						70,
						1
					]
				],
				[
					[
						28,
						1
					]
				],
				[
					[
						28,
						1804
					],
					[
						67,
						575.3
					],
					[
						70,
						147.7
					],
					[
						29,
						76.77
					]
				],
				[
					[
						29,
						1
					]
				],
				[
					[
						30,
						1
					]
				],
				[
					[
						30,
						65.13
					],
					[
						33,
						44.86
					],
					[
						18,
						44.37
					],
					[
						40,
						23.44
					]
				],
				[
					[
						18,
						144
					],
					[
						68,
						60.64
					],
					[
						30,
						59.33
					],
					[
						17,
						37.54
					]
				],
				[
					[
						69,
						82.91
					],
					[
						31,
						55.57
					],
					[
						40,
						50.23
					],
					[
						39,
						38.26
					]
				],
				[
					[
						31,
						107.9
					],
					[
						70,
						57.8
					],
					[
						40,
						19.31
					],
					[
						39,
						17.72
					]
				],
				[
					[
						70,
						142.7
					],
					[
						28,
						65.78
					],
					[
						39,
						7.242
					],
					[
						38,
						5.246
					]
				],
				[
					[
						28,
						193.4
					],
					[
						15,
						25.33
					],
					[
						14,
						2.735
					],
					[
						13,
						1.962
					]
				],
				[
					[
						15,
						210.7
					],
					[
						28,
						139.8
					],
					[
						16,
						88.22
					],
					[
						67,
						77.02
					]
				],
				[
					[
						29,
						89.62
					],
					[
						17,
						68.01
					],
					[
						16,
						30.75
					]
				],
				[
					[
						33,
						650.3
					],
					[
						41,
						82.11
					],
					[
						40,
						28.89
					],
					[
						18,
						25.76
					]
				],
				[
					[
						33,
						152
					],
					[
						18,
						68.23
					],
					[
						30,
						33.93
					],
					[
						22,
						24.29
					]
				],
				[
					[
						40,
						119.6
					],
					[
						33,
						84.5
					],
					[
						30,
						51.05
					],
					[
						41,
						42.7
					]
				],
				[
					[
						18,
						1
					]
				],
				[
					[
						16,
						136.1
					],
					[
						17,
						131.1
					],
					[
						29,
						14.51
					],
					[
						18,
						3.31
					]
				],
				[
					[
						16,
						100.5
					],
					[
						17,
						92.21
					],
					[
						18,
						17.43
					],
					[
						22,
						4.217
					]
				],
				[
					[
						17,
						136.9
					],
					[
						18,
						80.51
					],
					[
						22,
						15.72
					],
					[
						33,
						6.78
					]
				],
				[
					[
						17,
						29.13
					],
					[
						18,
						21.46
					],
					[
						74,
						7.012
					],
					[
						22,
						6.236
					]
				],
				[
					[
						74,
						32.09
					],
					[
						75,
						20.99
					],
					[
						17,
						5.49
					],
					[
						16,
						4.379
					]
				],
				[
					[
						73,
						19.22
					],
					[
						74,
						9.23
					],
					[
						16,
						8.482
					],
					[
						17,
						6.315
					]
				],
				[
					[
						16,
						41.75
					],
					[
						17,
						26.85
					],
					[
						18,
						7.102
					],
					[
						74,
						3.922
					]
				],
				[
					[
						72,
						26.93
					],
					[
						73,
						17.26
					],
					[
						16,
						12.87
					],
					[
						15,
						11.61
					]
				],
				[
					[
						15,
						1
					]
				],
				[
					[
						28,
						65.42
					],
					[
						15,
						33.66
					],
					[
						14,
						5.02
					],
					[
						13,
						3.811
					]
				],
				[
					[
						70,
						45.03
					],
					[
						28,
						26.91
					],
					[
						39,
						8.098
					],
					[
						38,
						5.866
					]
				],
				[
					[
						31,
						34.1
					],
					[
						70,
						24.58
					],
					[
						39,
						23.63
					],
					[
						38,
						16.51
					]
				],
				[
					[
						39,
						19.17
					],
					[
						31,
						16.51
					],
					[
						70,
						13.38
					],
					[
						69,
						10.75
					]
				],
				[
					[
						38,
						10.55
					],
					[
						39,
						10.29
					],
					[
						10,
						9.715
					],
					[
						11,
						9.151
					]
				],
				[
					[
						11,
						15.44
					],
					[
						10,
						15.18
					],
					[
						50,
						7.649
					],
					[
						38,
						6.846
					]
				],
				[
					[
						11,
						28.35
					],
					[
						10,
						25.74
					],
					[
						50,
						9.188
					],
					[
						9,
						6.444
					]
				],
				[
					[
						70,
						20.92
					],
					[
						28,
						13.79
					],
					[
						39,
						6.789
					],
					[
						11,
						6.495
					]
				],
				[
					[
						11,
						24.98
					],
					[
						12,
						16.47
					],
					[
						13,
						8.03
					],
					[
						70,
						5.781
					]
				],
				[
					[
						11,
						50.4
					],
					[
						12,
						30.11
					],
					[
						13,
						7.763
					],
					[
						70,
						3.504
					]
				],
				[
					[
						11,
						12.92
					],
					[
						70,
						10.27
					],
					[
						12,
						8.98
					],
					[
						28,
						7.119
					]
				],
				[
					[
						14,
						22.24
					],
					[
						13,
						17.59
					],
					[
						15,
						16.86
					],
					[
						28,
						16.13
					]
				],
				[
					[
						13,
						42.82
					],
					[
						12,
						24.23
					],
					[
						15,
						7.239
					],
					[
						28,
						6.94
					]
				],
				[
					[
						51,
						636.9
					],
					[
						58,
						412.8
					],
					[
						50,
						266.2
					],
					[
						57,
						65.79
					]
				],
				[
					[
						58,
						4593
					],
					[
						52,
						360.4
					],
					[
						57,
						86.44
					],
					[
						51,
						3.833
					]
				],
				[
					[
						8,
						169.2
					],
					[
						52,
						98.13
					],
					[
						51,
						62.62
					],
					[
						58,
						35.32
					]
				],
				[
					[
						58,
						377.1
					],
					[
						51,
						369.5
					],
					[
						50,
						283.8
					],
					[
						59,
						23.78
					]
				],
				[
					[
						52,
						1581
					],
					[
						58,
						819.4
					],
					[
						57,
						117.6
					],
					[
						53,
						86.07
					]
				],
				[
					[
						68,
						1
					]
				],
				[
					[
						68,
						6332
					],
					[
						29,
						391.4
					],
					[
						17,
						31.42
					],
					[
						18,
						18.21
					]
				],
				[
					[
						17,
						164.9
					],
					[
						68,
						109.1
					],
					[
						29,
						76.73
					],
					[
						18,
						61.92
					]
				],
				[
					[
						68,
						660.1
					],
					[
						29,
						142.7
					],
					[
						17,
						24.57
					],
					[
						18,
						5.212
					]
				],
				[
					[
						67,
						1119
					],
					[
						16,
						40.29
					],
					[
						15,
						0.9378
					]
				],
				[
					[
						67,
						6126
					],
					[
						29,
						229.4
					],
					[
						16,
						51.4
					],
					[
						15,
						26.51
					]
				],
				[
					[
						16,
						268.6
					],
					[
						67,
						153.2
					],
					[
						29,
						64.58
					],
					[
						28,
						55.78
					]
				],
				[
					[
						67,
						1
					]
				],
				[
					[
						16,
						1
					]
				],
				[
					[
						17,
						1
					]
				],
				[
					[
						51,
						1
					]
				],
				[
					[
						48,
						1
					]
				],
				[
					[
						40,
						245.5
					],
					[
						39,
						138.6
					],
					[
						38,
						38.05
					],
					[
						62,
						29.68
					]
				],
				[
					[
						39,
						1
					]
				],
				[
					[
						62,
						306.8
					],
					[
						41,
						157.2
					],
					[
						33,
						1.602
					]
				],
				[
					[
						62,
						184
					],
					[
						41,
						158.7
					],
					[
						34,
						43.28
					],
					[
						35,
						31.58
					]
				],
				[
					[
						62,
						558.3
					],
					[
						42,
						150.3
					],
					[
						41,
						56.34
					],
					[
						37,
						34.13
					]
				],
				[
					[
						62,
						1
					]
				],
				[
					[
						35,
						119.9
					],
					[
						34,
						82.75
					],
					[
						36,
						64.52
					],
					[
						42,
						42.93
					]
				],
				[
					[
						41,
						1
					]
				],
				[
					[
						42,
						756.6
					],
					[
						62,
						115.9
					],
					[
						41,
						17.22
					],
					[
						34,
						7.316
					]
				],
				[
					[
						62,
						397.1
					],
					[
						43,
						322.5
					],
					[
						42,
						322.5
					],
					[
						37,
						82.95
					]
				],
				[
					[
						43,
						663.5
					],
					[
						42,
						663.5
					],
					[
						37,
						139.9
					],
					[
						62,
						54.53
					]
				],
				[
					[
						42,
						1
					]
				],
				[
					[
						42,
						246.7
					],
					[
						36,
						143.8
					],
					[
						37,
						115.5
					],
					[
						35,
						57.39
					]
				],
				[
					[
						36,
						118.9
					],
					[
						42,
						99.01
					],
					[
						35,
						53
					],
					[
						37,
						41.37
					]
				],
				[
					[
						37,
						963.4
					],
					[
						43,
						319.5
					],
					[
						42,
						319.5
					]
				],
				[
					[
						42,
						839.8
					],
					[
						37,
						453
					],
					[
						43,
						223.5
					],
					[
						47,
						49.15
					]
				],
				[
					[
						37,
						1
					]
				],
				[
					[
						37,
						905.4
					],
					[
						42,
						143.9
					],
					[
						46,
						63.22
					],
					[
						36,
						52.32
					]
				],
				[
					[
						41,
						464.3
					],
					[
						34,
						160.7
					],
					[
						35,
						15.67
					],
					[
						42,
						9.369
					]
				],
				[
					[
						34,
						1
					]
				],
				[
					[
						34,
						332.5
					],
					[
						35,
						186.3
					],
					[
						36,
						59.87
					],
					[
						65,
						25.53
					]
				],
				[
					[
						35,
						50.42
					],
					[
						26,
						24.74
					],
					[
						65,
						19.57
					],
					[
						66,
						16.07
					]
				],
				[
					[
						36,
						45.31
					],
					[
						45,
						22.26
					],
					[
						44,
						21.84
					],
					[
						61,
						13.52
					]
				],
				[
					[
						36,
						17.02
					],
					[
						35,
						16.53
					],
					[
						4,
						10.43
					],
					[
						44,
						8.543
					]
				],
				[
					[
						4,
						20.79
					],
					[
						44,
						14.13
					],
					[
						36,
						12.65
					],
					[
						3,
						11.65
					]
				],
				[
					[
						35,
						338.8
					],
					[
						26,
						11.48
					],
					[
						65,
						9.669
					],
					[
						44,
						9.088
					]
				],
				[
					[
						36,
						851
					],
					[
						35,
						697.8
					],
					[
						34,
						49.17
					],
					[
						65,
						8.808
					]
				],
				[
					[
						44,
						157.2
					],
					[
						36,
						34.37
					],
					[
						35,
						24.82
					],
					[
						34,
						9.086
					]
				],
				[
					[
						36,
						70.14
					],
					[
						45,
						54.62
					],
					[
						44,
						53.21
					],
					[
						61,
						28.42
					]
				],
				[
					[
						44,
						44.94
					],
					[
						36,
						24.04
					],
					[
						35,
						18.3
					],
					[
						4,
						12.93
					]
				],
				[
					[
						35,
						36.03
					],
					[
						26,
						13.92
					],
					[
						66,
						10.73
					],
					[
						65,
						10.72
					]
				],
				[
					[
						36,
						84.13
					],
					[
						35,
						79.85
					],
					[
						44,
						13.43
					],
					[
						26,
						6.565
					]
				],
				[
					[
						36,
						280.5
					],
					[
						45,
						54.27
					],
					[
						44,
						24.47
					],
					[
						61,
						20.83
					]
				],
				[
					[
						4,
						39.47
					],
					[
						3,
						19.77
					],
					[
						44,
						17.42
					],
					[
						55,
						10.38
					]
				],
				[
					[
						44,
						61.07
					],
					[
						5,
						21.18
					],
					[
						4,
						18.19
					],
					[
						35,
						9.052
					]
				],
				[
					[
						44,
						324.2
					],
					[
						5,
						18.34
					],
					[
						4,
						5.692
					]
				],
				[
					[
						44,
						164.9
					],
					[
						55,
						146.3
					],
					[
						54,
						37.55
					],
					[
						5,
						17.92
					]
				],
				[
					[
						5,
						86.53
					],
					[
						44,
						50.32
					],
					[
						55,
						47.4
					],
					[
						54,
						23.34
					]
				],
				[
					[
						44,
						3628
					],
					[
						55,
						126.5
					],
					[
						56,
						54.83
					],
					[
						54,
						43.88
					]
				],
				[
					[
						44,
						6770
					],
					[
						5,
						5.144
					]
				],
				[
					[
						44,
						1592
					],
					[
						61,
						67.65
					],
					[
						55,
						51.61
					],
					[
						45,
						49.06
					]
				],
				[
					[
						44,
						683.2
					],
					[
						55,
						268.7
					],
					[
						54,
						56.81
					],
					[
						56,
						49.07
					]
				],
				[
					[
						45,
						1559
					],
					[
						61,
						564
					],
					[
						46,
						562.4
					],
					[
						47,
						133.9
					]
				],
				[
					[
						47,
						2584
					],
					[
						60,
						696.4
					],
					[
						61,
						83.05
					],
					[
						59,
						83.05
					]
				],
				[
					[
						44,
						244.7
					],
					[
						61,
						115.9
					],
					[
						45,
						85.91
					],
					[
						46,
						42.91
					]
				],
				[
					[
						44,
						5075
					],
					[
						55,
						120.3
					],
					[
						56,
						102.4
					],
					[
						61,
						60.96
					]
				],
				[
					[
						44,
						13370
					],
					[
						56,
						86.03
					],
					[
						61,
						76.08
					],
					[
						54,
						53.01
					]
				],
				[
					[
						44,
						1
					]
				],
				[
					[
						44,
						4740
					],
					[
						61,
						85.95
					],
					[
						55,
						72.88
					],
					[
						56,
						53.88
					]
				],
				[
					[
						44,
						3880
					],
					[
						61,
						69.03
					],
					[
						55,
						63.63
					],
					[
						56,
						42.67
					]
				],
				[
					[
						44,
						7868
					],
					[
						55,
						61.81
					],
					[
						56,
						18.79
					]
				],
				[
					[
						56,
						1
					]
				],
				[
					[
						44,
						380.8
					],
					[
						61,
						146.8
					],
					[
						45,
						42.51
					],
					[
						46,
						13.54
					]
				],
				[
					[
						44,
						491.6
					],
					[
						61,
						159
					],
					[
						45,
						23.3
					],
					[
						55,
						17.33
					]
				],
				[
					[
						44,
						1286
					],
					[
						5,
						12.43
					],
					[
						4,
						3.562
					]
				],
				[
					[
						44,
						562.7
					],
					[
						45,
						74.11
					],
					[
						61,
						63.94
					],
					[
						46,
						33.98
					]
				],
				[
					[
						54,
						1
					]
				],
				[
					[
						45,
						198
					],
					[
						44,
						177.2
					],
					[
						36,
						58.81
					],
					[
						55,
						31.06
					]
				],
				[
					[
						55,
						1491
					],
					[
						54,
						262.1
					],
					[
						56,
						251.7
					],
					[
						44,
						225.1
					]
				],
				[
					[
						61,
						1794
					],
					[
						45,
						476.4
					],
					[
						46,
						228.4
					],
					[
						47,
						51.81
					]
				],
				[
					[
						60,
						1845
					],
					[
						47,
						808.2
					],
					[
						48,
						204.3
					],
					[
						46,
						204.3
					]
				],
				[
					[
						45,
						1
					]
				],
				[
					[
						61,
						1
					]
				],
				[
					[
						60,
						1
					]
				],
				[
					[
						47,
						1
					]
				],
				[
					[
						36,
						427.1
					],
					[
						45,
						96.32
					],
					[
						46,
						32.64
					],
					[
						44,
						24.41
					]
				],
				[
					[
						46,
						358.3
					],
					[
						45,
						237.6
					],
					[
						37,
						234.6
					],
					[
						36,
						112.6
					]
				],
				[
					[
						37,
						784.6
					],
					[
						47,
						422.1
					],
					[
						46,
						305.6
					],
					[
						48,
						305.6
					]
				],
				[
					[
						36,
						1
					]
				],
				[
					[
						35,
						1386
					],
					[
						36,
						1333
					],
					[
						37,
						16.79
					],
					[
						42,
						14.61
					]
				],
				[
					[
						6,
						1
					]
				],
				[
					[
						4,
						1
					]
				],
				[
					[
						4,
						163.2
					],
					[
						3,
						25.02
					],
					[
						44,
						12.97
					],
					[
						55,
						9.276
					]
				],
				[
					[
						4,
						147.6
					],
					[
						3,
						62.76
					],
					[
						2,
						0.07065
					]
				],
				[
					[
						4,
						76.51
					],
					[
						3,
						67.21
					],
					[
						2,
						14.61
					],
					[
						44,
						8.035
					]
				],
				[
					[
						3,
						1
					]
				],
				[
					[
						3,
						226.6
					],
					[
						2,
						38.44
					],
					[
						4,
						18.73
					],
					[
						1,
						5.036
					]
				],
				[
					[
						76,
						1
					]
				],
				[
					[
						75,
						1
					]
				],
				[
					[
						77,
						1
					]
				],
				[
					[
						77,
						50.21
					],
					[
						76,
						46.26
					],
					[
						75,
						4.941
					]
				],
				[
					[
						2,
						1
					]
				],
				[
					[
						19,
						57.47
					],
					[
						79,
						13.05
					],
					[
						0,
						7.937
					],
					[
						78,
						2.027
					]
				],
				[
					[
						79,
						1
					]
				],
				[
					[
						0,
						1
					]
				],
				[
					[
						1,
						184
					],
					[
						0,
						116.3
					],
					[
						79,
						5.152
					]
				],
				[
					[
						2,
						154.6
					],
					[
						1,
						32.12
					],
					[
						0,
						6.246
					],
					[
						79,
						2.37
					]
				],
				[
					[
						2,
						56.21
					],
					[
						1,
						49.02
					],
					[
						0,
						8.312
					],
					[
						19,
						3.74
					]
				],
				[
					[
						1,
						1
					]
				],
				[
					[
						1,
						151.3
					],
					[
						2,
						75.93
					]
				],
				[
					[
						78,
						67.56
					],
					[
						79,
						56.41
					],
					[
						0,
						7.653
					]
				],
				[
					[
						77,
						119
					],
					[
						78,
						43.72
					],
					[
						76,
						5.3
					],
					[
						20,
						4.685
					]
				],
				[
					[
						78,
						1
					]
				],
				[
					[
						5,
						1
					]
				],
				[
					[
						54,
						439.2
					],
					[
						55,
						182.1
					],
					[
						6,
						39.39
					]
				],
				[
					[
						25,
						672.2
					],
					[
						64,
						442.2
					],
					[
						24,
						83.68
					],
					[
						63,
						22.39
					]
				],
				[
					[
						25,
						738.8
					],
					[
						22,
						14.14
					],
					[
						34,
						13.62
					],
					[
						33,
						12.56
					]
				],
				[
					[
						25,
						628.6
					],
					[
						65,
						242.5
					],
					[
						26,
						82.59
					],
					[
						34,
						17.77
					]
				],
				[
					[
						65,
						1482
					],
					[
						26,
						414.6
					],
					[
						34,
						17.36
					],
					[
						35,
						14.24
					]
				],
				[
					[
						26,
						1568
					],
					[
						34,
						15.04
					],
					[
						35,
						12.71
					],
					[
						36,
						8.022
					]
				],
				[
					[
						66,
						2769
					],
					[
						34,
						8.129
					],
					[
						35,
						6.942
					],
					[
						36,
						4.922
					]
				],
				[
					[
						23,
						4001
					],
					[
						19,
						36.53
					],
					[
						0,
						1.09
					],
					[
						1,
						0.6092
					]
				],
				[
					[
						23,
						1364
					],
					[
						63,
						290.9
					],
					[
						24,
						62.2
					],
					[
						19,
						40.86
					]
				],
				[
					[
						24,
						5556
					],
					[
						20,
						27.28
					],
					[
						21,
						25.24
					],
					[
						19,
						13.55
					]
				],
				[
					[
						25,
						233.4
					],
					[
						22,
						23.35
					],
					[
						33,
						20.86
					],
					[
						34,
						12.55
					]
				],
				[
					[
						25,
						177.5
					],
					[
						64,
						139.3
					],
					[
						24,
						43.6
					],
					[
						22,
						36.5
					]
				],
				[
					[
						25,
						205.6
					],
					[
						65,
						109.9
					],
					[
						34,
						29.63
					],
					[
						33,
						22.63
					]
				],
				[
					[
						65,
						343.6
					],
					[
						26,
						169.2
					],
					[
						34,
						23.97
					],
					[
						35,
						19.34
					]
				],
				[
					[
						26,
						365.1
					],
					[
						34,
						18.58
					],
					[
						35,
						15.35
					],
					[
						36,
						9.125
					]
				],
				[
					[
						66,
						525.1
					],
					[
						34,
						8.493
					],
					[
						35,
						7.091
					],
					[
						36,
						5.1
					]
				],
				[
					[
						23,
						730.1
					],
					[
						19,
						30.19
					],
					[
						0,
						1.626
					],
					[
						1,
						1.051
					]
				],
				[
					[
						23,
						503.6
					],
					[
						63,
						157.3
					],
					[
						19,
						45.13
					],
					[
						24,
						28.51
					]
				],
				[
					[
						24,
						717.5
					],
					[
						21,
						12.05
					],
					[
						20,
						3.677
					]
				],
				[
					[
						25,
						2227
					],
					[
						64,
						636
					],
					[
						65,
						126.5
					],
					[
						24,
						76.08
					]
				],
				[
					[
						25,
						3716
					],
					[
						34,
						11.69
					],
					[
						22,
						10.11
					],
					[
						33,
						8.918
					]
				],
				[
					[
						25,
						4170
					],
					[
						65,
						468.2
					]
				],
				[
					[
						65,
						1
					]
				],
				[
					[
						26,
						1
					]
				],
				[
					[
						66,
						1
					]
				],
				[
					[
						23,
						1
					]
				],
				[
					[
						23,
						1804
					],
					[
						63,
						575.3
					],
					[
						66,
						147.7
					],
					[
						24,
						76.77
					]
				],
				[
					[
						24,
						1
					]
				],
				[
					[
						25,
						1
					]
				],
				[
					[
						25,
						65.13
					],
					[
						33,
						44.86
					],
					[
						22,
						44.37
					],
					[
						34,
						23.44
					]
				],
				[
					[
						22,
						144
					],
					[
						64,
						60.64
					],
					[
						25,
						59.33
					],
					[
						21,
						37.54
					]
				],
				[
					[
						65,
						82.91
					],
					[
						26,
						55.57
					],
					[
						34,
						50.23
					],
					[
						35,
						38.26
					]
				],
				[
					[
						26,
						107.9
					],
					[
						66,
						57.8
					],
					[
						34,
						19.31
					],
					[
						35,
						17.72
					]
				],
				[
					[
						66,
						142.7
					],
					[
						23,
						65.78
					],
					[
						35,
						7.242
					],
					[
						36,
						5.246
					]
				],
				[
					[
						23,
						193.4
					],
					[
						19,
						25.33
					],
					[
						0,
						2.735
					],
					[
						1,
						1.962
					]
				],
				[
					[
						19,
						210.7
					],
					[
						23,
						139.8
					],
					[
						20,
						88.22
					],
					[
						63,
						77.02
					]
				],
				[
					[
						24,
						89.62
					],
					[
						21,
						68.01
					],
					[
						20,
						30.75
					]
				],
				[
					[
						33,
						650.3
					],
					[
						41,
						82.11
					],
					[
						34,
						28.89
					],
					[
						22,
						25.76
					]
				],
				[
					[
						33,
						152
					],
					[
						22,
						68.23
					],
					[
						25,
						33.93
					],
					[
						18,
						24.29
					]
				],
				[
					[
						34,
						119.6
					],
					[
						33,
						84.5
					],
					[
						25,
						51.05
					],
					[
						41,
						42.7
					]
				],
				[
					[
						22,
						1
					]
				],
				[
					[
						20,
						136.1
					],
					[
						21,
						131.1
					],
					[
						24,
						14.51
					],
					[
						22,
						3.31
					]
				],
				[
					[
						33,
						1
					]
				],
				[
					[
						33,
						504.1
					],
					[
						18,
						39.57
					],
					[
						22,
						39.57
					],
					[
						25,
						22.53
					]
				],
				[
					[
						22,
						158.2
					],
					[
						18,
						158.2
					],
					[
						33,
						14.28
					],
					[
						21,
						3.068
					]
				],
				[
					[
						20,
						100.5
					],
					[
						21,
						92.21
					],
					[
						22,
						17.43
					],
					[
						18,
						4.217
					]
				],
				[
					[
						21,
						136.9
					],
					[
						22,
						80.51
					],
					[
						18,
						15.72
					],
					[
						33,
						6.78
					]
				],
				[
					[
						18,
						34.77
					],
					[
						22,
						34.77
					],
					[
						21,
						21.71
					],
					[
						20,
						5.359
					]
				],
				[
					[
						21,
						29.13
					],
					[
						22,
						21.46
					],
					[
						76,
						7.012
					],
					[
						18,
						6.236
					]
				],
				[
					[
						76,
						32.09
					],
					[
						75,
						20.99
					],
					[
						21,
						5.49
					],
					[
						20,
						4.379
					]
				],
				[
					[
						77,
						19.22
					],
					[
						76,
						9.23
					],
					[
						20,
						8.482
					],
					[
						21,
						6.315
					]
				],
				[
					[
						20,
						41.75
					],
					[
						21,
						26.85
					],
					[
						22,
						7.102
					],
					[
						76,
						3.922
					]
				],
				[
					[
						78,
						26.93
					],
					[
						77,
						17.26
					],
					[
						20,
						12.87
					],
					[
						19,
						11.61
					]
				],
				[
					[
						21,
						16.03
					],
					[
						17,
						16.03
					],
					[
						18,
						12.68
					],
					[
						22,
						12.68
					]
				],
				[
					[
						75,
						35.74
					],
					[
						21,
						3.239
					],
					[
						17,
						3.239
					],
					[
						22,
						2.448
					]
				],
				[
					[
						19,
						1
					]
				],
				[
					[
						23,
						65.42
					],
					[
						19,
						33.66
					],
					[
						0,
						5.02
					],
					[
						1,
						3.811
					]
				],
				[
					[
						66,
						45.03
					],
					[
						23,
						26.91
					],
					[
						35,
						8.098
					],
					[
						36,
						5.866
					]
				],
				[
					[
						26,
						34.1
					],
					[
						66,
						24.58
					],
					[
						35,
						23.63
					],
					[
						36,
						16.51
					]
				],
				[
					[
						35,
						19.17
					],
					[
						26,
						16.51
					],
					[
						66,
						13.38
					],
					[
						65,
						10.75
					]
				],
				[
					[
						36,
						10.55
					],
					[
						35,
						10.29
					],
					[
						4,
						9.715
					],
					[
						3,
						9.151
					]
				],
				[
					[
						3,
						15.44
					],
					[
						4,
						15.18
					],
					[
						44,
						7.649
					],
					[
						36,
						6.846
					]
				],
				[
					[
						3,
						28.35
					],
					[
						4,
						25.74
					],
					[
						44,
						9.188
					],
					[
						5,
						6.444
					]
				],
				[
					[
						66,
						20.92
					],
					[
						23,
						13.79
					],
					[
						35,
						6.789
					],
					[
						3,
						6.495
					]
				],
				[
					[
						3,
						24.98
					],
					[
						2,
						16.47
					],
					[
						1,
						8.03
					],
					[
						66,
						5.781
					]
				],
				[
					[
						3,
						50.4
					],
					[
						2,
						30.11
					],
					[
						1,
						7.763
					],
					[
						66,
						3.504
					]
				],
				[
					[
						3,
						12.92
					],
					[
						66,
						10.27
					],
					[
						2,
						8.98
					],
					[
						23,
						7.119
					]
				],
				[
					[
						0,
						22.24
					],
					[
						1,
						17.59
					],
					[
						19,
						16.86
					],
					[
						23,
						16.13
					]
				],
				[
					[
						1,
						42.82
					],
					[
						2,
						24.23
					],
					[
						19,
						7.239
					],
					[
						23,
						6.94
					]
				],
				[
					[
						55,
						636.9
					],
					[
						56,
						412.8
					],
					[
						44,
						266.2
					],
					[
						57,
						65.79
					]
				],
				[
					[
						56,
						4593
					],
					[
						54,
						360.4
					],
					[
						57,
						86.44
					],
					[
						55,
						3.833
					]
				],
				[
					[
						6,
						169.2
					],
					[
						54,
						98.13
					],
					[
						55,
						62.62
					],
					[
						56,
						35.32
					]
				],
				[
					[
						56,
						377.1
					],
					[
						55,
						369.5
					],
					[
						44,
						283.8
					],
					[
						61,
						23.78
					]
				],
				[
					[
						54,
						1581
					],
					[
						56,
						819.4
					],
					[
						57,
						117.6
					],
					[
						53,
						86.07
					]
				],
				[
					[
						57,
						1
					]
				],
				[
					[
						57,
						4507
					],
					[
						53,
						312.9
					],
					[
						54,
						41.17
					],
					[
						52,
						41.17
					]
				],
				[
					[
						53,
						1
					]
				],
				[
					[
						7,
						140.1
					],
					[
						53,
						119.1
					],
					[
						8,
						42.89
					],
					[
						6,
						42.89
					]
				],
				[
					[
						7,
						1
					]
				],
				[
					[
						53,
						676.6
					],
					[
						54,
						40.88
					],
					[
						52,
						40.88
					],
					[
						7,
						25.87
					]
				],
				[
					[
						64,
						1
					]
				],
				[
					[
						64,
						6332
					],
					[
						24,
						391.4
					],
					[
						21,
						31.42
					],
					[
						22,
						18.21
					]
				],
				[
					[
						21,
						164.9
					],
					[
						64,
						109.1
					],
					[
						24,
						76.73
					],
					[
						22,
						61.92
					]
				],
				[
					[
						64,
						660.1
					],
					[
						24,
						142.7
					],
					[
						21,
						24.57
					],
					[
						22,
						5.212
					]
				],
				[
					[
						63,
						1119
					],
					[
						20,
						40.29
					],
					[
						19,
						0.9378
					]
				],
				[
					[
						63,
						6126
					],
					[
						24,
						229.4
					],
					[
						20,
						51.4
					],
					[
						19,
						26.51
					]
				],
				[
					[
						20,
						268.6
					],
					[
						63,
						153.2
					],
					[
						24,
						64.58
					],
					[
						23,
						55.78
					]
				],
				[
					[
						63,
						1
					]
				],
				[
					[
						20,
						1
					]
				],
				[
					[
						21,
						1
					]
				],
				[
					[
						55,
						1
					]
				],
				[
					[
						53,
						1257
					],
					[
						57,
						673.4
					],
					[
						58,
						77.95
					],
					[
						56,
						77.95
					]
				],
				[
					[
						46,
						1
					]
				],
				[
					[
						34,
						245.5
					],
					[
						35,
						138.6
					],
					[
						36,
						38.05
					],
					[
						62,
						29.68
					]
				],
				[
					[
						35,
						1
					]
				]
			]
		},
		"rightEye": {
			"index": [
				276,
				340,
				277,
				276,
				333,
				280,
				275,
				272,
				333,
				277,
				279,
				278,
				281,
				272,
				274,
				340,
				279,
				277,
				280,
				340,
				276,
				275,
				333,
				276,
				274,
				272,
				275
			]
		},
		"leftEye": {
			"index": [
				102,
				103,
				154,
				102,
				106,
				147,
				101,
				147,
				98,
				103,
				104,
				105,
				107,
				100,
				98,
				154,
				103,
				105,
				106,
				102,
				154,
				101,
				102,
				147,
				100,
				101,
				98
			]
		},
		"mouth": {
			"index": [
				35,
				38,
				43,
				145,
				43,
				51,
				327,
				41,
				51,
				35,
				36,
				38,
				35,
				43,
				145,
				41,
				145,
				51,
				222,
				327,
				51,
				204,
				212,
				207,
				325,
				221,
				212,
				327,
				221,
				210,
				204,
				207,
				205,
				204,
				325,
				212,
				210,
				221,
				325,
				222,
				221,
				327
			]
		}
	};

/***/ }
/******/ ]);