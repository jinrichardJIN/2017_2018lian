<template>
	<div class="">
		<div class="middleFlex">
			<router-link to="/school">go school</router-link>
		    <router-link to="/home">go home</router-link>
		    <router-link to="/office">go office</router-link>
		</div>
	    <router-view></router-view>
	    
	    <swiper :options="swiperOption"  ref="mySwiper">  
	        <!-- 这部分放你要渲染的那些内容 -->  
	        <swiper-slide><img src="../../static/images/iu1.jpg"/></swiper-slide>
	        <swiper-slide><img src="../../static/images/iu2.jpg"/></swiper-slide>  
	        <swiper-slide><img src="../../static/images/iu3.jpg"/></swiper-slide>  
	        <swiper-slide><img src="../../static/images/iu4.jpg"/></swiper-slide>  
	        <swiper-slide><img src="../../static/images/iu5.jpg"/></swiper-slide>  
	        <!-- 这是轮播的小圆点 -->  
	        <div class="swiper-pagination" slot="pagination"></div>  
   		</swiper>  
	    
	    
	    
	 
	</div>
	
	
	
	 
</template>

<script>
	//引入轮播 vue-awesome-swiper
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	
	export default {
		components: {  
            swiper,  
            swiperSlide  
        },  
        data() {  
            return {
            	//配置项
                swiperOption: {  
	                pagination: '.swiper-pagination',  
	                slidesPerView: 'auto',  
	                centeredSlides: true,  
	                paginationClickable: true,  
	                spaceBetween: 30,
	                effect:'cube',
	                paginationType:'progress',
	                onSlideChangeEnd: swiper => {  
	                    //这个位置放swiper的回调方法  
	                    this.page = swiper.realIndex+1;  
	                    this.index = swiper.realIndex;  
	                },
	                swiperSlides: [1, 2, 3, 4, 5] 
                }  
                 
            }  
        },  
        //定义这个sweiper对象  
        computed: {
            swiper() {  
              return this.$refs.mySwiper.swiper;  
            }  
        },  
        mounted () {  
            //这边就可以使用swiper这个对象去使用swiper官网中的那些方法  
//          swiper.slideTo(0, 0, false);  
            console.log(swiper.slideTo);
        } 
	};
	
</script>

<style>
	.middleFlex{
		display:flex;
		align-items:center;
		justify-content: space-between;
		height:40px;
		background-image:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495531214339&di=35d52697dd5f316e176fa5d2c1d7e42d&imgtype=0&src=http%3A%2F%2Fwww.pconline.com.cn%2Fpcedu%2Fphoto%2F0409%2Fpic%2F040920sEffect.jpg');
		background-size:100% 100%;
	}
	.middleFlex a{
		height:100%;
		width:33.33333%;
		text-align:center;
		line-height:40px;
		color:white;
	}
	.middleFlex .router-link-active{
		color:saddlebrown;
	}
	
	.swiper-container{
		height:250px;
	}
	.swiper-slide img{
		width:100%;
		height:100%;
	}
</style> 
