webpackJsonp(["app/js/activity/ppt/index"],{"26e1364e5dad927fe494":function(e,t,n){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}var a=n("f3c7e4fbf91afda92bf3"),r=l(a),i=n("da32dea28c2b82c7aab1"),s=l(i),o=new s.default,c=$("#activity-ppt-content"),u=c.data("watermarkUrl"),f=function(e){var t=new r.default({element:"#activity-ppt-content",slides:c.data("slides").split(","),watermark:e});return"end"===c.data("finishType")&&t.once("end",function(e){o.emit("finish",e)}),t};if(void 0===u){f()}else $.get(u).then(function(e){f(e)}).fail(function(e){})},"56b32877cbcf8d29840e":function(e,t){!function(){"use strict";var t=void 0!==e&&e.exports,n="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,l=function(){for(var e,t,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],l=0,a=n.length,r={};l<a;l++)if((e=n[l])&&e[1]in document){for(l=0,t=e.length;l<t;l++)r[n[0][l]]=e[l];return r}return!1}(),a={request:function(e){var t=l.requestFullscreen;e=e||document.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?e[t]():e[t](n&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){document[l.exitFullscreen]()},toggle:function(e){this.isFullscreen?this.exit():this.request(e)},raw:l};if(!l)return void(t?e.exports=!1:window.screenfull=!1);Object.defineProperties(a,{isFullscreen:{get:function(){return Boolean(document[l.fullscreenElement])}},element:{enumerable:!0,get:function(){return document[l.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return Boolean(document[l.fullscreenEnabled])}}}),t?e.exports=a:window.screenfull=a}()},f3c7e4fbf91afda92bf3:function(e,t,n){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}(),o=n("63fff8fb24f3bd1f61cd"),c=l(o),u=n("56b32877cbcf8d29840e"),f=l(u),d=function(e){function t(e){var n=e.element,l=e.slides,i=e.watermark;a(this,t);var s=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return s.element=$(n),s.slides=l||[],s.watermark=i||"",s._KEY_ACTION_MAP={37:s._onPrev,39:s._onNext,38:s._onLast,40:s._onFirst},s.total=s.slides.length,s._page=0,s.placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",s._init(),s}return i(t,e),s(t,[{key:"_render",value:function(){this.element.html('\n      <div class="slide-player">\n        <div class="slide-player-body loading-background"></div>\n        <div class="slide-notice">\n          <div class="header">{{ \'site.data_last_picture\'|trans }}\n            <button type="button" class="close">×</button>\n          </div>\n        </div>\n      \n        <div class="slide-player-control clearfix">\n          <a href="javascript:" class="goto-first">\n            <span class="glyphicon glyphicon-step-backward"></span>\n          </a>\n          <a href="javascript:" class="goto-prev">\n            <span class="glyphicon glyphicon-chevron-left"></span>\n          </a>\n          <a href="javascript:" class="goto-next">\n            <span class="glyphicon glyphicon-chevron-right"></span>\n          </a>\n          <a href="javascript:" class="goto-last">\n            <span class="glyphicon glyphicon-step-forward"></span>\n          </a>\n          <a href="javascript:" class="fullscreen">\n            <span class="glyphicon glyphicon-fullscreen"></span>\n          </a>\n          <div class="goto-page-input">\n            <input type="text" class="goto-page form-control input-sm" value="1">&nbsp;/&nbsp;\n              <span class="total"></span>\n          </div>\n        </div>\n      </div>'),this.element.find(".total").text(this.total);var e=this.slides.reduce(function(e,t,n){return e+='<img data-src="'+t+'" class="slide" data-page="'+(n+1)+'">'},"");this.element.find(".slide-player-body").html(e),this.watermark&&this.element.append('<div class="slide-player-watermark">'+this.watermark+"</div>")}},{key:"_init",value:function(){this._render(),this._bindEvents(),this._onFirst()}},{key:"_lazyLoad",value:function(e){for(var t=e;t<e+4&&!(t>this.total);t++){var n=this._getSlide(t);n.attr("src")||n.attr("src",n.data("src"))}}},{key:"_getSlide",value:function(e){return this.element.find(".slide-player-body .slide").eq(e-1)}},{key:"_bindEvents",value:function(){var e=this;$(document).on("keydown",function(t){e._KEY_ACTION_MAP[t.keyCode]&&e._KEY_ACTION_MAP[t.keyCode].call(e)}),this.element.on("click",".goto-next",function(t){return e._onNext(t)}),this.element.on("click",".goto-prev",function(t){return e._onPrev(t)}),this.element.on("click",".goto-first",function(t){return e._onFirst(t)}),this.element.on("click",".goto-last",function(t){return e._onLast(t)}),this.element.on("click",".fullscreen",function(t){return e._onFullScreen(t)}),this.element.on("change",".goto-page",function(t){return e._onChangePage(t)});var t=this;this.on("change",function(n){var l=n.current;n.before;l==t.total&&t.emit("end",{page:e.total})})}},{key:"_onNext",value:function(){if(this.page===this.total)return void this.emit("end",{page:this.total});this.page++}},{key:"_onPrev",value:function(){1!=this.page&&this.page--}},{key:"_onFirst",value:function(){this.page=1}},{key:"_onLast",value:function(){this.page=this.total}},{key:"_onFullScreen",value:function(){f.default.enabled&&(f.default.isFullscreen?f.default.toggle():f.default.request())}},{key:"_onChangePage",value:function(e){this.page=$(e.target).val()}},{key:"page",get:function(){return this._page},set:function(e){var t=this,n=this.page,l=e;l>this.total&&(this.element.find(".goto-page").val(l),this._page=l),l<1&&(this.element.find(".goto-page").val(n),this._page=n),n&&this.element.find(".slide-player-body .slide").eq(n-1).removeClass("active");var a=this._getSlide(l);a.attr("src")?a.addClass("active"):(a.load(function(){t._page==a.data("page")&&a.addClass("active")}),a.attr("src",a.data("src"))),this._lazyLoad(l),this.element.find(".goto-page").val(l),this._page=l,this.emit("change",{current:l,before:n})}}]),t}(c.default);t.default=d}},["26e1364e5dad927fe494"]);