(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController(users, $state, candidateName, UserFactory, $uibModal, $log) {
    var vm = this;
    vm.users = users;
    vm.candidateName = candidateName;

    /**
     * UI Grid options for the user table
     * @type {{data: [], enableFiltering: boolean, enableRowSelection: boolean, enableFullRowSelection: boolean}}
     */
    vm.gridOptions = {
      data: vm.users,
      enableFiltering: true,
      enableRowSelection: true,
      enableFullRowSelection: true
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
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }
})();
