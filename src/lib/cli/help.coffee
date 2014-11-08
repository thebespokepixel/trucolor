'use strict'
###
 trucolor (v0.0.4) : 24bit color tools for the command line
 Command line help
###

consoleWrap = require 'console-wrap';

clr =
	example:	"\x1b[38;2;204;51;66m"
	command:	"\x1b[38;2;0;95;215m"
	argument:	"\x1b[38;2;0;175;255m"
	salmon:		"\x1b[38;2;250;128;114m"
	red:		"\x1b[38;2;255;0;0m"
	green:		"\x1b[38;2;0;255;0m"
	blue:		"\x1b[38;2;0;0;255m"
	grey:		"\x1b[38;2;140;140;140m"
	normal:		"\x1b[39m\x1b[49m"
	negative:	"\x1b[7m"
	positive:	"\x1b[27m"
	bold:		"\x1b[1m"
	medium:		"\x1b[22m"
	reset:		"\x1b[0m"

synopsis = """
	Synopsis:

	    #{clr.command}trucolor #{clr.grey}[OPTIONS]#{clr.normal} #{clr.argument}color#{clr.normal} [processing steps…]

	    #{clr.command}trucolor #{clr.grey}[OPTIONS] --batch#{clr.normal} [name_1:|@varname] #{clr.argument}color#{clr.normal} [processing steps…] #{clr.grey}[name_2: color [processing steps…]]#{clr.normal}
"""

spectrum = -> (for col in [0..process.stdout.columns - 1]
	scalar_s = col / ((process.stdout.columns - 1) / 2)
	scalar_c = Math.sin((col / (process.stdout.columns - 1)) * (Math.PI))
	red = if scalar_s > 0 then scalar_s else 0
	green = 0#if scalar_c > 0 then scalar_c else 0
	blue = 0#if scalar_s > 0 then (1 - scalar_s) else 0
	"\x1b[38;2;#{Math.floor(red * 255)};#{Math.floor(green * 255)};#{Math.floor(blue * 255)}m─").join('')

_pages =
	default:
		usage: """

			A set of 24 bit color command line styling tools for node.js and the shell (enhanced for fish)

			#{synopsis}

			Usage:

			In it's simplest form, '#{clr.command}trucolor#{clr.normal} #{clr.argument}color#{clr.normal}', the input color is transformed into escaped 24bit ansi control characters such as ^[[38;2;204;51;66m (called a SGR or Select Graphic Rendition code).

			#{clr.argument}color#{clr.normal} can be specified in the following forms:

			  Hexadecimal triplets: XXXXXX or XXX (leading # is optional)

			  RGB: rgb[red(0-255),green(0-255),blue(0-255)]

			  HSL: hsl[hue(0-360),saturation(0-100),lightness(0-100)]

			  HSV: hsv[hue(0-360),saturation(0-100),value(0-100)]

			  Named CSS colors: red, green, blanchedalmond... (see '--help named')

			  Special 'control' colors: default, #{clr.negative}inverse#{clr.positive}, #{clr.bold}bold#{clr.medium}... (see '--help special')

			By default, outputs escaped 24bit ansi control characters such as ^[[38;2;204;51;66m, unless using the --hex or --rgb switches.
		"""
		examples: [
			command: "#{clr.command}trucolor#{clr.normal} cc3342"
			description: "Outputs the control sequence ^[[38;2;204;51;66m, #{clr.example}setting the terminal color.#{clr.reset}"
		,
			command: "#{clr.command}trucolor#{clr.normal} --rgb hsl[354,75,80]"
			description: "Outputs #{clr.example}rgb(204, 51, 66)#{clr.normal}"
		,
			command: "#{clr.command}trucolor#{clr.normal} --hex salmon"
			description: "Outputs #{clr.salmon}fa8072#{clr.normal}"
		]
	process:
		usage: "Processing oisjf sdofs ofushdf osduhf sodufh sofu shdfosudhf sodufh sdofuhs dofsdh fosduhf soduf scdofu"
		examples: []
	named:
		usage: """
			Named Colors
		"""
		examples: []
	special:
		usage: """
			Special Colors
		"""
		examples: []


module.exports = (yargs_, helpPage_) ->

	addExamples = (examples_) ->
		if examples_?
			yargs_.example example_.command, example_.description for example_ in examples_

	page = switch helpPage_
		when 'process' then _pages.process
		else _pages.default

	addExamples page.examples

	renderer = consoleWrap
		left: 2
		right: -2
		mode: 'soft'
		outStream: process.stderr

	yargs_
		.usage page.usage
		.showHelp renderer
