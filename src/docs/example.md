#### Installation
##### Global version, for CLI use
```shell
npm install --global @thebespokepixel/trucolor
```

##### Module, for programmatic use
```shell
npm install --save @thebespokepixel/trucolor
```

## CLI Usage

#### Synopsis:

```text
trucolor [options] "color description"...

Options:
-h, --help     Display this help.
-v, --version  Return the current version on stdout. -vv Return name & version.
-V, --verbose  Be verbose. -VV Be loquacious.
-m, --message  Format message with SGR codes
-i, --in       Output SGR color escape code.
-o, --out      Output cancelling SGR color escape code.
-t, --type     CLI styling flags output.
-r, --rgb      Output color as rgb(r, g, b).
-s, --swatch   Output an isolated color swatch.
--color        Force color depth --color=256|16m. Disable with --no-color
```

![Usage Examples](https://raw.githubusercontent.com/thebespokepixel/trucolor/master/media/example.png)

In it's simplest form, `trucolor 'color'`, will take any of the color expressions listed below and transform it into a simple hexadecimal triplet string, i.e `AA00BB`, ideal for passing into fish-shell's `set_color` built-in, or providing the basis of further color processing.

It can return color values and set terminal colors for a wide range of color assignment declarations and manipulation functions. See the examples below.

When outputting SGR codes, colors will be shifted to the availalble 256 or ansi color palette if 24 bit color is unavailable or will be omitted in a monochromatic terminal to make usage across environments safe. The CLI command respects `--color=16m`, `--color=256`, `--color` and `--no-color` flags. It does not affect value based output, such as the default or `--rgb` output, it only effects the `--in`, `--out`, `--message` and `--swatch` outputs.

The motivation for this is to allow more sophisticated graphic visualisation using in modern, xterm-compatible terminal emulators that have added 24 bit support.

##### Color definition

The `color` can be defined in any of the following formats:

- __CSS Hexadecimal__  
  `[#]RRGGBB` or `[#]RGB` where `R`, `G` and `B` are 0-F.

- __RGB__  
  `rgb:R,G,B` or `rgb(R,G,B)` where `R`,`G` and `B` are 0-255.  
  Spaces can be incuded in rgb(R, G, B) declarations but require quoting/escaping on the CLI.

- __HSL__ (Hue Saturation Lightness)  
  `hsl:H,S,L` where `H` is 0-360, `S` 0-100 and `L` 0-100

- __HSV__ (Hue Saturation Value)  
  `hsv:H,S,V` where `H` is 0-360, `S` 0-100 and `V `0-100

- __HSB__ (Hue Saturation Brightness) (just an alias for HSV)  
  `hsb:H,S,B` where `H` is 0-360, `S` 0-100 and `B `0-100

- __HWB__ (Hue White Black)
  `hwb:H,W,B` where `H` is 0-360, `W` 0-100 and `B` 0-100  
  See [HWB notation @csswg](https://drafts.csswg.org/css-color/#the-hwb-notation)

- __CSS named colors__  
![Named Colors Examples](https://raw.githubusercontent.com/thebespokepixel/trucolor/master/media/named.png)

- __Special formatters__
The following keywords modify the meaning or destination of the color, or provide enhanced foramtting. They only work when used with the command switches that actually output SGR codes, namely: `--message`, `--swatch`, `--in` and `--out`. When used with the default command or with the `--rgb` switch, they have no effect and the value of the base color (plus any processing) will be output.

  __background__: Set the background color, rather than the foreground.

  __normal__: Set the color to the default foreground and background.  
  __reset__: Sets colors and special formatting back to the default.

  __bold__: Set the font to bold.  
  __italic__: Set the font to italic.  
  __underline__: Set underline.  
  __dim__: Set the colour to 50% opacity.  
  __invert__: Invert the foreground and background.  
  __blink__: Annoying as a note in Comic Sans, attached to a dancing, purple dinosaur with a talking paperclip.

  All of the above formatters need the correct code to end the range, either provided by using the `--out` switch, using the `reset` keyword, or simply use the `--message` option to automatically set the end range SGR code. Using `normal` alone won't fully clear the formatting.

![Formatters Examples](https://raw.githubusercontent.com/thebespokepixel/trucolor/master/media/formatters.png)

##### Color manipulation

A number of color `operations` can be specified, either before or after the base color declaration.

`light`: lighten by 20%
`dark`: darken by 20%
`lighten` percent: lighten by percent
`darken` percent: darken by percent
`mono`: make monochrome
`saturate` or sat percent: saturate by percent
`desaturate` or des percent: desaturate by percent
`spin` degrees: spin hue by by degrees
color `mix` color: mix colors

##### Multiple Inputs
`trucolor` will output a list of color values if more than one base color is specified, allowing color assignment in a single block allowing easy ingest using `read`. Each color will be output on it's own line, and named according to the input base color. The names can be overridden by providing a `name:` before the base color.

```shell
> trucolor red yellow green purple
red: ff0000
yellow: ffff00
green: 008000
purple: 800080

> trucolor Po: red LaaLaa: yellow Dipsy: green TinkyWinky: purple
Po: ff0000
LaaLaa: ffff00
Dipsy: 008000
TinkyWinky: 800080

> trucolor hsl:120,100,50 apples: orange spin 180
hsl-120-100-50: 00ff00
apples: 005aff
```

## Programmatic Usage

```javascript

import {trucolor, palette, chalkish, simple} from 'trucolor'

const simpleColor = trucolor('bright red')
console.log(`${simpleColor.in}simpleColor${simpleColor.out}`)

const simplePalette = simple()
console.log(`${simplePalette.red}simplePalette Red${simplePalette.red.out}`)
console.log(`${simplePalette.blue}simplePalette Blue${simplePalette.blue.out}`)

const myPalette = palette({}, {
  red: '#F00',
  blue: 'lighten 30 blue'
})
console.log(`${myPalette.red}myPalette Red${myPalette.red.out}`)
console.log(`${myPalette.blue}myPalette Blue${myPalette.blue.out}`)

const myChalkishPalette = chalkish(palette({}, {
  red: '#F00',
  blue: 'lighten 30 blue'
}))
console.log(myChalkishPalette.red('myChalkishPalette Red'))
console.log(myChalkishPalette.blue('myChalkishPalette Blue'))

```
