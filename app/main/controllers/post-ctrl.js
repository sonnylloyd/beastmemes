'use strict';
angular.module('main')

.controller("PostCtrl",function($scope,$log,$http){
	$scope.page = 1;
    $scope.moredata = false;
    $scope.loadMoreData=function()
    {
		$http.get('http://beastmemes.com/api/get_posts/?page='+ $scope.page,
		{header : {'Content-Type' : 'application/json; charset=UTF-8'}})
		.then(function(res){
			var items = res.data.posts;
			for (var i = 0; i < items.length; i++) {
				$scope.items.push(items[i]);
			} 
			if(res.data.count == 0){
				$scope.moredata=true;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.page = $scope.page + 1;
		});
    };

    $scope.items=[];
});