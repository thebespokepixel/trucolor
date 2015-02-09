'use strict';

/*
 trucolor (v0.0.6-39) 24bit color tools for the command line
 Color process object
 */
var Process;

Process = (function() {
  Process.prototype.type = 'color';

  Process.prototype.haveColor = false;

  Process.prototype.add = {
    saturate: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::saturate", args.percent);
    },
    desaturate: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::desaturate", args.percent);
    },
    lighten: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::lighten", args.percent);
    },
    darken: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::darken", args.percent);
    },
    spin: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::spin", args.rotation);
    },
    mix: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::mix", args.color);
    },
    multiply: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::multiply", args.color);
    },
    screen: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::screen", args.color);
    },
    overlay: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::overlay", args.color);
    },
    softlight: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::softlight", args.color);
    },
    hardlight: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::hardlight", args.color);
    },
    difference: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::difference", args.color);
    },
    exclusion: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::exclusion", args.color);
    },
    average: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::average", args.color);
    },
    negation: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::negation", args.color);
    },
    contrast: function(args) {
      return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process::contrast", args.color_dark, args.color_light, args.threshold);
    }
  };

  function Process(name) {
    this.name = name;
    (typeof verbose !== "undefined" && verbose !== null) && console.log("New Process:", this.name);
  }

  Process.prototype.setName = function(name) {
    this.name = name;
    return (typeof verbose !== "undefined" && verbose !== null) && console.log("Process name set:", this.name);
  };

  Process.prototype.setVar = function(name) {
    this.name = name;
    (typeof verbose !== "undefined" && verbose !== null) && console.log("Process set to variable type:", this.name);
    return this.type = 'variable';
  };

  Process.prototype.setColor = function(color) {
    this.color = color;
    (typeof verbose !== "undefined" && verbose !== null) && console.log("Process base color set:", this.color);
    return this.haveColor = true;
  };

  return Process;

})();

module.exports = Process;
