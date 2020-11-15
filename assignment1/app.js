(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchMenu = "";
        $scope.message = "";
        $scope.msgColor = "black";
        $scope.borderColor;

        $scope.checkIfTooMuch = function () {
            if ($scope.lunchMenu == "") {
                $scope.borderColor = "red";
                $scope.msgColor = "red";
                $scope.message = "Please enter data first";
            }

            else {
                $scope.borderColor = "green";
                $scope.msgColor = "green";
                var lunchItems = $scope.lunchMenu.split(',');
                // console.log(lunchItems);
                // console.log(lunchItems.length);
                if (lunchItems.length <= 3) {
                    $scope.message = "Enjoy!"
                }
                else {
                    $scope.message = "Too much!"
                }
                // console.log($scope.message);
            }
        };
    }

})();
