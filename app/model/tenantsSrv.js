app.factory("tenants", function ($q, $http, user) {
    var tenants = {};
    // var comments = [];
    var wasEverLoaded = false;

    function Tenant(plainTenant) {
        this.id = plainTenant.id;
        this.fname = plainTenant.fname;
        this.lname = plainTenant.lname;
        this.email = plainTenant.email;
        this.pwd = plainTenant.pwd;
        this.type = plainTenant.type;  //CM, TE
        this.addr = plainTenant.addr;  
        this.tel = plainTenant.tel;  //CM, TE
    }

    function getTenants() {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        // This is a hack since we don't really have a persistant server.
        // So I want to get all messages only once.
        if (wasEverLoaded) {
    var tenants = {};
            async.resolve(tenants);
        } else {
            tenants = [];
            var getTenantsURL = "http://my-json-server.typicode.com/mikepenn1951/AptMgmnt/users";

            $http.get(getTenantsURL).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var tenants = new Tenant(response.data[i]);
                    tenants.push(tenant);
                }
                wasEverLoaded = true;
                async.resolve(tenants);
            }, function (error) {
                async.reject(error);
            });
        }

        return async.promise;
    }

    // function getDateFormat() {
    //     var d = new Date();
    //     if ((d.getMonth() + 1) < 10) {
    //         var mm = "0" + (d.getMonth() + 1);
    //     }
    //     else {
    //         var mm = (d.getMonth() + 1);
    //     }
    //     if ((d.getDate()) < 10) {
    //         var dd = "0" + (d.getDate());
    //     }
    //     else {
    //         var dd = (d.getDate());
    //     }

    //     var d1 = d.getFullYear() + "/" + mm + "/" + dd;
    //     return d1;

    // }

    function createTenant(title, description, priority, comments, imgUrl) {
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

    function updateTenant(title, description, priority, comments, imgUrl, message) {
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





    return {
        getTenants: getTenants,
        createTenant: createTenant,
        updateTenant: updateTenant,
    }

})