'use strict';

/*
 trucolor (v0.0.6-34) : 24bit color tools for the command line
 Command line help
 */
var clr, header, img, spectrum, synopsis, wrap, _package, _pages;

_package = require('../../package.json');

wrap = require('truwrap');

clr = {
  example: "\x1b[38;2;204;51;66m",
  command: "\x1b[38;2;65;135;215m",
  argument: "\x1b[38;2;0;175;255m",
  option: "\x1b[38;2;175;175;45m",
  salmon: "\x1b[38;2;250;128;114m",
  red: "\x1b[38;2;255;128;128m",
  green: "\x1b[38;2;128;255;128m",
  blue: "\x1b[38;2;128;128;255m",
  blanchedalmond: "\x1b[38;2;255;225;200m",
  grey: "\x1b[38;2;100;100;100m",
  darkbg: "\x1b[48;2;40;40;40m",
  dark: "\x1b[38;2;40;40;40m",
  bright: "\x1b[38;2;255;255;255m",
  negative: "\x1b[7m",
  positive: "\x1b[27m",
  bold: "\x1b[1m",
  medium: "\x1b[22m",
  normal: "\x1b[0;38;2;200;200;200m"
};

img = {
  cc: new wrap.image({
    name: 'logo',
    file: __dirname + '/../../media/CCLogo.png',
    height: 3
  })
};

spectrum = function(width_, char_) {
  var blue, col, green, red, scalar_c, scalar_s;
  return ((function() {
    var _i, _ref, _results;
    _results = [];
    for (col = _i = 0, _ref = width_ - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; col = 0 <= _ref ? ++_i : --_i) {
      scalar_s = Math.cos((col / width_) * (Math.PI / 2));
      scalar_c = Math.sin((col / width_) * Math.PI);
      red = scalar_s > 0 ? scalar_s : 0;
      green = scalar_c > 0 ? scalar_c : 0;
      blue = scalar_s > 0 ? 1 - scalar_s : 0;
      _results.push("\x1b[38;2;" + (Math.floor(red * 255)) + ";" + (Math.floor(green * 255)) + ";" + (Math.floor(blue * 255)) + "m" + char_);
    }
    return _results;
  })()).join('') + ("" + clr.normal + "\n");
};

header = {
  bar: function() {
    return [" R━┳━╸╶────*╭──╮╶╴╷", "\t G ┃ ┏━┓╻ ╻*│╶╴╭─╮│╭─╮╭─╮", "\t B ╹ ╹╶~┗━┛*╰──╰─╯╵╰─╯╵   "].join("\n").replace(/\*/g, clr.bright).replace(/R/g, clr.red).replace(/G/g, clr.green).replace(/B/g, clr.blue).replace(/╶/g, clr.dark + '╶').replace(/╴/g, '╴' + clr.bright).replace(/~/g, '╴' + clr.blue);
  },
  info: "24bit Color Toolkit " + clr.grey + "v" + _package.version + "\n"
};

synopsis = "Synopsis:\n\n	" + clr.command + "trucolor " + clr.option + "[OPTIONS]" + clr.normal + " " + clr.argument + "color" + clr.normal + " [processing steps…]\n\n	" + clr.command + "trucolor " + clr.option + "[OPTIONS] --batch" + clr.normal + " [name_1:|@varname] " + clr.argument + "color" + clr.normal + " [processing steps…] " + clr.option + "[name_2: color [processing steps…]]" + clr.normal;

