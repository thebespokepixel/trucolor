'use strict'
###
 trucolor (v0.1.6) : 24bit color tools for the command line
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
		spectrum = -> "\n#{clr.red}  Your terminal currently doesn't support 24 bit color."

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
				#{clr.title}Synopsis:#{clr.titleOut}
				#{clr.command}trucolor #{clr.option}[options] #{clr.argument}[name]: [operation...] color \
				[operation...] [[name]: [operation...] color]...#{clr.option}
			"""
			epilogue: """
				#{clr.title}#{ trucolor.getName() }#{clr.titleOut} is an open source component of CryptoComposite\'s toolset.
				#{clr.title}© 2015 CryptoComposite.#{clr.titleOut} #{clr.grey}Released under the MIT License.
				#{clr.grey}Documentation/Issues/Contributions @ http://github.com/MarkGriffiths/trucolor#{clr.normal}
			"""
		default:
			usage: """
			#{clr.title}Usage:#{clr.titleOut}
			#{clr.normal}In it's simplest form, '#{clr.command}trucolor#{clr.normal} #{clr.argument}color#{clr.normal}', will take any of the color expressions listed below and transform it into a simple hexadecimal triplet string, i.e #{clr.argument}'AA00BB'#{clr.normal}, ideal for passing into the 'set_color' built-in in fish-shell, or providing the basis of further color processing.

			It can return a wide range of color assignment and manipulation functions, based internally on color-convert and less. See the examples below.

			When outputting SGR codes, colors will be shifted to the availalble 256 or ansi color palette if 24 bit color is unavailable or will be omitted in a monochromatic terminal to make usage across environments safe. The CLI command respects #{clr.option}--color=16m#{clr.normal}, #{clr.option}--color=256#{clr.normal}, #{clr.option}--color#{clr.normal} and #{clr.option}--no-color#{clr.normal} flags. It does not affect value based output, such as the default or #{clr.option}--rgb#{clr.normal} output, it only effects the #{clr.option}--in#{clr.normal}, #{clr.option}--out#{clr.normal}, #{clr.option}--message#{clr.normal} and #{clr.option}--swatch#{clr.normal} outputs.

			The motivation for this is to allow more sophisticated graphic visualisation using in modern, xterm-compatible terminal emulators that have added 24 bit support.

			The #{clr.argument}color#{clr.normal} can be defined in any the following formats:

				CSS Hexadecimal (#{clr.red}Red #{clr.green}Green #{clr.blue}Blue#{clr.normal}) #{clr.argument}[#]RRGGBB#{clr.normal} or #{clr.argument}[#]RGB#{clr.normal} where R, G and B are '0'-'F'.

				RGB (#{clr.red}Red #{clr.green}Green #{clr.blue}Blue#{clr.normal}) #{clr.argument}rgb:R,G,B#{clr.normal} or #{clr.argument}rgb(R,G,B)#{clr.normal} where R,G and B are 0-255.
				Spaces can be incuded but require quoting/escaping on the CLI. i.e '#{clr.argument}rgb(R, G, B)#{clr.normal}'

				HSL (#{clr.red}H#{clr.green}u#{clr.blue}e#{clr.dark} Sat#{clr.msat}ura#{clr.red}tion #{clr.dark}Lig#{clr.mlight}htn#{clr.bright}ess#{clr.normal}) #{clr.argument}hsl:H,S,L#{clr.normal} where H is 0-360, S 0-100 and L 0-100

				HSV (#{clr.red}H#{clr.green}u#{clr.blue}e#{clr.dark} Sat#{clr.msat}ura#{clr.red}tion #{clr.dark}V#{clr.mlight}alu#{clr.bright}e#{clr.normal}) #{clr.argument}hsl:H,S,V#{clr.normal} where H is 0-360, S 0-100 and V 0-100

				HSB (#{clr.red}H#{clr.green}u#{clr.blue}e#{clr.dark} Sat#{clr.msat}ura#{clr.red}tion #{clr.dark}Bri#{clr.mlight}ght#{clr.bright}ness#{clr.normal}) #{clr.argument}hsb:H,S,B#{clr.normal} where H is 0-360, S 0-100 and B 0-100
				(actually just an alias for HSV)

				HWB: (#{clr.red}H#{clr.green}u#{clr.blue}e#{clr.bright} White#{clr.dark} Black#{clr.normal}) #{clr.argument}hwb:H,W,B#{clr.normal} where H is 0-360, W 0-100 and B 0-100

				CSS named colors: #{clr.red}Red, #{clr.green}green, #{clr.hotpink}hotpink, #{clr.chocolate}chocolate#{clr.normal}... (see '#{clr.option}--help named#{clr.normal}')

				Special 'control' colors: 'reset', 'normal', #{clr.ul}underline#{clr.ulOut}, #{clr.invert}invert#{clr.invertOut}, #{clr.bold}bold#{clr.boldOut}... (see '#{clr.option}--help special#{clr.normal}')

			A number of color #{clr.argument}operations#{clr.normal} can be specified, either before or after the base color declaration.

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
					Command: "#{clr.command}trucolor #{clr.argument}purple#{clr.normal}"
					Result: "→ 800080"
				,
					Command: "#{clr.command}trucolor #{clr.option}-m label #{clr.argument}purple#{clr.normal}"
					Result: "→ a colored, isolated message, #{clr.purple}label#{clr.normal}."
				,
					Command: "#{clr.command}trucolor #{clr.option}--in #{clr.argument}purple#{clr.normal}"
					Result: "→ ^[[38;2;128;0;128m #{clr.purple}setting the terminal color."
				,
					Command: "#{clr.command}trucolor#{clr.option} --rgb #{clr.argument}purple#{clr.normal}"
					Result: "→ rgb(128, 0, 128)"
				,
					Command: "#{clr.command}trucolor#{clr.option} --swatch #{clr.argument}purple#{clr.normal}"
					Result: "→ #{clr.purple}\u2588\u2588#{clr.normal}"
				,
					Command: "#{clr.command}trucolor#{clr.option} --swatch
							  #{clr.argument}purple desaturate 70#{clr.normal}"
					Result: "→ #{clr.purpleSwatch}\u2588\u2588#{clr.normal}"
				,
					Command: "#{clr.command}trucolor #{clr.argument}hsb:45,100,100#{clr.normal}"
					Result: "→ FFBF00"
				,
					Command: "#{clr.command}trucolor #{clr.option}-m label #{clr.argument}hsb:45,100,100#{clr.normal}"
					Result: "→ a colored, isolated message, #{clr.orange}label#{clr.normal}."
				,
					Command: "#{clr.command}trucolor #{clr.option}--in #{clr.argument}hsb:45,100,100#{clr.normal}"
					Result: "→ ^[[38;2;255;191;0m #{clr.orange}setting the terminal color."
				,
					Command: "#{clr.command}trucolor#{clr.option} --rgb #{clr.argument}hsb:45,100,100#{clr.normal}"
					Result: "→ rgb(255, 191, 0)"
				,
					Command: "#{clr.command}trucolor#{clr.option} --swatch #{clr.argument}hsb:45,100,100#{clr.normal}"
					Result: "→ #{clr.orange}\u2588\u2588#{clr.normal}"
				,
					Command: "#{clr.command}trucolor#{clr.option} --swatch
							  #{clr.argument}hsb:45,100,100 desaturate 70#{clr.normal}"
					Result: "→ #{clr.orangeSwatch}\u2588\u2588#{clr.normal}"
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

			more: """
			#{clr.title}Multiple Inputs:#{clr.normal}
			#{clr.command}trucolor#{clr.normal} will output a list of color values if more than one base color is specified, allowing color assignment in a single block allowing easy ingest using '#{clr.command}read#{clr.normal}'. Each color will be output on it's own line, and named according to the input base color. The names can be overridden by providing a 'name:' before the base color.

				> #{clr.command}trucolor #{clr.argument}red yellow green purple#{clr.normal}
				red FF0000
				yellow FFFF00
				green 008000
				purple 800080

				> #{clr.command}trucolor #{clr.argument}Po: red LaaLaa: yellow Dipsy: green TinkyWinky: purple#{clr.normal}
				Po FF0000
				LaaLaa FFFF00
				Dipsy 008000
				TinkyWinky 800080

				> #{clr.command}trucolor #{clr.argument}hsl:120,100,50 bob: orange spin 180#{clr.normal}
				hsl-120-100-50 00FF00
				bob 005AFF

			#{clr.title}Note:#{clr.normal} #{clr.option}--message#{clr.normal}, #{clr.option}--swatch#{clr.normal}, #{clr.option}--in#{clr.normal}, #{clr.option}--out#{clr.normal} and #{clr.option}--rgb#{clr.normal} currently only output the first color specified.
			"""
		named:
			usage: """
				#{clr.title}Named Colors:#{clr.normal}
				All standard CSS names are accepted.
			"""
			examples: (width_) ->
				nameArray = require("../palettes/named")
				colors = {}
				colors[name_] = name_ for name_ in nameArray
				trucolor.bulk colors, {type: 'swatch'}, (named_) ->
					columns = Math.floor width_ / 28
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
			more: """
				#{clr.title}Custom Names:#{clr.titleOut}
				Any color definition can be prefixed with a 'name:' and the result will be cached with that name, allowing it to be recalled by the same name later.

					> #{clr.command}trucolor #{clr.argument}bob: black lighten 50 saturate 50 spin 180#{clr.normal}
					40BFBF

					> #{clr.command}trucolor #{clr.option}--rgb #{clr.argument}bob:#{clr.normal}
					rgb(64, 191, 191)

					> #{clr.command}trucolor #{clr.option}--swatch #{clr.argument}bob:#{clr.normal}
					#{clr.bob}\u2588\u2588#{clr.normal}
			"""
		special:
			usage: """
				#{clr.title}Special Formatters:#{clr.titleOut}
				The following keywords modify the meaning or destination of the color, or provide enhanced foramtting. They only work when used with the command switches that actually output SGR codes, namely: #{clr.option}--message#{clr.normal}, #{clr.option}--swatch#{clr.normal}, #{clr.option}--in#{clr.normal} and #{clr.option}--out#{clr.normal}. When used with the default command or with the #{clr.option}--rgb#{clr.normal} switch, they have no effect and the value of the base color (plus any processing) will be output.

				#{clr.argument}background#{clr.normal}: Set the background color, rather than the foreground.

				#{clr.argument}normal#{clr.normal}: Set the color to the default foreground and background.
				#{clr.argument}reset#{clr.normal}: Sets colors and special formatting back to the default.

				#{clr.argument}bold#{clr.normal}: Set the font to bold.
				#{clr.argument}italic#{clr.normal}: Set the font to italic.
				#{clr.argument}underline#{clr.normal}: Set underline.
				#{clr.argument}faint#{clr.normal}: Set the colour to 50% opacity.
				#{clr.argument}invert#{clr.normal}: Invert the foreground and background.
				#{clr.argument}blink#{clr.normal}: Annoying as a note in Comic Sans, attached to a dancing, purple dinosaur with a talking paperclip.

				All of the above formatters need the correct code to end the range, either provided by using the #{clr.option}--out#{clr.normal} switch, using the 'reset' keyword, or simply use the #{clr.option}--message#{clr.normal} option to automatically set the end range SGR code. Using 'normal' alone won't fully clear the formatting.
			"""

			examples: (width_) ->
				content: [
					Margin: " "
					Command: "#{clr.title}Examples:#{clr.titleOut}"
				,
					Command: "#{clr.command}trucolor #{clr.option}-m 'Bold yellow text' #{clr.argument}bold yellow#{clr.normal}"
					Result: "→ #{clr.exBold}Bold yellow text#{clr.exBoldOut}"
				,
					Command: "#{clr.command}trucolor #{clr.option}-m 'Faint yellow text' #{clr.argument}faint yellow#{clr.normal}"
					Result: "→ #{clr.exFaint}Faint yellow text#{clr.exFaintOut}"
				,
					Command: "#{clr.command}trucolor#{clr.option} --swatch #{clr.argument}faint yellow#{clr.normal}"
					Result: "→ #{clr.exFaint}\u2588\u2588#{clr.exFaintOut}"
				,
					Command: "#{clr.command}trucolor #{clr.option}-m 'Italics' #{clr.argument}italic #33FF33#{clr.normal}"
					Result: "→ #{clr.exItalic}Italics#{clr.exItalicOut}"
				,
					Command: "#{clr.command}trucolor #{clr.option}-m ' -Inverted- ' #{clr.argument}invert #7B00B1#{clr.normal}"
					Result: "→ #{clr.exInvert} -Inverted- #{clr.exInvertOut}"
				,
					Command: "#{clr.command}trucolor #{clr.option}-m ' Background ' #{clr.argument}background dark red#{clr.normal}"
					Result: "→ #{clr.exBackground} Background #{clr.normal}"
				,
					Command: "#{clr.command}trucolor #{clr.option}-m 'Underlined' #{clr.argument}underline #fff#{clr.normal}"
					Result: "→ #{clr.exUnderline}Inverted#{clr.exUnderlineOut}"
				,
					Command: "#{clr.command}trucolor #{clr.option}-m 'Flashy Thing' #{clr.argument}blink orange#{clr.normal}"
					Result: "→ #{clr.exBlink}Flashy Thing#{clr.exBlinkOut}"
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
			more: """
				#{clr.title}Note:#{clr.titleOut}
				Obviously all this depends on your terminals support for the extended formatting. The latest iTerm2 builds and X's XTerm have full support for everything #{clr.command}trucolor#{clr.normal} can do, and anything that supports a terminal type of 'xterm-256color' will cover a fairly complete subset.

				For example, Apple's Terminal.app doesn't have 24 bit color support nor does it have support for italics, but everything else works well.
			"""
	return pages

outputPage = (yargs_, pages_, helpPage_) ->
	container = truwrap
		mode: 'container'
		outStream: process.stderr

	windowWidth = container.getWidth()

	rightMargin = 116 - windowWidth if windowWidth > 120
	rightMargin ?= -2

	renderer = truwrap
		left: 2
		right: rightMargin
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
	container.write pages_.shared.spectrum contentWidth + 4, "━"
	renderer.break(2)
	renderer.write pages_.shared.synopsis
	renderer.write yargs_.help()
	renderer.break()
	renderer.write page.usage
	renderer.break(2)
	container.write renderer.panel page.examples contentWidth
	renderer.break(2)
	renderer.write page.more
	renderer.break(2)
	renderer.write pages_.shared.epilogue
	renderer.break()

module.exports = (yargs_, helpPage_) ->
	trucolor.simplePalette (basic) ->
		trucolor.bulk
			purple        : 'purple'
			purpleSwatch  : 'purple desaturate 70'
			orange        : 'hsb:45,100,100'
			orangeSwatch  : 'hsb:45,100,100 desaturate 70'
			red           : 'red lighten 10'
			green         : 'green lighten 10'
			blue          : 'blue lighten 20'
			hotpink       : 'hotpink'
			chocolate     : 'chocolate'
			dark          : 'red desaturate 100'
			msat          : 'red desaturate 60'
			mlight        : 'rgb(255,255,255) darken 25'
			bright        : 'rgb(255,255,255)'
			bob           : 'black lighten 50 saturate 50 spin 180'
			ul            : 'underline'
			invert        : 'invert'
			bold          : 'bold'
			exBackground  : 'background dark red'
			exBold        : 'bold yellow'
			exFaint       : 'faint yellow'
			exItalic      : 'italic #33FF33'
			exInvert      : 'invert #7B00B1'
			exUnderline   : 'underline #fff'
			exBlink       : 'blink orange',
			{}, (clr)->
				outputPage yargs_, setupPage(deepAssign clr, basic), helpPage_
