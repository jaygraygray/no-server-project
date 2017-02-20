angular.module("appName").controller("mainCtrl", function($scope, mainSvc) {



$scope.ip = userip;
mainSvc.makeCookie();
//check to see if userData {autoDetect: false}
//then use lat and long to get city info

var userData = mainSvc.getCookie();
console.log(userData)
// $scope.aqi = $scope.getAqi(userData.lat, userData.lng);
// $scope.weather = $scope.getWeather(userData.lat, userData.lng)


if (userData.autoDetect === true) {
	// get current location
	$scope.getLocalInfo = function(ip) {
		return mainSvc.getLocationInfo(ip).then(function(response) {
			$scope.locationInfo = response;
			$scope.city = response.city
			return $scope.locationInfo
		}).then(function(response) {
				$scope.aqi = $scope.getAqi(response.latitude, response.longitude);
				$scope.weather = $scope.getWeather(response.latitude, response.longitude);

		});
	}

	$scope.getLocalInfo($scope.ip);
}




if (userData.autoDetect === false) {
	$scope.city = userData.city;
	$scope.getCookieInfo = function(lat, long) {
		return mainSvc.getAqi(lat, long).then(function(response) {
			$scope.aqi = $scope.getAqi(lat, long)
			$scope.weather = $scope.getWeather(lat, long);
		});
	}

	$scope.getCookieInfo(userData.lat, userData.lng)

}




//get weather based on location
$scope.getWeather = function(latitude, longitude) {
	return mainSvc.getWeather(latitude, longitude)
	.then(function(weatherResponse) {
		$scope.weatherResponse = weatherResponse
		console.log($scope.weatherResponse);
	})
}



//get air quality index
$scope.getAqi = function(latitude, longitude) {
	return mainSvc.getAqi(latitude, longitude)
	.then(function(aqiResponse) {
		$scope.aqiResponse = aqiResponse;
		console.log($scope.aqiResponse)
	})
}




})