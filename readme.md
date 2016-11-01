# trucolor

> A node module and CLI utility for using 24bit color SGR codes in modern terminals.

##### Status

![Status](https://img.shields.io/badge/status-beta-blue.svg?style=flat) [![npm](https://img.shields.io/npm/v/trucolor.svg?style=flat&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU%2BbnBtPC90aXRsZT48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IGZpbGwtb3BhY2l0eT0iLjMiIGZpbGw9IiMwMDAiIHg9IjIiIHk9IjExIiB3aWR0aD0iMTAiIGhlaWdodD0iMiIgcng9IjEiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMiAyaDEwdjEwSDJ6Ii8%2BPHBhdGggZmlsbD0iI0MxMjEyNyIgZD0iTTMgMTFoNFY1aDJ2NmgyVjNIM3oiLz48L2c%2BPC9zdmc%2B)](https://www.npmjs.com/package/trucolor "npm") [![Travis](https://img.shields.io/travis/MarkGriffiths/trucolor.svg?branch=master&style=flat)](https://travis-ci.org/MarkGriffiths/trucolor "Travis") [![David](https://img.shields.io/david/MarkGriffiths/trucolor.svg?branch=master&style=flat)](https://david-dm.org/MarkGriffiths/trucolor/master "David")  
 [![Code-climate](https://codeclimate.com/github/MarkGriffiths/trucolor/badges/gpa.svg?style=flat)](https://codeclimate.com/github/MarkGriffiths/trucolor "Code-climate") [![Coverage](https://codeclimate.com/github/MarkGriffiths/trucolor/badges/coverage.svg?style=flat)](https://codeclimate.com/github/MarkGriffiths/trucolor/coverage "Coverage") [![Snyk](https://snyk.io/test/github/MarkGriffiths/trucolor/badge.svg?style=flat)](https://snyk.io/test/github/MarkGriffiths/trucolor "Snyk")   

##### Developer

[![David-developer](https://img.shields.io/david/dev/MarkGriffiths/trucolor.svg?branch=master&style=flat)](https://david-dm.org/MarkGriffiths/trucolor/master#info=devDependencies "David-developer") [![Rollup](https://img.shields.io/badge/es2015-jsnext%3Amain_%E2%9C%94-64CA39.svg?style=flat&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHBhdGggZmlsbD0iI0ZGMzMzMyIgZD0iTTEwLjkwNDI4MjQsMy4wMDkxMDY4MyBDMTEuMjM4NzA1NSwzLjU4MjgzNzEzIDExLjQyODU3MTQsNC4yNDQ4MzM2MyAxMS40Mjg1NzE0LDQuOTUwOTYzMjIgQzExLjQyODU3MTQsNi40MTc4NjM0IDEwLjYwODY5NTcsNy42OTU2MjE3MiA5LjM5MTgyNzM5LDguMzc2NTMyNCBDOS4zMDU1MjQ2OCw4LjQyNDg2ODY1IDkuMjczMTYxMTYsOC41MzIwNDkwNCA5LjMxODQ3MDA5LDguNjE4MjEzNjYgTDExLjQyODU3MTQsMTMgTDUuMjU4NjgyODEsMTMgTDIuMzM5Nzc3MjMsMTMgQzIuMTUyMTIzNDUsMTMgMiwxMi44NDgyNzU3IDIsMTIuNjUzODA0OCBMMiwxLjM0NjE5NTIyIEMyLDEuMTU0OTk2ODggMi4xNDgzMTU0MywxIDIuMzM5Nzc3MjMsMSBMNy42NjAyMjI3NywxIEM3LjcwMTU0MTQ5LDEgNy43NDExMzc2NCwxLjAwNzM1NTg4IDcuNzc3NzY2NTgsMS4wMjA5MDQyOSBDOS4wNjQ1MzgyOCwxLjE0NDU0MDA0IDEwLjE3MzM4ODQsMS44NTM4NTI5MSAxMC44MjIyOTQ5LDIuODcyNTA0MzggQzEwLjc5OTE5NTMsMi44NDQ4NDgwNiAxMC44NDQ0OTkxLDIuOTQ5MTc0NzYgMTAuOTA0MjgyNCwzLjAwOTEwNjgzIFoiLz4KICAgIDxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iLjMxIiBkPSJNOC44NTcxNDI4NiwzLjU3MTQyODU3IEw2LjcxNDI4NTcxLDYuNTcxNDI4NTcgTDkuMjg1NzE0MjksNS4yODU3MTQyOSBDOS4yODU3MTQyOSw1LjI4NTcxNDI5IDkuNzE0Mjg1NzEsNC44NTcxNDI4NiA5LjI4NTcxNDI5LDQuNDI4NTcxNDMgQzkuMjg1NzE0MjksNCA4Ljg1NzE0Mjg2LDMuNTcxNDI4NTcgOC44NTcxNDI4NiwzLjU3MTQyODU3IFoiLz4KICAgIDxwYXRoIGZpbGw9IiNGQkIwNDAiIGQ9Ik0yLjg0Njc0NjAzLDEyLjk5NTg0OTUgQzMuMjY0OTIwNjIsMTIuOTk1ODQ5NSAzLjE4NTkzMDM0LDEyLjk0NjM2NjkgMy4zMTYxMTYzOCwxMi44NzM5MDU0IEMzLjYxODE3NTg3LDEyLjcwNTc3OTMgNS42ODk0NDA5OSw4LjcxMjc4NDU5IDcuNzE3NTU0NzYsNi44MjEzNjYwMiBDOS43NDU2Njg1Miw0LjkyOTk0NzQ2IDEwLjAwNDU3NjcsNS41NjA0MjAzMiA4Ljg4NDc5ODk1LDMuNTAyOTc3MjMgQzguODg0Nzk4OTUsMy41MDI5NzcyMyA5Ljc0NzgyNjA5LDUuMTQyMjA2NjUgOS4wMTQyNTMwMiw1LjI2ODMwMTIzIEM4LjQzODE4MjQxLDUuMzY3MDc1MzEgNy4xMTk5MDg0Nyw0LjEyMjk0MjIxIDcuNjExODMzOTMsMy4wMDQ5MDM2OCBDOC4wOTA4MTM5OSwxLjkxNDE4NTY0IDEwLjAxOTY3OTYsMi4xMjAxNDAxMSAxMC45MDY0NCwzLjAwOTEwNjgzIEMxMC44NzgzOTE2LDIuOTYyODcyMTUgMTAuODUwMzQzMiwyLjkxNjYzNzQ4IDEwLjgyMjI5NDksMi44NzI1MDQzOCBDMTAuMzA0NDc4NiwyLjI1MjUzOTQgOS41MDQwMjA5MiwxLjkwMzY3Nzc2IDguNzEwMDM1OTYsMS45MDM2Nzc3NiBDNy4xOTk3Mzg0OCwxLjkwMzY3Nzc2IDYuODIwMDA2NTQsMi40MjY5NzAyMyAzLjkyMDIzNTM3LDcuNjE5OTY0OTcgQzIuMzg3Nzk5MzQsMTAuMzY1NDA2NyAyLjAxMDgzMTkzLDExLjU3MzUwNzkgMi4wMDYyOTA2OSwxMi4xNjk4MTgyIEMyLDEyLjk5NTg0OTUgMi4wMDYyOTA2OSwxMi45OTU4NDk1IDIuODQ2NzQ2MDMsMTIuOTk1ODQ5NSBaIi8%2BCiAgPC9nPgo8L3N2Zz4K)](https://github.com/rollup/rollup/wiki/jsnext:main "Rollup")   

##### Help

[![Inch](https://inch-ci.org/github/MarkGriffiths/trucolor.svg?branch=master&style=shields)](https://inch-ci.org/github/MarkGriffiths/trucolor "Inch") [![Gitter](https://img.shields.io/gitter/room/MarkGriffiths/help.svg?style=flat)](https://gitter.im/MarkGriffiths/help?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge "Gitter")   


## Usage

#### Installation

```shell
npm install --save @thebespokepixel/trucolor
```


## Documentation

Full documentation can be found at [https://markgriffiths.github.io/truwrap/][1]

[1]: https://markgriffiths.github.io/truwrap/

[grab]: https://raw.githubusercontent.com/MarkGriffiths/truwrap/master/media/truwrap.png
