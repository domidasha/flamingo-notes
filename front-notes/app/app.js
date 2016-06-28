var  myApp = angular.module('myApp', ['ngRoute', 'ngDialog']);

myApp.
    config(function($routeProvider) {

            $routeProvider.
                when('/login', {
                    templateUrl: "views/login.html",
                    controller: 'LogCtrl'
                }). 
                when('#/notes/delete/:noteId/', {
	                templateUrl: "views/user-notes.html",
	                controller: 'DeleteCtrl'
	            }).	
                when('#/notes/edit/:noteId/', {
	                templateUrl: "views/user-notes.html",
	                controller: 'EditCtrl'
	            }).
                when('/notes/:userId', {
                    templateUrl: "views/user-notes.html",
                    controller: 'NotesCtrl'
                }).	                           
                when('/logout', {
                	templateUrl: "views/login.html",
                    controller: 'LogOutCtrl'
                }).
                otherwise({
                    redirectTo: '/login'
                });
        })
    .controller('LogCtrl', function($scope, $http, $location) {

        $scope.SendData = function() {

            var request =  $http({
                method: 'POST',
                url: '/back-notes/index.php/',
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
                        $scope.userId = response['id'];
                        window.location = '#/notes/'+$scope.userId;

                    }
                    else {
                        $scope.PostDataResponse = response['message'];

                    }
                });
        }
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
    .controller('DeleteEditCtrl', function($scope, $http, $routeParams) {
        $http({
            method : "POST",
            url : "/back-notes/notes.php/",
            data: {
                noteId: $routeParams.noteId,
                action: $routeParams.action
            }

        }).then(function mySucces(response) {
            $scope.Notes = response['data']['notes'];

        }, function myError(response) {
            $scope.Notes = response.statusText;
        });
    })
    
    .controller('LogOutCtrl', function($location) {
    	window.location = '#/login';
    })


