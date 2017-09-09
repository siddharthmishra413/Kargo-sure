

app.controller('manageUsersCtrl',function ($scope,dataService,$document) {

    var saveData=null;
    $scope.blockManageUser=function () {
        console.log(saveData)
        dataService.blockManageUser(saveData).then(function (response) {
            console.log(response)
        })
            .catch(function (response) {
                console.log(response);
            });
        getData();
    }

    $scope.editManageUser=function (manageUser) {
        $scope.obj=manageUser;
        console.log(user);

    }

    $scope.getData=function () {
        dataService.getCountries()
            .then(function (response) {
                $scope.country=response.data.response;
            })
            .catch(function (err) {
                console.log(err);
            })
    };


    $scope.add=function (data) {
        dataService.editUser(data).then(function (response) {
            console.log(response);
        }).catch(function (response) {
            console.log(response);
        })
    }

    $scope.getStates=function () {
        dataService.getStates($scope.obj.country)
            .then(function (response) {
                $scope.states=response.data.response
            })
            .catch(function (err) {
                console.log(err);
            })
    };

    $scope.saveManageUser=function (manageUser) {
        saveData= manageUser
    }
    $document.ready(function () {
        getData()
    })
    function getData() {
        dataService.getManageUsers().then(function (response) {

            console.log(response.data.response);
            $scope.manageUsers=response.data.response
            for (var i=0;i<response.data.response.length;i++)
            {
                console.log(response.data.response[i].blocked);
                if(response.data.response[i].blocked) {
                    $scope.manageUsers[i].status="Unblock"
                }
                else {
                    $scope.manageUsers[i].status="Block"

                }
            }
            console.log("5555555",$scope.manageUsers)

        }).catch(function (error) {
            console.log(error);
        })
    }

});