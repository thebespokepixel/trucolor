'use strict';

/*
 trucolor (v0.1.6-beta.2) 24bit color tools for the command line
 Processing Path Router
 */
var _io, _routingTable, console, converter, less, processRoutes, trucolor;

trucolor = require('..');

console = global.vConsole;

less = require('less');

converter = require('color-convert');

_io = require("./io");

_routingTable = [];

less.logger.addListener({
  debug: function(msg) {
    return console.debug(msg);
  },
  info: function(msg) {
    return console.info(msg);
  },
  warn: function(msg) {
    return console.warn(msg);
  },
  error: function(msg) {
    return console.error(msg);
  }
});

processRoutes = function() {
  var humanName_, i, inCache, len, name_, process_, routes;
  routes = {
    fast: {},
    slow: {},
    less: {},
    attr: {},
    cidx: {}
  };
  console.debug("\nProcessing routes");
  for (i = 0, len = _routingTable.length; i < len; i++) {
    process_ = _routingTable[i];
    name_ = process_.getName();
    humanName_ = process_.getHuman();
    routes.attr[humanName_] = process_.getAttrs();
    if (process_.locked() && process_.hasSource()) {
      trucolor.cacheClear(name_);
    }
    inCache = trucolor.cacheGet(name_);
    if (!inCache) {
      if (!(process_.hasSource() || process_.hasAttrs())) {
        console.error("Could not find cache key " + name_);
        process.exit(1);
      }
      if (!process_.needLess()) {
        console.debug("From declared color: " + (process_.getInput()));
        routes.fast[humanName_] = process_.getRGB();
        if (process_.locked()) {
          trucolor.cachePut(name_, process_.getRGB());
        }
      } else {
        console.debug("Adding slow route via Less: " + (process_.getLess()));
        routes.cidx[humanName_] = name_;
        routes.slow[humanName_] = process_.getLess();
      }
    } else {
      console.debug("From cache: " + name_);
      routes.fast[humanName_] = inCache;
    }
  }
  return routes;
};

exports.reset = function() {
  return _routingTable = [];
};

exports.add = function(processor_) {
  _routingTable.push(processor_);
  return processor_;
};

exports.run = function(callback_) {
  var color, lessIn, name, routing;
  routing = processRoutes();
  if (Object.keys(routing.slow).length > 0) {
    lessIn = "out {\n" + (((function() {
      var ref, results;
      ref = routing.slow;
      results = [];
      for (name in ref) {
        color = ref[name];
        results.push([].concat(name + ": " + color));
      }
      return results;
    })()).join('; ')) + ";\n}";
    return less.render(lessIn, {}, function(err, output_) {
      var content, id, ref;
      routing.less = JSON.parse(output_.css.replace(/^out {/, '{').replace(/([0-9a-zA-Z_-]+):\s(#[0-9A-Fa-f]{3,6});/g, '"$1": "$2",').replace(/,\n}/, '\n}'));
      ref = routing.less;
      for (id in ref) {
        content = ref[id];
        routing.fast[id] = converter.hex2rgb(content);
        trucolor.cachePut(routing.cidx[id], routing.fast[id]);
      }
      return callback_(new _io(routing));
    });
  } else {
    return callback_(new _io(routing));
  }
};
