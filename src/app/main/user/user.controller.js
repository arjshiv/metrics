(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController(users, $state, $stateParams, Store, UserFactory, $uibModal, $log) {
    var vm = this;
    vm.users = users;
    vm.candidateName = $stateParams.candidateName; //mandatory at this point
    vm.gridOptions = {
      data: vm.users,
      enableFiltering: true,
      enableRowSelection: true,
      enableFullRowSelection: true
    };

    vm.addUser = function() {
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

      modalInstance.result.then(function () {

      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }
})();
