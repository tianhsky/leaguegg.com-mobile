app.ang.controller('GamePlayerShowCtrl', ['$scope', '$sce',
  function($scope, $sce) {
    navigator.app.clearHistory();

    // vars
    $scope.game = null;
    $scope.player = app.tstore.get('game.player.selected');
    $scope.title = $scope.player.summoner.name;
    $scope.stream = {
      url: null,
      cover_url: null,
      status: 'pending' //pending, loading, found, not_found, playing
    };
    setupTwitchTV();

    // functions
    $scope.goBack = function() {
      app.goBack();
    }

    $scope.play = function() {
      $scope.stream.status = 'playing';
    }

    function setupTwitchTV() {
      $scope.stream.status = "loading";
      app.models.player.findTwithStream(
        $scope.player.summoner.name,
        function(stream) {
          if (stream) {
            $scope.$apply(function() {
              $scope.stream.status = "found";
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

  }
]);