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
        this.tel = plainTenant.tel;
    }

    function getTenants() {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        // This is a hack since we don't really have a persistant server.
        // So I want to get all tenants only once.
        if (wasEverLoaded) {
            async.resolve(tenants);
        } else {
            tenants = [];
            var getTenantsURL = "http://my-json-server.typicode.com/mikepenn1951/AptMgmnt/users";

            $http.get(getTenantsURL).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var tenant = new Tenant(response.data[i]);
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


    function createTenant(fname, lname, email, addr, tel) {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        var newTenant = new Tenant({
            id: -1, fname: fname, lname: lname,
            email: email, addr: addr, tel: tel,
            userId: userId
        });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newRecipe).then.....

        // fix date
        tenants.push(newTenant);
        async.resolve(newTenant);

        return async.promise;
    }

    function updateTenant(fname, lname, email, addr, tel,tenant) {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        var newTenant = new Tenant({
            id: -1, fname: fname, lname: lname,
            email: email, addr: addr, tel: tel,
            userId: userId
        });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newRecipe).then.....

        // fix date, id
        newTenant.id = tenant.id;
        newTenant.userId = tenant.userId;
        newTenant.pwd = tenant.pwd;
        newTenant.type = tenant.type;
        var ind = tenants.indexOf(tenant);
        tenants.splice(ind, 1, newTenant);
        async.resolve(newTenant);


        return async.promise;
    }





    return {
        getTenants: getTenants,
        createTenant: createTenant,
        updateTenant: updateTenant,
    }

})