app.controller("messagesCtrl", function ($scope, $http, messages, user, $location) {
    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }

    messages.getMessages().then(function (messages) {
        $scope.messages = messages;
    }, function (error) {
    })

    $scope.isThisUserCM = function () {
        var utype = user.isUserCM();
        return utype;
    }

    $scope.searchText = "";
    $scope.filterMessage = function (message) {
        // Check if the current name includes the value of searchText in the 
        // properties fname or lname

        if (message.title.toLowerCase().includes($scope.searchText.toLowerCase()) ||
            message.description.toLowerCase().includes($scope.searchText.toLowerCase())) {
            return true;
        } else {
            return false;
        }

    }

    $scope.selP1 = "none";
    $scope.filterPriority = function (message) {
        // Check if the current name includes the value of searchText in the 
        // properties fname or lname

        if ( ($scope.selP1 == "none") ||
             (message.priority == $scope.selP1) ) {
            return true;
        } else {
            return false;
        }

    }

    $scope.rdVar = "date";



});
