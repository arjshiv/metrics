(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .factory('CandidateFactory', CandidateFactory);

  /** @ngInject */

	/**
   * Factory to handle all CRUD operations for candidates
   * @param UserFactory
   * @param _
   * @returns {{getAllCandidates: getAllCandidates}}
   * @constructor
	 */
  function CandidateFactory(UserFactory,  _) {

    /**
     * Get all possible candidates
     * @returns {Promise} A promise which resolves to an array of strings, each representing a unique candidate
     */
    function getAllCandidates() {
      return UserFactory.getUsers({candidate: 'FULLSTACK'}).then(function(response) {
        var allData = response.data;
        return _.chain(allData).map('candidate').uniq().value();
      });
    }

		/**
     * 'Create' a new candidate by creating an 'Admin' user with that candidate name
     * @param {String} candidateName The candidate to make the request for
     * @returns {Promise} which will resolve to the data for the new user if successful, empty array if not
     * @returns {Promise}
     */
    function createCandidate(candidateName) {
      var parameters = {
        candidate: candidateName,
        name: 'Admin',
        email: 'admin@' + parameters.candidate.replace() + '.com'
      };
      return UserFactory.createUser(parameters); //takes care of errors through underlying RestFactory
    }

    return {
      getAllCandidates: getAllCandidates,
      createCandidate: createCandidate
    }
  }

})();
