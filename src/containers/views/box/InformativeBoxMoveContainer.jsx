import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  addElementToHome, printingStatusRequestValues, printingStatusSubscribe, printingStatusUnsubscribe,
  removeElementFromHome, webSocketSendMessage
} from '../../../redux/actions';

import InformativeMoveBox from '../../../layouts/box/informativeBox/InformativeMoveBox';

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

/*
T0
 */
const mapStateToProps = (state, ownProps) => ({
  dataType: 'move',
  lastUpdate: state.printingStatus.lastUpdate,
  value: state.printingStatus.printingStatus,
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state)),
  inputEnabled: state.printingStatus.printingStatus === 'IDLE'
});

const mapDispatchToProps = {
  addElementToHome,
  removeElementFromHome,
  subscription: printingStatusSubscribe,
  unsubscription: printingStatusUnsubscribe,
  webSocketSendMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(InformativeMoveBox);
