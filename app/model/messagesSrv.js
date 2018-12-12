app.factory("messages", function ($q, $http, user) {
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

            $http.get(getMessagesURL).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var message = new Message(response.data[i]);
                    messages.push(message);
                }
                wasEverLoaded = true;
                async.resolve(messages);
            }, function (error) {
                async.reject(error);
            });
        }

        return async.promise;
    }

    function getDateFormat() {
        var d = new Date();
        if ((d.getMonth() + 1) < 10) {
            var mm = "0" + (d.getMonth() + 1);
        }
        else {
            var mm = (d.getMonth() + 1);
        }
        if ((d.getDate()) < 10) {
            var dd = "0" + (d.getDate());
        }
        else {
            var dd = (d.getDate());
        }

        var d1 = d.getFullYear() + "/" + mm + "/" + dd;
        return d1;

    }

    function createMessage(title, description, priority, comments, imgUrl) {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        var newMessage = new Message({
            id: -1, title: title, description: description,
            priority: priority, comments: comments, imgUrl: imgUrl,
            userId: userId
        });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newRecipe).then.....

        // fix date
        newMessage.date = getDateFormat();
        messages.push(newMessage);
        async.resolve(newMessage);

        return async.promise;
    }

    function updateMessage(title, description, priority, comments, imgUrl, message) {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        var newMessage = new Message({
            id: -1, title: title, description: description,
            priority: priority, comments: comments, imgUrl: imgUrl,
            userId: userId
        });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newRecipe).then.....

        // fix date, id

        newMessage.date = message.date;
        newMessage.id = message.id;
        newMessage.comments = message.comments;
        newMessage.userId = message.userId;
        var ind = messages.indexOf(message);
        messages.splice(ind, 1, newMessage);
        async.resolve(newMessage);

        return async.promise;
    }

    function addComment( comments, message) {
        var async = $q.defer();

        var userName = user.getActiveUser().fname + " " + user.getActiveUser().lname;
        
        var newMessage = new Message({
            id: message.id, title: message.title, description: message.description,
            priority: message.priority, comments: message.comments, imgUrl: message.imgUrl,
            userId: message.userId, date: message.date
        });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newRecipe).then.....

        // fix date, id
        theDate = getDateFormat();
        newMessage.comments = newMessage.comments + " " + theDate + " " + userName + "'<br>'" + comments;
        var ind = messages.indexOf(message);
        messages.splice(ind, 1, newMessage);
        async.resolve(newMessage);

        return async.promise;
    }




    return {
        getMessages: getMessages,
        createMessage: createMessage,
        updateMessage: updateMessage,
        addComment: addComment
    }

})