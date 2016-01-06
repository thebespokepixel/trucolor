'use strict'
###
 trucolor (v0.1.7-beta.0) 24bit color tools for the command line
 Simple Shared Palette
###

module.exports = (callback_) ->
	require("../../index").bulk
		example   : '#B262FF'
		command   : '#1579CF'
		argument  : '#4CB0DF'
		option    : '#C1BA89'
		operator  : '#FFF'
		grey      : '#808080'
		title     : 'bold #80C480'
		normal    : 'normal'
		reset     : 'reset',
		{}, callback_

