<template>
	<div class="brandChoiceBox">
		<header>
			<div>
				<router-link :to="{name: 'release'}">
					<img src="../releaseItem/img/close.png" alt="" />
				</router-link>
			</div>
			<div class="title">
				<p>品牌</p>
			</div>
			<div>
				
			</div>
		</header>
		<div class="inputBrand">
			<input type="search" placeholder="输入品牌名称" v-model="searchValue" />
		</div>
		<div class="recentlyCreated">
			<p>最近创建</p>
		</div>
		<div class="brand">
			<ul>
				<li v-for="item in newList" @click="choiceBrind(item.brandName,item.brandId)">
					<span v-html="item.brandName">苹果</span>
				</li>
			</ul>
		</div>
		<div class="recentlyCreated">
			<p>热门品牌</p>
		</div>
		<div class="brand">
			<ul>
				<li v-for="hot in hotList" @click="choiceBrind(hot.brandName,hot.brandId)">
					<span v-html="hot.brandName">苹果</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import contextPath from '../../../js/commonUtils.js';
	export default{
        data(){
            return {
            	newList:[],
            	hotList:[],
            	searchValue:'',
            	brandId:'',
        	}
        },
        methods:{
        	choiceBrind(name,id){
        		console.log(name,id);
        		var parm = {
					brandName:name,
					brandId:id
				}
				sessionStorage.setItem('params',JSON.stringify(parm))
				this.$router.push({name:'release'});
        	}
        },
        created(){
        	var _that = this;
	    	this.$nextTick(()=>{
				axios.get(contextPath.contextPath + 'wagoods/getBrandListPage', {
					params: {
						from: 'WX',
						brandType: 2,
						sortMode:2
					}
				})
				.then(function(data) {
					var oData = data.data;
					if(oData.rescode === '00000') {
						this.newList = data.data.list;
					}
				}.bind(this))
				.catch(function(response) {
					
				}.bind(this));
			});
			this.$nextTick(()=>{
				axios.get(contextPath.contextPath + 'wagoods/getBrandListPage', {
					params: {
						from: 'WX',
						brandSale:1,
						brandType:1
					}
				})
				.then(function(data) {
					var oData = data.data;
					if(oData.rescode === '00000') {
						this.hotList = data.data.list;
					}
				}.bind(this))
				.catch(function(response) {
					
				}.bind(this));
			});
        },
        mounted(){
			//确认键触发搜索事件。
			var that = this;
			document.onkeydown = function(event) {
				var e = event || window.event || arguments.callee.caller.arguments[0];
				if(e && e.keyCode == 13) {
					//1.77	用户自建品牌 
					axios.get(contextPath.contextPath + 'wagoods/addBrandByUserId', {
						params: {
							from: 'WX',
							brandName: that.searchValue
						}
					})
					.then((data) => {
						var oData = data.data;
						if(oData.rescode === "00000") {
							console.log(oData);
							that.brandId = oData.brandId
						}
					})
					.catch((err) => {
						console.log(err);
					});
					var parm = {
						brandName:that.searchValue,
						brandId:that.brandId
					}
					sessionStorage.setItem('params',JSON.stringify(parm))
					that.$router.push({name:'release'});
				}
			};
        }
    }
</script>

<style scoped type="text/css" lang="scss">
	.brandChoiceBox{
		position: fixed;
	    overflow-y: scroll;
	    top: 0px;
	    left: 0px;
	    background: #FFF;
	    z-index: 1000;
	    width: 100%;
	    height: 100%;
	}
	header{
		height: 45px;
		align-items: center;
		justify-content: space-around;
		div{
			width: calc(100%/3);
			&:first-child{
				text-align: left;
				img{
					height: 14px;
				}
			}
			&:last-child{
				padding-right: 20px;
			}
			&:nth-child(2){
				p{
					text-align: center;
					font-size: 15px;
					color: #333333;
				}
			}
		}
	}
	.inputBrand{
		border-top: 55px solid #F5F6F6;
		font-size: 15px;
		padding: 18px 20px;
		text-align: left;
		input{
			border: none;
			width: 100%;
		}
		input:-ms-input-placeholder{
            color: #CDD1D1;
        }
        
        input::-webkit-input-placeholder{
            color: #CDD1D1;
        }
	}
	.recentlyCreated{
		font-size: 14px;
		color: #999999;
		padding: 16px 20px;
		background: #F5F6F6;
		text-align: left;
	}
	.brand{
		padding: 15px;
		ul{
			width: 100%;
			text-align: left;
			li{
				margin: 5px 0 10px 10px;
				display: inline-block;
				font-size: 14px;
				color: #333333;
				padding: 9px 17px;
				background: #F5F6F6;
				border-radius: 100px;
			}
		}
	}
</style>