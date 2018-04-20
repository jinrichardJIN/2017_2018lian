<template>
	<div id="account">
		<header class="concern-header">
			<span id="back" v-on:click="back">
				<img src="../../image/leftArrow.png" alt="" />
			</span>
			<h1 class="mui-title">手机验证</h1>
		</header>
		
		<verify :fdata="data0"></verify>
		
	</div>
</template>

<script>
import axios from "axios";
import contextPath from '../../js/commonUtils.js';
import TipFunction from '../../js/merge.js';
import verify from '../components/verify.vue';  
export default {
		data() {
			//模板数据
			return {
				data0:{'btnname':this.$route.params.btnname,
				'type':this.$route.params.type,
				'realname': this.$route.params.realname,
				'bankCode':this.$route.params.bankCode,
				'bankInfoId':this.$route.params.bankInfoId,
				'amount':this.$route.params.amount,
				'requestType':this.$route.params.requestType
				}
			}
		},
		components: {
		   'verify':verify
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
			},
			bind(){
				alert('b')
			}
			
		},
		computed: {

		},
		mounted() {
			var _this = this;
		}
	}
</script>

<style scoped>
	.content{
		margin-top: 70px;
	}
	#account{
		background-color:ghostwhite;
	}
	#accountnum{
		width: 100%;
		height: 200px;
		background-color: #fece38;
		text-align: center;
		display: table;
		margin-top: 44px;
	}
	#accountnum>div{
		display: table-cell;
		vertical-align: middle;
	}
	
	
	#line{
		width: 100%;
		font-size: 14px;
		text-align: center;
		background-color: white;
		padding-top: 20px;
	}
	#back{
		padding-left: 20px;
		position: absolute;
	}
	#back img{
	    width: .1rem;
    	height: .16rem;
	}
</style>