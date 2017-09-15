app.controller('registerAdminCtrl',function ($scope,dataService) {

    $scope.add = function (data) {
        dataService.registerAdmin(data).then(function (response) {
            console.log(response.data.response)
            if (response.data.responseCode === 200) {
                alert("Successfully Registered")
            }
            else {
                alert(response.message)
            }
        })
            .catch(function (response) {
                console.log(response);
                alert("something failed")
            })

    }
})
