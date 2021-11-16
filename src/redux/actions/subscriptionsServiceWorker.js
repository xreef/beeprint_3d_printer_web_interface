export const key = 'subscriptionsServiceWorker';

// action type constants
export const SET_SUBSCRIPTION_SERVICE_WORKER = 'SET_SUBSCRIPTION_SERVICE_WORKER';
export const SET_PUSH_NOTIFICATION_IS_SUPPORTED = 'SET_PUSH_NOTIFICATION_IS_SUPPORTED';
export const SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION = 'SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION';

export const actionTypes = {
    SET_SUBSCRIPTION_SERVICE_WORKER,
    SET_PUSH_NOTIFICATION_IS_SUPPORTED,
    SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION
};


export const setServiceWorkerSubscription = (isServiceWorkerSubscribed, registration) => ({
    type: SET_SUBSCRIPTION_SERVICE_WORKER,
    isServiceWorkerSubscribed: isServiceWorkerSubscribed,
    registration: registration
});

export const setPushNotificationSupported = (isPushNotificationSupported) => ({
    type: SET_PUSH_NOTIFICATION_IS_SUPPORTED,
    isPushNotificationSupported: isPushNotificationSupported
});

export const setUserSubscribedToPushNotification = (isUserSubscribedToPushNotification) => ({
    type: SET_USER_SUBSCRIBED_TO_PUSH_NOTIFICATION,
    isUserSubscribedToPushNotification: isUserSubscribedToPushNotification
});





