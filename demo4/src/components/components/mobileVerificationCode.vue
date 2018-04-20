<!--手机验证码校验组件-->
<template>
  <div class="mobileVerificationCode">
    <div class="mui-row recov-pn mui-clearfix">
      <img src="../../image/bg-img3.jpg" class="mui-col-xs-2"/>
      <input type="text" class="mui-col-xs-6" placeholder="请输入您的手机号" @input="checkNum" value="" id="verificationPhoNo"/>
      <a href="javascript:void(0);" class="mui-col-xs-4 fl" @click="showMessBox" id="showMessBox" v-if="isClickAble">获取验证码</a>
      <a href="javascript:void(0);" class="mui-col-xs-4 fl" v-if="!isClickAble">{{countdown}}s后重新获取</a>
    </div>
    <div class="mui-row recov-pn mui-clearfix pn-change">
      <img src="../../image/bg-img4.jpg" class="mui-col-xs-2"/>
      <input type="number" class="mui-col-xs-6" placeholder="输入手机验证码"  id="verificationCodeNo"/>
    </div>
    <div class='mask' id="mask">
      <div class="inMask">
        <div class="outClose">
          <p class="close" @click="closeShowBox">
            ×
          </p>
        </div>
        <div class="mask-content">
          <p class="mask-title">
            请按照图形输入字母数字
                      </p>
          <p class="mask-middle">
            <input type="text" name="" class="mask-inp" id="imgVerificationCode" v-model="oImgVerificationCode"/>

            <a @click="changeImg" class="mask-img">
              <img :src="'/api/imgcode?num='+list" class="img1"/>
            </a>
          </p>
          <div class="determine" @click="setVerification">
            		确定
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  export default{
    data(){
      return {
        phoNo: "",
        isShowMask: false,
        list: Math.random(),
        oImgVerificationCode: '',
        countdown: 60,//重新发送验证码的间隔s
        isClickAble: true,//是否可以点击发送验证码按钮
      }
    },
    computed: {
    },
    created(){
    
      var cookieTime= this.getCookieValue("secondsremained");//获取cookie值 还剩多少时间可以重新发送验证码
      if(cookieTime>0){
        this.isClickAble=false;
        this.settime($("#showMessBox"));//开始倒计时
      }

    },
    methods: {
      //校验手机号
      checkNum(e){
        var value = e.target.value;
        e.target.value = value.replace(/[^\d]/g, '');
        this.phoNo = e.target.value;
      },
      //验证码弹框
      showMessBox(){
         if (this.phoNo == "") {
         alert("手机号不能为空");
         return false;
         } else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.phoNo)) {
         alert("手机号码有误，请重填");
         return false;
         }

//       验证码弹框
        $("#mask").show();
        this.list = Math.random();//更新验证码图片
      },
      //关闭验证码弹框
      closeShowBox(){
        $("#mask").hide();
      },
      //点击更换验证图片
      changeImg(e){
        var me = $(e.target);
        me.attr("src", me.attr("src").replace(/\?.*/ig, "") + "?" + Math.random());
      },
      //确定按钮 发送验证码
      setVerification(e){
        var par = {
          from: 'WX',
          setUpFlag: '2',
          requestType: 'LOGIN',
          mobile: this.phoNo,
          imgVerificationCode: this.oImgVerificationCode
        }
        axios.get('/api/' + 'wauser/getVerificationCode', {params: par})
          .then((data) => {
            var oData = data.data;
            if (oData.rescode == '00000') {
              $(".mask").hide();
              this.isClickAble = false;//阻止重复点击
              this.settime($("#showMessBox"));
              this.addCookie("secondsremained",60,60);//添加cookie记录,有效时间60s
            } else {
              	TipFunction.loadingMessage(oData.resmsg);
				setTimeout(function() {
					TipFunction.hideLoading();
				}, 2000);
            }
          })
          .catch(() => {

          });
      },
      //60秒后可以重新发送验证码
      settime(obj){
        let sec;
        //判断cookie里是否有值 有就取cookie  初始化的时候默认给定60秒重置
        if(this.getCookieValue("secondsremained")==""){
          sec = 60;
        }else{
          sec=this.getCookieValue("secondsremained");
        }
        var _this = this;
        for (let i = 0; i <= sec; i++) {
          window.setTimeout(function () {
            if (sec != 0) {
              _this.countdown = sec;
              _this.editCookie("secondsremained",_this.countdown,_this.countdown+1);
              _this.isClickAble = false;
              sec--;
            } else {
              sec = 60;//如果倒计时结束就让  获取验证码显示出来
              _this.countdown = sec;
              _this.isClickAble = true;
            }
          }, i * 1000);
        }
      },
      //发送验证码时添加cookie
      addCookie(name, value, expiresHours){
        let cookieString = name + "=" + values;
        //判断是否设置过期时间,0代表关闭浏览器时失效
        if (expiresHours > 0) {
          let date = new Date();
          date.setTime(date.getTime() + expiresHours * 1000);
          cookieString = cookieString + ";expires=" + date.toUTCString();
        }
        document.cookie = cookieString;
      },
      //修改cookie的值
      editCookie(name, value, expiresHours){
        let cookieString = name + "=" + value;
        if (expiresHours > 0) {
          let date = new Date();
          date.setTime(date.getTime() + expiresHours * 1000); //单位是毫秒
          cookieString = cookieString + ";expires=" + date.toGMTString();
        }
        document.cookie = cookieString;
      },
      //根据名字获取cookie的值
      getCookieValue(name){
        let strCookie = document.cookie;
        let arrCookie = strCookie.split("; ");
        for (let i = 0; i < arrCookie.length; i++) {
          let arr = arrCookie[i].split("=");
          if (arr[0] == name) {
            return arr[1];
            break;
          } else {
            return "";
            break;
          }
        }

      }
    }
  }
</script>

<style scoped>
  #mask .inMask {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
