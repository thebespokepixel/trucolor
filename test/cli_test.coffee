'use strict'
vows = require 'vows'
assert = require 'assert'
semverRegex = require 'semver-regex'
_package = require '../package.json'
trucolor = require '..'
exec = require('child_process').exec
bin = _package.bin[_package.name]

vows
	.describe("#{_package.name} cli")
	.addBatch
		'Binary version':
			"is semver?":
				topic: ->
					exec "#{bin} -v", @callback
					return
				"#{_package.version} matches semver-regex": (error_, output_) ->
					assert.isNull error_
					assert.isTrue semverRegex().test output_

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
