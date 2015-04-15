app.ang.directive('ngBarChartHorizontal', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<svg class="player-chart"></svg>',
    scope: {
      data: '=data'
    },
    link: function(scope, element, attrs) {
      var chart = d3.select(element[0]);

      scope.$watch('data', function(newVal, oldVal) {
        updateGraph();
      });

      function getPercent(num) {
        return Math.round(num * 100 * 100) / 100;
      }

      function updateGraph() {
        var width = 960;
        var height = 500;
        var radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c"]);

        var arc = d3.svg.arc()
          .outerRadius(radius - 50)
          .innerRadius(50);

        var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) {
            return d.population;
          });

        var svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        values.forEach(function(d) {
          d.population = +d.population;
        });

        var g = svg.selectAll(".arc")
          .data(pie(values))
          .enter().append("g")
          .attr("class", "arc");

        g.append("path")
          .attr("d", arc)
          .style("fill", function(d) {
            return color(d.data.age);
          });

        g.append("text")
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function(d) {
            return d.data.age;
          });
      }

      scope.$on(
        "$destroy",
        function() {
          delete chart;
        }
      );
    }
  }
});