_pages = {
  "default": {
    usage: "\n" + synopsis + "\n\nUsage:\n\nIn it's simplest form, '" + clr.command + "trucolor" + clr.normal + " " + clr.argument + "color" + clr.normal + "', the argument color description is transformed into escaped 24bit CSI codes. It also allows the use of color transforms (using LESS) as well as automatic 'palletisation' for when you want to pass 24 bit colors into a program that doesn't support the RGB CSI codes.\n\nThe motivation behind this is to allow much more sophisticated graphic visualisation using in modern, xterm-compatible terminal emulators that have added support over the past couple of years.\n\n" + clr.argument + "color" + clr.normal + " can be specified in the following forms:\n\n	Hexadecimal triplets: " + clr.bright + "[#]XXXXXX" + clr.normal + " or " + clr.bright + "[#]XXX" + clr.normal + " (leading # is optional)\n\n	RGB: " + clr.bright + "rgb" + clr.normal + "[" + clr.red + "red" + clr.normal + "(0-255)," + clr.green + "green" + clr.normal + "(0-255)," + clr.blue + "blue" + clr.normal + "(0-255)]\n\n	HSL: " + clr.bright + "hsl" + clr.normal + "[hue(0-360),saturation(0-100),lightness(0-100)]\n\n	HSV: " + clr.bright + "hsv" + clr.normal + "[hue(0-360),saturation(0-100),value(0-100)]\n\n	Named CSS colors: " + clr.red + "red" + clr.normal + ", " + clr.green + "green" + clr.normal + ", " + clr.blanchedalmond + "blanchedalmond" + clr.normal + "... (see '--help named')\n\n	Special 'control' colors: default, " + clr.negative + "inverse" + clr.positive + ", " + clr.bold + "bold" + clr.medium + "... (see '--help special')\n\nBy default, outputs escaped 24bit ansi control characters such as ^[[38;2;204;51;66m, unless using the --hex or --rgb switches.\n\n",
    examples: function(width_) {
      return {
        content: [
          {
            Margin: " ",
            Command: "" + clr.command + "trucolor" + clr.normal + " cc3342",
            Result: "returns ^[[38;2;204;51;66m, " + clr.example + "setting the terminal color." + clr.normal
          }, {
            Command: "" + clr.command + "trucolor" + clr.normal + " --rgb hsl[354,75,80]",
            Result: "returns " + clr.example + "rgb(204, 51, 66)" + clr.normal
          }, {
            Command: "" + clr.command + "trucolor" + clr.normal + " --hex salmon",
            Result: "returns " + clr.salmon + "fa8072" + clr.normal
          }, {
            Command: "",
            Result: "\n\n"
          }
        ],
        layout: {
          showHeaders: false,
          config: {
            Margin: {
              minWidth: 2,
              maxWidth: 2
            },
            Command: {
              minWidth: 30,
              maxWidth: 80
            },
            Result: {
              maxWidth: width_ - 34
            }
          }
        }
      };
    }
  },
  process: {
    usage: "" + synopsis + "\n\nProcessing oisjf sdofs ofushdf osduhf sodufh sofu shdfosudhf sodufh sdofuhs dofsdh fosduhf soduf scdofu\n\n"
  },
  named: {
    usage: "Named Colors"
  },
  special: {
    usage: "Special Colors"
  }
};

module.exports = function(yargs_, helpPage_) {
  var container, contentWidth, page, renderer, windowWidth;
  container = wrap({
    mode: 'container',
    outStream: process.stderr
  });
  windowWidth = container.getWidth();
  renderer = wrap({
    left: 2,
    right: -2,
    mode: 'soft',
    outStream: process.stderr
  });
  contentWidth = renderer.getWidth();
  page = (function() {
    switch (helpPage_) {
      case 'process':
        return _pages.process;
      default:
        return _pages["default"];
    }
  })();
  container.write("\n");
  container.write(img.cc.render({
    nobreak: true,
    align: 2
  }));
  container.write(header.bar() + header.info);
  container.write(spectrum(windowWidth, "━"));
  renderer.write(page.usage);
  if (page.examples != null) {
    container.write("Examples:\n" + renderer.panel(page.examples(windowWidth)));
  }
  renderer.write("\n");
  yargs_.wrap(container.isTTY && windowWidth || 0).showHelp(container.write);
  return container.write("\n");
};
