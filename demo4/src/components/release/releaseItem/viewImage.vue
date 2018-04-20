<template>
	<div class="viewImage-container">
		<header>
			<div>
				<router-link :to="{name: 'release'}">
					<img src="../releaseItem/img/leftback.png" alt="" />
				</router-link>
			</div>
			<div class="font16"></div>
		</header>
		<div class="img-content">
			<img :src="img" alt="" />
		</div>
		<div class="setmian-img font16" @click="setMainImage">设为主图</div>
	</div>
</template>

<script>
	export default{
        data(){
            return {
            	img:'',//图片地址
            	index:'',//图片下标
        	}
        },
        methods:{
        	//设置主图
        	setMainImage:function(){
        		this.$router.push({path:'/release'});
        	},
        },
        mounted(){
        	this.img = this.$route.params.img;
        	this.index = this.$route.params.index;
        }
    }
</script>

<style scoped type="text/css" lang="scss">
	.viewImage-container{
		position: fixed;
	    top: 0px;
	    left: 0px;
	    background-color: #000;
	    z-index: 1000;
	    width: 100%;
	    height: 100%;
	    header{
	    	border: 0px;
	    	background-color: #000;
	    	z-index: 1000;
	    	color: #FFF;
	    }
	    .img-content{
	    	width: 100%;
	    	height: 100%;
	    	display: flex;
	    	justify-content: center;
	    	align-items: center;
	    }
	    .setmian-img{
	    	position: fixed;
	    	bottom: 0px;
	    	width: 100%;
	    	padding: 20px 0px;
	    	background-color: #000;
	    	color: #FECE38;
	    	text-align: center;
	    	letter-spacing: 2px;
	    }
	}
	
</style>