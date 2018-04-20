<template>
	<div class="whiteBkg">
		<div class="width900 blockC PT60  MB80 PB80 MB100">
			<p class="font16 textL color33333">交易记录</p>
			<div class="MT40 table clearfix">
				<div class="th fl"><span class="inlineB width100 lineHeightInitial borderRightG">交易时间</span></div>
				<div class="th fl"><span class="inlineB width100 lineHeightInitial borderRightG">交易类型</span></div>
				<div class="th fl"><span class="inlineB width100 lineHeightInitial borderRightG">交易金额(元)</span></div>
				<div class="th fl"><span class="inlineB width100 lineHeightInitial ">交易状态</span></div>
				<ul class="tbody">
					<li class="tr clearfix" v-for='(item,index) in tradeList' :key="index">
						<div class="td fl">{{item.tradeTime}}</div>
						<div class="td fl">{{item.tradeTypeStatus}}</div>
						<div class="td fl" v-bind:class="{'-1':'colorRed'}[item.transDirection]">{{item.transAmount}}</div>
						<div class="td fl">{{item.tradeStatus | tradeStatus}}</div>
					</li>
				</ul>
			</div>
			<!--无交易记录显示-->
			<div v-if="tradeList.length <= 0" class="noRecord">
				暂无交易记录
			</div>
			<!--查看更多-->
			<div v-if="tradeList.length > 0" class="more" @click="seeMore">
				点击查看更多
			</div>
		</div>
	</div>

</template>

<script>
	import 'assets/css/animate.min.css'
	import { clientRequest } from 'api/ddjrClientApi'
	import { errorMessage } from 'assets/js/merge.js';
	var ERR_OK = '0000';
	export default {
		data() {
			return {
				tradeList: [],
				token: '',
				current: 1

			}
		},
		methods: {
			getTradeList(current) {
				let options = {};
				options.current = current;
				options.pageSize = '10';
				let opt = {
					'functionId': 'tradeList',
					'data': JSON.stringify(options)
				};
				clientRequest(opt, this.token).then(res => {
					if(res.resCode == ERR_OK) {
						console.log(res);
						this.tradeList = this.tradeList.concat(res.records);
						this.totalPage = res.pages;
					}
				})
			},
			//查看更多
			seeMore() {
				this.current += 1;
				if(this.current > this.totalPage) {
					errorMessage('没有更多了');
					return;
				}
				this.getTradeList(this.current);
			},
			getCookie: function(cookieName) { // 获取cookie   从cookie中获取 userId
				const strCookie = document.cookie;
				const arrCookie = strCookie.split("; ");
				for(let index in arrCookie) {
					const arr = arrCookie[index].split("=");
					if(cookieName == arr[0]) {
						return arr[1];
					}
				}
				return "";
			}
		},
		filters: {
			tradeStatus(value) {
				switch(value) {
					case '1':
						return '处理中';
						break;
					case '2':
						return '交易完成';
						break;
					case '3':
						return '交易失败';
						break;
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				var _this = this;
				this.token = JSON.parse(_this.getCookie("userCookie")).token;
				this.getTradeList(1);
			});
		}
	}
</script>

<style>
	.colorRed {
		color: red;
	}
	
	.color33333 {
		color: #333333;
	}
	
	.width900 {
		width: 900px;
	}
	
	.table {
		width: 100%;
		text-align: center;
		border: none;
		color: #9B9B9B;
	}
	
	.table .th {
		height: 80px;
		line-height: 80px;
		text-align: center;
		border: none;
		width: 25%;
		border-top: 1px solid gainsboro;
		border-bottom: 1px solid gainsboro;
		background: #F5F6FA;
		color: #333333;
	}
	
	.table .td {
		width: 25%;
		height: 65px;
		line-height: 65px;
		text-align: center;
		border: none;
		border-bottom: 1px solid gainsboro;
	}
	
	.table .tr:hover {
		background: #F5F6FA;
	}
	
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
	
	.noRecord {
		color: #4287F2;
		height: 150px;
		line-height: 150px;
		position: relative;
		padding-bottom: 250px;
	}
	
	.noRecord:after {
		content: '';
		display: inline-block;
		position: absolute;
		width: 100%;
		height: 1px;
		top: 150px;
		left: 0;
		background: #CCC;
	}
	
	.lineHeightInitial {
		line-height: initial;
	}
	
	.borderRightG {
		border-right: 1px solid gainsboro;
	}
</style>