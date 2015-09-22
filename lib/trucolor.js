'use strict'

/*
 trucolor (v0.0.9-alpha.63)
 24bit color tools for the command line
 */
var _less, _package

_package = require('../package.json')

_less = require('less/package.json')

exports.getVersion = function (long) {
  switch (long) {
    case 3:
      return _package.name + ' v' + _package.version + ' (lessc v' + _less.version + ')'
    case 2:
      return _package.name + ' v' + _package.version
    default:
      return '' + _package.version
  }
}
