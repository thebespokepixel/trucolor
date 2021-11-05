/**
 * Create a map of nestable functions, allowing color to be applied a-lá-chalk.
 * @param  {Object} palette A map of name/color definitions.
 * @return {function} The resultant name/function map.
 */
export function chalkish(palette: any): Function;
/**
 * Create a map of trucolor instances from a map of name/color values.
 * @param  {Object} options Options to pass to trucolor creation.
 * @param  {Object} palette A map of name/color definitions.
 * @return {Object} The resultant name/trucolor map.
 */
export function palette(options: any, palette: any): any;
declare function parser(color: any): Processor[];
export function render(processor: any, { colorFlags, format, force, }: {
    colorFlags?: {};
    format: any;
    force: any;
}): any;
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
export function simple(options: any): any;
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
export function trucolor(color: string, options?: any): any;
/**
 * Color retreival API. Will return different values if called with a cli or sgr context.
 */
export type trucolor = any;
declare class Processor {
    constructor(colorname: any);
    baseName: any;
    lockedName: boolean;
    attributes: {
        background: boolean;
        bold: boolean;
        dim: boolean;
        italic: boolean;
        invert: boolean;
        underline: boolean;
        blink: boolean;
    };
    haveAttrs: boolean;
    haveSource: boolean;
    queue: any[];
    haveQueue: boolean;
    namePrefix: string;
    nameSuffix: string;
    render(): any;
    set source(arg: any);
    get source(): any;
    interpreter: any;
    get hasSource(): boolean;
    get name(): string | true;
    get rgb(): any;
    lock(lockedName: any): void;
    get locked(): boolean;
    get input(): any;
    get human(): any;
    get hasAttrs(): boolean;
    set attrs(arg: {
        background: boolean;
        bold: boolean;
        dim: boolean;
        italic: boolean;
        invert: boolean;
        underline: boolean;
        blink: boolean;
    });
    get attrs(): {
        background: boolean;
        bold: boolean;
        dim: boolean;
        italic: boolean;
        invert: boolean;
        underline: boolean;
        blink: boolean;
    };
    addStep(step: any): void;
    background(): void;
    bold(): void;
    dim(): void;
    italic(): void;
    invert(): void;
    underline(): void;
    blink(): void;
    saturate(args: any): void;
    desaturate(args: any): void;
    darken(args: any): void;
    lighten(args: any): void;
    spin(args: any): void;
    mono(): void;
    mix(args: any): void;
}
export { parser as parse };
