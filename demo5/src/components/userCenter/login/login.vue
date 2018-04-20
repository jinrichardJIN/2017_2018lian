<template>

  <div>
    <div class="conWrap positionR">
      <img class="positionR" src="./img/loginBkg.png" />
      <h1 class="logoWrap positionA pointer" @click="toIndex">
        多点金融<router-link :to="{name:'index'}"></router-link>
      </h1>
      <div class="loginWrap positionA">
        <div class="tabLogin clearfix">
          <span class="textL" :class="{curClass:loginWay=='loginPsd'}" @click="changeLoginWay('loginPsd')"><em>密码登录</em></span>
          <span class="textR" :class="{curClass:loginWay=='loginCode'}" @click="changeLoginWay('loginCode')"><em>验证码登录</em></span>
        </div>
        <transition mode="out-in" appear name="list" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
          <div key="psd" class="psdLogin font14" v-if="loginWay=='loginPsd'">
            <div class="phone text">
              <input type="text" maxlength="11" v-model="mobile" placeholder="请输入手机号码" @keyup="phoneNoCheck('mobile')">
            </div>
            <div class="passWord text MT20">
              <input type="password" maxlength="16" v-model="password" placeholder="请输入登录密码">
            </div>
          </div>

          <div key="code" class="psdLogin font14" v-if="loginWay=='loginCode'">
            <div class="phone text">
              <input type="text" maxlength="11" v-model="mobile" placeholder="请输入手机号码" @keyup="phoneNoCheck('mobile')">
            </div>
            <div class="passWord text MT20">
              <input type="text" maxlength="4" v-model="valicode" placeholder="请输入短信验证码" @keyup="phoneNoCheck('valicode')">
              <span class="getCode" @click="getCode" :class="{codeText:codeText != '获取验证码',codeText1:codeText == '重新获取'}">{{codeText}}</span>
            </div>
          </div>
        </transition>
        <transition enter-active-class="animated shake">
          <p v-if="errText!=''" class="textL MT10 redTex">{{errText}}</p>
        </transition>
        <div class="loginBtn" @click="login">登录</div>
      </div>
    </div>
    <vFooter></vFooter>
  </div>

</template>

