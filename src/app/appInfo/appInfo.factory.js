(function() {
  'use strict';
  //functions as central data store of the app
  angular
    .module('fullStackCodingChallenge')
    .factory('AppInfo', AppInfo);

  /** @ngInject */
  function AppInfo(Store) {
    var possibleStates = [
      {
        to: 'candidate',
        displayName: 'Candidate',
        accessible: function() {
          return true;
        }
      },
      {
        to: 'users',
        displayName: 'Users',
        accessible: function() {
          return Store.getProperty('candidate') !== null;
        }
      },
      {
        to: 'transfers',
        displayName: 'Transfers',
        accessible: function() {
          return Store.getProperty('user') !== null;
        }
      }
    ];

    var currentState = 0;

    function setState(stateIndex) {
      currentState = stateIndex;
    }

    return {
      possibleStates: possibleStates,
      currentState: currentState,
      setState: setState
    };
  }

})();
