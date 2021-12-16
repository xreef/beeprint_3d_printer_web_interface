import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';
import { selectors as fileListSelector } from '../../../redux/reducers/fileList';

import {
  addElementToHome,
  removeElementFromHome,
  webSocketSendMessage,
  addNotification, printingStatusSubscribe, printingStatusUnsubscribe
} from '../../../redux/actions'

import GCodeEditor from '../../../layouts/box/inputBox/GCodeEditor'

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

/*
T0
 */
const mapStateToProps = (state, ownProps) => ({
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state)),
  inputEnabled: state.printingStatus.printingStatus === 'IDLE',
  isFetching: state.fileUpload.isFetching
});

const mapDispatchToProps = {
  addElementToHome,
  removeElementFromHome,
  webSocketSendMessage,
  addNotification,
  subscription: printingStatusSubscribe,
  unsubscription: printingStatusUnsubscribe

};

export default connect(mapStateToProps, mapDispatchToProps)(GCodeEditor);
