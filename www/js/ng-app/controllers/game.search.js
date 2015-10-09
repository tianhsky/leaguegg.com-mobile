app.ang.controller('GameSearchCtrl', ['$scope', '$ionicLoading',
  function($scope, $ionicLoading) {
    navigator.app && navigator.app.clearHistory();

    var defaultRegion = 'NA';
    $scope.error = null;
    $scope.regions = app.consts.region.data;
    $scope.criteria = {
      region: "NA",
      summoner_name: null
    }
    loadSearch();

    $scope.searchGame = function() {
      $scope.error = null;
      app.store.set("game.search", $scope.criteria);

      app.models.cheat.applyCode($scope.criteria.summoner_name);

      $scope.loadingIndicator = $ionicLoading.show({
        content: 'Searching Summoner',
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200,
        showDelay: 500
      });
      app.models.game.findBySummoner({
          summonerName: $scope.criteria.summoner_name,
          region: $scope.criteria.region
        }, function(data) {
          app.tstore.set("game.current", data);
          $scope.loadingIndicator.hide();
          goToGame();
        },
        function(err) {
          $scope.loadingIndicator.hide();
          if (err.status == 0) $scope.error = "Network unavailable";
          else if (err.status == 429) $scope.error = "Server busy... relax!";
          else if (err.status == 404) $scope.error = "Not found";
          else $scope.error = "There was an error";
        }
      );
    }

    function goToGame() {
      location.hash = "#/game/show?region=" + $scope.criteria.region + "&summoner_name=" + $scope.criteria.summoner_name;
    }

    function loadSearch() {
      var search = app.store.get('game.search');
      if (search) {
        if (_.isEmpty(search.region)) $scope.criteria.region = defaultRegion;
        else $scope.criteria.region = search.region;

        if (_.isEmpty(search.summoner_name)) $scope.criteria.summoner_name = null;
        else $scope.criteria.summoner_name = search.summoner_name;
      }
    }

  }
]);