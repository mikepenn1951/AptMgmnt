app.factory("votes", function ($q, $http, user) {
    var votes = {};
    // var comments = [];
    var wasEverLoaded = false;

    function Vote(plainVote) {
        this.id = plainVote.id;
        this.endDate = plainVote.endDate;
        this.shortDescr = plainVote.shortDescr;
        this.detailDescr = plainVote.detailDescr;
        this.userId = plainVote.userId;
    }

    function getVotes() {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        // This is a hack since we don't really have a persistant server.
        // So I want to get all votes only once.
        if (wasEverLoaded) {
            async.resolve(votes);
        } else {
            votes = [];
            var getVotesURL = "https://my-json-server.typicode.com/mikepenn1951/AptMgmnt/votes";

            $http.get(getVotesURL).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var vote = new Vote(response.data[i]);
                    votes.push(vote);
                }
                wasEverLoaded = true;
                async.resolve(votes);
            }, function (error) {
                async.reject(error);
            });
        }

        return async.promise;
    }





    return {
        getVotes: getVotes,
    }

})