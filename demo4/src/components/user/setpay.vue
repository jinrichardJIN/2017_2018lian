<template>
	<div id="account">
		<header class="concern-header withdrawalsheader">
			<span id="back" v-on:click="back">
				<img src="../../image/leftArrow.png" alt="" />
			</span>
			<h1 class="mui-title">设置支付宝账户</h1>
		</header>
		<div class="withdrawalsContent">
			<div class="inp">
				<span>收款人</span>
				<input v-model="realname" type="text" placeholder="支付宝认证的真实姓名">
			</div>
			<div class="inp">
				<span>支付宝账户</span>
				<input v-model="bankCode" type="text" placeholder="必须填写与收款人对应的账号">
			</div>
				<button @click="goverify">下一步验证手机</button>
			<p class="tip">请确定支付宝实名认证，否则无法提现！</p>
		</div>
	
	</div>
</template>

<script>
import axios from "axios";
import contextPath from '../../js/commonUtils.js';
import TipFunction from '../../js/merge.js';
var that;
export default {
		data() {
			//模板数据
			return {
				data:'',
				realname:'',
				bankCode:'',
				channel:sessionStorage.getItem('channel')
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
			back(){
				window.history.back()
			},
			goverify(){
				if(this.realname==''||this.bankCode==''){
					TipFunction.loadingMessage('真实姓名或支付宝账户不能为空');
				setTimeout(function() {
					TipFunction.hideLoading();
				}, 2000);
					return
				}
				this.$router.push({name: 'checkmobile',params: {realname:this.realname,bankCode:this.bankCode,type:'1',btnname:'验证',requestType:'BANK_BIND'}})
			}
			
		},
		computed: {

		}
		
	}
</script>

<style scoped type="text/css" lang="scss">
.withdrawalsContent{
    margin: 70px 30px;
    .inp{
        width: 100%;
        height: 80px;
        display: flex;
        border-bottom: 1px solid #DEDEDE;
        span{
            width: 1rem;
            align-self: center;
            font-size: .13rem;
            color: #333333;
        }
        input{
            width: 100%;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */  
            color: #999999;
            font-size: .11rem;
        }  
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
           color: #999999;
           font-size: .11rem;
        }  
        ::-moz-placeholder { /* Mozilla Firefox 19+ */  
           color: #999999;
           font-size: .11rem;
        }  
        :-ms-input-placeholder { /* Internet Explorer 10+ */  
           color: #999999;
           font-size: .11rem;
        }
    }
    button {
        width: 100%;
        height: 50px;
        background-color: #fece38;
        display: block;
        margin-top: 30px;
        color: rgba(0,0,0,.9);
        font-size: .14rem;
        color: #333333;
        
    }
    .tip{
        text-align: center;
        line-height: 44px;
        font-size: 14px;
        color: rgba(0,0,0,.5);
    }
}
.withdrawalsheader{
    border-bottom: 1px solid #EDEDED;;
    #back{
        padding-left: 20px;
        position: absolute;
        img{
            width: .1rem;
            height: .16rem;
        }
    }
    .mui-title{
        font-size: .15rem;
        color: #333333;
    }
}

</style>