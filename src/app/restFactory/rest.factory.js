(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .factory('RestFactory', RestFactory);

  /** @ngInject */
  /**
   * The factory which provides all CRUD methods via the REST API
   * @param {String} apiBaseUrl The constant URL
   * @param apiBaseUrl
   * @param _
   * @returns {{url: *}}
   * @constructor
   */
  function RestFactory($http, $log) {

    function makeRequest(parameters) {
      var requestObject = {
        method: parameters.method || 'GET',
        url: parameters.url
      };

      if ((requestObject.method === 'GET') && (parameters.hasOwnProperty('params'))) {
        requestObject.params = parameters.params;
      } else {
        requestObject.data = parameters.data;
      }
      return $http(requestObject).then(_successHandler, _failureHandler);
    }

    /**
     * AJAX success handler
     * @param {Object} urlResponse The response from the Url
     * @returns {Array}
     * @private
     */
    function _successHandler(urlResponse) {
      return urlResponse.data;
    }

    /**
     * AJAX error handler
     * @param {Object} data The error data
     * @returns {Array}
     * @private
     */
    function _failureHandler(data) {
      $log.error(data);
      return [];
    }

    return {
      makeRequest: makeRequest
    };
  }

})();
