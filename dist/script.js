angular.module("appName", ['ui.router', 'ngCookies'] )
.config(function($stateProvider, $urlRouterProvider) {

$stateProvider
	.state('index', {
		url: '/',
		templateUrl: '../index.html',
		controller: 'mainCtrl'
	})
	.state('settings', {
		url: '/settings',
		templateUrl: '/settings/settingsTemplate.html',
		controller: 'settingsCtrl'
	})
	.state('headlines', {
		url: '/headlines',
		templateUrl: '/headlines/headlinesTemplate.html',
		controller: 'headlinesCtrl'
	});


})
/**
 * @license AngularJS v1.6.2
 * (c) 2010-2017 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular) {'use strict';

/**
 * @ngdoc module
 * @name ngCookies
 * @description
 *
 * # ngCookies
 *
 * The `ngCookies` module provides a convenient wrapper for reading and writing browser cookies.
 *
 *
 * <div doc-module-components="ngCookies"></div>
 *
 * See {@link ngCookies.$cookies `$cookies`} for usage.
 */


angular.module('ngCookies', ['ng']).
  /**
   * @ngdoc provider
   * @name $cookiesProvider
   * @description
   * Use `$cookiesProvider` to change the default behavior of the {@link ngCookies.$cookies $cookies} service.
   * */
   provider('$cookies', [/** @this */function $CookiesProvider() {
    /**
     * @ngdoc property
     * @name $cookiesProvider#defaults
     * @description
     *
     * Object containing default options to pass when setting cookies.
     *
     * The object may have following properties:
     *
     * - **path** - `{string}` - The cookie will be available only for this path and its
     *   sub-paths. By default, this is the URL that appears in your `<base>` tag.
     * - **domain** - `{string}` - The cookie will be available only for this domain and
     *   its sub-domains. For security reasons the user agent will not accept the cookie
     *   if the current domain is not a sub-domain of this domain or equal to it.
     * - **expires** - `{string|Date}` - String of the form "Wdy, DD Mon YYYY HH:MM:SS GMT"
     *   or a Date object indicating the exact date/time this cookie will expire.
     * - **secure** - `{boolean}` - If `true`, then the cookie will only be available through a
     *   secured connection.
     *
     * Note: By default, the address that appears in your `<base>` tag will be used as the path.
     * This is important so that cookies will be visible for all routes when html5mode is enabled.
     *
     * @example
     *
     * ```js
     * angular.module('cookiesProviderExample', ['ngCookies'])
     *   .config(['$cookiesProvider', function($cookiesProvider) {
     *     // Setting default options
     *     $cookiesProvider.defaults.domain = 'foo.com';
     *     $cookiesProvider.defaults.secure = true;
     *   }]);
     * ```
     **/
    var defaults = this.defaults = {};

    function calcOptions(options) {
      return options ? angular.extend({}, defaults, options) : defaults;
    }

    /**
     * @ngdoc service
     * @name $cookies
     *
     * @description
     * Provides read/write access to browser's cookies.
     *
     * <div class="alert alert-info">
     * Up until Angular 1.3, `$cookies` exposed properties that represented the
     * current browser cookie values. In version 1.4, this behavior has changed, and
     * `$cookies` now provides a standard api of getters, setters etc.
     * </div>
     *
     * Requires the {@link ngCookies `ngCookies`} module to be installed.
     *
     * @example
     *
     * ```js
     * angular.module('cookiesExample', ['ngCookies'])
     *   .controller('ExampleController', ['$cookies', function($cookies) {
     *     // Retrieving a cookie
     *     var favoriteCookie = $cookies.get('myFavorite');
     *     // Setting a cookie
     *     $cookies.put('myFavorite', 'oatmeal');
     *   }]);
     * ```
     */
    this.$get = ['$$cookieReader', '$$cookieWriter', function($$cookieReader, $$cookieWriter) {
      return {
        /**
         * @ngdoc method
         * @name $cookies#get
         *
         * @description
         * Returns the value of given cookie key
         *
         * @param {string} key Id to use for lookup.
         * @returns {string} Raw cookie value.
         */
        get: function(key) {
          return $$cookieReader()[key];
        },

        /**
         * @ngdoc method
         * @name $cookies#getObject
         *
         * @description
         * Returns the deserialized value of given cookie key
         *
         * @param {string} key Id to use for lookup.
         * @returns {Object} Deserialized cookie value.
         */
        getObject: function(key) {
          var value = this.get(key);
          return value ? angular.fromJson(value) : value;
        },

        /**
         * @ngdoc method
         * @name $cookies#getAll
         *
         * @description
         * Returns a key value object with all the cookies
         *
         * @returns {Object} All cookies
         */
        getAll: function() {
          return $$cookieReader();
        },

        /**
         * @ngdoc method
         * @name $cookies#put
         *
         * @description
         * Sets a value for given cookie key
         *
         * @param {string} key Id for the `value`.
         * @param {string} value Raw value to be stored.
         * @param {Object=} options Options object.
         *    See {@link ngCookies.$cookiesProvider#defaults $cookiesProvider.defaults}
         */
        put: function(key, value, options) {
          $$cookieWriter(key, value, calcOptions(options));
        },

        /**
         * @ngdoc method
         * @name $cookies#putObject
         *
         * @description
         * Serializes and sets a value for given cookie key
         *
         * @param {string} key Id for the `value`.
         * @param {Object} value Value to be stored.
         * @param {Object=} options Options object.
         *    See {@link ngCookies.$cookiesProvider#defaults $cookiesProvider.defaults}
         */
        putObject: function(key, value, options) {
          this.put(key, angular.toJson(value), options);
        },

        /**
         * @ngdoc method
         * @name $cookies#remove
         *
         * @description
         * Remove given cookie
         *
         * @param {string} key Id of the key-value pair to delete.
         * @param {Object=} options Options object.
         *    See {@link ngCookies.$cookiesProvider#defaults $cookiesProvider.defaults}
         */
        remove: function(key, options) {
          $$cookieWriter(key, undefined, calcOptions(options));
        }
      };
    }];
  }]);

