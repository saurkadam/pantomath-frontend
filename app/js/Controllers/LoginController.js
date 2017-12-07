
//Page Controller  Design Pattern which is architectural pattern


angular.module('app').controller('LoginController', ['$rootScope','$scope','$location','$http', function($rootScope,$scope,$location,$http){
$scope.sessionvalue = false;
$scope.entry_counter='';
$scope.Timer=true;
$scope.regex="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
$rootScope.routes={};
$scope.configvalue=true;
if($scope.configvalue){
	$rootScope.routes.register='https://cryptic-garden-92681.herokuapp.com/register';
	$rootScope.routes.signin='https://cryptic-garden-92681.herokuapp.com/signin';
	$rootScope.routes.websocket='wss://cryptic-garden-92681.herokuapp.com/listeners';
	$rootScope.routes.key='https://cryptic-garden-92681.herokuapp.com/create-api-key';
	$rootScope.routes.GetPrediction = 'https://cryptic-garden-92681.herokuapp.com/predictions';
	$rootScope.routes.PastData = 'https://cryptic-garden-92681.herokuapp.com/month-data';
	$rootScope.routes.getKey='https://cryptic-garden-92681.herokuapp.com/get-api-key';
}
else{
	$rootScope.routes.register='https://192.168.43.136:8080/register';
	$rootScope.routes.signin='https://192.168.43.136:8080/signin';
	$rootScope.routes.websocket='wss://192.168.43.136:8080/listeners';
	$rootScope.routes.key='https://192.168.43.136:8080/create-api-key';
	$rootScope.routes.GetPrediction="";
}
$scope.sessionvalue=sessionmanager.valueChecker();
if($scope.sessionvalue){
	$rootScope.TokenVariable = $scope.sessionvalue;
	$location.path('/dashboard');
}





	$scope.CommonPoster=function(res,datavalue){

	data = datavalue;

		data.password=md5(data.password);	

			$.ajax(res,{
		   'data': JSON.stringify(data), //{action:'x',params:['a','b','c']}
		   'type': 'POST',
		   'processData': false,
		   'contentType': 'application/json',
		   'error' : function(r) {


		   				$scope.entry_counter=$scope.entry_counter+1;
		   				$scope.makeTrue(r.status);
		   				$scope.user.emailId="";
		   				$scope.user.password="";
		   				$scope.entry_counter=localStorage.getItem("bruteforceProtector");
		   				if($scope.entry_counter == undefined || $scope.entry_counter == '' || $scope.entry_counter == null || $scope.entry_counter == "NaN"){
		   					
		   					$scope.entry_counter=1;
		   					localStorage.setItem("bruteforceProtector", $scope.entry_counter.toString());	
		   				}
		   				else{
		   					$scope.entry_counter=parseInt($scope.entry_counter);
		   					$scope.entry_counter=$scope.entry_counter+1;
		   					if($scope.entry_counter > 3){
		   						$scope.bruteforceStopper();
		   					}
		   					else{
		   						localStorage.setItem("bruteforceProtector", $scope.entry_counter.toString());	
		   					}
		   					
		   				}

		   				
		   				

		   },
		   success : function(r) {
		   				r=JSON.parse(r);
		   				$rootScope.TokenVariable=r.token;
						
 						//var decorated = new DecoratedDetails(name,true,true,true);
			      		
		   				$scope.authenticated($rootScope.TokenVariable);


		   }	
		});
}

$scope.bruteforceStopper=function(){
	$scope.Timer=false;
	setTimeout(function(){ 
	$scope.entry_counter=0;
	localStorage.removeItem("bruteforceProtector");
	$scope.Timer=true; }, 15000);
}
	$scope.makeTrue = function(data){
		$scope.dataval=data;
		if($scope.dataval == 404){
			$scope.signinerror=true;	
		}
		else if($scope.dataval == 500){
			$scope.tryagain=true;
		}
		else if($scope.dataval == 400){
			$scope.errorcode=true;
		}		
		else{
			$scope.registererror=true;
		}
	}

	$scope.homeBtn = function(keyvalue){
	if($scope.Timer){
		$('#myModal').modal('toggle');
		$scope.signinerror=false;
		$scope.tryagain=false;
		$scope.registererror=false;

		if(keyvalue == "Register"){
			
			$scope.modal_title="Register";
			$scope.reg=true;
		}
		else{
			$scope.reg=false;
			$scope.modal_title="Sign In";
		}
	}		
	else{
			alert('Try after some time');
		}
	}
	$scope.authenticated=function(authenticated_value){
		if(authenticated_value){
			sessionmanager.storeSessionTimeout(authenticated_value,20);
			$scope.$apply($location.path("/dashboard"));
		}
	}

	
	$scope.submitForm = function(Userdata){
		

		
			$('.modal').modal('toggle');
			if (Userdata) {
	      	     	
	      	if($scope.reg == true){
				$scope.res = $rootScope.routes.register;
				$scope.CommonPoster($scope.res,Userdata);
				
	      	}
	      	else{
	      		
				$scope.res = $rootScope.routes.signin;
				$scope.CommonPoster($scope.res,Userdata);

	      		}	      	
	    	}			


	}


}]);