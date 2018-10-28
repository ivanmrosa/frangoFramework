/* service worker */
if (window.location.pathname != '/frango-framework-build-app') {
    if ('serviceWorker' in navigator) {
        
        window.addEventListener('load', function(){
            if(frango.config.usePWA){
                navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
                    // Registration was successful
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }).catch(function (err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                });        
            };
        });
    };
};