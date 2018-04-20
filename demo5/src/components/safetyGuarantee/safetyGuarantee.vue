<template>
  <div class='loanContent outHide' id="safetyGuaran">
    <div class="contentWrap positionR">
      <img class="positionR imgBkg pc_block" src="./safe_bg.png">
      <img class="positionR imgBkg phone_block" src="./bg_phone.png">
      <div class="headerContent textC">
        <h1 class="title">多点小贷</h1>
        <div class="phone_block phoneHeaderText">
          多点小贷秉承合规发展的原则，严格遵守各项法律、法规、政策及各项内控制度，为借贷双方提供专业的居间撮合服务，借贷交易真实合法，项目披露尽职合规，让借款人、投资人安心


        </div>
        <p class="textCen text pc_block">多点小贷秉承合规发展的原则，严格遵守各项法律、法规、政策及各项内控制度，为借贷双方提供专</p>
        <p class="text pc_block">业的居间撮合服务，借贷交易真实合法，项目披露尽职合规，让借款人、投资人安心</p>
      </div>
    </div>
    <div class="advWrap" id="advWrap">
      <div class="advTitle">
        <p class="advText">风险控制</p>
        <p class="advTextEn"></p>
      </div>
      <div class="textC advTempl">
        <ul class="advBody clearfix">
          <li v-for='item in advantageData'>
            <img v-bind:src="item.src">
            <p class="advText1">{{item.title}}</p>
            <p class="advText2">{{item.content}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="information">
      <div class="advTitle">
        <p class="advText">信息安全</p>
        <p class="advTextEn"></p>
      </div>
      <div class="infoContent">
        <ul class="advBody clearfix">
          <li class="list fl" v-for='item in infoSafety'>
            <img v-bind:src="item.src">
            <p class="advText1">{{item.title}}</p>
            <p class="advText2">{{item.content}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        infoSafety: [
          {src: require('./safe_cur5.png'), title: '资深研发人员', content: '核心团队均来自国内外知名金融机构及互联网公司，具备服务数亿客户群、数万亿资产的丰富经验和雄厚技术实力，让您享受银行级别的安全保障'},
          {src: require('./safe_cur6.png'), title: '内部权限控制', content: '平台建立严格的用户信息操作规则，不同员工设置不同权限，防止内部工作过程中泄密客户信息，从流程上确保用户信息不被泄露'},
          {src: require('./safe_cur7.png'), title: '信息安全', content: '敏感信息在数据库中全部加密存储，通过多层防火墙隔离内部网络和外部网络，任何人都无法强行获取任何用户信息，全面保护您的隐私安全'},
          {src: require('./safe_cur8.png'), title: '设备部署', content: '平台设备均运行于数据安全、灾备能力达到Tier3+标准的专业数据中心，配合三层防火墙、入侵防范等多种安全服务的保护措施，提供7*24小时不间断服务'},
        ],
        advantageData: [
          {src: require('./safe_cur1.png'), title: '大数据风控甄别技术', content: '通过新一代智能大数据风控引擎，经由借款人授权从多个数据源调取并验证借款人个人信息，多息维度对借款人的信用风险、欺诈风险以及产品风险进行全面评估。'},
          {src: require('./safe_cur2.png'), title: '小额信贷风险分散', content: '专注于个人消费和小微经营需求的小额信贷交易撮合。借款金额严格控制，融资需求覆盖多个城市，通过小额分散降低违约关联性，控制集中度风险。'},
          {src: require('./safe_cur3.png'), title: '电子签章', content: '平台撮合每笔借款项目均会在线生成具有法律效力的电子协议，明确投资人与借款人之间的借贷关系，约束借款人按时履行还款义务。'},
          {src: require('./safe_cur4.png'), title: '平台防控', content: '根据产品特性和风险特征，建立贷前、贷中、贷后管理机制。通过平台撮合的成交的借款项目一旦预期，平台将介入催收，实现短信、电话、诉讼、外包等合规催收手段。'},
        ]
      }
    },
    methods: {},
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .infoContent {
    background: #fff;
    width: 100%;
    .list {
      height: 345px;
      width: 50%;
      padding: 60px 12% 0;
      box-sizing: border-box;
      transition: all 0.5s;
      img {
        margin: 0 auto 34px;
        display: inherit;
      }
      .advText1 {
        font-size: 22px;
        line-height: 1;
        text-align: center;
        color: #000;
      }
      .advText2 {
        margin-top: 28px;
        font-size: 14px;
        color: #000;
        opacity:0.6;
      }
      &:hover {
        background: #fff;
        box-shadow: 2px 2px 20px #b7b7b7;
        position: relative;
        z-index: 10;
      }
    }
  }

  .loanContent {
    width: 100%;
    text-align: left;
  }

  .pc_block {
    display: block;
  }

  .phone_block {
    display: none;
  }

  .advText {
    font-size: 36px;
    line-height: 36px;
    text-align: center;
    font-weight: 500;
    color: #000;
    padding: 68px 0 20px;
  }

  .advTextEn {
    font-size: 18px;
    line-height: 1;
    color: #a09fa0;
    text-align: center;
    &:after {
      display: block;
      content: '';
      position: relative;
      width: 50px;
      height: 4px;
      background: #3a9cf5;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      bottom: -38px;
    }
  }

  .contentWrap {
    font-size: 0;
    .imgBkg {
      width: 100%;
      height: auto;
    }
    .headerContent {
      width: 100%;
      height: 200px;
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -100px;
      .title {
        font-weight: 500;
        color: #fff;
        font-size: 48px;
        line-height: 1;
        &:after {
          display: block;
          content: '';
          position: relative;
          width: 50px;
          height: 4px;
          background: #3a9cf5;
          left: 50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          bottom: -48px;
        }
      }
      .text {
        font-size: 18px;
        color: #e7e7e7;
      }
      .textCen {
        margin: 100px 0 20px;
      }
    }
  }

  .information {
    background: #f6f6f6;
    padding: 0 20% 120px;
    .advTitle {
      margin-bottom: 100px;
    }
  }

  /*标题列表样式开始*/
  .advTitle {
    font-weight: 500;
  }

  .enTitle {
    padding-top: 10px;
    &:after {
      display: block;
      content: '';
      position: relative;
      width: 80px;
      height: 5px;
      background: #ff053b;
      left: 50%;
      transform: translateX(-50%);
      bottom: -15px !important;
    }
  }

  .advTempl {
    margin-top: 42px;
    background: #FFFFFF;
    .advBody {
      width: 100%;
      margin: 0 auto;
      li {
        float: left;
        width: 25%;
        height: 358px;
        margin-top: 65px;
        box-sizing: border-box;
        font-weight: normal;
        transition: all 0.5s;
        background: #FFFFFF;
        padding: 2px;
        &:last-child {
          margin-right: 0px;
        }
        &:hover {
          background: #fff;
          box-shadow: 2px 2px 20px #b7b7b7;
          position: relative;
          z-index: 10;
        }
        img {
          width: 65px;
          padding-bottom: 40px;
          height: auto;
        }
      }
      .advText1 {
        font-size: 22px;
        color: #000;
        line-height: 1;
        margin-bottom: 28px;
      }
      .advText2 {
        font-size: 14px;
        color: #000;
        opacity:0.6;
        padding: 0 20%;
        text-align: left;
      }
    }
  }

  /*标题列表样式结束*/

  @media only screen and (max-width: 798px) {
    /*头部样式*/
    .contentWrap {
      font-size: 0;
      overflow: hidden;
      .pc_block {
        display: none;
      }
      .phone_block {
        display: block;
      }
      .imgBkg {
        width: 100%;
        height: auto;
        top: 0;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        transform: translateX(-50%);
      }
      .headerContent {
        top: 0;
        margin-top: 88px;
        .title {
          font-size: 24px;
          line-height: 1;
          &:after {
            bottom: -35px;
          }
        }
        .phoneHeaderText {
          font-size: 16px;
          line-height: 22px;
          margin-top: 73px;
          color: #fff;
          opacity:0.8;
          padding: 0 8%;
          text-align: left;
        }
      }
    }

    .financial {
      padding-top: 50px;
    }
    /*标题样式开始*/
    .advText {
      font-weight: 600;
      font-size: 18px;
      line-height: 1;
      padding: 34px 0 10px;
    }
    .advTextEn {
      font-size: 12px;
      line-height: 1;
      &:after {
        bottom: -12px;
        width: 38px;
      }
    }
    .enTitle {
      padding-top: 10px;
      font-size: 14px;
      &:after {
        display: block;
        content: '';
        position: relative;
        width: 60px;
        height: 3px;
        background: #ff053b;
        left: 50%;
        transform: translateX(-50%);
        bottom: -20px;
      }
    }
    .advTempl {
      margin-top: 45px;
      .advBody {
        li {
          float: left;
          width: 50%;
          height: 208px;
          margin-top: 0px;
          box-sizing: border-box;
          &:nth-child(1), &:nth-child(2) {
            border-bottom: 1px solid gainsboro;
          }
          &:nth-child(1) {
            border-right: 1px solid gainsboro;
          }
          &:nth-child(3),&:nth-child(4) {
            height:225px;
            border-right: 1px solid gainsboro;
            padding-top: 30px;
            img{
              padding-top: 0px;
            }
          }
          img {
            width: 30px;
            padding-top: 4px;
            padding-bottom: 15px;
          }
          &:hover{
            box-shadow:none;
          }
        }
        .advText1 {
          font-size: 16px;
          color: #333333;
          line-height: 16px;
          margin-bottom: 16px;
        }
        .advText2 {
          font-size: 12px;
          line-height: 16px;
          color: #000;
          opacity:0.6;
          font-weight: normal;
          padding: 0 8%;
        }
      }
    }
    /*标题样式结束*/
    .information {
      background: #fff;
      padding: 0 0 30px;
      .advTitle {
        margin-bottom: 47px;
      }
      .advText{
        padding-top:64px;
      }
      .infoContent {
        .list {
          width: 50%;
          height: 208px;
          padding: 0;
          &:nth-child(1), &:nth-child(2) {
            border-bottom: 1px solid gainsboro;
          }
          &:nth-child(1) {
            border-right: 1px solid gainsboro;
          }
          &:nth-child(3),&:nth-child(4) {
            border-right: 1px solid gainsboro;
            height:225px;
            padding-top: 30px;
            img{
              padding-top: 0px;
            }
          }
          &:hover{
            box-shadow:none;
          }
          img {
            width: 30px;
            margin: 0px auto;
            padding-top: 4px;
            padding-bottom: 20px;
          }
          .advText1 {
            font-size: 16px;
            color: #333333;
            line-height: 16px;
            margin-bottom: 16px;
          }
          .advText2{
            font-size: 12px;
            line-height: 16px;
            color: #000;
            opacity:0.6;
            font-weight: normal;
            padding: 0 9%;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 320px) {
    .contentWrap{
      .headerContent{
        margin-top: 75px;
        .title{
          &:after{
            bottom:-30px;
          }
        }
        .phoneHeaderText{
          margin-top:60px;
          font-size:14px;
          line-height:20px;
        }
      }
    }
    .advTempl{
      .advBody{
        li{
          img{
            padding-bottom: 15px;
          }
          .advText1{
            font-size:14px;
            line-height:14px;
            margin-bottom: 10px;
          }
          .advText2{
            line-height:14px;
          }
        }
      }
    }
    .information{
      .infoContent{
        .list{
          img{
            padding-bottom:15px;
          }
          .advText1{
            margin-bottom:10px;
            font-size:14px;
            line-height:14px;
          }
          .advText2{
            line-height:14px;
          }
        }
      }
      .advText{
        padding-top:55px;
      }
    }


  }


</style>
