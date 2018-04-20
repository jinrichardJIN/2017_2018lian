<template >
  <div>
    <div class="contentWrap positionR">
      <img class="positionR imgBkg" src="./invest_banner1.jpg" >
      <img class="positionR imgBkg" src="./invest_banner2.jpg" >
      <img class="positionR imgBkg" src="./invest_banner3.jpg" >
      <div class="contentBox positionA clearfix">
        <div class="contentLeft fl">
          <div class="title_1 font32 whiteTex textL">多点金融App震撼上线</div>
          <div class="title_2 font32 textL">资金更安全 操作更便捷</div>
          <div class="clearfix downloadBox">
            <div class="fl">
              <a href="https://itunes.apple.com/cn/app/id1257599111" rel="nofollow" target="_blank">
                <span class="font18 whiteTex block downBtn cursor" :class="animateLeft1">IOS 下载</span>
              </a>
              <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.duodianjr.finance" rel="nofollow" target="_blank">
                <span class="font18 whiteTex block downBtn" :class="animateRight1">Android 下载</span>
              </a>
            </div>
            <div class="fl">
              <img class="qrCode" src="./yingyongbaoDown.png" />
              <div class="font12 text">下载多点金融app</div>
            </div>
          </div>
        </div>
        <div class="contentRight positionR fr">
          <img class="positionA" src="./invest_banner3.png" />
        </div>
      </div>
    </div>
    <div>
      <advantage :advantageData='advantage'></advantage>
    </div>
    <div class="titleWrap">
      <v-title :titleData="titleData"></v-title>
    </div>
    <div class="bannerWrap positionR">
      <div class="subTitle">
        <p>{{ bannerTitle[curIndex].title }}</p>
        <div>{{ bannerTitle[curIndex].subtitle }}</div>
      </div>

      <div class="con">
        <div class="conIn" id="bannerListBox">
          <ul class="imgList clearfix">
            <li><img :src="bannerList[0].src"/></li>
            <li><img :src="bannerList[1].src"/></li>
            <li><img :src="bannerList[2].src"/></li>
            <li><img :src="bannerList[0].src"/></li>
            <li class="curScaleLi"><img :src="bannerList[1].src"/></li>
            <li><img :src="bannerList[2].src"/></li>
            <li><img :src="bannerList[0].src"/></li>
            <li><img :src="bannerList[1].src"/></li>
            <li><img :src="bannerList[2].src"/></li>
          </ul>
        </div>
        <a href="javascript:" class="left" @click="preFun"><img src="./blue_left_btn.png" width="100%"
                                                                height="auto"></a>
        <a href="javascript:" class="right" @click="nextFn"><img src="./blue_right_btn.png" width="100%" height="auto"></a>
      </div>
      <ol class="btnList">
        <li class="current"></li>
        <li></li>
        <li style="margin-right:0;"></li>
      </ol>

      <!--<swiper :options="swiperOption"  ref="mySwiper">-->
      <!--&lt;!&ndash; 这部分放你要渲染的那些内容 &ndash;&gt;-->
      <!--<swiper-slide v-for="(item, index) in bannerList" :key="index" :class="{  }">-->
      <!--<img :src="item.src" />-->
      <!--</swiper-slide>-->
      <!--&lt;!&ndash; 这是轮播的小圆点 &ndash;&gt;-->
      <!--<div class="swiper-pagination" slot="pagination"></div>-->
      <!--</swiper>-->
      <!--&lt;!&ndash;前后按钮&ndash;&gt;-->
      <!--<div class="swiper-button-prev positionA" slot="button-prev"><img src="./blue_left_btn.png"></div>-->
      <!--<div class="swiper-button-next positionA" slot="button-next"><img src="./blue_right_btn.png"></div>-->

    </div>
    <!--<div class="positionR depositBox">-->
      <!--<img class="positionR" :src="cunguanBkg" width="100%" height="auto"/>-->
      <!--<div class="depositWrap positionA">-->
        <!--<div class="depositTile">-->
          <!--<p class="font26 whiteTex">资金存管模式</p>-->
          <!--<div class="font20 whiteTex PT10"></div>-->
        <!--</div>-->
        <!--<img class="invest_cunguan" :src='cunguanImg' width="100%" />-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import Advantage from '../advantage/advantage'
