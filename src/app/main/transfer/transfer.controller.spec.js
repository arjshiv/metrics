(function () {
  'use strict';
  var state;
  beforeEach(function() {
    module('fullStackCodingChallenge', function ($provide) {
      $provide.service('transfers', function () {
        return [{}];
      });
      $provide.service('candidateName', function () {
        return 'cjm123';
      });
      $provide.service('userId', function () {
        return '2';
      });
    });
  });
  beforeEach(module('ui.router'));
  describe('transfer controller', function () {
    beforeEach(inject(function (_$state_) {
      state = _$state_;
    }));
    beforeEach(function() {
      spyOn(state, 'transitionTo').and.callThrough();
    });

    it('should have transfers', inject(function ($controller) {
      var vm = $controller('TransferController');
      //write your tests here
      expect(angular.isArray(vm.transfers)).toBeTruthy();
    }));
  });
})();
