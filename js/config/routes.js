(function() {
  'use strict';

  angular.module('Project 4')
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
        controller: 'ConcertListController',
        controllerAs: 'concertListVm'
      })
      .state('concertsNew', {
        url: '/concerts/new',
        templateUrl: 'js/concerts/concert-new.html',
        controller: 'ConcertNewController',
        controllerAs: 'concertNewVm'
      })
      .state('concertsShow', {
        url: '/concerts/show/:id',
        templateUrl: 'js/concerts/concert-show.html',
        controller: 'ConcertShowController',
        controllerAs: 'concertShowVm'
      })
      .state('concertsEdit', {
        url: '/concerts/edit/:id',
        templateUrl: 'js/concerts/concert-edit.html',
        controller: 'ConcertEditController',
        controllerAs: 'concertEditVm'
      });
  }
}());
