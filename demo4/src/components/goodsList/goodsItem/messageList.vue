<template>
	<div class="messageGoodsBox">
		<header class="font16">
    		<i class="back" @click="back"></i>
    		<p class="title">留言</p>
    		<p class="other"></p>
    	</header>
    	<div class="goods-info">
    		<div class="goods-img" :style="{backgroundImage:'url('+dataInfo.imgMainUrlNarrow+')'}"></div>
    		<div class="goods">
    			<div class="right-top">
    				<div class="right-left">
    					<p>{{dataInfo.title}}</p>
    					<p class="roseRedText font16">￥{{dataInfo.salePrice}}</p>
    				</div>
    				<div class="right-right"><span class="yellowBGBtn">马上买</span></div>
    			</div>
    			<div class="right-bottom blueText">
    				{{dataInfo.addressCity}}<span></span>{{dataInfo.addressArea}}
    			</div>
    		</div>
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
		</div>
	</div>
</template>

<script>
	import {fetch} from 'assets/js/merge.js'
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
export default{
    data(){
    	return{
    		goodsId:'',//商品编号
    		dataInfo:'',//商品信息
    		messagelist:[],//留言信息
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
    created(){
    	this.goodsId = this.$route.params.id;
    	this.loadGoodsInfo();
    	this.loadMessage();
    },
    methods:{
    	//获取留言信息
		loadMessage:function(){
			Indicator.open();
			fetch("wamessage/getIGoodsMessageList",{
				from:'WX',
				igoodsId:this.goodsId,
				pageSize:5,
			}).then((res)=>{
				Indicator.close();
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
			this.hasauto = "false";
			this.showaddmessage = false;
			if(userid!=0){
				if(!this.content){
					return false;
				}
				fetch("wamessage/addIGoodsMessage",{
					from:'WX',
					content:this.content,
					igoodsId:this.goodsId,
				}).then((res)=>{
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
			this.replyhasauto = "false";
			this.showreplymessage = false;
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
				}else{
					Toast({
					  message: res.resmsg,
					  position: 'bottom',
					  duration: 2000
					});
				}
			})
		},
		//返回
		back:function(){
			this.$router.back();
		},
    },
    filters:{
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
		}
    }
}
</script>

<style scoped type="text/css" lang="scss">
.messageGoodsBox{
	header{
		border-bottom: 1px solid #EEE;
	}
	margin-top: 45px;
	.goods-info{
		width: 100%;
		display: flex;
		padding:20px;
		font-family:PingFangSC-Regular;
		border-bottom:20px solid #F5F6F6;
		.goods-img{
			height: 80px;
			flex-grow: 0px;
			width: 120px;
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
		}
		.goods{
			width:100%;
			flex-grow: 1;
			padding-left: 10px;
		}
		.right-top{
			display: flex;
			border-bottom: 1px solid #eee;
		}
		.right-left{
			flex-grow: 1px;
			width: 100%;
			p:first-child{
				max-height: 40px;
				overflow: hidden;
				padding-bottom: 5px;
			}
			p{
				padding-right: 10px;
			}
			p:last-child{
				padding-bottom: 7px;
			}			
		}
		.right-right{
			flex-grow: 0px;
			width: 80px;
			text-align: center;
			span{
				display: inline-block;
				width: 100%;
				padding: 5px 0px;
			}
		}
		.right-bottom{
			padding-top: 5px;
			span{
				margin: 0px 10px;
				border-left: 1px solid #4DA8F5;
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
}

</style>