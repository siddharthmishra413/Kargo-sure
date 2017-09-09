

app.controller('vendorsCtrl',function ($scope,dataService,$document) {

    var saveData=null;
    $scope.blockVendor=function () {
        console.log(saveData)
        dataService.blockVendor(saveData).then(function (response) {
            console.log(response)
        })
            .catch(function (response) {
                console.log(response);
            });
        getData();
    }

    $scope.editVendor=function (vendor) {
        $scope.obj=vendor;
        console.log(vendor);

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
        dataService.editVendor(data).then(function (response) {
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

    $scope.saveVendor=function (vendor) {
        saveData=vendor
    }
    $document.ready(function () {
        getData()
    })
    function getData() {
        dataService.getVendors().then(function (response) {

            console.log(response.data.response);
            $scope.vendors=response.data.response
            for (var i=0;i<response.data.response.length;i++)
            {
                console.log(response.data.response[i].blocked);
                if(response.data.response[i].blocked) {
                    $scope.vendors[i].status="Unblock"
                }

                else {
                    $scope.vendors[i].status="Block"

                }
            }
            console.log("5555555",$scope.vendors)

        }).catch(function (error) {
            console.log(error);
        })
    }

});