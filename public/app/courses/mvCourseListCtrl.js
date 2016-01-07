angular.module('app').controller('mvCourseListCtrl', function ($scope, mvCachedCourses) {
  $scope.courses = mvCachedCourses.query();
  
  $scope.sortOptions = [
  	{value: "title", text:"Sort by Text"},
  	{value: "published", text:"Sort by Date Published"}
  	];
  
  $scope.sortOrder = $scope.sortOptions[0].value;
});