import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';
import { selectors as fileListSelector } from '../../../redux/reducers/fileList';

import {
  fileListRequest,
  fileDelete,
  addElementToHome,
  removeElementFromHome,
  webSocketSendMessage, printingStatusSubscribe, printingStatusUnsubscribe
} from '../../../redux/actions'

import TableBoxFileList from '../../../layouts/box/tableBox/TableBoxFileList'
const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

const mapStateToProps = (state, ownProps) => ({
  path: fileListSelector.path(state),
  fileList: fileListSelector.list(state),
  filesMap: fileListSelector.map(state),
  isUpdating: fileListSelector.fileStreamStarted(state),
  lastUpdate: state.fileList.lastUpdate,
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state)),
  inputEnabled: state.printingStatus.printingStatus === 'IDLE',
  isFileUploadFetching: state.fileUpload.isFetching
});

const mapDispatchToProps = {
  fileListRequest,
  fileDelete,
  addElementToHome,
  removeElementFromHome,
  webSocketSendMessage,
  subscription: printingStatusSubscribe,
  unsubscription: printingStatusUnsubscribe

};

export default connect(mapStateToProps, mapDispatchToProps)(TableBoxFileList);
