'use strict';
angular.module('main')
.controller('MenuCtrl', function ($scope, $log, $location, $state, $ionicSideMenuDelegate) {
  $scope.doSearch = function () {
    if(this.searchterm) {
      $log.log(this.searchterm);
      $log.log('/list/type/Search/slug/'+this.searchterm);
      if($ionicSideMenuDelegate.isOpenLeft()) {
            $ionicSideMenuDelegate.toggleLeft(false);
        } else {
            $ionicSideMenuDelegate.toggleLeft(true);
        }
      $state.go('main.listtypeslug', {type: 'Search', slug: this.searchterm})
      //$location.path('/list/type/Search/slug/'+this.searchterm);
    }
  };
});
