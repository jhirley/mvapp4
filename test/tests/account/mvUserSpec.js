describe('mvUser', function (argument) {
	beforeEach(module('app'));
	describe('isAdmin', function(){
		it('should return false if the user does not have admin inside the roles array', inject(function (mvUser) {
			var user = new mvUser();
			user.roles = ['not admin'];
			expect(user.isAdmin()).to.be.falsey;
		}));

		it('should return true if the user does have admin inside the roles array', inject(function (mvUser) {
			var user = new mvUser();
			user.roles = ['admin'];
			expect(user.isAdmin()).to.be.true;
		}));
	});
});