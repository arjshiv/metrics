(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .factory('UserFactory', UserFactory);

  /** @ngInject */
	/**
   * Factory to handle all CRUD operations for users
   * @param RestFactory
   * @param apiBaseUrl
   * @param _
   * @param $q
   * @returns {{createUser: createUser, getAllCandidates: getAllCandidates, getUsers: getUsers}}
   * @constructor
	 */
  function UserFactory(RestFactory, apiBaseUrl, _, $q) {
    var userUrl = apiBaseUrl + 'user';

		/**
     * Get users for a given candidate
     * @param {{}} parameters The parameters object
     * @param {String} parameters.candidate The candidate to make the request for
     * @returns {Promise}
     */
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

		/**
     * Create a new user
     * @param {{}} parameters Request parameters
     * @param {String} parameters.name The new user's name
     * @param {String} parameters.email The new user's email
     * @param {String} parameters.candidate The candidate to make the request for
     * @returns {Promise} which will resolve to the data for the new user if successful, empty array if not
     */
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
      getUsers: getUsers
    }
  }

})();
