(function() {
  'use strict';
  angular.module('project4')
    .factory('ConcertResource', ConcertResource);

  ConcertResource.$inject = ['$resource'];

  function ConcertResource($resource) {
    return $resource('http://localhost:3000/api/concerts/:id', {id: '@_id'}, { 'update': { method: 'PATCH'}})
  }
}());
