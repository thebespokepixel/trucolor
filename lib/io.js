'use strict';

/*
 trucolor (v0.1.4-alpha.5) 24bit color tools for the command line
 Output Collection
 */
var IOCollection, _output, console, deepAssign, terminalFeatures;

console = global.vConsole;

deepAssign = require('deep-assign');

terminalFeatures = require('@thebespokepixel/term-ng');

_output = require("./output");

IOCollection = (function() {
  function IOCollection(routes_) {
    var content, id, ref, ref1;
    this.collection = new Map();
    console.info("\nDerived Colours (Level: " + ((ref = terminalFeatures.color.level) != null ? ref : 0) + ")");
    ref1 = routes_.fast;
    for (id in ref1) {
      content = ref1[id];
      if (this.principal == null) {
        this.principal = id;
      }
      this.collection.set(id, new _output(content, routes_.attr[id]));
    }
  }

  IOCollection.prototype.valueOf = function() {
    var primitive;
    if (this.collection.size === 1) {
      return "" + (this.collection.get(this.principal));
    } else {
      primitive = [];
      this.collection.forEach(function(value_, key_) {
        return primitive.push(key_ + " " + value_);
      });
      return primitive.join('\n');
    }
  };

  IOCollection.prototype.SGRin = function() {
    return this.collection.get(this.principal).SGRin;
  };

  IOCollection.prototype.SGRout = function() {
    return this.collection.get(this.principal).SGRout;
  };

  IOCollection.prototype.swatch = function() {
    return this.collection.get(this.principal).swatch;
  };

  IOCollection.prototype.toString = function() {
    return this.collection.get(this.principal).toString;
  };

  IOCollection.prototype.exportCollection = function() {
    return this.collection;
  };

  return IOCollection;

})();

module.exports = IOCollection;
