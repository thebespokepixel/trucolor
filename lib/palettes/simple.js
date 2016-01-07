'use strict';

/*
 trucolor
 Simple Shared Palette
 */
module.exports = function(callback_) {
  return require("../../index").bulk({
    example: '#B262FF',
    command: '#1579CF',
    argument: '#4CB0DF',
    option: '#C1BA89',
    operator: '#FFF',
    grey: '#808080',
    title: 'bold #80C480',
    normal: 'normal',
    reset: 'reset'
  }, {}, callback_);
};
