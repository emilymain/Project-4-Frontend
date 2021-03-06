(function() {
  'use strict';
  angular.module('project4')
    .controller('ConcertListController', ConcertListController)
    .controller('ConcertNewController', ConcertNewController)
    .controller('ConcertShowController', ConcertShowController)
    .controller('ConcertEditController', ConcertEditController);

  ConcertListController.$inject = ['ConcertResource', 'NgMap', '$sce', '$filter', '$scope'];
  ConcertNewController.$inject = ['ConcertResource', '$state'];
  ConcertShowController.$inject = ['ConcertResource', '$stateParams'];
  ConcertEditController.$inject = ['ConcertResource', '$state', '$stateParams'];

  function ConcertListController(ConcertResource, NgMap, $sce, $filter, $scope) {
    var vm = this;
    vm.pinClicked = pinClicked;
    vm.concerts = [];
    vm.deleteConcert = deleteConcert;
    vm.concert = {};
    vm.infowindow = infowindow;
    vm.currentPage = 1;
    vm.perPage = 12;
    vm.currentMarkers = currentMarkers;
    $scope.pageChange = pageChange;


    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    ConcertResource.query().$promise.then(function(data) {
      vm.concerts = data;
    });

    function pinClicked(e, concert) {
      vm.concert = concert;
      vm.map.showInfoWindow('event-iw', concert._id);
    };

    function pageChange(newPageNumber, oldPageNumber){
      vm.currentPage = newPageNumber
      console.log(currentMarkers())
    }

    function currentMarkers(){
      return vm.concerts.slice((vm.currentPage -1) * vm.perPage, (vm.currentPage *vm.perPage))

    }

    function infowindow() {
      return $sce.trustAsHtml("<h2>" + vm.concert.band + " at " + vm.concert.venue + "</h2>" + "<p>" + vm.concert.address + "</p>" + "<p>" + (vm.concert.time ? vm.concert.time : $filter('date')(vm.concert.date, 'shortTime')) + "</p>" + "<p>" + $filter('date')(vm.concert.date, 'longDate') + "</p>")
    }

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

  function pinClicked(event, marker) {
    console.log(marker)
  }
}());
