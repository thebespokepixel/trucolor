'use strict';

/*
	trucolor
	24bit color tools for the command line

	The MIT License (MIT)

	Copyright (c) 2016 Mark Griffiths

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

	Chalkish bits taken from Chalk, under the MIT license.
	(c) 2016 Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
 */
var Chalkish, _cache, _convert_package, _escStringRE, _functions, _interpreter, _less_package, _package, _parser, _processor, _router, _simple, bulk, chalkish, console, simplePalette;

console = global.vConsole != null ? global.vConsole : global.vConsole = require('verbosity').console({
  out: process.stderr
});

_package = require('./package.json');

_less_package = require('less/package.json');

_convert_package = require('color-convert/package.json');

_escStringRE = require('escape-string-regexp');

_interpreter = require('./lib/interpreter');

_processor = require('./lib/processor');

_router = require('./lib/router');

_parser = require('./lib/parser');

_cache = new (require('./lib/cache'));

_simple = null;

_functions = null;

if (!_cache.load(true)) {
  _cache.clear();
}

exports.getName = function() {
  return _package.name;
};

exports.getBin = function() {
  return Object.keys(_package.bin)[0];
};

exports.getDescription = function() {
  return _package.description;
};

exports.getCopyright = function() {
  return "©" + _package.copyright.year + " " + _package.copyright.owner;
};

exports.getBugs = function() {
  return _package.bugs.url;
};

exports.getVersion = function(long_) {
  var version;
  if (long_ == null) {
    long_ = 1;
  }
  version = _package.build_number > 0 ? _package.version + "-Δ" + _package.build_number : "" + _package.version;
  switch (long_) {
    case 4:
      return _package.name + " v" + version + " (color-convert v" + _convert_package.version + ", less v" + _less_package.version + ")";
    case 3:
      return "v" + version + " (color-convert v" + _convert_package.version + ", less v" + _less_package.version + ")";
    case 2:
      return _package.name + " v" + version;
    default:
      return "" + version;
  }
};

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

exports.bulk = bulk = function(options_, object_) {
  var collection, key_, ref, type, value_;
  type = (ref = options_.type) != null ? ref : 'sgr';
  _router.reset();
  for (key_ in object_) {
    value_ = object_[key_];
    _parser([key_ + ":"].concat(value_.split(' ')));
  }
  collection = {};
  _router.run(options_, function(output_) {
    return output_.exportCollection().forEach(function(value_, key_) {
      return collection[key_] = (function() {
        switch (type) {
          case 'value':
            return value_.valueOf();
          case 'swatch':
            return value_.toSwatch();
          default:
            return value_.toSGR();
        }
      })();
    });
  });
  return collection;
};

exports.route = _router.run;

exports.reset = _router.reset;

simplePalette = exports.simplePalette = function(options_) {
  if (options_ == null) {
    options_ = {};
  }
  if (options_.force != null) {
    return bulk(options_, require('./lib/palettes/simple'));
  } else {
    return _simple != null ? _simple : _simple = bulk(options_, require('./lib/palettes/simple'));
  }
};

Chalkish = (function() {
  function Chalkish(styles) {
    var applyPaint, makePainter, proto, styleFactory;
    styleFactory = (function(collection) {
      Object.keys(styles).forEach(function(key_) {
        styles[key_].closeRE = new RegExp(_escStringRE(styles[key_].out), 'g');
        collection[key_] = {
          get: function() {
            return makePainter.call(this, this._styles.concat(key_));
          }
        };
      });
      return collection;
    })({});
    proto = Object.defineProperties((function() {}), styleFactory);
    makePainter = function(styles_) {
      var painter;
      painter = function() {
        return applyPaint.apply(painter, arguments);
      };
      painter._styles = styles_;
      painter.__proto__ = proto;
      return painter;
    };
    applyPaint = function(content_) {
      var i, sgrPair;
      i = this._styles.length;
      while (i--) {
        sgrPair = styles[this._styles[i]];
        content_ = sgrPair["in"] + content_.replace(sgrPair.closeRE, sgrPair["in"]) + sgrPair.out;
      }
      return content_;
    };
    Object.defineProperties(this, (function(collection) {
      Object.keys(styles).forEach(function(name) {
        collection[name] = {
          get: function() {
            return makePainter.call(this, [name]);
          }
        };
      });
      return collection;
    })({}));
  }

  return Chalkish;

})();

chalkish = exports.chalkish = function(styles_) {
  return new Chalkish(styles_);
};

exports.chalkishPalette = function(options_) {
  if (options_ == null) {
    options_ = {};
  }
  if (options_.force != null) {
    return (function(source_) {
      return chalkish(source_);
    })(simplePalette(options_));
  } else {
    return _functions != null ? _functions : _functions = (function(source_) {
      return chalkish(source_);
    })(simplePalette(options_));
  }
};
