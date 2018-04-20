<template>
	<nav class="mui-bar mui-bar-tab footer">
		<router-link :to="{name: 'index.home'}" class="footer-index">
			<span class="footer-index-img"></span>
			<span class="footer-font">首页</span>
		</router-link>
		<router-link :to="{name: 'index.mobAll'}" class="footer-moball">
			<span class="footer-moball-img"></span>
			<span class="footer-font active-foot-bg">机型大全</span>
		</router-link>
		<router-link :to="{name: 'index.mine'}" class="footer-mine">
			<span class="footer-mine-img"></span>
			<span class="footer-font">个人中心</span>
		</router-link>
	</nav>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	mounted() {

	}
};
</script>

<style>
</style>
