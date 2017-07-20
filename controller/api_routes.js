const bcrypt = require('bcrypt');
const validator = require('validator');
const chalk = require('chalk');
//model
const User = require('../model/User.js');
const Project = require('../model/Project.js');


module.exports = function(app) {
	
	//=================
	//===USER ROUTES===
	//=================

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
								// console.log('count:', count);
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
									//if yes - req.session.loggedIn=true and set req.session.email req.session.name
									req.session.loggedIn = true;
									req.session.email = doc.email;
									req.session.name = doc.name;
									req.session._creator = doc._id;

									// console.log(req.session);
									res.json({status: 'success'});
								}
							}
						}); //end of bcrypt.compare
					}
				}); //end of User.findOne
			}
		}
	});//end of app.get password


	app.post('/api/logout', (req,res)=>{
		req.session.destroy( (err)=>{
			if(err){
				console.log(err);
			}
			console.log(req.session);
			res.redirect('/');
		});
	}); //end of logout




	//====================
	//===PROJECT ROUTES===
	//====================

	//create new project
	app.post('/api/project', (req,res)=>{
		let projectName = req.body.projectName;
		
		//check if logged in
		if(!req.session.loggedIn && req.session.loggedIn !== true){
			res.json({'status': 'fail - not logged in'});
		}else{
			if(!projectName){
				res.json({'status': 'fail - missing required body fields'});
			}else{
				console.log(chalk.yellow('Creating new project: ') + projectName);

				//check if project name exists in database
				Project.count({title: projectName}, (err, count)=>{
					if(err){
						console.log(err);
						res.json({'status': 'fail - title count'});
					}else{
						//if already exists - reply with error
						if(count > 0){
							res.json({'status': 'fail - project name already taken'});
						}else{
							//Create project
							Project.create({
								title: projectName,
								_creator: req.session._creator
							},(err)=>{
								if(err){
									console.log(err);
								}else{
									res.json({'status': 'success'});
								}
							}); //end of Project.create

						}
					}
				}); //end of User.count
			}
		}
	}); //end of app.post


	//Delete Project
	app.delete('/api/project', (req,res)=>{
		let projectName = req.body.projectName;

		//check if logged in
		if(!req.session.loggedIn && req.session.loggedIn !== true){
			res.json({'status': 'fail - not logged in'});
		}else{
			//check if project name provided
			if(!projectName){
				res.json({'status': 'fail - missing projectName'});
			}else{
				console.log(chalk.red('Deleting project: ') + projectName);

				Project.remove( {
					title: projectName,
					_creator: req.session._creator //is this their own project?
				}, (err)=>{
					if (err){
						console.log(err);
						res.json({'status': 'fail - delete error'});
					}else{
						res.json({'status': 'success'});
					}
				}); //end of Project.delete
			}
		}
	}); //end of app.delete

	//get user's projects
	app.get('/api/project/user', (req,res)=>{
		let user = req.session._creator;

		//check if logged in
		if(!req.session.loggedIn && req.session.loggedIn !== true){
			res.json({'status': 'fail - not logged in'});
		}else{
			Project.find({_creator: user}, (err,docs)=>{
				if(err){
					console.log(err);
					res.json({'status': 'fail - project find'});
				}else{
					res.json(docs);
				}
			}); //end of Project.find
		}
	}); //end of app.get




	//=======================
	//====PROJECT ENTRIES====
	//=======================


	//get entries for project
	app.get('/api/project/entry/:projectName?', (req,res)=>{
		let title = req.params.projectName;
		let user = req.session._creator;

		if(!title){
			res.json({'status': 'fail - missing project name'});
		}else{
			if(!req.session.loggedIn && req.session.loggedIn !== true){
				res.json({'status': 'fail - not logged in'});
			}else{
				Project.find({
					title: title,
					_creator: user
				})
					.select('entry')
					.exec( (err, docs)=>{
						if(err){
							console.log(err);
							res.json({'status': 'fail - error finding entries'});
						}else{
							res.json(docs);
						}
					});
			}
		}
	});

	//add entry to project
	app.post('/api/project/entry', (req,res)=>{
		let newEntry = req.body.newEntry;
		let title = req.body.title;
		let user = req.session._creator;

		//check if logged in
		if(!req.session.loggedIn && req.session.loggedIn !== true){
			res.json({'status': 'fail - not logged in'});
		}else{
			//update
			Project.update({
				title: title,
				_creator: user
			},{
				$push: {
					'entry':{
						'category': newEntry.category,
						'type': newEntry.type,
						'forms': newEntry.forms
					}
				},
			},
			{safe: true, upsert: true},
			(err)=>{
				if(err){
					console.log(err);
					res.json({'status': 'fail - could not update'});
				}else{
					//confirm all is well
					res.json({'status': 'success'});
				}
			}); //end of Project.update
		}
	});//end of app.post

	//update entry to project
	app.put('/api/project/entry', (req,res)=>{
		let title = req.body.title;
		let user = req.session._creator;
		let index = req.body.index; //index of entry
		let formField = req.body.field;
		let newValue = req.body.value;

		let toSet = 'entry.' + index + '.forms.' + formField; 

		//check if logged in
		if(!req.session.loggedIn && req.session.loggedIn !== true){
			res.json({'status': 'fail - not logged in'});
		}else{
			//update

			Project.update({
				'title': title,
				'_creator': user
			},{
				$set: {
					[toSet]:  newValue
				}
			}, (err)=>{
				if(err){
					console.log(err);
					res.json({'status': 'fail - could not update'});
				}else{
					//confirm all is well
					res.json({'status': 'success'});
				}
			}); //end of Project.update
		}

	}); //end of app.put


	//delete an entry from project
	app.delete('/api/project/entry', (req,res)=>{
		let title = req.body.title;
		let user = req.session._creator;
		let index = req.body.index; //index of entry

		let position = 'entry.' + index;

		//check body fields provided
		if(!title || index === undefined){
			res.json({'status': 'fail - missing body parameters'});
		}else{
			if(!req.session.loggedIn && req.session.loggedIn !== true){
				res.json({'status': 'fail - not logged in'});
			}else{
				//check if body fields provided
				if(!title){
					res.json({'status': 'fail - missing body fields'});
				}else{
					//unset
					Project.update({
						'title': title,
						'_creator': user
					},{
						$unset: { [position] : ''}
					}, (err)=>{
						if(err){
							console.log(err);
							res.json({'status': 'fail - unset'});
						}else{
							//clear out null entries
							Project.update({
								'title': title,
								'_creator': user
							},{
								$pull: {'entry': null}
							}, (err)=>{
								if(err){
									console.log(err);
									res.json({'status': 'fail - pull null entries'});
								}else{
									res.json({'status': 'success'});
								}
							});//end of update
						}
					});//end of Project.update
				}
			}
		}
	});//end of app.delete


	//move entry up or down
	app.put('/api/project/position', (req, res)=>{
		let title = req.body.title;
		let user = req.session._creator;
		let index = req.body.index; //index of entry
		let direction = req.body.direction; // up = 1, down -1

		if(!title || !direction || index === undefined){
			res.json({'status': 'fail - missing body parameters'});
		}

		let position = 'entry.' + index;
		let newPosition = parseInt(index) + parseInt(direction);
		let currentEntry = getCurrentEntry();


		//get current entry
		function getCurrentEntry(){
			
			Project.find({
				'title': title,
				'_creator': user
			}).select('entry').exec( (err,docs)=>{
				if(err){
					console.log(err);
					res.json({'status': 'fail - getting current entry'});
				}else{
					currentEntry =  docs[0].entry[index];
					updateOrder();
				}
			} );
		}


		function updateOrder(){
			if(!req.session.loggedIn && req.session.loggedIn !== true){
				res.json({'status': 'fail - not logged in'});
			}else{

				//1. set the position to null
				Project.update({
					'title': title,
					'_creator': user
				},{
					$unset: { [position] : ''}
				}, (err)=>{
					if(err){
						console.log(err);
						res.json({'status': 'fail - unset'});
					}else{
					
						//2. insert into new spot
						Project.update({
							'title': title,
							'_creator': user
						}, {
							$push:{ 
								entry: {
									$each: [currentEntry],
									$position: newPosition 
								}
							},
						}, (err)=>{
							if(err){
								console.log(err);
								res.json({'status': 'fail - position push'});
							}else{
								//3. clear out null entries
								Project.update({
									'title': title,
									'_creator': user
								},{
									$pull: {'entry': null}
								}, (err)=>{
									if(err){
										console.log(err);
										res.json({'status': 'fail - pull null entries'});
									}else{
										res.json({'status': 'success'});
									}
								});//end of update
							}
						});//end of project.update new spot
					}
				});//end of Project.update unset
		
			}
		} //end of function

	});//end of app.put


	//entry indent
	app.put('/api/project/indentation', (req, res)=>{
		let title = req.body.title;
		let index = req.body.index; //index of entry
		let direction = parseInt(req.body.direction); // +1 right, -1 left
		let user = req.session._creator;
		
		if(!title || !direction || index === undefined){
			res.json({'status': 'fail - missing body fields'});
		}

		let currentIndent = getCurrentIndent();
		let position = 'entry.' + index + '.forms.indent';


		//get current # of indents
		function getCurrentIndent(){
			//get current # of indents from mongo
			//return it
			Project.find({
				'title': title,
				// '_creator': user
			}).select('entry').exec((err,docs)=>{
				if(err){
					console.log(err);
					res.json({'status': 'fail - getting current entry'});
				}else{
					currentIndent = parseInt(docs[0].entry[index].forms.indent);
					updateIndent();
				}
			});
		}

		function updateIndent(){
			let newIndent = currentIndent + direction;
			
			//logged in?
			if(!req.session.loggedIn && req.session.loggedIn !== true){
				res.json({'status': 'fail - not logged in'});
			}else{
				//body fields provided?
				if(!title || !direction || index === undefined){
					res.json({'status': 'fail - missing body fields'});
				}else{

					//if new indent would be less than 0 or more than 3
					if(newIndent < 0 || newIndent > 3){
						// don't update, just respond
						res.json({'status': 'fail - further indentation outside of allowable range'});
					}else{
						//all good, update indent
						Project.update({
							'title': title,
							// '_creator': user
						},{
							[position]: newIndent
						}, (err)=>{
							if(err){
								console.log(err);
								res.json({'status': 'fail - update indent'});
							}else{
								res.json({'status': 'success'});
							}
						});//end of Project.update
					}
				}
			}
		} //end of updateIndent()
	}); //end of app.put



}; //end of module.export