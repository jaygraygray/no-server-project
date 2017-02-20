$(document).ready(function() {


$('body').on('click', '.forecast-arrow-down', function() {
	$('.forecast-not-displayed').switchClass('forecast-not-displayed', 
		'forecast-displayed', 250, 'swing');
	$(this).switchClass('forecast-arrow-down',
		'forecast-arrow-up', 250, 'swing');
})


$('body').on('click', '.forecast-arrow-up', function() {
	$('.forecast-displayed').switchClass('forecast-displayed', 
		'forecast-not-displayed', 250, 'swing');
	$(this).switchClass('forecast-arrow-up',
		'forecast-arrow-down', 250, 'swing');
})


$('body').on('click', '.menu', function() {
	console.log("menu button clicked");
	$('#headlines').switchClass('headlinesMenu',
		'headlinesMenuShow', 350, 'swing');
})

$('body').on('click', '.menu-hide', function() {
	console.log("lsdkjfsdf")
	$('#headlines').switchClass('headlinesMenuShow',
		'headlinesMenu', 350, 'swing');
})

});