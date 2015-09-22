# trucolor v0.0.9-alpha.63<br>![Project status](http://img.shields.io/badge/status-alpha-red.svg?style=flat) [![Build Status](http://img.shields.io/travis/MarkGriffiths/trucolor.svg?style=flat)](https://travis-ci.org/MarkGriffiths/trucolor) [![Dependency Status](http://img.shields.io/david/MarkGriffiths/trucolor.svg?style=flat)](https://david-dm.org/MarkGriffiths/trucolor) [![devDependency Status](http://img.shields.io/david/dev/MarkGriffiths/trucolor.svg?style=flat)](https://david-dm.org/MarkGriffiths/trucolor#info=devDependencies)

__Work in progress.__

A library that enables using 24 bit colors on the command line, from within node and in [fish](http://fishshell.com) ([source](https://github.com/fish-shell/fish-shell)). It also wraps [Less's](http://lesscss.org) ([source](https://github.com/less/less.js)) color functions to enable advanced color manipulations.

It requires the use of terminal software that supports 24 bit RGB escape sequences ie "\e[38;2;red;green;blue]m" where red, green and blue are values 0-255.

Supported terminals include:
- [iTerm2](http://www.iterm2.com) (nightly builds) [(source)](https://github.com/gnachman/iTerm2)
