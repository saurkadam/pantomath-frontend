angular.module('app').controller('HomeController', ['$rootScope','$scope', 'websocketService','$location', function($rootScope,$scope,websocketService,$location){
        $scope.appNames = {};
        $scope.clientappName={};
        $scope.clienteventappName={};
        $scope.hosts = {};
        $scope.ObjCollector={};
        $scope.PageDetailsArr=[];
        $scope.ClickEventDatavalue=[];
        $scope.ClientAppData = {};
        $scope.BtnEventAppData={};
       $scope.pageInfodata=[];
       $scope.btneventdatavalue=[];
        $scope.server=false;
       $scope.client=false;
       $scope.past=false;
        $scope.btnData={};
        $scope.Clientvalue='';
        $scope.appPredicatioName='';
        $scope.apikey='';
         $scope.secret='';
$scope.getApiKey=function(){
$scope.sessionvalue=sessionmanager.valueChecker();
if($scope.sessionvalue){
  if($rootScope.routes == undefined){
     $rootScope.routes={};
  }
  $rootScope.TokenVariable=$scope.sessionvalue;
  $rootScope.routes.register='https://cryptic-garden-92681.herokuapp.com/register';
  $rootScope.routes.signin='https://cryptic-garden-92681.herokuapp.com/signin';
  $rootScope.routes.websocket='wss://cryptic-garden-92681.herokuapp.com/listeners';
  $rootScope.routes.key='https://cryptic-garden-92681.herokuapp.com/create-api-key';
  $rootScope.routes.GetPrediction = 'https://cryptic-garden-92681.herokuapp.com/predictions';
  $rootScope.routes.PastData = 'https://cryptic-garden-92681.herokuapp.com/month-data';
  $rootScope.routes.getKey='https://cryptic-garden-92681.herokuapp.com/get-api-key';
}

          $.ajax({
          url: $rootScope.routes.getKey,
          type: 'GET',
          headers: {'token': $rootScope.TokenVariable,'keyType':'1'},
          success: function(data){ 
              $scope.Key_Generated_Data  = JSON.parse(data);
            if($scope.Key_Generated_Data){
              $scope.apikey=$scope.Key_Generated_Data.apiKey;
              $scope.secret=$scope.Key_Generated_Data.ApiSecret;           
            }
          },
          error: function(data) {

          }
      });

}

window.onbeforeunload = Refresher;
function Refresher(){
  $location.path('/');
}
$scope.getApiKey();
$scope.appNameData=function(value,data,identifier){
      $scope.appPredicatioName=value;
    
     if(identifier == "client"){
      $scope.identifiervalue=0;
      $scope.predictionbutton='';

       $scope.server=false;
       $scope.past=false;
       $scope.client=true;
       $scope.past_client=true;
       $scope.past_server=false;
       $scope.Clientvalue=value;
      }
     else{
      $scope.predictionbutton='ABC';
      $scope.identifiervalue=1;
       $scope.server=true;
       $scope.past_client=false;
       $scope.past_server=true;
       $scope.past=false;
       $scope.client=false;
       $scope.value = value;
     }

}

$scope.signout=function(){
  $rootScope.TokenVariable='';
  sessionmanager.Destroy();
  $location.path('/');
}
$scope.seeCred=function(){
    if($scope.apikey && $scope.secret){
        $("#KeyGenModal").modal(); 
      }
      else{
        alert("Generate Credentials");
      }
}
$scope.generateKey=function(value){
var x = confirm("Are you sure you want to generate new Credentials?");
if (x) {
          $.ajax({
          url: $rootScope.routes.key,
          type: 'GET',
          headers: {'token': $rootScope.TokenVariable,'keyType':'1'},
          success: function(data){ 
              $scope.Key_Generated_Data  = JSON.parse(data);
            if($scope.Key_Generated_Data){
              $scope.$apply($scope.apikey=$scope.Key_Generated_Data.apiKey);
              $scope.$apply($scope.secret=$scope.Key_Generated_Data.ApiSecret);
                $("#KeyGenModal").modal(); 
           
            }
          },
          error: function(data) {
              if(data.status == 401){
                alert("Session Expired");
                $scope.signout();
              } //or whatever
          }
      });
  }
}

 $scope.pageInfoChecker=function(obj){

        if($scope.clientappName[obj.appName]){
          if($scope.clientappName[obj.appName][obj.cmd]){

              $scope.clientappName[obj.appName][obj.cmd].pageName = obj.pageName;
              $scope.clientappName[obj.appName][obj.cmd].pageLoadTime = obj.pageLoadTime;
              $scope.clientappName[obj.appName][obj.cmd].pageConnectTime=obj.pageConnectTime;
              $scope.clientappName[obj.appName][obj.cmd].pageRenderTime=obj.pageRenderTime;
              $scope.clientappName[obj.appName][obj.cmd].count=obj.count;
           //   $scope.clientappName[obj.appName][$scope.clientappName[obj.appName].cmd].identifier="Client";
                
          }
          else{
              $scope.clientappName[obj.appName][obj.cmd]={
              pageName : obj.pageName,
              pageLoadTime : obj.pageLoadTime,
              pageConnectTime : obj.pageConnectTime,
              pageRenderTime : obj.pageRenderTime,
              count : obj.count
             // identifier : "Client"            
            };
          }
        }
        else{
          $scope.clientappName[obj.appName] = {};
          $scope.clientappName[obj.appName][obj.cmd]={
            pageName : obj.pageName,
            pageLoadTime : obj.pageLoadTime,
            pageConnectTime : obj.pageConnectTime,
            pageRenderTime : obj.pageRenderTime,
            count : obj.count
            //identifier : "Client"
          };

        }
        if($scope.Clientvalue != ''){
            $scope.ClientAppData = $scope.clientappName[$scope.Clientvalue].pageInfo;
             $scope.pageInfodata.push($scope.ClientAppData);
        }
         $scope.pageInfo=[];
        $scope.pageInfo.push($scope.clientappName[obj.appName]["pageInfo"]);


 }

 $scope.ClicKEventData=function(obj){

        if($scope.clientappName[obj.appName]){
          if($scope.clientappName[obj.appName][obj.cmd]){
            
              $scope.clientappName[obj.appName][obj.cmd][obj.event] = obj.count;    
        }
        else{
          
          $scope.clientappName[obj.appName][obj.cmd] = {};
          $scope.clientappName[obj.appName][obj.cmd][obj.event]=obj.count;

        }
      }
      else{
        var g=obj.event;
          $scope.clientappName[obj.appName] = {};
          $scope.clientappName[obj.appName][obj.cmd] = {};
          $scope.clientappName[obj.appName][obj.cmd][obj.event]=obj.count;
        }

       $scope.btncollector=[];
       $scope.btncollector.push($scope.clientappName[obj.appName]["clicks"]);
       console.log($scope.btncollector);
 }
 $scope.JsfilesChecker=function(obj){

        if($scope.clientappName[obj.appName]){
          if($scope.clientappName[obj.appName][obj.cmd]){
            
              $scope.clientappName[obj.appName][obj.cmd] = obj.componentDetails;    
        }
        else{
          
          $scope.clientappName[obj.appName][obj.cmd] = {};
          $scope.clientappName[obj.appName][obj.cmd]=obj.componentDetails;

        }
      }
      else{

          $scope.clientappName[obj.appName] = {};
          $scope.clientappName[obj.appName][obj.cmd] = {};
          $scope.clientappName[obj.appName][obj.cmd]=obj.componentDetails;
        }

       $scope.FileCollector=[];
       for(var i=0;i<$scope.clientappName[obj.appName][obj.cmd].length;i++){
            $scope.FileCollector.push($scope.clientappName[obj.appName][obj.cmd][i]);
       }
       
    
   //  $scope.ClientAppData = $scope.clientappName[$scope.Clientvalue];

 }

$scope.pastClicks=function(obj){



  $scope.series_btnclicks = [];
   $scope.data_btnclicks=[];
   $scope.labels_btnclicks=[];
   var w=[];
  var arrchecker=[];

  for(var i=0;i<obj.length;i++){
      if(!_.contains($scope.series_btnclicks, obj[i].eventName)){
        $scope.series_btnclicks.push(obj[i].eventName);
      }
    }
    for(var i=0;i<obj.length;i++){
      if(!_.contains($scope.labels_btnclicks, obj[i].day)){
        $scope.labels_btnclicks.push(obj[i].day);
      }
    }

for(var j=0;j<$scope.series_btnclicks.length;j++){
  for(var k=0;k<obj.length;k++){
    if(obj[k].eventName == $scope.series_btnclicks[j]){
      w.push(obj[k].clicks);

    }
  }
  $scope.data_btnclicks.push(w);
  w=[];
}

  

  $scope.optionsbar = {
    legend: { 
      display: true },
    responsive: true,
    zoom: {
      enabled: true,
      mode: 'x'
     },
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Clicks'
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'days'
      }
    }]
  }
   };


}
$scope.pastDataServer=function(obj){

   $scope.data_memory=[];
   $scope.data_cpu=[];
   $scope.labels_data=[];
   $scope.series_memory=['Memory'];
   for(var i=0;i<obj.length;i++){
        $scope.labels_data.push("day" + (obj[i].day).toString());
        $scope.data_memory.push(obj[i].memory);
        $scope.data_cpu.push(obj[i].cpu);
   }
   $scope.optionsservercpu = {
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Percentage'
      }
    }]
  }
}
   $scope.optionsservermem = {
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Mb'
      }
    }]
  }
}

}




