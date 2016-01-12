(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .factory('TransferFactory', TransferFactory);

  /** @ngInject */
  function TransferFactory(RestFactory, apiBaseUrl, _, $q) {
    var transferUrl = apiBaseUrl + 'transfer/';

    function getTransfer(parameters) {
      var candidate = parameters.candidate;
      var url = transferUrl;
      if (parameters.hasOwnProperty('id')) {
        url += '/' + parameters.id;
      }
      return RestFactory.makeRequest({
        url: url,
        method: 'GET',
        params: {
          candidate: candidate
        }
      });
    }

    function createTransfer(parameters) {
      var valid = true;
      var requiredParams = ['amount', 'user_id', 'candidate'];
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
        url: transferUrl,
        method: 'POST',
        data: parameters
      });
    }

    return {
      getTransfer: getTransfer,
      createTransfer: createTransfer
    }
  }

})();
