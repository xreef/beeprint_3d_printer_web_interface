import React from 'react';
import { withStyles } from '@material-ui/core';
import {
  FormattedMessage, FormattedNumber, FormattedDate, FormattedTime, injectIntl
} from 'react-intl';

import PropTypes from 'prop-types';

import FavoriteIconSelected from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';

import FlashOn from '@material-ui/icons/FlashOn';
import FlashOff from '@material-ui/icons/FlashOff';

import boxStyle from '../style/boxStyle';
import Card from '../../../component/card/Card';
import CardHeader from '../../../component/card/CardHeader';
import CardIcon from '../../../component/card/CardIcon';
import CardFooter from '../../../component/card/CardFooter';
import Button from '../../../component/customButtons/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import {DateRange} from "@material-ui/icons";
import Icon from '@material-ui/core/Icon';
import Videocam from "@material-ui/icons/Videocam";
import SentimentVeryDissatisfied from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfied from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfied from "@material-ui/icons/SentimentSatisfied";
import CardBody from '../../../component/card/CardBody'
import { cameraControlFetch, cameraStatusFetch } from '../../../redux/actions'
import CircularProgress from '@material-ui/core/CircularProgress'
import * as colorMod from '../../../component/style/material-dashboard-react'


class InformativeRealtimeBox extends React.Component {
  constructor(props) {
    super(props);

    props.configurationFetch();
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps.cameraIP!==this.props.cameraIP ||
        nextProps.isInHome!==this.props.isInHome ||
        nextProps.cameraState.flash !== this.props.cameraState.flash
    ) return true;
    return false;
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.cameraIP!==this.props.cameraIP && this.props.cameraIP){
      this.props.cameraStatusFetch();
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
  handleControl = (control, value) => {
    const { cameraControlFetch } = this.props;
    cameraControlFetch(control, value?1:0);
  }

  render() {
    const { classes, id } = this.props;
    const {
      value, dataType, lastUpdate, isInHome, cameraIP, cameraState, color
    } = this.props;

    const { flash } = cameraState;

    return (
      <Card>
        <CardHeader color='warning' stats icon>
          <CardIcon color="warning"  className="dragHeader">
            <Videocam className={classes.icons}/>
          </CardIcon>
          <p className={classes.cardCategory} style={{display: 'flex', fontSize: '20px', paddingTop: '13px'}}>
            <FormattedMessage
              id={`informative.realtime.${dataType}.title`}
            />
          </p>

        </CardHeader>
        <CardBody style={{marginTop: '-32px', height: 'calc( 100% - 65px )'}}>
          {(cameraIP)?([
          <img key="imgId" style={{objectFit: 'contain', height: '100%', width: '100%', backgroundColor: '#353535'}} src={'http://'+cameraIP+':81/stream'}  />,
          <Button key="but1Id" color="transparent" className={classes.buttonFavoriteHeader} style={{top: 'auto', bottom: '20px', right: '23px', color: 'white', height: '20px' }} onClick={this.handleHome}>
            {isInHome ? <FavoriteIconSelected  /> : <FavoriteIcon />}
          </Button>,
          <Button key="but2Id" color="transparent" className={classes.buttonFavoriteHeader} style={{top: 'auto', bottom: '20px', right: '43px', color: 'white', height: '20px' }} onClick={() => this.handleControl('flash', !flash)}>
            {flash ? <FlashOn  /> : <FlashOff />}
          </Button>]):
            (<div className={classes.progress}><CircularProgress style={{ color: colorMod[`${color}Color`] }} size={50} /></div>)
          }

        </CardBody>
      </Card>
    );
  }
}

InformativeRealtimeBox.propTypes = {
  classes: PropTypes.object.isRequired,
  lastUpdate: PropTypes.instanceOf(Date),
  dataType: PropTypes.oneOf([
    'video'
  ]),
  id: PropTypes.string.isRequired,
  addElementToHome: PropTypes.func.isRequired,
  removeElementFromHome: PropTypes.func.isRequired,
  boxType: PropTypes.string.isRequired,
  isInHome: PropTypes.bool.isRequired,
  cameraIP: PropTypes.string,
  cameraControlFetch: PropTypes.func,
  cameraStatusFetch: PropTypes.func,
  cameraState: PropTypes.object
};
InformativeRealtimeBox.defaultProps = {
  dataType: 'video',
  color: 'danger',
  cameraState: {
    flash: 0
  }
};


export default withStyles(boxStyle)(injectIntl(InformativeRealtimeBox));
