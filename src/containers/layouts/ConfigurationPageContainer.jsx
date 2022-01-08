import { connect } from 'react-redux';

import {
  configurationFetch,
  configurationAdd,
  addNotification,
  configurationFieldUpdated,

  configurationServerFetch,
  configurationServerAdd,
  configurationServerFieldUpdated
} from '../../redux/actions';

import ConfigurationPage from '../../layouts/configuration/ConfigurationPage';

const mapStateToProps = (state, ownProps) => ({
  configuration: state.configuration.data,
  configurationServer: state.configurationServer.data,
  isFetching: state.configuration.isFetching,
  version: state.version
});

const mapDispatchToProps = {
  configurationFetch,
  configurationAdd,
  configurationFieldUpdated,
  addNotification,

  configurationServerFetch,
  configurationServerAdd,
  configurationServerFieldUpdated
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage);