$scope.getPastData=function(Appname,identifier){

        $.ajax({
          url: $rootScope.routes.PastData,
          headers: {'token': $rootScope.TokenVariable, 'appName' : Appname, 'keyType' : identifier },
          method: 'GET',
          contentType: "application/json",
          success: function(data){ 
               $scope.pastData = JSON.parse(data);

            if($scope.pastData){
                    if(identifier == 0){
                       $scope.pastClicks($scope.pastData);
                    }
                    else{
                      $scope.pastDataServer($scope.pastData);
                    }
                        $scope.server=false;
                        $scope.client=false;
                        $scope.past=true;           
            }
          },
          error: function(data) {
              if(data.status == 401){
                alert("Session Expired");
                $scope.signout();
              } //or whatever
          }
      });

     

     








}



$scope.getPredictions=function(appName){


      $.ajax({
          url: $rootScope.routes.GetPrediction,
          headers: {'token': $rootScope.TokenVariable, 'appName' : appName},
          method: 'GET',
          contentType: "application/json",
          success: function(data){ 
               $scope.predictedData = JSON.parse(data);
            if($scope.predictedData){
                $("#Predictor_request_data").modal(); 
           
            }
          },
          error: function(data) {
              if(data.status == 401){
                alert("Session Expired");
                $scope.signout();
              } //or whatever
          }
      });


}



    websocketService.start($rootScope.routes.websocket, $rootScope.TokenVariable, function (evt) {
         var obj = JSON.parse(evt.data);


           $scope.$apply(function () {




              switch (obj.cmd) {
                  case 'health':
                              $scope.health(obj);                                 
                      break;
                  case 'request':
                              $scope.request(obj);             
                      break;
                  case 'clicks':

                               $scope.ClicKEventData(obj);
                      break;
                  case 'pageInfo':

                              $scope.pageInfoChecker(obj);
                      break;
                  case 'componentInfo':
                              $scope.JsfilesChecker(obj);
                      break;
                  default:

              }
              //$scope.hostname=obj.hostname;
              
          }); 
        
        
    });


  $scope.identifierRPM=function(title,keys,values){


    $scope.modal_tile_dashboard_Response_Per_Minute=title;
    $scope.modal_data_keys_Response_Per_Minute=keys;
    $scope.modal_data_values_Response_Per_Minute=values;
  $("#Response_Per_Minute").modal(); 
}
  $scope.identifierGRT=function(title,keys,values){


    $scope.modal_tile_dashboard_Granular_Response_Time=title;
    $scope.modal_data_keys_Granular_Response_Time=keys;
    $scope.modal_data_values_Granular_Response_Time=values;
  $("#Granular_Response_Time").modal(); 
}




