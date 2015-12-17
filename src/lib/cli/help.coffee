'use strict'
###
 trucolor (v0.0.18-alpha.47) : 24bit color tools for the command line
 Command line help
###

_trucolor = require ('../..').RGBout()
_truwrap = require 'truwrap'
console = global.vconsole

if colorSupport.has16m
	clr =
		example        : '\x1b[38;2;178;98;255m'
		command        : '\x1b[38;2;65;135;215m'
		argument       : '\x1b[38;2;0;175;255m'
		option         : '\x1b[38;2;175;175;45m'
		operator       : '\x1b[38;2;255;255;255m'
		salmon         : '\x1b[38;2;250;128;114m'
		red            : '\x1b[38;2;255;128;128m'
		green          : '\x1b[38;2;128;255;128m'
		blue           : '\x1b[38;2;128;128;255m'
		blanchedalmond : '\x1b[38;2;255;225;200m'
		grey           : '\x1b[38;2;100;100;100m'
		darkbg         : '\x1b[48;2;40;40;40m'
		dark           : '\x1b[38;2;40;40;40m'
		bright         : '\x1b[38;2;255;255;255m'
		negative       : '\x1b[7m'
		positive       : '\x1b[27m'
		bold           : '\x1b[1m'
		medium         : '\x1b[22m'
		cc             : '\x1b[38;2;128;196;126m'
		normal         : '\x1b[30m\x1b[m\x1b[38;2;240;240;240m',

	spectrum = (width_, char_) -> (for col in [0..width_-1]
		scalar_s = Math.cos((col / width_) * (Math.PI/2))
		scalar_c = Math.sin((col / width_) * (Math.PI))
		red = if scalar_s > 0 then scalar_s else 0
		green = if scalar_c > 0 then scalar_c else 0
		blue = if scalar_s > 0 then (1 - scalar_s) else 0
		"\x1b[38;2;#{Math.floor(red * 255)};#{Math.floor(green * 255)};#{Math.floor(blue * 255)}m#{char_}").join('') + "#{clr.normal}\n"

	header =
		bar: ->
			[  " R━┳━╸╶────*╭──╮╶╴╷"
			 "\t G ┃ ┏━┓╻ ╻*│╶╴╭─╮│╭─╮╭─╮"
			 "\t B ╹ ╹╶~┗━┛*╰──╰─╯╵╰─╯╵   "
				].join "\n"
				 .replace /\*/g, clr.bright
				 .replace /R/g,  clr.red
				 .replace /G/g,  clr.green
				 .replace /B/g,  clr.blue
				 .replace /╶/g,  clr.dark + '╶'
				 .replace /╴/g,  '╴' + clr.bright
				 .replace /~/g,  '╴' + clr.blue
		info: "24bit Color Toolkit #{clr.grey}v#{_trucolor.getVersion()}\n"
else
	clr =
		example        : '\x1b[38;5;93m'
		command        : '\x1b[38;5;68m'
		argument       : '\x1b[38;5;39m'
		option         : '\x1b[38;5;142m'
		operator       : '\x1b[38;5;231m'
		salmon         : '\x1b[91m'
		red            : '\x1b[31m'
		green          : '\x1b[32m'
		blue           : '\x1b[34m'
		blanchedalmond : '\x1b[91m'
		grey           : '\x1b[38;5;247m'
		darkbg         : '\x1b[48;5;235m'
		dark           : '\x1b[38;5;235m'
		bright         : '\x1b[97m'
		negative       : '\x1b[7m'
		positive       : '\x1b[27m'
		bold           : '\x1b[1m'
		medium         : '\x1b[22m'
		cc             : '\x1b[38;5;114m'
		normal         : '\x1b[30m\x1b[m'

	spectrum = -> "\n#{clr.salmon}!!! This tool is for 24 bit colour aware terminals only !!!#{clr.normal}\n"

	header =
		bar: -> "\n#{clr.bright}trucolor - "
		info: "24bit Color Toolkit #{clr.grey}v#{_trucolor.getVersion()}#{clr.normal}\n"

if colorSupport.has16m and _iTerm
	img =
		space : "\t"
		cc    : new _truwrap.Image
			name   : 'logo'
			file   : __dirname + '/../../media/CCLogo.png'
			height : 3
else
	img =
		space : ""
		cc    :
			render: ->
				""

synopsis =
	"""
		Synopsis:

			#{clr.command}trucolor #{clr.option}[OPTIONS]#{clr.normal} #{clr.argument}color#{clr.normal} #{clr.option}[processing steps…]#{clr.normal}

			#{clr.command}trucolor #{clr.option}[OPTIONS] #{clr.example}--batch#{clr.normal} #{clr.option}[name_1:|@varname] #{clr.argument}color#{clr.normal} #{clr.option}[processing steps…] #{clr.grey}[name_2: color [processing steps...]] ...#{clr.normal}
	"""

