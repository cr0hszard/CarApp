var app = angular.module("getCar", []);
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
