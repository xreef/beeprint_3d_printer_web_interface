
import React from 'react';
import PropTypes from 'prop-types';
import { formatDefaultLocale, format } from 'd3-format';
import { timeFormatDefaultLocale, timeFormat } from 'd3-time-format';
import { last, first } from 'react-stockcharts/lib/utils';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';

import { scaleTime } from 'd3-scale';
import { curveMonotoneX } from 'd3-shape';

import { ChartCanvas, Chart } from 'react-stockcharts';

import {
  EdgeIndicator, CurrentCoordinate, MouseCoordinateY, MouseCoordinateX
} from 'react-stockcharts/lib/coordinates';

import { Annotate } from 'react-stockcharts/lib/annotation';

import { SingleValueTooltip } from 'react-stockcharts/lib/tooltip';

import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { createVerticalLinearGradient, hexToRGBA } from 'react-stockcharts/lib/utils';

import { defineMessages, injectIntl } from 'react-intl';
import fitDimensionsBox from './utils/fitDimensionsBox';

import * as grad from '../style/material-dashboard-react';
import CustomAreaSeries from './series/CustomAreaSeries';
import D3NumberLocales from '../../utils/locale/D3NumberLocales';
import D3DateTimeLocales from '../../utils/locale/D3DateTimeLocales';
import CustomImage from './annotation/CustomImage';
import axis from './config/axis';

import textureImage from '../../resources/images/textures/pattern_type1_inverted_4x4_opacity100.png';
import InteractiveYCoordinate from 'react-stockcharts/lib/interactive/components/InteractiveYCoordinate'

const canvasGradient = createVerticalLinearGradient([
  { stop: 0, color: hexToRGBA('#b5d0ff', 0.2) },
  { stop: 0.7, color: hexToRGBA('#6fa4fc', 0.4) },
  { stop: 1, color: hexToRGBA('#4286f4', 0.8) },
]);

export const defaultStyleLine = {
  bgFill: "#FFFFFF",
  bgOpacity: 1,

  stroke: "#6574CD",
  strokeOpacity: 1,
  strokeDasharray: "ShortDash2",
  strokeWidth: 1,

  textFill: "#6574CD",
  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
  fontSize: 12,
  fontStyle: "normal",
  fontWeight: "normal",
  textBox: {
    height: 24,
    left: 20,
    padding: { left: 10, right: 5 },
    closeIcon: {
      padding: { left: 5, right: 8 },
      width: 8
    }
  },
  edge: {
    stroke: "#6574CD",
    strokeOpacity: 1,
    strokeWidth: 1,

    fill: "#FFFFFF",
    fillOpacity: 1,
    orient: "right",
    at: "right",
    arrowWidth: 10,
    dx: 0,
    rectWidth: 50,
    rectHeight: 20,
    displayFormat: format(".2f")
  },
}

