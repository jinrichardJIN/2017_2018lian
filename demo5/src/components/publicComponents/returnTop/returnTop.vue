<template>
  <div>
    <transition name="fade">
      <div class="returnTop positionF" @click="returnTop" v-show="isShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
var top = 0;
export default{
  data(){
    return {
      isShow: false
    }
  },
  methods:{
      returnTop(){
        $('body,html').animate({
          scrollTop: 0
        },500);
      }
  },
  mounted(){
    var _this =this;
    this.$nextTick(function () {
      $(window).on('scroll',function () {
        top  = document.body.scrollTop;
        if(document.body.scrollTop > 100 ){
          _this.isShow = true;
        }else{
          _this.isShow = false;
        }
      })
    })
  }

}
</script>

<style rel="stylesheet" type="text/css">
.returnTop{
  bottom: 60px;
  width: 50px;
  height: 50px;
  background: url("./top.png") no-repeat;
  background-size: 100%;
  right: 30px;
  cursor: pointer;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
@media only screen and (max-width: 798px) {
  .returnTop{
    display: none;
  }
}

</style>
