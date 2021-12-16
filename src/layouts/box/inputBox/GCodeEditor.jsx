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
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-gcode";

class GCodeEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [
        {
          startRow: 0,
          endRow: 0,
          startCol: 0,
          type: "text",
          className: props.classes.executionMarker
        }
      ],

      text: ""
    };
  }

  componentDidMount () {
    this.props.subscription();
  }

  componentWillUnmount () {
    this.props.unsubscription();
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

  onChange = (newValue) => {
    this.setState({text: newValue})
  }

  onLoad = (value) => {
    console.log(value);

  }

  sendGCode = () => {
    const {text} = this.state;
    const {webSocketSendMessage, addNotification} = this.props;
    const lines = text.split("\n");
    lines.forEach((elem, i)=>{
      webSocketSendMessage(elem+'\r\n');
      this.setState({markers: {
          ...this.state.markers,
          endRow: i
        }})
    })
    this.setState({markers: {
        ...this.state.markers,
        endRow: 0
      }})

    addNotification({ message: <FormattedMessage id="box.gcode.message.sended" values={{ numGcodeLine: lines.length }} />, variant: 'warning', autoHide: false })
  }

  refreshData = () => {
    this.setState({text: ""});
  }

  render() {
    const { classes, id } = this.props;
    const { isInHome, inputEnabled } = this.props;
    const { color } = this.props;

    const messagesIntl = defineMessages(
      {
        gcodePlaceholder: {
          id: 'box.gcode.placeholder',
          defaultMessage: 'Placeholder',
          description: 'Placeholder',
        },
      }
    );

    const {
      text, markers
    } = this.state;

    return (
      <React.Fragment>
        <Card id={id} key={id}>
          <CardHeader color={color} className="dragHeader">
            <h4 className={classes.cardTitleWhite}>
              <FormattedMessage
                id="box.gcode.title"
              />
              <Button justIcon round color={color} className={classes.buttonHeader} onClick={this.handleHome}>
                {isInHome ? <FavoriteIconSelected /> : <FavoriteIcon />}
              </Button>
              <Button justIcon round color={color} className={classes.buttonHeader2} onClick={this.refreshData}>
                <Refresh />
              </Button>
            </h4>
            <p className={classes.cardCategoryWhite}>
              <FormattedMessage
                id="box.gcode.subtitle"
              />
            </p>
          </CardHeader>
          <CardBody style={{height: 'calc( 100% - 95px )'}}>
            <Box className="mb25" display="flex" justifyContent={'space-between'} style={{marginBottom: "15px",height: 'calc( 100% - 60px )'}}>
              <AceEditor
                style={{height: "100%", width: "100%"}}
                placeholder={this.props.intl.formatMessage(messagesIntl.gcodePlaceholder)}
                mode="gcode"
                name="gcode-editor"
                onLoad={this.onLoad}
                onChange={this.onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                editorProps={{ $blockScrolling: true }}
                value={text}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
                markers={markers}
              />
            </Box>
            <Box className="mb25" display="flex" justifyContent={'space-between'} >

              <Button
                color={color}
                className="btn-upload"
                variant="contained"
                component="span"
                style={{width: '100%'}}
                disabled={!inputEnabled}
                onClick={this.sendGCode}>
                <FormattedMessage
                  id="box.gcode.send"
                />
              </Button>
            </Box>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

GCodeEditor.propTypes = {
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
  inputEnabled: PropTypes.bool,
  isFetching: PropTypes.bool,
  webSocketSendMessage: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired
};
GCodeEditor.defaultProps = {
  color: 'warning',
  fileList: [],
  filesMap: {},
  inputEnabled: false,
  isFetching: false,
  progress: {
    fileReaderProgress: 0,
    fileReaderTotal: 0
  }
};

export default withStyles(boxStyle)(injectIntl(GCodeEditor));
