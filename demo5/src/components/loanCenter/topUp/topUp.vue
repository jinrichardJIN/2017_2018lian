<template>

  <div class="topUp">
      <div class="outHead">
          <div class="headerCon clearfix">
              <h1 class="login fl">多点小贷</h1>
              <div class="userStatus fr whiteTex">
                  <span v-cloak>{{companyMobile}}</span>
                &nbsp;&nbsp;<span>|</span>
                &nbsp;&nbsp;<span class="pointer" @click="signOut">退出</span>
              </div>
          </div>
      </div>
      <div class="conWrap clearfix">
          <div class="fl userInfo">
              <span class="userIcon inlineB"><img src="./img/avatarCom.png" /></span>
              <p class="font18" v-cloak>{{companyName}}</p>
              <div class="loginAsk font14" v-cloak>Hi，{{companyMobile}}，您好</div>
              <!--<div class="loginTime font12">上次登录时间: 2017-8-1 10:10:00</div>-->
          </div>
          <div class="fr topUpWrap">
              <div class="topup_title positionR textL font24">企业网银充值</div>
              <div class="topup-con textL">
                  <div>
                      <span class="color-333 font18 common-span">可用余额</span>
                      <span class="font36 redTex money" v-cloak>￥{{balanceAmount}}</span>
                  </div>
                  <div class="MT30">
                      <span class="color-333 font18 common-span">充值金额</span>
                      <input type="text" v-model="chargeAmt">
                      <span class="color-333 font18">&nbsp;元</span>
                      <div class="tip font14">充值免手续费</div>
                  </div>
                  <button class="topup-btn radius5 whiteTex font16" @click="chargeGateway">充值</button>
                  <div class="topup-tips font14">
                      <div class="color-333 strong">温馨提示</div>
                      <p>您的账户资金将通过第三方平台进行充值，请注意您的银行卡充值限制，以免造成不便。</p>
                      <p>禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用。</p>
                      <p>如果充值金额没有及时到账，请联系客服: 4000-990-9966</p>
                  </div>
              </div>
          </div>
      </div>
      <!--   网关充值 表单提交    -->
      <div v-show="false" id="formDiv">
        <form action="https://cashier.lianlianpay.com/payment/bankgateway.htm" method="post" id="llpayForm1" ref="formSub" @click.prevent="submit">
        </form>
      </div>
    <!--   网关充值 表单提交结束    -->

    <div class="footer textL whiteTex lineHeight1">
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

