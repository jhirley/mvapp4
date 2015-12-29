console.log('app.js is loading');
angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/', {
			templateUrl: '/partials/main/main'
			, controller: 'mvMainCtrl'
		}
	);
});

