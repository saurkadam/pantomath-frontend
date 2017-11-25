
//Page Controller  Design Pattern which is architectural pattern


angular.module('app').controller('LoginController', ['$rootScope','$scope','$location','$http', function($rootScope,$scope,$location,$http){

$rootScope.routes={};
$scope.configvalue=true;
if($scope.configvalue){
	$rootScope.routes.register='https://cryptic-garden-92681.herokuapp.com/register';
	$rootScope.routes.signin='https://cryptic-garden-92681.herokuapp.com/signin';
	$rootScope.routes.websocket='wss://cryptic-garden-92681.herokuapp.com/listeners';
	$rootScope.routes.key='https://cryptic-garden-92681.herokuapp.com/create-api-key';
}
else{
	$rootScope.routes.register='https://192.168.43.136:8080/register';
	$rootScope.routes.signin='https://192.168.43.136:8080/signin';
	$rootScope.routes.websocket='wss://192.168.43.136:8080/listeners';
	$rootScope.routes.key='https://192.168.43.136:8080/create-api-key';
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
		   	console.log(r)


		   				$scope.makeTrue(r.status);
		   				$scope.user.emailId="";
		   				$scope.user.password="";
		   				$rootScope.TokenVariable="";
		   				$scope.authenticated($rootScope.TokenVariable);

		   },
		   success : function(r) {
		   				r=JSON.parse(r);
		   				$rootScope.TokenVariable=r.token;

			      		
		   				$scope.authenticated($rootScope.TokenVariable);
		 				//$window.location.href="https://192.168.43.136:443/dashboard";
		 				//console.log($location.path());

		   }	
		});
}


	$scope.makeTrue = function(data){

		if(data == 404){
			$scope.signinerror=true;	
		}
		else if(data == 500){
			$scope.tryagain=true;
		}
		else if(data == 400){
			console.log("error");
		}		
		else{
			$scope.registererror=true;
		}
	}
	$scope.homeBtn = function(keyvalue){
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
	$scope.authenticated=function(authenticated_value){
		if(authenticated_value){
			$scope.$apply($location.path("/dashboard"));
		}
	}

	
	$scope.submitForm = function(Userdata){
		$('.modal').modal('toggle');
		if (Userdata) {
      	     	
      	if($scope.reg == true){
			var res = $rootScope.routes.register;
			$scope.CommonPoster(res,Userdata);
      	}
      	else{
      		
			var res = $rootScope.routes.signin;
			$scope.CommonPoster(res,Userdata);
      		}	      	
    	}
	}


}]);