angular.module('ngCookies').
/**
 * @ngdoc service
 * @name $cookieStore
 * @deprecated
 * sinceVersion="v1.4.0"
 * Please use the {@link ngCookies.$cookies `$cookies`} service instead.
 *
 * @requires $cookies
 *
 * @description
 * Provides a key-value (string-object) storage, that is backed by session cookies.
 * Objects put or retrieved from this storage are automatically serialized or
 * deserialized by angular's toJson/fromJson.
 *
 * Requires the {@link ngCookies `ngCookies`} module to be installed.
 *
 * @example
 *
 * ```js
 * angular.module('cookieStoreExample', ['ngCookies'])
 *   .controller('ExampleController', ['$cookieStore', function($cookieStore) {
 *     // Put cookie
 *     $cookieStore.put('myFavorite','oatmeal');
 *     // Get cookie
 *     var favoriteCookie = $cookieStore.get('myFavorite');
 *     // Removing a cookie
 *     $cookieStore.remove('myFavorite');
 *   }]);
 * ```
 */
 factory('$cookieStore', ['$cookies', function($cookies) {

    return {
      /**
       * @ngdoc method
       * @name $cookieStore#get
       *
       * @description
       * Returns the value of given cookie key
       *
       * @param {string} key Id to use for lookup.
       * @returns {Object} Deserialized cookie value, undefined if the cookie does not exist.
       */
      get: function(key) {
        return $cookies.getObject(key);
      },

      /**
       * @ngdoc method
       * @name $cookieStore#put
       *
       * @description
       * Sets a value for given cookie key
       *
       * @param {string} key Id for the `value`.
       * @param {Object} value Value to be stored.
       */
      put: function(key, value) {
        $cookies.putObject(key, value);
      },

      /**
       * @ngdoc method
       * @name $cookieStore#remove
       *
       * @description
       * Remove given cookie
       *
       * @param {string} key Id of the key-value pair to delete.
       */
      remove: function(key) {
        $cookies.remove(key);
      }
    };

  }]);

/**
 * @name $$cookieWriter
 * @requires $document
 *
 * @description
 * This is a private service for writing cookies
 *
 * @param {string} name Cookie name
 * @param {string=} value Cookie value (if undefined, cookie will be deleted)
 * @param {Object=} options Object with options that need to be stored for the cookie.
 */
