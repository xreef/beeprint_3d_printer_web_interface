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
  dataType: 'bed',
  tool: 'Bed',
  lastUpdate: state.temperatures.lastUpdate,
  value: state.temperatures.B,
  valueTarget: state.temperatures.BTarget,
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
