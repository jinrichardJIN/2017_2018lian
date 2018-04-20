<template>
	<div>
  	<div class="assess-box" :class="{showprotocol}">
    <header class="roder-top">
      <router-link :to="{name: 'choiceRecycling',query:{rgoodsId:sendIfo.rgoodsId,recyMeth:recyMeth}}">
      	<img src="../../image/leftArrow.png" alt="" />
      </router-link>
      <h1 class="mui-title">填写信息</h1>
    </header>
    <div class="mui-content">
      <div class="mui-col-xs-12 recov-pro">
        <div class="recov-pro-head mui-clearfix">
          <div class="round change-active fl"></div>
          <div class="long change-active fl"></div>
          <div class="round round-active fl"></div>
          <div class="long fl"></div>
          <div class="round fl"></div>
        </div>
        <div class="mui-clearfix recov-pro-tst">
          <p class="mui-col-xs-3 fl">回收方式</p>
          <p class="mui-col-xs-6 fl">填写信息</p>
          <p class="mui-col-xs-3 fl">提交成功</p>
        </div>
      </div>
      <p class="mui-row"><img src="../../image/bg-img9.jpg" class="mui-col-xs-2"></img><span class="mui-col-xs-10 payment-method">联系人信息</span> </p>
      <div class="linkman">
        <input type="text" placeholder="输入您的姓名" maxlength="20" v-model="sendIfo.contactsName" @keyup="onkeyupCheck"/>
        <div class="rig-arr">
        	<button type="button" class="mui-col-xs-12 mui-navigate-right" @click="selectAddress">{{defaultCity}}</button>
        </div> 
        <div class="address">
          <input type="text" placeholder="输入您的详细地址" maxlength="50" v-model="sendIfo.doorAddressDetail" @keyup="onkeyupCheck"/>
	        <!--<div class="inptimg addressIcon"  @click="openBaidu">
	        	<img src="../../image/bg-img10.jpg" alt="" />
	        </div>-->
        </div>
        <!--<div class="rig-arr">
	        <button type="button" class="mui-col-xs-12 mui-navigate-right nobd" @click="showDatePicker"
	                v-if="!isShowDatePicker">
	          		选择交易时间
	        </button>
       	</div> 
        <div class="clearfix" v-if="isShowDatePicker">
          <dataPicker class="fl width50P" @get-date="getSelectDate"></dataPicker>
          <v-select :selectData="selectTime" class="fl width50P" @get-hour="getSelectHour"></v-select>
        </div>-->
      <div class="clearfix">
      		<el-date-picker
			      v-model="doorHopeDate" class="fl width50P" type="date" placeholder="请选择上门日期" format="yyyy/MM/dd" @get-hour="showDatePicker">
			    </el-date-picker>
          <!--<dataPicker class="fl width50P" @get-date="getSelectDate"></dataPicker>-->
          <v-select :selectData="selectTime" class="fl width50P" @get-hour="getSelectHour"></v-select>
      </div>
      </div>
      <div class="mui-row recov-pn mui-clearfix">
        <img src="../../image/bg-img3.jpg" class="mui-col-xs-2"/>
        <input type="tel" class="mui-col-xs-6" placeholder="请输入您的手机号" v-model="sendIfo.contactsMobile"
               @keyup="onkeyupCheck"/>
      </div>
      <div class="pay">
        <div class="txt-nav">
          <textarea name="" rows="4" cols="5" maxlength="300" v-model="userDesc" placeholder="请输入备注内容（可不填）"></textarea>
          <span class="sysnum"><span>{{sysnum}}</span>/300</span>
          <el-checkbox v-model="CheckBoxchecked" @change="onkeyupCheck"></el-checkbox>&nbsp;&nbsp;
          <span class="readService">我已经阅读并同意<a href="javascript:void(0);" @click="showProtocol">闲汇服务条款</a>并确认机器来源合法</span>
        </div>
      </div>
    </div>
    <footer class="mui-bar-footer eval-foot-next" :class="{active:defaultState}">
        <div class="next" @click="checkValue">提交订单</div>
      <!--<router-link :to="{name: 'onsiteSuccess',query:{nextPageData:nextPageData}}">
        {{routerName}}
        <div class="next" @click="checkValue">提交订单</div>
      </router-link>-->
    </footer>
    <vue-area :props-show="show" :props-result="result" v-on:result="areaResult"></vue-area>
    <v-protocol v-show="showprotocol" v-on:closeprotocol="closeProtocol"></v-protocol>
  </div>
	</div>
</template>