import VTitle from '../publicComponents/title/title'
//import {swiper, swiperSlide } from 'vue-awesome-swiper'

var widthScreen = $(window).width();
//用来模拟那个不断在变化的角标序号
var btnKey = 0;
//用来模拟那个不断在变化的图片序号
var imgKey = 3;

export default{
      data(){
          return {
            advantage: [
              {src: require('assets/advantage/advIcon1.png'), title: '可信赖', content: '安全、透明和便捷'},
              {src: require('assets/advantage/advIcon2.png'), title: '快速便捷', content: '操作便捷、即时到账'},
              {src: require('assets/advantage/advIcon3.png'), title: '多重保障机制', content: '行业资深风控团队'},
              {src: require('assets/advantage/advIcon4.png'), title: '小额分散', content: '风险分布分散'},
            ],
            //title组件数据
            titleData: {
              title: "多点金融1.0",
              colorClass: 'blueColor1'
            },
            titleData1: {
              title: "资金存管模式",
              colorClass: 'whiteColor1'
            },
            cunguanImg: require('../Investment/invest_cunguan1.png'),
            cunguanBkg: require('../Investment/invest_cunguanBkg1.png'),
            // banner
            bannerList:[
              { src: require('./invest_banner1.png') },
              { src: require('./invest_banner2.png') },
              { src: require('./invest_banner3.png') }
            ],
//            swiperOption: {
//              //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
//              pagination: '.swiper-pagination',  //分页器容器的css选择器或HTML标签。
//              paginationClickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
//              spaceBetween: 15,
//              slidesPerView: 3,  //设置slider容器能够同时显示的slides数量(carousel模式)。
//              loop:true,
//              // 如果需要前进后退按钮
//              nextButton: '.swiper-button-next',
//              prevButton: '.swiper-button-prev',
//              onSlideChangeEnd: swiper => {
//                //这个位置放swiper的回调方法
//                this.page = swiper.realIndex+1;
//                this.curIndex = swiper.realIndex;
//              }
//            },

            //动画函数数据
            windowScrollTop: 0,
            animateLeft1: 'showL',
            animateRight1: 'showR',
            qrcodeHeight:'',
            //截留开关 提升滚动性能
            bOk: true,

            // banner 当前 焦点  按钮
            curIndex: 0,
            activePoint:'activePoint',
            activeLi: 'activeLi',
            preClickState: true,
            nextClickState: true,
            bannerTitle: [
                { title:'享投资', subtitle:'操作简单，方便快捷' },
                { title:'新平台', subtitle:'全新平台，轻松理财' },
                { title:'真放心', subtitle:'安全可靠，值得信赖' }
            ],

            qrcodeSrc: require('../Investment/finance.png')
          }
      },
      components:{
        Advantage,
        VTitle
//        swiper,
//        swiperSlide
      },
      methods:{
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
                }
              }
              this.bOk = false;
              setTimeout(() => {
                this.bOk = true;
              }, 100)
            },
        nextFn(){  //轮播图
          var s;
          btnKey++;
          if (btnKey > 2) {
            btnKey = 0;
          }
          this.curIndex = btnKey;
          $('.btnList li').eq(btnKey).addClass('current').siblings().removeClass('current');
          imgKey++;
          console.log(imgKey);
          if (imgKey > 6) {
            imgKey = 1;
            $('.imgList').css('left', 0);
          }
          if (widthScreen <= 600) {
            s = imgKey * -200;
          } else {
            s = imgKey * -250;
            $('.imgList li').eq(imgKey + 1).addClass('curScaleLi').siblings().removeClass('curScaleLi');
          }
          $('.imgList').stop(true).animate({'left': s}, 500);
          /*---------- 控制图片结束 ----------*/
        },
          changeQrcode(way){
            var oQrcodeAnd = require('../Investment/Android.png');
            var oQrcodeIphone = require('../Investment/Ios.png');
            if (way === 'iphone') {
              this.qrcodeSrc = oQrcodeIphone;
            } else if (way === 'android') {
              this.qrcodeSrc = oQrcodeAnd;
            }
          },
        preFun(){
          var s;
          btnKey--;
          if (btnKey < 0) {
            btnKey = 2;
          }
          this.curIndex = btnKey;
          $('.btnList li').eq(btnKey).addClass('current').siblings().removeClass('current');
          imgKey--;
          console.log(imgKey);
          if (imgKey < 0) {
            imgKey = 5;
            if (widthScreen <= 600) {
              $('.imgList').css('left', -1200);
            } else {
              $('.imgList').css('left', -1500);
            }
          }
          if (widthScreen <= 600) {
            s = imgKey * -200;
          } else {
            s = imgKey * -250;
            $('.imgList li').eq(imgKey + 1).addClass('curScaleLi').siblings().removeClass('curScaleLi');
          }
          $('.imgList').stop(true).animate({'left': s}, 500);
        },
        touchMove(){
          var _this = this;
          var mybody = document.getElementById('bannerListBox');
          var startX, startY, moveEndX, moveEndY, X, Y;
          mybody.addEventListener('touchstart', function (e) {
            e.preventDefault();
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
          }, false);
          mybody.addEventListener('touchmove', function (e) {
            e.preventDefault();
            moveEndX = e.changedTouches[0].pageX;
            moveEndY = e.changedTouches[0].pageY;
            X = moveEndX - startX;
            Y = moveEndY - startY;
          });
          mybody.addEventListener('touchend', function (e) {
            if (Math.abs(X) > Math.abs(Y) && X > 0) {
              _this.preFun();
            }
            else if (Math.abs(X) > Math.abs(Y) && X < 0) {
              _this.nextFn();
            }
          });
        },
          addTransition(){

          }
      },
      //定义这个sweiper对象
      computed: {
        swiper() {
          return this.$refs.mySwiper.swiper;
        }
      },
      mounted(){
        this.$nextTick(function () {
          this.qrcodeHeight = $('.qrCode').eq(0).offset().top;//二维码的高度
          if(widthScreen <= 798 ){
            $('.imgList li').removeClass('curScaleLi');   //轮播图当前状态不要了
              this.cunguanImg = require('../Investment/invest_cunguan2.png');
              this.cunguanBkg = require('../Investment/invest_cunguanBkg2.png');
          }
          this.touchMove();
        });
        $(window).on('scroll', () =>{
          this. windowOnScroll();
        })
      }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  //轮播图样式
  .con {
    width: 750px;
    margin: 0 auto;
    position: relative;
    /*border: 1px solid #ddd;*/
  }

  .conIn {
    height: 530px;
    overflow: hidden;
    position: relative;
  }

  .imgList {
    width: 2250px;
    position: absolute;
    left: -750px;
    bottom: 0;
  }

  .imgList li {
    float: left;
    width: 250px;
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 30px;
    transition: all 0.5s;
  }
  .imgList li:after{
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.05);
    left: 0;
    bottom: 0;
  }

  .imgList li img {
    width: 100%;
    height: auto;
  }

  .imgList li.curScaleLi {
    transform: scale(1.1);
  }
  .imgList li.curScaleLi:after{
    display: none;
  }

  .left, .right {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    margin: -26px 0 0 0;
    opacity: 0.5;
    transition: all 0.5s;
  }

  .left:hover, .right:hover {
    opacity: 1;
  }

  .left {
    left: -120px;
  }

  .right {
    right: -120px;
  }

  .btnList {
    width: 67px;
    height: 13px;
    margin: 0 auto;
    padding: 54px 0;
    background: #F7F7F8;
  }

  .btnList li {
    width: 8px;
    height: 8px;
    float: left;
    margin: 0 5px;
    cursor: pointer;
    background: #C6C6C6;
    border-radius: 50%;
  }

  .btnList li.current {
    background: #007aff;
  }

  @media only screen and (max-width: 600px) {
    .con {
      width: 200px;
    }
    .imgList li {
      width: 200px;
      margin-bottom: 0;
    }
    .conIn {
      height: 370px;
    }
    .imgList {
      width: 1800px;
      left: -600px;
    }
    .left, .right {
      display: none;
    }
    .btnList {
      padding: 30px 0;
    }
  }


