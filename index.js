import _ from 'lodash';
import { tinycolor, TinyColor, names } from '@thebespokepixel/es-tinycolor';
import converter from 'color-convert';
import SGRcomposer from 'sgr-composer';
import terminal from 'term-ng';
import { readPackageSync } from 'read-pkg';
import escStringRE from 'escape-string-regexp';

class Processor {
	constructor(colorname) {
		this.baseName = colorname;
		this.lockedName = false;
		this.attributes = {
			background: false,
			bold: false,
			dim: false,
			italic: false,
			invert: false,
			underline: false,
			blink: false,
		};
		this.haveAttrs = false;
		this.haveSource = false;
		this.queue = [];
		this.haveQueue = false;
		this.namePrefix = '';
		this.nameSuffix = '';
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
		this.interpreter = interpreter;
		this.baseName = this.interpreter.name;
		this.haveSource = true;
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
		this.lockedName = lockedName;
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
			this.haveAttrs = true;
			this.attributes[attr] = true;
		}
	}
	addStep(step) {
		this.queue.push(step);
		this.haveQueue = true;
	}
	background() {
		this.attrs = 'background';
	}
	bold() {
		this.attrs = 'bold';
	}
	dim() {
		this.attrs = 'dim';
	}
	italic() {
		this.attrs = 'italic';
	}
	invert() {
		this.attrs = 'invert';
	}
	underline() {
		this.attrs = 'underline';
	}
	blink() {
		this.attrs = 'blink';
	}
	saturate(args) {
		this.addStep(color => color.saturate(args.percent));
		this.namePrefix = `sat-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`;
	}
	desaturate(args) {
		this.addStep(color => color.desaturate(args.percent));
		this.namePrefix = `des-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`;
	}
	darken(args) {
		this.addStep(color => color.darken(args.percent));
		this.namePrefix = `dark-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`;
	}
	lighten(args) {
		this.addStep(color => color.lighten(args.percent));
		this.namePrefix = `light-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`;
	}
	spin(args) {
		this.addStep(color => color.spin(-args.rotation));
		this.namePrefix = `spin-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}-${Math.abs(args.rotation)}`;
	}
	mono() {
		this.addStep(color => color.greyscale());
		this.namePrefix = `mono-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}}`;
	}
	mix(args) {
		this.addStep(color => TinyColor.mix(color, args.color, 50));
		this.namePrefix = `mix-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}-${args.color}`;
	}
}
function processor(name) {
	return new Processor(name)
}

