<template>
	<div>
 		<div class="evaluate">
  	<header class="model-evaluation">
        <router-link :to="{name: correctReturn}" v-if="defaultIndex===1" class="top-router-back">
        	<img src="../../image/leftArrow.png" alt="" />
        	<h1 class="mui-title">机型评估</h1>
        </router-link>
        <div v-if="defaultIndex!=1" class="evbox">
          <span @click="goPrevPage" class="mui-icon mui-action-back mui-icon-left-nav">
          	<img src="../../image/leftArrow.png" alt="" />
          	<h1 class="mui-title">机型评估</h1>
          </span>
        </div>
      </header>
    <div v-for="(val,index) in rGoodsData" class="evaluatemuicontent">
      <!--机型评估选项-->
      <div class="mui-content" v-if="defaultIndex==index+1&&!selectNum">
        <div class="eval-nav">
          <span>
          	{{goodsName}}
          </span>
          <span>
          	{{defaultIndex}}/{{dataLength+1}}
          </span>
        </div>
        <p class="eval-type">{{val.propertyName}}</p>
        <ul class="eval-list">
          <li class="mui-table-view-cell" @touchstart="active" 
              v-for="(itemValue,index1) in val.rGoodsPropertyValueDtos"
              @click="chooseIfo(itemValue.value,itemValue.propertyId,itemValue.id,index,index1,$event)"
              :class="{active:itemName.toString().indexOf(itemValue.value)>-1}"
          >{{itemValue.value}}
          </li>
        </ul>
      </div>
      <footer class="mui-bar-footer eval-foot-next" v-if="defaultIndex===dataLength&&!selectNum">
        <div class="next" @click="checkSelect">下一步</div>
      </footer>
    </div>
    <!--选择台数-->
    <div class="mui-content" v-if="selectNum">
      <div class="eval-nav">
        {{goodsName}}<span>{{defaultIndex}}/{{dataLength+1}}</span>
      </div>
      <p class="eval-type">选择台数</p>
      <ul class="eval-list">
        <li @click="choseNum(1)" :class="{active:chosenum==1}">1台</li>
        <li @click="choseNum(2)" :class="{active:chosenum==2}">2台</li>
        <li @click="choseNum(3)" :class="{active:chosenum==3}">3台</li>
        <li @click="choseNum(4)" :class="{active:chosenum==4}">4台</li>
        <li @click="choseNum(5)" :class="{active:chosenum==5}">5台</li>
      </ul>
    </div>
  </div>
	</div>
</template>

