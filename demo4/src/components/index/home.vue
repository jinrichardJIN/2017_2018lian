<template>
	<div>
		<header class="">
			<router-link :to="{name: 'navSearch'}" tag="div" class="width90 header">
				<span class="MLRA width100 positionR searchWrap block">        
          <i  width="21" class="searchIcon"></i>
          <span class="inlineB dic greyText">斐讯K3路由器</span>
				</span>
			</router-link>
		</header>
		<nav class="MT45">
			<!-- 轮播 -->
			<mt-swipe :auto="4000" style="height:186px">
				<mt-swipe-item v-for="item1 in bannerList" key="item.id">
					<img :src="item1.bannerImgUrl" width="100%" height="186">
				</mt-swipe-item>
			</mt-swipe>
			<!-- 链接 -->
			<div class="navLink clearfix" >
				<span @click="!item.name&&_goShop()" v-for="item in navList " key="item">
					<router-link :to="{name: item.name}" tag="div"  class="width20 fl PT25 PB25"   >
						<img :src="item.img" width="30" height="30" class="block MLRA MB10">
						<span class="textC block">{{item.text}}</span>
					</router-link>
				</span>
				
			</div>
		</nav>
		<div class="blank"></div>
		<!-- 限时抢购 -->
		<div class="sale PT15 " >
			<div class=" MLRA">
				<div class="saleTitle  PB15  borderBG">
					<div class=" clearfix width90 MLRA ">
						<div class="fl">
							<i class="yellowIcon inlineB "></i>
							<span class="font16">限时抢购</span>
							<span class="countTime  redText ML10" id="countTime">{{content}}</span>
						</div>
							<span class="countTime  redText fr" id="countTime">查看更多></span>
					</div>
				</div>
				<div class="saleDetail  clearfix">
					<div class="borderRG width30 inlineB PB15" v-for="item in actGoodsList" @click="_goCommodityDetail(item.goodsId)">
						<img :src="item.goodsItemImgUrlsOriginal|capitalize" width="80" height="80" class="MLRA block PT10">
						<span class="block textC MT10 title MLRA" style="width:80px;">{{item.goodsName}}</span>
						<span class="block textC yellow " >￥{{item.actPrice}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="blank"></div>
		<div class=" PT15 ">
			<div class=" MLRA">
				<div class="  PB15  borderBG">
					<div class=" clearfix width90 MLRA ">
						<div class="fl">
							<i class="yellowIcon inlineB "></i>
							<span class="font16">闲汇精选</span>
						</div>
					</div>
				</div>
				<div class=" PTB15">
					<div class=" ML5P MR5P clearfix">						
						<div v-for="(item,index) in goodsCategoryList " class="inlineB width48  MB10  positionR fl" :class="{fr:(index%2)!=0}">
							<span class="width100 inlineB positionA " style="height:96px;background: rgba(0,0,0,0.3)"></span>
							<img width="100%"  height="96" class="" :src="item.categoryImgUrlSelect" >
							<h3 class="whiteText MLRA textC  font14 centerX width90 title2" style="top:30px;">{{item.name}}</h3>
							<p class="whiteText width90 font12 textC  centerX" style="top:50px">详情</p>
						</div>
						
					</div>
				</div>
			</div>
		</div>
		<div class="blank"></div>
		<div class="tab borderBG">
			<div class="tabC clearfix  ">
				<div class="tabL width50 fl textC font16 PT20 PB20  positionR" :class="{'yellowBar':isY}" @click="_getIGoodsList()">精选</div>
				<div class="tabR width50 fr textC font16 PT20 PB20 positionR" :class="{'yellowBar':!isY}" @click="_getIGoodsList(cityInfo)">附近</div>
			</div>
			<div class="tabView">
				<ul class="goodsList PLR5P clearfix textL">
					<li class="listItem fl  width48P " :class="{fr:(index%2)!=0}" v-for="(item, index) in goodsList" @click="selectItem(item.id)">
						<img :src="item.imgMainUrlNarrow" width="100%" height="162" />
						<p class="font12 blackText MT8 clearfix">
							<em class="fl title">{{item.title}}</em>
							<img src="~assets/img/unCollect.png" width="13" class="fr MR5" @click.stop="_collection(item.id,item.userConcern,$event)">
						</p>
						<p class="price roseRedText font14">
							<em>&yen;</em>
							<em>{{item.salePrice}}</em>
						</p>
						<div class="listLine"></div>
						<p class="address blueText PB15 font12 MT6">
							<em class="city">{{item.addressCity}}</em>
							<em>|</em>
							<em>{{item.addressArea}}</em>
						</p>
					</li>
					
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
  	import {Toast,Indicator } from 'mint-ui';
	import { getCityInfo,getUserLoginStatus} from 'assets/js/merge';	
	import  { getBannerList, getActGoodsList, getGoodsCategoryList,getIGoodsList } from 'api/index';
	  import {setCollection} from 'api/goodsItem';//引入接口函数
	export default {
		created() {
				this._getBannerList(),
				this._getActGoodsList(),
				this._getGoodsCategoryList(),
				this._getCityInfo(),
				this._getIGoodsList(),
				this.countdowm(this.endTime),
				this._setPhoneType()
		},
		data() {
			return {
				isiOS:'',//判断ios
				localCollectStat:{},//关注
				collectPic: {unCollect: require("assets/img/unCollect.png"), collect: require("assets/img/collect.png")},//关注
				cityInfo:null,//地址
				endTime: '2017,8,10',//结束时间
				content: "",//倒计时结束文字
				isY: false, //tab颜色控制
				bannerList: [], //banner图
				goodsCategoryList: [], //精选
				goodsList: [],//附近
				actGoodsList:[],//秒杀
				navList: [{ //链接
						img: require('assets/img/index/icon1.png'),
						text: "智慧商城",
						name:""
					},
					{
						img: require('assets/img/index/icon2.png'),
						text: "二手市场",
						name:"navSearch"
					},
					{
						img: require('assets/img/index/icon3.png'),
						text: "闲汇精选",
						name:"navSearch"
					},
					{
						img: require('assets/img/index/icon4.png'),
						text: "同城交易",
						name:"navSearch"
					},
					{
						img: require('assets/img/index/icon5.png'),
						text: "闲置回收",
						name:"navSearch"
					}
				]

			}
		},
		components: {

		},
		filters: {
    	capitalize: function (value) {//秒杀图片过滤
		      if (!value) return '';
		      var num=value.indexOf(";");
		      var goodsItemImgUrlsOriginal=value.substring(0,num);
		      return goodsItemImgUrlsOriginal
		    }
		  },
		methods: {
			_goShop(){//跳转智仟汇首页
				if(this.isiOS){
					goShop();
				}
				else{
					window.AndroidNative.goShop();	
				}
			},
			_goCommodityDetail(goodId){//跳转智仟汇秒杀详情
				if(this.isiOS){
					goCommodityDetail(goodId)
				}
				else{
					window.AndroidNative.goCommodityDetail(goodId)	
				}
			},
			_getBannerList() {//banner回调
				Indicator.open('加载中...');
				getBannerList().then((res) => {
					if(res.rescode == '00000') {
						Indicator.close();
						this.bannerList = res.list
					}
				})
			},
			_getActGoodsList() {//秒杀回调
				getActGoodsList().then((res) => {
					res=JSON.parse(res)				
					if(res.rescode == '00000') {
						this.endTime=res.endTime;
						this.actGoodsList=res.goodsList;
					}
				})
			},
			_getGoodsCategoryList() {//品类回调
				getGoodsCategoryList().then((res) => {
					if(res.rescode == '00000') {
						this.goodsCategoryList = res.list.slice(0, 4)
					}
				})
			},
			_getIGoodsList(num) {//闲置商品回调
				this.isY = !(this.isY);
				getIGoodsList(num).then((res) => {
					if(res.rescode == '00000') {
						this.goodsList = res.list.slice(0, 4)
					}
				})
			},
			_getCityInfo(){//获取城市信息
				this.cityInfo=getCityInfo();
			},
			countdowm(timestamp) { //倒计时
				let self = this;
				let timer = setInterval(function() {
					let nowTime = new Date();
					let t = 1503108081000 - nowTime.getTime();
					if(t > 0) {
						let hour = Math.floor(t / 1000 / 60 / 60);
						let min = Math.floor(t / 1000 / 60 % 60);
						let sec = Math.floor(t / 1000 % 60);
						hour = hour < 10 ? "0" + hour : hour;
						min = min < 10 ? "0" + min : min;
						sec = sec < 10 ? "0" + sec : sec;
						let format = '';
						format = `${hour}：${min}：${sec}`;
						self.content = format;
					} else {
						clearInterval(timer);
						self.content = '结束';
					}
				}, 1000);
			},
			selectItem(item){//跳转详情
				this.$router.push({ 
					name: 'physicalGoodsDetails', 
					query: { Id: item   }
				})
			},
		 _toast(msg){
        Toast({
          message:msg,
          position: 'bottom',
          duration: 2000
        })
      },
       //添加取消收藏  参数  商品ID  用户关注状态0未关注  event
      _collection(id, state, e){
      	console.log(id)
        //登录拦截
        var oLoginStatus=getUserLoginStatus(this);
        if(!oLoginStatus){
          return;
        }
        state++;//跟关注商品的接口保持一致
        if(this.localCollectStat.id){
          this.localCollectStat.id=this.localCollectStat.id;
        }else if(this.localCollectStat.id===false){
          this.localCollectStat.id=this.localCollectStat.id;
        }else{
          this.localCollectStat.id=state;
        }
        let sentOpt = {};
        var oEle = $(e.target);
        //改变图片地址
        if(this.localCollectStat.id===false){
          oEle.attr("src", this.collectPic.collect);
          sentOpt.operation = 1;
        }else if(this.localCollectStat.id===true){
          oEle.attr("src", this.collectPic.unCollect);
          sentOpt.operation = 2;
        }else {
          if(state===1){
            oEle.attr("src", this.collectPic.collect);
            sentOpt.operation = 1;
          }else{
            oEle.attr("src", this.collectPic.unCollect);
            sentOpt.operation = 2;
          }
        }
        sentOpt.goodsId = id;
        sentOpt.dataType="IGOODS";
        setCollection(sentOpt).then((res) => {
          if (res.rescode == '00000') {
            //本地存储用户的操作状态
              if(sentOpt.operation===1){
                this.localCollectStat.id=true;
              }else{
                this.localCollectStat.id=false;
              }
            this._toast(res.resmsg);
          } else {
            if(sentOpt.operation===1){
              this.localCollectStat.id=true;
            }else{
              this.localCollectStat.id=false;
            }
            this._toast(res.resmsg);
          }
        }, (err) => {
          this._toast(err.resmsg);
        })
      },
      _setPhoneType(){
	  	var u = navigator.userAgent, app = navigator.appVersion;
	    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	    console.log(this.isiOS)
      }
		}
	}
</script>

<style>
*::-webkit-scrollbar{width:0px; height:0px;}
	body {
		color: #333;
		overflow-x:hidden; 
		margin-bottom: 50px;
	}
	
	.yellow {
		color: #FECE38;
	}
	
	.yellowBar:after {
		content: '';
		height: 0;
		display: block;
		width: 50%;
		border-bottom: 4px solid #FECE38;
		left: 25%;
		bottom: 0;
		position: absolute;
	}
	
	.header {
		background: #F4F4F4;
		height: 30px;
		border-radius: 30px;
		margin: 8px auto;
	}
	
	.searchWrap {
		text-align: center;
	}
	
	.searchIcon {
		background: url('./search.jpg') no-repeat;
		background-size: cover;
		width: 21px;
		height: 21px;
		display: inline-block;
		top: 4px;
		position: relative;
	}
	
	.dic {
		height: 30px;
		line-height: 30px;
	}
	
	.blank {
		width: 100%;
		height: 15px;
		background: #F5F6F6;
	}
	
	.yellowIcon {
		background: #FECE38;
		border-radius: 3px;
		height: 16px;
		width: 4px;
		position: relative;
		top: 2px;
		margin-right: 5px;
	}
	
	.goodsList {
		padding-top: 10px;
	}
	
	.price {
		margin: 2px 0 3px;
	}
	
	.MR3P {
		margin-right: 3%;
	}
	
	.width48P {
		width: 48%;
	}
	
	.PB15 {
		padding-bottom: 15px;
	}
	
	.MT8 {
		margin-top: 8px;
	}
	
	.listLine {
		width: 100%;
		background: #f7f7f7;
		height: 1px;
	}
	
	.MT6 {
		margin-top: 6px;
	}
	
	.saleDetail {
		overflow-y: hidden;
		overflow-x: auto;
		white-space: nowrap;
	}
	.title {
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    width: 10em;
	    overflow: hidden;
	}
</style>