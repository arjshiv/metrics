(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('UserModalController', UserModalController);

  /** @ngInject */
  function UserModalController(candidate, UserFactory, $uibModalInstance, $log) {
    var vm = this;
    vm.formOptions = {
      name: '',
      email: '',
      candidate: candidate
    };

    vm.loading = false;
    vm.success = undefined;

		/**
     * Create the user
     */
    vm.createUser = function createUser() {
      vm.loading = true;
      vm.success = undefined;
      UserFactory.createUser(vm.formOptions)
        .then(
          function(createdUser) {
            $log.info('Created new user');
            $log.info(createdUser);
            vm.success = true;
          },
          function() {
            $log.error('Could not create user');
            vm.success = false;
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
    vm.close = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
