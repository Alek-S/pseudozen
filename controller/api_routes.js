const bcrypt = require('bcrypt');
const validator = require('validator');

//model
const User = require('../model/User.js');
const Project = require('../model/Project.js');


module.exports = function(app) {

	//===USER ROUTES===
	
	//retrieve user
	app.get('/api/user/:email', (req,res)=>{
		let email = req.params.email;

		//check if email param provided
		if(!email){
			res.json({'status': 'fail - missing email'});
		}else{
			//check if user for email exists in database
			User.count({email: email}, (err, count)=>{
				if(err){
					console.log(err);
					res.json({'status': 'fail - email count'});
				}else{
					//if no user for email provided - fail reply
					if(count < 1){
						res.json({'status': 'fail - user not found'});
					}else{
						//look up user in db
						User.findOne({'email': email}, (err,doc)=>{
							if (err){
								console.log(err);
								res.json({'status': 'fail - Mongoose query'});
							}else{
								//reply with user email and name
								res.json({
									email: doc.email,
									name: doc.name,
								});
							}
						}); //end of User.findOne
					}
				}
			}); //end of User.count
		}
	}); //end of /api/user/:email

	//create new user
	app.post('/api/user', (req,res)=>{
		let email = req.body.email;
		let passwordPlain = req.body.password;
		let name = req.body.name;
		const saltRounds = 12;

		//was an email and password provided
		if(!email || !passwordPlain){
			res.json({'status': 'fail - missing required body fields'});
		}else{

			//check if email formatted correctly
			if( validator.isEmail(email) ){
				bcrypt.hash(passwordPlain, saltRounds, function(err, hash) {
					if(err){
						console.log(err);
						res.json({'status': 'fail - password hashing'});
					}else{
						//check if already in db
						User.count({email: email}, (err, count)=>{
							if(err){
								console.log(err);
							}else{
								console.log('count:', count);
								//if already in db - return already saved
								if(count > 0){
									res.json({'status': 'fail - user already saved'});
								}else{

									User.create({
										email: email,
										password: hash,
										name: name
									},(err, entry)=>{
										if(err){
											console.log(err);
										}else{
											res.json({'status': 'success'});
										}
									});

								}
							}
						});
					}
				});
			}else{
				//if email is not formatted correctly
				res.json({'status': 'fail - email formatting'});
			}
		}
	});

	//check password to confirm logged in for session
	app.post('/api/password', (req,res)=>{
		let email = req.body.email;
		let passwordToCheck = req.body.password;
		
		//check if body elements sent in
		if( !email || !passwordToCheck){
			res.json({'status': 'fail - missing required body fields'});
		}else{
			//check if password if formatted correctly
			if( !validator.isEmail(email) ){
				res.json({'status': 'fail - email formatting'});
			}else{
				//if yes - get user email and passwordHash info from User mongo collection
				User.findOne({'email': email}, (err,doc)=>{
					if (err){
						console.log(err);
						res.json({'status': 'fail - Mongoose query'});
					}else{
						//TODO
						//then bcrypt.compare() to see if password match
						bcrypt.compare(passwordToCheck, doc.password, (err, result) => {
							if(err){
								console.log(err);
								res.json({'status': 'fail - password hash compare'});
							}else{
								//if no - destroy session (req.session.destroy), return fail - session destroyed
								if(!result){
									res.json({status: 'fail - Password invalid'});
									req.session.destroy;
								}else{
									//if yes - req.session.loggedin=true and set req.session.email req.session.name
									req.session.loggedin = true;
									req.session.email = doc.email;
									req.session.name = doc.name;

									console.log(req.session);
									res.json({status: 'success'});
								}
							}
						}); //end of bcrypt.compare
					}
				}); //end of User.findOne
			}
		}
	});//end of app.get password


	//===PROJECT ROUTES===



}; //end of module.export