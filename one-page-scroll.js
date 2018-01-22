/*
 * one-page-scroll 0.1.9
 * https://github.com/huihuimoe/one-page-scroll
 *
 * Copyright 2017 huihuimoe
 * Released under the MIT license
 * https://github.com/huihuimoe/one-page-scroll/blob/master/LICENSE
 */

/* global CSSCLASS Blob URL CustomEvent location history */

class onePageScroll {
  /**
   * constructor function
   *
   * @param {Object} options - see README.md
   * @constructor
   */
  constructor ({
    el,
    time = 600,
    easing = 'ease-out',
    loop = false
  } = {}) {
    if (!el || !el.length) {
      throw new TypeError('el is undefined')
    }

    /*
     * Variable Initialization
     */
    this.loop = loop
    this.time = time
    this.easing = easing
    this.pageTotal = el.length
    this.active = 1
    const style = `
      body{
        overflow: hidden
      }
      .${CSSCLASS}{
        width: 100%;
        height: 100%;
        overflow: hidden;
        touch-action: none;
        position: absolute
      }
    `
    const css = new Blob([style], {type: 'text/css'})
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', URL.createObjectURL(css))
    document.head.appendChild(link)
    this._el = Array.prototype.slice.call(el)
    this._el.forEach((el, index) => {
      el.classList.add(CSSCLASS)
      el.style.transform = `translateY(${index * 100}%)`
    })
    this._hash = this._el.map((el, i) => el.getAttribute('name') || i + 1)

    /*
     * Url Hash Initialization
     */
    const findHash = () => location.hash === '' ? 1 : this._hash.findIndex((hash, i) => {
      if (['#' + hash, '#' + (i + 1)].includes(location.hash)) {
        return true
      }
    }) + 1
    this.goto(findHash())

    /*
     * Event register
     */
    window.addEventListener('popstate', e => {
      const hashIndex = findHash()
      if (hashIndex) {
        this.goto(hashIndex, true)
      }
    });
    ['keydown', 'mousewheel', 'DOMMouseScroll', 'touchstart'].forEach(
      e => document.addEventListener(e, this)
    )
  }

  /**
   * goto the nth page
   *
   * @param {Number} n - the page number you want to go
   * @return {onePageScroll}
   */
  goto (n) {
    if (n > this.pageTotal || n < 1) {
      this.loop ? n = 1 : n = this.active
    }
    if (n !== this.active) {
      this._el.forEach((el, index) => {
        const style = el.style
        style.transition = `transform ${this.time}ms ${this.easing}`
        style.transform = `translateY(${(index - n + 1) * 100}%)`
      })
      this._el[this.active - 1].dispatchEvent(new CustomEvent('outview'))
      this._el[n - 1].dispatchEvent(new CustomEvent('inview'))
      this.active = n
      !arguments[1] && history.replaceState({}, '', '#' + this._hash[n - 1])
    }
    return this
  }

  /**
   * goto the next page
   *
   * @return {onePageScroll}
   */
  next () {
    return this.goto(this.active + 1)
  }

  /**
   * goto the prev page
   *
   * @return {onePageScroll}
   */
  prev () {
    return this.goto(this.active - 1)
  }

  /*
   * Event handler
   */

  handleEvent (e) {
    const handleKeyDown = e => {
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

    const handleMouseWheel = e => {
      const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
      if (delta < 0) {
        this.next()
      } else {
        this.prev()
      }
    }

    const handleTouchStart = e => {
      const touches = e.touches
      if (touches && touches.length) {
        this._touchStartY = touches[0].pageY
        document.addEventListener('touchmove', this)
      }
    }

    const handleTouchMove = e => {
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

    switch (e.type) {
      case 'keydown':
        handleKeyDown(e)
        break
      case 'mousewheel':
      case 'DOMMouseScroll':
        handleMouseWheel(e)
        break
      case 'touchstart':
        handleTouchStart(e)
        break
      case 'touchmove':
        handleTouchMove(e)
    }
  }
}

module.exports = onePageScroll
