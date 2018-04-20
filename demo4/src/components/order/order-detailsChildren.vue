<template>
	<div>
		<div class="detChitop-box">
		<header class="detChitop">
			<router-link :to="{name: 'orderDetails',query:{orderId:orderId}}">
				<img src="../../image/leftArrow.png" alt="" />
			</router-link>
			<h1 class="mui-title">订单详情</h1>
		</header>
		<div class="mui-content order-content">
			<div class="order-title">订单状态</div>
			<div class="ord-statue-content">
				<ul class="statue-nav">
					<li :class="{active: index==0}" v-for="(item,index) in datalist">
						<p>{{item.name}}</p>
						<p :class="{lasttime: index==listlength-1}">{{item.time}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
import axios from 'axios'; 
import contextPath from '../../js/commonUtils.js';
import TipFunction from '../../js/merge.js';
	export default {
		data() {
			return {
				list: '',
				datalist:[],
				listlength:0,
			}
		},
		beforeCreate(){
			var that = this;
			if(userid === 0){
				//跳登录
				TipFunction.loadingMessage('您尚未登录，为你跳转到登录页面');
				setTimeout(function(){
					TipFunction.hideLoading();
					that.$router.push({path:'/login'})
				},2000);
			}
		},
		created() {
			var orderId = this.$route.query.orderId;
			this.orderId = orderId;

			this.$nextTick(() => {
				axios.get(contextPath.contextPath+'waorder/getOrderDetail', {
						params: {
							from: 'WX',
							orderId: this.orderId
						}
					})
					.then((res) => {
						if(res.data.rescode == '00000'){
							var data = res.data;
							var list = [];
							//判断订单状态是否为0：等待预审
							if(data.orderStatus == 0){
								var obj = new Object();
								obj.name = '等待预审';
								obj.time = data.createTime;
								list.push(obj);
							}else{
								//过了预审阶段需要判断是否有预审时间
								if(data.preTime){//预审时间
									var obj = new Object();
									obj.name = '等待预审';
									obj.time = data.createTime;
									list.push(obj);
									
									var obj2 = new Object();
									if(data.recoveryMode == 'S'){
										obj2.name = '等待到店';
									}else if(data.recoveryMode == 'D'){
										obj2.name = '等待取件';
									}else if(data.recoveryMode == 'E'){
										//预审之后有可能待商家担保，也有可能到待用户发货
										if(data.orderStatus=='E2'){
											obj2.name = '待用户发货';
										}else if(data.orderStatus=="E1"){
											obj2.name = '待商家缴纳预付金';
										}else{
											//如果过了E2/E1状态，如果有分销商担保付款时间，则经过了担保，没有则直接是用户发货
											if(data.guaranteeTime){	//分销商担保付款时间
												obj2.name = '待商家缴纳预付金';
											}else{
												obj2.name = '待用户发货';
											}
										}
									}
									obj2.time = data.preTime;
									list.push(obj2);
								}else{
									var obj = new Object();
									if(data.recoveryMode == 'S'){
										obj.name = '等待到店';
									}else if(data.recoveryMode == 'D'){
										obj.name = '等待取件';
									}else if(data.recoveryMode == 'E'){
										obj.name = '待商家缴纳预付金';
									}
									obj.time = data.createTime;
									list.push(obj);
								}
								
								if(data.dispatchTime){	//派单时间
									var obj = new Object();
									obj.name = '等待取件';
									obj.time = data.dispatchTime;
									list.push(obj);
								}
								if(data.guaranteeTime){	//分销商担保付款时间
									var obj = new Object();
									obj.name = '待用户发货';
									obj.time = data.guaranteeTime;
									list.push(obj);
								}
								if(data.userExpressTime){	//用户发货时间
									var obj = new Object();
									obj.name = '待商家收货';
									obj.time = data.userExpressTime;
									list.push(obj);
								}
								if(data.distrReceiptTime){	//分销商收货时间
									var obj = new Object();
									obj.name = '待核货';
									obj.time = data.distrReceiptTime;
									list.push(obj);
								}
								if(data.rgoodsCheckTime){	//商品核货时间
									var obj = new Object();
									//核完货后商品可能为E041,或者E6，如果当前订单状态为E401或者E6.
									if(data.orderStatus == 'E401'){
										obj.name = '待用户确认';
									}else if(data.orderStatus == 'E6'){
										obj.name = '待商家付款';
									}else{
										//如果，userConfirmCheckTime不为空
										if(data.userConfirmCheckTime){
											obj.name = '待用户确认';
										}else{
											obj.name = '待商家付款';
										}
									}
									obj.time = data.rgoodsCheckTime;
									list.push(obj);
								}
								if(data.userConfirmCheckTime){	//用户确认核货异议时间
									var obj = new Object();
									obj.name = '待用户付运费';
									obj.time = data.userConfirmCheckTime;
									list.push(obj);
								}
								if(data.returnPaymentTime){	//物流费用支付时间
									var obj = new Object();
									obj.name = '待商家退回';
									obj.time = data.returnPaymentTime;
									list.push(obj);
								}
								if(data.returnExpressTime){	//回寄物流时间
									var obj = new Object();
									obj.name = '待用户收货';
									obj.time = data.returnExpressTime;
									list.push(obj);
								}
								if(data.userReceiptTime){	//用户收货时间(针对回寄)
									var obj = new Object();
									obj.name = '已退回';
									obj.time = data.userReceiptTime;
									list.push(obj);
								}
								if(data.orderCompleteTime){	//订单完成时间
									var obj = new Object();
									obj.name = '已完成';
									obj.time = data.orderCompleteTime;
									list.push(obj);
								}
								if(data.cancelTime){	//订单完成时间
									var obj = new Object();
									obj.name = '已取消';
									obj.time = data.cancelTime;
									list.push(obj);
								}
							}
							list.reverse();
							this.datalist = list;	
							this.listlength = list.length;
						}
					})
					.catch((response) => {
						TipFunction.loadingMessage(response);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000);
					});
			})

		},
		mounted() {
			
		}
	}
</script>

<style>

</style>