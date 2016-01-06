angular.module('app').controller('mvCourseListCtrl', function($scope, mvCourse) {
  $scope.courses = mvCourse.query();
  
  $scope.sortOptions = [
  	{value: "title", text:"Sort by Text"},
  	{value: "published", text:"Sort by Date Published"}
  	];
  
  $scope.sortOrder = $scope.sortOptions[0].value;
});