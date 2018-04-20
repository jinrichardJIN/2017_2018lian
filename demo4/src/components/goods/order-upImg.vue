<template>
	<div>
		<div class="evaluate-price-box">
		<header class="ervalate-price-header">
			<span class="mui-icon mui-action-back mui-icon-left-nav" @click="goback">
				<img src="../../image/leftArrow.png"/>
			</span>
			<h1 class="mui-title">上传图片</h1>
		</header>
		<div class="upImg-content">
			<el-row>
				<el-col :span="24" class="info-cont">
					<img src="../../image/ys_2.png" alt="" />
					<p>上传你的机器图片</p>
				</el-col>
			</el-row>
			<el-row v-if="pset.length>0">
				<el-col :span="24" class="upImg-cont item1">
					<p :span="24">{{pset[0]}}</p>
					<div :span="24">
						<div class="input-content" :class="{upimg:oneimg.length>0, noimg:oneimg==''}">
							<input type="file" value="" @change="upimg('one',$event)"/>
							<i v-show="oneimg.length>0" @click="delupimg('one')"></i>
						</div>
					</div>
					<p :span="24" class="up-tipinfo">
						大小不超过5M,仅限一张
					</p>
				</el-col>
			</el-row>
			
			<el-row  v-if="pset.length>1">
				<el-col :span="24" class="upImg-cont item2">
					<p :span="24">{{pset[1]}}</p>
					<div :span="24">
						<div class="input-content" :class="{upimg:twoimg.length>0, noimg:twoimg==''}">
							<input type="file" name="" id="" value="" @change="upimg('two',$event)"/>
							<i v-show="twoimg.length>0" @click="delupimg('two')"></i>
						</div>
					</div>
					<p :span="24" class="up-tipinfo">
						大小不超过5M,仅限一张
					</p>
				</el-col>
			</el-row>
			
		</div>
		<footer class="eva-foo-nex">
			<button v-show="showtip" class="tip-next" @click="tipnext">
				<p style="text-align: center;">跳过步骤</p>
			</button>
			<button v-show="shownext" class="tip-next" @click="gonext">
				<p style="text-align: center;">下一步</p>
			</button>
		</footer>
	</div>
	</div>
</template>

<script>
	//引入axios
	import axios from 'axios';
	import { mapState } from 'vuex';
	import contextPath from '../../js/commonUtils.js';
	import TipFunction from '../../js/merge.js';
	
	export default {
		data() {
			//模板数据
			return {
				pset:[],//上传图片
				oneimg:'',//正面照
				twoimg:'',//反面照
				oneimgO:'',
				twoimgO:'',
				showtip:true,//是否显示跳过
				shownext:false,//是否显示下一步
			}
		},
		methods: {
			//跳过
			tipnext(){
				this.$router.push({path:'/choiceRecycling'});
			},
			//下一步
			gonext(){
				var param = eval("("+sessionStorage.getItem("param")+")");
				var upimg = [];
				if(this.oneimg){
					var obj = new Object();
					obj.name = this.pset[0];
					obj.imageNarrowUrl = this.oneimg;
					obj.imageOriginalUrl = this.oneimgO;
					upimg.push(obj);
				}
				if(this.twoimg){
					var obj = new Object();
					obj.name = this.pset[1];
					obj.imageNarrowUrl = this.twoimg;
					obj.imageOriginalUrl = this.twoimgO;
					upimg.push(obj);
				}
				param.upImg = JSON.stringify(upimg);
				sessionStorage.setItem("param",JSON.stringify(param));	
				this.$router.push({path:'/choiceRecycling'});
			},
			//上传图片
			upimg(obj,$event){
				var _this = this;
				var file = $event.target.files[0];
			    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
			    if(!/image\/\w+/.test(file.type)){
			        alert("请确保文件为图像类型");
			        return false; 
			    }
			    var _this = this;
			    var reader = new FileReader(); 
			    reader.readAsDataURL(file); 
			    reader.onload = function(e){
			        var result = this.result; 
			        result = result.substring(result.indexOf(",")+1,result.length-1);
			        _this.shownext = true;
					_this.showtip = false;
			        
					axios.post(contextPath.contextPath+'wauser/userUpload', $.param({
						from: 'WX',
						fileName: file.name,
						imgData:result,
						groupName:'idleuser',
						narrowFlg:'Y',
					}))
					.then((res) => {
						console.log(res);
						if(res.data.rescode == '00000'){
							_this.shownext = true;
							_this.showtip = false;
							
							var data = res.data;
							if(obj=='one'){
								_this.oneimg =  data.imageNarrowUrl;
								_this.oneimgO =  data.imageOriginalUrl;
								$(".item1 .input-content").css("background-image","url("+data.imageOriginalUrl+")");
							}else if(obj == 'two'){
								_this.twoimg =  data.imageNarrowUrl;
								_this.twoimgO =  data.imageOriginalUrl;
								$(".item2 .input-content").css("background-image","url("+data.imageOriginalUrl+")");
							}
						}
						TipFunction.loadingMessage(res.data.resmsg);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000)
					})
					.catch((response) => {
						
					});
			    }
			},
			//删除图片
			delupimg(obj){
				var oimg = "";
				var nimg = "";
				if(obj == 'one'){
					oimg = this.oneimg;
					nimg = this.oneimgO;
					this.oneimg = "";
					this.oneimgO = "";
					if(!this.twoimg){
						this.shownext = false;
						this.showtip = true;
					}
					$(".item1 .input-content").removeAttr("style")
				}else if(obj == 'two'){
					oimg = this.twoimg;
					nimg = this.twoimgO;
					this.twoimg = "";
					this.twoimgO = "";
					if(!this.oneimg){
						this.shownext = false;
						this.showtip = true;
					}
					$(".item2 .input-content").removeAttr("style")
				}
				axios.get(contextPath.contextPath+'wauser/delUserUpload',{
						params:{
							from: 'WX',
							imageOriginalUrl: oimg,
							imageNarrowUrl:nimg,
						}
					})
					.then((res) => {
						TipFunction.loadingMessage(res.data.resmsg);
						setTimeout(function(){
							TipFunction.hideLoading();
						},2000)
					})
					.catch((response) => {
						
					});
			},
			//返回
			goback(){
				window.history.back();
			},
		},
		created(){
			var param = eval("("+sessionStorage.getItem("param")+")");
			var rgoodsPreImgSet = param.rgoodsPreImgSet;
			if(rgoodsPreImgSet){
				this.pset = rgoodsPreImgSet.split(",");
			}
		},
	}
</script>
