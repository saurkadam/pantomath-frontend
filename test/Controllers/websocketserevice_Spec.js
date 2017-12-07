describe('WebsocketService', function() {
	var websocketService;
	beforeEach(module('app'));


    beforeEach(inject(function(_websocketService_) {

        websocketService = _websocketService_;

       
    }));
    it('WebsocketService tested ', function () {

        
        spyOn(websocketService, "start");
        
    });

});