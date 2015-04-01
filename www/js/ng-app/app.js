ang = angular.module('lolbox', [
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
                url: '/game',
                templateUrl: 'templates/game.html',
                controller: 'GameCtrl'
            })
            .state('game.search', {
                url: '/search',
                views: {
                    '': {
                        templateUrl: 'templates/game.search.html',
                        controller: 'GameSearchCtrl'
                    },
                    'ads@game.search': {
                        templateUrl: 'templates/ads.html',
                        controller: 'AdsCtrl'
                    }
                }
            })
            .state('game.show', {
                url: '/:game_id',
                views: {
                    '': {
                        templateUrl: 'templates/game.show.html',
                        controller: 'GameShowCtrl',
                    },
                    'ads@game.show': {
                        templateUrl: 'templates/ads.html',
                        controller: 'AdsCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/game/search');
    }
]);
