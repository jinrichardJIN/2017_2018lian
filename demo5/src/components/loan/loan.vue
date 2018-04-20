<template>
  <div class='loanContent outHide' id="loan">
    <div class="contentWrap positionR">
      <img class="positionR imgBkg" src="./banner3.png">
      <div class="contentBox positionA clearfix">
        <div class="contentLeft fl">
          <div class="title_1 font32 whiteTex textL">多点小贷</div>
          <div class="title_2 font32 textL">掌上借钱&nbsp;享你所想</div>
          <div class="clearfix downloadBox">
            <div class="fl">
              <span class="font18 whiteTex block downBtn" :class="animateLeft1"
                    @click="changeQrcode('iphone')">IOS 敬请期待</span>
              <span class="font18 whiteTex block downBtn" :class="animateRight1" @click="changeQrcode('android')">Android 敬请期待</span>
            </div>
            <div class="fl none">
              <img class="qrCode" :src="qrcodeSrc"/>
              <div class="font12 text">下载多点金融app</div>
            </div>
          </div>
        </div>
        <div class="contentRight positionR fr">
          <img class="positionA" src="./loanPhoneHeader.png"/>
        </div>
      </div>
    </div>
    <div class="downloadMain">
      <div class="advWrap" id="advWrap">
        <advantage :advantageData="advantageData"></advantage>
      </div>
      <div class="textC financial">
        <v-title :titleData="titleData"></v-title>
        <!--<div class="advTitle blackTex2 font34">多点金融1.0</div>-->
        <!--<div class="enTitle font20">Company Profile</div>-->
        <div class="financialBody outHide clearfix">
          <div :class="animateLeft2" class="fr financialRight">
            <ul class="textWrapper">
              <li class="textL text clearfix">
                <div class="fl textWrap">
                  <p class="font20 blackTex2 textTitle">1.产品灵活</p>
                  <p class="textContent">交易随心，金额期限可选</p>
                </div>
              </li>
              <li class="textL text clearfix">
                <div class="fl textWrap">
                  <p class="font20 blackTex2 textTitle">2.方便快捷</p>
                  <p class="textContent">轻松借款，不受时空限制</p>
                </div>
              </li>
              <li class="textL text clearfix">
                <div class="fl textWrap">
                  <p class="font20 blackTex2 textTitle">3.闪电审批</p>
                  <p class="textContent">高额低息，最快当天放款</p>
                </div>
              </li>
            </ul>
          </div>
          <div :class="animateRight2" class="fl financialLeft ">
            <img src="./loanPhoneBottom.png" width="100%">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Advantage from '../advantage/advantage'
  import VTitle from '../publicComponents/title/title.vue'
  export default{
    data(){
      return {
        //advatage组件数据
        advantageData: [
          { src: require('assets/advantage/advIcon8.png'), title: '审核便捷', content: '在线审核、大数据支持' },
          { src: require('assets/advantage/advIcon9.png'), title: '利率低', content: '超低利率、无其它费用' },
          { src: require('assets/advantage/advIcon10.png'), title: '还款便捷', content: '即时到账、轻松自如' },
          { src: require('assets/advantage/advIcon11.png'), title: '多种额度', content: '满足不同借款需求' },
        ],
        //二维码数据
        qrcodeSrc: require("../loan/qrcode_andorid.png"),
        isAndroidImg: true,
        //title组件数据
        titleData: {
          title: "多点小贷1.0",
          colorClass: 'blueColor'
        },
        //动画函数数据
        windowScrollTop: 0,
        financialRightHeight: 0,
        animateLeft1: 'showL',
        animateRight1: 'showR',
        animateLeft2: '',
        animateRight2: '',
        qrcodeHeight: '',
        //截留开关 提升滚动性能
        bOk: true
      }
    },
    methods: {
      //切换二维码图片
      changeQrcode(way){
        if (way === 'iphone') {
          this.isAndroidImg = false;
        } else if (way === 'android') {
          this.isAndroidImg = true;
        }
      },
      //监听窗口滚动
      windowOnScroll(){
        //提升滚动性能 每100ms执行滚动函数一次
        if (!this.bOk) {
          return;
        } else {
          this.windowScrollTop = $(window).scrollTop();
          var windowHeight = $(window).height();//可能会被改变大小 所以要重新获取
          var widthScreen = $(window).width();
          if (widthScreen >= 768) {
            //header区动画
            if (this.windowScrollTop >= Math.abs(this.qrcodeHeight - windowHeight)) {
              this.animateLeft1 = '';
              this.animateRight1 = '';
            } else {
              this.animateLeft1 = 'showL';
              this.animateRight1 = 'showR';
            }
            //多点金融区动画
            if (this.windowScrollTop >= Math.abs(this.financialRightHeight - windowHeight)) {
              this.animateLeft2 = 'showL';
              this.animateRight2 = 'showR';
            } else {
              this.animateLeft2 = '';
              this.animateRight2 = '';
            }
          }
        }
        this.bOk = false;
        setTimeout(() => {
          this.bOk = true;
        }, 100)
      }
    },
    components: {
      Advantage, VTitle
    },
    mounted(){
      this.$nextTick(function () {
        /*var oLoan = document.querySelector('#loan');
         if (oLoan.className === 'active') {
         var oLoanLogo = document.getElementsByClassName('duodianLogo')[0];
         }*/
        this.financialRightHeight = $('.financialRight').eq(0).offset().top;//要添加动画的图片的高度

        this.qrcodeHeight = $('.qrCode').eq(0).offset().top;//二维码的高度
      })
      $(window).on('scroll', () => {
        this.windowOnScroll();
      })
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .loanContent {
    width: 100%;
    text-align: left;
  }

  .contentWrap {
    font-size: 0;
    .imgBkg {
      width: 100%;
      height:auto;
    }
    .contentBox {
      width: 60%;
      height: 70%;
      bottom: 0;
      left: 48%;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
      .contentLeft {
        padding-top: 5%;
        .title_2 {
          color: #D2D3D7;
          padding-top: 10px;
        }
        .title_2:after {
          display: block;
          content: '';
          position: relative;
          width: 40px;
          height: 4px;
          background: #3a9cf5;
          left: 0;
          bottom: -28px;
        }
        .downloadBox {
          margin-top: 18%;
          .downBtn {
            margin-top: 20px;
            width: 216px;
            height: 50px;
            line-height: 50px;
            background: url("./invest_button.png") no-repeat;
            background-size: 100% 100%;
            text-align: center;
          }
          .text {
            color: #CFC9C9;
            padding-left: 30px;
            padding-top: 10px;
          }
          .qrCode {
            width: 110px;
            margin-top: 24px;
            margin-left: 30px;
          }
        }
      }
      .contentRight {
        width: 32.5%;
        height: 100%;
        img {
          width: 87%;
          bottom: 0;
          right: 0;
          height:auto;
        }
      }
    }
  }

  /*多点金融1.0样式*/
  .downloadMain {
    min-width: 1200px;
    .advWrap {
      .advBody {
        li {
          background-color: #fff;
        }
      }
    }
    .financial {
      padding-top: 54px;
      width: 100%;
      margin: 0 auto;
      background: url('./Group3_bg.png') no-repeat top center;
      .financialBody {
        padding: 115px 90px 0 0;
        width: 1200px;
        box-sizing: border-box;
        margin: auto;
        .financialLeft {
          width: 25%;
          margin: auto;
          margin-left: 25%;
          height: 500px;
          overflow: hidden;
          img{
            height:auto;
          }
        }
        .financialRight {
          width: 50%;
          padding-left: 13%;
          padding-top: 9%;
          box-sizing: border-box;
          .textWrapper {
            .text {
              height: 100px;
              .textTitle {
                padding: 30px 0 10px;
                font-size: 22px;
              }
              .textContent {
                color: #858585;
                padding: 2px 0;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }

  /*动画部分*/
  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-40%, 0, 0);
      transform: translate3d(-40%, 0, 0);
    }

    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  @keyframes fadeInRight {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(30%, 0, 0);
      transform: translate3d(30%, 0, 0);
    }

    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  .showL, .showR {
    -webkit-animation-duration: .8s;
    animation-duration: .8s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .showL {
    -webkit-animation-delay: 0.5s;
    -moz-animation-delay: 0.5s;
    -o-animation-delay: 0.5s;
    animation-delay: 0.5s;
    -webkit-animation-name: fadeInLeft;
    animation-name: fadeInLeft;
  }

  .showR {
    -webkit-animation-delay: 0.8s;
    -moz-animation-delay: 0.8s;
    -o-animation-delay: 0.8s;
    animation-delay: 0.8s;
    -webkit-animation-name: fadeInRight;
    animation-name: fadeInRight;
  }

  @media only screen and (min-width: 798px) and (max-width: 1200px) {
    .title_1, .title_2 {
      font-size: 22px;
    }
    .contentWrap .contentBox .contentLeft .downloadBox {
      margin-top: 15%;
    }
    .contentWrap .contentBox .contentLeft .downloadBox .downBtn {
      margin-top: 10px;
      width: 150px;
      height: 35px;
      line-height: 35px;
      font-size: 14px;
    }
    .contentWrap .contentBox .contentLeft .downloadBox .qrCode {
      width: 90px;
      margin-top: 10px;
    }
    .contentWrap .contentBox .contentLeft .downloadBox .text {
      padding-left: 30px;
      padding-top: 5px;
    }

  }

  @media only screen and (max-width: 798px) {
    /*头部样式*/
    .contentWrap {
      font-size: 0;
      height: 355px;
      overflow: hidden;
      .imgBkg {
        width: auto;
        height: 355px;
        top: 0;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
      }
      .contentBox {
        width: 88%;
        height: 80%;
        bottom: 0;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        .contentLeft {
          width: 50%;
          .title_2:after {
            display: block;
            content: '';
            position: relative;
            width: 30px;
            height: 2px;
            background: #3a9cf5;
            left: 0;
            bottom: -18px;
          }
        }
        .contentRight {
          width: 50%;
          img {
            width: auto;
            height: 94%;
          }
        }
      }
    }
    .title_1, .title_2 {
      font-size: 16px;
    }
    .contentWrap .contentBox .contentLeft .downloadBox {
      margin-top: 15%;
      text-align: center;
    }
    .contentWrap .contentBox .contentLeft .downloadBox .downBtn {
      margin-top: 10px;
      width: 100px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
    }
    .contentWrap .contentBox .contentLeft .downloadBox .qrCode {
      width: 50px;
      margin-top: 10px;
      margin-left: 0;
    }
    .contentWrap .contentBox .contentLeft .downloadBox .text {
      padding-left: 0;
      padding-top: 5px;
    }
    /*多点金融1.0样式*/
    .downloadMain {
      min-width: auto;
      #advWrap {
        padding-top: 0;
        .advBody {
          padding-top: 0;
        }
      }
      .financial {
        padding-top: 50px;
        .financialBody {
          padding: 50px 0 0;
          width: 100%;
          .financialLeft {
            width: 60%;
            height: 390px;
            padding: 10px 0 0;
            float: none;
            margin: 0 auto;
            .textWrapper {
              padding-top: 0px;
              .text {
                padding: 0px 0 0 0px;
                width: 100%;
                height: auto;
                .textWrap {
                  width: 60%;
                  margin-top: 6%;
                  .textTitle {
                    padding: 0px 0px 0px 10%;
                    font-size: 16px;
                  }
                  .textContent {
                    color: #858585;
                    padding: 0px 0px 0px 10%;
                    font-size: 12px;
                  }
                }
              }
            }
          }
          .financialRight {
            float: none;
            width: 100%;
            padding: 0;
            .textWrapper {
              .text {
                height: 75px;
                .textWrap {
                  width: 100%;
                  text-align: center;
                  .textTitle {
                    padding-top: 0;
                    font-size: 16px;
                  }
                  .textContent {
                    font-size: 12px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .fade-enter-active {
    transition: 1s all ease;
  }

  .fade-leave-active {
    transition: 0.2s all ease;
  }

  .fade-enter-active {
    opacity: 1;
  }

  .fade-leave-active {
    opacity: 0;
  }

  .fade-enter {
    opacity: 0;
  }

  @media only screen and (max-width: 798px) and (min-width: 376px) {
    .downloadMain .financial .financialBody .financialLeft {
      height: 420px;
    }
  }

  @media only screen and (min-width: 798px) and (max-width: 1200px) {
    #main {
      width: 1200px;
    }
  }

  @media only screen and (max-width: 320px) {

    .bannerWrapper {
      .bannerContent {
        .contentLeft {
          font-size: 16px;
          width: 50%;
          font-weight: 400;
          top: 80px;
          left: 0;
          .leftText {
            padding-top: 0px;
            font-size: 16px;
          }
          .line {
            margin-top: 20px;
          }
          .expectation {
            width: 145px;
            height: 35px;
            border-radius: 18px;
            text-align: center;
            line-height: 35px;
            font-size: 16px;
            margin-top: 18px;
            &.MT20 {
              margin-top: 10px;
            }
          }
          .subTitle {
            font-size: 16px;
            font-weight: 400;
          }
          .qrcode {
            width: 70px;
            height: 70px;
            left: 40px;
            top: 90px;
          }
          .tips {
            width: 145px;
            margin-top: 85px;
          }
        }
        .contentRight {
          height: 77%;
          position: absolute;
          bottom: 0px;
          z-index: -10;
          img {
            margin-left: 35%;
          }
        }
      }
    }
    .downloadMain {
      .financial {
        .financialBody {
          .financialLeft {
            height: 340px;
          }
        }
      }
    }
  }


</style>
