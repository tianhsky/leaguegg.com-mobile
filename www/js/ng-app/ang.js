app.ang = angular.module('lolbox', [
  'ionic',
  'ngAnimate',
  'ui.router',
  'truncate'
]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ionicConfigProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider
      .state('game', {
        abstract: true,
        templateUrl: 'templates/game.html',
        controller: 'GameCtrl'
      })
      .state('game.search', {
        url: '/game/search',
        views: {
          '': {
            templateUrl: 'templates/game.search.html',
            controller: 'GameSearchCtrl'
          }
        }
      })
      .state('game.show', {
        url: '/game/show?region&summoner_name',
        views: {
          '': {
            templateUrl: 'templates/game.show.html',
            controller: 'GameShowCtrl',
          }
        }
      })
      .state('game.player', {
        url: '/game/player/show?region&summoner_name',
        views: {
          '': {
            templateUrl: 'templates/game.player.html',
            controller: 'GamePlayerCtrl',
          }
        }
      });
    $urlRouterProvider.otherwise('/game/search');
  }
]);