<script>
	import TipFunction from '../../js/merge.js';
  	import vueArea from 'vue-area'//三级联动组件调用
  	import dataPicker from '../components/datePicker.vue';//日历组件
  	import vSelect from '../components/select.vue';//下拉组件
  	import axios from 'axios';
	import contextPath from '../../js/commonUtils.js';
	import Protocol from '../components/protocol.vue';
	
  export default{
    components: {
      vueArea, dataPicker, vSelect,
      'v-protocol': Protocol,
    },
    beforeCreate(){
  	    var that = this;
			if(userid === 0){
				//跳登录
				TipFunction.loadingMessage('您尚未登录，为你跳转到登录页面');
				setTimeout(function(){
					TipFunction.hideLoading();
					that.$router.push({path:'/login'})
				},2000);
			}
	},
    methods: {
      //三级联动确认按钮
      areaResult: function (show, result) {
        this.show = show;
        this.result = result;
        if (this.result != null) {
          this.provinceName = this.result.province.name || "";
          if(this.result.city.name == '市辖区'){
          	this.cityName = this.result.province.name;
          }else{
          	this.cityName = this.result.city.name || "";
          }
          this.areaName = this.result.area.name || "";
          this.provinceNo = this.result.province.code || "";
          this.cityNo = this.result.city.code || "";
          this.areaNo = this.result.area.code || "";
          this.defaultCity = this.provinceName + this.cityName + this.areaName;
          this.onkeyupCheck();//校验所有必填项
        }
      },
      //调用三级联动
      selectAddress(){
        this.show = true;
      },
      //显示日期选择
      showDatePicker(){
        this.isShowDatePicker = true;
      },
      //获取选中的日期
      getSelectDate(val){
        this.sendIfo.doorHopeDate = val;
        this.onkeyupCheck();//校验所有必填项
      },
      //获取选中的时间段
      getSelectHour(val){
        this.sendIfo.doorHopeTimeDesc = val;
        this.onkeyupCheck();//校验所有必填项
      },
      //判断是否所有必填项都已填
      checkValue(){
        if (this.sendIfo.contactsName == "") {
        	TipFunction.loadingMessage('请输入联系人  ');	
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
          return;
       } else if (this.provinceNo == "" || this.cityNo == "" || this.areaNo == "") {
          TipFunction.loadingMessage('请选择您的地址  ');	
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
          return;
       } else if (this.sendIfo.doorAddressDetail == "") {
          TipFunction.loadingMessage('请输入您的详细地址  ');	
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
          return;
       } else if (this.sendIfo.doorHopeDate == "") {
          TipFunction.loadingMessage('请选择上门交易日期  ');	
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
          return;
       } else if (this.sendIfo.doorHopeTimeDesc == "") {
          TipFunction.loadingMessage('请选择上门交易时间  ');	
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
          return;
       } else if (this.sendIfo.contactsMobile == "") {
          TipFunction.loadingMessage('手机号不能为空  ');	
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
          return;
        } else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.sendIfo.contactsMobile)) {
          TipFunction.loadingMessage('请输入正确的手机号  ');	
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
          return;
        }	else if (this.CheckBoxchecked == false) {
          TipFunction.loadingMessage('请阅读协议');	
					setTimeout(function(){
						TipFunction.hideLoading();
					},2000)
          return;
        }
        //验证通过提交数据
        let sedData = {};
        sedData.from = 'WX';
        sedData.rgoodsInquiryInfoId = this.sendIfo.rgoodsInquiryInfoId;
        sedData.rgoodsId = this.sendIfo.rgoodsId;
        sedData.contactsName = this.sendIfo.contactsName;
        sedData.contactsMobile = this.sendIfo.contactsMobile;
        sedData.userDesc = this.userDesc;
        sedData.recoveryMode = "D";
        sedData.doorAddressProvince = this.provinceName;
        sedData.doorAddressCity = this.cityName;
        sedData.doorAddressArea = this.areaName;
        sedData.doorAddressDetail = this.sendIfo.doorAddressDetail;
        sedData.doorHopeDate = this.sendIfo.doorHopeDate;
        sedData.doorHopeTimeDesc = this.sendIfo.doorHopeTimeDesc;
        sedData.goodsNum	=	this.goodsNum;
        if(this.upImg){
					sedData.rgoodsPreImgInfo = this.upImg;
				}
        var that = this;
        if(!that.subing){
					that.subing = true;
	        axios.get(contextPath.contextPath+'waorder/addRecoveryOrder', {params: sedData})
	          .then((data) => {
	            var res = data.data;
			        if (res.rescode === "00000") {
			        	var param = {
			            	orderId : res.orderId,
			            	goodsnum:that.goodsNum,
										rGoodsInquiryPrice : res.rGoodsInquiryPrice,
										orderStatus : res.orderStatus,
										doorHopeDate : res.doorHopeDate,
										doorAddress : res.doorAddress
			          }
								sessionStorage.setItem("param",JSON.stringify(param));
								that.$router.push({path:'/onsiteSuccess'});
	            } else {
	            	that.subing = false;
	              TipFunction.loadingMessage(res.resmsg);
								setTimeout(function(){
									TipFunction.hideLoading();
								},2000)
	            }
	          })
	          .catch((err) => {
	          	that.subing = false;
	            TipFunction.loadingMessage(err);
				setTimeout(function() {
					TipFunction.hideLoading();
				}, 2000)
	          });
				}
      },
      //单个输入框输入后校验是否所有必填项目已填写
      onkeyupCheck(){
        if (this.sendIfo.contactsName == "") {
          this.defaultState = false;
          return;
        } else if (this.provinceNo == "" || this.cityNo == "" || this.areaNo == "") {
          this.defaultState = false;
          return;
        } else if (this.sendIfo.doorAddressDetail == "") {
          this.defaultState = false;
          return;
        } else if (this.sendIfo.doorHopeDate == "") {
          this.defaultState = false;
          return;
        } else if (this.sendIfo.doorHopeTimeDesc == "") {
          this.defaultState = false;
          return;
        } else if (this.sendIfo.contactsMobile == "") {
          this.defaultState = false;
          return;
        } else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.sendIfo.contactsMobile)) {
          this.defaultState = false;
          return;
        } else if (this.CheckBoxchecked == false) {
          this.defaultState = false;
          return;
        }
        this.defaultState = true;
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
				return y+"/"+m+"/"+d
			}
		},
		//打开协议
		showProtocol(){
			this.showprotocol = true;
		},
		//关闭协议
		closeProtocol(){
			this.showprotocol = false;
		},
    },
    computed: {
      isAllChecked: {
        get(){
          return this.defaultState = false;
        },
        set(val){
          return this.defaultState = true;
        }
      }
    },
    watch:{
			userDesc(value){
				this.sysnum = value.length;
			},
			doorHopeDate(value){
				return this.sendIfo.doorHopeDate = this.handDatetime(value);
			}
		},
    data(){
      return {
        result: null,
        show: false,
        defaultCity: "您的地址(省市区)",
        provinceName: "",
        cityName: "",
        areaName: "",
        provinceNo: "",
        cityNo: "",
        areaNo: "",
        defaultState: false,
        isShowDatePicker: false,
        routerName: "",
        CheckBoxchecked:true,
        showprotocol:false,//是否显示用户协议
        sendIfo: {
          rgoodsId: '',//回收商品Id
          rgoodsInquiryInfoId: '',//商品询价数据ID
          goodsNum:1,
          contactsName: "",//联系人姓名
          contactsMobile: '',//联系人手机号
          doorAddressDetail: "",//上门地址详细地址
          userDesc: "",//用户备注
          doorHopeDate: "",//希望上门日期
          doorHopeTimeDesc: ""//希望上门时间
        },
        selectTime: [
	        {
	          value: '上午(9:00-13:00)',
	          label: '上午(9:00-13:00)'
	        }, {
	          value: '下午(13:00-19:00)',
	          label: '下午(13:00-19:00)'
	        }
        ],
        userDesc: "",//用户备注
				recyMeth: [],
				goodsNum: 0,
				subing:false,//是否在提交表单
				sysnum:0,//备注输入字数
				upImg:'',//上传的图片
				doorHopeDate:'',//上门日期
      }
    },
    created(){
    	var mobile = sessionStorage.getItem('mobile');
    	
    	this.sendIfo.contactsMobile = loginMobile || mobile;
    	
    	var parm = eval("("+sessionStorage.getItem("param")+")");
			this.rgoodsId = parm.goodsId;
    	
			this.sendIfo.rgoodsId = parm.goodsId;
			//商品数量
			this.goodsNum = parm.num;
			this.sendIfo.goodsNum = parm.num;
			//询价id
			this.sendIfo.rgoodsInquiryInfoId = parm.infoId;
			//获取上传图片
			this.upImg = parm.upImg;
		},
  }
</script>

<style>
  .width50P,.el-date-editor.el-input.width50P {
    width: 50%;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .clearfix {
  	width: 100%;
    display: inline-block;
  }

  .address {
    position: relative;
  }

  .address .addressIcon {
    height: 30px;
    width: 30px;
    position: absolute;
    right: 5%;
    top: 0;
    margin-top: 15px;
  }

</style>
