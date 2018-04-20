<template>
	<div id="">
		<header class="font16">
			<i class="back"></i>
			<p class="title">实名认证</p>
			<p class="other"></p>
		</header>
		<div class="backgroundF5F6F6 paddingTop45px">
			<div class="paddingRightLeft20px  backgroundFFFFFF marginTop10px">
				<div class=" height45px lineHeight45px">
					<span class="inlineB fl">认证状态</span>
					<span class="inlineB fr">未认证</span>
				</div>
			</div>
			<ul class="paddingRightLeft20px accout marginTop10px backgroundFFFFFF">
				<li>
					<div>
						<span>真实姓名</span>
						<input type="text" v-model='name'>
					</div>
				</li>
				<li>
					<div>
						<span>手机号</span>
						<input type="text" v-model='phoneNum' maxlength="11">
					</div>
					<li>
						<div>
							<span>验证码</span>
							<input type="text" v-model='captcha' maxlength="4">
						</div>
					</li>
					<li>
						<div>
							<span>身份证号码</span>
							<input type="text" v-model='personId' maxlength="18">
						</div>
					</li>
			</ul>
		</div>

	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				phoneNum: 14800459658,
				captcha: 45,
				name: '李大个',
				personId: 3455,
			}
		},
		mounted() {

		},
		methods: {
			regexp(regular,value){
		        let result=regular.test(value);
		        let cash=''
		        if(!result){
		        }
		        else{
		         cash=value
		        }
		        return cash
			}
		},
		watch: {
			phoneNum(val) {
				let reg = /^[0-9]{0,11}$/;
				this.phoneNum = this.regexp(reg, val)
			},
			captcha(val) {
				let reg = /^[a-zA-Z0-9]{0,4}$/;
				this.captcha = this.regexp(reg, val)
			},
			password(val) {
				let reg = /^[a-zA-Z0-9\!\@\#\$\%\^\&\*]{0,16}$/;
				this.password = this.regexp(reg, val)
			},
			verifycode(val) {
				let reg = /^[0-9]{0,6}$/;
				this.verifycode = this.regexp(reg, val)
			},
		}
	}
</script>

<style lang='scss'>
	.height45px {
		height: 45px;
	}
	
	.height60px {
		height: 60px;
	}
	
	.lineHeight45px {
		line-height: 45px;
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
	
	.backgroundF5F6F6 {
		background: #333333;
	}
	
	.paddingTop45px {
		padding-top: 45px;
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
				height: 100%;
				border-bottom: 1px solid #f1f1f1;
				span {
					width: 100px;
					display: inline-block;
				}
				input {
					border: none;
					height: 80%;
					display: inline-block;
				}
			}
		}
	}
</style>