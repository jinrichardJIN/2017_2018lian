<!--element-ui select自定义下拉组件http://element.eleme.io/#/zh-CN/component/date-picker-->
<template>
    <div class="">
      <el-select v-model="value" placeholder="请选择时间"  @change="dateChange">
        <el-option
          v-for="item in selectData"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ["selectData"],
    data() {
      return {
          value:""
      }
    },
    methods:{
      dateChange(val){
        //对外传递选取的时间段
        this.$emit('get-hour', val)
      }
    }
  }
</script>

<style>
</style>
