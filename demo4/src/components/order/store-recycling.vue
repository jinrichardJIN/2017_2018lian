<template>
	<div>
		<div class="assess-box" :class="{overhidden:showmap | showprotocol}">
		<header class="roder-top">
			<router-link :to="{name: 'choiceRecycling',query:{rgoodsId:rgoodsId}}">
				<img src="../../image/leftArrow.png" alt="" />
			</router-link>
			<h1 class="mui-title">填写信息</h1>
		</header>
		<div class="mui-content" >
			<div class="mui-col-xs-12 recov-pro">
				<div class="recov-pro-head mui-clearfix">
					<div class="round change-active fl"></div>
					<div class="long change-active fl"></div>
					<div class="round round-active fl"></div>
					<div class="long fl"></div>
					<div class="round fl"></div>
				</div>
				<div class="mui-clearfix recov-pro-tst">
					<p class="mui-col-xs-3 fl">回收方式</p>
					<p class="mui-col-xs-6 fl">填写信息</p>
					<p class="mui-col-xs-3 fl">提交成功</p>
				</div>
			</div>
			
			<div class="map-nav" v-show="showstore">
				<div @click = 'showHouse'>
					<span>{{choseadd}}</span>
					<!--<p>距离12.3km</p>-->
					<a><img src="../../image/maprightarr.png" alt="" /></a>
				</div>
				<button @click="openBaidu">查看地图</button>
				<!--<router-link :to="{name:'baiduMap',query:{gps:choseGPS,returnPath:'storeRecycling'}}">
				</router-link>-->
			</div>
			<div class="mui-row recov-pn mui-clearfix">
				<img src="../../image/bg-img9.jpg" class="mui-col-xs-2"/>
				<input type="text" maxlength="20"  placeholder="输入您的姓名" v-model='Username'>
			</div>
			<div class="mui-row recov-pn mui-clearfix">
				<img src="../../image/bg-img3.jpg" class="mui-col-xs-2"/>
				<input type="text" placeholder="请输入您的手机号" v-model='UserTelphone' maxlength="11">
			</div>
			<div class="pay">
				<div class="txt-nav">
					<textarea name="" rows="4" cols="5" maxlength="300" v-model="userDesc" placeholder="请输入备注内容（可不填）"></textarea>
					<span class="sysnum"><span>{{sysnum}}</span>/300</span>
					<div>
						<el-checkbox v-model="CheckBoxchecked"></el-checkbox>&nbsp;&nbsp;
						<span class="readService">我已经阅读并同意<a href="javascript:void(0);" @click="showProtocol">闲汇服务条款</a>并确认机器来源合法</span>
					</div>
				</div>
			</div>
		</div>
		<footer class="mui-bar-footer eval-foot-next" v-bind:class='{backgroundYello:form }'>
			<div  class="next" @click="suborder">提交订单</div>
		</footer>
		<!--<v-baidumap :addgps="choseGPS2"></v-baidumap>-->
		<v-baidumap v-show="showmap" :addgps="choseGPS" v-on:closemap="closeBaidu"></v-baidumap>
		<v-protocol v-show="showprotocol" v-on:closeprotocol="closeProtocol"></v-protocol>
	</div>
	</div>
</template>

