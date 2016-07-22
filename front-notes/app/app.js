var  myApp = angular.module('myApp', ['ngRoute']);


angular.
    module('myApp').
    component('noteList', {
        templateUrl:"note-list/note-list.template.html",
        controller: 'NotesCtrl',
        bindings: {
            notes: '='
        }
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
	               templateUrl: 'views/user-notes.html',
                    controller: 'EditCtrl'
	            }).
                when( '/new', {
                     templateUrl: "views/user-notes.html",
                     controller: 'NewCtrl'
     	            }).
                when('/notes/:userId', {
                    templateUrl:"views/user-notes.html",
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

 .controller('LogCtrl', function($scope, $http) {
      $scope.Register = function() {
            var data = {
                login: $scope.login,
                password: $scope.password,
                action: 'register'
            }
            return $http.post('http://flamingo-notes.dev/back-notes/user.php', data).then(function(result){
                if (result.data.success=='true') {
                    $scope.PostDataResponse = result.data.message;
                    $scope.errorMessage = false;
                } else {
                    $scope.errorMessage = result.data.message;
                    $scope.PostDataResponse = false;
                }
                return result;
            });
        }

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
                function(response) {
                    if (response['success']) {
                        $scope.userId = response['id'];
                        window.location = 'http://flamingo-notes.dev/front-notes/app/index.html#/notes/'+$scope.userId;
                        $scope.errorMessage = false;
                    }
                    else {
                        $scope.errorMessage = response['message'];

                    }
                });
        }
    })
    .controller('NotesCtrl' , function($scope, $http, $routeParams) {

        console.log('noteCtrl');
        $scope.Notes = '';
        $scope.Message = '';

        $http({
            method : "GET",
            url : "/back-notes/user.php/",
            params: {
                id: $routeParams.userId
            }

        }).then(function mySuccess(response) {
            console.log(response);
            $scope.Notes = response['data']['notes'];
            $scope.Message = response['message'];
         })
    })

    .controller('DeleteCtrl', function($scope, $http, $routeParams) {
        $http({
            method : "POST",
            url : "/back-notes/notes.php/",
            data: {
            	id: $routeParams.noteId,
                action: 'delete'
            }
        }).then(function mySuccess(response) {

            $http({
                method : "GET",
                url : "/back-notes/user.php/",
                params: {
                    id: response.data.userId
                }

            }).then(function mySuccess(response) {

                $scope.Notes = response['data']['notes'];
                $scope.Message = response['message'];

            })
        });
    })
    .controller('EditCtrl', function($scope, $http, $routeParams ) {

        $http({
            method : "GET",
            url : "/back-notes/notes.php/",
            params: {
                id: $routeParams.noteId
            }

        }).then(function mySuccess(response) {
           var Note = response['data']['note'];
            $scope.noteId = Note.id;
            $scope.noteTitle = Note.title;
            $scope.noteText = Note.text;
        }, function myError(response) {
            $scope.Message = response['message'];
        });

        $scope.updateNote  = function () {
           $scope.userId = '';
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
                    if (response['success']) {
                        $scope.Message = response['message'];
                        $scope.userId = response['userId'];

                        function refresh() {
                            $scope.$apply(function(){
                                $scope.Notes =  data.url;
                            });
                        }
                    }
                    else {
                        $scope.Message = response['message'];
                    }
                });
        }
    })
    .controller('NewCtrl', function($scope, $http ) {

    	$scope.noteTitle = '';
    	$scope.noteText = '';

    	
        $scope.updateNote = function () {
            $scope.userId = '';

           var request = $http({
                method: 'POST',
                url: '/back-notes/notes.php',
                data: {
                    action: 'add',
                    title: $scope.noteTitle,
                    text: $scope.noteText
                }
            });
            request.success(
                function(response) {
                        console.log(response);
                    if (response['success']) {
                        $scope.Message = response['message'];
                        $scope.userId = response['userId'];
                        console.log('userId:' + $scope.userId);
                    }
                    else {
                        $scope.Message = response['message'];
                    }
                });
        }
    })

    
    .controller('LogOutCtrl', function($http, $location) {
        $http({
            method : "GET",
            url : "/back-notes/logout.php/"
        }).then(function mySuccess(response) {
            window.location = '#/login';
        });
    })