import React from 'react';
import PropTypes from 'prop-types';

// import moment from 'moment';

import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage, injectIntl } from 'react-intl';
import Refresh from '@material-ui/icons/Refresh';
import FavoriteIconSelected from '@material-ui/icons/Favorite';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import Card from '../../../component/card/Card';
import CardHeader from '../../../component/card/CardHeader';
// import CardIcon from '../../../component/card/CardIcon.jsx';
import CardBody from '../../../component/card/CardBody';
// import CardFooter from '../../../component/card/CardFooter.jsx';


import boxStyle from '../style/boxStyle';
// import Table from '../../../component/table/Table';
import AreaChart from '../../../component/charts/AreaChart';

import * as colorMod from '../../../component/style/material-dashboard-react';
import Button from '../../../component/customButtons/Button';
import dates from '../../../utils/date/dates';


class ChartBoxTemperaturesRealtime extends React.Component {
  constructor(props) {
    super(props);
    const { day, dataType } = this.props;

    // let momentDay;
    // if (day && day !== '') {
    //   momentDay = moment(day, 'YYYYMMDD');
    // } else {
    //   momentDay = moment();
    // }
    // props.inverterDailyFetch(momentDay.format('YYYYMMDD'), dataType);

    // this.state = {
    //   dayTextValue: momentDay.format('YYYY-MM-DD')
    // };
    this.areaChart = React.createRef();

  }

  componentDidMount() {
    window.addEventListener('resize', this.refreshData);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.refreshData);
  }

  refreshData = () => {
    this.refreshChart();
  };

  refreshChart = () => {}

  handleHome = () => {
    const {
      isInHome, removeElementFromHome, addElementToHome, boxType, yCoordinateList
    } = this.props;
    if (isInHome) {
      removeElementFromHome(boxType);
    } else {
      addElementToHome(boxType);
    }
  };

  render() {
    // debugger
    const { classes, id, isInHome } = this.props;
    const {
      data, dataType, isFetching, yCoordinateList
    } = this.props;
//     const { dayTextValue } = this.state;
    const { color, colorB, colorT0, colorT1, title, subtitle } = this.props;

    // const momentDay = moment(dayTextValue, 'YYYY-MM-DD');
    //
    // const dayFormatted = this.props.intl.formatDate(new Date(momentDay.valueOf()), {
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    // });

    let production0 = true;
    data.forEach((elem) => {
      if (elem.val > 0) production0 = false;
    });

    return (
      <Card id={id} key={id}>
        <CardHeader color={color} className="dragHeader">
          <h4 className={classes.cardTitleWhite}>
            <FormattedMessage
              id={`chart.${dataType}.title`}
              defaultMessage={title}
            />
            <Button justIcon round color={color} className={classes.buttonHeader2} onClick={this.handleHome}>
              {isInHome ? <FavoriteIconSelected /> : <FavoriteIcon />}
            </Button>
            <Button justIcon round color={color} className={classes.buttonHeader} onClick={this.refreshData}>
              <Refresh />
            </Button>
          </h4>
          <div className={classes.cardCategoryWhite}>
            <FormattedMessage
              id={`chart.${dataType}.subtitle`}
              defaultMessage={subtitle}
            />
          </div>
        </CardHeader>
        <CardBody style={{overflow: 'hidden'}}>
          {(data && data.length > 1)
              ? (!production0)
                ? <AreaChart setRefresh={click => this.refreshChart = click} yCoordinateList={yCoordinateList} data={data} color={color} colorT0={colorT0} colorT1={colorT1} colorB={colorB} ratio={1} dataType={dataType} type="hybrid" />
                : <div className={classes.progress}><FormattedMessage id="chart.no_production" /></div>
            : <div className={classes.progress}><CircularProgress style={{ color: colorMod[`${color}Color`] }} size={50} /></div>
                }
        </CardBody>
      </Card>
    );
  }
}

ChartBoxTemperaturesRealtime.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  day: PropTypes.string,
  dataType: PropTypes.string,
  id: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose',
  ]),
  colorT0: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose',
  ]),
  colorT1: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose',
  ]),
  colorB: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose',
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isFetching: PropTypes.bool,
  // inverterDailyFetch: PropTypes.func.isRequired,
  addElementToHome: PropTypes.func.isRequired,
  removeElementFromHome: PropTypes.func.isRequired,
  boxType: PropTypes.string.isRequired,
  isInHome: PropTypes.bool.isRequired
};
ChartBoxTemperaturesRealtime.defaultProps = {
  // day: moment().format('YYYYMMDD'),
  dataType: 'power',
  color: 'warning',
  title: 'Title',
  subtitle: 'Data of {day}',
  isFetching: false,
};

export default withStyles(boxStyle)(injectIntl(ChartBoxTemperaturesRealtime));
