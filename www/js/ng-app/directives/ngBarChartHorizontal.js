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
        if (!scope.data) return;
        var _data = scope.data;
        _.each(_data, function(d) {
          d.percent = getPercent(d.rate);
          d.dpercent = getPercent(d.drate);
        })

        var width = "100%";
        var barHeight = 17;
        var gap = 3;
        var chartW = width;
        var chartH = _data.length * barHeight;
        var height = chartH;

        chart.attr("width", chartW)
          .attr("height", chartH);

        var bar = chart.selectAll("g")
          .data(_data)
          .enter().append("g")
          .attr("transform", function(d, i) {
            return "translate(0," + i * barHeight + ")";
          });

        bar.append("rect")
          .attr("class", function(d, i) {
            return d.bar_class
          })
          .attr("rx", 3)
          .attr("ry", 3)
          .attr("width", function(d, i) {
            return d.percent + "%";
          })
          .attr("height", barHeight - gap);

        bar.append("text")
          .attr("class", "label")
          .attr("x", 2)
          .attr("y", barHeight / 2)
          .attr("dy", ".15em")
          .text(function(d) {
            return d.label;
          });

        bar.append("text")
          .attr("class", "rate")
          .attr("x", 55)
          .attr("y", barHeight / 2)
          .attr("dy", ".15em")
          .text(function(d) {
            if (d.nodata) return "";
            else return d.percent + "%";
          });

        bar.append('text')
          .attr('class', function(d) {
            var diff_cls = "diff ";
            if (d.dpercent > 0) diff_cls += "inc"
            if (d.dpercent < 0) diff_cls += "dec"
            return diff_cls;
          })
          .attr("x", 85)
          .attr("y", barHeight / 2)
          .attr("dy", ".15em")
          .text(function(d) {
            var arr_i = "";
            if (d.dpercent > 0) arr_i = "\uf062";
            if (d.dpercent < 0) arr_i = "\uf063";
            return arr_i;
          });

        bar.append('text')
          .attr('class', function(d) {
            var diff_cls = "diff ";
            if (d.dpercent > 0) diff_cls += "inc"
            if (d.dpercent < 0) diff_cls += "dec"
            return diff_cls;
          })
          .attr("x", 95)
          .attr("y", barHeight / 2)
          .attr("dy", ".15em")
          .text(function(d) {
            if (d.dpercent != 0) return d.dpercent + "%";
            else return "";
          });

        bar.append("text")
          .attr("class", "description")
          .attr("x", 130)
          .attr("y", barHeight / 2)
          .attr("dy", ".15em")
          .text(function(d) {
            return d.description;
          });
      }

      // scope.$on("$destroy", function() {
      //   delete chart;
      // });
    }
  }
});