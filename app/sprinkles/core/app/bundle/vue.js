/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var storage = __webpack_require__(23);

module.exports = function (bucket, adapter) {

    var db = storage.select(bucket, adapter || 'local');

    return {

        set: function (key, value, minutes) {
            if (minutes){
                return db.setex(key, minutes * 60, value);
            } else  {
                return db.set(key, value);
            }
        },

        get: function () {
            return db.get.apply(db, arguments);
        },

        remove: function (key) {
            return db.del.apply(db, arguments);
        },

        flush: function () {
            return db.flushdb.apply(db, arguments);
        }

    };

};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript MD5 1.0.1
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 * 
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*jslint bitwise: true */
/*global unescape, define */

(function ($) {
    'use strict';

    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
    * These functions implement the four basic operations the algorithm uses.
    */
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    function binl_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var i, olda, oldb, oldc, oldd,
            a =  1732584193,
            b = -271733879,
            c = -1732584194,
            d =  271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5_ff(a, b, c, d, x[i],       7, -680876936);
            d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
            d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
            d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
            d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i],      20, -373897302);
            a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
            d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
            c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
            d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
            c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
            d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
            d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
            d = md5_hh(d, a, b, c, x[i],      11, -358537222);
            c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i],       6, -198630844);
            d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
            d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return [a, b, c, d];
    }

    /*
    * Convert an array of little-endian words to a string
    */
    function binl2rstr(input) {
        var i,
            output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        }
        return output;
    }

    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    function rstr2binl(input) {
        var i,
            output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }
        return output;
    }

    /*
    * Calculate the MD5 of a raw string
    */
    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    function rstr_hmac_md5(key, data) {
        var i,
            bkey = rstr2binl(key),
            ipad = [],
            opad = [],
            hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binl_md5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
    * Convert a raw string to a hex string
    */
    function rstr2hex(input) {
        var hex_tab = '0123456789abcdef',
            output = '',
            x,
            i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) +
                hex_tab.charAt(x & 0x0F);
        }
        return output;
    }

    /*
    * Encode a string as utf-8
    */
    function str2rstr_utf8(input) {
        return unescape(encodeURIComponent(input));
    }

    /*
    * Take string arguments and return either raw or hex encoded strings
    */
    function raw_md5(s) {
        return rstr_md5(str2rstr_utf8(s));
    }
    function hex_md5(s) {
        return rstr2hex(raw_md5(s));
    }
    function raw_hmac_md5(k, d) {
        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
    }
    function hex_hmac_md5(k, d) {
        return rstr2hex(raw_hmac_md5(k, d));
    }

    function md5(string, key, raw) {
        if (!key) {
            if (!raw) {
                return hex_md5(string);
            }
            return raw_md5(string);
        }
        if (!raw) {
            return hex_hmac_md5(key, string);
        }
        return raw_hmac_md5(key, string);
    }

    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return md5;
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {
        $.md5 = md5;
    }
}(this));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * vue-form v0.3.13
 * Released under the MIT License.
 */



/**
 * Utility functions.
 */

var debug = false;
var util = {};

var isArray = Array.isArray;

var Util = function (Vue) {
    util = Vue.util;
    debug = Vue.config.debug || !Vue.config.silent;
};

function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn(("[VueForm warn]: " + msg));
    }
}

