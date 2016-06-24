var  myApp = angular.module('myApp', ['ngRoute']);



myApp.
    config(function($routeProvider) {

            $routeProvider.
                when('/login', {
                    templateUrl: "views/login.html",
                    controller: 'LogCtrl'
                }).
                when('/notes/:userId', {
                    templateUrl: "views/user-notes.html",
                    controller: 'NotesCtrl'
                }).
                otherwise({
                    redirectTo: '/login'
                });
        })
    .controller('NotesCtrl', function($scope, $http, $routeParams) {
        $http({
            method : "GET",
            url : "/back-notes/notes.php/",
            params: {
                id: $routeParams.userId
            }

        }).then(function mySucces(response) {
            $scope.Notes = response['data']['notes'];

        }, function myError(response) {
            $scope.Notes = response.statusText;
        });
    })
    .controller('LogCtrl', function($scope, $http) {

        $scope.SendData = function() {

            var request =  $http({
                method: 'POST',
                url: '/back-notes/user.php/',
                headers: {
                    'Content-Type': undefined,
                    'Access-Control-Allow-Headers': "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding",
                    'Access-Control-Allow-Methods': "POST, GET, OPTIONS, DELETE, PUT"
                },
                data: {
                    login: $scope.login,
                    password: $scope.password
                }
            });
            request.success(
                function( response) {
                    if (response['success']=='success') {
                        $scope.PostDataResponse = response['id'];
                       // $window.location.href= "#/notes/"+response['id'];
                        $scope.userId = response['id'];

                    }
                    else {
                        $scope.PostDataResponse = response['message'];

                    }
                });
        }
    });


