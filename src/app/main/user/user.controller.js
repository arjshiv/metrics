(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController() {
    var vm = this;
    vm.name = 'UserController';
  }
})();
