angular.module('app').controller('mvCourseDetailsCtrl', function ($scope, mvCourse, $routeParams) {
	$scope.course = mvCourse.get({_id:$routeParams.id});
	console.log('mvCourseDetailsCtrl is running')
});