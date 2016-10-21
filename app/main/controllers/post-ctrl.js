'use strict';
angular.module('main')

.controller('PostCtrl', function ($scope, $log, Config, Cacheget) {
  $scope.title = "Most Recent";
  $scope.page = 1;
  $scope.moredata = false;
  $scope.loadMoreData = function () {
    var cache = false;
    if ($scope.page === 1) {cache = true;}
    Cacheget.http(Config.ENV.RECENT_URL + '?page=' + $scope.page, cache, 'posts').then( function(res) {
      if (!res) {
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {
        var items = res.posts;
        for (var i = 0; i < items.length; i++) {
          $scope.items.push(items[i]);
        }
        if (res.count === 0) {
          $scope.moredata = true;
        }
        $scope.page = $scope.page + 1;
        $scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.$broadcast('scroll.refreshComplete');
      }
    });
  };
  $scope.doRefresh = function () {
    $scope.page = 1;
    $scope.items.length = 0;
		$scope.loadMoreData();
  };
  $scope.share = function ($message, $subject, $image, $url) {
    window.plugins.socialsharing.share($sce.trustAsHtml($message), $sce.trustAsHtml($subject), $image, $url)
      .then( function (result) {
        $log.log(result);
      }, function (err) {
        $log.log('Error: ' + JSON.stringify(err));
      });
  };
  $scope.items = [];
}).filter('html', function ($sce) {
  return function(input) {
    return $sce.trustAsHtml(input);
  };
});
