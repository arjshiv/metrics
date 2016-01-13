(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .factory('UserFactory', UserFactory);

  /** @ngInject */
  function UserFactory(RestFactory, apiBaseUrl, _, $q) {
    var userUrl = apiBaseUrl + 'user';
    function getUsers(parameters) {
      var candidate = parameters.candidate;
      return RestFactory.makeRequest({
        url: userUrl,
        method: 'GET',
        params: {
          candidate: candidate
        }
      });
    }

    function getAllCandidates() {
      return getUsers({candidate: 'FULLSTACK'}).then(function(allData) {
        return _.chain(allData).map('candidate').uniq().value();
      });
    }

    function createUser(parameters) {
      var valid = true;
      var requiredParams = ['name', 'email', 'candidate'];
      _.forEach(requiredParams, function(p) {
        if (!parameters.hasOwnProperty(p)) {
          valid = false;
        }
      });
      if (!valid) {
        var dfd = $q.defer();
        dfd.resolve([]);
        return dfd.promise();
      }
      return RestFactory.makeRequest({
        url: userUrl,
        method: 'POST',
        data: parameters
      });
    }

    return {
      createUser: createUser,
      getAllCandidates: getAllCandidates,
      getUsers: getUsers
    }
  }

})();
