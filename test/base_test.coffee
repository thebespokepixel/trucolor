'use strict'
vows = require  'vows'
assert = require  'assert'
semverRegex = require 'semver-regex'
_package = require '../package.json'
trucolor = require '..'

expectedVersion = if _package.build_number is 0
	"#{_package.version}"
else
	"#{_package.version}-Δ#{_package.build_number}"

vows
	.describe("#{_package.name} module")
	.addBatch
		'Module':
			"name is #{_package.name}?":
				topic: trucolor.getName()
				"#{_package.name}": (topic) ->
					assert topic is _package.name

	.addBatch
		'Module version':
			"is semver?":
				topic: trucolor.getVersion 1
				"#{expectedVersion} matches semver-regex": (topic) ->
					assert.isTrue semverRegex().test topic

			"is #{expectedVersion}?":
				topic: trucolor.getVersion 1
				"Should === #{expectedVersion}": (topic) ->
					assert topic is expectedVersion

			"(long) is #{_package.name} v#{expectedVersion}":
				topic: trucolor.getVersion 2
				"Should === #{_package.name} v#{expectedVersion}": (topic) ->
					assert topic is "#{_package.name} v#{expectedVersion}"

.export(module)
