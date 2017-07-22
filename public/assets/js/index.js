$(document).ready(function(){
	

	$('#login').on('click', function(){
		event.preventDefault();
		$('#registerPrompt').fadeOut(300);
		$('#registerError').hide();
		$('#loginPrompt').fadeToggle(300);
	});


	$('#register').on('click', function(){
		event.preventDefault();
		$('#loginPrompt').fadeOut(300);
		$('#loginError').hide();
		$('#registerPrompt').fadeToggle(300);
	});


	$('#submit').on('click', function(){
		event.preventDefault();
		var email = $('#email').val();
		var password = $('#password').val();

		$('#loginError').hide();

		
		if(!email || !password){ //validate forms filled
			$('#loginError').text('Missing form field');
			$('#loginError').fadeIn(300);
		} else if( !validator.isEmail(email) ){ //validate email formatting
			$('#loginError').text('Email formatting');
			$('#loginError').fadeIn(300);
		}else{
			$.post(window.location.origin + '/api/password', {
				email: email,
				password: password
			}, function(response){
				console.log(response.status);
				if(response.status === 'success'){
					location.replace("/project");
				}else{
					$('#loginError').text('Incorrect credentials');
					$('#loginError').fadeIn(300);
				}
			});
		}
		
	});


	$('#registerbtn').on('click', function(){
		event.preventDefault();
		var name = $('#nameReg').val();
		var email = $('#emailReg').val();
		var password = $('#passwordReg').val();
		var passwordMatch = $('#passwordMatch').val();

		$('#registerError').hide();


		if(!email || !name || !password || !passwordMatch){ //validate forms filled
			$('#registerError').text('Missing form field');
			$('#registerError').fadeIn(300);
		} else if( !validator.isEmail(email) ){ //validate email formatting
			$('#registerError').text('Email formatting');
			$('#registerError').fadeIn(300);
		} else if(password !== passwordMatch){ //validate both passwords match
			$('#registerError').text('Passwords don\'t match');
			$('#registerError').fadeIn(300);
		}else{
			console.log('here');
			$.post(window.location.origin + '/api/user', {
				email: email,
				name: name,
				password: password
			}, function(res){

				if(res.status === 'success'){
					//if registered - log in
					$.post(window.location.origin + '/api/password', {
						email: email,
						password: password
					}, function(response){
						console.log(response.status);
						if(response.status === 'success'){
							location.replace("/project");
						}else{
							$('#loginError').text('Incorrect credentials');
							$('#loginError').fadeIn(300);
						}
					});
				}else{
					$('#loginError').text('Registration Error');
					$('#loginError').fadeIn(300);
				}
			});
		}
		
	});

});