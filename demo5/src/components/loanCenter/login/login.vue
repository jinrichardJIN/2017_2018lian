<template>
  <div class="loanLogin width100">
    <div class="header contentWidth">
      <h1 class="logo textL">
        <img src="./img/logo.png" alt="" width="93" height="36">
      </h1>
    </div>
    <div class="content lineHeight1">
      <div class="loginContent textL">
        <h1 class="title">企业借款用户登录</h1>
        <div class="phone text MB27">
          <input type="text" maxlength="11" v-model="mobile" placeholder="请输入手机号码" @keyup="phoneNoCheck" class="phoneNo">
        </div>
        <div class="passWord text MB10">
          <input type="password" maxlength="16" v-model="password" placeholder="请输入登录密码" class="passWordNo">
        </div>
        <p class="error"><span v-show="isError" v-cloak>{{errorMsg}}</span></p>
        <input type="button"  value="登录" class="logoBtn" @click="login">
      </div>
    </div>
    <div class="footer textL colorFFF lineHeight1">
      <div class="contentWidth">
        <div class="footerTop clearfix">
          <div class="left fl">
            <p class="leftT font14 MTB15">联系我们</p>
            <p class="leftB font20">
              <span class="tel">400-998-9966</span>
              <span class="time">&nbsp;(9:00-20:00)</span>
            </p>
          </div>
          <div class="right fr">
           <!-- <div class="rightT">
              <img src="./img/qrcode_andorid.png" alt="" width="100%">
            </div>
            <p class="rightB textC font12">关注多点</p>-->
          </div>
        </div>
      </div>
      <div class="footerBottom">
        <p class="contentWidth font12">上海赟致金融信息服务有限公司版权所有 2017 沪ICP备17004342号-7 沪公网安备31011702000521号</p>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {phoneReg, ajaxRequest} from 'assets/js/merge.js'
  import {clientRequest} from 'api/loanClientApi'
  const ERR_OK = '0000'
  export default{
    data(){
      return {
        mobile: "",
        password: "",
        blackBox: "",//同盾
        isError: false,//是否有信息错误
        errorMsg: "用户名或密码错误！"
      }
    },
    methods: {
      //登录按钮接口调用
      login(){
        if (!phoneReg.test(this.mobile) || !this.password) {
          this.isError = true;
          return;
        }
        this.isError = false;
        let options = {};
        options.mobile = this.mobile;
        options.password = this.password;
        options.blackBox = this.blackBox;
        var opt = {
            'functionId': 'login',
            'data': JSON.stringify(options)
        }
        clientRequest(opt).then((res) => {
          if (res.resCode == ERR_OK) {
            let userIfo = {
              mobile: this.mobile,
              userId: res.data.userId,
              token:res.data.token
            }
            var date=new Date();
            var expiresHours=4; //将date设置为4小时以后的时间
            date.setTime(date.getTime()+expiresHours*60*60*1000);
            document.cookie="userInfo="+JSON.stringify(userIfo) +';' + "expires="+date.toGMTString();
            this.$router.push(
              {
                name: 'loanToUp',
                params: {userId: res.data.userId}
              }
            );
          } else {
            this.isError = true;
            this.errorMsg = res.resMsg;
          }
        });
      },
      //手机号规则校验---只允许输入数字
      phoneNoCheck(e){
        let oldVal = this.mobile;
        let newVal = oldVal.replace(/[^\d]/g, '');
        this.mobile = newVal;
      }
    },
    mounted(){
      $("#ddTitle").text("多点小贷");
      //同盾
      this.$nextTick(() => {
        var _this = this;
        var tokenId;
        (function () {
          window.sessionStorage.setItem("key", Math.random());
          tokenId = window.sessionStorage.getItem("key");
          window._fmOpt = {
            partner: 'lianbi',
            appName: 'lianbi_web',
            token: tokenId
          };
          var cimg = new Image(1, 1);
          cimg.onload = function () {
            window._fmOpt.imgLoaded = true;
          };
          cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=lianbi&appName=lianbi_ddjr_web&tokenId=" + window._fmOpt.token;
          var fm = document.createElement('script');
          fm.type = 'text/javascript';
          fm.async = true;
          fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime() / 3600000).toFixed(0);
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(fm, s);
        })();
        this.blackBox = tokenId;
      })
    },
  }
</script>

<style scoped>
  .contentWidth {
    width: 1200px;
    margin: auto;
  }

  .MB27 {
    margin-bottom: 27px;
  }

  .lineHeight1 {
    line-height: 1;
  }

  .colorFFF {
    color: #fff;
  }

  .MTB15 {
    margin: 15px 0;
  }

  .header {
    height: 80px;
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 1;
    margin-left: -600px;
  }

  .header .logo {
    margin-left: 3%;
    padding-top: 22px;
  }

  .content {
    height: 920px;
    overflow: hidden;
    background: url("./img/background.png") no-repeat top left;
    background-size: 100% 100%;
  }

  .loginContent {
    margin: 80px auto;
    width: 420px;
    height: 660px;
    background: #fff;
    opacity: 0.95;
    border-radius: 20px;
    padding: 90px 70px 20px;
    box-sizing: border-box;
  }

  .loginContent .title {
    font-size: 24px;
    color: #333;
    margin-bottom: 67px;
    text-align: center;
  }

  .loginContent .text {
    width: 280px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    opacity: 0.6;
    font-size: 16px;
    line-height: 22px;
    color: #999;
  }

  .loginContent .error {
    height: 22px;
    font-size: 16px;
    color: #FF4C4C;
    line-height: 22px;
  }

  .loginContent .logoBtn {
    width: 200px;
    height: 52px;
    margin: 126px 40px;
    background: #0076FF;
    box-shadow: 0 5px 15px 0 rgba(0, 118, 255, 0.50);
    border-radius: 100px;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
  }

  .footer {
    width: 100%;
    background: #303A48;
  }

  .footer .footerTop {
    height: 120px;
    padding: 21px 0 7px;
    box-sizing: border-box;
  }

  .footer .footerTop {
  }

  .footer .footerTop .right .rightT {
    width: 64px;
    height: 64px;
  }

  .footer .footerTop .right .rightB {
    margin-top: 4px;
  }

  .footer .footerBottom {
    width: 100%;
    height: 40px;
    background: #2D3542;
  }

  .footer .footerBottom p {
    margin: auto;
    opacity: 0.8;
    line-height: 40px;
  }
</style>