class AreaChart extends React.Component {
  constructor(props) {
    super(props);
    this.scaleFormat = {
      yearFormat: '%Y',
      quarterFormat: '%b %Y',
      monthFormat: '%b',
      weekFormat: '%d %b',
      dayFormat: '%a %d',
      hourFormat: '%Hh',
      minuteFormat: '%H:%M',
      secondFormat: '%H:%M:%S',
      milliSecondFormat: '%L'
    };

    this.d3DTLocales = new D3DateTimeLocales();
    const d3Locales = new D3NumberLocales();
    timeFormatDefaultLocale(this.d3DTLocales.getDateTimeLocale('it'));
    formatDefaultLocale(d3Locales.getDateTimeLocale('it'));

    const { color, colorT0, colorT1, colorB } = props;
    this.config = {
      lineT0: {
        strokeWidth: 1,
        hoverStrokeWidth: 4,
        stroke: {
          up: grad[`${colorT0 || color}Gradient`].up,
          down: grad[`${colorT0 || color}Gradient`].down
        },
        strokeFlat: '#ffffff',
        strokeDasharray: 'Solid',
        hoverTolerance: 6,
        highlightOnHover: false,
        connectNulls: false
      },
      lineT1: {
        strokeWidth: 1,
        hoverStrokeWidth: 4,
        stroke: {
          up: grad[`${colorT1 || color}Gradient`].up,
          down: grad[`${colorT1 || color}Gradient`].down
        },
        strokeFlat: '#ffffff',
        strokeDasharray: 'Solid',
        hoverTolerance: 6,
        highlightOnHover: false,
        connectNulls: false
      },
      lineB: {
        strokeWidth: 1,
        hoverStrokeWidth: 4,
        stroke: {
          up: grad[`${colorB || color}Gradient`].up,
          down: grad[`${colorB || color}Gradient`].down
        },
        strokeFlat: '#ffffff',
        strokeDasharray: 'Solid',
        hoverTolerance: 6,
        highlightOnHover: false,
        connectNulls: false
      },
      currentCoordinate: {
        currentCoordinateActive: false,
        currentCoordinateColor: '#ff0100'
      },
      areaT0: {
        fill: {
          up: grad[`${colorT0 || color}Gradient`].up,
          middleUp: grad[`${colorT0 || color}Gradient`].up,
          middleDown: grad[`${colorT0 || color}Gradient`].down,
          down: grad[`${colorT0 || color}Gradient`].down
        },
        opacity: {
          up: 0.2,
          middleUp: 0.8,
          middleDown: 0.8,
          down: 0.2
        },
        textureImage: textureImage
        // textureImageSrc: 'resources/images/textures/pattern_type1_inverted_4x4_opacity100.png'
        // textureImageSrc: 'resources/images/pattern_type1_inverted_4x4_opacity100.png'
      },
      areaT1: {
        fill: {
          up: grad[`${colorT1 || color}Gradient`].up,
          middleUp: grad[`${colorT1 || color}Gradient`].up,
          middleDown: grad[`${colorT1 || color}Gradient`].down,
          down: grad[`${colorT1 || color}Gradient`].down
        },
        opacity: {
          up: 0.2,
          middleUp: 0.8,
          middleDown: 0.8,
          down: 0.2
        },
        textureImage: textureImage
        // textureImageSrc: 'resources/images/textures/pattern_type1_inverted_4x4_opacity100.png'
        // textureImageSrc: 'resources/images/pattern_type1_inverted_4x4_opacity100.png'
      },
      areaB: {
        fill: {
          up: grad[`${colorB || color}Gradient`].up,
          middleUp: grad[`${colorB || color}Gradient`].up,
          middleDown: grad[`${colorB || color}Gradient`].down,
          down: grad[`${colorB || color}Gradient`].down
        },
        opacity: {
          up: 0.2,
          middleUp: 0.8,
          middleDown: 0.8,
          down: 0.2
        },
        textureImage: textureImage
        // textureImageSrc: 'resources/images/textures/pattern_type1_inverted_4x4_opacity100.png'
        // textureImageSrc: 'resources/images/pattern_type1_inverted_4x4_opacity100.png'
      },
      edgeIndicator: {
        textFormat: '.3f',
        type: 'horizontal',
        orient: 'left',
        edgeAt: 'left',
        textFill: '#FFFFFF',
        // displayFormat: format(".2f"),
        yAxisPad: 0,
        rectHeight: 20,
        rectWidth: 50,
        arrowWidth: 10,
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        fontSize: 13,
        dx: 0,
        hideLine: false,
        fill: '#ff0000',
        opacity: 1,
        lineStroke: '#000000',
        lineOpacity: 0.3,
        itemType: 'last'
      },
      showMinValueOnChart: {
        image: 'circleSonarRed',
        width: 20,
        height: 20,
        onClick: console.log.bind(console),
        y: ({ yScale, datum }) => yScale(datum.val),
        tooltip: 'Valore minimo'
      },
      showMaxValueOnChart: {
        image: 'circleSonarGreen',
        width: 20,
        height: 20,
        onClick: console.log.bind(console),
        y: ({ yScale, datum }) => yScale(datum.val),
        tooltip: 'Valore massimo'
      },
      singleTooltip: {
        xDisplayFormatPattern: '%H:%M:%S',
        yDisplayFormatPattern: '.2f',
        origin: [10, 0],
        valueStroke: '#fff',
        // fontFamily: null,
        fontSize: 12
      },
    };
    {
      var {stroke, ...other} = this.config.lineT0;
      this.lineConfigT0 = other;
      this.strokeT0 = stroke;
    }

    {
      var { stroke, ...other } = this.config.lineT1;
      this.lineConfigT1 = other;
      this.strokeT1 = stroke;
    }
    {
      var { stroke, ...other } = this.config.lineB;
      this.lineConfigB = other;
      this.strokeB = stroke;
    }

    var { fill, ...other } = this.config.areaT0;
    this.areaConfigT0 = other;
    this.fillT0 = fill;
    var { fill, ...other } = this.config.areaT1;
    this.areaConfigT1 = other;
    this.fillT1 = fill;
    var { fill, ...other } = this.config.areaB;
    this.areaConfigB = other;
    this.fillB = fill;

    var { textFormat, ...other } = this.config.edgeIndicator;
    this.edgeIndicator = other;
    this.edgeTextFormat = textFormat;

    const { currentCoordinateActive, currentCoordinateColor } = this.config.currentCoordinate;
    this.currentCoordinate = currentCoordinateActive;

    if (currentCoordinateColor) {
      this.currentCoordinateColor = currentCoordinateColor;
    }

    this.showMinValueOnChart = this.config.showMinValueOnChart;
    this.showMaxValueOnChart = this.config.showMaxValueOnChart;

    this.singleTooltip = null;

    const { xDisplayFormatPattern, yDisplayFormatPattern, ...otherSingleTooltipStyle } = this.config.singleTooltip;
    this.singleTooltip = otherSingleTooltipStyle;
    this.singleTooltip.xDisplayFormat = timeFormat(xDisplayFormatPattern);
    this.singleTooltip.yDisplayFormat = format(yDisplayFormatPattern);

    // Line of grid
    this.yGrid = axis.yAxis;
    // yGrid = { innerTickSize: -1 * width/*, tickStrokeOpacity: 0.1*/ };
    this.xGrid = axis.xAxis;

    this.xGridSeparator = axis.xAxisSeparator;

    this.mouseCoordinateY = axis.mouseCoordinateY;

    const { xMouseDateFormatPatternDay, xMouseDateFormatPatternMin, ...otherMCX } = axis.mouseCoordinateX;
    this.mouseCoordinateX = otherMCX;
    this.xMouseDateFormat = timeFormat(xMouseDateFormatPatternMin);

  //   this.state = {
  //     yCoordinateList_1: [
  //       {
  //         ...defaultStyleLine,
  //         text: "Bed",
  //         yValue: 60,
  //         id: '1',
  //         draggable: true,
  //       },
  //       {
  //         ...defaultStyleLine,
  //         text: "T0",
  //         yValue: 260,
  //         id: '2',
  //         draggable: true,
  //       },
  //       {
  //         ...defaultStyleLine,
  //         text: "T1",
  //         yValue: 0,
  //         id: '3',
  //         draggable: true,
  //       },
  //     ],
  //     yCoordinateList_3: [],
  //     showModal: false,
  //     alertToEdit: {}
  //   };

    }

