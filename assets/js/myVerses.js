/* global angular */
;(function () {
  angular.module('myVerses', ['ngRoute', 'ngResource', 'ngAnimate', 'ngCookies', 'ui.bootstrap', 'ngMd5', 'btford.socket-io'])
    .factory('mySocket', function (socketFactory) {
      return socketFactory()
    })
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/login', {
          controller: 'myVerses-Login',
          controllerAs: 'ctrl',
          templateUrl: 'templates/login.html'
        })
        .when('/myVerses', {
          controller: 'myVerses-Home',
          controllerAs: 'ctrl',
          templateUrl: 'templates/home.html'
        })
        .when('/bible', {
          controller: 'myVerses-Bible',
          controllerAs: 'ctrl',
          templateUrl: 'templates/bible.html'
        })
        .when('/profile', {
          controller: 'myVerses-Profile',
          controllerAs: 'ctrl',
          templateUrl: 'templates/profile.html'
        })
        .when('/stats', {
          controller: 'myVerses-Stats',
          controllerAs: 'ctrl',
          templateUrl: 'templates/stats.html'
        })
        .when('/verse', {
          controller: 'myVerses-Verse',
          controllerAs: 'ctrl',
          templateUrl: 'templates/verse.html'
        })
        .otherwise({ redirectTo: '/myVerses' })
    }])
    .run(['$cookies', '$rootScope', '$location', '$http', function ($cookies, $rootScope, $location, $http) {
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        if ($rootScope.id === '' || $rootScope.token === '') {
          if (next.indexOf('login') < 0) { // not going to login
          } else {
            $location.path('/login')
          }
        }
      })

      $rootScope.isActive = function (viewLocation) { // eslint-disable-line
        return viewLocation === $location.path()
      }
      if (typeof $cookies.get('myVerses-id') !== 'undefined' && typeof $cookies.get('myVerses-token') !== 'undefined') {
        $rootScope.username = $cookies.get('myVerses-name')
        $rootScope.id = $cookies.get('myVerses-id')
        $rootScope.token = $cookies.get('myVerses-token')
        $rootScope.language = $cookies.get('myVerses-language')
        $rootScope.version = $cookies.get('myVerses-version')
        $http.defaults.headers.common.id = $cookies.get('myVerses-id')
        $http.defaults.headers.common.token = $cookies.get('myVerses-token')
      } else {
        $rootScope.username = ''
        $rootScope.id = ''
        $rootScope.token = ''
        $rootScope.language = ''
        $rootScope.version = ''
        $http.defaults.headers.common.id = ''
        $http.defaults.headers.common.token = ''
        $location.path('/login')
      }

      $rootScope.logout = function () { // eslint-disable-line
        $cookies.remove('myVerses-id')
        $cookies.remove('myVerses-token')
        $cookies.remove('myVerses-name')
        $cookies.remove('myVerses-language')
        $cookies.remove('myVerses-version')
        $rootScope.username = ''
        $rootScope.id = ''
        $rootScope.login = ''
        $rootScope.token = ''
        $rootScope.language = ''
        $rootScope.version = ''
        $http.defaults.headers.common.id = ''
        $http.defaults.headers.common.token = ''
        $location.path('/login')
      }
    }])
}())
