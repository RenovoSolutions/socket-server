var guid = require('uuid');
var q = require('q');

var config = require('./rabbit.json');

module.exports = function(connection) {
	var deferred = q.defer();
	var name = guid.v1();

	connection.queue(name, { exclusive: true }, function(queue) {
		console.log('- queue created -');
		queue.bind(config.exchange, '', function() {
			console.log('- binding queue -');
			deferred.resolve(queue);
		});
	});

	return deferred.promise;
};
