/*
tool 'T0' 'T1' ''
 */
export const preHeatTool = (tool, temperature) => {
  if (tool === 'Bed') {
    return 'M140 S' + temperature + '\r\n';
  } else {
    return 'M104 S' + temperature + ' ' + tool + '\r\n';
  }
};

export const multipleStatRequest = () => {
  return 'M105\r\n' +
          'M997\r\n' + // M997 request printig status
          'M994\r\n' +
          'M992\r\n' + // M992 printing time
          'M27\r\n' + // M27 printing percentage
          '\r\n';
};

export const requestFileList = (path = '') => {
  return 'M20 1:' + path + '\r\n';
};

export const selectAndPrint = (file) => {
  return 'M23 ' + file + '\r\n' +
    'M24\r\n' +
    '\r\n';
};
export const printSelectFile = (file) => {
  return 'M23 ' + file + '\r\n';
};
export const printResumeStart = () => {
  return 'M24\r\n';
};
export const printPause = () => {
  return 'M25\r\n';
};
export const printStop = (file) => {
  return 'M26\r\n';
};
export const deleteFile = (file) => {
  return 'M30 1:' + file + '\r\n';
};

// From 0 to 255
export const setFanSpeed = (speed) => {
  return 'M106 S' + speed + '\r\n';
};

export const cooldown = () => {
  return 'M104 S0\r\n' +
          'M140 S0\r\n';
};
export const unlock = () => {
  return 'M84\r\n';
};

export const moveAxes = (axis, step) => {
  let xA = '0.0';
  let yA = '0.0';
  let zA = '0.0';

  if (axis.toUpperCase() === 'X') {
    xA = step + '.0';
  } else if (axis.toUpperCase() === 'Y') {
    yA = step + '.0';
  } else if (axis.toUpperCase() === 'Z') {
    zA = step + '.0';
  }
  return 'G91\r\n' +
  'G0 X' + xA + ' Y' + yA + '.0 Z' + zA + '.0 F3000\r\n' +
  'G90\r\n';
};

export const extrudeFilament = (extruder, step) => {
  return extruder + '\r\n' +
  'G91\r\n' +
  'G1 E' + step + ' F1000\r\n' +
  'G90\r\n';
};

export const homingXY = () => {
  return 'G28 X Y\r\n';
};
export const homingZ = () => {
  return 'G28 Z\r\n';
};
export const homingAll = () => {
  return 'G28 \r\n';
};
export const resetPrinter = () => {
  return 'M107\r\n' +
  'G1 Z10\r\n' +
  'M104 S0\r\n' +
  'M140 S0\r\n' +
  'M84\r\n';
};

export const coolDown = () => {
  return 'M104 S0\r\n' +
          'M140 S0\r\n' +
          'M106 S255\r\n';
};
export const unlockMotors = () => {
  return 'M84\r\n';
}
