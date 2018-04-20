var fs = require('fs');

function getFileDate(callback){
 	fs.readFile('index.txt',function(data){
 		callback(data);
 	})
}

function returnData(callback){
	getFileDate(function(data){
		setTimeout(function(){
			callback(data)
		},1000)
	})
}
