import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';

import {
  addElementToHome, printingStatusRequestValues, printingStatusSubscribe, printingStatusUnsubscribe,
  removeElementFromHome, configurationFetch, cameraControlFetch, cameraStatusFetch
} from '../../../redux/actions'

import InformativeRealtimeBox from '../../../layouts/box/informativeBox/InformativeTemperatureRealtimeBox';
import InformativeRealtimeStatusBox from '../../../layouts/box/informativeBox/InformativeRealtimeStatusBox';
import InformativeStreamStatusBox from '../../../layouts/box/informativeBox/InformativeStreamStatusBox';

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

/*
T0
 */
const mapStateToProps = (state, ownProps) => ({
  dataType: 'video',
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state)),
  cameraIP: state.configuration.data && state.configuration.data.camera && state.configuration.data.camera.streamingUrl,
  rotateCamera: state.configuration.data && state.configuration.data.camera && state.configuration.data.camera.rotateCamera,
  cameraState: state.cameraControl.data
});

const mapDispatchToProps = {
  addElementToHome,
  removeElementFromHome,
  configurationFetch,
  cameraControlFetch,
  cameraStatusFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(InformativeStreamStatusBox);
