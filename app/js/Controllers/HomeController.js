angular.module('app').controller('HomeController', ['$rootScope','$scope', 'websocketService', function($rootScope,$scope,websocketService){


       


       var dataPoints = [];
		var chart = new CanvasJS.Chart("chartContainer", {
				theme: "light2",
				title: {
				text: "Memory in MB"
			},
				data: [{
				type: "line",
			dataPoints: dataPoints
			}]
});

    websocketService.start("ws://192.168.43.136:8080/listeners", function (evt) {
        var obj = JSON.parse(evt.data);
        $scope.$apply(function () {
        	console.log(obj);
        	$scope.datavalue=obj.hostName;
        	$scope.appname=obj.appName;
            $scope.cpu = obj.cpu/100;

            dataPoints.push({x: obj.timeStamp, y: parseInt(obj.memory)});
              if (dataPoints.length > 10) {
    			dataPoints.splice(0, dataPoints.length - 10);
  			}
            chart.render();
           // $scope.memory.push(obj.memory);
 			$scope.hostname=obj.hostname;
 			
        });
    });

}]);



angular.module('app').factory('websocketService', function () {
        return {
            start: function (url, callback) {
                var websocket = new WebSocket(url);
                websocket.onopen = function () {
        			console.log("open");
                };
                websocket.onclose = function () {

                };
                websocket.onmessage = function (evt) {
                    callback(evt);
                };
            }
        }
    }
);