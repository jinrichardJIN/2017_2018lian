<template>
	<div>
		<div class="concern-box">
		<header class="concern-header">
			<router-link :to="{name: 'index.mine'}">
				<img src="../../image/leftArrow.png" alt="" />
			</router-link>
			<h1 class="mui-title">我的关注</h1>
			<a>
				&nbsp;
			</a>
		</header>
		
		<div class="concern-content">
			<div class="boxNull" v-if="list.length<1 && nodata">
				<div class="concernBoxNull">
					<img src="../../image/goodsNull.png" alt="" />
					<p>暂无数据</p>
				</div>
			</div>
			<div class="concern-nav" v-for='(item,index) in list' v-if="list.length>0">
				<div class="goods-list">
					<div>
						<div class="goods-list-lift">
							<div class="concern-title">
								<p v-html='item.goodsName'>斐讯K3路由器</p>
								<p v-html='item.distributorName'>领域数码通讯</p>
								<p>最高回收价<span>￥{{item.maxRecyclePrice}}</span></p>
							</div>
						</div>
						<ul class="clearfix">
							<li v-for="method in item.marr" class="floatLi">
								<img v-if="method == 1" src="../../image/ico10.png" />
								<img v-if="method == 2" src="../../image/ico9.png" />
								<img v-if="method == 3" src="../../image/ico7.png" />
							</li>
						</ul>
					</div>
					
					<div class="concern-img">
						<img :src="item.goodsImgUrl" />
					</div>
				</div>
				
				<div class="concern-now">
					<div class="mui-col-xs-8">
						<a href="javascript:void(0);" v-if="item.goodsStatus==4" @click="nowRecovery(item.rgoodsId,item.goodsStatus)">
							现在回收
						</a>
						<a href="javascript:void(0);" @click='cancelConcern(item.rgoodsId,index)'>删除</a>
					</div>
				</div>
			</div>

		</div>
	</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import { mapState } from 'vuex';
	import contextPath from '../../js/commonUtils.js';
	import TipFunction from '../../js/merge.js';
	import dropload from '../../js/dropload.js';

	export default {
		data() {
			//模板数据
			return {
				current:0,//当前页
				pageSize:10,//每页显示数
				list: [],
				data: [],
				nodata:false,//页面么有数据
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
		methods: {
			//现在回收
			nowRecovery(id,state){
				var that = this;
				if(state == 4){
					that.$router.push({path:'/evaluatePublic',query:{'id':id,'correctReturn':'myConcern'}})
				}else if(state == 5){
					TipFunction.loadingMessage('该商品已下架');
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000)
				}
			},
			//获取关注列表
			loadConcernList(me,type){
				var _this = this;
				var param = {};
				param.from = 'WX';
				if(type=='up'){
					param.current = 1;
				}else if(type=='down'){
					param.current = _this.current+1;					
				}
				param.pageSize = _this.pageSize;
				
				axios.get(contextPath.contextPath + 'waconcern/getConcernListPage', {
						params: param
					})
					.then(function(res) {
						var oData = res.data;
						if(oData.rescode === '00000') {
							var list = oData.list;
							if(list && list.length > 0) {//如果加载出数据
								list.forEach(function(d) {
									var m = d.recycleMode;
									if(m) {
										var marr = m.split(",");
										d.marr = marr;
									}
								})
								if(type=='down'){
									_this.current = param.current;
									_this.list = _this.list.concat(list);
								}
							}else{//没数据了
								_this.nodata = true;
								if(type=='down'){
									// 锁定
			                        me.lock();
			                        // 无数据
			                        me.noData();
								}
							}
							if(type=='up'){
								_this.list = list;
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
							setTimeout(function() {
								TipFunction.hideLoading();
							}, 3000)
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
						TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 3000)
					});
			},
			//初始化分页
			initdropdown(){
				var _this = this;
				var options = {
					scrollArea : window,
					threshold : 50,
					loadUpFn : function(me){
						_this.loadConcernList(me,'up');
					},
					loadDownFn : function(me){
						_this.loadConcernList(me,'down');
					},
					initLoad:true,
				}
				dropload.dropload("orderCbox",options);
			},
			//取消关注
			cancelConcern(goodsId,index) {
				axios.get(contextPath.contextPath + 'waconcern/userConcerns', {
						params: {
							from: 'WX',
							goodsId: goodsId,
							operation: '2'
						}
					})
					.then((data) => {
						var wData = data.data;
						TipFunction.loadingMessage(wData.resmsg);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000);
						if(wData.rescode === '00000') {
							this.list.splice(index,1);
							if(this.list.length<1){
								this.nodata = true;
							}
						} else {
							TipFunction.loadingMessage(wData.resmsg);
							setTimeout(function() {
								TipFunction.hideLoading();
							}, 2000);
						}
					})
					.catch((response) => {
						TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000);
					});
			}
		},
		mounted() {
			this.initdropdown();
		}
	}
</script>

<style>
	.floatLi {
		float: left;
	}
</style>