/* global angular */
;(function () {
  angular.module('myVerses')
    .provider('myVersesUserProvider', function myVersesUserProvider () {
      var restURL = '/'
      this.setURL = function (url) {
        restURL = url
      }
      this.$get = function ($resource, $http) {
        return {
          login: function (login, pwd) {
            return $http({method: 'POST', url: restURL + 'login', data: {login: login, pwd: pwd}})
          },
          users: function () {
            return $resource(restURL + 'user/:id', {id: '@id'}, {
              update: {
                method: 'PUT'
              }
            })
          }
        }
      }
    })
}())
