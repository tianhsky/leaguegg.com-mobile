var angularD3Charts = angular.module('angularD3Charts', []);
angularD3Charts.directive('barChartHorizontal', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<svg class="chart"></svg>',
    scope: {
      data: '=data',
      hovered: '&hovered'
    },
    link: function(scope, element, attrs) {
      var chart = new d3.custom.barChartHorizontal();
      var chartEl = d3.select(element[0]);
      chart.on('customHover', function(d, i) {
        scope.hovered({
          args: d
        });
      });

      scope.$watch('data', function(newVal, oldVal) {
        chartEl.datum(newVal).call(chart);
      });

      scope.$on(
        "$destroy",
        function() {
          chartEl = null;
          delete chartEl;
          chart = null;
          delete chart;
        }
      );
    }
  }
});