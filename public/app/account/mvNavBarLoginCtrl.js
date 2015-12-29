angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http, mvNotifier, mvIdentity, mvAuth, $location) {
	$scope.identity = mvIdentity;
	$scope.signin = function (username, password) {
		mvAuth.authenticateUser(username, password).then(function (success){
			console.log('mvNavBarLoginCtrl.js '+ username + ' ' + password);
			if ( success ) {
				mvNotifier.notify('Log in successful');
			} else {
				mvNotifier.notify('Username / Password incorrect');
			}
		});
	};

	$scope.signout = function() {
		mvAuth.logoutUser().then(function(){
			$scope.username = "";
			$scope.password = "";
			mvNotifier.notify('You have successfully signed out!');
			$location.path('/');
		});
	}
});