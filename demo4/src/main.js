// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
import MintUi from 'mint-ui';
import VueLazyLoad from 'vue-lazyload'
// import ElementUI from 'element-ui'
import store from './store'
import fastclick from 'fastclick'
// import {Picker} from 'mint-ui';
//引入jq
import $ from './js/jquery-1.11.2.js';
/*
import './css/main.scss'
import './js/commonUtils'*/
import './assets/css/layout.css'
import './assets/css/reset.css'
import './assets/js/merge.js'

/*Vue.use(VueLazyLoad,{
  //这是懒加载用的默认图片
  loading:require('common/image/default.png')
});*/

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(MintUi);
// Vue.use(ElementUI)
// Vue.component(Picker.name, Picker);
Vue.filter('mob', function(value) {
  if (!value) { return ''}
  value = value.substring(0,3)+'****'+value.substring(7)
  return value
})
/*import Axios from 'axios';
Axios.defaults.baseURL = 'http://idle.zhihuiup.com'

Axios.defaults.headers.post['Content-Type'] - 'application/json';
Axios.defaults.headers.post['Access-Control-Allow-Origin'] - '*';
Axios.defaults.headers.get['Access-Control-Allow-Origin'] - '*';
*/


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },

})
