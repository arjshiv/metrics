(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .controller('CandidateController', CandidateController);

  /** @ngInject */
  function CandidateController() {
    var vm = this;
    vm.name = 'CandidateController';
  }
})();
