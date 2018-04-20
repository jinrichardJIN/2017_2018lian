<!--省市区三级联动组件-->
<template>
  <div class="cityChoose positionF width100 boxSizing" id="cityChoose" v-if="isShowCityChoose">
    <div class="header textL gracyBg">
      <p class="greyText font12">GPS定位</p>
      <p class="blackText font14">
        <em class="province">{{nowArea.cityName}}</em>
       <!-- <em class="city">武汉市</em>
        <em class="area">武昌区</em>-->
      </p>
    </div>
    <ul class="address clearfix outHide textC">
      <li class="province width25 fl blackText whiteBkg height100P overAuto boxSizing" ref="province">
          <ul>
            <li class="textOver height30 PLR5 boxSizing" v-for="prov in proData"
                @click="onprovinceSel(prov.code,prov.name,prov.parentId,$event)">
              {{prov.name}}
          </li>
          </ul>
      </li>
      <li class="city width30 fl height100P gracyBg greyText overAuto boxSizing">
        <ul>
          <li class="textOver height30 listBorder" v-for="city in cityData1" v-if="cityData1.length!=0"
              @click="onCitySel(city.code,city.name,city.parentId,$event)">{{city.name}}

          </li>
        </ul>
      </li>
      <li class="area width45 fl height100P boxSizing gracyBg textOver greyText overAuto">
        <ul>
          <li class="textOver height30 listBorder" v-for="area in areaData1" v-if="areaData1.length!=0"
              @click="onAreaSel(area.code,area.name,area.parentId,$event)">{{area.name}}

          </li>
        </ul>
      </li>
    </ul>
    <div class="mask" @click="closeAddress"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import _ from 'lodash'
  import BScroll from 'better-scroll'
  import {province} from 'assets/js/city-data.js'
  import {city} from 'assets/js/city-data.js'
  import {area} from 'assets/js/city-data.js'

  var proData = province;//所有省份原始数据
  var cityData = city;//所有市区原始数据
  var areaData = area;//所有区域原始数据
  export default{
    props: ["isShowCityChoose","nowArea"],
    data(){
      return {
        proData: proData,//省级数据 生成列表用
        cityData1: null,//市级数据 生成列表用
        areaData1: null,//区域数据 生成列表用
        city: {},//选中的市级数据
        area: {},//选择的区级数据
        address:{}//对外输出省市区数据
      }
    },
    methods: {
      //选择省份参数 ： 编码  省名 父级ID  event
      onprovinceSel(code, name, parentId, e){
        this.selectPro.code = code;
        this.selectPro.name = name;
        this.selectPro.id = parentId;
        this.cityData1 = _.filter(cityData, (n) => {
          return n.parentId == this.selectPro.code
        });
        this.area={};//重置地区数据
        this.areaData1={};//重置地区数据 显示层
        $(e.target).siblings().removeClass('active');
        $(e.target).addClass('active');
      },
      //选择市区参数 ： 编码  市名 父级ID  event
      onCitySel(code, name, parentId, e){
        this.city.code = code;
        this.city.name = name;
        this.city.id = parentId;
        this.areaData1 = _.filter(areaData, (n) => {
          return n.parentId == this.city.code
        });
      },
      //选择市区参数 ： 编码  市名 父级ID  event
      onAreaSel(code, name, parentId, e){
        this.area.code = code;
        this.area.name = name;
        this.area.id = parentId;
        this.address.province=this.selectPro;
        this.address.city=this.city;
        this.address.area=this.area;
        this.$emit('areaSelected',this.address)
      },
      //点击蒙版关闭
      closeAddress() {
        this.$emit('closeAddress',true);
      },
    },
    created(){
    },
    computed: {
      //选中的省份
      selectPro(){
        return {};
      },
      //选择的市
      selectCity(){
        return this.city;
      }
    }
  }
</script>

<style scoped>
  .cityChoose {
    height: 90vh;
    top:91px;
    left:0;
  }

  .gracyBg {
    background: #f5f6f6;
  }

  .PB18 {
    padding-bottom: 18px;
  }

  .textOver {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .header {
    padding: 16px 0 0 5.2%;
    height:48px;
  }

  .address {
    height: 60vh;
  }

  .height30 {
    height: 30px;
    line-height: 30px;
  }
  .mask{
    width:100%;
    height:20vh;
    background: rgba(0,0,0,0.2);
  }
  .overAuto{
    overflow: auto;
  }
  .province li.active{
    background: #f5f6f6;
  }
  .listBorder{
    border:1px solid #e3e3e3;
    margin-top:-1px;
    margin-left:-1px;
  }
</style>
