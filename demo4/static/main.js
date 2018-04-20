var PD = new Array; //全局重复提交验证数组
var PD2 = new Array;
Array.prototype.indexOf = function(val) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index, 1);
	}
};
//接口函数
function ajaxJsonpRequest(url, str, method) {
	for(var i = 0; i < PD.length; i++) {
		if(PD[i] == url) {
			return false;
		}
	}
	PD.push(url);
	loadingMessage("数据加载中...");
	$.ajax({
		url: url + "?" + str,
		type: "get",
		dataType: "jsonp",
		jsonp: 'callback',
		success: function(data) {
			PD.remove(url);
			hideLoading();
			method(data);
		},
		error: function() {
			PD.remove(url);
			hideLoading();
		}
	});
};
//ajax
function ajaxRequest(url, str, method, type) {

	for(var i = 0; i < PD.length; i++) {
		if(PD[i] == url && PD2[i] == str) {
			//errorMessage("请勿重复请求");
			return false;
		}
	}
	PD.push(url);
	PD2.push(str);

	var typeValue;
	if(type == null || type == "") {
		typeValue = "POST";
	} else {
		typeValue = type;
	}
	loadingMessage("数据加载中...");
	$.ajax({
		url: url,
		type: typeValue,
		dataType: "json",
		// data: port.encrypt(str),
		data: str,
		beforeSend: function(jqXHR, settings) {
			
			jqXHR.setRequestHeader('firmHeader', 'FIRM');
		},
		success: function(data) {
			//method(port.decrypt(data));
			PD.remove(url);
			hideLoading();
			method(data);
		},
		error: function() {
			PD.remove(url);
			hideLoading();
			//errorMessage("请求失败!");
		}
	});
};
//加载中
function loadingMessage(str) {
	var html = '<div class="loadingMessage" style="bottom: 100px; position: fixed; text-align: center; width: 100%; display:none; z-index:2000;"><font style="background-color: rgba(0, 0, 0, 0.7); border-radius: 5px; color: #fff; z-index:1000; display: inline-table; line-height: 170%; max-width: 80%; padding: 5px 10px;">' + str + '</font></div>';
	$("body").append(html);
	$("body .loadingMessage").fadeIn("normal")
}

function hideLoading() {
	$("body .loadingMessage").fadeOut("normal", function() {
		$(this).remove();
	})
}

//报错
function errorMessage(str) {
	if($("body .errorMessage").length > 0) {
		return false;
	}

	function hideError() {
		$("body .errorMessage").fadeOut("normal", function() {
			$(this).remove();
		})
	}
	var html = '<div class="errorMessage" style="bottom: 100px; position: fixed; text-align: center; width: 100%; display:none; z-index:1111;"><font style="background-color: rgba(0, 0, 0, 0.7); border-radius: 5px; color: #fff; z-index:1000; display: inline-table; line-height: 170%; max-width: 80%; padding: 5px 10px;">' + str + '</font></div>';
	$("body").append(html);
	$("body .errorMessage").fadeIn("normal", function() {
		setTimeout(hideError, 3000);
	})
}

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
	//得到了 http://localhost:8083/myproj
	//contextPath = localhostPaht + projectName + '/';
	/*if(contextPath.indexOf('zhihuiup')>0&&contextPath.indexOf('s')!=4){
		contextPath='https'+contextPath.substring(4,contextPath.length)
	}*/
	console.log('https'+contextPath.substring(4,contextPath.length))
}
getRealPath();


