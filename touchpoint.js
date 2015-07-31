/*!
 * TouchPoint.js 1.0.0 Beta
 * A JavaScript library that visually shows taps/cicks on HTML prototypes.
 * http://jonahvsweb.com
 *
 * Copyright (c) 2015 Jonah Bitautas <jonahvsweb@gmail.com>
 *
 * Released under the MIT license
 * LICENSE.txt
 */
var TouchPoint;

(function () {

  'use strict';

  TouchPoint = {

    el: 'div', 
    dom: '', 
    styleEl: '',
    color: '#FFF', 
    opacity: 0.8, 
    size: 20, 
    scale: 8,
    tp: '', 
    z: 9999,

    init: function(el) {
      TouchPoint.dom = el;

      TouchPoint
        .createCss('.tp-init', 
          'position: absolute; width: ' + TouchPoint.size + 'px; height: ' + TouchPoint.size + 'px; background-color: ' + TouchPoint.color + '; opacity: ' + TouchPoint.opacity + '; border-radius: 20px; -ms-transform: scale(0.5); -webkit-transform: scale(0.5); -moz-transform: scale(0.5); -o-transform: scale(0.5); transform: scale(0.5); -ms-transition: all 0.5s ease-out; -webkit-transition: all 0.5s ease-out; -moz-transition: all 0.5s ease-out; -o-transition: all 0.5s ease-out; transition: all 0.5s ease-out; z-index: ' + TouchPoint.z + ';')
        .createCss('.tp-anim', 
          '-ms-transform: scale(' + TouchPoint.scale + '); -webkit-transform: scale(' + TouchPoint.scale + '); -moz-transform: scale(' + TouchPoint.scale + '); -o-transform: scale(' + TouchPoint.scale + '); transform: scale(' + TouchPoint.scale + '); opacity: 0;'
        );
      TouchPoint.dom.addEventListener("click", TouchPoint.create, false);
    },

    create: function(e) {
      TouchPoint.dom.removeEventListener("click", TouchPoint.create, false);
      TouchPoint.tp = document.createElement(TouchPoint.el);
      TouchPoint.tp.setAttribute('id', 'touchpoint');
      TouchPoint.tp.style.left = (e.clientX - (TouchPoint.size * 0.5)) + 'px';
      TouchPoint.tp.style.top = (e.clientY - (TouchPoint.size * 0.5)) + 'px';
      TouchPoint.tp.className = 'tp-init';

      document.body.appendChild(TouchPoint.tp);

      requestNextAnimationFrame(function () {
        TouchPoint.tp.className += ' tp-anim';
      });
      TouchPoint.tp.addEventListener('transitionend', TouchPoint.gc, false);

      return TouchPoint;
    },

    gc: function(e) {
      var currTP = document.body.querySelector('#touchpoint');

      if(currTP) {
        e.target.removeEventListener('transitionend', TouchPoint.gc, false);
        document.body.removeChild(currTP);
        TouchPoint.reInit();
      }
    },

    reInit: function() {
      TouchPoint.dom.addEventListener("click", TouchPoint.create, false);
    },

    createCss: function(name, rules) {
      var head = document.getElementsByTagName('head')[0];

      for(var i = 0; i < head.childNodes.length; i = i + 1) {
        if(head.getElementsByTagName('style')[i].tagName.toLowerCase() === 'style') {
          head.getElementsByTagName('style')[i].innerHTML += name + ' { ' + rules + ' }';
          TouchPoint.styleEl = head.getElementsByTagName('style')[i];
          break;
        } else {
          TouchPoint.styleEl = document.createElement('style');
          TouchPoint.styleEl.type = 'text/css';
          TouchPoint.styleEl.innerHTML = name + ' { ' + rules + ' }';
          head.appendChild(TouchPoint.styleEl);
          break;
        }
      }
      return TouchPoint;
    }
  };
  // requestNextAnimationFrame shim from: https://gist.github.com/getify/3004342
  var ids = {};

  function requestId() {
      var id;
      do {
          id = Math.floor(Math.random() * 1E9);
      } while (id in ids);
      return id;
  }

  if (!window.requestNextAnimationFrame) {
      window.requestNextAnimationFrame = function (callback, element) {
          var id = requestId();

          ids[id] = requestAnimationFrame(function () {
              ids[id] = requestAnimationFrame(function (ts) {
                  delete ids[id];
                  callback(ts);
              }, element);
          }, element);

          return id;
      };
  }

  if (!window.cancelNextAnimationFrame) {
      window.cancelNextAnimationFrame = function (id) {
          if (ids[id]) {
              cancelAnimationFrame(ids[id]);
              delete ids[id];
          }
      };
  }
})();