(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .factory('TransferFactory', TransferFactory);

  /** @ngInject */
	/**
   * Factory to handle all CRUD operations for transfers
   * @param RestFactory
   * @param apiBaseUrl
   * @param _
   * @param $q
   * @returns {{getTransfers: getTransfers, createTransfer: createTransfer}}
   * @constructor
	 */
  function TransferFactory(RestFactory, apiBaseUrl, _, $q) {
    var transferUrl = apiBaseUrl + 'transfer';
    var userTransferUrlBase = apiBaseUrl + 'user/';

		/**
     * Get transfers either through user ID or transfer ID
     * @param {{}} parameters
     * @param {String} parameters.candidate The candidate to make the request for
     * @param {String=} parameters.id The transfer id
     * @param {String=} parameters.userId The user id to get all transfers for
     * @returns {Promise} Resolves to array of data if successful, empty if not
     */
    function getTransfers(parameters) {
      var candidate = parameters.candidate;
      var url = transferUrl;
      if (parameters.hasOwnProperty('id')) {
        url += '/' + parameters.id;
      } else if (parameters.hasOwnProperty('userId')) {
        url = userTransferUrlBase + parameters.userId + '/transfers'
      }
      return RestFactory.makeRequest({
        url: url,
        method: 'GET',
        params: {
          candidate: candidate
        }
      });
    }

    /**
     * Create a new transfer
     * @param {{}} parameters Request parameters
     * @param {String} parameters.amount Transfer amount
     * @param {String} parameters.userId The user id
     * @param {String} parameters.candidate The candidate to make the request for
     * @returns {Promise} which will resolve to the data for the new transfer if successful, empty array if not
     */
    function createTransfer(parameters) {
      var valid = true;
      var requiredParams = ['amount', 'userId', 'candidate'];
      var underscoreParams = {};
      _.forEach(requiredParams, function(p) {
        if (!parameters.hasOwnProperty(p)) {
          valid = false;
        } else {
          underscoreParams[_.snakeCase(p)] = parameters[p]; //to underscore case since that's how the API accepts it
        }
      });
      if (!valid) {
        var dfd = $q.defer();
        dfd.resolve([]);
        return dfd.promise;
      }

      return RestFactory.makeRequest({
        url: transferUrl,
        method: 'POST',
        data: underscoreParams
      });
    }

    return {
      getTransfers: getTransfers,
      createTransfer: createTransfer
    }
  }

})();
