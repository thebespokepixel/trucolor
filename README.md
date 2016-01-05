# trucolor v0.1.0-alpha.0
![Project status](http://img.shields.io/badge/status-alpha-red.svg?style=flat) [![Build Status](http://img.shields.io/travis/MarkGriffiths/trucolor.svg?style=flat)](https://travis-ci.org/MarkGriffiths/trucolor) [![Dependency Status](http://img.shields.io/david/MarkGriffiths/trucolor.svg?style=flat)](https://david-dm.org/MarkGriffiths/trucolor) [![devDependency Status](http://img.shields.io/david/dev/MarkGriffiths/trucolor.svg?style=flat)](https://david-dm.org/MarkGriffiths/trucolor#info=devDependencies)

__Work in progress.__

A combined node module and command line utility for using 24bit color SGR codes in modern terminals.

####Install
##### Global version, for CLI use
`npm install --global @thebespokepixel/trucolor`

##### Module, for programmatic use
`npm install --save @thebespokepixel/trucolor`

####CLI Usage

![Usage Examples](http://markgriffiths.github.io/projects/trucolor/example.png)

In it's simplest form, `trucolor 'color'`, will take any of the color expressions listed below and transform it into a simple hexadecimal triplet string, i.e `AA00BB`, ideal for passing into the `set_color` built-in in fish-shell, or providing the basis of further color processing.

By setting additional flags, it can return a wide range of color assignment and manipulation functions, based internally on color-convert and less. See the examples below.

All colors will fall back to simpler palettes if used in 256 or 16 color, or even monochromatic terminals.

The motivation behind this is to allow much more sophisticated graphic visualisation using in modern, xterm-compatible terminal emulators that have added support over the past few years.

The `color` can be specified in the following forms:

- CSS Hexadecimal
`[#]RRGGBB` or `[#]RGB` where `R`, `G` and `B` are 0-F.

- RGB
`rgb:R,G,B` or `rgb(R,G,B)` where `R`,`G` and `B` are 0-255.

- HSL (Hue Saturation Lightness)
`hsl:H,S,L` or `hsl(H,S,L)` where `H` is 0-360, `S` 0-100 and `L` 0-100

- HSV (Hue Saturation Value)
`hsl:H,S,V` or `hsl(H,S,V)` where `H` is 0-360, `S` 0-100 and `V `0-100

- HWB: (Hue White Black)
`hwb:H,W,B` or `hwb(H,W,B)` where `H` is 0-360, `W` 0-100 and `B` 0-100

- CSS name colors
Red, green, hotpink, chocolate...

- Special 'control' colors:
`reset`, `normal`, `underline`, `invert`, `bold`...

A large number of color `operations` can be specified, either before or after the base color declaration.

`[(light | dark)]` preset 20% darken/lighten.
`[(saturate | sat | desaturate | desat | lighten | darken) percent]` basic operations.
`[spin degrees]` hue shift.
`[(mix | multiply | screen) color]` mix with (`named` | `rgb()` | `#hex`) color.
`[(overlay | softlight | soft | hardlight | hard) color]` light with color.
`[(difference | diff | exclusion | excl) color]` subtract color.
`[(average | ave | negation | not) color]` blend with color.
`[contrast dark [light] [threshold]]` calculate contrasting color.

See http://lesscss.org/functions/#color-operations for more details.

####Programmatic Usage

More to come here...

```javascript
	const trucolor = require('@thebespokepixel/trucolor');

	trucolor.bulk({
		color_1: 'red lighten 10',
		color_2: '#fe2316',
		color_3: 'hsl(120,50,60)'
	}, {output: 'sgr|swatch'}, function (colour_object) {
		... object containing SGR or swatch strings, ready to write to stdio streams ...
	}); // Synchronous operation
```

Supported terminals include:

- [iTerm2 2.9 Beta](https://iterm2.com/downloads.html) 
