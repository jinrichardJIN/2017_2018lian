<template>
	<div class="reportBox">
		<header class="font16">
    		<i class="back"></i>
    		<p class="title">举报</p>
    		<p class="other">提交</p>
    	</header>
		
		<div class="reportContent" v-for="(item,index) in repeatNew">
			<p v-html="item.groupName"></p>
			<ul>
				<li v-for="a in item.groupInfoList" 
					v-html="a.codeName" 
					@click="addActive(index,a.codePid,a.id,a.codeName)"
					:class="{ active:classItem[a.id] }" >
				</li>
			</ul>
		</div>
		<p>文字描述</p>
		<div class="textareaBox">
			<textarea name="" rows="" cols="" v-model="description" placeholder="请尽可能详细描述举报原因，若有截图，举报可能会更快（可选)" maxlength="200"></textarea>
			<span>{{compSysnum}}/200</span>
		</div>
		<p>图片凭证</p>
		<div class="imgVoucher">
			<ul>
				<li v-for="(m,index) in imageOriginalUrl" :style="{backgroundImage:'url('+m+')'}">
					<img src="../goodsItem/img/upclose.png" alt="" @click.stop="deleteImg(index)" />
				</li>
				<li class="li-upfile">
					<em class="tip-text font12">添加照片</em>
					<input type="file" class="upfile"  @change="upfile" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { fetch } from 'assets/js/merge.js';
	import { Indicator } from 'mint-ui';
	
	export default {
		data() {
			return {
				description: '', //描述
				imageOriginalUrl: [], //上传图片集合——原图
				imageNarrowUrl: [], //上传图片集合——缩略图
				repeatNew:[],//违规信息标题
				informItem:[],//举报项json
				informItemOne:[],//举报项未处理json
				classItem:{},
				choseItem:[],//
				saveSelectObject:[]		//存储选择的对象
			}
		},
		computed: {
			//计算可输入字数
			compSysnum: function() {
				return this.description.length;
			},
		},
		methods: {
			//点击增加active
			addActive(index,codePid,id,codeName){
				var _that = this;
				_that.$set(_that.classItem,id,true);
				
				var chose = {
					index:index,
					chose:{
						id:id,
						name:codeName
					}
				}
				this.choseItem.push(chose);
				
				
				
				//	lj
				this.saveSelectObject[index] = codeName;  //存储数据
														  //改变样式
				
				
				
				
				
				
				
				
				
				
				
			},
			//上传图片
			upfile: function() {
				if(this.imageOriginalUrl && this.imageOriginalUrl.length > 2) {
					Toast({
						message: '最多上传3张图片',
						position: 'bottom',
						duration: 2000
					});
					return false;
				}
				var file = $(".upfile")[0].files[0];
				//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
				if(!/image\/\w+/.test(file.type)) {
					Toast({
						message: '请确保文件为图像类型',
						position: 'bottom',
						duration: 2000
					});
					return false;
				}
				if(file.size > 5 * 1024 * 1024) {
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
				reader.onload = function(e) {
					var result = this.result;
					result = result.substring(result.indexOf(",") + 1, result.length - 1);
					Indicator.open({
						text: '上传中...',
						spinnerType: 'fading-circle'
					});
					fetch("waevaluate/evaluateUpImg", {
						from: 'WX',
						imgData: result,
						imgName: file.name,
						groupName: 'idlegoods'
					}).then((res) => {
						Indicator.close();
						if(res.rescode == '00000') {
							_this.imageOriginalUrl.push(res.imageIconOriginal);
							_this.imageNarrowUrl.push(res.imageIconDispose);
						}
					})
				}
			},
			//删除图片
			deleteImg: function(o) {
				var _this = this;
				//创建删除图片参数
				var parms = {
					from: 'WX',
					imageIconOriginal: _this.imageOriginalUrl[o],
					imageIconDispose: _this.imageNarrowUrl[o]
				}
				//判断如果是主图被删除，
				if(o == _this.mainIndex) {
					_this.mainIndex = 0;
				}
				_this.imageOriginalUrl.splice(o, 1);
				_this.imageNarrowUrl.splice(o, 1);
				fetch("waevaluate/delEvaluateUpImg",
					parms
				).then((res) => {
					Toast({
						message: res.resmsg,
						position: 'bottom',
						duration: 2000
					});
				});
			},
		},
		created() {
			fetch("waInform/getCodeList", 
		        {
					from: 'WX',
		        }
	       	).then((res)=>{
	          	if(res.rescode == '00000'){
	          		this.repeatNew = res.list;
	          		console.log(this.repeatNew);
	          	}
	        })
		}
	}
</script>

<style scoped type="text/css" lang="scss">
	header {
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 1px solid #F5F6F6;
		div {
			width: calc(100%/3);
			img {
				height: 22px;
			}
			&:first-child {
				text-align: left;
				img {
					height: 14px;
				}
			}
			&:last-child {
				display: flex;
				justify-content: flex-end;
			}
			&:nth-child(2) {
				p {
					text-align: center;
					font-size: 15px;
					color: #333333;
				}
			}
		}
	}
	.reportBox {
		margin-top: 45px;
		padding:0 20px 20px;
	}
	.reportContent {
		display: flex;
		flex-direction: column;
		p {
			margin: 20px 0;
			font-family: '.PingFangSC-Regular';
			font-size: 15px;
			color: #333333;
			letter-spacing: 0;
			display: block;
			float: left;
		}
		ul {
			width: 100%;
			display: block;
			overflow: hidden;
			li {
				float: left;
				margin: 7px 14px 7px 0;
				padding: 9px 16px;
				background: #F5F6F6;
				border-radius: 100px;
				font-family: '.PingFangSC-Regular';
				font-size: 13px;
				color: #999999;
				letter-spacing: 0;
				&.active{
					background: #FECE38;
					color: #333333;
				}
			}
		}
	}
	p {
		margin: 20px 0;
		font-family: '.PingFangSC-Regular';
		font-size: 15px;
		color: #333333;
		letter-spacing: 0;
		display: block;
		float: left;
	}
	.textareaBox {
		overflow: hidden;
		height: 99px;
		width: 100%;
		position: relative;
		textarea {
			height: 99px;
			border: 1px solid #D8D8D8;
			padding: 10px;
			resize: none;
			width: 100%;
		}
		span {
			position: absolute;
			bottom: 10px;
			right: 10px;
			text-align: right;
			color: #999999;
		}
	}
	.imgVoucher {
		width: 100%;
		ul {
			display: flex;
			flex-direction: row;
			width: 100%;
			li {
				background-position: center;
				background-repeat: no-repeat;
				background-size: cover;
				background-color: #F7F7F7;
				padding: 0;
				margin-right: 7px;
				width: 76px;
				height: 76px;
				position: relative;
				img {
					width: 76px;
					height: 76px;
					&:first-child {
						position: absolute;
						top: -7px;
						left: -7px;
						width: 15px;
						height: 15px;
					}
				}
				&:last-child {
					width: 76px;
					height: 76px;
					position: relative;
					background-image: url(../goodsItem/img/add_img.png);
					background-repeat: no-repeat;
					background-size: 60%;
					background-position: 14px 10px;
					input {
						opacity: 0;
						width: 100%;
						height: 100%;
					}
					em {
						display: block;
						position: absolute;
						bottom: 0;
						width: 100%;
						text-align: center;
						font-family: '.PingFangSC-Regular';
						font-size: 11px;
						color: #CDD1D1;
						letter-spacing: 0;
						margin-bottom: 10px;
					}
				}
			}
		}
	}
</style>