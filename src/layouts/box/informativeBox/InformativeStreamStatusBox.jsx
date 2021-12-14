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
import { withSize } from 'react-sizeme'


class InformativeRealtimeBox extends React.Component {
  constructor(props) {
    super(props);

    props.configurationFetch();
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    // if (document.getElementById("imgContainer") && document.getElementById("imgId")) {
    //   document.getElementById("imgId").width = document.getElementById("imgContainer").offsetHeight;
    //   document.getElementById("imgId").height = document.getElementById("imgContainer").offsetWidth-65;
    // }
    if (nextProps.cameraIP!==this.props.cameraIP ||
        nextProps.isInHome!==this.props.isInHome ||
        nextProps.cameraState.flash !== this.props.cameraState.flash ||

      (nextProps.size && (
        nextProps.size.width !== this.props.size.width ||
        nextProps.size.height !== this.props.size.height
        ))
    ) return true;
    return false;
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    // document.getElementById("imgId").width = document.getElementById("imgContainer").offsetHeight;
    // document.getElementById("imgId").height = document.getElementById("imgContainer").offsetWidth-65;

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
      value, dataType, lastUpdate, isInHome, cameraIP, rotateCamera, cameraState, color
    } = this.props;

    const {size} = this.props;

    const { flash } = cameraState;

    const rotateStyle = {
      alignSelf: "stretch",
      transform: "rotate(90deg) translateY(-100%)",
      objectFit: 'contain',
      backgroundColor: '#353535',
      width: size.height-65,
      height: size.width-40,
      transformOrigin: "top left"
    };

    const rotateStyle270 = {
      ...rotateStyle,
      transform: "rotate(-90deg) translateX(-100%)"
    };
    const rotateStyle90 = {
      ...rotateStyle,
      transform: "rotate(90deg) translateY(-100%)"
    }

    const notRotateStyle = {
      objectFit: 'contain',
      height: '100%',
      width: '100%',
      backgroundColor: '#353535'
    };

    const cameraStyleMap = {
      "-90": rotateStyle270,
      "0": notRotateStyle,
      "90": rotateStyle90
    }

    const cameraStyle = cameraStyleMap[""+(rotateCamera || 0)];

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
        <CardBody id="imgContainer" style={{marginTop: '-32px', height: 'calc( 100% - 65px )', overflow: "hidden"}}>
          {(cameraIP)?([
          <img key="imgId" id="imgId" style={cameraStyle} src={'http://'+cameraIP+':81/stream'} />,
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


export default withStyles(boxStyle)(injectIntl(withSize({monitorHeight: true})(InformativeRealtimeBox)));
