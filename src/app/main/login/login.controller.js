(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(AuthenticationFactory, $state) {
    var vm = this;
    AuthenticationFactory.logOut();
    vm.formOptions = {
      user: 'admin',
      pass: ''
    };

    vm.success = undefined;
    vm.errorMessage = 'Incorrect username and password. Please try again.';

    /**
     * Log the user in!
     */
    vm.logIn = function logIn() {
      vm.success = undefined;
      if (AuthenticationFactory.logIn(vm.formOptions.user, vm.formOptions.pass)) {
        vm.success = true;
        $state.transitionTo('main.candidates');
      } else {
        vm.success = false;
      }
    };

    /**
     * Truthy check for form validity
     * @returns {string|string}
     */
    vm.isValid = function isValid() {
      return vm.formOptions.user && vm.formOptions.pass;
    };
  }
})();
