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
			<p><span>联系人</span><input type="text" name="" v-model="userName" placeholder="请输入您的姓名" maxlength="20"/><b>  </b></p>
			<p><span>联系电话</span><input type="text" v-model="phone" value="" placeholder="请输入您的电话" maxlength="11"/><b>  </b></p>
			<p><span>所在地区</span><input type="text" name="" @click="showCity" value="" v-model="defaultCity" id="citySele" />
			<b> <img src="../../image/leftarr.png" alt="" style="height: .16rem;"/> </b></p>
			<textarea v-model="address" rows="" cols="" maxlength="120" placeholder="请填写详细地址，不少于5个字。">
			</textarea>
			<span class="sysnum"><span>{{sysnum}}</span>/120</span>
		</div>
		<div class="huitiao"></div>
		<div class="req-price">
			<p>快递费用：<span>¥{{price}}</span></p>
			<div class="req-price-in">
				<div @click="paymoney(1)">现在付款</div>
				<div @click="paymoney(2)">稍后付款</div>
			</div>
		</div>
		<form method="post" id="payForm" :action="action">
			<input type="hidden" name="from"/>
			<input type="hidden" name="paymentType"/>
			<input type="hidden" name="productType"/>
			<input type="hidden" name="recoveryOrderId"/>
		</form>
		<vue-area :props-show="show" :props-result="result" v-on:result="areaResult"></vue-area>
	</div>
	</div>
</template>

<script>
import contextPath from '../../js/commonUtils.js';
import TipFunction from '../../js/merge.js';
import axios from 'axios';
import vueArea from 'vue-area' //三级联动组件调用
export default {
	data() {
		return {
			userName:'',//用户名称
			phone:'',//电话号码
			address:'',//备注
			provinceName: '',
			cityName: '',
			areaName: '',
			provinceNo: '',
			cityNo: '',
			areaNo: '',
			defaultCity: '',//显示地址信息
			result: null,//地址选择组件
			show: false,//地址选择组件
			price: 0,//快递费用
			rgoodsId: '',//商品编号
			orderId:0,//订单编号
			action:'',//支付宝表单
			sysnum:0,//备注输入字数
		}
	},
	components: {
		vueArea
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
	watch:{
		address(value){
			this.sysnum = value.length;
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
		//显示城市选择
		showCity() {
			this.show = true;
		},
		//获取快递费用
		queryCost() {
			axios.get(contextPath.contextPath+'walogisticsPrice/getLogisticsPrice', {
					params: {
						from: 'WX',
						goodsId: this.rgoodsId,
						provinceId: this.provinceNo,
						province: this.provinceName
					}
				})
				.then((res) => {
					if(res.data.rescode == '00000'){
						this.price = res.data.freightPrice;
					}else{
						this.price = "";
						TipFunction.loadingMessage(res.data.resmsg);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
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
			if(!this.userName || this.userName=="") {
				TipFunction.loadingMessage('请输入联系人  ');
				setTimeout(function() {
					TipFunction.hideLoading();
				}, 2000)
				return;
			} else if(!this.phone || this.phone == "") {
				TipFunction.loadingMessage('请输入手机号  ');
				setTimeout(function() {
					TipFunction.hideLoading();
				}, 2000)
				return;
			} else if(!/^1(3|4|5|7|8)\d{9}$/.test(this.phone)) {
				TipFunction.loadingMessage('请输入正确的手机号  ');
				setTimeout(function() {
					TipFunction.hideLoading();
				}, 2000)
				return;
			} else if(!this.defaultCity || this.defaultCity == "") {
				TipFunction.loadingMessage('请选择您的地址  ');
				setTimeout(function() {
					TipFunction.hideLoading();
				}, 2000)
				return;
			} else if(this.address.length < 5) {
				TipFunction.loadingMessage('详细信息不得少于五个字  ');
				setTimeout(function() {
					TipFunction.hideLoading();
				}, 2000)
				return;
			}
			axios.get(contextPath.contextPath+'waorder/getConfirmGoodsPrice', {
					params: {
						from: 'WX',
						orderId:this.orderId,
						approvePrice:'N',
						return_address_province: this.provinceName, //省
						return_address_city: this.cityName, //市
						return_address_area: this.areaName, //区
						return_address_detail: this.address, //详细地址
						return_contacts_name: this.userName, //详细联系人
						return_contacts_mobile: this.phone //电话
					}
				})
				.then((res) => {
					var oData = res.data;
					if(oData.rescode === "00000") {
						if(t==1){
							$("#payForm input[name='from']").val("WX");
							$("#payForm input[name='paymentType']").val("20");
							$("#payForm input[name='productType']").val("2002");
							$("#payForm input[name='recoveryOrderId']").val(this.orderId);
							$("#payForm").submit();
						}else if(t==2){
							this.$router.push({path:'/orderCenter'});
						}
					} else {
						TipFunction.loadingMessage(res.data.resmsg);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
					}
				})
				.catch((response) => {
					TipFunction.loadingMessage(response);
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000);
				});
		},
		//三级联动确认按钮
		areaResult: function(show, result) {
			this.show = show;
			this.result = result;
			if(this.result != null) {
				this.provinceName = this.result.province.name || ""; //省
				this.areaName = this.result.area.name || ""; //区
				if(this.result.city.name == '市辖区'){
		          	this.cityName = this.result.province.name;
		        }else{
		         	this.cityName = this.result.city.name || "";
		        }
				this.provinceNo = this.result.province.code || ""; //省编码
				this.cityNo = this.result.city.code || ""; //市编码
				this.areaNo = this.result.area.code || ""; //区编码
				this.defaultCity = this.provinceName + this.cityName + this.areaName; //显示到页面
				//获取快递费用
				this.queryCost();
			}
		},
		//调用三级联动
		selectAddress() {
			this.show = true;
		}
	},
	mounted() {
		var action = contextPath.contextPath + "wapay/cashier/toNotSdkPay";
		this.action = action;
	},
	created() {
		//获取商品编号
		var rgoodsId = this.$route.query.rgoodsId;
		this.rgoodsId = rgoodsId;
		var orderId = this.$route.query.orderId;
		this.orderId = orderId;
	},
}
</script>

<style>

</style>