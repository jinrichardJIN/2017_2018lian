<template>
	<div id="trunout">
		<header class="concern-header">
			<span id="back" v-on:click="back">
				<img src="../../image/leftArrow.png" alt="" />
			</span>
			<h1 class="mui-title">提现</h1>
		</header>
		<div id="toaccount" class="card">
			<div class="accountdetail">
				提现账户
			</div>
			<div class="accountdetail">
				<div>
					<!--<router-link :to="{name: 'choose'}">-->
						支付宝<span class="go">></span>
					<!--</router-link>-->
					</br>
					{{account.alipayNo}}
				</div>
			</div>
		</div>
		<div id="trun-out" class="card">
			<span>提现金额</span><br>
			<span class="rmb">¥</span>
			<input v-model="amount" @keyup="checkmax" type='tel' maxlength="8" 
				onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();" 
				/>
		</div>
		<div id="goturnout" class="card">
				<div>
					账户余额¥{{max}} <span @click="all">全部提现</span>
				</div>
				<button @click="turnout">提现</button>
				提现金额最低1元，最高5000元，每周可提现一次
		</div>
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
				amount:'',
				id:'',
				max:'',
				account:{},
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
			checkmax(){
				if(parseFloat(this.amount)>=parseFloat(this.max)){
					this.amount=this.max
				}
			},
			all(){
				this.amount=this.max;
			},
			turnout(){
				if(this.amount<1){
					TipFunction.loadingMessage('最小金额为1元');
						setTimeout(function() {
							TipFunction.hideLoading();
					}, 2000)
					return
				}
				this.$router.push({name:'checkmobile',params:{bankInfoId:this.id,amount:this.amount,type:'2',btnname:'提现',requestType:'WITHDRAW_APPLY'}})
			
			}
			
		},
		computed: {

		},
		mounted() {
			var _this = this;
			axios.get(contextPath.contextPath + 'wabindBank/getUserEntry', {
					params: {
						from: 'WX'
					}
				})
				.then(function(res) {
					var cData = res.data;
					if(cData.rescode === '00000') {
						_this.max=cData.list.userBalance;
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
				axios.get(contextPath.contextPath+'wabindBank/getBindBankInfo', {
					params: {
						from: 'WX',
						bankType:''
					}
				})
				.then(res=>{
					var cData = res.data;
					if(cData.rescode === '00000') {
						_this.account=cData.list[0];
						_this.id=cData.list[0].id
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
	
	#trunout{
		height: 100vh;
		background-color:ghostwhite;
	}
	#toaccount{
		margin-top: 75px;
		background-color: rgba(0,0,0,.02);
		padding: 20px;
		overflow: hidden;
	}
	.card{
		width:90%;
		margin: 0 auto;
	}
	#line{
		width: 100%;
		font-size: 14px;
		text-align: center;
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
	.accountdetail{
		float: left;
		font-size: 16px;
	}
	.accountdetail>div{
		margin-left: 20px;
		color: gray;
	}
	.accountdetail span{
		color: cornflowerblue;
	}
	#trun-out{
		height: 100px;
		background-color: white;
		padding: 20px;
	}
	.rmb{
		font-size: 30px;
	}
	#trun-out input{
		width: 80%;
		padding: 5px 0px 3px 15px;
		border-bottom: 1px solid #DEDEDE;
	}
	#goturnout{
		background-color: white;
		height: 200px;
		font-size: 14px;
		text-align: center;
		line-height: 50px;
		color: gray;
	}
	#goturnout button{
		width: 80%;
		height: 60px;
		background-color: #fece38;
		margin: 0 auto;
		display: block;
		font-size: 20px;
		color: rgba(0,0,0,.9);
		
	}
	#goturnout>div{
		float: left;
		margin-left: 20px;
	}
	#goturnout span{
		color: cornflowerblue;
	}
	.go{
		float: right;
		color: gray!important;
	}
</style>