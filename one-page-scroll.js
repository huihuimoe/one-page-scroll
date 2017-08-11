/*
 * one-page-scroll 0.1.1
 * https://github.com/huihuimoe/one-page-scroll
 *
 * Copyright 2017 huihuimoe
 * Released under the MIT license
 * https://github.com/huihuimoe/one-page-scroll/blob/master/LICENSE
 */

import './one-page-scroll.css'

class onePageScroll {
  constructor ({
    el = [],
    time = 600,
    easing = 'ease-out',
    loop = false
  } = {}) {
    [
      this.loop,
      this.time,
      this.easing,
      this.pageTotal
    ] = [
      loop,
      time,
      easing,
      el.length
    ]
    this._el = Array.from(el, el => {
      el.classList.add('op-page')
      return el
    })
    this._hash = this._el.map((el, i) => el.getAttribute('title') || i + 1)

    this.active = this._findHash() || 1
    this.goto(this.active)

    /*
     * Event register
     */
    window.onpopstate = (e) => {
      const hashIndex = this._findHash()
      if (hashIndex) {
        this.goto(hashIndex)
        e.preventDefault()
      }
    }
    this._touchStartY = 0;
    ['keydown', 'mousewheel', 'DOMMouseScroll', 'touchstart'].forEach(
      e => document.addEventListener(e, this)
    )
  }

  /*
    public function
   */

  goto (n) {
    if (n > this.pageTotal || n < 1) {
      this.loop ? n = 1 : n = this.active
    }
    this._el.forEach(el => {
      el.style = this._getStylePrefix() +
                 `transform:translateY(${-(n - 1) * 100}%)`
    })
    this._el[this.active - 1].dispatchEvent(new window.CustomEvent('outview'))
    this._el[n - 1].dispatchEvent(new window.CustomEvent('inview'))
    this.active = n
    window.history.pushState({}, '', '#' + this._hash[n - 1])
    return this
  }

  next () {
    return this.goto(this.active + 1)
  }

  prev () {
    return this.goto(this.active - 1)
  }

  /*
    private function
   */
  _findHash () {
    return this._hash.findIndex((hash, i) => {
      if (['#' + hash, '#' + (i + 1)].includes(window.location.hash)) {
        return true
      }
    }) + 1
  }

  _getStylePrefix () {
    return `transition:transform ${this.time}ms ${this.easing};`
  }

  handleEvent (e) {
    switch (e.type) {
      case 'keydown':
        this._handleKeyDown(e)
        break
      case 'mousewheel':
      case 'DOMMouseScroll':
        this._handleMouseWheel(e)
        break
      case 'touchstart':
        this._handleTouchStart(e)
        break
      case 'touchmove':
        this._handleTouchMove(e)
    }
  }

  _handleKeyDown (e) {
    switch (e.keyCode) {
      // PgUp, ↑
      case 33:
      case 38:
        this.prev()
        break
      // PgDn, ↓, Space
      case 32:
      case 34:
      case 40:
        this.next()
        break
      // Home
      case 36:
        this.goto(1)
        break
      // End
      case 35:
        this.goto(this.pageTotal)
        break
    }
  }

  _handleMouseWheel (e) {
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
    if (delta < 0) {
      this.next()
    } else {
      this.prev()
    }
  }

  _handleTouchStart (e) {
    const touches = e.touches
    if (touches && touches.length) {
      this._touchStartY = touches[0].pageY
      document.addEventListener('touchmove', this)
    }
  }

  _handleTouchMove (e) {
    const touches = e.touches
    if (touches && touches.length) {
      e.preventDefault()
      const deltaY = this._touchStartY - touches[0].pageY
      if (deltaY >= 50) {
        this.next()
      }
      if (deltaY <= -50) {
        this.prev()
      }
      if (Math.abs(deltaY) >= 50) {
        document.removeEventListener('touchmove', this)
      }
    }
  }
}

module.exports = onePageScroll
