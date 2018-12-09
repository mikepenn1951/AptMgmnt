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

        if (($scope.selP1 == "none") ||
            (message.priority == $scope.selP1)) {
            return true;
        } else {
            return false;
        }

    }

    $scope.rdVar = "date";

    $scope.deleteMsg = function (message) {
        // window.alert("over icon: " + ind);
        // if ($scope.todoItems[ind].chbValue == false)
        //   window.alert("Warning, Item is not completed: " + $scope.todoItems[ind].todo);
        var ind = $scope.messages.indexOf(message);
        $scope.messages.splice(ind, 1);
    }

    $scope.priority = "important";
    $scope.saveNewMsg = function () {
        var message = new $scope.Message();
        message.id = 11;
        message.date = 2009 / 03 / 23;
        message.title = newmessage1t;
        message.description = newmessage1d;
        message.comments = newcomment1
        message.imgUrl = "";
        message.userId = 3;
        messages.push(message);

        window.alert("saveNewMsg " + messages );
        // if ($scope.todoItems[ind].chbValue == false)
        //   window.alert("Warning, Item is not completed: " + $scope.todoItems[ind].todo);
        // var ind =  $scope.messages.indexOf(message);      
        // $scope.messages.splice(ind, 1);
    }

});
