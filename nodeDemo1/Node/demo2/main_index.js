//处理首页的逻辑
var	fs = require('fs'),
	url = require('url');
	
	//抛出方法
	exports.goIndex = function(req,res){
		var readPath = __dirname + '/' + url.parse('index.html').pathname;
		var indexHtml = fs.readFileSync(readPath);
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(indexHtml)
	}
	
