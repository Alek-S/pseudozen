const request = require('supertest');
const server = require('../server');
const chalk = require('chalk');

//===HTML Routes===
describe( chalk.yellow('HTML Routes:'), function () {
	afterEach(function () {
		server.close();
	});

	it('responds to GET /', function(done) {
		request(server)
			.get('/')
			.expect(200, done);
	});

	it('responds to GET /assets/css/style.css', function(done) {
		request(server)
			.get('/assets/css/style.css')
			.expect(200, done);
	});

	it('responds to GET /assets/js/bundle.js', function(done) {
		request(server)
			.get('/assets/js/bundle.js')
			.expect(200, done);
	});

	// it('responds to GET /assets/images/logo.svg with 200', function(done) {
	// 	request(server)
	// 		.get('/assets/images/logo.svg')
	// 		.expect(200, done);
	// });

	it('responds to GET /project', function(done) {
		request(server)
			.get('/project')
			.expect(302, done);
	});

});



//===API Routes===
describe(chalk.yellow('API Routes:'), function () {

	it('responds to GET /api/user/foo@bar.com', function(done) {
		request(server)
			.get('/api/user/foo@bar.com')
			.expect(200, done);
	});

	it('responds to POST /api/user', function(done) {
		request(server)
			.post('/api/user')
			.expect(200, done);
	});

	it('responds to POST /api/password', function(done) {
		request(server)
			.post('/api/password')
			.expect(200, done);
	});

	it('responds to POST /api/logout with redirect', function(done) {
		request(server)
			.post('/api/logout')
			.expect(302, done);
	});

});