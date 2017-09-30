/* 
 * TouchPoint.js v1.0.1 - 2017-09-30 
 * A JavaScript library that visually shows taps/cicks on HTML prototypes 
 * https://github.com/jonahvsweb/touchpoint-js 
 * 
 * Copyright (c) 2017 Jonah Bitautas <jonahvsweb@gmail.com> 
 * 
 * Released under the MIT license 
*/ 
'use strict';

var TouchPoint;

(() => {

  TouchPoint = {

    clickTap: ('ontouchstart' in window ? 'touchstart' : 'click'),
    dom: '', 
    styleEl: '',
    color: '#FFF', 
    opacity: 0.8, 
    size: 20, 
    scale: 8,
    tp: '', 
    animIds: {}, 

    init(dom = 'body') {

      window.addEventListener('load', this.setupAnimation, false);
      this.dom = document.querySelector(dom);
      
      this
        .createCss('.tp-init', 
          `position: absolute; width: ${ this.size }px; height: ${ this.size }px; background-color: ${ this.color }; opacity:  ${ this.opacity }; border-radius: 20px; -ms-transform: scale(0.5); -webkit-transform: scale(0.5); -moz-transform: scale(0.5); -o-transform: scale(0.5); transform: scale(0.5); -ms-transition: all 0.5s ease-out; -webkit-transition: all 0.5s ease-out; -moz-transition: all 0.5s ease-out; -o-transition: all 0.5s ease-out; transition: all 0.5s ease-out; z-index: 9999;`)
        .createCss('.tp-anim', 
          `-ms-transform: scale(${ this.scale }); -webkit-transform: scale(${ this.scale }); -moz-transform: scale(${ this.scale }); -o-transform: scale(${ this.scale }); transform: scale(${ this.scale }); opacity: 0;`
        );
      this.dom.addEventListener(this.clickTap, this.create, false);
    },

    create(e) {
      
      TouchPoint.tp = document.createElement('div');
      TouchPoint.tp.setAttribute('id', 'touchpoint');

      if(TouchPoint.getMobileOS() === 'iOS') {
        TouchPoint.tp.style.left = `${ e.pageX - (TouchPoint.size * 0.5) }px`;
        TouchPoint.tp.style.top = `${ e.pageY - (TouchPoint.size * 0.5) }px`;
      } else if (TouchPoint.getMobileOS() === 'Android') {
        TouchPoint.tp.style.left = `${ e.touches[0].pageX - (TouchPoint.size * 0.5) }px`;
        TouchPoint.tp.style.top = `${ e.touches[0].pageY - (TouchPoint.size * 0.5) }px`;
      } else if (e.touches && e.touches.length > 0) { 
        TouchPoint.tp.style.left = `${ e.touches[0].pageX - (TouchPoint.size * 0.5) }px`;
        TouchPoint.tp.style.top = `${ e.touches[0].pageY - (TouchPoint.size * 0.5) }px`;
      } else { 
        TouchPoint.tp.style.left = `${ e.clientX - (TouchPoint.size * 0.5) }px`;
        TouchPoint.tp.style.top = `${ e.clientY - (TouchPoint.size * 0.5) }px`;
      }
      TouchPoint.tp.className = 'tp-init';

      document.body.appendChild(TouchPoint.tp);

      window.requestNextAnimationFrame(() => {
        TouchPoint.tp.className += ' tp-anim';
      });
      TouchPoint.tp.addEventListener('transitionend', TouchPoint.gc, false);
    },

    gc(e) {

      let currTP = document.querySelector('#touchpoint');

      TouchPoint.dom.removeEventListener(TouchPoint.clickTap, TouchPoint.create, false);

      if(currTP) {

        e.target.removeEventListener('transitionend', TouchPoint.gc, false);
        document.body.removeChild(currTP);
        TouchPoint.dom.addEventListener(TouchPoint.clickTap, TouchPoint.create, false);
      }
    },

    createCss(name, rules) {

      let head = document.head || document.getElementsByTagName('head')[0];

      for(let i = 0; i < head.childNodes.length; i = i + 1) {
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
    },

    getMobileOS() {
      
      let userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if(userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i )) {
        return 'iOS';
      } else if(userAgent.match( /Android/i )) {
        return 'Android';
      } else {
        return 'unknown';
      }
    }, 

    requestId() {

      let id;
      
      do {
          id = Math.floor(Math.random() * 1E9);
        } while (id in TouchPoint.animIds);

      return id;
    }, 

    setupAnimation(e) {

      if (!window.requestNextAnimationFrame) {
        
        window.requestNextAnimationFrame = (callback, element) => {
          
          let id = TouchPoint.requestId();

          TouchPoint.animIds[id] = requestAnimationFrame(() => {
            
            TouchPoint.animIds[id] = requestAnimationFrame((ts) => {
              
              delete TouchPoint.animIds[id];
              callback(ts);
            
            }, element);
          
          }, element);

          return id;
        };
      }

      if (!window.cancelNextAnimationFrame) {
      
        window.cancelNextAnimationFrame = (id) => {
          
          if (TouchPoint.animIds[id]) {
            
            cancelAnimationFrame(TouchPoint.animIds[id]);
            delete TouchPoint.animIds[id];
          }
        }
      }
    }
  }
})();