(function() {
  'use strict';

  describe('candidate controller', function() {
    beforeEach(function() {
      module('fullStackCodingChallenge', function($provide) {
        $provide.service('candidates', function() {
          return ['Some User', 'Another User'];
        });
      });
    });

    it('should have candidates', inject(function($controller) {
      var vm = $controller('CandidateController');
      //write your tests here
      expect(angular.isArray(vm.candidates)).toBeTruthy();
    }));
  });
})();
