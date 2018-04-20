<template>
	<div id="security" class="outHide">
		    <div class='bannerWrapper positionR'>
          <img src="~assets/img/securityBkg.jpg" class='bannerPic'>
        </div>
	        <div class="advantageWrappe">
	        	<advantage></advantage>
	        </div>
	        <div class="aboutLB">
	        <div class="advTitle blackTex2  font34">关于联璧</div>
			    <div class="enTitle font20">ABOUT &nbsp LINCOMB</div>
          <div class="aboutLBPic none"><img src="~assets/img/aboutLB.png" width="100%"></div>
			    <div class="aboutLBText">
			    	<p class="font24 blackTex2 PB15 title">糯糯金服</p>
			    	<p class="aboutLBDetail">糯糯金服，隶属于上海赟致金融信息服务有限公司。上海赟致金融信息服务有限公司，孵化于2014年成立的上海联璧电子科技有限公司。在上海联璧电子科技有限公司旗下金融事业部互联网财富品牌：“联币金融”、“联币钱包”创立仅一年（2015-2016年）即获得逾200万线上投资用户，并成功将集团附带跨境电商、供应链贸易、消费 O2O 以及数据科技、开放 API 智能硬件结合一体的互联网场景运营业务推向市场得到认可后，作为联璧场景内小微金融服务主体的“糯糯金服”于2016年底正式成立，上海赟致金融信息服务有限公司，为糯糯金服的控股公司。 </p>
            <p class="aboutLBDetail">糯糯金服核心团队由来自银行、证券、基金行业以及互联网领域各类精英组成，尤其以金融、财务、法律以及数学、软件研发方面特长为主。糯糯金融以互联网资产受托管理服务为主营方向，坚持服务实体经济，响应供给侧改革的整体调控，契合时代主题，促进民生经济结构调整，将管理、将运营、将风控、将服务细致地落实到每一个工作环节当中，认真发展小金融，致力于一个陪伴在用户身边的暖金融。</p>
			    </div>
	        </div>
	        <div class="safety">
  	        	<div class="advTitle blackTex2  font34">安全保障</div>
  			      <div class="enTitle font20">Safety & guarantee</div>
  			      <div class="safetyBody">
  			    	<ul class="safetyTab">
  			    		<li class="safetyItem" @click='changTab("tab1")' :class='{current:tab=="tab1"}'>
  			    			<span :class='{current:tab=="tab1"}'></span>
  			    			<p class="PT20 font20 blackTex2 safetyText">优质资产</p>
  			    		</li>
  			    		<li class="safetyItem" @click='changTab("tab2")' :class='{current:tab=="tab2"}'>
  			    			<span :class='{current:tab=="tab2"}'></span>
  			    			<p class="PT20 font20 blackTex2 safetyText">优质资产</p>
  			    		</li>
  			    		<li class="safetyItem" @click='changTab("tab3")' :class='{current:tab=="tab3"}'>
  			    			<span :class='{current:tab=="tab3"}'></span>
  			    			<p class="PT20 font20 blackTex2 safetyText">优质资产</p>
  			    		</li>
  			    		<li class="safetyItem" @click='changTab("tab4")' :class='{current:tab=="tab4"}'>
  			    			<span :class='{current:tab=="tab4"}'></span>
  			    			<p class="PT20 font20 blackTex2 safetyText">优质资产</p>
  			    		</li>
  			    	</ul>
  			    	<div class="safetyContent">
  			    	    <transition name='fade'>
  			    	    	<component :is='tab'></component>
  			    	    </transition>
  			    	</div>
              <div class="safetyContent2 none">
                    <security1></security1>
                    <security2></security2>
                    <security3></security3>
                    <security4></security4>
              </div>
  			    </div>
	        </div>
	        <div class='introduce'>
	        	<div class="introduceWrapper">
	        		<ul>
	        			<li>
	        				<div class="fl picWrap"><img src="~assets/img/introduceBkg.jpg" width='100%'></div>
	        				<div class="fl PL40 PR30 width65 textL introduceText">
	        					<h2 class="title font22 blackTex2">平台理念</h2>
                      <p class="introduceDetail textIndent2em">
                      	未来三十年的竞争是供应链与供应链的竞争，是产业链与产业链的竞争，更是一个生态一种文化与另一个生态另一种文化的竞争。时刻把用户放在第一位，坚持专业，坚持利他主义，时刻谦卑砥砺而行，以开放包容为本位，将互联网金融做成实体经济与虚拟经济组装再造的动态道场，持续发展、健康传播货币价值，正量文化积淀，传承受托人精神。
                      </p>
	        				</div>
	        			</li>
	        			<li>
	        				<div class="fl picWrap"><img src="~assets/img/introduceBkg2.jpg" width='100%'></div>
	        				<div class="fl PL40 PR30 width65 textL introduceText">
	        					<h2 class="title font22 blackTex2">平台宗旨</h2>
                        <p class="introduceDetail">
                        自省自律、明确平台性质、绝不触碰监管红线；<br>
                        合法合规、资本金充足、管理机制完善、治理架构合理；<br>
                        风控体系严谨实际、交易对手优质稳健、资产保障多重多样；<br>
                        资金存管、账户托管、交易安全、实时监控；
                        </p>
	        				</div>
	        			</li>
	        			<li>
	        				<div class="fl picWrap"><img src="~assets/img/introduceBkg3.jpg" width='100%'></div>
	        				<div class="fl PL40 PR30 width65 textL introduceText">
	        					<h2 class="title font22 blackTex2">战略合作</h2>
                        <p class="introduceDetail textIndent2em">
                        	糯糯金服各版块业务与其战略合作方-上海某国企数据通信技术有限公司旗下生产制造、基础建设投资、国际贸易，以及上海联璧电子科技有限公司旗下供应链、电子商务、智慧行业、传统零售等经营业务为相互促进补充，同时又与跨境电商、智能硬件，供应链服务相互融合，互赢共进，已初步形成集商品流、物流、信息流、资金流四流为一体的小实体经济生态圈。
                        </p>
	        				</div>
	        			</li>
	        		</ul>
	        	</div>
	        </div>
	</div>
