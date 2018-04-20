/**
 * Created by Administrator on 2018/1/17.
 */
import {fetch,baseJsonpUrl} from 'assets/js/merge.js'

//1.79	获取二手商品订单列表  参数详情请参阅1.79	获取二手商品订单列表–乔敏
export function clientRequest(options,token) {
  options.from = 'WEB';
  const url = `${baseJsonpUrl()}/loans-client/webClient.do`;
  return fetch(url, options, token,'')
};
