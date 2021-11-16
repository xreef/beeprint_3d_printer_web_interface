/**
 * Created by renzo on 17/05/2017.
 */

import { setVersion } from './version';
import { addNotification, shiftNotification } from './notifications';
import { setPushNotificationSupported, setServiceWorkerSubscription, setUserSubscribedToPushNotification } from './subscriptionsServiceWorker';
import {
  setHomeLayout, addElementToHome, removeElementFromHome
} from './home';
import {
  setPrinterStatsLayout
} from './printerStats';
import {
  setTemperatureValues
} from './temperatures';

import {
  printingStatusRequestValues,
  printingStatusSubscribe,
  printingStatusUnsubscribe,
  setPrintingStatusValues,
  setProgressPercentageValues,
  setPrintingFileInfo,
  setPrintingTime

} from './printingStatus';

import {
  fileListRequest,
  fileListStart,
  fileListError,
  fileListEnd,
  fileAdd,
  fileDelete
} from './fileList';

import {
  webSocketSendMessage,
  webSocketMessage,
  webSocketOpen,
  webSocketClose
} from './realtimeUpdate';

import {
  setPowerRealTime
} from './realtimeData';
import { setStoragePageLayout } from './storagePage';
import { setPrintingPageLayout } from './printingPage';
import { setStreamPageLayout } from './streamPage';
import { setMovementPageLayout } from './movementPage';
import { serverStateWIFIStrenghtFetchFulfilled } from './serverState';
import { fileUploadPost, fileUploadPostCancel, fileUploadPostFulfilled, fileUploadPostRejected,
  fileUploadProgress, fileReaderProgress } from './fileUpload';
import {
  configurationFetch, configurationFetchCancel, configurationFetchFulfilled, configurationFetchRejected,
  configurationFieldUpdated, configurationFieldInvalid, configurationAdd, configurationAddSuccess, configurationAddFailed
} from './configuration';
import {
  cameraControlFetch, cameraControlFetchCancel, cameraControlFetchFulfilled, cameraControlFetchRejected,
  cameraStatusFetch,
  cameraStatusFetchCancel,
  cameraStatusFetchFulfilled,
  cameraStatusFetchRejected
} from './cameraControl';

export {
  setPrinterStatsLayout,

  setVersion,
  addNotification,
  shiftNotification,
  setPushNotificationSupported,
  setServiceWorkerSubscription,
  setUserSubscribedToPushNotification,
  // inverterDailyPowerFetch, inverterDailyPowerFetchCancel, inverterDailyPowerFetchFulfilled, inverterDailyPowerFetchRejected,
  // inverterDailyCurrentFetch, inverterDailyCurrentFetchCancel, inverterDailyCurrentFetchFulfilled, inverterDailyCurrentFetchRejected,
  // inverterBatteryFetch, inverterBatteryFetchCancel, inverterBatteryFetchFulfilled, inverterBatteryFetchRejected,
  // inverterDailyVoltageFetch, inverterDailyVoltageFetchCancel, inverterDailyVoltageFetchFulfilled, inverterDailyVoltageFetchRejected,
  // productionTotalsFetch, productionTotalsFetchCancel, productionTotalsFetchFulfilled, productionTotalsFetchRejected,
  // monthlyPowerStatsFetch, monthlyPowerStatsFetchCancel, monthlyPowerStatsFetchFulfilled, monthlyPowerStatsFetchRejected,
  // inverterInfoFetch, inverterInfoFetchCancel, inverterInfoFetchFulfilled, inverterInfoFetchRejected,
  // inverterAlarmsFetch, inverterAlarmsFetchCancel, inverterAlarmsFetchFulfilled, inverterAlarmsFetchRejected,
  // configurationFetch, configurationFetchCancel, configurationFetchFulfilled, configurationFetchRejected,
  // configurationFieldUpdated, configurationFieldInvalid, configurationAdd, configurationAddSuccess, configurationAddFailed,
  setHomeLayout,
  addElementToHome,
  removeElementFromHome,
  // setDailyLayout,
  // setHistoricalLayout,
  // setInverterInfoStateLayout,
  // serverStateFetch, serverStateFetchCancel, serverStateFetchFulfilled, serverStateFetchRejected, serverStateBatteryFetchFulfilled, serverStateWIFIStrenghtFetchFulfilled,
  webSocketSendMessage,
  webSocketMessage,
  webSocketOpen,
  webSocketClose,
  setPowerRealTime,
  setTemperatureValues,
  setPrintingStatusValues,
  printingStatusRequestValues,
  printingStatusSubscribe,
  printingStatusUnsubscribe,
  setStoragePageLayout,
  setProgressPercentageValues,
  setPrintingFileInfo,
  setPrintingTime,

  fileListRequest,
  fileListStart,
  fileListError,
  fileListEnd,
  fileAdd,
  fileDelete,

  fileUploadPost, fileUploadPostCancel, fileUploadPostFulfilled, fileUploadPostRejected,
  fileUploadProgress, fileReaderProgress,

  setPrintingPageLayout,
  setStreamPageLayout,
  setMovementPageLayout,
  configurationFetch, configurationFetchCancel, configurationFetchFulfilled, configurationFetchRejected,
  configurationFieldUpdated, configurationFieldInvalid, configurationAdd, configurationAddSuccess, configurationAddFailed,
  serverStateWIFIStrenghtFetchFulfilled,
  cameraControlFetch, cameraControlFetchCancel, cameraControlFetchFulfilled, cameraControlFetchRejected,
  cameraStatusFetch,
  cameraStatusFetchCancel,
  cameraStatusFetchFulfilled,
  cameraStatusFetchRejected

};
