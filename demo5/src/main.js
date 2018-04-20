import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './vuex/store'
import route from './router/router.config.js'
import './assets/css/reset.css'
import {mapState} from 'vuex';
import 'es6-promise/auto'
import axios from 'axios'

Vue.use(VueRouter);

const router=new VueRouter(route);
const vm=new Vue({
  el:"#app",
  data:{
     'screenWidth':document.body.clientWidth
  },
  mounted(){
    this.$nextTick(()=>{
        if(this.screenWidth<=798){
          this.$store.commit('ISSHOW',false);
        }else{
          this.$store.commit('ISSHOW',true);
        }
        window.onscroll=()=>{
          if($(window).scrollTop()>=20){
            vm.$store.commit('NAVKG',true)
           }else{
            vm.$store.commit('NAVKG',false)
            }
        }
        window.onresize=()=>{
          var screenWidth=document.body.clientWidth
          this.$store.commit('SCREEMWIDTH',screenWidth);
          if(screenWidth<=798){
	          this.$store.commit('ISSHOW',false);
	          this.$store.commit('ISABOUT',true);
          }
          else{
            this.$store.commit('ISSHOW',true);
            this.$store.commit('ISABOUT',false);
          }
        }
    })
  },
  store,
  router,
  render:h =>h (App)//渲染视图
})//挂载根实例

router.beforeEach((to, from, next) => {
  vm.$store.commit('ISLOADED',false);
   next()
})

router.afterEach(route => {
    $(window).scrollTop(0);
    vm.$store.commit('ISLOADED',true);
    if (route.meta.isLandingPage) {
      vm.$store.commit('ISLANDING',true);
    }
    else {
      vm.$store.commit('ISLANDING',false);
    }
    if (route.meta.isMedia) {
      vm.$store.commit('ISMEDIA',true);
    }
    else {
      vm.$store.commit('ISMEDIA',false);
    }
    if (route.meta.isLoan) {
      vm.$store.commit('ISLOAN',true);
    }
    else {
      vm.$store.commit('ISLOAN',false);
    }
})
