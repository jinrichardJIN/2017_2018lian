var http = require('http');   							//依赖http模块
http.createServer(function(req,res){
//	res.writeHead(200,{"Content-Type":'text/plain'});	//设置请求头
//	res.end('hello World')								//响应请求

	var html = "<html>"+
					"<head>"+
						"<title>test</title>"+
					"</head>"+
					"<body>"+
						"<div>test</div>"+
					"</body>"+
				'</html>';

	res.writeHead(200,{"Content-Type":'text/html'});
	res.end(html)

})
.listen('1337','127.0.0.1')								//设置端口号 ip
console.log('系统正在运行127.0.0.1:1337');				//运行成功的提示

