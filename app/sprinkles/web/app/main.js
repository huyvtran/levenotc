window.$ = window.jQuery = require('jquery');
window.swal = require('sweetalert');
window.Vue = require('vue');
window.Popper = require('popper.js/dist/umd/popper');

import VueI18n from 'vue-i18n';
import locales from 'lang';
import httpPlugin from 'plugins/http';


import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


require('bootstrap');
require('social-share.js/dist/js/social-share.min.js');
require('vendor/select2.min.js');
window.marked = require('marked');
window.hljs = require('vendor/highlight.min.js');
window.toastr = require('toastr/build/toastr.min.js');


Vue.use(VueI18n);
Vue.use(httpPlugin);


  // Vue.directive('scroll-bottom', {
  //       // in the bind function, the 3rd argument is vnode (the VDOM) created by Vue.
  //       bind(el, bindings, vnode) {
  //       	alert(333)
  //           // vnode.context is the scope where the directive is rendered.
  //           const vm = vnode.context
  //           vm.$nextTick(() => {
  //               el.scrollTop = el.scrollHeight - el.clientHeight;
  //           });

  //       }
  //   });
Vue.config.lang = window.Language;

const i18n = new VueI18n({
    locale: Vue.config.lang,
    messages: locales
})


import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
    name: 'timeago', // component name, `timeago` by default
    locale: 'zh-TW',
    locales: {
        // you will need json-loader in webpack 1
        'zh-TW': require('vue-timeago/locales/zh-TW.json')
    }
})
Vue.use(Element)
Vue.component('comment', require('components/Comment.vue'));

Vue.component('parse', require('components/Parse.vue'));

Vue.component('parse-textarea', require('components/Textarea.vue'));

Vue.component('avatar', require('components/AvatarUpload.vue'));
Vue.component('wallet-add', require('./components/WalletAdd.vue'));
Vue.component('ad-create', require('./components/AdCreate.vue'));
Vue.component('order-create', require('./components/OrderCreate.vue'));

Vue.component('edit-create', require('./views/web/ad/edit.vue'));

Vue.component('notice', require('./components/Notice.vue'));

Vue.component(
    'vue-chat',
    require('components/Chat.vue')
);



new Vue({
    i18n: i18n,
}).$mount('#app');