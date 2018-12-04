
app.controller("loginCtrl", function($scope, $location, user) {
    $scope.test = 13;
    $scope.email = "nir@nir.com";
    $scope.pwd = "123";

    $scope.invalidLogin = false;

    $scope.login = function() {
        $scope.invalidLogin = false;

        user.login($scope.email, $scope.pwd).then(function() {
            // success login
            $location.path("/")
        }, function(error) {
            // failed login
            $scope.invalidLogin = true;
        })
    }
});