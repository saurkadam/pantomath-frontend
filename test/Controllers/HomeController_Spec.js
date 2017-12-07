



describe('HomeController', function() {
    beforeEach(module('app'));
    
    var $location,$rootScope,websocketService,$controller;

    beforeEach(inject(function(_$rootScope_,_$controller_,_$location_,_websocketService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        modal = jasmine.createSpyObj('modal', ['show', 'hide']);
        $location = _$location_;
        websocketService = _websocketService_;

    }));

        it('Testing variables',function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });
            expect($scope.appNames).toBeDefined();
            expect($scope.clientappName).toBeDefined();
            expect($scope.clienteventappName).toBeDefined();
            expect($scope.hosts).toBeDefined();
            expect($scope.ObjCollector).toBeDefined();
            expect($scope.PageDetailsArr).toBeDefined();
            expect($scope.ClickEventDatavalue).toBeDefined();
            expect($scope.ClientAppData).toBeDefined();
            expect($scope.pageInfodata).toBeDefined();
            expect($scope.btneventdatavalue).toBeDefined();
            expect($scope.server).toBeFalsy();
            expect($scope.client).toBeFalsy();
            expect($scope.past).toBeFalsy();
            expect($scope.btnData).toBeDefined();
            expect($scope.Clientvalue).toBeDefined();
            expect($scope.appPredicatioName).toBeDefined();
            expect($scope.apikey).toBeDefined();
            expect($scope.secret).toBeDefined();

    	});

    	it('appName function',function(){
    		var $scope = $rootScope.$new();
      		var controller = $controller('HomeController', { $scope: $scope });		
      		$scope.appNameData('data','123','556');
    	//	expect($scope.hostnamedata).toBeDefined();
    		expect($scope.value).toBeDefined();
            expect($scope.Clientvalue).toBeDefined();
            
    	});
        it('Sign out function', function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });
            $scope.signout();
            spyOn(sessionmanager,"Destroy");
            expect($location.path()).toBe('/');            
        });
        it("generate Key", function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });
            var value="ABC";
            spyOn($scope,"generateKey");
            //expect($scope.Key_Generated_Data).toBeDefined();
        });
        it("Prediction function", function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });
            var value="ABC";
            spyOn($scope,"getPredictions");
            //expect($scope.Key_Generated_Data).toBeDefined();
        });
        it("pageInfochecker function", function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });
            var obj={
                name:"abc"
            };
            $scope.pageInfoChecker(obj);
            expect($scope.pageInfo).toBeDefined();
        });

        it("pageInfochecker function", function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });
            var obj={
                name:"abc"
            };
            $scope.pageInfoChecker(obj);
            expect($scope.pageInfo).toBeDefined();
        });
        it("ClicKEventData function", function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });
            var obj={
                name:"abc"
            };
            $scope.ClicKEventData(obj);
            expect($scope.btncollector).toBeDefined();
        });

        it("JsfilesChecker function", function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });
            var obj={
                name:"abc"
            };
            spyOn($scope, "JsfilesChecker");

        });
/*        xit("should spy and callFake WebSocket constructor, and stub prototype methods", function () {
            var realWS= websocketService;  
            spyOn(realWS, "start");
        });*/
    	it('health function',function(){
    		var $scope = $rootScope.$new();
      		var controller = $controller('HomeController', { $scope: $scope });		
            var obj1={name:"data"};
            $scope.health(obj1);
            expect($scope.hostnamedata).not.toBeNull();         

    		
    	});
    	it('request function',function(){

    		var $scope = $rootScope.$new();
      		var controller = $controller('HomeController', { $scope: $scope });		
      		var obj1={name:"data"};
            spyOn($scope, "request");
    		
    	});
     
        it('identifierRPM function',function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });     
           
            spyOn($scope, "identifierRPM");

        });
           
        it('identifierGRT function',function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });     
            
            spyOn($scope, "identifierRPM");

        });

        it('pastDataServer function',function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });     

            var obj={
                name:"ABC"
            };
            $scope.pastDataServer(obj);
            expect($scope.data_memory).not.toBeNull();
            expect($scope.data_cpu).not.toBeNull();
            expect($scope.labels_data).not.toBeNull();
            

        });
        it('getPastData function',function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });     
            
            spyOn($scope, "getPastData");

        });
       it('getPastData function',function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });     
            
            spyOn($scope, "seeCred");

        });
       it('getApiKey function',function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });     
            
            spyOn($scope, "getApiKey");

        });
        it('pastDataServer function',function(){
            var $scope = $rootScope.$new();
            var controller = $controller('HomeController', { $scope: $scope });     

            var obj={
                name:"ABC"
            };
            $scope.pastClicks(obj);
            expect($scope.series_btnclicks).not.toBeNull();
            expect($scope.labels_btnclicks).not.toBeNull();
            expect($scope.data_btnclicks).not.toBeNull();
            

        });


});