class Interpreter {
	constructor(raw) {
		this.source = (raw_ => {
			switch (true) {
				case /^[\da-f]{3}$/i.test(raw_):
					return {
						input: /^([\da-f])([\da-f])([\da-f])$/i.exec(raw_),
						human: raw_,
						space: 'HEX',
					}
				case /^#[\da-f]{3}$/i.test(raw_):
					return {
						input: /^#([\da-f])([\da-f])([\da-f])$/i.exec(raw_),
						human: raw_,
						space: '#HEX',
					}
				case /^[\da-f]{4}$/i.test(raw_):
					return {
						input: /^([\da-f])([\da-f])([\da-f])[\da-f]$/i.exec(raw_),
						human: raw_,
						space: 'HEX',
					}
				case /^#[\da-f]{4}$/i.test(raw_):
					return {
						input: /^#([\da-f])([\da-f])([\da-f])[\da-f]$/i.exec(raw_),
						human: raw_,
						space: '#HEX',
					}
				case /^[\da-f]{6}$/i.test(raw_):
					return {
						input: raw_,
						human: raw_,
						space: 'HEXHEX',
					}
				case /^#[\da-f]{6}$/i.test(raw_):
					return {
						input: raw_,
						human: raw_,
						space: '#HEXHEX',
					}
				case /^[\da-f]{8}$/i.test(raw_):
					return {
						input: raw_.slice(0, 6),
						human: raw_.slice(0, 6),
						space: 'HEXHEX',
					}
				case /^#[\da-f]{8}$/i.test(raw_):
					return {
						input: raw_.slice(0, 7),
						human: raw_.slice(0, 7),
						space: '#HEXHEX',
					}
				case /^rgb[(:]+(?:\s?\d+,){2}\s?\d+\s?\)*$/.test(raw_):
					return {
						input: raw_.replace(/rgb[(:]/, '').replace(/[ )]/g, '').split(','),
						human: raw_.replace(/rgb[(:]/, 'rgb-').replace(/,/g, '-').replace(/[ )]/g, ''),
						space: 'RGB',
					}
				case /^hsl:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hsl:/, '').split(','),
						human: raw_.replace('hsl:', 'hsl-').replace(/,/g, '-'),
						space: 'HSL',
					}
				case /^hsv:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hsv:/, '').split(','),
						human: raw_.replace('hsv:', 'hsv-').replace(/,/g, '-'),
						space: 'HSV',
					}
				case /^hsb:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hsb:/, '').split(','),
						human: raw_.replace('hsb:', 'hsb-').replace(/,/g, '-'),
						space: 'HSV',
					}
				case /^hwb:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hwb:/, '').split(','),
						human: raw_.replace('hwb:', 'hwb-').replace(/,/g, '-'),
						space: 'HWB',
					}
				case (raw_ in {
					normal: 'normal',
					reset: 'reset',
				}):
					return {
						input: raw_,
						human: raw_,
						space: 'SGR',
					}
				case (raw_ in names):
					return {
						input: raw_,
						human: raw_,
						space: 'named',
					}
				default:
					throw new Error(`Unrecognised color space: ${raw_}`)
			}
		})(raw);
		const source = (source => {
			switch (source.space) {
				case 'HEX':
				case '#HEX':
					const [input, r, g, b] = source.input;
					return {
						name: `${r}${r}${g}${g}${b}${b}`,
						rgb: converter.hex.rgb(`${r}${r}${g}${g}${b}${b}`),
						input,
					}
				case 'HEXHEX':
				case '#HEXHEX':
					return {
						name: source.input,
						rgb: converter.hex.rgb(this.name),
					}
				case 'RGB':
					return {
						name: converter.rgb.hex(source.input),
						rgb: converter.hex.rgb(this.name),
					}
				case 'HSL':
					return {
						name: converter.hsl.hex(source.input),
						rgb: converter.hsl.rgb(source.input),
					}
				case 'HSV':
					return {
						name: converter.hsv.hex(source.input),
						rgb: converter.hsv.rgb(source.input),
					}
				case 'HWB':
					return {
						name: converter.hwb.hex(source.input),
						rgb: converter.hwb.rgb(source.input),
					}
				case 'SGR':
					return {
						name: source.input,
						rgb: source.input,
					}
				case 'named':
					return {
						name: converter.keyword.hex(source.input),
						rgb: converter.keyword.rgb(source.input),
					}
				default:
					throw new Error(`Unrecognised color space: ${source.space}`)
			}
		})(this.source);
		if (source.input) {
			this.source.input = source.input;
		}
		this.baseName = source.name;
		this.baseColor = source.space === 'SGR' ? source.name : tinycolor(source.rgb ? `rgb(${source.rgb})` : source.name);
	}
	get name() {
		return this.baseName
	}
	set name(n) {
		this.baseName = n;
	}
	get rgb() {
		return this.baseColor
	}
	set rgb(rgb) {
		this.baseColor = tinycolor(rgb);
	}
	get input() {
		return this.source.input
	}
	get human() {
		return this.source.human
	}
	get space() {
		return this.source.space
	}
	toString() {
		return converter.rgb.hex(this.baseColor)
	}
}
function interpreter(raw) {
	return new Interpreter(raw)
}

