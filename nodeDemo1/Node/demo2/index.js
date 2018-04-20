//1.依赖模块注入
var http = require('http'),
	url = require('url'),
	router = require('./router.js');

//2.创建服务器
	http.createServer(function(req,res){
		//2.1
		var pathname = url.parse(req.url).pathname;
			req.setEncoding('utf8');
			res.writeHead(200,{'Content-Type':'text/html'});
			router.router(req,res,pathname);
			
		
	}).listen('3000','127.0.0.1');
	console.log('127.0.0.1服务器启动成功');
