'use strict'
vows = require 'vows'
assert = require 'assert'
semverRegex = require 'semver-regex'
_package = require '../package.json'
trucolor = require '..'
exec = require('child_process').exec
bin = _package.bin[_package.name]

expectedVersion = if _package.build_number is 0
	"#{_package.version}"
else
	"#{_package.version}-Δ#{_package.build_number}"

vows
	.describe("#{_package.name} cli")
	.addBatch
		'Binary version':
			"is semver?":
				topic: ->
					exec "#{bin} -v", @callback
					return
				"#{expectedVersion} matches semver-regex": (error_, output_) ->
					assert.isNull error_
					assert.isTrue semverRegex().test output_

			"is #{_package.version}?":
				topic: ->
					exec "#{bin} -v", @callback
					return
				"Should === #{expectedVersion}": (error_, output_) ->
					assert.isNull error_
					assert output_ is expectedVersion, output_

			"(long) is #{_package.name} v#{expectedVersion}":
				topic: ->
					exec "#{bin} -vv", @callback
					return
				"Should === #{_package.name} v#{expectedVersion}": (error_, output_) ->
					assert.isNull error_
					assert output_ is "#{_package.name} v#{expectedVersion}"

.export(module)
