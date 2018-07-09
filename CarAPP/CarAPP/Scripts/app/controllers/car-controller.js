var CarApp = angular.module("CarApp", ["ApiCom", "Sorting"]);
//Angular Script that will get the data from the API model Car.cs in ~/WebApplicatio1/Models/Car.cs


CarApp.controller("CarCtrl", ["DataService", "SortingService", "SearchService", "$scope", function (DataService, SortingService, SearchService, $scope) {
    //variables used to change beetween sorting in ascendent or descendent order
    var listIsOrderedYear = false;
    var listIsOrderedId = false;
    var listIsOrderedBrand = false;
    $scope.searchTerm = "";


    //The Controller retrieves data from the server 
    DataService.getData().then(function (response) {

        $scope.cars = response.data;//We use $scope.cars to store the data recieved by the WebAPI as it is ordered by Id
        $scope.carsFiltered = response.data;//the array of cars filtered  that we later sort with $scope.OrderBrand(),$scope.OrderId() and $scope.OrderYear() and assign to the $scope.carsView
        $scope.carsView = response.data;//$scope.carsView is where we store the sorted and filtered array that is sent to ther view
    });
    //--------------------------------------------Search Method--------------------------------------------------

    $scope.search = function () {
        if ($scope.searchTerm == "" || $scope.searchTerm == null) {
            $scope.carsView = $scope.cars;
            $scope.carsFiltered = $scope.cars;
        }
        var result = SearchService.search($scope.searchTerm, $scope.cars);
        $scope.carsFiltered = result;
        $scope.carsView = result;
    }
    
    $scope.clear = function () {
        $scope.carsView = $scope.cars;
        $scope.carsFiltered = $scope.cars;
    }

    //-------------------------------------------orderBrand Method------------------------------------------------
    $scope.orderBrand = function () {

        listIsOrderedBrand = !listIsOrderedBrand;

        if (listIsOrderedBrand) {
            $scope.carsView = SortingService.reverseArray(SortingService.mergeSortBrand($scope.carsFiltered));
        } else {
            $scope.carsView = SortingService.mergeSortBrand($scope.carsFiltered);
        }
    };

    //------------------------------------------------------orderId Method-----------------------------------------------------
    $scope.orderID = function () {

        listIsOrderedId = !listIsOrderedId;

        if (listIsOrderedId) {
            $scope.carsView = SortingService.reverseArray($scope.carsFiltered);
        } else {
            $scope.carsView = $scope.carsFiltered;
        }
    };
    //-------------------------------------------------------orderYear Method-------------------------------------------------- 
    $scope.orderYear = function () {

        listIsOrderedYear = !listIsOrderedYear;

        if (listIsOrderedYear) {
            $scope.carsView = SortingService.reverseArray(SortingService.mergeSortYear($scope.carsFiltered));
        } else {
            $scope.carsView = SortingService.mergeSortYear($scope.carsFiltered);
        }
    };
}]);
