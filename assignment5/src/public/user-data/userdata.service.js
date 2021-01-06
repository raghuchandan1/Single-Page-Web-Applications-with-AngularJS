( function() {
    'use strict';

    angular.module('public')
    .service('UserDataService', UserDataService);

    function UserDataService() {
        var service = this;

        service.user = {};

        service.saveUser = function(user) {
            service.user = user;
        }

        service.getUser = function() {
            return service.user;
        }
    }
})();