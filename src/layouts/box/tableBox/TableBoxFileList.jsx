import React from 'react';
import PropTypes from 'prop-types';

import {
  Avatar, Box,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText, TextField,
  Tooltip,
  withStyles
} from '@material-ui/core'

import CircularProgress from '@material-ui/core/CircularProgress';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import FavoriteIconSelected from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/Description';
import Slideshow from '@material-ui/icons/Slideshow';
import DeleteIcon from '@material-ui/icons/Delete';

import Card from '../../../component/card/Card';
import CardHeader from '../../../component/card/CardHeader';
import CardBody from '../../../component/card/CardBody';

import boxStyle from '../style/boxStyle';
import Table from '../../../component/table/Table';

import * as colorMod from '../../../component/style/material-dashboard-react';
import Button from '../../../component/customButtons/Button';
import IconButton from '@material-ui/core/IconButton'
import Print from '@material-ui/icons/Print'
import Search from '@material-ui/icons/Search'
import Cancel from '@material-ui/icons/Cancel'
import Refresh from '@material-ui/icons/Refresh'
import List from '@material-ui/core/List'
import Reply from '@material-ui/icons/Reply'
import { deleteFile, printSelectFile, selectAndPrint } from '../../../redux/additions/commands'
import { printingStatusSubscribe, printingStatusUnsubscribe } from '../../../redux/actions'

