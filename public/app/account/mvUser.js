angular.module('app').factory('mvUser', function ($resource) {
	var UserResouce = $resource('/api/users/:id', {_id: '@id'}, {
		update: {method: 'PUT', isArray:false}
	});

	UserResouce.prototype.isAdmin = function() {
		return this.roles && this.roles.indexOf('admin') > -1;
	};

	return UserResouce;
});