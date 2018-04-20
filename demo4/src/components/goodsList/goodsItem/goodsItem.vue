<template>
  <div class="goodsItem">
    <div class="fixHeader positionF">
      <div class="goodListHeader heigh45 PLR20 textC clearfix">
        <router-link :to="{name: 'goodsList'}" tag="span" class="inlineB fl">
          <img src="~assets/img/leftArrow.png" alt="leftArrow" class="leftArrow positionR" width="10"/>
        </router-link>
        <span class="inlineB width70 textC heigh30 serchBox radius15 positionR">
          <router-link :to="{name: 'navSearch',query:{searchReturn:'goodsList'}}" tag="span">
              <img src="../../../assets/img/searchIcon.jpg" alt="search" width="22" class="MT3">
            <span class="greyText searchText">{{sentOpt.searchText}}</span>
          </router-link>
        </span>
        <img src="~assets/img/selectIcon.png" alt="leftArrow" class="selectBtn fr" width="15" @click="selectGoods"/>
      </div>
      <div class="line"></div>
      <ul class="searchHeader height44 clearfix greyText textC">
        <li class="width33_3 fl" @click="toggleCityChoose">
          <span class="PR3">{{defaultArea}}</span>
          <div class="arrowDown inlineB"></div>
        </li>
        <li class="width33_3 fl" @click="selectSubClassify">
          <span class="PR3">{{defaultCategory}}</span>
          <div class="arrowDown inlineB"></div>
        </li>
        <li class="width33_3  fl" @click="compreRank">
          <span class="PR3">{{defaultRank}}</span>
          <div class="arrowDown inlineB"></div>
        </li>
      </ul>
    </div>
    <Loadmore :bottom-method="loadBottom"
              :bottom-all-loaded="allLoaded" ref="loadmore"
              :bottom-pull-text="bottomPullText"
              :autoFill="false"
    >
      <ul class="goodsList PLR5P clearfix textL" :class="{height400:igoodsList.length===0}">
        <li class="dataNull" v-if="igoodsList.length===0">
          <img src="./img/dataNull.png" alt="" width="100%">
          <p class="textC PT10P blackText">当前没有任何商品</p>
        </li>
        <li class="listItem fl width48P" :class="{MR3P:index%2==0}" v-for="(val,index) in igoodsList">
          <img :src="val.imgMainUrlNarrow" width="100%" height="162" @click="goDetail(val.id)"/>
          <!--<img src="./img/listItem.jpg" width="100%"/>-->
          <p class="font12 blackText MT8 clearfix">
            <em class="fl title">{{val.title}}</em>
            <img :src="val.userConcern==0?collectPic.unCollect:collectPic.collect" width="13" class="fr MR5 collection"
                 @click="_collection(val.id,val.userConcern,$event)">
            {{val.userConcern}}
        </p>
          <p class="price roseRedText font14">
            <em>&yen;</em>
            <em>{{val.salePrice}}</em>
          </p>
          <div class="listLine"></div>
          <p class="address blueText PB15 font12 MT6">
            <em class="city">{{val.addressCity}}</em>
            <em>|</em>
            <em>{{val.addressArea}}</em>
          </p>
        </li>
      </ul>
    </Loadmore>
    <!--地区选择-->
    <cityChoose :isShowCityChoose="isShowCityChoose" @areaSelected="onAreaSelected"
                @closeAddress="closeNowShowBox('isShowCityChoose')" :nowArea="nowArea"></cityChoose>
    <!--二级分类-->
    <subClassify :isShowSubClassify="isShowSubClassify"
                 @closeSubClassify="closeNowShowBox('isShowSubClassify')"
                 :subParentList="subParentList"
                 :subChildList="subChildList"
                 @subParentIdSel="subParentSel"
                 @subChildIdSel="subChildSel"
    ></subClassify>
    <!--综合排序-->
    <div class="compreRank positionF width100" v-if="isShowCompreRank">
      <ul class="whiteBkg" @click="closeNowShowBox('isShowCompreRank')">
        <li class="list" @click="rank('10','综合排序')">综合排序</li>
        <li class="list" @click="rank('20','最新发布')">最新发布</li>
        <li class="list" @click="rank('30','离我最近')">离我最近</li>
        <li class="list" @click="rank('40','价格最低')">价格最低</li>
        <li class="list" @click="rank('41','价格最高')">价格最高</li>
      </ul>
      <div class="mask" @click="closeNowShowBox('isShowCompreRank')"></div>
    </div>
    <!--筛选商品-->
    <div class="selectGoods positionF width100 whiteBkg" v-if="isShowSelectBox">
      <div class="selectGoodsCon boxSizing blackText">
        <ul class="">
          <li class="selList usualSel">
            <h2 class="font14 PB11">使用程度：</h2>
            <ul class="clearfix PB20">
              <li class="fl" :class="{'active':usedLvData===val}" v-for="(val,index) in useLevel"
                  @click="chooseUseLevel(val,$event)">{{val}}

              </li>
            </ul>
          </li>
          <li class="selList priceSel">
            <h2 class="font14 PB11">价格区间：</h2>
            <ul class="clearfix PB5">
              <li class="fl" @click="choosePrice(0,100,$event)">100以下</li>
              <li class="fl" @click="choosePrice(100,500,$event)">100-500</li>
              <li class="fl" @click="choosePrice(500,1000,$event)">500-1000</li>
              <li class="fl" @click="choosePrice(1000,3000,$event)">1000-3000</li>
              <li class="fl" @click="choosePrice(3000,5000,$event)">3000-5000</li>
              <li class="fl" @click="choosePrice(5000,null,$event)">5000以上</li>
            </ul>
            <div>
              <span>自定义价格：</span>
              <input type="text" class="width27 textC priceIpt height28" v-model="sentOpt.sealPriceStart">
              <em class="priceLine">
              </em>
              <input type="text" class="width27 textC priceIpt height28" v-model="sentOpt.sealPriceEnd">
              <em>元</em>
            </div>
          </li>
          <li class="selList brandList">
            <h2 class="font14 PB15">品牌：</h2>
            <ul class="clearfix PB20">
              <li class="fl" :class="{'active':index===0}" v-for="(val,index) in brandList"
                  @click="chooseBrandLevel(val.brandId,$event)">{{val.brandName}}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="selectGoodsBtn yellowBGBtn font14" @click="selConfirmBtn">确定</div>
      <div class="mask" @click="closeNowShowBox('isShowSelectBox')"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cityChoose from 'components/base/cityChoose/cityChoose.vue'//省市区三级联动组件
  import subClassify from 'components/base/subClassify/subClassify.vue'//商品分类组
  import {getIGoodsList, getBrandListPage, setCollection, getGoodsCategoryList} from 'api/goodsItem.js';//引入接口函数
  import {getUserLoginStatus, getCityInfo} from 'assets/js/merge.js';//引入登录拦截
  import {Toast} from 'mint-ui';
  import {Loadmore} from 'mint-ui';
  //  import myLoadMore from 'components/base/loadMore/loadMore.vue'//下拉刷新组件
  export default{
    data(){
      return {
        allLoaded: false,//分页数据是否已经加载完毕
        isShowCityChoose: false,//显示选择地区列表
        defaultArea: "上海",//默认地址
        nowArea: "",//当前位置
        defaultCategory: "全部",//默认商品分类
        isShowSubClassify: false,//是否显示商品二级分类
        isShowCompreRank: false,//是否显示综合排序
        isShowSelectBox: false,//是否显示综合排序弹框
        igoodsList: [],//闲置商品数据
        collectPic: {unCollect: require("assets/img/unCollect.png"), collect: require("assets/img/collect.png")},
        localCollectStat: {},//本地存储的用户收藏状态
        useLevel: ["全部", "全新", "二手"],//使用程度
        subParentList: [],//二级分类父级列表
        subChildList: [],//二级分类子级列表
        brandList: [],//品牌列表
        defaultRank: "综合排序",//默认排序方式
        bottomPullText: "上拉加载更多",//上拉提示信息
        usedLvData:"全部",//使用程度数据  用于控制active状态
//        applicablePeople:["不限","男","女"],//适用人群\
        sentOpt: {
          sortMode: 10,//排序方式  默认综合排序
          sealPriceStart: null,//销售价格开始
          sealPriceEnd: null,//销售价格结束
          brandId: null,//品牌ID
          cityId: null,//区域ID
          cityName: null,//区域名
          goodsSale: null,//使用程度级别
          categoryId: null,//分类id
          searchText: null,//检索用关键字
          current: 1,//当前的页码
          pageSize: 10,//每页限制多少数据
        },//要传递的数据
      }
    },
    components: {
      cityChoose, subClassify,Loadmore
    },
    methods: {
      //消息提示
      _toast(msg){
        Toast({
          message: msg,
          position: 'bottom',
          duration: 2000
        });
      },
      //选定区域
      onAreaSelected(address){
        this.isShowCityChoose = false;
        this.defaultArea = address.area.name;//设定默认区域
        if (address.city.name === "县" || address.city.name === "市辖区") {
          this.sentOpt.cityId = address.province.code;//直辖市
          this.sentOpt.cityName = address.province.name;
        } else {
          this.sentOpt.cityId = address.city.id;
          this.sentOpt.cityName = address.city.name;
        }
        $("#app").toggleClass('positionF')
        this.sentOpt.current = 1;//重置页码
        getIGoodsList(this.sentOpt).then((res) => {
          if (res.rescode == '00000') {
            this.igoodsList = res.list
          } else {
            this._toast(res.resmsg);
          }
        });
      },
      //切换显示隐藏地区选择
      toggleCityChoose(){
        this.nowArea = getCityInfo();
        console.log(this.nowArea);
        this.closeShowBoxCom("isShowCityChoose");
        this.isShowCityChoose = !this.isShowCityChoose;
        if (this.isShowCityChoose) {
          $("#app").addClass('positionF')
          $(".dataNull").addClass("none");
        } else {
          $("#app").removeClass('positionF')
          $(".dataNull").removeClass("none");
        }//给body加上绝对定位防止底下还可以滚动
      },
      //商品二级分类
      selectSubClassify(){
        this.closeShowBoxCom("isShowSubClassify");
        this.isShowSubClassify = !this.isShowSubClassify;
        if (this.isShowSubClassify) {
          $("#app").addClass('positionF')
          $(".dataNull").addClass("none");
        } else {
          $("#app").removeClass('positionF')
          $(".dataNull").removeClass("none");
        }//给body加上绝对定位防止底下还可以滚动
      },
      //获取二级分类数据
      _getSubClassifyData(){
        let options = {};
        options.searchType = 1;
        getGoodsCategoryList(options).then((res) => {
          if (res.rescode == '00000') {
            this.subParentList = res.list;
          } else {
            this._toast(res.resmsg);
          }
        })
      },
      //二级商品父级选择事件  参数  父级ID
      subParentSel(parentId){
        let options = {};
        options.searchType = 2;
        options.categoryParentId = parentId;
        getGoodsCategoryList(options).then((res) => {
          if (res.rescode == '00000') {
            this.subChildList = res.list;
          } else {
            this._toast(res.resmsg);
          }
        })
      },
      //二级菜单子级选择事件 参数：商品分类ID  商品名称
      subChildSel(parentId, name){
        this.closeNowShowBox('isShowSubClassify');
        this.sentOpt.categoryId = parentId;
        this.sentOpt.current = 1;//重置页码
        getIGoodsList(this.sentOpt).then((res) => {
          if (res.rescode == '00000') {
            this.igoodsList = res.list;
            this.defaultCategory = name;
          } else {
            this._toast(res.resmsg);
          }
        })
      },
      //综合排序
      compreRank(){
        this.closeShowBoxCom("isShowCompreRank");
        this.isShowCompreRank = !this.isShowCompreRank;
        if (this.isShowCompreRank) {
          $("#app").addClass('positionF');
          $(".dataNull").addClass("none");
        } else {
          $("#app").removeClass('positionF');
          $(".dataNull").removeClass("none");
        }//给body加上绝对定位防止底下还可以滚动
      },
      //筛选按钮
      selectGoods(){
        this.closeShowBoxCom("isShowSelectBox");
        this.isShowSelectBox = !this.isShowSelectBox;
        if (this.isShowSelectBox) {
          $("#app").addClass('positionF')
          $(".dataNull").addClass("none");
        } else {
          $("#app").removeClass('positionF')
          $(".dataNull").removeClass("none");
        }
      },
      //点击当前关闭所有删选弹框   参数： 不关闭的区域
      closeShowBoxCom(unClose){
        var closeArr = ["isShowCityChoose", "isShowSubClassify", "isShowCompreRank", "isShowSelectBox"];//所有弹框
        var reaseArr = [];//要关闭的弹框
        for (var i = 0; i < closeArr.length; i++) {
          if (closeArr[i] != unClose) {
            reaseArr.push(closeArr[i])
          }
        }
        //关闭所有非当前窗口
        for (var i = 0; i < reaseArr.length; i++) {
          var val = reaseArr[i];
          this[val] = false;
        }
      },
      //点击蒙版关闭当前弹窗  参数：  当前弹框
      closeNowShowBox(nowContent){
        this[nowContent] = false;
        $("#app").removeClass('positionF')
        $(".dataNull").removeClass("none");
      },
      //获取闲置商品列表
      _getIGoodsList(){
        getIGoodsList(this.sentOpt).then((res) => {
          if (res.rescode == '00000') {
            this.igoodsList = res.list;
          } else {
            this._toast(res.resmsg);
          }
        });
      },
      //添加取消收藏  参数  商品ID  用户关注状态0未关注  event
      _collection(id, state, e){
        //登录拦截
        var oLoginStatus = getUserLoginStatus(this);
        if (!oLoginStatus) {
          return;
        }
        state++;//跟关注商品的接口保持一致
        if (this.localCollectStat.id) {
          this.localCollectStat.id = this.localCollectStat.id;
        } else if (this.localCollectStat.id === false) {
          this.localCollectStat.id = this.localCollectStat.id;
        } else {
          this.localCollectStat.id = state;
        }
        let sentOpt = {};
        var oEle = $(e.target);
        //改变图片地址
        if (this.localCollectStat.id === false) {
          oEle.attr("src", this.collectPic.collect);
          sentOpt.operation = 1;
        } else if (this.localCollectStat.id === true) {
          oEle.attr("src", this.collectPic.unCollect);
          sentOpt.operation = 2;
        } else {
          if (state === 1) {
            oEle.attr("src", this.collectPic.collect);
            sentOpt.operation = 1;
          } else {
            oEle.attr("src", this.collectPic.unCollect);
            sentOpt.operation = 2;
          }
        }
        sentOpt.goodsId = id;
        sentOpt.dataType = "IGOODS";
        setCollection(sentOpt).then((res) => {
          if (res.rescode == '00000') {
            //本地存储用户的操作状态
            if (sentOpt.operation === 1) {
              this.localCollectStat.id = true;
            } else {
              this.localCollectStat.id = false;
            }
            this._toast(res.resmsg);
          } else {
            if (sentOpt.operation === 1) {
              this.localCollectStat.id = true;
            } else {
              this.localCollectStat.id = false;
            }
            this._toast(res.resmsg);
          }
        })
      },
      //获取品牌信息接口
      _getBrandListPage(){
        let options = {};
        options.current = 1;
        options.pageSize = 10;
        options.categoryId = 1;
        options.brandType = 1;
        options.brandSale = null;
        options.sortMode = 3;
        getBrandListPage(options).then((res) => {
          if (res.rescode == '00000') {
            this.brandList = res.list;
            this.brandList.unshift({brandName: "全部", brandId: null})
          } else {
            this._toast(res.resmsg);
          }
        })
      },
      //排序方式  参数  排序字段   排序名称
      rank(sortMode, rankName){
        this.sentOpt.sortMode = sortMode;
        this.defaultRank = rankName;
        getIGoodsList(this.sentOpt).then((res) => {
          if (res.rescode == '00000') {
            this.igoodsList = res.list;
          } else {
            this._toast(res.resmsg);
          }
        })
      },
      //按钮选取Dom操作
      selectBtnDom(obj){
        $(obj).toggleClass('active');
        $(obj).siblings().removeClass('active');
      },
      //选择筛选方式
      chooseUseLevel(val, e){
        this.selectBtnDom(e.target);
        if (val === '全部') {
          this.sentOpt.goodsSale = null;
          this.usedLvData='全部';
        } else if (val === '全新') {
          this.sentOpt.goodsSale = 2;
          this.usedLvData='全新';
        } else if (val === '二手') {
          this.sentOpt.goodsSale = "N2";
          this.usedLvData='二手';
        }
        this.sentOpt.current = 1;//重置页码
      },
      //选择价格区间  参数 最低价格  最高价格  event   sealPriceStart
      choosePrice(startval, endVal, e){
        this.sentOpt.sealPriceStart = startval;
        this.sentOpt.sealPriceEnd = endVal;
        this.selectBtnDom(e.target);
      },
      //选择品牌  参数  品牌ID  event
      chooseBrandLevel(brandId, e){
        this.selectBtnDom(e.target);
        this.sentOpt.brandId = brandId;
      },
      //筛选确定按钮
      selConfirmBtn(){
        var temp = null;
        var startVal = this.sentOpt.sealPriceStart;
        var endVal = this.sentOpt.sealPriceEnd;
        //如果最低价格比最高价格大  互换
        if (startVal && endVal && startVal > endVal) {
          temp = startVal;
          startVal = endVal;
          endVal = temp;
          this.sentOpt.sealPriceStart = startVal;
          this.sentOpt.sealPriceEnd = endVal;
        }
        this.sentOpt.current = 1;//重置页码
        getIGoodsList(this.sentOpt).then((res) => {
          if (res.rescode == '00000') {
            this.closeNowShowBox("isShowSelectBox");//关闭弹窗
            this.igoodsList = res.list;
          } else {
            this._toast(res.resmsg);
          }
        });
      },
      // 上拉加载更多数据
      loadBottom() {
        this.sentOpt.current++;
        //操作数据Push
        getIGoodsList(this.sentOpt).then((res) => {
          if (res.rescode == '00000') {
            if (res.list.length) {
              for (let i = 0; i < res.list.length; i++) {
                this.igoodsList.push(res.list[i]);
              }
            }
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            if (res.totalNum === this.igoodsList.length) {
              this.allLoaded = true;// 若数据已全部获取完毕
              this._toast("暂无更多数据");
            }
          } else {
            this._toast(res.resmsg);
          }
        })

      },
      //
      goDetail(id){
        this.$router.push({
          name: 'physicalGoodsDetails',
          query: { Id: id }
        })
      }
    },
    created(){
      this.sentOpt.searchText=this.$route.query.searchValue;
      this._getIGoodsList();//获取闲置商品数据
      this._getSubClassifyData();//拉取二级分类数据
      this._getBrandListPage();//拉取品牌数据
    }
  }
