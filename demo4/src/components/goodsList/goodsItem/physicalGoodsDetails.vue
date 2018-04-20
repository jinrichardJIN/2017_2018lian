<template>
	<div class="phyGoodsDelBox">
		<header>
			<i class="back"></i>
			<p class="title">商品详情</p>
			<div class="other">
				<img src="../goodsItem/img/share.png" alt="" />
				<img src="../goodsItem/img/more.png" alt="" v-if="isowergoods" @click="openTip"/>
			</div>
		</header>
		<div class="phySwiperBox">
			<mt-swipe :auto="0" style="height:335px">
			    <mt-swipe-item v-for="(m,index) in imglist" :key="index">
			    	<div :style="{backgroundImage:'url('+m+')'}"></div>
			    </mt-swipe-item>  
		    </mt-swipe>
		</div>
		<div class="detailsBox">
			<p class="goods-info">
				<span class="font16 title">
					{{dataInfo.title}}
					<span class="blueText">{{dataInfo.goodsSale | handGoodsSale}}</span>
				</span>
				<em class="font18 roseRedText">¥{{dataInfo.salePrice}}</em> 
			</p>
			<p class="grayTex font14 goods-info view-num">
				<span>
					{{dataInfo.viewsCount}}次浏览 &nbsp; &nbsp;
					{{dataInfo.startSellingTime | handSellingTime}}发布于&nbsp;
					{{dataInfo.addressCity}}
				</span>
				<s>¥{{dataInfo.originalPrice}}</s>
			</p>
			<p>{{dataInfo.coment}}</p>
		</div>
		<div class="realName">
			<div class="head">
				<img src="~assets/img/defhead.png" />
			</div>
			<div class="base-info">
				<p class="name">{{dataInfo.userName}} <span v-show="dataInfo.realNameConfirm=='Y'">实名认证</span></p>
				<ul class="greyText">
					<li>在卖商品{{dataInfo.sellGoodsNum}}个</li>
					<li>近期回复100%</li>
					<li>速度小于1天</li>
				</ul>
				<i class="arr-right">
					<img src="~assets/img/rightarr.png" alt="" />
				</i>
			</div>
		</div>
		<!--留言-->
		<div class="message-title">
			<span class="fl message-num">留言<li>{{dataInfo.messageCount}}</li></span>
			<span class="fr greyText">{{dataInfo.concernCount}}人收藏</span>
		</div>
		<div class="message-container">
			<ul>
				<li class="message-content" v-for="(msg,index) in messagelist">
					<div class="head-img">
						<img v-if="msg.userImgUrl" :src="msg.userImgUrl" alt="" />
						<img v-else src="~assets/img/defhead.png" alt="" />
					</div>
					<ul class="info-cont">
						<li>{{msg.userName}}</li>
						<li @click="openReplyMessage(index)">{{msg.content}}</li>
						<li class="font14 grayTex time" :class="{greybottom:msg.messageOwnerNumber>0}">
							{{msg.createTime | messageTime}}
						</li>
						<ul class="reply-container">
							<li class="reply-content" v-for="(rep,repindex) in msg.iGoodsMessageOwnerDto">
								<div class="head-img">
									<img src="~assets/img/defhead.png" alt="" />
								</div>
								<ul class="info-cont">
									<li>{{rep.ownerUserName}}<span v-if="msg.igoodsUserId==rep.ownerUserId" class="seller">货主</span></li>
									<li @click="openReplyReply(index,repindex)">{{rep.content}}</li>
									<li class="font14 grayTex">{{rep.createTime | messageTime}}</li>
								</ul>
							</li>
						</ul>
					</ul>
				</li>
			</ul>
			<div class="more-message"><router-link :to="{name:'messageList',params:{id:goodsId}}">查看更多留言</router-link></div>
		</div>
		<!-- 底部 -->
		<div class="bottom" v-if="isowergoods">
			<div class="colection-message">
				<p @click="userConcern(dataInfo.userConcern)">
					<img v-show="dataInfo.userConcern==1" src="~assets/img/collect.png" alt="" />
					<img v-show="dataInfo.userConcern==0" src="~assets/img/unCollect.png" alt="" />
					<span v-show="dataInfo.userConcern==1" class="font14 greyText">取消</span>
					<span v-show="dataInfo.userConcern==0" class="font14 greyText">收藏</span>
				</p>
				<p class="message" @click="openAddMessage">
					<img src="~assets/img/message.png" alt="" />
					<span class="font14 greyText">留言</span>
				</p>
			</div>
			<div class="blueBGBtn whiteText" @click="contactSeller">联系卖家</div>
			<div class="yellowBGBtn blackTex2" @click="buyNow">马上购买</div>
		</div>
		<textarea :autofocus="hasauto" 
			v-show="showaddmessage"  
			@keyup.enter="addMessage" 
			@blur="hideAddMessage" type="text" maxlength="200" placeholder="我来抢个沙发~" v-model="content" class="add-message"></textarea>
		<textarea :autofocus="replyhasauto" 
			v-show="showreplymessage"  
			@keyup.enter="replyMessage" 
			@blur="hideReplyMessage" type="text" maxlength="200" placeholder="我来抢个沙发~" v-model="replyContent" class="add-message"></textarea>
		<!-- conponents 组件 -->
		<v-tipinfo v-show="showtip" :listdata="tipdata" @choseapp="choseTip"></v-tipinfo>
	</div>
