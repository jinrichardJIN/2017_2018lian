//index_server.js

var io  = require('socket.io').listen(8080,{log:false});		//监听8080端口
io.sockets.on('connection',function(socket){				//监听链接成功
	
	socket.on('msg',function(data){							//on都是监听客户端的消息
		console.log(data);
		if(data.state){
			if(data.state=='success'){
				socket.emit('msg',{me:'very good'});
			}else{
				socket.emit('msg',{other:'that is all'});
			}
		}else{
			socket.emit('msg',{other:'that is all'});
		}
	})
})



