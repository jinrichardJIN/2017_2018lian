<template>
	<div>
		<header class="font16">
			<i class="back"></i>
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
	</div>
</template>

<script>
	import { fetch } from 'assets/js/merge.js'
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				dataInfo: '', //商品信息
			}
		},
		created() {
			this.goodsId = this.$route.params.id;
			this.loadGoodsInfo();
		},
		methods: {
			//获取商品信息
			loadGoodsInfo: function() {
				Indicator.open();
				fetch("webigoods/findIGoodsById", {
					from: 'WX',
					igoodsId: this.goodsId
				}).then((res) => {
					console.log(res);
					Indicator.close();
					if(res.rescode == '00000') {
						this.dataInfo = res.data;
					} else {
						Toast({
							message: res.resmsg,
							position: 'bottom',
							duration: 2000
						});
					}
				})
			},
		},

	}
</script>

<style>

</style>