</template>

<script>
	import {fetch} from 'assets/js/merge.js'
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import Applicable from 'components/release/releaseItem/applicable.vue';
	export default{
		data(){
			return{
				goodsId:31,//商品编号
				dataInfo:'',//商品信息
				messagelist:[],//留言信息
				imglist:'',//轮播图图片集合
				showtip:false,//是否显示弹出信息
				tipdata:['联系卖家','我想要的','举报商品'],//
				content:'',//留言信息
				hasauto:false,//是否获取焦点
				showaddmessage:false,//是否显示添加留言
				replyContent:'',//留言信息——回复
				replyhasauto:false,//是否获取焦点——回复
				showreplymessage:false,//是否显示添加留言——回复
				replyId:'',//留言id
				targetUserId:'',//所回复的回复用户编号
				targetOwnerId:'',//所回复的回复信息编号，
				reytype:'',//1:回复，2：回复回复
				
			}
		},
		components:{
			'v-tipinfo':Applicable
		},
		created(){
			//获取商品信息
			this.loadGoodsInfo();
			//获取留言信息
			this.loadMessage();
		},
		methods:{
			//获取商品信息
			loadGoodsInfo:function(){
				Indicator.open();
				fetch("webigoods/findIGoodsById",{
					from:'WX',
					igoodsId:this.goodsId
				}).then((res)=>{
					Indicator.close();
					if(res.rescode == '00000'){
						this.dataInfo = res.data;
						//处理商品主图，幅图
						this.handSwiperImage();
					}else{
						Toast({
						  message: res.resmsg,
						  position: 'bottom',
						  duration: 2000
						});
					}
				})
			},
			//获取留言信息
			loadMessage:function(){
				fetch("wamessage/getIGoodsMessageList",{
					from:'WX',
					igoodsId:this.goodsId,
					pageSize:5,
				}).then((res)=>{
					if(res.rescode == '00000'){
						this.messagelist = res.list;
					}else{
						Toast({
							message:res.resmsg,
							position:'bottom',
							duration:2000
						})
					}
				})
			},
			//打开添加留言
			openAddMessage:function(){
				if(userid==1){
					this.hasauto = "autofocus";
					this.showaddmessage = true;
				}else{
					Toast({
						message:'请登录后再操作！',
						position:'bottom',
						duration:2000
					})
				}
			},
			//添加留言
			addMessage:function(){
				this.hideAddMessage();
				if(userid!=0){
					if(!this.content){
						return false;
					}
					fetch("wamessage/addIGoodsMessage",{
						from:'WX',
						content:this.content,
						igoodsId:this.goodsId,
					}).then((res)=>{
						console.log(res);
						if(res.rescode == '00000'){
							this.loadMessage();
						}
						Toast({
							message:res.resmsg,
							position:'buttom',
							duration:2000
						});
						
					})
				}else{
					Toast({
						message:'请登录后再操作！',
						position:'bottom',
						duration:2000
					})
				}
			},
			//打开回复留言index——留言下标
			openReplyMessage:function(index){
				userid = 399074;
				
				this.reytype = 1;
				var guser = this.messagelist[index].igoodsUserId;//卖家编号
				var muser = this.messagelist[index].userId;//留言用户编号
				var name = this.messagelist[index].userName;//留言人名称
				var replyId = this.messagelist[index].id;//留言编号
				if(userid && userid !=muser && guser == userid){//用户已登陆，且回复人不是留言人，且要为商品发布人
					this.replyId = replyId;
					this.replyhasauto = "autofocus";
					this.showreplymessage = true;
					this.replyContent = "回复@"+name+"：";
				}
			},
			//打开回复回复index——留言下标，repindex——回复下标
			openReplyReply:function(index,repindex){
				this.reytype = 2;
				var guser = this.messagelist[index].igoodsUserId;//卖家编号
				var ruser = this.messagelist[index].iGoodsMessageOwnerDto[repindex].ownerUserId;//回复用户编号
				var name = this.messagelist[index].iGoodsMessageOwnerDto[repindex].ownerUserName;//被回复人名称
				var replyId = this.messagelist[index].id;//留言编号
				//用户已登陆，回复回复人不能是回复人
				userid = 1;
				if(userid && userid !=ruser){
					this.replyId = replyId;
					this.replyhasauto = "autofocus";
					this.showreplymessage = true;
					this.replyContent = "回复@"+name+"：";
					this.targetUserId=ruser ;//所回复的回复用户编号
					this.targetOwnerId=this.messagelist[index].iGoodsMessageOwnerDto[repindex].id ;//所回复的回复信息编号，
				}
			},
			//回复留言
			replyMessage:function(){
				this.hideReplyMessage();
				if(userid!=0){
					if(!this.replyContent){
						return false;
					}
					var param = {
						from:'WX',
						content:this.replyContent,
						messageId:this.replyId,//留言的id
					}
					if(this.reytype == 2){
						param.targetUserId = this.targetUserId;
						param.targetOwnerId = this.targetOwnerId;
					}
					fetch("wamessage/addIGoodsMessageOwner",
						param
					).then((res)=>{
						console.log(res);
						if(res.rescode == '00000'){
							this.loadMessage();
						}
						Toast({
							message:res.resmsg,
							position:'buttom',
							duration:2000
						});
					})
				}else{
					Toast({
						message:'请登录后再操作！',
						position:'bottom',
						duration:2000
					})
				}
			},
			//处理商品主图，幅图--主图只有一张，幅图多张用,隔开
			handSwiperImage:function(){
				var arr_img = [];
				var m_img = this.dataInfo.imgMainUrlNarrow;
				arr_img.push(m_img);
				var f_img = this.dataInfo.imgViceUrlNarrow;
				if(f_img){
					var f_img_arr = f_img.split(",");
					if(f_img_arr && f_img_arr.length>0){
						this.imglist = arr_img.concat(f_img_arr);
					}
				}
			},
			//收藏、取消收藏1为关注，0为不关注
			userConcern:function(s){
				if(s == 0){
					s=1;
				}else if(s == 1){
					s=0;
				}
				if(userid==1){
					Indicator.open();
					fetch("waconcern/userConcerns",{
						from: 'WX',
						goodsId: this.goodsId,
						operation: s,
						dataType:'IGOODS'
					}).then(res=>{
						Indicator.close();
						console.log(res);
						if(res.rescode == '00000'){
							this.dataInfo.userConcern=s;
						}
						Toast({
						  message: res.resmsg,
						  position: 'bottom',
						  duration: 2000
						});		
					})
				}else{
					Toast({
					  message: "请登录后再操作！",
					  position: 'bottom',
					  duration: 2000
					});					
				}
			},
			//联系卖家
			contactSeller:function(){
				if(userid==1){
					
				}else{
					Toast({
					  message: "请登录后再操作！",
					  position: 'bottom',
					  duration: 2000
					});	
				}
			},
			//立即购买
			buyNow:function(){
				if(userid==1){
					
				}else{
					Toast({
					  message: "请登录后再操作！",
					  position: 'bottom',
					  duration: 2000
					});	
				}
			},
			//打开弹窗
			openTip:function(){
				this.showtip = true;
			},
			//选择弹窗
			choseTip:function(index){
				if(index==0){//联系卖家
					console.log("联系卖家");
				}else if(index==1){//我想要的
					console.log("我想要的");
				}else if(index==2){//举报商品
					console.log("举报商品");
				}
				this.showtip = false;
			},
			//隐藏留言输入框
			hideAddMessage:function(){
				this.hasauto = "false";
				this.showaddmessage = false;
			},
			//隐藏回复输入框
			hideReplyMessage:function(){
				this.replyhasauto = "false";
				this.showreplymessage = false;
			}
			
		},
		filters:{
			//处理商品类别 //1:支持面交 2:全新商品 3:精品
			handGoodsSale:function(value){
				if(value){
					if(value==1){
						return '面交';
					}else if(value==2){
						return '全新';
					}else if(value==3){
						return '精品';
					}
				}
			},
			//处理发布时间显示
			handSellingTime:function(value){
				if(value){
					var d_n = new Date();
					var d_s = new Date(value);
					if(d_n.getDate()-d_s.getDate()==0){
						return "今天";						
					}else{
						return d_n.getDate()-d_s.getDate()+"天前";
					}
				}
			},
			//处理留言时间
			messageTime:function(value){
				if(value){
					var d_n = new Date();
					var d_s = new Date(value);
					if(d_n.getDate()-d_s.getDate()==0){
						var n_hour =  d_n.getHours();
						var s_hour = d_s.getHours();
						return (n_hour-s_hour)+"小时前"; 
					}else{
						return d_n.getDate()-d_s.getDate()+"天前";
					}
				}
			},
		},
		computed:{
			isowergoods:function(){
				if(this.dataInfo.userId == userid){
					return false;
				}else{
					return true;
				}
			}
		}
	}
	
