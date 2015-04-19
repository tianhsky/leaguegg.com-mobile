app.ang.directive('gameTeam', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/_game.team.html',
    scope: {
      team: '=team',
      selectPlayer: "&"
    }
  }
});