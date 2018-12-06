app.controller("messagesCtrl", function($scope,$http, user, $location) {
$scope.test=21;
    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }

    messages.getMessages().then(function (messages) {
        $scope.messages = messages;
    }, function(error) {
    })


});
