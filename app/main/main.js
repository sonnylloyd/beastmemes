'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/list');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    })
      .state('main.list', {
        url: '/list',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/posts.html',
            controller: 'PostCtrl as ctrl'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail/:id',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list-detail.html',
            controller: 'DetailCtrl as ctrl'
          }
        }
      })
      .state('main.cat', {
        url: '/list/category',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/lists.html',
            controller: 'CatCtrl as ctrl'
          }
        }
      })
      .state('main.tag', {
        url: '/list/tag',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/lists.html',
            controller: 'TagCtrl as ctrl'
          }
        }
      })
      .state('main.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      });
});
