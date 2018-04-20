<template>
	<div class="textC advTempl">
		<ul class="advBody clearfix">
			<li v-for='item in advantageData'>
				<img v-bind:src="item.src" class="PTB30">
				<p class="advText1">{{item.title}}</p>
				<p class="advText2">{{item.content}}</p>
			</li>
		</ul>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		props: ['advantageData'],
		data() {
			return {

			}
		},
		methods: {

		},
		mounted() {
			this.$nextTick(() => {
				var clientW=document.body.clientWidth;
				if(clientW<798){
					$(".advTempl .advBody li").width(clientW/2-1)
				}
			})
		},
		computed: {
			...mapState([
				'isLandingPage', 'isShow', 'isLoaded', 'isMedia'
			])
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
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
			width: 80px;
			height: 5px;
			background: #ff053b;
			left: 50%;
			transform: translateX(-50%);
			bottom: -15px !important;
		}
	}

	.advTempl {
		background:#FFFFFF;
		.advBody {
			width: 100%;
			margin: 0 auto;
			li {
				float: left;
				width: 25%;
				height: 250px;
				border-bottom: 1px solid gainsboro;
				border-right: 1px solid gainsboro;
				box-sizing: border-box;
				font-weight: normal;
				transition: all 0.5s;
				background:#FFFFFF;

				&:last-child {
					margin-right: 0px;
				}
				&:hover {
					background: #fff;
					box-shadow: 2px 2px 20px #b7b7b7;
          position: relative;
          z-index: 10;
				}
				img {
					width: 53px;
					padding-top:50px;
					padding-bottom:10px;
					height:auto;
				}
			}
			.advText1 {
				font-size: 23px;
				color: #333333;
				height: 50px;
				line-height: 50px;
			}
			.advText2 {
				font-size: 16px;
				color: #858585;
				font-weight: 200;
			}
		}
	}

	@media only screen and (max-width: 798px) {
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
				width: 60px;
				height: 3px;
				background: #ff053b;
				left: 50%;
				transform: translateX(-50%);
				bottom: -20px;
			}
		}
		.advTempl {
     		 padding-bottom:0;
			.padding40 {
				padding:0px 5% 20px;
			}
			.advBody {
				width:100%;
				margin: 0 auto;
				overflow:hidden;
				li {
					float: left;
					width:50%;
					height: 150px;
					margin-right: 0px;
					img {
						width: 30px;
						padding-top:20px;
						padding-bottom:10px;
					}
          &:hover{
            box-shadow:none;
          }
				}
				.advText1 {
					font-size:16px;
					color: #333333;
					height: 20px;
					line-height: 20px;
				}
				.advText2 {
					font-size:14px;
					color: #858585;
					font-weight: normal;
					padding: 10px 5px;
				}
			}
		}
	}

	@media only screen and (max-width: 320px) {
		.advTitle {
			font-weight: 500;
			font-size: 20px;
		}
		.enTitle {
			font-weight: 200;
			padding-top: 10px;
			font-size: 14px;
		}
		.advTempl {
			.advBody {
				width: 100%;
				margin: 0 auto;
				li {
					float: left;
					width: 50%;
					height: 150px;
					margin-right: 0px;
					&:nth-child(even) {
						float: right;
						margin-right: 0px;
					}
					&:last-child {
						margin-right: 0px;
					}
					img {
						width: 30px;
						padding: 10px 0;
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
	}
</style>
