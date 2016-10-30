/* ─────────────╮
 │ trucolor CLI │
 ╰──────────────┴────────────────────────────────────────────────────────────── */
import terminalFeatures from 'term-ng'
import {stripIndent} from 'common-tags'
import {truwrap, createImage} from 'truwrap'
import {clr, colorReplacer} from '../lib/colour'
import {trucolor, metadata} from '..'

const images = (function () {
	if (terminalFeatures.images) {
		return {
			space: '\t',
			cc: createImage({
				name: 'logo',
				file: `${__dirname}/../media/CCLogo.png`,
				height: 3
			})
		}
	}
	return {
		space: '',
		cc: {
			render: () => ''
		}
	}
})()

/**
 * Render help when asked for.
 * @param  {yargs} yargs - yargs object defined in cli
 * @return {undefined} Writes help to stdout.
 */
export default function help(yargs) {
	const header = () => stripIndent(colorReplacer)`
		${`title|${metadata.name}`}
		${images.space}${metadata.description}
		${images.space}${`grey|${metadata.version(3)}`}
	`
	const synopsis = stripIndent(colorReplacer)`
		${'title|Synopsis:'}
		${'command|cat'} ${'argument|inputFile'} ${'operator:|'} ${`command|${metadata.bin}`} ${'option|[options]'}
	`
	const usage = stripIndent(colorReplacer)`
		${'title|Usage:'}
		Reads unformatted text from stdin and typographically applies paragraph wrapping it for the currently active tty.
	`
	const epilogue = stripIndent(colorReplacer)`
		${`title|${metadata.name}`} is an open source component of CryptoComposite’s toolset.
		${`title|${metadata.copyright}`}. ${`grey|Released under the ${metadata.license} License.`}
		${`grey|Issues?: ${metadata.bugs}`}
	`

	const container = truwrap({
		mode: 'container',
		outStream: process.stderr
	})
	const windowWidth = container.getWidth()

	const renderer = truwrap({
		left: 2,
		right: 0,
		outStream: process.stderr
	})
	const contentWidth = renderer.getWidth()
	yargs.wrap(contentWidth)

	container.break()
	container.write(images.cc.render({
		nobreak: false,
		align: 2
	}))
	container.write(header()).break()
	container.write(`${clr.dark}${'–'.repeat(windowWidth)}${clr.dark.out}`).break()
	renderer.write(synopsis).break(2)
	renderer.write(yargs.getUsageInstance().help()).break()
	renderer.write(usage).break(2)
	container.write(`${clr.dark}${'–'.repeat(windowWidth)}${clr.dark.out}`)
	renderer.write(epilogue).end()
}
