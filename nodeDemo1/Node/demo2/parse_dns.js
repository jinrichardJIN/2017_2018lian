var queryString = require('querystring');
var dns = require('dns');




	exports.parseDns = function(req,res){
		var postData = '';
		//监听数据
		req.addListener('data',function(postChunk){
			postData += postChunk;
		});
		//监听请求结束
		req.addListener('end',function(){
			var retData = getDns(postData,function(domain,address){
				res.writeHead(200,{'Content-Type':'text/html'});
				var TmpHtml = '<html>'+
									'<head>'+
										'<title>dns解析</title>'+
									'</head>'+
									'<body>'+
										'ip:'+ address.join(',') +
										'<br>'+
										'domain:'+ domain +
									'</body>'+
							  '</html>';
							  
				res.end(TmpHtml);
				return;
			})
		})
	}
	//定义回调函数
	function getDns(postData,callback){
		var domain = queryString.parse(postData).search_dns;
		dns.resolve(domain,function(err,address){
			if(!address){
				address = '不存在的域名';
			}else{
				callback(domain,address);
			}
		})
	}
