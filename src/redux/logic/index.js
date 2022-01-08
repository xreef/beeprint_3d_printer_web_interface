// import inverterDailyPowerFetchLogic from './inverterDailyPower';
// import inverterDailyCurrentFetchLogic from './inverterDailyCurrent';
// import inverterBatteryFetchLogic from './inverterDailyBattery';
// import inverterDailyVoltageFetchLogic from './inverterDailyVoltage';
// import productionTotalsFetchLogic from './productionTotals';
// import monthlyPowerStatsFetchLogic from './monthlyPowerStats';
// import inverterInfo from './inverterInfo';
// import inverterAlarms from './inverterAlarms';
// import configurationGET from './configurationGET';
// import configurationPost from './configurationPost';
// import serverState from './serverState';
import realtimeUpdate from './realtimeUpdate';
import printingStatus from './printingStatus';
import cron from './cron';
import fileList from './fileList';
import fileUpload from './fileUpload';
import configurationGET from './configurationGET';
import configurationPost from './configurationPost';
import cameraControl from './cameraControl';

import configurationServerGET from './configurationServerGET';
import configurationServerSET from './configurationServerSET';

export default [
  // ...inverterDailyPowerFetchLogic,
  // ...inverterDailyCurrentFetchLogic,
  // ...inverterBatteryFetchLogic,
  // ...inverterDailyVoltageFetchLogic,
  // ...productionTotalsFetchLogic,
  // ...monthlyPowerStatsFetchLogic,
  // ...inverterInfo,
  // ...inverterAlarms,
  // ...configurationGET,
  // ...configurationPost,
  // ...serverState,
  ...realtimeUpdate,
  ...printingStatus,
  ...cron,
  ...fileList,
  ...fileUpload,
  ...configurationGET,
  ...configurationPost,
  ...cameraControl,

  ...configurationServerGET,
  ...configurationServerSET
];
