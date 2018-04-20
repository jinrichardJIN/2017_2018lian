<template>
	<div>
		<div>
			<carousel></carousel>
		</div>
		<div class="advantageWrapper">
			<advantage :advantageData='advantage'></advantage>
		</div>
		<div class="latestNewsWrapper">

			<title-m :titleData='TitleAbout'></title-m>
			<div class="companyDetail">
				<!--<img src="../../assets/carousel/companyDetail.png"/>-->
				<div class="CompanyIntroduction">
					<div class="companyName whiteTex">
						多点金融
					</div>
					<div class="companyNew whiteOpcity7">
						<p>多点金融是联璧金融板块内涉及互联网借贷撮合类服务平台，平台由联璧科技控股，独立公司运营，运营主体为上海赟致金融信息服务有限公司。公司成立于2016年，注册实缴资金3000万，管理团队成员拥有多年金融领域和知名互联网公司经验，擅长金融产品技术研发和风险控制，成功运营过多家互联网金融服务平台。</p>
						<p>多点金融专注服务于小微企业及个人的融资难题，目前已搭建多重严格的风控体系，通过优质服务及模式创新，为小微企业及个人客户提供可信赖的借贷撮合服务，致力于打造安全、透明和便捷的互联网金融服务平台。</p>
					</div>
				</div>
			</div>
			<div class="SecondSwiper">
				<aboutlb :aboutData='about'></aboutlb>
			</div>
		</div>

		<div class="secuityProtect ">
			<div class="advTitle font26 PT40 whiteTex">资金安全</div>
			<div class="enTitle font20 whiteTex whiteOpcity6"></div>
			<!--<title-m :titleData='TitleSecurity'></title-m>-->

			<div class="secuityProtectFlex PT30">
				<ul class="advBody">
					<li>
						<div class="divImg">
							<img  src="~assets/carousel/security4.png" class="PTB30">
						</div>
						<div>
							<div class="divContent">
								<p class="advText1">优质债权</p>
								<p class="advText2">核心企业上下游供应链资产，交易流水保障</p>
								<p class="advText2">消费金融小额分散，精选优质借款人</p>
							</div>
						</div>
					</li>
					<!--<li>-->
						<!--<div class="divImg">-->
							<!--<img  src="../../assets/carousel/security3.png" class="PTB30">-->
						<!--</div>-->
						<!--<div class="divContent">-->
							<!--<p class="advText1">银行存管</p>-->
							<!--<p class="advText2">上线银行存管，平台不触碰用户资金</p>-->
							<!--<p class="advText2">银行对资金划拨，交易结算，实时监控</p>-->
						<!--</div>-->
					<!--</li>-->
					<li>
						<div class="divImg">
							<img  src="~assets/carousel/security2.png" class="PTB30">
						</div>
						<div class="divContent">
							<p class="advText1">风控严格</p>
							<p class="advText2">多重渠道体系审核借款人资质</p>
							<p class="advText2">拥有经验丰富的审核团队</p>
							<p class="advText2">贷后管理实时监控回访</p>
						</div>
					</li>
					<li>
						<div class="divImg">
							<img  src="~assets/carousel/security1.png" class="PTB30">
						</div>
						<div class="divContent">
							<p class="advText1">回款保障</p>
							<p class="advText2">借款人按时还款</p>
							<p class="advText2">启动偿债条款追偿收入还款</p>
						</div>
					</li>

				</ul>
			</div>



		</div>

		<div class="onTheWall">
			<title-m :titleData='TitleMedia'></title-m>
			<div class="ThreeSwiper">
				<swiper :aboutData='aboutSwiper' v-if='!aboutStatus'></swiper>
				<aboutlb :aboutData='aboutSwiper' v-if='aboutStatus' class='MT50 MB50'></aboutlb>
			</div>

		</div>
		<div class="partner PT50">
			<title-m :titleData='TitleD'></title-m>
			<partner></partner>
		</div>
	</div>
