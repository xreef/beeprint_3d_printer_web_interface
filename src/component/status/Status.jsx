import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import boxStyle from '../../layouts/box/style/boxStyle';
import Button from '../customButtons/Button';

function Status({ ...props }) {
  const { classes, status } = props;

  const getElement = (status) => {
    switch (status) {
      case 'ok':
        return (
          <Button justIcon round color="success">
            <SentimentSatisfied className={classes.icons} />
          </Button>
        );
      case 'no':
        return (
          <Button justIcon round color="danger">
            <SentimentVeryDissatisfied className={classes.icons} />
          </Button>
        );
      case 'warning':
        return (
          <Button justIcon round color="warning">
            <SentimentDissatisfied className={classes.icons} />
          </Button>
        );
    }
  };


  return getElement(status);
}

Status.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.oneOf(['ok', 'no', 'warning']).isRequired
};

export default withStyles(boxStyle)(Status);
