var  myApp = angular.module('myApp', ['ngRoute']);


angular.
    module('myApp').
    component('noteList', {
        templateUrl:"note-list/note-list.template.html",
        controller: 'NotesCtrl'
    });

myApp.
    config(function($routeProvider) {

            $routeProvider.
                when('/login', {
                    templateUrl: "views/login.html",
                    controller: 'LogCtrl'
                }). 
                when('/notes/delete/:noteId/', {
	                templateUrl: "views/user-notes.html",
	                controller: 'DeleteCtrl'
	            }).	
                when('/notes/edit/:noteId', {
	               templateUrl: "views/user-notes.html",
                    controller: 'EditCtrl'

	            }).
                when('/notes/:userId', {
                    template: "<p>welcome. please refresh this page!</p>",
                    controller: 'NotesCtrl'
                }).
                when('/notes/new', {
                    template: "<p>welcome. please refresh this page!</p>",
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

                        $route.reload();

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
            url : "/back-notes/user.php/",
            params: {
                id: $routeParams.userId
            }

        }).then(function mySucces(response) {
            $scope.Notes = response['data']['notes'];

        }, function myError(response) {
            $scope.Notes = response.statusText;
        });
    })
    .controller('DeleteCtrl', function($scope, $http, $routeParams) {
        $http({
            method : "POST",
            url : "/back-notes/notes.php/",
            params: {
                id: $routeParams.noteId
            },
            data: {
                action: 'delete'
            }
        }).then(function mySucces(response) {
            console.log(response['success']);
        }, function myError(response) {
            console.log(response['message']);
        });
    })
    .controller('EditCtrl', function($scope, $http, $routeParams ) {

        $http({
            method : "GET",
            url : "/back-notes/notes.php/",
            params: {
                id: $routeParams.noteId
            }

        }).then(function mySucces(response) {
           var Note = response['data']['note'];
            $scope.noteId = Note.id;
            $scope.noteTitle = Note.title;
            $scope.noteText = Note.text;
        }, function myError(response) {
            $scope.Message = response['message'];
        });

        $scope.updateNote  = function () {
           var request =  $http({

                method: 'POST',
                url: '/back-notes/notes.php',
                headers: {
                    'Content-Type': undefined,
                    'Access-Control-Allow-Headers': "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding",
                    'Access-Control-Allow-Methods': "POST, GET, OPTIONS, DELETE, PUT"
                },
                data: {
                    action: 'update',
                    id: $scope.noteId,
                    title:$scope.noteTitle,
                    text: $scope.noteText
                }
            });
            request.success(
                function( response) {
                    if (response['success']=='success') {
                        $scope.Message = response['message'];
                        $scope.$apply();
                    }
                    else {
                        $scope.Message = response['message'];
                    }
                });
        }
    })

    
    .controller('LogOutCtrl', function($location) {
    	window.location = '#/login';
    })


