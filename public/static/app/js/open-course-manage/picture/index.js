webpackJsonp(["app/js/open-course-manage/picture/index"],{0:function(e,n){e.exports=jQuery},"511b295f1a3d6ebc8ee5":function(e,n,t){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var c=function(){function e(e,n){for(var t=0;t<n.length;t++){var u=n[t];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(e,u.key,u)}}return function(n,t,u){return t&&e(n.prototype,t),u&&e(n,u),n}}(),r=t("0f84c916401868c4758e"),a=u(r),i=t("b334fd7e4c5a19234db2"),f=u(i);new(function(){function e(){o(this,e),this.init()}return c(e,[{key:"init",value:function(){new a.default({element:"#upload-picture-btn",onUploadSuccess:function(e,n){var t=$("#upload-picture-btn").data("gotoUrl");(0,f.default)("success",Translator.trans("open_course.picture_upload_success_hint")),document.location.href=t}})}}]),e}())}},["511b295f1a3d6ebc8ee5"]);