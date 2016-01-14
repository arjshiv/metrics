(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('CandidateController', CandidateController);

  /** @ngInject */
  function CandidateController(candidates, $state, $stateParams, Store) {
    var vm = this;
    vm.candidates = candidates;
    initializeCandidate();

		/**
     * On selection, update URL with the selected candidate
     * Else, remove selection
     */
    vm.onSelect = function onSelect() {
      if (candidates.indexOf(vm.candidateName) >= 0) {
        $state.transitionTo('main.candidates', {candidateName: vm.candidateName}, {notify: false});
      } else {
        vm.candidateName = '';
      }
    };

		/**
     * Submit candidate name
     */
    vm.onSubmit = function onSubmit() {
      Store.setProperty('candidateName', vm.candidateName);
      $state.transitionTo('main.users', {candidateName: vm.candidateName});
    };

		/**
     * Initialize or set candidate
     */
    function initializeCandidate(){
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
  }
})();
