(function () {
  'use strict';

  angular
    .module('historiaclinicas')
    .controller('HistoriaclinicasListController', HistoriaclinicasListController);

  HistoriaclinicasListController.$inject = ['$scope', '$filter', 'HistoriaclinicasService'];

  function HistoriaclinicasListController($scope, $filter, HistoriaclinicasService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.sortType = 'ficha';
    vm.sortReverse = false;

    vm.gridOptions = {
      data: [],
      sort: {
        predicate: 'fechaCreated',
        direction: 'desc'
     }
    };

    HistoriaclinicasService.query(function(data){
      angular.forEach(data, function(value,key){
        data[key].fechaCreated = moment(value.fechaCreated).startOf('day').toDate();
        data[key].pacienteFullName = data[key].paciente.name + ' ' + data[key].paciente.lastName;
      })
      vm.gridOptions.data = data;
      vm.historiaclinicas = data;
      //vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.itemsPerPage = 10;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.historiaclinicas, {
        $: vm.search
      });
      vm.gridOptions.data = vm.filteredItems;
     // vm.filterLength = vm.filteredItems.length;
      //var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
     // var end = begin + vm.itemsPerPage;
     // vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());
