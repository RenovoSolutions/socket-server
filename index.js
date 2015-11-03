var rabbit = require('./rabbit');
var commandLineArgs = require('command-line-args');

var args = commandLineArgs([{ name: 'port', alias: 'p' }]).parse();

var socketConfig = require('./socket');
var socketInst = null;

socketInst = socketConfig.connect(args.port);

rabbit.connect().subscribe(function(message) {
	if (socketInst) {
		socketInst.send(message.channel, message.body);
	}
}, function() {
	console.error('- failed to connect to the queue -');
});
