angular.module("app").config(routeProvider);

function routeProvider($routeProvider) {
    $routeProvider
        .when("/",{
            controller: "homeController",
            templateUrl: "../../../home.html"
        })
        .when("/srs_control_registration",{
            controller: "srs_control_registrationController",
            templateUrl: "../../../srs_control_registration.html"
        })
        .otherwise({
            redirectTo: "/"
        });
}