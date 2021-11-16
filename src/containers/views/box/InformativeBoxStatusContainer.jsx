import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  addElementToHome, printingStatusRequestValues, printingStatusSubscribe, printingStatusUnsubscribe,
  removeElementFromHome
} from '../../../redux/actions'

import InformativeRealtimeBox from '../../../layouts/box/informativeBox/InformativeTemperatureRealtimeBox';
import InformativeRealtimeStatusBox from "../../../layouts/box/informativeBox/InformativeRealtimeStatusBox";

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

/*
T0
 */
const mapStateToProps = (state, ownProps) => ({
  dataType: 'status',
  lastUpdate: state.printingStatus.lastUpdate,
  value: state.printingStatus.printingStatus,
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state))
});

const mapDispatchToProps = {
  addElementToHome,
  removeElementFromHome,
  subscription: printingStatusSubscribe,
  unsubscription: printingStatusUnsubscribe
};

export default connect(mapStateToProps, mapDispatchToProps)(InformativeRealtimeStatusBox);
