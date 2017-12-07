describe("Analyzer", function(){
	

		it(" main function", function(){
			var API_KEY=123;
	        var API_SECRET=567;
	        var Appname='data';
		    var Analyzer = function (API_Secret,API_KEY,Appname,Token) {
	        expect(API_SECRET).toBe(567);
	        expect(API_KEY).toBe(123);
	        expect(Appname).toBe('data');
	        expect(files).not.toBeNull();
	    	expect(data_resources).not.toBeNull();
	    }
	});
	  	it("function value",function(){
			var app="data";
		     var DecoratedDetails = function(app,appDetails,EachPage) {

	         expect(appDetails).toBeTruthy();
	         expect(EachPage).toBeTruthy();
	    }
	    });
	  	it("function value",function(){
			var name="abc";
		     var BTN_eventSender=function(name){

	         expect(event_Data).toBe(name);

		    }
	    });


	
});