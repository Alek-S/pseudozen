$(document).ready(function(){
	
	$('#login').on('click', function(){
		event.preventDefault();
		$('#loginPrompt').fadeToggle(300);
	});

	$('#submit').on('click', function(){
		event.preventDefault();

		$.post(window.location.origin + '/api/password', {
			email: $('#email').val(),
			password: $('#password').val()
		}, function(response){
			console.log(response.status);
			if(response.status === 'success'){
				location.replace("/projects");
			}
		});
		
	});

});