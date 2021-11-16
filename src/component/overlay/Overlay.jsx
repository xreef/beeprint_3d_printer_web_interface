import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import overlayStyle from './style/overlayStyle';
import * as colorMod from '../style/material-dashboard-react';


const Overlay = ({ ...props }) => {
  const {
    classes,
    visible
  } = props;

  return (
    (visible)?<div className={classes.backGround}>
      <div className={classes.progress}><CircularProgress size={50} /></div>
    </div>:null
  );
};

Overlay.propTypes = {
  classes: PropTypes.object.isRequired,
  visible: PropTypes.bool
};
Overlay.defaultProps = {
  visible: false
};

export default withStyles(overlayStyle)(Overlay);
