<template>
  <div class='downloadContent outHide'>
    <div class='bannerWrapper positionR'>
        <img src="~assets/img/downLoadBanner.jpg" class='bannerPic' width='100%'>
        <div class='bannerContent'>
            <div class='contentLeft fl whiteTex'>
               <p class="font48 leftText">糯糯金融</p>
               <p class="clearfix font24 subTitle"><span class="fl inlineB">把你的零钱连起来, </span> <span class="fl">把你的零钱连起来</span></p>
               <div class="expectation MT35">敬请期待</div>
               <div class="expectation special MT20">敬请期待</div>
            </div>
            <!-- <div class='contentRight'> -->
              <img src="~assets/img/downloadBnnerPic.png" height='100%' class="contentRight">
            <!-- </div> -->
        </div>
    </div>
    <div class="downloadMain">
       <div class="advWrap">
         <advantage></advantage>
       </div>
       <div class="textC financial">
         <div class="advTitle blackTex2 font34">糯糯金融1.0</div>
         <div class="enTitle font20">WAXY GLUTINOUS FINANCIAL 1.0</div>
         <div class="financialBody outHide">
           <div class="fl financialLeft">
              <ul class="textWrapper">
                <li class="textL text clearfix">
                  <div class="fl picWrap">
                    <img src="~assets/img/downloadIcon3.png" width="100%">
                  </div>
                  <div class="fl textWrap clearfix">
                    <p class="font20 blackTex2 textTitle">新平台</p>
                    <p class="textContent">全新平台，轻松理财</p>
                  </div>

                </li>
                <li class="textL text clearfix">
                  <div class="fl picWrap">
                    <img src="~assets/img/downloadIcon2.png" width="100%">
                  </div>
                  <div class="fl textWrap">
                    <p class="font20 blackTex2 textTitle">真放心</p>
                    <p class="textContent">四重保障，安全可靠</p>
                  </div>

                </li>
                <li class="textL text clearfix">
                  <div class="fl picWrap">
                    <img src="~assets/img/downloadIcon.png" width="100%">
                  </div>
                  <div class="fl textWrap">
                    <p class="font20 blackTex2 textTitle">享活期</p>
                    <p class="textContent">操作简单，方便快捷</p>
                  </div>

                </li>
              </ul>
           </div>
           <div class="fr financialRight">
             <img src="~assets/img/phoneModel.png" width="100%">
           </div>
         </div>
       </div>
    </div>
  </div>
</template>

<script>
import Advantage from '../advantage/advantage'
export default{
   components:{
      Advantage
   }
}
</script>

<style  lang="scss" rel="stylesheet/scss">
   .advTitle{
    font-weight: 500;
   }
   .enTitle{
        font-weight: 200;
        padding-top: 10px;
        &:after{
          display:block;
          content:'';
          position:relative;
          width:80px;
          height:5px;
            background:#ff053b;
            left:50%;
            transform:translateX(-50%);
            bottom:-30px;
        }
   }
.downloadContent{
  width: 100%;
  text-align: left;
  .bannerWrapper{
    font-size: 0;
    min-width: 1200px;
    .bannerPic{
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .bannerContent{
       position:absolute;
       left:50%;
       transform: translateX(-50%);
       top:15%;
       width:1180px;
       padding:0 20px;
       height:85%;
       .contentLeft{
        height:100%;
        width:40%;
          .leftText{
            padding-top: 4vw;
          }
          .expectation{
            width:280px;
            height:70px;
            border:1px solid #fff;
            border-radius: 38px;
            text-align: center;
            line-height:70px;
            font-size: 20px;
            cursor:pointer;
            &.special{
              background:#ff063c;
              border:1px solid #ff063c;
            }
          }
          .subTitle{
            font-weight: 200;
          }
       }
       .contentRight{
        height:100%;
        position:absolute;
        bottom:0px;
        right:5%;
       }
    }
  }
  .downloadMain{
    min-width: 1200px;
    .advWrap{
      padding-top: 50px;
      background:#f2f2f2;
      .advBody{
        li{
          background-color: #fff;
        }
      }
    }
    .financial{
      padding-top:85px;
      width:1200px;
      margin:0 auto;
      .financialBody {
        padding:100px 90px 50px;
        width:1200px;
        box-sizing:border-box;
        .financialLeft{
          width:50%;
          padding-left: 50px;
          .textWrapper{
            padding-top: 110px;
            .text{
              padding:20px 0 0 0px;
              height:147px;
              .textTitle{
                padding:30px 0 10px;
                font-size: 22px;
              }
              .textContent{
                color:#858585;
                padding:2px 0;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 798px){
  .foot{
    background:#fff;
  }
   .advTitle{
    font-weight: 500;
    font-size: 22px;
   }
   .enTitle{
        font-weight: 200;
        padding-top: 10px;
        font-size: 14px;
        &:after{
          display:block;
          content:'';
          position:relative;
          width:60px;
          height:2px;
            background:#ff053b;
            left:50%;
            transform:translateX(-50%);
            bottom:-20px;
     }
   }
.downloadContent{
  width: 100%;
  text-align: left;
  .bannerWrapper{
    min-width:100%;
    font-size: 0;
    overflow:hidden;
    .bannerPic{
      position: relative;
      min-width:798px;
      left: 50%;
      transform: translateX(-50%);
    }
    .bannerContent{
       position:absolute;
       padding: 0px 20px 0;
       left:0%;
       transform: translateX(00%);
       top:auto;
       bottom:0;
       width:90%;
       height:100%;
       line-height:1.4;
       .contentLeft{
        font-size: 16px;
        width:50%;
        font-weight:400;
          .leftText{
            padding-top: 0px;
            font-size: 26px;
            padding-top: 50%;
          }
          .expectation{
            margin-top: 20px;
            width:90%;
            height:auto;
            padding:12px 0;
            border:1px solid #fff;
            border-radius: 38px;
            text-align: center;
            line-height:1em;
            font-size: 16px;
            cursor:pointer;
            &.special{
              background:#ff063c;
              border:1px solid #ff063c;
            }
          }
          .subTitle{
              font-size: 14px;
              font-weight: 400;
          }
       }
       .contentRight{
        height:80%;
        position:absolute;
        bottom:0px;
        right:5%;
        z-index: -10
       }
    }
  }
  .downloadMain{
    min-width: auto;
    .advWrap{
      padding-top: 40px;
    }
    .financial{
        padding-top:40px;
        width:100%;
        margin:0 auto;
        .financialBody {
          padding:50px 0px;
          width:100%;
          .financialLeft{
            width:80%;
            padding:10px 0px 0 0 ;
            margin-left: 10%;
            .textWrapper{
              padding-top: 0px;
              .text{
                padding:0px 0 0 0px;
                width:100%;
                height:auto;
                .picWrap{
                  width:26%;
                  padding-left: 14%;
                }
                .textWrap{
                  width:60%;
                  margin-top: 6%;
                    .textTitle{
                      padding:0px 0px 0px 10%;
                      font-size: 16px;
                    }
                    .textContent{
                      color:#858585;
                      padding:0px 0px 0px 10%;
                      font-size: 12px;
                    }
                }
              }
            }
          }
          .financialRight{
            width:58%;
            padding:4% 2% 0 0;
          }
        }
      }
    }
 }
}
@media only screen and (max-width: 420px){
  .downloadContent .downloadMain .financial .financialBody .financialRight{
    display:none;
  }

}
@media only screen and (max-width: 340px){
  .downloadContent .downloadMain .financial .financialBody .financialLeft .textWrapper .text .textWrap .textTitle{
    font-size:12px;
  }
}
</style>
