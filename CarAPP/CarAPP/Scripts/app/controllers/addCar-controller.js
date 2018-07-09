var editCar = angular.module("EditCar", ["ApiCom"]);

editCar.controller("AddCar", ["$scope", "DataService", function ($scope, DataService) {
    //Created $scope.Brand and $scope.ProductionYear to to store the data inputted by the user
    $scope.Brand = "";
    $scope.ProductionYear = 0;
    $scope.addCar = function () {
        var div = document.getElementById("Check");

        //we check if the entries are valid and if they are add the Car to the list
        if ($scope.Brand === "" || $scope.Brand === null) {
            div.innerHTML = "You selected no brand";

        } else if ($scope.ProductionYear < 1886) {
            div.innerHTML = "Cars didnt exist back in the year " + $scope.ProductionYear;

        } else if ($scope.ProductionYear > 2018) {
            div.innerHTML = "Not a valid year of production";

        } else {

            req = {
                Brand: $scope.Brand,
                ProductionYear: $scope.ProductionYear
            }

            DataService.sendData(req);//Service used to send "req" to the API
            div.innerHTML = "The Car " + $scope.Brand + " produced in " + $scope.ProductionYear + " was succesfully added to the DataBase";

        }
    };
}]);