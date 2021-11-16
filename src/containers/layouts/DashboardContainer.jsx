import { connect } from 'react-redux';

import {
  shiftNotification, addNotification,
  setUserSubscribedToPushNotification,
  setServiceWorkerSubscription,
  setPushNotificationSupported,
  // serverStateFetch,
  webSocketOpen, webSocketClose
} from '../../redux/actions';

import App from '../../layouts/dashboard/Dashboard';

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications,
  serverState: state.serverState
});

const mapDispatchToProps = {
  addNotification,
  shiftNotification,
  setUserSubscribedToPushNotification,
  setServiceWorkerSubscription,
  setPushNotificationSupported,
  // serverStateFetch,
  webSocketOpen,
  webSocketClose
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default withStyles(dashboardStyle)(App);
