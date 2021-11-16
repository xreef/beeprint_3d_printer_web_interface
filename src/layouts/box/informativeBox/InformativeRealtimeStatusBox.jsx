import React from 'react';
import { withStyles } from '@material-ui/core';
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
import SentimentVerySatisfied from "@material-ui/icons/SentimentVerySatisfied";
import SentimentVeryDissatisfied from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfied from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfied from "@material-ui/icons/SentimentSatisfied";


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
      isInHome, removeElementFromHome, addElementToHome, boxType
    } = this.props;
    if (isInHome) {
      removeElementFromHome(boxType);
    } else {
      addElementToHome(boxType);
    }
  };
  getIcon = (status) => {
    const { classes } = this.props;

    switch (status) {
      case 'IDLE':
        return (
          <CardIcon color="warning"  className="dragHeader">
            <SentimentSatisfied className={classes.icons}/>
          </CardIcon>
        );
      case 'PRINTING':
        return (
          <CardIcon color="success"  className="dragHeader">
            <SentimentVerySatisfied className={classes.icons}/>
          </CardIcon>
        );
      case 'PAUSE':
        return (
          <CardIcon color="rose"  className="dragHeader">
            <SentimentDissatisfied className={classes.icons}/>
          </CardIcon>
        );
      case 'NOT CONNECTED':
      case 'WAITING':
        return (
          <CardIcon color="danger"  className="dragHeader">
            <SentimentVeryDissatisfied className={classes.icons}/>
          </CardIcon>
        );
    }
  };

  render() {
    const { classes, id } = this.props;
    const {
      value, dataType, lastUpdate, isInHome
    } = this.props;

    return (
      <Card>
        <CardHeader color='warning' stats icon>
          {this.getIcon(value)}
          <p className={classes.cardCategory}>
            <FormattedMessage
              id={`informative.realtime.${dataType}.title`}
            />
          </p>
          <h3 className={classes.cardTitle}>
            {value || 'WAITING NO'}
          </h3>
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
  unsubscription: PropTypes.func
};
InformativeRealtimeBox.defaultProps = {
  dataType: 'lifetime',
  color: 'warning',
  value: null,
  lastUpdate: null
};


export default withStyles(boxStyle)(injectIntl(InformativeRealtimeBox));
