var guid = require('uuid');
var Rx = require('rx');

var config = require('./rabbit.json');

module.exports = function(connection) {
	var queueSubject = new Rx.Subject();
	var name = guid.v1();

	connection.queue(name, { exclusive: true }, function(queue) {
		console.log('- queue created -');
		queue.bind(config.exchange, '', function() {
			console.log('- binding queue -');
			queueSubject.onNext(queue);
		});
	});

	return queueSubject;
};
