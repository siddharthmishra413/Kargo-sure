app.controller('loginCtrl',function ($scope,dataService,$location,$rootScope) {

    $scope.add = function (data) {
        dataService.login(data).then(function (response) {
            console.log(response.data.response)
            if (response.data.responseCode === 200) {
                $location.path('/users');
                alert("Successfully logged in")
            }
            else {
                alert("Password or Id didnt match")
                $location.path('/login');
            }
        })
            .catch(function (response) {
                console.log(response);
                $location.path('/login');
                alert("Password or Id did not match")
            })

    }

    $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.actualLocation = $location.path();
    });

    $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
        if($rootScope.actualLocation === newLocation) {
            $location.path('/login');

        }
    });

})



