import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
// core components
import Divider from '@material-ui/core/Divider/Divider';
import StoreIcon from '@material-ui/icons/Store';
import HeaderLinks from '../header/HeaderLinks.jsx';

import sidebarStyle from './style/sidebarStyle.jsx';

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1;
  }
  const {
    classes, color, logo, image, logoText, routes, notifications, addToHomeScreen
  } = props;
  let additionalLink = null;
  if (addToHomeScreen !== null) {
    additionalLink = [
      <Divider key={1} className={classes.whiteDivider} />,
      <List key={2}>
        <div>
          <ListItem button onClick={addToHomeScreen} className={classes.itemLink}>
            <ListItemIcon className={`${classes.itemIcon} ${classes.whiteFont}`}>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText disableTypography className={`${classes.itemText} ${classes.whiteFont}`} primary="Install" />
          </ListItem>
        </div>
      </List>

    ];
  }

  const links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        let activePro = ' ';
        let listItemClasses;
        if (prop.path === '/bottom') {
          activePro = `${classes.activePro} `;
          listItemClasses = classNames({
            [` ${classes[color]}`]: true
          });
        } else {
          listItemClasses = classNames({
            [` ${classes[color]}`]: activeRoute(prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [` ${classes.whiteFont}`]: activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                {typeof prop.icon === 'string' ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <prop.icon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography
              />
            </ListItem>
          </NavLink>
        );
      })}

    </List>
  );
  const brand = (
    <div className={classes.logo}>
      <a href="https://www.linkedin.com/in/renzo-mischianti/" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks notifications={notifications} />
            {links}
            {additionalLink}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
            {additionalLink}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,

  addToHomeScreen: PropTypes.func
};

export default withStyles(sidebarStyle)(Sidebar);
