<!--element-ui datepicker日期选择组件http://element.eleme.io/#/zh-CN/component/date-picker-->
<template>
  <div>
    <div class="block">
      <span class="demonstration"></span>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        format="yyyy/MM/dd"
        :picker-options="pickerOptions0"
        @change="dateChange"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
      };
    },
    methods: {
      dateChange(val){
        //对外传递选取的日期
        this.$emit('get-date', val)
      }
    }
  };
</script>

<style >
  .linkman .el-input__icon{
    right:10px;
  }
</style>
