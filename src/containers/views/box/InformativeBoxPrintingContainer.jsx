import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  addElementToHome, printingStatusRequestValues, printingStatusSubscribe, printingStatusUnsubscribe,
  removeElementFromHome, webSocketSendMessage
} from '../../../redux/actions';

import InformativePrintingStatusBox from '../../../layouts/box/informativeBox/InformativePrintingStatusBox';

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

/*
T0
 */
const mapStateToProps = (state, ownProps) => ({
  dataType: 'status',
  lastUpdate: state.printingStatus.lastUpdate,
  value: state.printingStatus.printingStatus,
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state)),
  percentageProgress: state.printingStatus.printing.progressPercentage,
  job: state.printingStatus.printing.file,
  jobSize: state.printingStatus.printing.size,
  progressTime: { hours: state.printingStatus.printing.hours, minutes: state.printingStatus.printing.minutes, seconds: state.printingStatus.printing.seconds }
});

const mapDispatchToProps = {
  addElementToHome,
  removeElementFromHome,
  subscription: printingStatusSubscribe,
  unsubscription: printingStatusUnsubscribe,
  webSocketSendMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(InformativePrintingStatusBox);