//资金存管模式 start
.depositBox{
  font-size: 0;
}
.depositWrap{
  width: 80%;
  top: 7%;
  left: 50%;
  transform: translateX(-50%);
}
.depositTile div:after{
  display: block;
  content: '';
  position: relative;
  width: 40px;
  height: 4px;
  background: #FFF;
  left: 50%;
  transform: translateX(-50%);
  bottom: -15px;
}
.invest_cunguan{
  margin-top: 6.5%;
  height: auto;
}
//资金存管模式 end

  .contentWrap{
    font-size: 0;
    .imgBkg{
      width: 100%;
      height: auto;
    }
    .contentBox{
      width: 60%;
      height: 70%;
      bottom: 0;
      left: 48%;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
      .contentLeft{
        padding-top: 5%;
        .title_2{
          color: #D2D3D7;
          padding-top: 10px;
        }
        .title_2:after{
          display: block;
          content: '';
          position: relative;
          width: 40px;
          height: 4px;
          background: #4CA5F5;
          left: 0;
          bottom: -28px;
        }
        .downloadBox{
          margin-top: 18%;
          .downBtn{
            margin-top: 20px;
            width: 216px;
            height: 50px;
            line-height: 50px;
            background: url("./invest_button.png") no-repeat;
            background-size: 100% 100%;
          }
          .text{
            color: #CFC9C9;
            padding-left: 30px;
            padding-top: 10px;
          }
          .qrCode{
            width: 110px;
            margin-top: 24px;
            margin-left: 30px;
            height: auto;
          }
        }
      }
      .contentRight{
        width: 32.5%;
        height: 100%;
        img{
          width: 87%;
          height: auto;
          bottom: 0;
          right: 0;
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


  .titleWrap{
    padding: 54px 0 84px 0;
    background: #fff;
  }

@media only screen and (min-width: 798px) and (max-width: 1200px){
  .title_1,.title_2{
    font-size: 22px;
  }
  .contentWrap .contentBox .contentLeft .downloadBox{
    margin-top: 15%;
  }
 .contentWrap .contentBox .contentLeft .downloadBox .downBtn{
   margin-top: 10px;
    width: 150px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
  }
  .contentWrap .contentBox .contentLeft .downloadBox .qrCode{
    width: 90px;
    margin-top: 10px;
    height: auto;
  }
  .contentWrap .contentBox .contentLeft .downloadBox .text{
    padding-left: 30px;
    padding-top: 5px;
  }

}


  // banner 轮播图的样式 start
  .bannerWrap{
    background: #f7f7f8 url("./invest_lineBkg.png") no-repeat;
    background-size: 100% 30%;
    background-position: center 55%;
  }
  .swiper-container{
    width: 45%;
    height: 100%;
    padding-bottom: 8%;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets{
    bottom: 10%;
  }
  .swiper-container .swiper-slide img{
    width: 100%;
    height: auto;
  }
  .swiper-slide-next{
    transform: scale(1.1);
  }
  .swiper-slide{
    padding: 4% 0;
  }
  .swiper-slide:after{
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(247,247,248,0.4);
    left: 0;
    bottom: 0;
  }
  .swiper-slide-next:after{
    display: none;
  }
  .swiper-button-prev, .swiper-button-next{
    width: 50px;
    background-image: none;
    transition: all 0.5s;
  }
  .swiper-button-prev:hover, .swiper-button-next:hover{
    opacity: 1;
  }
  .swiper-button-prev{
    left: 18%;
    opacity: 0.5;
  }
  .swiper-button-next{
    right: 18%;
    opacity: 0.5;
  }
  .swiper-button-prev img, .swiper-button-next img{
    width: 100%;
    height: auto;
  }
  .subTitle{
    padding: 3.5% 0;
    font-size: 17px;
  }
  .subTitle p{
    font-size: 30px;
    padding-bottom: 10px;
    color: #000;
  }

  // banner 轮播图的样式 end



  @media only screen and (max-width: 798px){
    .contentWrap{
      font-size: 0;
      height: 355px;
      overflow: hidden;
      .imgBkg{
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
      .contentBox{
        width: 88%;
        height: 80%;
        bottom: 0;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
        .contentLeft{
          width: 50%;
          .title_2:after{
            display: block;
            content: '';
            position: relative;
            width: 30px;
            height: 2px;
            background: #4CA5F5;
            left: 0;
            bottom: -18px;
          }
        }
        .contentRight{
          width: 50%;
          img{
            width: auto;
            height: 94%;
          }
        }
      }
    }
    .title_1,.title_2{
      font-size: 16px;
    }
    .contentWrap .contentBox .contentLeft .downloadBox{
      margin-top: 15%;
    }
    .contentWrap .contentBox .contentLeft .downloadBox .downBtn{
      margin-top: 10px;
      width: 100px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
    }
    .contentWrap .contentBox .contentLeft .downloadBox .qrCode{
      width: 50px;
      margin-top: 10px;
      margin-left: 0;
      height: auto;
    }
    .contentWrap .contentBox .contentLeft .downloadBox .text{
      padding-left: 0;
      padding-top: 5px;
    }

    // banner 轮播图的样式 start
    .bannerWrap{
      background-size: 250% 30%;
      background-position: center 55%;
    }
    .swiper-container{
      width: 100%;
      height: 100%;
      padding-bottom: 20%;
    }
    .swiper-container-horizontal > .swiper-pagination-bullets{
      bottom: 7%;
    }
    .swiper-container .swiper-slide img{
      width: 50%;
    }
    .swiper-slide-next{
      transform: scale(1.1);
    }
    .swiper-slide{
      padding: 0;
    }
    .swiper-slide-active:after{
      display: none;
    }
    .swiper-button-prev, .swiper-button-next{
      display: none;
    }
    .titleWrap{
      padding: 40px 0 55px 0;
      background: #fff;
    }
    .subTitle{
      padding: 7% 0;
      font-size: 12px;
    }
    .subTitle p{
      font-size: 18px;
      padding-bottom: 10px;
      color: #000;
    }

    // banner 轮播图的样式 end


    //资金存管模式 start
    .depositBox{
      font-size: 0;
    }
    .depositWrap{
      width: 70%;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .depositTile{
      padding: 50px 0 45px;
    }
    .depositTile p{
      font-size: 18px;
    }
    .depositTile div{
      font-size: 12px;
    }
    .depositTile div:after{
      display: block;
      content: '';
      position: relative;
      width: 40px;
      height: 4px;
      background: #FFF;
      left: 50%;
      transform: translateX(-50%);
      bottom: -15px;
    }
    .invest_cunguan{
      margin-top: 30px;
    }
    //资金存管模式 end


  }

  @media only screen and (max-width: 414px){
  }
  @media only screen and (max-width: 375px){
  }
  @media only screen and (max-width: 320px){
    .depositTile{
      padding: 30px 0 25px;
    }
    .title_1,.title_2{
      font-size: 14px;
    }
  }

</style>
