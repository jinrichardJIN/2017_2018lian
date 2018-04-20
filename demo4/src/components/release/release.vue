<template>
    <div class="release-container textL">
    	<!--头部-->
    	<header class="font16">
    		<i class="back" @click="back"></i>
    		<p class="title">发布</p>
    		<p class="other" @click="sellSkill">卖出技巧</p>
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
			<ul class="upfile-nav">
				<li  @click="viewImage(m,index)" v-for="(m,index) in imageOriginalUrl" :style="{backgroundImage:'url('+m+')'}">
					<i @click.stop="deleteImg(index)"></i>
					<span v-if="index==mainIndex">主图</span>
				</li>
				<li class="li-upfile">
					<em class="tip-text font12">添加照片</em>
					<input type="file" class="upfile" @change="upfile"/>
				</li>
			</ul>
		</div>
		<div class="form-group">
			<p class="address" @click="choseLocation">
				<span v-show="addressCity==''" class="tip-text">请选择地址</span>
				{{addressProvince}}&nbsp;{{addressCity}}&nbsp;{{addressArea}}
			</p>
		</div>
		<div class="form-group price">
			<input type="text" v-model="price" maxlength="6" @blur="checkprice"  placeholder="￥0.00"/>
			<em class="tip-text font12">含运费</em>
		</div>
		<div class="form-group">
			<mt-cell title="原价">
				<input type="text" v-model="oprice" class="textR" @blur="checkOprice" placeholder="必填" maxlength="6"/>
			</mt-cell>
			<mt-cell title="类目" is-link @click.native="choseCategory" :value="categoryName">
				<span v-if="categoryName==''" class="tip-text">必填，请选择</span>
			</mt-cell>
			<mt-cell title="品牌"  @click.native="choseBrand" to="brandChoice" is-link :value="brandName">
				<span v-if="brandName==''" class="tip-text">有品牌会有更多曝光</span>
			</mt-cell>
			<mt-cell v-show="hasapplicable" title="适用" is-link @click.native="choseapplicable" :value="applicable"> 
				<span v-if="applicable==''" class="tip-text">选择一个适用</span>
			</mt-cell>
			<mt-cell title="数量">
				<i class="reduce active" v-show="num>1" @click="numReduce"></i>
				<i class="reduce" v-show="num==1"></i>
				<span class="num">{{num}}</span>
				<i class="add active" v-show="num<50" @click="numAdd"></i>
				<i class="add" v-show="num==50"></i>
			</mt-cell>
		</div>
		<div class="form-group">
			<label class="radio-type">
				<input type="radio" v-model="type" value="1" />
				<span>支持面交</span>
			</label>
			<label class="radio-type">
				<input type="radio" v-model="type" value="2" />
				<span>全新商品</span>
			</label>
		</div>
		<!--底部-->
		<div class="subgoods" :class="{suresub: subinfo}" @click="subgoods">发布</div>
		<router-view></router-view>
		<v-applicable v-show="showapplicable" :listdata="appdata" @choseapp= "choseApp"></v-applicable>
    </div>
</template>

