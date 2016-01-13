(function () {
  'use strict';
  var state;
  beforeEach(function() {
    module('fullStackCodingChallenge', function ($provide) {
      $provide.service('users', function () {
        return ['Some User', 'Another User'];
      });
    });
  });
  beforeEach(module('ui.router'));
  describe('user controller', function () {
    beforeEach(inject(function (_$state_) {
      state = _$state_;
    }));
    beforeEach(function() {
      spyOn(state, 'transitionTo').and.callThrough();
    });
    it('should have users', inject(function ($controller) {
      var vm = $controller('UserController');
      //write your tests here
      expect(angular.isArray(vm.users)).toBeTruthy();
    }));
  });
})();
