<template>
	<div class="wrap" ref='bannerWrap'>
		<ul id="banner" ref='banner' :style='{width:bannerWidth+"px",height:Math.round(bannerWidth*ratio*0.7)+"px"}'>
			<div class='bannerIntroduction'>
					<p class="font40 whiteTex">多点金融 | 让你的财富多一点</p>
					<p class="MT10 font28 enTitle whiteTex">资金更安全&nbsp;&nbsp;&nbsp;交易更放心</p>
					<!--<div class="bannerWord">-->
						<!--<p class="MT30 whiteOpcity8 changeBLock">资金划入银行存管系统</p><span class="none798 whiteOpcity8">，</span>-->
						<!--<p class="whiteOpcity8 MT10 changeBLock">平台不能触碰用户资金</p>-->
					<!--</div>-->
					<!--<div>-->
						<!--<p class="whiteOpcity8 MT10 changeBLock">真正实现资金风险隔离</p><span class="none798 whiteOpcity8">，</span>-->
						<!--<p class="whiteOpcity8 MT10 changeBLock MB30">银行全面监督资金流向</p>-->
					<!--</div>-->

				</div>

			<li :style='{width:bannerWidth+"px"}'>
				<img src="~assets/carousel/banner1.jpg" width="100%">
				<img src="~assets/carousel/banner2.jpg" width="100%">
				<img src="~assets/carousel/banner3.jpg" width="100%">
			</li>
		</ul>
		<ol id="carouselDot" ref='dot' v-if='bannerWidth>responseWidth'>
			<!-- 此处不用for循环，用循环轮播点的进度没有动画 -->
			<!--<li @click='selectBanner(0)'>
				<p><span :class="{current:dot===0}"></span></p>
			</li>-->
			<!--<li @click='selectBanner(1)'>
				<p><span :class="{current:dot===1}"></span></p>
			</li>
			<li @click='selectBanner(2)'>
				<p><span :class="{current:dot===2}"></span></p>
			</li>
			<li @click='selectBanner(3)'>
				<p><span :class="{current:dot===3}"></span></p>
			</li>-->
		</ol>
		<!--<ol id="carouselDot" v-if='bannerWidth<=responseWidth'>-->
			<!-- 此处为响应式的轮播点 -->
			<!--<li v-for='(item,index) in picArr' :class="{current:dot==index}"></li>
		</ol>-->
		<!--<a href="javascript:;" class="left none btn" @click='pre' ref='btnPre'></a>
		<a href="javascript:;" class="right none btn" @click='next' ref='btnNext'></a>-->

	</div>
