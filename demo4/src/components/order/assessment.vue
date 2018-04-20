<template>
	<div>
		<div class="assess-box">
		<div id="mask" v-show="showmask">
			<div id="mask-cont">
				<img src="../../image/bg-img15.png" />
				<h4>{{contrastName}}</h4>
				<div class="bgcolor">
					<p class="clearfix">
						<span>提交结果</span>
						<span class="fr color-hui">{{subresult}}</span>
					</p>
					<p class="clearfix">
						<span>核验结果</span>
						<span class="fr color-hui-red">{{chkresult}}</span>
					</p>
					<button @click="closemask">确定</button>
				</div>
			</div>
		</div>
		<header class="assess-top">
			<a v-on:click="back">
				<img src="../../image/leftArrow.png" alt="" />
			</a>
			<h1 class="mui-title">评估明细</h1>
		</header>
		<div class="lvceng">

		</div>
		<div class="mui-content evaluate-detail">
			<ul>
				<li class="clearfix">
					<p>机器型号</p>
					<span>{{assessmentdata.rgoodsName}}</span>
				</li>
				<li class="clearfix">
					<p>价格</p>
					<span v-if="sameprice" class="color-yellow">￥{{subprice}}</span>
					<span v-else class="color-red" @click="openmask(-1)">￥{{subprice}}</span>
				</li>
				<li class="clearfix" v-for="(list,index) in datalist" :key="list">
					<p>{{list.name}}</p>
					<span v-if="list.same">{{list.value}}</span>
					<span v-else class="color-red" @click="openmask(index)">{{list.value}}</span>
				</li>
				<li v-if="ckImg.length>0">
					<div class="ck-img" v-for="m in ckImg">
						<img :src="m" alt="" />
					</div>
				</li>
			</ul>
		</div>
	</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import contextPath from '../../js/commonUtils.js';
	import TipFunction from '../../js/merge.js';
	
	
	export default {
		data() {
			return {
				getAssessmentDetails: {
					orderId: this.$route.query.orderId,
					from: 'WX'
				},
				//显示数据集合
				datalist:[],
				//评估价格
				subprice:'',
				//核货价格
				chkprice:'',
				//价格相同
				sameprice:true,
				//提交结果
				subresult:'',
				//核验结果
				chkresult:'',
				//是否显示 mas
				showmask:false,
				//模拟评估明细接口
				assessmentdata: {},
				contrastName:'', //对比名称
				//核验图片
				ckImg:[],
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
		methods: {
			//back
			back(){
				if(this.channel == 'IOS') {
						webViewPop();
				} else if(this.channel == 'ANDROID') {
						window.AndroidNative.webViewPop();
				}else{
					window.history.back();
				}
			},
			//关闭不同查看弹层
			closemask:function(){
				this.showmask=false;
			},
			//打开对比不同
			openmask:function(index){
				if(index==-1){ //价格不同
					this.subresult = this.subprice;
					this.chkresult = this.chkprice;
					this.contrastName = '价格';
				}else{
					this.subresult = this.datalist[index].diflist.value;
					this.chkresult = this.datalist[index].diflist.cvalue;
					this.contrastName = this.datalist[index].diflist.name;
				}
				this.showmask=true;
			},
			handCkimg:function(){
				var imgobj = this.assessmentdata.rgoodsCheckImgUrl;
				if(imgobj){
					this.ckImg = imgobj.split(";");
				}
			},
			//处理接口请求核验数据
			handData:function(){
				var data = this.assessmentdata;
				var subprice = data.rgoodsInquiryPrice;
				this.subprice = subprice;
				var chkprice = data.rgoodsCheckPrice;
				//处理价格
				if(chkprice){
					this.chkprice = chkprice;
				}else{
					this.chkprice = subprice;
				}
				if(this.subprice != this.chkprice){
					this.sameprice = false;
				}
				
				var sub_arr1 = [];	//	type=1
				var chk_arr1 = [];	//	type=1
				
				var sub_arr2 = [];	//	type=2
				var chk_arr2 = [];	//	type=2
				
				var p_name = "";
				var p_name2 = "";
				
				var subInfo = data.rgoodsInquiryInfo;//评估数据
				var ckInfo = data.rgoodsCheckInfo;//核验数据
				subInfo = eval("("+subInfo+")");
				ckInfo = eval("("+ckInfo+")");
				if(subInfo && subInfo.length>0){
					//subInfo = eval("("+subInfo+")");
					subInfo.forEach(function(d){
						if(d.groupType==1){
							sub_arr1 = sub_arr1.concat(d.groupInfos);
						}else if(d.groupType==2){
							p_name = d.groupName;
							sub_arr2 = sub_arr2.concat(d.groupInfos);
						}
					})
				}
				
				/**
				 * 把评估结果数据处理到chk_arr中
				 */
				var ckInfo = data.rgoodsCheckInfo;
				ckInfo = eval("("+ckInfo+")");
				if(ckInfo && ckInfo.length>0){
					//ckInfo = eval("("+ckInfo+")");
					ckInfo.forEach(function(d){
						if(d.groupType==1){
							chk_arr1 = chk_arr1.concat(d.groupInfos);
						}else if(d.groupType==2){
							p_name2 = d.groupName;
							chk_arr2 = chk_arr2.concat(d.groupInfos);
						}
					})
				}
				var handlist = [];
				
				//处理显示数据---处理groupType==1
				var res = "";
				if(sub_arr1.length){
					sub_arr1.forEach(function(d){
						var temp = false;
						var c_value= "";
						if(chk_arr1.length>0){
							chk_arr1.forEach(function(c){
								if(d.propertyId == c.propertyId ){
									if(d.propertyValueId == c.propertyValueId){
										temp = true;
									}
									c_value = c.propertyValue;
								}
							})
						}
						
						var obj = "";
						if(temp){// 相同
							obj = {
								name:d.propertyName,
								value:d.propertyValue,
								same:true
							}
						}else{//不同
							if(chk_arr1.length>0){ //上门、门店没有核货操作
								obj = {
									name:d.propertyName,
									value:d.propertyValue,
									same:false,
									diflist:
										{
											value:d.propertyValue,
											cvalue:c_value
										}
									
								}
							}else{
								obj = {
									name:d.propertyName,
									value:d.propertyValue,
									same:true,
								}
							}
							
						}
						handlist.push(obj);
					})
				}
				//处理显示数据---处理groupType==2
				var e_value= "";				
				var c_value= "";
				var ishave = true;//假设相同
				sub_arr2.forEach(function(d,i){
					if(i==0){
						e_value+=d.propertyValue;
					}else{
						e_value+="，"+d.propertyValue;
					}
					var temp = true;//假设没有
					if(chk_arr2.length>0){
						chk_arr2.forEach(function(c){
							if(d.propertyValueId == c.propertyValueId){
								temp = false;//结果有
							}
						})
					}
					if(temp){ //如果没找到，则表示不同
						ishave = false;
					}
				})
				chk_arr2.forEach(function(d,i){
					if(i==0){
						c_value += d.propertyValue;
					}else{
						c_value += "，"+d.propertyValue;
					}
				})
				var obj2 = "";
				/**
				 * 1、假如sub_arr2.length=0,则 ishave必定为true,此时如果chk_arr2.length!=0,则肯定不同
				 * 2、假如chk_arr2.length==0，sub_arr2.length!=0,则此时必定不同
				 * 3、如果chk_arr2.length != sub_arr2.length 则不相同
				 */
				if(sub_arr2.length==0 && chk_arr2.length!=0){ //不同
					obj2 = {
						name:p_name2,
						value:'-',
						same:false,
						diflist:
							{
								value:'—',
								cvalue:c_value
							}
						
					}
				}else if(sub_arr2.length!=0 && chk_arr2.length==0){
					//如果ckInfo为空则，处理为相同
					if(ckInfo){
						obj2 = {
							name:p_name,
							value:e_value,
							same:false,
							diflist:
								{
									value:e_value,
									cvalue:'—'
								}
						}
					}else{
						obj2 = {
							name:p_name,
							value:e_value,
							same:true
						}
					}
				}else if(sub_arr2.length != chk_arr2.length){
					obj2 = {
							name:p_name,
							value:e_value,
							same:false,
							diflist:
								{
									value:e_value,
									cvalue:c_value
								}
						}
				}else if(ishave && sub_arr2.length>0 && chk_arr2.length>0){//相同
					obj2 = {
						name:p_name,
						value:e_value,
						same:true
					}
				}else if(!ishave){//不同
					obj2 = {
						name:p_name,
						value:e_value,
						same:false,
						diflist:
							{
								value:e_value,
								cvalue:c_value
							}
					}
				}
				if(obj2){
					handlist.push(obj2);
				}
				this.datalist = handlist;
			}
		},
		created() {
			var _that = this;
			axios.get(contextPath.contextPath+'wainquiry/getDetail', {
					params: this.getAssessmentDetails
				})
				.then(function(data) {
					var oData = data.data;
					_that.assessmentdata = oData;
					_that.handData(_that.assessmentdata);//处理数据
					_that.handCkimg();//处理核验图片
				})
				.catch(function(response) {
					TipFunction.loadingMessage(response);
					setTimeout(function() {
						TipFunction.hideLoading();
					}, 2000)
				});
		},
		mounted() {

		}
	}
</script>

<style>

</style>