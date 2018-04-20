<template>
  <footer>
    <div class='foot' >
      <!--点击返回顶部按钮-->
      <returnTop></returnTop>
      <div class='footContent clearfix'>
        <div class='footLeft fl'>
          <p>上海赟致金融信息服务有限公司</p>
          <div class="leftBox clearfix">
            <div class="fl address">
              <div>地点: 上海市松江区广富林路4855弄89号1F</div>
              <div>电话: 400-998-9966</div>
            </div>
            <div class="divRight fl">
              <div>邮箱: sevice@yznuonuo.com</div>
              <div>服务时间：9:00-21:00</div>
            </div>
          </div>

        </div>
        <div class='footRight fr'>
          <div class="qrCode fr">
            <div class="qrCodeWrap">
              <div class="inlineB">
                <img  class="" src="./yingyongbaoDown.png" width="100px" height="100px" >
                <div  class="">下载多点金融</div>
              </div>
              <div class="inlineB">
                <img class="none" src="./qr_code.png" width="100px" height="100px" >
                <div class="none">下载多点小贷</div>
              </div>
              <div class="inlineB">
                <img class="" src="./qr_weixinCode.jpg" width="100px" height="100px" >
                <div class="">多点金融官方微信</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footerP">
        <div class="footerDiv clearfix">
          <span class="fl"><span class="footTextL">上海赟致金融信息服务有限公司版权所有 2017</span>  <a class="miitbeian whiteTex  footTextC" href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action" rel="nofollow" target="_blank">沪ICP备17004342号-7</a> <span class="footTextR">沪公网安备31011702000521号</span></span>
          <!--<a id="TradeCertification" class="fl" href="http://si.trustutn.org/info?sn=863170803000596400383&certType=4">-->
            <!--<img src="http://v.trustutn.org/images/cert/p2p_bottom_large_img.jpg" height="40"/>-->
          <!--</a>-->
        </div>
      </div>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
  import returnTop from '../publicComponents/returnTop/returnTop'   //  点击向上  页面top
  export default{
      data(){
          return{}
      },
    components:{
      returnTop
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" >

  /*底部样式*/
  .foot {
    text-align: left;
    line-height: 100%;
    background: #484950;
    overflow: hidden;
  }
  .miitbeian:hover{
    color: #3a9cf5;
  }
  .foot .footContent {
    /*height: 120px;*/
    width: 1200px;
    margin: 0 auto;
    padding: 70px 24px 60px 80px;
    line-height: 1.7em;
    box-sizing: border-box;
    color: #7f7f7f;
  }
  .foot .footContent .footLeft {
  }
  .footContent .footLeft p{
    color: #FFF;
    font-size: 18px;
    padding-bottom: 35px;
  }
  .footContent .footLeft div div{
    padding-bottom: 5px;
  }
  .footLeft .address {
    width: 350px;
  }
  .footLeft .divLeft{
    width: 350px;
  }
  .qrCode{
    font-size: 0;
    margin-top: 20px;
  }
  .qrCode .inlineB{
    margin-left: 20px;
  }
  .qrCode div {
    font-size: 14px;
    text-align: center;
  }
  /*.shareLink{*/
    /*padding-top: 85px;*/
    /*margin: 0 auto;*/
    /*padding-right: 40px;*/
  /*}*/
  /*.shareLink img{*/
    /*padding-right: 30px;*/
  /*}*/
  .footerP{
    height: 74px;
    line-height: 74px;
    color: #FFF;
    background: #45454C;
  }
  .footerDiv{
    width: 1200px;
    margin: 0 auto;
    padding: 0 24px 0 80px;
    box-sizing: border-box;
  }
  .footTextR{
    padding-left: 10px;
  }
  .footTextL{
    padding-right: 10px;
    border-right:1px solid #fff;
  }
  .footTextC{
    padding:0 10px;
    border-right:1px solid #fff;
  }
  #TradeCertification{
    height:40px;
    margin:17px 0 0 48px;
  }
  @media only screen and (max-width: 798px) {

    /*底部样式*/
    .foot {
      text-align: left;
      line-height: 100%;
      background: #484950;
      overflow: hidden;
    }
    .foot .footContent {
      width: 100%;
      margin: 0 auto;
      padding: 40px 10px 30px 10px;
      line-height: 1.7em;
      box-sizing: border-box;
      color: #7f7f7f;
      font-size: 12px;
    }
    .foot .footContent .footLeft {
      width: 100%;
    }
    .footContent .footLeft p{
      color: #FFF;
      font-size: 18px;
      padding-bottom: 35px;
    }
    .footContent .footLeft div div{
      padding-bottom: 5px;
    }
    .footContent .footLeft div div.address{
      padding-bottom: 0;

    }
    .footLeft .address {
      width: 100%;
    }
    .footLeft .divLeft{
      width: 50%;
    }
    .footLeft .rightBox{
      width: 100%;
    }
    .footLeft .divRight{
      width: 100%;
    }
    .footRight{
      width: 100%;
    }
    .qrCode{
      font-size: 0;
      margin-top: 20px;
      width: 100%;
    }
    .qrCode .inlineB{
      margin-left: 20px;
      margin-top: 10px;
    }

    .qrCodeWrap{
      width: 100%;
      margin: 0 auto;
    }
    .qrCode div {
      font-size: 14px;
      text-align: center;
    }
    .shareLink{
      width: 100%;
      padding-top: 32px;
      margin: 0 auto;
      padding-right: 0;
      padding-left: 10px;
      text-align: center;
    }
    .shareLink img{
      padding: 0 15px;
    }
    .shareLink img:first-child{
      padding-left: 28px;
    }
    .footerP{
      height: 74px;
      line-height: 20px;
      color: #FFF;
      background: #45454C;
      padding-top: 5%;
    }
    .footerDiv{
      width: 100%;
      margin: 0 auto;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .footerDiv span{
      width:100%;
      font-size: 12px;
    }
    .footTextR,.footTextL,.footTextC{
      padding: 0px;
      display: block;
      border:none;
    }
    #TradeCertification{
     display: none;
    }
  }

</style>
