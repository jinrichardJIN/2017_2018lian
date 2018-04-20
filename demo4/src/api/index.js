import {fetch} from 'assets/js/merge.js'

export function getBannerList() {//banner图
  const url = 'wagoods/banner/getBannerList';
  const params = Object.assign({}, {
  		from: 'WX',
    	actType: '1'
  })
  return fetch(url, params,'')
};
export function getActGoodsList() {//秒杀商品
  const url = 'webactGoods/getActGoodsList';
  const params = Object.assign({}, {
  		from: 'WX',
  		actType: '2'
  })
  return fetch(url, params,'')
};
export function getGoodsCategoryList() {//品牌
  const url = 'webgoods/getGoodsCategoryList';
  const params = Object.assign({}, {
  		from: 'WX',
  		categorySale: '1'
  })
  return fetch(url, params,'')
}
//获取闲置商品列表
export function getIGoodsList(variable) {
  const url = 'waigoods/getIGoodsList';
  const params = Object.assign({},variable, {
    from: 'WX',
    goodsSale:'3',
  })
  return fetch(url, params,'')
};