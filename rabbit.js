var rabbit = require('amqp');
var q = require('q');

var config = require('./rabbit.json');

exports.connect = function() {
	var deferred = q.defer();

	var connection = rabbit.createConnection({ host: config.host, login: config.login, password: config.password });
	connection.on('ready', function() {
		console.log('- connected to rabbit -');
		deferred.resolve(connection);
	});

	return deferred.promise;
};
