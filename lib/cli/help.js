'use strict';

/*
 trucolor (v0.0.14-alpha.558) : 24bit color tools for the command line
 Command line help
 */
var _pages, _trucolor, _truwrap, clr, console, header, img, spectrum, synopsis;

_trucolor = require('../..');

_truwrap = require('truwrap');

console = global.vconsole;

if (supportsColor.has16m) {
  clr = {
    example: '\x1b[38;2;178;98;255m',
    command: '\x1b[38;2;65;135;215m',
    argument: '\x1b[38;2;0;175;255m',
    option: '\x1b[38;2;175;175;45m',
    operator: '\x1b[38;2;255;255;255m',
    salmon: '\x1b[38;2;250;128;114m',
    red: '\x1b[38;2;255;128;128m',
    green: '\x1b[38;2;128;255;128m',
    blue: '\x1b[38;2;128;128;255m',
    blanchedalmond: '\x1b[38;2;255;225;200m',
    grey: '\x1b[38;2;100;100;100m',
    darkbg: '\x1b[48;2;40;40;40m',
    dark: '\x1b[38;2;40;40;40m',
    bright: '\x1b[38;2;255;255;255m',
    negative: '\x1b[7m',
    positive: '\x1b[27m',
    bold: '\x1b[1m',
    medium: '\x1b[22m',
    cc: '\x1b[38;2;128;196;126m',
    normal: '\x1b[30m\x1b[m\x1b[38;2;240;240;240m'
  };
  spectrum = function(width_, char_) {
    var blue, col, green, red, scalar_c, scalar_s;
    return ((function() {
        var i, ref, results;
        results = [];
        for (col = i = 0, ref = width_ - 1; 0 <= ref ? i <= ref : i >= ref; col = 0 <= ref ? ++i : --i) {
          scalar_s = Math.cos((col / width_) * (Math.PI / 2));
          scalar_c = Math.sin((col / width_) * Math.PI);
          red = scalar_s > 0 ? scalar_s : 0;
          green = scalar_c > 0 ? scalar_c : 0;
          blue = scalar_s > 0 ? 1 - scalar_s : 0;
          results.push("\x1b[38;2;" + (Math.floor(red * 255)) + ";" + (Math.floor(green * 255)) + ";" + (Math.floor(blue * 255)) + "m" + char_);
        }
        return results;
      })()).join('') + (clr.normal + "\n");
  };
  header = {
    bar: function() {
      return [" R━┳━╸╶────*╭──╮╶╴╷", "\t G ┃ ┏━┓╻ ╻*│╶╴╭─╮│╭─╮╭─╮", "\t B ╹ ╹╶~┗━┛*╰──╰─╯╵╰─╯╵   "].join("\n").replace(/\*/g, clr.bright).replace(/R/g, clr.red).replace(/G/g, clr.green).replace(/B/g, clr.blue).replace(/╶/g, clr.dark + '╶').replace(/╴/g, '╴' + clr.bright).replace(/~/g, '╴' + clr.blue);
    },
    info: "24bit Color Toolkit " + clr.grey + "v" + (_trucolor.getVersion()) + "\n"
  };
} else {
  clr = {
    example: '\x1b[38;5;93m',
    command: '\x1b[38;5;68m',
    argument: '\x1b[38;5;39m',
    option: '\x1b[38;5;142m',
    operator: '\x1b[38;5;231m',
    salmon: '\x1b[91m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    blanchedalmond: '\x1b[91m',
    grey: '\x1b[38;5;247m',
    darkbg: '\x1b[48;5;235m',
    dark: '\x1b[38;5;235m',
    bright: '\x1b[97m',
    negative: '\x1b[7m',
    positive: '\x1b[27m',
    bold: '\x1b[1m',
    medium: '\x1b[22m',
    cc: '\x1b[38;5;114m',
    normal: '\x1b[30m\x1b[m'
  };
  spectrum = function() {
    return "\n" + clr.salmon + "!!! This tool is for 24 bit colour aware terminals only !!!" + clr.normal + "\n";
  };
  header = {
    bar: function() {
      return "\n" + clr.bright + "trucolor - ";
    },
    info: "24bit Color Toolkit " + clr.grey + "v" + (_trucolor.getVersion()) + clr.normal + "\n"
  };
}

if (supportsColor.has16m && _iTerm) {
  img = {
    space: "\t",
    cc: new _truwrap.Image({
      name: 'logo',
      file: __dirname + '/../../media/CCLogo.png',
      height: 3
    })
  };
} else {
  img = {
    space: "",
    cc: {
      render: function() {
        return "";
      }
    }
  };
}

synopsis = "Synopsis:\n\n	" + clr.command + "trucolor " + clr.option + "[OPTIONS]" + clr.normal + " " + clr.argument + "color" + clr.normal + " " + clr.option + "[processing steps…]" + clr.normal + "\n\n	" + clr.command + "trucolor " + clr.option + "[OPTIONS] " + clr.example + "--batch" + clr.normal + " " + clr.option + "[name_1:|@varname] " + clr.argument + "color" + clr.normal + " " + clr.option + "[processing steps…] " + clr.grey + "[name_2: color [processing steps...]] ..." + clr.normal;

_pages = {
  "default": {
    usage: "\n" + synopsis + "\n\nUsage:\nIn it's simplest form, '" + clr.command + "trucolor" + clr.normal + " " + clr.argument + "color" + clr.normal + "', the argument color description is transformed into escaped 24bit CSI codes. It also allows the use of color transforms (using LESS) as well as automatic 'palletisation' for when you want to pass 24 bit colors into a program that doesn't support the RGB CSI codes.\n\nThe motivation behind this is to allow much more sophisticated graphic visualisation using in modern, xterm-compatible terminal emulators that have added support over the past couple of years.\n\n" + clr.argument + "color" + clr.normal + " can be specified in the following forms:\n\n	Hexadecimal triplets: " + clr.bright + "[#]XXXXXX" + clr.normal + " or " + clr.bright + "[#]XXX" + clr.normal + " (leading # is optional)\n\n	RGB: " + clr.bright + "rgb" + clr.normal + "," + clr.red + "red" + clr.normal + "(0-255)," + clr.green + "green" + clr.normal + "(0-255)," + clr.blue + "blue" + clr.normal + "(0-255)\n\n	HSL: " + clr.bright + "hsl" + clr.normal + ",hue(0-360),saturation(0-100),lightness(0-100)\n\n	HSV: " + clr.bright + "hsv" + clr.normal + ",hue(0-360),saturation(0-100),value(0-100)\n\n	Named CSS colors: " + clr.red + "red" + clr.normal + ", " + clr.green + "green" + clr.normal + ", " + clr.blanchedalmond + "blanchedalmond" + clr.normal + "... (see '--help named')\n\n	Special 'control' colors: default, " + clr.negative + "inverse" + clr.positive + ", " + clr.bold + "bold" + clr.medium + "... (see '--help special')\n\nBy default, outputs escaped 24bit ansi control characters such as ^[[38;2;204;51;66m, unless using the --hex or --rgb switches.\n\n",
    examples: function(width_) {
      return {
        content: [
          {
            Margin: " ",
            Command: "Examples:"
          }, {
            Command: clr.command + "trucolor" + clr.normal + " cc3342",
            Result: "returns ^[[38;2;204;51;66m, " + clr.example + "setting the terminal color." + clr.normal
          }, {
            Command: clr.command + "trucolor" + clr.normal + " --rgb hsl[354,75,80]",
            Result: "returns " + clr.example + "rgb(204, 51, 66)" + clr.normal
          }, {
            Command: clr.command + "trucolor" + clr.normal + " --hex salmon",
            Result: "returns " + clr.salmon + "fa8072" + clr.normal
          }
        ],
        layout: {
          showHeaders: false,
          config: {
            Margin: {
              minWidth: 1,
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
    usage: synopsis + "\n\nProcessing oisjf sdofs ofushdf osduhf sodufh sofu shdfosudhf sodufh sdofuhs dofsdh fosduhf soduf scdofu\n\n"
  },
  named: {
    usage: "Named Colors:\n",
    examples: function(width_) {
      var c, cell, cellsrc, color_, colors, columns, colwidth, grid, i, j, lessColors, name_, ref, ref1, sgr, table;
      lessColors = require("../../node_modules/less/lib/less/data/colors");
      colors = (function() {
        var results;
        results = [];
        for (name_ in lessColors) {
          color_ = lessColors[name_];
          results.push({
            name: name_,
            color: color_
          });
        }
        return results;
      })();
      columns = Math.floor(width_ / 32);
      colwidth = Math.floor(width_ / columns);
      grid = {
        margin: {
          minWidth: 2
        }
      };
      for (c = i = 0, ref = columns; 0 <= ref ? i <= ref : i >= ref; c = 0 <= ref ? ++i : --i) {
        grid["name_" + c] = {
          minWidth: 16
        };
        grid["color_" + c] = {
          minWidth: 9
        };
      }
      table = [];
      while (colors.length) {
        cell = {
          margin: ' '
        };
        for (c = j = 0, ref1 = columns; 0 <= ref1 ? j <= ref1 : j >= ref1; c = 0 <= ref1 ? ++j : --j) {
          cellsrc = colors.shift();
          if (cellsrc == null) {
            cellsrc = {
              name: '',
              color: ''
            };
          }
          cell["name_" + c] = cellsrc.name;
          sgr = (_trucolor.setColor(cellsrc.color)).toSGR();
          cell["color_" + c] = "\x1b[38;2;65;135;215m" + cellsrc.color + clr.normal;
        }
        table.push(cell);
      }
      return {
        content: table,
        layout: {
          showHeaders: false,
          config: grid
        }
      };
    }
  },
  special: {
    usage: "Special Colors"
  },
  epilogue: "" + clr.cc + (_trucolor.getName()) + clr.normal + " is an open source component of CryptoComposite\'s toolset.\n" + clr.cc + "© 2015 CryptoComposite. " + clr.grey + "Released under the MIT License." + clr.normal + "\n"
};

module.exports = function(yargs_, helpPage_) {
  var container, contentWidth, page, renderer, windowWidth;
  container = _truwrap({
    mode: 'container',
    outStream: process.stderr
  });
  windowWidth = container.getWidth();
  renderer = _truwrap({
    left: 2,
    right: -2,
    mode: 'soft',
    outStream: process.stderr
  });
  contentWidth = renderer.getWidth();
  page = (function() {
    switch (helpPage_) {
      case 'named':
        return _pages.named;
      case 'special':
        return _pages.special;
      case 'process':
        return _pages.process;
      default:
        return _pages["default"];
    }
  })();
  yargs_.usage(' ');
  yargs_.epilogue(_pages.epilogue);
  yargs_.wrap(contentWidth);
  container.write(img.cc.render({
    nobreak: false,
    align: 2
  }));
  container.write(header.bar() + header.info);
  container.write(spectrum(windowWidth, "━"));
  renderer.write(page.usage);
  renderer.clear();
  container.write(renderer.panel(page.examples(contentWidth)));
  renderer.write(yargs_.help());
  return renderer["break"]();
};
