'use strict';
angular.module('BeastMemes', [
  'main',
  'ImgCache', 
]).config( function (ImgCacheProvider) {
	ImgCacheProvider.manualInit = true;
}).run( function ($ionicPlatform, ImgCache) {
 $ionicPlatform.ready( function () {
  ImgCache.$init();
 });
});
