app.controller("tenantsCtrl", function ($scope, $http, tenants, user, $location) {
    $scope.isThisUserCM = function () {
        var utype = user.isUserCM();
        return utype;
    }

    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.searchTenText = "";
    $scope.filterTenant = function (tenant) {
        // Check if the current name includes the value of searchTenText in the 
        // properties fname or lname

        if (tenant.fname.toLowerCase().includes($scope.searchTenText.toLowerCase()) ||
        tenant.lname.toLowerCase().includes($scope.searchTenText.toLowerCase()) ||
        tenant.email.toLowerCase().includes($scope.searchTenText.toLowerCase()) ||
        tenant.addr.toLowerCase().includes($scope.searchTenText.toLowerCase()) ||
        tenant.tel.toLowerCase().includes($scope.searchTenText.toLowerCase()) ) {
            return true;
        } else {
            return false;
        }

    }


    // $scope.test = 55;

    $scope.openDeleteTenModal = function(tenant){
        $("#delModal").modal();
        // $(".x").text( message.title );
        tenToDel = tenant;
    }

    $scope.deleteTen = function () {
            var ind = $scope.tenants.indexOf(tenToDel);
            $scope.tenants.splice(ind, 1);
    }


    tenants.getTenants().then(function (tenant) {
        $scope.tenants = tenant;
    }, function (error) {
    })

    var updateOrSave = "save";
    var tenToUpdate;
    $scope.saveNewTen = function () {
        if (updateOrSave == "save"){
            tenants.createTenant($scope.fname, $scope.lname, $scope.email,
                $scope.addr, $scope.tel).then(function () {

            // EmailJS
            var template_params = {
                to_email: user.getActiveUser().email,
                from_name: "Apt Mngmnt",
                to_name: user.getActiveUser().fname + " " + user.getActiveUser().lname,
                message_html: "Welcome, you have been registered as a new tenant "
            }

            var service_id = "gmail";
            var template_id = "template_Hsg1oCvb";
            emailjs.send(service_id, template_id, template_params);

                $location.path("/tenants")
            }, function (err) {
                console.log(err);
            })
            
        }else{
            tenants.updateTenant($scope.fname, $scope.lname, $scope.email,
                $scope.addr, $scope.tel, tenToUpdate).then(function () {
                $location.path("/tenants")
            }, function (err) {
                console.log(err);
            })
        }
        updateOrSave = "save";
        $scope.fname = "";
        $scope.lname = "";
        $scope.email = "";
        $scope.addr = "";
        $scope.tel = "";
        
    }

    $scope.updateTen = function (tenant) {
        $scope.fname = tenant.fname;
        $scope.lname = tenant.lname;
        $scope.email = tenant.email;
        $scope.addr = tenant.addr;
        $scope.tel = tenant.tel;
        tenToUpdate = tenant;
        updateOrSave = "update";
        $("#newTenModal").modal();
    }


});
