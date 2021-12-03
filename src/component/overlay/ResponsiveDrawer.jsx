import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DragHandle from '@material-ui/icons/DragHandle';
import ControlPoint from '@material-ui/icons/ControlPoint';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip'
import { Fab } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import KeyboardArrowDownOutlined from '@material-ui/icons/KeyboardArrowDownOutlined'
import { FormattedMessage } from 'react-intl'

const drawerHeight = 45;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'absolute',
    marginTop: drawerHeight,
  },
  navIconHide: {

  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    height: drawerHeight,
    overflow: "hidden",
    paddingTop: 16,
    backgroundColor: "transparent",
    border: "none"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  dragger: {
    top: 16,
    left: 0,
    right: 0,
    cursor: "ns-resize",
    zIndex: 100,
    position: "absolute",
    borderTop: "6px double #ddd",
    backgroundColor: "#747474"
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    isResizing: false,
    lastDownX: 0,
    newWidth: {}
  };

  constructor(props) {
    super(props);
    this.handleMousemove.bind(this);
  }

  handleDrawerToggle = () => {
// debugger
  };

  handleMousedown = e => {
    e.preventDefault();
    this.setState({ isResizing: true, lastDownY: e.clientY  || e.targetTouches[0].pageY });

    this.props.toggleDrawer(true);
  };

  handleMousemove = e => {
    e.preventDefault();
    // we don't want to do anything if we aren't resizing.
    if (!this.state.isResizing) {
      return;
    }

    let offsetBottom =
      document.body.offsetHeight - (e.clientY || e.targetTouches[0].pageY - document.body.offsetTop);
    let minHeight = 3;
    let maxHeight = window.innerHeight-3;
    if (offsetBottom > minHeight && offsetBottom < maxHeight) {
      this.setState({ newHeight: { height: offsetBottom } });
    }
  };

  handleMouseup = e => {
    e.preventDefault();
    this.setState({ isResizing: false });
  };

  componentDidMount() {
    // document.addEventListener('mousemove', e => this.handleMousemove(e));
    // document.addEventListener('mouseup', e => this.handleMouseup(e));
    // document.addEventListener('touchmove', e => this.handleMousemove(e));
    // document.addEventListener('touchend', e => this.handleMouseup(e));
  }

  componentWillUnmount () {
    // document.removeEventListener('mousemove', e => this.handleMousemove(e));
    // document.removeEventListener('mouseup', e => this.handleMouseup(e));
    //
    // document.removeEventListener('touchmove', e => this.handleMousemove(e));
    // document.removeEventListener('touchend', e => this.handleMouseup(e));
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
      if (prevProps.open === true && this.props.open === false) {
        this.setState({ newHeight: { height: 4 } });
      }
  }

  render() {
    const { classes, theme, children } = this.props;

    const drawer = children;

    return (
      <div style={{"zIndex": 1500}} className={classes.root}>
          <Drawer
            variant="permanent"
            open
            anchor={'bottom'}
            classes={{
              paper: classes.drawerPaper
            }}
            PaperProps={{ style: this.state.newHeight }}
          >
            <div
              id="dragger"
              onMouseDown={event => {
                this.handleMousedown(event);
              }}
              className={classes.dragger}
            />
            <Tooltip key="moveButtonTooltipId" placement="top" title={<FormattedMessage id="iframe.button.move" />}>
              <Fab aria-label="Move"
                   style={   {
                     top: 0,
                     left: "calc( 50% - 21px )",
                     cursor: "grab",
                     zIndex: 150,
                     position: "absolute",
                     width: "42px",
                     height: "42px"
                    }}
                 color="secondary"
                 onMouseDown={event => {
                    this.handleMousedown(event);
                  }}
                   onTouchStart={event => {
                     this.handleMousedown(event);
                   }}

                   onMouseMove={e => this.handleMousemove(e)}
                   onMouseUp={e => this.handleMouseup(e)}

                   onTouchMove={e => this.handleMousemove(e)}
                   onTouchEnd={e => this.handleMouseup(e)}
              >
                <ControlPoint fontSize="large" />
              </Fab>
            </Tooltip>
            <div style={{"width": "100%", "height": "100%"}}>
              {drawer}
            </div>
          </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>
            {'You think water moves fast? You should see ice.'}
          </Typography>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool
};
ResponsiveDrawer.defaultProps = {
  open: true
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
