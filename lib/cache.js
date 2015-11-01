'use strict';
var Cache, DEFAULT, Exception, SIZE_UNITS, _, _getNotationToBytes, fs
var indexOf = [].indexOf

_ = require('underscore');

fs = require('fs');

DEFAULT = {
  LIMIT_BYTES: '100K',
  AUTO_SAVE: false,
  FILENAME: 'ds_cache.json'
};

SIZE_UNITS = {
  'B': 1,
  'K': 1024,
  'M': 1048576,
  'G': 1073741824
};

_getNotationToBytes = function(notation) {
  var matches, pattern;
  if (!_.isString(notation)) {
    throw new Exception("The size notation isn't String type.");
  }
  notation = notation.toUpperCase();
  pattern = /(\d+)([B|K|M|G])/;
  matches = pattern.exec(notation);
  if (matches != null) {
    return matches[1] * SIZE_UNITS[matches[2]];
  } else {
    console.log("Could not to exchange the notation.");
  }
  return 0;
};

Exception = (function() {
  function Exception(msg) {
    this.msg = msg;
    this.name = 'Exception';
  }

  return Exception;

})();

Cache = (function() {
  function Cache(opt) {
    if (opt == null) {
      opt = {};
    }
    this._queue = [];
    this._cache = {};
    this.limit_bytes = opt.limit_bytes || DEFAULT.LIMIT_BYTES;
    this.auto_save = opt.auto_save || DEFAULT.AUTO_SAVE;
    this.filename = opt.filename || DEFAULT.FILENAME;
    this._isCouldAdd = function(needBytes) {
      var cache_bytes, limit_bytes;
      cache_bytes = this.content().length;
      limit_bytes = this._getNotationToBytes(this.limit_bytes);
      return (cache_bytes + needBytes) < limit_bytes;
    };
    this._getNotationToBytes = function(notation) {
      return _getNotationToBytes(notation);
    };
    this._getContentBytes = function(obj) {
      if (!_.isObject(obj)) {
        throw new Exception("Could not the know the content size , because is not object type.");
      }
      return JSON.stringify(obj).length;
    };
    this._gc = function(needBytes) {
      var releaseKey;
      if (needBytes > this.limit_bytes || this._queue.length === 0) {
        return false;
      }
      while (!(this._queue.length > 0 && this._isCouldAdd(needBytes))) {
        releaseKey = this._queue.pop();
        delete this._cache[releaseKey]
        ;
      }
      return true;
    };
    this._update = function(key) {
      this._queue = _.without(this._queue, key);
      this._queue.unshift(key);
    };
    this._calculateNeedBytes = function(key, val) {
      var cache_bytes, clone_c, clone_content, clone_q;
      cache_bytes = this.content().length;
      clone_q = _.map(this._queue, _.clone);
      clone_c = _.map(this._cache, _.clone);
      clone_q.push(key);
      clone_c[key] = val;
      clone_content = {
        q: clone_q,
        c: clone_c
      };
      return this._getContentBytes(clone_content) - cache_bytes;
    };
    this.load();
  }

  Cache.prototype.set = function(key, val) {
    var needBytes;
    needBytes = this._calculateNeedBytes(key, val);
    if (indexOf.call(this._queue, key) >= 0 && this._getContentBytes({
        key: this._cache[key]
      }) <= needBytes) {
      this._cache[key] = val;
      this._update(key);
      return;
    }
    if (!this._isCouldAdd(needBytes)) {
      console.log("Need more cache buffer.");
      this._gc(needBytes);
    }
    this._update(key);
    this._cache[key] = val;
    if (this.auto_save === true) {
      this.save();
    }
  };

  Cache.prototype.get = function(key) {
    if (this._cache[key] == null) {
      return null;
    }
    this._update(key);
    return this._cache[key];
  };

  Cache.prototype.save = function() {
    fs.writeFileSync(this.filename, this.content());
    return true;
  };

  Cache.prototype.clear = function(key) {
    var _isCorrect;
    _isCorrect = false;
    if (key == null) {
      this._cache = {};
      this._queue = [];
      _isCorrect = true;
    }
    if ((key != null) && _.has(this._cache, key)) {
      this._queue = _.without(this._queue, key);
      delete this._cache[key]
      ;
      _isCorrect = true;
    }
    if (this.auto_save && _isCorrect) {
      this.save();
    }
    return _isCorrect;
  };

  Cache.prototype.load = function() {
    var e, error, obj;
    try {
      obj = JSON.parse(fs.readFileSync(this.filename));
      this._cache = obj.c;
      this._queue = obj.q;
    } catch (error) {
      e = error;
      console.log(e.toString());
      return false;
    }
    return true;
  };

  Cache.prototype.size = function() {
    return _.size(this._cache);
  };

  Cache.prototype.content = function() {
    var _content;
    _content = {
      q: this._queue,
      c: this._cache
    };
    return JSON.stringify(_content);
  };

  return Cache;

})();

module.exports = Cache;

module.exports.getNotationToBytes = _getNotationToBytes;
