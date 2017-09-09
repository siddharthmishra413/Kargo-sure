'use strict';

angular.module('myApp').service('dataService', function ($q, $http) {


    var baseUrl='http://localhost:3001/';
    var self = this;



    self.getUsers=function () {
        return httpCall('GET',baseUrl+"getUsers");
    };

    self.blockUser=function (data) {
        console.log("999999999",data)
        return httpCall('POST',baseUrl+"blockUser",data)
    };
    self.getCountries=function () {
        return httpCall('GET',baseUrl+"getCountries");
    };

    self.getStates=function (country) {
        return httpCall('GET',baseUrl+"getStates?country="+country);
    };

    self.editUser=function (data) {
        return httpCall('PUT',baseUrl+"editUser",data)
    }

    self.getVendors=function () {
            return httpCall('GET',baseUrl+"getVendors");
        };

        self.blockVendor=function (data) {
            console.log("999999999",data)
            return httpCall('POST',baseUrl+"blockVendor",data)
        };


        self.editVendor=function (data) {
            return httpCall('PUT',baseUrl+"editVendor",data)
        }

        self.getManageUsers=function () {
                return httpCall('GET',baseUrl+"getUsers");
            };

            self.blockManageUser=function (data) {
                console.log("999999999",data)
                return httpCall('POST',baseUrl+"blockUser",data)
            };


            self.editManageUser=function (data) {
                return httpCall('PUT',baseUrl+"editUser",data)
            }

        self.addVendor=function (data) {
                return httpCall('POST',baseUrl+"addVendor",data);
            }

    self.addUser=function (data) {
        return httpCall('POST',baseUrl+"addUser",data);
    }
    self.login=function (data) {
                return httpCall('POST',baseUrl+"login",data);
                }

    function httpCall(method, url, data) {
        return $q(function (resolve, reject) {
            $http({
                method: method,
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function successCallback(response) {
                console.log(response);
                resolve(response)
            }, function errorCallback(response) {
                console.log(response)
                reject(response)
            });

        })
    }


});