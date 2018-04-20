<template>
	<div class="selectCategoryBox">
		<header>
			<div>
				<div @click="back">
					<img src="../releaseItem/img/leftback.png" alt="" />
				</div>
			</div>
			<div class="title">
				<p>类目</p>
			</div>
			<div></div>
		</header>
		<div class="choiceCategory">
			<ul>
				<li v-for="(item,index) in list" @click="getCategory(item.name,item.id,index)">
					<span v-html="item.name"></span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
  import axios from 'axios';
  import {fetch} from "assets/js/merge.js"
  
  export default{
    data(){
      return {
      	list:[],//类目
      	categoryPId:0,//父类编号
      	prePId:0,//上级父类编号
      }
    },
    methods: {
    	back(){
    		if(this.categoryPId==0){
    			this.$router.push({name:'release'});
    		}else{
    			this.getCategory("",this.prePId);
    		}
    	},
    	//获取类目信息 name:所选名称，id:所选编号
    	getCategory(name,id,index){
			var _this = this;
			var param = {
				from: 'WX',
				goodsType:2,
			}
			if(!id){//如果id为空，则还没选，此时需要拿最顶级
				param.searchType = 1;
			}else{
				param.searchType = 2;
				param.categoryParentId = id;
			}
			fetch("wagoods/getGoodsCategoryList",
				param
			).then((res)=>{
				if(res.rescode == '00000'){
					if(res.list && res.list.length>0){
						this.list = res.list;
						this.prePId = this.categoryPId;
						this.categoryPId = res.list[0].parentId;//设置父分类编号
					}else{//已经没有下一级，此时需要结束选择类目
						var parm = {
								categoryName:name,
								categoryId:id,
								applicable:this.list[index].applicatInfo,
							}
						sessionStorage.setItem('params',JSON.stringify(parm));
						this.$router.push({name:'release'});
					}
				}else{
					Toast({
					    message: res.resmsg,
					    position: 'bottom',
					    duration: 2000
					});	
				}
			})
    	}
    },
    created () {
    	this.getCategory();
    },
  }
</script>

<style scoped type="text/css" lang="scss">
	.selectCategoryBox{
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
		display: flex;
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
	.choiceCategory{
		width: 100%;
		ul{
			padding:0 20px;
			border-top: 55px solid #F5F6F6;
			li{
				padding: 18px 0;
				font-size: 15px;
				color: #333333;
				border-bottom: 1px solid #E5E5E5;
			}	
		}
	}
</style>