function $$CookieWriter($document, $log, $browser) {
  var cookiePath = $browser.baseHref();
  var rawDocument = $document[0];

  function buildCookieString(name, value, options) {
    var path, expires;
    options = options || {};
    expires = options.expires;
    path = angular.isDefined(options.path) ? options.path : cookiePath;
    if (angular.isUndefined(value)) {
      expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
      value = '';
    }
    if (angular.isString(expires)) {
      expires = new Date(expires);
    }

    var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    str += path ? ';path=' + path : '';
    str += options.domain ? ';domain=' + options.domain : '';
    str += expires ? ';expires=' + expires.toUTCString() : '';
    str += options.secure ? ';secure' : '';

    // per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:
    // - 300 cookies
    // - 20 cookies per unique domain
    // - 4096 bytes per cookie
    var cookieLength = str.length + 1;
    if (cookieLength > 4096) {
      $log.warn('Cookie \'' + name +
        '\' possibly not set or overflowed because it was too large (' +
        cookieLength + ' > 4096 bytes)!');
    }

    return str;
  }

  return function(name, value, options) {
    rawDocument.cookie = buildCookieString(name, value, options);
  };
}

$$CookieWriter.$inject = ['$document', '$log', '$browser'];

angular.module('ngCookies').provider('$$cookieWriter', /** @this */ function $$CookieWriterProvider() {
  this.$get = $$CookieWriter;
});


})(window, window.angular);

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

const gulp = require('gulp');
const concat = require('gulp-concat')

gulp.task('js', function() {
	gulp.src(['./script/app.js', 
		'./script/**.js',
		'./**/*.js',
		'!./node_modules/**'])
	.pipe(concat('script.js'))
	.pipe(gulp.dest('./dist'))
})

gulp.task('css', function() {
	gulp.src(['./reset.css', 
		'./**/*.css'])
	.pipe(concat('finalStyle.css'))
	.pipe(gulp.dest('./dist'))
})

gulp.task('default', ['js', 'css'])

gulp.watch('./js/**/*.js', ['js'])
gulp.watch('./styles/**/*.css', ['css'])
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
angular.module('appName').controller('headlinesCtrl', function($scope, mainSvc) {


//get news stories based on id
//// sample data: 
//// ign
//// business-insider
//// bbc-news
$scope.stories = []
$scope.getNews = function(id) {
	return mainSvc.getNewsStories(id)
	.then(function(storiesResponse) {
		$scope.stories.push(storiesResponse);
		console.log($scope.stories);
	});
}


//get all sources of news and place them in an array of objects so user can add/remove them
//to be displayed
//input is an array. each index is the category to be pulled
////// business
////// entertainment
////// gaming
////// general
////// music
////// science-and-nature
////// sport
////// technology

$scope.getAllStories = function(catArray) {
	return mainSvc.getNewsSources()
	.then(function(newsResponse) {
		$scope.news = newsResponse;

		//create Categories array and holder 
		var categories = [];
		var newsName = []
			for (let i = 0; i < $scope.news.sources.length; i++) {
			newsName[i] = new Category($scope.news.sources[i].name,
			 						$scope.news.sources[i].id,
			 						$scope.news.sources[i].category,
			 						true); 
			categories.push(newsName[i])

		}
//console.log(categories);
		// loop through categories object and match
		// category.category to inputCategory
		// use category.id to gets new for each
		
	for (let i = 0; i < categories.length; i++) {
		
		for (let q = 0; q < catArray.length; q++)

		if (categories[i].category === catArray[q]) {
			$scope.getNews(categories[i].id)
		}
	}
})
}

//get the cookie
//loop through props that being with "H_"
// if true, display stories for that category

var userInfo = mainSvc.getCookie();
console.log(userInfo)


//$scope.getAllStories(['sport']);

// constructor 
function Category (name, id, category, active) {
	this.name = name;
	this.id = id;
	this.category = category;
	this.active = active;
}



});
angular.module("appName")
.directive('headlines', function() {
	return {
		restrict: 'AE',
		templateUrl: '/headlines/articlesTemplate.html',
		controller: function($scope, mainSvc) {

			
			$scope.stories = [];
			$scope.getNews = function(id) {
				return mainSvc.getNewsStories(id)
				.then(function(storiesResponse) {
					$scope.stories.push(storiesResponse)
					
				});
			}
			//get all sources of news and place them in an array of objects so user can add/remove them
			//to be displayed
			//input is an array. each index is the category to be pulled
			////// business
			////// entertainment
			////// gaming
			////// general
			////// music
			////// science-and-nature
			////// sport
			////// technology

			$scope.getAllStories = function(catArray) {
				return mainSvc.getNewsSources()
				.then(function(newsResponse) {
					$scope.news = newsResponse;

					//create Categories array and holder 
					var categories = [];
					var newsName = []
						for (let i = 0; i < $scope.news.sources.length; i++) {
						newsName[i] = new Category($scope.news.sources[i].name,
						 						$scope.news.sources[i].id,
						 						$scope.news.sources[i].category,
						 						true); 
						categories.push(newsName[i])

					}
					// loop through categories object and match
					// category.category to inputCategory
					// use category.id to gets new for each
					
				for (let i = 0; i < categories.length; i++) {
					
					for (let q = 0; q < catArray.length; q++) {

					if (categories[i].category === catArray[q]) {
						$scope.getNews(categories[i].id)
							}
						}
					}
					// get Name and url to logo
				
				// console.log("NAME: " + $scope.news.sources[0].name)
				// console.log("URL: " + $scope.news.sources[0].urlsToLogos.small)
				// console.log($scope.news)
				})
			}
			

			// constructor 
			function Category (name, id, category, active) {
				this.name = name;
				this.id = id;
				this.category = category;
				this.active = active;
			}
			
			//get the stories
			$scope.userInfo = mainSvc.getCookie()
			console.log($scope.userInfo)
			var headlines = [];
			$scope.setUserHeadlines = function(userData) {
				for (var prop in userData) {
					if (prop.slice(0,2) === "H_") {
						if (userData[prop] === true) {
							headlines.push(prop.substring(2))
						}
					}
				}
				}
				$scope.setUserHeadlines($scope.userInfo);
				//console.log(headlines)
				$scope.getAllStories(headlines);


		},
	}

});

