app.ang.directive('teamView', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/game.show.team.html',
    scope: {
      team: '=team',
      selectPlayer: "&"
    }
  }
});