function isString(val) {
    return typeof val === 'string';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isUndefined(val) {
    return typeof val === 'undefined';
}

function on(el, event, cb, useCapture) {
    el.addEventListener(event, cb, useCapture);
}

function off(el, event, cb, useCapture) {
    el.removeEventListener(event, cb, useCapture);
}

function attr(el, attr) {
    return el ? el.getAttribute(attr) : null;
}

function trigger(el, event) {

    var e = document.createEvent('HTMLEvents');

    e.initEvent(event, true, false);
    el.dispatchEvent(e);
}

function camelize(str) {
    return util.camelize(str);
}

function pull(arr, value) {
    arr.splice(arr.indexOf(value), 1);
}



function each(obj, iterator) {

    var i, key;

    if (typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

var assign = Object.assign || function (target) {
    var arguments$1 = arguments;


    for (var i = 1; i < arguments.length; i++) {

        var source = arguments$1[i];

        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
};

var Field = {

    name: 'field',

    props: ['field', 'class'],

    data: function data() {
        return assign({
            name: '',
            type: 'text',
            label: '',
            attrs: {},
            options: [],
            default: undefined
        }, this.field);
    },

    created: function created() {

        this.key = "[\"" + (this.name.replace(/\./g, '"]["')) + "\"]";

    },

    computed: {

        attrs: {

            get: function get$$1() {

                if (this.enable && !this.$parent.evaluate(this.enable)) {
                    return assign({disabled: 'true'}, this.$data.attrs);
                }

                return this.$data.attrs;
            },

            cache: false
        },

        value: {

            get: function get$$1() {

                var value = this.$parent.getField(this);

                if (isUndefined(value) && !isUndefined(this.default)) {

                    value = this.default;

                    if (value) {
                        this.$parent.setField(this, value);
                    }
                }

                return value;
            },

            set: function set(value) {

                if (!isUndefined(this.value) || value) {
                    this.$parent.setField(this, value, this.value);
                }

            },

            cache: false
        }

    },

    methods: {

        filterOptions: function filterOptions(options) {
            var this$1 = this;


            var opts = [];

            if (!options) {
                warn(("Invalid options provided for " + (this.name)));
                return opts;
            }

            each(options, function (value, name) {
                if (isObject(value)) {
                    opts.push({label: name, options: this$1.filterOptions(value)});
                } else {
                    opts.push({text: name, value: value});
                }
            });

            return opts;
        }

    },

    filters: {

        options: function options(options$1) {
            return this.filterOptions(options$1);
        }

    }

};

var template = "<div>\n\n    <div v-for=\"field in fields\">\n        <label v-if=\"field.type != 'checkbox'\">{{ field.label }}</label>\n        <component :is=\"field.type\" :field=\"field\"></component>\n    </div>\n\n</div>\n";

var Fields = function (Vue) {

    return {

        name: 'fields',

        props: {

            config: {
                type: [Array, Object],
                default: function default$1() {
                    return [];
                }
            },

            values: {
                type: Object
            }

        },

        created: function created() {

            var ref = this.$options;
            var fields = ref.fields;
            var components = ref.components;

            if (!this.fields || !this.values) {
                warn('Invalid config or model provided');
                return;
            }

            each(assign({}, Vue.fields, fields), function (type, name) {

                if (isString(type)) {
                    type = {template: type};
                }

                if (isObject(type)) {
                    type.name = type.name || ("field-" + name);
                    type = Vue.extend(Field).extend(type);
                }

                components[name] = type;
            });

        },

        computed: {

            fields: function fields() {
                return this.filterFields(this.config);
            }

        },

        methods: {

            getField: function getField(field) {

                if (this.values instanceof Vue && 'getField' in this.values) {
                    return this.values.getField(field);
                }

                return this.$get(("values" + (field.key)));
            },

            setField: function setField(field, value, prev) {

                if (this.values instanceof Vue && 'setField' in this.values) {
                    this.values.setField(field, value, prev);
                } else {
                    this.$set(("values" + (field.key)), value);
                }

            },

            filterFields: function filterFields(config) {
                var this$1 = this;


                var arr = isArray(config), fields = [];

                each(config, function (field, name) {

                    if (!isString(field.name) && !arr) {
                        field = assign({name: name}, field);
                    }

                    if (!isString(field.type)) {
                        field = assign({type: 'text'}, field);
                    }

                    if (isString(field.name)) {

                        if (!field.show || this$1.evaluate(field.show)) {
                            fields.push(field);
                        }

                    } else {
                        warn(("Field name missing " + (JSON.stringify(field))));
                    }

                });

                return fields;
            },

            evaluate: function evaluate(expr, data) {

                data = data || this.values;

                if (isString(expr)) {

                    var comp = new Vue({data: data});
                    var result = comp.$eval(expr);

                    comp.$destroy();

                    return result;
                }

                return expr.call(this, data, this);
            }

        },

        fields: {},

        components: {},

        template: template

    };

};

var fields = {
    text: '<input type="text" v-bind="attrs" v-model="value">',
    textarea: '<textarea v-bind="attrs" v-model="value"></textarea>',
    radio: "<template v-for=\"option in options | options\">\n                    <input type=\"radio\" v-bind=\"attrs\" :name=\"name\" :value=\"option.value\" v-model=\"value\"> <label>{{ option.text }}</label>\n                 </template>",
    checkbox: '<input type="checkbox" v-bind="attrs" v-model="value">',
    select: "<select v-bind=\"attrs\" v-model=\"value\">\n                     <template v-for=\"option in options | options\">\n                         <optgroup :label=\"option.label\" v-if=\"option.label\">\n                             <option v-for=\"opt in option.options\" :value=\"opt.value\">{{ opt.text }}</option>\n                         </optgroup>\n                         <option :value=\"option.value\" v-else>{{ option.text }}</option>\n                     </template>\n                 </select>",
    range: '<input type="range" v-bind="attrs" v-model="value">',
    number: '<input type="number" v-bind="attrs" v-model="value">'
};

/**
 * Validator functions.
 */

function required(value, arg) {

    if (!(typeof arg == 'boolean')) {
        arg = true;
    }

    if (typeof value == 'boolean') {
        return !arg || value;
    }

    return !arg || !((value === null) || (value.length === 0));
}

function numeric(value) {
    return /^[-+]?[0-9]+$/.test(value);
}

function integer(value) {
    return /^(?:[-+]?(?:0|[1-9][0-9]*))$/.test(value);
}

function float(value) {
    return /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/.test(value);
}

function alpha(value) {
    return /^([A-Z]+)?$/i.test(value);
}

function alphanum(value) {
    return /^([0-9A-Z]+)?$/i.test(value);
}

function email(value) {
    return /^([a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*)?$/i.test(value || 'a@a.aa');
}

function url(value) {
    return /^((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)?$/.test(value);
}

function minlength(value, arg) {
    return value && value.length && value.length >= +arg;
}

function maxlength(value, arg) {
    return value && value.length && value.length <= +arg;
}

function length(value) {
    return value && value.length == +arg;
}

function min(value, arg) {
    return value >= +arg;
}

function max(value, arg) {
    return value <= +arg;
}

function pattern(value, arg) {
    var match = arg.match(new RegExp('^/(.*?)/([gimy]*)$'));
    var regex = new RegExp(match[1], match[2]);
    return regex.test(value);
}


var types = Object.freeze({
	required: required,
	numeric: numeric,
	integer: integer,
	float: float,
	alpha: alpha,
	alphanum: alphanum,
	email: email,
	url: url,
	minlength: minlength,
	maxlength: maxlength,
	length: length,
	min: min,
	max: max,
	pattern: pattern
});

/**
 * Validator for input validation.
 */

var Validator = {

    dirs: [],

    types: types,

    add: function add(dir) {
        this.dirs.push(dir);
    },

    remove: function remove(dir) {
        pull(this.dirs, dir);
    },

    instance: function instance(el) {

        do {

            if (el._validator) {
                return el._validator;
            }

            el = el.parentElement;

        } while (el);

    },

    validate: function validate(el, submit) {
        var this$1 = this;


        var validator = this.instance(el), results = {valid: true};

        if (!validator) {
            return;
        }

        this.dirs.forEach(function (dir) {

            var valid = dir.validate(), el = dir.el, name = dir.name;

            if (this$1.instance(el) !== validator) {
                return;
            }

            if (!el._touched && submit) {
                el._touched = true;
            }

            if (!el._touched && !valid) {
                valid = true;
                results.valid = false;
            }

            if (!results[name]) {
                results[name] = {
                    valid: true,
                    invalid: false,
                    dirty: el._dirty,
                    touched: el._touched
                };
            }

            results[name][dir.type] = !valid;

            if (submit && results.valid && !valid) {
                el.focus();
            }

            if (results[name].valid && !valid) {
                results[name].valid = false;
                results[name].invalid = true;
                results.valid = false;
            }

        });

        results.invalid = !results.valid;

        validator.results(results);

        if (submit && results.invalid) {
            trigger(validator.el, 'invalid');
        }

        return results.valid;
    }

};

function Filter(fn) {
    return function (e) {
        e.preventDefault();

        if (Validator.validate(e.target, true)) {
            fn(e);
        }
    };
}

var Directive = {

    bind: function bind() {

        var self = this, name = this.arg || this.expression;

        this.name = camelize(name);
        this.el._validator = this;

        this.vm.$set(this.name);
        this.vm.$on('hook:compiled', function () {
            Validator.validate(self.el);
        });
    },

    unbind: function unbind() {
        this.vm.$delete(this.name);
    },

    results: function results(results$1) {
        this.vm.$set(this.name, assign({
            validate: this.validate.bind(this)
        }, results$1));
    },

    validate: function validate() {
        return Validator.validate(this.el, true);
    }

};

/**
 * Validate directive.
 */

var Validate = {

    priority: 500,

    bind: function bind() {

        var name = attr(this.el, 'name');

        if (!name) {
            return;
        }

        this.name = camelize(name);
        this.type = this.arg;
        this.value = this.el.value;

        this.el._dirty = false;
        this.el._touched = false;

        on(this.el, 'blur', this.listener.bind(this));
        on(this.el, 'input', this.listener.bind(this));

        Validator.add(this);
    },

    unbind: function unbind() {

        off(this.el, 'blur', this.listener);
        off(this.el, 'input', this.listener);

        Validator.remove(this);
    },

    update: function update(value) {
        this.args = value;
    },

    listener: function listener(e) {

        if (related.target && (related.target.tagName === 'A' || related.target.tagName === 'BUTTON')) {
            return;
        }

        if (e.type == 'blur') {
            this.el._touched = true;
        }

        if (this.el.value != this.value) {
            this.el._dirty = true;
        }

        Validator.validate(this.el);
    },

    validate: function validate() {

        var validator = this.validator();

        if (validator) {
            return validator.call(this.vm, this.el.value, this.args);
        }
    },

    validator: function validator() {
        var this$1 = this;


        var vm = this.vm, validators;

        do {

            validators = vm.$options.validators || {};

            if (validators[this$1.type]) {
                return validators[this$1.type];
            }

            vm = vm.$parent;

        } while (vm);

        return Validator.types[this.type];
    }

};

//  RelatedTarget property dose not work in Safari, IE & Firefox
var related = {
    target: null,
    handler: function handler (ref) {
        var target = ref.target;

        related.target = target;
        setTimeout(function () { return related.target = null; }, 0);
    }
};

on(document, 'mousedown', related.handler);
on(document, 'pointerdown', related.handler);
on(document, 'touchstart', related.handler);

/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.fields = fields;
    Vue.component('fields', Fields(Vue));

    Vue.validator = Validator;
    Vue.filter('valid', Filter);
    Vue.directive('validator', Directive);
    Vue.directive('validate', Validate);

    Vue.config.optionMergeStrategies.fields = Vue.config.optionMergeStrategies.props;

}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * vue-intl v0.2.2
 * Released under the MIT License.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

/**
 * Utility functions.
 */

var util = {};
var arr = Array.prototype;
var obj = Object.prototype;
function Util (Vue) {
    util = Vue.util;
}

function isString(val) {
    return typeof val === 'string';
}

function isNumber(val) {
    return typeof val === 'number';
}

function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isUndefined(val) {
    return typeof val === 'undefined';
}

function isDate(val) {
    return obj.toString.call(val) === '[object Date]';
}

function toInt(val) {
    return parseInt(val, 10);
}

function concat(arr1, arr2, index) {
    return arr1.concat(arr.slice.call(arr2, index));
}

function uppercase(str) {
    return isString(str) ? str.toUpperCase() : str;
}

var NUMBER_STRING = /^\-?\d+$/;
var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/;
var DATE_FORMATS = {
    yyyy: dateGetter('FullYear', 4),
    yy: dateGetter('FullYear', 2, 0, true),
    y: dateGetter('FullYear', 1),
    MMMM: dateStrGetter('Month'),
    MMM: dateStrGetter('Month', true),
    MM: dateGetter('Month', 2, 1),
    M: dateGetter('Month', 1, 1),
    dd: dateGetter('Date', 2),
    d: dateGetter('Date', 1),
    HH: dateGetter('Hours', 2),
    H: dateGetter('Hours', 1),
    hh: dateGetter('Hours', 2, -12),
    h: dateGetter('Hours', 1, -12),
    mm: dateGetter('Minutes', 2),
    m: dateGetter('Minutes', 1),
    ss: dateGetter('Seconds', 2),
    s: dateGetter('Seconds', 1),
    sss: dateGetter('Milliseconds', 3),
    EEEE: dateStrGetter('Day'),
    EEE: dateStrGetter('Day', true),
    a: ampmGetter,
    Z: timeZoneGetter,
    ww: weekGetter(2),
    w: weekGetter(1),
    G: eraGetter,
    GG: eraGetter,
    GGG: eraGetter,
    GGGG: longEraGetter
};

function formatDate (date, format, timezone) {

    var text = '',
        parts = [],
        formats = this.$locale.DATETIME_FORMATS,
        fn,
        match;

    format = format || 'mediumDate';
    format = formats[format] || format;

    if (isString(date)) {
        date = NUMBER_STRING.test(date) ? toInt(date) : jsonStringToDate(date);
    }

    if (isNumber(date)) {
        date = new Date(date);
    }

    if (!isDate(date) || !isFinite(date.getTime())) {
        return date;
    }

    while (format) {
        match = DATE_FORMATS_SPLIT.exec(format);
        if (match) {
            parts = concat(parts, match, 1);
            format = parts.pop();
        } else {
            parts.push(format);
            format = null;
        }
    }

    var dateTimezoneOffset = date.getTimezoneOffset();

    if (timezone) {
        dateTimezoneOffset = timezoneToOffset(timezone, date.getTimezoneOffset());
        date = convertTimezoneToLocal(date, timezone, true);
    }

    parts.forEach(function (value) {
        fn = DATE_FORMATS[value];
        text += fn ? fn(date, formats, dateTimezoneOffset) : value.replace(/(^'|'$)/g, '').replace(/''/g, "'");
    });

    return text;
}

function padNumber(num, digits, trim) {
    var neg = '';
    if (num < 0) {
        neg = '-';
        num = -num;
    }
    num = '' + num;
    while (num.length < digits) {
        num = '0' + num;
    }if (trim) {
        num = num.substr(num.length - digits);
    }
    return neg + num;
}

function dateGetter(name, size, offset, trim) {
    offset = offset || 0;
    return function (date) {
        var value = date['get' + name]();
        if (offset > 0 || value > -offset) {
            value += offset;
        }
        if (value === 0 && offset == -12) value = 12;
        return padNumber(value, size, trim);
    };
}

function dateStrGetter(name, shortForm) {
    return function (date, formats) {
        var value = date['get' + name]();
        var get = uppercase(shortForm ? 'SHORT' + name : name);

        return formats[get][value];
    };
}

function timeZoneGetter(date, formats, offset) {
    var zone = -1 * offset;
    var paddedZone = zone >= 0 ? "+" : "";

    paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);

    return paddedZone;
}

function getFirstThursdayOfYear(year) {
    // 0 = index of January
    var dayOfWeekOnFirst = new Date(year, 0, 1).getDay();
    // 4 = index of Thursday (+1 to account for 1st = 5)
    // 11 = index of *next* Thursday (+1 account for 1st = 12)
    return new Date(year, 0, (dayOfWeekOnFirst <= 4 ? 5 : 12) - dayOfWeekOnFirst);
}

function getThursdayThisWeek(datetime) {
    return new Date(datetime.getFullYear(), datetime.getMonth(),
    // 4 = index of Thursday
    datetime.getDate() + (4 - datetime.getDay()));
}

function weekGetter(size) {
    return function (date) {
        var firstThurs = getFirstThursdayOfYear(date.getFullYear()),
            thisThurs = getThursdayThisWeek(date);

        var diff = +thisThurs - +firstThurs,
            result = 1 + Math.round(diff / 6.048e8); // 6.048e8 ms per week

        return padNumber(result, size);
    };
}

function ampmGetter(date, formats) {
    return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
}

function eraGetter(date, formats) {
    return date.getFullYear() <= 0 ? formats.ERAS[0] : formats.ERAS[1];
}

function longEraGetter(date, formats) {
    return date.getFullYear() <= 0 ? formats.ERANAMES[0] : formats.ERANAMES[1];
}

function jsonStringToDate(string) {
    var match;
    if (match = string.match(R_ISO8601_STR)) {
        var date = new Date(0),
            tzHour = 0,
            tzMin = 0,
            dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
            timeSetter = match[8] ? date.setUTCHours : date.setHours;

        if (match[9]) {
            tzHour = toInt(match[9] + match[10]);
            tzMin = toInt(match[9] + match[11]);
        }
        dateSetter.call(date, toInt(match[1]), toInt(match[2]) - 1, toInt(match[3]));
        var h = toInt(match[4] || 0) - tzHour;
        var m = toInt(match[5] || 0) - tzMin;
        var s = toInt(match[6] || 0);
        var ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
        timeSetter.call(date, h, m, s, ms);
        return date;
    }
    return string;
}

function timezoneToOffset(timezone, fallback) {
    var requestedTimezoneOffset = Date.parse('Jan 01, 1970 00:00:00 ' + timezone) / 60000;
    return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
}

function addDateMinutes(date, minutes) {
    date = new Date(date.getTime());
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}

function convertTimezoneToLocal(date, timezone, reverse) {
    reverse = reverse ? -1 : 1;
    var timezoneOffset = timezoneToOffset(timezone, date.getTimezoneOffset());
    return addDateMinutes(date, reverse * (timezoneOffset - date.getTimezoneOffset()));
}

var DECIMAL_SEP = '.';

function formatNumber (number, fractionSize) {

    var formats = this.$locale.NUMBER_FORMATS;

    // if null or undefined pass it through
    return number == null ? number : formatNumber$1(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
}

function formatNumber$1(number, pattern, groupSep, decimalSep, fractionSize) {

    if (isObject(number)) {
        return '';
    }

    var isNegative = number < 0;
    number = Math.abs(number);

    var isInfinity = number === Infinity;
    if (!isInfinity && !isFinite(number)) return '';

    var numStr = number + '',
        formatedText = '',
        hasExponent = false,
        parts = [];

    if (isInfinity) {
        formatedText = '∞';
    }

    if (!isInfinity && numStr.indexOf('e') !== -1) {
        var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
        if (match && match[2] == '-' && match[3] > fractionSize + 1) {
            number = 0;
        } else {
            formatedText = numStr;
            hasExponent = true;
        }
    }

    if (!isInfinity && !hasExponent) {

        var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;

        // determine fractionSize if it is not specified
        if (isUndefined(fractionSize)) {
            fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
        }

        // safely round numbers in JS without hitting imprecisions of floating-point arithmetics
        // inspired by: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
        number = +(Math.round(+(number.toString() + 'e' + fractionSize)).toString() + 'e' + -fractionSize);

        var fraction = ('' + number).split(DECIMAL_SEP);
        var whole = fraction[0];
        fraction = fraction[1] || '';

        var i,
            pos = 0,
            lgroup = pattern.lgSize,
            group = pattern.gSize;

        if (whole.length >= lgroup + group) {
            pos = whole.length - lgroup;
            for (i = 0; i < pos; i++) {
                if ((pos - i) % group === 0 && i !== 0) {
                    formatedText += groupSep;
                }
                formatedText += whole.charAt(i);
            }
        }

        for (i = pos; i < whole.length; i++) {
            if ((whole.length - i) % lgroup === 0 && i !== 0) {
                formatedText += groupSep;
            }
            formatedText += whole.charAt(i);
        }

        // format fraction part.
        while (fraction.length < fractionSize) {
            fraction += '0';
        }

        if (fractionSize && fractionSize !== '0') {
            formatedText += decimalSep + fraction.substr(0, fractionSize);
        }
    } else {
        if (fractionSize > 0 && number < 1) {
            formatedText = number.toFixed(fractionSize);
            number = parseFloat(formatedText);
        }
    }

    if (number === 0) {
        isNegative = false;
    }

    parts.push(isNegative ? pattern.negPre : pattern.posPre, formatedText, isNegative ? pattern.negSuf : pattern.posSuf);

    return parts.join('');
}

function formatCurrency (amount, currencySymbol, fractionSize) {

    var formats = this.$locale.NUMBER_FORMATS;

    if (isUndefined(currencySymbol)) {
        currencySymbol = formats.CURRENCY_SYM;
    }

    if (isUndefined(fractionSize)) {
        fractionSize = formats.PATTERNS[1].maxFrac;
    }

    // if null or undefined pass it through
    return amount == null ? amount : formatNumber$1(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize).replace(/\u00A4/g, currencySymbol);
}

/**
 * Pluralization rules.
 */

var PLURAL_CACHE = {};
var PLURAL_CATEGORY = { ZERO: 'zero', ONE: 'one', TWO: 'two', FEW: 'few', MANY: 'many', OTHER: 'other' };
var PLURAL_LOCALES = [['en'], ['af', 'az', 'bg', 'chr', 'el', 'es', 'eu', 'gsw', 'haw', 'hu', 'ka', 'kk', 'ky', 'ml', 'mn', 'nb', 'ne', 'no', 'or', 'sq', 'ta', 'te', 'tr', 'uz'], ['am', 'bn', 'fa', 'gu', 'hi', 'kn', 'mr', 'zu'], ['ar'], ['be'], ['br'], ['bs', 'hr', 'sr'], ['cs', 'sk'], ['cy'], ['da'], ['fil', 'tl'], ['fr', 'hy'], ['ga'], ['he', 'iw'], ['id', 'in', 'ja', 'km', 'ko', 'lo', 'my', 'th', 'vi', 'zh'], ['is'], ['ln', 'pa'], ['lt'], ['lv'], ['mk'], ['ms'], ['mt'], ['pl'], ['pt'], ['ro'], ['ru', 'uk'], ['si'], ['sl']]; // END LOCALES
var PLURAL_RULES = [function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);if (i == 1 && vf.v == 0) {
        return PLURAL_CATEGORY.ONE;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    if (n == 1) {
        return PLURAL_CATEGORY.ONE;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;if (i == 0 || n == 1) {
        return PLURAL_CATEGORY.ONE;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    if (n == 0) {
        return PLURAL_CATEGORY.ZERO;
    }if (n == 1) {
        return PLURAL_CATEGORY.ONE;
    }if (n == 2) {
        return PLURAL_CATEGORY.TWO;
    }if (n % 100 >= 3 && n % 100 <= 10) {
        return PLURAL_CATEGORY.FEW;
    }if (n % 100 >= 11 && n % 100 <= 99) {
        return PLURAL_CATEGORY.MANY;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    if (n % 10 == 1 && n % 100 != 11) {
        return PLURAL_CATEGORY.ONE;
    }if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) {
        return PLURAL_CATEGORY.FEW;
    }if (n % 10 == 0 || n % 10 >= 5 && n % 10 <= 9 || n % 100 >= 11 && n % 100 <= 14) {
        return PLURAL_CATEGORY.MANY;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    if (n % 10 == 1 && n % 100 != 11 && n % 100 != 71 && n % 100 != 91) {
        return PLURAL_CATEGORY.ONE;
    }if (n % 10 == 2 && n % 100 != 12 && n % 100 != 72 && n % 100 != 92) {
        return PLURAL_CATEGORY.TWO;
    }if ((n % 10 >= 3 && n % 10 <= 4 || n % 10 == 9) && (n % 100 < 10 || n % 100 > 19) && (n % 100 < 70 || n % 100 > 79) && (n % 100 < 90 || n % 100 > 99)) {
        return PLURAL_CATEGORY.FEW;
    }if (n != 0 && n % 1000000 == 0) {
        return PLURAL_CATEGORY.MANY;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);if (vf.v == 0 && i % 10 == 1 && i % 100 != 11 || vf.f % 10 == 1 && vf.f % 100 != 11) {
        return PLURAL_CATEGORY.ONE;
    }if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14) || vf.f % 10 >= 2 && vf.f % 10 <= 4 && (vf.f % 100 < 12 || vf.f % 100 > 14)) {
        return PLURAL_CATEGORY.FEW;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);if (i == 1 && vf.v == 0) {
        return PLURAL_CATEGORY.ONE;
    }if (i >= 2 && i <= 4 && vf.v == 0) {
        return PLURAL_CATEGORY.FEW;
    }if (vf.v != 0) {
        return PLURAL_CATEGORY.MANY;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    if (n == 0) {
        return PLURAL_CATEGORY.ZERO;
    }if (n == 1) {
        return PLURAL_CATEGORY.ONE;
    }if (n == 2) {
        return PLURAL_CATEGORY.TWO;
    }if (n == 3) {
        return PLURAL_CATEGORY.FEW;
    }if (n == 6) {
        return PLURAL_CATEGORY.MANY;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);var wt = getWT(vf.v, vf.f);if (n == 1 || wt.t != 0 && (i == 0 || i == 1)) {
        return PLURAL_CATEGORY.ONE;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);if (vf.v == 0 && (i == 1 || i == 2 || i == 3) || vf.v == 0 && i % 10 != 4 && i % 10 != 6 && i % 10 != 9 || vf.v != 0 && vf.f % 10 != 4 && vf.f % 10 != 6 && vf.f % 10 != 9) {
        return PLURAL_CATEGORY.ONE;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;if (i == 0 || i == 1) {
        return PLURAL_CATEGORY.ONE;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    if (n == 1) {
        return PLURAL_CATEGORY.ONE;
    }if (n == 2) {
        return PLURAL_CATEGORY.TWO;
    }if (n >= 3 && n <= 6) {
        return PLURAL_CATEGORY.FEW;
    }if (n >= 7 && n <= 10) {
        return PLURAL_CATEGORY.MANY;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);if (i == 1 && vf.v == 0) {
        return PLURAL_CATEGORY.ONE;
    }if (i == 2 && vf.v == 0) {
        return PLURAL_CATEGORY.TWO;
    }if (vf.v == 0 && (n < 0 || n > 10) && n % 10 == 0) {
        return PLURAL_CATEGORY.MANY;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);var wt = getWT(vf.v, vf.f);if (wt.t == 0 && i % 10 == 1 && i % 100 != 11 || wt.t != 0) {
        return PLURAL_CATEGORY.ONE;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    if (n >= 0 && n <= 1) {
        return PLURAL_CATEGORY.ONE;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var vf = getVF(n, precision);if (n % 10 == 1 && (n % 100 < 11 || n % 100 > 19)) {
        return PLURAL_CATEGORY.ONE;
    }if (n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 11 || n % 100 > 19)) {
        return PLURAL_CATEGORY.FEW;
    }if (vf.f != 0) {
        return PLURAL_CATEGORY.MANY;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var vf = getVF(n, precision);if (n % 10 == 0 || n % 100 >= 11 && n % 100 <= 19 || vf.v == 2 && vf.f % 100 >= 11 && vf.f % 100 <= 19) {
        return PLURAL_CATEGORY.ZERO;
    }if (n % 10 == 1 && n % 100 != 11 || vf.v == 2 && vf.f % 10 == 1 && vf.f % 100 != 11 || vf.v != 2 && vf.f % 10 == 1) {
        return PLURAL_CATEGORY.ONE;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);if (vf.v == 0 && i % 10 == 1 || vf.f % 10 == 1) {
        return PLURAL_CATEGORY.ONE;
    }return PLURAL_CATEGORY.OTHER;
}, function (n) {
    return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    if (n == 1) {
        return PLURAL_CATEGORY.ONE;
    }if (n == 0 || n % 100 >= 2 && n % 100 <= 10) {
        return PLURAL_CATEGORY.FEW;
    }if (n % 100 >= 11 && n % 100 <= 19) {
        return PLURAL_CATEGORY.MANY;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);if (i == 1 && vf.v == 0) {
        return PLURAL_CATEGORY.ONE;
    }if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14)) {
        return PLURAL_CATEGORY.FEW;
    }if (vf.v == 0 && i != 1 && i % 10 >= 0 && i % 10 <= 1 || vf.v == 0 && i % 10 >= 5 && i % 10 <= 9 || vf.v == 0 && i % 100 >= 12 && i % 100 <= 14) {
        return PLURAL_CATEGORY.MANY;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    if (n >= 0 && n <= 2 && n != 2) {
        return PLURAL_CATEGORY.ONE;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);if (i == 1 && vf.v == 0) {
        return PLURAL_CATEGORY.ONE;
    }if (vf.v != 0 || n == 0 || n != 1 && n % 100 >= 1 && n % 100 <= 19) {
        return PLURAL_CATEGORY.FEW;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);if (vf.v == 0 && i % 10 == 1 && i % 100 != 11) {
        return PLURAL_CATEGORY.ONE;
    }if (vf.v == 0 && i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 12 || i % 100 > 14)) {
        return PLURAL_CATEGORY.FEW;
    }if (vf.v == 0 && i % 10 == 0 || vf.v == 0 && i % 10 >= 5 && i % 10 <= 9 || vf.v == 0 && i % 100 >= 11 && i % 100 <= 14) {
        return PLURAL_CATEGORY.MANY;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);if (n == 0 || n == 1 || i == 0 && vf.f == 1) {
        return PLURAL_CATEGORY.ONE;
    }return PLURAL_CATEGORY.OTHER;
}, function (n, precision) {
    var i = n | 0;var vf = getVF(n, precision);if (vf.v == 0 && i % 100 == 1) {
        return PLURAL_CATEGORY.ONE;
    }if (vf.v == 0 && i % 100 == 2) {
        return PLURAL_CATEGORY.TWO;
    }if (vf.v == 0 && i % 100 >= 3 && i % 100 <= 4 || vf.v != 0) {
        return PLURAL_CATEGORY.FEW;
    }return PLURAL_CATEGORY.OTHER;
}]; // END RULES

PLURAL_LOCALES.map(function (locales, i) {
    locales.map(function (locale) {
        PLURAL_CACHE[locale] = PLURAL_RULES[i];
    });
});

function plural (id, num, precision) {

    var match = id.match(/^\w+/i);

    if (match) {
        id = match[0];
    }

    if (!PLURAL_CACHE[id]) {
        id = 'en';
    }

    return PLURAL_CACHE[id](num, precision);
}

function getDecimals(n) {
    n = n + '';
    var i = n.indexOf('.');
    return i == -1 ? 0 : n.length - i - 1;
}

function getVF(n, precision) {
    var v = precision;

    if (undefined === v) {
        v = Math.min(getDecimals(n), 3);
    }

    var base = Math.pow(10, v);
    var f = (n * base | 0) % base;
    return { v: v, f: f };
}

var approximate_multiplier = 0.75;
var default_type = "default";
var time_in_seconds = {
    "second": 1,
    "minute": 60,
    "hour": 3600,
    "day": 86400,
    "week": 604800,
    "month": 2629743.83,
    "year": 31556926
};
function relativeDate (date, options) {

    date = date instanceof Date ? date : new Date(date);

    if (options && options.max && Math.abs((date - new Date()) / 1000) > options["max"]) {
        return formatDate(date);
    }

    return format((date - new Date()) / 1000, options, this.$locale.TIMESPAN_FORMATS, this.$locale.TIMESPAN_FORMATS.localeID || this.$locale.id);
}

function calculate_unit(seconds, unit_options) {
    var key, multiplier, obj, options;
    if (unit_options == null) {
        unit_options = {};
    }
    options = {};
    for (key in unit_options) {
        obj = unit_options[key];
        options[key] = obj;
    }
    if (options.approximate == null) {
        options["approximate"] = false;
    }
    multiplier = options.approximate ? approximate_multiplier : 1;
    if (seconds < time_in_seconds.minute * multiplier) {
        return "second";
    } else if (seconds < time_in_seconds.hour * multiplier) {
        return "minute";
    } else if (seconds < time_in_seconds.day * multiplier) {
        return "hour";
    } else if (seconds < time_in_seconds.week * multiplier) {
        return "day";
    } else if (seconds < time_in_seconds.month * multiplier) {
        return "week";
    } else if (seconds < time_in_seconds.year * multiplier) {
        return "month";
    } else {
        return "year";
    }
}

function calculate_time(seconds, unit) {
    return Math.round(seconds / time_in_seconds[unit]);
}

function format(seconds, fmt_options, patterns, locale) {
    var key, number, obj, options;
    if (fmt_options == null) {
        fmt_options = {};
    }
    options = {};
    for (key in fmt_options) {
        obj = fmt_options[key];
        options[key] = obj;
    }
    options["direction"] || (options["direction"] = seconds < 0 ? "ago" : "until");
    if (options["unit"] === null || options["unit"] === void 0) {
        options["unit"] = calculate_unit(Math.abs(seconds), options);
    }
    options["type"] || (options["type"] = default_type);
    options["number"] = calculate_time(Math.abs(seconds), options["unit"]);
    number = calculate_time(Math.abs(seconds), options["unit"]);
    options["rule"] = plural(locale, number);
    return patterns[options["direction"]][options["unit"]][options["type"]][options["rule"]].replace(/\{[0-9]\}/, number.toString());
}

var DATETIME_FORMATS = { "AMPMS": ["AM", "PM"], "DAY": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "ERANAMES": ["Before Christ", "Anno Domini"], "ERAS": ["BC", "AD"], "FIRSTDAYOFWEEK": 6, "MONTH": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "SHORTDAY": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], "SHORTMONTH": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], "STANDALONEMONTH": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "WEEKENDRANGE": [5, 6], "fullDate": "EEEE, MMMM d, y", "longDate": "MMMM d, y", "medium": "MMM d, y h:mm:ss a", "mediumDate": "MMM d, y", "mediumTime": "h:mm:ss a", "short": "M/d/yy h:mm a", "shortDate": "M/d/yy", "shortTime": "h:mm a" };
var NUMBER_FORMATS = { "CURRENCY_SYM": "$", "DECIMAL_SEP": ".", "GROUP_SEP": ",", "PATTERNS": [{ "gSize": 3, "lgSize": 3, "maxFrac": 3, "minFrac": 0, "minInt": 1, "negPre": "-", "negSuf": "", "posPre": "", "posSuf": "" }, { "gSize": 3, "lgSize": 3, "maxFrac": 2, "minFrac": 2, "minInt": 1, "negPre": "-¤", "negSuf": "", "posPre": "¤", "posSuf": "" }] };
var id = "en";
var localeID = "en";
var TIMESPAN_FORMATS = { "ago": { "second": { "default": { "one": "{0} second ago", "other": "{0} seconds ago" } }, "minute": { "default": { "one": "{0} minute ago", "other": "{0} minutes ago" } }, "hour": { "default": { "one": "{0} hour ago", "other": "{0} hours ago" } }, "day": { "default": { "one": "{0} day ago", "other": "{0} days ago" } }, "week": { "default": { "one": "{0} week ago", "other": "{0} weeks ago" } }, "month": { "default": { "one": "{0} month ago", "other": "{0} months ago" } }, "year": { "default": { "one": "{0} year ago", "other": "{0} years ago" } } }, "until": { "second": { "default": { "one": "In {0} second", "other": "In {0} seconds" } }, "minute": { "default": { "one": "In {0} minute", "other": "In {0} minutes" } }, "hour": { "default": { "one": "In {0} hour", "other": "In {0} hours" } }, "day": { "default": { "one": "In {0} day", "other": "In {0} days" } }, "week": { "default": { "one": "In {0} week", "other": "In {0} weeks" } }, "month": { "default": { "one": "In {0} month", "other": "In {0} months" } }, "year": { "default": { "one": "In {0} year", "other": "In {0} years" } } }, "none": { "second": { "default": { "one": "{0} second", "other": "{0} seconds" }, "short": { "one": "{0} sec", "other": "{0} secs" }, "abbreviated": { "one": "{0}s", "other": "{0}s" } }, "minute": { "default": { "one": "{0} minute", "other": "{0} minutes" }, "short": { "one": "{0} min", "other": "{0} mins" }, "abbreviated": { "one": "{0}m", "other": "{0}m" } }, "hour": { "default": { "one": "{0} hour", "other": "{0} hours" }, "short": { "one": "{0} hr", "other": "{0} hrs" }, "abbreviated": { "one": "{0}h", "other": "{0}h" } }, "day": { "default": { "one": "{0} day", "other": "{0} days" }, "short": { "one": "{0} day", "other": "{0} days" }, "abbreviated": { "one": "{0}d", "other": "{0}d" } }, "week": { "default": { "one": "{0} week", "other": "{0} weeks" }, "short": { "one": "{0} wk", "other": "{0} wks" } }, "month": { "default": { "one": "{0} month", "other": "{0} months" }, "short": { "one": "{0} mth", "other": "{0} mths" } }, "year": { "default": { "one": "{0} year", "other": "{0} years" }, "short": { "one": "{0} yr", "other": "{0} yrs" } } }, "localeID": "en" };
var defaultLocale = {
	DATETIME_FORMATS: DATETIME_FORMATS,
	NUMBER_FORMATS: NUMBER_FORMATS,
	id: id,
	localeID: localeID,
	TIMESPAN_FORMATS: TIMESPAN_FORMATS
};

function plugin(Vue) {

    var vue = Vue.prototype;

    if (!vue.$locale) {
        vue.$locale = defaultLocale;
    }

    Util(Vue);

    vue.$date = formatDate;
    vue.$number = formatNumber;
    vue.$currency = formatCurrency;
    vue.$relativeDate = relativeDate;

    Vue.filter('date', formatDate);
    Vue.filter('number', formatNumber);
    Vue.filter('currency', formatCurrency);
    Vue.filter('relativeDate', relativeDate);
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * vue-resource v0.7.4
 * https://github.com/vuejs/vue-resource
 * Released under the MIT License.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

/**
 * Utility functions.
 */

var util = {};
var config = {};
var array = [];
var console = window.console;
function Util (Vue) {
    util = Vue.util;
    config = Vue.config;
}

var isArray = Array.isArray;

function warn(msg) {
    if (console && util.warn && (!config.silent || config.debug)) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

function error(msg) {
    if (console) {
        console.error(msg);
    }
}

function nextTick(cb, ctx) {
    return util.nextTick(cb, ctx);
}

function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

function toLower(str) {
    return str ? str.toLowerCase() : '';
}

function isString(val) {
    return typeof val === 'string';
}

function isFunction(val) {
    return typeof val === 'function';
}

function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
}

function each(obj, iterator) {

    var i, key;

    if (typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

function extend(target) {

    var args = array.slice.call(arguments, 1);

    args.forEach(function (arg) {
        _merge(target, arg);
    });

    return target;
}

function merge(target) {

    var args = array.slice.call(arguments, 1);

    args.forEach(function (arg) {
        _merge(target, arg, true);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

function root (options, next) {

    var url = next(options);

    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
        url = options.root + '/' + url;
    }

    return url;
}

function query (options, next) {

    var urlParams = Object.keys(Url.options.params),
        query = {},
        url = next(options);

    each(options.params, function (value, key) {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
}

function legacy (options, next) {

    var variables = [],
        url = next(options);

    url = url.replace(/(\/?):([a-z]\w*)/gi, function (match, slash, name) {

        warn('The `:' + name + '` parameter syntax has been deprecated. Use the `{' + name + '}` syntax instead.');

        if (options.params[name]) {
            variables.push(name);
            return slash + encodeUriSegment(options.params[name]);
        }

        return '';
    });

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
}

function encodeUriSegment(value) {

    return encodeUriQuery(value, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
}

function encodeUriQuery(value, spaces) {

    return encodeURIComponent(value).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, spaces ? '%20' : '+');
}

/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */

function expand(url, params, variables) {

    var tmpl = parse(url),
        expanded = tmpl.expand(params);

    if (variables) {
        variables.push.apply(variables, tmpl.vars);
    }

    return expanded;
}

function parse(template) {

    var operators = ['+', '#', '.', '/', ';', '?', '&'],
        variables = [];

    return {
        vars: variables,
        expand: function expand(context) {
            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
                if (expression) {

                    var operator = null,
                        values = [];

                    if (operators.indexOf(expression.charAt(0)) !== -1) {
                        operator = expression.charAt(0);
                        expression = expression.substr(1);
                    }

                    expression.split(/,/g).forEach(function (variable) {
                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                        variables.push(tmp[1]);
                    });

                    if (operator && operator !== '+') {

                        var separator = ',';

                        if (operator === '?') {
                            separator = '&';
                        } else if (operator !== '#') {
                            separator = operator;
                        }

                        return (values.length !== 0 ? operator : '') + values.join(separator);
                    } else {
                        return values.join(',');
                    }
                } else {
                    return encodeReserved(literal);
                }
            });
        }
    };
}

function getValues(context, operator, key, modifier) {

    var value = context[key],
        result = [];

    if (isDefined(value) && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();

            if (modifier && modifier !== '*') {
                value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
        } else {
            if (modifier === '*') {
                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            result.push(encodeValue(operator, value[k], k));
                        }
                    });
                }
            } else {
                var tmp = [];

                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        tmp.push(encodeValue(operator, value));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            tmp.push(encodeURIComponent(k));
                            tmp.push(encodeValue(operator, value[k].toString()));
                        }
                    });
                }

                if (isKeyOperator(operator)) {
                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
                } else if (tmp.length !== 0) {
                    result.push(tmp.join(','));
                }
            }
        }
    } else {
        if (operator === ';') {
            result.push(encodeURIComponent(key));
        } else if (value === '' && (operator === '&' || operator === '?')) {
            result.push(encodeURIComponent(key) + '=');
        } else if (value === '') {
            result.push('');
        }
    }

    return result;
}

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
    return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

    if (key) {
        return encodeURIComponent(key) + '=' + value;
    } else {
        return value;
    }
}

function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part);
        }
        return part;
    }).join('');
}

