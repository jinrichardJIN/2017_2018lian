<template>
	<div class="mui-content personalNav">
		<div class="personalHead">
			<div class="login-but" v-show='loginShow'>
				<router-link :to="{name: 'login'}"><span>登录</span></router-link>
			</div>
			<div v-show='imgShow' class="imgshow">
				<template>
					<el-button type="text" @click="open2">
						<img src='../../image/defhead.png' />
					</el-button>
				</template>
			</div>
			<p>{{PerCen.nickName}}</p>
			<div class="headCard">
				<div class="fl">
					{{PerCen.earnedTotalAmount}}
					<p>总共赚取(元)</p>
				</div>
				<div class="fl">
					{{PerCen.orderCount}}
					<p>回收单数</p>
				</div>
			</div>
		</div>
		<div class="personCont">
			<p class="details-center">订单中心
				<a class="fr" href="javascript:void(0);" @click="gopath('orderCenter')">
					查看全部订单 <img src="../../image/leftarr.png" alt="" />
				</a>
			</p>
			<div class="personWait">
				<ul class="details-center-ul">
					<li class="mui-table-view-cell mui-media" @click.stop.prevent="hasorderNum('E2')">
						<img src="../../image/mine1.png" />
						<p class="mui-media-body">待发货</p>
						<span class="waitFor" v-if="PerCen.waitingShippedOrderCount?PerCen.waitingShippedOrderCount:0">
							{{PerCen.waitingShippedOrderCount}}
						</span>
					</li>
					<li class="mui-table-view-cell mui-media" @click.stop.prevent="hasorderNum('E4')">
						<img src="../../image/mine3.png" />
						<p class="mui-media-body">待核货</p>
						<span class="waitFor" v-if="PerCen.waitingAcceptedOrderCount?PerCen.waitingAcceptedOrderCount:0">
							{{PerCen.waitingAcceptedOrderCount}}
						</span>
					</li>
					<li class="mui-table-view-cell mui-media" @click.stop.prevent="hasorderNum('E401')">
						<img src="../../image/mine2.png" />
						<p class="mui-media-body">待确认</p>
						<span class="waitFor" v-if="PerCen.waitingConfirmedOrderCount?PerCen.waitingConfirmedOrderCount:0">
							{{PerCen.waitingConfirmedOrderCount}}
						</span>
					</li>
					<li class="mui-table-view-cell mui-media" @click.stop.prevent="hasorderNum('E403')">
						<img src="../../image/mine4.png" />
						<p class="mui-media-body">待退回</p>
						<span class="waitFor" v-if="PerCen.waitingReturnedOrderCount?PerCen.waitingReturnedOrderCount:0">
							{{PerCen.waitingReturnedOrderCount}}
						</span>
					</li>
					<li class="mui-table-view-cell mui-media" @click.stop.prevent="hasorderNum('7')">
						<img src="../../image/mine5.png" />
						<p class="mui-media-body">待评价</p>
						<span class="waitFor" v-if="PerCen.waitingEvaluatedOrderCount?PerCen.waitingEvaluatedOrderCount:0">
							{{PerCen.waitingEvaluatedOrderCount}}
						</span>
					</li>
				</ul>
			</div>
			<!--	<div class="acc-man">
				<img class="mui-col-xs-2 fl" src="../../image/ico14.png" />
				<router-link :to="{name: 'myConcern'}">
					账户管理
				</router-link>
				<span class="acc-man-right">
				&gt;
			</span>
			</div>-->
			<a href="javascript:void(0);" @click="gopath('myConcern')">
				<div class="acc-man mui-clearfix">
					<div class="img-box-mine">
						<img class="mui-col-xs-2 fl" src="../../image/ico13.png" />
					</div>
					<div class="bottom-line">
						我的关注
						<span class="acc-man-right">
							<img src="../../image/leftarr.png" alt="" />
						</span>
					</div>
				</div>
			</a>
			<a href="javascript:void(0);" @click="gopath('account')">
				<div class="acc-man mui-clearfix">
					<div class="img-box-mine">
						<img class="mui-col-xs-2 fl" src="../../image/ico14.png" /> 
					</div>
					<div class="bottom-line">
						我的账户
						<span class="acc-man-right">
							<img src="../../image/leftarr.png" alt="" />
						</span>
					</div>
				</div>
			</a>

			<router-link :to="{name:'helpCenter'}">
				<div class="acc-man mui-clearfix">
					<div class="img-box-mine">
						<img class="mui-col-xs-2 fl" src="../../image/ico12.png" /> 
					</div>
					<div class="bottom-line">
						帮助中心
						<span class="acc-man-right">
							<img src="../../image/leftarr.png" alt="" />
						</span>
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import contextPath from '../../js/commonUtils.js';
	import TipFunction from '../../js/merge.js';
	import axios from 'axios';
	export default {
		data() {
			return {
				orderStatus: 'S1,S2,7,8,D1,D2,D3,E1,E2,E3,E4,E401,E402,E403,E404,E5,E6',
				//个人中心模拟数据
				PerCen: {
					"waitingReturnedOrderCount": "",
					"waitingAcceptedOrderCount": "",
					"waitingEvaluatedOrderCount": "",
					"waitingConfirmedOrderCount": "",
					"waitingShippedOrderCount": "",
					"score": 10,
					"acctBalance": 0,
					"earnedTotalAmount": "0",
					"orderCount": "0",
					"imageIconDispose": "",
					"imageIconOriginal": "",
					"nickName": "",
				},
			}
		},
		beforeCreate() {
			var that = this;
			if(userid === 0) {
				//跳登录
				that.loginShow = true;
				that.imgShow = false;
//				TipFunction.loadingMessage('您尚未登录，请您先登录。');
//				setTimeout(function() {
//					TipFunction.hideLoading();
//					that.$router.push({path:'/login'})
//				}, 1000);
			} else {
				that.loginShow = false;
				that.imgShow = true;
			}
		},
		methods: {
			open2() {
				var that = this;
				that.$confirm('是否要退出登录？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					axios.get(contextPath.contextPath + 'wauser/loginOut', {
							params: {
								from: 'WX'
							}
						})
						.then(function(res) {
							var mData = res.data;
							if(mData.rescode == '00000') {
								that.$message({
									type: 'success',
									message: '退出登录成功!',
								});
								userid = 0;
								sessionStorage.setItem('userId',0);
								window.location.reload();
							};
						})
						.catch(function(response) {
							TipFunction.loadingMessage(response);
							setTimeout(function() {
								TipFunction.hideLoading();
							}, 1000);
						});

				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			hasorderNum(state){
				var ev = "";
				if(state == 'E2' && this.PerCen.waitingShippedOrderCount==0){
					TipFunction.loadingMessage('暂无待发货订单！');
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 1000);
					return false;
				}else if(state == 'E4' && this.PerCen.waitingAcceptedOrderCount==0){
					TipFunction.loadingMessage('暂无待核货订单！');
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 1000);		
					return false;
				}else if(state == 'E401' && this.PerCen.waitingConfirmedOrderCount==0){
					TipFunction.loadingMessage('暂无待确认订单！');
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 1000);			
					return false;
				}else if(state == 'E403' && this.PerCen.waitingReturnedOrderCount==0){
					TipFunction.loadingMessage('暂无待退回订单！');
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 1000);					
					return false;
				}else if(state == '7' && this.PerCen.waitingEvaluatedOrderCount==0){
					TipFunction.loadingMessage('暂无待评价订单！');
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 1000);	
					
					return false;
				}
				if(state == 7){
					ev = 0;
				}
					this.$router.push({path:'/orderCenter',query:{'orderStatus':state,'evaluateStatus':ev}})
			},
			//订单中心
			gopath(topath){
				if(userid ==0){
					TipFunction.loadingMessage('您尚未登录，请您先登录。');
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 1000);
					
				}else{
					this.$router.push({name:topath});
				/*	alert(window.location.href)
					setTimeout(function(){
						window.location.reload();
					},200)*/
				}
			},
			
		},
		created() {
			//个人中心
			this.$nextTick(() => {
				var _this = this;
				axios.get(contextPath.contextPath + 'wauser/getUserInfoById', {
						params: {
							from: 'WX'
						}
					})
					.then(function(res) {
						var mData = res.data;
						if(mData.rescode === '00000') {
							_this.PerCen = mData;
						}
					})
					.catch(function(response) {
						TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 1000);
					});
			});
		},
		mounted() {

		}
	}
</script>

<style scoped type="text/css" lang="scss">

.el-message-box {
	width: 80%;
}

</style>