_pages =
	default:
		usage:
			"""

				#{synopsis}

				Usage:
				In it's simplest form, '#{clr.command}trucolor#{clr.normal} #{clr.argument}color#{clr.normal}', the argument color description is transformed into escaped 24bit CSI codes. It also allows the use of color transforms (using LESS) as well as automatic 'palletisation' for when you want to pass 24 bit colors into a program that doesn't support the RGB CSI codes.

				The motivation behind this is to allow much more sophisticated graphic visualisation using in modern, xterm-compatible terminal emulators that have added support over the past couple of years.

				#{clr.argument}color#{clr.normal} can be specified in the following forms:

					Hexadecimal triplets: #{clr.bright}[#]XXXXXX#{clr.normal} or #{clr.bright}[#]XXX#{clr.normal} (leading # is optional)

					RGB: #{clr.bright}rgb#{clr.normal},#{clr.red}red#{clr.normal}(0-255),#{clr.green}green#{clr.normal}(0-255),#{clr.blue}blue#{clr.normal}(0-255)

					HSL: #{clr.bright}hsl#{clr.normal},hue(0-360),saturation(0-100),lightness(0-100)

					HSV: #{clr.bright}hsv#{clr.normal},hue(0-360),saturation(0-100),value(0-100)

					Named CSS colors: #{clr.red}red#{clr.normal}, #{clr.green}green#{clr.normal}, #{clr.blanchedalmond}blanchedalmond#{clr.normal}... (see '--help named')

					Special 'control' colors: default, #{clr.negative}inverse#{clr.positive}, #{clr.bold}bold#{clr.medium}... (see '--help special')

				By default, outputs escaped 24bit ansi control characters such as ^[[38;2;204;51;66m, unless using the --hex or --rgb switches.


			"""

		examples: (width_) ->
			content: [
				Margin: " "
				Command: "Examples:"
			,
				Command: "#{clr.command}trucolor#{clr.normal} cc3342"
				Result: "returns ^[[38;2;204;51;66m, #{clr.example}setting the terminal color.#{clr.normal}"
			,
				Command: "#{clr.command}trucolor#{clr.normal} --rgb hsl[354,75,80]"
				Result: "returns #{clr.example}rgb(204, 51, 66)#{clr.normal}"
			,
				Command: "#{clr.command}trucolor#{clr.normal} --hex salmon"
				Result: "returns #{clr.salmon}fa8072#{clr.normal}"
			]
			layout:
				showHeaders: false
				config:
					Margin:
						minWidth: 1
						maxWidth: 2
					Command:
						minWidth: 30
						maxWidth: 80
					Result:
						maxWidth: width_-34

	process:
		usage:
			"""
			#{synopsis}

			Processing oisjf sdofs ofushdf osduhf sodufh sofu shdfosudhf sodufh sdofuhs dofsdh fosduhf soduf scdofu


			"""

	named:
		usage: """
			Named Colors:

		"""

		examples: (width_) ->
			lessColors = require("../../node_modules/less/lib/less/data/colors")
			colors = for name_, color_ of lessColors
				name: name_
				color: color_

			columns = Math.floor width_ / 32
			colwidth = Math.floor width_ / columns

			grid =
				margin:
					minWidth: 2
			for c in [0..columns]
				grid["name_#{c}"] =
					minWidth: 16
				grid["color_#{c}"] =
					minWidth: 9
			table = []
			while colors.length
				cell =
					margin: ' '
				for c in [0..columns]
					cellsrc = colors.shift()
					cellsrc ?=
						name: ''
						color: ''
					cell["name_#{c}"] = cellsrc.name
					sgr = (_trucolor.setColor cellsrc.color).toSGR()
					cell["color_#{c}"] = "\x1b[38;2;65;135;215m#{cellsrc.color}#{clr.normal}"
				table.push cell
			content: table
			layout:
				showHeaders: false
				config: grid


	special:
		usage: """
			Special Colors
		"""

	epilogue:
		"""
			#{clr.cc}#{ _trucolor.getName() }#{clr.normal} is an open source component of CryptoComposite\'s toolset.
			#{clr.cc}© 2015 CryptoComposite. #{clr.grey}Released under the MIT License.#{clr.normal}

"""


# Actually output a page...
module.exports = (yargs_, helpPage_) ->
	container = _truwrap
		mode: 'container'
		outStream: process.stderr

	windowWidth = container.getWidth()

	renderer = _truwrap
		left: 2
		right: -2
		mode: 'soft'
		outStream: process.stderr

	contentWidth = renderer.getWidth()

	page = switch helpPage_
		when 'named' then _pages.named
		when 'special' then _pages.special
		when 'process' then _pages.process
		else _pages.default

	yargs_.usage ' '
	# yargs_.example ex.command, ex.description for ex in page.example
	yargs_.epilogue _pages.epilogue
	yargs_.wrap(contentWidth)

	container.write img.cc.render
		nobreak: false
		align: 2
	container.write header.bar() + header.info
	container.write spectrum windowWidth, "━"
	renderer.write page.usage
	renderer.clear()
	container.write renderer.panel page.examples contentWidth

	renderer.write yargs_.help()
	renderer.break()
