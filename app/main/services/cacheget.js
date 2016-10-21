'use strict';
angular.module('main')
.service('Cacheget', function ($http, $log, $q) {
  this.debug = function () { $log.log("debugging cachget"); }
  this.http = function(url,cache = false, cachename = 'posts'){
    var def = $q.defer();
    $http.get(url, {
        header: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        timeout: 5000
      })
      .success(function(res) {
        if(cache){
          window.localStorage.setItem(cachename, JSON.stringify(res));
        }
        def.resolve(res);
      }).error(function(response) {
        if (cache && window.localStorage.getItem(cachename)) {
          var res = JSON.parse(window.localStorage.getItem(cachename));
          def.resolve(res);
        }else{
          def.resolve(false);
        }
      });
      return def.promise;
  }
});
