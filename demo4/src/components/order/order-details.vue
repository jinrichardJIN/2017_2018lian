<template>
	<div>
		<div class="order-box">
		<header class="roder-top">
			<router-link :to="{name: 'orderCenter'}" class="order-back">
				<img src="../../image/leftArrow.png" alt="" />
			</router-link>
			<h1 class="mui-title">订单详情</h1>
			<div>
				&nbsp;
			</div>
		</header>
		<div class="mui-content order-content">
			<div class="mui-col-xs-12 exp-item-content exp-ord-statue">
				<p class=" mui-clearfix">
					<img src="../../image/o_ico1.jpg" alt="" /> 
					<span>订单状态</span>
					<router-link :to="{name: 'orderDetailsChildren',query:{orderId:orderId}}">
						<img src="../../image/rightArrow.png" alt="" />
					</router-link>
				</p>
				<p class="red-color">{{orderInfo.orderStatus | handorderstatue}}</p>
				<!--<p class="red-color">{{orderInfo.createTime}}</p>-->
			</div>
			
			<div class="mui-col-xs-12 exp-item-content exp-address" v-if='orderInfo.recoveryMode=="E" && orderInfo.orderStatus != "E1" && orderInfo.orderStatus != 8 &&  orderInfo.orderStatus != 0'>
				<p style="font-size: .14rem;">
					<span>请将机器寄往以下地址</span>
				</p>
				<p class="light-color">收件人：{{orderInfo.sendContactsName}}&nbsp;&nbsp;{{orderInfo.sendContactsMobile}}</p>
				<p class="light-color" v-if="orderInfo.orderStatus != 'E404' && orderInfo.orderStatus != 'E403' && orderInfo.orderStatus != 'E5'">
					收件地址：
					{{orderInfo.sendAddressDetail}}
				</p>
				<p class="light-color" v-if="orderInfo.orderStatus == 'E404' || orderInfo.orderStatus == 'E403' || orderInfo.orderStatus == 'E5'">
					收件地址：
					{{orderInfo.returnAddressProvince}}
					{{orderInfo.returnAddressCity}}
					{{orderInfo.returnAddressArea}}
					{{orderInfo.returnAddressDetail}}
				</p>
			</div>
			<!-- 快递信息 -->
			<div class="exp-item-content exp-exp-cycle" v-if='dtype ==2'>
				<p>
					<img src="../../image/o_ico3.png" alt="" /> 快递回收
				</p>
				<p class="mui-clearfix" v-if='showFH' @click="choseExpress">
					{{expressVal}}
				</p>
				<p class="exp-order" v-if='showFH'>
					<input type="text" v-model="expressNO" placeholder="请输入您的订单号" maxlength="20" class="float-left" />
					<button type="button" class="float-right" @click="deliverGoods">发货</button>
				</p>
			</div>
			<!-- 物流信息 -->
			<div class="exp-item-content exp-exp-cycle" v-if='orderInfo.recoveryMode=="E" && showexpress'>
				<p>
					<img src="../../image/o_ico3.png" alt="" /> 快递回收
				</p>
				
				<div class="exp-leftRight">
					<el-row :span="24">
						<el-col :span="24" class="express-name-id">
							<div :span="12">
								物流公司：{{orderInfo.returnExpressCompanyName || orderInfo.userExpressCompanyName}}
							</div>
							<div :span="12">
								物流号：{{orderInfo.returnExpressOrderId || orderInfo.userExpressOrderId}}
							</div>
						</el-col>
					</el-row>
					<ul class="nav-express">
						<li v-if="expressInfo.length==0" style="padding:0 .2rem;">
							暂无物流信息
						</li>
						<li v-for="(express,index) in expressInfo">
							<div class="time">
								<template v-if="index !=0">
									<p>{{express.time}}</p>
									<i class="receive" v-if="express.status == 0"></i>
									<i class="ing" v-if="express.status == 1">派</i>
									<i class="ing" v-if="express.status == 2">运</i>
								</template>
							</div>
							<div class="info" :class="{qian:express.status == 0}">
								<i class="address" v-if="index == 0">收</i>
								{{express.context}}
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div class="store-re exp-item-content" v-if='orderInfo.recoveryMode=="S"'>
				<p>
					<img src="../../image/o_ico3.png" alt="" /> 门店回收
				</p>
				<div class="bottomEEEline"></div>
				<div class="store-time">
					<p>{{orderInfo.warehouseName}}</p>
					<p>{{orderInfo.addressDetail}}</p>
					<p>营业时间：<span>{{orderInfo.shopHours}}</span></p>
				</div>
			</div>

			<div class="onsite-re exp-item-content" v-if='orderInfo.recoveryMode=="D"'>
				<p>
					<img src="../../image/o_ico3.png" alt="" /> 上门回收
				</p>
				<div class="bottomEEEline"></div>
				<div class="store-time">
					<p>姓名：<span>{{orderInfo.contactsName}}</span></p>
					<p>联系方式:<span>{{orderInfo.contactsMobile}}</span></p>
					<p>上门地址:<span>{{orderInfo.doorAddressProvince}}{{orderInfo.doorAddressCity}}{{orderInfo.doorAddressArea}}{{orderInfo.doorAddressDetail}}</span></p>
					<p v-if="orderInfo.doorContactsName">
						工作人员联系方式：<span>{{orderInfo.doorContactsName}},{{orderInfo.doorContactsMobile}}</span>
					</p>
					<p>交易时间：<span>{{orderInfo.doorHopeDate | handdate}}{{orderInfo.doorHopeTimeDesc}}</span></p>
				</div>
			</div>

			<div class="exp-item-content exp-wx-info" v-if='orderInfo.recoveryMode=="E"'>
				<p>
					<img src="../../image/o_ico4.jpg" alt="" /> 支付宝收款
				</p>
				<div class="bottomEEEline"></div>
				<div class="store-time">
					<p>姓名：{{orderInfo.collectName}}</p>
					<p>手机号：{{orderInfo.contactsMobile}}</p>
					<p class="accountNumber">支付宝账号：{{orderInfo.collectAlipayNo}}</p>
				</div>
			</div>
			<div class="Eline"></div>
			<div class="mui-col-xs-12 exp-cycorderInfo">
				<p class="exp-cycorderInfofirst">
					<img src="../../image/o_ico5.jpg" alt="" /> 回收清单
				</p>
				<div class="bottomEEEline"></div>
				<div class="mui-col-xs-12 mui-clearfix recyclingList">
					<div class="mui-col-xs-8 float-left">
						<p>物品名称：{{orderInfo.rgoodsName}}</p>
						<p>询价描述：{{orderInfo.rgoodsInquiryDesc}}</p>
					</div>
					<div class="mui-col-xs-4 float-left">
						<img :src="orderInfo.goodsImgUrlNarrow" alt="" />
					</div>
				</div>
				<el-row :gutter="20" class="syimg-content">
					<template  v-for="p in ysImg">
						<el-col :span="12">
							<div class="rimg-content" :style="{backgroundImage:'url('+p.imageOriginalUrl+')'}"></div>
							<p>{{p.name}}</p>
						</el-col>
					</template>
				</el-row>
			</div>
			<div class="exp-item-content exp-txt" v-if="orderInfo.userDesc">
				{{orderInfo.userDesc}}
			</div>
			<div class="mui-col-xs-12 exp-ord-info">
				<p class="mui-clearfix">订单号：<span class="float-right">{{orderInfo.id}}</span></p>
				<p class="mui-clearfix">创建时间：<span class="float-right">{{orderInfo.createTime}}</span></p>
			</div>
			<div class="Hline">
				
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import TipFunction from '../../js/merge.js';
	import contextPath from '../../js/commonUtils.js';
	import IosSelect from '../../js/iosSelect.js';

	export default {
		data() {
			return {
				queryorderStatus:"",
				orderInfo:'',//订单信息
				dtype:1,//1:详情，2：发货
				expressVal: '请选择快递',//快递名称
				expressId:'',//快递
				showexpress:false,//是否显示物流信息
				expressNO:'',
				orderId:'',//订单编号
				num:'',//获取物流信息，
				com:'',//物流公司编号，
				expressInfo:[],//物流信息
				address:'',//收件地址
				ysImg:[],//预审时上传图片
				
				expressKey: '',
				showWLXX: false,
				showFH: true,
				orderNum: 0,
				//模拟数据
				isTrue:true,
				orderStatus:'',
				expressList: [
					{
						id:'youzhengguonei',
						value:'邮政包裹/平邮'
					},
					{
						id:'ems',
						value:'EMS'
					},
					{
						id:'shunfeng',
						value:'顺丰'
					},
					{
						id:'shentong',
						value:'申通'
					},
					{
						id:'yuantong',
						value:'圆通'
					},
					{
						id:'zhongtong',
						value:'中通'
					},
					{
						id:'huitongkuaidi',
						value:'汇通'
					},
					{
						id:'yunda',
						value:'韵达'
					},
					{
						id:'tiantian',
						value:'天天'
					},
					{
						id:'debangwuliu',
						value:'德邦'
					},
					{
						id:'guotongkuaidi',
						value:'国通'
					},
					{
						id:'youshuwuliu',
						value:'优速'
					},
					{
						id:'quanfengkuaidi',
						value:'全峰'
					},
					{
						id:'jd',
						value:'京东'
					},
					{
						id:'suer',
						value:'速尔'
					},
					{
						id:'kuaijiesudi',
						value:'快捷'
					},
					{
						id:'annengwuliu',
						value:'安能'
					},
					{
						id:'suteng',
						value:'广东速腾'
					}
				],//快递集合
			}
		},
		beforeCreate(){
			var that = this;
			if(userid === 0){
				//跳登录
				TipFunction.loadingMessage('您尚未登录，为你跳转到登录页面');
				setTimeout(function(){
					TipFunction.hideLoading();
					that.$router.push({path:'/login'})
				},2000);
			}
		},
		created() {
			//获取商品ID
			this.orderId = this.$route.query.orderId;
			//类型
			this.dtype = this.$route.query.dtype;
			//
			this.queryorderStatus = this.$route.query.orderStatus;

			this.$nextTick(() => {
				this.getOrderInfo();
			})

		},
		methods: {
			//返回上一页
			back(){
				if(this.channel == 'IOS') {
						webViewPop();
				} else if(this.channel == 'ANDROID') {
						window.AndroidNative.webViewPop();
				}else{
					window.history.back();
				}
			},
			//获取订单信息
			getOrderInfo(){
				axios.get(contextPath.contextPath + 'waorder/getOrderDetail', {
						params: {
							from: 'WX',
							orderId: this.orderId
						}
					})
					.then((data) => {
						if(data.data.rescode == '00000'){
							this.orderInfo = data.data;
							this.handelShowExpress();
							var ysimg = this.orderInfo.rgoodsPreImgInfo;
							if(ysimg){
								this.ysImg = JSON.parse(ysimg);
							}
						}
					})
					.catch((response) => {
						TipFunction.loadingMessage(response);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000);
					});
			},
			//发货
			deliverGoods() {
				if(!this.expressId) {
					TipFunction.loadingMessage('请选择快递');
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000)
					return false;
				}
				if(!this.expressNO) {
					TipFunction.loadingMessage('请输入快递单号！');
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000)
					return false;
				} 
