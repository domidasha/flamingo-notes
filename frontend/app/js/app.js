var  myApp = angular.module('myApp', ['ngRoute']);



angular.
    module('myApp').
    component('noteList', {
        templateUrl:"frontend/app/note-list/note-list.template.html",

        bindings: {
            notes: '='
        },
        controller: function()
        {
            var notes = [];
            notifyListener.subscribe(this);

            notify(notes);
            selfnotes = notes;

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
                    templateUrl: "frontend/app/views/user-notes.html",
                    controller: 'LogOutCtrl'
                }).
                otherwise({
                    redirectTo: '/logout'
                });
    })

 .controller('LogCtrl', function($scope, $http) {
        $scope.Register = function () {
            var data = {
                login: $scope.login,
                password: $scope.password,
                action: 'register'
            }
            return $http.post('user.php', data).then(function (result) {
                if (result.data.success == 'true') {
                    $scope.PostDataResponse = result.data.message;
                    $scope.errorMessage = false;
                } else {
                    $scope.errorMessage = result.data.message;
                    $scope.PostDataResponse = false;
                }
                return result;
            });
        }

        $scope.SendData = function () {

            var request = $http({
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
                window.location = '#/notes/' + $scope.userId;
            })
        }

    })
    .controller('NotesCtrl' , function($scope, $http, UpdateNotesContainer) {

        var notes = [];
        updateListener.subscribe(this);



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
        },

        function myError(response) {
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
            window.location = 'http://flamingo-notes.dev/login.php';
        });
    })

//myApp.factory('MyService', function () {
//    return {
//        sayHello: function () {
//            console.log('hello');
//        }
//}
//});

//myApp.factory('UpdateNotes', function() {
//
//    var notes = {};
//
//    var Observer = function() {
//        return {
//            notify: function(index) {
//                console.log("Observer " + index + " is notified!");
//            }
//        }
//    }
//
//
//    function getNotes() {
//        $http({
//            method: "GET",
//            url: "user.php"
//        }).then(function mySuccess(response) {
//            console.log(response);
//
//            var Notes = response['data']['notes'];
//            var Message = response['message'];
//
//            console.log(Notes);
//
//        })
//        return Notes;
//    }
//
//    return getNotes;
//});


    .factory('UpdateNotesComponent', function(){
    var self = this;
        var notes;
        var _listeners = [];
        this.subscribe = function(listener) {
            _listeners.push(listener);
        }

        this.notifyListener = function() {
            $http({
                method: "GET",
                url: "user.php"
            }).then(function mySuccess(response) {
                for (var i=0; i<Notifiers.length; i++) {
                    notifiers[i].notify(['data']['notes'])
                    }

                //$scope.Notes = Notes;
            })
        }

        return new UpdateNotesComponent;

    });