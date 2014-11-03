'use strict';

/*
 trucolor (v0.0.4-0)
 24bit color tools for the command line
 */
var argv, exec, yargs, _version;

_version = '0.0.4-0';

exec = require('child_process').exec;

yargs = require('yargs').usage('trucolor [OPTIONS] [FILE]').option('version', {
  alias: 'v',
  describe: 'Return the current version'
}).option('libs', {
  alias: 'l',
  describe: 'Specify additional function folders to include'
}).help('help').alias('help', 'h');

argv = yargs.argv;

(argv.version != null) && (function(v_) {
  console.info("trucolor v" + v_);
  return process.exit(1);
})(_version);
