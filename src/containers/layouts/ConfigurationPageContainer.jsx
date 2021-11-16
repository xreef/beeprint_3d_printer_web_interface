import { connect } from 'react-redux';

import {
  configurationFetch,
  configurationAdd,
  addNotification,
  configurationFieldUpdated
} from '../../redux/actions';

import ConfigurationPage from '../../layouts/configuration/ConfigurationPage';

const mapStateToProps = (state, ownProps) => ({
  configuration: state.configuration.data,
  isFetching: state.configuration.isFetching
});

const mapDispatchToProps = {
  configurationFetch,
  configurationAdd,
  configurationFieldUpdated,
  addNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage);
