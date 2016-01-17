(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .factory('RestFactory', RestFactory);

  /** @ngInject */
	/**
   * The factory which provides an interface to the CRUD methods via the REST API
   * @param $http
   * @param $log
   * @returns {{makeRequest: makeRequest}}
   * @constructor
	 */
  function RestFactory($http, $log, toastr) {
    //set up correct content type
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

		/**
     * Make an http request
     * @param {{}} parameters The url parameters
     * @param {String} parameters.method GET or POST
     * @param {String} parameters.url The url to call
     * @param {{}=} parameters.params Additional options for a GET method
     * @param {{}=} parameters.data Additional data for a POST method
     * @returns {Promise} A promise which will resolve to an array of data if successful, or resolve to an empty array log an error
     */
    function makeRequest(parameters) {
      var requestObject = {
        method: parameters.method || 'GET',
        url: parameters.url
      };

      if ((requestObject.method === 'GET') && (parameters.hasOwnProperty('params'))) {
        requestObject.params = parameters.params;
      } else {
        requestObject.data = angular.toJson(parameters.data);
      }
      return $http(requestObject).then(_successHandler, _failureHandler);
    }

    /**
     * AJAX success handler
     * @param {Object} urlResponse The response from the Url
     * @returns {{success: boolean, data: *}}
     * @private
     */
    function _successHandler(urlResponse) {
      return {
        success: true,
        data: urlResponse.data
      };
    }

    /**
     * AJAX error handler
     * @param {Object} data The error data
     * @returns {{success: boolean, data: *}}
     * @private
     */
    function _failureHandler(data) {
      $log.error(data);
      toastr.error('Could not reach the server!');
      return {
        success: false,
        data: []
      };
    }

    return {
      makeRequest: makeRequest
    };
  }

})();
