<template>
	<div>
		<div class="assess-box">
		<header class="roder-top">
			<router-link :to="{name: 'goodsList'}">
				<img src="../../image/leftArrow.png" alt="" />
			</router-link>
			<h1 class="mui-title">快递回收</h1>
			<router-link :to="{name: 'index.home'}" class="home-img">
				<img src="../../image/ico1_ac.png"/>
			</router-link>
		</header>
		<div class="mui-content">
			<div class="mui-col-xs-12 recov-pro">
				<div class="recov-pro-head mui-clearfix">
					<div class="round change-active fl"></div>
					<div class="long change-active fl"></div>
					<div class="round change-active fl"></div>
					<div class="long change-active fl"></div>
					<div class="round round-active fl"></div>
				</div>
				<div class="mui-clearfix recov-pro-tst">
					<p class="mui-col-xs-3 fl">回收方式</p>
					<p class="mui-col-xs-6 fl">填写信息</p>
					<p class="mui-col-xs-3 fl">提交成功</p>
				</div>
			</div>
			<div class="succue">
				<div class="succue-imgBox">
			        <div>
						<img src="../../image/bg-img11.jpg" class="">
					</div>
					<div class="">
						订单提交成功
						<p>交易金额:&nbsp; ￥{{price}}</p>
					</div>
				</div>	
				<p class="btn"><router-link :to="{name: 'orderCenter'}">查看订单</router-link></p>
			</div>
			<div class="mailmessg" v-if="address">
				<h4>邮寄信息</h4>
				<p>邮寄地址：{{address}}</p>
				<p>电话号码：{{phone}}</p>
			</div>
			<div class="mate-ned" v-if="bangzhu">
				<h4>注意事项</h4>
				<div class="mui-row">
					<div>
						<img src="../../image/backup.jpg" class="mui-col-xs-2"/>
					</div>
					<div class="mui-col-xs-10 m-span-box">
						<span>备份个人数据</span>
						<p>拔出SIM卡，备份个人数据(恢复出厂设置)使用QQ同步助手，备份数据并删除手机数据</p>
					</div>
				</div>
				<div class="mui-row">
					<div>
						<img src="../../image/clear.jpg" class="mui-col-xs-2"/>
					</div>
					<div class="mui-col-xs-10 m-span-box">
						<span>解锁所有账号密码</span>
						<p>苹果：【如何解iCloud锁：设置>iCloud>注销>从我的iPhone中删除>输入密码>删除】</p>
					</div>
				</div>
				<div class="mui-row">
					<div>
						<img src="../../image/remark.jpg" class="mui-col-xs-2"/>
					</div>
					<div class="mui-col-xs-10 m-span-box">
						<span>邮寄备注</span>
						<p>拔出SIM卡，备份个人数据(恢复出厂设置)使用QQ同步助手，备份数据并删除手机数据</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import contextPath from '../../js/commonUtils.js';
	
	export default {
		data(){
			return{
				bangzhu:false,
				price:'',
		      	orderId:'',
		      	address:'',
				phone:'',
				adressNewShow:true,
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
		mounted(){
			var param = eval("("+sessionStorage.getItem("param")+")");
			this.price = (param.rGoodsInquiryPrice*param.goodsnum).toFixed(2);
			this.orderId = param.orderId;
			this.address = param.sendAddress;
			this.phone = param.sendContactsMobile;
			if(this.address == '' && this.phone == ''){
				this.adressNewShow = false;
			}
		}
	}
</script>

<style>
</style>