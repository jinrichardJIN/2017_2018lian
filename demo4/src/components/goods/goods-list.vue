<template>
	<div>
		<div class="goodListBox" style="position: static;">
		<header class="goodListHrader">
			<div class="home-close">
				<router-link :to="{name: 'index.home'}" class="home-input-box">
					<img src="../../image/leftArrow.png" alt="" />
				</router-link>
			</div>
			<div class="mui-input-row mui-search">
				<router-link :to="{name: 'searchModel',query:{searchReturn:'goodsList'}}" class="home-input-box">
					<input type="search" placeholder="斐讯K3路由器" v-model="searchText">
				</router-link>
			</div>
		</header>
		<div class="lanceng"></div>
		<div class="listSort">
			<ul>
				<li :class="{active:sortMode == 10}" @click='sortGoodsList(10)'>
					综合排序
				</li>
				<li :class="{active:sortMode == 21}" @click='sortGoodsList(21)'>
					成交量
				</li>
				<li :class="{active:sortMode == 31}" @click="sortGoodsList(31)">
					回收价格
				</li>
				<li class="screen-btn">
					筛选
				</li>
			</ul>
		</div>
		<div class="recovery-box">
			<div class="recovery-bottom">
				<div class="boxNull" v-if="Goods.length<1 && nodata">
					<div class="concernBoxNull">
						<img src="../../image/goodsNull.png" alt="" />
					</div>
				</div>
				<div v-for="(item,index) in Goods" class="forDiv"  v-if="Goods.length>0">
					<!--暂时添加的router-->
					<router-link :to="{name: 'evaluatePublic',query:{id:item.goodsId,recyMeth:item.recycleMode,correctReturn:'goodsList'}}">
						<div class="inline-div">
							<div class="recovery-left">
								<h2 class="big-tit">
									{{item.goodsName}}
								</h2>
								<p class="company">
									{{item.distributorName}}
								</p>
								<p class="high-price">
									最高回收价
									<span class="price-num">
									¥{{item.maxRecyclePrice}}
								</span>
								</p>
								<div class="bottom-ips">
									<ul class="print">
										<li v-for="method in item.marr">
											<img v-if="method == 1" src="../../image/ico10.png" />
											<img v-if="method == 2" src="../../image/ico9.png" />
											<img v-if="method == 3" src="../../image/ico7.png" />
										</li>
									</ul>
									<span>
										<template v-if="item.dealNum ==null">0</template>
										<template v-else>{{item.dealNum}}</template>
										人成交
									</span>
								</div>
							</div>
							<div class="recovery-right">
								<img :src="item.goodsImgUrlNarrow" :key="item.id" alt="" />
							</div>
						</div>
						<div class="recovery-concern" @click.stop.prevent="Follow(item.userConcern,item.goodsId,index)">
							<img src="../../image/weiguanzhu.png" class='changeImg' v-if='item.userConcern==0'/>
							<img src="../../image/redheart.png" class='changeImg' v-if='item.userConcern==1'/>
							<b>关注</b>
						</div>
					</router-link>
					
				</div>
			</div>
		</div>

		<transition enter-active-class="animated slideInRight" mode="out-in">
			<div class="screen" style="display: none;">
				<div class="screen-mask"></div>
				<div class="screen-content">
					<h4>回收服务</h4>
					<ul>
						<li @click="choseRecycleMode(1)" :class="{active:recycleMode==1}">门店回收</li>
						<li @click="choseRecycleMode(3)" :class="{active:recycleMode==3}">上门回收</li>
						<li @click="choseRecycleMode(2)" :class="{active:recycleMode==2}">快递回收</li>
					</ul>
					<h4>回收价格</h4>
					<div class="price-select">
						<input type="text" v-model="maxRecyclePriceStart" maxlength="6" placeholder="最低价" />
						<span>—</span>
						<input type="text" v-model="maxRecyclePriceEnd" maxlength="6" placeholder="最高价" />
					</div>
					<h4>品类</h4>
					<ul>
						<li v-for="cat in categoryList"  @click="choseCategory(cat.id)"  :class="{active:categoryId == cat.id}">{{cat.name}}</li>
					</ul>
					<h4>品牌</h4>
					<ul>
						<li v-for="brand in brandList"  @click="choseBrand(brand.brandId)"  :class="{active:brandId == brand.brandId}">{{brand.brandName}}</li>
					</ul>
					<div class="screen-status">
						<input type="button" value="重置" @click="resizeFilter"/>
						<input type="button" value="完成" @click="finishFilter" />
					</div>
				</div>
			</div>
		</transition>

	</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import TipFunction from '../../js/merge.js';
	import { mapState } from 'vuex';
	import contextPath from '../../js/commonUtils.js';
	import dropload from '../../js/dropload.js';

	export default {
		data() {
			return {
				current:0,
				pageSize:10,
				sortMode:10,//10：综合排序  20:成交量升序 21：成交量将序 30:按最高回收价升序 31:按最高回收价将序
				volume: 'desc',//desc:倒序，asc：正序
				recoveryPrice: 'desc',//desc:倒序，asc：正序
				categoryId:'',//分类编号
				brandId:'',//品牌编号
				recycleMode:'',//回收方式   1:门店 2:物流 3:上门
				maxRecyclePriceStart:null,//最高回收价格开始
				maxRecyclePriceEnd: null,//最高回收价格结束
				searchText:'', //搜索关键字
				
				categoryList:[],//分类集合
				brandList:[],//品牌集合
				
				Goods: [],
				comprehensive: true,
				sortType: '',
				concern:true,
				nodata:false,//页面么有数据
			}
		},
		created() {
			//获取商品ID
			var brandId = this.$route.query.brandId;
			this.brandId = brandId;
			var searchText = this.$route.query.searchText;
			this.searchText = searchText;
		},
		methods: {
			//点击排序
			sortGoodsList(sort){
				this.current=0,
				this.sortMode = sort;
				this.nodata = false;
				this.Goods = [];
				dropload.destory("goodListBox");
				this.initdropdown();
			},
			//选择回收方式
			choseRecycleMode(mode){
				this.recycleMode = mode;	
			},
			//选择分类编号
			choseCategory(cid){
				this.categoryId = cid;
			},
			//选择品牌编号
			choseBrand(bid){
				this.brandId = bid;
			},
			//获取商品列表数据
			getGoodsList(me,type) {
				var _this = this;
				var param = {};
				param.from = 'WX';
				if(type=='up'){
					param.current = 1;
				}else if(type=='down'){
					param.current = _this.current+1;					
				}
				param.pageSize = this.pageSize;
				param.sortMode = this.sortMode;
				param.searchText = this.searchText;
				if(this.categoryId){
					param.categoryId = this.categoryId;
				}
				if(this.brandId){
					param.brandId = this.brandId;
				}
				if(this.recycleMode){
					param.recycleMode = this.recycleMode;
				}
				if(this.maxRecyclePriceStart){
					param.maxRecyclePriceStart = this.maxRecyclePriceStart;
				}
				if(this.maxRecyclePriceEnd){
					param.maxRecyclePriceEnd = this.maxRecyclePriceEnd;
				}
				if(this.searchText){
					param.searchText = this.searchText;
				}
				//获取商品所属分类
				this.$nextTick(() => {
					axios.get(contextPath.contextPath + 'wagoods/goods/getGoodsList', {
							params: param
						})
						.then((res) => {
							var oData = res.data
							if(oData.rescode === '00000') {
								var list = oData.list;
								if(list && list.length > 0) {//如果加载出数据
									list.forEach(function(d) {
										//回收方式
										var m = d.recycleMode;
										if(m) {
											var marr = m.split(",");
											d.marr = marr;
										}
									})
									if(type=='down'){
										_this.current = param.current;
										_this.Goods = _this.Goods.concat(list);
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
									_this.Goods = list;
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
						.catch((response) => {
							// 即使加载出错，也得重置
			                me.resetload();
							TipFunction.loadingMessage(response);
							setTimeout(function() {
								TipFunction.hideLoading();
							}, 2000);
						});
				})
			},
			//加载分类信息
			getCategoryList(){
				axios.get(contextPath.contextPath + 'wagoods/getGoodsCategoryList', {
						params: {
							from: 'WX',
							searchType:1
						}
					})
					.then((res) => {
						var list = res.data.list;
						if(res.data.rescode === '00000') {
							this.categoryList = list;
						}
					})
					.catch((response) => {
						TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000);
					});
			},
			//加载品牌信息
			getBrandList(){
				var _this = this;
				axios.get(contextPath.contextPath + 'wagoods/getBrandListPage', {
						params: {
							from: 'WX',
							current:1,
							pageSize:20,
							categoryId:_this.categoryId
						}
					})
					.then((res) => {
						var list = res.data.list;
						if(res.data.rescode === '00000') {
							this.brandList = list;
						}
					})
					.catch((response) => {
						TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000);
					});
			},
			//完成筛选
			finishFilter() {
				this.current=0,
				$("body").removeAttr("style");
				this.nodata = false;
				this.Goods=[];
				dropload.destory("goodListBox");
				this.initdropdown();
			},
			//重置筛选
			resizeFilter(){
				this.categoryId= null;//分类编号
				this.brandId= null;//品牌编号
				this.recycleMode= '';//回收方式   1:门店 2:物流 3:上门
				this.maxRecyclePriceStart= null;//最高回收价格开始
				this.maxRecyclePriceEnd= null;//最高回收价格结束
			},
			//关注--->需要判断用户是否登陆，如果没有登陆则需要跳转到登录页面
			Follow(userConcern,goodsId,index) {
				if(userid == '0'){
					this.$router.push({path:'/login'});
					return false;
				}
				this.$nextTick(() => {
					var _that = this;
					var operation = 2;
					if(userConcern == '0'){
						operation = 1;
					}
					axios.get(contextPath.contextPath+'waconcern/userConcerns', {
							params: {
								from: 'WX',
								goodsId: goodsId,
								operation: operation
							}
						})
						.then((res) => {
							var resdata = res.data;
							if(resdata.rescode == '00000'){
								if(operation==2){
									_that.Goods[index].userConcern = 0;
								}else{
									_that.Goods[index].userConcern = 1;
								}
							}
							TipFunction.loadingMessage(res.data.resmsg);
							setTimeout(function() {
								TipFunction.hideLoading();
							}, 2000)
						})
						.catch((response) => {
							TipFunction.loadingMessage(response);
							setTimeout(function() {
								TipFunction.hideLoading();
							}, 2000);
						});
				})
			},
			//初始化分页
			initdropdown(){
				var _this = this;
				var options = {
					scrollArea : window,
					threshold : 50,
					loadUpFn : function(me){
						_this.getGoodsList(me,'up');
					},
					loadDownFn : function(me){
						_this.getGoodsList(me,'down');
					},
					initLoad:true,
				}
				dropload.dropload("goodListBox",options);
			}
		},
		mounted() {
			//this.sortGoodsList(this.brandId);
			this.initdropdown();
			
			//加载分类信息
			this.getCategoryList();
			
			//加载品牌信息
			this.getBrandList();
			
			setTimeout(function() {
				var expansion = null; //是否存在展开的list
				var container = document.querySelectorAll('.recovery-bottom a');
				for(var i = 0; i < container.length; i++) {
					var x, y, X, Y, swipeX, swipeY;
					container[i].addEventListener('touchstart', function(event) {
						x = event.changedTouches[0].pageX;
						y = event.changedTouches[0].pageY;
						swipeX = true;
						swipeY = true;
						if(expansion) { //判断是否展开，如果展开则收起
							expansion.className = "";
						}
					});
					container[i].addEventListener('touchmove', function(event) {

						X = event.changedTouches[0].pageX;
						Y = event.changedTouches[0].pageY;
						// 左右滑动
						if(swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
							// 阻止事件冒泡
							event.stopPropagation();
							if(X - x > 10) { //右滑
								event.preventDefault();
								this.className = ""; //右滑收起
							}
							if(x - X > 10) { //左滑
								event.preventDefault();
								this.className = "swipeleft"; //左滑展开
								expansion = this;
							}
							swipeY = false;
						}
						// 上下滑动
						if(swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
							swipeX = false;
						}
					});
				}
			}, 2000)

			/*******侧滑效果******/
			$(".screen-btn").click(function() {
				$("body").css("overflow","hidden");
				$(".screen").toggle("5000");
			})
			$(".screen .screen-mask,.screen-status input:last-child").click(function() {
				$("body").removeAttr("style");
				$(".screen").toggle("5000");
			})

//			if($(".screen").css("display")!='none'){
//				$(".goodListBox").css('overflow','hidden');
//			}
		}
	};
</script>

<style>
	.swipeleft{
		background: #fff;
	}
</style>