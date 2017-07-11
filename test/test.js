const request = require('supertest');
const server = require('../server');
const chalk = require('chalk');

//===HTML Routes===
describe( chalk.yellow('HTML Routes:'), function () {
	afterEach(function () {
		server.close();
	});

	it('responds to GET / with 200', function(done) {
		request(server)
			.get('/')
			.expect(200, done);
	});

	// it('responds to GET /assets/css/style.css with 200', function(done) {
	// 	request(server)
	// 		.get('/assets/css/style.css')
	// 		.expect(200, done);
	// });

	// it('responds to GET /bundle.js with 200', function(done) {
	// 	request(server)
	// 		.get('/bundle.js')
	// 		.expect(200, done);
	// });

	// it('responds to GET /assets/images/logo.svg with 200', function(done) {
	// 	request(server)
	// 		.get('/assets/images/logo.svg')
	// 		.expect(200, done);
	// });
});



//===API Routes===
describe(chalk.yellow('API Routes:'), function () {
	afterEach(function () {
		server.close();
	});

	it('responds to GET /api/user/foo@bar.com with 200', function(done) {
		request(server)
			.get('/api/user/foo@bar.com')
			.expect(200, done);
	});

	it('responds to GET /api/user with 200', function(done) {
		request(server)
			.post('/api/user')
			.expect(200, done);
	});

	it('responds to GET /api/password with 200', function(done) {
		request(server)
			.post('/api/password')
			.expect(200, done);
	});

});