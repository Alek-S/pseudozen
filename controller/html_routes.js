const path = require('path');

module.exports = function(app) {

	//===HTML ROUTES===

	app.get('/projects', (req,res)=>{
		console.log(req.session);

		console.log({ projectQuery: req.query.p });

		if(req.session.loggedIn && req.session.loggedIn === true){
			res.sendFile(path.join(__dirname, '../public/projects.html'));
		}else{
			//TODO
			res.redirect('/');
		}
	});
};