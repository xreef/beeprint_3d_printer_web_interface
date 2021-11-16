import Dashboard from '@material-ui/icons/Dashboard';
// import Person from '@material-ui/icons/Person';

// import CalendarViewDay from '@material-ui/icons/CalendarViewDay';
// import Today from '@material-ui/icons/Today';
// import Info from '@material-ui/icons/Info';
// import Warning from '@material-ui/icons/Warning';
// import Settings from '@material-ui/icons/Settings';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Memory from '@material-ui/icons/Memory';
import Print from '@material-ui/icons/Print';
import Videocam from '@material-ui/icons/Videocam';
import Toys from '@material-ui/icons/Toys';
import OpenWith from '@material-ui/icons/OpenWith';

import { FormattedMessage } from 'react-intl';
import React from 'react';
import {
  Home //, Daily, Historical, InverterInfoState, Intro, About
} from '../views';
// import Configuration from '../views/Configuration';
import PrinterStats from "../views/PrinterStats";
import StoragePage from '../views/StoragePage'
import PrintingPage from '../views/PrintingPage'
import StreamPage from '../views/StreamPage'
import MovementPage from '../views/MovementPage'
import { Settings } from '@material-ui/icons'
import Configuration from '../views/Configuration'

const dashboardRoutes = [
  {
    path: '/home',
    sidebarName: <FormattedMessage id="menu.sidebar.home" />,
    navbarName: <FormattedMessage id="menu.navbar.home" />,
    icon: Dashboard,
    component: Home
  },
  {
    path: '/printerstats',
    sidebarName: <FormattedMessage id="menu.sidebar.printerstats" />,
    navbarName: <FormattedMessage id="menu.navbar.printerstats" />,
    icon: Toys, // "content_paste",
    component: PrinterStats
  },
  {
    path: '/movements',
    sidebarName: <FormattedMessage id="menu.sidebar.movements" />,
    navbarName: <FormattedMessage id="menu.navbar.movements" />,
    icon: OpenWith, // "content_paste",
    component: MovementPage
  },
  {
    path: '/storage',
    sidebarName: <FormattedMessage id="menu.sidebar.storage" />,
    navbarName: <FormattedMessage id="menu.navbar.storage" />,
    icon: Memory, // "content_paste",
    component: StoragePage
  },
  {
    path: '/printing',
    sidebarName: <FormattedMessage id="menu.sidebar.printing" />,
    navbarName: <FormattedMessage id="menu.navbar.printing" />,
    icon: Print, // "content_paste",
    component: PrintingPage
  },
  {
    path: '/stream',
    sidebarName: <FormattedMessage id="menu.sidebar.stream" />,
    navbarName: <FormattedMessage id="menu.navbar.stream" />,
    icon: Videocam, // "content_paste",
    component: StreamPage
  },
  // {
  //   path: '/daily',
  //   sidebarName: <FormattedMessage id="menu.sidebar.daily" />,
  //   navbarName: <FormattedMessage id="menu.navbar.daily" />,
  //   icon: CalendarViewDay, // "content_paste",
  //   component: Daily
  // },
  // {
  //   path: '/montly',
  //   sidebarName: <FormattedMessage id="menu.sidebar.monthly" />,
  //   navbarName: <FormattedMessage id="menu.navbar.monthly" />,
  //   icon: Today,
  //   component: Historical
  // },
  // {
  //   path: '/info_state',
  //   sidebarName: <FormattedMessage id="menu.sidebar.information_state" />,
  //   navbarName: <FormattedMessage id="menu.navbar.information_state" />,
  //   icon: Warning,
  //   component: InverterInfoState
  // },
  {
    path: '/configuration',
    sidebarName: <FormattedMessage id="menu.sidebar.configuration" />,
    navbarName: <FormattedMessage id="menu.navbar.configuration" />,
    icon: Settings,
    component: Configuration
  },
  // {
  //   path: '/intro',
  //   sidebarName: <FormattedMessage id="menu.sidebar.introduction" />,
  //   navbarName: <FormattedMessage id="menu.navbar.introduction" />,
  //   icon: Info,
  //   component: Intro
  // },
  // {
  //   path: '/about',
  //   sidebarName: 'About',
  //   navbarName: 'About',
  //   icon: Person,
  //   component: About
  // },
  //  {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   sidebarName: "Upgrade To PRO",
  //   navbarName: "Upgrade To PRO",
  //   icon: Unarchive,
  //   component: UpgradeToPro
  // },
  {
    redirect: true, path: '/', to: '/home', navbarName: 'Redirect'
  }
];

export default dashboardRoutes;
