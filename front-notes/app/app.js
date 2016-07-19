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
                when( '/new', {
     	               templateUrl: "views/user-notes.html",
                         controller: 'NewCtrl'
     	            }).
                when('/notes/:userId', {
                    template: "<p>welcome. please refresh this page!</p> <p><a href='#/new'>Add new</a></p>",
                    controller: 'NotesCtrl'
                }).
                when('/notes/new', {
                    template: "<p><a href='#/new'>Add new</a></p>",
                    //templateUrl:"note-list/note-list.template.html",
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


/////////////////////////////////////////

        //var getServiceTypeSettings = function(){
        //    return $http.get(apiBase + 'ServiceType')
        //        .success(function (data, status, headers, config) {
        //            //Clear existing vendor data from Observable array
        //            if(ServiceTypes.length > 0){
        //                ServiceTypes.splice(0, ServiceTypes.length);
        //            }
        //            //Push the new data to the Observable array all at once
        //            ServiceTypes.push.apply(ServiceTypes, data);
        //
        //
        //            ServiceTypesSource = new kendo.data.DataSource({data: ServiceTypes});
        //            return ServiceTypesSource;
        //        });
        //};
        //
        //
        //var createServiceTypeSetting = function(data) {
        //    return $http.post(apiBase + 'ServiceType', data).then(function(data){
        //        return data;
        //    });
        //};
        //
        //var updateServiceTypeSetting = function(data, page) {
        //    return $http({method: 'PUT', url: apiBase + 'ServiceType', data: data}).then(function (data) {
        //        data.page = page;
        //        return data;
        //    });
        //};
        //
        //console.log(apiBase);
        //console.log('ok');

        /////////////////////////////////

        $scope.Register = function() {
            var data = {
                login: $scope.login,
                password: $scope.password,
                action: 'register'

            }
            return $http.post('http://flamingo-notes.dev/back-notes/user.php', data).then(function(result){

               // console.log(result.data);
                if (result.data.success=='true') {
                    console.log('good');
                    $scope.PostDataResponse = result.data.message;
                } else {
                    console.log('bad');
                    $scope.PostDataResponse = result.data.message;
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
                    if (response['success']=='success') {
                        $scope.PostDataResponse = response['id'];
                        $scope.userId = response['id'];
                        window.location = 'http://flamingo-notes.dev/front-notes/app/index.html#/notes/'+$scope.userId;
                    }
                    else {
                        $scope.PostDataResponse = response['message'];

                    }
                });
        }
    })
    .controller('FirstController', function($scope) {

})
    .controller('SecondController', function($scope) {

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
            $scope.add = 'Add new Note';
        }, function myError(response) {
            $scope.Notes = response.statusText;
        });
    })
    .controller('DeleteCtrl', function($scope, $http, $routeParams) {
        $http({
            method : "POST",
            url : "/back-notes/notes.php/",
            data: {
            	id: $routeParams.noteId,
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

    	$scope.noteTitle = Date();
    	$scope.noteText = '';
    	
        $scope.updateNote  = function () {
           var request =  $http({
                method: 'POST',
                url: '/back-notes/notes.php',
                data: {
                    action: 'add',
                    title: $scope.noteTitle,
                    text: $scope.noteText
                }
            });
            request.success(
                function( response) {
                    if (response['success']=='success') {
                        $scope.Message = response['message'];
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


