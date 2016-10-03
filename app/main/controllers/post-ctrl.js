'use strict';
angular.module('main')

.controller("PostCtrl",function($scope,$log,$http){
	$scope.page = 1;
    $scope.moredata = false;
    $scope.loadMoreData=function()
    {
		$http.get('http://beastmemes.com/api/get_posts/?page='+ $scope.page,
		{header : {'Content-Type' : 'application/json; charset=UTF-8'}})
		.success(function(res){
			var items = res.posts;
			for (var i = 0; i < items.length; i++) {
				$scope.items.push(items[i]);
			} 
			if(res.count == 0){
				$scope.moredata=true;
			}
			$scope.page = $scope.page + 1;
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).error(function (response){
			$log.log('error' + response);
		});
    };
	$scope.doRefresh =function(){
	$scope.page = 1; 
		$http.get('http://beastmemes.com/api/get_posts/?page='+ $scope.page,
			{header : {'Content-Type' : 'application/json; charset=UTF-8'}})
			.success(function(res){
				var items = res.data.posts;
				for (var i = 0; i < items.length; i++) {
					$scope.items.push(items[i]);
				} 
				if(res.data.count == 0){
					$scope.moredata=true;
				}
				$scope.page = $scope.page + 1;
		}).error(function (response){
			$log.log('error' + response);
		}).finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	$scope.share = function ($message,$subject,$image,$url) {
    window.plugins.socialsharing.share($sce.trustAsHtml($message), $sce.trustAsHtml($subject), $image, $url)
      .then(function(result) {
        //console.log(result);
      }, function(err) {
        //console.log('Error: ' + JSON.stringify(err));
      });
	};
    $scope.items=[];
}).filter('html',function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
});