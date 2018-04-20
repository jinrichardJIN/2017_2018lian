<template>
	<div class="mui-content personalNav">
		<div class="personalHead">
			<div class="login-but" v-show='loginShow'>
				<router-link :to="{name: 'login'}"><span>登录</span></router-link>
			</div>
			<div v-show='imgShow' class="imgshow">
				<template>
					<img src='../../image/defhead.png' />
				</template>
			</div>
			<p class="userName">{{PerCen.nickName}}</p>
			<p>您已经加入闲汇23天</p>
			<p>成交7笔，累计收益432元</p>
			
		</div>
		<div class="personCont">
			<div class="order-number">
				<ul>
					<li>
						<span>19</span>
						<span>卖出订单</span>
					</li>
					<li>
						<span>0</span>
						<span>购买订单</span>
					</li>
					<li>
						<span>31</span>
						<span>回收订单</span>
					</li>
					<li>
						<span>8</span>
						<span>售后订单</span>
					</li>
				</ul>
			</div>
			<!--<p class="details-center">订单中心
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
				<div class="acc-man">
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
						<img class="mui-col-xs-2 fl" src="../../image/myConcern.png" />
					</div>
					<div class="bottom-line">
						我的关注
						<span class="acc-man-right">
							<img src="../../image/leftarr.png" alt="" />
						</span>
					</div>
				</div>
			</a>
			<a href="javascript:void(0);" @click="gopath('myConcern')">
				<div class="acc-man mui-clearfix">
					<div class="img-box-mine">
						<img class="mui-col-xs-2 fl" src="../../image/myRelease.png" />
					</div>
					<div class="bottom-line">
						我的发布
						<span class="acc-man-right">
							<img src="../../image/leftarr.png" alt="" />
						</span>
					</div>
				</div>
			</a>
			<a href="javascript:void(0);" @click="gopath('myConcern')">
				<div class="acc-man mui-clearfix">
					<div class="img-box-mine">
						<img class="mui-col-xs-2 fl" src="../../image/authentication.png" />
					</div>
					<div class="bottom-line">
						实名认证
						<span class="acc-man-right">
							<img src="../../image/leftarr.png" alt="" />
						</span>
					</div>
				</div>
			</a>
			<a href="javascript:void(0);" @click="gopath('account')">
				<div class="acc-man mui-clearfix">
					<div class="img-box-mine">
						<img class="mui-col-xs-2 fl" src="../../image/myAccount.png" />
					</div>
					<div class="bottom-line meixian">
						我的账户
						<span class="acc-man-right">
							<img src="../../image/leftarr.png" alt="" />
						</span>
					</div>
				</div>
			</a>
			<div class="lanceng"></div>
			<router-link :to="{name:'helpCenter'}">
				<div class="acc-man mui-clearfix">
					<div class="img-box-mine">
						<img class="mui-col-xs-2 fl" src="../../image/helpCenter.png" />
					</div>
					<div class="bottom-line">
						帮助中心
						<span class="acc-man-right">
							<img src="../../image/leftarr.png" alt="" />
						</span>
					</div>
				</div>
			</router-link>
			<router-link :to="{name:'helpCenter'}">
				<div class="acc-man mui-clearfix">
					<div class="img-box-mine">
						<img class="mui-col-xs-2 fl" src="../../image/Contact.png" />
					</div>
					<div class="bottom-line">
						联系客服
						<span class="acc-man-right">
							<img src="../../image/leftarr.png" alt="" />
						</span>
					</div>
				</div>
			</router-link>
			<router-link :to="{name:'helpCenter'}">
				<div class="acc-man mui-clearfix">
					<div class="img-box-mine">
						<img class="mui-col-xs-2 fl" src="../../image/settled.png" />
					</div>
					<div class="bottom-line">
						商家入驻
						<span class="acc-man-right">
							<img src="../../image/leftarr.png" alt="" />
						</span>
					</div>
				</div>
			</router-link>
			<router-link :to="{name:'helpCenter'}">
				<div class="acc-man mui-clearfix">
					<div class="img-box-mine">
						<img class="mui-col-xs-2 fl" src="../../image/设置.png" />
					</div>
					<div class="bottom-line">
						设置
						<span class="acc-man-right">
							<img src="../../image/leftarr.png" alt="" />
						</span>
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import contextPath from '../../js/commonUtils.js';
	import { Toast } from 'mint-ui';
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
							Toast({
							  message: response,
							  position: 'bottom',
							  duration: 2000
							});
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
					Toast({
					  message: '暂无待发货订单！',
					  position: 'bottom',
					  duration: 2000
					});
					
					return false;
				}else if(state == 'E4' && this.PerCen.waitingAcceptedOrderCount==0){
					Toast({
					  message: '暂无待核货订单！',
					  position: 'bottom',
					  duration: 2000
					});
					return false;
				}else if(state == 'E401' && this.PerCen.waitingConfirmedOrderCount==0){
					Toast({
					  message: '暂无待确认订单！',
					  position: 'bottom',
					  duration: 2000
					});
					return false;
				}else if(state == 'E403' && this.PerCen.waitingReturnedOrderCount==0){
					Toast({
					  message: '暂无待退回订单！',
					  position: 'bottom',
					  duration: 2000
					});
					return false;
				}else if(state == '7' && this.PerCen.waitingEvaluatedOrderCount==0){
					Toast({
					  message: '暂无待评价订单！',
					  position: 'bottom',
					  duration: 2000
					});
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
					Toast({
					  message: '您尚未登录，请您先登录。',
					  position: 'bottom',
					  duration: 2000
					});
					
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
						Toast({
						  message: response,
						  position: 'bottom',
						  duration: 2000
						});
						
					});
			});
		},
		mounted() {

		}
	}
