<template>
	<div>
		<div class="goodListBox">
		<header class="roder-top">
			<a v-on:click="back">
				<img src="../image/leftArrow.png" alt="" />
			</a>
			<h1 class="mui-title">评价</h1>
			<a class="release" id="subComment" @click="subComment">
				发布
			</a>
		</header>
		<div class="lanceng"></div>
		<div class="recovery-box">
			<div class="recovery-bottom">
				<!--暂时添加的router-->
				<a class="evaluateHundredA">
					<div class="reted-box">
						<div class="recovery-left">
							<h2 class="big-tit">{{orderD.goodsName}}</h2>
							<p class="company">{{orderD.distributorName}}</p>
							<p class="high-price">
								最高回收价
								<span class="price-num">¥{{orderD.maxRecyclePrice}}</span>
							</p>
							<div class="bottom-ips">
								<ul class="print">
									<li  v-for="mode in orderD.arrMode">
										<img v-if="mode == 1" src="../image/ico10.png" />
										<img v-if="mode == 2" src="../image/ico9.png" />
										<img v-if="mode == 3" src="../image/ico7.png" />
									</li>
								</ul>
							</div>
						</div>
						<div class="recovery-right">
							<img :src=orderD.goodsImgUrlNarrow alt="" />
						</div>
					</div>
				</a>
			</div>
		</div>
		<div class="lanceng"></div>
		<div class="text-ear">
			<textarea rows="" cols="" v-model="content" maxlength="300" placeholder="写写你的感受吧，一不小心就成了评论高手" @keyup="systextlength" class="text-arr"></textarea>
			<p>还可以输入{{sysnum}}字</p>
		</div>
		<ul class="but-upload">
			<li v-for="img in imageOriginalUrl">
				<img :src="img" alt="" />
				<i class="delimg" @click="delupImg(img)"></i>
			</li>
			<li class="li-upfile">
				<input type="file" class="upfile" @change="upfile"/>
			</li>
		</ul>
		<div class="duanxian">
			
		</div>
		<div class="comm">
			<el-checkbox v-model="checked1">公开评论</el-checkbox>
		</div>
		<div class="lanceng"></div>
		<div class="morstar">
			<p>店铺评分</p>
			<div class="outline-fir">
				<div class="line-fir">
					<span class="line-tit">核货准确度</span>
					<div class="block">
					  <el-rate v-model="value1" @click='changeV(value1)'></el-rate>
					</div>
				</div>
				<div class="line-fir">
					<span class="line-tit">处理速度</span>
					<div class="block">
					  <el-rate v-model="value2" @click='changeV(value2)'></el-rate>
					</div>
				</div>
				<div class="line-fir">
					<span class="line-tit">服务态度</span>
					<div class="block">
					  <el-rate v-model="value3" @click='changeV(value3)'></el-rate>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>

    import axios from 'axios';
	import TipFunction from '../js/merge.js';
	import contextPath from '../js/commonUtils.js';
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				rgoodsId:'',//商品编号
				//评价内容
				content:'',
				//可输入数量
				sysnum:300,
				//上传图片集合——原图
				imageOriginalUrl:[],
				//上传图片集合——缩略图
				imageNarrowUrl:[],
				//模拟数据
				checked:true,
		        checked1:true,
		        value1:null,
		        value2:null,
		        value3:null,
		        serviceMark:null,
		        //模拟订单详情
		        orderD:'',
				brandId: 0,
				orderId: 0,
				list:[]
			}
		},
		beforeCreate() {
			var that = this;
			if(userid === 0) {
				//跳登录
				TipFunction.loadingMessage('您尚未登录，为你跳转到登录页面');
				setTimeout(function() {
					TipFunction.hideLoading();
					that.$router.push({
						path: '/login'
					})
				}, 2000);
			} 
		},
		created(){
		    //获取商品ID
		    var orderId = this.$route.query.orderId;
		    this.orderId = orderId;
		    this.rgoodsId = this.$route.query.rgoodsId;
		    
		    axios.get(contextPath.contextPath+'wagoods/goods/findGoodsById', { 
				params: {
					from: 'WX',
					rgoodsId: this.rgoodsId,
				}
			})
		    .then((data) => {
		    	var cData = data.data;
		    	if (cData.rescode === "00000") {
		    		if(cData.data.recycleMode){
		    			cData.data.arrMode = cData.data.recycleMode.split(",");
		    		}
		    		this.orderD = cData.data;
		        } else {
					TipFunction.loadingMessage(data.data.resmsg);
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)	
		        }
			})
			.catch((response) => {
				TipFunction.loadingMessage(response);
				setTimeout(function(){
					TipFunction.hideLoading();
				},2000)	
			});
		    
		},
		methods: {
			//返回
			back(){
				if(this.channel == 'IOS') {
						webViewPop();
				} else if(this.channel == 'ANDROID') {
						window.AndroidNative.webViewPop();
				}else{
					window.history.back();
				}
			},
			//处理输入文字统计
			systextlength:function(){
				if(this.content){
					this.sysnum= 300 - this.content.trim().length;
				}
			},
			//上传图片
			upfile:function(){
				if(this.imageOriginalUrl && this.imageOriginalUrl.length>2){
					TipFunction.loadingMessage("最多上传3张图");
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
					
					return false;
				}
				var file = $(".upfile")[0].files[0];
			    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
			    if(!/image\/\w+/.test(file.type)){
			        TipFunction.loadingMessage("请确保文件为图像类型");
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
			        
			        return false; 
			    }
			    var _this = this;
			    var reader = new FileReader(); 
			    reader.readAsDataURL(file); 
			    reader.onload = function(e){
			        var result = this.result; 
			        result = result.substring(result.indexOf(",")+1,result.length-1);
					axios.post(contextPath.contextPath+'waevaluate/evaluateUpImg', $.param({
						from: 'WX',
						imgData:result,
						imgName: file.name
					}))
					.then((data) => {
						_this.imageOriginalUrl.push(data.data.imageIconOriginal);
						_this.imageNarrowUrl.push(data.data.imageIconDispose);
						var msg = data.data.resmsg
						TipFunction.loadingMessage(msg);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000)
					})
					.catch((response) => {
						TipFunction.loadingMessage(response);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000)
					});
			    }
			},
			//删除图片
			delupImg:function(o){
				if(o){
					var that = this;
					this.imageOriginalUrl.forEach(function(d,i){
						if(d==o){
							//创建删除图片参数
							var parms = {
								from: 'WX',
								imageIconOriginal: that.imageOriginalUrl[i],
								imageIconDispose: that.imageNarrowUrl[i]
							}
							//从数组中删除图片
							that.imageOriginalUrl.splice(i,1);
							that.imageNarrowUrl.splice(i,1);
							//调服务删除图片
							axios.get(contextPath.contextPath+'waevaluate/delEvaluateUpImg', {
								params: parms
							})
							.then((res) => {
								var oData = res.data;
								if(oData.rescode === '00000'){
									TipFunction.loadingMessage(oData.resmsg);
									setTimeout(function(){
										TipFunction.hideLoading();
									},2000)
								}
							})
							.catch((response) => {
								
							});
						}
					})
				}
			},
			subComment(){
				//验证所有必填项是否已填写//
				if(this.content == "") {
					TipFunction.loadingMessage('请填写您的评论内容');
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000)
					return;
				} else if(!this.serviceMark) {
					TipFunction.loadingMessage('请给出您对店铺的评分  ');
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000)
					return;
				}
				//提交评论 JSON.stringify(obj);
				axios.get(contextPath.contextPath+'waevaluate/addOrderEvaluate', {
					params:{
						from: 'WX',
						orderId: this.orderId,
						serviceMark:this.serviceMark,
						content:this.content,
						uploadImgUrl:this.imageOriginalUrl.join(";"),
						uploadImgNarrowUrl:this.imageNarrowUrl.join(";"),
						isShow:'Y'
					}
				})
				.then(function(data) {
					var oData = data.data;
					if(oData.rescode === '00000'){
						TipFunction.loadingMessage(oData.resmsg);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000)
						this.$router.push({path:'/orderCenter'});
						return;
					}
				}.bind(this))
				.catch(function(response){
					TipFunction.loadingMessage(response);
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000)
				}.bind(this));
			}
		},
		watch:{
				value1(val){
					this.serviceMark = Math.ceil((this.value1+this.value2+this.value3)/3)
				},
				value2(val){
					this.serviceMark = Math.ceil((this.value1+this.value2+this.value3)/3)
				},
				value3(val){
					this.serviceMark = Math.ceil((this.value1+this.value2+this.value3)/3)
				}
        },
		mounted() {
			this.$nextTick(() => {
				//获取用户评价list
				
			});
			
			$(function() {
				$('#subComment').click(function() {
					sendComment();
				})
			});
			function sendComment(){
				var texcon = $('.text-arr').val();
			}
			
		},
	};
</script>

<style>
</style>