(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
            {
                name: "cookies",
                quantity: "10 packs"
            },
            {
                name: "chips",
                quantity: "5 packs"
            },
            {
                name: "milk",
                quantity: "2 bottles"
            },
            {
                name: "eggs",
                quantity: "2 dozens"
            },
            {
                name: "floor",
                quantity: "1 kg"
            },
        ];

        var alreadyBoughtItems = [];

        service.isToBuyEmpty = toBuyItems.length == 0;
        // service.isAlreadyBoughtEmpty = alreadyBoughtItems.length == 0;

        service.boughtItem = function (index) {
            var item = toBuyItems.splice(index, 1);
            
            // Splice returns an array so indexing the first element
            alreadyBoughtItems.push(item[0]);
            
            // Checking if any of them is empty
            service.isToBuyEmpty = toBuyItems.length == 0;
            // service.isAlreadyBoughtEmpty = alreadyBoughtItems.length == 0;
        }

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getAlreadyBoughtItems = function () {
            return alreadyBoughtItems;
        };

        // service.isToBuyEmpty = function(){
        //     console.log("TO BUY:",toBuyItems.length == 0);
        //     return toBuyItems.length == 0;
        // }

        // service.isAlreadyBoughtEmpty = function(){
        //     console.log("To AlreadyBuy:",alreadyBoughtItems.length==0);
        //     return alreadyBoughtItems.length == 0;
        // }
    }

    // Removed scope service as we want HTML to access data only using the controller object
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var toBuy = this;
        
        toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

        toBuy.isToBuyEmpty = ShoppingListCheckOffService.isToBuyEmpty;

        toBuy.boughtItem = function(itemIndex){
            ShoppingListCheckOffService.boughtItem(itemIndex);
            // Updating the isToBuyEmpty
            toBuy.isToBuyEmpty = ShoppingListCheckOffService.isToBuyEmpty;
        }

        // Now AngularJS watches changes in service
        
        
        // Implementing as a function which is not called so changing value manually
        // toBuy.isToBuyEmpty = function(){
        //     ShoppingListCheckOffService.isToBuyEmpty();
        // }
    }

    // Removed scope service as we want HTML to access data only using the controller object
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var alreadyBought = this;
        
        alreadyBought.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();

        // Moved to service as service only operates the addition and deletion of items
        // alreadyBought.isAlreadyBoughtEmpty = ShoppingListCheckOffService.isAlreadyBoughtEmpty;
        
        // Implementing as a variable does change the value so changing to function. Also function called only once so changing value maually
        // alreadyBought.isAlreadyBoughtEmpty = ShoppingListCheckOffService.isAlreadyBoughtEmpty();
        
        // Here the watcher for ng-if is set on alreadyBoughtItems as only that is changed on clicking bought
    }
})();