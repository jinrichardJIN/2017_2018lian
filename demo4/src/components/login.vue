<template>
	<div class="login-container">
		<header class="roder-top">
			<i class="back"></i>
			<p class="title">登录</p>
			<p></p>
		</header>
		<input type="text" v-model="ckcode" class="mask-inp" maxlength="4" id="imgVerificationCode" />
		<a @click="changeImg()" class="mask-img">
			<img :src='now' class="img1" />
		</a>

		<div class="determine" @click="getckCode">确定</div>

		<div class="mui-input-group login-container">
			<div class="mui-input-row">
				<input type="text" class="phone" v-model="phone" maxlength="11" placeholder="请输入您的手机号码">
				<div class="telErrorMessage"></div>
			</div>
			<div class="mui-input-row valcode-container">
				<label class="getcode" :class="{disgetcode:isdisgetcode}" @click="openckCode">{{opatext}}</label>
				<input type="text" class="valcode" v-model="mscode" maxlength="4" placeholder="请输入手机验证码">
				<div class="stortErrorMessage">
				</div>
			</div>
		</div>
		<div class="mui-col-sm-12 sublogin-container">
			<button class="sublogin" @click="loginnow()">立即登录</button>
		</div>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios';
  	import { mapState } from 'vuex';
  	import {contextPath} from 'assets/js/merge.js';
	export default {
		data() {
			return {
				phone:'',//手机号
				mscode:'',//手机验证码
				ckcode:'',//图像验证码
				showmask:false,//图像验证码弹层是否显示
				countdown:60,//
				isdisgetcode:false,//是否不能获取验证码
				now: contextPath+"/imgcode?num="+Math.random(),//图形验证码图片
				opatext:'获取验证码',
				list: 'Math.random()',
				flag:0,
			}
		},
		computed:{
		},
		methods:{
				//立即登录
			loginnow(){
				var par = {
					from: 'WX',
					setUpFlag: '2',
					loginType: '1',
					checkcode: this.mscode,
					mobile: this.phone,
					channel:'IDLEWEBAPP'
				}
				var _that = this;
				axios.get(contextPath+'/wauser/loginAndregistr', { params: par })
					.then(function(data) {
						if(data.data.rescode=='00000'){
							userid=1;
					//		document.cookie ='IDLE_USER_SESSION'+'='+data.data.userInfo;
							sessionStorage.setItem('userId',1);
							sessionStorage.setItem('mobile',_that.phone);
							window.history.back();
						}
						TipFunction.loadingMessage(data.data.resmsg);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000)
					})
					.catch(function(response) {
						TipFunction.loadingMessage(response);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000)
					});
			},
			//打开获取图形验证码
			openckCode(){
				if(this.isdisgetcode){
					return;
				}
				var reg_phone = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
				if(!this.phone) {
					TipFunction.loadingMessage('手机号不能为空');
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
					return false;
				} else if(!reg_phone.test(this.phone)) {
					TipFunction.loadingMessage('请输入正确手机号！');
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
					return false;
				}else{
					this.showmask = true;
					this.now = contextPath+"/imgcode?num="+Math.random();
				}
			},
			//获取短信验证码
			getckCode(){
				var _this = this;
				var par = {
					from: 'WX',
					setUpFlag: '2',
					requestType: 'LOGIN',
					mobile: this.phone,
					imgVerificationCode: this.ckcode
				}
				axios.get(contextPath+'/wauser/getVerificationCode', { params: par })
					.then(function(data) {
						TipFunction.loadingMessage(data.data.resmsg);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000)
						if(data.data.rescode == '00000'){
							_this.showmask = false;
							_this.settime();
						}else{
							_this.now = contextPath+"/imgcode?num="+Math.random();
						}
					})
					.catch(function() {
						
					});
				
			},
			//关闭图形验证码弹层
			chosemask(){
				this.showmask = false;
			},
			//切换验证码图片
			changeImg(){
				this.now = contextPath+"/imgcode?num="+Math.random();
	      	},
	      	//重新获取验证码定时器
	      	settime() {
	      		var _this = this;
				if(this.countdown == 0) {
					_this.isdisgetcode = false;
					_this.opatext = "获取验证码";
					//obj.setAttribute("onclick", "settime(this)");
					_this.countdown = 60;
					return;
				} else {
					_this.isdisgetcode = true;
					_this.opatext = "重新获取(" + this.countdown + ")";
					this.countdown = this.countdown-1;
				}
				//setTimeout(	_this.settime(), 1000)
				setTimeout(	function(){
					_this.settime();
				}, 1000)
			},
		},
	};
</script>

<style scoped type="text/css" lang="scss">
@import "../css/core/reset.scss";
$main-color: #fece38;
.login-container{
	padding: 50px 0px;
}
.login-container{
    border-top: 10px solid #F5F6F6;
    padding: 20px 0px;
    .mui-input-row.valcode-container{
        padding-right: 15px;
        position: relative;
    }
    .mui-input-row{
        padding: 30px 0px 5px;
        height: 65px;
        width: 90%;
        margin: 0 auto;
        border-bottom: 1px solid #DFDFDF;
        input{
            height: 25px;
            display: block;
            font-size: 16px;
            padding-left: 52px;
            background-repeat: no-repeat;
            background-position: 15px center;
            background-size: 26px;
        }
        input.phone{
            background-image: url(../image/log1.jpg);
        }
        input.valcode{
            background-image: url(../image/log2.jpg);
        }
        label{
            background-color: #ffe48f;
            text-align: center;
            position: absolute;
            top: 20px;
            right: 15px;
            border-radius: 20px;
            color: #333333;
            font-size: 14px;
            padding: 8px;
        }
        label +input{
            float: left;
        }
        label.disgetcode{
            background-color: #EDEDED;
            color: $main-color;
        }
    }
}
.sublogin-container{
    padding: 0 20px;
    background-color: #FFF;
    .sublogin{
        font-size: 14px;
        color: #FFFFFF;
        width: 100%;
        background-color: $main-color;
        padding: 15px 0px;
        border-radius: 10px;
        border: 0px;
    }
}
</style>