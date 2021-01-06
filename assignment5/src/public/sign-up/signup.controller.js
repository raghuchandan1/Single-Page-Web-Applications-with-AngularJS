(function () {
    "use strict";

    angular.module('public')
    .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['UserDataService'];
    function SignUpController(UserDataService) {
        var signUpCtrl = this;
        
        signUpCtrl.submitForm = function() {
            // console.log(signUpCtrl.user);
            UserDataService.saveUser(signUpCtrl.user);
            // console.log(UserDataService.getUser());
        }
    }


})();