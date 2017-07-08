module.exports = function(app) {

	//===HTML ROUTES===

	app.get('/', (req,res)=>{
		res.send('it\'s alive');
	});

};