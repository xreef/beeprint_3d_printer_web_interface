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
import { preHeatTool } from '../../../redux/additions/commands'

function valuetext(value) {
  return `${value}°C`;
}


class InformativeTemperatureRealtimeBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preHeatTemp: 0,
      preHeatTempLastSend: 0,
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
    this.setState({preHeatTemp :newValue});
  };
  handlePreHeat = () => {
    const { addNotification, webSocketSendMessage, tool } = this.props;
    const { preHeatTemp} = this.state;

    webSocketSendMessage(preHeatTool(tool, preHeatTemp));
    addNotification({ message: <FormattedMessage id="websocket.message.preheat.sended" values={{ tool, preHeatTemp }} />, variant: 'success', autoHide: true, autoHideDuration: 500 })
    this.setState({preHeatTempLastSend: preHeatTemp})
  };


  render() {
    const { classes, id, color, inputEnabled, valueTarget } = this.props;
    const {
      value, dataType, lastUpdate, isInHome, maxValue
    } = this.props;

    const { preHeatTemp, preHeatTempLastSend  } = this.state;

    const marks = [
      {
        value: 0,
        label: 'STOP'
      },
      {
        value: parseInt(maxValue/3*1),
        label: parseInt(maxValue/3*1)+'°C',
      },
      {
        value: parseInt(maxValue/3*2),
        label: parseInt(maxValue/3*2)+'°C',
      },
      {
        value: maxValue,
        label: maxValue+'°C'
      },
    ];

    return (
      <Card>
        <CardHeader color={color} stats icon>
          <CardIcon color={color}  className="dragHeader" >
            <SvgIcon>
              <svg version="1.1" id="Capa_1" x="0px" y="0px"
                   width="24px" height="24px" viewBox="0 0 576.219 576.219"
                   >
                  <g>
                    <path d="M321.577,406.949V172.124c-36.26,22.711-37.455-23.906-66.937,0v234.825c-23.973,12.234-40.439,37.154-40.439,65.863
                      c0,40.752,33.155,73.906,73.908,73.906c40.753,0,73.908-33.154,73.908-73.906C362.017,444.104,345.552,419.184,321.577,406.949z
                       M318.681,482.906c-10.318,0-18.686-8.367-18.686-18.686s8.357-18.686,18.686-18.686c10.318,0,18.684,8.367,18.684,18.686
                      S328.999,482.906,318.681,482.906z"/>
                    <path d="M264.203,57.374h57.375c2.639,0,4.781-2.142,4.781-4.781c0-2.639-2.143-4.781-4.781-4.781h-57.375
                      c-2.64,0-4.781,2.142-4.781,4.781C259.421,55.232,261.563,57.374,264.203,57.374z"/>
                    <path d="M321.577,66.937H292.89c-2.639,0-4.781,2.142-4.781,4.781c0,2.639,2.142,4.781,4.781,4.781h28.688
                      c2.641,0,4.781-2.142,4.781-4.781C326.358,69.079,324.218,66.937,321.577,66.937z"/>
                    <path d="M264.203,95.624h57.375c2.639,0,4.781-2.142,4.781-4.781c0-2.639-2.143-4.781-4.781-4.781h-57.375
                      c-2.64,0-4.781,2.142-4.781,4.781C259.421,93.482,261.563,95.624,264.203,95.624z"/>
                    <path d="M321.577,105.187H292.89c-2.639,0-4.781,2.142-4.781,4.781c0,2.639,2.142,4.781,4.781,4.781h28.688
                      c2.641,0,4.781-2.142,4.781-4.781C326.358,107.329,324.218,105.187,321.577,105.187z"/>
                    <path d="M264.203,133.874h57.375c2.639,0,4.781-2.142,4.781-4.781c0-2.639-2.141-4.781-4.781-4.781h-57.375
                      c-2.639,0-4.78,2.142-4.78,4.781C259.422,131.732,261.563,133.874,264.203,133.874z"/>
                    <path d="M321.577,143.437H292.89c-2.639,0-4.781,2.142-4.781,4.781c0,2.639,2.142,4.781,4.781,4.781h28.688
                      c2.641,0,4.781-2.142,4.781-4.781C326.358,145.579,324.218,143.437,321.577,143.437z"/>
                    <path d="M350.265,390.225V46.349C350.265,17.757,328.894,0,294.487,0h-10.356c-34.798,0-58.179,18.628-58.179,46.349v343.875
                      c-25.037,18.889-41.25,48.879-41.25,82.588c0,57.018,46.388,103.406,103.408,103.406c57.02,0,103.407-46.389,103.407-103.406
                      C391.517,439.104,375.302,409.113,350.265,390.225z M288.109,566.219c-51.588,0-93.408-41.82-93.408-93.406
                      c0-27.719,12.077-52.611,31.251-69.719c3.019-2.693,6.211-5.193,9.562-7.482V46.349c0-27.157,26.182-36.787,48.606-36.787h10.355
                      c10.844,0,46.225,2.649,46.225,36.787v349.264c3.352,2.287,6.545,4.789,9.562,7.482c19.174,17.105,31.252,42,31.252,69.717
                      C381.517,524.4,339.696,566.219,288.109,566.219z"/>
                  </g>
                  </svg>
            </SvgIcon>
            </CardIcon>
          <p className={classes.cardCategory}>
            <FormattedMessage
              id={`informative.realtime.${dataType}.title`}
            />
          </p>
          <h3 className={classes.cardTitle}>
            <FormattedNumber value={value || 0} />
°C
            {(valueTarget>0)?[' ',<span style={{color: 'gray'}}><FormattedNumber value={valueTarget} /></span>,<span style={{color: 'gray'}}>°C</span>]:null}

          </h3>
          <p style={{width: '100%', textAlign: 'center'}}>
          <Slider
            style={{ width: 'calc( 90% - 50px )', marginTop: '60px'}}
            defaultValue={value}
            value={preHeatTemp}
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
            onClick={this.handlePreHeat}
          >
            <FormattedMessage id="websocket.message.preheat.button" />
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
  lastUpdate: PropTypes.instanceOf(Date),
  dataType: PropTypes.oneOf([
    'T0Temp',
    'T1Temp',
    'bed'
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
  maxValue: PropTypes.number,
  inputEnabled: PropTypes.bool,
  webSocketSendMessage: PropTypes.func,
  addNotification: PropTypes.func,
  tool: PropTypes.string
};
InformativeTemperatureRealtimeBox.defaultProps = {
  dataType: 'lifetime',
  color: 'warning',
  value: null,
  valueTarget: null,
  lastUpdate: null,
  maxValue: 300,
  inputEnabled: false
};


export default withStyles(boxStyle)(injectIntl(InformativeTemperatureRealtimeBox));
