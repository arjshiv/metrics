(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('TransferModalController', TransferModalController);

  /** @ngInject */
  function TransferModalController(candidate, userId, TransferFactory, $uibModalInstance, $log) {
    var vm = this;
    vm.formOptions = {
      amount: 1,
      candidate: candidate,
      userId: userId
    };

    vm.loading = false;
    vm.success = undefined;

    /**
     * Create the transfer
     */
    vm.createTransfer = function createTransfer() {
      vm.loading = true;
      vm.success = undefined;
      TransferFactory.createTransfer(vm.formOptions)
        .then(
          function(createdTransfer) {
            $log.info('Created new transfer');
            $log.info(createdTransfer);
            vm.success = true;
          },
          function() {
            $log.error('Could not create transfer');
            vm.success = false;
          }
        );
    };

    /**
     * Check if form is valid and ready to submit
     * @returns {string|boolean}
     */
    vm.isValid = function() {
      return vm.formOptions.amount && vm.formOptions.userId && !vm.loading;
    };

    /**
     * Close the modal
     */
    vm.close = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
