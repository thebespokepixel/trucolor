(function() {
  'use strict';
  var Cache, DEFAULT, Exception, SIZE_UNITS, _, _getNotationToBytes, fs,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('lodash');

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


  /*
  The file size notation convert to bytes.
  
  @example Rule
      100K = 100 * 1024 Bytes
  
  @param notation [String] the file size notation.
  @return [Number] file size (bytes) .
  @private
   */

  _getNotationToBytes = function(notation) {
    var matches, pattern;
    if (!_.isString(notation)) {
      throw new Exception("The size notation isn't String type.");
      return 0;
    }
    notation = notation.toUpperCase();
    pattern = /(\d+)([B|K|M|G])/;
    matches = pattern.exec(notation);
    if (matches != null) {
      return matches[1] * SIZE_UNITS[matches[2]];
    } else {
      console.log("Could not to exchange the noation.");
    }
    return 0;
  };


  /*
  Exception class
   */

  Exception = (function() {

    /*
    Constructor function
    
    @param msg [String] the exception message.
     */
    function Exception(msg) {
      this.msg = msg;
      this.name = 'Exception';
    }

    return Exception;

  })();


  /*
  Cache class
   */

  Cache = (function() {

    /*
    Constructor function.
    
    @param opt [Object]  options
    @option opt [String] limit_bytes    limit the cache file size. Default: '100K'
    @option opt [Boolean] auto_save     enable auto save cache. Default: false
    @option opt [String] filename       full name of save file. Default: 'ds_cache.json'
     */
    function Cache(opt) {
      if (opt == null) {
        opt = {};
      }
      this._queue = [];
      this._cache = {};
      this.limit_bytes = opt.limit_bytes || DEFAULT.LIMIT_BYTES;
      this.auto_save = opt.auto_save || DEFAULT.AUTO_SAVE;
      this.filename = opt.filename || DEFAULT.FILENAME;

      /*
      Check the cache size is enough to add a new data.
      
      @param needBytes [Number] need the free size
      @return [Boolean] true if enough, otherwise false.
      @private
       */
      this._isCouldAdd = function(needBytes) {
        var cache_bytes, limit_bytes;
        cache_bytes = this.content().length;
        limit_bytes = this._getNotationToBytes(this.limit_bytes);
        return (cache_bytes + needBytes) < limit_bytes;
      };

      /*
      Invoke the package function.
      
      @param notation [String] the file size notation.
      @return [Number] file size (bytes) .
      @private
       */
      this._getNotationToBytes = function(notation) {
        return _getNotationToBytes(notation);
      };

      /*
      Return the length of that the object converts to a  JSON string.
      
      @param obj [Object] the object.
      @return [Number] the length of the object converts to a JSON string.
       */
      this._getContentBytes = function(obj) {
        if (!_.isObject(obj)) {
          throw new Exception("Could not the know the content size , because is not object type.");
        }
        return JSON.stringify(obj).length;
      };

      /*
      Clean unused cache objects.
      
      @param needBytes [Number] need the free size
      @return [Boolean] true if clean up success, otherwise false.
       */
      this._gc = function(needBytes) {
        var releaseKey;
        if (needBytes > this.limit_bytes || this._queue.length === 0) {
          return false;
        }
        while (!(this._queue.length > 0 && this._isCouldAdd(needBytes))) {
          releaseKey = this._queue.pop();
          delete this._cache[releaseKey];
        }
        return true;
      };

      /*
      Move this key to begin of the queue.
      
      @param key [String] update the quere content via the key.
      @private
       */
      this._update = function(key) {
        this._queue = _.without(this._queue, key);
        this._queue.unshift(key);
      };

      /*
      Calculate how many free size to satisfy this data.
      
      @param key [String] the key of data
      @param val [Object] the value of data
      @return [Number] require free size.
      @private
       */
      this._calculateNeedBytes = function(key, val) {
        var cache_bytes, clone_c, clone_content, clone_q;
        cache_bytes = this.content().length;
        clone_q = _.cloneDeep(this._queue);
        clone_c = _.cloneDeep(this._cache);
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


    /*
    Put data into cache.
    
    @example
        cache.set('name','Donald');
    
    @param key [String] the key of data.
    @param val [Object] the value of data.
     */

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


    /*
    Catch data via key.
    
    @example
        cache.get('name');
    
    @param key [String] the key that you want to catch the data.
    @return [Object] the value via Key, otherwise return null if the key not exist.
     */

    Cache.prototype.get = function(key) {
      if (this._cache[key] == null) {
        return null;
      }
      this._update(key);
      return this._cache[key];
    };


    /*
    Write the cache into the file.
    
    @return [Boolean] true.
    @todo modify the return value .
     */

    Cache.prototype.save = function() {
      fs.writeFileSync(this.filename, this.content());
      return true;
    };


    /*
    Remove the data via key. Clear all data in the cache if you invoke this method without any arguments
    
    @example
        cache.clear('name');
        // or
        cache.clear();
    
    @param key [String] optional. You could remove the data by key, either remove all data without any arguments.
    @return [Boolean] true if clear success, otherwise false.
     */

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
        delete this._cache[key];
        _isCorrect = true;
      }
      if (this.auto_save && _isCorrect) {
        this.save();
      }
      return _isCorrect;
    };


    /*
    Load the cache from file.
    
    @return [Boolean] true if success, otherwise false.
     */

    Cache.prototype.load = function() {
      var e, obj;
      try {
        obj = JSON.parse(fs.readFileSync(this.filename));
        this._cache = obj.c;
        this._queue = obj.q;
      } catch (_error) {
        e = _error;
        return false;
      }
      return true;
    };


    /*
    Return the number of data in the cache.
    
    @return [Number] the number of cache object.
     */

    Cache.prototype.size = function() {
      return _.size(this._cache);
    };


    /*
    Return the JSON string of cache.
    
    @return [String] the JSON string.
     */

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

}).call(this);