<script type="text/javascript">
	import Calendar from '../components/calendar.vue';	
	import axios from 'axios';
	import BScroll from 'better-scroll'; 
	import { mapState } from 'vuex';
	import TipFunction from '../../js/merge.js';
	import contextPath from '../../js/commonUtils.js';
	import BaiduMap from '../components/baidu-map.vue';
	import Protocol from '../components/protocol.vue';
	import IosSelect from '../../js/iosSelect.js';

	export default {
		data(){
			return{
				rgoodsId:'',//商品编号
				goodsNum:'',//回收数量
				rgoodsInquiryInfoId:'',//评估编号
				areaList:[],//区集合
				addressList:[],//门店地址集合
				areaId:'', //选择的区id
				addressId:'',//选择的地址编号
				choseadd:'',//选择的具体地址信息
				choseGPS:'',//所选门店的gps
				choseGPS2:[],
				form:false,//提交按钮是否高亮
				userDesc:'',//用户备注
				showstore:false,//是否显示门店信息，如果没有门店信息则不显示
				Username:null,
				UserTelphone:null,
				CheckBoxchecked:true,
				subing:false,//是否在提交表单
				sysnum:0,//备注输入字数
				showmap:false,//是否显示百度地图
				showprotocol:false,//是否显示用户协议
				upImg:'',//上传的图片
				cityName:'',//地区名称
			}
		},
		components: {
			'v-baidumap': BaiduMap,
			'v-protocol': Protocol,
			
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
		watch:{
			choseGPS:function(o,n){
				this.choseGPS2.push(o);
			},
			userDesc(value){
				this.sysnum = value.length;
			},
			Username(value){
				if((/^((13|15|18|14|17)[0-9]{9})$/.test(this.UserTelphone)&&this.CheckBoxchecked&&this.Username&&this.showstore)){
						this.form = true;
				}else{
					this.form = false;
				}
			},
			CheckBoxchecked(value){
				if((/^((13|15|18|14|17)[0-9]{9})$/.test(this.UserTelphone)&&this.CheckBoxchecked&&this.Username&&this.showstore)){
						this.form = true;
				}else{
					this.form = false;
				}
			},
			UserTelphone(value){
				if((/^((13|15|18|14|17)[0-9]{9})$/.test(this.UserTelphone)&&this.CheckBoxchecked&&this.Username&&this.showstore)){
						this.form = true;
				}else{
					this.form = false;
				}
			}
		},
		methods:{
			//关闭百度
			closeBaidu(){
				this.showmap = false;
			},
			//打开百度
			openBaidu(){
				this.showmap = true;
			},
			//打开协议
			showProtocol(){
				this.showprotocol = true;
			},
			//关闭协议
			closeProtocol(){
				this.showprotocol = false;
			},
			//提交订单
			suborder(){
				if(!this.showstore){
					TipFunction.loadingMessage(this.cityName+"地区没有门店信息，将不能提交订单！");
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
					return false;
				}
				if(!this.Username){
					TipFunction.loadingMessage('请输入姓名');
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
					return;	
				}
				else if(!(/^((13|15|18|14|17)[0-9]{9})$/.test(this.UserTelphone))){
					TipFunction.loadingMessage('请输入正确的手机号');
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
					return;	
				}else if(!this.CheckBoxchecked){
					TipFunction.loadingMessage('请确认阅读服务条款');
					TipFunction.hideLoading();
					return;
				}
				
				let senddata = {
					from: 'WX', 
					rgoodsId: this.rgoodsId,
					rgoodsInquiryInfoId: this.rgoodsInquiryInfoId,//商品询价id
					goodsNum:this.goodsNum,
					contactsName:this.Username,
					contactsMobile:this.UserTelphone,
					userDesc:this.userDesc,
					recoveryMode:'S',
					warehouseStoreId: this.addressId,//门店id
				}
				if(this.upImg){
					senddata.rgoodsPreImgInfo = this.upImg;
				}
				var _this = this;
				if(!_this.subing){
					_this.subing = true;
					//调用接口提交订单
					axios.get(contextPath.contextPath+'waorder/addRecoveryOrder', {params: senddata})
			          .then((data) => {
			            var res = data.data;
			            if (res.rescode === "00000") {
			            	var param = {
			            		orderId : res.orderId,
			            		goodsnum:_this.goodsNum,
								rGoodsInquiryPrice : res.rGoodsInquiryPrice,
								orderStatus : res.orderStatus,
								warehouseName: res.warehouseName,
								warehouseContactsName: res.warehouseContactsName,
								warehouseContactsMobile: res.warehouseContactsMobile,
								warehouseAddress: res.warehouseAddress,
								warehouseTelephone: res.warehouseTelephone,
								warehouseShopHours: res.warehouseShopHours,
								warehouseName: res.warehouseName,
			            	}
							sessionStorage.setItem("param",JSON.stringify(param));
							_this.$router.push({path:'/storeSuccess'});
			            } else {
			            	_this.subing = false;
			              	TipFunction.loadingMessage(res.resmsg);
							setTimeout(function(){
								TipFunction.hideLoading();
							},2000)
			            }
			          })
			          .catch((err) => {
			          	_this.subing = false;
			          });
						
					
				}
			},
			//展示门店信息
			showHouse(){
//				this.isOr = !this.isOr;	
				var that = this;
		        var sanguoSelect = new IosSelect(2, 
		            [that.areaList, that.addressList],
		            {
		            	container:".assess-box",
		                title: '',
		                itemHeight: 35,
		                oneLevelId: that.areaId,
		                twoLevelId: that.addressId,
		                relation: [1, 0, 0, 0],
		                callback: function (selectOneObj, selectTwoObj) {
		                    that.areaId = selectOneObj.id;
		                   	that.addressId = selectTwoObj.id;
							that.choseadd = selectTwoObj.value;
							that.choseGPS = selectTwoObj.gps;
		                }
		        });
			},
		},
		created(){
			var mobile = sessionStorage.getItem('mobile');
			
			this.UserTelphone = loginMobile || mobile;
			
			var parm = eval("("+sessionStorage.getItem("param")+")");
			this.rgoodsId = parm.goodsId;
			//商品数量
			this.goodsNum = parm.num;
			//询价id
			this.rgoodsInquiryInfoId = parm.infoId;
			//获取上传图片
			this.upImg = parm.upImg;
		},
		mounted(){
			var _this = this;
			this.$nextTick(() => {
				//从session 中获取城市信息
				var city = eval("("+sessionStorage.getItem("city")+")");
				var cityId = city.cityId;
				this.cityName = city.cityName;
				//获取门店id
				var getRgoodsWarehouseStore = {
					"from":'WX',
					rgoodsId: _this.rgoodsId,
					cityId:cityId
				};
				axios.get(contextPath.contextPath+'wagoods/warehouseStore/getRgoodsWarehouseStore', { params:getRgoodsWarehouseStore})
					.then(function(res) {
						if(res.data.rescode == '00000'){
							var list = res.data.list;
							var a_aid = "";
							var arealist = [];
							var addlist = [];
							if(list && list.length>0){
								list.forEach(function(d,i){
									var aid = d.addressAreaId;
									if(a_aid.indexOf(aid)==-1){
										if(i==0){
											_this.areaId=aid;
		                					_this.addressId=d.id;
		                					_this.choseadd = d.addressProvince+d.addressCity+d.addressArea+d.addressDetail;
		                					_this.choseGPS = d.storeAddressGps;
										}
										var ar = {
											id:aid,
											value : d.addressArea,
											parentId:'0'
										}
										arealist.push(ar);
										list.forEach(function(ad){
											if(aid == ad.addressAreaId){
												var address = {
													id:ad.id,
													value : ad.addressProvince+ad.addressCity+ad.addressArea+ad.addressDetail,
													parentId : aid,
													gps : ad.storeAddressGps
												}
												addlist.push(address);											
											}
										})
										a_aid += aid+",";
									}
								})
								_this.areaList= arealist;
								_this.addressList= addlist;
								_this.showstore = true;
							}else{
								TipFunction.loadingMessage(city.cityName+"地区没有门店信息，将不能提交订单！");
								setTimeout(function(){
									TipFunction.hideLoading();
								},2000)
							}
						}else{
							TipFunction.loadingMessage(data.resmsg);
							setTimeout(function(){
								TipFunction.hideLoading();
							},2000)
						}
					})
					.catch(function(response) {
						TipFunction.loadingMessage(response);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000)
					});
			});

		}
	}
