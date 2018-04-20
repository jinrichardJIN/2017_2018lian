var util = require('util');
var events = require('events');

function myStream(){
	events.eventEmitter.call(this);
}
//应用inherit myStream继承 eventEmitter
util.inherit(myStream,events.eventEmitter);

myStream.prototype.write = function(data){
	this.emit('data',data);
}
var stream = new myStream();