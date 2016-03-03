(function() {
  'use strict';

  angular
    .module('dasherApp')
    .constant('_', window._)
    .run(function($rootScope) {
      $rootScope._ = window._;
    });
})();