'use strict';

/*
 trucolor (v0.1.3) 24bit color tools for the command line
 Resolve Colour to simple RGB Array: [ r, g, b ]
 */
var Interpreter, _named_colors, console, converter,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

console = global.vConsole;

_named_colors = require('./palettes/named');

converter = require('color-convert');

Interpreter = (function() {
  function Interpreter(raw_) {
    var b, g, r;
    this.source = (function() {
      switch (false) {
        case !/^[0-9a-f]{3}$/i.test(raw_):
          return {
            input: /^([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(raw_),
            human: raw_,
            space: 'HEX'
          };
        case !/^#[0-9a-fA-F]{3}$/i.test(raw_):
          return {
            input: /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(raw_),
            human: raw_,
            space: '#HEX'
          };
        case !/^[0-9a-fA-F]{6}$/.test(raw_):
          return {
            input: raw_,
            human: raw_,
            space: 'HEXHEX'
          };
        case !/^#[0-9a-f]{6}$/i.test(raw_):
          return {
            input: raw_,
            human: raw_,
            space: '#HEXHEX'
          };
        case !/^rgb[\(:]+\s?\d+,\s?\d+,\s?\d+\s?[\)]*$/.test(raw_):
          return {
            input: raw_.replace(/rgb[\(:]/, '').replace(/[ \)]/g, '').split(','),
            human: raw_.replace(/rgb[\(:]/, 'rgb-').replace(/,/g, '-').replace(/[ \)]/g, ''),
            space: 'RGB'
          };
        case !/^hsl:\d+,\d+,\d+$/.test(raw_):
          return {
            input: raw_.replace(/hsl[\(:]/, '').replace(/[ \)]/g, '').split(','),
            human: raw_.replace('hsl:', 'hsl-').replace(/,/g, '-').replace(/[ \)]/g, ''),
            space: 'HSL'
          };
        case !/^hsv:\d+,\d+,\d+$/.test(raw_):
          return {
            input: raw_.replace(/hsv[\(:]/, '').replace(/[ \)]/g, '').split(','),
            human: raw_.replace('hsv:', 'hsv-').replace(/,/g, '-').replace(/[ \)]/g, ''),
            space: 'HSV'
          };
        case !/^hwb:\d+,\d+,\d+$/.test(raw_):
          return {
            input: raw_.replace(/hwb[\(:]/, '').replace(/[ \)]/g, '').split(','),
            human: raw_.replace('hwb:', 'hwb-').replace(/,/g, '-').replace(/[ \)]/g, ''),
            space: 'HWB'
          };
        case raw_ !== 'normal' && raw_ !== 'reset':
          return {
            input: raw_,
            human: raw_,
            space: 'SGR'
          };
        case indexOf.call(_named_colors, raw_) < 0:
          return {
            input: raw_,
            human: raw_,
            space: 'named'
          };
        default:
          throw new Error("Unrecognised color space: " + raw_);
      }
    })();
    this.RGB = (function() {
      switch (this.source.space) {
        case 'HEX':
          r = this.source.input[1];
          g = this.source.input[2];
          b = this.source.input[3];
          this.name = String(r + r + g + g + b + b);
          return converter.hex2rgb(this.name);
        case '#HEX':
          r = this.source.input[1];
          g = this.source.input[2];
          b = this.source.input[3];
          this.name = String(r + r + g + g + b + b);
          return converter.hex2rgb(this.name);
        case 'HEXHEX':
          this.name = this.source.input;
          return converter.hex2rgb(this.name);
        case '#HEXHEX':
          this.name = this.source.input;
          return converter.hex2rgb(this.name);
        case 'RGB':
          this.name = converter.rgb2hex(this.source.input);
          return converter.hex2rgb(this.name);
        case 'HSL':
          this.name = converter.hsl2hex(this.source.input);
          return converter.hsl2rgb(this.source.input);
        case 'HSV':
          this.name = converter.hsv2hex(this.source.input);
          return converter.hsv2rgb(this.source.input);
        case 'HWB':
          this.name = converter.hwb2hex(this.source.input);
          return converter.hwb2rgb(this.source.input);
        case 'SGR':
          this.name = this.source.input;
          return [0, 0, 0];
        case 'named':
          this.name = converter.keyword2hex(this.source.input);
          return converter.keyword2rgb(this.source.input);
      }
    }).call(this);
    console.debug("Colour (" + this.name + ") RGB:" + this.RGB + " from " + this.source.space + " as " + this.source.human);
  }

  Interpreter.prototype.getName = function() {
    return this.name;
  };

  Interpreter.prototype.getRGB = function() {
    return this.RGB;
  };

  Interpreter.prototype.getInput = function() {
    return this.source.input;
  };

  Interpreter.prototype.getHuman = function() {
    return this.source.human;
  };

  Interpreter.prototype.getSpace = function() {
    return this.source.space;
  };

  Interpreter.prototype.toString = function() {
    return converter.rgb2hex(this.RGB);
  };

  return Interpreter;

})();

module.exports = Interpreter;
