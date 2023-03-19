'use strict';
!function(m) {
  /**
   * @param {string} r
   * @return {?}
   */
  function t(r) {
    var module;
    return (n[r] || (module = n[r] = {
      i : r,
      l : false,
      exports : {}
    }, m[r].call(module.exports, module, module.exports, t), module.l = true, module)).exports;
  }
  var n = {};
  /** @type {!Array} */
  t.m = m;
  t.c = n;
  /**
   * @param {!Function} d
   * @param {string} n
   * @param {!Function} val
   * @return {undefined}
   */
  t.d = function(d, n, val) {
    if (!t.o(d, n)) {
      Object.defineProperty(d, n, {
        enumerable : true,
        get : val
      });
    }
  };
  /**
   * @param {!Object} x
   * @return {undefined}
   */
  t.r = function(x) {
    if ("undefined" != typeof Symbol && Symbol.toStringTag) {
      Object.defineProperty(x, Symbol.toStringTag, {
        value : "Module"
      });
    }
    Object.defineProperty(x, "u", {
      value : true
    });
  };
  /**
   * @param {!Object} a
   * @param {number} b
   * @return {?}
   */
  t.t = function(a, b) {
    if (1 & b && (a = t(a)), 8 & b) {
      return a;
    }
    if (4 & b && "object" == typeof a && a && a.u) {
      return a;
    }
    /** @type {!Object} */
    var d = Object.create(null);
    if (t.r(d), Object.defineProperty(d, "default", {
      enumerable : true,
      value : a
    }), 2 & b && "string" != typeof a) {
      var i;
      for (i in a) {
        t.d(d, i, function(howMany) {
          return a[howMany];
        }.bind(null, i));
      }
    }
    return d;
  };
  /**
   * @param {!Object} e
   * @return {?}
   */
  t.n = function(e) {
    /** @type {function(): ?} */
    var n = e && e.u ? function() {
      return e.default;
    } : function() {
      return e;
    };
    return t.d(n, "a", n), n;
  };
  /**
   * @param {!Function} n
   * @param {string} x
   * @return {?}
   */
  t.o = function(n, x) {
    return Object.prototype.hasOwnProperty.call(n, x);
  };
  /** @type {string} */
  t.p = "";
  t(t.s = 5);
}([function(canCreateDiscussions, exports, require) {
  !function(global) {
    /**
     * @return {?}
     */
    function kMaxLength() {
      return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
    }
    /**
     * @param {!Object} value
     * @param {number} length
     * @return {?}
     */
    function set(value, length) {
      if (kMaxLength() < length) {
        throw new RangeError("Invalid typed array length");
      }
      return Buffer.TYPED_ARRAY_SUPPORT ? (value = new Uint8Array(length)).__proto__ = Buffer.prototype : (value = null === value ? new Buffer(length) : value).length = length, value;
    }
    /**
     * @param {number} length
     * @param {number} name
     * @param {!Object} type
     * @return {?}
     */
    function Buffer(length, name, type) {
      if (!(Buffer.TYPED_ARRAY_SUPPORT || this instanceof Buffer)) {
        return new Buffer(length, name, type);
      }
      if ("number" != typeof length) {
        return copy(this, length, name, type);
      }
      if ("string" == typeof name) {
        throw new Error("If encoding is specified then the first argument must be a string");
      }
      return allocUnsafe(this, length);
    }
    /**
     * @param {string} value
     * @param {number} name
     * @param {number} e
     * @param {!Object} res
     * @return {?}
     */
    function copy(value, name, e, res) {
      if ("number" == typeof name) {
        throw new TypeError('"value" argument must not be a number');
      }
      if ("undefined" != typeof ArrayBuffer && name instanceof ArrayBuffer) {
        /** @type {string} */
        var result = value;
        /** @type {number} */
        var data = name;
        /** @type {number} */
        var c = e;
        if (data.byteLength, c < 0 || data.byteLength < c) {
          throw new RangeError("'offset' is out of bounds");
        }
        if (data.byteLength < c + (res || 0)) {
          throw new RangeError("'length' is out of bounds");
        }
        return data = void 0 === c && void 0 === res ? new Uint8Array(data) : void 0 === res ? new Uint8Array(data, c) : new Uint8Array(data, c, res), Buffer.TYPED_ARRAY_SUPPORT ? (result = data).__proto__ = Buffer.prototype : result = error(result, data), result;
      }
      if ("string" != typeof name) {
        /** @type {string} */
        c = value;
        /** @type {number} */
        res = name;
        if (Buffer.isBuffer(res)) {
          return data = 0 | checked(res.length), 0 !== (c = set(c, data)).length && res.copy(c, 0, 0, data), c;
        }
        if (res) {
          if ("undefined" != typeof ArrayBuffer && res.buffer instanceof ArrayBuffer || "length" in res) {
            return "number" != typeof res.length || function(value) {
              return value != value;
            }(res.length) ? set(c, 0) : error(c, res);
          }
          if ("Buffer" === res.type && template(res.data)) {
            return error(c, res.data);
          }
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      /** @type {string} */
      result = value;
      /** @type {number} */
      res = name;
      /** @type {number} */
      value = e;
      if (Buffer.isEncoding(value = "string" == typeof value && "" !== value ? value : "utf8")) {
        return name = 0 | byteLength(res, value), result = (res = (result = set(result, name)).write(res, value)) !== name ? result.slice(0, res) : result;
      }
      throw new TypeError('"encoding" must be a valid string encoding');
    }
    /**
     * @param {number} length
     * @return {undefined}
     */
    function assertSize(length) {
      if ("number" != typeof length) {
        throw new TypeError('"size" argument must be a number');
      }
      if (length < 0) {
        throw new RangeError('"size" argument must not be negative');
      }
    }
    /**
     * @param {!Object} that
     * @param {number} size
     * @return {?}
     */
    function allocUnsafe(that, size) {
      if (assertSize(size), that = set(that, size < 0 ? 0 : 0 | checked(size)), !Buffer.TYPED_ARRAY_SUPPORT) {
        /** @type {number} */
        var i = 0;
        for (; i < size; ++i) {
          /** @type {number} */
          that[i] = 0;
        }
      }
      return that;
    }
    /**
     * @param {!Array} out
     * @param {?} obj
     * @return {?}
     */
    function error(out, obj) {
      /** @type {number} */
      var length = obj.length < 0 ? 0 : 0 | checked(obj.length);
      out = set(out, length);
      /** @type {number} */
      var i = 0;
      for (; i < length; i = i + 1) {
        /** @type {number} */
        out[i] = 255 & obj[i];
      }
      return out;
    }
    /**
     * @param {number} length
     * @return {?}
     */
    function checked(length) {
      if (length >= kMaxLength()) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
      }
      return 0 | length;
    }
    /**
     * @param {?} value
     * @param {string} encoding
     * @return {?}
     */
    function byteLength(value, encoding) {
      if (Buffer.isBuffer(value)) {
        return value.length;
      }
      if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(value) || value instanceof ArrayBuffer)) {
        return value.byteLength;
      }
      /** @type {number} */
      var len = (value = "string" != typeof value ? "" + value : value).length;
      if (0 === len) {
        return 0;
      }
      /** @type {boolean} */
      var e = false;
      for (;;) {
        switch(encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
          case void 0:
            return utf8ToBytes(value).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return 2 * len;
          case "hex":
            return len >>> 1;
          case "base64":
            return render(value).length;
          default:
            if (e) {
              return utf8ToBytes(value).length;
            }
            /** @type {string} */
            encoding = ("" + encoding).toLowerCase();
            /** @type {boolean} */
            e = true;
        }
      }
    }
    /**
     * @param {string} encoding
     * @param {number} len
     * @param {number} i
     * @return {?}
     */
    function write(encoding, len, i) {
      var end;
      /** @type {boolean} */
      var r = false;
      if ((len = void 0 === len || len < 0 ? 0 : len) > this.length) {
        return "";
      }
      if ((i = void 0 === i || i > this.length ? this.length : i) <= 0) {
        return "";
      }
      if ((i = i >>> 0) <= (len = len >>> 0)) {
        return "";
      }
      encoding = encoding || "utf8";
      for (;;) {
        switch(encoding) {
          case "hex":
            var e = this;
            /** @type {number} */
            var n = len;
            /** @type {number} */
            var h = i;
            var x = e.length;
            if (!h || h < 0 || x < h) {
              h = x;
            }
            /** @type {string} */
            var charStr = "";
            var g = n = !n || n < 0 ? 0 : n;
            for (; g < h; ++g) {
              /** @type {string} */
              charStr = charStr + function(pingErr) {
                return pingErr < 16 ? "0" + pingErr.toString(16) : pingErr.toString(16);
              }(e[g]);
            }
            return charStr;
          case "utf8":
          case "utf-8":
            return parse(this, len, i);
          case "ascii":
            var dstReal = this;
            /** @type {number} */
            x = len;
            /** @type {number} */
            var pc = i;
            /** @type {string} */
            var ret = "";
            /** @type {number} */
            pc = Math.min(dstReal.length, pc);
            var p = x;
            for (; p < pc; ++p) {
              /** @type {string} */
              ret = ret + String.fromCharCode(127 & dstReal[p]);
            }
            return ret;
          case "latin1":
          case "binary":
            var chars = this;
            /** @type {number} */
            n = len;
            /** @type {number} */
            var index = i;
            /** @type {string} */
            var subject = "";
            /** @type {number} */
            index = Math.min(chars.length, index);
            var j = n;
            for (; j < index; ++j) {
              /** @type {string} */
              subject = subject + String.fromCharCode(chars[j]);
            }
            return subject;
          case "base64":
            return buf = this, end = i, 0 === (start = len) && end === buf.length ? base64.fromByteArray(buf) : base64.fromByteArray(buf.slice(start, end));
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            /** @type {number} */
            var buf = len;
            /** @type {number} */
            var start = i;
            var bytes = this.slice(buf, start);
            /** @type {string} */
            var self = "";
            /** @type {number} */
            var pos = 0;
            for (; pos < bytes.length; pos = pos + 2) {
              /** @type {string} */
              self = self + String.fromCharCode(bytes[pos] + 256 * bytes[pos + 1]);
            }
            return self;
          default:
            if (r) {
              throw new TypeError("Unknown encoding: " + encoding);
            }
            /** @type {string} */
            encoding = (encoding + "").toLowerCase();
            /** @type {boolean} */
            r = true;
        }
      }
    }
    /**
     * @param {!NodeList} a
     * @param {number} i
     * @param {number} e
     * @return {undefined}
     */
    function swap(a, i, e) {
      var ret = a[i];
      a[i] = a[e];
      a[e] = ret;
    }
    /**
     * @param {number} obj
     * @param {number} e
     * @param {number} r
     * @param {number} value
     * @param {boolean} i
     * @return {?}
     */
    function indexOf(obj, e, r, value, i) {
      if (0 === obj.length) {
        return -1;
      }
      if ("string" == typeof r ? (value = r, r = 0) : 2147483647 < r ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, (r = (r = isNaN(r) ? i ? 0 : obj.length - 1 : r) < 0 ? obj.length + r : r) >= obj.length) {
        if (i) {
          return -1;
        }
        /** @type {number} */
        r = obj.length - 1;
      } else {
        if (r < 0) {
          if (!i) {
            return -1;
          }
          /** @type {number} */
          r = 0;
        }
      }
      if ("string" == typeof e && (e = Buffer.from(e, value)), Buffer.isBuffer(e)) {
        return 0 === e.length ? -1 : toString(obj, e, r, value, i);
      }
      if ("number" == typeof e) {
        return e = e & 255, Buffer.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? (i ? Uint8Array.prototype.indexOf : Uint8Array.prototype.lastIndexOf).call(obj, e, r) : toString(obj, [e], r, value, i);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    /**
     * @param {number} arr
     * @param {number} val
     * @param {number} l
     * @param {?} e
     * @param {boolean} ignore
     * @return {?}
     */
    function toString(arr, val, l, e, ignore) {
      /**
       * @param {number} buf
       * @param {number} i
       * @return {?}
       */
      function read(buf, i) {
        return 1 === indexSize ? buf[i] : buf.readUInt16BE(i * indexSize);
      }
      /** @type {number} */
      var indexSize = 1;
      var x = arr.length;
      var distance = val.length;
      if (void 0 !== e && ("ucs2" === (e = String(e).toLowerCase()) || "ucs-2" === e || "utf16le" === e || "utf-16le" === e)) {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        /** @type {number} */
        x = x / (indexSize = 2);
        /** @type {number} */
        distance = distance / 2;
        /** @type {number} */
        l = l / 2;
      }
      if (ignore) {
        /** @type {number} */
        var length = -1;
        /** @type {number} */
        var i = l;
        for (; i < x; i++) {
          if (read(arr, i) === read(val, -1 === length ? 0 : i - length)) {
            if (i - (length = -1 === length ? i : length) + 1 === distance) {
              return length * indexSize;
            }
          } else {
            if (-1 !== length) {
              /** @type {number} */
              i = i - (i - length);
            }
            /** @type {number} */
            length = -1;
          }
        }
      } else {
        i = l = x < l + distance ? x - distance : l;
        for (; 0 <= i; i--) {
          /** @type {boolean} */
          var c = true;
          /** @type {number} */
          var j = 0;
          for (; j < distance; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              /** @type {boolean} */
              c = false;
              break;
            }
          }
          if (c) {
            return i;
          }
        }
      }
      return -1;
    }
    /**
     * @param {undefined} buf
     * @param {string} string
     * @param {number} value
     * @param {number} count
     * @return {?}
     */
    function update(buf, string, value, count) {
      return callback(function(remaining) {
        /** @type {!Array} */
        var black = [];
        /** @type {number} */
        var i = 0;
        for (; i < remaining.length; ++i) {
          black.push(255 & remaining.charCodeAt(i));
        }
        return black;
      }(string), buf, value, count);
    }
    /**
     * @param {number} buf
     * @param {string} value
     * @param {number} offset
     * @param {number} count
     * @return {?}
     */
    function read(buf, value, offset, count) {
      return callback(function(t, val) {
        var i;
        var index;
        /** @type {!Array} */
        var result = [];
        /** @type {number} */
        var k = 0;
        for (; k < t.length && !((val = val - 2) < 0); ++k) {
          i = t.charCodeAt(k);
          /** @type {number} */
          index = i >> 8;
          result.push(i % 256);
          result.push(index);
        }
        return result;
      }(value, buf.length - offset), buf, offset, count);
    }
    /**
     * @param {!Array} str
     * @param {number} max
     * @param {number} value
     * @return {?}
     */
    function parse(str, max, value) {
      /** @type {number} */
      value = Math.min(str.length, value);
      /** @type {!Array} */
      var cmd = [];
      /** @type {number} */
      var r = max;
      for (; r < value;) {
        var prev;
        var ch;
        var ascii;
        var t;
        var item = str[r];
        /** @type {null} */
        var c = null;
        /** @type {number} */
        var redOffset = 239 < item ? 4 : 223 < item ? 3 : 191 < item ? 2 : 1;
        if (r + redOffset <= value) {
          switch(redOffset) {
            case 1:
              if (item < 128) {
                c = item;
              }
              break;
            case 2:
              if (128 == (192 & (prev = str[r + 1])) && 127 < (t = (31 & item) << 6 | 63 & prev)) {
                /** @type {number} */
                c = t;
              }
              break;
            case 3:
              prev = str[r + 1];
              ch = str[r + 2];
              if (128 == (192 & prev) && 128 == (192 & ch) && 2047 < (t = (15 & item) << 12 | (63 & prev) << 6 | 63 & ch) && (t < 55296 || 57343 < t)) {
                /** @type {number} */
                c = t;
              }
              break;
            case 4:
              prev = str[r + 1];
              ch = str[r + 2];
              ascii = str[r + 3];
              if (128 == (192 & prev) && 128 == (192 & ch) && 128 == (192 & ascii) && 65535 < (t = (15 & item) << 18 | (63 & prev) << 12 | (63 & ch) << 6 | 63 & ascii) && t < 1114112) {
                /** @type {number} */
                c = t;
              }
          }
        }
        if (null === c) {
          /** @type {number} */
          c = 65533;
          /** @type {number} */
          redOffset = 1;
        } else {
          if (65535 < c) {
            cmd.push((c = c - 65536) >>> 10 & 1023 | 55296);
            /** @type {number} */
            c = 56320 | 1023 & c;
          }
        }
        cmd.push(c);
        r = r + redOffset;
      }
      /** @type {!Array} */
      var msg = cmd;
      /** @type {number} */
      var length = msg.length;
      if (length <= size) {
        return String.fromCharCode.apply(String, msg);
      }
      /** @type {string} */
      var res = "";
      /** @type {number} */
      var pos = 0;
      for (; pos < length;) {
        /** @type {string} */
        res = res + String.fromCharCode.apply(String, msg.slice(pos, pos = pos + size));
      }
      return res;
    }
    /**
     * @param {number} offset
     * @param {number} ext
     * @param {?} length
     * @return {undefined}
     */
    function checkOffset(offset, ext, length) {
      if (offset % 1 != 0 || offset < 0) {
        throw new RangeError("offset is not uint");
      }
      if (length < offset + ext) {
        throw new RangeError("Trying to access beyond buffer length");
      }
    }
    /**
     * @param {!Object} buffer
     * @param {number} length
     * @param {number} index
     * @param {number} ext
     * @param {number} offset
     * @param {number} min
     * @return {undefined}
     */
    function checkInt(buffer, length, index, ext, offset, min) {
      if (!Buffer.isBuffer(buffer)) {
        throw new TypeError('"buffer" argument must be a Buffer instance');
      }
      if (offset < length || length < min) {
        throw new RangeError('"value" argument is out of bounds');
      }
      if (index + ext > buffer.length) {
        throw new RangeError("Index out of range");
      }
    }
    /**
     * @param {!NodeList} buf
     * @param {number} value
     * @param {number} offset
     * @param {boolean} littleEndian
     * @return {undefined}
     */
    function objectWriteUInt16(buf, value, offset, littleEndian) {
      if (value < 0) {
        value = 65535 + value + 1;
      }
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var cell_amount = Math.min(buf.length - offset, 2);
      for (; i < cell_amount; ++i) {
        /** @type {number} */
        buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> 8 * (littleEndian ? i : 1 - i);
      }
    }
    /**
     * @param {!NodeList} buf
     * @param {number} value
     * @param {number} offset
     * @param {boolean} littleEndian
     * @return {undefined}
     */
    function objectWriteUInt32(buf, value, offset, littleEndian) {
      if (value < 0) {
        value = 4294967295 + value + 1;
      }
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var cell_amount = Math.min(buf.length - offset, 4);
      for (; i < cell_amount; ++i) {
        /** @type {number} */
        buf[offset + i] = value >>> 8 * (littleEndian ? i : 3 - i) & 255;
      }
    }
    /**
     * @param {number} buf
     * @param {number} value
     * @param {number} offset
     * @param {number} ext
     * @return {undefined}
     */
    function checkIEEE754(buf, value, offset, ext) {
      if (offset + ext > buf.length) {
        throw new RangeError("Index out of range");
      }
      if (offset < 0) {
        throw new RangeError("Index out of range");
      }
    }
    /**
     * @param {undefined} buf
     * @param {number} value
     * @param {number} offset
     * @param {boolean} littleEndian
     * @param {string} noAssert
     * @return {?}
     */
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      return noAssert || checkIEEE754(buf, 0, offset, 4), ieee754.write(buf, value, offset, littleEndian, 23, 4), offset + 4;
    }
    /**
     * @param {undefined} buf
     * @param {number} value
     * @param {number} offset
     * @param {boolean} littleEndian
     * @param {string} noAssert
     * @return {?}
     */
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      return noAssert || checkIEEE754(buf, 0, offset, 8), ieee754.write(buf, value, offset, littleEndian, 52, 8), offset + 8;
    }
    /**
     * @param {?} string
     * @param {number} units
     * @return {?}
     */
    function utf8ToBytes(string, units) {
      units = units || 1 / 0;
      var i;
      var strLength = string.length;
      /** @type {null} */
      var m = null;
      /** @type {!Array} */
      var bytes = [];
      /** @type {number} */
      var x = 0;
      for (; x < strLength; ++x) {
        if (55295 < (i = string.charCodeAt(x)) && i < 57344) {
          if (!m) {
            if (56319 < i) {
              if (-1 < (units = units - 3)) {
                bytes.push(239, 191, 189);
              }
              continue;
            }
            if (x + 1 === strLength) {
              if (-1 < (units = units - 3)) {
                bytes.push(239, 191, 189);
              }
              continue;
            }
            m = i;
            continue;
          }
          if (i < 56320) {
            if (-1 < (units = units - 3)) {
              bytes.push(239, 191, 189);
            }
            m = i;
            continue;
          }
          /** @type {number} */
          i = 65536 + (m - 55296 << 10 | i - 56320);
        } else {
          if (m && -1 < (units = units - 3)) {
            bytes.push(239, 191, 189);
          }
        }
        if (m = null, i < 128) {
          if (--units < 0) {
            break;
          }
          bytes.push(i);
        } else {
          if (i < 2048) {
            if ((units = units - 2) < 0) {
              break;
            }
            bytes.push(i >> 6 | 192, 63 & i | 128);
          } else {
            if (i < 65536) {
              if ((units = units - 3) < 0) {
                break;
              }
              bytes.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128);
            } else {
              if (!(i < 1114112)) {
                throw new Error("Invalid code point");
              }
              if ((units = units - 4) < 0) {
                break;
              }
              bytes.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128);
            }
          }
        }
      }
      return bytes;
    }
    /**
     * @param {(Object|string)} str
     * @return {?}
     */
    function render(str) {
      return base64.toByteArray(function(value) {
        var s;
        if ((value = ((s = value).trim ? s.trim() : s.replace(/^\s+|\s+$/g, "")).replace(r11b, "")).length < 2) {
          return "";
        }
        for (; value.length % 4 != 0;) {
          /** @type {string} */
          value = value + "=";
        }
        return value;
      }(str));
    }
    /**
     * @param {!NodeList} v
     * @param {number} dst
     * @param {number} offset
     * @param {number} value
     * @return {?}
     */
    function callback(v, dst, offset, value) {
      /** @type {number} */
      var i = 0;
      for (; i < value && !(i + offset >= dst.length || i >= v.length); ++i) {
        dst[i + offset] = v[i];
      }
      return i;
    }
    var base64 = require(10);
    var ieee754 = require(11);
    var template = require(12);
    /** @type {function(number, number, !Object): ?} */
    exports.Buffer = Buffer;
    /**
     * @param {number} length
     * @return {?}
     */
    exports.SlowBuffer = function(length) {
      if (+length != length) {
        /** @type {number} */
        length = 0;
      }
      return Buffer.alloc(+length);
    };
    /** @type {number} */
    exports.INSPECT_MAX_BYTES = 50;
    Buffer.TYPED_ARRAY_SUPPORT = void 0 !== global.TYPED_ARRAY_SUPPORT ? global.TYPED_ARRAY_SUPPORT : function() {
      try {
        /** @type {!Uint8Array} */
        var arr = new Uint8Array(1);
        return arr.__proto__ = {
          __proto__ : Uint8Array.prototype,
          foo : function() {
            return 42;
          }
        }, 42 === arr.foo() && "function" == typeof arr.subarray && 0 === arr.subarray(1, 1).byteLength;
      } catch (t) {
        return false;
      }
    }();
    exports.kMaxLength = kMaxLength();
    /** @type {number} */
    Buffer.poolSize = 8192;
    /**
     * @param {!Object} data
     * @return {?}
     */
    Buffer.h = function(data) {
      return data.__proto__ = Buffer.prototype, data;
    };
    /**
     * @param {number} list
     * @param {number} value
     * @param {!Object} name
     * @return {?}
     */
    Buffer.from = function(list, value, name) {
      return copy(null, list, value, name);
    };
    if (Buffer.TYPED_ARRAY_SUPPORT && (Buffer.prototype.__proto__ = Uint8Array.prototype, Buffer.__proto__ = Uint8Array, "undefined" != typeof Symbol) && Symbol.species && Buffer[Symbol.species] === Buffer) {
      Object.defineProperty(Buffer, Symbol.species, {
        value : null,
        configurable : true
      });
    }
    /**
     * @param {number} size
     * @param {?} id
     * @param {number} value
     * @return {?}
     */
    Buffer.alloc = function(size, id, value) {
      return width = null, id = id, value = value, assertSize(size = size), !(size <= 0) && void 0 !== id ? "string" == typeof value ? set(width, size).fill(id, value) : set(width, size).fill(id) : set(width, size);
      var width;
    };
    /**
     * @param {number} size
     * @return {?}
     */
    Buffer.allocUnsafe = function(size) {
      return allocUnsafe(null, size);
    };
    /**
     * @param {undefined} size
     * @return {?}
     */
    Buffer.allocUnsafeSlow = function(size) {
      return allocUnsafe(null, size);
    };
    /**
     * @param {!Object} obj
     * @return {?}
     */
    Buffer.isBuffer = function(obj) {
      return !(null == obj || !obj.v);
    };
    /**
     * @param {!Object} x
     * @param {!Object} obj
     * @return {?}
     */
    Buffer.compare = function(x, obj) {
      if (!Buffer.isBuffer(x) || !Buffer.isBuffer(obj)) {
        throw new TypeError("Arguments must be Buffers");
      }
      if (x === obj) {
        return 0;
      }
      var i = x.length;
      var n = obj.length;
      /** @type {number} */
      var k = 0;
      /** @type {number} */
      var o = Math.min(i, n);
      for (; k < o; ++k) {
        if (x[k] !== obj[k]) {
          i = x[k];
          n = obj[k];
          break;
        }
      }
      return i < n ? -1 : n < i ? 1 : 0;
    };
    /**
     * @param {!Object} encoding
     * @return {?}
     */
    Buffer.isEncoding = function(encoding) {
      switch(String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    /**
     * @param {string} x
     * @param {number} i
     * @return {?}
     */
    Buffer.concat = function(x, i) {
      if (!template(x)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (0 === x.length) {
        return Buffer.alloc(0);
      }
      if (void 0 === i) {
        /** @type {number} */
        k = i = 0;
        for (; k < x.length; ++k) {
          i = i + x[k].length;
        }
      }
      var value = Buffer.allocUnsafe(i);
      /** @type {number} */
      var m = 0;
      /** @type {number} */
      var k = 0;
      for (; k < x.length; ++k) {
        var d = x[k];
        if (!Buffer.isBuffer(d)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        d.copy(value, m);
        m = m + d.length;
      }
      return value;
    };
    /** @type {function(?, string): ?} */
    Buffer.byteLength = byteLength;
    /** @type {boolean} */
    Buffer.prototype.v = true;
    /**
     * @return {?}
     */
    Buffer.prototype.swap16 = function() {
      var i = this.length;
      if (i % 2 != 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      /** @type {number} */
      var l = 0;
      for (; l < i; l = l + 2) {
        swap(this, l, l + 1);
      }
      return this;
    };
    /**
     * @return {?}
     */
    Buffer.prototype.swap32 = function() {
      var l = this.length;
      if (l % 4 != 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      /** @type {number} */
      var i = 0;
      for (; i < l; i = i + 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    /**
     * @return {?}
     */
    Buffer.prototype.swap64 = function() {
      var l = this.length;
      if (l % 8 != 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      /** @type {number} */
      var i = 0;
      for (; i < l; i = i + 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    /**
     * @return {?}
     */
    Buffer.prototype.toString = function() {
      /** @type {number} */
      var i = 0 | this.length;
      return 0 == i ? "" : 0 === arguments.length ? parse(this, 0, i) : write.apply(this, arguments);
    };
    /**
     * @param {undefined} a
     * @return {?}
     */
    Buffer.prototype.equals = function(a) {
      if (Buffer.isBuffer(a)) {
        return this === a || 0 === Buffer.compare(this, a);
      }
      throw new TypeError("Argument must be a Buffer");
    };
    /**
     * @return {?}
     */
    Buffer.prototype.inspect = function() {
      /** @type {string} */
      var pix_color = "";
      var max = exports.INSPECT_MAX_BYTES;
      return 0 < this.length && (pix_color = this.toString("hex", 0, max).match(/.{2}/g).join(" "), this.length > max) && (pix_color = pix_color + " ... "), "<Buffer " + pix_color + ">";
    };
    /**
     * @param {!Array} target
     * @param {number} index
     * @param {number} end
     * @param {number} start
     * @param {number} length
     * @return {?}
     */
    Buffer.prototype.compare = function(target, index, end, start, length) {
      if (!Buffer.isBuffer(target)) {
        throw new TypeError("Argument must be a Buffer");
      }
      if (void 0 === end && (end = target ? target.length : 0), void 0 === start && (start = 0), void 0 === length && (length = this.length), (index = void 0 === index ? 0 : index) < 0 || end > target.length || start < 0 || length > this.length) {
        throw new RangeError("out of range index");
      }
      if (length <= start && end <= index) {
        return 0;
      }
      if (length <= start) {
        return -1;
      }
      if (end <= index) {
        return 1;
      }
      if (this === target) {
        return 0;
      }
      /** @type {number} */
      var level = (length = length >>> 0) - (start = start >>> 0);
      /** @type {number} */
      var z = (end = end >>> 0) - (index = index >>> 0);
      /** @type {number} */
      var numTiles = Math.min(level, z);
      var result = this.slice(start, length);
      var buffer = target.slice(index, end);
      /** @type {number} */
      var i = 0;
      for (; i < numTiles; ++i) {
        if (result[i] !== buffer[i]) {
          level = result[i];
          z = buffer[i];
          break;
        }
      }
      return level < z ? -1 : z < level ? 1 : 0;
    };
    /**
     * @param {string} value
     * @param {undefined} item
     * @param {undefined} fromIndex
     * @return {?}
     */
    Buffer.prototype.includes = function(value, item, fromIndex) {
      return -1 !== this.indexOf(value, item, fromIndex);
    };
    /**
     * @param {string} array
     * @param {number} value
     * @param {number} fromIndex
     * @return {?}
     */
    Buffer.prototype.indexOf = function(array, value, fromIndex) {
      return indexOf(this, array, value, fromIndex, true);
    };
    /**
     * @param {string} array
     * @param {number} value
     * @param {number} fromIndex
     * @return {?}
     */
    Buffer.prototype.lastIndexOf = function(array, value, fromIndex) {
      return indexOf(this, array, value, fromIndex, false);
    };
    /**
     * @param {(Object|string)} str
     * @param {number} value
     * @param {number} length
     * @param {string} encoding
     * @return {?}
     */
    Buffer.prototype.write = function(str, value, length, encoding) {
      if (void 0 === value) {
        /** @type {string} */
        encoding = "utf8";
        length = this.length;
        /** @type {number} */
        value = 0;
      } else {
        if (void 0 === length && "string" == typeof value) {
          /** @type {number} */
          encoding = value;
          length = this.length;
          /** @type {number} */
          value = 0;
        } else {
          if (!isFinite(value)) {
            throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          }
          /** @type {number} */
          value = value | 0;
          if (isFinite(length)) {
            /** @type {number} */
            length = length | 0;
            if (void 0 === encoding) {
              /** @type {string} */
              encoding = "utf8";
            }
          } else {
            /** @type {number} */
            encoding = length;
            length = void 0;
          }
        }
      }
      /** @type {number} */
      var i = this.length - value;
      if ((void 0 === length || i < length) && (length = i), 0 < str.length && (length < 0 || value < 0) || value > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      encoding = encoding || "utf8";
      var options;
      var name;
      var result;
      /** @type {boolean} */
      var a = false;
      for (;;) {
        switch(encoding) {
          case "hex":
            var c = this;
            /** @type {(Object|string)} */
            var input = str;
            /** @type {number} */
            var r = value;
            /** @type {number} */
            var n = length;
            /** @type {number} */
            var offset = (r = Number(r) || 0, c.length - r);
            if ((!n || offset < (n = Number(n))) && (n = offset), (offset = input.length) % 2 != 0) {
              throw new TypeError("Invalid hex string");
            }
            if (offset / 2 < n) {
              /** @type {number} */
              n = offset / 2;
            }
            /** @type {number} */
            var i = 0;
            for (; i < n; ++i) {
              /** @type {number} */
              var c1 = parseInt(input.substr(2 * i, 2), 16);
              if (isNaN(c1)) {
                return i;
              }
              /** @type {number} */
              c[r + i] = c1;
            }
            return i;
          case "utf8":
          case "utf-8":
            return offset = value, result = length, callback(utf8ToBytes(str, (name = this).length - offset), name, offset, result);
          case "ascii":
            return update(this, str, value, length);
          case "latin1":
          case "binary":
            return update(this, str, value, length);
          case "base64":
            return name = this, result = value, options = length, callback(render(str), name, result, options);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return read(this, str, value, length);
          default:
            if (a) {
              throw new TypeError("Unknown encoding: " + encoding);
            }
            /** @type {string} */
            encoding = ("" + encoding).toLowerCase();
            /** @type {boolean} */
            a = true;
        }
      }
    };
    /**
     * @return {?}
     */
    Buffer.prototype.toJSON = function() {
      return {
        type : "Buffer",
        data : Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    /** @type {number} */
    var size = 4096;
    /**
     * @param {number} start
     * @param {number} end
     * @return {?}
     */
    Buffer.prototype.slice = function(start, end) {
      var i = this.length;
      if ((start = ~~start) < 0 ? (start = start + i) < 0 && (start = 0) : i < start && (start = i), (end = void 0 === end ? i : ~~end) < 0 ? (end = end + i) < 0 && (end = 0) : i < end && (end = i), end < start && (end = start), Buffer.TYPED_ARRAY_SUPPORT) {
        (newBuf = this.subarray(start, end)).__proto__ = Buffer.prototype;
      } else {
        /** @type {number} */
        var sliceLen = end - start;
        var newBuf = new Buffer(sliceLen, void 0);
        /** @type {number} */
        var i = 0;
        for (; i < sliceLen; ++i) {
          newBuf[i] = this[i + start];
        }
      }
      return newBuf;
    };
    /**
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readUIntLE = function(offset, byteLength, noAssert) {
      /** @type {number} */
      offset = offset | 0;
      /** @type {number} */
      byteLength = byteLength | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
      var val = this[offset];
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var i = 0;
      for (; ++i < byteLength && (mul = mul * 256);) {
        val = val + this[offset + i] * mul;
      }
      return val;
    };
    /**
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readUIntBE = function(offset, byteLength, noAssert) {
      /** @type {number} */
      offset = offset | 0;
      /** @type {number} */
      byteLength = byteLength | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
      var val = this[offset + --byteLength];
      /** @type {number} */
      var mul = 1;
      for (; 0 < byteLength && (mul = mul * 256);) {
        val = val + this[offset + --byteLength] * mul;
      }
      return val;
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt8 = function(offset, limit) {
      return limit || checkOffset(offset, 1, this.length), this[offset];
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt16LE = function(offset, limit) {
      return limit || checkOffset(offset, 2, this.length), this[offset] | this[offset + 1] << 8;
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt16BE = function(offset, limit) {
      return limit || checkOffset(offset, 2, this.length), this[offset] << 8 | this[offset + 1];
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt32LE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + 16777216 * this[offset + 3];
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readUInt32BE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), 16777216 * this[offset] + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    /**
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readIntLE = function(offset, byteLength, noAssert) {
      /** @type {number} */
      offset = offset | 0;
      /** @type {number} */
      byteLength = byteLength | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
      var val = this[offset];
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var i = 0;
      for (; ++i < byteLength && (mul = mul * 256);) {
        val = val + this[offset + i] * mul;
      }
      return (mul = mul * 128) <= val && (val = val - Math.pow(2, 8 * byteLength)), val;
    };
    /**
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.readIntBE = function(offset, byteLength, noAssert) {
      /** @type {number} */
      offset = offset | 0;
      /** @type {number} */
      byteLength = byteLength | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
      /** @type {number} */
      var i = byteLength;
      /** @type {number} */
      var B0 = 1;
      var n = this[offset + --i];
      for (; 0 < i && (B0 = B0 * 256);) {
        n = n + this[offset + --i] * B0;
      }
      return (B0 = B0 * 128) <= n && (n = n - Math.pow(2, 8 * byteLength)), n;
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readInt8 = function(offset, limit) {
      return limit || checkOffset(offset, 1, this.length), 128 & this[offset] ? -1 * (255 - this[offset] + 1) : this[offset];
    };
    /**
     * @param {number} offset
     * @param {number} noAssert
     * @return {?}
     */
    Buffer.prototype.readInt16LE = function(offset, noAssert) {
      if (!noAssert) {
        checkOffset(offset, 2, this.length);
      }
      /** @type {number} */
      noAssert = this[offset] | this[offset + 1] << 8;
      return 32768 & noAssert ? 4294901760 | noAssert : noAssert;
    };
    /**
     * @param {number} offset
     * @param {number} noAssert
     * @return {?}
     */
    Buffer.prototype.readInt16BE = function(offset, noAssert) {
      if (!noAssert) {
        checkOffset(offset, 2, this.length);
      }
      /** @type {number} */
      noAssert = this[offset + 1] | this[offset] << 8;
      return 32768 & noAssert ? 4294901760 | noAssert : noAssert;
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readInt32LE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    /**
     * @param {number} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readInt32BE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readFloatLE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), ieee754.read(this, offset, true, 23, 4);
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readFloatBE = function(offset, limit) {
      return limit || checkOffset(offset, 4, this.length), ieee754.read(this, offset, false, 23, 4);
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readDoubleLE = function(offset, limit) {
      return limit || checkOffset(offset, 8, this.length), ieee754.read(this, offset, true, 52, 8);
    };
    /**
     * @param {undefined} offset
     * @param {string} limit
     * @return {?}
     */
    Buffer.prototype.readDoubleBE = function(offset, limit) {
      return limit || checkOffset(offset, 8, this.length), ieee754.read(this, offset, false, 52, 8);
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUIntLE = function(value, offset, byteLength, noAssert) {
      /** @type {number} */
      value = +value;
      /** @type {number} */
      offset = offset | 0;
      /** @type {number} */
      byteLength = byteLength | 0;
      if (!noAssert) {
        checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength) - 1, 0);
      }
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      this[offset] = 255 & value;
      for (; ++i < byteLength && (mul = mul * 256);) {
        /** @type {number} */
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {number} byteLength
     * @param {?} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUIntBE = function(value, offset, byteLength, noAssert) {
      /** @type {number} */
      value = +value;
      /** @type {number} */
      offset = offset | 0;
      /** @type {number} */
      byteLength = byteLength | 0;
      if (!noAssert) {
        checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength) - 1, 0);
      }
      /** @type {number} */
      var i = byteLength - 1;
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      this[offset + i] = 255 & value;
      for (; 0 <= --i && (mul = mul * 256);) {
        /** @type {number} */
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 1, 255, 0), Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), this[offset] = 255 & value, offset + 1;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, true), offset + 2;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = 255 & value) : objectWriteUInt16(this, value, offset, false), offset + 2;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset + 3] = value >>> 24, this[offset + 2] = value >>> 16, this[offset + 1] = value >>> 8, this[offset] = 255 & value) : objectWriteUInt32(this, value, offset, true), offset + 4;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = 255 & value) : objectWriteUInt32(this, value, offset, false), offset + 4;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {number} byteLength
     * @param {number} noAssert
     * @return {?}
     */
    Buffer.prototype.writeIntLE = function(value, offset, byteLength, noAssert) {
      /** @type {number} */
      value = +value;
      /** @type {number} */
      offset = offset | 0;
      if (!noAssert) {
        checkInt(this, value, offset, byteLength, (noAssert = Math.pow(2, 8 * byteLength - 1)) - 1, -noAssert);
      }
      /** @type {number} */
      var i = 0;
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var s = 0;
      /** @type {number} */
      this[offset] = 255 & value;
      for (; ++i < byteLength && (mul = mul * 256);) {
        if (value < 0 && 0 === s && 0 !== this[offset + i - 1]) {
          /** @type {number} */
          s = 1;
        }
        /** @type {number} */
        this[offset + i] = (value / mul >> 0) - s & 255;
      }
      return offset + byteLength;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {number} byteLength
     * @param {number} noAssert
     * @return {?}
     */
    Buffer.prototype.writeIntBE = function(value, offset, byteLength, noAssert) {
      /** @type {number} */
      value = +value;
      /** @type {number} */
      offset = offset | 0;
      if (!noAssert) {
        checkInt(this, value, offset, byteLength, (noAssert = Math.pow(2, 8 * byteLength - 1)) - 1, -noAssert);
      }
      /** @type {number} */
      var i = byteLength - 1;
      /** @type {number} */
      var mul = 1;
      /** @type {number} */
      var s = 0;
      /** @type {number} */
      this[offset + i] = 255 & value;
      for (; 0 <= --i && (mul = mul * 256);) {
        if (value < 0 && 0 === s && 0 !== this[offset + i + 1]) {
          /** @type {number} */
          s = 1;
        }
        /** @type {number} */
        this[offset + i] = (value / mul >> 0) - s & 255;
      }
      return offset + byteLength;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 1, 127, -128), Buffer.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), this[offset] = 255 & (value = value < 0 ? 255 + value + 1 : value), offset + 1;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, true), offset + 2;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = 255 & value) : objectWriteUInt16(this, value, offset, false), offset + 2;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = 255 & value, this[offset + 1] = value >>> 8, this[offset + 2] = value >>> 16, this[offset + 3] = value >>> 24) : objectWriteUInt32(this, value, offset, true), offset + 4;
    };
    /**
     * @param {number} value
     * @param {number} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), value < 0 && (value = 4294967295 + value + 1), Buffer.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = 255 & value) : objectWriteUInt32(this, value, offset, false), offset + 4;
    };
    /**
     * @param {undefined} value
     * @param {undefined} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    /**
     * @param {undefined} value
     * @param {undefined} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    /**
     * @param {undefined} value
     * @param {undefined} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    /**
     * @param {undefined} value
     * @param {undefined} offset
     * @param {string} noAssert
     * @return {?}
     */
    Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    /**
     * @param {!NodeList} text
     * @param {number} i
     * @param {number} start
     * @param {number} value
     * @return {?}
     */
    Buffer.prototype.copy = function(text, i, start, value) {
      if (start = start || 0, value || 0 === value || (value = this.length), i >= text.length && (i = text.length), (value = 0 < value && value < start ? start : value) === start) {
        return 0;
      }
      if (0 === text.length || 0 === this.length) {
        return 0;
      }
      if ((i = i || 0) < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) {
        throw new RangeError("sourceStart out of bounds");
      }
      if (value < 0) {
        throw new RangeError("sourceEnd out of bounds");
      }
      if (value > this.length) {
        value = this.length;
      }
      var pos;
      /** @type {number} */
      var len = (value = text.length - i < value - start ? text.length - i + start : value) - start;
      if (this === text && start < i && i < value) {
        /** @type {number} */
        pos = len - 1;
        for (; 0 <= pos; --pos) {
          text[pos + i] = this[pos + start];
        }
      } else {
        if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) {
          /** @type {number} */
          pos = 0;
          for (; pos < len; ++pos) {
            text[pos + i] = this[pos + start];
          }
        } else {
          Uint8Array.prototype.set.call(text, this.subarray(start, start + len), i);
        }
      }
      return len;
    };
    /**
     * @param {string} val
     * @param {number} start
     * @param {number} end
     * @param {number} encoding
     * @return {?}
     */
    Buffer.prototype.fill = function(val, start, end, encoding) {
      if ("string" == typeof val) {
        var replacedVal;
        if ("string" == typeof start ? (encoding = start, start = 0, end = this.length) : "string" == typeof end && (encoding = end, end = this.length), 1 === val.length && (replacedVal = val.charCodeAt(0)) < 256 && (val = replacedVal), void 0 !== encoding && "string" != typeof encoding) {
          throw new TypeError("encoding must be a string");
        }
        if ("string" == typeof encoding && !Buffer.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
      } else {
        if ("number" == typeof val) {
          /** @type {number} */
          val = val & 255;
        }
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (!(end <= start)) {
        if (start = start >>> 0, end = void 0 === end ? this.length : end >>> 0, "number" == typeof(val = val || 0)) {
          /** @type {number} */
          i = start;
          for (; i < end; ++i) {
            /** @type {string} */
            this[i] = val;
          }
        } else {
          var colorPool = Buffer.isBuffer(val) ? val : utf8ToBytes((new Buffer(val, encoding)).toString());
          var colorPoolSize = colorPool.length;
          /** @type {number} */
          var i = 0;
          for (; i < end - start; ++i) {
            this[i + start] = colorPool[i % colorPoolSize];
          }
        }
      }
      return this;
    };
    /** @type {!RegExp} */
    var r11b = /[^+\/0-9A-Za-z-_]/g;
  }.call(this, require(9));
}, function(mixin, n) {
  if ("function" == typeof Object.create) {
    /**
     * @param {!Object} instance
     * @param {!Function} Constructor
     * @return {undefined}
     */
    mixin.exports = function(instance, Constructor) {
      if (Constructor) {
        /** @type {!Function} */
        instance.super_ = Constructor;
        /** @type {!Object} */
        instance.prototype = Object.create(Constructor.prototype, {
          constructor : {
            value : instance,
            enumerable : false,
            writable : true,
            configurable : true
          }
        });
      }
    };
  } else {
    /**
     * @param {!Object} a
     * @param {!Function} b
     * @return {undefined}
     */
    mixin.exports = function(a, b) {
      var fn;
      if (b) {
        /** @type {!Function} */
        a.super_ = b;
        (fn = function() {
        }).prototype = b.prototype;
        a.prototype = new fn;
        /** @type {!Object} */
        a.prototype.constructor = a;
      }
    };
  }
}, function(context, canCreateDiscussions, require) {
  !function(Buffer) {
    /**
     * @param {boolean} value
     * @param {string} _
     * @return {undefined}
     */
    function init(value, _) {
      this.g = new Buffer(value);
      /** @type {string} */
      this._ = _;
      /** @type {boolean} */
      this.A = value;
      /** @type {number} */
      this.S = 0;
      /** @type {number} */
      this.O = 0;
    }
    /**
     * @param {!Object} obj
     * @param {number} enc
     * @return {?}
     */
    init.prototype.update = function(obj, enc) {
      if ("string" == typeof obj) {
        obj = new Buffer(obj, enc = enc || "utf8");
      }
      var numNotes = this.S += obj.length;
      var index = this.O || 0;
      /** @type {number} */
      var j = 0;
      var g = this.g;
      for (; index < numNotes;) {
        /** @type {number} */
        var s = Math.min(obj.length, j + this.A - index % this.A) - j;
        /** @type {number} */
        var i = 0;
        for (; i < s; i++) {
          g[index % this.A + i] = obj[i + j];
        }
        /** @type {number} */
        j = j + s;
        if ((index = index + s) % this.A == 0) {
          this.R(g);
        }
      }
      return this.O = index, this;
    };
    /**
     * @param {string} enc
     * @return {?}
     */
    init.prototype.digest = function(enc) {
      /** @type {number} */
      var r = 8 * this.S;
      r = (this.g[this.S % this.A] = 128, this.g.fill(0, this.S % this.A + 1), r % (8 * this.A) >= 8 * this._ && (this.R(this.g), this.g.fill(0)), this.g.writeInt32BE(r, this.A - 4), this.R(this.g) || this.T());
      return enc ? r.toString(enc) : r;
    };
    /**
     * @return {?}
     */
    init.prototype.R = function() {
      throw new Error("_update must be implemented by subclass");
    };
    /** @type {function(boolean, string): undefined} */
    context.exports = init;
  }.call(this, require(0).Buffer);
}, function(context, canCreateDiscussions, __webpack_require__) {
  !function(Buffer) {
    /**
     * @return {undefined}
     */
    function obj() {
      this.init();
      /** @type {!Array} */
      this.I = I;
      body.call(this, 64, 56);
    }
    var t = __webpack_require__(1);
    var body = __webpack_require__(2);
    /** @type {!Array} */
    var signedTransactions = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 
    2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
    /** @type {!Array} */
    var I = new Array(64);
    t(obj, body);
    /**
     * @return {?}
     */
    obj.prototype.init = function() {
      return this.j = 1779033703, this.K = 3144134277, this.N = 1013904242, this.k = 2773480762, this.C = 1359893119, this.D = 2600822924, this.P = 528734635, this.L = 1541459225, this;
    };
    /**
     * @param {?} b
     * @return {undefined}
     */
    obj.prototype.R = function(b) {
      var zeroSizeMax;
      var myBirdList = this.I;
      /** @type {number} */
      var b = 0 | this.j;
      /** @type {number} */
      var c = 0 | this.K;
      /** @type {number} */
      var d = 0 | this.N;
      /** @type {number} */
      var f4 = 0 | this.k;
      /** @type {number} */
      var e_lo = 0 | this.C;
      /** @type {number} */
      var f_lo = 0 | this.D;
      /** @type {number} */
      var g_lo = 0 | this.P;
      /** @type {number} */
      var h_lo = 0 | this.L;
      /** @type {number} */
      var currentBird = 0;
      for (; currentBird < 16; ++currentBird) {
        myBirdList[currentBird] = b.readInt32BE(4 * currentBird);
      }
      for (; currentBird < 64; ++currentBird) {
        /** @type {number} */
        myBirdList[currentBird] = 0 | (((zeroSizeMax = myBirdList[currentBird - 2]) >>> 17 | zeroSizeMax << 15) ^ (zeroSizeMax >>> 19 | zeroSizeMax << 13) ^ zeroSizeMax >>> 10) + myBirdList[currentBird - 7] + (((zeroSizeMax = myBirdList[currentBird - 15]) >>> 7 | zeroSizeMax << 25) ^ (zeroSizeMax >>> 18 | zeroSizeMax << 14) ^ zeroSizeMax >>> 3) + myBirdList[currentBird - 16];
      }
      /** @type {number} */
      var signedTransactionsCounter = 0;
      for (; signedTransactionsCounter < 64; ++signedTransactionsCounter) {
        /** @type {number} */
        var i = h_lo + ((e_lo >>> 6 | e_lo << 26) ^ (e_lo >>> 11 | e_lo << 21) ^ (e_lo >>> 25 | e_lo << 7)) + (g_lo ^ e_lo & (f_lo ^ g_lo)) + signedTransactions[signedTransactionsCounter] + myBirdList[signedTransactionsCounter] | 0;
        /** @type {number} */
        var GROUPSIZE = 0 | ((b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10)) + (b & c | d & (b | c));
        /** @type {number} */
        h_lo = g_lo;
        /** @type {number} */
        g_lo = f_lo;
        /** @type {number} */
        f_lo = e_lo;
        /** @type {number} */
        e_lo = f4 + i | 0;
        /** @type {number} */
        f4 = d;
        /** @type {number} */
        d = c;
        /** @type {number} */
        c = b;
        /** @type {number} */
        b = i + GROUPSIZE | 0;
      }
      /** @type {number} */
      this.j = b + this.j | 0;
      /** @type {number} */
      this.K = c + this.K | 0;
      /** @type {number} */
      this.N = d + this.N | 0;
      /** @type {number} */
      this.k = f4 + this.k | 0;
      /** @type {number} */
      this.C = e_lo + this.C | 0;
      /** @type {number} */
      this.D = f_lo + this.D | 0;
      /** @type {number} */
      this.P = g_lo + this.P | 0;
      /** @type {number} */
      this.L = h_lo + this.L | 0;
    };
    /**
     * @return {?}
     */
    obj.prototype.T = function() {
      var tempBuff = new Buffer(32);
      return tempBuff.writeInt32BE(this.j, 0), tempBuff.writeInt32BE(this.K, 4), tempBuff.writeInt32BE(this.N, 8), tempBuff.writeInt32BE(this.k, 12), tempBuff.writeInt32BE(this.C, 16), tempBuff.writeInt32BE(this.D, 20), tempBuff.writeInt32BE(this.P, 24), tempBuff.writeInt32BE(this.L, 28), tempBuff;
    };
    /** @type {function(): undefined} */
    context.exports = obj;
  }.call(this, __webpack_require__(0).Buffer);
}, function(context, canCreateDiscussions, __webpack_require__) {
  !function(BigNumber) {
    /**
     * @return {undefined}
     */
    function obj() {
      this.init();
      /** @type {!Array} */
      this.I = I;
      body.call(this, 128, 112);
    }
    /**
     * @param {number} c
     * @param {number} a
     * @param {number} b
     * @return {?}
     */
    function callback(c, a, b) {
      return b ^ c & (a ^ b);
    }
    /**
     * @param {number} b
     * @param {number} c
     * @param {number} d
     * @return {?}
     */
    function set(b, c, d) {
      return b & c | d & (b | c);
    }
    /**
     * @param {number} o
     * @param {number} arg1
     * @return {?}
     */
    function toString(o, arg1) {
      return (o >>> 28 | arg1 << 4) ^ (arg1 >>> 2 | o << 30) ^ (arg1 >>> 7 | o << 25);
    }
    /**
     * @param {number} name
     * @param {number} original
     * @return {?}
     */
    function read(name, original) {
      return (name >>> 14 | original << 18) ^ (name >>> 18 | original << 14) ^ (original >>> 9 | name << 23);
    }
    /**
     * @param {number} a
     * @param {number} b
     * @return {?}
     */
    function f(a, b) {
      return a >>> 0 < b >>> 0 ? 1 : 0;
    }
    var t = __webpack_require__(1);
    var body = __webpack_require__(2);
    /** @type {!Array} */
    var H = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 
    1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 
    3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 
    3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
    /** @type {!Array} */
    var I = new Array(160);
    t(obj, body);
    /**
     * @return {?}
     */
    obj.prototype.init = function() {
      return this.M = 1779033703, this.B = 3144134277, this.U = 1013904242, this.J = 2773480762, this.G = 1359893119, this.V = 2600822924, this.F = 528734635, this.$ = 1541459225, this.H = 4089235720, this.Z = 2227873595, this.W = 4271175723, this.Y = 1595750129, this.X = 2917565137, this.q = 725511199, this.tt = 4215389547, this.nt = 327033209, this;
    };
    /**
     * @param {?} b
     * @return {undefined}
     */
    obj.prototype.R = function(b) {
      var arr = this.I;
      /** @type {number} */
      var a = 0 | this.M;
      /** @type {number} */
      var r = 0 | this.B;
      /** @type {number} */
      var resource = 0 | this.U;
      /** @type {number} */
      var key = 0 | this.J;
      /** @type {number} */
      var options = 0 | this.G;
      /** @type {number} */
      var start = 0 | this.V;
      /** @type {number} */
      var i = 0 | this.F;
      /** @type {number} */
      var prefix = 0 | this.$;
      /** @type {number} */
      var d = 0 | this.H;
      /** @type {number} */
      var type = 0 | this.Z;
      /** @type {number} */
      var data = 0 | this.W;
      /** @type {number} */
      var val = 0 | this.Y;
      /** @type {number} */
      var name = 0 | this.X;
      /** @type {number} */
      var n = 0 | this.q;
      /** @type {number} */
      var size = 0 | this.tt;
      /** @type {number} */
      var width = 0 | this.nt;
      /** @type {number} */
      var idx = 0;
      for (; idx < 32; idx = idx + 2) {
        arr[idx] = b.readInt32BE(4 * idx);
        arr[idx + 1] = b.readInt32BE(4 * idx + 4);
      }
      for (; idx < 160; idx = idx + 2) {
        var low = arr[idx - 30];
        var high = arr[idx - 30 + 1];
        /** @type {number} */
        var prefix = (low >>> 1 | high << 31) ^ (low >>> 8 | high << 24) ^ low >>> 7;
        /** @type {number} */
        var i = (high >>> 1 | low << 31) ^ (high >>> 8 | low << 24) ^ (high >>> 7 | low << 25);
        low = arr[idx - 4];
        /** @type {number} */
        var px = ((high = arr[idx - 4 + 1]) >>> 19 | low << 13) ^ (low >>> 29 | high << 3) ^ (high >>> 6 | low << 26);
        var _ = arr[idx - 14];
        var s = arr[idx - 14 + 1];
        var dist = arr[idx - 32];
        var val = arr[idx - 32 + 1];
        /** @type {number} */
        var item = i + s | 0;
        /** @type {number} */
        var max = prefix + _ + f(item, i) | 0;
        /** @type {number} */
        max = (max = max + ((low >>> 19 | high << 13) ^ (high >>> 29 | low << 3) ^ low >>> 6) + f(item = item + px | 0, px) | 0) + dist + f(item = item + val | 0, val) | 0;
        /** @type {number} */
        arr[idx] = max;
        /** @type {number} */
        arr[idx + 1] = item;
      }
      /** @type {number} */
      var j = 0;
      for (; j < 160; j = j + 2) {
        max = arr[j];
        item = arr[j + 1];
        var result = set(a, r, resource);
        var path = set(d, type, data);
        var ret = toString(a, d);
        var t = toString(d, a);
        var out = read(options, name);
        var value = read(name, options);
        var b = H[j + 1];
        var res = callback(options, start, i);
        var v = callback(name, n, size);
        /** @type {number} */
        value = width + value | 0;
        /** @type {number} */
        res = (out = (((prefix + out + f(value, width) | 0) + res + f(value = value + v | 0, v) | 0) + H[j] + f(value = value + b | 0, b) | 0) + max + f(value = value + item | 0, item) | 0, t + path | 0);
        /** @type {number} */
        v = ret + result + f(res, t) | 0;
        /** @type {number} */
        prefix = i;
        /** @type {number} */
        width = size;
        /** @type {number} */
        i = start;
        /** @type {number} */
        size = n;
        /** @type {number} */
        start = options;
        /** @type {number} */
        n = name;
        /** @type {number} */
        options = key + out + f(name = val + value | 0, val) | 0;
        /** @type {number} */
        key = resource;
        /** @type {number} */
        val = data;
        /** @type {number} */
        resource = r;
        /** @type {number} */
        data = type;
        /** @type {number} */
        r = a;
        /** @type {number} */
        type = d;
        /** @type {number} */
        a = out + v + f(d = value + res | 0, value) | 0;
      }
      /** @type {number} */
      this.H = this.H + d | 0;
      /** @type {number} */
      this.Z = this.Z + type | 0;
      /** @type {number} */
      this.W = this.W + data | 0;
      /** @type {number} */
      this.Y = this.Y + val | 0;
      /** @type {number} */
      this.X = this.X + name | 0;
      /** @type {number} */
      this.q = this.q + n | 0;
      /** @type {number} */
      this.tt = this.tt + size | 0;
      /** @type {number} */
      this.nt = this.nt + width | 0;
      /** @type {number} */
      this.M = this.M + a + f(this.H, d) | 0;
      /** @type {number} */
      this.B = this.B + r + f(this.Z, type) | 0;
      /** @type {number} */
      this.U = this.U + resource + f(this.W, data) | 0;
      /** @type {number} */
      this.J = this.J + key + f(this.Y, val) | 0;
      /** @type {number} */
      this.G = this.G + options + f(this.X, name) | 0;
      /** @type {number} */
      this.V = this.V + start + f(this.q, n) | 0;
      /** @type {number} */
      this.F = this.F + i + f(this.tt, size) | 0;
      /** @type {number} */
      this.$ = this.$ + prefix + f(this.nt, width) | 0;
    };
    /**
     * @return {?}
     */
    obj.prototype.T = function() {
      /**
       * @param {undefined} num
       * @param {undefined} key
       * @param {number} offset
       * @return {undefined}
       */
      function mult(num, key, offset) {
        b.writeInt32BE(num, offset);
        b.writeInt32BE(key, offset + 4);
      }
      var b = new BigNumber(64);
      return mult(this.M, this.H, 0), mult(this.B, this.Z, 8), mult(this.U, this.W, 16), mult(this.J, this.Y, 24), mult(this.G, this.X, 32), mult(this.V, this.q, 40), mult(this.F, this.tt, 48), mult(this.$, this.nt, 56), b;
    };
    /** @type {function(): undefined} */
    context.exports = obj;
  }.call(this, __webpack_require__(0).Buffer);
}, function(canCreateDiscussions, n, getPackage) {
  getPackage(6).activate();
}, function(module, i, failcb) {
  /**
   * @param {!Object} data
   * @param {!Object} callback
   * @return {?}
   */
  function filter(data, callback) {
    var _ttyWrite;
    var e;
    var validationVM;
    var off;
    var result = "undefined" != typeof Symbol && data[Symbol.iterator] || data["@@iterator"];
    if (result) {
      return e = !(_ttyWrite = true), {
        s : function() {
          result = result.call(data);
        },
        n : function() {
          var rl = result.next();
          return _ttyWrite = rl.done, rl;
        },
        e : function(v) {
          /** @type {boolean} */
          e = true;
          validationVM = v;
        },
        f : function() {
          try {
            if (!(_ttyWrite || null == result.return)) {
              result.return();
            }
          } finally {
            if (e) {
              throw validationVM;
            }
          }
        }
      };
    }
    if (Array.isArray(data) || (result = validate(data)) || callback && data && "number" == typeof data.length) {
      return result && (data = result), off = 0, {
        s : callback = function() {
        },
        n : function() {
          return off >= data.length ? {
            done : true
          } : {
            done : false,
            value : data[off++]
          };
        },
        e : function(r) {
          throw r;
        },
        f : callback
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function stringify(obj) {
    return (stringify = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    })(obj);
  }
  /**
   * @param {!Function} d
   * @param {number} s
   * @return {?}
   */
  function map(d, s) {
    return function(fn) {
      if (Array.isArray(fn)) {
        return fn;
      }
    }(d) || function(s, n) {
      var g = null == s ? null : "undefined" != typeof Symbol && s[Symbol.iterator] || s["@@iterator"];
      if (null != g) {
        var _s;
        var r;
        /** @type {!Array} */
        var _arr = [];
        /** @type {boolean} */
        var _n = true;
        /** @type {boolean} */
        var u = false;
        try {
          g = g.call(s);
          for (; !(_n = (_s = g.next()).done) && (_arr.push(_s.value), !n || _arr.length !== n); _n = true) {
          }
        } catch (G__20648) {
          /** @type {boolean} */
          u = true;
          r = G__20648;
        } finally {
          try {
            if (!(_n || null == g.return)) {
              g.return();
            }
          } finally {
            if (u) {
              throw r;
            }
          }
        }
        return _arr;
      }
    }(d, s) || validate(d, s) || function() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  /**
   * @param {!Array} data
   * @param {number} number
   * @return {?}
   */
  function validate(data, number) {
    var str;
    if (data) {
      return "string" == typeof data ? getData(data, number) : "Map" === (str = "Object" === (str = Object.prototype.toString.call(data).slice(8, -1)) && data.constructor ? data.constructor.name : str) || "Set" === str ? Array.from(data) : "Arguments" === str || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(str) ? getData(data, number) : void 0;
    }
  }
  /**
   * @param {!Array} text
   * @param {number} n
   * @return {?}
   */
  function getData(text, n) {
    if (null == n || n > text.length) {
      n = text.length;
    }
    /** @type {number} */
    var i = 0;
    /** @type {!Array} */
    var ret = new Array(n);
    for (; i < n; i++) {
      ret[i] = text[i];
    }
    return ret;
  }
  /**
   * @param {!Object} event
   * @return {undefined}
   */
  function onCleanupCsDone(event) {
    var gPreviewInfo;
    if ((event.origin === window.origin || url.test(event.origin)) && (gPreviewInfo = event.data) && "PINTEREST_TAG_TEST" === gPreviewInfo.type) {
      event.source.postMessage({
        type : "PINTEREST_TAG_TEST_ACK",
        tagId : window.pintrk.tagId,
        tagEmValid : window.pintrk.partnerData && window.pintrk.partnerData.em ? "24aba99b2defbb47ee981b4200313f61f3ae31541d8717bdac1e463c838939b0" !== window.pintrk.partnerData.em : void 0
      }, event.origin);
    }
  }
  /**
   * @param {string} value
   * @param {!Object} id
   * @param {string} name
   * @return {undefined}
   */
  function fn(value, id, name) {
    if (null != id && stringify(id) != name) {
      console.error(consolePrefix + "Expected '%s' to be a %s, but found '%s'", value, name, id);
    }
  }
  /**
   * @param {number} str
   * @return {?}
   */
  function round(str) {
    return true === str || 1 == str || "string" == typeof str && "true" == str.trim().toLowerCase();
  }
  /**
   * @param {?} name
   * @return {?}
   */
  function func(name) {
    return false !== name && 0 != name && ("string" != typeof name || "false" != name.trim().toLowerCase());
  }
  /**
   * @param {?} value
   * @return {?}
   */
  function process(value) {
    return "string" == typeof value ? value.trim() : "number" == typeof value && value % 1 == 0 ? String(value).trim() : (fn("Pinterest Tag ID", value, "string"), null);
  }
  /**
   * @param {number} name
   * @param {string} value
   * @param {string} result
   * @param {!Object} app
   * @param {string} data
   * @return {undefined}
   */
  function callback(name, value, result, app, data) {
    result = result || log(value, name) || update(app);
    if (result) {
      /** @type {string} */
      value = result;
      if ((name = data) in (app = {})) {
        Object.defineProperty(app, name, {
          value : value,
          enumerable : true,
          configurable : true,
          writable : true
        });
      } else {
        /** @type {string} */
        app[name] = value;
      }
      $(app);
    }
  }
  /**
   * @param {string} key
   * @return {undefined}
   */
  function start(key) {
    var path;
    var value;
    if (!window.pintrk.cookieLoaded) {
      /** @type {boolean} */
      window.pintrk.cookieLoaded = true;
      path = parse();
      if (replace()) {
        value = get("epik") || log(data.EPIK, path);
        callback(path, data.EPIK, value, res.EPIK, "epik");
        if (value) {
          push(data.EPIK, value);
          load(res.EPIK, value);
        }
        callback(path, data.UNAUTH, null, res.UNAUTH, applications);
        /** @type {!Object} */
        value = Object.assign({}, key);
        if (window.pintrk.partnerData) {
          value.pd = window.pintrk.partnerData;
        }
        test(value, [processData, init], self.et.PAGE_LOAD);
        callback(path, data.DERIVED_EPIK, null, res.DERIVED_EPIK, progress);
        /** @type {string} */
        key = window.location.pathname;
        if (VALID_IDENTIFIER_EXPR.test(key) || window.pintrk.partnerData && "shopify" === window.pintrk.partnerData.np) {
          callback(path, "_shopify_y", null, null, "shopify_y");
        }
      } else {
        ready();
      }
    }
  }
  /**
   * @return {?}
   */
  function replace() {
    var t = window.pintrk.partnerData || {};
    return self.ot && ("boolean" != typeof t.fp_cookie || t.fp_cookie);
  }
  /**
   * @return {?}
   */
  function releaseClose() {
    var t = window.pintrk.partnerData || {};
    return self.ot && ("boolean" != typeof t.fp_localStorage || t.fp_localStorage);
  }
  /**
   * @param {string} mode
   * @param {string} name
   * @param {!Date} val
   * @return {undefined}
   */
  function done(mode, name, val) {
    /** @type {string} */
    var retryLinkHref = window.location.hostname.replace("www.", "");
    /** @type {string} */
    document.cookie = mode + "=" + name + "; expires=" + val.toUTCString() + "; path=/; domain=." + retryLinkHref + ";";
  }
  /**
   * @param {string} key
   * @param {string} parent
   * @param {string} val
   * @return {undefined}
   */
  function cb(key, parent, val) {
    var date = 2 < arguments.length && void 0 !== val ? val : function(value) {
      var date;
      var lifetime_days = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
      if (value) {
        return (date = new Date(value)).setDate(date.getDate() + lifetime_days), date;
      }
    }(new Date, artistTrack);
    if (!(!show() || date < new Date)) {
      if (key && parent) {
        self.st.setItem(key, JSON.stringify({
          value : parent,
          expires : date
        }));
      }
    }
  }
  /**
   * @return {undefined}
   */
  function reset() {
    if (show() && !store()) {
      var $__4;
      var ret = filter(Object.values(res));
      try {
        ret.s();
        for (; !($__4 = ret.n()).done;) {
          var value = $__4.value;
          if (!(!getItem() || !self.st.getItem(value) || value in Object.values(data))) {
            window.localStorage.setItem(value, self.st.getItem(value));
          }
        }
      } catch (r) {
        ret.e(r);
      } finally {
        ret.f();
      }
    }
  }
  /**
   * @param {string} at
   * @return {undefined}
   */
  function match(at) {
    if (getItem()) {
      window.localStorage.removeItem(at);
    }
  }
  /**
   * @return {undefined}
   */
  function draw() {
    var item;
    var ret = filter(Object.values(data).concat(Object.values(res)));
    try {
      ret.s();
      for (; !(item = ret.n()).done;) {
        match(item.value);
      }
    } catch (r) {
      ret.e(r);
    } finally {
      ret.f();
    }
  }
  /**
   * @return {undefined}
   */
  function ready() {
    if (self.ut(), expect(source), getItem()) {
      /** @type {number} */
      var s = 0;
      /** @type {!Array<?>} */
      var n = Object.values(obj);
      for (; s < n.length; s++) {
        var i = n[s];
        window.sessionStorage.removeItem(i);
      }
      window.sessionStorage.removeItem(i);
    }
    draw();
  }
  /**
   * @return {?}
   */
  function store() {
    return null != self.at.isEu ? self.at.isEu : !getItem() || func(window.sessionStorage.getItem(i));
  }
  /**
   * @param {!Object} t
   * @param {!Array} view
   * @param {number} size
   * @param {number} title
   * @return {undefined}
   */
  function test(t, view, size, title) {
    var d;
    var e;
    var s = 2 < arguments.length && void 0 !== size ? size : self.et.UNSPECIFIED;
    var add_title_to_td = 3 < arguments.length && void 0 !== title && title;
    /** @type {!Object} */
    var value = t;
    s = (value[original] = self.ft(), value[lastPropName] = "".concat(s.toString(), ",").concat((d = self.et, e = s, Object.keys(d).filter(function(key) {
      return d[key] === e;
    }))[0]), add_title_to_td && (value[reverse.SKIP_TAG_CONFIG] = true), self.ht(name, self.ct(value)));
    self.lt(s, true, view);
  }
  /**
   * @return {undefined}
   */
  function handleSsjsError() {
    var contentType = this.getResponseHeader(type);
    if (contentType && contentType.includes("application/json")) {
      var n;
      try {
        n = JSON.parse(this.responseText).xff;
        window.pintrk.piaa = n;
      } catch (t) {
      }
    }
  }
  /**
   * @return {undefined}
   */
  function processData() {
    if (!(window.pintrk.derivedCalled && log(data.DERIVED_EPIK))) {
      /** @type {boolean} */
      window.pintrk.derivedCalled = true;
      push(data.DERIVED_EPIK, this.getResponseHeader(resolve));
      load(res.DERIVED_EPIK, this.getResponseHeader(resolve));
      callback(parse(), data.DERIVED_EPIK, null, res.DERIVED_EPIK, progress);
    }
  }
  /**
   * @return {undefined}
   */
  function init() {
    push(data.UNAUTH, this.getResponseHeader(path));
    load(res.UNAUTH, this.getResponseHeader(path));
    callback(parse(), data.UNAUTH, this.getResponseHeader(path), res.UNAUTH, applications);
    var result = this.getResponseHeader(type);
    if (result && result.includes("application/json")) {
      var val;
      result = {};
      try {
        /** @type {*} */
        result = JSON.parse(this.responseText);
      } catch (t) {
      }
      if (all(result), result.ecmOriginTrialToken && "string" == typeof result.ecmOriginTrialToken && 10 <= result.ecmOriginTrialToken.length && self.dt(result.ecmOriginTrialToken), void 0 === self.at.ctEpikIframeEnabled && error(result.ctEpikIframeEnabled), void 0 === self.at.chromeNewUserAgentEnabled && (self.at.chromeNewUserAgentEnabled = round(result.chromeNewUserAgentEnabled)), void 0 === self.at.isEu && (val = func(result.isEu), self.at.isEu = val, "boolean" == typeof self.at.isEu && self.at.isEu && 
      draw(), getItem()) && replace() && window.sessionStorage.setItem(i, val), (store() ? draw : reset)(), val = result.piaaEndPoint, window.pintrk.piaa && 6 < window.pintrk.piaa.length || val && 10 < val.length && self.lt(val, false, [handleSsjsError]), self.at.tagConfigsReceived = true, self.wt(self.it.SCRAPE_LISTENERS.chance) && !window.pintrk.setupEmailListeners) {
        /** @type {boolean} */
        window.pintrk.setupEmailListeners = true;
        var step;
        var ret = filter(document.querySelectorAll(element));
        try {
          ret.s();
          for (; !(step = ret.n()).done;) {
            step.value.addEventListener("change", function(t) {
              remove(t.target.value, event, options);
              if (replace() && window.pintrk.partnerData && window.pintrk.partnerData.aem && !log(data.DERIVED_EPIK)) {
                test({
                  pd : {
                    aem : window.pintrk.partnerData.aem
                  }
                }, [processData], self.et.LISTENER_SCRAPE);
              }
            });
          }
        } catch (r) {
          ret.e(r);
        } finally {
          ret.f();
        }
      }
    }
  }
  /**
   * @return {?}
   */
  function show() {
    return "boolean" == typeof print ? print : print = self.wt(self.it.FP_LOCAL_STORAGE.chance);
  }
  /**
   * @param {string} id
   * @param {string} name
   * @return {undefined}
   */
  function load(id, name) {
    if (show() && id && name && "empty" !== name && !store()) {
      if (releaseClose()) {
        cb(id, name);
      } else {
        draw();
      }
    }
  }
  /**
   * @param {string} e
   * @param {string} value
   * @return {undefined}
   */
  function push(e, value) {
    var date;
    if (value && "empty" !== value) {
      (date = new Date).setDate(date.getDate() + lifetime_days);
      done(e, value, date);
    }
  }
  /**
   * @param {string} method
   * @param {number} context
   * @return {?}
   */
  function log(method, context) {
    return (1 < arguments.length && void 0 !== context ? context : parse())[method];
  }
  /**
   * @param {string} key
   * @return {?}
   */
  function update(key) {
    if (show()) {
      if (key && !store()) {
        if (getItem() && releaseClose()) {
          /** @type {*} */
          var event = JSON.parse(window.localStorage.getItem(key), function(undefined, val) {
            return "expires" == undefined ? new Date(val) : val;
          });
          if (event && event.expires >= new Date) {
            return event.value;
          }
          match(key);
        } else {
          draw();
        }
      } else {
        match(key);
      }
    }
    return null;
  }
  /**
   * @param {string} x
   * @param {string} y
   * @return {?}
   */
  function dot2D(x, y) {
    return x && y ? canvas.COOKIE_AND_LOCAL_STORAGE : x ? canvas.COOKIE_ONLY : y ? canvas.LOCAL_STORAGE_ONLY : null;
  }
  /**
   * @return {?}
   */
  function parse() {
    var _step2;
    var res = {};
    var ret = filter(document.cookie.split("; "));
    try {
      ret.s();
      for (; !(_step2 = ret.n()).done;) {
        var id = _step2.value;
        var idx = id.indexOf("=");
        /** @type {!Array} */
        var r = [id.substring(0, idx), id.substring(idx + 1)];
        if (2 == r.length && r[0] && r[1]) {
          res[r[0]] = r[1];
        }
      }
    } catch (r) {
      ret.e(r);
    } finally {
      ret.f();
    }
    return res;
  }
  /**
   * @param {string} t
   * @return {?}
   */
  function get(t) {
    return (new URLSearchParams(window.location.search)).get(t);
  }
  /**
   * @param {!Object} obj
   * @return {undefined}
   */
  function $(obj) {
    /** @type {!Object} */
    window.pintrk.partnerData = Object.assign({}, window.pintrk.partnerData, obj);
  }
  /**
   * @param {?} name
   * @return {?}
   */
  function f(name) {
    return void 0 === name || (name = name.toString().trim().toLowerCase(), reBlockName.test(name)) || _tacet.test(name) || regIsJS.test(name) ? name : failcb(7)("sha256").update(name).digest("hex");
  }
  /**
   * @param {!Object} o
   * @return {undefined}
   */
  function extend(o) {
    if (k in o) {
      o[k] = f(o[k]);
    }
  }
  /**
   * @param {?} name
   * @param {(RegExp|string)} file
   * @return {?}
   */
  function find(name, file) {
    return !(!name || "string" != typeof name || !file.test(name));
  }
  /**
   * @param {!Object} o
   * @return {undefined}
   */
  function render(o) {
    if (o && "object" === stringify(o)) {
      extend(o);
      /** @type {!Object} */
      result = o;
      operators.forEach(function(name) {
        if (name in result) {
          result[name] = f(result[name]);
        }
      });
      var _step;
      var t = o[timing];
      var map = (void 0 !== t && (error(t), delete o[timing]), o);
      var ret = filter(item);
      try {
        ret.s();
        for (; !(_step = ret.n()).done;) {
          var result = _step.value;
          var bool = map[result.pdConfigKey];
          if (void 0 !== bool) {
            next(result.tagConfigKey, bool, result.pdKeyList);
            expect(result.pdConfigKey);
            delete map[result.pdConfigKey];
          }
        }
      } catch (r) {
        ret.e(r);
      } finally {
        ret.f();
      }
      t = o[prop];
      if (void 0 !== t) {
        t = round(t);
        self.at.chromeNewUserAgentEnabled = t;
        delete o[prop];
      }
      $(o);
    }
    var result;
  }
  /**
   * @param {number} y
   * @return {undefined}
   */
  function error(y) {
    y = round(y);
    if (self.at.ctEpikIframeEnabled = y) {
      window.addEventListener("message", generate);
      if ("complete" === document.readyState) {
        initGoogleTagManager();
      } else {
        window.addEventListener("load", initGoogleTagManager);
      }
    } else {
      expect(source);
      expect(option);
    }
  }
  /**
   * @return {undefined}
   */
  function initGoogleTagManager() {
    /** @type {!Element} */
    var layer = document.createElement("iframe");
    /** @type {string} */
    layer.id = source;
    /** @type {string} */
    layer.src = "https://ct.pinterest.com/ct.html";
    /** @type {number} */
    layer.width = 1;
    /** @type {number} */
    layer.height = 1;
    /** @type {string} */
    layer.style.display = "none";
    document.body.appendChild(layer);
  }
  /**
   * @param {string} value
   * @return {undefined}
   */
  function generate(value) {
    if ("https://ct.pinterest.com" == value.origin && "_epik_localstore" === value.data.key) {
      if (value.data.value) {
        var d = {};
        try {
          /** @type {*} */
          d = JSON.parse(value.data.value);
        } catch (t) {
        }
        var data;
        value = d.expiry || 0;
        d = d.value;
        if (value > (new Date).getTime() && d) {
          (data = {})[source] = d;
          /** @type {string} */
          data[option] = value + "";
          $(data);
        }
      }
      if (null != (d = document.getElementById(source)) && null != d.parentNode) {
        d.parentNode.removeChild(d);
      }
    }
  }
  /**
   * @param {?} p
   * @param {number} val
   * @param {!Object} i
   * @return {undefined}
   */
  function next(p, val, i) {
    val = round(val);
    if (!val) {
      var step;
      var ret = filter(i);
      try {
        ret.s();
        for (; !(step = ret.n()).done;) {
          expect(step.value);
        }
      } catch (r) {
        ret.e(r);
      } finally {
        ret.f();
      }
    }
    /** @type {number} */
    self.at[p] = val;
  }
  /**
   * @param {string} type
   * @return {undefined}
   */
  function expect(type) {
    if (window.pintrk && window.pintrk.partnerData && void 0 !== window.pintrk.partnerData[type]) {
      delete window.pintrk.partnerData[type];
    }
  }
  /**
   * @param {string} type
   * @return {undefined}
   */
  function create(type) {
    var _step2;
    /** @type {!Array} */
    var entity = item;
    var ret = filter(document.getElementsByTagName(type));
    try {
      ret.s();
      for (; !(_step2 = ret.n()).done;) {
        var _step6;
        var o = _step2.value;
        var ret = filter(entity);
        try {
          ret.s();
          for (; !(_step6 = ret.n()).done;) {
            var $__4;
            var v = _step6.value;
            var ret = filter(v.helperList);
            try {
              ret.s();
              for (; !($__4 = ret.n()).done;) {
                var item = $__4.value;
                if ("input" === type) {
                  if (find(o.name, item.fieldRegex)) {
                    remove(o.value, item, v.tagConfigKey);
                  }
                } else {
                  if ("select" === type && item.selectScrapingEnabled && find(o.name, item.fieldRegex)) {
                    remove(o.value, item, v.tagConfigKey);
                  }
                }
              }
            } catch (r) {
              ret.e(r);
            } finally {
              ret.f();
            }
          }
        } catch (r) {
          ret.e(r);
        } finally {
          ret.f();
        }
      }
    } catch (r) {
      ret.e(r);
    } finally {
      ret.f();
    }
  }
  /**
   * @param {string} s
   * @param {?} options
   * @param {!Object} source
   * @return {undefined}
   */
  function remove(s, options, source) {
    if (s && "string" == typeof s && options.valueRegex.test(s.trim().toLowerCase())) {
      s = f((s = options.normalizationRegex ? s.replace(options.normalizationRegex, "") : s).trim().toLowerCase());
      if (self.at[source]) {
        /** @type {string} */
        (pdKeyObject = {})[options.pdKey] = s;
        $(pdKeyObject);
      }
      (source = window.pintrk.partnerData && window.pintrk.partnerData.aem_eligible_list ? window.pintrk.partnerData.aem_eligible_list : []).push(options.aemEligibleKey);
      $({
        aem_eligible_list : source.filter(function(v, i, acceptedPropertyValues) {
          return acceptedPropertyValues.indexOf(v) === i;
        })
      });
    }
  }
  /**
   * @param {?} data
   * @return {undefined}
   */
  function all(data) {
    var $__2;
    var ret = filter(item);
    try {
      ret.s();
      for (; !($__2 = ret.n()).done;) {
        var params = $__2.value;
        var i = params.tagConfigKey;
        if (void 0 === self.at[i]) {
          next(i, data[i], params.pdKeyList);
        }
      }
    } catch (r) {
      ret.e(r);
    } finally {
      ret.f();
    }
  }
  /**
   * @return {undefined}
   */
  function save() {
    var step;
    var ret = filter(document.querySelectorAll(element));
    try {
      ret.s();
      for (; !(step = ret.n()).done;) {
        remove(step.value.value, event, options);
      }
    } catch (r) {
      ret.e(r);
    } finally {
      ret.f();
    }
    create("input");
    create("select");
  }
  /**
   * @param {!Object} entity
   * @param {string} text
   * @param {string} callback
   * @param {?} e
   * @param {!Array} x
   * @return {undefined}
   */
  function debug(entity, text, callback, e, x) {
    if (entity && entity[callback]) {
      (pdKeyObject = {})[e.pdKey] = f(text.trim().toLowerCase());
      $(pdKeyObject);
    }
    if (-1 === x.indexOf(e.aemEligibleKey)) {
      x.push(e.aemEligibleKey);
    }
  }
  var self = {};
  /** @type {string} */
  var lastPropName = (self.it = {
    FP_LOCAL_STORAGE : {
      chance : 100,
      uri : "fp_localStorage"
    },
    DERIVED_EPIK : {
      chance : 100,
      uri : "pin-derived-epik"
    },
    SCRAPE_LISTENERS : {
      chance : 100,
      uri : "pin-scrape-listeners"
    },
    FETCH_API_V3 : {
      chance : 0,
      uri : "pin-fetch-api-v3"
    }
  }, "dep");
  var reverse = (self.et = {
    UNSPECIFIED : 0,
    LISTENER_SCRAPE : 1,
    PAGE_LOAD : 2,
    EVENT_SHOPIFY_SCRAPE : 3,
    TAGS_RECEIVED : 4,
    EVENT_TAGS_ABSENT : 5
  }, {
    SKIP_TAG_CONFIG : "stc"
  });
  /** @type {number} */
  var artistTrack = 365;
  /** @type {string} */
  var consolePrefix = "Pinterest Tag Error: ";
  /** @type {string} */
  var storageType = "Pinterest Tag Warning: ";
  /** @type {string} */
  var prefix = "https://ct.pinterest.com";
  /** @type {string} */
  var id = prefix + "/v3/";
  /** @type {string} */
  var name = prefix + "/user/";
  /** @type {string} */
  var original = "cb";
  /** @type {string} */
  var nm = "event";
  /** @type {string} */
  prefix = "aem_country";
  /** @type {!Array} */
  var H = ["aem"];
  /** @type {!Array} */
  var Z = ["aem_fn", "aem_ln"];
  /** @type {!Array} */
  var W = ["aem_ph"];
  /** @type {!Array} */
  var Y = ["aem_ge"];
  /** @type {!Array} */
  var Q = ["aem_db"];
  /** @type {!Array} */
  var FormatOptions = ["aem_ct", "aem_st", "aem_zp", prefix];
  /** @type {string} */
  var k = "em";
  /** @type {!Array} */
  var operators = ["fn", "ln", "ph", "ge", "db", "ct", "st", "zp", "country", "external_id"];
  /** @type {string} */
  var seen = "checkout";
  /** @type {!Array} */
  var keys = ["pagevisit", "viewcategory", "search", "addtocart", seen, "watchvideo", "signup", "lead", "custom", "externalmeasurement"];
  var data = {
    EPIK : "_epik",
    DERIVED_EPIK : "_derived_epik",
    UNAUTH : "_pin_unauth"
  };
  var res = {
    EPIK : "_epik_ls",
    DERIVED_EPIK : "_derived_epik_ls",
    UNAUTH : "_pin_unauth_ls"
  };
  var canvas = {
    LOCAL_STORAGE_ONLY : "ls",
    COOKIE_ONLY : "fpc",
    COOKIE_AND_LOCAL_STORAGE : "fpc_ls"
  };
  var obj = {
    NATIVE_CHECKOUT : "ssp_nsc",
    IAB_ANDROID : "ssp_iaba",
    IAB_IOS : "ssp_iabi"
  };
  /** @type {string} */
  var progress = "derived_epik";
  /** @type {string} */
  var resolve = "Epik";
  /** @type {string} */
  var source = "epik_localstore";
  /** @type {string} */
  var option = "epik_ls_expiry_ms";
  /** @type {string} */
  var applications = "pin_unauth";
  /** @type {string} */
  var path = "Pin-Unauth";
  /** @type {string} */
  var type = "Content-Type";
  /** @type {number} */
  var lifetime_days = 365;
  /** @type {string} */
  var i = "is_eu";
  /** @type {!Array} */
  var properties = ["load", "page", "set", "track", "setConsent"];
  /** @type {string} */
  var element = "input[type=email],input[type=username],input[type=userid],input[name=username],input[name=userid],input[autocomplete=username],input[autocomplete=userid],input[autocomplete=email]";
  /** @type {!RegExp} */
  var reBlockName = /^[a-f0-9]{64}$/i;
  /** @type {!RegExp} */
  var _tacet = /^[a-f0-9]{40}$/i;
  /** @type {!RegExp} */
  var regIsJS = /^[a-f0-9]{32}$/i;
  /** @type {!RegExp} */
  var url = /^https?:\/\/.*\.(pinterest|pinterdev)\.com$/i;
  /** @type {!RegExp} */
  var regISJS = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
  /** @type {!RegExp} */
  var currencyRegExp = /(.+)/;
  /** @type {!RegExp} */
  var validatorPattern = /^[0-9 \-+\(\)\/]*$/;
  /** @type {!RegExp} */
  var loaderDef = /^[0-9\- ]*$/;
  /** @type {!RegExp} */
  var reBaseText = /(.+)/;
  /** @type {!RegExp} */
  var rpreversion = /checkouts\/(.+)\/(thank_you|post_purchase)/;
  /** @type {!RegExp} */
  var VALID_IDENTIFIER_EXPR = /(spf-test-page)|(test\/ct\/.*spf-t)/;
  /** @type {string} */
  var options = (self.rt = JSON && JSON.stringify, self.ot = true, "aemEnabled");
  /** @type {string} */
  var series = "aemFnLnEnabled";
  /** @type {string} */
  var setTrailViewOffset = "aemPhEnabled";
  /** @type {string} */
  var innerTimer = "aemLocEnabled";
  /** @type {string} */
  var timing = "ct_epik_iframe_enabled";
  /** @type {string} */
  var prop = "chrome_new_user_agent_enabled";
  var event = {
    fieldRegex : /e[-_.]?mail/i,
    valueRegex : regISJS,
    pdKey : "aem",
    aemEligibleKey : "em"
  };
  var shasumUrl = {
    fieldRegex : /(?=^(?!.*(credit|pass|last|^l[._-]?name|name[._-]?l|family|sur)).*$)(.*name)/i,
    valueRegex : currencyRegExp,
    pdKey : "aem_fn",
    aemEligibleKey : "fn"
  };
  var sharedFlag = {
    fieldRegex : /(?=^(?!.*(credit|pass|first|^f[._-]?name|name[._-]?f|full|display|your|given|fore|user)).*$)(.*last[._-]?name|.*family[._-]?name|.*sur[._-]?name|^l[._-]?name|.*name[._-]?l)/i,
    valueRegex : currencyRegExp,
    pdKey : "aem_ln",
    aemEligibleKey : "ln"
  };
  var uboard = {
    fieldRegex : /tele|callback|cell|phone|mobile/i,
    valueRegex : validatorPattern,
    pdKey : "aem_ph",
    aemEligibleKey : "ph",
    normalizationRegex : /\D+/g
  };
  var responseBodyLength = {
    fieldRegex : /city/i,
    valueRegex : reBaseText,
    pdKey : "aem_ct",
    aemEligibleKey : "ct"
  };
  var tokensToRemove = {
    fieldRegex : /state|province/i,
    valueRegex : reBaseText,
    pdKey : "aem_st",
    aemEligibleKey : "st",
    selectScrapingEnabled : true
  };
  var newRT = {
    fieldRegex : /postal|post[._-]?code|zip/i,
    valueRegex : loaderDef,
    pdKey : "aem_zp",
    aemEligibleKey : "zp"
  };
  var nberr = {
    fieldRegex : /country/i,
    valueRegex : reBaseText,
    pdKey : prefix,
    aemEligibleKey : "country",
    selectScrapingEnabled : true
  };
  /** @type {!Array} */
  var item = [{
    tagConfigKey : options,
    pdConfigKey : "debug_aem_enabled",
    pdKeyList : H,
    helperList : [event]
  }, {
    tagConfigKey : series,
    pdConfigKey : "debug_aem_fnln_enabled",
    pdKeyList : Z,
    helperList : [shasumUrl, sharedFlag]
  }, {
    tagConfigKey : setTrailViewOffset,
    pdConfigKey : "debug_aem_ph_enabled",
    pdKeyList : W,
    helperList : [uboard]
  }, {
    tagConfigKey : "aemGeEnabled",
    pdConfigKey : "debug_aem_ge_enabled",
    pdKeyList : Y,
    helperList : [{
      fieldRegex : /gender/i,
      valueRegex : /^(?:m|male|f|female|nb|non[._-]?binary)$/i,
      pdKey : "aem_ge",
      aemEligibleKey : "ge"
    }]
  }, {
    tagConfigKey : "aemDbEnabled",
    pdConfigKey : "debug_aem_db_enabled",
    pdKeyList : Q,
    helperList : [{
      fieldRegex : /birthday|birthdate|dob/i,
      valueRegex : /^[0-3]?[0-9]\/[0-3]?[0-9]\/(?:[0-9]{2})?[0-9]{2}$/,
      pdKey : "aem_db",
      aemEligibleKey : "db"
    }]
  }, {
    tagConfigKey : innerTimer,
    pdConfigKey : "debug_aem_loc_enabled",
    pdKeyList : FormatOptions,
    helperList : [responseBodyLength, tokensToRemove, newRT, nberr]
  }];
  var print = void 0;
  self.st = {
    data : {},
    setItem : function(name, value) {
      this.data[name] = value || "";
    },
    getItem : function(id) {
      return void 0 === this.data[id] ? null : this.data[id];
    },
    removeItem : function(index) {
      delete this.data[index];
    },
    length : function() {
      return Object.keys(this.data).length;
    }
  };
  self.at = {
    aemEnabled : void 0,
    aemFnLnEnabled : void 0,
    aemPhEnabled : void 0,
    aemGeEnabled : void 0,
    aemDbEnabled : void 0,
    aemLocEnabled : void 0,
    ctEpikIframeEnabled : void 0,
    chromeNewUserAgentEnabled : void 0,
    isEu : void 0,
    tagConfigsReceived : false,
    epikDataSource : void 0,
    derivedEpikDataSource : void 0,
    unauthIdDataSource : void 0
  };
  /**
   * @return {undefined}
   */
  self.ut = function() {
    /** @type {number} */
    var layer_i = 0;
    /** @type {!Array<?>} */
    var crossfilterable_layers = Object.values(data);
    for (; layer_i < crossfilterable_layers.length; layer_i++) {
      done(crossfilterable_layers[layer_i], "", new Date(0));
    }
  };
  /**
   * @param {!Object} target
   * @param {boolean} value
   * @param {!Array} msg
   * @return {undefined}
   */
  self.lt = function(target, value, msg) {
    var params;
    if (self.ot) {
      (params = new window.XMLHttpRequest).open("GET", target, true);
      /** @type {boolean} */
      params.withCredentials = value;
      /** @type {!Array} */
      params.callbacks = msg;
      /** @type {!Array<?>} */
      params.arguments = Array.prototype.slice.call(arguments, 2);
      /**
       * @return {undefined}
       */
      params.onload = function() {
        var _s;
        var ret = filter(this.callbacks);
        try {
          ret.s();
          for (; !(_s = ret.n()).done;) {
            _s.value.apply(this, this.arguments);
          }
        } catch (r) {
          ret.e(r);
        } finally {
          ret.f();
        }
      };
      /**
       * @return {undefined}
       */
      params.onerror = function() {
        console.error(this.statusText);
      };
      params.send(null);
    }
  };
  /**
   * @param {string} name
   * @return {undefined}
   */
  self.dt = function(name) {
    /** @type {!Element} */
    var meta = document.createElement("meta");
    /** @type {string} */
    meta.httpEquiv = "origin-trial";
    /** @type {string} */
    meta.content = name;
    document.head.appendChild(meta);
  };
  /**
   * @return {?}
   */
  var getItem = function() {
    try {
      return window.sessionStorage.getItem("test"), window.localStorage.getItem("test"), true;
    } catch (t) {
      return false;
    }
  };
  /**
   * @param {number} prop
   * @return {?}
   */
  self.wt = function(prop) {
    return 100 * Math.random() < (prop || 0);
  };
  /**
   * @return {undefined}
   */
  self.activate = function() {
    if (window.pintrk && window.pintrk.queue) {
      if (!window.pintrk.version) {
        /** @type {string} */
        window.pintrk.version = "3.0";
      }
      var q = window.pintrk.queue;
      if (q.push === Array.prototype.push) {
        /**
         * @param {?} args
         * @return {undefined}
         */
        var next = function(args) {
          var name = (args = function(a) {
            if ("0" in a && !(a instanceof Array)) {
              /** @type {!Array} */
              var na = [];
              /** @type {number} */
              var default_favicon = 0;
              for (; default_favicon.toString() in a;) {
                na.push(a[default_favicon.toString()]);
                default_favicon++;
              }
              /** @type {!Array} */
              a = na;
            }
            return a;
          }(args)).shift();
          if ("string" != typeof name) {
            fn("pintrk command", name, "string");
          } else {
            /** @type {string} */
            name = name.trim().toLowerCase();
            if (self[name]) {
              self[name](args);
            } else {
              console.error(consolePrefix + "'%s' is not a supported pintrk command. Expected one of [%s]", name, properties.toString());
            }
          }
        };
        var i = q.length;
        /** @type {number} */
        var nextCreation = 0;
        for (; nextCreation < i; nextCreation++) {
          next(q.shift());
        }
        /** @type {function(?): undefined} */
        q.push = next;
        if (window !== window.parent) {
          window.addEventListener("message", onCleanupCsDone);
        }
      }
    }
  };
  /**
   * @param {!Object} result
   * @return {undefined}
   */
  self.load = function(result) {
    result = map(result, 2);
    var value = result[0];
    result = result[1];
    /** @type {number} */
    var i = 0;
    /** @type {!Array<Array<?>>} */
    var array = Object.entries(self.it);
    for (; i < array.length; i++) {
      var r = map(array[i], 2);
      var el = r[0];
      if ("true" === get(r[1].uri)) {
        /** @type {number} */
        self.it[el].chance = 100;
      }
    }
    if (value = process(value)) {
      if (window.pintrk.tagId) {
        console.error(consolePrefix + "'load' command was called multiple times.  Previously for tag id '%s', now for tag id '%s'.", window.pintrk.tagId, value);
      }
      window.pintrk.tagId = value;
    }
    render(result);
    if (!store() && replace() && releaseClose()) {
      (function(data) {
        var root = 0 < arguments.length && void 0 !== data ? data : parse();
        if (show()) {
          /** @type {number} */
          var i = 0;
          /** @type {!Array<string>} */
          var all_keys = Object.keys(data);
          for (; i < all_keys.length; i++) {
            /** @type {string} */
            var key = all_keys[i];
            var component = data[key];
            /** @type {boolean} */
            var a = !!root[component];
            /** @type {boolean} */
            var b = !!update(res[key]);
            switch(component) {
              case data.EPIK:
                self.at.epikDataSource = dot2D(a, b);
                break;
              case data.DERIVED_EPIK:
                self.at.derivedEpikDataSource = dot2D(a, b);
                break;
              case data.UNAUTH:
                self.at.unauthIdDataSource = dot2D(a, b);
            }
          }
        }
      })(parse());
    }
    if (getItem() && replace() && ("1" === get(obj.NATIVE_CHECKOUT) && window.sessionStorage.setItem(obj.NATIVE_CHECKOUT, self.ft()), value = parseInt(get(obj.IAB_IOS)), null != (result = value) && Number(result) == result && (new Date).getTime() - result <= 3e5 && window.sessionStorage.setItem(obj.IAB_IOS, value), document.referrer && document.referrer.startsWith("android-app") && document.referrer.includes("com.pinterest") && window.sessionStorage.setItem(obj.IAB_ANDROID, self.ft()), result = navigator.userAgent) && 
    window.chrome && -1 < result.toLowerCase().indexOf("chrome") && -1 === result.toLowerCase().indexOf("edg/") && !window.opr) {
      /** @type {string} */
      (value = document.createElement("meta")).httpEquiv = "origin-trial";
      /** @type {string} */
      value.content = "A9NDHLTHKsZgo1JfHpPijEEQTGPA3Jm+mEE45Y3SOdTG4BULBZiDsziPMmseoj/wnnWJnQR5gjiUWFVIx3+2+w0AAAB9eyJvcmlnaW4iOiJodHRwczovL2N0LnBpbnRlcmVzdC5jb206NDQzIiwiZmVhdHVyZSI6IlNlbmRGdWxsVXNlckFnZW50QWZ0ZXJSZWR1Y3Rpb24iLCJleHBpcnkiOjE2ODQ4ODYzOTksImlzVGhpcmRQYXJ0eSI6dHJ1ZX0=";
      document.head.append(value);
    }
  };
  /**
   * @param {number} item
   * @return {undefined}
   */
  self.setconsent = function(item) {
    item = map(item, 1)[0];
    self.ot = round(item);
    if (false === self.ot) {
      ready();
    }
  };
  /**
   * @param {!Function} t
   * @return {undefined}
   */
  self.set = function(t) {
    render(map(t, 1)[0]);
  };
  /**
   * @param {!Object} obj
   * @return {undefined}
   */
  self.page = function(obj) {
    obj = map(obj, 1)[0];
    var data = {};
    var tid = window.pintrk.tagId;
    if (tid) {
      data.tid = tid;
      if (obj) {
        if ("object" === stringify(obj)) {
          extend(obj);
          /** @type {!Object} */
          data.ov = obj;
        } else {
          console.warn(storageType + "Unexpected value passed to page command. Please consult the Pinterest Tag Guide for correct notation.");
        }
      }
      start(data);
      if (window.pintrk.partnerData) {
        data.pd = window.pintrk.partnerData;
      }
      /** @type {string} */
      data[nm] = "init";
      self.vt(data);
    } else {
      console.error(consolePrefix + "'page' command was called without first calling the 'load' command.  Forthcoming Pinterest tag events may fail.");
    }
  };
  /**
   * @param {!Object} obj
   * @return {?}
   */
  self.track = function(obj) {
    var c;
    var n;
    var version;
    obj = map(obj, 5);
    var name = obj[0];
    var item = obj[1];
    var callback = obj[2];
    var value = obj[3];
    obj = obj[4];
    var a = {};
    return name && "string" == typeof name ? (name = name.trim(), -1 === keys.indexOf(name.toLowerCase()) && console.warn(storageType + "'%s' is not a standard event name. You may use it to build audiences, but conversion reporting will not be available. Standard event names are: [%s]", name, keys.toString()), a[nm] = name) : fn("eventName", name, "string"), item && "object" === stringify(item) ? (void 0 === item.value || isNaN(item.value) || (item.value = Number(item.value)), fn("value", item.value, 
    "number"), name = "order_quantity", null == (version = item.order_quantity) || Number(version) == version && version % 1 == 0 || console.error(consolePrefix + "Expected '%s' to be an integer, but found '%s'", name, version), void 0 !== item.external_id && ($({
      external_id : f(item.external_id)
    }), delete item.external_id), name = function(group) {
      var t = {};
      /** @type {number} */
      var i = 0;
      /** @type {!Array<Array<?>>} */
      var changes = Object.entries(group);
      for (; i < changes.length; i++) {
        var r = map(changes[i], 2);
        var argName = r[0];
        r = r[1];
        t[argName] = "string" == typeof r && /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Za-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/.test(r) ? f(r) : r;
      }
      return t;
    }(item), a.ed = name) : fn("eventData", item, "object"), "function" != typeof callback && (fn("callback", callback, "function"), callback = null), (value = (value = process(value)) || window.pintrk.tagId) ? (a.tid = String(value).trim(), obj && "object" === stringify(obj) && (extend(obj), a.ov = obj), start(a), version = window.location.pathname, VALID_IDENTIFIER_EXPR.test(version) || window.pintrk.partnerData && "shopify" === window.pintrk.partnerData.np && rpreversion.test(version) ? test(a, 
    [processData, (c = a, n = callback, function() {
      try {
        var types;
        /** @type {*} */
        var d = tagConfig = JSON.parse(this.responseText);
        /** @type {!NodeList<Element>} */
        var data = document.getElementsByTagName("bdo");
        var year = window.pintrk.partnerData && window.pintrk.partnerData.aem_eligible_list ? window.pintrk.partnerData.aem_eligible_list : [];
        return data && data[0] && (data = data[0].textContent) && "string" == typeof data && regISJS.test(data.trim().toLowerCase()) && debug(d, data, options, event, year), (data = document.getElementsByTagName("address")) && data[0] && (data = data[0].innerHTML) && "string" == typeof data && (data = data.split("<br>")) && (data[0] && currencyRegExp.test(data[0].trim().toLowerCase()) && ((types = data[0].split(" ")) && 1 === types.length ? debug(d, types[0], series, sharedFlag, year) : types && 
        2 === types.length && (debug(d, types[0], series, shasumUrl, year), debug(d, types[1], series, sharedFlag, year))), 3 <= data.length && data[2] && (types = data[2].split(" ")) && (types[0] && reBaseText.test(types[0].trim().toLowerCase()) && debug(d, types[0], innerTimer, responseBodyLength, year), types[1] && reBaseText.test(types[1].trim().toLowerCase()) && debug(d, types[1], innerTimer, tokensToRemove, year), types[2]) && loaderDef.test(types[2].trim().toLowerCase()) && debug(d, types[2], 
        innerTimer, newRT, year), 4 <= data.length && data[3] && reBaseText.test(data[3].trim().toLowerCase()) && debug(d, data[3], innerTimer, nberr, year), 5 <= data.length) && data[4] && validatorPattern.test(data[4].trim().toLowerCase()) && debug(d, data[4], setTrailViewOffset, uboard, year), $({
          aem_eligible_list : year
        }), window.pintrk.partnerData && (c.pd = window.pintrk.partnerData), self.vt(c, n), 0;
      } catch (t) {
      }
    })], self.et.EVENT_SHOPIFY_SCRAPE) : self.at.tagConfigsReceived ? (save(), window.pintrk.partnerData && (a.pd = window.pintrk.partnerData), !self.wt(self.it.DERIVED_EPIK.chance) || log(data.DERIVED_EPIK) || update(res.DERIVED_EPIK) || test(a, [processData], self.et.TAGS_RECEIVED, true), self.vt(a, callback)) : test(a, [processData, self.yt(a, callback)], self.et.EVENT_TAGS_ABSENT)) : (console.error(consolePrefix + "'load' command was not called before 'track'.  Did you install the base code?"), 
    callback && callback(false, "The Pinterest Tag ID is missing.")), 0;
  };
  /**
   * @param {(Object|boolean)} id
   * @param {!Object} callback
   * @return {?}
   */
  self.yt = function(id, callback) {
    return function() {
      try {
        return all(tagConfig = JSON.parse(this.responseText)), save(), window.pintrk.partnerData && (id.pd = window.pintrk.partnerData), self.vt(id, callback), 0;
      } catch (t) {
      }
    };
  };
  /**
   * @param {(Object|boolean)} value
   * @param {!Object} target
   * @return {?}
   */
  self.vt = function(value, target) {
    var p;
    if (self.ot) {
      return p = self.bt(), function() {
        try {
          var u = navigator.userAgentData.getHighEntropyValues(["architecture", "bitness", "brands", "mobile", "model", "platform", "platformVersion", "uaFullVersion"]);
          return u ? Promise.resolve(u) : Promise.resolve(false);
        } catch (t) {
          return Promise.resolve(false);
        }
      }().catch(function(canCreateDiscussions) {
      }).then(function(o) {
        var t = p;
        o = (o && Object.assign(t, p, o), !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime) && !!document.featurePolicy && !!document.featurePolicy.allowedFeatures() && document.featurePolicy.allowedFeatures().includes("attribution-reporting"));
        o = (t.ecm_enabled = o, value.ad = t, value[original] = self.ft(), window.pintrk.piaa && 6 < window.pintrk.piaa.length && (value.piaa = window.pintrk.piaa), self.ct(value));
        if ((store() ? draw : reset)(), self.wt(self.it.FETCH_API_V3.chance)) {
          /** @type {!URLSearchParams} */
          var p = new URLSearchParams;
          /** @type {number} */
          var i = 0;
          /** @type {!Array<Array<?>>} */
          var array = Object.entries(o);
          for (; i < array.length; i++) {
            var result = map(array[i], 2);
            var cb = result[0];
            result = result[1];
            p.append(cb, encodeURIComponent(result));
          }
          fetch(id, {
            method : "POST",
            body : p
          }).then(function(canCreateDiscussions) {
            if (target) {
              target(true);
            }
          });
        } else {
          t = self.ht(id, o);
          if (t.length < 2048) {
            self.gt(t, target);
          } else {
            self._t(o, target);
          }
        }
        if (getItem() && replace() && o[nm] === seen) {
          window.sessionStorage.removeItem(obj.NATIVE_CHECKOUT);
        }
      });
    }
    if (target) {
      target(false, "No consent");
    }
  };
  /**
   * @return {?}
   */
  self.ft = function() {
    return (new Date).getTime();
  };
  /**
   * @param {string} ctor
   * @param {string} spec
   * @return {?}
   */
  self.ht = function(ctor, spec) {
    /** @type {string} */
    ctor = ctor + "?";
    /** @type {!Array} */
    var drilldownLevelLabels = [];
    /** @type {number} */
    var i = 0;
    /** @type {!Array<Array<?>>} */
    var parts = Object.entries(spec);
    for (; i < parts.length; i++) {
      var m = map(parts[i], 2);
      var name = m[0];
      m = m[1];
      drilldownLevelLabels.push(name + "=" + encodeURIComponent(m));
    }
    return ctor + drilldownLevelLabels.join("&");
  };
  /**
   * @param {!Object} id
   * @return {?}
   */
  self.ct = function(id) {
    var result = {};
    /** @type {number} */
    var i = 0;
    /** @type {!Array<Array<?>>} */
    var parts = Object.entries(id);
    for (; i < parts.length; i++) {
      var object = map(parts[i], 2);
      var id = object[0];
      object = object[1];
      if ("object" === stringify(object)) {
        if (self.rt) {
          /** @type {string} */
          result[id] = JSON.stringify(object);
        }
      } else {
        result[id] = object;
      }
    }
    return result;
  };
  /**
   * @return {?}
   */
  self.bt = function() {
    /** @type {null} */
    var sh = null;
    /** @type {null} */
    var w = null;
    sh = (screen && (sh = screen.height, w = screen.width), {
      loc : location.href,
      ref : document.referrer,
      if : window.top !== window,
      sh : sh,
      sw : w
    });
    w = (window.pintrk.mh && (sh.mh = window.pintrk.mh), getItem() && replace() && (window.sessionStorage.getItem(obj.NATIVE_CHECKOUT) && (sh[obj.NATIVE_CHECKOUT] = window.sessionStorage.getItem(obj.NATIVE_CHECKOUT)), window.sessionStorage.getItem(obj.IAB_IOS) && (sh[obj.IAB_IOS] = window.sessionStorage.getItem(obj.IAB_IOS)), window.sessionStorage.getItem(obj.IAB_ANDROID)) && (sh[obj.IAB_ANDROID] = window.sessionStorage.getItem(obj.IAB_ANDROID)), store());
    return null != w && (sh[i] = w), show() && (sh.epikDataSource = self.at.epikDataSource, sh.derivedEpikDataSource = self.at.derivedEpikDataSource, sh.unauthIdDataSource = self.at.unauthIdDataSource), sh;
  };
  /**
   * @param {!Element} elm
   * @param {!Function} data
   * @return {undefined}
   */
  self.Et = function(elm, data) {
    /**
     * @return {undefined}
     */
    function handler() {
      if (elm.detachEvent) {
        elm.detachEvent("onload", handler);
      } else {
        /** @type {null} */
        elm.onload = null;
      }
      data();
    }
    if (elm.attachEvent) {
      elm.attachEvent("onload", handler);
    } else {
      /** @type {function(): undefined} */
      elm.onload = handler;
    }
  };
  /**
   * @param {string} result
   * @param {!Object} target
   * @return {?}
   */
  self.gt = function(result, target) {
    /** @type {!Element} */
    var t = document.createElement("img");
    return t.src = result, self.Et(t, function() {
      if (target) {
        target(true);
      }
    }), t;
  };
  /**
   * @param {string} value
   * @param {!Object} context
   * @return {?}
   */
  self._t = function(value, context) {
    /**
     * @return {undefined}
     */
    function text() {
      document.body.appendChild(form);
    }
    /** @type {!Element} */
    var form = document.createElement("form");
    /** @type {string} */
    var target = (form.method = "post", form.action = id, form.acceptCharset = "utf-8", form.style.display = "none", "pintrk" + self.ft());
    /** @type {boolean} */
    var body = (form.target = target, !(!window.attachEvent || window.addEventListener));
    /** @type {!Element} */
    var a = document.createElement(body ? '<iframe name="' + target + '">' : "iframe");
    /** @type {string} */
    a.src = "";
    /** @type {string} */
    a.id = target;
    /** @type {string} */
    a.name = target;
    form.appendChild(a);
    self.Et(a, function() {
      /** @type {number} */
      var i = 0;
      /** @type {!Array<Array<?>>} */
      var parts = Object.entries(value);
      for (; i < parts.length; i++) {
        var m = map(parts[i], 2);
        var x = m[0];
        m = m[1];
        /** @type {!Element} */
        var a = document.createElement("input");
        a.name = x;
        a.value = m;
        form.appendChild(a);
      }
      self.Et(a, function() {
        form.parentNode.removeChild(form);
        if (context) {
          context(true);
        }
      });
      form.submit();
    });
    return "complete" === document.readyState ? text() : self.Et(window, text), form;
  };
  module.exports = self;
}, function(mixin, hash_fns, objectHash) {
  (hash_fns = mixin.exports = function(key) {
    key = key.toLowerCase();
    var Class = hash_fns[key];
    if (Class) {
      return new Class;
    }
    throw new Error(key + " is not supported (we accept pull requests)");
  }).sha = objectHash(8);
  hash_fns.sha1 = objectHash(13);
  hash_fns.sha224 = objectHash(14);
  hash_fns.sha256 = objectHash(3);
  hash_fns.sha384 = objectHash(15);
  hash_fns.sha512 = objectHash(4);
}, function(context, canCreateDiscussions, __webpack_require__) {
  !function(Buffer) {
    /**
     * @return {undefined}
     */
    function obj() {
      this.init();
      /** @type {!Array} */
      this.I = I;
      body.call(this, 64, 56);
    }
    var t = __webpack_require__(1);
    var body = __webpack_require__(2);
    /** @type {!Array} */
    var init_list = [1518500249, 1859775393, -1894007588, -899497514];
    /** @type {!Array} */
    var I = new Array(80);
    t(obj, body);
    /**
     * @return {?}
     */
    obj.prototype.init = function() {
      return this.j = 1732584193, this.K = 4023233417, this.N = 2562383102, this.k = 271733878, this.C = 3285377520, this;
    };
    /**
     * @param {?} b
     * @return {undefined}
     */
    obj.prototype.R = function(b) {
      var l = this.I;
      /** @type {number} */
      var e = 0 | this.j;
      /** @type {number} */
      var i = 0 | this.K;
      /** @type {number} */
      var p = 0 | this.N;
      /** @type {number} */
      var first = 0 | this.k;
      /** @type {number} */
      var classPart = 0 | this.C;
      /** @type {number} */
      var a = 0;
      for (; a < 16; ++a) {
        l[a] = b.readInt32BE(4 * a);
      }
      for (; a < 80; ++a) {
        /** @type {number} */
        l[a] = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16];
      }
      var k;
      var g;
      var j;
      /** @type {number} */
      var prop = 0;
      for (; prop < 80; ++prop) {
        /** @type {number} */
        var v = ~~(prop / 20);
        /** @type {number} */
        var s = 0 | (e << 5 | e >>> 27) + (k = i, g = p, j = first, 0 === (s = v) ? k & g | ~k & j : 2 === s ? k & g | k & j | g & j : k ^ g ^ j) + classPart + l[prop] + init_list[v];
        /** @type {number} */
        classPart = first;
        /** @type {number} */
        first = p;
        /** @type {number} */
        p = i << 30 | i >>> 2;
        /** @type {number} */
        i = e;
        /** @type {number} */
        e = s;
      }
      /** @type {number} */
      this.j = e + this.j | 0;
      /** @type {number} */
      this.K = i + this.K | 0;
      /** @type {number} */
      this.N = p + this.N | 0;
      /** @type {number} */
      this.k = first + this.k | 0;
      /** @type {number} */
      this.C = classPart + this.C | 0;
    };
    /**
     * @return {?}
     */
    obj.prototype.T = function() {
      var tempBuff = new Buffer(20);
      return tempBuff.writeInt32BE(0 | this.j, 0), tempBuff.writeInt32BE(0 | this.K, 4), tempBuff.writeInt32BE(0 | this.N, 8), tempBuff.writeInt32BE(0 | this.k, 12), tempBuff.writeInt32BE(0 | this.C, 16), tempBuff;
    };
    /** @type {function(): undefined} */
    context.exports = obj;
  }.call(this, __webpack_require__(0).Buffer);
}, function(module, n) {
  var g = function() {
    return this;
  }();
  try {
    g = g || (new Function("return this"))();
  } catch (t) {
    if ("object" == typeof window) {
      /** @type {!Window} */
      g = window;
    }
  }
  module.exports = g;
}, function(canCreateDiscussions, exports, i) {
  /**
   * @param {(number|string)} key
   * @return {?}
   */
  function require(key) {
    var i = key.length;
    if (0 < i % 4) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    key = key.indexOf("=");
    /** @type {number} */
    i = (key = -1 === key ? i : key) === i ? 0 : 4 - key % 4;
    return [key, i];
  }
  /**
   * @param {number} a
   * @return {?}
   */
  exports.byteLength = function(a) {
    a = require(a);
    var n = a[0];
    a = a[1];
    return 3 * (n + a) / 4 - a;
  };
  /**
   * @param {(number|string)} s
   * @return {?}
   */
  exports.toByteArray = function(s) {
    var LIMB_BITMASK;
    var i;
    var matches = require(s);
    var key = matches[0];
    matches = matches[1];
    var array = new Arr(function(unit, n) {
      return 3 * (unit + n) / 4 - n;
    }(key, matches));
    /** @type {number} */
    var item = 0;
    var ext = 0 < matches ? key - 4 : key;
    /** @type {number} */
    i = 0;
    for (; i < ext; i = i + 4) {
      /** @type {number} */
      LIMB_BITMASK = revLookup[s.charCodeAt(i)] << 18 | revLookup[s.charCodeAt(i + 1)] << 12 | revLookup[s.charCodeAt(i + 2)] << 6 | revLookup[s.charCodeAt(i + 3)];
      /** @type {number} */
      array[item++] = LIMB_BITMASK >> 16 & 255;
      /** @type {number} */
      array[item++] = LIMB_BITMASK >> 8 & 255;
      /** @type {number} */
      array[item++] = 255 & LIMB_BITMASK;
    }
    if (2 === matches) {
      /** @type {number} */
      LIMB_BITMASK = revLookup[s.charCodeAt(i)] << 2 | revLookup[s.charCodeAt(i + 1)] >> 4;
      /** @type {number} */
      array[item++] = 255 & LIMB_BITMASK;
    }
    if (1 === matches) {
      /** @type {number} */
      LIMB_BITMASK = revLookup[s.charCodeAt(i)] << 10 | revLookup[s.charCodeAt(i + 1)] << 4 | revLookup[s.charCodeAt(i + 2)] >> 2;
      /** @type {number} */
      array[item++] = LIMB_BITMASK >> 8 & 255;
      /** @type {number} */
      array[item++] = 255 & LIMB_BITMASK;
    }
    return array;
  };
  /**
   * @param {!Object} data
   * @return {?}
   */
  exports.fromByteArray = function(data) {
    var C;
    var length = data.length;
    /** @type {number} */
    var leftoverLength = length % 3;
    /** @type {!Array} */
    var r = [];
    /** @type {number} */
    var min = 0;
    /** @type {number} */
    var max = length - leftoverLength;
    for (; min < max; min = min + 16383) {
      r.push(function(c, cursor, snowflakeLength) {
        var cardStart;
        /** @type {!Array} */
        var r = [];
        /** @type {number} */
        var i = cursor;
        for (; i < snowflakeLength; i = i + 3) {
          /** @type {number} */
          cardStart = (c[i] << 16 & 16711680) + (c[i + 1] << 8 & 65280) + (255 & c[i + 2]);
          r.push(function(boardManager) {
            return c[boardManager >> 18 & 63] + c[boardManager >> 12 & 63] + c[boardManager >> 6 & 63] + c[63 & boardManager];
          }(cardStart));
        }
        return r.join("");
      }(data, min, max < min + 16383 ? max : min + 16383));
    }
    if (1 == leftoverLength) {
      C = data[length - 1];
      r.push(c[C >> 2] + c[C << 4 & 63] + "==");
    } else {
      if (2 == leftoverLength) {
        C = (data[length - 2] << 8) + data[length - 1];
        r.push(c[C >> 10] + c[C >> 4 & 63] + c[C << 2 & 63] + "=");
      }
    }
    return r.join("");
  };
  /** @type {!Array} */
  var c = [];
  /** @type {!Array} */
  var revLookup = [];
  /** @type {!Function} */
  var Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array;
  /** @type {string} */
  var obj = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  /** @type {number} */
  var i = 0;
  /** @type {number} */
  var patchLen = obj.length;
  for (; i < patchLen; ++i) {
    c[i] = obj[i];
    /** @type {number} */
    revLookup[obj.charCodeAt(i)] = i;
  }
  /** @type {number} */
  revLookup["-".charCodeAt(0)] = 62;
  /** @type {number} */
  revLookup["_".charCodeAt(0)] = 63;
}, function(canCreateDiscussions, asyncFile) {
  /**
   * @param {?} t
   * @param {number} n
   * @param {boolean} type
   * @param {number} offset
   * @param {number} s
   * @return {?}
   */
  asyncFile.read = function(t, n, type, offset, s) {
    var e;
    var m;
    /** @type {number} */
    var carry = 8 * s - offset - 1;
    /** @type {number} */
    var eMax = (1 << carry) - 1;
    /** @type {number} */
    var eBias = eMax >> 1;
    /** @type {number} */
    var bits = -7;
    /** @type {number} */
    var i = type ? s - 1 : 0;
    /** @type {number} */
    var res = type ? -1 : 1;
    s = t[n + i];
    /** @type {number} */
    i = i + res;
    /** @type {number} */
    e = s & (1 << -bits) - 1;
    /** @type {number} */
    s = s >> -bits;
    /** @type {number} */
    bits = bits + carry;
    for (; 0 < bits; e = 256 * e + t[n + i], i = i + res, bits = bits - 8) {
    }
    /** @type {number} */
    m = e & (1 << -bits) - 1;
    /** @type {number} */
    e = e >> -bits;
    bits = bits + offset;
    for (; 0 < bits; m = 256 * m + t[n + i], i = i + res, bits = bits - 8) {
    }
    if (0 === e) {
      /** @type {number} */
      e = 1 - eBias;
    } else {
      if (e === eMax) {
        return m ? NaN : 1 / 0 * (s ? -1 : 1);
      }
      m = m + Math.pow(2, offset);
      /** @type {number} */
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - offset);
  };
  /**
   * @param {!Object} source
   * @param {number} value
   * @param {number} x
   * @param {number} r
   * @param {number} mLen
   * @param {number} nBytes
   * @return {undefined}
   */
  asyncFile.write = function(source, value, x, r, mLen, nBytes) {
    var e;
    var m;
    /** @type {number} */
    var eLen = 8 * nBytes - mLen - 1;
    /** @type {number} */
    var eMax = (1 << eLen) - 1;
    /** @type {number} */
    var eBias = eMax >> 1;
    /** @type {number} */
    var determ = 23 === mLen ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    /** @type {number} */
    var j = r ? 0 : nBytes - 1;
    /** @type {number} */
    var i = r ? 1 : -1;
    /** @type {number} */
    nBytes = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
    /** @type {number} */
    value = Math.abs(value);
    if (isNaN(value) || value === 1 / 0) {
      /** @type {number} */
      m = isNaN(value) ? 1 : 0;
      /** @type {number} */
      e = eMax;
    } else {
      /** @type {number} */
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (r = Math.pow(2, -e)) < 1) {
        e--;
        /** @type {number} */
        r = r * 2;
      }
      if (2 <= (value = value + (1 <= e + eBias ? determ / r : determ * Math.pow(2, 1 - eBias))) * r) {
        e++;
        /** @type {number} */
        r = r / 2;
      }
      if (eMax <= e + eBias) {
        /** @type {number} */
        m = 0;
        /** @type {number} */
        e = eMax;
      } else {
        if (1 <= e + eBias) {
          /** @type {number} */
          m = (value * r - 1) * Math.pow(2, mLen);
          /** @type {number} */
          e = e + eBias;
        } else {
          /** @type {number} */
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          /** @type {number} */
          e = 0;
        }
      }
    }
    for (; 8 <= mLen; source[x + j] = 255 & m, j = j + i, m = m / 256, mLen = mLen - 8) {
    }
    /** @type {number} */
    e = e << mLen | m;
    eLen = eLen + mLen;
    for (; 0 < eLen; source[x + j] = 255 & e, j = j + i, e = e / 256, eLen = eLen - 8) {
    }
    source[x + j - i] |= 128 * nBytes;
  };
}, function(mixin, n) {
  /** @type {function(this:*): string} */
  var objectToString$2 = {}.toString;
  /** @type {function(*): boolean} */
  mixin.exports = Array.isArray || function(value) {
    return "[object Array]" == objectToString$2.call(value);
  };
}, function(context, canCreateDiscussions, __webpack_require__) {
  !function(Buffer) {
    /**
     * @return {undefined}
     */
    function obj() {
      this.init();
      /** @type {!Array} */
      this.I = I;
      body.call(this, 64, 56);
    }
    var t = __webpack_require__(1);
    var body = __webpack_require__(2);
    /** @type {!Array} */
    var nextIdLookup = [1518500249, 1859775393, -1894007588, -899497514];
    /** @type {!Array} */
    var I = new Array(80);
    t(obj, body);
    /**
     * @return {?}
     */
    obj.prototype.init = function() {
      return this.j = 1732584193, this.K = 4023233417, this.N = 2562383102, this.k = 271733878, this.C = 3285377520, this;
    };
    /**
     * @param {?} b
     * @return {undefined}
     */
    obj.prototype.R = function(b) {
      var n;
      var l = this.I;
      /** @type {number} */
      var b = 0 | this.j;
      /** @type {number} */
      var i = 0 | this.K;
      /** @type {number} */
      var none = 0 | this.N;
      /** @type {number} */
      var item = 0 | this.k;
      /** @type {number} */
      var classPart = 0 | this.C;
      /** @type {number} */
      var a = 0;
      for (; a < 16; ++a) {
        l[a] = b.readInt32BE(4 * a);
      }
      for (; a < 80; ++a) {
        /** @type {number} */
        l[a] = (n = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16]) << 1 | n >>> 31;
      }
      var c;
      var d;
      var e;
      /** @type {number} */
      var prop = 0;
      for (; prop < 80; ++prop) {
        /** @type {number} */
        var indexLookupKey = ~~(prop / 20);
        /** @type {number} */
        var vfrac = 0 | (b << 5 | b >>> 27) + (c = i, d = none, e = item, 0 === (vfrac = indexLookupKey) ? c & d | ~c & e : 2 === vfrac ? c & d | c & e | d & e : c ^ d ^ e) + classPart + l[prop] + nextIdLookup[indexLookupKey];
        /** @type {number} */
        classPart = item;
        /** @type {number} */
        item = none;
        /** @type {number} */
        none = i << 30 | i >>> 2;
        /** @type {number} */
        i = b;
        /** @type {number} */
        b = vfrac;
      }
      /** @type {number} */
      this.j = b + this.j | 0;
      /** @type {number} */
      this.K = i + this.K | 0;
      /** @type {number} */
      this.N = none + this.N | 0;
      /** @type {number} */
      this.k = item + this.k | 0;
      /** @type {number} */
      this.C = classPart + this.C | 0;
    };
    /**
     * @return {?}
     */
    obj.prototype.T = function() {
      var tempBuff = new Buffer(20);
      return tempBuff.writeInt32BE(0 | this.j, 0), tempBuff.writeInt32BE(0 | this.K, 4), tempBuff.writeInt32BE(0 | this.N, 8), tempBuff.writeInt32BE(0 | this.k, 12), tempBuff.writeInt32BE(0 | this.C, 16), tempBuff;
    };
    /** @type {function(): undefined} */
    context.exports = obj;
  }.call(this, __webpack_require__(0).Buffer);
}, function(context, canCreateDiscussions, require) {
  !function(Buffer) {
    /**
     * @return {undefined}
     */
    function obj() {
      this.init();
      /** @type {!Array} */
      this.I = I;
      e.call(this, 64, 56);
    }
    var resolve = require(1);
    var manifest = require(3);
    var e = require(2);
    /** @type {!Array} */
    var I = new Array(64);
    resolve(obj, manifest);
    /**
     * @return {?}
     */
    obj.prototype.init = function() {
      return this.j = 3238371032, this.K = 914150663, this.N = 812702999, this.k = 4144912697, this.C = 4290775857, this.D = 1750603025, this.P = 1694076839, this.L = 3204075428, this;
    };
    /**
     * @return {?}
     */
    obj.prototype.T = function() {
      var tempBuff = new Buffer(28);
      return tempBuff.writeInt32BE(this.j, 0), tempBuff.writeInt32BE(this.K, 4), tempBuff.writeInt32BE(this.N, 8), tempBuff.writeInt32BE(this.k, 12), tempBuff.writeInt32BE(this.C, 16), tempBuff.writeInt32BE(this.D, 20), tempBuff.writeInt32BE(this.P, 24), tempBuff;
    };
    /** @type {function(): undefined} */
    context.exports = obj;
  }.call(this, require(0).Buffer);
}, function(context, canCreateDiscussions, require) {
  !function(BigNumber) {
    /**
     * @return {undefined}
     */
    function obj() {
      this.init();
      /** @type {!Array} */
      this.I = I;
      e.call(this, 128, 112);
    }
    var resolve = require(1);
    var manifest = require(4);
    var e = require(2);
    /** @type {!Array} */
    var I = new Array(160);
    resolve(obj, manifest);
    /**
     * @return {?}
     */
    obj.prototype.init = function() {
      return this.M = 3418070365, this.B = 1654270250, this.U = 2438529370, this.J = 355462360, this.G = 1731405415, this.V = 2394180231, this.F = 3675008525, this.$ = 1203062813, this.H = 3238371032, this.Z = 914150663, this.W = 812702999, this.Y = 4144912697, this.X = 4290775857, this.q = 1750603025, this.tt = 1694076839, this.nt = 3204075428, this;
    };
    /**
     * @return {?}
     */
    obj.prototype.T = function() {
      /**
       * @param {undefined} hash
       * @param {undefined} num
       * @param {number} offset
       * @return {undefined}
       */
      function write(hash, num, offset) {
        b.writeInt32BE(hash, offset);
        b.writeInt32BE(num, offset + 4);
      }
      var b = new BigNumber(48);
      return write(this.M, this.H, 0), write(this.B, this.Z, 8), write(this.U, this.W, 16), write(this.J, this.Y, 24), write(this.G, this.X, 32), write(this.V, this.q, 40), b;
    };
    /** @type {function(): undefined} */
    context.exports = obj;
  }.call(this, require(0).Buffer);
}]);