    componentDidMount () {
      this.props.setRefresh(this.refreshChart);
    }

  refreshChart = () => {
        this.refresh = true;
    }

    postCalculator = (data, plottedData) => {
      // const { onNewPlottedData } = this.props;
      // if (charts.some((elem)=>{
      //     return elem.isRefPriceOnPlottedData()
      //     })) {
      // Math.max.apply(Math,array.map(function(o){return o.y;}))

        const initialElement = data.findIndex((el, index) => el.date === plottedData[0].date);
        const finalElement = data.findIndex((el, index) => el.date === plottedData[plottedData.length - 1].date);


//         if (finalElement !== data.length-1) {
//           this.initialElement = initialElement;
//           this.finalElement = finalElement;
//         }



      // if (charts.some((elem)=>{
      //     return elem.isRefPriceOnPlottedData()
      //     })) {
      // Math.max.apply(Math,array.map(function(o){return o.y;}))
      // let lowest = Number.POSITIVE_INFINITY;
      // let highest = Number.NEGATIVE_INFINITY;
      //
      // let lowestId = null;
      // let highestId = null;
      // let tmp;
      // for (let i = plottedData.length - 1; i >= 0; i--) {
      //   tmp = plottedData[i].val;
      //   plottedData[i].maxPlot = undefined;
      //   plottedData[i].minPlot = undefined;
      //   plottedData[i].refPrice = undefined;
      //   if (tmp < lowest) {
      //     lowest = tmp;
      //     lowestId = i;
      //   }
      //   if (tmp > highest) {
      //     highest = tmp;
      //     highestId = i;
      //   }
      // }
      // if (plottedData && plottedData.length > 0) {
      //   plottedData[lowestId].minPlot = true;
      //   plottedData[highestId].maxPlot = true;
      //
      //   // if (charts.some((elem)=>{return elem.isRefPriceOnPlottedData()}) && this.state.refPrice!==plottedData[0].close) {
      //   //     this.setState({refPrice: plottedData[0].close})
      //   // }
        this.plottedData = plottedData;
      // }
      return plottedData;
    };