<script>
  import {clientRequest} from 'api/loanClientApi'   //  接口请求 方法
  import {regexp,errorMessage} from 'assets/js/merge.js'
  const ERR_OK = '0000'
    export default {
      data (){
          return {
            chargeAmt: null,   //  充值金额
            userInfo: null,   //  从localStorge 中获取 用户信息
            userId: null,   // 用户Id
            token: null,   // 用户登录token
            balanceAmount: '0.00',  //  可用余额
            companyMobile: '',  //  公司号码
            companyName: ''  //  公司名称
          }
      },
      watch: {
          chargeAmt(){   //  限制金额 输入
            var decimalReg=/^\d{0,9}\.{0,1}(\d{1,2})?$/;//var decimalReg=/^[-\+]?\d{0,8}\.{0,1}(\d{1,2})?$/;
            var val = this.chargeAmt.toString();
            val !="" && !decimalReg.test(val) ? val=val.substring(0,val.length-1) : "";
            this.chargeAmt = val.replace(/[^\d\.]/g,'');
            if(this.chargeAmt){
              if(this.chargeAmt*1>=1){
                this.chargeAmt = this.chargeAmt.replace(/^[0]+/, "");
              }else if(this.chargeAmt*1<1 && this.chargeAmt*1>=0){
                this.chargeAmt = '0' + this.chargeAmt.replace(/^[0]+/, "");
              }else{
                this.chargeAmt = "";
              }
            }
          }
      },
      methods:{
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
        signOut: function(){   //  退出  清除localStorage
          const date = new Date();
          date.setTime(date.getTime() - 10000);
          document.cookie = "userInfo=; expires=" + date.toGMTString();
          this.$router.push('loanLogin');   //  跳转到  登录页面
        },
        submit: function(event){   //  网关充值  表单认证
            this.$refs.formSub.submit();
        },
        chargeGatewayInfo: function(){
          const userId = this.$route.params.userId || this.userId;
          const token = this.$route.params.token || this.token;
          const opt = {
              'functionId': 'chargeGatewayPageInfo',
              userId
          }
          clientRequest(opt,token).then(res =>{
              if(res.resCode == ERR_OK){
                  this.balanceAmount = res.data.balanceAmount == 0 ? '0.00' : res.data.balanceAmount;
                  this.companyMobile = res.data.companyMobile;
                  this.companyName = res.data.companyName;
              }
          })

        },
        chargeGateway: function(){  //  充值
            const timestamp=new Date().getTime();      // 防并发
            const return_url = window.location.href;  //  充值成功之后  再返回到当前页
            const userId = this.$route.params.userId || this.userId;
            const token = this.$route.params.token || this.token;
            const params = {
              chargeAmt: this.chargeAmt,
              returnUrl: return_url,
            }
            const opt = {
              'functionId':'chargeGateway',
              'userId': userId,
              'data': JSON.stringify(params)
            }
            var _this = this;
          clientRequest(opt,token).then(res => {
                if(res.resCode == ERR_OK){
                    const data = JSON.parse(res.data);
                      for(let item in data){
                          const inp = document.createElement("input");  // 创建节点  插入表单提交信息
                          inp.name = item;
                          inp.setAttribute("value", data[item]);
                          this.$refs.formSub.appendChild(inp);  //  将 input 放到表单
                      }
                      this.submit();   //  提交form表单
                }else{
                    errorMessage(res.resMsg);
                }
            }).catch(err => {

            })
        }
      },
      created(){
          this.userId = JSON.parse(this.getCookie("userInfo")).userId;
          this.token = JSON.parse(this.getCookie("userInfo")).token;
          this.chargeGatewayInfo();
      },
      mounted(){
        setTimeout(()=>{
          $("#ddTitle").text("多点小贷");
        },50);
      }

    }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .color-333{
    color: #333;
  }
  .topUp{
    background: #f5f5f5;
  }
  .outHead{
    width: 100%;
    height: 80px;
    background: url(./img/rise_background.png) no-repeat;
    background-size: 100% 100%;
    .headerCon{
      width: 1200px;
      height: 80px;
      margin: 0 auto;
      .login{
        width: 92px;
        height: 36px;
        background: url(./img/logo.png) no-repeat;
        background-size: 100% 100%;
        margin: 22px 0 0 40px;
        text-indent: -100000em;
      }
      .userStatus{
        font-size: 14px;
        margin: 33px 40px 0 0;
      }
    }
  }
  .conWrap{
    width: 1200px;
    margin: 20px auto 20px;
    .userInfo,.topUpWrap{
      border-radius: 10px;
      height: 800px;
      background: #FFF;
    }
    .userInfo{
      width: 350px;
      .userIcon{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 40px 0 25px 0;
      }
      p{
        color: #0076ff;
        font-weight: 600;
      }
      .loginAsk{
        color: #666;
        margin: 10px 0 40px 0;
      }
      .loginTime{
        color: #999;
      }
    }
    .topUpWrap{
      width: 830px;
      padding: 0 40px;
      box-sizing: border-box;
      .topup_title{
        height: 100px;
        line-height: 100px;
        color: #333;
        border-bottom: 1px solid #E5E5E5;
      }
      .topup_title:before{
        content: '';
        display: inline-block;
        position: absolute;
        width: 4px;
        height: 30px;
        background: #0076FF;
        top: 36px;
        left: -40px;
      }
      .topup-con{
        padding: 40px 0 0 40px;
        .money{
          font-weight: 600;
        }
        .common-span{
          margin-right: 20px;
        }
        input{
          width: 280px;
          height: 40px;
          border: 1px solid #ccc;
          text-indent: 1em;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        input[type="number"]{
          -moz-appearance: textfield;
        }
        input::-ms-clear{display:none;}

        .tip{
          margin: 12px 0 0 95px;
          color: #999;
        }
        .topup-btn{
          border: none;
          width: 120px;
          height: 46px;
          line-height: 46px;
          background: #0076FF;
          margin: 50px 0 0 95px;
        }
        .topup-tips{
          margin-top: 75px;
          line-height: 24px;
          p{
            color: #C3C3C3;
          }
        }
      }
    }
  }
  .contentWidth {
    width: 1200px;
    margin: auto;
  }
  .footer {
    background: #303A48;
  }

  .footer .footerTop {
    height: 120px;
    padding:21px 0 7px;
    box-sizing: border-box;
  }

  .footer .footerTop {
  }

  .footer .footerTop .right .rightT{
    width:64px;
    height:64px;
  }
  .footer .footerTop .right .rightB{
    margin-top:4px;
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
