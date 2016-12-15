(function() {
  'use strict';
  angular.module('project4')
    .factory('ConcertResource', ConcertResource);

  ConcertResource.$inject = ['$resource'];

  function ConcertResource($resource) {
    return $resource('https://vast-reaches-90212.herokuapp.com/api/concerts/:id', {id: '@_id'}, { 'update': { method: 'PATCH'}})
  }
}());