</script>

<style>
  .serchBox {
    background: #f1f2f2;
    top: 7px;
  }

  .height400 {
    height: 400px;
  }

  .radius15 {
    border-radius: 15px;
  }

  .line {
    width: 100%;
    height: 2px;
    background: #f5f6f6;
  }

  .height44 {
    height: 44px;
    line-height: 44px;
  }

  .goodsItem .goodsList {
    padding-top: 92px;
  }

  .fixHeader {
    width: 100%;
    background: #fff;
    z-index: 1;
  }

  .arrowDown {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #999;
    padding-top: 2px;
  }

  .PB11 {
    padding-bottom: 11px;
  }

  .PR3 {
    padding-right: 3px;
  }

  .MR3P {
    margin-right: 3%;
  }

  .width48P {
    width: 48%;
  }

  .width27 {
    width: 27%;
  }

  .PB15 {
    padding-bottom: 15px;
  }

  .MT8 {
    margin-top: 8px;
  }

  .price {
    margin: 2px 0 3px;
  }

  .listLine {
    width: 100%;
    background: #f7f7f7;
    height: 1px;
  }

  .MT6 {
    margin-top: 6px;
  }

  .heigh40 {
    height: 40px;
    line-height: 40px;
  }

  .selectBtn {
    margin-top: 15px;
  }

  .searchText {
    top: -5px;
    position: relative;
  }

  * {
    box-sizing: content-box;
  }

  .heigh45 {
    height: 45px;
    line-height: 45px;
  }

  .height28 {
    height: 28px;
    line-height: 28px;
  }

  .leftArrow {
    top: 5px;
  }

  .compreRank {
    height: 90vh;
    top: 90px;
    left: 0;
  }

  .compreRank ul {
    height: 69.5vh;
    padding-left: 5%;
  }

  .compreRank ul .list {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    color: #333;
  }

  .mask {
    width: 100%;
    height: 24vh;
    background: rgba(0, 0, 0, 0.2);
  }

  /*筛选按钮*/
  .selectGoods {
    height: 63vh;
    top: 90px;
    left: 0;
  }

  .selectGoods .selectGoodsCon {
    margin: 0 5%;
    border-top: 1px solid #f4f4f4;
    padding-top: 10px;
  }

  .selectGoods .selectGoodsCon .usualSel li {
    width: 18.3%;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    margin-right: 2.9%;
    text-align: center;
    font-size: 12px;
  }

  .selectGoods .selectGoodsCon .usualSel li.active {
    background: #FECE38;
  }

  .selectGoods .selList ul li {
    background: #F5F6F6;
  }

  .selectGoods .priceSel ul li {
    width: 27%;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    margin-right: 3.2%;
    text-align: center;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .selectGoods .priceSel ul li.active {
    background: #FECE38;
  }

  .priceIpt {
    border: 1px solid #DADADA;
  }

  .priceLine {
    display: inline-block;
    width: 5%;
    height: 0px;
    border-bottom: 2px solid #979797;
    position: relative;
    bottom: 5px;
  }

  .selectGoods .brandList ul li {
    width: 28%;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    text-align: center;
    margin-right: 5%;
    margin-bottom: 10px;
  }

  .brandList ul li.active {
    background: #FECE38;
  }

  .selectGoodsBtn {
    height: 44px;
    line-height: 44px;
    text-align: center;
  }

  .dataNull {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 10em;
    overflow: hidden;
  }

  .collection.active {

  }
</style>
