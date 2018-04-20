<template>
	<div class="home-box">
		<header class="home-top">
			<router-link :to="{name: 'selectCity'}" class="home-city-box">
				<div class="homeC">
					<i>
						{{cityName}}
					</i>
					<span>
						<img src="../image/bottomArrow.jpg" alt="" />
					</span>
				</div>
			</router-link>
			<div class="mui-input-row mui-search">
				<router-link :to="{name: 'searchModel'}" class="home-input-box">
					<input type="search" placeholder="斐讯K3路由器">
				</router-link>
			</div>
			<div class="home-close" @click="close">
				<img src="../image/close.png" alt="" />
			</div>
		</header>

		<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
			<div class="ref-box">
				<!--<div class="block">
					<el-carousel height="186px">
						<el-carousel-item v-for="item in List" :key="item">
							<a :href="item.actUrl">
								<img :src="item.bannerImgUrl" :key="item.id" alt="" style="width: 100%;height: 186px;" />
							</a>
						</el-carousel-item>
					</el-carousel>
				</div>-->
				
				<div class="swiper-container">
				    <div class="swiper-wrapper">
				        <div class="swiper-slide" v-for="item in List" :key="item">
				        	<a :href="item.actUrl" class="banner-img" :style="{backgroundImage:'url('+item.bannerImgUrl+')'}">
							</a>
				        </div>
				    </div>
				    <!-- 如果需要分页器 -->
				    <div class="swiper-pagination"></div>
				</div>
				
				
		<!--		<div class="guide">
					<div class="guide-left have-pad">
						<h2>
							斐讯K3路由器
						</h2>
						<p>
							最高回收价
							<span>
								¥2990
							</span>
						</p>
						<div class="tupian">
							<img src="../img/content_09.png" alt="" />
						</div>
					</div>
					<div class="guide-middle have-pad">
						<div class="guide-pad">
							<h2>
								Iphon7
							</h2>
							<p>
								最高回收价
								<span>
									¥2210
								</span>
							</p>
							<div>
								<img src="../img/content_06.png" />
							</div>
						</div>
						<div class="guide-pad">
							<h1 class="inline-gu">
								回收指南
								<img src="../img/content_13.png" />
							</h1>
							<p>
								帮助都在这里
							</p>
							<div>
								<img src="../img/content_14.png" />
							</div>
						</div>

					</div>

					<div class="guide-right have-pad">
						<div class="guide-pad">
							<h2>
								Mac笔记本
							</h2>
							<p>
								最高回收价
								<span>
									¥12210
								</span>
							</p>
							<div>
								<img src="../img/content_03.png" />
							</div>
						</div>

						<div class="guide-pad">
							<h1 class="inline-gu1">
								查看门店
									<img src="../img/content_13.png" />
							</h1>
							<p>
								查看周围门店
							</p>
							<div>
								<img src="../img/content_16.png" />
							</div>
						</div>
					</div>
				</div>
				
				-->
				
				<div class="recovery">
					<div class="recovery-top">
						<div class="hot-recovery">
							<div class="hot-border-left"></div>
							<span>	
								热门回收
							</span>
						</div>
						<router-link :to="{name:'goodsList'}">
							<span class="more">查看更多</span>
						</router-link>
					</div>
					<div class="recovery-bottom">
						<!--暂时添加的router-->
							<li v-for="(item,index) in Goods" :key="item" style="background-color: white;">
								<div class="inline-div" @click="toEval(item.goodsId,item.recycleMode)">
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
													<img v-if="method == 1" src="../image/ico10.png" />
													<img v-if="method == 2" src="../image/ico9.png" />
													<img v-if="method == 3" src="../image/ico7.png" />
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
								
								<div class="recovery-concern" @touchstart.stop.prevent="Follow(item.userConcern,item.goodsId,index)">
									<img src="../image/weiguanzhu.png" class='changeImg' v-if='item.userConcern==0' />
									<img src="../image/redheart.png" class='changeImg' v-if='item.userConcern==1' />
									<b>关注</b>
								</div>
							</li>
							
					</div>
				</div>
			</div>
		</div>

	</div>

</template>

