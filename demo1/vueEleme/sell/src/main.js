// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import school from './components/middleTab/school';
import home from './components/middleTab/home';
import office from './components/middleTab/office';


Vue.config.productionTip = false






//路由
Vue.use(VueRouter);


const routes = [
  { path: '/school', component: school },
  { path: '/home', component: home },
  { path: '/office', component: office }
]

const router = new VueRouter({
	routes
})

const app = new Vue({
	el:'#app',
  router,
	render:h =>h (App)//渲染视图
})