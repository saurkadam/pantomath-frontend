describe('LoginController', function() {
	beforeEach(module('app'));
    
    var scope, $location, httpBackend, createController;

    beforeEach(inject(function(_$rootScope_, $httpBackend, _$controller_, _$location_) {
        $controller = _$controller_;
    	$rootScope = _$rootScope_;
        httpBackend = $httpBackend;
        $location = _$location_;

    }));
    it('Testing variables',function(){
    	    var $scope = $rootScope.$new();
      		var controller = $controller('LoginController', { $scope: $scope });
    		expect($rootScope.routes.register).not.toBeNull();
    		expect($rootScope.routes.signin).not.toBeNull();
    		expect($rootScope.routes.websocket).not.toBeNull();
    		expect($rootScope.routes.key).not.toBeNull();
    		expect($rootScope.routes.GetPrediction).not.toBeNull();
    		expect($rootScope.routes.PastData).not.toBeNull();
    		expect($scope.configvalue).toBeTruthy(); 
    });

    it('Should check whether the button clicked is register or signIn and reg value is true or false', function(){
      		var $scope = $rootScope.$new();
      		var controller = $controller('LoginController', { $scope: $scope });
    		it("value is Register",function(){
	     		$scope.homeBtn("Register");
	    		expect($scope.modal_title).toEqual('Register');
	    		expect($scope.reg).toBeTruthy();   			
    		});
    		it("value is Sign In",function(){
	     		$scope.homeBtn("Sign In");
	    		expect($scope.modal_title).toEqual('Sign In');
	    		expect($scope.reg).toBeTruthy();   			
    		});
    		

    });
    it('authentication test case', function(){
      		var $scope = $rootScope.$new();
      		var controller = $controller('LoginController', { $scope: $scope });

      		$scope.authenticated("123");
	        expect($location.path()).toBe('/dashboard');

    		

    });
    it('authentication test case', function(){
      		var $scope = $rootScope.$new();
      		var controller = $controller('LoginController', { $scope: $scope });

      		$scope.authenticated("123");
	        expect($location.path()).toBe('/dashboard');

    		

    });
    it('Error Checker test case', function(){
      		var $scope = $rootScope.$new();
      		var controller = $controller('LoginController', { $scope: $scope });
	      	it("error code is 404",function(){
		     	$scope.makeTrue(404);
	      		expect($scope.dataval).toBe(404);
	      		expect($scope.signinerror).toBeTruthy();
			});
	      		
	      	it("error code is 500",function(){
			     	$scope.makeTrue(500);
		      		expect($scope.dataval).toBe(500);
		      		expect($scope.tryagain).toBeTruthy();
			});
	      	it("error code is 400",function(){
			     	$scope.makeTrue(400);
		      		expect($scope.dataval).toBe(400);
		      		expect($scope.errorcode).toBeTruthy();
			});
		  	it("error code is 700",function(){
			     	$scope.makeTrue(700);
		      		expect($scope.dataval).toBe(700);
		      		expect($scope.registererror).toBeTruthy();
			}); 				

    });
    it('submitForm test function', function(){
      		var $scope = $rootScope.$new();
      		var controller = $controller('LoginController', { $scope: $scope });
	    		Userdata = {
	    			"emailid":"abc@gmail.com",
	    			"password":"password123"
	    		};
	    		it("Register",function(){
		    		$scope.route.register="https://cryptic-garden-92681.herokuapp.com/register";
			     	$scope.submitForm(Userdata);
		      		expect(Userdata).not.toBeDefined(); 
		      		expect($scope.reg).toBe("https://cryptic-garden-92681.herokuapp.com/register");
		      		spyOn($scope, 'CommonPoster').andCallThrough();	
	    		});

	    		it("Register",function(){
		    		$scope.route.signin="https://cryptic-garden-92681.herokuapp.com/signin";
			     	$scope.submitForm(Userdata);
		      		expect(Userdata).not.toBeDefined(); 
		      		expect($scope.reg).toBe($scope.route.register);
		      		spyOn($scope, 'CommonPoster').andCallThrough();	
	    		});
	    		

	      		
				

    });

    it('Common Poster Function', function(){
      		var $scope = $rootScope.$new();
      		var controller = $controller('LoginController', { $scope: $scope });
	    		Userdata = {
	    			"emailid":"abc@gmail.com",
	    			"password":"password123"
	    		};
	    		$scope.data=null;
	    		$rootScope.TokenVariable = undefined;
	    		var res = "https://cryptic-garden-92681.herokuapp.com/register";
	    		spyOn($scope, 'CommonPoster');	




    });


});