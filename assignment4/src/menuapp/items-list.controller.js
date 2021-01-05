( function() {
    'use strict';
    
    angular.module('MenuApp')
    .controller('ItemsListController', ItemsListController);

    ItemsListController.$inject = ['items']
    function ItemsListController(items){
        var ilist = this;
        ilist.items = items.menu_items;
    }
})();