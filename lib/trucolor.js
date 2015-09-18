'use strict';

/*
 trucolor (v0.0.6-47)
 24bit color tools for the command line
 */
var _less, _package;

_package = require("../package.json");

_less = require("less");

exports.getVersion = function(isLong) {
  if (isLong) {
    return _package.name + " v" + _package.version;
  } else {
    return _package.version;
  }
};
