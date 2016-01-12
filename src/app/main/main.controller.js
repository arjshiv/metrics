(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(UserFactory, Store) {
    var vm = this;
    vm.url = 'url';
    vm.loading = true;
    vm.candidates = [];
    UserFactory.getAllCandidates().then(function(candidates) {
      vm.candidates.length = 0; //preserve pointer
      vm.candidates.push.apply(vm.candidates, candidates);
      Store.setProperty('candidates', candidates);
      vm.loading = false;
    });
  }
})();
