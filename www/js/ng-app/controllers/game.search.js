ang.controller('GameSearchCtrl', ['$scope',
    function($scope) {

        $scope.criteria = {
            region: "NA",
            player: null
        }

        $scope.selectRegion = function() {

        };

        $scope.searchGame = function() {
            location.href="#/game/111"
        };

       

    }
]);