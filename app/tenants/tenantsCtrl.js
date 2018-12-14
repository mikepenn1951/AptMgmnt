app.controller("tenantsCtrl", function ($scope, $http, tenants, user, $location) {
    $scope.isThisUserCM = function () {
        var utype = user.isUserCM();
        return utype;
    }

    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }
    $scope.test = 55;
    tenants.getTenants().then(function (tenant) {
        $scope.tenants = tenant;
    }, function (error) {
    })


});
