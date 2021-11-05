#### Installation

```shell
npm install --save @thebespokepixel/trucolor
```

## Usage

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
