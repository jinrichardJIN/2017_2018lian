<template>
	<div class="threeSwiper">
    <!--前后按钮-->
    <div class="swiper-button-prev" slot="button-prev"><img src="~assets/advantage/leftArrow.png"></div>
    <div class="swiper-button-next" slot="button-next"><img src="~assets/advantage/rightArrow.png"></div>
		<swiper :options="swiperOption" ref="mySwiper">
			<!-- 这部分放你要渲染的那些内容 -->

			<swiper-slide ref='swiperSlideIndex' @click.native='goMedia(i,item)' v-for='(item,i) in aboutData' v-if="i < 4" :key='i'>
				<div class="contentWrap"  >
					<div class="HeadImg">
						<img  v-bind:src="item.smallIconUrl"/>
					</div>
					<p class="title" v-html='item.title'></p>
					<div class="time" v-html='item.createTime'>

					</div>
					<div class="content" v-html='item.intro'>

					</div>
				</div>
				<img class="imgRight" src="~assets/swiper/rightDown.png"/>
				<img class="imgLeft" src="~assets/swiper/rightDown.png"/>
			</swiper-slide>

		</swiper>
		<!-- 这是轮播的小圆点 -->
		<div class="swiper-pagination2" slot="pagination"></div>
	</div>
</template>
<script>
	//引入轮播 vue-awesome-swiper
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { getRealPath } from 'assets/js/merge.js'

	export default {
		props:['aboutData'],
		components: {
			swiper,
			swiperSlide
		},
		data() {
			var _this = this;
			return {
				//配置项
				swiperOption: {
					pagination: '.swiper-pagination2',
					paginationClickable: true,
					spaceBetween: 30,
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					paginationType: 'bullets',
					onSlideChangeEnd: swiper => {
						//这个位置放swiper的回调方法
						this.page = swiper.realIndex + 1;
						this.index = swiper.realIndex;
						console.log(this.$refs.mySwiper.swiper)
					},
					onTransitionStart: (swiper) => {
						//动画即将开始函数
						var tmp = swiper.activeIndex;
						$('.threeSwiper .swiper-slide-prev').children().children().css('display', 'none');
						$('.threeSwiper .swiper-slide-next').children().children().css('display', 'none');
						$('.threeSwiper .swiper-slide-active').children().children().css('display', 'block');
					},
					swiperSlides: [1, 2, 3, 4, 5],
					effect: 'coverflow',
					slidesPerView:3,
					centeredSlides: true,
					coverflow: {
						rotate: 30,
						stretch: 10,
						depth: 60,
						modifier: 10,
						slideShadows: false
					}
				},
				url:getRealPath()

			}
		},
		//定义这个sweiper对象
		computed: {
			swiper() {

				return this.$refs.mySwiper.swiper;

			}
		},
		mounted() {

		},
		methods:{
			goMedia(index,item){
				//跳转
				var tmpId = item.id;
				window.location.href = this.url+'pageStatic/page/mediaMoble.html?mediaId='+tmpId;
			}
		}
	};
</script>
<style lang="scss" rel="stylesheet/scss">
	.threeSwiper {
		position:relative;
		/*width:80%;*/
		height:90%;
		/*margin:0 auto;*/
		.swiper-container {
			overflow:visible;
			height: 100%;
			.swiper-wrapper {
				width: 80%;
				.swiper-slide {
					position:relative;
					width: 100%;
					height: 98%;
					border-radius: 5px;
					cursor:pointer;
					box-shadow: 0px 0px 15px #b7b7b7;
					.imgLeft,.imgRight{
						position:absolute;
						width:60px;
						height:auto;
					}
					.imgLeft{
						left:10px;
						top:-30px;
					}
					.imgRight{
						right:10px;
						bottom:-30px;
					}
					.contentWrap {
						width: 100%;
						height: 85%;
						margin: 0 auto;
					}
					.HeadImg {
						img{
							display:block;
							width:100px;
							height:100px;
							border-radius:100px;
							margin: 0 auto;
							margin-top:-50px;
						}

					}
					.title {
						margin-top: 20px;
						font-size: 16px;
						color: black;
					}
					.time {
						margin-top: 10px;
						color: #616161;
						font-size: 16px;
					}
					.content {
						width: 80%;
						margin: 0 auto;
						margin-top: 30px;
						font-size: 14px;
						color: #616161;
						line-height: 25px;
						padding-bottom: 20px;
					}
				}
			}
		}
		.swiper-pagination2{
			width:100%;
			margin-top:25px;
			.swiper-pagination-bullet{
				margin-left:10px;
				display:inline-block;
				width:10px;
				height:10px;
				&:nth-child(1){
					margin-left:0px;
				}
			}
		}

		.swiper-button-prev,
		.swiper-button-next {
			width:50px;
			height:50px;
			border-radius:50px;
			background: rgba(58,156,245,.5);
			line-height:50px;
			text-align: center;
			color: #FFFFFF;
			font-size: 18px;
			img {
				display: inline-block;
				width:24px;
				vertical-align:middle;
				position:absolute;
				left:13px;
				top:13px;
			}

		}
    .swiper-button-prev:hover, .swiper-button-next:hover{
      background: #3a9cf5;
    }
		.swiper-button-prev{
			img{
				margin-top:2px;
				margin-left:-3px;
			}
		}

		.swiper-button-disabled {
			background: #616161;
		}

		.swiper-slide-active {
			width: 900px !important;
			z-index: 100;
			background: #FFFFFF;
			margin-left: -258px;
			transform: translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) !important;
		}

		.swiper-slide-next {
			transform: translate3d(0px, 0px, -200px) rotateX(0deg) rotateY(-10.7909deg) !important;
			width: 100px !important;
			background:#FFFFFF;
			img{
				display:none;
			}
		}

		.swiper-slide-prev {
			transform: translate3d(0px, 0px, -250px) rotateX(0deg) rotateY(10.7909deg) !important;
			background:#FFFFFF;
			img{
				display:none;
			}
		}

	}







	@media only screen and (max-width: 798px) {
		.threeSwiper{
			width:100%;
			margin:0 auto;
			.swiper-container{
				width:100%;
				height:100%;
			}

			.swiper-wrapper{
				transform: none !important;
			}

			.swiper-slide-active {
				width:200px !important;
				z-index: 100;
				background: #FFFFFF;
				margin-left: -250px;
				transform:translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) !important;
			}
			.swiper-slide-next {
				transform: translate3d(0px, 0px,0px) rotateX(0deg) rotateY(0deg) !important;
				width: 100px !important;
			}

			.swiper-slide-prev {
				transform: translate3d(0px, 0px,0px) rotateX(0deg) rotateY(0deg) !important;
			}
			.swiper-button-prev,
			.swiper-button-next{
				display:none;
			}
			.swiper-pagination2{
				width:100%;
				margin-top:10px;
				.swiper-pagination-bullet{
					margin-left:10px;
					display:inline-block;
					width:8px;
					height:8px;
				}
			}
		}

	}
</style>
