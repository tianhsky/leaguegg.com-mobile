d3.custom = {};

d3.custom.barChartHorizontal = function() {
  var width = "100%";
  var height;
  var barHeight = 15;
  var gap = 3;
  var ease = 'cubic-in-out';
  var svg, duration = 500;

  var dispatch = d3.dispatch('customHover');

  function exports(_selection) {
    _selection.each(function(data) {
      var _data = [data.offensive_rate*100, data.defensive_rate*100, data.cs_rate*100];

      var chartW = width;
      var chartH = _data.length * barHeight;
      height = chartH;

      var x = d3.scale.linear()
        .domain([0, d3.max(_data)])
        .range([0, chartW]);

      var chart = d3.select(".chart")
        .attr("width", chartW)
        .attr("height", chartH);

      var bar = chart.selectAll("g")
        .data(_data)
        .enter().append("g")
        .attr("transform", function(d, i) {
          return "translate(0," + i * barHeight + ")";
        });

      bar.append("rect")
        .attr("width", x)
        .attr("height", barHeight - gap);

      bar.append("text")
        .attr("x", function(d) {
          return chartW - 25;
        })
        .attr("y", barHeight / 2)
        .attr("dy", ".15em")
        .text(function(d) {
          return d;
        });

    });
  }
  exports.width = function(_x) {
    if (!arguments.length) return width;
    width = parseInt(_x);
    return this;
  };
  exports.height = function(_x) {
    if (!arguments.length) return height;
    height = parseInt(_x);
    duration = 0;
    return this;
  };
  exports.gap = function(_x) {
    if (!arguments.length) return gap;
    gap = _x;
    return this;
  };
   exports.ease = function(_x) {
    if (!arguments.length) return ease;
    ease = _x;
    return this;
  };
  d3.rebind(exports, dispatch, 'on');
  return exports;
};