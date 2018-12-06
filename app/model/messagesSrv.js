app.factory("messages", function($q, $http, user) {
    var messages = {};
    var wasEverLoaded = {};

    function Message(plainMessage) {
        this.id = plainMessage.id;
        this.date = plainMessage.date;
        this.title = plainMessage.title;
        this.description = plainMessage.description;
        this.imgUrl = plainMessage.imgUrl;
        this.userId = plainMessage.userId;
    }

    function getMessages() {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        // This is a hack since we don't really have a persistant server.
        // So I want to get all messages only once.
        if (wasEverLoaded[userId]) {
            async.resolve(messages[userId]);
        } else {
            messages[userId] = [];
            var getMessagesURL = "http://my-json-server.typicode.com/mikepenn1951/AptMgmnt/messages?userId=" + userId;
            
            $http.get(getMessagesURL).then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var message = new Recipe(response.data[i]);
                    messages[userId].push(message);
                }
                wasEverLoaded[userId] = true;
                async.resolve(messages[userId]);
            }, function(error) {
                async.reject(error);
            });
        }

        return async.promise;
    }


    function createRecipe(name, description, ingredients, steps, imgUrl) {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        var newRecipe = new Recipe({id:-1, name: name, description: description,
            ingredients: ingredients, steps: steps, imgUrl: imgUrl, 
            userId: userId});

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newRecipe).then.....

        recipes[userId].push(newRecipe);
        async.resolve(newRecipe);

        return async.promise;
    }


    return {
        getMessages: getMessages,
        createRecipe: createRecipe
    }

})