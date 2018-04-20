<template>

  <div class='downloadContent outHide ' >
    <div class="positionF width100 height100 alertBOX">
        <div class="alertGoAPP">
          <p>是否下载<br>多点金融APP</p>
          <div>
            <span class="colorBlack borderRightGray" @click="cancel()">取消</span>
            <span>
              <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.duodianjr.finance" class="color2d982e">前往</a>
            </span>
          </div>
        </div>
      </div>
    <div class='bannerWrapper positionR ML-1'>
        <img src="~assets/img/landingPageBkg.jpg" class='bannerPic'   width="100%">
        <div class='bannerContent' id="bannerContent">
            <div class='contentLeft fl fontColor '>
               <p class=" leftText MB5">资金更安全 交易更放心</p>
               <!--<p class="font36 whiteTex MB15">新手专享历史年化12% </p>-->
               <!--<span class=" special PTB5 PLR20 radius30 font14 opacity80"> — &nbsp;&nbsp;&nbsp;注册送30M流量&nbsp;&nbsp;&nbsp; — </span>-->
            </div>
            <div class='contentRight fr font14 bannerContentDiv' id="bannerContentDiv">
              <div class="whiteBkg radius30 MB12 phoneNum bannerContentDiv">
                <input type="text" id="phoneNum" maxlength="11" placeholder="请输入手机号" class="fl ML25"  v-model="phoneNum" isKey="1" ></input>
              </div>

              <div class="whiteBkg radius30 MB12 outHide captcha positionR bannerContentDiv">
                <input   type="text" maxlength="4" placeholder="请输入验证码" class="positionA" style="" v-model="captcha" id="captcha" isKey="2"></input>
                <span id="Countdown" class=" verification positionA textC radius30 colorG blue" style="" @click="getJson()" v-text="timerCodeMsg">
                  </span>
              </div>
              <div class="whiteBkg radius30 MB12 bannerContentDiv">
              <input type="password" id="password" maxlength="16" placeholder="8~16位字母数字或符号的密码组合" class="fl ML25" style="" v-model="password"  isKey="3"></input></div>
               <div class="whiteBkg radius30 MB12 outHide verifycode bannerContentDiv">
                <input  type="password" maxlength="6" placeholder="请输入6位数字交易密码" class="fl ML25 " style="" v-model="verifycode" id="verifycode" isKey="4"></input>

              </div>
              <a class="radius30 textC block font16 blue bannerContentDiv" @click="checking()">立即注册</a>
              <!-- <span class="textC block fontColor register" >已有账号，马上登陆</span> -->
              <div class="agreenment "><span class="font14 act03Tex">注册即表示阅读并同意<a   id="register" class="act03Tex pointer" @click="registration()">《用户注册服务协议》</a></span><!-- <font class="textC act03Tex1 MT10 font14">新用户可直接登录</font> --></div>
            </div>
        </div>
    </div>
   <!-- 组件 -->
   <div class="downloadMain">

     <div class="textC financial ">
        <v-title  :titleData="titleData"></v-title>
     </div>
      <div class="advantageWrapper ">
        <advantage :advantageData='landingPageData'></advantage>
      </div>
