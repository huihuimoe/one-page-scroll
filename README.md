# one-page-scroll
[![tag](https://img.shields.io/github/tag/huihuimoe/one-page-scroll.svg?style=flat-square)](https://github.com/huihuimoe/one-page-scroll/releases)
[![license](https://img.shields.io/github/license/huihuimoe/one-page-scroll.svg?style=flat-square)](https://github.com/huihuimoe/one-page-scroll/blob/master/LICENSE)
[![size](https://img.shields.io/github/size/huihuimoe/one-page-scroll/one-page-scroll.min.js.svg?style=flat-square)](https://unpkg.com/one-page-scroll/one-page-scroll.min.js)
[![code style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

An easy javascipt library used to create the fullscreen scroll pages.

It has full support the mouse, keyboard and touch event.

[**Demo**](http://huihuimoe.github.io/one-page-scroll/demo/)

## Usage
Just link css file to your head and add the script file before end of body.
```html
<head>
  ...
  <link rel="stylesheet" href="https://unpkg.com/one-page-scroll/one-page-scroll.min.css">
</head>

<body>
  <section name="page1"></section>
  <section name="page2"></section>
  <section></section>
  <section name="page4"></section>
  ...
  <script src="https://unpkg.com/one-page-scroll/one-page-scroll.min.js"></script>
</body>
```
Then call it by `new onePageScroll({options})` and put the elements in options.
```javascript
document.addEventListener('DOMContentLoaded', function() {
  var app = new onePageScroll({
    el: document.querySelectorAll('section');
  });
});
```
That's all.

You can `.next()`, `.prev()` and `.goto(n)` to control page by script.

While page changed, the element will be dispatched a event `inview` or `outview`.

So you can do any thing when users or you change the page like this.
```javascript
el.addEventListener('inview', functione(e) {
  // do something
});
```

## Options
one-page-scroll has 4 options.
```javascript
{
  el, // NodeList - the page elements, required
  time, // Number - the animation time(ms), default: 600
  easing, // String - CSS animation easing, default: ease-out
  loop // Boolean - loop pages(only the last page to the first page), default: false
}
```
You can change the last 3 options any times. like `app.easing = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'`

## Browser Support
one-page-scroll support the lastest Chrome, Firefox, Edge and Safari.

Use polyfill to support IE > 9.
```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Array.from,Array.prototype.findIndex,Array.prototype.includes,Array.prototype.forEach,CustomEvent"></script>
```

## Build
```bash
$ npm install
$ npm run build
```

## Author
**[huihuimoe](https://github.com/huihuimoe)** ©, Released under the [MIT](./LICENSE) License.

<a href='https://ko-fi.com/A22139T1' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi2.png?v=0' border='0' alt='Buy Me a Coffee' /></a>
