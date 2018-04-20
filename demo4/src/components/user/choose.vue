<template>
	<div id="choose">
		<header class="concern-header">
			<span id="back" v-on:click="back">
				<img src="../../image/leftArrow.png" alt="" />
			</span>
			<h1 class="mui-title">提现</h1>
		</header>
		<ul v-for="it in list" style="margin-top: 70px;" >
			<li @click="back" >
				<span>支付宝</span>
				<p>{{it.alipayNo}}</p>
				<div class="choose">
					<img src="choose.jpg">
				</div>
			</li>
			
		</ul>
	</div>
</template>

<script>
import axios from "axios";
import contextPath from '../../js/commonUtils.js';
import TipFunction from '../../js/merge.js';

export default {
		data() {
			//模板数据
			return {
				data:'',
				list:[],
				channel:sessionStorage.getItem('channel')
			}
		},
		beforeCreate() {
			var that=this;
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
		methods: {
			back(){
				window.history.back()
				
			}
			
		},
		computed: {

		},
		mounted() {
			var _this = this;
			axios.get(contextPath.contextPath+'wabindBank/getBindBankInfo', {
					params: {
						from: 'WX',
						bankType:''
					}
				})
				.then(res=>{
					var cData = res.data;
					if(cData.rescode === '00000') {
						_this.list=cData.list;
					} else {
						TipFunction.loadingMessage(res.data.resmsg);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
					}
				})
				.catch(function(response) {
					TipFunction.loadingMessage(response);
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000)
				});
		}
	}
</script>

<style scoped>
	li{
		padding: 20px;
	}
	li:after{
		content:"";
		width: 96%;
		height: 1px;
		display: block;
		background-color: gainsboro;
		margin: 0 auto;
		margin-top:16px 
	}
	li>p{
		font-size: 12px;
	}
	#back{
		padding-left: 20px;
		position: absolute;
	}
	#back img{
	    width: .1rem;
    	height: .16rem;
	}
	.choose{
		float: right;
		margin:0 20px;
		margin-top: -28px;
	}
</style>