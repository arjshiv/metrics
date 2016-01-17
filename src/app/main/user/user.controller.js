(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController(users, $state, candidateName, UserFactory, $uibModal, $log, toastr) {
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
        vm.users.push(createdUser);
        toastr.success('Successfully created new user!');
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
      $state.transitionTo('main.transfers', {candidateName: vm.candidateName, userId: vm.selectedUser.id});
    }
  }
})();