//				this.orderInfo.orderStatus = 'E3'
				axios.get(contextPath.contextPath + 'waorder/order/deliverGoods', {
						params: {
							from: 'WX',
							userExpressCompanyCode: this.expressId,
							userExpressOrderId: this.expressNO,
							recoveryOrderId: this.orderId
						}
					})
					.then((res) => {
						if(res.data.rescode == '00000'){
							this.dtype=1;
							this.getOrderInfo();
						}
						TipFunction.loadingMessage(res.data.resmsg);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
					})
					.catch((response) => {
						console.log(response);
					});
			},
			//选择快递
			choseExpress(){
				var that = this;
		        var sanguoSelect = new IosSelect(1, 
		            [that.expressList],
		            {	
		            	container:".order-box",
		                title: '',
		                itemHeight: 35,
		                oneLevelId: that.areaId,
		                relation: [1, 0, 0, 0],
		                callback: function (selectOneObj) {
		                    that.expressVal = selectOneObj.value;
		                   	that.expressId = selectOneObj.id;
		                }
		        });
			},
			//处理是否显示快递信息
			handelShowExpress(){
				var ord_sta = this.orderInfo.orderStatus;
				var recoveryMode = this.orderInfo.recoveryMode;
				if(recoveryMode == 'E'){
					if(ord_sta == "E3" || ord_sta == "E4" || ord_sta == "E401" || ord_sta == "E402" || ord_sta == "E403" || ord_sta == "E6"){
						this.showexpress = true;
						this.num = this.orderInfo.userExpressOrderId;
						this.com = this.orderInfo.userExpressCompanyCode;
						this.getExrepssInfo();
						this.address = this.orderInfo.sendAddressDetail;
					}else if(ord_sta == "E404" || ord_sta == "E5"){
						this.showexpress = true;
						this.num = this.orderInfo.returnExpressOrderId;
						this.com = this.orderInfo.returnExpressCompanyCode;
						this.getExrepssInfo();
						this.address = this.orderInfo.returnAddressProvince+this.orderInfo.returnAddressCity+this.orderInfo.returnAddressArea+this.orderInfo.returnAddressDetail;
					}else if(ord_sta == 7){
						if(this.orderInfo.returnExpressOrderId && this.orderInfo.returnExpressOrderId!=""){
							this.showexpress = true;
							this.num = this.orderInfo.returnExpressOrderId;
							this.com = this.orderInfo.returnExpressCompanyCode;
						}else{
							this.showexpress = true;
							this.num = this.orderInfo.userExpressOrderId;
							this.com = this.orderInfo.userExpressCompanyCode;
						}
						this.getExrepssInfo();
						this.address = this.orderInfo.sendAddressDetail;
					}
				}
			},
			//获取物流信息
			getExrepssInfo(){
				var _this = this;
				axios.get(contextPath.contextPath + 'waorder/order/queryExpressInfo', {
						params: {
							from: 'WX',
							orderId: this.orderId,
							num:  _this.num,//	快递单号	是
							com:  _this.com,//物流公司编号	是
						}
					})
					.then((res) => {
						if(res.data.rescode == '00000'){
							var list = res.data.data;
							var infolist = [];
							
							var first = new Object();
							first.context = "[收件地址]"+_this.address;
							infolist.push(first);
							
							if(list && list.length>0){
								list.forEach(function(d,i){
									var status = "";
									if(d.context.indexOf("已签收")>0 || d.context.indexOf("已妥投")>0){
										status = 0;
									}else if(d.context.indexOf("派件中")>0){
										status = 1;
									}else{
										status = 2;
									}
									list[i].status = status;
								});
								list.unshift(first);
								_this.expressInfo = list;
							}
						}
					})
					.catch((response) => {
						console.log(response);
						TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
					});
			}
		},
		filters:{
			//处理订单状态
			handorderstatue:function(vlaue){
				switch(vlaue){
					case '0':
			    		return "等待预审";
			    		break;
			    	case 'S1':
			    		return "等待到店";
			    		break;
			    	case 'S2':
			    		return "已验收";
			    		break;
			    	case 'D1':
			    		return "等待派件";
			    		break;
			    	case 'D2':
			    		return "等待取件";
			    		break;
			    	case 'D3':
			    		return "已验收";
			    		break;
			    	case 'E1':
			    		return "待商家缴纳预付金";
			    		break;
			    	case 'E2':
			    		return "待用户发货";
			    		break;
			    	case 'E3':
			    		return "待商家收货";
			    		break;
			    	case 'E4':
			    		return "待核货";
			    		break;
			    	case 'E401':
			    		return "待用户确认";
			    		break;
			    	case 'E402':
			    		return "待用户付运费";
			    		break;
			    	case 'E403':
			    		return "待商家退回";
			    		break;
			    	case 'E404':
			    		return "待用户收货";
			    		break;
			    	case 'E5':
			    		return "已退回";
			    		break;
			    	case 'E6':
			    		return "待商家付款";
			    		break;
			    	case '7':
			    		return "已完成";
			    		break;
			    	case '8':
			    		return "已取消";
			    		break;
				}
			},
			//处理时间
			handdate:function(value){
				if(value){
					return value.substring(0,10);
				}
				return;
			}
		}
		
	}
</script>

<style>
	.order-box #oneLevelContain{
		width: 100%;
	}
</style>