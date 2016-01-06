'use strict'
vows = require  'vows'
assert = require  'assert'
_package = require '../package.json'
trucolor = require('..')
namedVows = vows.describe("#{_package.name} Named Colors")
namedVows.addBatch
	"Primaries":
		topic: ->
			trucolor.bulk
				red: 'red'
				green: 'green'
				blue: 'blue',
				yellow: 'yellow',
				cyan: 'cyan',
				magenta: 'magenta',
				{type: 'value'}, (primaries) -> return primaries
		"is red?"    : (primaries) ->
			assert.equal primaries.red, 'FF0000'
		"is green?"  : (primaries) ->
			assert.equal primaries.green, '008000'
		"is blue?"   : (primaries) ->
			assert.equal primaries.blue, '0000FF'
		"is yellow?"    : (primaries) ->
			assert.equal primaries.yellow, 'FFFF00'
		"is cyan?"  : (primaries) ->
			assert.equal primaries.cyan, '00FFFF'
		"is magenta?"   : (primaries) ->
			assert.equal primaries.magenta, 'FF00FF'

	"Definitions":
		topic: ->
			trucolor.bulk
				rgb: 'rgb:255,128,64'
				hsl: 'hsl:45,100,60'
				hsv: 'hsv:90,50,20'
				hsb: 'hsb:135,100,100'
				hwb: 'hwb:155,50,0'
				{type: 'value'}, (definitions) -> return definitions
		"RGB?": (definitions) ->
			assert.equal definitions.rgb, 'FF8040'
		"HSL?": (definitions) ->
			assert.equal definitions.hsl, 'FFCC33'
		"HSV?": (definitions) ->
			assert.equal definitions.hsv, '26331A'
		"HSB?": (definitions) ->
			assert.equal definitions.hsb, '00FF40'
		"HWB?": (definitions) ->
			assert.equal definitions.hwb, '80FFCA'

	"Light/Dark/Saturation":
		topic: ->
			trucolor.bulk
				red        : 'dark red'
				green      : 'light green'
				blue       : 'blue lighten 20'
				violet     : 'violet desaturate 40'
				violet_s   : 'violet desat 20'
				firebrick  : 'firebrick saturate 30'
				firebrick_s: 'firebrick sat 10'
				{type: 'value'}, @callback
		"is dark red?"           : (colors, x) ->
			assert.equal colors.red, '990000'
		"is light green?"        : (colors, x) ->
			assert.equal colors.green, '00E600'
		"is lighter blue?"       : (colors, x) ->
			assert.equal colors.blue, '6666FF'
		"is desaturated violet?" : (colors, x) ->
			assert.equal colors.violet, 'D29ED2'
		"is desat violet?"       : (colors, x) ->
			assert.equal colors.violet_s, 'E090E0'
		"is saturated firebrick?": (colors, x) ->
			assert.equal colors.firebrick, 'D20202'
		"is sat firebrick?"      : (colors, x) ->
			assert.equal colors.firebrick_s, 'BD1717'

	"Hue":
		topic: ->
			trucolor.bulk
				orange   : 'orange spin 120'
				chocolate: 'chocolate spin -30'
				goldenrod: 'goldenrod spin 0'
				{type: 'value'}, @callback
		"is spun orange?"    : (colors, x) ->
			assert.equal colors.orange, '00FFA5'
		"is spun chocolate?" : (colors, x) ->
			assert.equal colors.chocolate, 'D21E2D'
		"is goldenrod?"      : (colors, x) ->
			assert.equal colors.goldenrod, 'DAA520'

	"Mixing":
		topic: ->
			trucolor.bulk
				redBlue  : 'red mix blue'
				hexMix   : '#123456 multiply #226644'
				hsbScreen: 'hsb:135,100,100 screen rgb(100,100,100)'
				{type: 'value'}, @callback
		"is red/blue mix?"                            : (colors, x) ->
			assert.equal colors.redBlue, '800080'
		"is #123456 multiply #226644?"                : (colors, x) ->
			assert.equal colors.hexMix, '021517'
		"is hsb:135,100,100 screen rgb(100,100,100)?" : (colors, x) ->
			assert.equal colors.hsbScreen, '64FF8B'



.export(module)
