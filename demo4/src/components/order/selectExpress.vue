<template>
	<div>
		<div class="assess-box">
		<header class="roder-top">
			<router-link :to="{name: 'orderDetails',query:{orderId:orderId}}">
				&lt;
			</router-link>
			<h1 class="mui-title">选择快递</h1>
		</header>
		<div class="lanceng">
			
		</div>
		<div class="seleExp">
			<ul>
				<router-link :to="{name: 'orderDetails',query:{orderId:orderId, expressKey:express[index].key, expressVal:express[index].val}}"  
					v-for="(item,index) in express" :key='express[index]'>
					<li>
						{{express[index].val}}
					</li>
				</router-link>
			</ul>
		</div>
	</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			express : [
				{
					'key':'youzhengguonei',
					'val':'邮政包裹/平邮'
				},
				{
					'key':'ems',
					'val':'EMS'
				},
				{
					'key':'shunfeng',
					'val':'顺丰'
				},
				{
					'key':'shentong',
					'val':'申通'
				},
				{
					'key':'yuantong',
					'val':'圆通'
				},
				{
					'key':'zhongtong',
					'val':'中通'
				},
				{
					'key':'huitongkuaidi',
					'val':'汇通'
				},
				{
					'key':'yunda',
					'val':'韵达'
				},
				{
					'key':'tiantian',
					'val':'天天'
				},
				{
					'key':'debangwuliu',
					'val':'德邦'
				},
				{
					'key':'guotongkuaidi',
					'val':'国通'
				},
				{
					'key':'youshuwuliu',
					'val':'优速'
				},
				{
					'key':'quanfengkuaidi',
					'val':'全峰'
				},
				{
					'key':'jd',
					'val':'京东'
				},
				{
					'key':'suer',
					'val':'速尔'
				},
				{
					'key':'kuaijiesudi',
					'val':'快捷'
				},
				{
					'key':'annengwuliu',
					'val':'安能'
				},
				{
					'key':'suteng',
					'val':'广东速腾'
				}
			],
			orderId:0
		}
	},
	methods: {
		
	},
	mounted() {
		//获取订单列表
			
	},
	beforeCreate() {
		var that = this;
		if(userid === 0) {
			//跳登录
			TipFunction.loadingMessage('您尚未登录，为你跳转到登录页面');
			setTimeout(function() {
				TipFunction.hideLoading();
				that.$router.push({
					path: '/login'
				})
			}, 2000);
		} 
	},
	created(){
		var orderId = this.$route.query.orderId;
	    this.orderId = orderId;
	}
}	
</script>

<style>

</style>