let currentAutoName = 1;
function parser(color) {
	const queue = [];
	let processor$1 = processor(`color_${currentAutoName++}`);
	const refreshProcessor = processor_ => {
		if (processor_.hasSource) {
			queue.push(processor_);
			return processor(`color_${currentAutoName++}`)
		}
		return processor_
	};
	const tokens = color.split(' ');
	while (tokens.length > 0) {
		const token = tokens.shift();
		switch (token) {
			case 'background':
				processor$1.background();
				break
			case 'bold':
				processor$1.bold();
				break
			case 'faint':
				processor$1.dim();
				break
			case 'dim':
				processor$1.dim();
				break
			case 'italic':
				processor$1.italic();
				break
			case 'invert':
				processor$1.invert();
				break
			case 'underline':
				processor$1.underline();
				break
			case 'blink':
				processor$1.blink();
				break
			case 'saturate':
			case 'sat':
				processor$1.saturate({
					percent: tokens.shift(),
				});
				break
			case 'desaturate':
			case 'desat':
				processor$1.desaturate({
					percent: tokens.shift(),
				});
				break
			case 'light':
				processor$1.lighten({
					percent: 20,
				});
				break
			case 'dark':
				processor$1.darken({
					percent: 20,
				});
				break
			case 'lighten':
				processor$1.lighten({
					percent: tokens.shift(),
				});
				break
			case 'darken':
				processor$1.darken({
					percent: tokens.shift(),
				});
				break
			case 'spin':
				processor$1.spin({
					rotation: tokens.shift(),
				});
				break
			case 'mono':
				processor$1.mono();
				break
			case 'mix':
				processor$1.mix({
					color: tokens.shift(),
				});
				break
			default:
				if (/^[\w-]+:$/.test(token)) {
					processor$1 = refreshProcessor(processor$1);
					processor$1.lock(token.trim().replace(':', ''));
				} else {
					processor$1 = refreshProcessor(processor$1);
					processor$1.source = interpreter(token);
				}
		}
	}
	queue.push(processor$1);
	return queue
}

const pkg = readPackageSync();
const colorLevel = terminal.color.level || 0;
function render(processor, {
	type = 'default',
	format,
	force,
}) {
	const color = processor.render();
	const isReset = ['normal', 'reset'].includes(processor.name);
	const sgrComposer = new SGRcomposer(
		force || colorLevel,
		Object.assign(processor.attrs, processor.hasSource ? {
			color: isReset ? processor.name : color.toRgbArray(),
		} : {}),
	);
	const fieldSelect = () => isReset || !processor.hasSource ? processor.name : false;
	const stringSelect = () => isReset || !processor.hasSource ? '' : false;
	const swatch = () => {
		if (colorLevel > 0) {
			const sgr = sgrComposer.sgr(['bold', 'italic', 'underline', 'invert']);
			return `${sgr.in}\u2588\u2588${sgr.out}`
		}
		return '$\u2588\u2588'
	};
	const colorOptions = (type => {
		switch (type) {
			case undefined:
				return {}
			case 'default':
				return pkg.config.cli[pkg.config.cli.selected]
			default:
				return pkg.config.cli[type]
		}
	})(type);
	switch (format) {
		case 'cli':
			return {
				name: processor.human,
				hex: fieldSelect() || color.toHex(),
				rgb: fieldSelect() || color.toRgbString(),
				toString: () => stringSelect() || `${_.remove(
					_.map(processor.attrs, (active, attr) => active === true ? colorOptions[attr] : false),
				).join(' ')}${processor.hasAttrs ? ' ' : ''}${
					colorOptions.color === 'hex'
						? `${color.toHex()}`
						: `${color.toRgbArray().join(' ')}`
				}`,
				toSwatch: () => swatch(),
				...sgrComposer.sgr(),
			}
		case 'sgr':
			return {
				name: processor.human,
				hex: fieldSelect() || color.toHex(),
				rgb: fieldSelect() || color.toRgbString(),
				toString: () => stringSelect() || sgrComposer.sgr().in,
				toSwatch: () => swatch(),
				...sgrComposer.sgr(),
			}
		default:
			return {
				name: processor.human,
				hex: fieldSelect() || color.toHex(),
				rgb: fieldSelect() || color.toRgbString(),
				toString: () => fieldSelect() || color.toHex(),
				toSwatch: () => swatch(),
				...sgrComposer.sgr(),
			}
	}
}

class Chalkish {
	constructor(styles) {
		const styleFactory = (collection => {
			for (const key of Object.keys(styles)) {
				styles[key].closeRE = new RegExp(escStringRE(styles[key].out), 'g');
				collection[key] = {
					get: () => makePainter.call([...this._styles, ...key]),
				};
			}
			return collection
		})({});
		const proto = Object.defineProperties(() => {}, styleFactory);
		function applyPaint(content) {
			let i = this._styles.length;
			while (i--) {
				const sgrPair = styles[this._styles[i]];
				content = sgrPair.in + content.replace(sgrPair.closeRE, sgrPair.in) + sgrPair.out;
			}
			return content
		}
		function makePainter(styles) {
			const painter = (...args) => applyPaint.apply(painter, args);
			painter._styles = styles;
			painter.__proto__ = proto;
			return painter
		}
		Object.defineProperties(Chalkish.prototype, (collection => {
			for (const name of Object.keys(styles)) {
				collection[name] = {
					get: () => makePainter.call(this, [name]),
				};
			}
			return collection
		})({}));
	}
}
function chalk(palette) {
	return new Chalkish(palette)
}