<script type="text/ecmascript-6">
	import {fetch} from 'assets/js/merge.js'
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import Applicable from 'components/release/releaseItem/applicable.vue';
    export default{
        data(){
            return {
            	subinfo:false,//是否可以提交信息
            	title:'',//标题
		      	description:'',//描述
		      	addressProvince:'',//省
		      	addressCity:'',//市
				addressArea:'',//区
				mainIndex:0,//主图下标
				imageOriginalUrl:[],//上传图片集合——原图
				imageNarrowUrl:[],//上传图片集合——缩略图
				price:'',//价格
				oprice:'',//原价
				categoryName:'',//类目
				categoryId:'',//类目
				brandName:'',//品牌
				brandId:'',//品牌
				hasapplicable:false,//是否有适用
				applicable:'',//适用
				num:1,//数量
				type:1,//支付面交，全新商品
				showapplicable:false,//是否显示适用
				appdata:[],//适用数据
        	}
        },
        components: {
			'v-applicable': Applicable,
		},
        computed:{
        	//计算可输入字数
        	compSysnum:function(){
        		return 300-this.description.length;
        	},
        },
        methods:{
        	//提交商品
        	subgoods:function(){
        		if(!this.subinfo){
        			return false;
        		}
      		if(this.checkSubData()){//校验通过提交数据
					var param = {
						from:'WX',
						imgMainUrl:this.imageOriginalUrl[this.mainIndex],//主图原图
						imgMainUrlNarrow:this.imageNarrowUrl[this.mainIndex],//主图压缩图
						goodsNum:this.num,//数量
						originalPrice:this.oprice,//原价
						salePrice:this.price,//售价
						categoryId:this.categoryId,
						brandId:this.brandId,
						goodsSale:this.type,//1:支持面交2:全新商品 3:精品
						goodsType:1,//1:实物商品 2:虚拟商品
						title:this.title,
						coment:this.description,//描述
						addressProvince:this.addressProvince,
						addressCity:this.addressCity,
						addressArea:this.addressArea,
					};
					if(this.imageOriginalUrl.length>1){
						var imgViceUrl = '';
						var imgViceUrlNarrow = '';
						var _this = this;
						this.imageOriginalUrl.forEach(function(d,i){
							if(i!=_this.mainIndex){
								imgViceUrl += d+",";
								imgViceUrlNarrow += _this.imageNarrowUrl[i]+",";
							}
						})
						param.imgViceUrl=imgViceUrl.substring(0,imgViceUrl.length-1);//幅图原图
						param.imgViceUrlNarrow=imgViceUrlNarrow.substring(0,imgViceUrlNarrow.length-1);//幅图压缩图
					}
					if(this.hasapplicable && this.applicable!=""){
						param.applicatScope = this.applicable;
					}
					Indicator.open();
					fetch("waigoods/issueIGoods",param)
					.then((res)=>{
						Indicator.close();
						if(res.rescode == '00000'){
							console.log("添加商品成功");
						}
						Toast({
						  message: res.resmsg,
						  position: 'bottom',
						  duration: 2000
						});	
					})
        		}
        	},
        	//上传图片
			upfile:function(){
				if(this.imageOriginalUrl && this.imageOriginalUrl.length>4){
					Toast({
					  message: '最多上传5张图片',
					  position: 'bottom',
					  duration: 2000
					});
					return false;
				}
				var file = $(".upfile")[0].files[0];
			    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
			    if(!/image\/\w+/.test(file.type)){
			    	Toast({
					  message: '请确保文件为图像类型',
					  position: 'bottom',
					  duration: 2000
					});
			        return false; 
			    }
			    if(file.size>5*1024*1024){
			    	Toast({
					  message: '上传图片不能超过5M',
					  position: 'bottom',
					  duration: 2000
					});
			        return false; 
			    }
			    var _this = this;
			    var reader = new FileReader(); 
			    reader.readAsDataURL(file); 
			    reader.onload = function(e){
			        var result = this.result; 
			        result = result.substring(result.indexOf(",")+1,result.length-1);
			        Indicator.open({
					  text: '上传中...',
					  spinnerType: 'fading-circle'
					});
			        fetch("waevaluate/evaluateUpImg",
				        {
							from: 'WX',
							imgData:result,
							imgName: file.name,
							groupName:'idlegoods'
				        }
			       	).then((res)=>{
			       		Indicator.close();
		              	if(res.rescode == '00000'){
		              		_this.imageOriginalUrl.push(res.imageIconOriginal);
							_this.imageNarrowUrl.push(res.imageIconDispose);
		              	}
		            })         
			    }
			},
			//删除图片
			deleteImg:function(o){
				var _this = this;
				//创建删除图片参数
				var parms = {
					from: 'WX',
					imageIconOriginal: _this.imageOriginalUrl[o],
					imageIconDispose: _this.imageNarrowUrl[o]
				}
				//判断如果是主图被删除，
				if(o==_this.mainIndex){
					_this.mainIndex = 0;
				}
				_this.imageOriginalUrl.splice(o,1);
				_this.imageNarrowUrl.splice(o,1);
				fetch("waevaluate/delEvaluateUpImg",
					parms
				).then((res)=>{
						Toast({
						  message: res.resmsg,
						  position: 'bottom',
						  duration: 2000
						});				
					}
				);
			},
        	//预览图片设置主图
        	viewImage:function(img,index){
        		//this.$router.push({path:'/login'});/this.$router.push({'name':'detailinfo',params:a})
        		var parm = {
        			img:img,
        			index:index
        		}
        		this.$router.push({'name':'viewImage',params:parm});
        	},
        	//选择地址
        	choseLocation:function(){
        		this.$router.push({name:'selectLocation'});
        	},
        	//选择类目
        	choseCategory:function(){
        		this.$router.push({name:'selectCategory'});
        	},
        	//选择品牌
        	choseBrand:function(){
        		this.$router.push({name:'brandChoice'});
        	},
        	//适用
        	choseapplicable:function(){
        		this.showapplicable = true;
        	},
        	//选择适用
        	choseApp:function(chose){
        		if(chose>-1){
        			this.applicable = this.appdata[chose];
        		}
        		this.showapplicable = false;
        	},
        	//卖出技巧
        	sellSkill:function(){
        		this.$router.push({name:'sellingSkills'});
        	},
        	//减少数量
        	numReduce:function(){
        		this.num = this.num - 1;
        	},
        	//增加数量
        	numAdd:function(){
        		this.num = this.num + 1;
        	},
        	//校验价格
        	checkprice:function(){
	        		var reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
	        		if(this.price && !reg.test(this.price)){
		      			Toast({
							  message: '请正确输入价格',
							  position: 'bottom',
							  duration: 2000
							});
						this.price = "";
	        		}
        	},
        	//校验原价格
        	checkOprice:function(){
        		var reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        		if(this.oprice && !reg.test(this.oprice)){
	      			Toast({
						  message: '请正确输入价格',
						  position: 'bottom',
						  duration: 2000
						});
					this.oprice = "";
        		}
        	},
        	//校验所有数据
        	checkSubData:function(){
        		var msg = "";
        		var reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        		if(this.title==""){
        			msg = "请输入商品标题";
        		}else if(this.description==""){
        			msg = "请描述一下你的宝贝！";
        		}else if(this.addressCity==""){
        			msg = "请输入你的位置";
        		}else if(this.imageOriginalUrl.length<1){
        			msg = "请为您的商品上传图片！";
        		}else if(this.price==""){
        			msg = "请为输入商品价格！";
        		}else if(!reg.test(this.price)){
        			msg = "请正确输入价格"
        		}else if(this.oprice ==""){
        			msg = "请输入商品原价！"
        		}else if(!reg.test(this.oprice)){
        			msg = "请正确输入原价价格！"
        		}else if(this.categoryId ==""){
        			msg = "请选择商品类目！"
        		}else if(this.brandId ==""){
        			msg = "请选择商品品牌！"
        		}
        		if(msg==''){
        			return true;
        		}else{
	    			Toast({
					  message: msg,
					  position: 'bottom',
					  duration: 2000
					});
        			return false;
        		}
        	},
        	//校验是否输入
        	checkEmpty:function(){
        		if(this.title !="" && this.description !="" && this.addressCity !="" && this.imageOriginalUrl.length>0 !="" && this.price !="" && this.oprice !="" && this.categoryId !="" && this.brandId !=""){
					return this.subinfo = true;
				}else{
					return this.subinfo = false;
				}
        	},
        	//返回
        	back:function(){
        		this.$router.push({name:'home'});
        	}
        },
        watch:{
			$route(n,o){
				//获取选取的主图
				if(o.params.index){
					this.mainIndex = o.params.index;
				}
				//获取地址
				var params = sessionStorage.getItem("params");
	        	if(params){
	        		params = JSON.parse(params);
	        		//选择地址
	        		if(params.province){
	        			this.addressProvince = params.province;
	        		}
	        		if(params.city){
	        			if(params.city=='市辖区'){
	        				this.addressCity = params.province;
	        			}else{
	        				this.addressCity = params.city;
	        			}
	        		}
	        		if(params.area){
	        			this.addressArea = params.area;
	        		}
	        		//选择类目
	        		if(params.categoryName){
	        			this.categoryName = params.categoryName;
	        		}
	        		if(params.categoryId){
	        			this.categoryId = params.categoryId;
	        		}
	        		if(params.categorySecondtId){
	        			this.categorySecondtId = params.categorySecondtId;
	        		}
	        		//品牌
					if(params.brandName){
	        			this.brandName = params.brandName;
	        		}
					if(params.brandId){
	        			this.brandId = params.brandId;
	        		}
					if(params.applicable){
						var applicable = params.applicable
						if(applicable){
							this.appdata = applicable.split(",");
							if(this.appdata.length>0){
								this.hasapplicable = true;
							}
						}else{
							this.hasapplicable = false;
						}
					}
	        	}
			},
			title:function(){
				this.checkEmpty();
			},
			description:function(){
				this.checkEmpty();
			},
			addressCity:function(){
				this.checkEmpty();
			},
			imageOriginalUrl:function(){
				this.checkEmpty();
			},
			price:function(){
				this.checkEmpty();
			},
			oprice:function(){
				this.checkEmpty();
			},
			categoryId:function(){
				this.checkEmpty();
			},
			brandId:function(){
				this.checkEmpty();
			},
		},
    }
