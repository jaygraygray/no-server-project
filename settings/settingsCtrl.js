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



