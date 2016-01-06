'use strict';

/*
 trucolor (v0.1.5) 24bit color tools for the command line
 Color Output
 */
var Output, console, converter, ref, ref1, sgr, terminalFeatures;

console = global.vConsole;

terminalFeatures = require('@thebespokepixel/term-ng');

converter = require('color-convert');

sgr = {
  start: ['', '\x1b[', '\x1b[', '\x1b['][(ref = terminalFeatures.color.level) != null ? ref : 0],
  normal: '39;49',
  reset: '0',
  mode: ['', '', '5', '2'][(ref1 = terminalFeatures.color.level) != null ? ref1 : 0],
  bold: {
    "in": '1',
    out: '22'
  },
  faint: {
    "in": '2',
    out: '22'
  },
  italic: {
    "in": '3',
    out: '23'
  },
  underline: {
    "in": '4',
    out: '24'
  },
  blink: {
    "in": '5',
    out: '25'
  },
  invert: {
    "in": '7',
    out: '27'
  },
  end: 'm'
};

Output = (function() {
  function Output(rgbIn, attrs) {
    this.attrs = attrs;
    if (rgbIn != null) {
      if (/^[0-9a-f]{6}$/i.test(rgbIn)) {
        this.rgb = converter.hex2rgb(rgbIn);
        this.hex = rgbIn;
      } else if (/^#[0-9a-f]{6}$/i.test(rgbIn)) {
        this.rgb = converter.hex2rgb(rgbIn);
        this.hex = rgbIn.slice(1);
      } else {
        this.rgb = rgbIn;
        this.hex = converter.rgb2hex(rgbIn);
      }
      this.red = this.rgb[0];
      this.green = this.rgb[1];
      this.blue = this.rgb[2];
      console.info("Colour:\tR:" + this.red + "\tG:" + this.green + "\tB:" + this.blue + "\t" + (this.swatch()));
    }
  }

  Output.prototype.valueOf = function() {
    var ref2;
    return (ref2 = this.hex) != null ? ref2 : 'normal';
  };

  Output.prototype.toString = function() {
    if (this.rgb != null) {
      return "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
    } else {
      return "normal";
    }
  };

  Output.prototype.swatch = function() {
    var outSGR, ref2, ref3;
    outSGR = [];
    if (this.attrs.faint) {
      outSGR.push(sgr.faint["in"]);
    }
    if (this.attrs.blink) {
      outSGR.push(sgr.blink["in"]);
    }
    if ((this.rgb != null) && (terminalFeatures.color.level != null)) {
      sgr.code = ['', converter.rgb2ansi16(this.rgb), converter.rgb2ansi(this.rgb), this.rgb.join(';')][(ref2 = terminalFeatures.color.level) != null ? ref2 : 0];
      sgr.selector = ['', '', "38;" + sgr.mode + ";", "38;" + sgr.mode + ";"][(ref3 = terminalFeatures.color.level) != null ? ref3 : 0];
      outSGR.unshift(sgr.selector + sgr.code);
    }
    if (outSGR.length > 0 && (terminalFeatures.color.level != null)) {
      return (sgr.start + (outSGR.join(';')) + sgr.end) + "\u2588\u2588" + (sgr.start + sgr.reset + sgr.end);
    } else {
      return "";
    }
  };

  Output.prototype.hasAttr = function() {
    return this.attrs.bold || this.attrs.faint || this.attrs.italic || this.attrs.invert || this.attrs.underline || this.attrs.blink;
  };

  Output.prototype.SGRin = function() {
    var outSGR, ref2, ref3, ref4;
    outSGR = [];
    if (this.attrs.bold) {
      outSGR.push(sgr.bold["in"]);
    }
    if (this.attrs.faint) {
      outSGR.push(sgr.faint["in"]);
    }
    if (this.attrs.italic) {
      outSGR.push(sgr.italic["in"]);
    }
    if (this.attrs.invert) {
      outSGR.push(sgr.invert["in"]);
    }
    if (this.attrs.underline) {
      outSGR.push(sgr.underline["in"]);
    }
    if (this.attrs.blink) {
      outSGR.push(sgr.blink["in"]);
    }
    if ((this.rgb != null) && (terminalFeatures.color.level != null)) {
      sgr.code = ['', converter.rgb2ansi16(this.rgb), converter.rgb2ansi(this.rgb), this.rgb.join(';')][(ref2 = terminalFeatures.color.level) != null ? ref2 : 0];
      if (!this.attrs.background) {
        sgr.selector = ['', '', "38;" + sgr.mode + ";", "38;" + sgr.mode + ";"][(ref3 = terminalFeatures.color.level) != null ? ref3 : 0];
      } else {
        sgr.selector = ['', '', "48;" + sgr.mode + ";", "48;" + sgr.mode + ";"][(ref4 = terminalFeatures.color.level) != null ? ref4 : 0];
      }
      outSGR.unshift(sgr.selector + sgr.code);
    }
    if (outSGR.length > 0 && (terminalFeatures.color.level != null)) {
      return sgr.start + (outSGR.join(';')) + sgr.end;
    } else {
      return "";
    }
  };

  Output.prototype.SGRout = function() {
    var outSGR;
    outSGR = [];
    if (this.attrs.bold) {
      outSGR.push(sgr.bold.out);
    }
    if (this.attrs.faint) {
      outSGR.push(sgr.faint.out);
    }
    if (this.attrs.italic) {
      outSGR.push(sgr.italic.out);
    }
    if (this.attrs.invert) {
      outSGR.push(sgr.invert.out);
    }
    if (this.attrs.underline) {
      outSGR.push(sgr.underline.out);
    }
    if (this.attrs.blink) {
      outSGR.push(sgr.blink.out);
    }
    if (this.rgb != null) {
      outSGR.unshift(sgr.normal);
    }
    if (outSGR.length > 0 && (terminalFeatures.color.level != null)) {
      return sgr.start + (outSGR.join(';')) + sgr.end;
    } else {
      return "";
    }
  };

  return Output;

})();

module.exports = Output;
