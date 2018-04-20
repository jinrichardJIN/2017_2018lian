<template>
	<div>
		<div class="searchInput">
			<i class="back"></i>
			<input type="text" name="" id="" v-model='searchValue' @keyup.enter="goGoodList(searchValue)" class="searchInput" placeholder="搜索你的机型">
			<img src="../assets/img/closeNoBKG.png" class="close" @click='clearInput()'>
			<img src="../assets/img/searchIcon.jpg" class="searchIcon" >
		</div>
		<!--最近搜索-->
		<div class="width100 backgroundF5F6F6" v-if='userId'>
			<p class="width85 blockC height100 height80px lineHeight60px wordColor999999 fontSize14px ">最近搜索</p>
			<ul class="searchContent clearfix blockC">
				<li v-for ='item in tmpList' @click='goGoodList(item.searchName)'>
					<p v-title="item.searchName">{{item.searchName}}</p>
				</li>
				<li><p>胖虎之拳</p></li>
				
			</ul>
		</div>
		<!--热门搜索-->
		<div class="width100  backgroundF5F6F6" v-if='!userId'>
			<p class="width85 blockC height100 height80px lineHeight60px wordColor999999 fontSize14px">热门搜索</p>
			<ul class="searchContent clearfix blockC">
				<li v-for ='item in tmpList'>
					<p>{{item.searchName}}</p>
				</li>
			</ul>
		</div>
		
		
	
	</div>
	
</template>

<script>
//	1:最近搜索关键字 
//	2:热门搜索关键字  

	
	import {searchHotRecent} from '../api/navSearch.js';
	export default {
		created(){
			var _this = this;
			if(this.userId){
				this.textType = 1;
			}else{
				this.textType = 2;
			}
			
			//接口-搜索
			searchHotRecent(this.textType).then(
			function(res){
				_this.tmpList = res.list;
			},function(error){
				
			});
		},
		data(){
			return{
				searchValue:'',			//输入框的值
				userId:false,			//进来先判断用户是否登录  false默认未登录
				textType:1,				//登录传值1 未登录传2		
				tmpList:[],              //存储返回的数据
			}
		},
		mounted(){
			
		},
		methods:{
			goGoodList(selectContent){
				
			},
			clearInput(){
				this.searchValue = null;
			}
		}
	}
</script>

<style lang="scss" scoped="">
	/*基础类*/
	.height80px{
		height:60px;
	}
	.height100{
		height:100%;
	}
	.lineHeight60px{
		line-height:60px;
	}
	.backgroundF5F6F6{
		background:#F5F6F6;
	}
	.marginBottom10px{
		margin-bottom:10px;
	}
	.wordColor999999{
		color:#999999;
	}
	.fontSize20px{
		font-size:20px;
	}
	.fontSize18px{
		font-size:18px;
	}
	.fontSize14px{
		font-size:14px;
	}
	.wordColor333333{
		color:#333333;
	}
	.back{
		
	}

	.searchInput{
		height:40px;
		width:85%;
		margin:0 auto;
		position:relative;
		padding:10px 0;
		box-sizing: initial;
		input{
			width:85%;
			height:100%;
			background:#F4F4F4;
			border-radius:85px;
			border:none;
			box-sizing:border-box;
			padding:10px 20px 10px 50px;
			font-size:12px;
		}
		.searchIcon{
			width:20px;
			height:20px;
			display:block;
			position:absolute;
			left:10px;
			top:20px;
		}
		.close{
			width:30px;
			height:30px;
			display:block;
			position:absolute;
			right:0px;
			top:15px;
		}
		
	}
	/*搜索内容*/
	.searchContent{
		background:#FFFFFF;
		li{
			display:inline-block;
			width:50%;
			float:left;
			text-align:left;
			font-size:16px;
			color:#333333;
			margin:10px 0px 10px 0px;
			p{
				height:40px;
				width:50%;
				text-align:left;
				margin:0 auto;
				text-overflow: ellipsis;
			}
			
		}
	}
	
</style>