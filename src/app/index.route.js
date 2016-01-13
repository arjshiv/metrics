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
        controllerAs: 'mainController',
        data: {
          root: true
        }
      })
      .state('main.candidates', {
        url: '/candidates',
        templateUrl: 'app/main/candidate/candidate.html',
        controller: 'CandidateController',
        controllerAs: 'candidateController',
        data: {
          root: false,
          displayName: 'Candidates'
        }
      })
      .state('main.users', {
        url: '/users',
        templateUrl: 'app/main/user/user.html',
        controller: 'UserController',
        controllerAs: 'userController',
        data: {
          root: false,
          displayName: 'Users'
        }
      })
      .state('main.transfers', {
        url: '/transfers',
        templateUrl: 'app/main/transfer/transfer.html',
        controller: 'TransferController',
        controllerAs: 'transferController',
        data: {
          root: false,
          displayName: 'Transfers'
        }
      });

    $urlRouterProvider.otherwise('/main');
  }

})();
