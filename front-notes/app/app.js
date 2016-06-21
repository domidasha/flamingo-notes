//var app = angular.module('app', ['app.angularGit']);

//app.controller('MainController', function($scope, AngularGit) {
//    var param = {category: 'commits', sha: '0c19482d033f592fb9f341187c0a5d2e313e79cc'}
//    $scope.benefit = AngularGit.get(param)
//    console.log(AngularGit.get(param))
//});

//angular.module ('app.angularGit', ['ngResource'])
//    .factory('AngularGit', function($resource) {
//        return $resource('https://api.github.com/repos/angular/angular.js/:category/:sha')
//        //return $resource('https://routingnumbers.herokuapp.com/api/data.json?rn=1')
//    })



var questApp = angular.module('app', ["ngRoute", 'ngResource'])
    .config(function($routeProvider){
        $routeProvider.when('/',
            {
                templateUrl:'views/login.html',
                controller:'FormCtrl'
            });
        $routeProvider.when('/notes',
            {
                templateUrl:'views/user-notes.html',
                controller:'NotesCtrl'
            });
    });

app.controller('FormCtrl', function($scope) {
    $scope.login = 'admin';
    $scope.password = 'password';

    $scope.notes = UserService.query();

    UserService.save({login: $scope.login, password: $scope.password});
});
//
//angular.module ('app.angularGit', ['ngResource'])
//    .factory('AngularGit', function($resource) {
//        return $resource('http://flamingo-notes.dev/back-notes/notes.php/:id')
//        //return $resource('https://routingnumbers.herokuapp.com/api/data.json?rn=1')
//    });



.factory('UserService', function ($resource) {
    return $resource('http://flamingo-notes.dev/back-notes/notes.php/:id',{id: "@id"});
});