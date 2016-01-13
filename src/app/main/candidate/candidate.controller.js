(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('CandidateController', CandidateController);

  /** @ngInject */
  function CandidateController(candidates, $state, $stateParams, Store) {
    var vm = this;
    vm.candidates = candidates;

    vm.onSelect = function onSelect() {
      $state.transitionTo('main.candidates', {candidateName: vm.candidateName}, {notify: false});
    };

    vm.onSubmit = function onSubmit() {
      Store.setProperty('candidateName', vm.candidateName);
      $state.transitionTo('main.users', {candidateName: vm.candidateName});
    };


    if ($stateParams.candidateName && (candidates.indexOf($stateParams.candidateName) >= 0)) {
      vm.candidateName = $stateParams.candidateName;
      Store.setProperty('candidateName', vm.candidateName);
    } else {
      vm.candidateName = Store.getProperty('candidateName') || undefined;
      if (vm.candidateName) {
        vm.onSelect();
      }
    }
  }
})();
