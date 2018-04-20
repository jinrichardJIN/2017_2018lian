<template>
	<div id="turnout">
		<div class="content pagecontent">
			<div id="btitle">
				提现总金额
			<span>{{account}}</span>
			</div>
			<!--<div @click="see" class="tmouth">
				查看全部
			</div>-->
			<div class="scroll-content" style="height:65vh; overflow-y: scroll;">
				<div id="scrollview" class="scrollview">	
					<div>
						
						<div class="boxNull" v-if="list.length<1">
							<div class="concernBoxNull">
								<img src="../../image/goodsNull.png" alt="" />
								<p>暂无数据</p>
							</div>
						</div>
						
						<div v-for='it in list' class="balancelist" @click="godetailinfo(it)" v-if="list.length>0">
							<div class="bitem">
								<span>
									{{it.createTime.substring(0,10)}}<br>
									{{it.createTime.substring(10)}}
								</span>
								<span class="photo">
									<img v-if="it.paymentType=='3'"  src="../../image/push.png">
									<img v-if="it.paymentType=='2'"  src="../../image/recy.png">
								</span>
								<span>
									<span class="money">{{it.withdrawAmount}}</span>
									{{it.summary}}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
import axios from "axios";
import contextPath from '../../js/commonUtils.js';
import TipFunction from '../../js/merge.js';
import dropload from '../../js/dropload.js';

export default {
		data() {
			//模板数据
			return {
				data:'',
				flag:true,
				account:0,
				para:{
					selectType:'0',
					maxTime:'',
					minTime:'',
					minAmount:'',
					maxAmount:''
				},
				current:0,//当前页
				pageSize:5,//每页显示数
				end:false,
				list:[],
				channel:sessionStorage.getItem('channel')
			}
		},
		watch:{
			$route(n,o){
				this.para.selectType=n.query.selectType;
				this.para.maxAmount=n.query.maxAmount;
				this.para.minAmount=n.query.minAmount;
				this.para.maxTime=n.query.maxTime;
				this.para.minTime=n.query.minTime;
				//this.getall();
				this.current = 0;
				this.list=[];
				dropload.destory("scrollview");
				this.initdropdown();
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
			godetailinfo(a){
				a.type=1;
				this.$router.push({'name':'detailinfo',params:a})
			},
			getall(me,type){
				var _this = this;
				var param = {
					from: 'WX',
					type:this.para.selectType,
					maxTime:this.para.maxTime,
					minTime:this.para.minTime,
					minAmount:this.para.minAmount,
					maxAmount:this.para.maxAmount,
					pageSize:_this.pageSize,
				};
				if(type=='up'){
					param.current = 1;
				}else if(type=='down'){
					param.current = _this.current+1;					
				}
				
				axios.get(contextPath.contextPath + 'wabindBank/getApplyListAndTotal', {
					params: param
				})
				.then(res=> {
					var cData = res.data;
					if(cData.rescode === '00000') {
						_this.account=cData.list.totalAmount
						var list = cData.list.pageList;
						if(list && list.length>0){
							if(type=='down'){
								_this.current = param.current;
								_this.list = _this.list.concat(list);								
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
							_this.list = list;
							// 即使加载出错，也得重置
	               			 me.resetload();
	                        // 重置页数，重新获取loadDownFn的数据
	                        _this.current = 1;
	                        // 解锁loadDownFn里锁定的情况
	                        me.unlock();
	                        me.noData(false);
						}
					}else{
	               		// 即使加载出错，也得重置
	                    me.resetload('error');
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
						},500);
					}
				})
				.catch(function(response) {
					TipFunction.loadingMessage(response);
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000);
				});
			},
			//初始化分页
			initdropdown(){
				var _this = this;
				var options = {
					scrollArea : $(".scroll-content"),
					threshold : 50,
					loadUpFn : function(me){
						_this.getall(me,'up');
					},
					loadDownFn : function(me){
						_this.getall(me,'down');
					},
					initLoad:true,
				}
				dropload.dropload("scrollview",options);
			},
		},
		computed: {

		},
		mounted() {
			this.initdropdown();
		}
	}
</script>

<style scoped>
	
	#btitle{
		padding: 20px;
	}
	#btitle>span{
		float: right;
		color: #F0AD4E;
	}
	#btitle:after{
		content:"";
		width: 99%;
		height: 1px;
		display: block;
		background-color: gainsboro;
		margin: 0 auto;
		margin-top: 20px;
	}
	#back{
		padding-left: 20px;
		position: absolute;
	}
	.tmouth{
		background-color: rgba(0,0,0,.05);
		height: 50px;
		line-height: 50px;
		padding:0 20px;
	}
	.tmouth span{
		float: right;
	}
	.bitem{
		padding: 20px;
		color: darkgrey;
		font-size: 14px;
	}
	.bitem>span{
		float: left;
		margin: 0 5px;
		text-align: center;
	}
	.photo{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
		display: block;
	}
	.photo>img{
		width: 100%;
	}
	.money{
		font-size: 20px;
		color: black;
		display: block;
		text-align: left;
	}
	.bitem:after{
		content:"";
		width: 96%;
		height: 1px;
		display: block;
		background-color: gainsboro;
		margin: 0 auto;
		margin-top:66px ;
		
	}
	.end{
		text-align: center;
		height: 50px;
	}
</style>