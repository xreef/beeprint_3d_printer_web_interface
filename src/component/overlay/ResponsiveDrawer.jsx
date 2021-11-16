import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DragHandle from '@material-ui/icons/DragHandle';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

const drawerHeight = 240;

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
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  dragger: {
    top: 0,
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

  };

  handleMousedown = e => {
    e.preventDefault();
    this.setState({ isResizing: true, lastDownY: e.clientY });

    this.props.toggleDrawer(true);
  };

  handleMousemove = e => {
    e.preventDefault();
    // we don't want to do anything if we aren't resizing.
    if (!this.state.isResizing) {
      return;
    }

    let offsetBottom =
      document.body.offsetHeight - (e.clientY - document.body.offsetTop);
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
    document.addEventListener('mousemove', e => this.handleMousemove(e));
    document.addEventListener('mouseup', e => this.handleMouseup(e));
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
              {drawer}
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
