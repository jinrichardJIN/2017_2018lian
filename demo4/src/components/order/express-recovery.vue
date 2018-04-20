<template>
	<div>
		<div class="assess-box":class="{showprotocol}">
		<header class="roder-top">
			<router-link :to="{name: 'choiceRecycling',query:{rgoodsId:rgoodsId}}">
				<img src="../../image/leftArrow.png" alt="" />
			</router-link>
			<h1 class="mui-title">填写信息</h1>
		</header>
		<div class="mui-content">
			<div class="mui-col-xs-12 recov-pro">
				<div class="recov-pro-head mui-clearfix">
					<div class="round change-active fl"></div>
					<div class="long change-active fl"></div>
					<div class="round round-active fl"></div>
					<div class="long fl"></div>
					<div class="round fl"></div>
				</div>
				<div class="mui-clearfix recov-pro-tst">
					<p class="mui-col-xs-3 fl">回收方式</p>
					<p class="mui-col-xs-6 fl">填写信息</p>
					<p class="mui-col-xs-3 fl">提交成功</p>
				</div>
			</div>
			<p class="mui-row"><img src="../../image/bg-img2.jpg" class="mui-col-xs-2"></img><span class="mui-col-xs-10 payment-method">收款方式</span></p>
			<div class="mui-row recov-pn mui-clearfix" style="border: none;">
				<img src="../../image/bg-img3.jpg" class="mui-col-xs-2" />
				<input type="text" class="mui-col-xs-7" placeholder="请输入您的手机号" maxlength="11" v-model='UserTelphone'>
			</div>
			<div class="bottomEEEline"></div>
			<div class="pay">
				<ul>
					<li class="mui-table-view-cell mui-collapse mui-active">
						<div>
							<img src="../../image/bg-img5.jpg" />
							<a href="javascript:void(0);" class="mui-navigate-right">支付宝收款</a>
							<img src="../../image/sta_03.png" alt="" style="float: right;"/>
						</div>
						<div class="mui-collapse-content">
							<input type="text" placeholder="输入您的姓名" maxlength="20" v-model='userName'>
							<input type="text" placeholder="输入支付宝账号" maxlength="30" v-model='AlipayNo'>
						</div>
					</li>
				</ul>
				<div class="txt-nav">
					<textarea name="" rows="4" cols="5" v-model="userDesc" maxlength="300" placeholder="请输入备注内容（可不填）"></textarea>
					<span class="sysnum"><span>{{sysnum}}</span>/300</span>
					<el-checkbox v-model="CheckBoxchecked"></el-checkbox>
					<span class="sureService readService">我已经阅读并同意<a href="javascript:void(0);" @click="showProtocol">闲汇服务条款</a>并确认机器来源合法</span>
				</div>
			</div>
		</div>
		<footer class="mui-bar-footer eval-foot-next" v-bind:class='{backgroundYello:form }'>
			<div class="next" @click="subOrder">提交订单</div>
			<!--<router-link :to="{name: 'expressSuccess',query:{addRecoveryOrder:addRecoveryOrder}}">
			</router-link>-->
		</footer>
    	<!--<vue-area :props-show="show" :props-result="result" v-on:result="areaResult"></vue-area>-->
    	<v-protocol v-show="showprotocol" v-on:closeprotocol="closeProtocol"></v-protocol>
	</div>
	</div>
</template>

<script>
import TipFunction from '../../js/merge.js';
import axios from 'axios';
import contextPath from '../../js/commonUtils.js';
import Protocol from '../components/protocol.vue';

