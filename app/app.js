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
        controller: "recipeGalleryCtrl"
    }).when("/tenants" , {
        templateUrl: "app/tenants/tenants.html",
        controller: "newRecipeCtrl"
    }).when("/votes" , {
        templateUrl: "app/votes/votes.html",
        controller: "newRecipeCtrl"
    }).when("/issues" , {
        templateUrl: "app/issues/issues.html",
        controller: "newRecipeCtrl"
    }).when("/dashboard" , {
        templateUrl: "app/dashboard/dashboard.html",
        controller: "newRecipeCtrl"
    }).when("/recipe/:id" , {

    })
})