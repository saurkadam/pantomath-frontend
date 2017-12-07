/*angular.module('app').factory('websocketService', function () {
        return {
            start: function (url,token, callback) {
                var websocket = new WebSocket(url + '?token=' + token);


                websocket.onopen = function () {

                };
                websocket.onclose = function (evt) {
                    
                };
                websocket.onerror = function(evt){

                };
                websocket.onmessage = function (evt) {

                    callback(evt);
                };
            }
        }
    }
)*/
angular.module('app').factory('websocketService', function () {
        return {
            start: function (url,token, callback) {
                var websocket = new WebSocket(url + '?token=' + token);
                console.log(url + '?token:' + token);

                websocket.onopen = function () {
              console.log("open");
                };
                websocket.onclose = function () {

                };
                websocket.onmessage = function (evt) {
                    callback(evt);
                };
            }
        }
    }
)