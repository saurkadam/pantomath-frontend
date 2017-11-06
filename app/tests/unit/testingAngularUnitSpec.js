describe('Testing AngularJs testing suite', function(){

	beforeEach(module('app'));

	describe('Testing AngularJs Controller', function(){
			var scope = {};
			var ctrl;			
		beforeEach(inject(function($controller,$rootScope){
				scope=$rootScope.$new();
				ctrl = $controller('testingAngularCtrl', {$scope:scope});
			}));



		it('should initialize title in the scope', function(){
			expect(scope.title).toBeDefined();
			expect(scope.title).toBe("Testing angular application");
		});
	});
});