$scope.health=function(obj){

                                if ($scope.appNames[obj.appName]) {
                                  if ($scope.appNames[obj.appName][obj.hostName]) {
                                    $scope.appNames[obj.appName][obj.hostName].memory = obj.memory;
                                    $scope.appNames[obj.appName][obj.hostName].cpu = obj.cpu;
                                    $scope.appNames[obj.appName][obj.hostName].hostname=obj.hostName;
                                    $scope.appNames[obj.appName][obj.hostName].appname=obj.appName;
                                    $scope.appNames[obj.appName][obj.hostName].identifier="Server";
                                    $scope.appNames[obj.appName][obj.hostName].uptime=obj.uptime;
                                    $scope.appNames[obj.appName][obj.hostName].osuptime=obj.osuptime;
                                    $scope.appNames[obj.appName][obj.hostName].freemem=obj.freemem;
                                    $scope.appNames[obj.appName][obj.hostName].totalmem=obj.totalmem;
                                  } 
                                  else {                                
                                    $scope.appNames[obj.appName][obj.hostName] = {
                                    memory : obj.memory,
                                    cpu : obj.cpu,
                                    hostname : obj.hostName,
                                    appname : obj.appName,
                                    identifier : "Server",
                                    uptime : obj.uptime,
                                    osuptime : obj.osuptime,
                                    freemem : obj.freemem,
                                    totalmem : obj.totalmem
                                  }

                              
                                
                                }
                              }
                              else {
                                $scope.appNames[obj.appName] = {};
                                $scope.hosts[obj.appName] = {};
                                $scope.appNames[obj.appName][obj.hostName] = {
                                    memory : obj.memory,
                                    cpu : obj.cpu,
                                    hostname : obj.hostName,
                                    appname : obj.appName,
                                    identifier : "Server",
                                    uptime : obj.uptime,
                                    osuptime : obj.osuptime,
                                    freemem : obj.freemem,
                                    totalmem : obj.totalmem

                                }          
                              }

                                $scope.hostnamedata=$scope.appNames[$scope.value];

              }

              $scope.request=function(obj){

                                 if(obj.granularRPM != undefined){
                                    var value=[];  
                                      
                                    for(var key in obj.granularRPM) {
                                      value.push(obj.granularRPM[key]);
                                    }
                                  }
                                 if(obj.granularResponseTime != undefined){
                                    var valueResponseTime=[];  
                                      
                                    for(var key in obj.granularResponseTime) {
                                      valueResponseTime.push(obj.granularResponseTime[key]);
                                    }
                                  }
                                if ($scope.appNames[obj.appName]) {

                                if ($scope.appNames[obj.appName][obj.hostName]) {
                                  $scope.appNames[obj.appName][obj.hostName].totalRPM = obj.totalRPM;
                                  $scope.appNames[obj.appName][obj.hostName].hostname = obj.hostName;
                                  $scope.appNames[obj.appName][obj.hostName].appname =  obj.appName
                                  $scope.appNames[obj.appName][obj.hostName].totalResponseTime = obj.totalResponseTime;
                                  $scope.appNames[obj.appName][obj.hostName].granularRPM_keys=Object.keys(obj.granularRPM);
                                  $scope.appNames[obj.appName][obj.hostName].granularRPM_values=value;
                                  $scope.appNames[obj.appName][obj.hostName].granularResponseTime=Object.keys(obj.granularResponseTime);
                                  $scope.appNames[obj.appName][obj.hostName].granularResponseTimevalues=valueResponseTime;
                                  $scope.appNames[obj.appName][obj.hostName].identifier = "Server";
                                  $scope.appNames[obj.appName][obj.hostName].uptime=obj.uptime;
                                  $scope.appNames[obj.appName][obj.hostName].osuptime=obj.osuptime;
                                  $scope.appNames[obj.appName][obj.hostName].freemem=obj.freemem;
                                  $scope.appNames[obj.appName][obj.hostName].totalmem=obj.totalmem;
                                } else {
                                
                                  $scope.appNames[obj.appName][obj.hostName] = {
                                    totalRPM : obj.totalRPM,
                                    totalResponseTime : obj.totalResponseTime,
                                    granularRPM_keys : Object.keys(obj.granularRPM),
                                    granularRPM_values : value,
                                    hostname : obj.hostName,
                                    granularResponseTime : Object.keys(obj.granularResponseTime),
                                    granularResponseTimevalues : valueResponseTime,
                                    appname : obj.appName,
                                    identifier : "Server",
                                    uptime : obj.uptime,
                                    osuptime : obj.osuptime,
                                    freemem : obj.freemem,
                                    totalmem : obj.totalmem
                                  }
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
                                    hostname : obj.hostName,
                                    granularResponseTime : Object.keys(obj.granularResponseTime),
                                    granularResponseTimevalues : valueResponseTime,
                                    appname : obj.appName,
                                    identifier : "Server",
                                    uptime : obj.uptime,
                                    osuptime : obj.osuptime,
                                    freemem : obj.freemem,
                                    totalmem : obj.totalmem
                                } 
                              }
                              $scope.hostnamedata=$scope.appNames[$scope.value];

              }
}]);

