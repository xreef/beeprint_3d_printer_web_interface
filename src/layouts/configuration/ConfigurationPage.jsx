import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';

import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';

import Slide from '@material-ui/core/Slide';

import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

import classNames from 'classnames';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import avatar from '../../resources/images/bill.jpg';
import siteLogo from '../../resources/images/logo.jpg';
import appLogo from '../../resources/images/favicon/launcher-icon-trasp.png';
import attribution from '../../resources/images/by-nc-nd.eu.png';
import CardFooter from '../../component/card/CardFooter';
import CardBody from '../../component/card/CardBody';
import CardAvatar from '../../component/card/CardAvatar';
import CardHeader from '../../component/card/CardHeader';
import Card from '../../component/card/Card';
import Button from '../../component/customButtons/Button';
import GridContainer from '../../component/grid/GridContainer';
import GridItem from '../../component/grid/GridItem';
import Overlay from '../../component/overlay/Overlay';

import boxStyle from '../box/style/boxStyle'

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

function shallowCompare(newObj, prevObj) {
  for (const key in newObj) {
    if (newObj[key] !== prevObj[key]) return true;
  }
  return false;
}

class ConfigurationPage extends React.PureComponent {
  constructor(props) {
    super(props);

    // let serverConfiguration = (props.configuration && props.configuration)?props.configuration:null;

    const messagesIntl = defineMessages(
      {
        finishprintemail: { id: 'configuration.email.notification.finishprintemail.label' }
      }
    );


    this.state = {
      serverSMTP: {
        server: 'smtp.gmail.com',
        port: 465,
        login: '',
        password: '',
        from: ''
      },
      emailNotification: {
        isNotificationEnabled: false,
        finishPrintEmail: '',
      },
      camera: {
        streamingUrl: ''
      },

      // Password textfield
      showPassword: false
    };
  }


  componentDidMount() {
    this.props.configurationFetch();
  }

  componentDidUpdate(oldProps) {
    if
    ((this.props.configuration != null && oldProps.configuration === null)
      || (this.props.configuration != null && oldProps.configuration != null && shallowCompare(this.props.configuration.server, oldProps.configuration.server))) {
      this.setState({
        // preferences: { ...this.state.preferences, ...this.props.configuration.preferences },
        // server: { ...this.state.server, ...this.props.configuration.server },
        serverSMTP: { ...this.state.serverSMTP, ...this.props.configuration.serverSMTP },
        emailNotification: { ...this.state.emailNotification, ...this.props.configuration.emailNotification },
        camera: { ...this.state.camera, ...this.props.configuration.camera }
      });
    }
  }



  handleSMTPServerChange = (event) => {
    this.setState({
      serverSMTP: {
        ...this.state.serverSMTP,
        ...{ [event.target.name]: event.target.value }
      }
    });
  };

  handleCameraChange = (event) => {
    this.setState({
      camera: {
        ...this.state.camera,
        ...{ [event.target.name]: event.target.value }
      }
    });
  };

  handleChangeEnabled = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClickOpen = (modal) => {
    const x = [];
    x[modal] = true;
    this.setState(x);
  };

