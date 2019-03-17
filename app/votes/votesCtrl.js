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




});
