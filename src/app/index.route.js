(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    var home = {
      name: 'home',
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'mainController'
    };

    var candidate = {
      name: 'candidate',
      url: '/candidate',
      parent: 'main',
      templateUrl: 'app/main/candidate/candidate.html',
      controller: 'CandidateController',
      controllerAs: 'candidateController'
    };


    $stateProvider.state(home);
    $stateProvider.state(candidate);

    $urlRouterProvider.otherwise('/');
  }

})();
