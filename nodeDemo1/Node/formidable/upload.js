var formidable = require('formidable');
var http = require('http');
var util = require('util');

http.createServer(function(req, res) {
	if(req.url == '/upload' && req.method.toLowerCase() == 'post') {
		//parse a file load
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.write('recevied upload');
			res.end(util.inspect({ fields:fields,files: files }));
		})
		return;
	}
	
	//show a file upload form
	res.writeHead(200,{'Content-Type': 'text/html'});
	var tmpHtml = '<form action="/upload" method="post">'+
					 '<input type="file" name="upload" multiple="multiple">'+
					 '<input type="text" name="text">'+
					 '<input type="submit" value="提交" >'+
				 '</form>'
	res.end(tmpHtml);
}).listen(8080);
console.log('8080系统启动成功');

