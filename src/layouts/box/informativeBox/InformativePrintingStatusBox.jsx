import React from 'react';
import { Box, Typography, withStyles } from '@material-ui/core'
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
import { DateRange, Pause, PlayArrow, Stop } from '@material-ui/icons'
import Icon from '@material-ui/core/Icon';
import SentimentVerySatisfied from "@material-ui/icons/SentimentVerySatisfied";
import SentimentVeryDissatisfied from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfied from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfied from "@material-ui/icons/SentimentSatisfied";
import Print from '@material-ui/icons/Print'
import { styled } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import CardBody from '../../../component/card/CardBody'
import IconButton from '@material-ui/core/IconButton'
import { printPause, printResumeStart, printStop } from '../../../redux/additions/commands'

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

class InformativeRealtimeBox extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.subscription();
  }

  componentWillUnmount () {
    this.props.unsubscription();
  }

  handleHome = () => {
    const {
      isInHome, removeElementFromHome, addElementToHome, boxType,
    } = this.props;
    if (isInHome) {
      removeElementFromHome(boxType);
    } else {
      addElementToHome(boxType);
    }
  };

  handleResume = () => {
    const { webSocketSendMessage } = this.props;
    webSocketSendMessage(printResumeStart());
  }

  handlePause = () => {
    const { webSocketSendMessage } = this.props;
    webSocketSendMessage(printPause());
  }

  handleStop = () => {
    const { webSocketSendMessage } = this.props;
    webSocketSendMessage(printStop());
  }

  render() {
    const { classes, id } = this.props;
    const {
      value, dataType, lastUpdate, isInHome,
      percentageProgress,
      job,
      jobSize,
      progressTime

    } = this.props;

    let resume = false;
    let pause = false;
    let stop = false;

    // 'IDLE',
    //   'PRINTING',
    //   'PAUSE',
    //   'NOT CONNECTED',
    //   'WAITING'

    if (jobSize===0){
      resume = false;
      pause = false;
      stop = false;
    } else if (value==='IDLE' || value === 'PAUSE') {
      resume = true;
      pause = false;
      stop = false;
    } else if (value==='PRINTING') {
      resume = false;
      pause = true;
      stop = true;
    } else {
      resume = false;
      pause = false;
      stop = false;
    }

    return (
      <Card>
        <CardHeader color='warning' stats icon>
          <CardIcon color="warning"  className="dragHeader">
            <Print className={classes.icons}/>
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
          <Box className="mb25" display="flex" alignItems="center" height="40px">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={percentageProgress}  />
            </Box>
            <Box minWidth={40}>
              <Typography variant="body2" color="textSecondary">{`${percentageProgress}%`}</Typography>
            </Box>
          </Box>
          <Box className="mb25" display="flex" alignItems="center" height="30px">
            <Typography variant="subtitle1" component="div">
              <FormattedMessage
                id="informative.realtime.status.label.file"
              />: {job || '-'}
            </Typography>;
          </Box>
          <Box className="mb25" display="flex" alignItems="center" height="30px">
            <Typography variant="subtitle1" component="div">
              <FormattedMessage
                id="informative.realtime.status.label.size"
              />: {Math.round((jobSize || 0)/10000)/100}Kb
            </Typography>
          </Box>
          <Box className="mb25" display="flex" alignItems="center" height="30px">
            <Typography variant="subtitle1" component="div">
              <FormattedMessage
                id="informative.realtime.status.label.elapsed_time"
              />: {progressTime.hours.toString().padStart(2, '0')}:{progressTime.minutes.toString().padStart(2, '0')}:{progressTime.seconds.toString().padStart(2, '0')}
            </Typography>
          </Box>
          <Box className="mb25" display="flex" alignItems="center" justifyContent='space-between'  height="40px">
            <Button
              variant="contained"
              color="success"
              size="sm"
              className={classes.button}
              endIcon={<PlayArrow />}
              disabled={!resume}
              onClick={this.handleResume}
            >
              <FormattedMessage
                id="informative.realtime.status.button.resume"
              />
            </Button>
            <Button
              variant="contained"
              color="warning"
              size="sm"
              className={classes.button}
              endIcon={<Pause />}
              disabled={!pause}
              onClick={this.handlePause}
            >
              <FormattedMessage
                id="informative.realtime.status.button.pause"
              />
            </Button>
            <Button
              variant="contained"
              color="danger"
              size="sm"
              className={classes.button}
              endIcon={<Stop />}
              disabled={!stop}
              onClick={this.handleStop}
            >
              <FormattedMessage
                id="informative.realtime.status.button.stop"
              />
            </Button>
          </Box>
        </CardBody>
        <CardFooter style={{marginTop: 0}} stats>
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

InformativeRealtimeBox.propTypes = {
  classes: PropTypes.object.isRequired,
  lastUpdate: PropTypes.instanceOf(Date),
  dataType: PropTypes.oneOf([
    'status'
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
  webSocketSendMessage: PropTypes.func,
  percentageProgress: PropTypes.number,
  job: PropTypes.string,
  jobSize: PropTypes.number,
  progressTime: PropTypes.object
};
InformativeRealtimeBox.defaultProps = {
  dataType: 'printing',
  color: 'warning',
  value: null,
  lastUpdate: null,
  percentageProgress: 0,
  job: '',
  jobSize: 0,
  progressTime: {hours: 0, minutes: 0, seconds: 0}
};


export default withStyles(boxStyle)(injectIntl(InformativeRealtimeBox));
