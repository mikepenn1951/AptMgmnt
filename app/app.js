var app = angular.module("aptMngmntApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "app/home/home.html"
    }).when("/login", {
        templateUrl: "app/login/login.html",
        controller: "loginCtrl"
    }).when("/signup", {

    }).when("/messages", {
        templateUrl: "app/messages/messages.html",
    }).when("/tenants" , {
        templateUrl: "app/tenants/tenants.html",
    }).when("/votes" , {
        templateUrl: "app/votes/votes.html",
    }).when("/issues" , {
        templateUrl: "app/issues/issues.html",
    }).when("/dashboard" , {
        templateUrl: "app/dashboard/dashboard.html",
    }).when("/recipe/:id" , {

    })
})