</script>

<style lang="scss">
	
	.houseContainer{
		position:fixed;
		bottom:0;
		width:100%;
		z-index:1000;
		background:#FFFFFF;
		.houseContainer-header{
			height:40px;
			display:flex;
			justify-content:space-around;
			border-bottom:1px solid gainsboro;
			line-height:40px;
			&>span:nth-child(1){
				
			}
			&>span:nth-child(2){
				color:black;
				font-weight:bold;
			}
			&>span:nth-child(3){
				color:#007AFF;
			}
		}
		.houseContainer-list{
			width:90%;
			margin:0 auto;
			margin-top:50px;
			&>div{
				overflow:hidden;
				height:40px;
				width:50%;
				float:left;
				border-bottom:1px solid gainsboro !important;
				border-top:1px solid gainsboro !important;
				&:nth-child(1){
					width:35%;
				}
				&:nth-child(2){
					width:65%;
				}
				& select{
					width:70%;
					height:100%;
					margin:0 auto;
					text-align:center;
					option{
						padding:0 0;
						height:30px;
						width:100%;
						text-align:center;
						line-height:30px;
						font-size:14px;
						
					}
				}
				& select:nth-child(1){
		}
				& select:nth-child(2){
					width:100%;
	
				}
			}
			.houseUlright{
				& select {
					width:100%;
				}
			}
			
		}
	}
	.bottomHouse{
		bottom:-300px;
	}
	.readService{
		font-size: .11rem;
		color: #333333;
	}
	.readService a{
		font-size: .11rem;
		color: #16AEED;
	}
	.backgroundYello{
		background: #FECE38 !important;
	}
	#oneLevelContain{
		width: 25%;
	}
	#twoLevelContain{
		width: 75%;
	}
	
</style>