function template (options) {

    var variables = [],
        url = expand(options.url, options.params, variables);

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
}

/**
 * Service for URL templating.
 */

var ie = document.documentMode;
var el = document.createElement('a');

function Url(url, params) {

    var self = this || {},
        options = url,
        transform;

    if (isString(url)) {
        options = { url: url, params: params };
    }

    options = merge({}, Url.options, self.$options, options);

    Url.transforms.forEach(function (handler) {
        transform = factory(handler, transform, self.$vm);
    });

    return transform(options);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transforms = [template, legacy, query, root];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

    var params = [],
        escape = encodeURIComponent;

    params.add = function (key, value) {

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

    if (ie) {
        el.href = url;
        url = el.href;
    }

    el.href = url;

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return function (options) {
        return handler.call(vm, options, next);
    };
}

function serialize(params, obj, scope) {

    var array = isArray(obj),
        plain = isPlainObject(obj),
        hash;

    each(obj, function (value, key) {

        hash = isObject(value) || isArray(value);

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {
            params.add(key, value);
        }
    });
}

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;

function Promise$2(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$2.reject = function (r) {
    return new Promise$2(function (resolve, reject) {
        reject(r);
    });
};

Promise$2.resolve = function (x) {
    return new Promise$2(function (resolve, reject) {
        resolve(x);
    });
};

Promise$2.all = function all(iterable) {
    return new Promise$2(function (resolve, reject) {
        var count = 0,
            result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$2.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$2.race = function race(iterable) {
    return new Promise$2(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$2.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p$1 = Promise$2.prototype;

p$1.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x['then'];

            if (x !== null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;
                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p$1.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p$1.notify = function notify() {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            resolve(onResolved.call(undefined, promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected.call(undefined, promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p$1.then = function then(onResolved, onRejected) {
    var promise = this;

    return new Promise$2(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p$1.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

var PromiseObj = window.Promise || Promise$2;

function Promise$1(executor, context) {

    if (executor instanceof PromiseObj) {
        this.promise = executor;
    } else {
        this.promise = new PromiseObj(executor.bind(context));
    }

    this.context = context;
}

Promise$1.all = function (iterable, context) {
    return new Promise$1(PromiseObj.all(iterable), context);
};

Promise$1.resolve = function (value, context) {
    return new Promise$1(PromiseObj.resolve(value), context);
};

Promise$1.reject = function (reason, context) {
    return new Promise$1(PromiseObj.reject(reason), context);
};

Promise$1.race = function (iterable, context) {
    return new Promise$1(PromiseObj.race(iterable), context);
};

var p = Promise$1.prototype;

p.bind = function (context) {
    this.context = context;
    return this;
};

p.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    this.promise = this.promise.then(fulfilled, rejected);

    return this;
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    this.promise = this.promise.catch(rejected);

    return this;
};

p.finally = function (callback) {

    return this.then(function (value) {
        callback.call(this);
        return value;
    }, function (reason) {
        callback.call(this);
        return PromiseObj.reject(reason);
    });
};

p.success = function (callback) {

    warn('The `success` method has been deprecated. Use the `then` method instead.');

    return this.then(function (response) {
        return callback.call(this, response.data, response.status, response) || response;
    });
};

p.error = function (callback) {

    warn('The `error` method has been deprecated. Use the `catch` method instead.');

    return this.catch(function (response) {
        return callback.call(this, response.data, response.status, response) || response;
    });
};

p.always = function (callback) {

    warn('The `always` method has been deprecated. Use the `finally` method instead.');

    var cb = function cb(response) {
        return callback.call(this, response.data, response.status, response) || response;
    };

    return this.then(cb, cb);
};

function xdrClient (request) {
    return new Promise$1(function (resolve) {

        var xdr = new XDomainRequest(),
            response = { request: request },
            handler;

        request.cancel = function () {
            xdr.abort();
        };

        xdr.open(request.method, Url(request), true);

        handler = function handler(event) {

            response.data = xdr.responseText;
            response.status = xdr.status;
            response.statusText = xdr.statusText || '';

            resolve(response);
        };

        xdr.timeout = 0;
        xdr.onload = handler;
        xdr.onabort = handler;
        xdr.onerror = handler;
        xdr.ontimeout = function () {};
        xdr.onprogress = function () {};

        xdr.send(request.data);
    });
}

var originUrl = Url.parse(location.href);
var supportCors = 'withCredentials' in new XMLHttpRequest();

var exports$1 = {
    request: function request(_request) {

        if (_request.crossOrigin === null) {
            _request.crossOrigin = crossOrigin(_request);
        }

        if (_request.crossOrigin) {

            if (!supportCors) {
                _request.client = xdrClient;
            }

            _request.emulateHTTP = false;
        }

        return _request;
    }
};

function crossOrigin(request) {

    var requestUrl = Url.parse(Url(request));

    return requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host;
}

var exports$2 = {
    request: function request(_request) {

        if (_request.emulateJSON && isPlainObject(_request.data)) {
            _request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            _request.data = Url.params(_request.data);
        }

        if (isObject(_request.data) && /FormData/i.test(_request.data.toString())) {
            delete _request.headers['Content-Type'];
        }

        if (isPlainObject(_request.data)) {
            _request.data = JSON.stringify(_request.data);
        }

        return _request;
    },
    response: function response(_response) {

        try {
            _response.data = JSON.parse(_response.data);
        } catch (e) {}

        return _response;
    }
};

function jsonpClient (request) {
    return new Promise$1(function (resolve) {

        var callback = '_jsonp' + Math.random().toString(36).substr(2),
            response = { request: request, data: null },
            handler,
            script;

        request.params[request.jsonp] = callback;
        request.cancel = function () {
            handler({ type: 'cancel' });
        };

        script = document.createElement('script');
        script.src = Url(request);
        script.type = 'text/javascript';
        script.async = true;

        window[callback] = function (data) {
            response.data = data;
        };

        handler = function handler(event) {

            if (event.type === 'load' && response.data !== null) {
                response.status = 200;
            } else if (event.type === 'error') {
                response.status = 404;
            } else {
                response.status = 0;
            }

            resolve(response);

            delete window[callback];
            document.body.removeChild(script);
        };

        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
}

var exports$3 = {
    request: function request(_request) {

        if (_request.method == 'JSONP') {
            _request.client = jsonpClient;
        }

        return _request;
    }
};

var exports$4 = {
    request: function request(_request) {

        if (isFunction(_request.beforeSend)) {
            _request.beforeSend.call(this, _request);
        }

        return _request;
    }
};

/**
 * HTTP method override Interceptor.
 */

var exports$5 = {
    request: function request(_request) {

        if (_request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(_request.method)) {
            _request.headers['X-HTTP-Method-Override'] = _request.method;
            _request.method = 'POST';
        }

        return _request;
    }
};

var exports$6 = {
    request: function request(_request) {

        _request.method = _request.method.toUpperCase();
        _request.headers = extend({}, Http.headers.common, !_request.crossOrigin ? Http.headers.custom : {}, Http.headers[_request.method.toLowerCase()], _request.headers);

        if (isPlainObject(_request.data) && /^(GET|JSONP)$/i.test(_request.method)) {
            extend(_request.params, _request.data);
            delete _request.data;
        }

        return _request;
    }
};

/**
 * Timeout Interceptor.
 */

var exports$7 = function exports() {

    var timeout;

    return {
        request: function request(_request) {

            if (_request.timeout) {
                timeout = setTimeout(function () {
                    _request.cancel();
                }, _request.timeout);
            }

            return _request;
        },
        response: function response(_response) {

            clearTimeout(timeout);

            return _response;
        }
    };
};

function interceptor (handler, vm) {

    return function (client) {

        if (isFunction(handler)) {
            handler = handler.call(vm, Promise$1);
        }

        return function (request) {

            if (isFunction(handler.request)) {
                request = handler.request.call(vm, request);
            }

            return when(request, function (request) {
                return when(client(request), function (response) {

                    if (isFunction(handler.response)) {
                        response = handler.response.call(vm, response);
                    }

                    return response;
                });
            });
        };
    };
}

function when(value, fulfilled, rejected) {

    var promise = Promise$1.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

function xhrClient (request) {
    return new Promise$1(function (resolve) {

        var xhr = new XMLHttpRequest(),
            response = { request: request },
            handler;

        request.cancel = function () {
            xhr.abort();
        };

        xhr.open(request.method, Url(request), true);

        handler = function handler(event) {

            response.data = 'response' in xhr ? xhr.response : xhr.responseText;
            response.status = xhr.status === 1223 ? 204 : xhr.status; // IE9 status bug
            response.statusText = trim(xhr.statusText || '');
            response.headers = xhr.getAllResponseHeaders();

            resolve(response);
        };

        xhr.timeout = 0;
        xhr.onload = handler;
        xhr.onabort = handler;
        xhr.onerror = handler;
        xhr.ontimeout = function () {};
        xhr.onprogress = function () {};

        if (isPlainObject(request.xhr)) {
            extend(xhr, request.xhr);
        }

        if (isPlainObject(request.upload)) {
            extend(xhr.upload, request.upload);
        }

        each(request.headers || {}, function (value, header) {
            xhr.setRequestHeader(header, value);
        });

        xhr.send(request.data);
    });
}

function Client (request) {

    var response = (request.client || xhrClient)(request);

    return Promise$1.resolve(response).then(function (response) {

        if (response.headers) {

            var headers = parseHeaders(response.headers);

            response.headers = function (name) {

                if (name) {
                    return headers[toLower(name)];
                }

                return headers;
            };
        }

        response.ok = response.status >= 200 && response.status < 300;

        return response;
    });
}

function parseHeaders(str) {

    var headers = {},
        value,
        name,
        i;

    if (isString(str)) {
        each(str.split('\n'), function (row) {

            i = row.indexOf(':');
            name = trim(toLower(row.slice(0, i)));
            value = trim(row.slice(i + 1));

            if (headers[name]) {

                if (isArray(headers[name])) {
                    headers[name].push(value);
                } else {
                    headers[name] = [headers[name], value];
                }
            } else {

                headers[name] = value;
            }
        });
    }

    return headers;
}

/**
 * Service for sending network requests.
 */

var jsonType = { 'Content-Type': 'application/json' };

function Http(url, options) {

    var self = this || {},
        client = Client,
        request,
        promise;

    Http.interceptors.forEach(function (handler) {
        client = interceptor(handler, self.$vm)(client);
    });

    options = isObject(url) ? url : extend({ url: url }, options);
    request = merge({}, Http.options, self.$options, options);
    promise = client(request).bind(self.$vm).then(function (response) {

        return response.ok ? response : Promise$1.reject(response);
    }, function (response) {

        if (response instanceof Error) {
            error(response);
        }

        return Promise$1.reject(response);
    });

    if (request.success) {
        promise.success(request.success);
    }

    if (request.error) {
        promise.error(request.error);
    }

    return promise;
}

Http.options = {
    method: 'get',
    data: '',
    params: {},
    headers: {},
    xhr: null,
    upload: null,
    jsonp: 'callback',
    beforeSend: null,
    crossOrigin: null,
    emulateHTTP: false,
    emulateJSON: false,
    timeout: 0
};

Http.headers = {
    put: jsonType,
    post: jsonType,
    patch: jsonType,
    delete: jsonType,
    common: { 'Accept': 'application/json, text/plain, */*' },
    custom: { 'X-Requested-With': 'XMLHttpRequest' }
};

Http.interceptors = [exports$4, exports$7, exports$3, exports$5, exports$2, exports$6, exports$1];

['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {

    Http[method] = function (url, data, success, options) {

        if (isFunction(data)) {
            options = success;
            success = data;
            data = undefined;
        }

        if (isObject(success)) {
            options = success;
            success = undefined;
        }

        return this(url, extend({ method: method, data: data, success: success }, options));
    };
});

function Resource(url, params, actions, options) {

    var self = this || {},
        resource = {};

    actions = extend({}, Resource.actions, actions);

    each(actions, function (action, name) {

        action = merge({ url: url, params: params || {} }, options, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var options = extend({}, action),
        params = {},
        data,
        success,
        error;

    switch (args.length) {

        case 4:

            error = args[3];
            success = args[2];

        case 3:
        case 2:

            if (isFunction(args[1])) {

                if (isFunction(args[0])) {

                    success = args[0];
                    error = args[1];

                    break;
                }

                success = args[1];
                error = args[2];
            } else {

                params = args[0];
                data = args[1];
                success = args[2];

                break;
            }

        case 1:

            if (isFunction(args[0])) {
                success = args[0];
            } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
                data = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
    }

    options.data = data;
    options.params = extend({}, options.params, params);

    if (success) {
        options.success = success;
    }

    if (error) {
        options.error = error;
    }

    return options;
}

Resource.actions = {

    get: { method: 'GET' },
    save: { method: 'POST' },
    query: { method: 'GET' },
    update: { method: 'PUT' },
    remove: { method: 'DELETE' },
    delete: { method: 'DELETE' }

};

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = Promise$1;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function get() {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get: function get() {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get: function get() {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get: function get() {
                var _this = this;

                return function (executor) {
                    return new Vue.Promise(executor, _this);
                };
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /leven/leven/app/sprinkles/core/app/components/input-date.vue Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <template>\n| \n|     <div class=\"uk-grid uk-grid-small\" data-uk-grid-margin>");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /leven/leven/app/sprinkles/core/app/components/input-filter.vue Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <template>\n| \n|     <div class=\"uk-form-select pk-filter\" :class=\"{'uk-active': value }\">");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /leven/leven/app/sprinkles/core/app/components/loader.vue Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <template>\n| \n|     <svg class=\"pk-loader\" width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\">");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /leven/leven/app/sprinkles/core/app/components/modal.vue Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <template>\n| \n|     <div class=\"uk-modal\">");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {

    template: '<ul class="uk-pagination"></ul>',

    props: {
        page: {
            default: 0
        },

        pages: {
            default: 1
        },
        
        replaceState: {
            type: Boolean,
            default: true
        }
    },

    created: function () {

        this.key = this.$parent.$options.name + '.pagination';

        if (this.page === null && this.$session.get(this.key)) {
            this.$set('page', this.$session.get(this.key));
        }

        if (this.replaceState) {
            this.$state('page', this.page);
        }

    },

    ready: function () {

        var vm = this;

        this.pagination = UIkit.pagination(this.$el, {pages: this.pages, currentPage: this.page || 0});
        this.pagination.on('select.uk.pagination', function (e, page) {
            vm.$set('page', page);
        });

    },

    watch: {

        page: function (page) {
            this.pagination.selectPage(page || 0);
            this.$session.set(this.key, page || 0);
        },

        pages: function (pages) {
            this.pagination.render(pages);
        }

    }

};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {

    params: ['group'],

    update: function (subSelector) {

        var self = this, keypath = this.arg, group = this.params.group ? this.params.group + ' ' : '', selector = group + subSelector;

        this.selector = selector;
        this.$el = this.vm.$el;
        this.checked = false;
        this.number = this.el.getAttribute('number') !== null;

        $(this.el).on('change.check-all', function () {
            $(selector, self.$el).prop('checked', $(this).prop('checked'));
            self.selected(true);
        });

        this.handler = [
            function () {
                self.selected(true);
                self.state();
            },
            function (e) {
                if (!$(e.target).is(':input, a') && !window.getSelection().toString()) {
                    $(this).find(subSelector).trigger('click');
                }
            }
        ];

        $(this.$el).on('change.check-all', selector, this.handler[0]);
        $(this.$el).on('click.check-all', group + '.check-item', this.handler[1]);

        this.unbindWatcher = this.vm.$watch(keypath, function (selected) {

            $(subSelector, this.$el).prop('checked', function () {
                return selected.indexOf(self.toNumber($(this).val())) !== -1;
            });

            self.selected();
            self.state();
        });
    },

    unbind: function () {

        var self = this;

        $(this.el).off('.check-all');

        if (this.handler) {
            this.handler.forEach(function (handler) {
                $(self.$el).off('.check-all', handler);
            });
        }

        if (this.unbindWatcher) {
            this.unbindWatcher();
        }
    },

    state: function () {

        var el = $(this.el);

        if (this.checked === undefined) {
            el.prop('indeterminate', true);
        } else {
            el.prop('checked', this.checked).prop('indeterminate', false);
        }

    },

    selected: function (update) {

        var self = this, keypath = this.arg, selected = [], values = [], value;

        $(this.selector, this.$el).each(function () {

            value = self.toNumber($(this).val());
            values.push(value);

            if ($(this).prop('checked')) {
                selected.push(value);
            }
        });

        if (update) {

            update = this.vm.$get(keypath).filter(function (value) {
                return values.indexOf(value) === -1;
            });

            this.vm.$set(keypath, update.concat(selected));
        }

        if (selected.length === 0) {
            this.checked = false;
        } else if (selected.length == values.length) {
            this.checked = true;
        } else {
            this.checked = undefined;
        }

    },

    toNumber: function (value) {
        return this.number ? Number(value) : value;
    }

};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var _ = Vue.util;

module.exports = {

    priority: 500,

    bind: function () {

        var self = this, el = this.el, buttons = (_.getAttr(el, 'buttons') || '').split(',');

        this.options = {
            title: false,
            labels: {
                Ok: buttons[0] || this.vm.$trans('Ok'),
                Cancel: buttons[1] || this.vm.$trans('Cancel')
            }
        };

        this.dirs = this.vm._directives.filter(function (dir) {
            return dir.name == 'on' && dir.el === el;
        });

        this.dirs.forEach(function (dir) {

            _.off(dir.el, dir.arg, dir.handler);
            _.on(dir.el, dir.arg, function (e) {
                UIkit.modal.confirm(self.vm.$trans(self.options.text), function () {
                    dir.handler(e);
                }, self.options);
            });

        });
    },

    update: function (value) {

        // vue-confirm="'Title':'Text...?'"
        if (this.arg) {
            this.options.title = this.arg;
        }

        // vue-confirm="'Text...?'"
        if (typeof value === 'string') {
            this.options.text = value;
        }

        // vue-confirm="{title:'Title', text:'Text...?'}"
        if (typeof value === 'object') {
            this.options = _.extend(this.options, value);
        }
    },

    unbind: function () {
        this.dirs.forEach(function (dir) {
            try {
                _.off(dir.el, dir.arg, dir.handler);
            } catch (e) {
            }
        });
    }

};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var md5 = __webpack_require__(1);
var mutex = {};

module.exports = {

    priority: 100,

    params: ['colored'],

    update: function (value) {

        var el = this.el, vm = this, cache = this.vm.$session,
            hash = value.indexOf('@') !== -1 ? md5(value.toLowerCase()) : value,
            name = this.el.getAttribute('title') || this.el.getAttribute('alt'),
            colored = this.params.colored,
            size = (this.el.getAttribute('height') || 50) * 2,
            url = '//gravatar.com/avatar/' + hash + '?' + ['r=g', 's=' + (size)].join('&'),
            key = 'gravatar.' + [hash, size, name].join('.');

        // load image url from cache if exists
        if (cache.get(key)) {
            el.setAttribute('src', cache.get(key));
            return;
        }

        el.setAttribute('src', this.draw(name, size, colored));

        if (!mutex[key]) {

            mutex[key] = new Vue.Promise(function (resolve) {
                var img = new Image();
                if (img.crossOrigin !== undefined) {
                    img.crossOrigin = 'anonymous';
                    url += '&d=blank';
                    img.onload = function () {
                        cache.set(key, vm.draw(name, size, colored, img));
                        resolve();
                    };
                } else {
                    // IE Fallback (no CORS support for img):
                    url += '&d=404';
                    img.onload = function () {
                        resolve(url);
                    };
                }

                img.src = url;
            });
        }

        mutex[key].then(function (url) {
            el.setAttribute('src', url || cache.get(key));
            return url;
        });

    },

    draw: function (name, size, colored, img) {
        name = name || '';
        size = size || 60;

        var colours = [
                "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
                "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
            ],

            nameSplit = String(name).toUpperCase().split(' '),
            initials, charIndex, colourIndex, canvas, context, dataURI;


        if (nameSplit.length == 1) {
            initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
        } else {
            initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
        }

        if (window.devicePixelRatio) {
            size = (size * window.devicePixelRatio);
        }

        charIndex = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
        colourIndex = charIndex % 20;
        canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        context = canvas.getContext("2d");

        context.fillStyle = colored ? colours[colourIndex - 1] : '#cfd2d7';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = Math.round(canvas.width / 2) + "px Arial";
        context.textAlign = "center";
        context.fillStyle = "#FFF";
        context.fillText(initials, size / 2, size / 1.5);

        if (img) {
            context.drawImage(img, 0, 0, size, size);
        }

        dataURI = canvas.toDataURL();
        canvas = null;

        return dataURI;
    }

};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {

    update: function (value) {

        var el = $(this.el), img = new Image();

        img.onload = function() {
            el.css('background-image', "url('"+value+"')");
        };

        img.src = value;
    }

};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {

    bind: function () {

        var self = this;

        this.dir       = '';
        this.active    = false;
        this.indicator = $('<i class="uk-icon-justify uk-margin-small-left"></i>');

        $(this.el).addClass('pk-table-order uk-visible-hover-inline').on('click.order', function (){

            self.dir = (self.dir == 'asc') ? 'desc':'asc';
            self.vm.$set(self.expression, [self.arg, self.dir].join(' '));

        }).append(this.indicator);
    },

    update: function (data) {

        var parts = data.split(' '),
            field = parts[0],
            dir   = parts[1] || 'asc';

        this.indicator.removeClass('pk-icon-arrow-up pk-icon-arrow-down');
        $(this.el).removeClass('uk-active');

        if (field == this.arg) {
            this.active = true;
            this.dir    = dir;

            $(this.el).addClass('uk-active');
            this.indicator.removeClass('uk-invisible').addClass(dir == 'asc' ? 'pk-icon-arrow-down':'pk-icon-arrow-up');
        } else {
            this.indicator.addClass('pk-icon-arrow-down uk-invisible');
            this.active = false;
            this.dir    = '';
        }
    },

    unbind: function () {
        $(this.el).removeClass('pk-table-order').off('.order');
        this.indicator.remove();
    }

};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {

    bind: function () {

        this.cls = this.el.classList.contains('uk-grid') ? 'uk-grid-margin':'uk-margin-small-top';
    },

    update: function (data) {

        var $el = $(this.el), cls = this.cls;

        Vue.nextTick(function () {
            UIkit.Utils.stackMargin($el.children(), {cls:cls});
        });
    }

};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (Vue) {

    var _ = Vue.util;
    var cache = {};

    /**
     * Asset provides a promise based assets manager.
     */
    function Asset(assets) {

        var promises = [], $url = (this.$url || Vue.url), _assets = [];

        Object.keys(assets).forEach(function (type) {

            if (!Asset[type]) {
                return;
            }

            _assets = _.isArray(assets[type]) ? assets[type] : [assets[type]];

            for (var i = 0; i < _assets.length; i++) {

                if (!_assets[i]) {
                    continue;
                }

                if (!cache[_assets[i]]) {
                    cache[_assets[i]] = Asset[type]($url(_assets[i]));
                }

                promises.push(cache[_assets[i]]);
            }

        });

        return Vue.Promise.all(promises).bind(this);
    }

    _.extend(Asset, {

        css: function (url) {

            return new Vue.Promise(function (resolve, reject) {

                var link = document.createElement('link');

                link.onload = function () {
                    resolve(url);
                };
                link.onerror = function () {
                    reject(url);
                };

                link.href = url;
                link.type = 'text/css';
                link.rel = 'stylesheet';

                document.getElementsByTagName('head')[0].appendChild(link);
            });

        },

        js: function (url) {

            return new Vue.Promise(function (resolve, reject) {

                var script = document.createElement('script');

                script.onload = function () {
                    resolve(url);
                };
                script.onerror = function () {
                    reject(url);
                };
                script.src = url;

                document.getElementsByTagName('head')[0].appendChild(script);
            });

        },

        image: function (url) {

            return new Vue.Promise(function (resolve, reject) {

                var img = new Image();

                img.onload = function () {
                    resolve(url);
                };
                img.onerror = function () {
                    reject(url);
                };

                img.src = url;
            });

        }

    });

    Object.defineProperty(Vue.prototype, '$asset', {

        get: function () {
            return _.extend(Asset.bind(this), Asset);
        }

    });

    Vue.asset = Asset;

    return Asset;

};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (Vue) {

    Vue.http.interceptors.unshift({

        request: function (request) {

            if (!request.crossOrigin) {
                request.headers['X-XSRF-TOKEN'] = Vue.cache.get('_csrf');
            }

            return request;
        }

    });

    Vue.cache.set('_csrf', window.$pagekit.csrf);

};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (Vue) {

    Vue.filter('baseUrl', function (url) {
        return _.startsWith(url, Vue.url.options.root) ? url.substr(Vue.url.options.root.length) : url;
    });

    Vue.filter('trans', function (id, parameters, domain, locale) {
        return this.$trans(id, parameters, domain, locale);
    });

    Vue.filter('transChoice', function (id, number, parameters, domain, locale) {
        return this.$transChoice(id, number, parameters, domain, locale);
    });

    Vue.filter('trim', {

        write: function (value) {
            return value.trim();
        }

    });

};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (Vue) {

    Vue.prototype.$notify = function () {

        var args = arguments,
            msgs = window.jQuery('.pk-system-messages'),
            UIkit = window.UIkit || {};

        if (args[0]) {
            args[0] = this.$trans(args[0]);
        }

        if (UIkit.notify) {
            UIkit.notify.apply(this, args);
        } else if (msgs) {
            msgs.empty().append('<div class="uk-alert uk-alert-' + (args[1] || 'info') + '"><p>' + args[0] + '</p></div>');
        }

    };

};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var md5 = __webpack_require__(1);

module.exports = function (Vue) {

    Vue.http.interceptors.unshift(function () {

            var hit, key, lifetime;

            return {
                request: function (request) {

                    if (request.cache !== undefined && /^(GET|JSONP)$/i.test(request.method)) {

                        if (_.isObject(request.cache)) {
                            lifetime = request.cache.lifetime;
                            key = '_resource.' + request.cache.key;
                        } else {
                            lifetime = request.cache;
                            key = '_resource.' + md5(JSON.stringify(request));
                        }

                        hit = Vue.cache.get(key);
                        if (hit) {
                            request.client = function () {
                                return hit;
                            };
                        }
                    }

                    return request;
                },

                response: function (response) {

                    if (key && !hit && response.ok) {
                        Vue.cache.set(key, response, lifetime);
                    }

                    return response;
                }
            };

        }
    );

};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (Vue) {

    var State = function (key, value) {

        var vm = this;

        var current = (new RegExp(key + '=([^&]*)&?')).exec(location.search);
        if (!value && current) {
            vm.$set(key, current[1]);
        }

        if (value !== undefined) {
            history.replaceState({key: key, value: this[key]}, '', modifyQuery(location.search, key, value));
        }
        
        this.$watch(key, function (value) {
            history.pushState({key: key, value: value}, '', modifyQuery(location.search, key, value));
        });

        window.onpopstate = function (event) {
            if (event.state && event.state.key === key) {
                vm.$set(key, event.state.value);
            }
        };

    };

    Object.defineProperty(Vue.prototype, '$state', {

        get: function () {

            return State.bind(this);

        }

    });

};

function modifyQuery(query, key, value) {
    query = query.substr(1);
    query = query.replace(new RegExp(key + '=[^&]*&?'), '');

    if (query.length && query[query.length - 1] !== '&') {
        query += '&';
    }

    return '?' + query + [key, value].join('=');
}


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var config = window.$locale || {translations: {}};

/**
 * Copyright (c) William DURAND <william.durand1@gmail.com> (https://github.com/willdurand/BazingaJsTranslationBundle)
 */

var Translator = (function (document, undefined) {

    "use strict";

    var _messages     = {},
        _domains      = [],
        _sPluralRegex = new RegExp(/^\w+\: +(.+)$/),
        _cPluralRegex = new RegExp(/^\s*((\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]]))\s?(.+?)$/),
        _iPluralRegex = new RegExp(/^\s*(\{\s*(\-?\d+[\s*,\s*\-?\d+]*)\s*\})|([\[\]])\s*(-Inf|\-?\d+)\s*,\s*(\+?Inf|\-?\d+)\s*([\[\]])/);

    /**
     * Replace placeholders in given message.
     *
     * **WARNING:** used placeholders are removed.
     *
     * @param {String} message      The translated message
     * @param {Object} placeholders The placeholders to replace
     * @return {String}             A human readable message
     * @api private
     */
    function replace_placeholders(message, placeholders) {
        var _i,
            _prefix = Translator.placeHolderPrefix,
            _suffix = Translator.placeHolderSuffix;

        for (_i in placeholders) {
            var _r = new RegExp(_prefix + _i + _suffix, 'g');

            if (_r.test(message)) {
                message = message.replace(_r, placeholders[_i]);
            }
        }

        return message;
    }

    /**
     * Get the message based on its id, its domain, and its locale. If domain or
     * locale are not specified, it will try to find the message using fallbacks.
     *
     * @param {String} id               The message id
     * @param {String} domain           The domain for the message or null to guess it
     * @param {String} locale           The locale or null to use the default
     * @param {String} currentLocale    The current locale or null to use the default
     * @param {String} localeFallback   The fallback (default) locale
     * @return {String}                 The right message if found, `undefined` otherwise
     * @api private
     */
    function get_message(id, domain, locale, currentLocale, localeFallback) {
        var _locale = locale || currentLocale || localeFallback,
            _domain = domain;

        if (undefined == _messages[_locale]) {
            if (undefined == _messages[localeFallback]) {
                return id;
            }

            _locale = localeFallback;
        }

        if (undefined === _domain || null === _domain) {
            for (var i = 0; i < _domains.length; i++) {
                if (has_message(_locale, _domains[i], id) ||
                    has_message(localeFallback, _domains[i], id)) {
                    _domain = _domains[i];

                    break;
                }
            }
        }

        if (has_message(_locale, _domain, id)) {
            return _messages[_locale][_domain][id];
        }

        var _length, _parts, _last, _lastLength;

        while (_locale.length > 2) {
            _length     = _locale.length;
            _parts      = _locale.split(/[\s_]+/);
            _last       = _parts[_parts.length - 1];
            _lastLength = _last.length;

            if (1 === _parts.length) {
                break;
            }

            _locale = _locale.substring(0, _length - (_lastLength + 1));

            if (has_message(_locale, _domain, id)) {
                return _messages[_locale][_domain][id];
            }
        }

        if (has_message(localeFallback, _domain, id)) {
            return _messages[localeFallback][_domain][id];
        }

        return id;
    }

    /**
     * Just look for a specific locale / domain / id if the message is available,
     * helpfull for message availability validation
     *
     * @param {String} locale           The locale
     * @param {String} domain           The domain for the message
     * @param {String} id               The message id
     * @return {Boolean}                Return `true` if message is available,
     *                      `               false` otherwise
     * @api private
     */
    function has_message(locale, domain, id) {
        if (undefined == _messages[locale]) {
            return false;
        }

        if (undefined == _messages[locale][domain]) {
            return false;
        }

        if (undefined == _messages[locale][domain][id]) {
            return false;
        }

        return true;
    }

    /**
     * The logic comes from the Symfony2 PHP Framework.
     *
     * Given a message with different plural translations separated by a
     * pipe (|), this method returns the correct portion of the message based
     * on the given number, the current locale and the pluralization rules
     * in the message itself.
     *
     * The message supports two different types of pluralization rules:
     *
     * interval: {0} There is no apples|{1} There is one apple|]1,Inf] There is %count% apples
     * indexed:  There is one apple|There is %count% apples
     *
     * The indexed solution can also contain labels (e.g. one: There is one apple).
     * This is purely for making the translations more clear - it does not
     * affect the functionality.
     *
     * The two methods can also be mixed:
     *     {0} There is no apples|one: There is one apple|more: There is %count% apples
     *
     * @param {String} message  The message id
     * @param {Number} number   The number to use to find the indice of the message
     * @param {String} locale   The locale
     * @return {String}         The message part to use for translation
     * @api private
     */
    function pluralize(message, number, locale) {
        var _p,
            _e,
            _explicitRules = [],
            _standardRules = [],
            _parts         = message.split(Translator.pluralSeparator),
            _matches       = [];

        for (_p = 0; _p < _parts.length; _p++) {
            var _part = _parts[_p];

            if (_cPluralRegex.test(_part)) {
                _matches = _part.match(_cPluralRegex);
                _explicitRules[_matches[0]] = _matches[_matches.length - 1];
            } else if (_sPluralRegex.test(_part)) {
                _matches = _part.match(_sPluralRegex);
                _standardRules.push(_matches[1]);
            } else {
                _standardRules.push(_part);
            }
        }

        for (_e in _explicitRules) {
            if (_iPluralRegex.test(_e)) {
                _matches = _e.match(_iPluralRegex);

                if (_matches[1]) {
                    var _ns = _matches[2].split(','),
                        _n;

                    for (_n in _ns) {
                        if (number == _ns[_n]) {
                            return _explicitRules[_e];
                        }
                    }
                } else {
                    var _leftNumber  = convert_number(_matches[4]);
                    var _rightNumber = convert_number(_matches[5]);

                    if (('[' === _matches[3] ? number >= _leftNumber : number > _leftNumber) &&
                        (']' === _matches[6] ? number <= _rightNumber : number < _rightNumber)) {
                        return _explicitRules[_e];
                    }
                }
            }
        }

        return _standardRules[plural_position(number, locale)] || _standardRules[0] || undefined;
    }

    /**
     * The logic comes from the Symfony2 PHP Framework.
     *
     * Convert number as String, "Inf" and "-Inf"
     * values to number values.
     *
     * @param {String} number   A litteral number
     * @return {Number}         The int value of the number
     * @api private
     */
    function convert_number(number) {
        if ('-Inf' === number) {
            return Number.NEGATIVE_INFINITY;
        } else if ('+Inf' === number || 'Inf' === number) {
            return Number.POSITIVE_INFINITY;
        }

        return parseInt(number, 10);
    }

    /**
     * The logic comes from the Symfony2 PHP Framework.
     *
     * Returns the plural position to use for the given locale and number.
     *
     * @param {Number} number  The number to use to find the indice of the message
     * @param {String} locale  The locale
     * @return {Number}        The plural position
     * @api private
     */
    function plural_position(number, locale) {
        var _locale = locale;

        if ('pt_BR' === _locale) {
            _locale = 'xbr';
        }

        if (_locale.length > 3) {
            _locale = _locale.split('_')[0];
        }

        switch (_locale) {
            case 'bo':
            case 'dz':
            case 'id':
            case 'ja':
            case 'jv':
            case 'ka':
            case 'km':
            case 'kn':
            case 'ko':
            case 'ms':
            case 'th':
            case 'tr':
            case 'vi':
            case 'zh':
                return 0;
            case 'af':
            case 'az':
            case 'bn':
            case 'bg':
            case 'ca':
            case 'da':
            case 'de':
            case 'el':
            case 'en':
            case 'eo':
            case 'es':
            case 'et':
            case 'eu':
            case 'fa':
            case 'fi':
            case 'fo':
            case 'fur':
            case 'fy':
            case 'gl':
            case 'gu':
            case 'ha':
            case 'he':
            case 'hu':
            case 'is':
            case 'it':
            case 'ku':
            case 'lb':
            case 'ml':
            case 'mn':
            case 'mr':
            case 'nah':
            case 'nb':
            case 'ne':
            case 'nl':
            case 'nn':
            case 'no':
            case 'om':
            case 'or':
            case 'pa':
            case 'pap':
            case 'ps':
            case 'pt':
            case 'so':
            case 'sq':
            case 'sv':
            case 'sw':
            case 'ta':
            case 'te':
            case 'tk':
            case 'ur':
            case 'zu':
                return (number == 1) ? 0 : 1;

            case 'am':
            case 'bh':
            case 'fil':
            case 'fr':
            case 'gun':
            case 'hi':
            case 'ln':
            case 'mg':
            case 'nso':
            case 'xbr':
            case 'ti':
            case 'wa':
                return ((number === 0) || (number == 1)) ? 0 : 1;

            case 'be':
            case 'bs':
            case 'hr':
            case 'ru':
            case 'sr':
            case 'uk':
                return ((number % 10 == 1) && (number % 100 != 11)) ? 0 : (((number % 10 >= 2) && (number % 10 <= 4) && ((number % 100 < 10) || (number % 100 >= 20))) ? 1 : 2);

            case 'cs':
            case 'sk':
                return (number == 1) ? 0 : (((number >= 2) && (number <= 4)) ? 1 : 2);

            case 'ga':
                return (number == 1) ? 0 : ((number == 2) ? 1 : 2);

            case 'lt':
                return ((number % 10 == 1) && (number % 100 != 11)) ? 0 : (((number % 10 >= 2) && ((number % 100 < 10) || (number % 100 >= 20))) ? 1 : 2);

            case 'sl':
                return (number % 100 == 1) ? 0 : ((number % 100 == 2) ? 1 : (((number % 100 == 3) || (number % 100 == 4)) ? 2 : 3));

            case 'mk':
                return (number % 10 == 1) ? 0 : 1;

            case 'mt':
                return (number == 1) ? 0 : (((number === 0) || ((number % 100 > 1) && (number % 100 < 11))) ? 1 : (((number % 100 > 10) && (number % 100 < 20)) ? 2 : 3));

            case 'lv':
                return (number === 0) ? 0 : (((number % 10 == 1) && (number % 100 != 11)) ? 1 : 2);

            case 'pl':
                return (number == 1) ? 0 : (((number % 10 >= 2) && (number % 10 <= 4) && ((number % 100 < 12) || (number % 100 > 14))) ? 1 : 2);

            case 'cy':
                return (number == 1) ? 0 : ((number == 2) ? 1 : (((number == 8) || (number == 11)) ? 2 : 3));

            case 'ro':
                return (number == 1) ? 0 : (((number === 0) || ((number % 100 > 0) && (number % 100 < 20))) ? 1 : 2);

            case 'ar':
                return (number === 0) ? 0 : ((number == 1) ? 1 : ((number == 2) ? 2 : (((number >= 3) && (number <= 10)) ? 3 : (((number >= 11) && (number <= 99)) ? 4 : 5))));

            default:
                return 0;
        }
    }

    /**
     * @type {Array}        An array
     * @type {String}       An element to compare
     * @return {Boolean}    Return `true` if `array` contains `element`,
     *                      `false` otherwise
     * @api private
     */
    function exists(array, element) {
        for (var i = 0; i < array.length; i++) {
            if (element === array[i]) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get the current application's locale based on the `lang` attribute
     * on the `html` tag.
     *
     * @return {String}     The current application's locale
     * @api private
     */
    function get_current_locale() {
        return document.documentElement.lang.replace('-', '_');
    }

    return {
        /**
         * The current locale.
         *
         * @type {String}
         * @api public
         */
        locale: get_current_locale(),

        /**
         * Fallback locale.
         *
         * @type {String}
         * @api public
         */
        fallback: null,

        /**
         * Placeholder prefix.
         *
         * @type {String}
         * @api public
         */
        placeHolderPrefix: '%',

        /**
         * Placeholder suffix.
         *
         * @type {String}
         * @api public
         */
        placeHolderSuffix: '%',

        /**
         * Default domain.
         *
         * @type {String}
         * @api public
         */
        defaultDomain: 'messages',

        /**
         * Plurar separator.
         *
         * @type {String}
         * @api public
         */
        pluralSeparator: '|',

        /**
         * Adds a translation entry.
         *
         * @param {String} id       The message id
         * @param {String} message  The message to register for the given id
         * @param {String} domain   The domain for the message or null to use the default
         * @param {String} locale   The locale or null to use the default
         * @return {Object}         Translator
         * @api public
         */
        add: function (id, message, domain, locale) {
            var _locale = locale || this.locale || this.fallback,
                _domain = domain || this.defaultDomain;

            if (!_messages[_locale]) {
                _messages[_locale] = {};
            }

            if (!_messages[_locale][_domain]) {
                _messages[_locale][_domain] = {};
            }

            _messages[_locale][_domain][id] = message;

            if (false === exists(_domains, _domain)) {
                _domains.push(_domain);
            }

            return this;
        },


        /**
         * Translates the given message.
         *
         * @param {String} id             The message id
         * @param {Object} parameters     An array of parameters for the message
         * @param {String} domain         The domain for the message or null to guess it
         * @param {String} locale         The locale or null to use the default
         * @return {String}               The translated string
         * @api public
         */
        trans: function (id, parameters, domain, locale) {
            var _message = get_message(
                id,
                domain,
                locale,
                this.locale,
                this.fallback
            );

            return replace_placeholders(_message, parameters || {});
        },

        /**
         * Translates the given choice message by choosing a translation according to a number.
         *
         * @param {String} id             The message id
         * @param {Number} number         The number to use to find the indice of the message
         * @param {Object} parameters     An array of parameters for the message
         * @param {String} domain         The domain for the message or null to guess it
         * @param {String} locale         The locale or null to use the default
         * @return {String}               The translated string
         * @api public
         */
        transChoice: function (id, number, parameters, domain, locale) {
            var _message = get_message(
                id,
                domain,
                locale,
                this.locale,
                this.fallback
            );

            var _number = parseInt(number, 10) || 0;

            if (undefined != _message) {
                _message = pluralize(
                    _message,
                    _number,
                    locale || this.locale || this.fallback
                );
            }

            return replace_placeholders(_message, parameters || {});
        },

        /**
         * Loads translations from JSON.
         *
         * @param {String} data     A JSON string or object literal
         * @return {Object}         Translator
         * @api public
         */
        fromJSON: function (data) {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }

            if (data.locale) {
                this.locale = data.locale;
            }

            if (data.fallback) {
                this.fallback = data.fallback;
            }

            if (data.defaultDomain) {
                this.defaultDomain = data.defaultDomain;
            }

            if (data.translations) {
                for (var locale in data.translations) {
                    for (var domain in data.translations[locale]) {
                        for (var id in data.translations[locale][domain]) {
                            this.add(id, data.translations[locale][domain][id], domain, locale);
                        }
                    }
                }
            }

            return this;
        },

        /**
         * @api public
         */
        reset: function () {
            _messages   = {};
            _domains    = [];
            this.locale = get_current_locale();
        }
    };

})(document, undefined);

module.exports = function (Vue) {

    Vue.prototype.$trans = Translator.trans.bind(Translator);
    Vue.prototype.$transChoice = Translator.transChoice.bind(Translator);

    Object.defineProperty(Vue.prototype, '$locale', {

        get: function () {
            return config;
        },

        set: function (locale) {
            config = locale;
            Translator.fromJSON(locale);
            Translator.locale = locale.locale;
        }

    });

    Vue.prototype.$locale = config;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * JSONStorage - a simple storage helper inspired by the redis api.
 *
 * @author     Artur Heinze
 * @copyright  (c) since 2012 Artur Heinze
 * @license    MIT - http://opensource.org/licenses/MIT
 * @url        https://github.com/aheinze/JSONStorage
 */
(function(global) {

    function Store(name, adapter) {

        var $this = this;

        this.name      = name;
        this.adapter   = adapter;
        this.data      = adapter.load(name);
        this.data.__ex = this.data.__ex || {}; // expires data container

        // cleanup expires data
        (function() {

            var time = (new Date()).getTime();

            for (var key in $this.data.__ex) {
                if ($this.data.__ex[key] < time) {
                    delete $this.data[key];
                    delete $this.data.__ex[key];
                }
            }

        })();
    }

    Store.prototype.store = function() {
        try {
            this.adapter.store(this.name, this.data);
        }catch(e){}
    };

    Store.prototype.toString = function() {
        return JSON.stringify(this.data);
    };

    Store.prototype.flushdb = function() {

        var $this = this;

        this.data = {};
        this.data.__ex = {};

        setTimeout(function() {
            $this.store();
        }, 0); // async saving!?

        return true;
    };

    Store.prototype.get = function(key, def) {

        if (this.data.__ex[key] && this.data.__ex[key] < (new Date()).getTime()) {
            delete this.data[key];
            delete this.data.__ex[key];
        }

        return this.data[key] !== undefined ? this.data[key] : def;
    };

    Store.prototype.set = function(key, value) {
        this.data[key] = value;
        this.store();
    };

    Store.prototype.setex = function(key, seconds, value) {
        this.set(key, value);
        this.expire(key, seconds);
    };

    Store.prototype.expire = function(key, seconds) {
        if (this.data[key]) this.data.__ex[key] = (new Date()).getTime() + (seconds * 1000);
    };

    Store.prototype.exists = function(key) {
        return this.get(key, "___no___") !== "___no___";
    };

    Store.prototype.del = function() {

        var keys = arguments,
            key = null,
            removed = 0;

        for (var i = 0; i < keys.length; i++) {

            key = keys[i];

            if (this.exists(key)) {
                delete this.data[key];

                if (this.data.__ex[key]) {
                    delete this.data.__ex[key];
                }

                removed++;
            }
        }

        this.store();

        return removed;
    };

    Store.prototype.type = function(key) {

        key = this.get(key);

        if (typeof(key) === 'object') {
            return JSON.stringify(key)[0] === "[" ? "list" : "set";
        }

        return typeof(key);
    };

    Store.prototype.append = function(key, value) {

        value = String(value);

        var current = String(this.get(key, "")),
            newone = current + value;

        this.set(key, newone);

        return newone.length;
    };

    Store.prototype.incr = function(key, by) {

        by = by || 1;

        var current = Number(this.get(key, 0)),
            newone = current + by;

        this.set(key, newone);

        return newone;
    };

    Store.prototype.decr = function(key, by) {
        by = by || 1;
        return this.incr(key, (by * -1));
    };

    /* List methods */

    Store.prototype.llen = function(key) {
        return this.get(key, []).length;
    };

    Store.prototype.lpush = function(key, value) {
        var list = this.get(key, []),
            ret = list.unshift(value);

        this.set(key, list);
        return ret;
    };

    Store.prototype.rpush = function(key, value) {
        var list = this.get(key, []),
            ret = list.push(value);

        this.set(key, list);
        return ret;
    };

    Store.prototype.lset = function(key, index, value) {
        var list = this.get(key, []);

        if (index < 0) {
            index = list.length - Math.abs(index);
        }

        if (list[index]) {
            list[index] = value;
            this.set(key, list);
            return true;
        }

        return false;
    };

    Store.prototype.lindex = function(key, index) {
        var list = this.get(key, []);

        if (index < 0) {
            index = list.length - Math.abs(index);
        }

        return list[index] ? list[index] : null;
    };

    /* Hash methods */

    Store.prototype.hset = function(key, field, value) {
        var set = this.get(key, {});

        set[field] = value;
        this.set(key, set);
    };

    Store.prototype.hget = function(key, field, def) {
        var set = this.get(key, {});

        return set[field] !== undefined ? set[field] : def;
    };

    Store.prototype.hgetall = function(key) {
        return this.get(key, {});
    };

    Store.prototype.hexists = function(key, field) {
        var set = this.get(key, {});

        return (set[field] !== undefined);
    };

    Store.prototype.hkeys = function(key) {
        var set = this.get(key, {}),
            keys = [],
            name = null;

        for (name in set) {
            if (set.hasOwnProperty(name)) {
                keys.push(name);
            }
        }

        return keys;
    };

    Store.prototype.hvals = function(key) {
        var set = this.get(key, {}),
            vals = [],
            name = null;

        for (name in set) {
            if (set.hasOwnProperty(name)) {
                vals.push(keys[name]);
            }
        }

        return vals;
    };

    Store.prototype.hlen = function(key) {
        return this.hkeys(key).length;
    };

    Store.prototype.hdel = function(key) {

        if (!this.exists(key)) return 0;

        var set = this.get(key, {}),
            field = null,
            removed = 0;

        for (var i = 1; i < arguments.length; i++) {

            field = arguments[i];

            if (set[field] !== undefined) {
                delete set[field];
                removed++;
            }
        }

        this.set(key, set);

        return removed;
    };

    Store.prototype.hincrby = function(key, field, by) {
        by = by || 1;
        var current = Number(this.hget(key, field, 0)),
            newone = current + by;

        this.hset(key, field, newone);

        return newone;
    };

    Store.prototype.hmget = function(key) {
        var set = this.get(key, {}),
            field = null,
            values = [];

        for (var i = 1; i < arguments.length; i++) {
            field = arguments[i];
            values.push(set[field] !== undefined ? set[field] : null);
        }

        return values;
    };

    Store.prototype.hmset = function(key) {
        var set = this.get(key, {}),
            field = null,
            value = null;

        for (var i = 1; i < arguments.length; i++) {
            field = arguments[i];
            value = arguments[(i + 1)] ? arguments[(i + 1)] : null;
            set[field] = value;
            i = i + 1;
        }

        this.set(key, set);
    };

    var JSONStorage = {

        select: function(name, adapter) {
            return (new Store(name, typeof(adapter)=='object' ? adapter : (this.adapters[adapter] || this.adapters['memory']) ));
        },

        adapters: {

            memory: (function() {
                var dbs = {};

                return {
                    load: function(name) {
                        return dbs[name] || {};
                    },
                    store: function(name, data) {
                        dbs[name] = data;
                    }
                }
            })(),

            local: {
                load: function(name) {
                    return global.localStorage["jsonstorage." + name] ? JSON.parse(global.localStorage["jsonstorage." + name]) : {};
                },
                store: function(name, data) {
                    global.localStorage["jsonstorage." + name] = JSON.stringify(data);
                }
            },

            session: {
                load: function(name) {
                    return global.sessionStorage["jsonstorage." + name] ? JSON.parse(global.sessionStorage["jsonstorage." + name]) : {};
                },
                store: function(name, data) {
                    global.sessionStorage["jsonstorage." + name] = JSON.stringify(data);
                }
            }
        }
    };

    // AMD support
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
            return JSONStorage;
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module != 'undefined' && module.exports) {
            exports = module.exports = JSONStorage;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.JSONStorage = JSONStorage;
    } else {
        global.JSONStorage = JSONStorage;
    }

})(typeof window === 'undefined' ? this : window);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

function install (Vue) {

    var config = window.$pagekit;


    Vue.config.debug = false;
    Vue.cache = Vue.prototype.$cache = __webpack_require__(0)(config.url);
    Vue.session = Vue.prototype.$session = __webpack_require__(0)('session',
        {

            load: function (name) {

                if (Vue.cache.get('_session') !== Vue.cache.get('_csrf')) {
                    Vue.cache.remove(name);
                }
                Vue.cache.set('_session', Vue.cache.get('_csrf'));

                return Vue.cache.get(name, {});
            },

            store: function (name, data) {
                return Vue.cache.set(name, data);
            }

        });

    /**
     * Libraries
     */

    __webpack_require__(2);
    __webpack_require__(3);
    __webpack_require__(4);
    __webpack_require__(16)(Vue);
    __webpack_require__(21)(Vue);
    __webpack_require__(20)(Vue);
    __webpack_require__(17)(Vue);
    __webpack_require__(19)(Vue);
    __webpack_require__(22)(Vue);
    __webpack_require__(18)(Vue);

    /**
     * Components
     */

    Vue.component('v-loader', __webpack_require__(7));
    Vue.component('v-modal', __webpack_require__(8));
    Vue.component('v-pagination', __webpack_require__(9));
    Vue.component('input-filter', __webpack_require__(6));

      __webpack_require__(5);
    // require('./components/input-image.vue');
    // require('./components/input-image-meta.vue');
     //require('./components/input-video.vue');

    /**
     * Directives
     */

    Vue.directive('check-all', __webpack_require__(10));
    Vue.directive('confirm', __webpack_require__(11));
    Vue.directive('gravatar', __webpack_require__(12));
    Vue.directive('order', __webpack_require__(14));
    Vue.directive('lazy-background', __webpack_require__(13));
    Vue.directive('stack-margin', __webpack_require__(15));

    /**
     * Resource
     */

    Vue.url.options.root = config.url.replace(/\/index.php$/i, '');
    Vue.http.options.root = config.url;
    Vue.http.options.emulateHTTP = true;

    Vue.url.route = function (url, params) {

        var options = url;

        if (!_.isPlainObject(options)) {
            options = {url: url, params: params};
        }

        Vue.util.extend(options, {
            root: Vue.http.options.root
        });

        return this(options);
    };

    Vue.url.current = Vue.url.parse(window.location.href);

    Vue.ready = function (fn) {

        if (Vue.util.isObject(fn)) {

            var options = fn;

            fn = function () {
                new Vue(options);
            };

        }

        var handle = function () {
            document.removeEventListener('DOMContentLoaded', handle);
            window.removeEventListener('load', handle);
            fn();
        };

        if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', handle);
            window.addEventListener('load', handle);
        }

    };


}

if (window.Vue) {
    Vue.use(install);
}

window.history.pushState = window.history.pushState || function() {};
window.history.replaceState = window.history.replaceState || function() {};


/***/ })
/******/ ]);