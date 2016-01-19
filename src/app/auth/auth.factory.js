//http://www.seanmarchetti.com/authentication_with_angularui_router.html
(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .factory('AuthenticationFactory', AuthenticationFactory);

  /** @ngInject */
  function AuthenticationFactory($cookies) {
    var loggedIn = false;
    var allowedCredentials = {
      user: 'admin',
      pass: 'admin'
    };

    /**
     * Log in with username and password
     * @param {String} user
     * @param {String} pass
     * @returns {boolean}
     */
    function logIn(user, pass) {
      if (user === allowedCredentials.user && pass === allowedCredentials.pass) {
        loggedIn = true;
        $cookies.put('login', 'true');
      } else {
        loggedIn = false;
        $cookies.remove('login');
      }
      return loggedIn;
    }

    /**
     * Check if logged in
     * @returns {boolean}
     */
    function isLoggedIn() {
      return $cookies.get('login') || loggedIn;
    }

    return {
      logIn: logIn,
      isLoggedIn: isLoggedIn
    };
  }

})();
