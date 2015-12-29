angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http, mvNotifier, mvIdentity, mvAuth) {
	$scope.identity = mvIdentity;
	$scope.signin = function (username, password) {
		mvAuth.authenticateUser (username, password).then(function (success){
			if ( success ) {
				mvNotifier.notify('log in is moving along');
			} else {
				mvNotifier.notify('User / Password incorrect');
			}
		});
	};
});