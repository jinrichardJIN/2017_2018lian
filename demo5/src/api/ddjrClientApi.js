/**
 * Created by huamin on 2018/2/7.
 */
import {fetch,getRealPath,getAES} from 'assets/js/merge.js'

//1.79	获取二手商品订单列表  参数详情请参阅1.79	获取二手商品订单列表–乔敏
export function clientRequest(options,token) {
  options.data ? options.data = getAES(options.data) : void 0;        // AES 将参数加密    如果参数有data  就传更改data
  const url = `${getRealPath()}javaservice/webClient`;
  return fetch(url, options, token,'')
}
