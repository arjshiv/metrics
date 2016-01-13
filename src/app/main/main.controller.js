(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;
    vm.url = 'url';
  }
})();
