# trucolor v0.1.8-beta.2
![Project status](http://img.shields.io/badge/status-beta-blue.svg?style=flat) [![Build Status](http://img.shields.io/travis/MarkGriffiths/trucolor.svg?style=flat)](https://travis-ci.org/MarkGriffiths/trucolor) [![Dependency Status](http://img.shields.io/david/MarkGriffiths/trucolor.svg?style=flat)](https://david-dm.org/MarkGriffiths/trucolor) [![devDependency Status](http://img.shields.io/david/dev/MarkGriffiths/trucolor.svg?style=flat)](https://david-dm.org/MarkGriffiths/trucolor#info=devDependencies)

A node.js module and command line utility for using 24bit color SGR codes in modern terminals.

## Install
##### Global version, for CLI use
`npm install --global @thebespokepixel/trucolor`

##### Module, for programmatic use
`npm install --save @thebespokepixel/trucolor`

## CLI Usage

#### Synopsis:

```text
trucolor [options] [name]: [operation...] color [operation...]
               ...[[name]: [operation...] color [operation...]]...

Options:
-h, --help     Display this help.
-v, --version  Return the current version. -vv Return name & version.
-V, --verbose  Be verbose. -VV Be loquacious.                        
-m, --message  Format message with SGR codes
-i, --in       Output SGR color escape code.                         
-o, --out      Output cancelling SGR color escape code.              
-r, --rgb      Output color as rgb(r, g, b)                          
-s, --swatch   Output an isolated color swatch.
```

![Usage Examples](http://markgriffiths.github.io/projects/trucolor/example.png)

In it's simplest form, `trucolor 'color'`, will take any of the color expressions listed below and transform it into a simple hexadecimal triplet string, i.e `AA00BB`, ideal for passing into fish-shell's `set_color` built-in, or providing the basis of further color processing.

It can return color values and set terminal colors for a wide range of color assignment declarations and manipulation functions, based internally on the [`color-convert`](https://github.com/Qix-/color-convert) node module and [`less`](http://lesscss.org). See the examples below.

When outputting SGR codes, colors will be shifted to the availalble 256 or ansi color palette if 24 bit color is unavailable or will be omitted in a monochromatic terminal to make usage across environments safe. The CLI command respects `--color=16m`, `--color=256`, `--color` and `--no-color` flags. It does not affect value based output, such as the default or `--rgb` output, it only effects the `--in`, `--out`, `--message` and `--swatch` outputs.

The motivation for this is to allow more sophisticated graphic visualisation using in modern, xterm-compatible terminal emulators that have added 24 bit support.

##### Color definition

The `color` can be defined in any of the following formats:

-	__CSS Hexadecimal__  
	`[#]RRGGBB` or `[#]RGB` where `R`, `G` and `B` are 0-F.

-	__RGB__  
	`rgb:R,G,B` or `rgb(R,G,B)` where `R`,`G` and `B` are 0-255.  
	Spaces can be incuded in rgb(R, G, B) declarations but require quoting/escaping on the CLI.

-	__HSL__ (Hue Saturation Lightness)  
	`hsl:H,S,L` where `H` is 0-360, `S` 0-100 and `L` 0-100

-	__HSV__ (Hue Saturation Value)  
	`hsv:H,S,V` where `H` is 0-360, `S` 0-100 and `V `0-100

-	__HSB__ (Hue Saturation Brightness) (just an alias for HSV)  
	`hsb:H,S,B` where `H` is 0-360, `S` 0-100 and `B `0-100

-	__HWB__ (Hue White Black)
	`hwb:H,W,B` where `H` is 0-360, `W` 0-100 and `B` 0-100  
	See [HWB notation @csswg](https://drafts.csswg.org/css-color/#the-hwb-notation)

- __CSS named colors__
![Named Colors Examples](http://markgriffiths.github.io/projects/trucolor/named.png)

- __Special formatters__
The following keywords modify the meaning or destination of the color, or provide enhanced foramtting. They only work when used with the command switches that actually output SGR codes, namely: `--message`, `--swatch`, `--in` and `--out`. When used with the default command or with the `--rgb` switch, they have no effect and the value of the base color (plus any processing) will be output.

	__background__: Set the background color, rather than the foreground.

	__normal__: Set the color to the default foreground and background.  
	__reset__: Sets colors and special formatting back to the default.

	__bold__: Set the font to bold.  
	__italic__: Set the font to italic.  
	__underline__: Set underline.  
	__faint__: Set the colour to 50% opacity.  
	__invert__: Invert the foreground and background.  
	__blink__: Annoying as a note in Comic Sans, attached to a dancing, purple dinosaur with a talking paperclip.

	All of the above formatters need the correct code to end the range, either provided by using the `--out` switch, using the `reset` keyword, or simply use the `--message` option to automatically set the end range SGR code. Using `normal` alone won't fully clear the formatting.

![Formatters Examples](http://markgriffiths.github.io/projects/trucolor/formatters.png)

##### Color manipulation

A number of color `operations` can be specified, either before or after the base color declaration.

__light__ | __dark__ : preset 20% darken/lighten.  
__saturate__ | __sat__ | __desaturate__ | __desat__ | __lighten__ | __darken__ _percent_ : basic operations.  
__spin__ _degrees_ : hue shift.  
__mix__ | __multiply__ | __screen__ (`named` | `rgb()` | `#hex`) : mix with color.  
__overlay__ | __softlight__ | __soft__ | __hardlight__ | __hard__ _color_ : light with color.  
__difference__ | __diff__ | __exclusion__ | __excl__ _color_ : subtract color.  
__average__ | __ave__ | __negation__ | __not__ _color_ : blend with color.  
__contrast__ _dark color_ `[light color]` `[threshold]` : calculate contrasting color.  

See <http://lesscss.org/functions/#color-operations> for more details.

##### Multiple Inputs
`trucolor` will output a list of color values if more than one base color is specified, allowing color assignment in a single block allowing easy ingest using `read`. Each color will be output on it's own line, and named according to the input base color. The names can be overridden by providing a `name:` before the base color.

```sh
> trucolor red yellow green purple
red FF0000
yellow FFFF00
green 008000
purple 800080

> trucolor Po: red LaaLaa: yellow Dipsy: green TinkyWinky: purple
Po FF0000
LaaLaa FFFF00
Dipsy 008000
TinkyWinky 800080

> trucolor hsl:120,100,50 apples: orange spin 180
hsl-120-100-50 00FF00
apples 005AFF
```

##### Custom Names:
Any color definition can be prefixed with a `name:` and the result will be cached with that name, allowing it to be recalled by the same name later.

```sh
> trucolor bob: black lighten 50 saturate 50 spin 180
40BFBF
> trucolor --rgb bob:
rgb(64, 191, 191)
```

##### Supported and tested terminals include:
Obviously all this depends on your terminals support for the extended formatting. The latest iTerm2 builds and X's XTerm have full support for everything `trucolor` can do, and anything that supports a terminal type of 'xterm-256color' will cover a fairly complete subset.

For example, Apple's Terminal.app doesn't have 24 bit color support nor does it have support for italics, but everything else works well.

-	[iTerm2 2.9 Beta](https://iterm2.com/downloads.html) (OS X)
-	XTerm (^314 XQuartz 2.7.8)

Please let me know results in your terminal. <http://github.com/MarkGriffiths/trucolor>

## Programmatic Usage

More to come here...

### Simple generic palette

I use this to make sure help pages are consistent between different modules.

```javascript
//ES6
require('@thebespokepixel/trucolor').simplePalette(clr => {
	console.log("${clr.command}trucolor${clr.normal} palettes");
});

//ES5
var trucolor = require('@thebespokepixel/trucolor');
trucolor.simplePalette(function(clr) {
	console.log(clr.command + "trucolor" + clr.normal + "palettes");
});

```

### Bulk color creation

```javascript
var trucolor = require('@thebespokepixel/trucolor');

trucolor.bulk({
	color_1: 'red lighten 10',
	color_2: '#fe2316',
	color_3: 'hsl(120,50,60)'
}, { output: 'value|sgr|swatch' }, function (colour_object) {
	... object containing HEX value, SGR codes or swatch strings, ready to write to stdio streams ...
}); // Synchronous operation, despite callback
```

