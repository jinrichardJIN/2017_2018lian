<template>
	<div id="account">
		<header class="concern-header">
			<span id="back" v-on:click="back">
				<img src="../../image/leftArrow.png" alt="" />
			</span>
			<h1 class="mui-title">我的账户</h1>
		</header>
		<div class="refresh">
			<!--<div class="refresh" @scroll="readyrefresh" @touchend="gorefresh">-->
			<!--<p class="retext">下拉刷新</p>-->
			<div id="accountnum">
				<div>
					{{data['userBalance']}}
					<br> 账户余额
				</div>
			</div>
			<ul class="item">
				<li>
					待入账金额
					<span class="textr">{{data['entry']}}</span>
				</li>
				<router-link :to="{name: 'detail'}">
					账户明细
					<span class="textr">
						<img src="../../image/rightArrow.png" alt="" />
					</span>
				</router-link>
				<li @click="goturnout">
					余额转出
					<span class="textr">
					<img src="../../image/rightArrow.png" alt="" />
				</span>
				</li>
			</ul>
			<ul class="item">
				<li>
					设置提现账户
				</li>
				<li @click="gopay">
					设置支付宝
					<span class="textr"><small>设置</small>
					<img src="../../image/rightArrow.png" alt="" />
				</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import contextPath from '../../js/commonUtils.js';
	import TipFunction from '../../js/merge.js';
	var that;
	//sessionStorage.setItem('channel','IOS');
	//sessionStorage.setItem('mobile','18149796785');
	//document.cookie='IDLE_USER_SESSION'+'='+'%2BbUx7Svy%2B9tb4NEunLD2%2BkuG8Gy5JlVlTerZ%2FF5vnwlNegyOqhwUm6wuBfdvIXYtEmDW2sylucm1ml1czX7FXQZAB4b1q00FNob2neKrf5lvQPMmOErcjsJ3penCPhyXhbNYH2S6nfCmbTYyZqI9BOO0oZHMmGfEAijlFU7H3OWiw19NtD8YDfv%2B%2FnGo%2FLU%2BH%2FbkLJVBgESwUXSWDuU8pYNeAa838bAO'
	//var userid='1'
	export default {
		data() {
			//模板数据
			return {
				data: '',
				gobind: true,
				payNo: '',
				id: '',
				refresh: false,
				channel: sessionStorage.getItem('channel'),
				entryPath:sessionStorage.getItem('entryPath'),
			}
		},
		beforeCreate() {
			that = this;
			if(userid === 0) {
				//跳登录
				TipFunction.loadingMessage('您尚未登录，为你跳转到登录页面');
				setTimeout(function() {
					TipFunction.hideLoading();
					that.$router.push({
						path: '/login'
					})
				}, 2000);
			}
		},
		methods: {
			readyrefresh() {
				if(!this.refresh && $(event.target).scrollTop() < 5) {
					this.refresh = true;
				}
			},
			gorefresh() {
				if(this.refresh) {
					var _this = this;
					_this.refresh = true;
					$('.retext').hide();
					setTimeout(function() {
						//window.location.reload()
						_this.loadData();
					}, 600)
				} else {
					$('.refresh').scrollTop(66);
				}
			},
			back() {
				if(this.channel == 'IOS') {
					if(this.entryPath == 'zhiqianhui') {
						webViewPop();
					} else {
						//window.location.replace(contextPath.contextPath+'/toWebappPage/dist/index#/mine')
						window.history.back();
					}
				} else if(this.channel == 'ANDROID') {
					if(this.entryPath == 'zhiqianhui') {
						window.AndroidNative.webViewPop();
					} else {
						window.history.back();
					}
				}else{
					window.history.back();
				}
				
				
			},
			gopay() {
				if(that.gobind) {
					this.$router.push({
						name: 'setpay'
					})
				} else {
					this.$router.push({
						name: 'rebind',
						query: {
							account: this.payNo,
							id: this.id
						}
					})
				}
			},
			goturnout() {
				if(that.gobind) {
					this.$router.push({
						name: 'setpay'
					})
				} else {
					this.$router.push({
						name: 'trunout'
					})
				}

			},
			//加载数据
			loadData() {
				var _this = this;
				axios.get(contextPath.contextPath + 'wabindBank/getUserEntry', {
						params: {
							from: 'WX'
						}
					})
					.then(res => {
						var cData = res.data;
						if(cData.rescode === '00000') {
							_this.data = cData.list;
						} else {
							TipFunction.loadingMessage(res.data.resmsg);
							setTimeout(function() {
								TipFunction.hideLoading();
							}, 2000)
						}
					})
					.catch(function(response) {
						TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
					});
				axios.get(contextPath.contextPath + 'wabindBank/getBindBankInfo', {
						params: {
							from: 'WX',
							bankType: 2
						}
					})
					.then(res => {
						var cData = res.data;
						if(cData.rescode === '00000') {
							if(cData.list == null) {
								_this.gobind = true;
							} else {
								_this.gobind = false;
								_this.payNo = cData.list[0].alipayNo;
								_this.id = cData.list[0].id;
							}
						} else {
							TipFunction.loadingMessage(res.data.resmsg);
							setTimeout(function() {
								TipFunction.hideLoading();
							}, 2000)
						}
					})
					.catch(function(response) {
						TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
					});
			}

		},
		computed: {

		},
		mounted() {
			this.loadData();
			//$('.refresh').scrollTop(66)

		}
	}
</script>

<style scoped>
	#account {
		background-color: ghostwhite;
	}
	
	#accountnum {
		width: 100%;
		height: 200px;
		background-color: #fece38;
		text-align: center;
		display: table;
	}
	
	#accountnum>div {
		display: table-cell;
		vertical-align: middle;
	}
	
	.item {
		width: 100%;
		overflow: hidden;
		margin-top: 20px;
		background-color: white;
	}
	
	.item>li {
		width: 100%;
		height: 46px;
		line-height: 44px;
		margin-left: 20px;
		position: relative;
		overflow: hidden;
	}
	
	.item>a {
		width: 100%;
		display: block;
		height: 46px;
		line-height: 44px;
		margin-left: 20px;
		position: relative;
		overflow: hidden;
	}
	
	.item>a:after {
		content: "";
		width: 100%;
		height: 1px;
		margin-left: -40px;
		display: block;
		background-color: gainsboro;
	}
	
	.item>li:after {
		content: "";
		width: 100%;
		height: 1px;
		margin-left: -40px;
		display: block;
		background-color: gainsboro;
	}
	
	.textr {
		position: absolute;
		right: 40px;
	}
	
	.textr img {
		width: .1rem;
		height: .16rem;
	}
	
	.textr>small {
		font-size: 15px;
		opacity: .7;
		margin-right: 10px;
	}
	
	#line {
		width: 100%;
		height: 500px;
		font-size: 14px;
		text-align: center;
		background-color: white;
		padding-top: 20px;
	}
	
	#back {
		padding-left: 20px;
		position: absolute;
	}
	
	#back img {
		height: .11rem;
	}
</style>
<style>
	.refresh {
		overflow-y: scroll;
		margin-top: 44px;
		position: relative;
	}
	
	.refresh:before {
		content: '';
		background-image: url(../../image/loading.gif);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 25px;
		display: block;
		text-align: center;
		/*height: 66px;*/
		line-height: 66px;
	}
	
	.retext {
		width: 100%;
		top: 0;
		height: 66px;
		line-height: 66px;
		text-align: center;
		position: absolute;
		background-color: ghostwhite;
	}
</style>