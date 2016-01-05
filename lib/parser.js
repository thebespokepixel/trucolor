'use strict';

/*
 trucolor (v0.1.0) : 24bit color tools for the command line
 Command parser
 */
var _root, console, current_auto_name;

_root = require("../index");

console = global.vConsole;

current_auto_name = 1;

module.exports = function(tokens_) {
  var current_processor, results, token;
  current_processor = _root.newProcessor("color_" + (current_auto_name++));
  results = [];
  while (tokens_.length !== 0) {
    token = tokens_.shift();
    switch (token) {
      case 'background':
        results.push(current_processor.background());
        break;
      case 'bold':
        results.push(current_processor.bold());
        break;
      case 'faint':
        results.push(current_processor.faint());
        break;
      case 'italic':
        results.push(current_processor.italic());
        break;
      case 'invert':
        results.push(current_processor.invert());
        break;
      case 'underline':
        results.push(current_processor.underline());
        break;
      case 'blink':
        results.push(current_processor.blink());
        break;
      case 'saturate':
      case 'sat':
        results.push(current_processor.saturate({
          percent: tokens_.shift()
        }));
        break;
      case 'desaturate':
      case 'desat':
        results.push(current_processor.desaturate({
          percent: tokens_.shift()
        }));
        break;
      case 'light':
        results.push(current_processor.lighten({
          percent: 20
        }));
        break;
      case 'dark':
        results.push(current_processor.darken({
          percent: 20
        }));
        break;
      case 'lighten':
        results.push(current_processor.lighten({
          percent: tokens_.shift()
        }));
        break;
      case 'darken':
        results.push(current_processor.darken({
          percent: tokens_.shift()
        }));
        break;
      case 'spin':
        results.push(current_processor.spin({
          rotation: tokens_.shift()
        }));
        break;
      case 'mix':
        results.push(current_processor.mix({
          color: tokens_.shift()
        }));
        break;
      case 'multiply':
        results.push(current_processor.multiply({
          color: tokens_.shift()
        }));
        break;
      case 'screen':
        results.push(current_processor.screen({
          color: tokens_.shift()
        }));
        break;
      case 'overlay':
        results.push(current_processor.overlay({
          color: tokens_.shift()
        }));
        break;
      case 'softlight':
      case 'soft':
        results.push(current_processor.softlight({
          color: tokens_.shift()
        }));
        break;
      case 'hardlight':
      case 'hard':
        results.push(current_processor.hardlight({
          color: tokens_.shift()
        }));
        break;
      case 'difference':
      case 'diff':
        results.push(current_processor.difference({
          color: tokens_.shift()
        }));
        break;
      case 'exclusion':
      case 'excl':
        results.push(current_processor.exclusion({
          color: tokens_.shift()
        }));
        break;
      case 'average':
      case 'ave':
        results.push(current_processor.average({
          color: tokens_.shift()
        }));
        break;
      case 'negation':
      case 'not':
        results.push(current_processor.negation({
          color: tokens_.shift()
        }));
        break;
      case 'contrast':
        results.push(current_processor.contrast(commands[0] != null ? {
          color_dark: tokens_.shift()
        } : void 0, commands[0] != null ? {
          color_light: tokens_.shift()
        } : void 0, commands[0] != null ? {
          threshold: tokens_.shift()
        } : void 0));
        break;
      default:
        if (/^[A-Za-z0-9_-]+:$/.test(token)) {
          if (current_processor.hasSource()) {
            current_processor = _root.newProcessor("color_" + (current_auto_name++));
          }
          results.push(current_processor.lock(token.slice(0, -1)));
        } else {
          if (current_processor.hasSource()) {
            current_processor = _root.newProcessor("color_" + (current_auto_name++));
          }
          results.push(current_processor.setSource(_root.interpret(token)));
        }
    }
  }
  return results;
};
