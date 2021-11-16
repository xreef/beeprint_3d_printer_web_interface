import React from 'react';
import { Box, IconButton, Slider, withStyles } from '@material-ui/core'
import GridContainer from '../../../component/grid/GridContainer';
import GridItem from '../../../component/grid/GridItem';

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
import OpenWith from "@material-ui/icons/OpenWith";
import CardBody from '../../../component/card/CardBody'

import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import HomeRounded from '@material-ui/icons/HomeRounded';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import { extrudeFilament, homingXY, homingZ, moveAxes, preHeatTool } from '../../../redux/additions/commands'

function valuetext(value) {
  return `${value}`;
}

const marks = [
  {
    value: 1,
    label: '1'
  },
  {
    value: '10',
    label: '10',
  },
  {
    value: '20',
    label: '20',
  },
  {
    value: '50',
    label: '50'
  },
];

class InformativeMoveBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stepSize: 10
    }
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

  handleSliderChange = (event, newValue) => {
    this.setState({stepSize :newValue});
  };
  handleHomeAxis = (axis) => {
    const { webSocketSendMessage } = this.props;

    webSocketSendMessage((axis==='XY')?homingXY( ):homingZ());
  };
  handleMove = (axis, sign) => {
    const { addNotification, webSocketSendMessage, tool } = this.props;
    const { stepSize} = this.state;

    webSocketSendMessage(moveAxes( axis, stepSize*sign ));
    // addNotification({ message: <FormattedMessage id="websocket.message.preheat.sended" values={{ tool, preHeatTemp }} />, variant: 'success', autoHide: true, autoHideDuration: 500 })
    // this.setState({preHeatTempLastSend: preHeatTemp})
  };
  handleExtrusion = (extruder, sign) => {
    const { addNotification, webSocketSendMessage, tool } = this.props;
    const { stepSize} = this.state;

    webSocketSendMessage(extrudeFilament( extruder, stepSize*sign ));

  }
  render() {
    const { classes, id } = this.props;
    const {
      value, dataType, lastUpdate, isInHome, inputEnabled, color
    } = this.props;

    const {stepSize} = this.state;

    return (
      <Card>
        <CardHeader color='warning' stats icon>
          <CardIcon color="warning"  className="dragHeader">
            <OpenWith className={classes.icons}/>
          </CardIcon>
          <p className={classes.cardCategory}>
            <FormattedMessage
              id={`informative.realtime.${dataType}.title`}
            />
          </p>
          <h3 className={classes.cardTitle}>
            {value || 'WAITING NO'}
          </h3>
        </CardHeader>
        <CardBody>
          <GridContainer
                direction="row"
                justifyContent="center"
                alignItems="center"
          >

          <GridItem xs={6} sm={6} md={6}>
            <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="20px">
              X/Y
            </Box>
            <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="40px">
              <IconButton color="danger" aria-label="add an alarm" disabled={!inputEnabled} onClick={() => this.handleMove('Y', 1)}>
                <KeyboardArrowUpRoundedIcon />
              </IconButton>
            </Box>
            <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="40px">
              <IconButton color="danger" aria-label="add an alarm"  disabled={!inputEnabled} onClick={() => this.handleMove('X', -1)}>
                <KeyboardArrowLeftRoundedIcon />
              </IconButton>
              <IconButton color="danger" aria-label="add an alarm"   disabled={!inputEnabled} onClick={() => this.handleHomeAxis('XY')}>
                <HomeRounded />
              </IconButton>
              <IconButton color="danger" aria-label="add an alarm"  disabled={!inputEnabled} onClick={() => this.handleMove('X', 1)}>
                <KeyboardArrowRightRoundedIcon />
              </IconButton>
            </Box>
            <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="40px" >
              <IconButton color="danger" aria-label="add an alarm"  disabled={!inputEnabled} onClick={() => this.handleMove('Y', -1)}>
                <KeyboardArrowDownRoundedIcon />
              </IconButton>
            </Box>
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="20px">
            Z
            </Box>
            <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="40px">
              <IconButton color="danger" aria-label="add an alarm"  disabled={!inputEnabled} onClick={() => this.handleMove('Z', 1)}>
                <KeyboardArrowUpRoundedIcon />
              </IconButton>
            </Box>
            <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="40px">
              <IconButton color="danger" aria-label="add an alarm"  disabled={!inputEnabled} onClick={() => this.handleHomeAxis('Z')}>
                <HomeRounded />
              </IconButton>
            </Box>
            <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="40px">
              <IconButton color="danger" aria-label="add an alarm" disabled={!inputEnabled} onClick={() => this.handleMove('Z', -1)}>
                <KeyboardArrowDownRoundedIcon />
              </IconButton>
            </Box>

          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="20px">
              E1
            </Box>
            <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="40px">
              <IconButton color="danger" aria-label="add an alarm"  disabled={!inputEnabled} onClick={() => this.handleExtrusion('T0', 1)}>
                <KeyboardArrowUpRoundedIcon />
              </IconButton>
            </Box>
            <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="40px">
            </Box>
            <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="40px">
              <IconButton color="danger" aria-label="add an alarm"  disabled={!inputEnabled} onClick={() => this.handleExtrusion('T0', -1)}>
                <KeyboardArrowDownRoundedIcon />
              </IconButton>
            </Box>

          </GridItem>
          </GridContainer>
          <Box className="mb25" display="flex" alignItems="center" justifyContent="center" height="10px">

            <Slider
              style={{ width: 'calc( 90% - 50px )', marginTop: '20px'}}
              defaultValue={value}
              value={stepSize}
              getAriaValueText={valuetext}
              color="primary"
              aria-labelledby="discrete-slider-custom"
              step={null}
              marks={marks}
              min={1}
              max={50}
              disabled={!inputEnabled}

              onChange={this.handleSliderChange}
            />
          </Box>
        </CardBody>
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

InformativeMoveBox.propTypes = {
  classes: PropTypes.object.isRequired,
  lastUpdate: PropTypes.instanceOf(Date),
  dataType: PropTypes.oneOf([
    'move'
  ]),
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOf([
    'IDLE',
    'PRINTING',
    'PAUSE',
    'NOT CONNECTED',
    'WAITING'
  ]),
  addElementToHome: PropTypes.func.isRequired,
  removeElementFromHome: PropTypes.func.isRequired,
  boxType: PropTypes.string.isRequired,
  isInHome: PropTypes.bool.isRequired,
  subscription: PropTypes.func,
  unsubscription: PropTypes.func,
  inputEnabled: PropTypes.bool,
  webSocketSendMessage: PropTypes.func,
};
InformativeMoveBox.defaultProps = {
  dataType: 'movement',
  color: 'warning',
  value: null,
  lastUpdate: null,
  inputEnabled: false
};


export default withStyles(boxStyle)(injectIntl(InformativeMoveBox));
