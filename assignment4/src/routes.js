( function() {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'src/menuapp/templates/home.template.html'
        })
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/menuapp/templates/main-categories-list.template.html',
            controller: 'CategoriesListController as clist',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService){
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('items', {
            url: '/items/{categoryShortName}',
            templateUrl: 'src/menuapp/templates/main-items-list.template.html',
            controller: 'ItemsListController as ilist',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService){
                return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
            }
        });
    }

})();