'use strict';

/*
 trucolor (v0.0.4-618) : 24bit color tools for the command line
 Command line functionality
 */
var argv, yargs, _color, _trucolor;

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
  process.exit(0);
}
