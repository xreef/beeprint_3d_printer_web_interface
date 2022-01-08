import { combineReducers } from 'redux';

import version from './version';
import notifications from './notifications';
import subscriptionsServiceWorker from './subscriptionsServiceWorker';
// import inverterDailyVoltage from './inverterDailyVoltage';
// import inverterDailyCurrent from './inverterDailyCurrent';
// import inverterDailyBattery from './inverterDailyBattery';
// import inverterDailyPower from './inverterDailyPower';
// import productionTotals from './productionTotals';
// import monthlyPowerStats from './monthlyPowerStats';
// import inverterInfo from './inverterInfo';
// import inverterAlarms from './inverterAlarms';
// import configuration from './configuration';
import home from './home';
// import daily from './daily';
import printerStats from './printerStats';
import temperatures from './temperatures';
import printingStatus from './printingStatus';
// import historical from './historical';
// import inverterInfoState from './inverterInfoState';
import serverState from './serverState';
import realtimeUpdate from './realtimeUpdate';
import realtimeData from './realtimeData';
import cron from './cron';
import storagePage from './storagePage';
import printingPage from './printingPage';
import streamPage from './streamPage';
import movementPage from './movementPage';
import fileList from './fileList';
import fileUpload from './fileUpload';
import configuration from './configuration';
import cameraControl from './cameraControl';
import configurationServer from './configurationServer';

const reducersBeePrintMKSWIFIMischianti = combineReducers({
  version,
  notifications,
  subscriptionsServiceWorker,
  // inverterDailyVoltage,
  // inverterDailyCurrent,
  // inverterDailyBattery,
  // inverterDailyPower,
  // productionTotals,
  // monthlyPowerStats,
  // inverterInfo,
  // inverterAlarms,
  // configuration,
  home,
  // daily,
  // historical,
  // inverterInfoState,
  serverState,
  realtimeUpdate,
  realtimeData,
  printerStats,
  temperatures,
  printingStatus,
  cron,
  storagePage,
  printingPage,
  fileList,
  fileUpload,
  streamPage,
  movementPage,
  configuration,
  cameraControl,
  configurationServer
});

export default reducersBeePrintMKSWIFIMischianti;
