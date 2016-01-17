(function() {
  'use strict';

  angular
    .module('fullStackCodingChallenge')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

  angular.module("uib/template/typeahead/typeahead-popup.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("uib/template/typeahead/typeahead-popup.html",
      "<ul class=\"dropdown-menu\" ng-show=\"isOpen() && !moveInProgress\" ng-style=\"{top: position().top+'px', left: position().left+'px'}\" style=\"display: block;\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n" +
      "    <li ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index, $event)\" role=\"option\" id=\"{{::match.id}}\">\n" +
      "        <div uib-typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
      "    </li>\n" +
      //"<hr></hr>" +
      //"<li ng-click=\"selectMatch(-100, $event)\" role=\"option\"><div uib-typeahead-match index=\"-100\" match=\"{label: 'Total', value: -100}\" template-url=\"templateUrl\"></div></li>\n" +
      //"<li ng-click=\"selectMatch(-200, $event)\" role=\"option\"><div uib-typeahead-match index=\"-200\" match=\"{label: 'Cant find your result ? Add a new candidate!'}\" template-url=\"templateUrl\"></div></li>\n" +
      "</ul>\n" +
      "");
  }]);

})();
