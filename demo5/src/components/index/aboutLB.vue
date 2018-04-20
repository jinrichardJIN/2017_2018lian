<template>
	<div class="swiperWrap">
		<div class="swiper-button-prev2" ref='prev' slot="button-prev"><img src="~assets/advantage/leftArrow.png"></div>
		<swiper :options="swiperOption" class="swiper-box" ref="mySwiperA" >
			<swiper-slide class="swiper-item"     v-for='(item,i) in aboutData' v-on:click.native ='goAbout(i,item)' :key='i' >
				<div class="clearfix height100P width100 mostST" >
					<div class="fl onTheWallPic"><img v-bind:src="item.smallIconUrl" width='100%'></div>
					<div class="fl onTheWallText">
						<!--判断来源-->
						<p class="title" v-html='item.title' v-if='!item.afficheContent'>多点金融</p>
						<p class="titleThree" v-html='item.title' v-if='item.afficheContent'>多点金融</p>


						<p class="date" v-html='item.createTime'></p>
						<p class="onTheWallDetail" v-html='item.intro'>多点金融是上海赟致金融信息服务有限公司运营的互联网金融服务平台，公司成立于2016年，注册实缴资金3000万，管理团队成员拥有多年金融领域和知名互联网公司经验，擅长金融产品技术研发和风险控制，成功运营过多家互联网金融服务平台。 多点金融专注于大型企业上下游供应链的优质资产和消费金融资产，目前已搭建多重严格的风控体系，通过优质服务及模式创新，为中小企业及个人客户提供可信赖的投融资服务，致力于打造安全、透明和便捷的互联网金融服务平台。
						</p>
						<!--more-->
						<div class="more">
							更多
						</div>
					</div>
				</div>

			</swiper-slide>
			<div class="swiper-pagination"   slot="pagination" id='page'></div>
		</swiper>
		<!--需要可以重启注释-->
		<div class="swiper-button-next2" ref='next'   slot="button-next"><img src="~assets/advantage/rightArrow.png"></div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { getRealPath } from 'assets/js/merge.js';
	import { mapState } from 'vuex';

	export default {
		props: ['aboutData'],
		data() {
			var _this = this;
			return {
				swiperOption: {
					notNextTick: true,
					nextButton: '.swiper-button-next2',
					prevButton: '.swiper-button-prev2',
					paginationType: 'progress',
					pagination: '.swiper-pagination',
					paginationType: 'bullets',
					paginationClickable: true,
					onSlideChangeEnd: swiper => {
						//这个位置放swiper的回调方法
						this.page = swiper.realIndex + 1;
						this.index = swiper.realIndex;
					},
					onTransitionStart: (swiper) => {
						//这个位置放swiper的回调方法
						this.page = swiper.realIndex + 1;
						this.index = swiper.realIndex;
						if(this.index == 1) {
							$(_this.$refs.next).css('background', '#c2c2c3');
							$(_this.$refs.prev).css('background', 'rgba(58,156,245,0.8)');
						} else if(this.index == 0) {
							$(_this.$refs.prev).css('background', '#c2c2c3');
							$(_this.$refs.next).css('background', 'rgba(58,156,245,0.8)');
						} else {
							$(_this.$refs.prev).css('background', 'rgba(58,156,245,0.8)');
							$(_this.$refs.next).css('background', 'rgba(58,156,245,0.8)');
						}
					}
				},
				url:getRealPath()

			}
		},
		components: {
			swiper,
			swiperSlide
		},

		computed: {
			swiper() {
				return this.$refs.mySwiperA.swiper;

			}
		},
		mounted() {
			$(this.$refs.prev).css('background', '#c2c2c3');
		},
		methods:{
			goAbout(i,item){
				if(item.afficheContent){
					var tmpId = item.id;
					window.location.href = this.url+'pageStatic/page/mediaMoble.html?mediaId='+tmpId;
				}else{
					window.location.href = this.url+'pageStatic/page/about/aboutPlatform.html';
				}
			}
		}
	}
