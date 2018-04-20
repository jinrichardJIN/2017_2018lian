<template>
	<div>
		<div class="assess-box">
		<header class="roder-top">
			<router-link :to="{name: 'evaluatePrice',query:{rgoodsId:rgoodsId}}">
				<img src="../../image/leftArrow.png" alt="" />
			</router-link>
			<h1 class="mui-title">选择回收方式</h1>
			<span></span>
		</header>
		<div class="mui-content">
			<div class="mui-col-xs-12 recov-pro">
				<div class="recov-pro-head mui-clearfix">
					<div class="round round-active fl"></div>
					<div class="long fl"></div>
					<div class="round fl"></div>
					<div class="long fl"></div>
					<div class="round fl"></div>
				</div>
				<div class="mui-clearfix recov-pro-tst">
					<p class="mui-col-xs-3 fl">回收方式</p>
					<p class="mui-col-xs-6 fl">填写信息</p>
					<p class="mui-col-xs-3 fl">提交成功</p>
				</div>
			</div>
			<p class="mui-row">
				<img src="../../image/bg-img1.jpg" class="mui-col-xs-2">
				<span class="mui-col-xs-10">请选择回收方式</span>
			</p>
			<ul class="mui-table-view mui-table-view-radio recov-list">
				<li class="mui-table-view-cell mui-media mui-selected" v-show='storeShow'>
					<div class="img-box">
						<img src="../../image/ico10.png" class="mui-media-object mui-pull-left" />
					</div>
					<div class="mui-media-body">
						门店回收
						<p class='mui-ellipsis'>24小时内到店交易，必中现金大奖</p>
					</div>
					<div class="radio-yell" @click='chooseType("storeRecycling")'>
					</div>
				</li>
				<div class="choice-border"></div>
				<li class="mui-table-view-cell mui-media" v-show='onsiteShow'>
					<div class="img-box">
						<img src="../../image/ico9.png" class="mui-media-object mui-pull-left" />
					</div>
					<div class="mui-media-body">
						上门回收
						<p class='mui-ellipsis'>单次上门收服务费10元</p>
					</div>
					<div class="radio-yell" @click='chooseType("onsiteRecycling")'>
					</div>
				</li>
				<div class="choice-border"></div>
				<li class="mui-table-view-cell mui-media" v-show='expressShow'>
					<div class="img-box">
						<img src="../../image/ico7.png" class="mui-media-object mui-pull-left" />
					</div>
					<div class="mui-media-body">
						快递回收
						<p class='mui-ellipsis'>全国快递40以内包邮</p>
					</div>
					<div class="radio-yell" @click='chooseType("expressRecovery")'>
					</div>
				</li>
			</ul>
		</div>
		<footer class="mui-bar-footer eval-foot-next" v-if="!showNextPage">
			<div class="next">下一步</div>
		</footer>
		<router-link :to="{name: routerName,query:{rgoodsId:rgoodsId}}" v-else="showNextPage" class="choRecO">
			<div class="next">下一步</div>
		</router-link>
	</div>
	</div>
</template>

<script>
	import TipFunction from '../../js/merge.js';
	export default {
		data() {
			return {
				rgoodsId: '',
				routerName: "",//跳转路由名称
				showNextPage: false,
				onsiteShow: false,//是否显示上门呢
				storeShow: false,//是否显示门店
				expressShow: false,//是否显示快递
			}
		},
		methods: {
			//方法。
			chooseType(type) {
				this.routerName = type;
				this.showNextPage = true;
			}
		},
		beforeCreate(){
 	   		var that = this
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
			//从sessionStorage中获取数据
			var parm = eval("("+sessionStorage.getItem("param")+")");
			this.rgoodsId = parm.goodsId;
			var _this = this;
			var recyMethod = parm.recMethod;
			if(recyMethod){
				recyMethod.split(",").forEach(function(d){
					//1:门店 2:物流 3:上门
					if(d==1){
						_this.storeShow = true;//是否显示门店
					}else if(d==2){
						_this.expressShow = true;//是否显示快递
					}else if(d==3){
						_this.onsiteShow = true;//是否显示上门呢
					}
				})
			}
		},
		mounted() {
			$(".radio-yell").click(function(){
	            $('.radio-yell').removeClass("active-yell");
	            $(this).addClass("active-yell");
		    });
		}
	}
</script>

<style>

</style>