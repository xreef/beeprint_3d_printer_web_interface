import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import footerStyle from "./style/footerStyle.jsx";

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="https://www.mischianti.org" className={classes.block}>
                My site
              </a>
            </ListItem>

            <ListItem className={classes.inlineBlock}>
              <a href="https://github.com/xreef" className={classes.block}>
                GitHub
              </a>
            </ListItem>
              <ListItem className={classes.inlineBlock}>
                  <a href="https://www.thingiverse.com/xxreef/designs" className={classes.block}>
                      Thingiverse
                  </a>
              </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://www.linkedin.com/in/renzo-mischianti/" className={classes.block}>
                Linkedin
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a href="https://www.linkedin.com/in/renzo-mischianti/" className={classes.a}>
              Renzo Mischianti
            </a>, made with love
          </span>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