<!--       <div class="textC financial grayBkgf7">
        <v-title  :titleData="titleDataN"></v-title>
     </div>
     <div class="grayBkgf7">
         <div class="width60 blockC font16 ">
         <span class="fl">1、</span><p class=" lineHeight1_5x ML20">活动时间6.15-6.30日，仅限通过本页面注册多点金融的新用户；</p>
         <span class="fl">2、</span><p class=" lineHeight1_5x ML20">新用户注册并实名认证送30M手机流量，首次完成投资1000元及以上，送1张电影票，投资3000元及以上送2张电影票，流量和电影票下一个工作日后发放；</p>
         <span class="fl">3、</span><p class=" lineHeight1_5x ML20">关注微信：多点小元宝（duodianxiaoyuanbao），随时获取优质服务及更多活动信息</p>
         <p class=" lineHeight1_5x ML50 MT20">本活动最终解释权归多点金融平台所有</p>
       </div>
     </div> -->
     <div class="textC  ">
        <div class="partner  ">
         <v-title  :titleData="titleData3" class="financial grayBkgf7"></v-title>
          <partner></partner>
        </div>
     </div>
   </div>
    <div class="none downloadMainN PT40 MB40">
     <!--  <div class="regulation ">
        <div class="font20 whiteTex textL ML10P MB10 whiteTex2" >活动规则</div>
        <ul  class="grayTexa0 blockC width80 grayTexa0" >
          <span class="fl">1、</span><p class="ML22 lineHeight1_5x">活动时间6.15-6.30日，仅限通过本页面注册多点金融的新用户；</p>
          <span class="fl">2、</span><p class="ML22 lineHeight1_5x">
          新用户注册并实名认证送30M手机流量，首次完成投资1000元及以上，送1张电影票，投资3000元及以上送2张电影票，流量和电影票下一个工作日后发放；</p>
          <span class="fl">3、</span><p class="ML22 lineHeight1_5x">
          关注微信：多点小元宝（duodianxiaoyuanbao），随时获取优质服务及更多活动信息。</p>
          <p class="ML22 lineHeight1_5x">
          本活动最终解释权归多点金融平台所有；</p>
        </ul>
      </div> -->
       <div class="textC advantage">
          <div class="font20 whiteTex textL ML10P" >多点金融优势</div>
          <ul class="" id="advantageUl">
            <li class="clearfix radius5" id="">
              <img src="~assets/advantage/advIcon1.png" class="PT35 fr imgCssR" width="20%">
              <p class="font24  fl adLiTitle textL pl PT30" >可信赖</p>
              <p class="fl pl textL PT3 ">安全、透明和便捷</p>
            </li>
            <li class="clearfix radius5">
              <img src="~assets/advantage/advIcon2.png" class="PT35 fl imgCssL" width="20%" >
              <p class="font24  fr adLiTitle textR pr PT30" >快速便捷</p>
              <p class="fr pr textR PT3 ">操作便捷、即时到账</p>
            </li>
            <li class="clearfix radius5">
              <img src="~assets/advantage/advIcon3.png" class="PT35 fr imgCssR" width="20%">
              <p class="font24  fl adLiTitle textL pl PT30">多重保障机制</p>
              <p class="fl pl textL PT3 ">行业资深风控团队</p>
            </li>
            <li class="clearfix radius5">
              <img src="~assets/advantage/advIcon4.png" class="PT35 fl imgCssL" width="20%">
              <p class="font24  fr adLiTitle textR pr PT30">小额分散</p>
              <p class="fr pr textR PT3 ">风险分布分散</p>
            </li>
          </ul>
        </div>
      </div>
    <div class="positionF reminder"  v-html="detail" id="reminder">

    </div>
    <!--底部-->
    <div class="DownLoadApp">
      <div class="overHidden">
        <img class="fl" src="./duodianLogo.png">
        <div class="fl height90P ML5P MT2point5 positionR">
          <p class="textWhite font16">多点金融APP</p>
          <p class="textWhite font12 opacity7 positionA bottom0">安全.便捷.精彩</p>
        </div>
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.duodianjr.finance" class="RightNowDownLoad">立即下载</a>
      </div>
    </div>
  </div>
</template>

