'use strict';

/*
 trucolor (v0.1.7-beta.0) : 24bit color tools for the command line
 Command line help
 */
var console, converter, deepAssign, outputPage, setupPage, terminalFeatures, trucolor, truwrap;

console = global.vConsole;

trucolor = require('../../index');

truwrap = require('truwrap');

deepAssign = require('deep-assign');

converter = require('color-convert');

terminalFeatures = require('@thebespokepixel/term-ng');

setupPage = function(clr) {
  var header, img, pages, spcr, spectrum;
  if (terminalFeatures.images) {
    spcr = '\t';
  }
  if (spcr == null) {
    spcr = '';
  }
  if (terminalFeatures.color.has16m) {
    spectrum = function(width_, char_) {
      var blue, col, green, red, scos, ssin;
      return ((function() {
        var i, ref, results;
        results = [];
        for (col = i = 0, ref = width_ - 1; 0 <= ref ? i <= ref : i >= ref; col = 0 <= ref ? ++i : --i) {
          scos = Math.cos((col / width_) * (Math.PI / 2));
          ssin = Math.sin((col / width_) * Math.PI);
          red = scos > 0 ? Math.floor(scos * 255) : 0;
          green = ssin > 0 ? Math.floor(ssin * 255) : 0;
          blue = scos > 0 ? Math.floor((1 - scos) * 255) : 0;
          results.push("\x1b[38;2;" + red + ";" + green + ";" + blue + "m" + char_);
        }
        return results;
      })()).join('');
    };
    header = function() {
      return [" " + clr.red + "━┳━╸     " + clr.bright + "╭──╮  ╷", spcr + " " + clr.green + " ┃ ┏━┓╻ ╻" + clr.bright + "│  ╭─╮│╭─╮╭─╮ " + clr.normal + (trucolor.getDescription()), spcr + " " + clr.blue + " ╹ ╹  ┗━┛" + clr.bright + "╰──╰─╯╵╰─╯╵   " + clr.grey + (trucolor.getVersion(3))].join("\n");
    };
  } else {
    header = function() {
      return ["" + clr.bright + (trucolor.getName()) + clr.normal, "" + spcr + (trucolor.getDescription()), "" + spcr + clr.grey + (trucolor.getVersion(3)) + clr.normal].join("\n");
    };
    spectrum = function() {
      return "\n" + clr.red + "  Your terminal currently doesn't support 24 bit color.";
    };
  }
  if (terminalFeatures.images) {
    img = {
      space: "\t",
      cc: new truwrap.Image({
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
  pages = {
    shared: {
      header: header,
      spectrum: spectrum,
      images: img,
      synopsis: clr.title + "Synopsis:" + clr.titleOut + "\n" + clr.command + "trucolor " + clr.option + "[options] " + clr.argument + "[name]: [operation...] color [operation...] [[name]: [operation...] color]..." + clr.option,
      epilogue: "" + clr.title + (trucolor.getName()) + clr.titleOut + " is an open source component of CryptoComposite\'s toolset.\n" + clr.title + "© 2015 CryptoComposite." + clr.titleOut + " " + clr.grey + "Released under the MIT License.\n" + clr.grey + "Documentation/Issues/Contributions @ http://github.com/MarkGriffiths/trucolor" + clr.normal
    },
    "default": {
      usage: clr.title + "Usage:" + clr.titleOut + "\n" + clr.normal + "In it's simplest form, '" + clr.command + "trucolor" + clr.normal + " " + clr.argument + "color" + clr.normal + "', will take any of the color expressions listed below and transform it into a simple hexadecimal triplet string, i.e " + clr.argument + "'AA00BB'" + clr.normal + ", ideal for passing into the 'set_color' built-in in fish-shell, or providing the basis of further color processing.\n\nIt can return a wide range of color assignment and manipulation functions, based internally on color-convert and less. See the examples below.\n\nWhen outputting SGR codes, colors will be shifted to the availalble 256 or ansi color palette if 24 bit color is unavailable or will be omitted in a monochromatic terminal to make usage across environments safe. The CLI command respects " + clr.option + "--color=16m" + clr.normal + ", " + clr.option + "--color=256" + clr.normal + ", " + clr.option + "--color" + clr.normal + " and " + clr.option + "--no-color" + clr.normal + " flags. It does not affect value based output, such as the default or " + clr.option + "--rgb" + clr.normal + " output, it only effects the " + clr.option + "--in" + clr.normal + ", " + clr.option + "--out" + clr.normal + ", " + clr.option + "--message" + clr.normal + " and " + clr.option + "--swatch" + clr.normal + " outputs.\n\nThe motivation for this is to allow more sophisticated graphic visualisation using in modern, xterm-compatible terminal emulators that have added 24 bit support.\n\nThe " + clr.argument + "color" + clr.normal + " can be defined in any the following formats:\n\n	CSS Hexadecimal (" + clr.red + "Red " + clr.green + "Green " + clr.blue + "Blue" + clr.normal + ") " + clr.argument + "[#]RRGGBB" + clr.normal + " or " + clr.argument + "[#]RGB" + clr.normal + " where R, G and B are '0'-'F'.\n\n	RGB (" + clr.red + "Red " + clr.green + "Green " + clr.blue + "Blue" + clr.normal + ") " + clr.argument + "rgb:R,G,B" + clr.normal + " or " + clr.argument + "rgb(R,G,B)" + clr.normal + " where R,G and B are 0-255.\n	Spaces can be incuded but require quoting/escaping on the CLI. i.e '" + clr.argument + "rgb(R, G, B)" + clr.normal + "'\n\n	HSL (" + clr.red + "H" + clr.green + "u" + clr.blue + "e" + clr.dark + " Sat" + clr.msat + "ura" + clr.red + "tion " + clr.dark + "Lig" + clr.mlight + "htn" + clr.bright + "ess" + clr.normal + ") " + clr.argument + "hsl:H,S,L" + clr.normal + " where H is 0-360, S 0-100 and L 0-100\n\n	HSV (" + clr.red + "H" + clr.green + "u" + clr.blue + "e" + clr.dark + " Sat" + clr.msat + "ura" + clr.red + "tion " + clr.dark + "V" + clr.mlight + "alu" + clr.bright + "e" + clr.normal + ") " + clr.argument + "hsl:H,S,V" + clr.normal + " where H is 0-360, S 0-100 and V 0-100\n\n	HSB (" + clr.red + "H" + clr.green + "u" + clr.blue + "e" + clr.dark + " Sat" + clr.msat + "ura" + clr.red + "tion " + clr.dark + "Bri" + clr.mlight + "ght" + clr.bright + "ness" + clr.normal + ") " + clr.argument + "hsb:H,S,B" + clr.normal + " where H is 0-360, S 0-100 and B 0-100\n	(actually just an alias for HSV)\n\n	HWB: (" + clr.red + "H" + clr.green + "u" + clr.blue + "e" + clr.bright + " White" + clr.dark + " Black" + clr.normal + ") " + clr.argument + "hwb:H,W,B" + clr.normal + " where H is 0-360, W 0-100 and B 0-100\n\n	CSS named colors: " + clr.red + "Red, " + clr.green + "green, " + clr.hotpink + "hotpink, " + clr.chocolate + "chocolate" + clr.normal + "... (see '" + clr.option + "--help named" + clr.normal + "')\n\n	Special 'control' colors: 'reset', 'normal', " + clr.ul + "underline" + clr.ulOut + ", " + clr.invert + "invert" + clr.invertOut + ", " + clr.bold + "bold" + clr.boldOut + "... (see '" + clr.option + "--help special" + clr.normal + "')\n\nA number of color " + clr.argument + "operations" + clr.normal + " can be specified, either before or after the base color declaration.\n\n[" + clr.argument + "(light | dark)" + clr.normal + "] preset 20% darken/lighten.\n[" + clr.argument + "(saturate | sat | desaturate | desat | lighten | darken" + clr.normal + ") " + clr.argument + "percent" + clr.normal + "] basic operations.\n[" + clr.argument + "spin degrees" + clr.normal + "] hue shift.\n[" + clr.argument + "(mix | multiply | screen) color" + clr.normal + "] mix with (named | rgb() | #hex) color.\n[" + clr.argument + "(overlay | softlight | soft | hardlight | hard) color" + clr.normal + "] light with color.\n[" + clr.argument + "(difference | diff | exclusion | excl) color" + clr.normal + "] subtract color.\n[" + clr.argument + "(average | ave | negation | not) color" + clr.normal + "] blend with color.\n[" + clr.argument + "contrast dark [light] [threshold]" + clr.normal + "] calculate contrasting color.\n\nSee http://lesscss.org/functions/#color-operations for more details.",
      examples: function(width_) {
        return {
          content: [
            {
              Margin: " ",
              Command: clr.title + "Examples:"
            }, {
              Command: clr.command + "trucolor " + clr.argument + "purple" + clr.normal,
              Result: "→ 800080"
            }, {
              Command: clr.command + "trucolor " + clr.option + "-m label " + clr.argument + "purple" + clr.normal,
              Result: "→ a colored, isolated message, " + clr.purple + "label" + clr.normal + "."
            }, {
              Command: clr.command + "trucolor " + clr.option + "--in " + clr.argument + "purple" + clr.normal,
              Result: "→ ^[[38;2;128;0;128m " + clr.purple + "setting the terminal color."
            }, {
              Command: clr.command + "trucolor" + clr.option + " --rgb " + clr.argument + "purple" + clr.normal,
              Result: "→ rgb(128, 0, 128)"
            }, {
              Command: clr.command + "trucolor" + clr.option + " --swatch " + clr.argument + "purple" + clr.normal,
              Result: "→ " + clr.purple + "\u2588\u2588" + clr.normal
            }, {
              Command: clr.command + "trucolor" + clr.option + " --swatch " + clr.argument + "purple desaturate 70" + clr.normal,
              Result: "→ " + clr.purpleSwatch + "\u2588\u2588" + clr.normal
            }, {
              Command: clr.command + "trucolor " + clr.argument + "hsb:45,100,100" + clr.normal,
              Result: "→ FFBF00"
            }, {
              Command: clr.command + "trucolor " + clr.option + "-m label " + clr.argument + "hsb:45,100,100" + clr.normal,
              Result: "→ a colored, isolated message, " + clr.orange + "label" + clr.normal + "."
            }, {
              Command: clr.command + "trucolor " + clr.option + "--in " + clr.argument + "hsb:45,100,100" + clr.normal,
              Result: "→ ^[[38;2;255;191;0m " + clr.orange + "setting the terminal color."
            }, {
              Command: clr.command + "trucolor" + clr.option + " --rgb " + clr.argument + "hsb:45,100,100" + clr.normal,
              Result: "→ rgb(255, 191, 0)"
            }, {
              Command: clr.command + "trucolor" + clr.option + " --swatch " + clr.argument + "hsb:45,100,100" + clr.normal,
              Result: "→ " + clr.orange + "\u2588\u2588" + clr.normal
            }, {
              Command: clr.command + "trucolor" + clr.option + " --swatch " + clr.argument + "hsb:45,100,100 desaturate 70" + clr.normal,
              Result: "→ " + clr.orangeSwatch + "\u2588\u2588" + clr.normal
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
      },
      more: clr.title + "Multiple Inputs:" + clr.normal + "\n" + clr.command + "trucolor" + clr.normal + " will output a list of color values if more than one base color is specified, allowing color assignment in a single block allowing easy ingest using '" + clr.command + "read" + clr.normal + "'. Each color will be output on it's own line, and named according to the input base color. The names can be overridden by providing a 'name:' before the base color.\n\n	> " + clr.command + "trucolor " + clr.argument + "red yellow green purple" + clr.normal + "\n	red FF0000\n	yellow FFFF00\n	green 008000\n	purple 800080\n\n	> " + clr.command + "trucolor " + clr.argument + "Po: red LaaLaa: yellow Dipsy: green TinkyWinky: purple" + clr.normal + "\n	Po FF0000\n	LaaLaa FFFF00\n	Dipsy 008000\n	TinkyWinky 800080\n\n	> " + clr.command + "trucolor " + clr.argument + "hsl:120,100,50 bob: orange spin 180" + clr.normal + "\n	hsl-120-100-50 00FF00\n	bob 005AFF\n\n" + clr.title + "Note:" + clr.normal + " " + clr.option + "--message" + clr.normal + ", " + clr.option + "--swatch" + clr.normal + ", " + clr.option + "--in" + clr.normal + ", " + clr.option + "--out" + clr.normal + " and " + clr.option + "--rgb" + clr.normal + " currently only output the first color specified."
    },
    named: {
      usage: clr.title + "Named Colors:" + clr.normal + "\nAll standard CSS names are accepted.",
      examples: function(width_) {
        var colors, i, len, nameArray, name_;
        nameArray = require("../palettes/named");
        colors = {};
        for (i = 0, len = nameArray.length; i < len; i++) {
          name_ = nameArray[i];
          colors[name_] = name_;
        }
        return trucolor.bulk(colors, {
          type: 'swatch'
        }, function(named_) {
          var c, cell, columns, colwidth, grid, j, k, ref, ref1, src, table;
          columns = Math.floor(width_ / 28);
          colwidth = Math.floor(width_ / columns);
          grid = {
            margin: {
              minWidth: 2
            }
          };
          for (c = j = 0, ref = columns; 0 <= ref ? j <= ref : j >= ref; c = 0 <= ref ? ++j : --j) {
            grid["color_" + c] = {
              minWidth: 2
            };
            grid["name_" + c] = {
              minWidth: 16
            };
          }
          table = [];
          while (nameArray.length) {
            cell = {
              margin: ' '
            };
            for (c = k = 0, ref1 = columns; 0 <= ref1 ? k <= ref1 : k >= ref1; c = 0 <= ref1 ? ++k : --k) {
              src = nameArray.shift();
              if ((src == null) === '') {
                cell["color_" + c] = '';
                cell["name_" + c] = '';
              } else {
                cell["color_" + c] = named_[src];
                cell["name_" + c] = src;
              }
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
        });
      },
      more: clr.title + "Custom Names:" + clr.titleOut + "\nAny color definition can be prefixed with a 'name:' and the result will be cached with that name, allowing it to be recalled by the same name later.\n\n	> " + clr.command + "trucolor " + clr.argument + "bob: black lighten 50 saturate 50 spin 180" + clr.normal + "\n	40BFBF\n\n	> " + clr.command + "trucolor " + clr.option + "--rgb " + clr.argument + "bob:" + clr.normal + "\n	rgb(64, 191, 191)\n\n	> " + clr.command + "trucolor " + clr.option + "--swatch " + clr.argument + "bob:" + clr.normal + "\n	" + clr.bob + "\u2588\u2588" + clr.normal
    },
    special: {
      usage: clr.title + "Special Formatters:" + clr.titleOut + "\nThe following keywords modify the meaning or destination of the color, or provide enhanced foramtting. They only work when used with the command switches that actually output SGR codes, namely: " + clr.option + "--message" + clr.normal + ", " + clr.option + "--swatch" + clr.normal + ", " + clr.option + "--in" + clr.normal + " and " + clr.option + "--out" + clr.normal + ". When used with the default command or with the " + clr.option + "--rgb" + clr.normal + " switch, they have no effect and the value of the base color (plus any processing) will be output.\n\n" + clr.argument + "background" + clr.normal + ": Set the background color, rather than the foreground.\n\n" + clr.argument + "normal" + clr.normal + ": Set the color to the default foreground and background.\n" + clr.argument + "reset" + clr.normal + ": Sets colors and special formatting back to the default.\n\n" + clr.argument + "bold" + clr.normal + ": Set the font to bold.\n" + clr.argument + "italic" + clr.normal + ": Set the font to italic.\n" + clr.argument + "underline" + clr.normal + ": Set underline.\n" + clr.argument + "faint" + clr.normal + ": Set the colour to 50% opacity.\n" + clr.argument + "invert" + clr.normal + ": Invert the foreground and background.\n" + clr.argument + "blink" + clr.normal + ": Annoying as a note in Comic Sans, attached to a dancing, purple dinosaur with a talking paperclip.\n\nAll of the above formatters need the correct code to end the range, either provided by using the " + clr.option + "--out" + clr.normal + " switch, using the 'reset' keyword, or simply use the " + clr.option + "--message" + clr.normal + " option to automatically set the end range SGR code. Using 'normal' alone won't fully clear the formatting.",
      examples: function(width_) {
        return {
          content: [
            {
              Margin: " ",
              Command: clr.title + "Examples:" + clr.titleOut
            }, {
              Command: clr.command + "trucolor " + clr.option + "-m 'Bold yellow text' " + clr.argument + "bold yellow" + clr.normal,
              Result: "→ " + clr.exBold + "Bold yellow text" + clr.exBoldOut
            }, {
              Command: clr.command + "trucolor " + clr.option + "-m 'Faint yellow text' " + clr.argument + "faint yellow" + clr.normal,
              Result: "→ " + clr.exFaint + "Faint yellow text" + clr.exFaintOut
            }, {
              Command: clr.command + "trucolor" + clr.option + " --swatch " + clr.argument + "faint yellow" + clr.normal,
              Result: "→ " + clr.exFaint + "\u2588\u2588" + clr.exFaintOut
            }, {
              Command: clr.command + "trucolor " + clr.option + "-m 'Italics' " + clr.argument + "italic #33FF33" + clr.normal,
              Result: "→ " + clr.exItalic + "Italics" + clr.exItalicOut
            }, {
              Command: clr.command + "trucolor " + clr.option + "-m ' -Inverted- ' " + clr.argument + "invert #7B00B1" + clr.normal,
              Result: "→ " + clr.exInvert + " -Inverted- " + clr.exInvertOut
            }, {
              Command: clr.command + "trucolor " + clr.option + "-m ' Background ' " + clr.argument + "background dark red" + clr.normal,
              Result: "→ " + clr.exBackground + " Background " + clr.normal
            }, {
              Command: clr.command + "trucolor " + clr.option + "-m 'Underlined' " + clr.argument + "underline #fff" + clr.normal,
              Result: "→ " + clr.exUnderline + "Inverted" + clr.exUnderlineOut
            }, {
              Command: clr.command + "trucolor " + clr.option + "-m 'Flashy Thing' " + clr.argument + "blink orange" + clr.normal,
              Result: "→ " + clr.exBlink + "Flashy Thing" + clr.exBlinkOut
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
      },
      more: clr.title + "Note:" + clr.titleOut + "\nObviously all this depends on your terminals support for the extended formatting. The latest iTerm2 builds and X's XTerm have full support for everything " + clr.command + "trucolor" + clr.normal + " can do, and anything that supports a terminal type of 'xterm-256color' will cover a fairly complete subset.\n\nFor example, Apple's Terminal.app doesn't have 24 bit color support nor does it have support for italics, but everything else works well."
    }
  };
  return pages;
};

outputPage = function(yargs_, pages_, helpPage_) {
  var container, contentWidth, page, renderer, rightMargin, windowWidth;
  container = truwrap({
    mode: 'container',
    outStream: process.stderr
  });
  windowWidth = container.getWidth();
  if (windowWidth > 120) {
    rightMargin = 116 - windowWidth;
  }
  if (rightMargin == null) {
    rightMargin = -2;
  }
  renderer = truwrap({
    left: 2,
    right: rightMargin,
    mode: 'soft',
    outStream: process.stderr
  });
  contentWidth = renderer.getWidth();
  page = (function() {
    switch (helpPage_) {
      case 'named':
        return pages_.named;
      case 'special':
        return pages_.special;
      default:
        return pages_["default"];
    }
  })();
  yargs_.usage(' ');
  yargs_.wrap(contentWidth);
  container.write('\n');
  container.write(pages_.shared.images.cc.render({
    nobreak: false,
    align: 2
  }));
  container.write(pages_.shared.header());
  renderer["break"]();
  container.write(pages_.shared.spectrum(contentWidth + 4, "━"));
  renderer["break"](2);
  renderer.write(pages_.shared.synopsis);
  renderer.write(yargs_.help());
  renderer["break"]();
  renderer.write(page.usage);
  renderer["break"](2);
  container.write(renderer.panel(page.examples(contentWidth)));
  renderer["break"](2);
  renderer.write(page.more);
  renderer["break"](2);
  renderer.write(pages_.shared.epilogue);
  return renderer["break"]();
};

module.exports = function(yargs_, helpPage_) {
  return trucolor.simplePalette(function(basic) {
    return trucolor.bulk({
      purple: 'purple',
      purpleSwatch: 'purple desaturate 70',
      orange: 'hsb:45,100,100',
      orangeSwatch: 'hsb:45,100,100 desaturate 70',
      red: 'red lighten 10',
      green: 'green lighten 10',
      blue: 'blue lighten 20',
      hotpink: 'hotpink',
      chocolate: 'chocolate',
      dark: 'red desaturate 100',
      msat: 'red desaturate 60',
      mlight: 'rgb(255,255,255) darken 25',
      bright: 'rgb(255,255,255)',
      bob: 'black lighten 50 saturate 50 spin 180',
      ul: 'underline',
      invert: 'invert',
      bold: 'bold',
      exBackground: 'background dark red',
      exBold: 'bold yellow',
      exFaint: 'faint yellow',
      exItalic: 'italic #33FF33',
      exInvert: 'invert #7B00B1',
      exUnderline: 'underline #fff',
      exBlink: 'blink orange'
    }, {}, function(clr) {
      return outputPage(yargs_, setupPage(deepAssign(clr, basic)), helpPage_);
    });
  });
};
