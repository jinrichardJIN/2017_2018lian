var formidable = require('formidable');
var form = new formidable.IncomingForm();
	
	form.parse(req,function(err,fields,files){
		res.writeHead(200,{'Content-Type':'text/plain'});
		res.write('revice :');
		res.end(util.inspect(fields:fields,files:files));
	})
