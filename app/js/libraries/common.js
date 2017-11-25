/*(function(angular) {
  'use strict';

  var liveAreaData = new RealTimeData(4);
  var liveBarData = new RealTimeData(3);
  var liveLineData = new RealTimeData(2);
  var liveHeatmap = new HeatmapData(1);
  var liveGaugeData = new GaugeData();

  var chartController = function($timeout) {
    var charts = angular.extend(this, {
  
      lineAxes: ['right','bottom'],
      lineData: (function() {
        var data = [
            {label: 'Layer 1', values: []},
            {label: 'Layer 2', values: []},
            {label: 'Layer 3', values: []}
        ];
        for (var j = 0; j < 256; j++) {
          var x = 40 * (j / 256) - 20;
          data[0].values.push({x: x, y: Math.sin(x) * (x / 4)});
          data[1].values.push({x: x, y: Math.cos(x) * (x / Math.PI)});
          data[2].values.push({x: x, y: Math.sin(x) * (x / 2)});
        }
        return data;
      })(),
    });*/