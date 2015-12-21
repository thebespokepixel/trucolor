'use strict';

/*
 trucolor (v0.0.20) : 24bit color tools for the command line
 Command line functionality
 */
var _trucolor, argv, commands, console, current_auto_name, current_processor, nextElement, yargs;

yargs = require('yargs').strict().options({
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
  x: {
    alias: 'hex',
    boolean: true,
    describe: 'Output color as hex RGB triplet, i.e. cc3342'
  },
  r: {
    alias: 'rgb',
    boolean: true,
    describe: 'Output color as CSS RGB declaration, i.e. rgb(204, 51, 66)'
  }
}).showHelpOnFail(false, "Use 'trucolor --help' for user manual");

argv = yargs.argv;

_trucolor = (function() {
  switch (false) {
    case !argv.hex:
      return require("../..").HEXout();
    case !argv.rgb:
      return require("../..").RGBout();
    default:
      return require("../..").SGRout();
  }
})();

console = global.vconsole;

if (argv.version) {
  process.stdout.write(_trucolor.getVersion(argv.version));
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

current_processor = _trucolor.addProcessor("color_" + (current_auto_name++));

commands = argv._;

while (commands.length !== 0) {
  nextElement = commands.shift().toString();
  switch (nextElement) {
    case 'background':
      current_processor.background;
      break;
    case 'bold':
      current_processor.bold;
      break;
    case 'faint':
      current_processor.faint;
      break;
    case 'standout':
      current_processor.standout;
      break;
    case 'inverse':
      current_processor.inverse;
      break;
    case 'saturate':
    case 'sat':
      current_processor.saturate({
        percent: commands.shift()
      });
      break;
    case 'desaturate':
    case 'desat':
      current_processor.desaturate({
        percent: commands.shift()
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
        percent: commands.shift()
      });
      break;
    case 'darken':
      current_processor.darken({
        percent: commands.shift()
      });
      break;
    case 'spin':
      current_processor.spin({
        rotation: commands.shift()
      });
      break;
    case 'mix':
      current_processor.mix({
        color: commands.shift()
      });
      break;
    case 'multiply':
      current_processor.multiply({
        color: commands.shift()
      });
      break;
    case 'screen':
      current_processor.screen({
        color: commands.shift()
      });
      break;
    case 'overlay':
      current_processor.overlay({
        color: commands.shift()
      });
      break;
    case 'softlight':
    case 'soft':
      current_processor.softlight({
        color: commands.shift()
      });
      break;
    case 'hardlight':
    case 'hard':
      current_processor.hardlight({
        color: commands.shift()
      });
      break;
    case 'difference':
    case 'diff':
      current_processor.difference({
        color: commands.shift()
      });
      break;
    case 'exclusion':
    case 'excl':
      current_processor.exclusion({
        color: commands.shift()
      });
      break;
    case 'average':
    case 'ave':
      current_processor.average({
        color: commands.shift()
      });
      break;
    case 'negation':
    case 'neg':
      current_processor.negation({
        color: commands.shift()
      });
      break;
    case 'contrast':
      current_processor.contrast(commands[0] != null ? {
        color_dark: commands.shift()
      } : void 0, commands[0] != null ? {
        color_light: commands.shift()
      } : void 0, commands[0] != null ? {
        threshold: commands.shift()
      } : void 0);
      break;
    default:
      if (nextElement.match(/^[A-Za-z0-9_-]+:$/)) {
        if (current_processor.haveColor) {
          current_processor = _trucolor.addProcessor(nextElement);
        }
        current_processor.setName(nextElement.slice(0, -1));
      } else if (nextElement.match(/^@\w+$/)) {
        if (current_processor.haveColor) {
          current_processor = _trucolor.addProcessor(nextElement);
        }
        if (!_trucolor.hasVar(nextElement)) {
          _trucolor.trackVar(nextElement);
          current_processor.setVar(nextElement);
        } else {
          current_processor.setColor(_trucolor.addColor(nextElement));
        }
      } else {
        if (current_processor.haveColor) {
          current_processor = _trucolor.addProcessor("color_" + (current_auto_name++));
        }
        current_processor.setColor(_trucolor.addColor(nextElement));
      }
  }
}

_trucolor.runBatch(function(output_) {
  console.log('');
  console.log("Output:");
  return console.pretty(output_, {
    depth: 2
  });
});
