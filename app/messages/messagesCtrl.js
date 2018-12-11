app.controller("messagesCtrl", function ($scope, $http, messages, user, $location) {
    
    var msgToDel = "";

    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    
    $scope.openDeleteMessageModal = function(message){
        $("#delModal").modal();
        // $(".x").text( message.title );
        msgToDel = message;
    }
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
    // var delTheMessage = false;
    $scope.deleteMsg = function () {
        // if (delTheMessage){
            var ind = $scope.messages.indexOf(msgToDel);
            $scope.messages.splice(ind, 1);
        //     delTheMessage = false;
        // }
    }
    // $scope.delMsg = function () {
    //     delTheMessage = true;
    // }


    var updateOrSave = "save";
    $scope.priority = "Important";
    var msgToUpdate;
    $scope.saveNewMsg = function () {
        if (updateOrSave == "save"){
            messages.createMessage($scope.title, $scope.description, $scope.priority,
                $scope.comments, $scope.imgUrl).then(function () {
                $location.path("/messages")
            }, function (err) {
                console.log(err);
            })
    
        }else{
            messages.updateMessage($scope.title, $scope.description, $scope.priority,
                $scope.comments, $scope.imgUrl, msgToUpdate).then(function () {
                $location.path("/messages")
            }, function (err) {
                console.log(err);
            })
        }
        updateOrSave = "save";
        $scope.title = "";
        $scope.description = "";
        $scope.comments = "";
        $scope.imgUrl = "";
        
    }

    $scope.updateMsg = function (message) {
        $scope.title = message.title;
        $scope.description = message.description;
        $scope.priority = message.priority;
        $scope.comments = message.comments;
        $scope.imgUrl = message.imgUrl;
        msgToUpdate = message;
        updateOrSave = "update";
        $("#newMsgModal").modal();
    }




});
