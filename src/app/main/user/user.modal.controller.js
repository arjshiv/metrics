(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('UserModalController', UserModalController);

  /** @ngInject */
  function UserModalController(candidate, UserFactory, $uibModalInstance, $log, toastr) {
    var vm = this;
    vm.formOptions = {
      name: '',
      email: '',
      candidate: candidate
    };

    vm.loading = false;
    vm.success = undefined;
    vm.errorMessage = '';

		/**
     * Create the user
     */
    vm.createUser = function createUser() {
      vm.loading = true;
      vm.success = undefined;
      UserFactory.createUser(vm.formOptions)
        .then(
          function(response) {
            vm.loading = false;
            if (response.success) {
              var createdUser = response.data;
              $log.info('Created new user');
              $log.info(createdUser);
              vm.success = true;
              toastr.success('Successfully created user ' + vm.formOptions.name);
              vm.close(createdUser);
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
      return vm.formOptions.name && vm.formOptions.email && !vm.loading;
    };

		/**
     * Close the modal
     */
    vm.close = function(createdUser) {
      if (!createdUser) {
        $uibModalInstance.dismiss('cancel');
      } else {
        $uibModalInstance.close(createdUser);
      }
    };
  }
})();
