var http = require('http');
	
	http.createServer(function(req,res){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end('hello World'+req.method);
	}).listen(3000,'127.0.0.1');
	console.log('系统启动成功');
	
