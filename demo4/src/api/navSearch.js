import {fetch} from '../assets/js/merge.js'
//搜索热门和最近
export function searchHotRecent(textType,userid){
		const url = 'webgoods/queryHotSearch';
	  const params = Object.assign({}, {
	  		from: 'WX',
	    	actType: '1',
	    	textType:textType,
	    	userid:userid
	  })
	  console.log(params)
	  return fetch(url, params,'');
	  
}
