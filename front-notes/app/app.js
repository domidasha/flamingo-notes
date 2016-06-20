var app = angular.module('app', ['app.angularGit']);

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


app.controller('MainController', function($scope, AngularGit) {
    var param = { id: 1}
    $scope.benefit = AngularGit.get(param)
    console.log(AngularGit.get(param))
});

angular.module ('app.angularGit', ['ngResource'])
    .factory('AngularGit', function($resource) {
        return $resource('http://flamingo-notes.dev/back-notes/notes.php/:id')
        //return $resource('https://routingnumbers.herokuapp.com/api/data.json?rn=1')
    })