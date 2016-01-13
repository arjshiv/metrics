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

    vm.createUser = function() {
      UserFactory.createUser(vm.formOptions)
    };

    vm.isValid = function() {
      return vm.formOptions.name && vm.formOptions.email;
    };

    vm.close = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
