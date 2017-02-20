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