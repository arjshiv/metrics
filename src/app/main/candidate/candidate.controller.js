(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('CandidateController', CandidateController);

  /** @ngInject */
  function CandidateController(candidates, $state, $stateParams, Store, $uibModal) {
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
     * Candidate creation via modal
     */
    vm.createCandidate = function createCandidate() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/main/candidate/candidate.modal.html',
        controller: 'CandidateModalController as candidateModal',
        resolve: {
          candidates: function() {
            return vm.candidates;
          }
        }
      });

      modalInstance.result.then(function (createdCandidate) {
        vm.candidates.push(createdCandidate);
        vm.candidateName = createdCandidate;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
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
