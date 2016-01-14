(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('UserModalController', UserModalController);

  /** @ngInject */
  function UserModalController(candidate, UserFactory, $uibModalInstance) {
    var vm = this;
    vm.formOptions = {
      name: '',
      email: '',
      candidate: candidate
    };

    vm.loading = false;

		/**
     * Create the user
     */
    vm.createUser = function() {
      UserFactory.createUser(vm.formOptions)
    };

		/**
     * Check if form is valid and ready to submit
     * @returns {string} Check if truthy or falsey
     */
    vm.isValid = function() {
      return vm.formOptions.name && vm.formOptions.email;
    };

		/**
     * Close the modal
     */
    vm.close = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
