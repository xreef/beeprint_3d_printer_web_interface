/*
tool 'T0' 'T1' ''
 */
export const preHeatTool = (tool, temperature) => {
  if (tool === 'Bed') {
    return 'M140 S' + temperature + '\n';
  } else {
    return 'M104 S' + temperature + ' ' + tool + '\n';
  }
};

export const multipleStatRequest = () => {
  return 'M105\n' +
          'M997\n' + // M997 request printig status
          'M994\n' +
          'M992\n' + // M992 printing time
          'M27\n' + // M27 printing percentage
          '\n';
};

export const requestFileList = (path = '') => {
  return 'M20 1:' + path + '\n';
};

export const selectAndPrint = (file) => {
  return 'M23 ' + file + '\n' +
    'M24\n' +
    '\n';
};
export const printSelectFile = (file) => {
  return 'M23 ' + file + '\n';
};
export const printResumeStart = () => {
  return 'M24\n';
};
export const printPause = () => {
  return 'M25\n';
};
export const printStop = (file) => {
  return 'M26\n';
};
export const deleteFile = (file) => {
  return 'M30 1:' + file + '\n';
};

// From 0 to 255
export const setFanSpeed = (speed) => {
  return 'M106 S' + speed + '\n';
};

export const cooldown = () => {
  return 'M104 S0\n' +
          'M140 S0\n';
};
export const unlock = () => {
  return 'M84\n';
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
  return 'G91\n' +
  'G0 X' + xA + ' Y' + yA + '.0 Z' + zA + '.0 F3000\n' +
  'G90\n';
};

export const extrudeFilament = (extruder, step) => {
  return extruder + '\n' +
  'G91\n' +
  'G1 E' + step + ' F1000\n' +
  'G90\n';
};

export const homingXY = () => {
  return 'G28 X Y\n';
};
export const homingZ = () => {
  return 'G28 Z\n';
};
export const homingAll = () => {
  return 'G28 \n';
};
export const resetPrinter = () => {
  return 'M107\n' +
  'G1 Z10\n' +
  'M104 S0\n' +
  'M140 S0\n' +
  'M84\n';
};

export const coolDown = () => {
  return 'M104 S0\n' +
          'M140 S0\n' +
          'M106 S255\n';
};
export const unlockMotors = () => {
  return 'M84\n';
}
