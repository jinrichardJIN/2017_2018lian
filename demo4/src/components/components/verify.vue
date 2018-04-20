<template>
	<div>
		<div id="very">
		<div class="mui-content">
			<div class='mask' v-show="showmask">
				<div class="inMask">
					<div class="outClose">
						<p class="close" @click="closeShowBox()">
							×
						</p>
					</div>
					<div class="mask-content">
						<p class="mask-title">
							请按照图形输入字母数字
						</p>
						<p class="mask-middle">
							<input v-model="oImgVerificationCode" type="text" name="" class="mask-inp" id="imgVerificationCode" />
							<a @click="changeImg()" class="mask-img">
								<img :src='now' class="img1" />
							</a>
						</p>
						<div @click="setVerification" class="determine">
							确定
						</div>
					</div>

				</div>
			</div>
			<div class="mui-input-group login-container">
				<div class="mui-input-row">
					<!--<input v-model="phoNo" disabled="disabled" class="mui-input phone" id="phone" maxlength="11" placeholder="请输入您的手机号码">-->
					<span class="phone">{{phoNo|mob}}</span>
					<div class="telErrorMessage">

					</div>
				</div>
				<div class="mui-input-row valcode-container">
					<!--<label  @click="showMessBox()" class="getcode" id="sub-tele">获取验证码</label>-->
					<label class="getcode" :class="{disgetcode:isdisgetcode}" @click="showMessBox">{{opatext}}</label>
					<input v-model="checkcode" type="text" class="mui-input valcode" id="valcode" maxlength="6" placeholder="请输入手机验证码">
					<div class="stortErrorMessage">
					</div>
				</div>
			</div>
			<div class="mui-col-sm-12 sublogin-container">
				<button class="sublogin" id="sublogin" @click="comfirm" >{{fdata.btnname}}</button>
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
	props:['fdata'],
	data() {
			return {
				list: 'Math.random()',
				phoNo:sessionStorage.getItem('mobile'),
				oImgVerificationCode:"",
				checkcode:'',
				countdown:60,//
				now: contextPath.contextPath+"/imgcode?num="+Math.random(),
				opatext:'获取验证码',
				isdisgetcode:false,//是否不能获取验证码
				showmask:false,//图像验证码弹层是否显示
				
			}
	},
	mounted(){
		if(this.fdata.type==undefined){
			window.history.back()
		}
	},
	methods:{
		//校验手机号
      checkNum(e){
        var value = e.target.value;
        e.target.value = value.replace(/[^\d]/g, '');
        this.phoNo = e.target.value;
      },
      //验证码弹框
      showMessBox(){
         if(this.phoNo == "") {
         TipFunction.loadingMessage("手机号码不能为空");
				setTimeout(function() {
							TipFunction.hideLoading();
				}, 2000)
         return false;
         } else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.phoNo)) {
         TipFunction.loadingMessage("手机号码有误，请重填");
				setTimeout(function() {
							TipFunction.hideLoading();
				}, 2000)
         return false;
         }
//       验证码弹框
        this.showmask = true;
        this.changeImg();//更新验证码图片
      },
      //关闭验证码弹框
      closeShowBox(){
        this.showmask = false;
        this.changeImg();
      },
      //点击更换验证图片
      changeImg(){
        //var me = $(event.target);
        //me.attr("src", me.attr("src").replace(/\?.*/ig, "") + "?" + Math.random());
        this.now = contextPath.contextPath+"/imgcode?num="+Math.random();
      },
      //确定按钮 发送验证码
      setVerification(){
        var par = {
          from: 'WX',
          setUpFlag: '2',
          requestType: this.fdata.requestType,
          mobile: this.phoNo,
          imgVerificationCode: this.oImgVerificationCode
        }
        axios.get(contextPath.contextPath+'wauser/getVerificationCode', {params: par})
          .then((data) => {
            var oData = data.data;
            TipFunction.loadingMessage(data.data.resmsg);
			setTimeout(function(){
				TipFunction.hideLoading();
			},2000);
			
            if (oData.rescode == '00000') {
              $(".mask").hide();
              this.isClickAble = false;//阻止重复点击
              this.settime($("#showMessBox"));
              this.addCookie("secondsremained",60,60);//添加cookie记录,有效时间60s
              this.settime();
            } else {
            	this.changeImg();
                TipFunction.loadingMessage(oData.resmsg);
				setTimeout(function() {
					TipFunction.hideLoading();
				}, 2000);
            }
          })
          .catch(() => {

          });
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
        //确定
        comfirm(){
        	
        	if(this.checkcode.length<2){
        		TipFunction.loadingMessage('请输入验证码');
						setTimeout(function() {
							TipFunction.hideLoading();
				}, 2000)
        		return
        	}
        	if(this.fdata.type=="1"){
        	var par = {
		          from: 'WX',
		          bankType: '2',
		          realName: this.fdata.realname,
		          bankNo:this.fdata.bankCode,
		          checkcode:this.checkcode
        	}
        	axios.get(contextPath.contextPath+'wabindBank/addBank', {params: par})
          .then((data) => {
            var oData = data.data;
	            if (oData.rescode == '00000') {
	              window.history.go(-2)
	            } else {
	              	TipFunction.loadingMessage(oData.resmsg);
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000)
					
	            }
	          })
	          .catch((data) => {

	          });
        	
        }else if(this.fdata.type=="2"){
        	
        	axios.get(contextPath.contextPath + 'wabindBank/applyCash', {
					params: {
						from: 'WX',
						bankInfoId:this.fdata.bankInfoId,
						amount:this.fdata.amount,
						checkcode:this.checkcode
					}
				})
				.then(function(res) {
					var cData = res.data;
					if(cData.rescode === '00000') {
						TipFunction.loadingMessage("提现成功");
						setTimeout(function() {
							TipFunction.hideLoading();
							window.history.go(-2)
						}, 2000)
						
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
					}, 2000);
				});
        	
        }else if(this.fdata.type=='3'){
        	
        	axios.get(contextPath.contextPath + 'wabindBank/unbindBank', {
					params: {
						from: 'WX',
						bankInfoId:this.fdata.bankInfoId,
						checkcode:this.checkcode
					}
				})
				.then(function(res) {
					var cData = res.data;
					if(cData.rescode === '00000') {
						window.history.go(-2)
						
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
					}, 2000);
				});
        }
        }
        //end
      }
      
}
</script>
	
<style scoped>
.phone{
	text-align: center;	
	display: inline-block;
	width: 100%;
	}
</style>