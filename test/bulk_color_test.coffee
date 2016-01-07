'use strict'
vows = require  'vows'
assert = require  'assert'
_package = require '../package.json'
trucolor = require('..')
namedVows = vows.describe("#{_package.name} Named Colors")
namedVows.addBatch
	"Primaries":
		topic: ->
			trucolor.bulk {type: 'value'},
				red: 'red'
				green: 'green'
				blue: 'blue',
				yellow: 'yellow',
				cyan: 'cyan',
				magenta: 'magenta'
		"is red?"    : (topic) ->
			assert.equal topic.red, 'FF0000'
		"is green?"  : (topic) ->
			assert.equal topic.green, '008000'
		"is blue?"   : (topic) ->
			assert.equal topic.blue, '0000FF'
		"is yellow?"    : (topic) ->
			assert.equal topic.yellow, 'FFFF00'
		"is cyan?"  : (topic) ->
			assert.equal topic.cyan, '00FFFF'
		"is magenta?"   : (topic) ->
			assert.equal topic.magenta, 'FF00FF'

	"Definitions":
		topic: ->
			trucolor.bulk {type: 'value'},
				rgb: 'rgb:255,128,64'
				hsl: 'hsl:45,100,60'
				hsv: 'hsv:90,50,20'
				hsb: 'hsb:135,100,100'
				hwb: 'hwb:155,50,0'

		"RGB?": (topic) ->
			assert.equal topic.rgb, 'FF8040'
		"HSL?": (topic) ->
			assert.equal topic.hsl, 'FFCC33'
		"HSV?": (topic) ->
			assert.equal topic.hsv, '26331A'
		"HSB?": (topic) ->
			assert.equal topic.hsb, '00FF40'
		"HWB?": (topic) ->
			assert.equal topic.hwb, '80FFCA'

	"Light/Dark/Saturation":
		topic: ->
			trucolor.bulk {type: 'value'},
				red        : 'dark red'
				green      : 'light green'
				blue       : 'blue lighten 20'
				violet     : 'violet desaturate 40'
				violet_s   : 'violet desat 20'
				firebrick  : 'firebrick saturate 30'
				firebrick_s: 'firebrick sat 10'
		"is dark red?"           : (topic) ->
			assert.equal topic.red, '990000'
		"is light green?"        : (topic) ->
			assert.equal topic.green, '00E600'
		"is lighter blue?"       : (topic) ->
			assert.equal topic.blue, '6666FF'
		"is desaturated violet?" : (topic) ->
			assert.equal topic.violet, 'D29ED2'
		"is desat violet?"       : (topic) ->
			assert.equal topic.violet_s, 'E090E0'
		"is saturated firebrick?": (topic) ->
			assert.equal topic.firebrick, 'D20202'
		"is sat firebrick?"      : (topic) ->
			assert.equal topic.firebrick_s, 'BD1717'

	"Hue":
		topic: ->
			trucolor.bulk {type: 'value'},
				orange   : 'orange spin 120'
				chocolate: 'chocolate spin -30'
				goldenrod: 'goldenrod spin 0'

		"is spun orange?"    : (topic) ->
			assert.equal topic.orange, '00FFA5'
		"is spun chocolate?" : (topic) ->
			assert.equal topic.chocolate, 'D21E2D'
		"is goldenrod?"      : (topic) ->
			assert.equal topic.goldenrod, 'DAA520'

	"Mixing":
		topic: ->
			trucolor.bulk {type: 'value'},
				redBlue  : 'red mix blue'
				hexMix   : '#123456 multiply #226644'
				hsbScreen: 'hsb:135,100,100 screen rgb(100,100,100)'

		"is red/blue mix?"                            : (topic) ->
			assert.equal topic.redBlue, '800080'
		"is #123456 multiply #226644?"                : (topic) ->
			assert.equal topic.hexMix, '021517'
		"is hsb:135,100,100 screen rgb(100,100,100)?" : (topic) ->
			assert.equal topic.hsbScreen, '64FF8B'



.export(module)
