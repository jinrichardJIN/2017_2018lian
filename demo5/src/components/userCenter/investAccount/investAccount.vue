<template>
	<div class="investAccount">
		<!--同一级-->
		<div class="whiteBkg paddingTop60">
			<div class="clearfix PB50 borderBottomG width900 blockC ">
				<div class="fl width50">
					<p class="MB20 font30 color4287f2">{{userInfo.totalAmount | numFormat}}</p>
					<p class="font16 color9B9B9B">投资总资产（元）</p>
				</div>
				<div class="fl width50">
					<p class="marginBottom37 font30 color4A4A4A">{{userInfo.balance | numFormat}}</p>
					<p class="font16 color9B9B9B">可用余额（元）</p>
				</div>
			</div>
			<div class="MT50 paddingLeftRight5 PB45 ">
				<span class="inlineB width30 textL">
  						<span class="color9B9B9B font16">在投资产（元）：</span><span class="font22 color33333">{{userInfo.amount | numFormat}}</span>
				</span>
				<span class="inlineB width30">
  						<span class="color9B9B9B font16">累计收益（元）：</span><span class="font22 color33333">{{totalIncome | numFormat}}</span>
				</span>
				<span class="inlineB width30 textR">
  						<span class="color9B9B9B font16">累计投资（元）：</span><span class="font22 color33333">{{sumInvest | numFormat}}</span>
				</span>
			</div>
		</div>
		<!--同一级-->
		<div class="whiteBkg PB80">
			<div class="MT20 PT50 paddingBottom20 borderBottomG ">
				<div class="blockC clearfix width800">
					<span class="inlineB width30 textL fl ">
  						<a class="cursor inlineB font20" @click='selectStatus(0)' v-bind:class="{true:'sliderOn',false:'sliderOff'}[status==0]">
  							全部&nbsp;&nbsp;&nbsp;&nbsp;
  						</a>
  				</span>
					<span class="inlineB width30 paddingLeftRight5 fl font20 ">
  						<a class="cursor inlineB" @click='selectStatus(1)' v-bind:class="{true:'sliderOn',false:'sliderOff'}[status==1]">
  							处理中
  						</a>
  				</span>
					<span class="inlineB width30 textR fl font20 ">
  						<a class="cursor inlineB" @click='selectStatus(2)' v-bind:class="{true:'sliderOn',false:'sliderOff'}[status==2]">
  							回款中
  						</a>
  				</span>
				</div>
			</div>
			<div>
				<ul class="">
					<li class="PT50 PB50 borderBottomG" v-for='(item,key) in orderList' :key="key">
						<div class="width800 blockC">
							<p class="clearfix height40">
								<span class="fl font22 color4287f2" v-text='item.productName'>零用贷0812</span>
								<span class="fl color4287f2 borderRadius18 ML20" v-text='{1:"处理中",2:"回款中",3:"已完成 ",4:"投资失败",5:"转让审核中",6:"转让中",7:"已转让"}[item.disposeState]'>回款中</span>
								<span class="fr color4287f2 cursor" @click='seeContract(item.orderId,item.disposeState)' v-text='{1:"相关合同（生成中）",2:"查看合同>"}[item.disposeState]'></span>
							</p>
							<div class="MT50 clearfix">
								<div class="width25 fl textL borderRightG boxSizing">
									<p class="marginBottom14 color33333">{{item.investAmount | numFormat}}</p>
									<p class="font16 color9B9B9B">投资金额（元）</p>
								</div>
								<div class="width25 fl borderRightG boxSizing">
									<p class="marginBottom14 color33333" v-text=''>{{item.annualRate}}%</p>
									<p class="font16 color9B9B9B">年化利率</p>
								</div>
								<div class="width25 fl borderRightG boxSizing">
									<p class="marginBottom14 color33333" v-text='item.endDate||"—"'></p>
									<p class="font16 color9B9B9B">到期日期</p>
								</div>
								<div class="width25 fl textR  boxSizing">
									<p class="marginBottom14 color4287f2 cursor" @click='look(key,1,item.orderId,item.productId)' v-if='!orderList[key]["orderDetail"]'>查看<span class="down-arrow"></span></p>
									<p class="marginBottom14  color33333 cursor" @click='look(key,2)' v-if='orderList[key]["orderDetail"]'>收起<span class="up-arrow"></span></p>
									<p class="font16 color9B9B9B">资产详情</p>
								</div>
							</div>
						</div>
						<!--订单详情-->
						<div class="width800 blockC PT40" v-if='orderList[key]["orderDetail"]==true'>
							<p class="textL font16 color33333">订单详情</p>
							<div class="clearfix color9B9B9B">
								<div class="width30 fl textL font14">
									<p class="PT40">投资金额（元）：<span>{{item.orderDetailObj.investAmount | numFormat}}</span></p>
									<p class="PT40">年化利率：<span v-text='item.orderDetailObj.annualRate'></span>%</p>
									<p class="PT40">还款方式：<span v-text='item.orderDetailObj.repaymentType'></span></p>
									<p class="PT40">到期日期：<span v-text='item.orderDetailObj.endDate||"—"'></span></p>
								</div>
								<div class="width30 paddingLeftRight5 fl textL">
									<p class="PT40">预期收益（元）：<span v-text=''>{{item.orderDetailObj.expectedReturn | numFormat}}</span></p>
									<p class="PT40">投资日期：<span v-text='item.orderDetailObj.investDate'></span></p>
									<p class="PT40">订单号：<span v-text='item.orderDetailObj.orderIdDesc'></span></p>
									<p class="PT40">投资期限：<span v-text='item.orderDetailObj.remanDays'></span></p>
								</div>
								<div class="width30 fl textL">
									<p class="PT40">待收本金（元）：<span v-text=''>{{item.orderDetailObj.dueInAmt | numFormat}}</span></p>
									<p class="PT40">起息日期：<span v-text='item.orderDetailObj.valueDate'></span></p>
									<p class="PT40">借款总额（元）：<span v-text=''>{{item.orderDetailObj.contactAmount | numFormat}}</span></p>
								</div>
							</div>
							<div class="MT80 ">
								<p class="textL font16 color33333">回款计划</p>
								<div class="">
									<table class="MT30 " border="" cellspacing="" cellpadding="">
										<tr>
											<th><span class="inlineB width100 lineHeightInitial borderRightG">应还时间</span></th>
											<th><span class="inlineB width100 lineHeightInitial borderRightG">状态</span></th>
											<th><span class="inlineB width100 lineHeightInitial borderRightG">本金（元）</span></th>
											<th><span class="inlineB width100 lineHeightInitial ">收益（元）</span></th>
										</tr>
										<tbody class="">
											<tr v-for='value in item.table'>
												<td v-text='value.repayDate'></td>
												<td v-text='value.repayFlag'>Data</td>
												<td v-text=''>{{value.repayPrincipal | numFormat}}</td>
												<td v-text=''>{{value.repayInterest | numFormat}}</td>
											</tr>
										</tbody>
									</table>
									<div class="MT50 color4287f2 blockC" v-if="item.table.length==0">
										暂时没有数据可以显示
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="MT50 color4287f2 blockC" v-if="orderList.length==0">
					暂时没有数据可以显示
				</div>
				<!--查看更多-->
				<div class="more" @click='seeMore()' v-if='orderList.length>0'>
					点击查看更多
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import 'assets/css/animate.min.css';
	import { clientRequest } from 'api/ddjrClientApi';
	import { errorMessage } from 'assets/js/merge.js';
	import { getRealPath, PD, ajaxRequest } from 'assets/js/merge.js';
	export default {
		data() {
			return {
				token: JSON.parse(this.getCookie('userCookie')).token,
				orderDetail: {
					investAmount: '', //投资金额，
					expectedReturn: '', //预期收益
					dueInAmt: '', //待收本金
					annualRate: '', //年化利率
					investDate: '', //投资日期
					valueDate: '', //起息日期
					repaymentType: '', //还款方式
					orderId: '', //订单号
					contactAmount: '', //借款总额
					endDate: '', //到期日期
					remanDays: '' //投资期限
				},
				userInfo: {
					totalAmount: 0.00,
					balance: 0.00,
					amount: 0.00

				},
				current: 1,
				currentPlan: 1,
				table: [],
				orderList: [],
				status: 0,
				totalPage: '',
				totalPagePlan: '',
				sumInvest: '0.00',
				totalIncome: '0.00',
				url: getRealPath(),
			}
		},
		created() {
			//初始化用户信息
			var random  = new Date().getTime();
			var opt = {
				'functionId': 'myAccount',
				'data': JSON.stringify({
					random:random
				})
			}
			clientRequest(opt, this.token).then(res => {
				if(res.resCode == '0000') {
					this.userInfo = res.record;
				} else {
					this.errText = res.resMsg;
				}
			});
			//订单信息
			var _this = this;
			_this.initialList(0, 1);
		},
		methods: {
			//查看订单详情
			look(index, status, orderId, productId) {
				var _this = this;
				this.$set(this.orderList[index], 'orderDetail', !this.orderList[index].orderDetail);

				if(status == 1) {
					//详情
					var opt1 = {
						'functionId': 'orderDetail',
						'data': JSON.stringify({
							orderId: orderId,
							productId: productId,
						})
					}
					clientRequest(opt1, this.token).then(res => {
						if(res.resCode == '0000') {
							this.orderList[index].orderDetailObj = res.record;

						} else {
							this.errText = res.resMsg;
						}
					});
					_this.plan(orderId, index);
				} else {

				}
			},
			//还款计划
			plan(orderId, index) {
        var opt1 = {
          'functionId': 'trusteeCreditRepayPlan',
          data: JSON.stringify({
            orderId: orderId,
            current: 1,
            pageSize: 1000
          })
        }
        clientRequest(opt1, this.token).then(res => {
          if(res.resCode == '0000') {
            if(res.resCode == '0000') {
              this.orderList[index].table = this.orderList[index].table.concat(res.records);
              this.orderList[index].total = res.pages;
            }

          } else {
            this.errText = res.resMsg;
          }
        });
			},
			//还款计划
			seeMorePlan(orderId, index) {
				this.orderList[index].current += 1;
				if(this.orderList[index].current > this.orderList[index].total) {
					errorMessage('没有更多了');
					return;
				}
				var opt2 = {
					'functionId': 'trusteeCreditRepayPlan',
					'data': JSON.stringify({
						orderId: orderId,
						current: this.orderList[index].current,
						pageSize: 1000

					})
				}
				clientRequest(opt2, this.token).then(res => {
					if(res.resCode == '0000') {
						this.orderList[index].table = this.orderList[index].table.concat(res.records);
						this.orderList[index].total = res.pages;
					} else {
						this.errText = res.resMsg;
					}
				}, 1000);
			},
			//列表筛选
			selectStatus(status) {
				this.orderList = [];
				this.current = 1;
				this.status = status;
				this.initialList(status, 1);
			},
			//加载列表数据
			initialList(status, current) {
				var opt1 = {
					'functionId': 'myAssetsList',
					'data': JSON.stringify({
						current: current,
						pageSize: 5,
						statusType: status
					})
				}
				clientRequest(opt1, this.token).then(res => {
					if(res.resCode == '0000') {
						for(let i = 0; i < res.records.length; i++) {
							this.$set(res.records[i], 'orderDetail', false);
							this.$set(res.records[i], 'table', []);
							this.$set(res.records[i], 'current', 1);
							this.$set(res.records[i], 'total', '');
							this.$set(res.records[i], 'orderDetailObj', {});
						}
						this.orderList = this.orderList.concat(res.records);
						this.totalPage = res.pages;
						this.sumInvest = res.record.sumInvest;
						this.totalIncome = res.record.totalIncome;

					} else {
						this.errText = res.resMsg;
					}
				});
			},
			//查看更多
			seeMore() {
				this.current += 1;
				if(this.current > this.totalPage) {
					errorMessage('没有更多了');
					return;
				}
				this.initialList(this.status, this.current);
			},
			//获取cookie
			getCookie(name) {
				var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
				if(arr != null) {
					return unescape(arr[2]);
				} else {
					return null;
				}
			},
			//查看合同
			seeContract(id, status) {
				if(status == 1) {
					return;
				}
				var opt1 = {
					'functionId': 'orderAfterSalesAgreement',
					'data': JSON.stringify({
						orderId: id
					})
				}
				clientRequest(opt1, this.token).then(res => {
					if(res.resCode == '0000') {
						window.location.href = res.record.pdfPath || res.record.htmlPath;
					} else {

					}
				});
			}
		},
		filters: {
			//金额千分位转换函数（带小数点后两位）
			//money 类型为string 或 number, 调用：numFormat(10000)或numFormat('10000');
			numFormat: function(m) {
				var m2 = parseFloat(m);
				if(isNaN(m2)) {
					return false;
				}
				var num = m2 + ""
				var re = /([0-9]+\.[0-9]{2})[0-9]*/;
				var m2 = num.replace(re, "$1")
				var money = m2.toString();
				var pos_decimal = money.indexOf('.');
				if(pos_decimal < 0) {
					pos_decimal = money.length;
					money += '.';
				}
				while(money.length <= pos_decimal + 2) {
					money += '0';
				}
				if(typeof money == "number") money = money.toString();
				return money.replace(/^(\d+)((\.\d+)?)$/, function(v1, v2, v3) {
					return v2.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,') + (v3 || '.00');
				});
			}
		}
	}
