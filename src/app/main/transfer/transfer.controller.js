(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('TransferController', TransferController);

  /** @ngInject */
  function TransferController(transfers) {
    var vm = this;
    vm.name = 'TransferController';
  }
})();
