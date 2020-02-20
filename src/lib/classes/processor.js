/* ─────────╮
 │ trucolor │ Color process object
 ╰──────────┴────────────────────────────────────────────────────────────────── */

import _ from 'lodash'
import {tinycolor, TinyColor} from '@thebespokepixel/es-tinycolor'
import {console} from '../..'

class Processor {
	constructor(colorname) {
		this.baseName = colorname
		this.lockedName = false
		this.attributes = {
			background: false,
			bold: false,
			dim: false,
			italic: false,
			invert: false,
			underline: false,
			blink: false
		}
		this.haveAttrs = false
		this.haveSource = false
		this.queue = []
		this.haveQueue = false
		this.namePrefix = ''
		this.nameSuffix = ''
		console.debug(`New Process: ${this.baseName}`)
	}

	render() {
		return this.haveSource ? _.reduce(this.queue,
			(color, step) => step(color),
			tinycolor(this.rgb)
		) : 'none'
	}

	get source() {
		return this.interpreter
	}

	set source(interpreter) {
		this.interpreter = interpreter
		this.baseName = this.interpreter.name
		this.haveSource = true
	}

	get hasSource() {
		return Boolean(this.haveSource)
	}

	get name() {
		return this.lockedName ? this.lockedName : `${this.namePrefix}${this.baseName}${this.nameSuffix}`
	}

	get rgb() {
		return this.haveSource && this.interpreter.rgb
	}

	lock(lockedName) {
		console.debug(`Process name locked: ${lockedName}`)
		this.lockedName = lockedName
	}

	get locked() {
		return Boolean(this.lockedName)
	}

	get input() {
		return this.haveSource ? this.interpreter.input : this.name
	}

	get human() {
		if (this.haveSource) {
			return this.locked ? this.lockedName : this.interpreter.human
		}

		return this.locked ? this.lockedName : this.name
	}

	get hasAttrs() {
		return Boolean(this.haveAttrs)
	}

	get attrs() {
		return this.attributes
	}

	set attrs(attr) {
		if (['background', 'bold', 'dim', 'italic', 'invert', 'underline', 'blink'].includes(attr)) {
			this.haveAttrs = true
			this.attributes[attr] = true
		}
	}

	addStep(step) {
		this.queue.push(step)
		this.haveQueue = true
	}

	background() {
		this.attrs = 'background'
		console.debug('Special::background')
	}

	bold() {
		this.attrs = 'bold'
		console.debug('Special::bold')
	}

	dim() {
		this.attrs = 'dim'
		console.debug('Special::dim')
	}

	italic() {
		this.attrs = 'italic'
		console.debug('Special::italic')
	}

	invert() {
		this.attrs = 'invert'
		console.debug('Special::invert')
	}

	underline() {
		this.attrs = 'underline'
		console.debug('Special::underline')
	}

	blink() {
		this.attrs = 'blink'
		console.debug('Special::blink')
	}

	saturate(args) {
		this.addStep(color => color.saturate(args.percent))
		this.namePrefix = `sat-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`
		console.debug('Process::saturate', args.percent)
	}

	desaturate(args) {
		this.addStep(color => color.desaturate(args.percent))
		this.namePrefix = `des-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`
		console.debug('Process::desaturate', args.percent)
	}

	darken(args) {
		this.addStep(color => color.darken(args.percent))
		this.namePrefix = `dark-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`
		console.debug('Process::darken', args.percent)
	}

	lighten(args) {
		this.addStep(color => color.lighten(args.percent))
		this.namePrefix = `light-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`
		console.debug('Process::lighten', args.percent)
	}

	spin(args) {
		this.addStep(color => color.spin(-args.rotation))
		this.namePrefix = `spin-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${Math.abs(args.rotation)}`
		console.debug('Process::spin', args.rotation)
	}

	mono() {
		this.addStep(color => color.greyscale())
		this.namePrefix = `mono-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}}`
		console.debug('Process::mono')
	}

	mix(args) {
		this.addStep(color => TinyColor.mix(color, args.color, 50))
		this.namePrefix = `mix-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.color}`
		console.debug('Process::mix', args.color)
	}
}

export default function processor(name) {
	return new Processor(name)
}
