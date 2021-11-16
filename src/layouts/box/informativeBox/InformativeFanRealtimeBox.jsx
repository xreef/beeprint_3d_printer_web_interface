import React from 'react';
import { Slider, withStyles } from '@material-ui/core'
import {
  FormattedMessage, FormattedNumber, FormattedDate, FormattedTime, injectIntl
} from 'react-intl';

import PropTypes from 'prop-types';

import FavoriteIconSelected from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import boxStyle from '../style/boxStyle';
import Card from '../../../component/card/Card';
import CardHeader from '../../../component/card/CardHeader';
import CardIcon from '../../../component/card/CardIcon';
import CardFooter from '../../../component/card/CardFooter';
import Button from '../../../component/customButtons/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import {DateRange} from "@material-ui/icons";
import Icon from '@material-ui/core/Icon';
import { addNotification, webSocketSendMessage } from '../../../redux/actions'
import { preHeatTool, setFanSpeed } from '../../../redux/additions/commands'

import Toys from '@material-ui/icons/Toys'

function valuetext(value) {
  return `${value}`;
}


class InformativeTemperatureRealtimeBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fanSpeed: 0,
      fanSpeedLastSend: 0,
      lastUpdate: null
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
  handleSliderChange = (event, newValue) => {
    this.setState({fanSpeed :newValue});
  };
  handleSetFan = () => {
    const { addNotification, webSocketSendMessage, tool } = this.props;
    const { fanSpeed} = this.state;

    webSocketSendMessage(setFanSpeed(fanSpeed));
    // addNotification({ message: <FormattedMessage id="websocket.message.preheat.sended" values={{ tool, preHeatTemp }} />, variant: 'success', autoHide: true, autoHideDuration: 500 })
    this.setState({fanSpeedLastSend: fanSpeed, lastUpdate: new Date()})
  };


  render() {
    const { classes, id, color, inputEnabled, valueTarget } = this.props;
    const {
      dataType, isInHome
    } = this.props;

    const maxValue = 255;

    const { fanSpeed, fanSpeedLastSend, lastUpdate  } = this.state;

    const marks = [
      {
        value: 0,
        label: 'STOP'
      },
      {
        value: parseInt(maxValue/3*1),
        label: parseInt(maxValue/3*1),
      },
      {
        value: parseInt(maxValue/3*2),
        label: parseInt(maxValue/3*2),
      },
      {
        value: maxValue,
        label: maxValue
      },
    ];

    return (
      <Card>
        <CardHeader color={color} stats icon>
          <CardIcon color={color}  className="dragHeader" >
              <Toys/>
            </CardIcon>
          <p className={classes.cardCategory}>
            <FormattedMessage
              id={`informative.realtime.${dataType}.title`}
            />
          </p>
          <h3 className={classes.cardTitle}>
            <FormattedNumber value={fanSpeedLastSend || 0} /> %

            {(valueTarget>0)?[' ',<span style={{color: 'gray'}}><FormattedNumber value={valueTarget} /></span>,]:null}

          </h3>
          <p style={{width: '100%', textAlign: 'center'}}>
          <Slider
            style={{ width: 'calc( 90% - 50px )', marginTop: '60px'}}
            defaultValue={0}
            value={fanSpeed}
            getAriaValueText={valuetext}
            color="primary"
            aria-labelledby="discrete-slider-custom"
            step={1}
            marks={marks}
            min={0}
            max={maxValue}
            valueLabelDisplay="on"
            disabled={!inputEnabled}

            onChange={this.handleSliderChange}
          />
          <Button
            style={{width: '100%'}}
            variant="contained"
            color={color}
            size="sm"
            round={true}
            className={classes.button}
            disabled={!inputEnabled}
            onClick={this.handleSetFan}
          >
            <FormattedMessage
              id={`informative.realtime.${dataType}.button_set`}
            />
          </Button>

          </p>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <DateRange />
            <FormattedMessage
              id="last.update"
              defaultMessage="Last update"
            />
            {' '}
            {(lastUpdate) ? [<FormattedDate key={0} value={lastUpdate} />, ' ', <FormattedTime key={1} value={lastUpdate} />] : '-'}
          </div>
          <Button color="transparent" className={classes.buttonFooter} onClick={this.handleHome}>
            {isInHome ? <FavoriteIconSelected /> : <FavoriteIcon />}
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

InformativeTemperatureRealtimeBox.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number,
  valueTarget: PropTypes.number,
  dataType: PropTypes.oneOf([
    'fan'
  ]),
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
  webSocketSendMessage: PropTypes.func,
  addNotification: PropTypes.func
};
InformativeTemperatureRealtimeBox.defaultProps = {
  dataType: 'fan',
  color: 'rose',
  inputEnabled: false
};


export default withStyles(boxStyle)(injectIntl(InformativeTemperatureRealtimeBox));
