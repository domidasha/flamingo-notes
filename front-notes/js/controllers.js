/**
 * Created by dasha on 20.06.16.
 */

'user strict';

var flamingoApp = angular.module('flamingoApp', ['ngRoute', 'ngResource']);

flamingoApp.config([
    '$routeProvider', '$locationProvider',
    function ($routeProvide, $locationProvider) {
        $routeProvide
            .when('/', {
                templateUrl: 'template/login.html',
                controller: 'LoginCtrl'
            })
            .when('/notes', {
                templateUrl: 'template/notes.html',
                controller: 'NotesCtrl'
            })
            .when('/notes', {
                templateUrl: 'template/notes/:noteId',
                controller: 'NoteDetailCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);