<template>
	<div>
		<div class="assess-box">
		<header class="roder-top">
			<router-link :to="{name: 'home'}">
				<img src="../../image/leftArrow.png" alt="" />
			</router-link>
			<h1 class="mui-title">登录</h1>
		</header>
		<div class="mui-content">
			<div class='mask' v-show="showmask">
				<div class="inMask">
					<div class="outClose">
						<p class="close" @click="chosemask">
							<img src="../../image/guanbi.png" alt="" />
						</p>
					</div>
					<div class="mask-content">
						<p class="mask-title">请按照图形输入字母数字</p>
						<p class="mask-middle">
							<input type="text" v-model="ckcode" class="mask-inp" maxlength="4" id="imgVerificationCode" />
							<a @click="changeImg()" class="mask-img">
								<img :src='now' class="img1" />
							</a>
						</p>
						<div class="determine" @click="getckCode">确定</div>
					</div>
				</div>
			</div>
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
	</div>
</template>

<script>
	import axios from 'axios';
	import { mapState } from 'vuex';
	import contextPath from '../../js/commonUtils.js';
	import { Toast } from 'mint-ui';
	
	export default {
		data() {
			return {
				phone:'',//手机号
				mscode:'',//手机验证码
				ckcode:'',//图像验证码
				showmask:false,//图像验证码弹层是否显示
				countdown:60,//
				isdisgetcode:false,//是否不能获取验证码
				now: contextPath.contextPath+"/imgcode?num="+Math.random(),//图形验证码图片
				opatext:'获取验证码',
				list: 'Math.random()',
				flag:0,
			}
		},
		beforeCreate(){
			var channel = sessionStorage.getItem("channel");
			sessionStorage.setItem('togo',document.referrer);
			if(channel == 'IOS'){
				goLogin('XH');
			}else if(channel=='ANDROID'){
				window.AndroidNative.goLogin('XH');
			}
		},
		computed:{
			...mapState([
				'VXtel','VXrgoodsInquiryInfoId'
			]),
		},
		methods:{
			//立即登录
			loginnow(){
				var _this = this;
				var reg_phone = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
				if(!this.phone) {
					Toast({
					  message: '手机号不能为空',
					  position: 'bottom',
					  duration: 2000
					});
					
					return false;
				} else if(!reg_phone.test(this.phone)) {
					Toast({
					  message: '请输入正确手机号！',
					  position: 'bottom',
					  duration: 2000
					});
					return false;
				}
				
				var reg_code = /^[0-9]\d*$/;
				if(!this.mscode){
					Toast({
					  message: '请输入手机验证码！',
					  position: 'bottom',
					  duration: 2000
					});
					return false;
				}else if(this.mscode.length!=4 || !reg_code.test(this.mscode)){
					Toast({
					  message: '请正确输入手机验证码!',
					  position: 'bottom',
					  duration: 2000
					});
					return false;
				}
				
				var par = {
					from: 'WX',
					setUpFlag: '2',
					loginType: '1',
					checkcode: this.mscode,
					mobile: this.phone,
					channel:'IDLEWEBAPP'
				}
				var _that = this;
				axios.get(contextPath.contextPath+'wauser/loginAndregistr', { params: par })
					.then(function(data) {
						if(data.data.rescode=='00000'){
							userid=1;
				//			document.cookie ='IDLE_USER_SESSION'+'='+data.data.userInfo;
							sessionStorage.setItem('userId',1);
							sessionStorage.setItem('mobile',_that.phone);
							window.history.back();
						}
						Toast({
						  message: data.data.resmsg,
						  position: 'bottom',
						  duration: 2000
						});
						
						
					})
					.catch(function(response) {
						Toast({
						  message: response,
						  position: 'bottom',
						  duration: 2000
						});
					});
			},
			//打开获取图形验证码
			openckCode(){
				if(this.isdisgetcode){
					return;
				}
				var reg_phone = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
				if(!this.phone) {
					Toast({
					  message: '手机号不能为空',
					  position: 'bottom',
					  duration: 2000
					});
					return false;
				} else if(!reg_phone.test(this.phone)) {
					Toast({
					  message: '请输入正确手机号！',
					  position: 'bottom',
					  duration: 2000
					});
					return false;
				}else{
					this.showmask = true;
					this.now = contextPath.contextPath+"/imgcode?num="+Math.random();
				}
			},
			//获取短信验证码
			getckCode(){
				var _this = this;
				if(!this.ckcode){
					Toast({
					  message: '请输入验证码',
					  position: 'bottom',
					  duration: 2000
					});
					return false;
				}else if(this.ckcode.length!=4){
					this.now = contextPath.contextPath+"/imgcode?num="+Math.random();
					Toast({
					  message: '请正确输入验证码!',
					  position: 'bottom',
					  duration: 2000
					});
					return false;
				}
				var par = {
					from: 'WX',
					setUpFlag: '2',
					requestType: 'LOGIN',
					mobile: this.phone,
					imgVerificationCode: this.ckcode
				}
				axios.get(contextPath.contextPath+'wauser/getVerificationCode', { params: par })
					.then(function(data) {
						Toast({
						  message: data.data.resmsg,
						  position: 'bottom',
						  duration: 2000
						});
						if(data.data.rescode == '00000'){
							_this.showmask = false;
							console.log(_this.showmask);
							_this.settime();
							console.log(_this.settime());
						}else{
							_this.now = contextPath.contextPath+"/imgcode?num="+Math.random();
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
				this.now = contextPath.contextPath+"/imgcode?num="+Math.random();
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
@import "../../css/core/reset.scss";

.mui-input-group:before, .mui-input-group:after{
    background-color: transparent;
}
.mui-input-group .mui-input-row:after{
    background-color: #f0f0f0;
}
.roder-top {
    width: 100%;
    height: 44px;
    text-align: center;
    padding: 0 20px;
    background-color: #FFF;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
    @include flexbox();
    a {
        line-height: 44px;
        display: inline-block;
        img {
            height: 11px;
        }
    }
    .home-img {
        img {
            width: 25px;
            height: 25px;
        }
    }
    h1 {
        font-size: 15px;
        color: #333333;
        @include flex(1);
        line-height: 44px;
        display: inline-block;
    }
}

.mui-content{
	margin-top: 44px;
}

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
        	border:none;
            height: 25px;
            display: block;
            font-size: 16px;
            padding-left: 52px;
            background-repeat: no-repeat;
            background-position: 15px center;
            background-size: 26px;
        }
        input.phone{
            background-image: url(../../image/log1.jpg);
        }
        input.valcode{
            background-image: url(../../image/log2.jpg);
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
            color: #fece38;
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
        background-color: #fece38;
        padding: 15px 0px;
        border-radius: 10px;
        border: 0px;
    }
}


.mask{
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    .inMask{
        margin: 40% 10% 0;
        width: 80%;
        height: 220px;
        background: #fff;
        border-radius: 5px;
        .outClose{
            height: 40px;
            margin-top: 10px;
            .close{
                line-height: 40px;
                text-align: right;
                color:#E9EAEB;
                font-size: 50px;
                margin: 10px 10px 0 0;
                img{
                    width: 14px;
                    height: 14px;
                }
            }
        }
        .mask-content{
            padding: 0 10% 0%;
            .mask-title{
                text-align: center;
                color: #5A9CF8;
                font-family: "微软雅黑";
                font-size: 14px;
            }
            .mask-middle{
                margin-top: 20px;
                @include flexbox();
                @include justify-content(space-between);
                .mask-inp{
                    width: 50%;
                    text-indent: 20px;
                    background: #F5F5F5;
                    border: 1px solid #CCD5D6;
                    border-radius: 100px;
                }
                .mask-img{
                    overflow: hidden;
                }
            }
            .determine{
                font-size: 14px;
                color: #FFFFFF;
                width: 60%;
                height: 38px;
                border-radius: 20px;
                @include flexbox();
                @include align-items(center);
                @include justify-content(center);
                margin: 0 auto;
                background: #fece38;
                margin-top: 15px;
            }
        }
            

    }
}
</style>