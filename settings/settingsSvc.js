angular.module('appName').service('settingsSvc', function($http, $cookies) {


//get lat and long via city name 
this.getCoordinates = function(cityName) {
	var coordinatesData = [];
	// [Cityname, latitude, longitude]
	return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURIComponent(cityName))
	.then(function(response) {
		if (response.status === 200) {
			console.log("getting there")
			 coordinatesData.push(response.data.results[0].formatted_address,
			 						 response.data.results[0].geometry.location.lat,
			 						 response.data.results[0].geometry.location.lng)
			console.log(coordinatesData);
			return coordinatesData;
		} else {
			 console.log("Something went wrong with validating your city. Please check your spelling or consider the fact you've been transported to an alternate dimension.");
			return response.error;
		}
	});
}



})


