<template>
	<div id="account">
		<header class="concern-header">
			<span id="back" v-on:click="back">
				<img src="../../image/leftArrow.png" alt="" />
			</span>
			<h1 class="mui-title">解绑支付宝账户</h1>
		</header>
		<div class="content">
			<div class="inp rebind">
				<span>支付宝账户</span>  
				<span>{{account}}</span>
			</div>
				<button @click="goverify">解绑支付宝</button>
		</div>
	
	</div>
</template>

<script>
import axios from "axios";
import contextPath from '../../js/commonUtils.js';
import TipFunction from '../../js/merge.js';
var that;
export default {
		data() {
			//模板数据
			return {
				data:'',
				account:this.$route.query.account,
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
			},
			goverify(){
				this.$router.push({name: 'checkmobile',params: {type:'3',btnname:'解绑',requestType:'BANK_UNBIND',bankInfoId:this.$route.query.id}})
			}
			
		},
		computed: {

		}
		
	}
</script>

<style scoped>
	.content{
		margin-top: 70px;
	}
	.rebind{
		padding: 20px .2rem;
		display: flex;
	}
	
	.rebind>span{
		display: inline-block;
		word-break: break-word;
	}
	.rebind>span:first-child{
		width: 150px;
	}
	.rebind>span:last-child{
		width: 100%;
	}
	.inp{
		width: 100%;
		height: 80px;
	}
	#back{
		padding-left: 20px;
		position: absolute;
	}
	#back img{
	    width: .1rem;
    	height: .16rem;
	}
	button {
		width: 90%;
		height: 50px;
		background-color: #fece38;
		margin: 0 auto;
		display: block;
		margin-top: 30px;
		font-size: 20px;
		color: rgba(0,0,0,.9);
	}
	.tip{
		text-align: center;
		line-height: 44px;
		font-size: 14px;
		color: rgba(0,0,0,.5);
	}
</style>