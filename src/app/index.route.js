(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainController'
      })
      .state('main.candidate', {
        url: '/candidate',
        templateUrl: 'app/main/candidate/candidate.html',
        controller: 'CandidateController',
        controllerAs: 'candidateController'
      })
      .state('main.user', {
        url: '/user',
        templateUrl: 'app/main/user/user.html',
        controller: 'UserController',
        controllerAs: 'userController'
      })
      .state('main.transfer', {
        url: '/transfer',
        templateUrl: 'app/main/transfer/transfer.html',
        controller: 'TransferController',
        controllerAs: 'transferController'
      });

    $urlRouterProvider.otherwise('/main');
  }

})();
