'use strict'


vows = require 'vows'
assert = require 'assert'
_package = require '../package.json'
testSubject = require('../../trucolor').RGBout()
exec = require('child_process').exec
bin = _package.bin[_package.name.split('/')[1]]

vows
	.describe("#{_package.name} cli")
	.addBatch
		'Binary version':
			"is semvar?":
				topic: ->
					exec "#{bin} -v", @callback
					return
				"#{_package.version} matches /[0-9]+.[0-9]+.[0-9]+[0-9a-z.-]*/": (error_, output_) ->
					assert.isNull error_
					assert.match output_, /[0-9]+.[0-9]+.[0-9]+[0-9a-z.-]*/

			"is #{_package.version}?":
				topic: ->
					exec "#{bin} -v", @callback
					return
				"Should === #{_package.version}": (error_, output_) ->
					assert.isNull error_
					assert output_ is _package.version, output_

			"(long) is #{_package.name} v#{_package.version}":
				topic: ->
					exec "#{bin} -vv", @callback
					return
				"Should === #{_package.name} v#{_package.version}": (error_, output_) ->
					assert.isNull error_
					assert output_ is "#{_package.name} v#{_package.version}"

.export(module)
