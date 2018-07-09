var Apicom = angular.module("ApiCom", []);
//Angular service that will get and send data from and to the API model Car.cs in ~/WebApplicatio1/Models/Car.cs

Apicom.service("DataService", function ($http) {

    //DataService function used to get data from the WebAPI
    this.getData = function () {
        var result;
        result = $http.get("http://localhost:56206/api/Car/").then(function (response) {
            return response;
        });
        return result;
    };

    //DataService function used to send data to the WebAPI
    this.sendData = function (req) {
        $http.post("http://localhost:56206/api/Car/", req);
    };

});
