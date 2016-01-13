(function () {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
        creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($state, _) {
      var vm = this;
      vm.states = _.chain($state.get())
        .filter(function (s) {
          return (s.hasOwnProperty('data') && s.data.hasOwnProperty('root') && !s.data.root);
        })
        .map(function(s) {
          return {
            displayName: s.data.displayName,
            ref: s.name
          }
        })
        .value();
    }
  }

})();
