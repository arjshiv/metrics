(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('TransferController', TransferController);

  /** @ngInject */
  function TransferController(transfers, $uibModal, userId, candidateName, $log, toastr) {
    var vm = this;
    vm.transfers = transfers;
    vm.userId = userId;
    vm.candidateName = candidateName;

    /**
     * UI Grid options for the user table
     * @type {{data: [], enableFiltering: boolean, enableRowSelection: boolean, enableFullRowSelection: boolean}}
     */
    vm.gridOptions = {
      data: vm.transfers,
      enableFiltering: true,
      enableRowSelection: false,
      enableFullRowSelection: false
    };


    /**
     * Open modal to add a transfer
     */
    vm.addTransfer = function addTransfer() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/main/transfer/transfer.modal.html',
        controller: 'TransferModalController as transferModal',
        resolve: {
          candidate: function () {
            return vm.candidateName;
          },
          userId: function () {
            return vm.userId;
          }
        }
      });

      modalInstance.result.then(function (createdTransfer) {
        if (!createdTransfer.hasOwnProperty('candidate')) {
          createdTransfer.candidate = vm.candidateName;
        }
        toastr.success('Successfully created new transfer!');
        vm.transfers.push(createdTransfer);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  }
})();
