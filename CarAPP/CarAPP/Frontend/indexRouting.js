var Indexrouter = angular.module("indexRouting", ["ngRoute", "CarApp", "EditCar"]);
//Router for the Index.htmlpage
Indexrouter.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "Pages/HomePage.html"

        })
        .when("/addCar", {
            templateUrl: "Pages/addCar.html",
            controller: "AddCar"
        })
        .when("/listCar", {

            templateUrl: "Pages/car.html",
            controller: "CarCtrl"
        }).otherwise({
            redirectTo: "/"
        });
});