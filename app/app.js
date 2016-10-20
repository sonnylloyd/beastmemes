'use strict';
angular.module('BeastMemes', [
  // load your modules here
  'main',
  'ImgCache',// starting with the main module
]).config(function(ImgCacheProvider) {
	ImgCacheProvider.manualInit = true;
}).run(function($ionicPlatform, ImgCache, Cacheget) {

    $ionicPlatform.ready(function() {
        ImgCache.$init();
    });

});