<script>
	import axios from 'axios';
	import { mapState } from 'vuex';
	import contextPath from '../js/commonUtils.js';
	import TipFunction from '../js/merge.js';
	import cityData from '../js/cityData.js';
	export default {
		data() {
			return {
				cityName: '',
				channel:sessionStorage.getItem('channel'),
				List: [],
				Goods: [],
				needstop:false,
				first:true
			}
		},
		//离开路由之前 将rgoodsId存储在本地中
		beforeRouteLeave(fromObject, goObject, resolve) {
			var TmpId = fromObject.query.id;
			if(window.localStorage) {
				window.localStorage.setItem('rgoodsId', TmpId);
			}

			//处理跳转
			resolve();
		},
		methods: {
			toEval(id,recyMeth){
				var that = this;
				if(this.needstop){
					return
				}
				that.$router.push({
					name: 'evaluatePublic',
					query: {
						id:id,
						recyMeth:recyMeth
					}
				})
			},
			close(){
				if(this.channel == 'IOS') {
						webViewPop();
				} else if(this.channel == 'ANDROID') {
						window.AndroidNative.webViewPop();
				}
			},
			//关注--->需要判断用户是否登陆，如果没有登陆则需要跳转到登录页面
			Follow(userConcern, goodsId, index) {
				if(userid == '0') {
					this.$router.push({
						path: '/login'
					});
					return false;
				}
				this.$nextTick(() => {
					var _that = this;
					var operation = 2;
					if(userConcern == '0') {
						operation = 1;
					}
					axios.get(contextPath.contextPath + 'waconcern/userConcerns', {
							params: {
								from: 'WX',
								goodsId: goodsId,
								operation: operation
							}
						})
						.then((res) => {
							var resdata = res.data;
							if(resdata.rescode == '00000') {
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
							}, 2000)
						});
				})
			},

			//刚进入页面获取城市信息
			getCityInfo() {
				var city = sessionStorage.getItem("city");
				
				var _this = this;
				if(!city) {
					var ml = new BMap.LocalCity();
					ml.get(function(res) {

						if(res.name.length>3){
							_this.cityName = res.name.slice(0,3)
						}else{
							_this.cityName = res.name;
						}
						
						var cityId = _this.getCityId(res.name);
						var s_city = {
							cityName: res.name,
							cityId: cityId
						}
						sessionStorage.setItem("city", JSON.stringify(s_city));
					});
				} else {
					var cityInfo = eval("(" + city + ")");
					
					if(cityInfo.cityName.length>3){
						_this.cityName = cityInfo.cityName.slice(0,3)
					}else{
						_this.cityName = cityInfo.cityName;
					}
					
					
				}
			},
			//通过城市名称获取城市cityId
			getCityId(name) {
				var id = '';
				if(name) {
					for(var o in cityData) {
						if(cityData[o]) {
							cityData[o].forEach(function(d) {
								if(d.cityName == name) {
									id = d.cityId;
									return;
								}
							})
						}
					}
				}
				return id;
			}
		},
		mounted() {
			var _this=this
			/**********************轮播图******************************/
			axios.get(contextPath.contextPath + 'wagoods/banner/getBannerList', {
					params: {
						from: 'WX',
						actType: '1'
					}
				})
				.then(function(data) {
					var oData = data.data;
					if(oData.rescode === '00000') {
						this.List = data.data.list;
						this.$nextTick(function(){
			                var mySwiper = new Swiper ('.swiper-container', {
								direction: 'horizontal',
								autoplay : 3000,
								// 如果需要分页器
								pagination: '.swiper-pagination',
							})  
			            })
					} else {
						TipFunction.loadingMessage(oData.resmsg);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
					}
				}.bind(this))
				.catch(function(response) {
					TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
				}.bind(this));
			/********************************************************/
			
			
			
			setTimeout(function() {
				var expansion = null; //是否存在展开的list
				var container = document.querySelectorAll('.recovery-bottom li');
				for(var i = 0; i < container.length; i++) {
					var x, y, X, Y, swipeX, swipeY;
					container[i].addEventListener('touchstart', function(event) {
						x = event.changedTouches[0].pageX;
						y = event.changedTouches[0].pageY;
						swipeX = true;
						swipeY = true;
						if(expansion&&_this.needstop) { //判断是否展开，如果展开则收起
							expansion.className = "";
							setTimeout(function(){
								if(_this.first){
									_this.needstop=false;	
								}else{
									_this.first=!_this.first
								}
								
							},500)
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
								_this.needstop=true;
								_this.first=false;
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

			/**********************热门回收******************************/
			axios.get(contextPath.contextPath + 'wagoods/goods/getGoodsList', {
					params: {
						from: 'WX',
						goodsSale: '1'
					}
				})
				.then(function(data) {
					var oData = data.data;
					if(oData.rescode === '00000') {
						var list = oData.list;
						if(list && list.length > 0) {
							list.forEach(function(d) {
								var m = d.recycleMode;
								if(m) {
									var marr = m.split(",");
									d.marr = marr;
								}
							})
						}
						this.Goods = list;

					} else {
						TipFunction.loadingMessage(oData.resmsg);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
					}

				}.bind(this))
				.catch(function(response) {
					TipFunction.loadingMessage(response);
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000)
				}.bind(this));
			/********************************************************/
			this.getCityInfo();
		}
	};
</script>

<style>
	.el-carousel__button {
		border-radius: 50%;
		width: 10px;
		height: 10px;
	}
	.swiper-pagination-bullet-active {
    	opacity: 1;
    	background: #FFF;
    }
</style>