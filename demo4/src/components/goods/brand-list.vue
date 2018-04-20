<template>
	
</template>

<script>
import axios from 'axios';
export default {
	
	data() {
		return {
			brandList:[],
			categoryId:[]
		}
	},
	created () {
      //获取商品所属分类
		/**********************机型大全左侧---分类列表******************************/
		var iId = this.$route.query.num;
		this.categoryId = iId;
		axios.get('/api/wagoods/getBrandListPage', { params: { from: 'WX' ,pageSize:'100',categoryId:this.categoryId} })
		.then((data)=> {
			var oData = data.data
			this.brandList = oData.list;
		})
		.catch((response)=> {
			
		});
    },
	mounted() {
		/***********************左侧点击加class*********************************/
		
		/********************************************************************/		
	}
};	
</script>

<style>
</style>