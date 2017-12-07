var sessionmanager = (function(){

	var localStore = function(data,interval){
		var value=[];

		var getCurrentTime = new Date();
		getCurrentTime.setMinutes(getCurrentTime.getMinutes() + interval);
		value.push(data);
		value.push(getCurrentTime);

		try{
			localStorage.setItem("SessionSaver", value.join(";"))
		}catch(e){

		}

	}

	var DestroySession=function(){
		localStorage.removeItem("SessionSaver");
	}


	var checker=function(){

		if(localStorage.getItem("SessionSaver")){
			if(localStorage.getItem("SessionSaver").length > 0){
				var valueData=localStorage.getItem("SessionSaver").split(";");
				var e=Date.parse(valueData[1]);

				var d=new Date();
				d = d.getTime();
				if(e < d){
					localStorage.removeItem(0);
				}
				if(localStorage.length == 0){
					DestroySession();
					return false;
				}	
				else{
						
					return valueData[0];
				}		
				
			}			
		}

	}
	return{
		storeSessionTimeout:function(data,interval){
			localStore(data,interval);
		},
		valueChecker:checker,
		Destroy:DestroySession

	};
})();

