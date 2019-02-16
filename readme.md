![TruColor][logo]

> A node module and CLI utility for using 24bit color SGR codes in modern terminals.

##### Status

[![npm](https://img.shields.io/npm/v/trucolor.svg?style=flat&logo=npm)](https://www.npmjs.com/package/trucolor "npm") [![Travis](https://img.shields.io/travis/MarkGriffiths/trucolor.svg?branch=master&style=flat&logo=travis)](https://travis-ci.org/MarkGriffiths/trucolor "Travis") [![David](https://img.shields.io/david/MarkGriffiths/trucolor.svg?branch=master&style=flat)](https://david-dm.org/MarkGriffiths/trucolor/master "David")  
 [![Code-climate](https://api.codeclimate.com/v1/badges/9719f82b8a448ee68072/maintainability?style=flat)](https://codeclimate.com/github/MarkGriffiths/trucolor/maintainability "Code-climate") [![Coverage](https://api.codeclimate.com/v1/badges/9719f82b8a448ee68072/test_coverage?style=flat)](https://codeclimate.com/github/MarkGriffiths/trucolor/test_coverage "Coverage") [![Snyk](https://snyk.io/test/github/MarkGriffiths/trucolor/badge.svg?style=flat)](https://snyk.io/test/github/MarkGriffiths/trucolor "Snyk")   

##### Developer

[![Greenkeeper](https://badges.greenkeeper.io/MarkGriffiths/trucolor.svg)](https://greenkeeper.io/ "Greenkeeper") [![David-developer](https://img.shields.io/david/dev/MarkGriffiths/trucolor.svg?branch=master&style=flat)](https://david-dm.org/MarkGriffiths/trucolor/master#info=devDependencies "David-developer") [![Rollup](https://img.shields.io/badge/es6-module%3Amjs_%E2%9C%94-64CA39.svg?style=flat&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHBhdGggZmlsbD0iI0ZGMzMzMyIgZD0iTTEwLjkwNDI4MjQsMy4wMDkxMDY4MyBDMTEuMjM4NzA1NSwzLjU4MjgzNzEzIDExLjQyODU3MTQsNC4yNDQ4MzM2MyAxMS40Mjg1NzE0LDQuOTUwOTYzMjIgQzExLjQyODU3MTQsNi40MTc4NjM0IDEwLjYwODY5NTcsNy42OTU2MjE3MiA5LjM5MTgyNzM5LDguMzc2NTMyNCBDOS4zMDU1MjQ2OCw4LjQyNDg2ODY1IDkuMjczMTYxMTYsOC41MzIwNDkwNCA5LjMxODQ3MDA5LDguNjE4MjEzNjYgTDExLjQyODU3MTQsMTMgTDUuMjU4NjgyODEsMTMgTDIuMzM5Nzc3MjMsMTMgQzIuMTUyMTIzNDUsMTMgMiwxMi44NDgyNzU3IDIsMTIuNjUzODA0OCBMMiwxLjM0NjE5NTIyIEMyLDEuMTU0OTk2ODggMi4xNDgzMTU0MywxIDIuMzM5Nzc3MjMsMSBMNy42NjAyMjI3NywxIEM3LjcwMTU0MTQ5LDEgNy43NDExMzc2NCwxLjAwNzM1NTg4IDcuNzc3NzY2NTgsMS4wMjA5MDQyOSBDOS4wNjQ1MzgyOCwxLjE0NDU0MDA0IDEwLjE3MzM4ODQsMS44NTM4NTI5MSAxMC44MjIyOTQ5LDIuODcyNTA0MzggQzEwLjc5OTE5NTMsMi44NDQ4NDgwNiAxMC44NDQ0OTkxLDIuOTQ5MTc0NzYgMTAuOTA0MjgyNCwzLjAwOTEwNjgzIFoiLz4KICAgIDxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iLjMxIiBkPSJNOC44NTcxNDI4NiwzLjU3MTQyODU3IEw2LjcxNDI4NTcxLDYuNTcxNDI4NTcgTDkuMjg1NzE0MjksNS4yODU3MTQyOSBDOS4yODU3MTQyOSw1LjI4NTcxNDI5IDkuNzE0Mjg1NzEsNC44NTcxNDI4NiA5LjI4NTcxNDI5LDQuNDI4NTcxNDMgQzkuMjg1NzE0MjksNCA4Ljg1NzE0Mjg2LDMuNTcxNDI4NTcgOC44NTcxNDI4NiwzLjU3MTQyODU3IFoiLz4KICAgIDxwYXRoIGZpbGw9IiNGQkIwNDAiIGQ9Ik0yLjg0Njc0NjAzLDEyLjk5NTg0OTUgQzMuMjY0OTIwNjIsMTIuOTk1ODQ5NSAzLjE4NTkzMDM0LDEyLjk0NjM2NjkgMy4zMTYxMTYzOCwxMi44NzM5MDU0IEMzLjYxODE3NTg3LDEyLjcwNTc3OTMgNS42ODk0NDA5OSw4LjcxMjc4NDU5IDcuNzE3NTU0NzYsNi44MjEzNjYwMiBDOS43NDU2Njg1Miw0LjkyOTk0NzQ2IDEwLjAwNDU3NjcsNS41NjA0MjAzMiA4Ljg4NDc5ODk1LDMuNTAyOTc3MjMgQzguODg0Nzk4OTUsMy41MDI5NzcyMyA5Ljc0NzgyNjA5LDUuMTQyMjA2NjUgOS4wMTQyNTMwMiw1LjI2ODMwMTIzIEM4LjQzODE4MjQxLDUuMzY3MDc1MzEgNy4xMTk5MDg0Nyw0LjEyMjk0MjIxIDcuNjExODMzOTMsMy4wMDQ5MDM2OCBDOC4wOTA4MTM5OSwxLjkxNDE4NTY0IDEwLjAxOTY3OTYsMi4xMjAxNDAxMSAxMC45MDY0NCwzLjAwOTEwNjgzIEMxMC44NzgzOTE2LDIuOTYyODcyMTUgMTAuODUwMzQzMiwyLjkxNjYzNzQ4IDEwLjgyMjI5NDksMi44NzI1MDQzOCBDMTAuMzA0NDc4NiwyLjI1MjUzOTQgOS41MDQwMjA5MiwxLjkwMzY3Nzc2IDguNzEwMDM1OTYsMS45MDM2Nzc3NiBDNy4xOTk3Mzg0OCwxLjkwMzY3Nzc2IDYuODIwMDA2NTQsMi40MjY5NzAyMyAzLjkyMDIzNTM3LDcuNjE5OTY0OTcgQzIuMzg3Nzk5MzQsMTAuMzY1NDA2NyAyLjAxMDgzMTkzLDExLjU3MzUwNzkgMi4wMDYyOTA2OSwxMi4xNjk4MTgyIEMyLDEyLjk5NTg0OTUgMi4wMDYyOTA2OSwxMi45OTU4NDk1IDIuODQ2NzQ2MDMsMTIuOTk1ODQ5NSBaIi8%2BCiAgPC9nPgo8L3N2Zz4K)](https://github.com/rollup/rollup/wiki/pkg.module "Rollup")   

##### Help

[![Inch](https://inch-ci.org/github/MarkGriffiths/trucolor.svg?branch=master&style=shields)](https://inch-ci.org/github/MarkGriffiths/trucolor "Inch") [![Gitter](https://img.shields.io/gitter/room/MarkGriffiths/help.svg?style=flat)](https://gitter.im/MarkGriffiths/help?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge "Gitter")   


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

![Usage Examples](https://raw.githubusercontent.com/MarkGriffiths/trucolor/master/media/example.png)

In it's simplest form, `trucolor 'color'`, will take any of the color expressions listed below and transform it into a simple hexadecimal triplet string, i.e `AA00BB`, ideal for passing into fish-shell's `set_color` built-in, or providing the basis of further color processing.

It can return color values and set terminal colors for a wide range of color assignment declarations and manipulation functions. See the examples below.

When outputting SGR codes, colors will be shifted to the availalble 256 or ansi color palette if 24 bit color is unavailable or will be omitted in a monochromatic terminal to make usage across environments safe. The CLI command respects `--color=16m`, `--color=256`, `--color` and `--no-color` flags. It does not affect value based output, such as the default or `--rgb` output, it only effects the `--in`, `--out`, `--message` and `--swatch` outputs.

The motivation for this is to allow more sophisticated graphic visualisation using in modern, xterm-compatible terminal emulators that have added 24 bit support.

##### Color definition

The `color` can be defined in any of the following formats:

-   **CSS Hexadecimal**  
    `[#]RRGGBB` or `[#]RGB` where `R`, `G` and `B` are 0-F.

-   **RGB**  
    `rgb:R,G,B` or `rgb(R,G,B)` where `R`,`G` and `B` are 0-255.  
    Spaces can be incuded in rgb(R, G, B) declarations but require quoting/escaping on the CLI.

-   **HSL** (Hue Saturation Lightness)  
    `hsl:H,S,L` where `H` is 0-360, `S` 0-100 and `L` 0-100

-   **HSV** (Hue Saturation Value)  
    `hsv:H,S,V` where `H` is 0-360, `S` 0-100 and `V`0-100

-   **HSB** (Hue Saturation Brightness) (just an alias for HSV)  
    `hsb:H,S,B` where `H` is 0-360, `S` 0-100 and `B`0-100

-   **HWB** (Hue White Black)
    `hwb:H,W,B` where `H` is 0-360, `W` 0-100 and `B` 0-100  
    See [HWB notation @csswg](https://drafts.csswg.org/css-color/#the-hwb-notation)

-   **CSS named colors**  
    ![Named Colors Examples](https://raw.githubusercontent.com/MarkGriffiths/trucolor/master/media/named.png)

-   **Special formatters**
    The following keywords modify the meaning or destination of the color, or provide enhanced foramtting. They only work when used with the command switches that actually output SGR codes, namely: `--message`, `--swatch`, `--in` and `--out`. When used with the default command or with the `--rgb` switch, they have no effect and the value of the base color (plus any processing) will be output.

      **background**: Set the background color, rather than the foreground.

      **normal**: Set the color to the default foreground and background.  
      **reset**: Sets colors and special formatting back to the default.

      **bold**: Set the font to bold.  
      **italic**: Set the font to italic.  
      **underline**: Set underline.  
      **dim**: Set the colour to 50% opacity.  
      **invert**: Invert the foreground and background.  
      **blink**: Annoying as a note in Comic Sans, attached to a dancing, purple dinosaur with a talking paperclip.

      All of the above formatters need the correct code to end the range, either provided by using the `--out` switch, using the `reset` keyword, or simply use the `--message` option to automatically set the end range SGR code. Using `normal` alone won't fully clear the formatting.

![Formatters Examples](https://raw.githubusercontent.com/MarkGriffiths/trucolor/master/media/formatters.png)

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

Full documentation can be found at [https://markgriffiths.github.io/trucolor/][1]

[1]: https://markgriffiths.github.io/trucolor/

[logo]: https://raw.githubusercontent.com/MarkGriffiths/trucolor/master/media/banner.png
