import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import SignalWifi4Bar from '@material-ui/icons/SignalWifi4Bar';
import SignalWifi3Bar from '@material-ui/icons/SignalWifi3Bar';
import SignalWifi2Bar from '@material-ui/icons/SignalWifi2Bar';
import SignalWifi1Bar from '@material-ui/icons/SignalWifi1Bar';
import SignalWifi0Bar from '@material-ui/icons/SignalWifi0Bar';

// import Battery20 from '@material-ui/icons/Battery20';
// import Battery30 from '@material-ui/icons/Battery30';
// import Battery50 from '@material-ui/icons/Battery50';
// import Battery60 from '@material-ui/icons/Battery60';
// import Battery80 from '@material-ui/icons/Battery80';
// import Battery90 from '@material-ui/icons/Battery90';
// import BatteryFull from '@material-ui/icons/BatteryFull';

import BatteryUnknown from '@material-ui/icons/BatteryUnknown';

import Menu from '@material-ui/icons/Menu';
// core components
import HeaderLinks from './HeaderLinks';
import Button from '../customButtons/Button';

import headerStyle from './style/headerStyle';

function Header({ ...props }) {
  function getSignalStrenght(signal) {
    if (signal < -90) { return <SignalWifi0Bar />; }
    if (signal < -80) { return <SignalWifi1Bar />; }
    if (signal < -70) { return <SignalWifi2Bar />; }
    if (signal < -67) { return <SignalWifi3Bar />; }
    // if (signal < -30) { return SignalWifi4Bar; }
    return <SignalWifi4Bar />;
  }

  // function getBattery(voltage) {
  //   const refVotlageMax = 4.2;
  //   const refVotlageMin = 3.3;
  //   const coefficent = refVotlageMax - refVotlageMin;
  //   const currentCoefficient = voltage - refVotlageMin;
  //   if (currentCoefficient < 0.1) { return <BatteryUnknown />; }
  //   if (currentCoefficient > coefficent * 98 / 100) { return <BatteryFull />; }
  //   if (currentCoefficient > coefficent * 90 / 100) { return <Battery90 />; }
  //   if (currentCoefficient > coefficent * 80 / 100) { return <Battery80 />; }
  //   if (currentCoefficient > coefficent * 60 / 100) { return <Battery60 />; }
  //   if (currentCoefficient > coefficent * 50 / 100) { return <Battery50 />; }
  //   if (currentCoefficient > coefficent * 30 / 100) { return <Battery30 />; }
  //   if (currentCoefficient > coefficent * 20 / 100) { return <Battery20 />; }
  //
  //   // if (signal < -30) { return SignalWifi4Bar; }
  //   return <BatteryUnknown />;
  // }

  function makeBrand() {
    let name;
    props.routes.map((prop, key) => {
      if (prop.path === props.location.pathname) {
        name = prop.navbarName;
      }
      return null;
    });
    return name;
  }
  const { classes, color } = props;
  const { notifications, signalStrenght, batteryVoltage } = props;
  const appBarClasses = classNames({
    [` ${classes[color]}`]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        {getSignalStrenght(signalStrenght)}
        {/*{getBattery(batteryVoltage)}*/}
        <Hidden smDown implementation="css">
          <HeaderLinks notifications={notifications} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  notifications: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  signalStrenght: PropTypes.number,
  batteryVoltage: PropTypes.number
};

Header.defaultProps = {
  signalStrenght: -100,
  batteryVoltage: 0
};

export default withStyles(headerStyle)(Header);
