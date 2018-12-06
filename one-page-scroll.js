/*!
* one-page-scroll 0.2.5
* https://github.com/huihuimoe/one-page-scroll
* Released under the MIT license
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.onePageScroll = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
      }
  }
  function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
              descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
      }
  }
  function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
          _defineProperties(Constructor, staticProps);
      return Constructor;
  }

  var simpleThrottling = function simpleThrottling(callback, time) {
    var calledTime = 0;
    return function (n) {
      var now = Date.now();

      if (calledTime + time < now) {
        calledTime = now;
        callback(n);
      }
    };
  };

  var _init = function init() {
    var style = "body{overflow: hidden}.one-page-scroll--page{width: 100%;height: 100%;overflow: hidden;touch-action: none;position: absolute}";
    var css = new Blob([style], {
      type: 'text/css'
    });
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', URL.createObjectURL(css));
    document.head.appendChild(link);

    _init = function init() {};
  };

  var onePageScroll =
  /*#__PURE__*/
  function () {
    function onePageScroll() {
      var _this = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          el = _ref.el,
          _ref$time = _ref.time,
          time = _ref$time === void 0 ? 600 : _ref$time,
          _ref$easing = _ref.easing,
          easing = _ref$easing === void 0 ? 'ease-out' : _ref$easing,
          _ref$loop = _ref.loop,
          loop = _ref$loop === void 0 ? false : _ref$loop,
          throttling = _ref.throttling;

      _classCallCheck(this, onePageScroll);

      _init();

      if (!el || !el.length) {
        throw new Error('el is undefined');
      }

      this.time = time;
      this.easing = easing;
      this.loop = loop;
      this.pageTotal = el.length;
      this.active = 1;
      throttling = throttling || time;
      this._el = [].slice.call(el);

      this._el.forEach(function (el, index) {
        el.classList.add('one-page-scroll--page');
        el.style.transform = "translateY(".concat(index * 100, "%)");
      });

      this._hash = this._el.map(function (el, i) {
        return el.getAttribute('name') || i + 1;
      });

      var findHash = function findHash() {
        return location.hash === '' ? 1 : _this._hash.findIndex(function (hash, i) {
          if (['#' + hash, '#' + (i + 1)].includes(location.hash)) {
            return true;
          }
        }) + 1;
      };

      this.goto(findHash());

      var wrapGoto = function wrapGoto(n) {
        return _this.goto(n);
      };

      this._goto = throttling ? simpleThrottling(wrapGoto, throttling) : wrapGoto;
      window.addEventListener('popstate', function (e) {
        var hashIndex = findHash();

        if (hashIndex) {
          _this.goto(hashIndex, true);
        }
      });
      ['keydown', 'mousewheel', 'DOMMouseScroll', 'touchstart'].map(function (e) {
        return document.addEventListener(e, _this);
      });
    }

    _createClass(onePageScroll, [{
      key: "goto",
      value: function goto(n) {
        var _this2 = this;

        if (n > this.pageTotal || n < 1) {
          this.loop ? n = 1 : n = this.active;
        }

        if (n !== this.active) {
          this._el.forEach(function (el, index) {
            var style = el.style;
            style.transition = "transform ".concat(_this2.time, "ms ").concat(_this2.easing);
            style.transform = "translateY(".concat((index - n + 1) * 100, "%)");
          });

          this._el[this.active - 1].dispatchEvent(new CustomEvent('outview'));

          this._el[n - 1].dispatchEvent(new CustomEvent('inview'));

          this.active = n;
          !arguments[1] && history.replaceState({}, '', '#' + this._hash[n - 1]);
        }

        return this;
      }
    }, {
      key: "next",
      value: function next() {
        return this.goto(this.active + 1);
      }
    }, {
      key: "prev",
      value: function prev() {
        return this.goto(this.active - 1);
      }
    }, {
      key: "handleEvent",
      value: function handleEvent(e) {
        var _this3 = this;

        var handleKeyDown = function handleKeyDown(e) {
          switch (e.keyCode) {
            case 33:
            case 38:
              _this3._goto(_this3.active - 1);

              break;

            case 32:
            case 34:
            case 40:
              _this3._goto(_this3.active + 1);

              break;

            case 36:
              _this3._goto(1);

              break;

            case 35:
              _this3._goto(_this3.pageTotal);

              break;
          }
        };

        var handleMouseWheel = function handleMouseWheel(e) {
          var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

          if (delta < 0) {
            _this3._goto(_this3.active + 1);
          } else {
            _this3._goto(_this3.active - 1);
          }
        };

        var handleTouchStart = function handleTouchStart(e) {
          var touches = e.touches;

          if (touches && touches.length) {
            _this3._touchStartY = touches[0].pageY;
            document.addEventListener('touchmove', _this3);
          }
        };

        var handleTouchMove = function handleTouchMove(e) {
          var touches = e.touches;

          if (touches && touches.length) {
            e.preventDefault();
            var deltaY = _this3._touchStartY - touches[0].pageY;

            if (deltaY >= 50) {
              _this3._goto(_this3.active + 1);
            }

            if (deltaY <= -50) {
              _this3._goto(_this3.active - 1);
            }

            if (Math.abs(deltaY) >= 50) {
              document.removeEventListener('touchmove', _this3);
            }
          }
        };

        switch (e.type) {
          case 'keydown':
            handleKeyDown(e);
            break;

          case 'mousewheel':
          case 'DOMMouseScroll':
            handleMouseWheel(e);
            break;

          case 'touchstart':
            handleTouchStart(e);
            break;

          case 'touchmove':
            handleTouchMove(e);
        }
      }
    }]);

    return onePageScroll;
  }();

  return onePageScroll;

})));
