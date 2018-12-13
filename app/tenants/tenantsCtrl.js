app.controller("tenantsCtrl", function ($scope, $http, messages, user, $location) {
    $scope.isThisUserCM = function () {
        var utype = user.isUserCM();
        return utype;
    }

});