<script>
import Advantage from '../advantage/advantage';
import Partner from '../partner/partner'
import VTitle from '../publicComponents/title/title.vue';
import {getRealPath,regexp,alertBox2,ajaxRequest,errorMessage} from 'assets/js/merge.js';
let Base64 = require('js-base64').Base64;
export default{
  data(){
    return {
      webUrl:getRealPath(),
      phoneNum:"",
      captcha:"",
      verifycode:"",
      password:"",
      codeUrl:getRealPath()+'imgcode?'+Math.random(),
      timerCodeMsg:"获取",
      fetchCodeMsg:false,
      fetchCodeMsgN:true,
      detail:"",
      sessionStorage:"",
      mobile:this.GetRequest().mobile,
      landingPageData:[
        {src: require('assets/advantage/advIcon1.png'), title: '可信赖', content: '安全、透明和便捷'},
        {src: require('assets/advantage/advIcon2.png'), title: '快速便捷', content: '操作便捷、即时到账'},
        {src: require('assets/advantage/advIcon3.png'), title: '多重保障机制', content: '行业资深风控团队'},
        {src: require('assets/advantage/advIcon4.png'), title: '小额分散', content: '风险分布分散'},
        ],
         titleData:{
            title:"多点金融优势",
//            enTitle:"FINANCIAL ADVANTAGE",
            colorClass:'blueColor'
         },
      //   titleDataN:{
      //       title:"活动规则",
      //       enTitle:"ACTIVITY",
      //       colorClass:'blueColor'
      //   },
        titleData3:{
          title:"合作伙伴",
          // enTitle:"Partners",
          colorClass:'blueColor'
      }
    }
  },
    watch:{
      phoneNum(val){
        let reg=/^[0-9]{0,11}$/;
        this.phoneNum=regexp(reg,val)
      },
      captcha(val){
        let reg=/^[a-zA-Z0-9]{0,4}$/;
        this.captcha=regexp(reg,val)
      },
      password(val){
        let reg=/^[a-zA-Z0-9\!\@\#\$\%\^\&\*]{0,16}$/;
        this.password=regexp(reg,val)
      },
       verifycode(val){
        let reg=/^[0-9]{0,6}$/;
        this.verifycode=regexp(reg,val)
      }
    },
   components:{
      Advantage,
      VTitle,
      Partner
   },
   computed:{
      },
   methods:{
        getJson:function(){
          this.checkingT();
          if (this.fetchCodeMsg&&this.fetchCodeMsgN) {//验证码
            $.post(this.webUrl+'javaservice/webClient?functionId=captcha',{data:JSON.stringify({'mobile':this.phoneNum,'type':'REGISTER','blackBox':this.sessionStorage})}).then((res)=>{
                   res=JSON.parse(res);
                  this.replaceFlag();
                  this.detail=res.resMsg;

                  if(res.resCode=="0000"){
                    this.SetRemainTime();

                  }
            },(error)=>{
                  this.fetchCodeMsgN=true;
               })
         }
      },
      //获取url中的参数 GetRequest().name   GetRequest().mobile
       GetRequest:function() {
          var url = location.search; //获取url中"?"符后的字串
          var theRequest = new Object();
          if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
              theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
          }
          return theRequest;
        },
      checking:function(){
          if (this.phoneNum=="") {
          $("#phoneNum").attr({"placeholder":"请输入手机号"}).addClass("input");
         return false;
       }
        if (! (/^((13|15|18|14|17)[0-9]{9})$/.test(this.phoneNum))) {
          $("#phoneNum").attr({"placeholder":"请输入正确的手机号码"}).addClass("input");
          this.phoneNum="";
          return false;
      }

         this.fetchCodeMsg=true;
        if (!this.captcha) {
           $("#captcha").attr({"placeholder":"请输入短信验证码"}).addClass("input");
           return false;
        };
        if (this.password == null || this.password == '') {
        $("#password").attr({"placeholder":"请设置登录密码"}).addClass("input");
        return false;
        };
        if(this.password.length<8){
          errorMessage('登录密码为8~16位字母数字或符号的组合');
            return false;
        }
          if(/^[\d]+$/.test(password)||/^[a-zA-Z]+$/.test(this.password)) {
          errorMessage('登录密码为8~16位字母数字或符号的组合');
          return false;
        };
        if(!(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9\!\@\#\$\%\^\&\*]{8,16})$/.test(this.password))){
            $("#password").attr({"placeholder":"登录密码为8~16位字母数字或符号的组合"}).addClass("input");
            this.password="";
            return false;
        }
         if (this.verifycode == "" || this.verifycode  == null) {
            this.verifycode="";
           $("#verifycode").attr({"placeholder":"请设置交易密码"}).addClass("input");
          return false;
        }
       if (! (/^[0-9]{6}$/.test(this.verifycode))) {
            this.verifycode="";
           $("#verifycode").attr({"placeholder":"请设置交易密码"}).addClass("input");
          return false;
        }
        this.register()
      },
      checkingT:function(){

         if (this.phoneNum=="") {
          $("#phoneNum").attr({"placeholder":"请输入手机号"}).addClass("input");
         return false;
       }
        if (! (/^((13|15|18|14|17)[0-9]{9})$/.test(this.phoneNum))) {
          $("#phoneNum").attr({"placeholder":"请输入正确的手机号码"}).addClass("input");
          this.phoneNum="";
          return false;
      }

         this.fetchCodeMsg=true;
      },
      replaceFlag:function(){

        $("#reminder").css({"top":"0"});
        setTimeout(function(){
          $("#reminder").css({"top":"-76px"})
        },3000)
      },
      changeUrl:function(){
       this.codeUrl= this.codeUrl.replace(/\?.*/ig,"")+"?"+Math.random();
        },
       SetRemainTime:function () {
            let sec =60;
            var _this=this;
            _this.fetchCodeMsgN=false;
            $("#Countdown").removeClass("blue").addClass("grayBkg61T");
            for(let  i=0; i<=60; i++){
               window.setTimeout(function(){
                   if (sec != 0) {
                     _this.timerCodeMsg =   sec + "秒后重发" ;
                    sec--;
                 } else {
                     sec = 60;//如果倒计时结束就让  获取验证码显示出来
                      $("#Countdown").removeClass("grayBkg61T").addClass("blue");
                      _this.timerCodeMsg ="再次获取"
                       _this.fetchCodeMsgN=true;
                }
               }, i * 1000);

      }
    },
    registration:function(){
       var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            var os='android';
            if(isiOS){
              os='ios';
            }
      $.post(this.webUrl+'javaservice/webClient?functionId=getUrl&os='+os,{data:JSON.stringify({'name':'register'})}).then((res)=>{
              res=JSON.parse(res);
                  var serAgreementUrl=res.record.url
                   if (res.resCode != "0000") {
                  } else {
                      window.location.href =this.webUrl+serAgreementUrl;
                  }
                    },(error)=>{

                       })
    },
    register:function(){
        var _this=this;
        $.post(this.webUrl+'javaservice/webClient?functionId=register',{data:JSON.stringify({'mobile':this.phoneNum,'password':this.password,'cashPassword':this.verifycode,'valicode':this.captcha,'sourceType':'web','channel':'WEBSITE','blackBox':this.sessionStorage,"invitationCode":this.mobile})}).then((res)=>{
                   res=JSON.parse(res);
                   this.replaceFlag();
                   this.detail=res.resMsg;
                   this.password='';
                   this.verifycode='';
                   if(res.resCode=="0000"){
                 $('.alertBOX').css('display', 'block');
              }
              else{
                errorMessage(this.detail);
              }

            },(error)=>{
                    res = JSON.parse(res);
                  _this.detail = res.resMsg;
                  errorMessage(_this.detail);
                  this.fetchCodeMsgN=true;
               })


    },
    cancel: function() {
        $('.alertBOX').css('display', 'none');
      }

   },
   mounted(){
       this.$nextTick(()=>{
        $('.alertBOX').height($(window).height());
        var input ="placeholder" in  document.createElement('input');
        if(!input){
          var placeholderArr=["请输入手机号","请输入验证码","8~16位字母数字或符号的密码组合","请输入6位数字交易密码"],
          oDiv=document.getElementById("bannerContentDiv"),
          oInput=oDiv.getElementsByTagName("input");
          $("#bannerContentDiv input").focus(function(){
             $(this).val("");
          }).blur(function(){
            var placeholderVal=$(this).attr("placeholder");
            $(this).val(placeholderVal);
          })
          for(i=0;i<oInput.length;i++){
            $("#bannerContentDiv input").eq(i).val(placeholderArr[i])
          }
        }

       var bodyWidth=document.body.clientWidth;
       if(bodyWidth<798){
        var liWidth=$("#advantageUl").width();
        $(".bannerContentDiv").width(liWidth)

       }
        var _this=this;
          (function() {
          window.sessionStorage.setItem("key", Math.random());
          var tokenId=window.sessionStorage.getItem("key");
          window._fmOpt = {
              partner: 'lianbi',
              appName: 'lianbi_web',
              token: tokenId
                };
          var cimg = new Image(1,1);
          cimg.onload = function() {
              window._fmOpt.imgLoaded = true;
          };
          cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=lianbi&appName=lianbi_ddjr_web&tokenId=" + window._fmOpt.token;
          var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
          fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime()/3600000).toFixed(0);
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);
      })();
          this.sessionStorage=window.sessionStorage.getItem("key") ;
       })
   }
}
</script>