function collection() {
	console.log("unbind");
	$('.Collection').unbind('tap');
	console.log("bind");
	var flag=true
	$('.Collection').bind('tap', function() {
		if(flag){
			console.log("tap");
		if($('#islogin').val() == "0") {
			errorMessage("请先完成登陆，再收藏");

		} else {

			$(this).children('.light').toggle();
			var num = parseInt($(this).parent().children('.font-num').html());
			var url = contextPath + "wxuser/collection/collect";
			var colId = this.dataset.id;
			if(this.dataset.type == 'GOODS') {
                console.log("GOODS");
                console.log(this.dataset.iscol);
				if(this.dataset.iscol == 'Y') {
				console.log("Y");
					num -= 1;
					$(this).parent().children('.font-num').html(num.toString());
					var para = "from=WX&dataType=GOODS&operation=2&goodsId=" + colId;
					ajaxRequest(url, para, gocol);
					this.dataset.iscol = 'N';
				} else if(this.dataset.iscol == 'N') {
					console.log("N");
					num += 1;
					$(this).parent().children('.font-num').html(num.toString());
					var para = "from=WX&dataType=GOODS&operation=1&goodsId=" + colId;;
					ajaxRequest(url, para, gocol);
					this.dataset.iscol = 'Y';
				}
			} else if(this.dataset.type == 'ARTICLE') {
                console.log("ARTICLE");
				if(this.dataset.iscol == 'Y') {
					console.log("Y");
					num -= 1;
					$(this).parent().children('.font-num').html(num.toString());
					var para = "from=WX&dataType=ARTICLE&operation=2&articleId=" + colId;
					ajaxRequest(url, para, gocol);
					this.dataset.iscol = 'N';
				} else if(this.dataset.iscol == 'N') {
					console.log("N");
					num += 1;
					$(this).parent().children('.font-num').html(num.toString());
					var para = "from=WX&dataType=ARTICLE&operation=1&articleId=" + colId;;
					ajaxRequest(url, para, gocol);
					this.dataset.iscol = 'Y';
				}

			}

		}
			
		flag=false;
		setTimeout(function(){
			flag=true;
		},200)
			
	}
        

	})

}

function gocol(data) {
	if(data.res == '00000') {
		errorMessage(data.resmsg);	
	} else {
		errorMessage(data.resmsg);
	}
}

function getId() {
	var idurl = window.location.search;
	var id = idurl.split("&");
	var idnum = id[0].indexOf('id=');
	return id[0].substring(idnum + 3);
}

