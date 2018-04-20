var http = require('http'),				//http膜块
	dns = require('dns'),				//解析dns
	fs = require('fs'),			//fs文件解析
	url = require('url'),				//解析url
	queryString = require('querystring');	//处理参数

	http.createServer(function(req,res){
		
		//获取当前index.html的位置
		var IndexHtml =  url.parse('index.html').pathname;
			IndexHtml = fs.readFileSync(IndexHtml);	
		
		
		//判断来源url
		var pathname = url.parse(req.url).pathname;
			req.setEncoding('utf-8');
			
			res.writeHead(200,{'Content-Type':'text/html'});
			
		//处理路由
		router(req,res,pathname);		//调用router来处理路由
		
		
		
		
		
		
	}).listen('3000','127.0.0.1');
	console.log('成功启动127.0.0.1:3000服务')
	

	//路由 函数
	function router(req,res,pathname){
		switch (pathname){
			case '/parse':
				parseDns(req,res);
				break;
			default:
				goIndex(req,res)
				break;
		}
	}
	//goIndex
	function goIndex(req,res){
		//获取index.html路径
		var indexHtml = __dirname + '/' + url.parse('index.html').pathname;
			indexHtml = fs.readFileSync(indexHtml);
			res.end(indexHtml);
	}
	//解析dns
	function parseDns(req,res){
		var postData = '';
		
			//监听数据
			req.addListener('data',function(dataS){
				postData +=  dataS;
			})
			
			//http响应页面信息
			req.addListener('end',function(){
				
//				var retData = getDns(postData,function(domain,address){
//					console.log(res);
//					res.writeHead(200,{'Content-Type':'text/html'});
//					res.end('<html>'+													//这里为什么不直接使用另一个html因为这里需要动态拼接一些数据
//								'<head>'+
//									'<title>dns</title>'+
//									'<meta charset="UTF-8" http-equiv="content-type" content="text/html">'+
//								'</head>'+
//								'<body>'+
//									'domain:'+domain+
//									'<br>'+
//									'ip:'+ address.join(',')+
//								'</body>'+					
//							'</html>')
//				})

//				================================分割线  2种都可以但是依然不知道为什么==============================
				var domain = queryString.parse(postData).search_dns;
				dns.resolve(domain,function(err,address){ 
					if(!address){
						address = '不存在域名';
					}else{
						res.writeHead(200,{'Content-Type':'text/html'});
						res.end('<html>'+													
									'<head>'+
										'<title>dns</title>'+
										'<meta charset="UTF-8" http-equiv="content-type" content="text/html">'+
									'</head>'+
									'<body>'+
										'domain:'+domain+
										'<br>'+
										'ip:'+ address.join(',')+
									'</body>'+					
								'</html>')
						}
					
				})
				
				return;
			})	
	}
	function getDns(postData,callback){
		var domain = queryString.parse(postData).search_dns;
		//异步解析域名
		dns.resolve(domain,function(err,address){
			if(!address){
				address = '不存在域名';
			}
			callback(domain,address)
		})
	}
