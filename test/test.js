const request = require('supertest');
const server = require('../server');
const chalk = require('chalk');

//===HTML Routes===
describe( chalk.yellow('::HTML Routes::\n'), function () {
	afterEach(function () {
		server.close();
	});

	it('responds to GET /', function(done) {
		request(server)
			.get('/')
			.expect(200, done);
	});

	it('responds to GET /project, with redirect due to not being logged in', function(done) {
		request(server)
			.get('/project')
			.expect(302, done);
	});

	it('responds to GET /public', function(done) {
		request(server)
			.get('/public')
			.expect(200, done);
	});

	it('responds to GET /assets/css/style.css', function(done) {
		request(server)
			.get('/assets/css/style.css')
			.expect(200, done);
	});

	it('responds to GET /assets/js/vendor.js', function(done) {
		request(server)
			.get('/assets/js/vendor.js')
			.expect(200, done);
	});

	it('responds to GET /assets/js/main.js', function(done) {
		request(server)
			.get('/assets/js/main.js')
			.expect(200, done);
	});

	it('responds to GET /assets/images/fav.png with 200', function(done) {
		request(server)
			.get('/assets/images/fav.png')
			.expect(200, done);
	});

	it('responds to GET /project', function(done) {
		request(server)
			.get('/project')
			.expect(302, done);
	});

});



//===API Routes===
describe(chalk.yellow('::API Routes::'), function () {
	
	describe(chalk.green('\nUser Routes:'), function () {
		it('responds to GET /api/user/foo@bar.com', function(done) {
			request(server)
				.get('/api/user/foo@bar.com')
				.expect(200, done);
		});

		it('responds to POST /api/user with {"status": "success"}', function(done) {
			request(server)
				.post('/api/user')
				.send({email: 'foobar@test.com', password:'testaccount'})
				.expect(200,done);
		});

		it('responds to POST /api/password {"status": "success"}', function(done) {
			request(server)
				.post('/api/password')
				.send({email: 'foobar@test.com', password:'testaccount'})
				.expect(200, {
					status: 'success'
				},done);
		});

		it('responds to POST /api/logout with redirect', function(done) {
			request(server)
				.post('/api/logout')
				.expect(302, done);
		});
	});

	describe(chalk.green('\nProject Routes:'), function () {

		it('responds to POST /api/project', function(done) {
			request(server)
				.post('/api/project')
				.expect(200, done);
		});

		it('responds to DELETE /api/project', function(done) {
			request(server)
				.del('/api/project')
				.expect(200, done);
		});

		it('responds to GET /api/project/user', function(done) {
			request(server)
				.get('/api/project/user')
				.expect(200, done);
		});

		it('responds to GET /api/project/public', function(done) {
			request(server)
				.get('/api/project/public')
				.expect(200, done);
		});

	});

	describe(chalk.green('\nEntry Routes:'), function () {

		it('responds to GET /api/project/entry', function(done) {
			request(server)
				.get('/api/project/entry')
				.expect(200, done);
		});

		it('responds to GET /api/project/public/entry/fake', function(done) {
			request(server)
				.get('/api/project/public/entry/fake')
				.expect(200, done);
		});

		it('responds to POST /api/project/entry', function(done) {
			request(server)
				.post('/api/project/entry')
				.expect(200, done);
		});

		it('responds to PUT /api/project/entry', function(done) {
			request(server)
				.put('/api/project/entry')
				.expect(200, done);
		});

		it('responds to DELETE /api/project/entry', function(done) {
			request(server)
				.del('/api/project/entry')
				.expect(200, done);
		});

		it('responds to PUT /api/project/position', function(done) {
			request(server)
				.put('/api/project/position')
				.expect(200, done);
		});
		
		it('responds to PUT /api/project/indentation', function(done) {
			request(server)
				.put('/api/project/indentation')
				.expect(200, done);
		});

	});

});