  handleClose = (modal) => {
    const x = [];
    x[modal] = false;
    this.setState(x);
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  postConfigurationUpdate = type => (event) => {
    const { configuration, configurationFieldUpdated, configurationAdd } = this.props;
    // const { server } = this.state;

    configurationFieldUpdated({ [type]: this.state[type] });
    configurationAdd(event);
  };

  handleEmailNotificationChange = (event) => {
    this.setState({
      emailNotification: {
        ...this.state.emailNotification,
        ...{ [event.target.name]: (event.target.name === 'isNotificationEnabled') ? event.target.checked : event.target.value }
      }
    });
  };

  render() {
    const messagesIntl = defineMessages(
      {
        email: { id: 'configuration.email.table.email' },
        name: { id: 'configuration.email.table.name' },
        alarms: { id: 'configuration.email.table.alarms' },
        channel1: { id: 'configuration.email.table.channel1' },
        channel2: { id: 'configuration.email.table.channel2' },
        states: { id: 'configuration.email.table.states' },

        alert: { id: 'configuration.email.table.value.alert' },
        nothing: { id: 'configuration.email.table.value.nothing' },
        ever: { id: 'configuration.email.table.value.ever' }
      }
    );

    const labelAlertSelected = { none: messagesIntl.nothing, on_problem: messagesIntl.alert, all: messagesIntl.ever };

    const { classes, configuration, isFetching, intl } = this.props;
    const locale = intl.locale;

    return (
      <div>
        <Overlay visible={isFetching} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            {(false)?(
            [<GridContainer>

              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      <FormattedMessage
                        id="configuration.smtpserver.title"
                      />
                    </h4>
                    <p className={classes.cardCategoryWhite}>
                      <FormattedMessage
                        id="configuration.smtpserver.subtitle"
                      />
                    </p>
                  </CardHeader>
                  <form onSubmit={this.postConfigurationUpdate('serverSMTP')}>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={8}>
                          <TextField
                            required

                            id="server"
                            name="server"
                            label="SMTP Server"
                            fullWidth
                            className={classes.textField}
                            style={{width: '100%'}}
                            value={this.state.serverSMTP.server}
                            onChange={this.handleSMTPServerChange}
                            margin="normal"
                            variant="standard"
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <TextField
                            required
                            style={{width: '100%'}}
                            id="SMTPPort"
                            name="SMTPPort"
                            label="SMTP Port"
                            type="number"
                            fullWidth
                            className={classes.textField}
                            value={this.state.serverSMTP.port}
                            onChange={this.handleSMTPServerChange}
                            margin="normal"
                            variant="standard"
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <Grid container spacing={8} alignItems="flex-end" style={{margin: '0px', padding: '0px'}}>
                            <Grid item style={{margin: '0px', padding: '0px'}}>
                              <AccountCircle style={{margin: '0px', padding: '0px'}} />
                            </Grid>
                            <Grid item style={{ width: 'calc(100% - 90px)', margin: '0px', padding: '0px' }}>
                              <TextField
                                required
                                style={{width: '100%'}}
                                id="login"
                                name="login"
                                label="Login"
                                fullWidth
                                className={classes.textField}
                                value={this.state.serverSMTP.login}
                                onChange={this.handleSMTPServerChange}
                                // margin="normal"
                                variant="standard"
                              />
                            </Grid>
                          </Grid>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <FormControl
                            required
                            className={classNames(classes.margin, classes.textField)} style={{width: '100%'}}
                          >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input

                              style={{width: '100%'}}
                              id="password"
                              name="password"
                              type={this.state.showPassword ? 'text' : 'password'}
                              value={this.state.serverSMTP.password}
                              onChange={this.handleSMTPServerChange}
                              endAdornment={(
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                  >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
)}
                            />
                          </FormControl>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <TextField
                            required
                            style={{width: '100%'}}
                            id="email-from-input"
                            label="EMail from"
                            value={this.state.serverSMTP.from}
                            onChange={this.handleSMTPServerChange}
                            fullWidth
                            className={classes.textField}
                            type="email"
                            name="from"
                            autoComplete="email"
                            margin="normal"
                            variant="standard"
                          />

                        </GridItem>

                      </GridContainer>
                    </CardBody>
                    <CardFooter>
                      <Button color="primary" type="submit">
                        <FormattedMessage
                          id="configuration.smtpserver.update"
                        />
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>

            </GridContainer>,
            <GridContainer>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage
                      id="configuration.email.notification.title"
                    />
                  </h4>
                  <p className={classes.cardCategoryWhite}>
                    <FormattedMessage
                      id="configuration.email.notification.subtitle"
                    />
                  </p>
                </CardHeader>


                <form onSubmit={this.postConfigurationUpdate('emailNotification')}>

                  <CardBody>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <FormControlLabel
                          control={(
                            <Switch
                              checked={this.state.emailNotification.isNotificationEnabled}
                              onChange={this.handleEmailNotificationChange}
                              value="isNotificationEnabled"
                              name="isNotificationEnabled"
                              color="primary"
                              classes={{
                                switchBase: classes.switchBase,
                                checked: classes.switchChecked,
                                // icon: classes.switchIcon,
                                // iconChecked: classes.switchIconChecked,
                                // bar: classes.switchBar
                              }}
                            />
                          )}
                          classes={{
                            label: classes.label
                          }}
                          label={<FormattedMessage id="configuration.email.notification.enabled.label" />}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          required
                          id="finishPrintEmail"
                          name="finishPrintEmail"
                          label={(
                            <FormattedMessage
                              id="configuration.email.notification.finishprintemail.label"
                            />
                          )}
                          onChange={this.handleEmailNotificationChange}
                          style={{ margin: 8 }}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          value={this.state.emailNotification.finishPrintEmail}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" type="submit">
                      <FormattedMessage
                        id="configuration.email.notification.update"
                      />
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridContainer>]):null
            }
            <GridContainer>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    <FormattedMessage
                      id="configuration.camera.title"
                    />
                  </h4>
                  <p className={classes.cardCategoryWhite}>
                    <FormattedMessage
                      id="configuration.camera.subtitle"
                    />
                  </p>
                </CardHeader>


                <form onSubmit={this.postConfigurationUpdate('camera')}>

                  <CardBody>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          required
                          id="streamingUrl"
                          name="streamingUrl"
                          label={(
                            <FormattedMessage
                              id="configuration.camera.streamingurl.label"
                            />
                          )}
                          onChange={this.handleCameraChange}
                          style={{ margin: 8 }}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          value={this.state.camera.streamingUrl}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" type="submit">
                      <FormattedMessage
                        id="configuration.camera.update"
                      />
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="https://www.mischianti.org" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>CREATOR</h6>
                <h4 className={classes.cardTitle}>Renzo Mischianti</h4>
                <p className={classes.description}>
                  renzo@mischianti.org
                </p>
                <p className={classes.description}>
                  <a href="https://www.mischianti.org">
                    <img
                      src={siteLogo}
                      style={{
                        width: '50px',
                        verticalAlign: 'middle',
                        paddingRight: '10px'
                      }
                    }
                      alt="A blog of digital electronics and programming (Bumblebee can't fly)"
                    />

                    www.mischianti.org
                  </a>
                </p>
                <p className={classes.description}>
                  <a href="https://www.mischianti.org">
                    <img
                      src={appLogo}
                      style={{
                        width: '50px',
                        verticalAlign: 'middle',
                        paddingRight: '10px'
                      }
                      }
                      alt="BeePrint: Web interface for MKS WIFI (FlyingBear Ghost 5) 3D printer"
                    />

                    BeePrint
                  </a>
                </p>
                <p className={classes.description}>
                  <a href={(locale.toLowerCase().indexOf('it')>=0)?'https://creativecommons.org/licenses/by-nc-nd/3.0/it/legalcode':'https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode'}>
                    <img
                      src={attribution}
                      style={{
                        height: '30px',
                        verticalAlign: 'middle',
                        paddingRight: '10px'
                      }
                      }
                      alt="Attribution-NonCommercial-NoDerivatives 4.0 International"
                    />
                  </a>
                </p>
                {/* <Button color="primary" round link="www.mischianti.org"> */}
                {/* Follow */}
                {/* </Button> */}
              </CardBody>
            </Card>
          </GridItem>

        </GridContainer>
      </div>
    );
  }
}

ConfigurationPage.propTypes = {
  classes: PropTypes.object.isRequired,
  configurationFetch: PropTypes.func.isRequired,
  configurationAdd: PropTypes.func.isRequired,
  // addNotification: PropTypes.func.isRequired,
  configurationFieldUpdated: PropTypes.func.isRequired
};
export default withStyles(boxStyle)(injectIntl(ConfigurationPage));
