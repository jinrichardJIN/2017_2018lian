<template>
<div id='app'>
<!--         <loading v-show="!isLoaded&&!isShow"></loading>
        {{isMobile}} -->
        <v-head v-if="$route.meta.isShow != 'loan'"></v-head>
   <div id='main' ref='main'>
       <!-- <transition name='slide'> -->
         <router-view></router-view>
       <!-- </transition> -->
   </div>
      <v-foot v-show="!(isLandingPage&&!isShow)" v-if="$route.meta.isShow != 'loan'" :class="{whiteBkg:isMedia}"></v-foot>
 </div>
</template>
<script>
 import Header from './components/header/header.vue'
 import Footer from './components/footer/footer.vue'
 import Loading from './components/loading/loading.vue'
 import {mapState} from 'vuex';
 export default {
    data(){
      return{
      }
    },
    methods:{

    },
    computed:{
       ...mapState([
         'isLandingPage','isShow','isLoaded','isMedia'
       ])
    },
    mounted(){
    this.$nextTick(()=>{
      this.isLoaded=false;
      var minHeight=$(window).height();
      this.$refs.main.style.minHeight=minHeight+"px"
    })
  },
   components:{
     'v-head':Header,
     'v-foot':Footer,
     'loading':Loading
   }
}
</script>
<style   lang="scss" rel="stylesheet/scss" >
body{
  overflow-x:hidden
}
 @media only screen and (max-width: 798px){
  .load{
    position:fixed;
    top: 0;
    width:100%;
    height:100%;
    z-index: 100000;
    background: #fff;
}
.load img{
    margin-top:60%;
}
  .slide-enter-active, .slide-leave-active {
    transition: all .3s;
    // transform:translateX(100%);
  }
  .slide-enter{
     opacity:0;
  }
  .slide-leave-active{
     opacity:0;
  }
 }
  #main{

    background:#F7F7F8;
  }
</style>
