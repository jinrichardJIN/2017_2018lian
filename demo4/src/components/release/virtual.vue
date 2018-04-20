<template>
    <div class="release-container textL">
    	<!--头部-->
    	<header class="font16">
    		<i class="back"></i>
    		<p>发布</p>
    	</header>
    	<!--center-container-->
    	<div class="form-group">
	  		<input type="text" maxlength="40" v-model="title" placeholder="标题：最多40字" />
  	 	</div>
		<div class="form-group">
			<textarea rows="5" v-model="description" placeholder="描述一下你的宝贝，交易成功面佣金"></textarea>
			<p class="tip-text font14 textR">还可输入{{compSysnum}}字</p>
		</div>
		<div class="form-group">
			<p class="address">{{address}}</p>
		</div>
		<div class="form-group price">
			<input type="text" v-model="price" maxlength="6"  placeholder="￥0.00"/>
			<span class="tip-text font12">含运费</span>
		</div>
		<!--底部-->
		<div class="subgoods">发布</div>
		<router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
            	title:'',//标题
		      	description:'',//描述
		      	addressProvince:'',//省
		      	addressCity:'',//市
				addressArea:'',//区
				price:'',//价格
        	}
        },
        computed:{
        	//计算可输入字数
        	compSysnum:function(){
        		return 300-this.description.length;
        	}
        },
        methods:{
        	
        }
    }
</script>
<style scoped lang="scss">
	.release-container{
		color:#333333;
		padding: 60px 15px 60px;
		header{
			position: fixed;
			top: 0px;
			left: 0px;
			z-index: 999;
			width: 100%;
			height: 55px;
			padding: 0px 15px;
			background-color: #FFF;
			border-bottom: 1px solid #F5F6F6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			i{	
				width: 25px;
				height: 25px;
				flex-grow: 0;
				display: inline-block;
				background-image: url(../release/img/close.png);
				background-repeat: no-repeat;
				background-position: center;
				background-size: 22px;
			}
		}
		.tip-text{
			color:#CDD1D1;
		}
		.form-group{
			padding: 10px 0px;
		}
		input{
			width: 100%;
			height: 40px;
			border: 1px solid #FFF;
			padding: 5px 10px;
		}
		textarea{
			width: 100%;
			resize: none;
			height: 120px;
			border: 1px solid #FFF;
			padding: 5px 10px;
		}
		.address{
			width: 100%;
			height: 40px;
			padding-left: 35px;
			line-height: 45px;
			background-position: left center;
			background-repeat: no-repeat;
			background-size: 30px;
			background-image: url(../release/img/address.jpg);
		}
		.price{
			border-top: 15px solid #F5F6F6;
			padding: 30px;
			text-align: center;
			position: relative;
			input{
				width: 50%;
				border-bottom: 2px solid #F5F6F6;
				text-align: left;
				padding:10px 30px 10px 10px;
			}
			span{
				position: absolute;
				top: 45px;
    			right: 30%;
			}
			
		}
		.subgoods{
			position: fixed;
			bottom: 0px;
			left: 0px;
			z-index: 100;
			width: 100%;
			height: 55px;
			display: flex;
			font-size: 16px;
			justify-content: center;
			align-items: center;
			background-color: rgba(254,206,56,1);
		}
		.subgoods:active{
			background-color: rgba(254,206,56,0.8);
		}
	}
	
</style>
