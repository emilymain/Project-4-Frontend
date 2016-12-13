(function() {
  'use strict';
  angular.module('wsmd38')
    .controller('ConcertListController', ConcertListController)
    .controller('ConcertNewController', ConcertNewController)
    .controller('ConcertShowController', ConcertShowController)
    .controller('ConcertEditController', ConcertEditController);

  ConcertListController.$inject = ['ConcertResource'];
  ConcertNewController.$inject = ['ConcertResource', '$state'];
  ConcertShowController.$inject = ['ConcertResource', '$stateParams'];
  ConcertEditController.$inject = ['ConcertResource', '$state', '$stateParams'];

  function ConcertListController(ConcertResource) {
    var vm = this;
    vm.concerts = [];
    vm.deleteConcert = deleteConcert;

    ConcertResource.query().$promise.then(function(data) {
      vm.concerts = data;
    });

    function deleteConcert(concertToDelete) {
      ConcertResource.delete({id:concertToDelete._id}).$promise.then(function(response) {
        if(response.message) {
          console.log(response.message);
          vm.concerts = vm.concerts.filter(function(concert) {
            return concert != concertToDelete;
          });
        }
      });
    }
  }

  function ConcertNewController(ConcertResource, $state) {
    var vm = this;
    vm.newConcert = {};
    vm.addConcert = addConcert;

    function addConcert() {
      ConcertResource.save(vm.newConcert).$promise.then(function(jsonConcert) {
        vm.newConcert = {};
        $state.go('concertsList')
      });
    }
  }

  function ConcertShowController(ConcertResource, $stateParams) {
    var vm = this;
    vm.concert = {};

    ConcertResource.get({id: $stateParams.id}).$promise.then(function(jsonConcert) {
      vm.concert = jsonConcert;
    });
  }

  function ConcertEditController(ConcertResource, $state, $stateParams) {
    var vm = this;
    vm.concert = {};
    vm.updateConcert = updateConcert;

    ConcertResource.get({id: $stateParams.id}).$promise.then(function(jsonConcert) {
      vm.concert = jsonConcert;
    });

    function updateConcert() {
      ConcertResource.update(vm.concert).$promise.then(function(editedConcert) {
        vm.concert = editedConcert;
        $state.go('concertsList');
      });
    }
  }
}());
