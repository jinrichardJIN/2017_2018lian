<template>
	<div class="clearfix">
		<Vheader title="我的发布"></Vheader>
		<div class="table clearfix MT45  textC MR20 ML20">
			<span class=" inlineB fl">出售中(23)</span>
			<span class=" inlineB hasLRBorder PLR40">待审核(25)</span>
			<span class=" inlineB fr">已下架(8)</span>
		</div>
		<div class="blank"></div>
		<div>
			<div class="goodsState">
				<div class="clearfix  ML20 MR20">
					<span class="fl clorGray">11</span>
					<span class="fr colorY">22</span>
				</div>
			</div>
			<div class="goodsDetail">
				<div class="clearfix  ML20 MR20">
					<div class="fl MT35">
						<div>
							<h1 >11</h1>
							<p class="MT10 colorB">
								<span class="colorG2">销售价</span>￥199
							</p>
						</div>
						<div class="MT20">
							<span>11</span>
						</div>		
					</div>
					<div class="fr MT20" >
						<img src="" width="106" height="86">
					</div>
				</div>
			</div>
			<div class="goodsButton">
				<div class="ML20 MR20">
					<div class="fl"></div>
					<div class="fr"></div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import Vheader from 'base/header/header.vue';
  //	import {Header } from 'mint-ui';
	import { getCityInfo,getUserLoginStatus} from 'assets/js/merge';	
	import  { getBannerList, getActGoodsList, getGoodsCategoryList,getIGoodsList } from 'api/index';
	  import {setCollection} from 'api/goodsItem';//引入接口函数
	export default {
		created() {
		},
		data() {
			return {

			}
		},
		components: {
			Vheader
		},
		filters: {
		  },
		methods: {
		}
	}
</script>

<style scoped>
	.table{
		height: 40px;
	}	
	.table span{
		height: 18px;
		line-height: 18px;
		top: 11px;
		position: relative;
	}
	.blank {
		width: 100%;
		height: 10px;
		background: #F5F6F6;
	}
	.goodsState{
		height: 40px;
		line-height:40px;
	}	
	.goodsDetail{
		height: 130px;
	}
	.goodsButton{
		height: 50px;
	}
	.clorGray{
		color: #999;
	}
	.colorY{
		color: #FECE38
	}
	.colorG2{
		color: #CDD1D1
	}
	.colorB{
		color: #174ac1
	}
</style>