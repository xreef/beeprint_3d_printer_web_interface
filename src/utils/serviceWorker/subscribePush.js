export const checkPushNotificationSupport = (callBack) => {
    if ('PushManager' in window){
        console.log('Push is supported');
        callBack(
                    {
                        variant: "info",
                        message:"Push supported",
                        title:"Push supported",
                        exitStatus: true
                    }
                );
    }else{
        console.log('Push is not supported');
        callBack(
                    {
                        variant: "warning",
                        message:"Push is not supported",
                        title:"Push is not supported",
                        exitStatus: false
                    }
                );
    }
};

export const checkUserSubscribedToPushNotification = (registration, callBack) => {
    // navigator.serviceWorker.ready.then(function(registration) {
    registration.pushManager.getSubscription()
        .then((subscription) => {
            let isSubscribed = !(subscription === null);

            if (isSubscribed) {
                console.log('User is push notification subscribed.');
                callBack(
                            {
                                variant: "info",
                                message:"User is push notification subscribed.",
                                title:"User is push notification subscribed.",
                                exitStatus: true
                            }
                        );
            } else {
                console.log('User is push notification NOT subscribed.');
                callBack({
                            variant: "warning",
                            message:"User is push notification NOT subscribed.",
                            title:"User is push notification NOT subscribed.",
                            exitStatus: false
                        });
            }
        });
    // }
};

export const subscribePush = (callBack) => {
    navigator.serviceWorker.ready.then((registration) => {
        // ALREADY CHECKED
        // if (!registration.pushManager) {
        //     alert('Your browser doesn\'t support push notification.');
        //     return false;
        // }

        //To subscribe `push notification` from push manager
        registration.pushManager.subscribe({
            userVisibleOnly: true //Always show notification when received
        })
            .then( (subscription) => {
                console.info('Push notification subscribed.');
                console.log(subscription);

                callBack( {
                                exitStatus: true,
                                variant: 'success',
                                message: 'Subscribed successfully.',
                                title: 'Subscribed successfully.'
                            });
                //saveSubscriptionID(subscription);
                // this.setState({serviceWorker:{
                //         ...this.state.serviceWorker,
                //         isPushSubscribed: true
                //     }});

            })
            .catch((error) => {
                console.error('Push notification subscription error: ', error);

                if (error.code===0){
                    return {
                        exitStatus: false,
                        variant: 'warning',
                        message: 'You not allow notification'
                    };

                }else {
                    callBack( {
                        exitStatus: false,
                        variant: 'error',
                        message: 'Push notification subscription error: ' + error,
                        title: 'Push notification subscription error'
                    });
                }
            });
    })
};

// Unsubscribe the user from push notifications
export const unsubscribePush = (callBack) => {
    navigator.serviceWorker.ready
        .then((registration) => {
            //Get `push subscription`
            registration.pushManager.getSubscription()
                .then((subscription) => {
                    //If no `push subscription`, then return
                    if(!subscription) {
                        callBack( {
                                exitStatus: true,
                                variant: "warning",
                                message: 'Unable to unregister push notification, already unsubscribed.',
                                title: 'Unable to unregister push notification.'
                            });
                    }

                    //Unsubscribe `push notification`
                    subscription.unsubscribe()
                        .then(() => {
                            console.info('Push notification unsubscribed.');
                            console.log(subscription);

                            callBack( {
                                exitStatus: true,
                                variant: "success",
                                message: "Unsubscribed successfully.",
                                title: "Unsubscribed successfully."
                            });
                        })
                        .catch(function (error) {
                            console.error(error);

                            callBack( {
                                exitStatus: false,
                                variant: "error",
                                message: "Error on unsubscription of push notification "+error,
                                title: "Error on unsubscription of push notification."
                            });
                        });
                })
                .catch(function (error) {
                    console.error('Failed to unsubscribe push notification.');
                    callBack( {
                        exitStatus: false,
                        variant: "error",
                        message: "Error on unsubscription of push notification "+error,
                        title: "Error on unsubscription of push notification."
                    });
                });
        })
};
