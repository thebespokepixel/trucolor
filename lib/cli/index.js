'use strict';

/*
 trucolor (v0.0.23) : 24bit color tools for the command line
 Command line functionality
 */
var _root, argv, console, current_auto_name, current_processor, token, tokens, yargs;

_root = require("../..");

console = global.vConsole;

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
    describe: 'Output color as CSS RGB declaration, i.e. rgb(204, 51, 66)'
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

current_auto_name = 1;

current_processor = _root.newProcessor("color_" + (current_auto_name++));

tokens = argv._;

while (tokens.length !== 0) {
  token = tokens.shift();
  switch (token) {
    case 'background':
      current_processor.background();
      break;
    case 'bold':
      current_processor.bold();
      break;
    case 'faint':
      current_processor.faint();
      break;
    case 'italic':
      current_processor.italic();
      break;
    case 'invert':
      current_processor.invert();
      break;
    case 'underline':
      current_processor.underline();
      break;
    case 'blink':
      current_processor.blink();
      break;
    case 'saturate':
    case 'sat':
      current_processor.saturate({
        percent: tokens.shift()
      });
      break;
    case 'desaturate':
    case 'desat':
      current_processor.desaturate({
        percent: tokens.shift()
      });
      break;
    case 'light':
      current_processor.lighten({
        percent: 20
      });
      break;
    case 'dark':
      current_processor.darken({
        percent: 20
      });
      break;
    case 'lighten':
      current_processor.lighten({
        percent: tokens.shift()
      });
      break;
    case 'darken':
      current_processor.darken({
        percent: tokens.shift()
      });
      break;
    case 'spin':
      current_processor.spin({
        rotation: tokens.shift()
      });
      break;
    case 'mix':
      current_processor.mix({
        color: tokens.shift()
      });
      break;
    case 'multiply':
      current_processor.multiply({
        color: tokens.shift()
      });
      break;
    case 'screen':
      current_processor.screen({
        color: tokens.shift()
      });
      break;
    case 'overlay':
      current_processor.overlay({
        color: tokens.shift()
      });
      break;
    case 'softlight':
    case 'soft':
      current_processor.softlight({
        color: tokens.shift()
      });
      break;
    case 'hardlight':
    case 'hard':
      current_processor.hardlight({
        color: tokens.shift()
      });
      break;
    case 'difference':
    case 'diff':
      current_processor.difference({
        color: tokens.shift()
      });
      break;
    case 'exclusion':
    case 'excl':
      current_processor.exclusion({
        color: tokens.shift()
      });
      break;
    case 'average':
    case 'ave':
      current_processor.average({
        color: tokens.shift()
      });
      break;
    case 'negation':
    case 'neg':
      current_processor.negation({
        color: tokens.shift()
      });
      break;
    case 'contrast':
      current_processor.contrast(commands[0] != null ? {
        color_dark: tokens.shift()
      } : void 0, commands[0] != null ? {
        color_light: tokens.shift()
      } : void 0, commands[0] != null ? {
        threshold: tokens.shift()
      } : void 0);
      break;
    default:
      if (/^[A-Za-z0-9_-]+:$/.test(token)) {
        if (current_processor.hasSource()) {
          current_processor = _root.newProcessor("color_" + (current_auto_name++));
        }
        current_processor.lock(token.slice(0, -1));
      } else {
        if (current_processor.hasSource()) {
          current_processor = _root.newProcessor("color_" + (current_auto_name++));
        }
        current_processor.setSource(_root.interpret(token));
      }
  }
}

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
    default:
      return process.stdout.write("" + output_);
  }
});
