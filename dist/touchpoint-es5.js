/* 
 * TouchPoint.js v1.0.1 - 2017-09-29 
 * A JavaScript library that visually shows taps/cicks on HTML prototypes 
 * https://github.com/jonahvsweb/touchpoint-js 
 * 
 * Copyright (c) 2017 Jonah Bitautas <jonahvsweb@gmail.com> 
 * 
 * Released under the MIT license 
*/
'use strict';

(function () {

  var TouchPoint = {

    isSafari: !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),
    clickTap: 'ontouchstart' in window ? 'touchstart' : 'click',
    el: 'div',
    dom: window,
    styleEl: '',
    color: '#FFF',
    opacity: 0.8,
    size: 20,
    scale: 8,
    tp: '',
    z: 9999,

    init: function init(el) {
      TouchPoint.dom = el;
      /*
            TouchPoint
              .createCss('.tp-init', 
                'position: relative; width: ' + TouchPoint.size + 'px; height: ' + TouchPoint.size + 'px; background-color: ' + TouchPoint.color + '; opacity: ' + TouchPoint.opacity + '; border-radius: 20px; -ms-transform: scale(0.5); -webkit-transform: scale(0.5); -moz-transform: scale(0.5); -o-transform: scale(0.5); transform: scale(0.5); -ms-transition: all 0.5s ease-out; -webkit-transition: all 0.5s ease-out; -moz-transition: all 0.5s ease-out; -o-transition: all 0.5s ease-out; transition: all 0.5s ease-out; z-index: ' + TouchPoint.z + ';')
              .createCss('.tp-anim', 
                '-ms-transform: scale(' + TouchPoint.scale + '); -webkit-transform: scale(' + TouchPoint.scale + '); -moz-transform: scale(' + TouchPoint.scale + '); -o-transform: scale(' + TouchPoint.scale + '); transform: scale(' + TouchPoint.scale + '); opacity: 0;'
              );
            TouchPoint.dom.addEventListener(TouchPoint.clickTap, TouchPoint.create, false);*/
    }
  };
})();
//# sourceMappingURL=touchpoint-es5.js.map
