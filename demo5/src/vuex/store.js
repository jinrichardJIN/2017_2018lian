import Vue from 'vue';
import Vuex from 'vuex';
import 'babel-polyfill'
// import * as actions from './actions';
// import * as getters from './getters';
Vue.use(Vuex);
// 创建一个对象来保存应用启动时的初始状态
const state = {
  'isLandingPage':'',
  'navBkg':false,
  'isShow':true,
  'isLoaded':null,
  'screenWidth':document.body.clientWidth,
  'isMedia':true,
  'isLoan':false,
  'aboutStatus':false,
  'isCenter':false
};

// 创建一个对象存储一系列我们接下来要写的 mutation 函数,修改state的状态
const mutations = {
 ISSHOW(state,value){
 	state.isShow=value
 },
 ISLANDING(state,value){
 	state.isLandingPage=value
 },
 NAVKG(state,value){
 	state.navBkg=value
 },
 ISLOADED(state,value){
 	state.isLoaded=value
 },
 SCREEMWIDTH(state,value){
 	state.screenWidth=value
 },
 ISMEDIA(state,value){
 	state.isMedia=value
 },
  ISLOAN(state,value){
    state.isLoan=value;
  },
  ISABOUT(state,value){
  	state.aboutStatus = value;
  },
  ISCENTER(state,value){    //  header 组件 背景图是否更换状态  （个人中心页面）
    state.isCenter = value;
  }
};
export default new Vuex.Store({
  state,
  mutations
  // actions,
  // getters
});
