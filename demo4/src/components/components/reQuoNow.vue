<template>
	<div>
		<div class="assess-box">
		<header class="roder-top">
			<a v-on:click="back">
				<img src="../../image/leftArrow.png" alt="" />
			</a>
			<h1 class="mui-title">拒绝报价</h1>
		</header>
		<div class="req-img">
			<div><img src="../../image/bg-img15.png" alt="" /></div>
			<p>您将取消此次交易，请补全一下物流信</p>
			<p>息，方便退回您的物品</p>
		</div>
		<div class="req-inp">
			<p><span>联系人</span><input type="text" name="" v-model="userName" placeholder="请输入您的姓名" readonly="readonly" maxlength="20"/><b>  </b></p>
			<p><span>联系电话</span><input type="text" v-model="phone" value="" placeholder="请输入您的电话" readonly="readonly" maxlength="11"/><b>  </b></p>
			<p><span>所在地区</span><input type="text" v-model="defaultCity" readonly="readonly" /></p>
			<textarea v-model="address" rows="" cols="" maxlength="300"  readonly="readonly" placeholder="请填写详细地址。不少于五个字">
			</textarea>
		</div>
		<div class="req-price">
			<p>快递费用：<span>¥{{price}}</span></p>
			<div class="req-price-in">
				<div @click="paymoney(1)">现在付款</div>
				<div @click="paymoney(2)">稍后付款</div>
			</div>
		</div>
		<form method="post" id="payForm" :action="action">
			<input type="hidden" name="from" value="WX"/>
			<input type="hidden" name="paymentType" value="20"/>
			<input type="hidden" name="productType" value="2002"/>
			<input type="hidden" name="recoveryOrderId" :value="orderId"/>
		</form>
	</div>
	</div>
</template>

<script>
import contextPath from '../../js/commonUtils.js';
import TipFunction from '../../js/merge.js';
import axios from 'axios';
export default {
	data() {
		return {
			userName:'',//用户名称
			phone:'',//电话号码
			address:'',//备注
			defaultCity: '',//显示地址信息
			price: 0,//快递费用
			orderId:0,//订单编号
			action:'',//支付宝表单
		}
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
	methods: {
		//fanhui
		back(){
			if(this.channel == 'IOS') {
					webViewPop();
			} else if(this.channel == 'ANDROID') {
					window.AndroidNative.webViewPop();
			}else{
				window.history.back();
			}
		},
		//获取订单信息
		getOrderInfo(){
			axios.get(contextPath.contextPath + 'waorder/getOrderDetail', {
					params: {
						from: 'WX',
						orderId: this.orderId
					}
				})
				.then((res) => {
					if(res.data.rescode == '00000'){
						var data = res.data;
						this.userName = data.returnContactsName;
						this.phone = data.returnContactsMobile;
						this.defaultCity = data.returnAddressProvince+data.returnAddressCity+data.returnAddressArea;
						this.address = data.returnAddressDetail;
						this.price = data.returnExpressAmount;
					}
				})
				.catch((response) => {
					TipFunction.loadingMessage(response);
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000);
				});
		},
		//立即付款/稍后付款 t:1:现在付款,2:稍后付款
		paymoney(t){
			if(t==1){
				$("#payForm").submit();
			}else if(t==2){
				this.$router.push({path:'/orderCenter'});
			}
		},
	},
	mounted() {
		var action = contextPath.contextPath + "wapay/cashier/toNotSdkPay";
		this.action = action;
	},
	created() {
		//获取商品编号
		var orderId = this.$route.query.orderId;
		this.orderId = orderId;
		this.getOrderInfo();
	},
}
</script>
<style>

</style>