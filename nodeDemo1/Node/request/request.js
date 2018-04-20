var request = require('request');
	//应用request方法 获取请求信息
	request.get('http://127.0.0.1:3000',function(err,res,result){
		console.log(result);
	})