</script>
<style type="text/css" lang="scss">
	.release-container{
		.mint-cell:first-child .mint-cell-wrapper{
			background-origin:content-box;
		}
		.mint-cell-wrapper{
			background-position: bottom left;
			background-image: linear-gradient(180deg, #E5E5E5, #E5E5E5 100%, transparent 100%);
		}
		.mint-cell:last-child{
			background-image:inherit;
		}
		.mint-cell {
			min-height: 52px;
		}
	}	
</style>
<style scoped lang="scss">
	.release-container{
		color:#333333;
		padding: 45px 15px 80px;
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
			font-size: 15px;
			padding-left: 35px;
			line-height: 45px;
			background-position: left center;
			background-repeat: no-repeat;
			background-size: 30px;
			background-image: url(../release/img/address.jpg);
		}
		.upfile-nav{
			display: flex;
			flex-wrap: wrap;
		}
		.upfile-nav li{
			width: 22%;
			height: 90px;
			margin: 1%;
			display: inline-block;
			position: relative;
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			background-color: #F7F7F7;
		}
		.upfile-nav li:last-child{
			margin-right: 0px;
		}
		li.li-upfile{
			background-image: url(../release/img/add_img.png);
			background-size: 35px;
			text-align: center;
			background-position: center 22px;
			em{
				display: inline-block;
				margin-top: 58px;
			}
			input.upfile{
				width: 100%;
				height: 100%;
				opacity: 0;
				position: absolute;
				left: 0px;
				top: 0px;
			}
		}
		li i{
			width: 25px;
			height: 25px;
			position: absolute;
			top: -13px;
			left: -13px;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 20px;
			background-image: url(../release/img/delete.png);
		}
		li span{
			position: absolute;
			bottom: 0px;
			display: inline-block;
			width: 100%;
			background-color: rgba(254,206,56,0.8);
			text-align: center;
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
			em{
				position: absolute;
				top: 45px;
    			right: 30%;
			}
			
		}
		.add,.reduce{
			height: 20px;
			width: 25px;
			display: inline-block;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 12px;
		}
		.add{
			background-image: url(../release/img/add_ico.png);	
		}
		.add.active{
			background-image: url(../release/img/add_ico_active.png);	
		}
		.reduce{
			background-image: url(../release/img/reduce_ico.png);	
		}
		.reduce.active{
			background-image: url(../release/img/reduce_ico_active.png);	
		}
		.num{
			padding: 0px 15px;
		}
		.radio-type{
			width: 48%;
			display: inline-block;
			input[type='radio']{
				height: auto;
				width: auto;
				padding: 3px;
			}
			input[type='radio'] +span{
				font-size: 15px;
				height: 23px;
				padding-left: 30px;
				line-height: 25px;
				display: inline-block;
				background-repeat: no-repeat;
				background-position: left center;
				background-size: 23px;
				background-image: url(../release/img/radio.png);
			}
			input[type='radio']:checked +span{
				background-image: url(../release/img/radio_active.png);
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
			background-color: rgba(220,220,220,1);
		}
		.suresub:active{
			background-color: rgba(254,206,56,0.8);
		}
		.suresub{
			background-color: rgba(254,206,56,1);
		}
	}
	
</style>

