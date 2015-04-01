ang.controller('GameShowCtrl', ['$scope',
    function($scope) {

        $scope.current_game = {
            game_mode: "CLASSIC",
            game_type: "MATCHED_GAME",
            team_purple: [
                {summoner_name: "Ashe", champion_name: "tianhsky", kill_count: 1, death_count: 10, assist_count: 5, win_rate: 0.5},
                {summoner_name: "Ashe", champion_name: "tianhsky", kill_count: 1, death_count: 10, assist_count: 5, win_rate: 0.5},
                {summoner_name: "Ashe", champion_name: "tianhsky", kill_count: 1, death_count: 10, assist_count: 5, win_rate: 0.5},
                {summoner_name: "Ashe", champion_name: "tianhsky", kill_count: 1, death_count: 10, assist_count: 5, win_rate: 0.5},
                {summoner_name: "Ashe", champion_name: "tianhsky", kill_count: 1, death_count: 10, assist_count: 5, win_rate: 0.5}
            ],
            team_blue: [
                {summoner_name: "Ashe", champion_name: "tianhsky", kill_count: 1, death_count: 10, assist_count: 5, win_rate: 0.5},
                {summoner_name: "Ashe", champion_name: "tianhsky", kill_count: 1, death_count: 10, assist_count: 5, win_rate: 0.5},
                {summoner_name: "Ashe", champion_name: "tianhsky", kill_count: 1, death_count: 10, assist_count: 5, win_rate: 0.5},
                {summoner_name: "Ashe", champion_name: "tianhsky", kill_count: 1, death_count: 10, assist_count: 5, win_rate: 0.5},
                {summoner_name: "Ashe", champion_name: "tianhsky", kill_count: 1, death_count: 10, assist_count: 5, win_rate: 0.5}
            ]
        }

        $scope.searchCurrentGame = function() {
            AppService.fetchCurrentGame({
                    summonerName: $scope.q
                }, function(data) {
                    $scope.$apply(function() {
                        if (data.error) {
                            $scope.errorMessage = data.error;
                        } else {
                            $scope.errorMessage = null;
                            $scope.currentGame = data;
                        }
                    });
                },
                function(err) {}
            );
        }

    }
]);