</template>
<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				picArr: [],
				baseWidth: 1200, //此值是pc端内容可以缩小的最小宽度
				ratio: 0.5156, //图片为设置宽度根据屏幕宽度自适应，无法获取高度，此值是图片的宽高比，根据宽度计算出高度
				responseWidth: 798, //为了适应小屏设备给banner设置响应宽度
				startIndex: 10000, //设置banner层级
				i: 0, //当前索引值
				n: 0, //上一张时的索引值
				onOff: true, //防止连续点击
				delay: 8000, //轮播间隔时间
				dot: 'defult', //轮播点初始状态
				scal: 0.95, //banner缩放比例
				start: true
			}
		},
		methods: {
			init() {
				this.bannerWrap = $(this.$refs.bannerWrap);
				this.bannerUl = this.$refs.banner;
				this.bannerLi = $(this.bannerUl.getElementsByTagName('li'));
				this.Length = this.bannerLi.length;
				this.picArr = [].slice.call(this.bannerLi);
				var pre = $(this.$refs.btnPre);
				var next = $(this.$refs.btnNext);
				this.bannerWrap.hover(function() {
					pre.removeClass('none');
					next.removeClass('none')
				}, function() {
					pre.addClass('none');
					next.addClass('none')
				})
				for(var i = 0; i < this.bannerLi.length; i++) {
					this.bannerLi.eq(i).css('zIndex', this.startIndex - i);
					if(i > 0) {
						this.bannerLi.eq(i).css({ 'transform': 'translateX(0px) scaleX(' + this.scal + ')', 'transform-origin': '0 50%' });
					} else {
						this.bannerLi.eq(i).css({ 'transform': 'translateX(0px) scaleX(1)', 'transform-origin': '0 50%' });
					}
				}
				this.slide()
			},
			slide() {
				var _this = this
//				this.timer = setInterval(function() {
//					_this.move(1);
//					_this.dot = _this.nextLi //控制轮播点状态
//				}, this.delay)
			},
			move(q) {
				this.onOff = false;
				var _this = this;
				var zIdex;
				if(q > 0) {
					this.nextLi = this.i + q;
					if(this.nextLi > this.Length - 1) {
						this.nextLi = 0
					}
					zIdex = Number(this.bannerLi.eq(this.i).css('zIndex'));
					this.bannerLi.eq(this.i).css({ //动态设置点击下一张后li的位置
						'transform': "translateX(" + this.bannerWidth + "px)",
						'webkitTransform': "translateX(" + this.bannerWidth + "px)",
						'transition': 'all 0.8s cubic-bezier(0.445, 0.05, 0.55, 0.95)',
						'webkitTransition': 'all 0.8s cubic-bezier(0.445, 0.05, 0.55, 0.95)'
					})
					//动画结束后回调让li回到原位，层级降低
					this.bannerLi.eq(this.i).on('-webkit-transitionend transitionend', function() {
						$(this).css({
							'transition': '',
							'transform': 'translateX(0px) scaleX(' + _this.scal + ')',
							'webkitTransform': 'translateX(0px) scaleX(' + _this.scal + ')',
							'transform-origin': '0 50%',
							'zIndex': zIdex - _this.Length - 1
						})
						$(this).off('-webkit-transitionend transitionend')
						_this.i = _this.nextLi; //把当前banner索引赋给i
						_this.onOff = true;
					})

					this.bannerLi.eq(this.nextLi).css({
						'transform': 'scaleX(1)',
						'transform-origin': '0 50%',
						'transition': 'all 0.8s cubic-bezier(0.445, 0.05, 0.55, 0.95)',
						'webkitTransition': 'all 0.8s cubic-bezier(0.445, 0.05, 0.55, 0.95)'
					})

					this.bannerLi.eq(this.nextLi).on('-webkit-transitionend transitionend', function() {
						$(this).css({
							'transition': ''
						})
						$(this).off('-webkit-transitionend transitionend')
					})

				} else {
					//点击上一张
					this.n = this.i + q;
					if(this.n < 0) {
						this.n = this.Length - 1
					}
					zIdex = Number(this.bannerLi.eq(this.n).css('zIndex'));
					this.bannerLi.eq(this.n).css({
						'transform': "translateX(" + this.bannerWidth + "px) scaleX(1)",
						'webkitTransform': "translateX(" + this.bannerWidth + "px) scaleX(1)",
						'zIndex': zIdex + this.Length + 1
					})
					var timer = setTimeout(function() {
						_this.bannerLi.eq(_this.n).css({
							'transform': "translateX(0px) scaleX(1)",
							'webkitTransform': "translateX(0px) scaleX(1)",
							'transition': 'all 0.8s cubic-bezier(0.445, 0.05, 0.55, 0.95)',
							'webkitTransition': 'all 0.8s cubic-bezier(0.445, 0.05, 0.55, 0.95)'
						})
						_this.bannerLi.eq(_this.n).on('-webkit-transitionend transitionend', function() {
							$(this).css({
								'transition': ''
							})
							$(this).off('-webkit-transitionend transitionend');
							clearTimeout(timer);
							_this.i = _this.n; //把当前banner索引赋给i
							_this.onOff = true;
						})
						_this.bannerLi.eq(_this.i).css({
							'transform': 'translateX(0px) scaleX(' + _this.scal + ')',
							'webkitTransform': 'translateX(0px) scaleX(' + _this.scal + ')',
							'transition': 'all 0.8s cubic-bezier(0.445, 0.05, 0.55, 0.95)',
							'webkitTransition': 'all 0.8s cubic-bezier(0.445, 0.05, 0.55, 0.95)'
						})
						_this.bannerLi.eq(_this.i).on('-webkit-transitionend transitionend', function() {
							$(this).css({
								'transition': ''
							})
						})
					}, 100)
				}
			},
//			touchEvent() {
//				var preventDefault = true;
//				this.banner = this.$refs.banner;
//				this.banner.addEventListener("touchstart", startFn, true);
//				var datX, datY,
//					_this = this,
//					X,
//					Y,
//					NewX,
//					NewY,
//					scrollTop = 0;
//
//				function startFn(event) {
//					scrollY = -$(window).scrollTop();
//					event.preventDefault();
//					clearInterval(_this.timer);
//					X = event.targetTouches[0].pageX;
//					Y = event.targetTouches[0].pageY;
//					_this.banner.addEventListener('touchmove', starMoveFn, true);
//					_this.banner.addEventListener("touchend", endFn, true);
//				}
//
//				function starMoveFn(event) {
//					event.preventDefault();
//					NewX = event.targetTouches[0].pageX;
//					NewY = event.targetTouches[0].pageY;
//					datX = NewX - X;
//					datY = NewY - Y;
//					scrollY += datY;
//					$(window).scrollTop(-scrollY);
//				}
//
//				function endFn() {
//					if(datX >= 50) {
//						_this.next();
//						_this.dot = _this.nextLi //控制轮播点状态
//					}
//					if(datX <= -50) {
//						_this.pre()
//						_this.dot = _this.n //控制轮播点状态
//					}
//					_this.banner.removeEventListener("touchmove", starMoveFn, false);
//					_this.banner.removeEventListener("touchend", endFn, false);
//					_this.slide();
//				}
//			},
			pre() {
				console.log(this.onOff)
				if(!!this.onOff) {
					this.onOff = false;
					this.move(-1)
				}
			},
			next() {
				if(!!this.onOff) {
					this.onOff = false;
					this.move(1)
				}
			},
			selectBanner(index) { //点击轮播点设置banner位置
				if(index == 0) {
					for(var i = 0; i < this.Length; i++) {
						if(i == 0) {
							this.bannerLi.eq(i).css({ 'transform': 'translateX(0px) scaleX(1)', 'transform-origin': '0 50%', 'zIndex': this.startIndex - i });
						} else {
							this.bannerLi.eq(i).css({ 'transform': 'translateX(0px) scaleX(' + this.scal + ')', 'transform-origin': '0 50%', 'zIndex': this.startIndex - i });
						}
					}
				} else if(index == this.Length - 1) {
					for(var i = 0; i < this.Length; i++) {
						if(i == this.Length - 1) {
							this.bannerLi.eq(i).css({ 'transform': 'translateX(0px) scaleX(1)', 'transform-origin': '0 50%', 'zIndex': this.startIndex });
						} else {
							this.bannerLi.eq(i).css({ 'transform': 'translateX(0px) scaleX(' + this.scal + ')', 'transform-origin': '0 50%', 'zIndex': this.startIndex - this.Length - i });
						}
					}
				} else {
					for(var i = 0; i < index; i++) {
						this.bannerLi.eq(i).css({ 'transform': 'translateX(0px) scaleX(' + this.scal + ')', 'transform-origin': '0 50%', 'zIndex': this.startIndex - i - this.Length + index });
					}
					for(var i = index; i < this.Length; i++) {
						if(i == index) {
							this.bannerLi.eq(i).css({ 'transform': 'translateX(0px) scaleX(1)', 'transform-origin': '0 50%', 'zIndex': this.startIndex - i + index });
						} else {
							this.bannerLi.eq(i).css({ 'transform': 'translateX(0px) scaleX(' + this.scal + ')', 'transform-origin': '0 50%', 'zIndex': this.startIndex - i + index });
						}
					}
				}
				this.i = index
			}
		},
		computed: {
			...mapState([
				'screenWidth'
			]),
			bannerWidth() {
				if(this.screenWidth > this.responseWidth && this.screenWidth < this.baseWidth) {
					return this.baseWidth;
				}
				if(this.screenWidth < this.responseWidth) {
					return this.responseWidth
				} else {
					return this.screenWidth
				}
			}
		},
		created() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.start = false
				}, 1000)
				this.dot = 0
				const _this = this
				this.init();
