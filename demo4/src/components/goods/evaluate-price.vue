<template>
	<div>
		<div>
		<div class="evaluate-price-box">
		<header class="ervalate-price-header">
			<router-link :to="{name: 'evaluatePublic',query:{id:goodsId}}" class="mui-icon mui-action-back mui-icon-left-nav">
				<img src="../../image/leftArrow.png"/>
			</router-link>
			<h1 class="mui-title">{{goodsName}}</h1>
			<router-link :to="{name: 'index.home'}" class="righome">
				<img src="../../image/ico1_ac.png" />
			</router-link>
		</header>
		<div class="mui-content">
			<div class="price-nav">
				<p class="evaluatePrice"><img src="../../image/priceico.png" />评估价格</p>
				<p class="price">￥<span>{{price}}</span></p>
			</div>
			<div class="phoneNews">
				<ul class="clearfix " v-bind:class='{"overNom":showButton,"active-heightInitial":!showButton}'>
					<p>基本信息</p>
					<li v-for='(item,key) in evalData'>{{item}}</li>
				</ul>
				<a @click='showBase()' href="javascript:void(0);">
					<i></i>
					<i></i>
					<i></i>
				</a>
			</div>
			<div class="lanceng"></div>
			<div class="user-evt">
				<p>用户评价</p>
				<div class="evt-nav" v-for='(item,key) in evaluatelist'>
					<div class="clearfix">
						<img src="../../img/person.jpg" class="fl" />
						<div class="mobile-start">
							<p>{{item.mobile | handMobile}}</p>
							<ul class="clearfix">
								<li v-for='(item2,key) in mobleStar' v-show='(key<=item.serviceMark)'></li>
							</ul>
						</div>
					</div>
					<p class="price-content">{{item.content}}</p>
					<p>
						
					</p>
					<p>
						<span>{{item.createTimeStr}}</span><span>通过{{item.recoveryMode | recMethod}}方式回收了{{item.maxRecycleNum | recNum}}台{{item.rgoodsName}}</span>
					</p>
				</div>
				<router-link v-if="showmore" :to="{name: 'reviewCenter'}">
					<button>查看更多</button>
				</router-link>
			</div>
		</div>
		<footer class="eva-foo-nex">
			<a @click="login">
				<div class="next">马上换钱</div>
			</a>
		</footer>
	</div>
	</div>
	</div>
</template>

<script>
	//引入axios
	import axios from 'axios';
	import { mapState } from 'vuex';
	import loadingMessage from '../../js/merge.js';
	import contextPath from '../../js/commonUtils.js';
	import TipFunction from '../../js/merge.js';
	
	export default {
		data() {
			//模板数据
			return {
				//或者评价列表的参数
				goodsId:'',//商品编号
				price: '',//评估价格
				goodsName:'',//商品名称
				evalData:[],//评估选择属性
				evaluatelist: '',//评论列表信息
				showButton: true,
				showmore:false,//是否显示查看更多
				mobleStar: [{}, {}, {}, {}, {}],
			}
		},
		methods: {
			showBase() {
				this.showButton = !this.showButton;
			},
			login(){
				var that = this;
				if(userid===0){
					//跳登录
					TipFunction.loadingMessage('您尚未登录，为你跳转到登录页面');
					setTimeout(function(){
						TipFunction.hideLoading();
						that.$router.push({path:'/login'})
					},2000);
				}else{
					var param = eval("("+sessionStorage.getItem("param")+")");
					
					var rgoodsPreImgSet = param.rgoodsPreImgSet;
					if(rgoodsPreImgSet){
						that.$router.push({path:'/orderupimg'})
					}else{
						that.$router.push({path:'/choiceRecycling'})
					}
				}
			}
		},
		filters:{
			recMethod(value){ //处理回收方式
				if(value=='S'){
					return "门店";
				}else if(value=='D'){
					return "上门";
				}else if(value=='E'){
					return "邮寄";
				}
			},
			recNum(value){//处理回收数量
				switch(value){
					case 1:
						return "一";
						break;
					case 2:
						return "二";
						break;
					case 3:
						return "三";
						break;
					case 4:
						return "四";
						break;
					case 5:
						return "五";
						break;
				}
			},
			handMobile(value){ // 处理电话号码
				if(value){
					return value.substr(0,3)+"****"+value.substr(7,4);;
				}
			}
		},
		created(){
			var param = eval("("+sessionStorage.getItem("param")+")");
			this.goodsId = param.goodsId;
			this.goodsName = param.goodsName;
			this.price = (param.price*param.num).toFixed(2);
			var evaldata = param.evalData;
			if(evaldata){
				this.evalData = evaldata.split(",");
			}
		},
		mounted() {
			var _this = this;
			_this.$nextTick(() => {
				//获取用户评价list
				var getRorderEvaluate = {
					'from': 'WX',
					'rgoodsId': _this.goodsId,
					'pageSize': '3',
					'current': '1',
				}
				axios.get(contextPath.contextPath+'webevaluate/getRorderEvaluateList', { params: getRorderEvaluate })
					.then(function(res) {
						_this.evaluatelist = res.data.list;
						if(res.data.list && res.data.list.length==3)
						_this.showmore = true;
					})
					.catch(function(response) {
						TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000);
					});
			});
		}
	}
</script>

<style lang="scss">
	.active-heightInitial {
		overflow: hidden;
		height: initial;
		line-height: 30px;
		padding-right: 28px;
	}
</style>