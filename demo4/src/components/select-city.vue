<template>
  <div id="city" v-on:touchend="clear">
  	<header class="model-evaluation" style="z-index: 999;">
			<router-link :to="{name:'index.home'}" class="top-router-back">
				<img src="../image/leftArrow.png" alt="" />
				<h1 class="mui-title">选择城市</h1>
			</router-link>
	  </header>
  	
    <div id="cityscroll">
	  	<div id="rightside" v-on:touchmove="scroll2">
	  		<div class="letter" v-for="(m,n,l) in city" v-on:touchstart="scroll1(l)" :id="'let'+l" >{{n}}</div>
	  	</div>
	  	<div v-for="(v,k) in city" :id="k" class="leftSelect">
	  		<p>{{k}}</p>
	  		<ul>
	  			<li v-for="v0 in v" @click="haschoose(v0.cityName,v0.cityId)" style="z-index: 999;">
	  				{{v0.cityName}}
	  			</li>
	  		</ul>
	  	</div>
    </div>
  	
  </div>
</template>

<script>

import cityData from '../js/cityData2.js'
export default {
  name: 'city',
  data () {
    return {
      city:cityData.cityData3,
      num0:0,
      choose:cityData.choose
     
    }
  },
  watch:cityData.w1,
  mounted:function(){
  	this.choose.step=document.querySelector('.letter').offsetHeight;
  //console.log(document.querySelector('.letter').offsetHeight)
  },
  methods:{
  	haschoose(a,b){
  		sessionStorage.setItem('city',JSON.stringify({cityName:a,cityId:b}));
  		window.history.back();
  	},
  	scroll1:cityData.s1,
  	scroll2:cityData.s2,
  	clear:cityData.c1
  }
}

</script>

<style scoped="">
	header{
		background: #F5F6F6;
		font-weight: bold;
		border-bottom: 1px solid #E5E5E5;
	}
	#city{
		background: #F5F6F6;
		height: 100vh;
		overflow-y: scroll;
	}
	#rightside{
		position: fixed;
		top: 0;
		right: 0;
		z-index: 100;
		text-align: center;
		background: #FFF;
		padding: .6rem 0;
		height: 100%;
	}
	.leftSelect ul{
		background: #fff;
		padding-left: .21rem;
	}
	.leftSelect p{
		display: block;
		padding-left: ;
		padding: .04rem 0 .04rem .21rem;
		font-size: .14rem;
		color: #999999;
	}
	.letter{
		height: .15rem;
		background: #FFF;
		color: #999999;
	}
	li{
		width: 100%;
		font-size: .14rem;
		color: #999999;
		padding: .1rem 0;
	}
	
</style>
