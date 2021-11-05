![TruColor][logo]
> A node module and CLI utility for using 24bit color SGR codes in modern terminals.

##### Publishing Status

[![npm](https://img.shields.io/npm/v/trucolor?logo=npm "npm")](https://www.npmjs.com/package/trucolor "npm")&#x20;[![Libraries.io](https://img.shields.io/librariesio/release/npm/trucolor/latest?\&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01Ljk5OTMxNDIyLDE1LjI3NyBMNiwyMyBDNiwyMy41NTIyODQ3IDUuNTUyMjg0NzUsMjQgNSwyNCBMMiwyNCBDMS40NDc3MTUyNSwyNCAxLDIzLjU1MjI4NDcgMSwyMyBMMC45OTkzMTQyMjIsMTkuMTg0IEw1Ljk5OTMxNDIyLDE1LjI3NyBaIE0xNC40OTkzMTQyLDguNjM2IEwxNC41LDIzIEMxNC41LDIzLjU1MjI4NDcgMTQuMDUyMjg0NywyNCAxMy41LDI0IEwxMC41LDI0IEM5Ljk0NzcxNTI1LDI0IDkuNSwyMy41NTIyODQ3IDkuNSwyMyBMOS40OTkzMTQyMiwxMi41NDMgTDE0LjQ5OTMxNDIsOC42MzYgWiBNMTcuOTk5MzE0Miw4LjMzNCBMMjIuOTk5MzE0MiwxMi4xMDIgTDIzLDIzIEMyMywyMy41NTIyODQ3IDIyLjU1MjI4NDcsMjQgMjIsMjQgTDE5LDI0IEMxOC40NDc3MTUzLDI0IDE4LDIzLjU1MjI4NDcgMTgsMjMgTDE3Ljk5OTMxNDIsOC4zMzQgWiBNNSwwIEM1LjU1MjI4NDc1LDAgNiwwLjQ0NzcxNTI1IDYsMSBMNS45OTkzMTQyMiwxMS40NzEgTDAuOTk5MzE0MjIyLDE1LjM3OCBMMSwxIEMxLDAuNDQ3NzE1MjUgMS40NDc3MTUyNSwwIDIsMCBMNSwwIFogTTEzLjUsMCBDMTQuMDUyMjg0NywwIDE0LjUsMC40NDc3MTUyNSAxNC41LDEgTDE0LjQ5OTMxNDIsNC44MzEgTDkuNDk5MzE0MjIsOC43MzcgTDkuNSwxIEM5LjUsMC40NDc3MTUyNSA5Ljk0NzcxNTI1LDAgMTAuNSwwIEwxMy41LDAgWiBNMjIsMCBDMjIuNTUyMjg0NywwIDIzLDAuNDQ3NzE1MjUgMjMsMSBMMjIuOTk5MzE0Miw4LjM0NyBMMTcuOTk5MzE0Miw0LjU3OSBMMTgsMSBDMTgsMC40NDc3MTUyNSAxOC40NDc3MTUzLDAgMTksMCBMMjIsMCBaIi8%2BCjwvc3ZnPgo%3D "Libraries.io")](https://libraries.io/github/thebespokepixel/trucolor "Libraries.io")&#x20;  
[![Travis](https://img.shields.io/travis/com/thebespokepixel/trucolor/master?logo=travis "Travis")](https://travis-ci.com/thebespokepixel/trucolor "Travis")&#x20;[![Rollup](https://img.shields.io/badge/es6-type%3A%20module%20%E2%9C%94-64CA39?\&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHBhdGggZmlsbD0iI0ZGMzMzMyIgZD0iTTEwLjkwNDI4MjQsMy4wMDkxMDY4MyBDMTEuMjM4NzA1NSwzLjU4MjgzNzEzIDExLjQyODU3MTQsNC4yNDQ4MzM2MyAxMS40Mjg1NzE0LDQuOTUwOTYzMjIgQzExLjQyODU3MTQsNi40MTc4NjM0IDEwLjYwODY5NTcsNy42OTU2MjE3MiA5LjM5MTgyNzM5LDguMzc2NTMyNCBDOS4zMDU1MjQ2OCw4LjQyNDg2ODY1IDkuMjczMTYxMTYsOC41MzIwNDkwNCA5LjMxODQ3MDA5LDguNjE4MjEzNjYgTDExLjQyODU3MTQsMTMgTDUuMjU4NjgyODEsMTMgTDIuMzM5Nzc3MjMsMTMgQzIuMTUyMTIzNDUsMTMgMiwxMi44NDgyNzU3IDIsMTIuNjUzODA0OCBMMiwxLjM0NjE5NTIyIEMyLDEuMTU0OTk2ODggMi4xNDgzMTU0MywxIDIuMzM5Nzc3MjMsMSBMNy42NjAyMjI3NywxIEM3LjcwMTU0MTQ5LDEgNy43NDExMzc2NCwxLjAwNzM1NTg4IDcuNzc3NzY2NTgsMS4wMjA5MDQyOSBDOS4wNjQ1MzgyOCwxLjE0NDU0MDA0IDEwLjE3MzM4ODQsMS44NTM4NTI5MSAxMC44MjIyOTQ5LDIuODcyNTA0MzggQzEwLjc5OTE5NTMsMi44NDQ4NDgwNiAxMC44NDQ0OTkxLDIuOTQ5MTc0NzYgMTAuOTA0MjgyNCwzLjAwOTEwNjgzIFoiLz4KICAgIDxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iLjMxIiBkPSJNOC44NTcxNDI4NiwzLjU3MTQyODU3IEw2LjcxNDI4NTcxLDYuNTcxNDI4NTcgTDkuMjg1NzE0MjksNS4yODU3MTQyOSBDOS4yODU3MTQyOSw1LjI4NTcxNDI5IDkuNzE0Mjg1NzEsNC44NTcxNDI4NiA5LjI4NTcxNDI5LDQuNDI4NTcxNDMgQzkuMjg1NzE0MjksNCA4Ljg1NzE0Mjg2LDMuNTcxNDI4NTcgOC44NTcxNDI4NiwzLjU3MTQyODU3IFoiLz4KICAgIDxwYXRoIGZpbGw9IiNGQkIwNDAiIGQ9Ik0yLjg0Njc0NjAzLDEyLjk5NTg0OTUgQzMuMjY0OTIwNjIsMTIuOTk1ODQ5NSAzLjE4NTkzMDM0LDEyLjk0NjM2NjkgMy4zMTYxMTYzOCwxMi44NzM5MDU0IEMzLjYxODE3NTg3LDEyLjcwNTc3OTMgNS42ODk0NDA5OSw4LjcxMjc4NDU5IDcuNzE3NTU0NzYsNi44MjEzNjYwMiBDOS43NDU2Njg1Miw0LjkyOTk0NzQ2IDEwLjAwNDU3NjcsNS41NjA0MjAzMiA4Ljg4NDc5ODk1LDMuNTAyOTc3MjMgQzguODg0Nzk4OTUsMy41MDI5NzcyMyA5Ljc0NzgyNjA5LDUuMTQyMjA2NjUgOS4wMTQyNTMwMiw1LjI2ODMwMTIzIEM4LjQzODE4MjQxLDUuMzY3MDc1MzEgNy4xMTk5MDg0Nyw0LjEyMjk0MjIxIDcuNjExODMzOTMsMy4wMDQ5MDM2OCBDOC4wOTA4MTM5OSwxLjkxNDE4NTY0IDEwLjAxOTY3OTYsMi4xMjAxNDAxMSAxMC45MDY0NCwzLjAwOTEwNjgzIEMxMC44NzgzOTE2LDIuOTYyODcyMTUgMTAuODUwMzQzMiwyLjkxNjYzNzQ4IDEwLjgyMjI5NDksMi44NzI1MDQzOCBDMTAuMzA0NDc4NiwyLjI1MjUzOTQgOS41MDQwMjA5MiwxLjkwMzY3Nzc2IDguNzEwMDM1OTYsMS45MDM2Nzc3NiBDNy4xOTk3Mzg0OCwxLjkwMzY3Nzc2IDYuODIwMDA2NTQsMi40MjY5NzAyMyAzLjkyMDIzNTM3LDcuNjE5OTY0OTcgQzIuMzg3Nzk5MzQsMTAuMzY1NDA2NyAyLjAxMDgzMTkzLDExLjU3MzUwNzkgMi4wMDYyOTA2OSwxMi4xNjk4MTgyIEMyLDEyLjk5NTg0OTUgMi4wMDYyOTA2OSwxMi45OTU4NDk1IDIuODQ2NzQ2MDMsMTIuOTk1ODQ5NSBaIi8%2BCiAgPC9nPgo8L3N2Zz4K "Rollup")](https://github.com/rollup/rollup/wiki/pkg.module "Rollup")&#x20;  


##### Development Status

[![Travis](https://img.shields.io/travis/com/thebespokepixel/trucolor/develop?logo=travis "Travis")](https://travis-ci.com/thebespokepixel/trucolor "Travis")&#x20;[![Libraries.io](https://img.shields.io/librariesio/github/TheBespokePixel/trucolor?\&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01Ljk5OTMxNDIyLDE1LjI3NyBMNiwyMyBDNiwyMy41NTIyODQ3IDUuNTUyMjg0NzUsMjQgNSwyNCBMMiwyNCBDMS40NDc3MTUyNSwyNCAxLDIzLjU1MjI4NDcgMSwyMyBMMC45OTkzMTQyMjIsMTkuMTg0IEw1Ljk5OTMxNDIyLDE1LjI3NyBaIE0xNC40OTkzMTQyLDguNjM2IEwxNC41LDIzIEMxNC41LDIzLjU1MjI4NDcgMTQuMDUyMjg0NywyNCAxMy41LDI0IEwxMC41LDI0IEM5Ljk0NzcxNTI1LDI0IDkuNSwyMy41NTIyODQ3IDkuNSwyMyBMOS40OTkzMTQyMiwxMi41NDMgTDE0LjQ5OTMxNDIsOC42MzYgWiBNMTcuOTk5MzE0Miw4LjMzNCBMMjIuOTk5MzE0MiwxMi4xMDIgTDIzLDIzIEMyMywyMy41NTIyODQ3IDIyLjU1MjI4NDcsMjQgMjIsMjQgTDE5LDI0IEMxOC40NDc3MTUzLDI0IDE4LDIzLjU1MjI4NDcgMTgsMjMgTDE3Ljk5OTMxNDIsOC4zMzQgWiBNNSwwIEM1LjU1MjI4NDc1LDAgNiwwLjQ0NzcxNTI1IDYsMSBMNS45OTkzMTQyMiwxMS40NzEgTDAuOTk5MzE0MjIyLDE1LjM3OCBMMSwxIEMxLDAuNDQ3NzE1MjUgMS40NDc3MTUyNSwwIDIsMCBMNSwwIFogTTEzLjUsMCBDMTQuMDUyMjg0NywwIDE0LjUsMC40NDc3MTUyNSAxNC41LDEgTDE0LjQ5OTMxNDIsNC44MzEgTDkuNDk5MzE0MjIsOC43MzcgTDkuNSwxIEM5LjUsMC40NDc3MTUyNSA5Ljk0NzcxNTI1LDAgMTAuNSwwIEwxMy41LDAgWiBNMjIsMCBDMjIuNTUyMjg0NywwIDIzLDAuNDQ3NzE1MjUgMjMsMSBMMjIuOTk5MzE0Miw4LjM0NyBMMTcuOTk5MzE0Miw0LjU3OSBMMTgsMSBDMTgsMC40NDc3MTUyNSAxOC40NDc3MTUzLDAgMTksMCBMMjIsMCBaIi8%2BCjwvc3ZnPgo%3D "Libraries.io")](https://libraries.io/github/thebespokepixel/trucolor "Libraries.io")&#x20;  
[![Snyk](https://snyk.io/test/github/thebespokepixel/trucolor/badge.svg "Snyk")](https://snyk.io/test/github/thebespokepixel/trucolor "Snyk")&#x20;[![Code-Climate](https://api.codeclimate.com/v1/badges/5f8c6c4143841284dc75/maintainability "Code-Climate")](https://codeclimate.com/github/thebespokepixel/trucolor/maintainability "Code-Climate")&#x20;[![Code-Climate Coverage](https://api.codeclimate.com/v1/badges/5f8c6c4143841284dc75/test_coverage "Code-Climate Coverage")](https://codeclimate.com/github/thebespokepixel/trucolor/test_coverage "Code-Climate Coverage")&#x20;  


##### Documentation/Help

[![Twitter](https://img.shields.io/twitter/follow/thebespokepixel?style=social "Twitter")](https://twitter.com/thebespokepixel "Twitter")&#x20;  


## Usage

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


## Documentation
Full documentation can be found at [https://thebespokepixel.github.io/trucolor/][1]

[1]: https://thebespokepixel.github.io/trucolor/
[logo]: https://raw.githubusercontent.com/thebespokepixel/trucolor/master/media/banner.png
