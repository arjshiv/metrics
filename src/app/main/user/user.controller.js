(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController(users, $state, candidateName, $uibModal, $log, uiGridConstants, _) {
    var vm = this;
    vm.users = users;
    vm.candidateName = candidateName;
    vm.selectedUser = undefined;

    vm.introOptions = {
      steps: [
        {
          intro: 'This is the user screen. Here, you can look through and add user data for a candidate and take actions on specific users.'
        },
        {
          intro: 'Use the table to search, sort, group and aggregate users. The icons on the table headers help you access these functions. Select a user by clicking on the specific row.',
          element: '#user-table-container'
        },
        {
          intro: 'You can take user-specific actions from this row. Add a user at any time, and select a user to view their transactios or delete them.',
          element: '#user-action-button-row'
        }
      ]
    };

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
     * Delete a user - confirm with modal
     */
    vm.deleteUser = function deleteUser() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/main/user/user.delete.modal.html',
        controller: 'UserDeleteModalController as userDeleteModal',
        resolve: {
          user: function() {
            return vm.selectedUser;
          }
        }
      });

      modalInstance.result.then(function () {
        var indexToDelete = _.findIndex(vm.users, function(u) {
          return u.id === vm.selectedUser.id
        });
        if (indexToDelete > 0) {
          vm.users.splice(indexToDelete, 1);
        }
        if (vm.gridApi) {
          vm.gridApi.grid.modifyRows(vm.gridOptions.data);
          vm.gridApi.selection.clearSelectedRows();
        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.viewTransfers = function viewTransfers() {
      $state.transitionTo('main.users.transfers', {candidateName: vm.candidateName, userId: vm.selectedUser.id});
    }
  }
})();
