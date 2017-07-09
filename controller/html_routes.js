const path = require('path');

module.exports = function(app) {

	//===HTML ROUTES===

	app.get('/', (req,res)=>{
		res.sendFile(path.join(__dirname, '../public/index.html'));
	});

};