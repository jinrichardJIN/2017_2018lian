
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
function ajaxRequest(url, str, method, type,obj) {

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
		data: str + '&tokenId=' + sessionStorage.getItem("tokenId"),
		success: function(data) {
			//method(port.decrypt(data));
			PD.remove(url);
			hideLoading();
			method(data,obj);
		},
		error: function() {
			PD.remove(url);
			hideLoading();
			//errorMessage("请求失败!");
		}
	});
};

function ajaxRequest2(url, str, method, type,obj) {
	
		for(var i = 0; i < PD.length; i++) {
			if(PD[i] == url && PD2[i] == str) {
				//errorMessage("请勿重复请求");
				return false;
			}
		}
		PD.push(url);
		PD2.push(str);
		if(type && typeof(type)=='object' && !obj){
			obj={};
			$.extend(obj, type);
			type=null;
		}
	
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
			data: str + '&tokenId=' + sessionStorage.getItem("tokenId"),
			success: function(data) {
				//method(port.decrypt(data));
				PD.remove(url);
				hideLoading();
				method(data,obj);
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
	var html = '<div class="loadingMessage" style="bottom: 100px; position: fixed; text-align: center; width: 100%; display:none; z-index:1000;"><font style="background-color: rgba(0, 0, 0, 0.7); border-radius: 5px; color: #fff; z-index:1000; display: inline-table; line-height: 170%; max-width: 80%; padding: 5px 10px;">' + str + '</font></div>';
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
	var html = '<div class="errorMessage" style="bottom: 200px; position: fixed; text-align: center; width: 100%; display:none; z-index:1111;"><font style="background-color: rgba(0, 0, 0, 0.7); border-radius: 5px; color: #fff; z-index:1000; display: inline-table; line-height: 170%; max-width: 80%; padding: 5px 10px;">' + str + '</font></div>';
	$("body").append(html);
	$("body .errorMessage").fadeIn("normal", function() {
		setTimeout(hideError, 3000);
	})
}



//报错
function errorMessageRegis(str) {
	if($("body .errorMessage").length > 0) {
		return false;
	}

	function hideError() {
		$("body .errorMessage").fadeOut("normal", function() {
			$(this).remove();
		})
	}
	var html = '<div class="errorMessage" style="font-family:Arial;bottom: 100px; position: fixed; text-align: center; width: 100%;display:none;  z-index:111111;"><font style="background-color: rgba(250, 191, 42, 0.7); border-radius: 5px; color: #fff; z-index:111111; display: inline-table; line-height: 170%; max-width: 80%; padding: 5px 10px;font-size:14px">' + str + '</font></div>';
	$("body").append(html);
	$("body .errorMessage").fadeIn("normal", function() {
		setTimeout(hideError, 3000);
	})
}

var contextPath = "";
var wxContextPath = "";
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
		console.log("1")
		console.log(localhostPaht)
	}else{
		
		contextPath=localhostPaht+"/";
		console.log("2")
		console.log(localhostPaht)
	}
	wxContextPath = localhostPaht +"/shop-webservice/";
	/*if(contextPath.indexOf('zhihuiup')>0&&contextPath.indexOf('s')!=4){
		contextPath='https'+contextPath.substring(4,contextPath.length)
	}*/
	//得到了 http://localhost:8083/myproj
	//contextPath = localhostPaht + projectName + '/';
}
getRealPath();