<script>
  	import axios from 'axios';
	import contextPath from '../../js/commonUtils.js';
	import TipFunction from '../../js/merge.js';
  
  export default{
    data(){
      return {
        goodsId: "",//商品ID
        goodsName:'',
        rGoodsData: [],//回收流程步数数据
        dataLength: 0,//控制生成选项页数量
        defaultIndex: 1,//初始化的时候展示页码
        choosedItem: [],//已选项目---视图层数据
        choosedLastItem: [],//多选项----视图层数据
        chooseData: [],//所有已选数据----传给后台用
        mutiSelectId: [],//多选的id
        itemName:[],//多选的商品名
        selectNum:false,//是否显示选择台数
        upImg:false,//是否显示上传图片
        recyMeth: [], //支持回收方式
        chosenum:0,//选择台数,
        choseItemName:[],//选择名称,
        recMethod:'',//回收方式
        correctReturn: '', //应该放回的列表
        rgoodsPreImgSet:'',//预审信息
      }
    },
    methods: {
    	
    	active(){
    		event.target.style.backgroundColor='#FECE38'
    	},
      //数组去重
      uniqueArr(Arr){
        var obj = {};
        for (var i = 0; i < Arr.length; i++) {
          var cur = Arr[i];
          if (obj[cur] == cur) {
            Arr.splice(i, 1);
            i--;
            continue;
          }
          obj[cur] = cur;
        }
        obj = null;
      },
      //选择项依次对应 选项名称 商品属性ID  商品属性取值ID  外层页面index  里层选项index
      chooseIfo(itemValue,propertyId, rgoodsPropertyValueId, index, index1, ev){
        //多选
        if (this.defaultIndex === this.dataLength) {
          if (this.choosedItem[index]) {
            //切换选取取消
            if ($(ev.target).hasClass('active')) {//多项取消选中
              var that = this;
              ev.target.style.backgroundColor='white'
              for (var i = 0; i < this.choosedItem[index].length; i++) {
                if (this.choosedItem[index][i] == index1) {
                  this.choosedItem[index].splice(i, 1);//单选去除重复项
                  this.mutiSelectId.splice(i, 1);//多选去商品ID除重复项
                  //this.itemName[index1]=null;//多选商品名去除重复项
                }
              }
				this.itemName.forEach(function(d,i){
              	if(d.indexOf(","+itemValue)>-1){
              		that.itemName[i]=that.itemName[i].replace(","+itemValue,'');
              		return;
              	}else if(d.indexOf(itemValue+",")>-1){
              		that.itemName[i]=that.itemName[i].replace(itemValue+",",'');
              		return;
              	}else if(d.indexOf(itemValue)>-1){
              		that.itemName.splice(i,1);
              		return;
              	}
              })
							//处理取消多选选中，
							var choseId = this.chooseData[index].rgoodsPropertyValueId;
							var arr_choseId = choseId.split(",");
							//如果arr_choseId.length==1 则移除掉整个多选数据，如果大于1则仅仅从rgoodsPropertyValueId移除掉相应的id即可
							if(arr_choseId.length>1){
								arr_choseId.splice(index1,1);
								this.chooseData[index].rgoodsPropertyValueId = arr_choseId.join(",");
							}else{
								this.chooseData.splice(index,1);
							}
            } else {
              //未选择项
              this.choosedItem[index].push(index1);
              this.mutiSelectId.push(rgoodsPropertyValueId);
              this.uniqueArr(this.mutiSelectId);
              if(this.itemName[index]){
              	this.itemName[index]=this.itemName[index]+","+itemValue;
              }else{
              	this.itemName[index]=itemValue;
              }
              this.chooseData[index] = {"rgoodsPropertyId": propertyId, "rgoodsPropertyValueId" : this.mutiSelectId.join(",")};
              this.uniqueArr(this.choosedItem[index]);//多选去重
            }
          } else {
            //初始多选为空的状态
            this.choosedItem[index] = [index1];
            this.mutiSelectId.push(rgoodsPropertyValueId);
            this.uniqueArr(this.mutiSelectId);
            this.itemName[index]=itemValue;
            this.chooseData[index] = {"rgoodsPropertyId": propertyId, "rgoodsPropertyValueId": this.mutiSelectId.join(",")};
          }
          $(ev.target).toggleClass("active");
          return;
        } else {
          this.choosedItem[index] = [index1];//单选
          this.itemName[index]=itemValue;
          this.chooseData[index] = {"rgoodsPropertyId": propertyId, "rgoodsPropertyValueId": rgoodsPropertyValueId};//单选
          $(ev.target).toggleClass("active");
        }
        this.defaultIndex++;
      },
      //返回上一选项
      goPrevPage(){
        if (this.defaultIndex > 1) {
          this.defaultIndex--;
          this.selectNum=false;
        } else {
          this.defaultIndex = 1;
        }
      },
      //下一步按钮  检查是否必填选择都已选------>此处为可选项（liufeng 07-13）
      checkSelect(){
      	this.defaultIndex=this.dataLength+1;
        this.selectNum=true;
      },
      /**
       *选择台数----liufneg 07-13 
       * @param {Object} n:所选这的数量
       */
      choseNum(n){
      	this.chosenum = n;
      	//获取评估价格
      	var param = {
      		from:'WX',
					rgoodsId:this.goodsId,
					rgoodsInquiryInfo:JSON.stringify(this.chooseData)
      	}
				var that = this;
				axios.get(contextPath.contextPath+'wainquiry/submitRGoodsInquiryInfo', { params:param})
					.then(function(res) {
						//将商品询价id
						var t_price = (res.data.rgoodsInquiryPrice)*that.chosenum.toFixed(2);
						if(res.data.rescode == '00000'){
							var s_param = {
								goodsId:that.goodsId,
								goodsName:that.goodsName,
								price:res.data.rgoodsInquiryPrice,
								infoId:res.data.rgoodsInquiryInfoId,
								num:that.chosenum,
								recMethod:that.recMethod,
								rgoodsPreImgSet:that.rgoodsPreImgSet,
								evalData:that.itemName.join(",")
							}
							sessionStorage.setItem("param",JSON.stringify(s_param));
							/*alert(that.$router.push)
						that.$router.push({path:'/evaluatePrice'});
								*/
							/*that.$router.push({
								'path': '/evaluatePrice'
							})*/
							
							var h0=window.location.href;
							var h1=h0.substring(0,h0.indexOf('evaluatePublic'));
							window.location.href = h1+'evaluatePrice';
							setTimeout(function(){
								window.location.reload();
							},200)
							
							//window.location.href = contextPath.contextPath+'toWebappPage/dist/index#/evaluatePrice'

						}else{
							alert(res.resmsg);
						}
					})
					.catch(function(response) {
						TipFunction.loadingMessage(response);
						setTimeout(function() {
							TipFunction.hideLoading();
						}, 2000);
					});
      }
    },
    computed:{
    	
    },
    created () {
    	var recyMeth = this.$route.query.recyMeth;
    	this.recyMeth = recyMeth;
      //获取商品ID
      var id = this.$route.query.id;
      this.goodsId = id;
      //获取跳进来的路由名称
      var correctReturn = this.$route.query.correctReturn;
      if(correctReturn){
      	this.correctReturn = correctReturn;
      }else{
      	this.correctReturn = 'index.home'
      }
    },
    mounted(){
      //获取商品详情接口
      axios.get(contextPath.contextPath+'wagoods/goods/findGoodsById', {params: {from: 'WX', rgoodsId: this.goodsId}})
        .then((data) => {
          var oData = data.data;
          if (oData.rescode === "00000") {
          	this.rgoodsPreImgSet = oData.data.rgoodsPreImgSet;    
            var rGoodsGroupDtos = oData.data.rGoodsGroupDtos;
            var datalist = [];
            var type2list = [];
            if(rGoodsGroupDtos){
            	rGoodsGroupDtos.forEach(function(d,i){
            		var gptDtos = d.rGoodsPropertyDtos;
            		var gtype = d.groupType
            		if(gptDtos && gptDtos.length>0){
            			gptDtos.forEach(function(g){
										if(gtype == 2){
											g.propertyName = d.groupName;
											type2list.push(g);
										}else if(gtype == 1){
											datalist.push(g);
										}
            			});
            		}
            	})
            }
            if(type2list.length>0){
            	this.rGoodsData = datalist.concat(type2list);
            }else{
            	this.rGoodsData = datalist;
            }
            this.dataLength = this.rGoodsData.length;
            this.goodsName = oData.data.goodsName;
            this.recMethod = oData.data.recycleMode;
          } else {
            TipFunction.loadingMessage(oData.resmsg);
			setTimeout(function() {
				TipFunction.hideLoading();
			}, 2000);
          }
        })
        .catch((err) => {
          	console.log(err)
        });
    },
    //离开路由之前 将数据
		beforeRouteLeave(fromObject,goObject,resolve){
			if(fromObject.name == 'evaluatePrice'){
					window.localStorage.rgoodsInquiryInfo = JSON.stringify(this.chooseData);
			}
			resolve();
		}
  }
</script>

<style scoped>
  .mui-content {
    background-color: #F5F6F6;
  }

  .eval-foot-next {
    background: #fece38;
  }

  .eval-foot-next .next {
    color: #423f33;
  }
</style>
