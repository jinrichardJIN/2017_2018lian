<template>
	<div>
		<header class="font16">
			<i class="back"></i>
			<p class="title">账户设置</p>
			<p class="other"></p>
		</header>
		<div class="backgroundF5F6F6 paddingTop45px">
			<div class="paddingRightLeft20px backgroundFFFFFF marginTop10px">
				<ul class="accout">
					<router-link :to="{name:'editIndividual'}">
						<li>
							<img src="../../../assets/img/user.png">
							<div>
								<span class="">135****8792</span>
								<img src="../../../assets/img/arrow_right.png" alt="" class="arrow">
								<span class="fr marginRight3P fontSize14px wordColor999999">编辑个人资料</span>
							</div>
						</li>
					</router-link>
					<router-link :to="{name:'addressManagement'}">
						<li>
							<img src="../../../assets/img/address.png" />
							<div>
								<span class="">收获地址管理</span>
								<img src="../../../assets/img/arrow_right.png" alt="" class="arrow">
							</div>
						</li>
					</router-link>
					<router-link :to="{name: 'changePassword'}">
						<li>
							<img src="../../../assets/img/address.png" />
							<div>
								<span class="">密码修改</span>
								<img src="../../../assets/img/arrow_right.png" alt="" class="arrow">
							</div>
						</li>
					</router-link>
				</ul>
			</div>
		</div>
		<!--<router-view></router-view>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {
			console.log(this);
		}
	}
</script>

<style lang="scss" scoped="">
	
	.height60px {
		height: 60px;
	}
	
	.paddingTop10px {
		padding-top: 10px;
	}
	
	.backgroundFFFFFF {
		background: #FFFFFF;
	}
	
	.backgroundF5F6F6 {
		background: #333333;
	}
	
	.paddingTop45px {
		padding-top: 45px;
	}
	
	.marginTop10px {
		margin-top: 10px;
	}
	
	.paddingRightLeft20px {
		padding: 0px 20px;
	}
	
	.marginTop55px {
		margin-top: 55px;
	}
	
	.marginLeft35px {
		margin-left: 35px;
	}
	
	.marginLeft10P {
		margin-left: 10%;
	}
	
	.paddingLeft10P {
		padding-left: 10%;
	}
	
	.marginRight3P {
		margin-right: 3%;
	}
	
	.wordColor999999 {
		color: #999999;
	}
	
	.accout {
		li {
			height: 60px;
			line-height: 60px;
			font-size: 16px;
			img {
				width: 25px;
				height: 26px;
				margin-top: 17px;
				display: inline-block;
				vertical-align: middle;
				float: left;
			}
			div {
				margin-left: 15%;
				border-bottom: 1px solid #f1f1f1;
				span {
					display: inline-block;
				}
				img {
					width: 25px;
					display: inline-block;
					vertical-align: middle;
				}
				.arrow {
					width: 10px;
					height: 14px;
					margin-top: 23px;
					float: right;
				}
			}
		}
	}
</style>