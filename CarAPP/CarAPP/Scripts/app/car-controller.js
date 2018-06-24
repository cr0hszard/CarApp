var app = angular.module("CarApp", []);
//Angular Script that will get the data from the API model Car.cs in ~/WebApplicatio1/Models/Car.cs

app.service("dataService", function ($http) {
    //URL of the CarControler
    var result;
    this.retrieveData = function () {

        result = $http.get("http://localhost:56206/api/Car/").then(function (response) {
            return response;
        });
        console.log(result);
        return result;
    };
});

    app.controller("CarCtrl", ["dataService", "$scope", "$http", function (dataService, $scope, $http) {
    //variables used to change beetween sorting in ascendent or descendent order
    var listIsOrderedYear = false;
    var listIsOrderedId = false;
    var listIsOrderedBrand = false;


    dataService.retrieveData().then(function (response) {
        $scope.cars = response.data;
        $scope.carsView = response.data;
    });
    console.log($scope.cars);
    console.log($scope.carsView+"View");


 

    //-------------------------------------------orderBrand Method------------------------------------------------


    $scope.orderBrand = function () {

        listIsOrderedBrand = !listIsOrderedBrand;

        if (listIsOrderedBrand) {
            $scope.carsView = reverseArray(mergeSortBrand($scope.cars));
        } else {
            $scope.carsView = mergeSortBrand($scope.cars);
        }
    };

    //------------------------------------------------------orderId Method-----------------------------------------------------
    $scope.orderID = function () {

        listIsOrderedId = !listIsOrderedId;

        if (listIsOrderedId) {
            $scope.carsView = reverseArray($scope.cars);
        } else {
            $scope.carsView = $scope.cars;
        }
    };
    //-------------------------------------------------------orderYear Method-------------------------------------------------- 
    $scope.orderYear = function () {

        listIsOrderedYear = !listIsOrderedYear;

        if (listIsOrderedYear) {
            $scope.carsView = reverseArray(mergeSortYear($scope.cars));
        } else {
            $scope.carsView = mergeSortYear($scope.cars);
        }
    };

    //-------------------------------------------------------reverseArray Method-------------------------------------------------- 
    function reverseArray(arr) {
        let reverse = [];
        for (i = 0; i < arr.length; i++) {
            reverse[i] = arr[arr.length - i - 1];
        }
        return reverse;
    }

    //----------------------------------------------------------mergeSortYear Method------------------------------------------------------------
    function mergeSortYear(arr) {

        if (arr.length === 1) {
            // return once we hit an array with a single item
            return arr;
        }

        const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
        const left = arr.slice(0, middle); // items on the left side
        const right = arr.slice(middle); // items on the right side

        return mergeYear(
            mergeSortYear(left),
            mergeSortYear(right)
        );
    }

    // compare the arrays item by item and return the concatenated result
    function mergeYear(left, right) {
        let result = [];
        let indexLeft = 0;
        let indexRight = 0;

        while (indexLeft < left.length && indexRight < right.length) {

            if (left[indexLeft].ProductionYear < right[indexRight].ProductionYear) {
                result.push(left[indexLeft]);
                indexLeft++;
            } else {
                result.push(right[indexRight]);
                indexRight++;
            }
        }
        return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
    }

    //--------------------------------------------------------------mergeSortBrand Method-------------------------------------------
    //We use this Method to sort the data by brand and return it as an ordered array
    function mergeSortBrand(arr) {

        if (arr.length === 1) {
            // return once we hit an array with a single item
            return arr;
        }

        const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
        const left = arr.slice(0, middle); // items on the left side
        const right = arr.slice(middle); // items on the right side

        return mergeBrand(
            mergeSortBrand(left),
            mergeSortBrand(right)
        );
    }

    // compare the arrays item by item and return the concatenated result
    function mergeBrand(left, right) {
        let result = [];
        let indexLeft = 0;
        let indexRight = 0;

        while (indexLeft < left.length && indexRight < right.length) {

            if (left[indexLeft].Brand.toUpperCase() < right[indexRight].Brand.toUpperCase()) {
                result.push(left[indexLeft]);
                indexLeft++;
            } else {
                result.push(right[indexRight]);
                indexRight++;
            }
        }

        return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
    }

}]);