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
      return UserFactory.getUsers({candidate: 'FULLSTACK'}).then(function(allData) {
        return _.chain(allData).map('candidate').uniq().value();
      });
    }

    return {
      getAllCandidates: getAllCandidates
    }
  }

})();
