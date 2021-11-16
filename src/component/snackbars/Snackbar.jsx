import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Snack from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons
import Close from '@material-ui/icons/Close';
// core components
import snackbarContentStyle from './style/snackbarContentStyle';

function Snackbar({ ...props }) {
  const {
    classes, message, close, icon, place, open, onClose, ClickAwayListenerProps, autoHideDuration
  } = props;
  let { color } = props;
  if (color === 'error') {
    color = 'danger';
  }
  let action = [];
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined
  });
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={onClose}
      >
        <Close className={classes.close} />
      </IconButton>
    ];
  }
  return (
    <Snack
      onClose={onClose}
      ClickAwayListenerProps={ClickAwayListenerProps}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{
        vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
        horizontal:
          place.indexOf('l') !== -1
            ? 'left'
            : place.indexOf('c') !== -1 ? 'center' : 'right'
      }}
      open={open}
      message={(
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
)}
      action={action}
      ContentProps={{
        classes: {
          root: `${classes.root} ${classes[color]}`,
          message: classes.message
        }
      }}
    />
  );
}

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'error', 'primary']),
  close: PropTypes.bool,
  icon: PropTypes.func,
  place: PropTypes.oneOf(['tl', 'tr', 'tc', 'br', 'bl', 'bc']),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  autoHideDuration: PropTypes.number,
  ClickAwayListenerProps: PropTypes.object
};

Snackbar.defaultProps = {
  place: 'br',
  close: true,
  // ClickAwayListenerProps: { mouseEvent: null }
};

export default withStyles(snackbarContentStyle)(Snackbar);
