(function() {
  'use strict';

  angular.module('project4', ['ui.router', 'ngResource', 'ngMap', 'ngMaterial','ngMessages', 'angularUtils.directives.dirPagination'])
  .config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('js/vendor/dirPagination.tpl.html');
  });
})();
