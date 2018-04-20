<template>
	<div>
		<div class="searchInput">
			<form action="">
				<input type="search" name="" id="" v-model='searchValue' @keydown.enter="goGoodList(searchValue,$event)" class="searchInput" :placeholder="placeholder">
			</form>
			<router-link :to="{name: 'home'}" tag="span" class="inlineB fl">
				<img src="../../assets/img/close.png" class="close">
			</router-link>
			<img src="../../assets/img/searchIcon.jpg" class="searchIcon">
		</div>
		<!--最近搜索-->
		<div class="width100" v-if='userId'>
			<div class="backgroundF5F6F6">
				<p class="paddingRightLeft20px  blockC height100 height45px lineHeight45px wordColor999999 fontSize14px ">最近搜索</p>
			</div>
			<ul class="searchContent clearfix blockC width80">
				<li v-for='item in tmpList' @click='goGoodList(item.searchName)'>
					<p v-title="item.searchName">{{item.searchName}}</p>
				</li>
				<li>
					<p>胖虎之拳</p>
				</li>

			</ul>
		</div>

		<!--热门搜索-->
		<div class="width100" v-if='!userId'>
			<div class="backgroundF5F6F6">
				<p class="paddingRightLeft20px  blockC height100 height45px lineHeight45px wordColor999999 fontSize14px">热门搜索</p>
			</div>
			<ul class="searchContent clearfix blockC width80">
				<li v-for='item in tmpList' @click='goGoodList(item.searchName)'>
					<p>{{item.searchName}}</p>
				</li>
				<li>
					<p>胖虎之拳</p>
				</li>
				<li>
					<p>胖虎之拳</p>
				</li>
				<li>
					<p>胖虎之拳</p>
				</li>
				<li>
					<p>胖虎之拳</p>
				</li>
			</ul>
		</div>

	</div>

</template>

<script>
	//	1:最近搜索关键字 
	//	2:热门搜索关键字  
	import { searchHotRecent } from '../../api/navSearch.js';
	export default {
		created() {
			var _this = this;
			if(this.userId) {
			    this.textType = 1;
			} else {
				this.textType = 2;
			}

			//接口-搜索
			searchHotRecent(this.textType).then(
				function(res) {
					_this.tmpList = res.list;
					_this.placeholder = _this.tmpList[0].searchName;
				},
				function(error) {

				});
		},
		data() {
			return {
				searchValue: '', //输入框的值
				userId: false, //进来先判断用户是否登录  false默认未登录
				textType: 1, //登录传值1 未登录传2		
				tmpList: [], //存储返回的数据
				placeholder: '搜索你的机型'
			}
		},
		mounted() {
			//全局禁掉所有enter默认事件
			$('input').keydown(function(event) {
				if(event.keyCode == 13) {
					return false;
				}
			})
		},
		methods: {
			goGoodList(selectContent, $event) {
					this.$router.push({
						path: '/goodsItem',
						query: { searchValue: selectContent }
					});
			},
			clearInput() {
				this.searchValue = null;
			}
		}
	}
</script>

<style lang="scss" scoped="">
	/*基础类*/
	
	.height45px {
		height: 45px;
	}
	.paddingRightLeft20px{
		padding:0 20px;
	}
	.lineHeight45px {
		line-height: 45px;
	}
	
	.height80px {
		height: 60px;
	}
	
	.height100 {
		height: 100%;
	}
	
	.lineHeight60px {
		line-height: 60px;
	}
	
	.backgroundF5F6F6 {
		background: #F5F6F6;
	}
	
	.marginBottom10px {
		margin-bottom: 10px;
	}
	
	.wordColor999999 {
		color: #999999;
	}
	
	.fontSize20px {
		font-size: 20px;
	}
	
	.fontSize18px {
		font-size: 18px;
	}
	
	.fontSize14px {
		font-size: 14px;
	}
	
	.wordColor333333 {
		color: #333333;
	}
	
	.back {}
	
	.searchInput {
		height: 30px;
		position: relative;
		padding: 10px 20px;
		box-sizing: initial;
		form {
			height: 100%;
			input {
				width: 85%;
				height: 100%;
				background: #F4F4F4;
				border-radius: 85px;
				border: none;
				box-sizing: border-box;
				padding: 10px 20px 10px 50px;
				font-size: 12px;
			}
		}
		.searchIcon {
			width: 20px;
			height: 20px;
			display: block;
			position: absolute;
			left:35px;
			top: 15px;
		}
		.close {
			width:16px;
			height:16px;
			display: block;
			position: absolute;
			right:20px;
			top:17px;
		}
	}
	/*搜索内容*/
	
	.searchContent {
		background: #FFFFFF;
		li {
			display: inline-block;
			width: 50%;
			float: left;
			text-align: left;
			font-size: 16px;
			color: #333333;
			margin: 10px 0px 10px 0px;
			p {
				height: 40px;
				text-align: left;
				margin: 0 auto;
				text-overflow: ellipsis;
			}
		}
		li:nth-child(even) {
			p {
				padding-left: 40%;
				height: 40px;
				text-align: left;
				margin: 0 auto;
				text-overflow: ellipsis;
			}
		}
	}
</style>