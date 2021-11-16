export const addToHomeScreen = (deferredPrompt, callBack) => {
    // let {deferredPrompt} = this.state.serviceWorker;
    deferredPrompt.prompt();  // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then(function(choiceResult){
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted to install app');

            callBack( {
                exitStatus: true,
                variant: 'success',
                message: 'User accepted to install app',
                title: 'User accepted to install app'
            });
        } else {
            console.log('User not accepted to install app');

            callBack( {
                exitStatus: false,
                variant: 'warning',
                message: 'User not accepted to install app',
                title: 'User not accepted to install app'
            });
        }
        // deferredPrompt = null;
    });
};
