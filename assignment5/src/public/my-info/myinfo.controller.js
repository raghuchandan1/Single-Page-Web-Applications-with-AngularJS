(function() {
    'use strict';

    angular.module('public')
    .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['UserService', 'ApiPath']; //, 'MenuService'];
    function MyInfoController(UserService, ApiPath) {//, MenuService) {
        var myInfoCtrl = this;

        // console.log(UserService.getUser());
        // console.log("Is Empty", JSON.stringify(UserService.getUser()) === '{}');
        myInfoCtrl.isNewUser = JSON.stringify(UserService.getUser()) === '{}';

        myInfoCtrl.user = UserService.getUser();

        myInfoCtrl.ApiPath = ApiPath;
        // if(myInfoCtrl.isUserRegistered) {
            // MenuService.getMenuItem(signUpCtrl.user.favDish)
            //     .then(function (response) {};
        // }
    }


})();