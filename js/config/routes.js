(function() {
  'use strict';

  angular.module('project4')
    .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function MainRouter($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'js/templates/home.html'
      })
      .state('concertsList', {
        url: '/concerts/list',
        templateUrl: 'js/concerts/concert-list.html',
        // controller: 'getJamBase',
        // controllerAs: 'jb'
      })
  }
})();
