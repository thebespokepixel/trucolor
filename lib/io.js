'use strict';

/*
 trucolor
 Output Collection
 */
var IOCollection, _output, console, deepAssign;

console = global.vConsole;

deepAssign = require('deep-assign');

_output = require("./output");

IOCollection = (function() {
  function IOCollection(routes_, options_) {
    var color, id, ref;
    if (options_ == null) {
      options_ = {};
    }
    this.collection = new Map();
    console.info("\nDerived Colours");
    ref = routes_.fast;
    for (id in ref) {
      color = ref[id];
      if (this.principal == null) {
        this.principal = id;
      }
      this.collection.set(id, new _output(color, routes_.attr[id], options_));
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

  IOCollection.prototype.toSGR = function() {
    return this.collection.get(this.principal).toSGR();
  };

  IOCollection.prototype.toSwatch = function() {
    return this.collection.get(this.principal).toSwatch();
  };

  IOCollection.prototype.toString = function() {
    return this.collection.get(this.principal).toString();
  };

  IOCollection.prototype.exportCollection = function() {
    return this.collection;
  };

  return IOCollection;

})();

module.exports = IOCollection;
