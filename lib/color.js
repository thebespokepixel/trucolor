'use strict';

/*
 trucolor (v0.0.4-618) 24bit color tools for the command line
 Color Parser
 */
var Color, _, _named_colors;

_ = require("lodash");

_named_colors = require("../node_modules/less/lib/less/data/colors");

Color = (function() {
  Color.prototype._type = false;

  function Color(raw) {
    this._type = (function() {
      switch (false) {
        case !raw.match(/^#[0-9a-fA-F]{6}$/):
          return '#xxxxxx';
        case !raw.match(/^#[0-9a-fA-F]{3}$/):
          return '#xxx';
        case !raw.match(/^[0-9a-fA-F]{6}$/):
          return 'xxxxxx';
        case !raw.match(/^[0-9a-fA-F]{3}$/):
          return 'xxx';
        case !raw.match(/^rgb,\s?\d+,\s?\d+,\s?\d+$/):
          return 'rgb';
        case !raw.match(/^hsl,\s?\d+,\s?\d+,\s?\d+$/):
          return 'hsl';
        case !raw.match(/^hsv,\s?\d+,\s?\d+,\s?\d+$/):
          return 'hsv';
        case !_.has(_named_colors, raw):
          return (function() {
            return 'named';
          })();
      }
    })();
    if (this._type) {
      this._base_color = raw;
      console.log('Color', this._base_color, 'type', this._type);
    } else {
      throw "Unrecognised color: " + raw;
    }
  }

  return Color;

})();

module.exports = Color;
