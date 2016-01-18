(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('UserDeleteModalController', UserDeleteModalController);

  /** @ngInject */
  function UserDeleteModalController(user, UserFactory, $uibModalInstance, $log, toastr) {
    var vm = this;
    vm.formOptions = {
      userId: user.id,
      name: user.name,
      email: user.email,
      candidate: user.candidate
    };

    vm.loading = false;
    vm.success = undefined;
    vm.errorMessage = '';

    /**
     * Create the user
     */
    vm.deleteUser = function deleteUser() {
      vm.loading = true;
      vm.success = undefined;
      UserFactory.deleteUser(vm.formOptions).then(
          function(response) {
            vm.loading = false;
            if (response.success) {
              $log.info('Deleted user');
              vm.success = true;
              toastr.info('Successfully deleted user ' + vm.formOptions.name);
              vm.close(true);
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