    render() {
      const {
        data: initialData, type, width, ratio, height, dataType, yCoordinateList
      } = this.props;
      const xScaleProvider = discontinuousTimeScaleProvider
        .inputDateAccessor(d => d.date);
      xScaleProvider.setLocale(this.d3DTLocales.getDateTimeLocale('it'), this.scaleFormat);
      const {
        data,
        xScale,
        xAccessor,
        displayXAccessor,
      } = xScaleProvider(initialData);

      const start = xAccessor(last(data));
      const end = xAccessor(first(data));


      const messagesDataTypeLabel = defineMessages({
        T0Label: {
          id: `chart.temperature.T0.label`,
          defaultMessage: 'T0',
          description: 'Label of toltip',
        },
        T1Label: {
          id: `chart.temperature.T1.label`,
          defaultMessage: 'T1',
          description: 'Label of toltip',
        },
        BLabel: {
          id: `chart.temperature.B.label`,
          defaultMessage: 'B',
          description: 'Label of toltip',
        },
      });

      const messagesDateLabel = defineMessages({
        greeting: {
          id: 'date.label',
          defaultMessage: 'Date',
          description: 'Label of toltip',
        },
      });

      const pixelDinstance = width / 10;

      let xExtents = [this.initialElement || start, this.finalElement || Math.max(end, start - pixelDinstance) ];


      if (data.length>pixelDinstance && !this.refresh) {
        xExtents = undefined;
      }
      this.refresh = false;
      const postProcessingCalculator = plottedData => this.postCalculator(data, plottedData);

      return (
        <ChartCanvas
          ratio={ratio}
          width={width - 20}
          height={height}
          margin={{
				  left: 10, right: 70, top: 10, bottom: 30
          }}
          seriesName="TEMP"
          data={data}
          type={type}
          xScale={xScale}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}

          xExtents={xExtents}
          postCalculator={postProcessingCalculator}
          // minPointsPerPxThreshold={5}
          pointsPerPxThreshold={15}

        >
          <Chart id={0} yExtents={[0, 320]}>
            <XAxis axisAt="bottom" orient="bottom" ticks={6} outerTickSize={0}  />

            <YAxis key="mcX1" axisAt="right" orient="right" ticks={5} tickFormat={this.singleTooltip.yDisplayFormat} {...this.yGrid} />

            <MouseCoordinateY key="mcCM1" {...this.mouseCoordinateY} displayFormat={this.singleTooltip.yDisplayFormat} />
            <MouseCoordinateX key="mcCM2" {...this.mouseCoordinateX} displayFormat={this.xMouseDateFormat} />

            <CustomAreaSeries key="T0CA" yAccessor={d => d.T0} stroke={this.strokeT0} fill={this.fillT0} {...this.lineConfigT0} {...this.areaConfigT0} />
            <CustomAreaSeries key="T1CA" yAccessor={d => d.T1} stroke={this.strokeT1} fill={this.fillT1} {...this.lineConfigT1} {...this.areaConfigT1} />
            <CustomAreaSeries key="BCA" yAccessor={d => d.B} stroke={this.strokeB} fill={this.fillB} {...this.lineConfigB} {...this.areaConfigB} />

            {/* <EdgeIndicator displayFormat={format(this.edgeTextFormat)} yAccessor={d => d.val} {...this.edgeIndicator} /> */}
            <CurrentCoordinate key="ccCAST0" yAccessor={d => d.T0} fill={this.currentCoordinateColor} />
            <CurrentCoordinate key="ccCAST1" yAccessor={d => d.T1} fill={this.currentCoordinateColor} />
            <CurrentCoordinate key="ccCASB" yAccessor={d => d.B} fill={this.currentCoordinateColor} />
            <Annotate with={CustomImage} when={d => d.maxPlot === true} usingProps={this.showMaxValueOnChart} />

            { yCoordinateList.map(elem => {

              return <InteractiveYCoordinate
                // onDragComplete={this.onDragComplete}
                // onDelete={this.onDelete}
                {...elem}
              />})
            }

            <SingleValueTooltip
              yLabel={this.props.intl.formatMessage(messagesDataTypeLabel.T0Label)}
              yAccessor={d => d.T0}
              {...this.singleTooltip}
            />
            <SingleValueTooltip
              yLabel={this.props.intl.formatMessage(messagesDataTypeLabel.T1Label)}
              yAccessor={d => d.T1}
              {...this.singleTooltip}
              origin={[this.singleTooltip.origin[0], this.singleTooltip.origin[1] + 17]}
            />
            <SingleValueTooltip
              yLabel={this.props.intl.formatMessage(messagesDataTypeLabel.BLabel)}
              yAccessor={d => d.B}
              {...this.singleTooltip}
              origin={[this.singleTooltip.origin[0] + 180, this.singleTooltip.origin[1]]}
            />
          </Chart>
        </ChartCanvas>
      );
    }
}


AreaChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired,
  dataType: PropTypes.string,
  yCoordinateList: PropTypes.array,
  onRefreshCallback: PropTypes.func
};

AreaChart.defaultProps = {
  type: 'svg',
  yCoordinateList: []
};
AreaChart = fitDimensionsBox(injectIntl(AreaChart));

export default AreaChart;
