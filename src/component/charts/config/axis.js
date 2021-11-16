const axis = {
  xAxis: {
    showGrid: false,
    showTicks: true,
    showDomain: true,
    className: 'react-stockcharts-x-axis',
    ticks: 5,
    ticksInterval: [
      {
        minWidth: 0,
        maxWidth: 600,
        ticks: 5
      },
      {
        minWidth: 600,
        maxWidth: 1024,
        ticks: 7
      },
      {
        minWidth: 1024,
        maxWidth: Infinity,
        ticks: 10
      }
    ],
    outerTickSize: 0,
    fill: 'none',
    stroke: '#000000',
    strokeWidth: 1,
    opacity: 1,
    domainClassName: 'react-stockcharts-axis-domain',
    innerTickSize: 5,
    tickPadding: 6,
    tickStroke: '#000000',
    tickStrokeOpacity: 1,
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize: 12
  },
  xAxisSeparator: {
    axisAt: 'bottom',
    orient: 'bottom',
    showTicks: false,
    stroke: '#000000'
  },
  yAxis: {
    showGrid: false,
    showTicks: true,
    showDomain: true,
    className: 'react-stockcharts-y-axis',
    ticks: 5,
    outerTickSize: 0,
    domainClassName: 'react-stockcharts-axis-domain',
    fill: 'none',
    stroke: '#000000',
    strokeWidth: 1,
    tickLabelFill: '#000000',
    opacity: 1,
    innerTickSize: 5,
    tickPadding: 6,
    tickStroke: '#e1e1e1',
    tickStrokeOpacity: 1,
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize: 12,
    zoomEnabled: false
  },
  mouseCoordinateY: {
    yAxisPad: 0,
    rectWidth: 60,
    rectHeight: 20,
    orient: 'right',
    at: 'right',
    dx: 0,
    arrowWidth: 10,
    fill: '#525252',
    opacity: 1,
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize: 13,
    textFill: '#FFFFFF'
  },
  mouseCoordinateX: {
    strokeOpacity: 1,
    strokeWidth: 1,
    orient: 'bottom',
    at: 'bottom',
    snapX: true,
    xAxisPad: 0,
    xMouseDateFormatPatternMin: '%H:%M:%S',
    xMouseDateFormatPatternDay: '%Y-%m-%d %H:%M:%S',
    rectWidth: 120,
    rectHeight: 20,
    fill: '#525252',
    opacity: 1,
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize: 13,
    textFill: '#FFFFFF'
  }
};
export default axis;
