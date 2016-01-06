'use strict';

/*
 trucolor (v0.1.8-beta.0) : 24bit color tools for the command line
 Command line functionality
 */
var _parser, _root, argv, console, yargs;

_root = require("../../index");

console = global.vConsole;

_parser = require('../parser');

yargs = require('yargs').options({
  h: {
    alias: 'help',
    describe: 'Display this help.'
  },
  v: {
    alias: 'version',
    count: true,
    describe: 'Return the current version. -vv Return name & version.'
  },
  V: {
    alias: 'verbose',
    count: true,
    describe: 'Be verbose. -VV Be loquacious.'
  },
  m: {
    alias: 'message',
    nargs: 1,
    describe: 'Format message with SGR codes'
  },
  i: {
    alias: 'in',
    boolean: true,
    describe: 'Output SGR color escape code.'
  },
  o: {
    alias: 'out',
    boolean: true,
    describe: 'Output cancelling SGR color escape code.'
  },
  r: {
    alias: 'rgb',
    boolean: true,
    describe: 'Output color as rgb(r, g, b)'
  },
  s: {
    alias: 'swatch',
    boolean: true,
    describe: 'Output an isolated color swatch.'
  }
}).showHelpOnFail(false, "Use 'trucolor --help' for user manual");

argv = yargs.argv;

if (argv.version) {
  process.stdout.write(_root.getVersion(argv.version));
  process.exit(0);
}

if (argv.verbose) {
  switch (argv.verbose) {
    case 1:
      console.verbosity(4);
      console.log(':Verbose mode:');
      break;
    case 2:
      console.verbosity(5);
      console.log(':Extra-Verbose mode:');
      console.yargs(argv);
  }
}

if (argv.help) {
  require('./help')(yargs, argv.help);
  process.exit(0);
}

if (argv._.length === 0) {
  console.error('At least one color must be specified.');
  process.exit(1);
}

_parser(argv._);

_root.route(function(output_) {
  if (console.canWrite(4)) {
    console.pretty(output_, {
      depth: 2
    });
  }
  switch (false) {
    case !argv.message:
      return process.stdout.write("" + (output_.SGRin()) + argv.message + (output_.SGRout()));
    case !argv["in"]:
      return process.stdout.write("" + (output_.SGRin()));
    case !argv.out:
      return process.stdout.write("" + (output_.SGRout()));
    case !argv.rgb:
      return process.stdout.write("" + (output_.toString()));
    case !argv.swatch:
      return process.stdout.write("" + (output_.swatch()));
    default:
      return process.stdout.write("" + output_);
  }
});
