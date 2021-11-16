import { connect } from 'react-redux';
import { selectors as homeSelector } from '../../../redux/reducers/home';
import { selectors as fileListSelector } from '../../../redux/reducers/fileList';

import {
  addElementToHome,
  removeElementFromHome,
  fileUploadPost, fileListRequest, webSocketSendMessage
} from '../../../redux/actions';

import FileUpload from '../../../layouts/box/inputBox/FileUpload'

const isElementInHome = (element, homeElements) => homeElements.some(elem => elem.additionalInfo.boxType === element);

/*
T0
 */
const mapStateToProps = (state, ownProps) => ({
  isInHome: isElementInHome(ownProps.boxType, homeSelector.elements(state)),
  inputEnabled: state.printingStatus.printingStatus === 'IDLE',
  progress: state.fileUpload.progress,
  fileList: fileListSelector.list(state),
  filesMap: fileListSelector.map(state),
  isFetching: state.fileUpload.isFetching
});

const mapDispatchToProps = {
  addElementToHome,
  removeElementFromHome,
  fileUploadPost,
  fileListRequest,
  webSocketSendMessage
  // fileUploadLoad
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
