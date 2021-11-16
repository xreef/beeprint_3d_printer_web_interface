import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  addElementToHome,
  removeElementFromHome,
  webSocketSendMessage,
  addNotification
} from '../../../redux/actions';

import InformativeRealtimeBox from '../../../layouts/box/informativeBox/InformativeTemperatureRealtimeBox';
import InformativeTemperatureRealtimeBox from '../../../layouts/box/informativeBox/InformativeTemperatureRealtimeBox'

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

/*
T0
 */
const mapStateToProps = (state, ownProps) => ({
  dataType: 'T0Temp',
  tool: 'T0',
  lastUpdate: state.temperatures.lastUpdate,
  value: state.temperatures.T0,
  valueTarget: state.temperatures.T0Target,

  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state)),
  inputEnabled: state.printingStatus.printingStatus === 'IDLE'
});

const mapDispatchToProps = {
  addElementToHome,
  removeElementFromHome,
  webSocketSendMessage,
  addNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(InformativeTemperatureRealtimeBox);
