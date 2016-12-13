(function() {
  'use strict';

  angular.module('project4')
    .controller('getJamBase', getJamBase)

  function getJamBase() {
    var vm = this;
    $http.get('http://localhost:3000/jambase').then(function(response) {
      vm.jambaseJSON = response
    })
  }
})();
