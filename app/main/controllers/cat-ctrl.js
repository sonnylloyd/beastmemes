'use strict';
angular.module('main')

.controller("CatCtrl",function($scope,$log,$http){
	$scope.page = 1;
    $scope.moredata = false;
    $scope.loadMoreData=function()
    {
		$http.get('http://beastmemes.com/api/get_category_index/?page='+ $scope.page,
		{header : {'Content-Type' : 'application/json; charset=UTF-8'}, timeout: 5000})
		.success(function(res){
			var items = res.categories;
			for (var i = 0; i < items.length; i++) {
				$scope.items.push(items[i]);
			}
			if(res.count == items.length){
				$scope.moredata=true;
			}else{
				if($scope.page == 1){window.localStorage.setItem('cats', JSON.stringify(res));}
			}
			$scope.page = $scope.page + 1;
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}).error(function (response){
			if($scope.page == 1 && window.localStorage.getItem('cats')){
				var res = JSON.parse( window.localStorage.getItem('cats'));
				var items = res.categories;
				for (var i = 0; i < items.length; i++) {
					$scope.items.push(items[i]);
				}
				$scope.page = $scope.page + 1;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$log.log('error' + response);
		});
    };
	$scope.doRefresh =function(){
	$scope.page = 1;
		$http.get('http://beastmemes.com/api/get_category_index/?page='+ $scope.page,
			{header : {'Content-Type' : 'application/json; charset=UTF-8'}, timeout: 5000})
			.success(function(res){
				var items = res.categories;
				for (var i = 0; i < items.length; i++) {
					$scope.items.push(items[i]);
				}
				if(res.count == items.length){
					$scope.moredata=true;
				}else{
					if($scope.page == 1){window.localStorage.setItem('cats', JSON.stringify(res));}
				}
				$scope.page = $scope.page + 1;
		}).error(function (response){
			if($scope.page == 1 && window.localStorage.getItem('cats')){
				var res = JSON.parse( window.localStorage.getItem('cats'));
				var items = res.categories;
				for (var i = 0; i < items.length; i++) {
					$scope.items.push(items[i]);
				}
				$scope.page = $scope.page + 1;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
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
