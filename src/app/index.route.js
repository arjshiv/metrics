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
        auth: false,
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainController',
        data: {
          root: true
        },
        ncyBreadcrumb: {
          label: 'Main',
          skip: true
        }
      })
      .state('main.login', {
        url: '/login',
        templateUrl: 'app/main/login/login.html',
        controller: 'LoginController',
        controllerAs: 'loginController',
        auth: false,
        data: {
          root: false
        },
        ncyBreadcrumb: {
          label: 'Login'
        }
      })
      .state('main.candidates', {
        url: '/candidates/:candidateName',
        auth: true,
        params: {
          candidateName: {value: null, squash: true}
        },
        templateUrl: 'app/main/candidate/candidate.html',
        controller: 'CandidateController',
        controllerAs: 'candidateController',
        data: {
          root: false,
          displayName: 'Candidates'
        },
        ncyBreadcrumb: {
          label: 'Candidates'
        },
        resolve: {
					/**
           * Resolve all candidates within the state
           * @param CandidateFactory The candidate factory
           * @returns {Promise} Which resolves to list of candidates
           */
          candidates: function(CandidateFactory) {
            return CandidateFactory.getAllCandidates();
          }
        }
      })
      .state('main.users', {
        url: '/candidates/:candidateName/users',
        templateUrl: 'app/main/user/user.html',
        controller: 'UserController',
        controllerAs: 'userController',
        auth: true,
        data: {
          root: false,
          displayName: 'Users'
        },
        ncyBreadcrumb: {
          parent: 'main.candidates',
          label: 'Users'
        },
        resolve: {
					/**
           * Resolve users
           * @param $stateParams
           * @param UserFactory
           * @returns {Promise}
					 */
          users: function($stateParams, UserFactory) {
            return UserFactory.getUsers({
              candidate: $stateParams.candidateName
            }).then(function(response) {
              return response.data || [];
            })
          },
          candidateName: function($stateParams) {
            return $stateParams.candidateName;
          }
        }
      })
      .state('main.users.transfers', {
        url: '/:userId/transfers',
        auth: true,
        views: {
          '@main': { //show transfers in the main.html ui-view even though it is a child of users
            templateUrl: 'app/main/transfer/transfer.html',
            controller: 'TransferController',
            controllerAs: 'transferController'
          }
        },
        data: {
          root: false,
          displayName: 'Transfers'
        },
        ncyBreadcrumb: {
          label: 'Transfers'
        },
        resolve: {
					/**
           * Resolves list of transfers into the state
           * @param $stateParams
           * @param TransferFactory
           * @returns {Promise}
					 */
          transfers: function($stateParams, TransferFactory) {
            return TransferFactory.getTransfers({
              candidate: $stateParams.candidateName,
              userId: $stateParams.userId
            }).then(function(response) {
              return response.data || [];
            });
          },
          userId: function($stateParams) {
            return $stateParams.userId;
          },
          candidateName: function($stateParams) {
            return $stateParams.candidateName;
          }
        }
      });

    $urlRouterProvider.otherwise('/main/candidates');
  }

})();