<script>
  import 'assets/css/animate.min.css'
  import vFooter from 'components/footer/footer'
  import { clientRequest } from 'api/ddjrClientApi'
  const ERR_OK = '0000' //  接口请求成功状态码
  export default {
    data() {
      return {
        loginWay: 'loginPsd', //  默认是  密码登录
        mobile: '',
        password: '',
        valicode: '',
        codeText: '获取验证码',
        blackBox: '', // 同盾标知
        isGetCode: true, //  是否再次获取验证码标知
        errText: '' //  后台接口返回的文案
      }
    },
    methods: {
      toIndex() { // 点击logo  跳转首页
        this.$router.push('index');
      },
      changeLoginWay(loginWay) {
        this.mobile = '';
        this.password = '';
        this.errText = '';
        this.loginWay = loginWay;
      },
      //输入框规则校验---只允许输入数字
      phoneNoCheck(type) {   // type： 手机号  或者  验证码
        let oldVal;
        type == 'mobile' ? oldVal = this.mobile : oldVal = this.valicode;
        let newVal = oldVal.replace(/[^\d]/g, '');
        type == 'mobile' ? this.mobile = newVal : this.valicode = newVal;
      },
      login() { //  登录
        this.errText = '';
        let options = {};
        options.mobile = this.mobile;
        options.blackBox = this.blackBox;
        if(this.mobile == ''){
          this.errText='请输入手机号码';
          return false
        }
        this.loginWay == 'loginPsd' ? options.password = this.password : options.valicode = this.valicode;
        var functionId = '';
        this.loginWay == 'loginPsd' ? functionId = 'passwordLogin' : functionId = 'valicodeLogin';
        if(options.valicode == ''){
          this.errText = '请输入验证码';
          return false;
        }
        var opt = {
          'functionId': functionId,
          'data': JSON.stringify(options)
        }
        clientRequest(opt).then(res => {
          if(res.resCode == ERR_OK) {
            let userCookie = {};
            userCookie.mobile = this.mobile;
            userCookie.token = res.record.token;
            var date = new Date();
            var expiresHours = 4; //将date设置为4小时以后的时间
            date.setTime(date.getTime() + expiresHours * 60 * 60 * 1000);
            //  登录成功之后  将token放到cookie里   有效时间4个小时
            document.cookie = "userCookie=" + JSON.stringify(userCookie)+';'+"expires=" + date.toGMTString()+';path=/;';
            this.$router.push({ name: 'investAccount' });
          } else {
            this.errText = res.resMsg;
          }
        })
      },
      //  获取验证码
      getCode(e) {
        let options = {};
        options.mobile = this.mobile;
        options.type = 'LOGIN';
        options.blackBox = this.blackBox;
        var opt = {
          'functionId': 'captcha',
          'data': JSON.stringify(options)
        }
        if(this.isGetCode) {
          clientRequest(opt).then(res => {
            if(res.resCode == ERR_OK) {
              this.timeInterval();
            } else {
              this.errText = res.resMsg;
            }
          });
        }
      },
      // 验证码倒计时
      timeInterval() {
        this.isGetCode = false;
        clearInterval(getCodeTime);
        let sec = 60;
        this.codeText = 60 + 's';
        var _this = this;
        const getCodeTime = setInterval(function() {
          sec--;
          _this.codeText = sec + 's';
          if(sec == 0) {
            clearInterval(getCodeTime);
            _this.codeText = '重新获取';
            _this.isGetCode = true;
          }
        }, 1000);
      }
    },
    components: {
      vFooter
    },
    mounted() {

      (function() {
        window.sessionStorage.setItem("key", Math.random());
        var tokenId = window.sessionStorage.getItem("key");
        window._fmOpt = {
          partner: 'lianbi',
          appName: 'lianbi_web',
          token: tokenId
        };
        var cimg = new Image(1, 1);
        cimg.onload = function() {
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

      this.blackBox = window.sessionStorage.getItem("key");
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .conWrap img {
    width: 100%;
    height: auto;
    margin-bottom: 55px;
  }

  .logoWrap {
    display: inline-block;
    height: 60px;
    width: 50px;
    top: 0;
    left: 64px;
    padding-left: 64px;
    margin-top: 19px;
    background: url('~assets/img/logo.png') no-repeat center;
    background-size: 100%;
    text-indent: -99999px;
  }

  .loginWrap {
    width: 260px;
    height: 350px;
    background: #FFF;
    top: 20%;
    right: 20%;
    border-radius: 8px;
    padding: 0 50px;
  }

  .tabLogin span {
    float: left;
    font-size: 16px;
    display: inline-block;
    width: 50%;
    height: 100px;
    line-height: 100px;
    cursor: pointer;
  }

  .tabLogin span.curClass em {
    color: #3A9CF5;
    position: relative;
  }

  .tabLogin span.curClass em:after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 40px;
    height: 2px;
    background: #3A9CF5;
    top: 30px;
    left: 0;
  }

  .phone,
  .passWord {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #D8D8D8;
    text-align: left;
    padding-left: 30px;
    box-sizing: border-box;
    background: url("./img/iphone.png") no-repeat left center;
  }

  .passWord {
    background: url("./img/pass.png") no-repeat left center;
  }

  input::-webkit-input-placeholder {
    color: #D8D8D8;
  }

  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #D8D8D8;
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #D8D8D8;
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #D8D8D8;
  }

  .loginBtn {
    width: 150px;
    height: 40px;
    line-height: 40px;
    background: url("./img/sign.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 20px;
    color: #FFF;
    /*margin: 30px auto;*/
    box-shadow: 0 7px 14px 0 rgba(160, 0, 31, 0.18);
    cursor: pointer;
    position: absolute;
    bottom: 45px;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
  }

  .getCode {
    color: #3A9CF5;
    cursor: pointer;
  }

  .codeText {
    padding-left: 25px;
    color: #D8D8D8;
  }

  .codeText1 {
    padding-left: 10px;
    color: #3A9CF5;
  }
</style>
