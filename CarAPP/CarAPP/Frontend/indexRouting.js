var Indexrouter = angular.module("indexRouting", ["ngRoute","CarApp","EditCar"]);
//Router for the Index.htmlpage
Indexrouter.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "HomePage.html"
           
        })
        .when("/addCar", {
            templateUrl: "addCar.html",
           controller: "AddCar"
        })
        .when("/listCar", {

            templateUrl: "car.html",
            controller: "CarCtrl"
        }).otherwise({
            redirectTo:"/"
        });
});