</script>
<style lang="scss">
  .swiper-box .mostST{
    height: 257px;
  }
	.width1200 {
		width: 1200px;
	}

	html,
	body {
		position: relative;
		height: 100%;
	}

	body {
		background: #eee;
	}

	.swiperWrap {
		width: 1200px;
		margin: 0 auto;
		position: relative;
		&:after {
			content: "";
			width:960px;
			position: absolute;
			height:327px;
			box-shadow: 0px 0px 15px #b7b7b7;
			left:120px;
			top:0;
			padding-bottom:50px;
			border-radius:5px;
			margin:0 auto;
		}

		.more {
			width: 200px;
			height: 50px;
      background: url("~assets/swiper/download.png") no-repeat;
      background-size: 100% 100%;
			border-radius: 100px;
			line-height: 50px;
			color: #FFFFFF;
			font-size: 20px;
			cursor: pointer;
			z-index: 3;
			text-align: center;
			margin-top: 10px;
			margin-bottom:20px;
		}
		.swiper-button-prev2 {
			background-image: none !important;
			position: absolute;
			left: 0;
			top: 50%;
			img {
				margin-top: 2px;
				margin-left: -3px;
			}
		}
		.swiper-button-next2 {
			width: 26px;
			background-image: none !important;
			right: 0;
			top: 50%;
			position: absolute;
		}
		.swiper-button-prev2,
		.swiper-button-next2 {
			margin-top: -25px;
			width: 50px;
			height: 50px;
			border-radius: 50px;
			background:rgba(58,156,245,0.5);
			line-height: 50px;
			text-align: center;
			color: #FFFFFF;
			font-size: 18px;
			cursor:pointer;
			&:hover{
				background:rgba(58,156,245,1) !important;
			}
			img {
				display: inline-block;
				width:24px;
				height:24px;
				vertical-align: middle;
				position:absolute;
				top:13px;
				left:13px;
			}
		}
		.swiper-button-disabled {

		}
		.swiper-pagination {
			width: 100%;
			margin-top:35px;
			bottom:0 !important;
			.swiper-pagination-bullet {
				margin-left: 10px;
				width:10px;
				height:10px;
				&:nth-child(1){
					margin-left:0px;
				}
			}
		}
	}

	.swiper-box {
		width: 80%;
		padding-bottom: 50px;
		margin: 0 auto;
		overflow: hidden;
		border-radius: 5px;
		.swiper-slide-next,.swiper-slide-prev{
			.mostST {
				width:100%;
				box-shadow:none;
			}
		}
		.mostST {
			width:100%;
			margin: 0 auto;
			padding-top: 100px;
			background: #ffffff;
			border-radius: 5px;
			padding-bottom:20px;
		}

		.onTheWallPic {
			width: 20%;
			padding: 0 7%;
			img {
				border-radius: 50%;
				box-shadow: 2px 2px 3px #b7b7b7;
				height:auto;
			}
		}
		.onTheWallText,
		.mediaReport,
		.partner {
			width: 53%;
			text-align: left;
			.title {
				font-size: 18px;
				color: #000000;
				&:after {
					content: "";
					display: block;
					position: relative;
					width: 30px;
					height: 3px;
					background:#3a9cf5;
					left: 0px;
					top: 15px;
				}
			}
			.titleThree{
				font-size: 18px;
				color: #000000;
			}
			.date {
				font-size: 18px;
				padding: 10px 0 20px;
			}
			.onTheWallDetail {
				line-height: 1.8em;
				font-weight: normal;
				color: #a3a3a3;
				font-size: 14px;
				overflow: auto;
				height: 120px;
				text-align:left;
			}
		}
	}

	.swiper-item {
		height: 100%;
		width: 100% !important;
		text-align: center;
		font-size: 18px;
		cursor:pointer;
	}



	// }
	@media only screen and (max-width: 798px) {
    .swiper-box .mostST{
      height: 100%;
    }
    .swiperWrap {
			width: 90%;
			&:after {
				content: "";
				width:0px;
				position: absolute;
				height:0px;
				box-shadow: 0px 0px 15px #b7b7b7;
				left:120px;
				top:0;
				padding-bottom:50px;
				border-radius:5px;
				margin:0 auto;
			}
			.swiper-pagination-bullet-active {
				background: #007aff;
			}
			.swiper-pagination {
				margin-top: 0;
				.swiper-pagination-bullet{
					width:8px;
					height:8px;

				}
			}
			.swiper-wrapper {
				height: auto;
				padding-top: 10px;
			}
			.swiper-button-prev2,
			.swiper-button-next2 {
				display: none;
			}
		}
		.more {
			width: 80%;
			height: 50px;
			font-size: 20px;
			line-height: 50px;
			bottom: -20px;
			margin: 0 auto;
		}
		.swiper-box {
			width: 90%;
			height: auto;
			margin: 20px auto 0;
			border-radius: 5px;
			background: none !important;
			padding-bottom:0px;
			margin-top: -50px;
			box-shadow: initial;
			.mostST {
				width: 100%;
				margin: 0 auto;
				padding-top: 0;
				background: none;
				border-radius: 5px;
				overflow: hidden;
				box-shadow:none;
			}

			.onTheWallPic {
				width:100px;
				height:100px;
				padding: 10px 0 20px 0;
				float: none;
				margin: 0 auto;
				img {
					height:100%;
					width:100%;
					display:block;
					border-radius: 50%;
					box-shadow: 2px 2px 3px #b7b7b7
				}
			}
			.onTheWallText {

				width: 90%;
				margin: 0 auto;
				float: none;
				padding-bottom: 20px;
				.title {
					padding: 10px 0;
					font-size: 18px;
					color: #535353;
					text-align: center;
					top: 10px;
					&:after {
						content: "";
						display: block;
						position: relative;
						width: 20px;
						height: 3px;
						background:#3a9cf5;
						left: 50%;
						transform: translateX(-50%);
						top: 10px;
					}
				}
				.titleThree{
					padding: 10px 0;
					font-size: 18px;
					color: #535353;
					text-align: center;
					top: 10px;
				}
				.date {
					font-size: 16px;
					padding: 10px 0 20px;
					text-align: center;
					color: #616161;
				}
				.onTheWallDetail {
					height:initial;
					line-height: 1.5em;
					padding: 10px 0;
					font-size: 14px;
					height:100px;
				}
			}
		}
		.swiper-item {
			height: auto;
			text-align: center;
			font-size: 18px;
			background: none !important;
			padding-top: 0px;
		}
	}
</style>
