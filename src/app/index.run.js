(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
