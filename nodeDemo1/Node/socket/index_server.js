//引入socket
var io = require('socket.io').listen(3000);

//定义socket的回调函数
io.sockets.on('connection',function(socket){
	//发送消息
	socket.emit('new',{hello:'world'});
	//接受消息
	socket.on('my other event',function(data){
		console.log(data);
	})
})
io.sockets.on('error',function(data){
	console.log(data);
})