<style  lang="scss" rel="stylesheet/scss" >
.DownLoadApp{
  display:none;
}
.color2d982e {
    color: #2d982e;
}
.alertBOX {
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
    display: none;
}
.borderRightGray {
    border-right: 1px solid gainsboro;
}
  .alertGoAPP {
    width: 70%;
    position: absolute;
    left: 15%;
    background: white;
    top: 50%;
    margin-top: -50px;
    p {
      width: 40%;
      color: #000000;
      text-align: center;
      margin: 0 auto;
      padding-top: 10px;
      line-height: 30px;
      padding-bottom: 10px;
      font-weight: bold;
      font-size: 16px;
    }
    div {
      overflow: hidden;
      border-top: 1px solid gainsboro;
      span {
        display: block;
        width: 50%;
        text-align: center;
        font-size: 16px;
        float: left;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
.textWhite {
    color: #FFFFFF;
}
.height90P {
    height: 90%;
}
.bottom0 {
    bottom: 0;
}
.MT2point5 {
    margin-top: 2.5px;
}
.ML5P {
    margin-left: 5px;
}
.overHidden {
    overflow: hidden;
}
.opacity7 {
    opacity: 0.7;
}
$height:44px;
$width:317px;
.RightNowDownLoad {
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    font-size: 14px;
    padding: 0 20px;
    border-radius: 12px;
    cursor: pointer;
    display: block;
    float: right;
    color: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.8);
  }
.DownLoadApp {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    bottom: 0px;
    height: 80px;
    width: 100%;
    &>div {
      width: 95%;
      margin: 0 auto;
      height: 50px;
      margin-top: 15px;
      img {
        height: 80%;
        margin-top: 5px;
      }
    }
  }
.phcolor{ color:#999;}
.partner .enTitle[data-v-e3740a36]{
  padding-bottom: 34px;
}
.partner #partner .partnerLogo{
      padding-top: 60px ;
}
.font28{
  font-size:34px;
}
.downloadContent .bannerWrapper .bannerContent .contentRight .act03Tex a{
  color: #3997f4;
}
 .financial{
    padding: 54px 0;
    width: 100%;
    margin: 0 auto;
 }
.downloadMain .advTempl .advBody li{
  border:none ;
}
.blue{
  background:#3471ef;
  background: -webkit-linear-gradient(left, #2e3ee7 , #3997f4); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #2e3ee7, #3997f4); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #2e3ee7, #3997f4); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #2e3ee7 , #3997f4); /* 标准的语法 */
}
.gray{
  background-color: rgba(0,0,0,0.3);
}
.input::-webkit-input-placeholder { /* WebKit browsers */
color: #fb4148;
}
.input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
color: #fb4148;
}
.input::-moz-placeholder { /* Mozilla Firefox 19+ */
color: #fb4148;
}
.input:-ms-input-placeholder { /* Internet Explorer 10+ */
color: #fb4148;
}
.fontColor{
  color:#e3e0e6;
}
.colorG{
  color:#ffebee;
}
#confirm:hover {
    color: #fff;
}
#close:hover {
    color: #616161;
}
.downloadContent .bannerWrapper .bannerContent .contentRight div input{
  width:244px
}
.downloadContent .bannerWrapper .bannerContent .contentRight .agreenment {
  text-align:left;
  position:relative;
  left:0;
  top: -6px;
  color:#fff;

}
.downloadContent .bannerWrapper .bannerContent .contentRight .act03Tex{
  color:#fff;
  background:none;
}
  #alertBoxDiv{
    height:190px;
    width:400px;
    left:50%;
    top:50%;
    margin-top: -95px;
    margin-left:-200px;
    box-shadow: 0px 0px 3px #666;
  }
    #alertBox{
    background:rgba(0,0,0,0.3);
    left:0;
    top:0;
    z-index: 1001;

  }
