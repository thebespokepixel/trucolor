'use strict';

/*
 trucolor (v0.0.6-47) : 24bit color tools for the command line
 Command line functionality
 */
var _color, _trucolor, argv, commands, current_auto_name, current_process, nextElement, yargs;

_trucolor = require("../trucolor");

_color = require("../color");

yargs = require('yargs').strict().options({
  help: {
    alias: 'h',
    describe: 'Display this help.'
  },
  version: {
    alias: 'v',
    count: true,
    describe: 'Return a long version decription.'
  },
  verbose: {
    alias: 'V',
    boolean: true,
    describe: 'Be verbose. Useful for debugging, not great for actual use.\n'
  },
  hex: {
    alias: 'x',
    boolean: true,
    describe: 'Output color as hex RGB triplet, i.e. cc3342'
  },
  rgb: {
    alias: 'r',
    boolean: true,
    describe: 'Output color as CSS RGB declaration, i.e. rgb(204, 51, 66)'
  }
}).showHelpOnFail(false, "Use 'trucolor --help' for user manual");

argv = yargs.argv;

if (argv.version) {
  console.log(_trucolor.getVersion(argv.version > 1));
  process.exit(0);
}

if (argv.verbose) {
  console.log('Verbose mode:');
  console.dir(argv._);
  global.verbose = true;
}

if (argv.help) {
  require('./help')(yargs, argv.help);
  process.exit(0);
}

if (argv._.length === 0) {
  console.error('At least one color must be specified.');
  process.exit(1);
}

current_auto_name = 1;

current_process = new _process('color_' + current_auto_name++);

commands = argv._;

while (commands) {
  nextElement = commands.shift();
  if (commands.length === 0) {
    commands = null;
  }
  switch (nextElement) {
    case 'saturate':
    case 'sat':
      current_process.add.saturate({
        percent: commands.shift()
      });
      break;
    case 'desaturate':
    case 'desat':
      current_process.add.desaturate({
        percent: commands.shift()
      });
      break;
    case 'light':
      current_process.add.lighten({
        percent: 20
      });
      break;
    case 'dark':
      current_process.add.darken({
        percent: 20
      });
      break;
    case 'lighten':
      current_process.add.lighten({
        percent: commands.shift()
      });
      break;
    case 'darken':
      current_process.add.darken({
        percent: commands.shift()
      });
      break;
    case 'spin':
      current_process.add.spin({
        rotation: commands.shift()
      });
      break;
    case 'mix':
      current_process.add.mix({
        color: commands.shift()
      });
      break;
    case 'multiply':
      current_process.add.multiply({
        color: commands.shift()
      });
      break;
    case 'screen':
      current_process.add.screen({
        color: commands.shift()
      });
      break;
    case 'overlay':
      current_process.add.overlay({
        color: commands.shift()
      });
      break;
    case 'softlight':
    case 'soft':
      current_process.add.softlight({
        color: commands.shift()
      });
      break;
    case 'hardlight':
    case 'hard':
      current_process.add.hardlight({
        color: commands.shift()
      });
      break;
    case 'difference':
    case 'diff':
      current_process.add.difference({
        color: commands.shift()
      });
      break;
    case 'exclusion':
    case 'excl':
      current_process.add.exclusion({
        color: commands.shift()
      });
      break;
    case 'average':
    case 'ave':
      current_process.add.average({
        color: commands.shift()
      });
      break;
    case 'negation':
    case 'neg':
      current_process.add.negation({
        color: commands.shift()
      });
      break;
    case 'contrast':
      current_process.add.contrast({
        color_dark: commands.shift(),
        color_light: commands.shift(),
        threshold: commands.shift()
      });
      break;
    default:
      if (nextElement.match(/^\w+:$/)) {
        if (current_process.haveColor) {
          _batch.push(current_process);
          current_process = new _process(nextElement);
        }
        current_process.setName(nextElement);
      } else if (nextElement.match(/^@\w+$/)) {
        if (current_process.haveColor) {
          _batch.push(current_process);
          current_process = new _process(nextElement);
        }
        current_process.setVar(nextElement);
      } else {
        if (current_process.haveColor) {
          _batch.push(current_process);
          current_process = new _process('color_' + current_auto_name++);
        }
        current_process.setColor(new _color(nextElement));
      }
  }
}