</script>
<style scoped type="text/css" lang="scss">
	.message-title{
		padding: 30px 20px 45px;
		font-size: 15px;
		.message-num{
			padding-left: 12px;
			position:relative; 
			&:before{
				content: "";
				width: 5px;
				height: 18px;
				border-radius: 2px;
				background-color: #FECE38;
				position: absolute;
				left: 0px;
				top: 1px;
			}
			li{
				padding-left: 15px;
				display: inline-block;
				position:relative; 
				&:before{
					content: "";
					width: 5px;
					height: 5px;
					border-radius: 50%;
					background-color: #333333;
					position: absolute;
					left: 5px;
					top: 6px;
				}
			}
		}
	}
	.message-container{
		font-size: 15px;
		.greybottom{
			border-bottom: 1px solid #EEEEEE ;
		}
		padding: 0px 20px 0px;
		.message-content{
			display: flex;
			padding-top: 20px;
			border-bottom: 1px solid #EEEEEE ;
		}
		.head-img{
			width: 88px;
			flex-flow: 0;
			color: #333333;
			img{
				width: 55px;
				border-radius: 50%;
			}
		}
		.info-cont{
			padding-top: 12px;
			width: 100%;
			flex-flow: 1;
			li{
				padding: 8px 0px;
			}
			li.time{
				padding-bottom: 18px;
			}
			.reply-container{
				>li:not(:last-child){
					border-bottom: 1px solid #EEEEEE;
				}
			}
			.reply-content{
				padding: 25px 0px 15px;
				display: flex;
			}
			.seller{
				font-size: 12px;
				padding: 1px 6px;
				color: #FFF;
				margin-left: 10px;
				font-family: PingFangSC-Regular;
				background-color: #FECE38;
			}
		}
		li{
			word-break: break-all;
			text-align: justify;
		}
		.message-content:last-child{
			border-bottom: 0px;
		}
		.more-message{
			font-size: 16px;
			text-align: center;
			padding: 20px 0px;
		}
	}
