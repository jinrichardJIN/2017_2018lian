var parDns = require('./parse_dns.js');
	mainIndex = require('./main_index.js');
	console.log(mainIndex)
	exports.router = function(req,res,pathname){
		switch (pathname){
			case '/parse':
				parDns.parseDns(req,res);
				break;
			default:
				mainIndex.goIndex(req,res);
				break;
		}
	}
