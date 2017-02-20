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