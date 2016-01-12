(function() {
  'use strict';
  //functions as central data store of the app
  angular
    .module('fullStackCodingChallenge')
    .factory('Store', Store);

  /** @ngInject */
  function Store() {
    var data = {};

    function setProperty(key, val) {
      data[key] = val;
    }

    function unsetProperty(key) {
      data[key] = null;
    }

    function getProperty(key) {
      return data[key];
    }

    return {
      getProperty: getProperty,
      setProperty: setProperty,
      unsetProperty: unsetProperty
    }
  }

})();
