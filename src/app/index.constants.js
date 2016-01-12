/* global malarkey:false, moment:false, _:false, console:false */
(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .constant('malarkey', malarkey)
    .constant('_', _)
    .constant('apiBaseUrl', 'http://fake-button.herokuapp.com/')
    .constant('console', console)
    .constant('moment', moment);
})();
