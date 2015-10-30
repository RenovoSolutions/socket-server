var rabbit = require('./rabbit');
var config = require('./rabbit.json');
var commandLineArgs = require('command-line-args');

var args = commandLineArgs([{ name: 'port', alias: 'p' }]).parse();

var socketConfig = require('./socket');
var socketInst = null;

var queue = require('./queue');

rabbit.connect().then(function(connection) {
	queue(connection).then(function(queue) {
		console.log('- queue is listening for messages -');
		queue.subscribe(function(message, headers) {
			push(headers.channel, message.data.toString());
		});
	});
});

socketInst = socketConfig.connect(args.port);

function push(channel, message) {
	if (socketInst) {
		socketInst.send(channel, message);
	}
}