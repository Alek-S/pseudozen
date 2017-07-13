const path = require('path');

module.exports = function(app) {

	//===HTML ROUTES===

	app.get('/projects', (req,res)=>{
		console.log(req.session);
		res.sendFile(path.join(__dirname, '../public/projects.html'));
	});
};