app.ang.filter('nullcheck', function() {
  return function(input) {
    return (typeof(input) == "undefined" || input == null) ? "-" : input;
  };
});