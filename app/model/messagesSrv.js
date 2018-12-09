app.factory("messages", function($q, $http, user) {
    var messages = {};
    var wasEverLoaded = false;

    function Message(plainMessage) {
        this.id = plainMessage.id;
        this.date = plainMessage.date;
        this.title = plainMessage.title;
        this.description = plainMessage.description;
        this.priority = plainMessage.priority;
        this.comments = plainMessage.comments;
        this.imgUrl = plainMessage.imgUrl;
        this.userId = plainMessage.userId;
    }

    function getMessages() {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        // This is a hack since we don't really have a persistant server.
        // So I want to get all messages only once.
        if (wasEverLoaded) {
            async.resolve(messages);
        } else {
            messages = [];
            var getMessagesURL = "http://my-json-server.typicode.com/mikepenn1951/AptMgmnt/messages";
            
            $http.get(getMessagesURL).then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var message = new Message(response.data[i]);
                    messages.push(message);
                }
                wasEverLoaded = true;
                async.resolve(messages);
            }, function(error) {
                async.reject(error);
            });
        }

        return async.promise;
    }


    function createMessage(title, description, comments, imgUrl) {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        var newMessage = new Message({id:-1, title: title, description: description,
            comments: comments, imgUrl: imgUrl, 
            userId: userId});

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newRecipe).then.....

        messages.push(newMessage);
        async.resolve(newMessage);

        return async.promise;
    }


    return {
        getMessages: getMessages,
        createMessage: createMessage
    }

})