function toPay(amount,shoppingOrderId,productType,paymentType) {
	var payUrl = contextPath + "wxpay/perPayment";
	var paySUccessUrl = contextPath + "toOrderPage/orderPaySuccess?id=" + shoppingOrderId;
	console.log(shoppingOrderId);
	console.log(productType);
	$.ajax({
		type: 'POST',
		url: payUrl,
		dataType: 'json',
		data: {
			from: "WX",
			amount: amount,
			shoppingOrderId: shoppingOrderId,
			productType: productType,
			paymentType: paymentType
		},
		success: function(data) {
			console.log(data);
			var rescode = data.rescode;
			var resmsg = data.resmsg;
			if(rescode == "00000") {

				var appid = data.appid;
				var timeStamp = data.timeStamp;
				var nonce_str = data.nonceStr;
				var signType = "MD5";
				var packageStr = data.package;
				var sign = data.sign;
//				alert("nonce_str:"+nonce_str);
//				alert("timeStamp:"+timeStamp);
//				alert("nonce_str:"+nonce_str);
//				alert("signType:"+signType);
//				alert("packageStr:"+packageStr);
//				alert("sign:"+sign); 
//				alert(timeStamp+'&&'+nonce_str+'&&'+packageStr+'&&'+sign);
				//调用微信支付
				wx.chooseWXPay({
					timestamp: timeStamp,
					nonceStr: nonce_str,
					package: packageStr,
					signType: signType,
					paySign: sign,
					success: function(res) {
						window.location.href = paySUccessUrl;
					},
					fail: function(res) {
						alert("支付失败：" + res.err_msg);
					},
					cancel: function(res) {
						errorMessage("取消支付");
					}
				});
			} else {
				alert("增加预支付订单信息报错：" + resmsg);
			}

		},
		error: function(msg) {
			alert("ajax函数回调出错：" + msg);
		}
	});
}
function Arrowmove(){
			var product ;
			var pMarginLeft={};
			setTimeout(function(){
				product = document.querySelectorAll('.productWrap');
				console.log(product[0])
			
			for(var i=0;i<product.length;i++){
				pMarginLeft[i]=0;
				if (product[i].firstChild.children.length<=3) {
					product[i].firstChild.nextSibling.style.opacity=0.3;
					product[i].lastChild.style.opacity=0.3;
				}else{
					product[i].firstChild.nextSibling.style.opacity=0.6;
					product[i].lastChild.style.opacity=0.3;
				}
			}
			},1000)
			
			function getIndex(element){
				for(var i=0;i<product.length;i++){
					if(product[i]==element)//如果当前的这个子节点和ele一样，则表示当前这个节和ele一样，则i既为ele的索引号
					
					return i;
				}
			}
			document.body.addEventListener("click",function(e){
				go(e);
			})
			function go(e){
				var e = e || window.e;
				if (e.target.parentElement.className!="leftBar"&&e.target.parentElement.className!="rightBar") return;
				var firstItem = e.target.parentElement.parentElement.firstChild.firstChild;
				var el=e.target.parentElement;//点击的btn
				var elp = el.parentElement;//productWrap
//				console.log(elp);
				
				var index =getIndex(elp);
//				console.log(index)
				var _width2 = firstItem.currentStyle? firstItem.currentStyle : window.getComputedStyle(firstItem, null).width;
//				console.log(_width2)
				var className = e.target.parentElement.className;//btn的名字
				var len = e.target.parentElement.parentElement.firstChild.children.length//item长度
//				console.log(len)
				var allWidth = parseInt(_width2)*(len-3);
				if (className=="leftBar") {
					if (Math.abs(parseInt(pMarginLeft[index]))<parseInt(allWidth)) {
						elp.firstChild.firstChild.style.marginLeft = parseInt(pMarginLeft[index])-parseInt(_width2)+"px";
						pMarginLeft[index] = parseInt(pMarginLeft[index])-parseInt(_width2)+"px";
						el.style.transition="0s";
						el.style.opacity=1;
					}else{
						allWidth = parseInt(_width2)*(len-3);
						elp.firstChild.firstChild.style.marginLeft =-parseInt(allWidth)+"px";
					}
				}else{
					if (parseInt(pMarginLeft[index])<0) {
						elp.firstChild.firstChild.style.marginLeft= parseInt(pMarginLeft[index])+parseInt(_width2)+"px";
						pMarginLeft[index] = parseInt(pMarginLeft[index])+parseInt(_width2)+"px";
						el.style.transition="0s";
						el.style.opacity=1;
					}else{
						elp.firstChild.firstChild.style.marginLeft=0;
					}
				}
				if (parseInt(pMarginLeft[index])==0) {
					elp.firstChild.nextSibling.style.opacity=0.6;
					elp.lastChild.style.opacity=0.3;
				}else if(Math.abs(parseInt(pMarginLeft[index]))==parseInt(allWidth)){
					elp.firstChild.nextSibling.style.opacity=0.3;
					elp.lastChild.style.opacity=0.6;
				}else{
					setTimeout(function(){
						elp.firstChild.nextSibling.style.transition="1s";
						elp.lastChild.style.transition="1s";
						elp.firstChild.nextSibling.style.opacity=0.6;
						elp.lastChild.style.opacity=0.6;
					},1000)
				}		
			}	
}


function goArticle(id){
	
	mui.openWindow(contextPath+'toGoodsPage/article?id='+id);
	
}

function goart(){
				$('.art').unbind('tap')
				$('.art').bind('tap',function(){
					var id=this.dataset.id;
					goArticle(id);
				})
}




//判断页面是不是用手机打开的,微信页面和web页面的切换
var nowUrl = navigator.userAgent.toLowerCase();
var urlType = {
	isIos: function() {
		if(nowUrl.match(/iphone/i) || nowUrl.match(/ipad/i) || nowUrl.match(/ipod/i)) {
			return true;
		} else {
			return false;
		}
	},
	isAndroid: function() {
		if(nowUrl.match(/android/i)) {
			return true;
		} else {
			return false;
		}
	}
};

		


//微信端跳转到web端页面，将toGoods改为toWebGoods.前提是必须保证web端和手机端页面的命名规则是一致的
function pageSizeTuring(){
window.addEventListener("resize",function(){
	
		var clientWidth=document.documentElement.clientWidth;
			if(clientWidth>768){
				gochange();}
	},false);	

	
}

function getchannel(){
	var url0= window.location.search;
	var cv;
	if(url0.indexOf('IOS')>0){
		cv='IOS';
	}else if(url0.indexOf('ANDROID')>0){
		cv='ANDROID';
	}else if(url0.indexOf('LBJR')>0){
		cv='LBJR';
	}
	return cv;
	
}


