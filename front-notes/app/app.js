
//
//angular.module ('app.angularGit', ['ngResource'])
//    .factory('AngularGit', function($resource) {
//        return $resource('http://flamingo-notes.dev/back-notes/notes.php/:id')
//        //return $resource('https://routingnumbers.herokuapp.com/api/data.json?rn=1')
//    });


//
//.factory('UserService', function ($resource) {
//    return $resource('http://flamingo-notes.dev/back-notes/notes.php/:id',{id: "@id"});
//});


angular.module('myApp', [
    'ngRoute', 'ngResource'
]).config(function ($routeProvider) {
    $routeProvider.when("/login", {
        templateUrl: "views/login.html",
        controller: 'myCtrl'
    }).when("/settings", {
        templateUrl: "settings.html",
        controller: ''
    }).otherwise({
        redirectTo: "/"
    });
}).controller('myCtrl', function($scope, $http) {
    $http({
        method : "GET",
        url : "/back-notes/notes.php/",
        params: {
            id: 2
        }

    }).then(function mySucces(response) {
        $scope.myWelcome = response.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
});