</template>
<script>
	import Carousel from '../carousel/carousel';
	import Advantage from '../advantage/advantage'
	import Aboutlb from './aboutLB.vue'
	import { mapState } from 'vuex';
  import { clientRequest } from 'api/ddjrClientApi';
	import { getRealPath,PD,ajaxRequest } from 'assets/js/merge.js'
	import Swiper from '../swiper/swiper.vue'
	import Partner from '../partner/partner'
	import titleM  from '../publicComponents/title/title.vue';
	export default {
		data() {
			return {
				TitleD:{
					title:'合作伙伴',
					colorClass:'blueColor'
				},
				index: 0,
				url: getRealPath(),
				moreUrl: getRealPath() + 'pageStatic/page/mediaList1.html',
				mediaData: {},
				latestData: [],
				htmlUrl: getRealPath() + 'pageStatic/page/detail1.html?',
				//模板数据
				advantage: [
					{ src: require('assets/advantage/advIcon13.png'), title: '可信赖', content: '安全、透明和便捷'},
					{ src: require('assets/advantage/advIcon14.png'), title: '门槛低', content: '服务小微企业和个人'},
					{ src: require('assets/advantage/advIcon15.png'), title: '专业风控团队', content: '行业资深风控团队'},
					{ src: require('assets/advantage/advIcon12.png'), title: '第三方合作机构 ', content: '知名银行、富友支付'},
				],
				about:[
					{ smallIconUrl: require('assets/img/onTheWallPic2.jpg'), title: '平台理念', intro: '践行普惠金融，坚持利他主义，解决小微企业融资难题；诚信经营、贴心服务，通过持续模式创新，不断砥砺前行。' },
					{ smallIconUrl: require('assets/img/onTheWallPic3.jpg'), title: '平台宗旨', intro: '合法合规，明确平台性质，绝不触碰监管红线。<br/>自省自律，完善内控机制，建立严格风控体系。<br/>时刻保持风险意识，保证用户资金安全。' },
				/*	{ smallIconUrl: require('../../assets/img/onTheWallPic4.jpg'), title: '战略合作', intro: '与上海某国企数据通信有限公司达成战略合作，挖掘企业上下游供应链优质资产，确保债权真实，小额分散。' },*/
				],
				aboutSwiper:[
					{ smallIconUrl: require('assets/img/onTheWallPic.png'), title: '',time:'', content: '' },
					{ smallIconUrl: require('assets/img/onTheWallPic2.png'), title: '',time:'', content: '' },
					{ smallIconUrl: require('assets/img/onTheWallPic3.png'), title: '',time:'', content: '' },
					{ smallIconUrl: require('assets/img/onTheWallPic3.png'), title: '',time:'', content: '' },
				],
				TitleMedia:{
					title:'媒体报道',
					colorClass:'blueColor'
				},
				TitleAbout:{
					title:"关于我们",
					colorClass:'blueColor'
				},

			}
		},
		methods: {
			findIndex(a) {
				this.index = a
			},
			change(title, current) {
				window.document.title = title;
			},
			getAfficheList(res){
				if(res.resCode === "0000") {
						this.mediaData = res.records;
						this.aboutSwiper = this.mediaData;
					}
			}
		},
		computed: {
			activity() {
				return this.latestData.slice(0, 2)
			},
			...mapState([
				'screenWidth','aboutStatus'
			]),
		},
		mounted() {
			var _this = this,
				pageDom;
			this.$nextTick(() => {
        setTimeout(() => {
          this.tabDom = $('#tab').find('span');
          this.tabDom.on('click', function () {
            pageDom = $("#page").find(".swiper-pagination-bullet");
            pageDom.eq($(this).index()).trigger("click");
            _this.index = $(this).index()
          })
        }, 100);
        //第一个
        var opt = {
          'functionId': 'getAfficheList',
          'data': JSON.stringify({'curren': 1, 'pageSize': 4, 'sign': 'ACTIVITY', 'os': 'web'})
        }
        clientRequest(opt).then(res => {
          if (res.resCode == '0000') {
            this.latestData = res.records;
          } else {
            this.errText = res.resMsg;
          }
        });

        //第二个
        var opt1 = {
          'functionId': 'getAfficheList',
          'data': JSON.stringify({'curren': 1, 'pageSize': 4, 'sign': 'MEDIA', 'os': 'web'})
        }
        clientRequest(opt1).then(res => {
          if (res.resCode == '0000') {
            this.getAfficheList(res);
          } else {
            this.errText = res.resMsg;
          }
        });
			});

        //初始化
        var tmp = document.body.clientWidth;
        if (tmp <= 798) {
          this.$store.commit('ISABOUT', true);
        } else {
          this.$store.commit('ISABOUT', false);
        }



		},
		components: {
			Carousel,
			Advantage,
			Aboutlb,
			Swiper,
			Partner,
			titleM
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">
	.advTitle {
		font-weight: 500;
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
			background:#325fec;
			left: 50%;
			transform: translateX(-50%);
			bottom: -30px;
		}
	}
	.secuityProtect{
			background:url('~assets/advantage/securityBG.png');
			background-size:100% 100%;
			min-width:798px;
			img{
				display:block;
				width:100%;
			}
			.secuityProtectFlex{
				/*margin-top:50px;*/
				ul{
					width:1200px;
					margin:0 auto;
					padding-bottom:150px;
					margin-top:70px;
					overflow:hidden;
					li{
						display:inline-block;
						width:26.66%;
						margin-left:10%;
						float:left;
						&:nth-child(1){
							margin-left: 0;
						}

						img{
							width:50px;
							display:block;
							margin:0 auto;
							padding-bottom:15px;
							height:auto;
						}
						.advText1{
							font-size:18px;
							height: 50px;
							line-height: 50px;
							color:rgba(256,256,256,1);
						}
						.advText2{
							font-size: 12px;
				  			color: #858585;
							font-weight: 200;
							line-height:20px;
							color:rgba(256,256,256,0.8);
						}
					}
				}


			}
			.enTitle{
				&:after{
					background:#FFFFFF;
				}
			}
	}
	.advantageWrapper {
		background: #f9f9f9;
		min-width: 1200px;
		.advBody {
			width: 1200px;
			margin: 0 auto;
			height: 375px;
			li {
				float: left;
				width: 185px;
				height: 250px;
				transition: all 0.5s;
				&:hover {
					background: #fff;
					box-shadow: 2px 2px 20px #b7b7b7;
				}
				&:last-child {
					margin-right: 0px;
				}
			}
		}
	}

	.latestNewsWrapper {
		position:relative;
		.companyDetail{
			margin-top:100px;
			width:100%;
			height:100%;
			background:url('~assets/carousel/companyDetail.png');
			background-size:100% 100%;
			position:relative;
			padding-bottom:150px;
			cursor:pointer;
			padding-top:50px;
			img{
				display:block;
				height:100%;
				width:100%;
			}
			.CompanyIntroduction{
				width:960px;
				margin:0 auto;
				color:#FFFFFF;
				font-size:14px;
				line-height:25px;
				.companyName{
					font-size:24px;
					margin-bottom:20px;
				}
				.companyNew{
					padding-bottom:0px;
				}
			}
		}
		.SecondSwiper{
			margin-top:-100px;
			background:#f7f7f8;
			padding-bottom:50px;
		}
		position:relative;
		padding-top: 40px;
		.latestNews {
			width: 1200px;
			margin: 100px auto 0;
			border-bottom: 1px solid #c3c3c3;
			padding-bottom: 100px;
			&:after {
				content: "";
				display: block;
				position: relative;
				width: 200px;
				height: 2px;
				background: #ff053b;
				top: 101px;
			}
			li {
				overflow: hidden;
				padding-bottom: 20px;
				.latestNewsPic {
					width: 35%;
				}
				.latestNewsText {
					width: 53%;
					text-align: left;
					padding-left: 77px;
					color: #afafaf;
					.title {
						padding-top: 77px;
						font-size: 26px;
						color: #535353;
						&:after {
							content: "";
							display: block;
							position: relative;
							width: 130px;
							height: 1px;
							background: #ff053b;
							left: -150px;
							top: -15px;
						}
					}
					.date {
						font-size: 18px;
						padding: 10px 0 20px;
					}
					.latestNewsDetail {
						line-height: 1.5em;
						color: #a3a3a3;
					}
				}
			}
		}
	}

	.onTheWall {
		.ThreeSwiper{
			width:1198px;
			margin:0 auto;
			height:420px;
			margin-top:150px;
		}
		/*min-width: 1200px;*/
		overflow: hidden;
		background-color: #F7F7F8;
		padding: 40px 0px 50px 0px;
		position: relative;
		.tab {
			overflow: hidden;
			width: 100%;
			margin: 80px auto 60px;
			text-align: center;
			height: 50px;
			font-size: 0px;
			span {
				cursor: pointer;
				display: inline-block;
				font-size: 14px;
				width: 125px;
				height: 43px;
				line-height: 45px;
				margin: 0 10px;
				border-radius: 5px;
				border: 1px solid #959595;
				&.current {
					border: 1px solid #ff053b;
					background: #ff053b;
					color: #fff;
				}
			}
		}
	}

	.mediaReport {
		min-width: 1200px;
		height: 800px;
		background: url('~assets/img/mediaReportBkg.jpg') center top no-repeat;
		padding-top: 80px;
		.advTitle,
		.enTitle {
			color: #fff;
		}
		.mediaReportContent {
			width: 1200px;
			margin: 0px auto;
			padding-top: 100px;
			overflow: hidden;
			li {
				float: left;
				font-size: 0px;
				width: 360px;
				&:after {
					position: relative;
					content: '';
					display: inline-block;
					top: 0;
					left: 0;
					background: #ccc;
				}
				&:nth-child(2) {
					padding: 0 60px;
				}
				&:last-child {
					display: none;
				}
				.img {
					height: 246px;
					overflow: hidden;
				}
				.text {
					height: 50px;
					background: rgba(255, 255, 255, 0.7);
					text-align: left;
					padding: 15px;
					font-size: 18px;
					color: #000000;
					font-weight: 700;
					cursor: pointer;
					.title {
						width: 90%;
						display: inline-block;
						white-space: nowrap;
						text-overflow: ellipsis;
						-o-text-overflow: ellipsis;
						overflow: hidden;
						height: 24px;
					}
					.date {
						font-size: 14px;
						font-weight: 500;
						padding-top: 5px;
					}
				}
			}
		}
		.more {
			font-size: 20px;
			padding-top: 50px;
			margin: 0 auto;
			span {
				display: inline-block;
				;
				width: 160px;
				height: 45px;
				border: 2px solid #ff053b;
				line-height: 45px;
				color: #fff;
				cursor: pointer;
				a {
					color: #fff;
				}
			}
		}
	}

	.partner {
		padding-top:50px;
		margin: 0 auto;
		background: #fff;

	}

	@media only screen and (max-width: 798px) {
		.secuityProtect{
			min-width:0;
      background: url("~assets/img/secuityBkgPhone.png") no-repeat;
      background-size: 100% 100%;
			.advTitle {
				font-size:18px;
			}
			.enTitle{
				font-size:12px;
				&:after {
					display: block;
					content: '';
					position: relative;
					width:42px;
					height:4px;
					left: 50%;
					transform: translateX(-50%);
					bottom: -10px;
				}
			}

			.secuityProtectFlex{
				overflow:hidden;
				/*margin-top:20px;*/
				ul{
				display:block;
				overflow:hidden;
				width:90%;
				padding-bottom:50px;
          		margin-top:0;
				li{
					width:100%;
					margin-top:30px;
					margin-left:initial;
					.divImg{
						width:10%;
						float:left;
						img{
							padding-top:0;
							width:100%;
						}
					}
					.divContent{
						margin-left:20px;
						width:80%;
						float:left;
						.advText1{
							height:initial;
							text-align:left;
							line-height: initial;
						}
						.advText2{
							margin-top:10px;
							text-align:left;
						}
					}
				}
			}
			}

		}



		.advTitle {
			font-weight: 500;
			font-size: 22px;
		}
		.enTitle {
			font-weight: 200;
			padding-top: 10px;
			font-size: 14px;
			&:after {
				display: block;
				content: '';
				position: relative;
				width:50px;
				height:5px;
				background:#325fec;
				left: 50%;
				transform: translateX(-50%);
				bottom: -20px;
			}
		}
		.advantageWrapper {
			padding:0px 0 0px;
			min-width: auto;
			.advBody {
				padding: 50px 5% 0px;
				width: 90%;
				margin: 0 auto;
				height: 109vw;
				li {
					float: left;
					width: 45%;
					height: 48vw;
					margin-right: 0px;
					margin-bottom: 10px;
					padding: 2% 1%;
					box-shadow: 2px 2px 5px #b7b7b7;
					background-color: #ffffff;
					transition: none;
					&:hover {
						background: #fff;
						box-shadow: 2px 2px 5px #b7b7b7;
					}
				}
				.advText1 {
					font-size: 16px;
					color: #333333;
					height: 20px;
					line-height: 20px;
				}
				.advText2 {
					font-size: 12px;
					color: #858585;
					font-weight: 200;
					padding: 10px 5px;
				}
			}
		}
		.latestNewsWrapper {
			.companyDetail{
				padding-bottom:0;
				margin-top:60px;
        background: url("~assets/img/comDetailBkgPhone.png") no-repeat;
        background-size: 100% 100%;
				.CompanyIntroduction{
					width:90%;
					margin:0 auto;
					color:#FFFFFF;
					font-size:14px;
					line-height:25px;
					.companyName{
						font-size:18px;
						margin-bottom:20px;
					}
					.companyNew{
						padding-bottom:90px;
            color: #FFF;
					}
				}
			}
			.SecondSwiper{
				margin-top:-80px;
				padding-bottom: 40px;
			}

			.latestNews {
				width: 100%;
				margin: 50px auto 0;
				padding-bottom: 50px;
				&:after {
					content: "";
					display: block;
					position: relative;
					width: 150px;
					height: 2px;
					background: #ff053b;
					top: 51px;
				}
				li {
					overflow: hidden;
					padding-bottom: 20px;
					.latestNewsPic {
						width: 100%;
						float: none;
						img {
							width: 80%;
						}
					}
					.latestNewsText {
						width: 76%;
						text-align: left;
						padding-left: 15%;
						color: #afafaf;
						.title {
							padding-top: 40px;
							font-size: 20px;
							height: 22px;
							color: #535353;
							&:after {
								content: "";
								display: block;
								position: relative;
								width: 1px;
								height: 100px;
								background: #ff053b;
								left: 50px;
								top: -130px;
							}
						}
						.date {
							font-size: 18px;
							padding: 10px 0 20px;
						}
						.latestNewsDetail {
							line-height: 1.5em;
						}
					}
				}
			}
		}
		.onTheWall {
			min-width: 100%;
			overflow: hidden;
			padding:40px 0 40px;
			.tab {
				margin: 50px auto 30px;
				span {
					cursor: pointer;
					display: inline-block;
					font-size: 14px;
					width: 20%;
					height: 30px;
					line-height: 30px;
					margin: 0 5px;
				}
			}
			.ThreeSwiper{
				width:100%;
				margin:0 auto;
				margin-top:100px;
				height:auto;
			}


		}
		.mediaReport {
			min-width: 100%;
			height: auto;
			background: url('~assets/img/mediaReportBkg.jpg') center top no-repeat;
			padding: 40px 0 40px;
			// margin-top: 20px;
			.mediaReportContent {
				width: 94%;
				padding: 50px 3% 0px;
				li {
					width: 46%;
					padding-bottom: 10px;
					&:nth-child(even) {
						padding: 0 0 10px 0;
						float: right;
					}
					&:last-child {
						display: inline-block;
					}
					.img {
						height: auto;
						overflow: hidden;
					}
					.text {
						height: auto;
						line-height: 1em;
						padding: 10px;
						font-size: 16px;
						.title {
							width: 90%;
							font-size: 16px;
							display: inline-block;
							overflow: hidden;
							height: 18px;
						}
						.date {
							font-size: 12px;
							padding-top: 2px;
						}
					}
				}
			}
			.more {
				font-size: 16px;
				padding-top: 20px;
				margin:0 auto;
				span {
					width: 100px;
					height: 30px;
					line-height: 30px;
				}
			}
		}
		.partner {
			width: 100%;
			margin-top:0px;
			padding-top:40px;
			background: #fff;

		}
	}

	@media only screen and (max-width: 320px) {
		.advTitle {
			font-weight: 500;
			font-size: 22px;
		}
		.enTitle {
			font-weight: 200;
			padding-top: 10px;
			font-size: 14px;
			&:after {
				display: block;
				content: '';
				position: relative;
				width: 80px;
				height: 4px;
				background: #325fec;
				left: 50%;
				transform: translateX(-50%);
				bottom: -20px;
			}
		}
	}
</style>
