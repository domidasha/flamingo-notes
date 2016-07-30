var  myApp = angular.module('myApp', ['ngRoute']);


angular.
    module('myApp').
    component('noteList', {
        templateUrl:"frontend/app/note-list/note-list.template.html",
        controller: 'NotesCtrl',
        bindings: {
            notes: '='
        }
    });

myApp.
    config(function($routeProvider) {
            $routeProvider.
                when('/login', {
                   templateUrl: "frontend/app/views/login.html",
                   controller: 'LogCtrl'
                }).
                when('/register', {
                   templateUrl: "frontend/app/views/register.html",
                   controller: 'LogCtrl'
                }).
                when('/notes/delete/:noteId/', {
	               templateUrl: "frontend/app/views/user-notes.html",
	               controller: 'DeleteCtrl'
	            }).	
                when('/notes/edit/:noteId', {
	               templateUrl: 'frontend/app/views/user-notes.html',
                   controller: 'EditCtrl'
	            }).
                when( '/new', {
                   templateUrl: "frontend/app/views/user-notes.html",
                   controller: 'NewCtrl'
     	            }).
                when('/notes/:userId', {
                   templateUrl:"frontend/app/views/user-notes.html",
                   controller: 'NotesCtrl'
                }).
                when('/logout', {
                	templateUrl: "frontend/app/views/login.html",
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
            return $http.post('user.php', data).then(function(result){
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
                url: 'login.php',
                headers: {
                    'Content-Type': undefined,
                    'Access-Control-Allow-Headers': "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding",
                    'Access-Control-Allow-Methods': "POST, GET, OPTIONS, DELETE, PUT"
                },
                data: {
                    login: $scope.login,
                    password: $scope.password
                }
            }).then(function mySuccess(response) {
                $scope.userId = response.data.id;
                $scope.errorMessage = false;
                window.location = '#/notes/'+$scope.userId;
           });
            //request.success(
            //    function(response) {
            //        if (response['success']) {
            //            $scope.userId = response['id'];
            //            $scope.errorMessage = false;
            //            window.location = '#/notes/'+$scope.userId;
            //        }
            //        else {
            //            $scope.errorMessage = response['message'];
            //        }
            //    });
        }
    })
    .controller('NotesCtrl' , function($scope, $http, $routeParams) {
        //console.log('notes controller');

        $scope.Message = '';

        if ($routeParams.userId!=undefined) {
            $scope.userId =$routeParams.userId;
        }

        $http({
            method : "GET",
            url : "user.php",
            params: {
                id: $scope.userId
               //id: $id
            }
        }).then(function mySuccess(response) {
         //   console.log($scope.Notes);
            var Notes = response['data']['notes'];
            $scope.Message = response['message'];

         //   console.log(Notes);

            //var notes = [];
            //Notes.forEach(function(item, i, Notes){
            //    notes.push(item.text);
            //    notes.push(item.text);
            //    console.log(notes);
            //});

            $scope.Notes = Notes;

         })
    })

    .controller('DeleteCtrl', function($scope, $http, $routeParams) {
        $http({
            method : "POST",
            url : "notes.php",
            data: {
            	id: $routeParams.noteId,
                action: 'delete'
            }
        }).then(function mySuccess(response) {

            $http({
                method : "GET",
                url : "user.php",
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
            url : "notes.php",
            params: {
                id: $routeParams.noteId
            }

        }).then(function mySuccess(response) {
           var Note = response['data']['note'];

            $scope.noteId = Note.id;
            $scope.noteTitle = Note.title;
            $scope.noteText = Note.text;
            $scope.userId = Note.user_id;

        }, function myError(response) {
            $scope.Message = response['message'];
        });

        $scope.updateNote  = function () {
           $scope.userId = '';
           var request =  $http({
                method: 'POST',
                url: 'notes.php',
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
                url: 'notes.php',
                data: {
                    action: 'add',
                    title: $scope.noteTitle,
                    text: $scope.noteText
                }
            });
            request.success(
                function(response) {
                    if (response['success']) {
                        $scope.Message = response['message'];
                        $scope.userId = response['userId'];
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
            url : "logout.php"
        }).then(function mySuccess(response) {
            window.location = '#/login';
        });
    })