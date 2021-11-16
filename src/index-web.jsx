import 'regenerator-runtime/runtime.js';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'intl';
import { IntlProvider } from 'react-intl';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/it';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import KeyboardArrowDownOutlined from '@material-ui/icons/KeyboardArrowDownOutlined';
// import moment from 'moment';

// Our translated strings
import localeData from './i18n/data.json';

// import dataFile from "../resources/data/esempio_dati.txt"

import './style/app.scss';
import configureStore, { axiosLibraryInterceptor } from './utils/configureStore';

import indexRoutes from './routes/index';
import axios from 'axios';
import { Fab, SwipeableDrawer } from '@material-ui/core'
import ResponsiveDrawer from './component/overlay/ResponsiveDrawer'

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/en'); // Add locale data for de
  require('@formatjs/intl-pluralrules/locale-data/it'); // Add locale data for de
}

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/locale-data/en'); // Add locale data for de
  require('@formatjs/intl-relativetimeformat/locale-data/it'); // Add locale data for de
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      // sm: 600,
      // md: 960,
      // lg: 1280,
      // xl: 1920,
      sm: 960,
      md: 1920,
      lg: 2880,
      xl: 1920*2,

    },
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiInput: {
      underline: {
        // '&:before': { //underline color when textfield is inactive
        //   backgroundColor: 'red',
        // },
        // '&:hover:not($disabled):before': { //underline color when hovered
        //   backgroundColor: 'green',
        // },
      }
    }
  }
});

String.prototype.toCamelCase = function () {
  return this.replace(/\b(\w)/g, (match, capture) => capture.toUpperCase()).replace(/\s+/g, '');
};

// addLocaleData([...en, ...it]);

class App extends React.Component {
  constructor (props) {
    super(props);

    // let data = dataFile;

    this.store = configureStore('beeprint_mks_wifi_mischianti_ui',
      {
        home: {
          layouts: {
            lg: [], md: [], sm: [], xs: [], xxs: []
          },
          elements: []
        }

      },
      true);

    this.state = {
      advOpen: true
    }
  }

  componentDidMount () {
    // axiosLibraryInterceptor(axios);
  }

  toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ advOpen: open });
  };

  toggleDrawerCallback = (open) => {
    this.setState({ advOpen: open });
  }
  // Change flux for correct data name
  render () {
    const language = navigator.language || navigator.userLanguage;
    const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
    // Try full locale, try locale without region code, fallback to 'en'
    const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    // moment.locale(language);

    return (
      <Provider store={this.store}>
        <IntlProvider locale={language} messages={messages}>
          <MuiThemeProvider theme={theme}>

            <HashRouter>
              {/* <ResponsiveContainer/> */}
              <Switch>
                {indexRoutes.map((prop, key) => <Route path={prop.path} component={prop.component} key={key.toString()} />)}
              </Switch>
            </HashRouter>

          </MuiThemeProvider>
        </IntlProvider>
        <ResponsiveDrawer theme={{ direction: 'bottom'}} classes={{}} open={this.state.advOpen} toggleDrawer={this.toggleDrawerCallback} >
          <Fab
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
            style={{"position": "absolute", "backgroundColor": "crimson", "right": "12px", "top": "12px"}} onClick={this.toggleDrawer(false)}
          >
            <KeyboardArrowDownOutlined/>
            Close
          </Fab>

          <iframe src="https://www.mischianti.org/?ref=BeePrint" style={{"height": "100%"}}>No data</iframe>
        </ResponsiveDrawer>


      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));