</script>

<style scoped type="text/css" lang="scss">
@import "../../css/core/reset.scss";

$yellow-col:#fece38;
$font-col:#333333;
$main-col:#999999;
$font-size:14px;
.lanceng{
	background: #F5F6F6;
	width: 100%;
	height: 10px;
}
.el-message-box {
	width: 80%;
}
.personalNav {
    height: 100%;
    overflow-y: scroll;
    .personalHead {
        padding: 30px 20px;
        overflow: hidden;
        .login-but{
            text-align: center;
        }
        .imgshow{
            text-align: center;
            margin-bottom: 10px;
        }
        div {
            img {
                width: 61px;
                height: 61px;
                border-radius: 50%;
            }
        }
        p {
            text-align: center;
            font-family: 'PingFangSC-Regular';
			font-size: 13px;
			color: #999999;
			letter-spacing: 0;
        }
        .userName{
        	text-align: center;
            margin-bottom: 10px;
			font-family: 'PingFangSC-Regular';
			font-size: 20px;
			color: #333333;
			letter-spacing: 0;
        }
        p:nth-child(2) {
            margin-top: 5px;
            font-size: 15px;
            color: $font-col;
        }
    }
    .personCont {
        margin-bottom: 50px;
        overflow: hidden;
        
        .order-number{
        	width: 100%;
        	ul{
        		padding: 0 20px;
        		width: 100%;
        		li{
        			width: 25%;
        			float:left;
        			padding: 15px 0;
        			border-top: 1px solid #F1F1F1;
        			border-bottom: 1px solid #F1F1F1;;
        			@include flexbox();
        			@include flex-direction(column);
        			@include align-items(center);
        			@include justify-content(center);
        			span{
        				&:first-child{
        					font-family: 'PingFangSC-Regular';
							font-size: 18px;
							color: #333333;
							letter-spacing: 0;
							margin-bottom: 8px;
        				}
        				&:last-child{
        					font-family: 'PingFangSC-Regular';
							font-size: 13px;
							color: #999999;
							letter-spacing: 0;
        				}
        			}
        		}
        	}
        }
        p {
            font-size: 12px;
            color: #999999;
            a {
                font-size: 12px;
                color: #999999;
                text-align: center;
                margin-top: 2px;
                img{
                    margin-left: 10px;
                    width: 8px;
                    height: 14px;
                }
            }
        }
        p:after {
            font-size: 14px;
            width: 20px;
        }
    }
    .acc-man {
    	padding: 0 20px;
        width: 100%;
        display: block;
        position: relative;
        @include flexbox();
        @include align-items(center);
        padding-top: 15px ;
        .bottom-line{
        	padding-bottom: 15px;
            width: 100%;
            overflow: hidden;
            font-size: 15px;
            color: #333333;
            line-height: 30px;
            margin-left: 17px;
            border-bottom: 1px solid #F1F1F1;
            @include flexbox();
            @include align-items(center);
            @include justify-content(space-between);
            &.meixian{
            	border:none
            }
        }
        .img-box-mine{
        	margin-bottom: 15px;
            height: 35px;
            img {
                display: block;
                width: 25px;
                margin-top: 5px;
            }
        }
        .acc-man-right {
            margin-left: 18px;
            height: 30px;
            float: right;
            @include flexbox();
            @include align-items(center);
            img{
                width: 10px;
                height: 16px;
            }
        }
    }
}
</style>