export default {
	data() {
		return {
			rgoodsId:'',//商品编号
			goodsNum:'',//回收数量
			rgoodsInquiryInfoId:'',//评估编号
			
			CheckBoxchecked: true,
			userName: '',//名字
			collectMode: 2,//回收方式
			AlipayNo: '',//支付宝账号
			UserTelphone: '',//手机号
			userDesc:'',//用户备注
			form: false,
			subing:false,//是否在提交表单
			sysnum:0,//备注输入字数
			upImg:'',//上传的图片
			showprotocol:false,//是否显示用户协议
		}
	},
	components: {
		'v-protocol': Protocol,
	},
	created() {
		var mobile = sessionStorage.getItem('mobile');
		
		this.UserTelphone = loginMobile || mobile;
		
		var parm = eval("("+sessionStorage.getItem("param")+")");
		this.rgoodsId = parm.goodsId;
		//商品数量
		this.goodsNum = parm.num;
		//询价id
		this.rgoodsInquiryInfoId = parm.infoId;
		//获取上传图片
		this.upImg = parm.upImg;
	},
	methods: {
		//提交订单
		subOrder(){
			if(!(/^((13|15|18|14|17)[0-9]{9})$/.test(this.UserTelphone))) {
				TipFunction.loadingMessage('请输入正确的手机号');
				setTimeout(function() {
					TipFunction.hideLoading()
				}, 2000)
				return;
			}else if(!this.userName) {
				TipFunction.loadingMessage('请输入姓名');
				setTimeout(function() {
					TipFunction.hideLoading()
				}, 2000)
				return;
			}else if(!this.AlipayNo) {
				TipFunction.loadingMessage('请输入你的支付宝账号');
				setTimeout(function() {
					TipFunction.hideLoading()
				}, 2000)
				return;
			}  else if(this.CheckBoxchecked == false) {
				TipFunction.loadingMessage('请确认阅读服务条款');
				TipFunction.hideLoading()
				return;
			}
			
			//从session 中获取城市信息
			var city = eval("("+sessionStorage.getItem("city")+")");
			var cityName = city.cityName;
			var cityId = city.cityId;
			
			let sendData = {
				from:'WX',
				rgoodsId: this.rgoodsId,
				rgoodsInquiryInfoId: this.rgoodsInquiryInfoId,
				goodsNum: this.goodsNum,
				contactsName: this.userName,
				contactsMobile: this.UserTelphone,
				collectMode: this.collectMode,
				userDesc: this.userDesc,
				recoveryMode: 'E',
				collectAlipayNo: this.AlipayNo,
				city: cityName,
				cityId: cityId,
			}
			if(this.upImg){
				sendData.rgoodsPreImgInfo = this.upImg;
			}
			//调用接口提交订单
			var that = this;
			
			if(!that.subing){
				that.subing = true;
				axios.get(contextPath.contextPath+'waorder/addRecoveryOrder', {params: sendData})
		          .then((data) => {
		            var res = data.data;
		            if (res.rescode === "00000") {
		            	var param = {
		            		orderId : res.orderId,
		            		goodsnum:that.goodsNum,
							rGoodsInquiryPrice : res.rGoodsInquiryPrice,
							orderStatus : res.orderStatus,
							sendContactsName : res.sendContactsName,
							sendContactsMobile : res.sendContactsMobile,
							sendZipCode : res.sendZipCode,
							sendAddress : res.sendAddress
		            	}
						sessionStorage.setItem("param",JSON.stringify(param));
						that.$router.push({path:'/expressSuccess'});
		            } else {
		            	that.subing = false;
		              	TipFunction.loadingMessage(res.resmsg);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000)
		            }
		          })
		          .catch((err) => {
		          	that.subing = false;
		            TipFunction.loadingMessage(err);
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000)
		          });
			}
		},
		//打开协议
		showProtocol(){
			this.showprotocol = true;
		},
		//关闭协议
		closeProtocol(){
			this.showprotocol = false;
		},
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
	watch: {
		userDesc(value){
			this.sysnum = value.length;
		},
		userName(value) {
			if((/^((13|15|18|14|17)[0-9]{9})$/.test(this.UserTelphone) && this.CheckBoxchecked && this.userName && this.AlipayNo)) {
				this.form = true;
			} else {
				this.form = false;
			}
		},
		CheckBoxchecked(value) {

			if((/^((13|15|18|14|17)[0-9]{9})$/.test(this.UserTelphone) && this.CheckBoxchecked && this.userName && this.AlipayNo)) {
				this.form = true;
			} else {
				this.form = false;
			}
		},
		UserTelphone(value) {
			if((/^((13|15|18|14|17)[0-9]{9})$/.test(this.UserTelphone) && this.CheckBoxchecked && this.userName && this.AlipayNo)) {
				this.form = true;
			} else {
				this.form = false;
			}
		},
		AlipayNo() {
			if((/^((13|15|18|14|17)[0-9]{9})$/.test(this.UserTelphone) && this.CheckBoxchecked && this.userName && this.AlipayNo)) {
				this.form = true;
			} else {
				this.form = false;
			}
		}
	},
}
</script>

<style lang='scss'>
	.sureService {
		font-size: 12px;
		color: gray;
	}
	
	.backgroundYello {
		background: #FECE38 !important;
	}
</style>