angular.module("app").directive('editkeyvalue', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            memory: '=',
            timeStamp:'='
        },
        template : '<div id="chartContainer" style="height: 370px; width: 100%;"></div>',

      controller: function($scope) {        
      	var dataPoints = [];
		    var chart = new CanvasJS.Chart("chartContainer", {
				theme: "light2",
				title: {
				text: "Memory in MB"
			},
				data: [{
				type: "line",
			dataPoints: $scope.memory
			}]
		});
		     dataPoints.push({x: $scope.timeStamp, y: parseInt($scope.memory)});
              if (dataPoints.length > 10) {
    			dataPoints.splice(0, dataPoints.length - 10);
  			}
            chart.render();
      }
    }
});