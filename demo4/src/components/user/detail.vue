<template>
	<div id="account">
		<header class="concern-header">
			<span id="back" @click="back">
				<img src="../../image/leftArrow.png" alt="" />
			</span>
			<h1 class="mui-title">账户明细</h1>
			<span id="choose" @click="beginc">筛选</span>
		</header>
		<div class="content">
			<span :class="{'router-link-active':isactive}" class="tab" @click="gobalance">
				收入
			</span>
			<span :class="{'router-link-active':!isactive}" class="tab" @click="goturnoutlist">
				提现
			</span>
			<div id="choosecontent" v-show="ishow">
				选择分类
				<br>
				<button v-if="isactive" :class="{cactive:para0.selectType==''}" class="chooseitem" @click="para0.selectType=''">全部</button>
				<button v-if="isactive"  :class="{cactive:para0.selectType=='3'}" class="chooseitem" @click="para0.selectType='3'">推客</button>
				<button v-if="isactive" :class="{cactive:para0.selectType=='2'}" class="chooseitem" @click="para0.selectType='2'">回收</button>
				<button v-if="!isactive" :class="{cactive:para1.selectType=='0'}" class="chooseitem" @click="para1.selectType='0'">用户</button>
				<button v-if="!isactive" :class="{cactive:para1.selectType=='1'}" class="chooseitem" @click="para1.selectType='1'">分销商</button>
				<br>
				价格区间:<input v-model="para0.minAmount" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();" 
					class="distance" type="tel" maxlength="8" id="priceinp">
				—
				<input v-model="para0.maxAmount" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();" 
					class="distance" type="tel" maxlength="8" id="priceinp1">
				<br>
				选择时间:&nbsp;&nbsp;
				<span @click="setCur('1')">
					从<el-date-picker
				      v-model="value6" class="date" type="date">
				    </el-date-picker>
				</span><br />
				<span @click="setCur('2')" class="span2">
					到<el-date-picker 
						v-model="value7" class="date" type="date" >
				    </el-date-picker>
				</span>
				<br>
				<button @click="comfirm" id="comfirm">确定</button>
			</div>
			<router-view>
				
			</router-view>
			
		</div>
	</div>
</template>

<script>
import axios from "axios";
import contextPath from '../../js/commonUtils.js';
import TipFunction from '../../js/merge.js';
import dataPicker from '../components/datePicker.vue';//日历组件

export default {
	components: {
      dataPicker
    },
		data() {
			//模板数据
			return {
				data:'',
				a:1,
				curt:'1',
				ishow:false,
				isactive:true,
				para0:{
					selectType:'',
					maxTime:'',
					minTime:'',
					minAmount:'',
					maxAmount:''
				},
				para1:{
					selectType:'0',
				},
				channel:sessionStorage.getItem('channel'),
				value6:'',
				value7:'',
			}
		},
		beforeCreate() {
			var that=this;
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
			getSelectDate(val){
				if(this.curt=='1'){
					this.para0.minTime=val;
				}else{
					this.para0.maxTime=val;
				}
		      },
		    setCur(a){
		     	this.curt=a;
		     	
		     },
			back(){
				window.history.back()
			},
			goturnoutlist(){
				this.isactive=false;
				this.$router.replace({name: 'turnoutlist', query:{selectType:this.para1.selectType,minAmount:this.para0.minAmount,maxAmount:this.para0.maxAmount,minTime:this.para0.minTime,maxTime:this.para0.maxTime}})
			},
			gobalance(){
				this.isactive=true;
				this.$router.replace({name: 'balance', query:{selectType:this.para0.selectType,minAmount:this.para0.minAmount,maxAmount:this.para0.maxAmount,minTime:this.para0.minTime,maxTime:this.para0.maxTime}})
				
			},
			beginc(){
				this.ishow=!this.ishow;
			},
			comfirm(){
				if(this.para0.minAmount && this.para0.maxAmount){
					if(this.para0.minAmount-this.para0.maxAmount>0){
						var temp = this.para0.minAmount;
						this.para0.minAmount = this.para0.maxAmount;
						this.para0.maxAmount = temp;
					}
				}
				if(this.value6 && this.value7){
					if(this.value6>this.value7){
						TipFunction.loadingMessage('请正确选择时间区间！');
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000);
						return false;
					}
				}
				this.para0.minTime = this.handDatetime(this.value6);
				this.para0.maxTime = this.handDatetime(this.value7);
				this.ishow=false;
				if(this.isactive){
					this.$router.replace({name: 'balance', query:{selectType:this.para0.selectType,minAmount:this.para0.minAmount,maxAmount:this.para0.maxAmount,minTime:this.para0.minTime,maxTime:this.para0.maxTime}})
				}else{
					this.$router.replace({name: 'turnoutlist', query:{selectType:this.para1.selectType,minAmount:this.para0.minAmount,maxAmount:this.para0.maxAmount,minTime:this.para0.minTime,maxTime:this.para0.maxTime}})
				}
				this.para0.minAmount = '';
				this.para0.maxAmount = '';
			},
			//处理选择的时间
			handDatetime(date){
				if(date){
					var h_d = new Date(date);
					var y = h_d.getFullYear();
					var m = h_d.getMonth()+1;
					var d = h_d.getDate();
					if(m<10){
						m = "0"+m;
					}
					if(d<10){
						d = "0"+d;
					}
					return y+"-"+m+"-"+d
				}
			}
		},
		computed: {
			
		},
		mounted() {
			if(window.location.href.indexOf('turnoutlist')>0){
				this.isactive=false;
			}
		}
	}
</script>

<style scoped>
	
	.content{
		margin-top: 70px;
	}
	.tab{
		width: 36%;
		height: 44px;
		margin:0 6%;
		display:inline-block;
		text-align: center;
		line-height: 44px;
	}
	.router-link-active.tab{
		border-bottom: 2px solid #FECE38;
	}
	#back{
		padding-left: 20px;
		position: absolute;
	}
	#back img{
	    width: .1rem;
    	height: .16rem;
	}
	#choose{
		font-size: 14px;
		position: absolute;
		right: 20px;
	}
	#choosecontent{
		width: 100%;
		font-size: 16px;
		background-color: white;
		position: absolute;
		top: 50px;
		padding: 20px;
		padding-bottom: 0;
		box-shadow: 0 5px 20px gainsboro;
		z-index: 1000;
	}
	.chooseitem{
		width: 66px;
		height: 36px;
		margin:10px 5px;
		background-color: rgba(0,0,0,.05);
		font-size: 14px;
		border-radius:18px;
	}
	.distance{
		width: 26%;
		height: 32px;
		border: 1px solid gainsboro;
		margin: 10px;
		text-align: center;
	}
	.cactive{
		background-color:#FECE38;
	}
	#comfirm{
		width: 120%;
		margin-left: -10%;
		height: 44px;
		background-color: #fece38;
		margin-top: 20px;
	}
	.span2{
		margin-left: 22%;
	}
</style>
<style lang="scss">
	
	.el-date-editor.el-input.date{
		width: 50%;
		&:last-child{
			margin-top: 10px;
			margin-left: 10px;
		}
	}
	.date .el-date-editor.el-input{
		width: 100%;
		font-size: 10px!important;
	}
</style>