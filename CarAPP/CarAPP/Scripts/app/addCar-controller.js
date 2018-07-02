var editCar = angular.module("EditCar", []);

editCar.controller("AddCar", ["$scope", "$http", function ($scope, $http) {
    //Created $scope.Brand and $scope.ProductionYear to to store the data inputted by the user
    $scope.Brand = "";
    $scope.ProductionYear = 0;
    $scope.addCar = function () {
    var div = document.getElementById("Check");

        //we check if the entries are valid and if they are add the Car to the list
        if ($scope.ProductionYear > 2018) {
            div.innerHTML = "Not a valid year of production";
         
        } else if ($scope.ProductionYear < 1886) {
            div.innerHTML = "Cars didnt exist back then";
         
        } else if ($scope.Brand === "" || $scope.Brand === null) {
            div.innerHTML = "You selected no brand";
          
        } else {
           
            req = {
                  Brand: $scope.Brand,
                  ProductionYear: $scope.ProductionYear
                  }
          //  console.log(req.Brand); //debugging
          //  console.log(req.ProductionYear); //debugging
            $http.post("http://localhost:56206/api/Car/", req);
            div.innerHTML = "The Car " + $scope.Brand + " produced in " + $scope.ProductionYear + " was succesfully added to the DataBase";
        
            }
         };
}]);