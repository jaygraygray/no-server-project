angular.module("appName").service("mainSvc", function($http, $cookies) {
	
//get location by IP
this.getLocationInfo = function(ip) {
	return $http.get('http://freegeoip.net/json/' + ip).then(function(response) {
		
		if (response.status === 200) {
			return response.data;	
		} else {
			return "Something went wrong while getting your location. Sorry! Hope this helps: " + response.error;
		}

		
	});
}


//get weather
var weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?'
var weatherKEY = '2a71fc11ed3e7be089142b2de53f9cd5'
this.getWeather = function(latitude, longitude) {
	return $http.get(weatherURL + 'lat=' + latitude + '&lon=' + longitude + '&APPID=' + weatherKEY + "&units=imperial")
	.then(function(response) {
		if (response.status === 200) {
			var results = [];
			results.push(response.data.list[7], response.data.list[14], response.data.list[21], response.data.list[0])
			return results;
		} else {
			return "Something went wrong while getting the weather. " + response.error;
		}
	})
}


//get air quality index
var aqiURL = 'https://api.breezometer.com/baqi/?'
var aqiKEY = '4ed659ffc1f343efb7b7623ebc123436'
this.getAqi = function(latitude, longitude) {
	return $http.get(aqiURL + "lat=" + latitude + " &lon=" + longitude + "&key=" + aqiKEY + "&fields=breezometer_aqi,breezometer_description")
	.then(function(response) {
		if (response.status === 200) {
			return response.data;
		} else {
			return "Something went wrong while getting the air quality. " + response.error;
		}
	})
}

//get a list of ALL news sources -- not articles, sources themselves
var newsSourceURL = 'https://newsapi.org/v1/sources?language=en'
var newsKEY = '4521bac6fa674579b7dedbade249b094'
this.getNewsSources = function() {
	return $http.get(newsSourceURL)
	.then(function(response) {
		if (response.status === 200) {
			return response.data
		} else {
			return 'Something went wrong while getting the news. ' + response.error
		}
	});
}

//get news for individual source
var newsStoryURL = 'https://newsapi.org/v1/articles'
this.getNewsStories = function(id) {
	return $http.get(newsStoryURL + '?source=' + id + "&apiKey=" + newsKEY)
	.then(function(response) {
		if (response.status === 200) {
			return response.data
		} else {
			return 'There was an error getting the news from your source: ' + id + ': ' + response.error;
		}
	});
}





this.sortWeather = function(weatherInput) {
	for (var i = 0; i < weatherInput.length; i++) {
		for (var prop in weatherInput) {
			if (weatherInput[prop] === 'icon') {
				//assign icon dependng on results
			}
		}
	}
}



//Let's make some cookies!
//first, check if the userInfo cookie is present. If it IS, return the results. If it ISN'T, create one
this.makeCookie = function() {
	if (!$cookies.get('userData')) {
		var userInfo = {
			"city" : null,
			"autoDetect" : true,
			"lat" : '', 
			"lng" : '',
			"H_business" : false,
			"H_gaming" : false,
			"H_music" : false,
			"H_sports" :false,
			"H_entertainment" :false,
			"H_general" : false,
			"H_sci" : false,
			"H_tech" : false,
		};
		$cookies.put('userData', JSON.stringify(userInfo))
		

	} 
}



this.getCookie = function() {
	return JSON.parse($cookies.get('userData'));
}

//update cookie!
this.updateUserInfo = function(property, value) {
	var userInfo = this.getCookie();
	userInfo[property] = value;
	$cookies.put('userData', JSON.stringify(userInfo))
}


}).filter('toSec', function($filter) {
  return function(input) {
      var result = new Date(input).getTime();
      return result || '';
  };
});