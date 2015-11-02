'use strict';

/*
	trucolor (v0.0.17)
	24bit color tools for the command line

	Copyright (c) 2015 CryptoComposite

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use, copy,
	modify, merge, publish, distribute, sublicense, and/or sell copies
	of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var _ansiColourSpace, _basicPalette, _batch, _cache, _colorIn, _colorOut, _defined_vars, _less_package, _package, _processor, cache, console, error, error1, less, path,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

console = global.vconsole != null ? global.vconsole : global.vconsole = require('@thebespokepixel/verbosity').console({
  out: process.stderr
});

global.supportsColor = require('supports-color');

global._iTerm = process.env.ITERM_SESSION_ID && (process.env.TERM_PROGRAM === 'iTerm.app');

path = require('path');

less = require('less');

_cache = require("./lib/cache");

try {
  cache = new _cache({
    auto_save: true,
    filename: path.join(process.env.HOME, '/.rgbCache')
  });
} catch (error1) {
  error = error1;
  console.log("Error Setting up new cache");
}

if (cache.load()) {
  console.debug("Cache loaded.");
} else {
  console.warn("Cache cleared.");
  cache.clear();
}

_package = require("./package.json");

_less_package = require("less/package.json");

_batch = require('./lib/batch');

_colorIn = require("./lib/colorIn");

_colorOut = require("./lib/colorOut");

_processor = require("./lib/processor");

_ansiColourSpace = require("./lib/ANSIPalette");

_basicPalette = require("./lib/palette");

_defined_vars = [];

exports.getName = function() {
  return _package.name;
};

exports.getVersion = function(long_) {
  switch (long_) {
    case 3:
      return _package.name + " v" + _package.version + " (lessc v" + _less_package.version + ")";
    case 2:
      return _package.name + " v" + _package.version;
    default:
      return "" + _package.version;
  }
};

exports.cacheGet = function(name_) {
  return cache.get(name_);
};

exports.cachePut = function(name_, value_) {
  return cache.set(name_, value_);
};

exports.addProcessor = function(name_) {
  var colorProcess;
  colorProcess = new _processor(name_);
  _batch.add(colorProcess);
  return colorProcess;
};

exports.basicPalette = function() {
  return _basicPalette;
};

exports.addColor = function(color_) {
  var error2;
  try {
    return new _colorIn(color_);
  } catch (error2) {
    error = error2;
    if (console.canWrite(4)) {
      console.trace(error.message);
    } else {
      console.error(error.message);
    }
    return process.exit(1);
  }
};

exports.setColor = function(color_) {
  var error2;
  try {
    return new colorOut(color_);
  } catch (error2) {
    error = error2;
    if (console.canWrite(4)) {
      console.trace(error.message);
    } else {
      console.error(error.message);
    }
    return process.exit(1);
  }
};

exports.trackVar = function(varname_) {
  return _defined_vars.push(varname_);
};

exports.hasVar = function(varname_) {
  return indexOf.call(_defined_vars, varname_) >= 0;
};

exports.runBatch = _batch.run;