//				this.touchEvent();
				$(this.$refs.btnPre).hover(function() {
					clearInterval(_this.timer)
					_this.dot = 'default'
				}, function() {
					_this.slide()
					_this.dot = _this.i;
				})

				$(this.$refs.btnNext).hover(function() {
					clearInterval(_this.timer)
					_this.dot = 'default'
				}, function() {
					_this.slide()
					_this.dot = _this.i;
				})
				$(this.$refs.dot).hover(function() {
					clearInterval(_this.timer)
					_this.dot = 'default'
				}, function() {
					_this.slide();
					_this.dot = _this.i;
				})
			})
		},
		watch: {
			screenWidth(val) {
				if(val < this.baseWidth & val > this.responseWidth) {
					this.screenWidth = this.baseWidth
				}
				if(val < this.responseWidth) {
					this.screenWidth = this.responseWidth
				}
			},
			i(val) {
				if(this.i > this.bannerLi.length - 1) {
					this.i = 0
				}
				if(this.i < 0) {
					this.i = this.bannerLi.length - 1
				}
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .font40{
    font-size: 40px;
  }
	.wrap {
		position: relative;
		overflow: hidden;
		min-width: 1200px;
		ul{
			margin-left:-2px;
			cursor:pointer;
			.changeBLock{
				display:inline-block;
			}
			.none798{
				display:inline-block;
			}
			.bannerIntroduction{
				position:absolute;
				z-index:1000000;
				width:60%;
				bottom: 50%;
        transform: translateY(50%);
				margin-left:20%;
				margin-right:20%;
				.enTitle {
					font-weight: 200;
					padding-top: 10px;
					&:after {
						display: block;
						content: '';
						position: relative;
						width:42px;
						height:4px;
						background:#3a9cf5;
						left: 50%;
						transform: translateX(-50%);
						bottom: -30px;
					}
				}
				.bannerWord{
					margin-top:20px;
				}
			}
		}
		.more{
			width:200px;
			height:50px;
			background:linear-gradient(left,#325fec,#388ff3);
			position:absolute;
			border-radius:500px;
			bottom:15%;
			left:50%;
			line-height:50px;
			margin-left:-100px;
			color:#FFFFFF;
			font-size:20px;
			cursor:pointer;
		}
		ul li img{
				display:block;
			}
	}

	#carouselDot {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 23%;
		height: 20px;
	}

	#carouselDot li {
		float: left;
		width:10px;
		border: #fff;
		padding: 7px;
		/*margin-left: 8px;*/
		cursor: pointer;

		p {
			position: relative;
			border-radius:5px;
			width:10px;
			height:10px;
			background: rgba(255, 255, 255, 0.5);
			overflow:hidden;
			span {
				display: inline-block;
				position: absolute;
				height: 100%;
				width: 0%;
				left: 0;
				top: 0;
				border-radius:5px;
				background: #325fec;
				&.current {
					width: 100%;
					transition: all 8s linear;
					//轮播点进度时间轮播时间修改后，此时间也要修改
				}
			}
		}
	}

	#carouselDot li.current {
		background: #325fec;
	}

	.left,
	.right {
		width: 24px;
		height: 40px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -26px 0 0 0;
		background: url('~assets/img/arrows.png') no-repeat 0 0;
	}

	.left {
		margin-left: -624px;
	}

	.right {
		background-position: -24px 0;
		margin-left: 600px;
	}

	ul {
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		overflow: hidden;
	}

	ul li {
		position: absolute;
		height: 100%;
		font-size: 0;
	}

	@media only screen and (max-width: 798px) {
		.wrap {
			min-width: 100%;
			ul{
				.bannerIntroduction{
					position:absolute;
          bottom:80px;
          transform: translateY(0%);
          z-index:1000000;
					width:60%;
					margin-top:20%;
					margin-left:20%;
					margin-right:20%;
					&>p:nth-child(1){
						font-size:20px;
					}
					&>p:nth-child(2){
						font-size:16px;
					}
					.enTitle {
						font-weight: 200;
						padding-top: 10px;
						&:after {
							display: block;
							content: '';
							position: relative;
							width:42px;
							height:4px;
							background:#3a9cf5;
							left: 50%;
							transform: translateX(-50%);
							bottom: -10px;
						}
					}
				}
				.none798{
					display:none;
				}
				.changeBLock{
					display:block;
				}
			}


			.more{
				width:200px;
				margin-left:-100px;
				height:50px;
				font-size:20px;
				line-height:50px;

			}
			ul li img{
				display:block;
			}
		}
		#carouselDot {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 60px;
			height: 20px;
		}
		#carouselDot li {
			float: left;
			width: 8px;
			height: 8px;
			border: #fff;
			border-radius: 50%;
			margin-left: 8px;
			cursor: pointer;
			background: rgb(255, 255, 255);
			padding: 0;
		}
		#carouselDot li.current {
			background: #325fec;
		}
	}
</style>
