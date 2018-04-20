<template>
	<div>
		<div class="goodListBox">
		<header class="roder-top">
			<a v-on:click="back">
				<img src="../image/leftArrow.png" alt="" />
			</a>
			<h1 class="mui-title">查看评价</h1>
			
		</header>
		<div class="lanceng"></div>
		<div class="recovery-box">
			<div class="recovery-bottom">
				<!--暂时添加的router-->
				<div class="inline-div">
					<div class="recovery-left">
						<h2 class="big-tit">{{orderD.goodsName}}</h2>
						<p class="company">{{orderD.distributorName}}</p>
						<p class="high-price">
							最高回收价
							<span class="price-num">¥{{orderD.maxRecyclePrice}}</span>
						</p>
						<div class="bottom-ips">
							<ul class="print">
								<li  v-for="mode in orderD.arrMode">
									<img v-if="mode == 1" src="../image/ico10.png" />
									<img v-if="mode == 2" src="../image/ico9.png" />
									<img v-if="mode == 3" src="../image/ico7.png" />
								</li>
							</ul>
						</div>
					</div>
					<div class="recovery-right">
						<img :src=orderD.goodsImgUrlNarrow alt="" />
					</div>
				</div>
			</div>
		</div>
		<div class="comm-info-content">
			<p class="time">{{commInfo.createTimeStr}}</p>
			<p class="content">{{commInfo.content}}</p>
			<ul class="nav-comimg">
				<li v-for="img in commInfo.arrImg">
					<img :src="img"/>
				</li>
			</ul>
			<template v-if="rorderEvaluateOwnerDto">
				<div class="repeat-cont" v-for="rep in commInfo.rorderEvaluateOwnerDto">
					<p>{{rep.ownerUserName}}回复：</p>
					<p>{{rep.content}}</p>
				</div>
			</template>
		</div>
	</div>
	</div>
</template>

<script>

    import axios from 'axios';
	import TipFunction from '../js/merge.js';
	import contextPath from '../js/commonUtils.js';
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				rgoodsId:'',//商品编号
				orderId:'',//订单编号
				commInfo:"",//评价详情
				orderD:'',
				rorderEvaluateOwnerDto: '',
			}
		},
		beforeCreate() {
			var that = this;
			if(userid === 0) {
				//跳登录
				TipFunction.loadingMessage('您尚未登录，为你跳转到登录页面');
				setTimeout(function() {
					TipFunction.hideLoading();
					that.$router.push({
						path: '/login'
					})
				}, 2000);
			}
		},
		created(){
		    //获取商品ID
		    var orderId = this.$route.query.orderId;
		    this.orderId = orderId;
		   	this.rgoodsId = this.$route.query.rgoodsId;
		    
		    //获取评论信息
		    this.getcommentInfo();
		    //获取商品信息
		    this.getGoodsInfo();
		},
		methods: {
			//返回
			back(){
				if(this.channel == 'IOS') {
						webViewPop();
				} else if(this.channel == 'ANDROID') {
						window.AndroidNative.webViewPop();
				}else{
					window.history.back();
				}
			},
			//获取评论详情
			getcommentInfo(){
				axios.get(contextPath.contextPath+'waevaluate/getRorderEvaluateList', { 
					params: {
						from: 'WX',
						orderId: this.orderId,
					}
				})
			    .then((res) => {
			    	var cData = res.data;
			    	if (cData.rescode === "00000") {
			    		this.commInfo = cData.list[0];
			    		this.rorderEvaluateOwnerDto = this.commInfo.rorderEvaluateOwnerDto
			    		if(this.commInfo){
			    			var arrImg = this.commInfo.uploadImgNarrowUrl;
			    			if(arrImg){
								var arrImg = arrImg.split(";");
				    			this.commInfo.arrImg = arrImg;
			    			}
			    		}
			        } else {
						TipFunction.loadingMessage(res.data.resmsg);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000)	
			        }
				})
				.catch((response) => {
					TipFunction.loadingMessage(response);
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)	
				});
			},
			//获取商品信息
			getGoodsInfo(){
				axios.get(contextPath.contextPath+'wagoods/goods/findGoodsById', { 
					params: {
						from: 'WX',
						rgoodsId: this.rgoodsId,
					}
				})
			    .then((data) => {
			    	var cData = data.data;
			    	if (cData.rescode === "00000") {
			    		if(cData.data.recycleMode){
			    			cData.data.arrMode = cData.data.recycleMode.split(",");
			    		}
			    		this.orderD = cData.data;
			        } else {
						TipFunction.loadingMessage(data.data.resmsg);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000)	
			        }
				})
				.catch((response) => {
					TipFunction.loadingMessage(response);
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)	
				});
			}
		}
	};
</script>

<style>
</style>