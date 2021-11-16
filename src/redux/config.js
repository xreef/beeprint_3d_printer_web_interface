export const MICROCONTROLLER_ADRESS = `${(settings.localIP)?settings.localIP:location.hostname}:${settings.localRestPort}`;
export const MICROCONTROLLER_WS_ADRESS = `ws://${(settings.localIP)?settings.localIP:location.hostname}:${settings.localWSPort}`;

export const FILE_UPLOAD_ENDPOINT = 'upload';
export const CONFIGURATION_ENDPOINT = 'configApp';
export const CAMERA_CONTROL_ENDPOINT = 'control';
export const CAMERA_STATUS_ENDPOINT = 'status';
