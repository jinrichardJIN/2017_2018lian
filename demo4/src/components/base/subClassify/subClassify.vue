<!--商品二级分类组件-->
<template>
    <div class="subClassify positionF width100 clearfix whiteBkg" v-if="isShowSubClassify">
        <div class="subClassCon clearfix">
          <ul class="leftList width25 fl blackText font14 textOver textC boxSizing">
            <li v-for="val in subParentList" @click="selectParentList(val.id,$event)">{{val.name}}</li>
          </ul>
          <ul class="rightList width75 fl greyText font12 textOver textL gracyBg boxSizing">
            <li  v-for="value in subChildList" @click="selectChildList(value.id,value.name)">{{value.name}}</li>
          </ul>
        </div>
        <div class="mask" @click="closeSubClassify"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props:["isShowSubClassify","subParentList","subChildList"],
        data(){
            return {}
        },
        methods:{
          //点击蒙版关闭
          closeSubClassify(){
            this.$emit('closeSubClassify',true);
          },
          //选择父级分类 参数： 父类ID  event
          selectParentList(parentId,ev){
            $(ev.target).addClass("active");
            $(ev.target).siblings().removeClass("active");
            this.$emit('subParentIdSel',parentId);
          },
          //选择子级分类
          selectChildList(parentId,name){
            this.$emit('subChildIdSel',parentId,name);
          }
        }
    }
</script>

<style scoped>
  .subClassify{
    height: 69.5vh;
    top:91px;
    left:0;
  }
  .subClassify .subClassCon{
    height: 69.5vh;
    top:91px;
    left:0;
  }
  .textOver {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .gracyBg {
    background: #f5f6f6;
  }
  .leftList{
    overflow: auto;
    height:100%;
  }
  .leftList li{
    height:30px;
    line-height:30px;
    box-sizing: border-box;
    padding:0 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .leftList li.active{
    background: #f5f6f6;
  }
  .rightList{
    overflow: auto;
    height:100%;
  }
  .rightList li{
    height:30px;
    line-height:30px;
    box-sizing: border-box;
    padding-left:5%;
    border-top:1px solid #eceded;
    border-bottom:1px solid #eceded;
    margin-top:-1px;
  }
</style>
