$(document).ready(function(){
	
	$('#login').on('click', function(){
		event.preventDefault();
		$('#loginPrompt').fadeToggle(300);
	});

});