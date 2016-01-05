'use strict';

/*
	trucolor (v0.1.4-alpha.5)
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
var _cache, _convert_package, _interpreter, _less_package, _package, _parser, _processor, _router, console;

console = global.vConsole != null ? global.vConsole : global.vConsole = require('@thebespokepixel/verbosity').console({
  out: process.stderr
});

_package = require('./package.json');

_less_package = require('less/package.json');

_convert_package = require('color-convert/package.json');

_interpreter = require('./lib/interpreter');

_processor = require('./lib/processor');

_router = require('./lib/router');

_parser = require('./lib/parser');

_cache = new (require('./lib/cache'));

if (_cache.load()) {
  console.debug("Cache loaded.");
} else {
  console.warn("Cache invalidated.");
  _cache.clear();
}

exports.getName = function() {
  return _package.name;
};

exports.getDescription = function() {
  return _package.description;
};

exports.getVersion = function(long_) {
  switch (long_) {
    case 4:
      return _package.name + " v" + _package.version + " (color-convert v" + _convert_package.version + ", less v" + _less_package.version + ")";
    case 3:
      return "v" + _package.version + " (color-convert v" + _convert_package.version + ", less v" + _less_package.version + ")";
    case 2:
      return _package.name + " v" + _package.version;
    default:
      return "" + _package.version;
  }
};

exports.simplePalette = require('./lib/palettes/simple');

exports.cacheGet = function(name_) {
  return _cache.get(name_);
};

exports.cachePut = function(name_, value_) {
  return _cache.set(name_, value_);
};

exports.cacheClear = function(name_) {
  return _cache.clear(name_);
};

exports.newProcessor = function(name_) {
  return _router.add(new _processor(name_));
};

exports.interpret = function(input_) {
  return new _interpreter(input_);
};

exports.bulk = function(object_, options, callback_) {
  var key_, ref, type, value_;
  type = (ref = options.type) != null ? ref : 'sgr';
  _router.reset();
  for (key_ in object_) {
    value_ = object_[key_];
    _parser([key_ + ":"].concat(value_.split(' ')));
  }
  return _router.run(function(output_) {
    var collection;
    collection = {};
    output_.exportCollection().forEach(function(value_, key_) {
      switch (key_) {
        case 'normal':
        case 'reset':
          return collection[key_] = "" + (value_.SGRout());
        default:
          collection[key_] = (function() {
            switch (type) {
              case 'swatch':
                return value_.swatch();
              default:
                return value_.SGRin();
            }
          })();
          if (value_.hasAttr()) {
            return collection[key_ + "Out"] = value_.SGRout();
          }
      }
    });
    return callback_(collection);
  });
};

exports.route = _router.run;
