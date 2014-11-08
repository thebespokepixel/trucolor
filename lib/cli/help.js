'use strict';

/*
 trucolor (v0.0.4-618) : 24bit color tools for the command line
 Command line help
 */
var clr, consoleWrap, spectrum, synopsis, _pages;

consoleWrap = require('console-wrap');

clr = {
  example: "\x1b[38;2;204;51;66m",
  command: "\x1b[38;2;0;95;215m",
  argument: "\x1b[38;2;0;175;255m",
  salmon: "\x1b[38;2;250;128;114m",
  red: "\x1b[38;2;255;0;0m",
  green: "\x1b[38;2;0;255;0m",
  blue: "\x1b[38;2;0;0;255m",
  grey: "\x1b[38;2;140;140;140m",
  normal: "\x1b[39m\x1b[49m",
  negative: "\x1b[7m",
  positive: "\x1b[27m",
  bold: "\x1b[1m",
  medium: "\x1b[22m",
  reset: "\x1b[0m"
};

synopsis = "Synopsis:\n\n    " + clr.command + "trucolor " + clr.grey + "[OPTIONS]" + clr.normal + " " + clr.argument + "color" + clr.normal + " [processing steps…]\n\n    " + clr.command + "trucolor " + clr.grey + "[OPTIONS] --batch" + clr.normal + " [name_1:|@varname] " + clr.argument + "color" + clr.normal + " [processing steps…] " + clr.grey + "[name_2: color [processing steps…]]" + clr.normal;

spectrum = function() {
  var blue, col, green, red, scalar_c, scalar_s;
  return ((function() {
    var _i, _ref, _results;
    _results = [];
    for (col = _i = 0, _ref = process.stdout.columns - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; col = 0 <= _ref ? ++_i : --_i) {
      scalar_s = col / ((process.stdout.columns - 1) / 2);
      scalar_c = Math.sin((col / (process.stdout.columns - 1)) * Math.PI);
      red = scalar_s > 0 ? scalar_s : 0;
      green = 0;
      blue = 0;
      _results.push("\x1b[38;2;" + (Math.floor(red * 255)) + ";" + (Math.floor(green * 255)) + ";" + (Math.floor(blue * 255)) + "m─");
    }
    return _results;
  })()).join('');
};

_pages = {
  "default": {
    usage: "\nA set of 24 bit color command line styling tools for node.js and the shell (enhanced for fish)\n\n" + synopsis + "\n\nUsage:\n\nIn it's simplest form, '" + clr.command + "trucolor" + clr.normal + " " + clr.argument + "color" + clr.normal + "', the input color is transformed into escaped 24bit ansi control characters such as ^[[38;2;204;51;66m (called a SGR or Select Graphic Rendition code).\n\n" + clr.argument + "color" + clr.normal + " can be specified in the following forms:\n\n  Hexadecimal triplets: XXXXXX or XXX (leading # is optional)\n\n  RGB: rgb[red(0-255),green(0-255),blue(0-255)]\n\n  HSL: hsl[hue(0-360),saturation(0-100),lightness(0-100)]\n\n  HSV: hsv[hue(0-360),saturation(0-100),value(0-100)]\n\n  Named CSS colors: red, green, blanchedalmond... (see '--help named')\n\n  Special 'control' colors: default, " + clr.negative + "inverse" + clr.positive + ", " + clr.bold + "bold" + clr.medium + "... (see '--help special')\n\nBy default, outputs escaped 24bit ansi control characters such as ^[[38;2;204;51;66m, unless using the --hex or --rgb switches.",
    examples: [
      {
        command: "" + clr.command + "trucolor" + clr.normal + " cc3342",
        description: "Outputs the control sequence ^[[38;2;204;51;66m, " + clr.example + "setting the terminal color." + clr.reset
      }, {
        command: "" + clr.command + "trucolor" + clr.normal + " --rgb hsl[354,75,80]",
        description: "Outputs " + clr.example + "rgb(204, 51, 66)" + clr.normal
      }, {
        command: "" + clr.command + "trucolor" + clr.normal + " --hex salmon",
        description: "Outputs " + clr.salmon + "fa8072" + clr.normal
      }
    ]
  },
  process: {
    usage: "Processing oisjf sdofs ofushdf osduhf sodufh sofu shdfosudhf sodufh sdofuhs dofsdh fosduhf soduf scdofu",
    examples: []
  },
  named: {
    usage: "Named Colors",
    examples: []
  },
  special: {
    usage: "Special Colors",
    examples: []
  }
};

module.exports = function(yargs_, helpPage_) {
  var addExamples, page, renderer;
  addExamples = function(examples_) {
    var example_, _i, _len, _results;
    if (examples_ != null) {
      _results = [];
      for (_i = 0, _len = examples_.length; _i < _len; _i++) {
        example_ = examples_[_i];
        _results.push(yargs_.example(example_.command, example_.description));
      }
      return _results;
    }
  };
  page = (function() {
    switch (helpPage_) {
      case 'process':
        return _pages.process;
      default:
        return _pages["default"];
    }
  })();
  addExamples(page.examples);
  renderer = consoleWrap({
    left: 2,
    right: -2,
    mode: 'soft',
    outStream: process.stderr
  });
  return yargs_.usage(page.usage).showHelp(renderer);
};
