 /**
 * Created by Administrator on 2017/6/21.
 */
//公用方法js
import Vue from 'vue'

var contextPath = "";

function getRealPath() {
	//获取当前网址，如： http://localhost:8083/myproj/view/my.jsp
	var curWwwPath = window.document.location.href;
	//获取主机地址之后的目录，如： myproj/view/my.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.lastIndexOf(pathName);
	//获取主机地址，如： http://localhost:8083
	var localhostPaht = curWwwPath.substring(0, pos);
	//获取带"/"的项目名，如：/myproj
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	if(projectName.indexOf('shop-webservice')>=0){
		contextPath=localhostPaht + projectName +"/";
	}else{

		contextPath=localhostPaht+"/";
	}

	contextPath = 'http://localhost:8080/api/'

	//得到了 http://localhost:8083/myproj
	//contextPath = localhostPaht + projectName + '/';
	/*if(contextPath.indexOf('zhihuiup')>0&&contextPath.indexOf('s')!=4){
		contextPath='https'+contextPath.substring(4,contextPath.length)
	}*/
	console.log('https'+contextPath.substring(4,contextPath.length))
}
getRealPath();

export default {
	contextPath
}

