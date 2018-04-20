<template>
  <div>
    <div class="search-box">
      <header class="home-search-top">
        <div id="searchModel">
          <input type="search" placeholder="搜索您的回收机型型号" v-model="searchModel">
        </div>
        <router-link :to="{name:searchReturn}">
          <!--<img src="../image/close.png" alt="" />-->
        </router-link>
      </header>
      <div class="mui-content MC">
        <div>
          <p class="ls">历史询价机型</p>
          <ul class="searchM">
            <li class="mui-clearfix mui-col-xs-12" v-for='item in list' @click="goodsId(item.goodsName)">
              <p class="mui-col-xs-5 fl" v-html="item.goodsName">苹果 15年 15寸</p>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
//  import contextPath from '../js/commonUtils.js';
  import axios from 'axios';
//  import TipFunction from '../js/merge.js';

  export default {
    data() {
      return {
        //因为接口需要登录权限
        list: [],
        searchModel: '',
        searchReturn:''
      }
    },
    methods: {
      goodsId(id) {
        //地址暂未确定
        axios.get(contextPath.contextPath + 'wagoods/getHistoryInquiryGoodsPage', {
          params: {
            from: 'WX',
            pageSize: 10
          }
        })
          .then((data) => {
            var oData = data.data;
            if(oData.rescode === "00000") {
              this.list = oData.list;

              this.$router.push({path:'/goodsList',query:{searchText:id}});

            } else {

              TipFunction.loadingMessage(oData.resmsg);
              setTimeout(function() {
                TipFunction.hideLoading();
              }, 2000)
            }
          })
          .catch((err) => {

            TipFunction.loadingMessage(err);
            setTimeout(function() {
              TipFunction.hideLoading();
            }, 2000)
          });
      }
    },
    mounted() {
      axios.get(contextPath.contextPath + 'wagoods/getHistoryInquiryGoodsPage', {
        params: {
          from: 'WX',
          pageSize: 10
        }
      })
        .then((data) => {
          var oData = data.data;
          if(oData.rescode === "00000") {
            this.list = oData.list;
          } else {
            TipFunction.loadingMessage(oData.resmsg);
            setTimeout(function() {
              TipFunction.hideLoading();
            }, 2000)
          }
        })
        .catch((err) => {
          TipFunction.loadingMessage(err);
          setTimeout(function() {
            TipFunction.hideLoading();
          }, 2000)
        });
    },
    created() {
      //获取路径
      var searchReturn = this.$route.query.searchReturn;
      this.searchReturn = searchReturn;
      if(searchReturn){
        this.searchReturn = searchReturn;
      }else{
        this.searchReturn = 'index.home'
      }
      //确认键触发搜索事件。
      var that = this;
      document.onkeydown = function(event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode == 13) {
          //搜索商品列表
          /*		axios.get(contextPath.contextPath + 'wagoods/goods/getGoodsList', {
           params: {
           from: 'WX',
           searchText: that.searchModel
           }
           })
           .then((data) => {
           console.log(that.searchModel)
           var oData = data.data;
           if(oData.rescode === "00000") {
           //        this.list = oData.list;
           } else {
           console.log(oData.resmsg)
           }
           })
           .catch((err) => {
           console.log(err);
           });*/

          that.$router.push({path:'/goodsList',query:{searchText:that.searchModel}});
        }
      };

    }
  }
</script>

<style>

</style>
