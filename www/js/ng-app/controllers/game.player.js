app.ang.controller('GamePlayerCtrl', ['$scope', '$sce',
  function($scope, $sce) {
    navigator.app.clearHistory();

    // vars
    $scope.player = app.tstore.get('game.player.selected');
    $scope.title = $scope.player.summoner.name;
    $scope.stream = {
      url: null,
      cover_url: null,
      status: 'pending' //pending, loading, found, not_found, playing
    };
    setupTwitchTV();
    track();

    // functions
    $scope.goBack = function() {
      app.goBack();
    }

    $scope.play = function() {
      $scope.stream.status = 'playing';
      app.ga.sendEvent('PlayerTwitch', 'Play', $scope.player.summoner.name + "@" + $scope.stream.name, 1);
    }

    function setupTwitchTV() {
      $scope.stream.status = "loading";
      if (!$scope.player.meta) $scope.player.meta = {};
      var name = $scope.player.meta.twitch_channel || $scope.player.summoner.name;
      app.models.player.findTwithStream(
        name,
        function(stream) {
          if (stream) {
            $scope.$apply(function() {
              $scope.stream.status = "found";
              $scope.stream.name = stream.name;
              $scope.stream.url = $sce.trustAsResourceUrl(stream.embed_url);
              $scope.stream.preview = stream.preview;
            })
          } else {
            $scope.$apply(function() {
              $scope.stream.status = "not_found";
            })
          }
        });
    }

    function track() {
      app.ga.sendAppViewWithParams('GamePlayer', {
        summonerName: $scope.player.summoner.name
      });
    }

  }
]);