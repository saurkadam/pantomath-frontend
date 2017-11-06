angular.module('app').controller('LoginController', ['$rootScope','$scope','$location', function($rootScope,$scope,$location){

	$scope.homeBtn = function(keyvalue){
		if(keyvalue == "Register"){
			
			$scope.modal_title="Register";
			$scope.reg=true;
		}
		else{
			$scope.reg=false;
			$scope.modal_title="Sign In";
		}
	}
	$scope.submitForm = function(Userdata){
		if (Userdata) {
      		alert('our form is amazing');
      		console.log(Userdata);
      		

      		$location.path('/dashboard');
      		$('.modal').modal('toggle');
      	
    	}
	}
}])