angular.module('appName').controller('settingsCtrl', function($scope, settingsSvc, mainSvc) {

mainSvc.makeCookie();

$scope.location = true;
$scope.locationTextbox = {'display':'none'};
$scope.offText = {'opacity': '.5'}

$scope.checkLocation = function(input) {
	if (input === true) {
		mainSvc.updateUserInfo('autoDetect', true)
		mainSvc.updateUserInfo('lat', null)
		mainSvc.updateUserInfo('lng', null)
		$scope.locationTextbox = {'display': 'none'}
		$scope.updatedCity = {'display': 'none'}
		$scope.offText = {'opacity': '.5'}
		$scope.onText = {'opacity': '1'}	
	} else {
		mainSvc.updateUserInfo('autoDetect', false)
		$scope.locationTextbox = {'display': 'unset'}
		$scope.onText = {'opacity': '.5'}
		$scope.offText = {'opacity': '1'}
	}
}


$scope.checkCity = function(city) {

	return settingsSvc.getCoordinates(city).then(function(response) {
		$scope.cityInfo = response;
		$scope.locationTextbox = {'display': 'none'}
		$scope.updatedCity = {'display': 'unset'}
		mainSvc.updateUserInfo('autoDetect', false)
		mainSvc.updateUserInfo('lat', $scope.cityInfo[1])
		mainSvc.updateUserInfo('lng', $scope.cityInfo[2])
		mainSvc.updateUserInfo('city', $scope.cityInfo[0])
	})
}

$scope.checkAutoLocation = function() {
	var userInfo = mainSvc.getCookie()
	if (userInfo.autoDetect === false) {
		$scope.location = false
	} else {
		$scope.location = true
	}
}

$scope.checkAutoLocation();

})
.directive("active", function(mainSvc) {
	return {
		link: function(scope, e, a) {
			
			//automatically highlight selected news headlines
			a.$observe('ngModel', function(value){ 
				var target = value;
				if (scope.checkUserHeadlines(scope.userInfo, value)) {
					e.addClass("active")
				} else {
					
				}
			e.on("click", function() {

				if (e.hasClass("active")) {
					console.log(target);
					mainSvc.updateUserInfo(target, false)
					e.removeClass("active");
				} else {
					console.log(target);
					mainSvc.updateUserInfo(target, true)
					e.addClass("active");
				}
		
				});


			 });

			//functionality to change headlines

			
		},
		controller: function($scope, mainSvc) {
					$scope.checkUserHeadlines = function(userInfo, headline) {
					var userInfo = mainSvc.getCookie()
					if (userInfo.hasOwnProperty(headline) && userInfo[headline] === true) {
						return true
					} else {
						return false
					}

				}


			},
		
		}
	});




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


