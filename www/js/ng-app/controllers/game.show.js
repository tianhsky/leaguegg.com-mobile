app.ang.controller('GameShowCtrl', ['$scope',
  function($scope) {
    navigator.app.clearHistory();

    // scope vars
    $scope.title = null;
    $scope.error_message = null;
    $scope.game = null;
    var gameObj = null;
    var searchParams = app.store.get('game.search');

    loadGame();

    // functions
    $scope.goBack = function() {
      app.goBack();
    }

    $scope.showHelp = function() {

    }

    $scope.selectPlayer = function(player) {
      app.tstore.set('game.player.selected', player);
      location.hash = "#/game/player/show?region=" + searchParams.region + "&summoner_name=" + player.summoner.name;
    }

    $scope.$on("$destroy", function() {
      delete gameObj;
    });

    function loadGame() {
      var g = app.tstore.get('game.current');
      gameObj = new app.models.game();
      gameObj.init(g);
      $scope.game = gameObj.getData();
      if (!$scope.game) $scope.goBack();
      $scope.title = $scope.game.game_queue.name;
      loadTwitchStatus();
    }

    function loadTwitchStatus() {
      _.each($scope.game.teams, function(team) {
        _.each(team.participants, function(p) {
          app.models.player.findTwithStream(
            p.summoner.name,
            function(stream) {
              if (stream) {
                $scope.$apply(function() {
                  p.twitch_stream = stream;
                })
              }
            });
        })
      })
    }

  }
]);