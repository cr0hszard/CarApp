var Sorting = angular.module("Sorting", [])
//In the SortingService we have  functions(methods) needed to sort the array of cars by property
Sorting.service("SearchService", function () {

    //--------------------------Search Method-------------------------------------------
    this.search = function (query, array) {

        var result = [];

        for (var i = 0; i < array.length; i++) {

            if (hasTerm(query, array[i])) {
                result.push(array[i]);
            }

        }
        return result;
    }


    //---------------------------------Search Helper Method--------------------------------------------
    function hasTerm(Term, Car) {

        var carBrand = Car.Brand.toUpperCase();
        var carYear = Car.ProductionYear+"".toUpperCase();
        var carId = Car.Id+"".toUpperCase();
        var Term = Term.toUpperCase();

        if (carBrand.indexOf(Term) !== -1 || carId.indexOf(Term) !== -1 || carYear.indexOf(Term) !== -1) {
            return true;
        } else {
            return false;
        }

    }

});


Sorting.service("SortingService", function () {

    //--------------------------------------MergeSortYear method-------------------------------------------
    this.mergeSortYear = function (array) {
            if (array.length === 1) {
                // return once we hit an array with a single item
                return array;
            }

            const middle = Math.floor(array.length / 2); // get the middle item of the array rounded down
            const left = array.slice(0, middle); // items on the left side
            const right = array.slice(middle); // items on the right side

            return mergeYear(
                this.mergeSortYear(left),
                this.mergeSortYear(right)
            );
    };

     //--------------------------------------MergeSortBrand method-------------------------------------------
    this.mergeSortBrand = function (array) {
        if (array.length === 1) {
            // return once we hit an array with a single item
            return array;
        }

        const middle = Math.floor(array.length / 2); // get the middle item of the array rounded down
        const left = array.slice(0, middle); // items on the left side
        const right = array.slice(middle); // items on the right side

        return mergeBrand(
            this.mergeSortBrand(left),
            this.mergeSortBrand(right)
        );
    };

     //--------------------------------------reverseArray method-------------------------------------------
    this.reverseArray = function (arr) {
        let reverse = [];
        for (i = 0; i < arr.length; i++) {
            reverse[i] = arr[arr.length - i - 1];
        }
        return reverse;
    };

    //----------------------------------------------------------Sort Helper methods---------------------------------------------------

    //mergeBrand merges and sorts all the array created by MergeSortBrand
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

     //mergeYear merges and sorts all the array created by MergeSortYear
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
});