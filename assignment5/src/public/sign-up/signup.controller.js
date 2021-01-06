(function () {
    "use strict";

    angular.module('public')
    .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['UserService', 'MenuService'];
    function SignUpController(UserService, MenuService) {
        var signUpCtrl = this;

        signUpCtrl.invalidItem = false;
        signUpCtrl.savedInfo = false;
        
        signUpCtrl.submitForm = function() {
            // Resetting the values
            // signUpCtrl.invalidItem = false;
            // signUpCtrl.savedInfo = false;

            // Getting the menu item details from the server
            MenuService.getMenuItem(signUpCtrl.user.favDish)
            .then(function(response) {
                // Saving user information in the service
                signUpCtrl.user.itemDetails = response;
                UserService.saveUser(signUpCtrl.user);
                // console.log(signUpCtrl.user);
                // console.log(UserService.getUser());

                signUpCtrl.invalidItem = false;
                signUpCtrl.savedInfo = true;
                // console.log("Response in Ctrl: ", response);
            })
            .catch(function(error){                
                signUpCtrl.savedInfo = false;
                signUpCtrl.invalidItem = true;
                // console.log("Error in Ctrl: ", error);                
            });
            
        }
    }


})();