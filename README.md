trucolor (v0.0.4)
=============

This is still very much a work in progress.

A library that enables using 24 bit colors on the command line, from within node and in [fish](http://fishshell.com) ([source](https://github.com/fish-shell/fish-shell)). It also wraps [Less's](http://lesscss.org) ([source](https://github.com/less/less.js)) color functions to enable advanced color manipulations.

It requires the use of terminal software that supports 24 bit RGB escape sequences ie "\e[38;2;red;green;blue]m" where red, green and blue are values 0-255.

Supported terminals include:
- [iTerm2](http://www.iterm2.com) (nightly builds) [(source)](https://github.com/gnachman/iTerm2)
