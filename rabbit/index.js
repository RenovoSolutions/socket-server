var rabbit = require('amqp');
var Rx = require('rx');

var config = require('./rabbit.json');

var getQueue = require('./queue');

exports.config = config;
exports.connect = function() {
	var queueStream = new Rx.Subject();

	var connection = rabbit.createConnection({ host: config.host, login: config.login, password: config.password });
	Rx.Observable.fromEvent(connection, 'ready').subscribe(function() {
		console.log('- connected to rabbit -');

		getQueue(connection).subscribe(function(queue) {
			console.log('- queue is listening for messages -');
			queue.subscribe(function(message, headers) {
				queueStream.onNext({
					channel: headers.channel,
					body: message.data.toString()
				});
			});
		}, function(error) {
			queueStream.onError(error);
		});
	});

	return queueStream;
};
