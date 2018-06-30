/*global objects - do not remove */
appSelector = "#app";
app = {}
app.components = []


frango.app.handleChangingRoute(function(){

});

frango.app.initialize(function () {
    /*do things on initialize application*/
});

frango.app.afterInitialize(function () {
    /*do things after initialize application*/

});


function onDeviceReady() {
    // Now safe to use device APIs
}

document.addEventListener("deviceready", onDeviceReady, false);
