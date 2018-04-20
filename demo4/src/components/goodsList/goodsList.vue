<template>
	<div>
		<div class="mobAll-box">
			<header class="mobAll-top">
				<router-link :to="{name: 'home'}" class="mob-city-box">
					<div class="city">{{cityName}}
						<span>
						<img src="../../image/bottomArrow.jpg" alt="" />
					</span>
					</div>
				</router-link>
				<div class="mui-input-row mui-search">
					<router-link :to="{name: 'home'}" class="mob-input-box">
						<input type="search" placeholder="斐讯K3路由器">
					</router-link>
				</div>
			</header>

			<div class="mob-content">
				<div class="mob-con-left" id="inccc">
					<div class="mob-left segmentedControls" :class="{'moball-active':selectCategoryId==category.id}" @click="selectCategory(category.id)" v-for="(category,index) in CategoryList" :key="category">
						<router-link :to="{name: 'goodsList' }" class="mui-control-item ">
							<img v-show="selectCategoryId!=category.id" :src="category.categoryImgUrl" :key="category.id" alt="" />
							<img v-show="selectCategoryId==category.id" :src="category.categoryImgUrlSelect" :key="category.id" alt="" />
							<p>{{category.name}}</p>
						</router-link>
					</div>
				</div>
				<div id="segmentedControlContents" class="mob-con-right" v-if="brandList.length>0">
					<div class="mob-right">
						<ul>
							<li class="mob-rig-img" v-for="imgUrl in brandList">
								<router-link :to="{name: 'physicalGoodsDetails'}" class="mui-control-item ">
									<span><img :src="imgUrl.brandLogo" /></span>
								</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="boxNull" v-if="brandList.length<1">
					<div class="concernBoxNull">
						<img src="../../image/goodsNull.png" alt="" />
						<p>暂无数据</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import contextPath from '../../js/commonUtils.js';
	import TipFunction from '../../js/merge.js';
	import axios from 'axios';
	export default {
		data() {
			return {
				selectCategoryId:'',//选择的分类编号
				CategoryList: [], //机型大全列表
				brandList: [],
				categoryId: [],
				cityName:''
			}
		},
		
		created() {
			var _this = this;
			
			sessionStorage.getItem("city");
			this.cityName = JSON.parse(sessionStorage.getItem("city"));
			if(this.cityName.cityName.length>3){
				this.cityName = this.cityName.cityName.slice(0,3)
			}else{
				this.cityName = this.cityName.cityName
			}
			//获取商品所属分类
			/**********************机型大全左侧---分类列表******************************/
			axios.get(contextPath.contextPath+'wagoods/getGoodsCategoryList', {
					params: {
						from: 'WX',
						searchType: '1'
					}
				})
				.then(function(data) {
					if(data.data.rescode == '00000'){
						var list = data.data.list;
						if(list && list.length>0){
							this.CategoryList = list;
							this.selectCategoryId = list[0].id;
							this.selectCategory();
						}
					}
				}.bind(this))
				.catch(function(response) {
					TipFunction.loadingMessage(response);
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000);
				}.bind(this));
		},
		methods: {
			selectCategory(item){
				if(item){
					this.selectCategoryId = item;
				}
				//获取商品所属分类
				/**********************机型大全左侧---分类列表******************************/
					this.$nextTick(()=>{
						axios.get(contextPath.contextPath+'wagoods/getBrandListPage', {
							params: {
								from: 'WX',
								pageSize: '100',
								categoryId:this.selectCategoryId,
							}
						})
						.then((data) => {
							var oData = data.data
							this.brandList = oData.list;
							$("#inccc").children().click(function(){
								$("#inccc").children().eq(0).addClass('moball-active');
					            $(this).siblings().removeClass("moball-active");
					            $(this).addClass("moball-active");
						    });
						})
						.catch((response) => {
							TipFunction.loadingMessage(response);
							setTimeout(function() {
								TipFunction.hideLoading();
							}, 2000);
						});
					})
			}
		},
		mounted() {
			/***********************左侧点击加class*********************************/
			    $(".segmentedControls").children().click(function(){
		            $(this).siblings().removeClass("moball-active");
		            $(this).addClass("moball-active");
			    });
			/********************************************************************/
		},

	};
</script>

<style scoped type="text/css" lang="scss">
@import "../../css/core/reset.scss";

.mobAll-box{
    height: 100%;
    margin-top: 44px;
}
.mobAll-top{
    @include flexbox();
    @include align-items(center);
    background-color: #FFF;
    height: 44px;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    .mob-city-box{
        margin-left: 8px;
        .city{
            color: #626262;
            font-size: 12px;
            @include flexbox();
            @include justify-content(center);
            @include align-items(center);
            span{
                img{
                    margin-left: 5px;
                    width: 10px;
                    margin-right: 20px;
                }
            }
        }        
    }
    .mui-search {
        width: 230px;
        height: 44px;
        @include flexbox();
        @include align-items(center);
        .mob-input-box {
            width: 100%;
            display: block;
            height: 30px;
            float: left;
            input {
                text-indent: 90px;
                height: 30px;
                width: 100%;
                border-radius: 85px;
                border: none;
                background-color: #F1F2F2;
                font-size: 12px;
                color: #C9C9C9;
                background-image: url(../../image/search.png);
                background-repeat: no-repeat;
                background-size: 18px;
                background-position: 70px 6px;
            }
        }
    }
}

.mob-con-left,
.mob-con-right {
    overflow-y: auto;
    height: 100%;
}

.mob-content{
    margin-bottom: 44px;
    margin-top: 9px;
    background: #F5F6F6;
    @include flexbox();
    @include justify-content(space-around);
    .mob-con-left{
        height: 100%;
        overflow-y: scroll;
        background: #FFFFFF;
        width: 90px;
        @include flexbox();
        @include flex-direction(column);
        flex-grow: 0;
        .mob-left{
            height: 75px;
            width: 100%;
            @include flexbox();
            @include justify-content(center);
            @include align-items(center);
            padding: 5px 0;
            .mui-control-item{
                @include flexbox();
                @include flex-direction(column);
                @include justify-content(center);
                @include align-items(center);
                padding: 8px 0;
                img{
                    height: 25px;
                    margin-bottom: 5px;
                }
                p{
                    font-size: 12px;
                    color: #626262;
                }
            }
        }
    }
    .mob-con-right{
        width: 100%;
        flex-grow: 1;
        padding: 10px 0 0 10px;
        .mob-right{
            height: 100%;
            overflow: hidden;
            ul{
                width: 100%;
                .mob-rig-img{
                    float: left;
                    width: 80px;
                    height: 80px;
                    @include flexbox();
                    @include justify-content(center);
                    @include align-items(center);
                    span{
                        display: block;
                        img{
                            width: 60px;
                            height: auto;
                        }
                    }
                }
            }
            
        }
    }
}

</style>