app.controller("messagesCtrl", function($scope,$http, messages, user, $location) {
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

    $scope.isThisUserCM = function() {
        return user.isUserCM();
    }



});
