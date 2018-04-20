<template>
	<div class="index-box">
    <!--<nav class="mui-bar mui-bar-tab footer">-->
      <router-link :to="{name: 'index'}" class="footer-index">
        <span class="footer-index-img"></span>
        <span class="footer-font">首页</span>
      </router-link>
      <router-link :to="{name: 'goodsList'}" class="footer-moball">
        <span class="footer-moball-img"></span>
        <span class="footer-font active-foot-bg">机型大全</span>
      </router-link>
      <router-link :to="{name: 'release'}" class="footer-mine">
        <span class="footer-mine-img"></span>
        <span class="footer-font">发布</span>
      </router-link>
      <router-link :to="{name: 'message'}" class="footer-mine">
        <span class="footer-mine-img"></span>
        <span class="footer-font">消息</span>
      </router-link>
      <router-link :to="{name: 'user'}" class="footer-mine">
        <span class="footer-mine-img"></span>
        <span class="footer-font">个人中心</span>
      </router-link>
    <!--</nav>-->
		<transition name="page">
      <keep-alive>
			 <router-view class="pageview"></router-view>
      </keep-alive>
		</transition>

		<v-footer></v-footer>
	</div>
</template>

<script>
	import  ani from '../css/ani.css'
//	import Footer from './components/main-footer.vue';
	export default {
		components: {
//			'v-footer': Footer
		}
	};
</script>

<style>

</style>
