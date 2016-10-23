'use strict';
angular.module('main')

.controller('PostCtrl', function ($scope, $log, Config, Cacheget, $stateParams) {
  var slug = $stateParams.slug;
  var type = $stateParams.type;
  var url = Config.ENV.RECENT_URL;
  var cachename = 'posts';
  if (typeof slug === 'undefined') {
    $scope.title = "Most Recent";
  }else{
    $scope.title = type + " " + slug;
  }
  $scope.page = 1;
  $scope.moredata = false;
  $scope.loadMoreData = function () {
    var urlExtension = '?page=' + $scope.page;
    $log.log(slug);
    if (typeof slug !== 'undefined') {
      switch (type) {
      case 'Category':
          url = Config.ENV.CATEGORY_URL;
          urlExtension = '?slug='+ slug +'&page=' + $scope.page;
          $log.log(url + urlExtension);
          cachename = type + slug;
          break;
      case 'Tag':
          url = Config.ENV.TAG_URL;
          urlExtension = '?slug='+ slug +'&page=' + $scope.page;
          $log.log(url + urlExtension);
          cachename = type + slug;
          break;
      case 'Search':
          url = Config.ENV.SEARCH_URL;
          urlExtension = '?search='+ slug +'&page=' + $scope.page;
          $log.log(url + urlExtension);
          cachename = type + slug;
          break;
      }
    }
    var cache = false;
    if ($scope.page === 1) {cache = true;}
    $log.log(url + urlExtension);
    Cacheget.http(url + urlExtension, cache, cachename).then( function(res) {
      if (!res) {
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {
        var items = res.posts;
        for (var i = 0; i < items.length; i++) {
          $scope.items.push(items[i]);
        }
        if (res.pages === $scope.page) {
          $scope.moredata = true;
        }else{
          $scope.page = $scope.page + 1;
        }
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
