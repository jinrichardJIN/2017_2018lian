/**
 * Created by Administrator on 2017/8/9.
 */
import {fetch} from 'assets/js/merge.js'

//获取闲置商品列表  参数详情请参阅1.47	获取闲置商品列表–乔敏
export function getIGoodsList(options) {
  const url = 'waigoods/getIGoodsList';
  const params = Object.assign({}, {
    from: 'WX',
    sortMode:options.sortMode,
    brandId:options.brandId,
    cityId:options.cityId,
    cityName:options.cityName,
    goodsSale:options.goodsSale,
    sealPriceEnd:options.sealPriceEnd,
    sealPriceStart:options.sealPriceStart,
    categoryId:options.categoryId,
    current: options.current,
    pageSize: options.pageSize,
    searchText: options.searchText,
    loginUserId: options.loginUserId
  })
  return fetch(url, params, '')
};
//获取二级分类数据   参数   检索类型 1：最顶级 2：最低级  可空 为空时默认全部   商品类型 1:回收商品 2:二手商品 例（1,2）  分类标签 1:精选 2:推荐    分类父ID
export function getGoodsCategoryList(options) {
  const url = 'wagoods/getGoodsCategoryList';
  const params = Object.assign({}, {
    from: 'WX',
    searchType: options.searchType,
    goodsType: 2,
    categorySale:options.categorySale,
    categoryParentId:options.categoryParentId
  })
  return fetch(url, params, '')
};
//获取品牌信息  getBrandListPage 参数  平台来源 当前页数 页大小  分类ID  品牌类别 1:系统创建 2:用户自建  品牌标签 1:热门 2:推荐  排序方式（1:ID升序2:ID倒序3:品牌英文简称排序）
export function getBrandListPage(options) {
  const url = 'wagoods/getBrandListPage';
  const params = Object.assign({}, {
    from: 'WX',
    current: options.current,
    pageSize: options.pageSize,
    categoryId:options.categoryId,
    brandType:options.brandType,
    brandSale:options.brandSale,
    sortMode:options.sortMode
  })
  return fetch(url, params, '')
};
//添加取消收藏(用户关注)
export function setCollection(options) {
  const url = 'waconcern/userConcerns';
  const params = Object.assign({}, {
    from: 'WX',
    goodsId: options.goodsId,
    operation: options.operation,
    dataType:options.dataType
  })
  return fetch(url, params, '')
};