function collection() {
	$('.collectIcon').unbind('click');
	var flag=true;
	$('.collectIcon').bind('click', function() {
		if(flag){
			console.log("click");
			if($('#islogin').val() == "0") {
				errorMessage("请先完成登陆，再收藏");

			} else {

				$(this).children('.light').toggle();

			//$(this).children('.black').toggle();
			$(this).children('.light').addClass("current");

//			var num = parseInt($(this).parent().children('.font-num').html());
var url = contextPath + "webuser/collection/collect";
var colId = this.dataset.id;
console.log(colId);
if(this.dataset.type == 'GOODS') {
	console.log("GOODS");
	console.log(this.dataset.iscol);
	if(this.dataset.iscol == 'Y') {
		console.log("Y");
//					num -= 1;
//					$(this).parent().children('.font-num').html(num.toString());
var para = "from=WEB&dataType=GOODS&operation=2&goodsId=" + colId;
ajaxRequest(url, para, gocol);
this.dataset.iscol = 'N';
} else if(this.dataset.iscol == 'N') {
	console.log("N");
//					num += 1;
//					$(this).parent().children('.font-num').html(num.toString());
var para = "from=WEB&dataType=GOODS&operation=1&goodsId=" + colId;;
ajaxRequest(url, para, gocol);
this.dataset.iscol = 'Y';
}
} else if(this.dataset.type == 'ARTICLE') {
	console.log("ARTICLE");
	if(this.dataset.iscol == 'Y') {
		console.log("Y");
//					num -= 1;
//					$(this).parent().children('.font-num').html(num.toString());
var para = "from=WEB&dataType=ARTICLE&operation=2&articleId=" + colId;
ajaxRequest(url, para, gocol);
this.dataset.iscol = 'N';
} else if(this.dataset.iscol == 'N') {
	console.log("N");
//					num += 1;
//					$(this).parent().children('.font-num').html(num.toString());
var para = "from=WEB&dataType=ARTICLE&operation=1&articleId=" + colId;;
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
	var idnum = idurl.indexOf('id=');
	return idurl.substring(idnum + 3);
}

function toPay(amount,shoppingOrderId,productType) {
	var payUrl = contextPath + "webpay/perPayment";
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
			productType: productType
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
var goodsText1;
var goodsText2;
function goCommodity(id,goodsText1,goodsText2){
	window.open(contextPath+'toWebGoodsPage/detail?id='+id+'&goodsText1='+goodsText1+'&goodsText2='+goodsText2)
	//window.location.href=contextPath+'toWebGoodsPage/detail?id='+id;
}
function goArticle(id){
	window.location.href=contextPath+'toWebGoodsPage/article?id='+id;
}

function goNews(id){
	
	ajaxRequest(contextPath + "webgoods/information/getInformationsById", 'id='+id+'&from=WEB', newsPageTurning);
	function newsPageTurning(data){
		
		window.location.href=data.htmlUrl+"?id="+id;
		
	}
}	

function page(total, now) {
	$("#gopagenum").val("");
	if(now == 1) {
		$('#page1').html('1');
		$('#page2').html('2');
		$('#page3').html('3');
		$('#page4').html('4');
		$('#page5').html('5');
		$('#pagepre').attr("disabled", "disabled");
		$('#pagefirst').addClass("disabledDiv");
		$('#pagefirst').attr("disabled", "disabled");
	} else {
		$('#pagepre').removeAttr("disabled");
		$('#pagefirst').removeClass("disabledDiv");		
		$('#pagefirst').removeAttr("disabled");
	}
	$('#pagemore').removeAttr("disabled");
	$('#pagenext').removeAttr("disabled");
	$('#pagefinal').removeAttr("disabled");

	var pageall = "共" + total + "页";
	
	$("#pageall").html(pageall);
	t5 = Math.ceil(total / 5);
	
	
	if(total > 5) {
		var page = Math.floor(now / 5);
		var yupage = now % 5;
		if(yupage == 0)
		{
			page = page-1;
		}
	//		console.log("page:" + page);
	
	if(page >= 0 && page < t5-1) {
		num = page * 5;		
		$('#page1').html(num + 1);
		$('#page2').html(num + 2);
		$('#page3').html(num + 3);
		$('#page4').html(num + 4);
		$('#page5').html(num + 5);
	//			console.log($('#page1').text());
	$(".Pagenum").removeClass("PagFocus");
	if($('#page1').text() == now) {
		$('#page1').addClass("PagFocus");
	}
	if($('#page2').text() == now) {
		$('#page2').addClass("PagFocus");
	}
	if($('#page3').text() == now) {
		$('#page3').addClass("PagFocus");
	}
	if($('#page4').text() == now) {
		$('#page4').addClass("PagFocus");
	}
	if($('#page5').text() == now) {
		$('#page5').addClass("PagFocus");
	}
	$('#pagemore').show();
} else if(page >= 0 && page == t5-1) {
	$('#page1').html(total - 4);
	$('#page2').html(total - 3);
	$('#page3').html(total - 2);
	$('#page4').html(total - 1);
	$('#page5').html(total);
	$(".Pagenum").removeClass("PagFocus");
	if($('#page1').text() == now) {
		$('#page1').addClass("PagFocus");
	}
	if($('#page2').text() == now) {
		$('#page2').addClass("PagFocus");
	}
	if($('#page3').text() == now) {
		$('#page3').addClass("PagFocus");
	}
	if($('#page4').text() == now) {
		$('#page4').addClass("PagFocus");
	}
	if($('#page5').text() == now) {
		$('#page5').addClass("PagFocus");
	}
	$('#pagemore').show();
	$('#pagemore').attr("disabled", "disabled");
	if(now==total)
	{
		$('#pagenext').attr("disabled", "disabled");
		$('#pagefinal').attr("disabled", "disabled");
	}
	
}

} else {
	
	for(var i = 0; i < 5 - total; i++) {
		$('#page' + (5 - i)).hide();	
	}
	$('#pagenext').removeAttr("disabled");
	$('#pagefinal').removeAttr("disabled");
	$(".Pagenum").removeClass("PagFocus");
	if($('#page1').text() == now) {
		$('#page1').addClass("PagFocus");
	}
	if($('#page2').text() == now) {
		$('#page2').addClass("PagFocus");
	}
	if($('#page3').text() == now) {
		$('#page3').addClass("PagFocus");
	}
	if($('#page4').text() == now) {
		$('#page4').addClass("PagFocus");
	}
	if($('#page5').text() == now) {
		$('#page5').addClass("PagFocus");
	}
	$('#pagemore').hide();
	if(now == total) {	
		$('#pagenext').attr("disabled", "disabled");
		$('#pagefinal').attr("disabled", "disabled");
	}
	
}

}

//推荐处的左右滑动
function  moveLR(){
	var product ;
	var pMarginLeft={};
	setTimeout(function(){
		product = document.querySelectorAll('.productWrap');
		
		for(var i=0;i<product.length;i++){
			pMarginLeft[i]=0;
			if (product[i].firstChild.children.length<=3) {
				product[i].firstChild.nextSibling.style.opacity=0.3;
				product[i].lastChild.style.opacity=0.3;
			}else{
				product[i].firstChild.nextSibling.style.opacity=0.3;
				product[i].lastChild.style.opacity=0.6;
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

		
		var index =getIndex(elp);

		var _width2 = firstItem.currentStyle? firstItem.currentStyle : window.getComputedStyle(firstItem, null).width;

		var className = e.target.parentElement.className;//btn的名字
		var len = e.target.parentElement.parentElement.firstChild.children.length//item长度

		if(len>3){
			
			var allWidth = parseInt(_width2)*(len-3);
			if (className=="rightBar") {
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
				elp.firstChild.nextSibling.style.opacity=0.3;
				elp.lastChild.style.opacity=0.6;
			}else if(Math.abs(parseInt(pMarginLeft[index]))==parseInt(allWidth)){
				elp.firstChild.nextSibling.style.opacity=0.6;
				elp.lastChild.style.opacity=0.3;
			}else{
				setTimeout(function(){
					elp.firstChild.nextSibling.style.transition="1s";
					elp.lastChild.style.transition="1s";
					elp.firstChild.nextSibling.style.opacity=0.6;
					elp.lastChild.style.opacity=0.6;
				},1200)
			}
		}else{
			el.style.opacity=0.3;
		}
	}
};			


//弹框 alertBox("提示文字","method"); imgPath是图片的路径 ;type = 1 有取消按钮; type = 2 没有取消按钮;
function alertBox(imgPath,tips,method,type){
	var html="";
	html += '<div id="alertBox" style="background:rgba(0,0,0,0.3);position:fixed;left:0;top:0;z-index: 1001;width:100%;height:100%;">';
	html += '<div class="positionA textC" style="height:180px;width:400px;background:#fff;left:50%;top:50%;margin-top: -90px;margin-left:-200px; border:1px solid #c2c2c2;">';
	html += '<div style="height:40px;line-height:40px;font-size:14px;color:#c2c2c2;border-bottom:1px dotted #c2c2c2;"><div style="float:left;margin-left:35px;">提示</div><div style="float:right;margin-right:35px;font-size:24px;cursor:pointer" onclick="$(\'#alertBox\').remove();">×</div></div>';
	html += '<div class="font16 " style="height:60px;padding:15px 5% 0;margin-top:10px;"><img src ="'+imgPath+'" />'+tips+'</div>';
	html += '<a class="ML10 MR10 font16 cursorP" style="padding:8px 15px;background:#FFC81F;cursor:pointer" onclick="'+method+'">确 定</a>';			   
	if(type == 1){
		html += '<a class=" ML10 MR10  font16 cursorP" style="padding:8px 15px;border:1px solid #c2c2c2;cursor:pointer" onclick="$(\'#alertBox\').remove();">取消</a>';
	}
	
	html += '</div></div>';
	$("body").append(html);
};

function alertBox5(imgPath,method1,method,type){
	var html="";
	html += '<div id="alertBox" style="background:rgba(0,0,0,0.3);position:fixed;left:0;top:0;z-index: 1001;width:100%;height:100%;">';
	html += '<div class="positionA textC" style="height:180px;width:400px;background:#fff;left:50%;top:50%;margin-top: -90px;margin-left:-200px; border:1px solid #c2c2c2;">';
	html += '<div style="height:40px;line-height:40px;font-size:14px;color:#c2c2c2;border-bottom:1px dotted #c2c2c2;"><div style="float:left;margin-left:35px;">提示</div><div style="float:right;margin-right:35px;font-size:24px;cursor:pointer" onclick="$(\'#alertBox\').remove();">×</div></div>';
	html += '<div class="font16 " style="height:60px;padding:4% 0;margin-top:10px;"><img src ="'+imgPath+'" /><div style="padding:0 11%;">您已报名成功，请到个人中心<a href="#" class="linkP" onclick="'+method1+'">我的活动</a>中查看报名商品。</div></div>';
	html += '<a class="ML10 MR10 font16 cursorP" style="padding:8px 15px;background:#FFC81F;cursor:pointer" onclick="'+method+'">确 定</a>';		                                	   
	if(type == 1){
		html += '<a class=" ML10 MR10  font16 cursorP" style="padding:8px 15px;border:1px solid #c2c2c2;cursor:pointer" onclick="$(\'#alertBox\').remove();">取消</a>';
	}
	
	html += '</div></div>';
	$("body").append(html);
};

function alertBox3(imgPath,tips,type){
	var html="";
	html += '<div id="alertBox" style="background:rgba(0,0,0,0.3);position:fixed;left:0;top:0;z-index: 1001;width:100%;height:100%;">';
	html += '<div class="positionA textC" style="height:180px;width:400px;background:#fff;left:50%;top:50%;margin-top: -90px;margin-left:-200px; border:1px solid #c2c2c2;">';
	html += '<div style="height:40px;line-height:40px;font-size:14px;color:#c2c2c2;border-bottom:1px dotted #c2c2c2;"><div style="float:left;margin-left:35px;">提示</div><div style="float:right;margin-right:35px;font-size:24px;cursor:pointer" onclick="$(\'#alertBox\').remove();">×</div></div>';
	html += '<div class="font16 " style="height:60px;padding:15px 5% 0;margin-top:10px;"><img src ="'+imgPath+'" style="height:20px;float: left;margin-left: 105px;"/><div style="float: left;margin-left: 10px;">'+tips+'</div></div>';
	html += '<a class="ML10 MR10 font16 cursorP" style="padding:8px 15px;background:#FFC81F;cursor:pointer" onclick="$(\'#alertBox\').remove();">确 定</a>';			   
	if(type == 1){
		html += '<a class=" ML10 MR10  font16 cursorP" style="padding:8px 15px;border:1px solid #c2c2c2;cursor:pointer" onclick="$(\'#alertBox\').remove();">取消</a>';
	}
	
	html += '</div></div>';
	$("body").append(html);
};



function alertBox2(imgPath,tips){
	var html="";
	html += '<div id="alertBox" style="background:rgba(0,0,0,0.3);position:fixed;left:0;top:0;z-index: 1001;width:100%;height:100%;">';
	html += '<div class="positionA textC" style="height:180px;width:400px;background:#fff;left:50%;top:50%;margin-top: -90px;margin-left:-200px; border:1px solid #c2c2c2;">';
	html += '<div style="height:40px;line-height:40px;font-size:14px;color:#c2c2c2;border-bottom:1px dotted #c2c2c2;"><div style="float:left;margin-left:35px;">提示</div><div style="float:right;margin-right:35px;font-size:24px;cursor:pointer" onclick="$(\'#alertBox\').remove();">×</div></div>';
	html += '<div class="font16 " style="height:60px;padding:15px 5% 0;margin-top:40px;"><img src ="'+imgPath+'" />'+tips+'</div>';
	
	html += '</div></div>';
	$("body").append(html);
};

//注册送优惠券的弹框
function sendCoupons(method){
	var html="";
	html += '<div id="alertBox" style="background:rgba(0,0,0,1.0);position:fixed;left:0;top:0;z-index: 9999999;width:100%;height:100%;"  onclick="$(\'#alertBox\').remove();">';
	html +='<div class="sendConpousWrap">';
	html +='<div class="sendConpousTitle">';
	html +='<div class="couponsLeft"></div>';
	html +='<div class="sendConpousText strong font24 PLR25">新人专享产品</div>';
	html +='<div class="couponsRight"></div>';
	html +='</div>';
	html +='<h4 style="margin:15px 0;">感谢您访问智仟汇，我们为您准备一份专享礼物</h4>';
	html +='<img src="../webstatic/img/sendConpousImg.png" style="height:300px;"/>';
	html +='<img src="../webstatic/img/sendConpousAmount.png" style="height:50px;margin:35px 0 0 0;"/>';
	html +='</div></div>';
	$("body").append(html);
	
}



//点击跳转订单详情页
function toOrderDetail(){
	$("toOrderDetail").click(function(){
		//var brandId = $(this).attr('brandId');
		var linkHref = contextPath + "toWebOrderPage/orderDetail?id=1002643";
		window.location.href = linkHref;
	});
}

//隐藏数字中间, 调用：numHide(13888888888)或numHide('13888888888');
function numHide(m) {
	if(m.length <= 11){
		return m.substr(0, 3) + '****' + m.substr(7);
	}else{
		return m.substr(0, 4) + ' **** **** ' + m.substr(13);
	}
}


// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   { //author: meizz   
	var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
};   
if(/(y+)/.test(fmt))   
	fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
for(var k in o)   
	if(new RegExp("("+ k +")").test(fmt))   
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	return fmt;   
}  

//分页
function pagingStyle(){
	var pagingStr=
	'<div class="searchPag  cursorP">'+
	'<button class="PagDiv" id="pagefirst" >首页</button>'+		
	'<button type="button" class="PagDiv" id="pagepre" ><</button>'+
	'<div class="PagDiv Pagenum" id="page1">1</div>'+
	'<div class="PagDiv Pagenum" id="page2">2</div>'+
	'<div class="PagDiv Pagenum" id="page3">3</div>'+
	'<div class="PagDiv Pagenum" id="page4">4</div>'+
	'<div class="PagDiv Pagenum" id="page5">5</div>'+
	'<button type="button" class="PagDiv" id="pagemore" >…</button>'+
	'<button type="button" class="PagDiv" id="pagenext" >></button>'+
	'<button type="button" class="PagDiv MR20" id="pagefinal">尾页</button>'+
	
	'<div id="pageall"></div>'+
	'<div>到</div>'+
	'<input id="gopagenum" class="textC"  onkeyup="this.value=this.value.replace(/\D/g,&quot;&quot;)" onafterpaste="this.value=this.value.replace(/\D/g,&quot;&quot;)"/>'+		
	'<div>页</div>'+
	'<div class="PagDiv" id="gopage">确定</div>'+
	'</div>';
	return 	pagingStr;
}

//判断页面是不是用手机打开的,如果是用手机打开的,就直接跳到下载页面
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
//if (urlType.isIos() || urlType.isAndroid()) {
	
//	window.location.href=contextPath+'toGoodsPage/download';
//	pageSizeTuring()


//}else{
	
//	window.addEventListener("resize",setClientStyle,false);	

//}

function setClientStyle(){	
	var clientWidth=document.documentElement.clientWidth;
	if(clientWidth<=768){
		window.location.href=wxContextPath+'toGoodsPage/download';	
//		pageSizeTuring()

}
};	

//web端页面跳转到微信端，将toWebGoods改为toGoods.前提是必须保证web端和手机端页面的命名规则是一致的
function pageSizeTuring(a){
	window.addEventListener("resize",function(){
		
		var clientWidth=document.documentElement.clientWidth;
		if(clientWidth<=768){
			
			window.location.replace(wxContextPath+a)}
		},false);	
	if (urlType.isIos() || urlType.isAndroid()) {

		window.location.replace(wxContextPath+a)

		
	}
	
	
	
}



function pageSizeTuring2(){	
	window.addEventListener("resize",function(){
		var clientWidth=document.documentElement.clientWidth;
		if(clientWidth<=768){
			turnToMobile()
		}
	},false);
	
	if (urlType.isIos() || urlType.isAndroid()) {
		turnToMobile()
		
		
	}
	
	
};
function turnToMobile(){
	var nowUrl=window.location.href;
	var substringStart=nowUrl.substring(contextPath.length);
	if(substringStart.indexOf('toWebGoods')>=0){
		substringStart=substringStart.replace('toWebGoods','shop-webservice/toGoods');
	}	
	window.location.href=contextPath+substringStart;
}



function turnToMobileUser(path){
	var nowUrl=window.location.href;
	var substringStart=nowUrl.substring(contextPath.length);
	if(substringStart.indexOf('toWebGoods')>=0){
		substringStart=substringStart.replace('toWebGoods','shop-webservice/toGoods');
	}	
	window.location.replace=contextPath+substringStart;
}



//禁止鼠标滚动

//function disableScroll(){
//	function disabledMouseWheel() {  
//	  if (document.addEventListener) {  
//	    document.addEventListener('DOMMouseScroll', scrollFunc, false);  
//	  }//W3C  
//	  window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome  
//	};  
//	function scrollFunc(evt) {  
//	  evt = evt || window.event;  
//	    if(evt.preventDefault) {  
//	    // Firefox  
//	      evt.preventDefault();  
//	      evt.stopPropagation();  
//	    } else {  
//	      // IE  
//	      evt.cancelBubble=true;  
//	      evt.returnValue = false;  
//	  }  
//	  return false;  
//	};  
//	window.onload=disabledMouseWheel(); 
//
//};

function disableScroll(){
	document.addEventListener('mousewheel', scrollFunc, false); 			
	document.addEventListener('DOMMouseScroll', scrollFunc, false);	//火狐兼容性
};

function canScroll(){
	document.removeEventListener('mousewheel', scrollFunc, false); 
	document.removeEventListener('DOMMouseScroll', scrollFunc, false);
}
function scrollFunc(evt) {  
	evt = evt || window.event;  
	if(evt.preventDefault) {  
    // Firefox  
    evt.preventDefault();  
    evt.stopPropagation();  
} else {  
      // IE  
      evt.cancelBubble=true;  
      evt.returnValue = false;  
  }  
  return false;  
};  



//禁止鼠标滚动

function canScroll(){
	function disabledMouseWheel() {  
		if (document.removeEventListener) {  
			document.removeEventListener('DOMMouseScroll', scrollFunc, false);  
	  }//W3C  
	  window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome  
	};  
	function scrollFunc(evt) {  
		evt = evt || window.event;  
		if(evt.preventDefault) {  
	    // Firefox  
	    evt.preventDefault();  
	    evt.stopPropagation();  
	} else {  
	      // IE  
	      evt.cancelBubble=true;  
	      evt.returnValue = false;  
	  }  
	  return false;  
	};  
	window.onload=disabledMouseWheel(); 

};