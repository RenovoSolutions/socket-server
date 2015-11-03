var PORT = 80;
var Server = require('socket.io');

var logger = require('node-queue-logger');
var rabbitConfig = require('./rabbit').config;

logger.configure({
	host: rabbitConfig.host,
	login: rabbitConfig.login,
	password: rabbitConfig.password,
	exchange: 'log',
});

var totalConnections = 0;

exports.connect = function(port) {
	if (!port) {
		port = PORT;
	}

	var io = new Server(port);
	io.on('connection', function(socket) {
		totalConnections++;
		logger.info({
			area: 'sockets',
			topic: 'connections',
			type: 'connect',
			address: socket.conn.remoteAddress,
			connections: totalConnections,
		});
		console.log('- somebody connected from ' + socket.conn.remoteAddress + ' -');
		console.log('- ' + totalConnections + ' total connections -');

		socket.on('disconnect', function() {
			totalConnections--;
			logger.info({
				area: 'sockets',
				topic: 'connections',
				type: 'disconnect',
				address: socket.conn.remoteAddress,
				connections: totalConnections,
			});
			console.log('- somebody disconnected from ' + socket.conn.remoteAddress + ' -');
			console.log('- ' + totalConnections + ' total connections -');
		});
	});

	return {
		send: function(channel, message) {
			console.log('- sending "' + message + '" to "' + channel + '" -');
			io.emit(channel, message);
		},
	};
}