.downloadContent{
  width: 100%;
  text-align: left;
  .reminder{
    top:-76px;
    left:0;
    width:100%;
    height:76px;
    line-height:76px;
    background:rgba(83,65,123,0.9);
    color:#fff;
    text-align:center;
    font-size:24px;
    z-index:1000;
    transition:all 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
  .bannerWrapper{
    .bannerPic{
      position: relative;
      height:800px;
      left: 50%;
      transform: translateX(-50%);
    }
    .bannerContent{
       position:absolute;
       padding: 0 0 0 20px;
       left:50%;
       transform: translateX(-50%);
       top:120px;
       width:1160px;
       height:617px;
       .contentLeft{
          .leftText{
            padding-top: 133px;
            font-size: 32px;
          }
          .special{
        background:#2e679c;
          }
       }
       .contentRight{
        margin-top:80px;
        height:100%;
        text-align: right;
        .register{
          display:block;
        }
        div{
          width:$width;
          height:$height;
          input{
          height:$height;
          line-height:$height;
        .verification{
          width:50px;
          height:44px;
          background-color:#ff063c;
        }
          }

        }
        .verifycode{
            input{
              width:244px;
            }
            img{

            }
          }
        .password{
          input{
              width:244px;
            }
        }
        .phoneNum{
          input{
            width:244px;
          }
        }
        .captcha{
          overflow: visible;
          input{
            width:180px;
            left:25px;
          }
          span{
              width:86px;
              right:-1px;
          }
        }
        a{
          width:$width;
      height:$height;
      line-height:$height;
      color:#fff;
      letter-spacing:1px;
        }
        span{
          width:$width;
      height:$height;
      line-height:$height;
        }
       }
    }
  }
}
.grayTexa0 {
    color: #aeb1b8;
}
@media only screen and (max-width: 1280px) {
  #nav .navWrap .logo[data-v-088a0d5a]{
        margin-left: 50px;
  }
  #nav .navWrap .navContent[data-v-088a0d5a]{
    margin-right: 60px;
  }
  .downloadContent .bannerWrapper .bannerPic{
    height:620px;
  }
  .downloadContent .bannerWrapper .bannerContent{
    top:48px;
    width:910px;
    height:500px;
  }
}
@media only screen and (max-width: 798px) {
  .DownLoadApp{
  display:block;
}
      .DownLoadApp {
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      bottom: 0px;
      height: 80px;
      width: 100%;
      &>div {
        width: 95%;
        margin: 0 auto;
        height: 50px;
        margin-top: 15px;
        img {
          height: 80%;
          margin-top: 5px;
        }
      }
    }
  .downloadMainN .advantage ul li img{
    width:13%
  }
  .downloadMainN .advantage ul li p.fl{
    float:none
  }
    .downloadMainN .advantage ul li p.fr{
    float:none
  }
     .downloadMain{
    display:none;
  }
  .downloadMainN{
    display:block
  }
  .imgCssL {
    padding-left: 35px;
}
  .imgCssR {
    padding-right: 31px;
}
  .downloadMainN .advantage ul li .adLiTitle {
    color: #3a9cf5;
}
   .downloadMainN  .advantage ul li {
    height: 111px;
    margin-bottom: 14px;
    padding: 2% 1%;
    background: #d8dbdf;
}
   .downloadMainN .advantage ul {
    width: 80%;
    margin: 0 auto;
    padding-top: 10px;
}
   .downloadMainN .advantage {
    display: block;
    margin-top: 23px;
}
  .opacity80{
      filter: alpha(opacity=80);
    -moz-opacity: 0.8;
    -khtml-opacity: 0.8;
    opacity: 0.8;
}
.downloadContent .bannerWrapper .bannerContent .contentLeft .special{
        background: #16233d;
    background: rgba(91, 96, 105, 0.2);
  }
  .font36 {
    font-size:28px
  }
  #alertBox{
    background:rgba(0,0,0,0.3);
    left:0;
    top:0;
    z-index: 1001;
  }
  #alertBoxDiv{
    width:80%;
    height:190px;
    left:10%;
    top:50%;
    margin-top: -95px;
    margin-left:0;
    box-shadow: 0px 0px 3px #666;
  }
  .imgCssL{
    padding-left:18px;
  }
  .imgCssR{
    padding-right:10px;
  }
  .pl{
    padding-left:18px;
  }
  .pr{
    padding-right:10px;
  }