</template>

<script>
import Advantage from '../advantage/advantage'
import Tab1 from './tab1'
import Tab2 from './tab2'
import Tab3 from './tab3'
import Tab4 from './tab4'
   export default{
       data(){
           return{
             tab:'tab1'
           }
       },
     methods:{
       changTab(value){
       	this.tab=value
       }
     },
     components:{
     	Advantage,
      Tab1,Tab2,Tab3,Tab4,
     	'security1':Tab1,
      'security2':Tab2,
      'security3':Tab3,
      'security4':Tab4
     }
   }
</script>

<style lang="scss" rel="stylesheet/scss">
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
   	.bannerWrapper{
      font-size: 0;
      .bannerPic{
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .advantageWrappe{
    	background:#f2f2f2;
    	padding:45px 0;
      .advBody{
        li{
          background:#fff;
        }
      }
    }
    .aboutLB,.safety{
       padding:75px 0;
    	 .aboutLBDetail{
    	 	width:1080px;
    	 	margin: 20px auto 0;
    	 	line-height: 2em;
    	 	text-align: left;
    	 	color:#666666;
    	 	font-size: 16px;
    	 	font-weight: 200;
    	 	text-indent: 2em;
    	 }
    }
    .aboutLBText{
      padding:50px 0;
    }
    .safety{
    	background:#f2f2f2;
    	.safetyBody{
    		width:1200px;
    		margin:0 auto;
        padding-top: 90px;
          .safetyTab{
          	overflow:hidden;
          	padding-bottom:20px;
            .safetyItem{
            	float:left;
            	margin:0 90px;
            	cursor: pointer;
               &:nth-child(1){
                  span{
                    background:url('~assets/img/safetyBkgs.png') -100px;
                      &.current{
                      background:url('~assets/img/safetyBkgs.png') 0px;
                    }
                  }
               }
               &:nth-child(2){
                  span{
                    background:url('~assets/img/safetyBkgs.png') -300px;
                    &.current{
                      background:url('~assets/img/safetyBkgs.png') -200px;
                    }
                  }
               }
               &:nth-child(3){
                  span{
                    background:url('~assets/img/safetyBkgs.png') -500px;
                    &.current{
                      background:url('~assets/img/safetyBkgs.png') -400px;
                    }
                  }
               }
               &:nth-child(4){
                  span{
                    background:url('~assets/img/safetyBkgs.png') -700px;
                    &.current{
                      background:url('~assets/img/safetyBkgs.png') -600px;
                    }
                  }
               }
            	span{
            		border-radius: 50%;
            		display:inline-block;
            		width:100px;
            		height:100px;
                background-size: 100px 800px;
            	}
                &.current:after{
            		display:block;
		          	content:'';
		        	  position:relative;
		        	  width:50px;
		        	  height:4px;
		            left:50%;
		            transform:translateX(-50%);
		            bottom:-20px;
               }
            }
          }
          .safetyContent{
          	width:100%;
          	padding-top: 50px;
          	overflow:hidden;
          	height:294px;
          	.fade-enter-active, .fade-leave-active {
    			    transition: all .2s linear;
    			    opacity: 0;
			      }
    			  .fade-enter, .fade-leave-active {
    			    opacity: 0;
    			  }
          }
    	}
    }
    .introduce{
    	padding:70px 0 40px;
    	overflow:hidden;
      .introduceWrapper{
    	width:1200px;
    	margin:0 auto;
      .picWrap{
        width:24%;
      }
    	li{
    	  overflow:hidden;
    	  padding-bottom: 50px;
    	  .title{
    		  border-left:4px solid red;
    	  	padding-left: 8px;
    	   }
    	  .introduceDetail{
      		line-height:2em;
      		font-size: 16px;
      		font-weight: normal;
      	 	padding-top: 35px;
        }
    	}

      }
    }
@media only screen and (max-width: 798px){
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
  #security{
    .bannerWrapper{
    height:58px;
    background-color: #323232;
     .bannerPic{
      display:none;
     }
   }
}
  .advantageWrappe{
    .advBody{
      li{
        box-shadow: 2px 2px 5px #999;
      }
    }
  }
  .aboutLB,.safety,.introduce,.safetyContent2 {
    padding:0px 0;
    background-color: #f2f2f2;
    .title{
      font-size: 18px;
      text-align: left;
      border-left: 4px solid #f40;
      padding: 0px 0px 0px 10px;
      margin-bottom:10px;
      font-weight: 500;
      text-indent: 0;
    }
  }
  .aboutLB{
    padding-bottom:30px;
    .aboutLBPic{
        display:block;
        margin: 50px auto 0;
        width:90%;
        font-size: 0;
        border-radius:20px;
        box-shadow: 2px 2px 5px #999;
       }
    .aboutLBText{
       padding:10px 5%;
       .aboutLBDetail{
          width:auto;
          margin: 0px auto 0;
          line-height: 1.5em;
          text-align: left;
          color:#666666;
          font-size: 14px;
          font-weight: 200;
          text-indent: 2em;
       }
    }

  }
  .safety{
      background:#f2f2f2;
      .safetyBody{
        width:auto;
        margin:0 auto;
        padding-top:0px;
          .safetyTab{
            display:none;
          }
          .safetyContent{
            display:none;
          }
          .safetyContent2{
            display:block;
            width:100%;
            padding-top: 50px;
            overflow:hidden;
            height:auto;
          }
      }
    }
  .introduce{
      background-color: #f2f2f2;
      padding:20px 0 0;
      .introduceWrapper{
      width:100%;
      li{
          overflow:hidden;
          padding-bottom: 50px;
          .picWrap{
            width:90%;
            float:none;
            margin:0 auto;
            border-radius: 30px;
            overflow:hidden;
            font-size: 0;
            box-shadow: 2px 2px 5px #999;
          }
          .introduceText{
            float:none;
            padding:0px;
            width:90%;
            margin: 20px auto 0;
              .title{
                border-left:4px solid red;
                padding-left: 8px;
               }
              .introduceDetail{
                line-height:1.5em;
                font-size: 14px;
                font-weight: 200;
                padding-top: 0px;
              }
           }
     }
    }
  }
}

</style>