const palette$1 = {
	white: '#BBB',
	black: '#111',
	red: '#B00',
	green: '#0B0',
	blue: '#44B',
	cyan: '#0BB',
	yellow: '#BB0',
	magenta: '#B0B',
	brightWhite: '#FFF',
	brightRed: '#F33',
	brightGreen: '#3F3',
	brightBlue: '#44F',
	brightCyan: '#3FF',
	brightYellow: '#FF3',
	brightMagenta: '#F3F',
	dim: 'dim',
	bold: 'bold',
	italic: 'italic',
	invert: 'invert',
	example: '#CC99FF',
	command: '#31A0FF',
	argument: '#7DC3FF',
	option: '#C1BA89',
	operator: '#FFFFFF',
	grey: '#808080',
	title: 'bold #80C480',
	normal: 'normal',
	reset: 'reset',
};

/**
 * Color retreival API. Will return different values if called with a cli or sgr context.
 * @name Trucolor
 * @typedef {Trucolor}
 * @property {string} name       - Human readable color name.
 * @property {string} in         - Opening SGR code
 * @property {string} out        - Closing SGR code
 * @property {string} hex        - #RRGGBB Hexadecimal color value (or SGR reset name)
 * @property {string} rgb        - 'rgb(red, green, blue)' CSS format (or SGR reset name)
 * @property {function} toString - Returns a Hex code, SGR in code or CLI
 *                                 arguments with formatting flags, depending on
 *                                 format.
 * @property {function} toSwatch - Returns a graphic swatch of the color.
 */
/**
 * Create an SGR-aware color from a loose text definition.
 * @param  {string} color   A color definition.
 * @param  {Object} options Options.
 * @property {string} options.format Output collection format. [ default | sgr | cli ]
 * @property {string} options.force Force a colour depth [ (4|color}, (8|256), (24|16m) ]
 * @return {Trucolor} A Trucolor instance.
 */
function trucolor(color, options = {}) {
	const queue = parser(color);
	if (queue.length > 1) {
		return queue.map(color => render(color, options))
	}
	return render(queue[0], options)
}
/**
 * Create a map of trucolor instances from a map of name/color values.
 * @param  {Object} options Options to pass to trucolor creation.
 * @param  {Object} palette A map of name/color definitions.
 * @return {Object} The resultant name/trucolor map.
 */
function palette(options, palette) {
	return _.mapValues(palette, color => trucolor(color, options))
}
/**
 * Create a map of nestable functions, allowing color to be applied a-lá-chalk.
 * @param  {Object} palette A map of name/color definitions.
 * @return {function} The resultant name/function map.
 */
function chalkish(palette) {
	return chalk(palette)
}
/**
 * Create a simple, sharable palette
 * @param  {Object} options Options to pass to trucolor creation.
 * @return {Object} The resultant name/trucolor map.
 * @example
 * {
 *   white: '#BBB',
 *   black: '#111',
 *   red: '#B00',
 *   green: '#0B0',
 *   blue: '#44B',
 *   cyan: '#0BB',
 *   yellow: '#BB0',
 *   magenta: '#B0B',
 *   brightWhite: '#FFF',
 *   brightRed: '#F33',
 *   brightGreen: '#3F3',
 *   brightBlue: '#44F',
 *   brightCyan: '#3FF',
 *   brightYellow: '#FF3',
 *   brightMagenta: '#F3F',
 *   dim: 'dim',
 *   bold: 'bold',
 *   italic: 'italic',
 *   invert: 'invert',
 *   example: '#CC99FF',
 *   command: '#31A0FF',
 *   argument: '#7DC3FF',
 *   option: '#C1BA89',
 *   operator: '#FFFFFF',
 *   grey: '#808080',
 *   title: 'bold #80C480',
 *   normal: 'normal',
 *   reset: 'reset'
 * }
 */
function simple(options) {
	return palette(options, palette$1)
}

export { chalkish, palette, parser as parse, render, simple, trucolor };
