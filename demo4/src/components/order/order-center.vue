<template>
	<div>
		<div class="orderCbox">
		<header class="roder-top">
			<router-link :to="{name: 'index.mine'}">
				<img src="../../image/leftArrow.png" alt="" />
			</router-link>
			<h1 class="mui-title">订单中心</h1>
		</header>
		<div class="huitiao"></div>
		<div class="order-content">
			
			<div class="boxNull" v-if="list.length<1 && nodata">
				<div class="concernBoxNull">
					<img src="../../image/goodsNull.png" alt="" />
				</div>
			</div>
			
			<div class="mui-col-xs-12 goods-nav" v-for='(item,index) in list' :data-id="item.orderStatus" :key="item.orderStatus">
				<div class="shijian">
					<p class="ordersj">{{item.createTime}}</p>
					<span class="float-right">{{item.orderStatus | handorderstatue}}</span>
				</div>
				<div class="goods-list mui-col-xs-12 mui-clearfix">
					<div class="mui-col-xs-8 float-left mui-clearfixzuo">
						<p>{{item.rgoodsName}}</p>
						<p>{{item.recoveryMode | handrecmethod}}</p>
						<p class="rgoodsNum" style="margin-left: .3rem;font-weight: 500;">X{{item.rgoodsNum}}</p>
						<div class="float-hegu">
							<span class="assess gujiaCircle" :class="{hCircle: item.rgoodsCheckPrice<0}" v-if="item.rgoodsInquiryPrice">估</span>
							<p class="price-bl" id="price-h" :class="{priceH: item.rgoodsCheckPrice<0}"  v-if="item.rgoodsInquiryPrice">￥<span>{{item.rgoodsInquiryPrice}}</span></p>
							<span class="nucleus yCircle" v-if="item.rgoodsCheckPrice >0">核</span>
							<p class="price-bl" v-if="item.rgoodsCheckPrice >0">￥<span>{{item.rgoodsCheckPrice}}</span></p>
						</div>
						
					</div>
					<div class="mui-col-xs-4 order-right-img">
						<img :src='item.goodsImgUrlNarrow'>
					</div>
				</div>
				<div class="mui-col-xs-12">
					<div class="mui-col-xs-8 orderCenterA">
						<router-link :to="{name: 'orderDetails',query:{orderId:item.id,orderStatus:queryorderStatus,dtype:1}}" class='orderDetail'>订单详情</router-link>
						<a class='cancelOrder' v-if='item.orderStatus=="0"||item.orderStatus=="S1"||item.orderStatus=="D1"||item.orderStatus=="E1"||item.orderStatus=="E2"'>
							<template>
							  <el-button type="text" @click="cancelOrder(item.id,index)" class="elColor">取消订单</el-button>
							</template>
						</a>
						<router-link :to="{name: 'orderDetails',query:{orderId:item.id,orderStatus:queryorderStatus,dtype:2}}" class='sendGood' v-if='item.orderStatus=="E2"'>发货</router-link>
						<a class='surePrice' v-if='item.orderStatus=="E401"'>
							<template>
							  <el-button type="text" @click="sureprice(item.id,index)" class="elColor">确认报价</el-button>
							</template>
						</a>
						<router-link :to="{name: 'reQuo',query:{orderId:item.id,rgoodsId:item.rgoodsId}}" class='rejectPrice' v-if='item.orderStatus=="E401"'>
							拒绝报价
						</router-link>
						<router-link :to="{name: 'reQuoNow',query:{orderId:item.id}}" class='rejectPrice' v-if='item.orderStatus=="E402"'>
							立即付款
						</router-link>
						<a class='surePrice' v-if='item.orderStatus=="E404"'>
							<template>
							  <el-button type="text" @click="surereceive(item.id,index)" class="elColor">确认收货</el-button>
							</template>
						</a>
						<router-link :to="{name: 'assessment',query:{orderId:item.id}}" class='revalteDetail' v-if='item.orderStatus=="S2"||item.orderStatus=="7"||item.orderStatus=="D3"||item.orderStatus=="E401"||item.orderStatus=="E402"||item.orderStatus=="E403"||item.orderStatus=="E404"||item.orderStatus=="E5"||item.orderStatus=="E6"'>评估明细</router-link>
						<router-link :to="{name: 'rated',query:{orderId:item.id,rgoodsId:item.rgoodsId}}" class='revalte' v-if='item.orderStatus=="7" && item.evaluateStatus==0'>评价</router-link>
						<router-link :to="{name: 'retedSuccess',query:{orderId:item.id,rgoodsId:item.rgoodsId}}" class='revalte' v-if='item.orderStatus=="7" && item.evaluateStatus==1'>查看评价</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import TipFunction from '../../js/merge.js';
	import contextPath from '../../js/commonUtils.js';
	import dropload from '../../js/dropload.js';

	import axios from 'axios';
	export default {
		data() {
			return {
				current:0,//当前页
				pageSize:10,//每页显示数
				queryorderStatus:'',//订单状态
				//因为接口需要登录权限
				list: [],
				evaluateStatus:'',
				nodata:false,//页面么有数据
				hCircle: false,//颜色
				priceH: false, //颜色
			}
		},
		beforeCreate(){
			var that = this;
			if(userid===0){
				//跳登录
				TipFunction.loadingMessage('您尚未登录，为你跳转到登录页面');
				setTimeout(function(){
					TipFunction.hideLoading();
					that.$router.push({path:'/login'})
				},2000);
			}
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
			//确认收货
			surereceive(orderId,index){
				var _that = this;
				axios.get(contextPath.contextPath + 'waorder/confirmReturnExpress', {
					params: {
						from: 'WX',
						orderId:orderId
					}
				})
				.then(function(res) {
					var oData = res.data;
					if(oData.rescode === "00000"){
						_that.list[index].orderStatus = oData.orderStatus;
						TipFunction.loadingMessage(oData.resmsg);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000);
					}
				})
				.catch(function(response) {
					TipFunction.loadingMessage(response);
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000)
				});
			},
			//获取订单数据
			getOrderList(me,type){
				console.log(type);
				var _this = this;
				var param = {};
				param.from = 'WX';
				if(type=='up'){
					param.current = 1;
				}else if(type=='down'){
					param.current = _this.current+1;					
				}
				param.pageSize = _this.pageSize;
				param.orderStatus = _this.queryorderStatus;
				if(_this.evaluateStatus == 0){
					param.evaluateStatus = _this.evaluateStatus;
				}
				//获取订单列表
				axios.get(contextPath.contextPath + 'waorder/getOrderList', {
						params: param
					})
					.then(function(res) {
						var data = res.data;
						if(data.rescode === '00000') {
							if(data.list && data.list.length>0){
								if(type=='down'){
									_this.current = param.current;
									_this.list = _this.list.concat(data.list);								//加载数据成功处理做大页数
								}
							}else{
								_this.nodata = true;
								if(type=='down'){
									// 锁定
			                        me.lock();
			                        // 无数据
			                        me.noData();
								}
							}
							if(type=='up'){
								//console.log(_this.Goods);
								//console.log("**********************------------");
								//_this.Goods.splice(0,_this.Goods.length);
								_this.list = data.list;
								console.log(_this.list);
								// 即使加载出错，也得重置
		               			 me.resetload();
		                        // 重置页数，重新获取loadDownFn的数据
		                        _this.current = 1;
		                        // 解锁loadDownFn里锁定的情况
		                        me.unlock();
		                        me.noData(false);
							}
						}else{
							TipFunction.loadingMessage(res.data.resmsg);
							setTimeout(function(){
								TipFunction.hideLoading();
							},2000);
						}
						if(type=='down'){
							//任何时候都要重置数据
							setTimeout(function(){
								// 即使加载出错，也得重置
		                    	me.resetload();
							},500);
						}
					})
					.catch(function(response) {
						// 即使加载出错，也得重置
			            me.resetload();
					});
			},
			//初始化分页
			initdropdown(){
				var _this = this;
				var options = {
					scrollArea : window,
					threshold : 50,
					loadUpFn : function(me){
						_this.getOrderList(me,'up');
					},
					loadDownFn : function(me){
						_this.getOrderList(me,'down');
					},
					initLoad:true,
				}
				dropload.dropload("orderCbox",options);
			},
			//取消订单
		    cancelOrder(orderId,index) {
		    	var _that = this;
		        _that.$confirm('您确认取消订单吗', '提示', {
		          confirmButtonText: '确定取消',
		          cancelButtonText: '暂不取消',
		          type: 'warning'
		        }).then(() => {
		        	var outPar = {
						from: 'WX',
						orderId: orderId
					}
		        	axios.get(contextPath.contextPath + 'waorder/cancelOrder', {
						params: outPar
					})
					.then(function(data){
						var oData = data.data;
						if(oData.rescode === "00000") {
							_that.list[index].orderStatus=oData.orderStatus;
						}
						_that.$message({
				          type: 'info',
				          message: oData.resmsg,
				        });
					})
					.catch(function(response) {
						TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
					});
		        }).catch(() => {
//		          _that.$message({
//		            type: 'info',
//		            message: '已取消'
//		          });          
		        });
		    },
			//确认报价
			sureprice(orderId,index){
				var _that = this;
		        _that.$confirm('确定使用该报价交易？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	var outPar1 = {
						from: 'WX',
						orderId: orderId,
						approvePrice: 'Y'
					}
		        	axios.get(contextPath.contextPath + 'waorder/getConfirmGoodsPrice', {
						params: outPar1
					})
					.then(function(res) {
						var oData = res.data;
						if(oData.rescode === "00000"){
							_that.list[index].orderStatus="E6";
						}
						_that.$message({
				          type: 'info',
				          message: oData.resmsg,
				        });
					})
					.catch(function(response) {
						TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
					});
		        }).catch(() => {
		          _that.$message({
		            type: 'info',
		            message: '已取消'
		          });          
		        });
			},
		},
		created() {
			this.queryorderStatus = this.$route.query.orderStatus;
			this.evaluateStatus = this.$route.query.evaluateStatus;
		},
		mounted(){
			this.initdropdown();
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
			//处理回收方式
			handrecmethod:function(value){
				//E:"快递回收",S:"门店回收",D:"上门回收"
				switch(value){
					case 'E':
						return "快递回收";
						break;
					case 'S':
						return "门店回收";
						break;
					case 'D':
						return "上门回收";
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	#price-h{
		margin-top: 0px;
		margin-right: 10px;
	}
</style>