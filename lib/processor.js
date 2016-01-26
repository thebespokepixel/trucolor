'use strict';

/*
 trucolor
 Color process object
 */
var Processor, console;

console = global.vConsole;

Processor = (function() {
  function Processor(name) {
    this.name = name;
    this.attrs = {
      background: false,
      bold: false,
      dim: false,
      italic: false,
      invert: false,
      underline: false,
      blink: false
    };
    this.haveAttrs = false;
    this.haveSource = false;
    this.useLess = false;
    this.prefix = '';
    this.suffix = '';
    this.namePrefix = '';
    this.nameSuffix = '';
    console.debug("\nNew Process:", this.name);
  }

  Processor.prototype.setSource = function(interpreter) {
    this.interpreter = interpreter;
    this.name = this.interpreter.getName();
    this.haveSource = true;
  };

  Processor.prototype.hasSource = function() {
    return this.haveSource;
  };

  Processor.prototype.needLess = function() {
    return this.useLess;
  };

  Processor.prototype.getName = function() {
    if (this.lockName != null) {
      return this.name = this.lockName;
    } else {
      return this.namePrefix + this.name + this.nameSuffix;
    }
  };

  Processor.prototype.lock = function(lockName) {
    this.lockName = lockName;
    return console.debug("Process name locked: " + this.lockName);
  };

  Processor.prototype.locked = function() {
    return this.lockName != null;
  };

  Processor.prototype.getRGB = function() {
    if (this.haveSource) {
      return this.interpreter.getRGB();
    } else {
      return null;
    }
  };

  Processor.prototype.getLess = function() {
    return this.prefix + "rgb(" + (this.interpreter.getRGB()) + ")" + this.suffix;
  };

  Processor.prototype.getInput = function() {
    if (this.haveSource) {
      return this.interpreter.getInput();
    } else {
      return this.name;
    }
  };

  Processor.prototype.getHuman = function() {
    var ref, ref1;
    if (this.haveSource) {
      return (ref = this.lockName) != null ? ref : this.interpreter.getHuman();
    } else {
      return (ref1 = this.lockName) != null ? ref1 : this.name;
    }
  };

  Processor.prototype.hasAttrs = function() {
    return this.haveAttrs;
  };

  Processor.prototype.getAttrs = function() {
    return this.attrs;
  };

  Processor.prototype.setAttr = function(attr_) {
    if (attr_ === 'background' || attr_ === 'bold' || attr_ === 'dim' || attr_ === 'italic' || attr_ === 'invert' || attr_ === 'underline' || attr_ === 'blink') {
      this.haveAttrs = true;
      return this.attrs[attr_] = true;
    }
  };

  Processor.prototype.background = function() {
    this.setAttr('background');
    return console.debug("Special::background");
  };

  Processor.prototype.bold = function() {
    this.setAttr('bold');
    return console.debug("Special::bold");
  };

  Processor.prototype.dim = function() {
    this.setAttr('dim');
    return console.debug("Special::dim");
  };

  Processor.prototype.italic = function() {
    this.setAttr('italic');
    return console.debug("Special::italic");
  };

  Processor.prototype.invert = function() {
    this.setAttr('invert');
    return console.debug("Special::invert");
  };

  Processor.prototype.underline = function() {
    this.setAttr('underline');
    return console.debug("Special::underline");
  };

  Processor.prototype.blink = function() {
    this.setAttr('blink');
    return console.debug("Special::blink");
  };

  Processor.prototype.saturate = function(args) {
    this.prefix = "saturate(" + this.prefix;
    this.suffix = this.suffix + ", " + args.percent + "%)";
    this.namePrefix = "sat-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.percent;
    this.useLess = true;
    return console.debug("Process::saturate", args.percent);
  };

  Processor.prototype.desaturate = function(args) {
    this.prefix = "desaturate(" + this.prefix;
    this.suffix = this.suffix + ", " + args.percent + "%)";
    this.namePrefix = "des-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.percent;
    this.useLess = true;
    return console.debug("Process::desaturate", args.percent);
  };

  Processor.prototype.lighten = function(args) {
    this.prefix = "lighten(" + this.prefix;
    this.suffix = this.suffix + ", " + args.percent + "%)";
    this.namePrefix = "lte-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.percent;
    this.useLess = true;
    return console.debug("Process::lighten", args.percent);
  };

  Processor.prototype.darken = function(args) {
    this.prefix = "darken(" + this.prefix;
    this.suffix = this.suffix + ", " + args.percent + "%)";
    this.namePrefix = "drk-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.percent;
    this.useLess = true;
    return console.debug("Process::darken", args.percent);
  };

  Processor.prototype.spin = function(args) {
    this.prefix = "spin(" + this.prefix;
    this.suffix = this.suffix + ", " + args.rotation + ")";
    this.namePrefix = "spn-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.rotation;
    this.useLess = true;
    return console.debug("Process::spin", args.rotation);
  };

  Processor.prototype.mix = function(args) {
    this.prefix = "mix(" + this.prefix;
    this.suffix = this.suffix + ", " + args.color + ", 50%)";
    this.namePrefix = "mix-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.color;
    this.useLess = true;
    return console.debug("Process::mix", args.color);
  };

  Processor.prototype.multiply = function(args) {
    this.prefix = "multiply(" + this.prefix;
    this.suffix = this.suffix + ", " + args.color + ")";
    this.namePrefix = "mul-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.color;
    this.useLess = true;
    return console.debug("Process::multiply", args.color);
  };

  Processor.prototype.screen = function(args) {
    this.prefix = "screen(" + this.prefix;
    this.suffix = this.suffix + ", " + args.color + ")";
    this.namePrefix = "scr-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.color;
    this.useLess = true;
    return console.debug("Process::screen", args.color);
  };

  Processor.prototype.overlay = function(args) {
    this.prefix = "overlay(" + this.prefix;
    this.suffix = this.suffix + ", " + args.color + ")";
    this.namePrefix = "oly-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.color;
    this.useLess = true;
    return console.debug("Process::overlay", args.color);
  };

  Processor.prototype.softlight = function(args) {
    this.prefix = "softlight(" + this.prefix;
    this.suffix = this.suffix + ", " + args.color + ")";
    this.namePrefix = "sft-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.color;
    this.useLess = true;
    return console.debug("Process::softlight", args.color);
  };

  Processor.prototype.hardlight = function(args) {
    this.prefix = "hardlight(" + this.prefix;
    this.suffix = this.suffix + ", " + args.color + ")";
    this.namePrefix = "hdl-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.color;
    this.useLess = true;
    return console.debug("Process::hardlight", args.color);
  };

  Processor.prototype.difference = function(args) {
    this.prefix = "difference(" + this.prefix;
    this.suffix = this.suffix + ", " + args.color + ")";
    this.namePrefix = "dif-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.color;
    this.useLess = true;
    return console.debug("Process::difference", args.color);
  };

  Processor.prototype.exclusion = function(args) {
    this.prefix = "exclusion(" + this.prefix;
    this.suffix = this.suffix + ", " + args.color + ")";
    this.namePrefix = "exc-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.color;
    this.useLess = true;
    return console.debug("Process::exclusion", args.color);
  };

  Processor.prototype.average = function(args) {
    this.prefix = "average(" + this.prefix;
    this.suffix = this.suffix + ", " + args.color + ")";
    this.namePrefix = "ave-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.color;
    this.useLess = true;
    return console.debug("Process::average", args.color);
  };

  Processor.prototype.negation = function(args) {
    this.prefix = "negation(" + this.prefix;
    this.suffix = this.suffix + ", " + args.color + ")";
    this.namePrefix = "neg-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.color;
    this.useLess = true;
    return console.debug("Process::negation", args.color);
  };

  Processor.prototype.contrast = function(args) {
    this.prefix = "contrast(" + this.prefix;
    if (args.color_dark != null) {
      this.suffix = this.suffix + ", " + args.color_dark + ")";
    }
    if (args.color_light != null) {
      this.suffix = this.suffix + ", " + args.color_dark + ", " + args.color_light + ")";
    }
    if (args.threshold != null) {
      this.suffix = this.suffix + ", " + args.color_dark + ", " + args.color_light + ", " + args.threshold + "%)";
    }
    this.namePrefix = "cnt-" + this.namePrefix;
    this.nameSuffix = this.nameSuffix + "-" + args.color_dark;
    this.useLess = true;
    return console.debug("Process::contrast", args.color_dark, args.color_light, args.threshold);
  };

  return Processor;

})();

module.exports = Processor;