.downloadContent{

  }
  .downloadContent{
    padding-bottom:42px;
    background:url('~assets/img/landingPageBkg.jpg');
    height:100%;
    width:100%;
      .reminder{
          height:70px;
          line-height:70px;
          font-size:18px;
        }
    .bannerWrapper{
      .bannerPic{
        display:none;
      }
    .bannerContent{
        width:750px;
        position:relative;
        height:400px;
      .contentLeft {
        float:none;
        text-align:center;
        left:50%;
        position:relative;
        -webkit-transform: translateX(-51%);
        -moz-transform: translateX(-51%);
        -ms-transform: translateX(-51%);
        -o-transform: translateX(-51%);
        transform: translateX(-51%);
        .highest{
            margin-top:0;
            margin-bottom:10px;
        }
        .leftText{
          margin-top:0;
          padding-top:0;
          font-size:18px;
          margin-bottom:0;
        }
        .special{
            padding-top: 3px;
            padding-bottom: 3px;
            font-size:12px;
         }
      }
      .contentRight {
        padding-top:50px;
        float:none;
        text-align:center;
        margin:0 auto;
        position:absolute;
        left:50%;
        transform:translateX(-50%);
        .register{
          display:none;
        }
    }
   }
  }
 }
}
@media only screen and (max-width: 500px){

   .downloadMainN .advantage ul li img{
    width:20%
  }
  .downloadMainN .advantage ul li p.fl{
    float:left
  }
    .downloadMainN .advantage ul li p.fr{
    float:right
  }
  .font14{
    font-size:12px
  }
}
@media only screen and (max-width: 375px){
    .downloadContent .bannerWrapper .bannerContent .contentRight a{
    width:300px;
  }
}
@media only screen and (max-width: 360px) {
  .RightNowDownLoad {
        padding: 0 15px;
        font-size: 12px;
      }

  .font36 {
    font-size:24px
  }
  .font24 {
    font-size: 20px;
}
  .downloadMain{
    display:none;
  }
 .downloadContent .bannerWrapper .bannerContent .contentRight div input{
  width:210px
 }
  .downloadContent .bannerWrapper .bannerContent .contentRight{
    width:256px
  }
.downloadContent .bannerWrapper .bannerContent .contentRight div{
  width:256px
}
.downloadContent .bannerWrapper .bannerContent .contentRight .phoneNum input{
  width:210px;
}
.downloadContent .bannerWrapper .bannerContent .contentRight .captcha  input{
  width:150px
}
.downloadContent .bannerWrapper .bannerContent .contentRight .captcha span{
  width:78px
}
.downloadContent .bannerWrapper .bannerContent .contentRight .verifycode input{
  width:210px
}
.downloadContent .bannerWrapper .bannerContent .contentRight a{
  width:256px;
}
    .downloadContent{

     }
}

</style>
