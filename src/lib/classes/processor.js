/* ─────────╮
 │ trucolor │ Color process object
 ╰──────────┴────────────────────────────────────────────────────────────────── */

import _ from 'lodash'
import {tinycolor, TinyColor} from '@thebespokepixel/es-tinycolor'

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
			blink: false,
		}
		this.haveAttrs = false
		this.haveSource = false
		this.queue = []
		this.haveQueue = false
		this.namePrefix = ''
		this.nameSuffix = ''
	}

	render() {
		return this.haveSource ? _.reduce(this.queue,
			(color, step) => step(color),
			tinycolor(this.rgb),
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
	}

	bold() {
		this.attrs = 'bold'
	}

	dim() {
		this.attrs = 'dim'
	}

	italic() {
		this.attrs = 'italic'
	}

	invert() {
		this.attrs = 'invert'
	}

	underline() {
		this.attrs = 'underline'
	}

	blink() {
		this.attrs = 'blink'
	}

	saturate(args) {
		this.addStep(color => color.saturate(args.percent))
		this.namePrefix = `sat-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`
	}

	desaturate(args) {
		this.addStep(color => color.desaturate(args.percent))
		this.namePrefix = `des-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`
	}

	darken(args) {
		this.addStep(color => color.darken(args.percent))
		this.namePrefix = `dark-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`
	}

	lighten(args) {
		this.addStep(color => color.lighten(args.percent))
		this.namePrefix = `light-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`
	}

	spin(args) {
		this.addStep(color => color.spin(-args.rotation))
		this.namePrefix = `spin-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${Math.abs(args.rotation)}`
	}

	mono() {
		this.addStep(color => color.greyscale())
		this.namePrefix = `mono-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}}`
	}

	mix(args) {
		this.addStep(color => TinyColor.mix(color, args.color, 50))
		this.namePrefix = `mix-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.color}`
	}
}

export default function processor(name) {
	return new Processor(name)
}
