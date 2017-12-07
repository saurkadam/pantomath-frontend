describe('Testing Routes', function() {
	beforeEach(module('app'));
    
    var rootScope, location, route;

    beforeEach(inject(function(_$rootScope_,_$route_, _$location_) {
    	rootScope = _$rootScope_;
        route = _$route_;
        location = _$location_;

    }));
    describe('dashboard Page', function(){

        it('should load the login page on successful load of /login', function() {
            location.path('/dashboard');
            rootScope.$digest();
            expect(route.current.controller).toBe('HomeController');
        });
    });

});