import React from 'react';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';
import {
  Box,
  Typography,
  ListItem,
  withStyles,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText, DialogActions
} from '@material-ui/core'


import CircularProgress from '@material-ui/core/CircularProgress';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import FavoriteIconSelected from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';

import Card from '../../../component/card/Card';
import CardHeader from '../../../component/card/CardHeader';
import CardBody from '../../../component/card/CardBody';

import boxStyle from '../style/boxStyle';
import Table from '../../../component/table/Table';

import * as colorMod from '../../../component/style/material-dashboard-react';
import Button from '../../../component/customButtons/Button';
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import Refresh from '@material-ui/icons/Refresh'
import List from '@material-ui/core/List'
import Reply from '@material-ui/icons/Reply'
import { fileDelete, fileListRequest, fileUploadPost } from '../../../redux/actions'
import { selectAndPrint } from '../../../redux/additions/commands'
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const calculatePercentage = (progress, total) => {
  if (total === 0) return 0;
  return progress*100/total;
}


class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      isError: false,
      fileInfos: [],

      open: false
    };
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.print && prevProps.isFetching === true && this.props.isFetching === false) {
      setTimeout(() => this.props.webSocketSendMessage(selectAndPrint(this.selectedFileName)), 1000);
    }
  }

  handleHome = () => {
    const {
      isInHome, removeElementFromHome, addElementToHome, boxType
    } = this.props;
    if (isInHome) {
      removeElementFromHome(boxType);
    } else {
      addElementToHome(boxType);
    }
  };

  selectFile = (event) => {
    this.setState({
      selectedFiles: event.target.files,
      selectedFileName: (event.target.files && event.target.files.length>0 && event.target.files[0].size>0)?event.target.files[0].name:''
    });
  }

  handleRename = (e) => {
      this.setState({ selectedFileName: e.target.value });
  }

  upload = (print =  false) => {
    let currentFile = this.state.selectedFiles[0];
    const { selectedFileName } = this.state;

    this.setState({
      currentFile: currentFile,
      print
    });

    const { filesMap } = this.props;

    this.currentFile = currentFile;
    this.selectedFileName = selectedFileName;
    this.print = print;

    if (filesMap.hasOwnProperty(selectedFileName.trim())){
      this.setState({open: true})
    }else {

      // this.props.fileUploadPost(currentFile, this.state.selectedFileName, print);

      // this.setState({
      //   selectedFiles: undefined,
      //   selectedFileName: ''
      // });
      // this.handleClose();
      this.props.fileUploadPost(currentFile, selectedFileName, print);
    }
  }

  confirmUploadAndPrint = (currentFile, selectedFileName, print) => {
    this.handleClose();
    // this.props.fileUploadPost(currentFile || this.state.currentFile, selectedFileName || this.state.selectedFileName, print || this.state.print);
    this.props.fileUploadPost(this.currentFile, this.selectedFileName, this.print || this.state.print);
  }

  uploadAndPrint = () => {
    this.upload(true);
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  render() {
    const { classes, id, path, progressFileUpload,
      progressFileReader } = this.props;
    const { fileList, isInHome, inputEnabled, isFetching } = this.props;
    const { color } = this.props;

    const { fileReaderProgress,
            fileUploadProgress,
            fileReaderTotal,
            fileUploadTotal } = this.props.progress;

    const messagesIntl = defineMessages(
      {

      }
    );

    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
      isError,
      selectedFileName
    } = this.state;

    return (
      <React.Fragment>
        <Card id={id} key={id}>
          <CardHeader color={color} className="dragHeader">
            <h4 className={classes.cardTitleWhite}>
              <FormattedMessage
                id="box.file.upload.title"
              />
              <Button justIcon round color={color} className={classes.buttonHeader} onClick={this.handleHome}>
                {isInHome ? <FavoriteIconSelected /> : <FavoriteIcon />}
              </Button>
              {/*<Button justIcon round color={color} className={classes.buttonHeader} onClick={this.refreshData}>*/}
              {/*  <Refresh />*/}
              {/*</Button>*/}
            </h4>
            <p className={classes.cardCategoryWhite}>
              <FormattedMessage
                id="box.file.upload.subtitle"
              />
            </p>
          </CardHeader>
          <CardBody style={{height: 'calc( 100% - 95px )'}}>

            <div className="file-name">
              <TextField
                label={<FormattedMessage
                  id="box.file.upload.choose_file"
                />}
                id="outlined-margin-dense"
                margin="dense"
                variant="outlined"
                value={selectedFileName || ' '}
                style={{width: '100%'}}
                onChange={this.handleRename}
              />

              {/*{selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}*/}
            </div>
            <Box className="mb25" display="flex" alignItems="center" height="70px">
              <Box width="100%" mr={1}>
                <LinearProgress variant="buffer" value={calculatePercentage(fileUploadProgress, fileUploadTotal)} valueBuffer={calculatePercentage(fileReaderProgress, fileReaderTotal)}  />

                {/*<BorderLinearProgress variant="determinate" value={progress}  />*/}
              </Box>
              <Box minWidth={40}>
                <Typography variant="body2" color="textSecondary">{`${parseInt(calculatePercentage(fileUploadProgress, fileUploadTotal))}%`}</Typography>
              </Box>
            </Box>
            <Box className="mb25" display="flex" justifyContent={'space-between'} >
              <label htmlFor="btn-upload">
                <input
                  id="btn-upload"
                  name="btn-upload"
                  style={{ display: 'none' }}
                  type="file"
                  onChange={this.selectFile} />
                <Button
                  color={color}
                  className="btn-choose"
                  variant="outlined"
                  component="span" >
                  <FormattedMessage
                    id="box.file.upload.choose_file"
                  />
                </Button>
              </label>
              <Button
                color={color}

                className="btn-upload"
                variant="contained"
                component="span"
                disabled={!selectedFiles || !inputEnabled || isFetching || !selectedFiles[0] || !selectedFiles[0]}
                onClick={() => this.upload(false)}>
                <FormattedMessage
                  id="box.file.upload.upload"
                />
              </Button>
            </Box>
            <Box className="mb25" display="flex" justifyContent={'space-between'} >

              <Button
                color={color}
                className="btn-upload"
                variant="contained"
                component="span"
                style={{width: '100%'}}
                disabled={!selectedFiles || !inputEnabled || isFetching || !selectedFiles[0] || !selectedFiles[0]}
                onClick={this.uploadAndPrint}>
                <FormattedMessage
                  id="box.file.upload.upload_and_print"
                />
              </Button>
            </Box>
          </CardBody>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">
            <FormattedMessage
              id="box.file.upload.title"
            />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <FormattedMessage
                id="box.file.upload.dialog.text"
              />

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.confirmUploadAndPrint} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

      </React.Fragment>
    );
  }
}

FileUpload.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose'
  ]),
  addElementToHome: PropTypes.func.isRequired,
  removeElementFromHome: PropTypes.func.isRequired,
  boxType: PropTypes.string.isRequired,
  isInHome: PropTypes.bool.isRequired,
  fileList: PropTypes.array,
  filesMap: PropTypes.object,
  inputEnabled: PropTypes.bool,
  isFetching: PropTypes.bool,
  fileListRequest: PropTypes.func,
  path: PropTypes.string,
  progress: PropTypes.shape({
    fileReaderProgress: PropTypes.number,
    fileUploadProgress: PropTypes.number,
    fileReaderTotal: PropTypes.number,
    fileUploadTotal: PropTypes.number,
  })

};
FileUpload.defaultProps = {
  color: 'warning',
  fileList: [],
  filesMap: {},
  inputEnabled: false,
  isFetching: false,
  progress: {
    fileReaderProgress: 0,
    fileUploadProgress: 0,
    fileReaderTotal: 0,
    fileUploadTotal: 0
  }
};

export default withStyles(boxStyle)(injectIntl(FileUpload));
