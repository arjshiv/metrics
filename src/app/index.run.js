(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, AuthenticationFactory) {
    $rootScope.$on("$stateChangeStart",
      function(event, toState, toParams, fromState, fromParams) {
        if (!(toState.auth && AuthenticationFactory.isLoggedIn())) {
          //not logged in
          $state.transitionTo("main.login");
          event.preventDefault();
        }
      });
    $log.debug('runBlock end');
  }

})();
