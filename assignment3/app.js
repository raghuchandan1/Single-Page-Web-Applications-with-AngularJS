(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController(MenuSearchService){
        var narrowItDown = this;

        narrowItDown.searchTerm = "";
        narrowItDown.found = [];
        narrowItDown.showFoundItems = false;
        
        narrowItDown.getMatchedMenuItems = function () {
            MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm).then(
                function(response) {
                    if(narrowItDown.searchTerm === '') {
                        narrowItDown.found = [];
                    }
                    else {
                        narrowItDown.found = response;
                    }
                    narrowItDown.showFoundItems = true;
                }
            );
        };

        narrowItDown.removeItem = function (itemIndex) {
            narrowItDown.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath){
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                    method: 'GET',
                    url: (ApiBasePath + '/menu_items.json')
                }).then( function (response) {
                    var foundItems = [];
                    var items = response.data.menu_items;
                    
                    for (var item of items) {
                        if ((item.description).includes(searchTerm)) {
                            foundItems.push(item);
                        }
                    }
                    
                    return foundItems;
                }
            );
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                searchTerm: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'foundList',
            bindToController: true,
            link: FoundItemsLink
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var foundList = this;

        foundList.isListEmpty = function() {
            if (foundList.searchTerm === '' || foundList.items.length === 0){
                return true;
            }            
            return false;
        };
        
    }

    function FoundItemsLink(scope, element, attrs, controller) {
        scope.$watch('foundList.isListEmpty()', function (newValue, oldValue) {

            if (newValue === true) {
                displayNothingFound();
            }
            else {
                removeNothingFound();
            }
        });

        function displayNothingFound() {
            // Using Angular jqLite
            var warningElem = element.find("div");
            warningElem.css('display', 'block');
        }

        function removeNothingFound() {
            // Using Angular jqLite
            var warningElem = element.find('div');
            warningElem.css('display', 'none');
        }
    }

})();