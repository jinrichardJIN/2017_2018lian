<template>
	<div>
		<div class="assess-box">
		<header class="roder-top">
			<router-link :to="{name: 'evaluatePrice',query:{rgoodsId:rgoodsId,recyMeth:recyMeth,goodsNum:goodsNum,rgoodsInquiryInfoId:rgoodsInquiryInfoId}}">
				<img src="../image/leftArrow.png" alt="" />
			</router-link>
			<h1 class="mui-title">华为 荣耀 畅玩5A 评论</h1>
		</header>
		<div class="lanceng"></div>
		<div class="mui-content">
			<div class="comment-nav" v-for='(item,key) in evaluatelist'>
				<div class="clearfix comment-head">
					<img src="../img/person.jpg" class="fl"/>
					<dl class="fl">
						<dt v-html='item.mobile'>186****0093</dt>
						<dd>评价于<span v-html='item.createTime'>2017-08-31 17:59</span></dd>
					</dl>
					<ul class="clearfix">
						<li v-for = '(item2,key) in mobleStar' v-show='(key<=item.serviceMark)'></li>
					</ul>
				</div>
				<span v-html='item.content'>非常好，很满意的一次回收体验</span>
				<p class="comment-img">
					<img  v-for="img in item.uploadImgNarrowUrl" :src="img"/>
				</p>
				<p v-for = '(item3,key) in item.rorderEvaluateOwnerDto' >{{item3.content}}</p>
				<div class="huitiao"></div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	//引入axios	
	import axios from 'axios';
	import TipFunction from '../js/merge.js';
	import contextPath from '../js/commonUtils.js';
	import dropload from '../js/dropload.js';
	
	export default {
		data(){
			return {
				current:0,//当前页
				pageSize:5,//每页显示数
				//或者评价列表的参数
				getRorderEvaluate:{
					'from': 'WX', 
					'rgoodsId':this.rgoodsID,
					'pageSize':5,
					'current':1,
					'orderId':'',
					'distributorId':''
				},
				evaluatelist:[],
				mobleStar:[{},{},{},{},{}],
				listSize:0,         //评论最大个数
				totalNum:0,
				rgoodsId:0,
				recyMeth:[], //支持回收方式
				goodsNum:0,
				rgoodsInquiryInfoId:0,
			}
		},
		created(){
			var recyMeth = this.$route.query.recyMeth;
			this.recyMeth = recyMeth;
			
			var goodsNum = this.$route.query.goodsNum;
			this.goodsNum = goodsNum;
			
			var rgoodsInquiryInfoId = this.$route.query.rgoodsInquiryInfoId;
			this.rgoodsInquiryInfoId = rgoodsInquiryInfoId;
			
			//商品编号
			this.rgoodsId = this.$route.query.rgoodsId;
			
		},
		mounted(){
			this.initdropdown();
		},
		methods:{
			//加载评价列表信息
			getCommentList(me,type){
				var _this = this;
				var param = {};
				param.from = 'WX';
				if(type=='up'){
					param.current = 1;
				}else if(type=='down'){
					param.current = _this.current+1;					
				}
				param.pageSize = _this.pageSize;
				param.rgoodsId = _this.rgoodsId;
				
				axios.get(contextPath.contextPath+'webevaluate/getRorderEvaluateList', { params:param})
					.then(function(res) {
						if(res.data.rescode === '00000') {
							var list = res.data.list;
							if(list && list.length>0){
								list.forEach(function(d,i){
									if(d.uploadImgNarrowUrl && d.uploadImgNarrowUrl.length>0){
										list[i].uploadImgNarrowUrl = (d.uploadImgNarrowUrl).split(";");
									}
								});
								
								if(type=='down'){
									_this.current = param.current;
									_this.evaluatelist = _this.evaluatelist.concat(list);								//加载数据成功处理做大页数
								}
							}else{
								if(type=='down'){
									// 锁定
			                        me.lock();
			                        // 无数据
			                        me.noData();
								}
							}
							if(type=='up'){
								_this.evaluatelist = list;
								// 即使加载出错，也得重置
		               			 me.resetload();
		                        // 重置页数，重新获取loadDownFn的数据
		                        _this.current = 1;
		                        // 解锁loadDownFn里锁定的情况
		                        me.unlock();
		                        me.noData(false);
							}
						}else{
							TipFunction.loadingMessage(res.data.resmsg);
							setTimeout(function(){
								TipFunction.hideLoading();
							},2000);
						}
						if(type=='down'){
							//任何时候都要重置数据
							setTimeout(function(){
								// 即使加载出错，也得重置
		                    	me.resetload();
							},5000);
						}
					})
					.catch(function(response) {
						// 即使加载出错，也得重置
			            me.resetload();
					});
			},
			//初始化分页
			initdropdown(){
				var _this = this;
				var options = {
					scrollArea : window,
					threshold : 50,
					loadUpFn : function(me){
						_this.getCommentList(me,'up');
					},
					loadDownFn : function(me){
						_this.getCommentList(me,'down');
					},
					initLoad:true,
				}
				dropload.dropload("assess-box",options);
			}
		}
	}
</script>

<style lang="scss">
	.loadingMore{
		text-align:center;
		height:30px;
		line-height:30px;
	}
</style>