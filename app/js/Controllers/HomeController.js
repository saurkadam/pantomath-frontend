angular.module('app').controller('HomeController', ['$rootScope','$scope', 'websocketService', function($rootScope,$scope,websocketService){
        $scope.appNames = {};
        $scope.lineData = [];
        $scope.hosts = {};
        $scope.ObjCollector={};


/*var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
}*/

/*
        var chart = new CanvasJS.Chart("chartContainer", {
                theme: "light2",
                title: {
                text: "Memory in MB"
            }
});
        chart.data=[];*/




// Add a random value to each line every second
// setInterval(function() {
//   line1.append(new Date().getTime(), Math.random());
//   line2.append(new Date().getTime(), Math.random());
// }, 1000);

// Add to SmoothieChart
// smoothie.addTimeSeries(line1);
// smoothie.addTimeSeries(line2);
/*
var smoothie = new SmoothieChart();
smoothie.streamTo(document.getElementById("mycanvas"));
*/




$scope.appName=function(value){
      $scope.hostnamedata={};
      $scope.value=value;


}
$scope.generateKey=function(){

        $.ajax({
          url:$rootScope.routes.key,
          headers: {'token': $rootScope.TokenVariable,'keyType':'1'},
          method: 'GET'
        }).then(function(data, status, xhr) {

        });
 }

    websocketService.start($rootScope.routes.websocket, $rootScope.TokenVariable, function (evt) {
        var obj = JSON.parse(evt.data);

        $scope.$apply(function () {
        //    console.log(obj);        // switch case for using option as cmd case 1: health : present thing
                                        // case 2: request
            $scope.datavalue=obj.hostName;
            $scope.appname=obj.appName;






            switch (obj.cmd) {
                case 'health':

                            $scope.manipulation(obj);


/*                            var appHosts = Object.keys($scope.appNames[obj.appName])
                            console.log(appHosts);
                            $scope.lineData = [];
                            for (var i = 0; i < appHosts.length; i++) {
                              $scope.lineData.push($scope.hosts[obj.appName][appHosts[i]])
                            }*/
                           // console.log($scope.lineData)


                                 
                    break;
                case 'request':
                   $scope.request(obj);             
                    break;
                default:

            }

           // $scope.memory.push(obj.memory);
            $scope.hostname=obj.hostname;
            
        });
    });
  $scope.identifier=function(keyvalue,hostname){
    $scope.modal_tile_dashboard=keyvalue;
    $scope.modal_data=$scope.appNames[obj.appName][hostname].keyvalue;
    
  }
$scope.manipulation=function(obj){
                                if ($scope.appNames[obj.appName]) {
                                if ($scope.appNames[obj.appName][obj.hostName]) {
                                  $scope.appNames[obj.appName][obj.hostName].memory = obj.memory;
                                  $scope.appNames[obj.appName][obj.hostName].cpu = obj.cpu;
                                  $scope.appNames[obj.appName][obj.hostName].hostname=obj.hostName;
/*                                  $scope.hosts[obj.appName][obj.hostName].push(obj.memory)*/
                                } else {
                                
                                  $scope.appNames[obj.appName][obj.hostName] = {
                                    memory : obj.memory,
                                    cpu : obj.cpu,
                                    hostname : obj.hostName
                                  }

                                $scope.hosts[obj.appName][obj.hostName] = [obj.memory]
//                                 $scope.hosts[obj.appName][obj.hostName].values.push({time: obj.timeStamp, y: parseInt(obj.memory)})
                                
                                
                                }
                              }
                              else {
                                $scope.appNames[obj.appName] = {};
                                $scope.hosts[obj.appName] = {};



                                $scope.appNames[obj.appName][obj.hostName] = {
                                    memory : obj.memory,
                                    cpu : obj.cpu,
                                    hostname : obj.hostName

                                }

                                /*$scope.hosts[obj.appName][obj.hostName] = [obj.memory]      */    
                                
                              }
                                $scope.hostnamedata=$scope.appNames[$scope.value];
                                console.log($scope.hostnamedata);
              }

              $scope.request=function(obj){
                                 if(obj.granularRPM != undefined){
                                    var value=[];  
                                      
                                    for(var key in obj.granularRPM) {
                                      value.push(obj.granularRPM[key]);
                                    }
                                  }
                               //   console.log("here", value);
                             //     console.log(Object.keys(obj.granularRPM));
                                if ($scope.appNames[obj.appName]) {

                                if ($scope.appNames[obj.appName][obj.hostName]) {
                                 // console.log($scope.appNames[obj.appName][obj.hostName]);
                                  
                                  $scope.appNames[obj.appName][obj.hostName].totalRPM = obj.totalRPM;
                                   $scope.appNames[obj.appName][obj.hostName].hostname = obj.hostName;
                                  $scope.appNames[obj.appName][obj.hostName].totalResponseTime = obj.totalResponseTime;
                                  $scope.appNames[obj.appName][obj.hostName].granularRPM_keys=Object.keys(obj.granularRPM);
                                  $scope.appNames[obj.appName][obj.hostName].granularRPM_values=value;
    /*$scope.hosts[obj.appName][obj.hostName].push(obj.memory)*/
                                } else {
                                
                                  $scope.appNames[obj.appName][obj.hostName] = {
                                    totalRPM : obj.totalRPM,
                                    totalResponseTime : obj.totalResponseTime,
                                    granularRPM_keys : Object.keys(obj.granularRPM),
                                    granularRPM_values : value,
                                    hostname : obj.hostName

                                  }

                                //$scope.hosts[obj.appName][obj.hostName] = [obj.memory]
//                                 $scope.hosts[obj.appName][obj.hostName].values.push({time: obj.timeStamp, y: parseInt(obj.memory)})

                                
                                }
                              }
                              else {
                                $scope.appNames[obj.appName] = {};
                                $scope.hosts[obj.appName] = {};



                                $scope.appNames[obj.appName][obj.hostName] = {
                                    totalRPM : obj.totalRPM,
                                    totalResponseTime : obj.totalResponseTime,
                                    granularRPM_keys : Object.keys(obj.granularRPM),
                                    granularRPM_values : value,
                                    hostname : hostName
                                }

                                /*$scope.hosts[obj.appName][obj.hostName] = [obj.memory]      */    
                                
                              }
                              $scope.hostnamedata=$scope.appNames[$scope.value];

                              console.log($scope.hostnamedata);
              }
}]);


/*angular.module('app').factory('websocketService', function () {
        return {
            start: function (url,token, callback) {
                var websocket = new WebSocket(url + '?token=' + token);
                console.log(url + '?token:' + token);

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
)*/