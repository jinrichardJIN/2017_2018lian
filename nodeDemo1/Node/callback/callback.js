//为了证明

function waitFive(name,function_name){  //定义一个方法，等待5秒后执行回调函数
	var pus = 0;
	var currentDate = new Date();
	while(pus<5000){					//等待5秒
		var now = new Date();
		pus = now - currentDate;
	}   					
	function_name(name);
}
function echo(name){
	console.log(name);
}
waitFive('执行',echo);					//执行回调
console.log('it over');					//



//执行结果  证明回调并不是真正意义的异步  只是异步的一种解决方案  
//在waitFive执行的时候 还是阻塞的上面的进程。
/*	
 * 执行
 * it over
 * 
 */

