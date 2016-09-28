'use strict';
angular.module('main')
.controller('DetailCtrl',function ($scope,$log,$http,$stateParams,$sce) {
	var postId = $stateParams.id;
	$http.get('http://beastmemes.com/api/get_post/?id='+postId,
    {header : {'Content-Type' : 'application/json; charset=UTF-8'}})
       .then(function(res){
          $scope.post = res.data.post; 
			$scope.post.content = $sce.trustAsHtml(res.data.post.content); 		  
        });
});
