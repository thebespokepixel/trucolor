'use strict';
var vows = require('vows'),
	assert = require('assert'),
	exec = require('child_process').exec;

vows.describe('trucolor cli').addBatch({
	'Get version': {
		'Short version number?': {
			topic: function() { exec('./bin/trucolor.js -v', this.callback) },
			'results in a short version number in the form x.x.x-x': function (error_, stdout_) {
				assert.match(stdout_, /[0-9]+.[0-9]+.[0-9]+[0-9-]*/)
			}
		},
		'Long version number?': {
			topic: function() { exec('./bin/trucolor.js -vv', this.callback) },
			'results in a version message in the form trucolor vx.x.x-x': function (error_, stdout_) {
				assert.match(stdout_, /@thebespokepixel\/trucolor v[0-9]+.[0-9]+.[0-9]+[0-9-]*/)
			}
		}
	}
}).export(module);
