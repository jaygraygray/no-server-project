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