var PORT = 80;
var Server = require('socket.io');

exports.connect = function(port) {
	if (!port) {
		port = PORT;
	}

	var io = new Server(port);
	io.on('connection', function(socket) {
		console.log('- somebody connected -');

		socket.on('disconnect', function() {
			console.log('- somebody disconnected -');
		});
	});

	return {
		send: function(channel, message) {
			console.log('- sending "' + message + '" to "' + channel + '" -');
			io.emit(channel, message);
		},
	};
}
