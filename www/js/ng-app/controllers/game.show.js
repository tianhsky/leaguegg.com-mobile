app.ang.controller('GameShowCtrl', ['$scope',
  function($scope) {
    navigator.app.clearHistory();

    // scope vars
    $scope.title = null;
    $scope.game = null;
    var gameObj = null;
    var searchParams = app.store.get('game.search');

    loadGame();
    track();

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
      gameObj = null;
    });

    function loadGame() {
      var g = app.tstore.get('game.current');
      gameObj = new app.models.game();
      var updated = gameObj.init(g);
      $scope.game = gameObj.getData();
      if (!$scope.game) $scope.goBack();
      $scope.title = $scope.game.game_queue.name;
      if (updated) loadTwitchStatus();
    }

    function track() {
      app.ga.sendAppViewWithParams('GameShow', {
        gameId: $scope.game.id,
        summonerName: searchParams.summonerName,
        region: searchParams.region
      });
    }

    function loadTwitchStatus() {
      _.each($scope.game.teams, function(team) {
        _.each(team.participants, function(p) {
          if (!p.meta) p.meta = {};
          var name = p.meta.twitch_channel || p.summoner.name;
          app.models.player.findTwithStream(
            name,
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