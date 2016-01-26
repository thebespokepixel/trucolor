'use strict';

/*
 trucolor
 Color Output
 */
var Output, SGRcomposer, _package, colorLevel, colorOptions, colorOptionsSelected, console, converter, ref, terminalFeatures;

console = global.vConsole;

_package = require('../package.json');

terminalFeatures = require('term-ng');

converter = require('color-convert');

SGRcomposer = require('sgr-composer');

colorOptionsSelected = _package.config.cli.selected;

colorOptions = _package.config.cli[colorOptionsSelected];

colorLevel = (ref = terminalFeatures.color.level) != null ? ref : 0;

Output = (function() {
  function Output(color_, styles_, options_) {
    var ref1, ref2, sgr, style;
    if (options_ == null) {
      options_ = {};
    }
    this.hasRGB = false;
    if (color_ != null) {
      styles_.color = (function() {
        switch (false) {
          case !/^[#][0-9a-f]{6}$/i.test(color_):
            this.hasRGB = true;
            return converter.hex.rgb(color_);
          case !Array.isArray(color_):
            this.hasRGB = true;
            return color_;
          case color_ !== 'reset' && color_ !== 'normal':
            this.hasReset = true;
            return color_;
          default:
            throw new Error("Unrecognised color: " + color_);
        }
      }).call(this);
    }
    if ((global.trucolor_CLI_type != null) && ((ref1 = global.trucolor_CLI_type) !== 'default' && ref1 !== colorOptionsSelected)) {
      colorOptionsSelected = global.trucolor_CLI_type;
      colorOptions = _package.config.cli[colorOptionsSelected];
    }
    this._buffer = new SGRcomposer((ref2 = options_.force) != null ? ref2 : colorLevel, styles_);
    console.info(this.hasRGB ? (style = (style = this._buffer.style) ? (sgr = this._buffer.sgr(), " + " + sgr["in"] + style + sgr.out) : '', "Color:\tR:" + this._buffer.red + "\tG:" + this._buffer.green + "\tB:" + this._buffer.blue + "\t" + (this.toSwatch()) + style) : this.hasReset ? "Reset: " + this._buffer.color + " " + (this.toSwatch()) : (sgr = this._buffer.sgr(), "Style: " + sgr["in"] + this._buffer.style + sgr.out));
  }

  Output.prototype.valueOf = function() {
    var style, styling;
    if (global.trucolor_CLI_type != null) {
      styling = ((function() {
        var i, len, ref1, results;
        ref1 = this._buffer.styleArray;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          style = ref1[i];
          results.push(colorOptions[style]);
        }
        return results;
      }).call(this)).join(' ');
      if (styling.length) {
        styling += ' ';
      }
      if (this.hasRGB) {
        switch (colorOptions.color) {
          case 'hex':
            return "" + styling + this._buffer.hex;
          default:
            return this._buffer.red + " " + this._buffer.green + " " + this._buffer.blue;
        }
      } else if (this.hasReset) {
        switch (this._buffer.color) {
          case 'normal':
            return colorOptions.normal;
          default:
            return colorOptions.reset;
        }
      } else {
        return this._buffer.sgr()["in"];
      }
    } else if (this.hasRGB) {
      return this._buffer.hex;
    } else if (this.hasReset) {
      return this._buffer.color;
    } else {
      return this._buffer.sgr()["in"];
    }
  };

  Output.prototype.toString = function() {
    if (this.hasRGB) {
      return ("rgb(" + this._buffer.red + ", " + this._buffer.green + ", " + this._buffer.blue) + ')';
    } else if (this.hasReset) {
      return this._buffer.color;
    } else {
      return colorOptions.reset;
    }
  };

  Output.prototype.toSwatch = function() {
    var sgr;
    sgr = this._buffer.sgr(['bold', 'italic', 'underline', 'invert']);
    if (colorLevel > 0) {
      return sgr["in"] + "\u2588\u2588" + sgr.out;
    } else {
      return '';
    }
  };

  Output.prototype.toSGR = function() {
    return this._buffer.sgr();
  };

  return Output;

})();

module.exports = Output;
