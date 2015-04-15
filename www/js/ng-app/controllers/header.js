app.ang.controller('HeaderCtrl', ['$scope', '$state',
  function($scope, $state) {
    $scope.title = $state.current.data.title;
    $scope.showBack = $state.current.data.showBack;

    $scope.goBack = function() {
      app.goBack();
    }

  }
]);