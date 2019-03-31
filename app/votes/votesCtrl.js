app.controller("votesCtrl", function ($scope, $http, votes, user, $location) {
    $scope.voteR = 0;
    $scope.voteC = 0;
    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }

    votes.getVotes().then(function (votes) {
        $scope.votes = votes;
    }, function (error) {
    })

    $scope.isThisUserCM = function () {
        var utype = user.isUserCM();
        return utype;
    }

    // var updateOrSave = "save";
    // $scope.priority = "Important";
    // var msgToUpdate;
    $scope.saveNewVote = function () {
        // if (updateOrSave == "save")
        // {
            votes.createVote($scope.vtitle, $scope.vdescription, $scope.endDate
                ).then(function () {
                $location.path("/votes")
            }, function (err) {
                console.log(err);
            })
    
        // }else{
        //     messages.updateMessage($scope.title, $scope.description, $scope.priority,
        //         $scope.comments, $scope.imgUrl, msgToUpdate).then(function () {
        //         $location.path("/messages")
        //     }, function (err) {
        //         console.log(err);
        //     })
        // }
        // updateOrSave = "save";
        // $scope.title = "";
        // $scope.description = "";
        // $scope.comments = "";
        // $scope.imgUrl = "";
        
    }



});