</script>

<style lang="scss" scoped="">
	::-webkit-scrollbar {
		display: none;
	}

	.fontSize40 {
		font-size: 40px;
	}

	.fontSize22 {
		font-size: 22px;
	}

	.color33333 {
		color: #333333;
	}

	.color9B9B9B {
		color: #9B9B9B;
	}

	.color4287f2 {
		color: #4287f2;
	}

	.color4A4A4A {
		color: #4a4a4a;
	}

	.borderRadius18 {
		border-radius: 18px;
		border: 1px solid #4287f2;
		width: 80px;
		height: 25px;
		line-height: 25px;
		margin-top: 7.5px;
	}

	.height40 {
		height: 40px;
		line-height: 40px;
	}

	.lineHeightInitial {
		line-height: initial;
	}

	.MT80 {
		margin-top: 80px;
	}

	.paddingBottom20 {
		padding-bottom: 20px;
	}

	.marginBottom37 {
		margin-bottom: 37px;
	}

	.marginBottom14 {
		margin-bottom: 14px;
	}

	.margingTop90 {
		margin-top: 90px;
	}

	.paddingBottom88 {
		padding-bottom: 88px;
	}

	.borderBottomG {
		border-bottom: 1px solid gainsboro;
	}

	.borderRightG {
		border-right: 1px solid gainsboro;
	}

	.paddingLeftRight5 {
		padding: 0 5%;
	}

	.PB130 {
		padding-bottom: 130px;
	}

	.paddingTop60 {
		padding-top: 60px;
	}

	.paddingTop65 {
		padding-top: 65px;
	}

	.paddingBottom65 {
		padding-bottom: 65px;
	}

	.paddingTop180 {
		padding-top: 180px;
	}

	.investAccount {
		margin: 0 auto;
		padding-bottom: 105px;
	}

	.width900 {
		width: 900px;
	}

	.width800 {
		width: 800px;
	}

	.PB45 {
		padding-bottom: 45px;
	}

	table {
		width: 100%;
		text-align: center;
		border: none;
		color: #9B9B9B;
	}

	table th {
		height: 80px;
		line-height: 80px;
		text-align: center;
		border: none;
		border-top: 1px solid gainsboro;
		border-bottom: 1px solid gainsboro;
		background: #F5F6FA;
		color: #333333;
	}

	table td {
		width: 25%;
		height: 65px;
		line-height: 65px;
		text-align: center;
		border: none;
		border-bottom: 1px solid gainsboro;
	}

	table tr:hover {
		background: #F5F6FA;
		color: #333333;
	}

	.sliderOn {
		color: #333333;
		position: relative;
	}

	.sliderOn:after {
		content: '';
		position: absolute;
		height: 3px;
		width: 90px;
		left: -25px;
		bottom: -20px;
		background: #4287F2;
	}

	.sliderOff {
		color: #9B9B9B;
	}
	/*加载更多*/

	.more {
		width: 180px;
		height: 40px;
		background: url(/static/img/download.c35c4c0.png) no-repeat;
		background-size: 100% 100%;
		border-radius: 100px;
		line-height: 40px;
		color: #FFFFFF;
		font-size: 16px;
		cursor: pointer;
		z-index: 3;
		text-align: center;
		margin: 0 auto;
		margin-top: 60px;
	}
	/*加载更多*/

	.more1 {
		margin: 0 auto;
		margin-top: 40px;
		width: 100px;
		height: 30px;
		line-height: 30px;
		color: #4287F2;
		border: 1px solid #4287F2;
		border-radius: 20px;
		cursor: pointer;
	}
	/*over*/

	.overFlow {
		height: 400px;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	/*动画*/

	.down-arrow,
	.up-arrow {
		display: inline-block;
		position: relative;
		width: 10px;
		height: 10px;
		margin-left: 20px;
	}

	.down-arrow::after,
	.up-arrow::after {
		display: inline-block;
		content: " ";
		height: 8px;
		width: 8px;
		border-width: 0 1px 1px 0;
		border-color: #4287F2;
		border-style: solid;
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		transform-origin: center;
		transition: transform .3s;
		position: absolute;
		top: 70%;
		right: 10px;
		margin-top: -10px;
	}

	.up-arrow::after {
		transform: rotate(-135deg);
		transform-origin: center;
		top: 110%;
		border-color: #333333;
	}
</style>
