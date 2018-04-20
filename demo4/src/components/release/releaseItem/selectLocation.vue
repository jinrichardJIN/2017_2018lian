<template>
	<div class="location-container">
		<header>
			<i class="back" v-show="showp" @click="goBack"></i>
			<i class="back" v-show="showc" @click="goPrivince"></i>
			<i class="back" v-show="showa" @click="goCity"></i>
			<div class="title">所在地</div>
			<div></div>
		</header>
		<ul class="location-nav">
			<li v-for="item in dataList">
				<mt-cell :title="item.name" is-link @click.native="getData(item.code,item.name)"></mt-cell>
			</li>
		</ul>
	</div>
</template>

<script>
	import {province} from 'assets/js/city-data.js'
  	import {city} from 'assets/js/city-data.js'
  	import {area} from 'assets/js/city-data.js' 
  export default{
    data(){
      return {
      	dataList:[],//展示的数据集合
      	addressProvince:'',//省
      	addressCity:'',//市
		addressArea:'',//区
		pcode:'',//省code
      	ccode:'',//市code
		acode:'',//区code
		showp:true,//显示返回父组件
		showc:false,//返回省
		showa:false,//返回市
      }
    },
    methods: {
    	//获取数据
    	getData:function(code,name){
    		if(this.showp){
    			if(code){//选择了省
    				this.pcode = code;
    				this.addressProvince = name;
    				this.showp = false;
    				this.showc = true;
    				//此时需要加载市信息
    				var clist = [];
	    			city.forEach(function(d){
	    				if(d.parentId == code){
	    					clist.push(d);
	    				}
	    			});
	    			this.dataList = clist;
    			}else{//没传code，1：刚进来，2：返回回来重新选择省
    				this.dataList = province;
    			}
    		}else if(this.showc){
    			if(code){//此时选择了市，选择后需要加载区信息
    				this.ccode = code;
    				this.addressCity = name;
    				this.showc = false;
    				this.showa = true;
    				var alist = [];
	    			area.forEach(function(d){
	    				if(d.parentId == code){
	    					alist.push(d);
	    				}
	    			});
	    			this.dataList = alist;
    			}else{//返回回来重新选择市
    				var clist = [];
    				var _this = this;
	    			city.forEach(function(d){
	    				if(d.parentId == _this.pcode){
	    					clist.push(d);
	    				}
	    			});
	    			this.dataList = clist;
    			}
    		}else if(this.showa && code){
    			this.acode = code;
    			this.addressArea = name;
    			var parm = {
    				province:this.addressProvince,
    				city:this.addressCity,
    				area:this.addressArea,
    			}
    			sessionStorage.setItem("params",JSON.stringify(parm));
    			this.$router.push({name:'release'});
    			return;
    		}
    	},
    	//返回
    	goBack:function(){
    		this.$router.push({name:'release'});
    	},
    	//返回选择省
    	goPrivince:function(){
    		this.showp = true;
    		this.showc = false;
    		this.getData();
    	},
    	//返回选择省
    	goCity:function(){
    		this.showc = true;
    		this.showa = false;
    		this.getData();
    	}
    },
    created () {
    	this.getData();
    },
  }
</script>

<style scoped type="text/css" lang="scss">
	.location-container{
		position: fixed;
	    top: 0px;
	    left: 0px;
	    background: #FFF;
	    z-index: 1000;
	    width: 100%;
	    height: 100%;
	    padding-top: 45px;
	    header{
	    	z-index: 1000;
	    }
	    .location-nav{
	    	height: 100%;
	    	overflow-y: auto;
    		padding:0px 15px 30px;
    		border-top: 10px solid #F5F6F6;		
	    }	
	}
</style>