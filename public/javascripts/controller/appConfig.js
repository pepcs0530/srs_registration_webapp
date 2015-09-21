angular.module("app").config(routeProvider);

function routeProvider($routeProvider) {
    $routeProvider
        .when("/",{
            controller: "homeController",
            templateUrl: "../../../home.html"
        })
        .when("/ctl_title",{
            controller: "ctl_titleController",
            templateUrl: "../../../ctl_title.html"
        })
        .otherwise({
            redirectTo: "/"
        });
}