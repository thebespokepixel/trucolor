'use strict'
###
 trucolor (v0.1.0) : 24bit color tools for the command line
 Command line help
###

console = global.vConsole
trucolor = require('../../index')
truwrap = require 'truwrap'
deepAssign = require 'deep-assign'
converter = require 'color-convert'
terminalFeatures = require '@thebespokepixel/term-ng'

setupPage = (clr) ->
	spcr = '\t' if terminalFeatures.images
	spcr ?= ''
	if terminalFeatures.color.has16m
		spectrum = (width_, char_) -> (
			for col in [0..width_-1]
				scos =  Math.cos((col / width_) * (Math.PI/2))
				ssin =  Math.sin((col / width_) * (Math.PI))
				red =   if scos > 0 then Math.floor(scos * 255) else 0
				green = if ssin > 0 then Math.floor(ssin * 255) else 0
				blue =  if scos > 0 then Math.floor((1 - scos) * 255) else 0
				"\x1b[38;2;#{red};#{green};#{blue}m#{char_}").join('')

		header = ->
				[        " #{clr.red  }━┳━╸     #{clr.bright}╭──╮  ╷"
				  "#{spcr} #{clr.green} ┃ ┏━┓╻ ╻#{clr.bright}│  ╭─╮│╭─╮╭─╮ #{clr.normal}#{trucolor.getDescription()}"
				  "#{spcr} #{clr.blue } ╹ ╹  ┗━┛#{clr.bright}╰──╰─╯╵╰─╯╵   #{clr.grey}#{trucolor.getVersion(3)}"
				].join "\n"
	else
		header = ->
				[
					"#{clr.bright}#{trucolor.getName()}#{clr.normal}"
					"#{spcr}#{trucolor.getDescription()}"
					"#{spcr}#{clr.grey}#{trucolor.getVersion(3)}#{clr.normal}"
				].join "\n"
		spectrum = -> "\n#{clr.red}Your terminal currently doesn't support 24 bit color."

	if terminalFeatures.images
		img =
			space : "\t"
			cc    : new truwrap.Image
				name   : 'logo'
				file   : __dirname + '/../../media/CCLogo.png'
				height : 3
	else
		img =
			space : ""
			cc    : render: -> ""
	pages =
		shared:
			header: header
			spectrum: spectrum
			images: img
			synopsis: """
				#{clr.title}Synopsis:#{clr.normal}
				#{clr.command}trucolor #{clr.option}[options] #{clr.argument}[name]: [operation...] color \
				[operation...] [[name]: [operation...] color]...#{clr.option}
			"""
			epilogue: """
				#{clr.title}#{ trucolor.getName() }#{clr.normal} is an open source component of CryptoComposite\'s toolset.
				#{clr.title}© 2015 CryptoComposite. #{clr.grey}Released under the MIT License.
				#{clr.grey}Documentation/Issues/Contributions @ http://github.com/MarkGriffiths/trucolor#{clr.normal}
			"""
		default:
			usage: """
			#{clr.title}Usage:
			#{clr.normal}In it's simplest form, '#{clr.command}trucolor#{clr.normal} #{clr.argument}color#{clr.normal}', will take any of the color expressions listed below and transform it into a simple hexadecimal triplet string, i.e 'AA00BB', ideal for passing into the 'set_color' built-in in fish-shell, or providing the basis of further color processing.

			It can return a wide range of color assignment and manipulation functions, based internally on color-convert and less. See the examples below.

			All colors will fall back to simpler palettes if used in 256 or 16 color, or even monochromatic terminals.

			The motivation behind this is to allow much more sophisticated graphic visualisation using in modern, xterm-compatible terminal emulators that have added support over the past few years.

			The #{clr.argument}color#{clr.normal} can be specified in the following forms:

				CSS Hexadecimal (#{clr.red}Red #{clr.green}Green #{clr.blue}Blue#{clr.normal}) #{clr.argument}[#]RRGGBB#{clr.normal} or #{clr.argument}[#]RGB#{clr.normal} where R, G and B are '0'-'F'.

				RGB (#{clr.red}Red #{clr.green}Green #{clr.blue}Blue#{clr.normal}) #{clr.argument}rgb:R,G,B#{clr.normal} or #{clr.argument}rgb(R,G,B)#{clr.normal} where R,G and B are 0-255.

				HSL (#{clr.red}H#{clr.green}u#{clr.blue}e#{clr.dark} Sat#{clr.msat}ura#{clr.red}tion #{clr.dark}Lig#{clr.mlight}htn#{clr.bright}ess#{clr.normal}) #{clr.argument}hsl:H,S,L#{clr.normal} or #{clr.argument}hsl(H,S,L)#{clr.normal} where H is 0-360, S 0-100 and L 0-100

				HSV (#{clr.red}H#{clr.green}u#{clr.blue}e#{clr.dark} Sat#{clr.msat}ura#{clr.red}tion #{clr.dark}V#{clr.mlight}alu#{clr.bright}e#{clr.normal}) #{clr.argument}hsl:H,S,V#{clr.normal} or #{clr.argument}hsl(H,S,V)#{clr.normal} where H is 0-360, S 0-100 and V 0-100

				HWB: (#{clr.red}H#{clr.green}u#{clr.blue}e#{clr.bright} White#{clr.dark} Black#{clr.normal}) #{clr.argument}hwb:H,W,B#{clr.normal} or #{clr.argument}hwb(H,W,B)#{clr.normal} where H is 0-360, W 0-100 and B 0-100

				CSS name colors: #{clr.red}Red, #{clr.green}green, #{clr.hotpink}hotpink, #{clr.chocolate}chocolate#{clr.normal}... (see '--help named')

				Special 'control' colors: 'reset', 'normal', #{clr.ul}underline#{clr.ulOut}, #{clr.invert}invert#{clr.invertOut}, #{clr.bold}bold#{clr.boldOut}... (see '--help special')

			A large number of color #{clr.argument}operations#{clr.normal} can be specified, either before or after the base color declaration.

				[#{clr.argument}(light | dark)#{clr.normal}] preset 20% darken/lighten.
				[#{clr.argument}(saturate | sat | desaturate | desat | lighten | darken#{clr.normal}) \
				#{clr.argument}percent#{clr.normal}] basic operations.
				[#{clr.argument}spin degrees#{clr.normal}] hue shift.
				[#{clr.argument}(mix | multiply | screen) color#{clr.normal}] \
				mix with (named | rgb() | #hex) color.
				[#{clr.argument}(overlay | softlight | soft | hardlight | hard) color#{clr.normal}] \
				light with color.
				[#{clr.argument}(difference | diff | exclusion | excl) color#{clr.normal}] \
				subtract color.
				[#{clr.argument}(average | ave | negation | not) color#{clr.normal}] \
				blend with color.
				[#{clr.argument}contrast dark [light] [threshold]#{clr.normal}] \
				calculate contrasting color.

				See http://lesscss.org/functions/#color-operations for more details.
			"""

			examples: (width_) ->
				content: [
					Margin: " "
					Command: "#{clr.title}Examples:"
				,
					Command: "#{clr.command}trucolor #{clr.option}-m label #{clr.argument}33cc42#{clr.normal}"
					Result: "returns a colored, isolated message, #{clr.example1}label#{clr.normal}."
				,
					Command: "#{clr.command}trucolor #{clr.option}--in #{clr.argument}crimson#{clr.normal}"
					Result: "returns ^[[38;2;200;20;60m, #{clr.example2}setting the terminal color."
				,
					Command: "#{clr.command}trucolor#{clr.option} --rgb #{clr.argument}hsl:354,75,80#{clr.normal}"
					Result: "returns rgb(242, 166, 173)"
				,
					Command: "#{clr.command}trucolor #{clr.argument}purple#{clr.normal}"
					Result: "returns 800080"
				,
					Command: "#{clr.command}trucolor#{clr.option} --swatch #{clr.argument}purple#{clr.normal}"
					Result: "returns #{clr.purple}\u2588\u2588#{clr.normal}"
				,
					Command: "#{clr.command}trucolor#{clr.option} --swatch
							  #{clr.argument}purple desaturate 70#{clr.normal}"
					Result: "returns #{clr.purpleSwatch}\u2588\u2588#{clr.normal}"
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

		named:
			usage: "#{clr.title}Named Colors:#{clr.normal}"

			examples: (width_) ->
				nameArray = require("../palettes/named")
				colors = {}
				colors[name_] = name_ for name_ in nameArray
				trucolor.bulk colors, {type: 'swatch'}, (named_) ->
					columns = Math.floor width_ / 24
					colwidth = Math.floor width_ / columns

					grid =
						margin:
							minWidth: 2

					for c in [0..columns]
						grid["color_#{c}"] =
							minWidth: 2
						grid["name_#{c}"] =
							minWidth: 16

					table = []
					while nameArray.length
						cell =
							margin: ' '
						for c in [0..columns]
							src = do nameArray.shift
							if not src? == ''
								cell["color_#{c}"] = ''
								cell["name_#{c}"] = ''
							else
								cell["color_#{c}"] = named_[src]
								cell["name_#{c}"] = src
						table.push cell

					content: table
					layout:
						showHeaders: false
						config: grid
		special:
			usage: """
				Special Colors
			"""
	return pages

outputPage = (yargs_, pages_, helpPage_) ->
	container = truwrap
		mode: 'container'
		outStream: process.stderr

	windowWidth = container.getWidth()

	renderer = truwrap
		left: 2
		right: -2
		mode: 'soft'
		outStream: process.stderr

	contentWidth = renderer.getWidth()

	page = switch helpPage_
		when 'named' then pages_.named
		when 'special' then pages_.special
		else pages_.default

	yargs_.usage ' '
	yargs_.wrap(contentWidth)

	container.write '\n'
	container.write pages_.shared.images.cc.render
		nobreak: false
		align: 2
	container.write pages_.shared.header()
	renderer.break()
	container.write pages_.shared.spectrum windowWidth, "━"
	renderer.break(2)
	renderer.write pages_.shared.synopsis
	renderer.write yargs_.help()
	renderer.break()
	renderer.write page.usage
	renderer.break(2)
	container.write renderer.panel page.examples contentWidth
	renderer.break(2)
	renderer.write pages_.shared.epilogue
	renderer.break()

module.exports = (yargs_, helpPage_) ->
	trucolor.simplePalette (basic) ->
		trucolor.bulk
			purple        : 'purple'
			purpleSwatch  : 'purple desaturate 70'
			red           : 'red lighten 10'
			green         : 'green lighten 10'
			blue          : 'blue lighten 20'
			hotpink       : 'hotpink'
			chocolate     : 'chocolate'
			off           : '100'
			dark          : 'red desaturate 100'
			msat          : 'red desaturate 50'
			mlight        : 'rgb(255,255,255) darken 25'
			bright        : 'rgb(255,255,255)'
			example1      : '33cc42'
			example2      : 'crimson'
			ul            : 'underline'
			invert        : 'invert'
			bold          : 'bold',
			{}, (clr)->
				outputPage yargs_, setupPage(deepAssign clr, basic), helpPage_
