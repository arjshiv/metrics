(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController(users, $state, candidateName, UserFactory, $uibModal, $log, toastr, uiGridConstants) {
    var vm = this;
    vm.users = users;
    vm.candidateName = candidateName;
    vm.selectedUser = undefined;

    /**
     * UI Grid options for the user table
     * @type {{data: [], enableFiltering: boolean, enableRowSelection: boolean, enableFullRowSelection: boolean}}
     */
    vm.gridOptions = {
      data: vm.users,
      enableFiltering: true,
      enableRowSelection: true,
      enableFullRowSelection: true,
      enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
      enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
      multiSelect: false, //one user at a time
      onRegisterApi: function(api) {
        vm.gridApi = api;
        vm.gridApi.selection.on.rowSelectionChanged(null, function(row) {
          vm.selectedUser = undefined;
          if (row.isSelected) {
            vm.selectedUser = row.entity;
          }
        });
      }
    };

		/**
     * Open modal to add a user
     */
    vm.addUser = function addUser() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/main/user/user.modal.html',
        controller: 'UserModalController as userModal',
        resolve: {
          candidate: function () {
            return vm.candidateName;
          }
        }
      });

      modalInstance.result.then(function (createdUser) {
        vm.users.unshift(createdUser);
        if (vm.gridApi) {
          vm.gridApi.grid.modifyRows(vm.gridOptions.data);
          vm.gridApi.selection.clearSelectedRows();
          vm.gridApi.selection.selectRow(vm.gridOptions.data[0]);
        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    /**
     * Stub
     * Delete a user
     */
    vm.deleteUser = function deleteUser() {
      UserFactory.deleteUser().then();
    };

    vm.viewTransfers = function viewTransfers() {
      $state.transitionTo('main.users.transfers', {candidateName: vm.candidateName, userId: vm.selectedUser.id});
    }
  }
})();
