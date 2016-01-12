(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('TransferController', TransferController);

  /** @ngInject */
  function TransferController() {
    var vm = this;
    vm.name = 'TransferController';
  }
})();