class TableBoxFileList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      filterTextConfirmed: '',
    }

    props.fileListRequest();

  }

  componentDidMount () {
    this.props.subscription();
  }

  componentWillUnmount () {
    this.props.unsubscription();
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.isFileUploadFetching === true && this.props.isFileUploadFetching === false) {
      setTimeout(() => this.refreshData(), 800);
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

  refreshData = () => {
    this.props.fileListRequest(this.props.path);
  }

  handleDelete = (fileName) => {
    const { webSocketSendMessage } = this.props;
    webSocketSendMessage(deleteFile(fileName));
    this.refreshData();
  }

  handlePrint = (fileName) => {
    const { webSocketSendMessage } = this.props;
    webSocketSendMessage(selectAndPrint(fileName))
  }

  handleSelect = (fileName) => {
    const { webSocketSendMessage } = this.props;
    webSocketSendMessage(printSelectFile(fileName))
  }

  handleDirectoryClick = (directory) => {
    let { path: currentFolder } = this.props;
    if (directory==='..'){
      currentFolder = currentFolder.substr(0, currentFolder.lastIndexOf('/'));
    }else {
      currentFolder = currentFolder + ((currentFolder[currentFolder.length-1]!=='/')?'/':'') + directory;
    }
    this.setState({currentFolder} );
    this.props.fileListRequest(currentFolder);
  }

  filterFilesClear = () => {
    this.setState({ filterTextConfirmed: '' });
  }

  filterFiles = () => {
    const { filterText } = this.state;
    this.setState({ filterTextConfirmed: filterText });
  }

  filterChange = (e) => {
    this.setState({ filterText: e.target.value });
  }

  keyPress = (e) => {
    if(e.keyCode == 13){
      this.filterFiles(e.target.value);
      // put the login here
    }
  }

  render() {
    const { classes, id, path, inputEnabled } = this.props;
    const { isInHome, isUpdating } = this.props;
    const { color } = this.props;
    let { fileList } = this.props;
    const { filterTextConfirmed, filterText } = this.state;

    const messagesIntl = defineMessages(
      {
        configStatus: { id: 'table.inverter.info.configStatus' }
      }
    );

    if (filterTextConfirmed) {
      fileList = fileList.filter(elem => (elem.name.indexOf(filterTextConfirmed)>=0));
    }

    fileList.sort((firstEl, secondEl) => {
      if (firstEl.dir === secondEl.dir) {
        let nameA = firstEl.name.toUpperCase(); // ignore upper and lowercase
        let nameB = secondEl.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      } else {
        return (firstEl.dir)?-1:+1;
      }
    })

    return (
      <Card id={id} key={id}>
        <CardHeader color={color} className="dragHeader">
          <h4 className={classes.cardTitleWhite}>
            <FormattedMessage
              id="table.file.list.title"
            />
            <Button justIcon round color={color} className={classes.buttonHeader2} onClick={this.handleHome}>
              {isInHome ? <FavoriteIconSelected /> : <FavoriteIcon />}
            </Button>
            <Button justIcon round color={color} className={classes.buttonHeader} onClick={this.refreshData}>
              <Refresh />
            </Button>
          </h4>
          <p className={classes.cardCategoryWhite}>
            <FormattedMessage
              id="table.file.list.subtitle"
            />
          </p>
        </CardHeader>
        <CardBody style={{height: 'calc( 100% - 185px )'}}>
          <Box className="mb25" display="flex" alignItems="center" height="70px">

          <TextField
            error={filterTextConfirmed!==filterText}
            label="Filter"
            id="outlined-margin-dense"
            margin="dense"
            variant="outlined"
            style={{width: '100%', marginRight: '10px'}}
            onKeyDown={this.keyPress}
            onChange={this.filterChange}
          />
          <IconButton size="small" edge="start" aria-label="print" disabled={!inputEnabled} onClick={this.filterFiles}>
            <Search />
          </IconButton>
          <IconButton size="small" edge="start" aria-label="print" disabled={!inputEnabled} onClick={this.filterFilesClear}>
            <Cancel />
          </IconButton>
          </Box>
          {(!isUpdating)
              ? (
              <List dense={true} style={{height: 'calc( 100% - 150px )', overflowY: 'auto'}} >

                {(path!=='/' && path!=='' )?(
                  <ListItem key="root">
                    <ListItemAvatar onClick={() => this.handleDirectoryClick('..') }>
                      <Avatar>
                          <Reply/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary=".."
                      secondary='Back'
                      onClick={() => this.handleDirectoryClick('..')}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>)
                :null}

                {fileList.map( elem => (
                  <ListItem key={elem.name}>
                    <ListItemAvatar onClick={(elem.dir)?() => this.handleDirectoryClick(elem.name):null}>
                      <Avatar>
                        {(elem.dir) ?
                          <FolderIcon/>
                          :
                          <FileIcon/>
                        }
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={elem.name}
                      secondary={elem.dir ? 'directory' : 'file'}
                      onClick={(elem.dir)?() => this.handleDirectoryClick(elem.name):null}
                    />
                    <ListItemSecondaryAction style={{marginRight: '45px'}}>
                      {(!elem.dir)?<IconButton size="small" edge="start" aria-label="print" disabled={!inputEnabled} onClick={() => this.handleSelect(elem.name)}>
                        <Slideshow  fontSize="small" />
                      </IconButton>:null}
                    </ListItemSecondaryAction>
                    <ListItemSecondaryAction style={{marginRight: '20px'}}>
                      {(!elem.dir)?<IconButton size="small" edge="start" aria-label="print" disabled={!inputEnabled} onClick={() => this.handlePrint(elem.name)}>
                        <Print  fontSize="small" />
                      </IconButton>:null}
                    </ListItemSecondaryAction>
                    <ListItemSecondaryAction>
                      {(!elem.dir)?<IconButton size="small" edge="end" aria-label="delete" disabled={!inputEnabled} onClick={() => this.handleDelete(elem.name)}>
                        <DeleteIcon  fontSize="small" />
                      </IconButton>:null}
                    </ListItemSecondaryAction>
                  </ListItem>
                  )
                )}
              </List>

              )
            : <div className={classes.progress}><CircularProgress style={{ color: colorMod[`${color}Color`] }} size={50} /></div>
                }
          <TextField
            label="Current path"
            id="outlined-margin-dense"
            margin="dense"
            variant="filled"
            value={path || '/'}
            style={{width: '100%'}}
          />

        </CardBody>
      </Card>
    );
  }
}

TableBoxFileList.propTypes = {
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
  isUpdating: PropTypes.bool,
  lastUpdate: PropTypes.object,
  fileListRequest: PropTypes.func.isRequired,
  fileDelete: PropTypes.func.isRequired,
  path: PropTypes.string,
  inputEnabled: PropTypes.bool,
  subscription: PropTypes.func,
  unsubscription: PropTypes.func,
  isFileUploadFetching: PropTypes.bool
};
TableBoxFileList.defaultProps = {
  color: 'warning',
  isFetching: false,
  fileList: [],
  filesMap: {},
  isUpdating: true,
  lastUpdate: null,
  path: '/',
  inputEnabled: false,
  isFileUploadFetching: false
};

export default withStyles(boxStyle)(injectIntl(TableBoxFileList));
