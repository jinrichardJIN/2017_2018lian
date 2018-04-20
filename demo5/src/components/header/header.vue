<template>
  <div id='nav' :class='{GRAYBKG:navBkg,none:isLandingPage&&!isShow,centerBkg:isCenter}'>
    <div class='navWrap'>
      <div class='logo'>
        <span @click="change('多点金融','index')" class='block indexLog' v-if="!isLoan&&!$route.meta.SafetyGuarantee">
          <router-link :to="{name:'index'}" class="duodianLogo"></router-link>
        </span>
        <span @click="change('多点小贷','loan')" class='block loan' v-if="isLoan"><router-link :to="{name:'loan'}"
                                                                                           class="loanLogo"></router-link></span>
      </div>
      <div class="fr none closeBtn" @click='menuSpread' :class="{close:isSelected}">
        <div type="button" class="navbar-toggle navbar-menubar" id="menu">
          <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
        </div>
      </div>
      <div class='navContent' :class="{close:isSelected,hide:jumpPage}">
        <span @click="change('多点金融','index')" :class="{active:current=='index'}"><router-link
          :to="{name:'index'}">首页</router-link></span>
        <div class="fr navPC" v-show='!isLandingPage'>
          <span @click="change('财富增值计划','Investment')" :class="{active:current=='Investment'}"><router-link
            :to="{name:'Investment'}">财富增值计划</router-link></span>
        <span @click="change('多点小贷','loan')" :class="{active:current=='loan'}"><router-link :to="{name:'loan' }"
                                                                                              id="loan">多点小贷</router-link></span>
          <span><a @click="toMedia">媒体报道</a></span>
          <span @click="change('安全保障','safetyGuarantee')" :class="{active:current=='safetyGuarantee'}">
            <router-link :to="{name:'safetyGuarantee'}" id="safetyGuarantee">安全保障</router-link>
          </span>
          <span>
            <router-link :to="{name:mobile == ''?'login':'investAccount'}">个人中心</router-link>
          </span>
          <span class="login" v-if="mobile == ''">
            <router-link :to="{name:'login'}">登录</router-link>
          </span>
          <span v-if="mobile != ''" class="logOut">
            <span>欢迎{{mobile}}，&nbsp;<em @click="logOut">退出</em></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {clientRequest} from 'api/ddjrClientApi'
  var ERR_OK = '0000';
  export default{
    data(){
      return {
        current: "index",
        isSelected: false,
        jumpPage: false,
        mediaHref:"/pageStatic/page/mediaList1.html?",
        mobile: '',  //  用户手机号
        token: ''  //  用户token
      }
    },
    computed: {
      ...mapState([
        'isLandingPage', 'navBkg', 'isShow', 'isLoan','isCenter'
      ])
    },
    methods: {
      change(title, current){
        window.document.title = title;
        if (current == '' || current == undefined) return
        this.current = current;
        if (!this.isShow) {
          this.isSelected = !this.isSelected;
          this.jumpPage = true
        }
//        if (current != 'loan') {
//          this.showLog=true;
//        } else {
//            this.showLog=false;
//        }

      },
      menuSpread(){
        this.jumpPage = false
        setTimeout(() => {
          this.isSelected = !this.isSelected
        }, 10)
      },
      toMedia(){
          window.location.href=this.mediaHref+Math.random();
      },
      getCookie: function(cookieName){  // 获取cookie   从cookie中获取 userId
        const strCookie = document.cookie;
        const arrCookie = strCookie.split("; ");
        for(let index in arrCookie){
          const arr = arrCookie[index].split("=");
          if(cookieName == arr[0]){
            return arr[1];
          }
        }
        return "";
      },
      //  退出登录
      logOut(){
        var opt = {
          'functionId': 'logout'
        }
        clientRequest(opt,this.token).then(res =>{
            if(res.resCode == ERR_OK){
                document.cookie = "userCookie="+'{}' + ';' + 'expires= -1'+';path=/;';  //  清除用户cookie
                if(this.isCenter){   //  如果是从  个人中心 退出   就返回首页
                  this.$router.push({name:'index'});
                  this.mobile = '';
                }else{
                  window.location.reload();
                }
            }
        })
      }
    },
    mounted(){
      this.$nextTick(() => {
        var _this = this;
        document.getElementById('main').addEventListener('touchstart', removeMenu, false);
        function removeMenu() {
          if (_this.isSelected) {
            _this.jumpPage = !_this.jumpPage
            _this.isSelected = !_this.isSelected;
          }
        }

        // 从cookie获取用户登录信息
        if(_this.getCookie("userCookie") && _this.getCookie("userCookie").length > 10){  //   当有userCookie  并且  userCookie有值
            let mobile = JSON.parse(_this.getCookie("userCookie")).mobile;
            this.mobile = mobile.substring(0,3) + '****' + mobile.substring(mobile.length-4,mobile.length);
            this.token = JSON.parse(_this.getCookie("userCookie")).token;
        }
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  $baseWidth: 100% !default;
  #nav {
    height: 100px;
    background-size: 100% 100%;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    background-color: transparent;
    transition: background-color 1s linear 0.2s;
    .navWrap {
      width: $baseWidth;
      height: 100%;
      padding: 0 5%;
      box-sizing: border-box;
      margin: 0 auto;
      overflow: hidden;
      .navContent {
        float: right;
        margin-top: 28px;
        .logOut{
          font-size: 14px;
          color: #FFF;
          cursor: pointer;
          margin-left: 30px;
          line-height: 42px;
        }
        .login a{
          background: url("img/people.png") no-repeat 12px center;
          background-size: 16px 16px;
          font-size: 14px;
          &:hover{
             background: url("img/people_on.png") no-repeat 12px center;
             background-size: 16px 16px;
           }
        }
        span a {
          width: 108px;
          height: 42px;
          font-size: 16px;
          line-height: 42px;
          display: inline-block;
          margin-left: 16px;
          border: 1px solid transparent;
          border-radius: 21px;
          color: #fff;
          transition: all .4s ease-out;
          cursor: pointer;
          &.active {
            border-color: #3a9cf5;
            color: #3a9cf5;
          }
          &:hover {
            border-color: #3a9cf5;
            color: #3a9cf5;
            fill: #3a9cf5;
          }
        }
      }
      .logo {
        float: left;
        margin-top: 19px;
        .duodianLogo {
          display: inline-block;
          height: 60px;
          width: 50px;
          padding-left: 64px;
          background: url('~assets/img/logo.png') no-repeat center;
          background-size: 100%;
          a {
            color: #fff;
          }
          &:hover {
            cursor: pointer;
          }
        }
        .loanLogo {
          display: inline-block;
          height: 60px;
          width: 50px;
          padding-left: 64px;
          background: url('~assets/img/loan_logo.png') no-repeat center;
          background-size: 100%;
          a {
            color: #fff;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  #nav.GRAYBKG {
    background-color: rgba(0, 0, 0, 0.5);
  }
  #nav.centerBkg{
    background: url("~assets/img/background_geren.png") no-repeat;
    background-size: 100% 100%;
  }
  @media only screen and (max-width: 798px) {
    /*导航样式*/
    * {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    #nav {
      height: 58px;
    }
    #nav .navWrap {
      width: 100%;
      height: 100%;
      padding: 0;
    }
    #nav .navWrap.selected {
      background-color: rgba(0, 0, 0, 0.5);
    }
    #nav .navWrap .logo .block {
      margin: -10px 0 0 -31px;
    }
    #nav .navWrap .logo {
      float: left;
      margin-top: 0px;
      height: 58px;
      padding: 8px 0 0 0;
    }
    #nav .navWrap .logo .block {
      margin: -10px 0 0;
    }
    .navWrap .logo .indexLog, .navWrap .logo .loan {
      height: 100%;
      width: 150px;
      padding-left: 64px;
      background: url("~assets/img/logo.png") no-repeat 20px;
      background-size: 80px 22px;
      font-size: 20px;
      font-weight: 200;
      text-align: left;
      text-indent: -10000em;
    }
    .navWrap .logo .loan {
      background: url("~assets/img/loan_logo.png") no-repeat 20px;
      background-size: 80px 22px;
    }
    #nav .navWrap .logo span a {
      border: none;
      color: #fff;
    }
    #nav .navWrap .navContent .login a{
      background: none;
    }
    #nav .navWrap .navContent .login a:hover{
      background: none;
    }
    #nav .navWrap .navContent span a {
      border: none;
      margin-left: 0;
    }
    #nav .navWrap .navContent span a:hover {
      border: none;
    }
    #nav .navWrap .navContent {
      position: fixed;
      margin-top: 0px;
      z-index: -100;
      width: 100%;
      height: 0px;
      background: rgba(0, 0, 0, 0.45);
      overflow: hidden;
    }
    #nav .navWrap .navContent.close {
      padding-top: 58px;
      height: auto;
    }
    #nav .navWrap .navContent.close span {
      height: 42px;
    }
    #nav .navWrap .navContent.hide {
      display: none;
    }
    #nav .navWrap .navContent .navPC {
      width: 100%;
    }
    #nav .navWrap .navContent span {
      display: block;
      padding: 0px 10px;
      text-align: right;
      height: 0px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);
      transition: all 0.4s;
      /*transform: translate3D();*/
    }
    #nav .navWrap .navContent span a {
      /*padding: 10px 0px;*/
      color: #fff;
      position: relative;
      font-size: 16px;
      width: 100%;
      display: inline-block;
      -webkit-tap-highlight-color: transparent;
    }
    #nav .navWrap .navContent span a:after {
      width: 0%;
      display: inline-block;
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      height: 4px;
      background: transparent;
      transition: all 0.3s ease;
      left: 50%;
      transform: translateX(-50%);
    }
    #nav .navWrap .navContent span a.active {
      border: none;
      border-bottom: 0px solid #ff053b;
      color: #4CA5F5;
    }
    /*#nav .navWrap .closeBtn {
      display: inline-block;
      height: 20px;
      width: 25px;
      margin: 16px 15px 0 0;
      background-color: #fff;
      background: url("../../assets/img/menuIcon.png") no-repeat;
      background-size: cover;
      -webkit-tap-highlight-color: transparent;
    }
    #nav .navWrap .closeBtn.close {
      background: url("../../assets/img/closeIcon.png") no-repeat 3px;
      background-size: 20px 20px;
    }*/
    #nav .navWrap .closeBtn {
      display: inline-block;
      height: 20px;
      width: 25px;
      margin: 16px 15px 0 0;
      position: relative;
      float: right;
      background-color: transparent;
      background-image: none;
      border: 0;
    }
    #nav .navWrap .closeBtn .icon-bar {
      background-color: #fff;
      -webkit-transition: -webkit-transform 0.2s ease;
      transition: transform 0.2s ease;
      display: block;
      width: 22px;
      height: 2px;
      border-radius: 1px;
      margin-top: 4px;
    }

    #nav .navWrap .closeBtn.close {
      border: 0;

    }
    #nav .navWrap .closeBtn.close .icon-bar{
      -webkit-transition: -webkit-transform 0.2s ease;
      transition: transform 0.2s ease;
    }
    #nav .navWrap .closeBtn.close .icon-bar {
      opacity: 0;
    }
    #nav .navWrap .closeBtn.close .icon-bar:first-child {
      opacity: 1;
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
      transform-origin: 10% 50%;
      -webkit-transform-origin: 10% 50%;
      -o-transform-origin: 10% 50%;
      transform-origin: 10% 50%;
    }
    #nav .navWrap .closeBtn.close  .icon-bar:last-child {
      opacity: 1;
      -webkit-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
      -webkit-transform-origin: 10% 50%;
      -o-transform-origin: 10% 50%;
      transform-origin: 10% 50%;
    }
  }
</style>
