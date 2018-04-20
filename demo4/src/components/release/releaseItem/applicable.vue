<!--添加商品——适用-->
<template>
	<div class="applicable-container">
		<div class="app-content">
			<ul class="item-nav">
				<li v-for="(item,index) in dataList" @click="choseApp(index)">
					{{item}}
				</li>
			</ul>
			<div class="cancle" @click="choseApp(-1)">取消</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:['listdata'],
        data(){
            return {
            	dataList:[],
        	}
        },
        methods:{
        	choseApp:function(index){
        		this.$emit("choseapp",index)
        	}
        },
        watch:{
        	listdata(n,o){
        		this.dataList = this.listdata;
        	}
        },
        created(){
        	this.dataList = this.listdata;
        }
    }
</script>

<style scoped type="text/css" lang="scss">
	.applicable-container{
		position: fixed;
	    top: 0px;
	    left: 0px;
	    background-color: rgba(0,0,0,0.5);
	    z-index: 1000;
	    width: 100%;
	    height: 100%;
	    .app-content{
	    	padding: 30px 10%;
	    	position: fixed;
	    	bottom: 0px;
	    	width: 100%;
	    	left: 0px;
	    }
	   	.item-nav{
	   		margin-bottom: 20px;
	   		background-color: #FFF;
	   		border-radius: 10px;
	   		padding: 0px 15px;
	   		li{
	   			font-size: 16px;
	   			width: 100%;
	   			text-align: center;
	   			padding: 15px 0px;
	   			border-bottom: 1px solid #EEE;
	   		}
	   		li:last-child{
	   			border-bottom: 0px;
	   		}
	   	} 
	   	.cancle{
	   		padding: 15px 10%;
	   		font-size: 16px;
	   		text-align: center;
	   		background-color: #FFF;
	   		border-radius: 10px;
	   	}
	}
	
</style>