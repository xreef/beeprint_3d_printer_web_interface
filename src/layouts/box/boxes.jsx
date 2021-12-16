import React from 'react';

import InformativeBoxT0TempContainer from '../../containers/views/box/InformativeBoxT0TempContainer';
import InformativeBoxT1TempContainer from '../../containers/views/box/InformativeBoxT1TempContainer';
import InformativeBoxBedTempContainer from '../../containers/views/box/InformativeBoxBedTempContainer';
import InformativeBoxStatusContainer from '../../containers/views/box/InformativeBoxStatusContainer';
import ChartBoxTemperaturesContainer from '../../containers/views/box/ChartBoxTemperaturesContainer';

import TableBoxFileListContainer from '../../containers/views/box/TableBoxFileListContainer'

import FileUploadContainer from '../../containers/views/box/FileUploadContainer'
import InformativeBoxPrintingContainer from '../../containers/views/box/InformativeBoxPrintingContainer'
import InformativeBoxStreamContainer from '../../containers/views/box/InformativeBoxStreamContainer'
import InformativeBoxMoveContainer from '../../containers/views/box/InformativeBoxMoveContainer'
import InformativeBoxFanContainer from '../../containers/views/box/InformativeBoxFanContainer'

import GCodeEditor from './inputBox/GCodeEditor'
import GCodeSenderContainer from '../../containers/views/box/GCodeSenderContainer'

const boxes = {
  inputGCodeEditor: {
    additionalInfo: {
      classObj: (id, props) => (<GCodeSenderContainer key={id} id={id} {...props} />),
      defaultProps: {
        color: 'success'
      },
      boxType: 'inputGCodeEditor'
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 3,
    minH: 2,
    maxH: 6,
    w: 1,
    h: 2
  },
  informativeBoxT0TempContainer: {
    additionalInfo: {
      classObj: (id, props) => (<InformativeBoxT0TempContainer key={id} id={id} {...props} />),
      defaultProps: {
        dataType: 'T0Temp',
        color: 'success',
        value: 0,
        lastUpdate: null
      },
      boxType: 'informativeBoxT0TempContainer'
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 1,
    minH: 2,
    maxH: 2,
    w: 1,
    h: 2
  },
  informativeBoxT1TempContainer: {
    additionalInfo: {
      classObj: (id, props) => (<InformativeBoxT1TempContainer key={id} id={id} {...props} />),
      defaultProps: {
        dataType: 'T1Temp',
        color: 'warning',
        value: 0,
        lastUpdate: null
      },
      boxType: 'informativeBoxT1TempContainer'
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 1,
    minH: 2,
    maxH: 2,
    w: 1,
    h: 2
  },
  informativeBoxBedTempContainer: {
    additionalInfo: {
      classObj: (id, props) => (<InformativeBoxBedTempContainer key={id} id={id} {...props} />),
      defaultProps: {
        dataType: 'bed',
        color: 'danger',
        value: 0,
        lastUpdate: null,
        maxValue: 130
      },
      boxType: 'informativeBoxBedTempContainer'
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 1,
    minH: 2,
    maxH: 2,
    w: 1,
    h: 2
  },
  informativeBoxFanContainer: {
    additionalInfo: {
      classObj: (id, props) => (<InformativeBoxFanContainer key={id} id={id} {...props} />),
      defaultProps: {
        dataType: 'fan',
        color: 'rose'
      },
      boxType: 'informativeBoxFanContainer'
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 1,
    minH: 2,
    maxH: 2,
    w: 1,
    h: 2
  },
  informativeBoxStatusContainer: {
    additionalInfo: {
      classObj: (id, props) => (<InformativeBoxStatusContainer key={id} id={id} {...props} />),
      defaultProps: {
        dataType: 'status',
        value: 'WAITING',
        lastUpdate: null
      },
      boxType: 'informativeBoxStatusContainer'
    },
    resize: false,
    close: true,
    minW: 1,
    maxW: 1,
    minH: 1,
    maxH: 1,
    w: 1,
    h: 1
  },
  /*
  const primaryColor = '#9c27b0';
const warningColor = '#ff9800';
const dangerColor = '#f44336';
const successColor = '#4caf50';
const infoColor = '#00acc1';
const roseColor = '#e91e63';
const grayColor = '#999999';

   */
  chartBoxTemperatures: {
    additionalInfo: {
      classObj: (id, props) => (<ChartBoxTemperaturesContainer key={id} id={id} {...props} />),
      defaultProps: {
        // day: moment().format('YYYYMMDD'),
        dataType: 'current',
        color: 'info',
        colorT0: 'success',
        colorT1: 'warning',
        colorB: 'danger'
      },
      boxType: 'chartBoxTemperatures'

    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 4,
    minH: 2,
    maxH: 4,
    w: 2,
    h: 2
  },
  tableBoxFileListContainer: {
    additionalInfo: {
      classObj: (id, props) => (<TableBoxFileListContainer key={id} id={id} {...props} />),
      defaultProps: {
        color: 'success'
      },
      boxType: 'tableBoxFileListContainer'
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 4,
    minH: 1,
    maxH: 4,
    w: 1,
    h: 4
  },
  fileUploadContainer: {
    additionalInfo: {
      classObj: (id, props) => (<FileUploadContainer key={id} id={id} {...props} />),
      defaultProps: {
        color: 'success'
      },
      boxType: 'fileUploadContainer'
    },
    resize: true,
    close: true,
    minW: 1,
    maxW: 2,
    minH: 2,
    maxH: 2,
    w: 1,
    h: 2
  },
  informativeBoxPrintingContainer: {
    additionalInfo: {
      classObj: (id, props) => (<InformativeBoxPrintingContainer key={id} id={id} {...props} />),
      defaultProps: {
        dataType: 'printing',
        value: 'WAITING',
        lastUpdate: null
      },
      boxType: 'informativeBoxPrintingContainer'
    },
    resize: false,
    close: true,
    minW: 1,
    maxW: 1,
    minH: 2,
    maxH: 2,
    w: 1,
    h: 2
  },
  informativeBoxStreamContainer: {
    additionalInfo: {
      classObj: (id, props) => (<InformativeBoxStreamContainer key={id} id={id} {...props} />),
      defaultProps: {
        dataType: 'video',
      },
      boxType: 'informativeBoxStreamContainer'
    },
    resize: false,
    close: true,
    minW: 1,
    maxW: 1,
    minH: 2,
    maxH: 2,
    w: 1,
    h: 2
  },
  informativeBoxMoveContainer: {
    additionalInfo: {
      classObj: (id, props) => (<InformativeBoxMoveContainer key={id} id={id} {...props} />),
      defaultProps: {
        dataType: 'printing',
        value: 'WAITING',
        lastUpdate: null
      },
      boxType: 'informativeBoxMoveContainer'
    },
    resize: false,
    close: true,
    minW: 1,
    maxW: 1,
    minH: 2,
    maxH: 2,
    w: 1,
    h: 2
  },


};

export default boxes;
