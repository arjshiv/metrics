(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('CandidateModalController', CandidateModalController);

  /** @ngInject */
  function CandidateModalController(candidates, CandidateFactory, $uibModalInstance, $log, toastr) {
    var vm = this;
    vm.candidates = candidates;
    vm.formOptions = {
      candidate: 'YourCandidate'
    };

    vm.loading = false;
    vm.success = undefined;
    vm.errorMessage = '';

    /**
     * Create the user
     */
    vm.createCandidate = function createCandidate() {
      vm.loading = true;
      vm.success = undefined;
      if (vm.candidates.indexOf(vm.formOptions.candidate) >= 0) {
        vm.success = false;
        vm.errorMessage = 'Candidate already exists';
        vm.loading = false;
      }
      CandidateFactory.createCandidate(vm.formOptions.candidate)
        .then(
          function(response) {
            vm.loading = false;
            if (response.success) {
              var createdCandidate = response.data;
              $log.info('Created new candidate');
              $log.info(createdCandidate);
              vm.success = true;
              toastr.success('Successfully created candidate ' + vm.formOptions.candidate);
              vm.close(createdCandidate.candidate);
            } else {
              $log.error(response);
              vm.errorMessage = response.message;
              vm.success = false;
              vm.loading = false;
            }
          }
        );
    };

    /**
     * Check if form is valid and ready to submit
     * @returns {string|boolean}
     */
    vm.isValid = function() {
      return vm.formOptions.candidate && !vm.loading;
    };

    /**
     * Close the modal
     */
    vm.close = function(createdCandidate) {
      if (!createdCandidate) {
        $uibModalInstance.dismiss('cancel');
      } else {
        $uibModalInstance.close(createdCandidate);
      }
    };
  }
})();
