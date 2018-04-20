<template>
	<div id="detailinfo">
		<header class="concern-header">
			<span id="back" v-on:click="back">
				<img src="../../image/leftArrow.png" alt="" />
			</span>
			<h1 class="mui-title">账单详情</h1>
		</header>
		<div style="margin-top: 70px">
		<div class="top">
			<p>
				<img v-if="detail.fundFlowValue=='3'||detail.paymentType=='3'"  src="../../image/push.png">
				<img v-if="detail.fundFlowValue=='2'||detail.paymentType=='2'"  src="../../image/recy.png">
				<span>交易类型</span>
			</p>
			<p class="money"><span>+</span>¥{{detail.inAmt||detail.withdrawAmount}}</p>
			<span v-if="detail.withdrawStatus=='0'">提现中</span>
			<span v-if="detail.withdrawStatus=='1'">交易成功</span>
			<span v-if="detail.withdrawStatus=='2'">交易失败</span>
			<span v-if="detail.withdrawStatus=='3'">交易失败已退还</span>
		</div>
		<ul class="body">
			<li >
				<span>交易说明</span>   
				<span>{{detail.coment||detail.summary}}</span>
			</li>
			<li >
				<span>创建时间</span>   
				<span>{{detail.createTime | hanstime}}</span>
			</li>
			<li >
				<span>结算时间</span>
				<template v-if="detail.type==1">
					<span>{{detail.transTime | hanstime}}</span>
				</template>
				<template  v-if="detail.type==0">
					<span>{{detail.createTime | hanstime}}</span>
				</template>
			</li>
			<li >
				<span>订单号</span>        
				<span>{{detail.id}}</span>
			</li>
			<li>
				<span>商家订单号</span>   
				<span>{{detail.orderId||detail.thirdOrderNo}}</span>
			</li>
		</ul>
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
				detail:{},
				jstime:'',
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
				window.history.back();
			}
		},
		created(){
			var _this = this;
			
			
			if(_this.$route.params.id==undefined){
				_this.detail=eval('('+sessionStorage.getItem('detail')+')')
			}else{
				_this.detail=this.$route.params;
				sessionStorage.setItem('detail',JSON.stringify(this.$route.params));
			}
			console.log(_this.detail);
		},
		filters:{
			hanstime:function(value){
				if(value){
					return value.substr(0,value.length-3);
				}
			}
		}
	}
</script>

<style scoped>
	.money{
		color: #F0AD4E;
		font-size: 26px;
		font-weight: bold;
	}
	.top{
		height: 120px;
		text-align: center;
		border-bottom: 1px solid gainsboro;
	}
	
	.top img{
		width: 24px;
		
	}
	ul{
		margin: 0 auto;
		width: 100%;
	}
	.body{
		padding: 20px 30px;
		font-size: 14px;
		
	}
	.body span:first-child{
		display: inline-block;
		width: 130px;
		flex-grow: 0;
	}
	.body>li{
		display: flex;
	}
	#back{
		padding-left: 20px;
		position: absolute;
	}
	#back img{
	    width: .1rem;
    	height: .16rem;
	}
	.body span:last-child{
		width: 100%;
		display: inline-block;
		vertical-align: text-top;
		word-break: break-all;
	}
</style>