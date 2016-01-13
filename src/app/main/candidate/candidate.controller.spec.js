(function () {
  'use strict';
  var state;
  beforeEach(function() {
    module('fullStackCodingChallenge', function ($provide) {
      $provide.service('candidates', function () {
        return ['Some User', 'Another User'];
      });
    });
  });
  beforeEach(module('ui.router'));
  describe('candidate controller', function () {
    beforeEach(inject(function (_$state_) {
      state = _$state_;
    }));
    beforeEach(function() {
      spyOn(state, 'transitionTo').and.callThrough();
    });
    it('should have candidates', inject(function ($controller) {
      var vm = $controller('CandidateController');
      //write your tests here
      expect(angular.isArray(vm.candidates)).toBeTruthy();
    }));

    it('should change candidate url param without refreshing on select', inject(function ($controller) {
      var vm = $controller('CandidateController');
      vm.candidateName = 'cjm123';
      vm.onSelect();
      expect(state.transitionTo).toHaveBeenCalledWith('main.candidates', {candidateName: 'cjm123'}, {notify: false});
    }));

    it('should go to users on submit', inject(function ($controller) {
      var vm = $controller('CandidateController');
      vm.candidateName = 'cjm123';
      vm.onSubmit();
      expect(state.transitionTo).toHaveBeenCalledWith('main.users', {candidateName: 'cjm123'});
    }));
  });
})();
