(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .config(routerConfig);

  /** @ngInject */
	/**
   * Configure the app routes
   * @param $stateProvider
   * @param $urlRouterProvider
   */
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
        url: '/candidates?candidateName',
        templateUrl: 'app/main/candidate/candidate.html',
        controller: 'CandidateController',
        controllerAs: 'candidateController',
        data: {
          root: false,
          displayName: 'Candidates'
        },
        resolve: {
					/**
           * Resolve all candidates within the state
           * @param UserFactory The user factory
           * @returns {Promise} Which resolves to list of candidates
           */
          candidates: function(UserFactory) {
            return UserFactory.getAllCandidates();
          }
        }
      })
      .state('main.users', {
        url: '/candidates/:candidateName/users',
        templateUrl: 'app/main/user/user.html',
        controller: 'UserController',
        controllerAs: 'userController',
        data: {
          root: false,
          displayName: 'Users'
        },
        resolve: {
					/**
           * Resolve users
           * @param $stateParams
           * @param Store
           * @param UserFactory
           * @returns {Promise}
					 */
          users: function($stateParams, Store, UserFactory) {
            return UserFactory.getUsers({
              candidate: $stateParams.candidateName || Store.get('candidateName')
            })
          }
        }
      })
      .state('main.users.transfers', {
        url: '/candidates/:candidateName/users/:userId/transfers',
        templateUrl: 'app/main/transfer/transfer.html',
        controller: 'TransferController',
        controllerAs: 'transferController',
        data: {
          root: false,
          displayName: 'Transfers'
        },
        resolve: {
					/**
           * Resolves list of transfers into the state
           * @param $stateParams
           * @param Store
           * @param TransferFactory
           * @returns {Promise}
					 */
          transfers: function($stateParams, Store, TransferFactory) {
            return TransferFactory.getTransfers({
              candidate: $stateParams.candidateName || Store.get('candidateName'),
              userId: $stateParams.userId || Store.get('userId')
            })
          }
        }
      });

    $urlRouterProvider.otherwise('/main/candidates');
  }

})();
