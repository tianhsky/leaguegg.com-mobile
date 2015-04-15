app.ang.controller('GameSearchCtrl', ['$scope',
  function($scope) {
    navigator.app.clearHistory();

    var defaultRegion = 'NA';
    $scope.criteria = {
      region: "NA",
      summoner_name: null
    }
    loadSearch();

    $scope.searchGame = function() {
      app.store.set("game.search", $scope.criteria);

      app.models.game.findBySummoner({
          summonerName: $scope.criteria.summoner_name,
          region: $scope.criteria.region
        }, function(data) {
          if (data.error) {
            alert("Error");
          } else {
            app.tstore.set("game.current", data);
            goToGame();
          }
        },
        function(err) {
          alert("Not in game");
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