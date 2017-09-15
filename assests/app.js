'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute', 'angularUtils.directives.dirPagination'])

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!' +
        '');

    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'loginCtrl'
    })
        .when('/users', {
            templateUrl: 'users/users.html',
            controller: 'usersCtrl'
        })
        .when('/vendors', {
            templateUrl: 'vendors/vendors.html',
            controller: 'vendorsCtrl'
        })
        .when('/manageUsers', {
            templateUrl: 'manageUsers/manageUsers.html',
            controller: 'manageUsersCtrl'
        })
        // .when('/pages', {
        //     templateUrl: 'pages/pages.html',
        //     controller: 'pagesCtrl'
        // })
        // .when('/ads', {
        //     templateUrl: 'ads/ads.html',
        //     controller: 'adsCtrl'
        // })
        .when('/addVendor', {
            templateUrl: 'addVendor/addVendor.html',
            controller: 'addVendorCtrl'
        })
        .when('/registerAdmin', {
            templateUrl: 'registerAdmin/registerAdmin.html',
            controller: 'registerAdminCtrl'
        })
        .when('/addUser', {
            templateUrl: 'addUser/addUser.html',
            controller: 'addUserCtrl'
        }).otherwise({redirectTo: '/login'});
}])