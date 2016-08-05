var  myApp = angular.module('myApp', ['ngRoute']);



angular.
    module('myApp').
    component('noteList', {
        templateUrl:"frontend/app/note-list/note-list.template.html",
        controller: 'NotesCtrl'

        }
    )
    //.component('noteListGreen', {
    //    templateUrl: "frontend/app/note-list/note-list-green.template.html",
    //    controller: 'NotesGreenCtrl'
    //})

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
                   templateUrl:"frontend/app/views/user-notes.html"
                   //controller: 'NotesCtrl'
                }).
                when('/logout', {
                    templateUrl: "frontend/app/views/user-notes.html",
                    controller: 'LogOutCtrl'
                }).
                otherwise({
                    redirectTo: '/logout'
                });
    })


 .controller('NotesCtrl', ['$scope', 'UpdateNotesComponent', function ($scope, UpdateNotesComponent) {

        var notes = [];
        var self = this;

        UpdateNotesComponent.subscribe(this);
        UpdateNotesComponent.loadNotes();

        self.notify = function(data) {
            $scope.Notes = data;
        }

    }])

    //.controller('NotesGreenCtrl', ['$scope', 'UpdateNotesComponent', function ($scope, UpdateNotesComponent) {
    //
    //    var self = this;
    //
    //    UpdateNotesComponent.subscribe(this);
    //    UpdateNotesComponent.loadNotes();
    //
    //    self.notify = function(data) {
    //        $scope.Notes = data;
    //    }
    //
    //}])

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

    .controller('DeleteCtrl', function($scope, $http, $routeParams, UpdateNotesComponent) {
        var request = $http({
            method : "POST",
            url : "notes.php",
            data: {
            	id: $routeParams.noteId,
                action: 'delete'
            }
        });

        request.success(
            function(response) {
                if (response['success']) {
                    $scope.Message = response['message'];
                    UpdateNotesComponent.loadNotes();
                }
                else {
                    $scope.Message = response['message'];
                }
            }
        );

    })
    .controller('EditCtrl', function($scope, $http, $routeParams, UpdateNotesComponent) {

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
                        UpdateNotesComponent.loadNotes();
                    }
                    else {
                        $scope.Message = response['message'];
                    }
                });
        }
    })
    .controller('NewCtrl', function($scope, $http, UpdateNotesComponent, PriorityTypes ) {

    	$scope.noteTitle = '';
    	$scope.noteText = '';
        $scope.priorities = PriorityTypes.types;
        $scope.filterCondition = PriorityTypes.filterCondition;

        //console.log($scope.priorities);
        //console.log($scope.filterCondition);

    	
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
                    UpdateNotesComponent.loadNotes();
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


    .factory('UpdateNotesComponent', function($http){
        var self = this ;
        var notes = [];

        var _listeners = [];
        this.subscribe = function(listener) {
            _listeners.push(listener);
        };

        var UpdateNotesComponent  = this;

        this.loadNotes = function () {

            return $http.get('allNotes.php').then(function(response) {
                notes = response.data['notes'];
                self.updateNotes();
            });
        };

        this.updateNotes = function() {
            for (var i = 0; i < _listeners.length; i++) {
                _listeners[i].notify(notes)
            }
        }

        return UpdateNotesComponent;
    })


    .factory('PriorityTypes', function() {
        var PriorityTypes = this;

        this.types = [
            {value: '1', displayName: 'High'},
            {value: '2', displayName: 'Medium'},
            {value: '3', displayName: 'Low'}
        ]

        this.filterCondition = {
            priority: '2'
        }


        return PriorityTypes;

});