</style>
<style scoped type="text/css" lang="scss">
	header{
		.other{
			img{
				height: 22px;
				margin-left: 15px;
			}
		}
	}
	.phyGoodsDelBox{
		padding: 45px 0px 55px;
		.mint-swipe-item>div{
			height: 100%;
			width: 100%;
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
		}
		.bottom{
			position: fixed;
			bottom: 0px;
			left: 0px;
			background-color: #FFF;
			width:100%;
			height: 50px;
			box-shadow: 0 -5px 4px 0 rgba(234,234,234,0.50);
			div{
				font-size: 15px;
				width: 35%;
				float: left;
				height: 100%;
				flex-flow: 0;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.colection-message{
				width: 30%;
				img{
					width: 25px;
				}
				p{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 50%;
					flex-grow: 0;
				}
				p:first-child{
					padding-left: 10%;
				}
				p:last-child{
					padding-right: 10%;
				}
			}
		}
		.add-message{
			width: 100%;
		    position: fixed;
		    bottom: 0px;
		    left: 0px;
		    height: 50px;
		    z-index: 1200;
		    padding: 5px 10px;
		    border: 1px solid #EEE;
		}
	}
	.phySwiperBox{
		padding: 20px;
	}
	.detailsBox{
		border-bottom: 10px solid #F5F6F6;
		padding: 0px 20px 30px;		
		.goods-info{
			display: flex;
			word-break: break-all;
			text-align: justify;
			padding:10px 0px;
			>span{
				flex-grow: 1;
				width: 100%;
			}
			>em,>s{
				flex-flow: 0;
				width: 80px;
				line-height: 26px;
				text-align: right;
			}
			.title{
				font-weight: bolder;
				font-family: '.PingFangSC-Medium';
				line-height: 26px;
				span{
					font-weight: normal;
					border: 2px solid #4DA8F5;
					padding: 4px 6px;
					font-family: '.PingFangSC-Regular';
					font-size: 10px;
					margin-left: 10px;
					border-radius: 6px;
				}
			}
		}
		.goods-info.view-num{
			padding: 0px 0px 25px;
		}
	}
	.realName{
		display: flex;
		padding: 20px;
		border-bottom: 10px solid #F5F6F6;
		
		.head{
			flex-flow: 0;
			width: 90px;
			padding-right:15px;
			img{
				max-width: 100%;
				border-radius: 50%;
			}
		}
		.base-info{
			flex-flow: 1;
			width: 100%;
			padding-right: 20px;
			padding-top: 6px;
			position: relative;
			.name{
				font-size: 16px;
				font-weight: bolder;
				span{
					display: inline-block;
					border: 2px solid #4DA8F5;
					border-radius: 6px;	
					padding: 5px 6px;
					font-family: '.PingFangSC-Regular';
					font-size: 10px;
					color: #4DA8F5;
					letter-spacing: 0;
					font-weight: normal;
				}
			}
			ul{
				display: flex;
				padding-top: 5px;
				justify-content: space-around;
				li{
					text-align: center;
				}
				li:nth-child(2){
					width: 38%;
					border-left: 1px solid #979797;;
					border-right: 1px solid #979797;
				}	
			}
			.arr-right{
				position: absolute;
				right: 0px;
    			top: 22px;
    			img{
    				width: 12px;
    			}
			}
		}
	}
</style>