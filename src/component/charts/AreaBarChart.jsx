
import React from 'react';
import PropTypes from 'prop-types';
import { formatDefaultLocale, format } from 'd3-format';
import { timeFormatDefaultLocale, timeFormat } from 'd3-time-format';
import { last, first } from 'react-stockcharts/lib/utils';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';

import { scaleTime } from 'd3-scale';
import { curveMonotoneX } from 'd3-shape';

import { ChartCanvas, Chart } from 'react-stockcharts';

import { EdgeIndicator, CurrentCoordinate } from 'react-stockcharts/lib/coordinates';

import { Annotate } from 'react-stockcharts/lib/annotation';

import { SingleValueTooltip } from 'react-stockcharts/lib/tooltip';

import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { createVerticalLinearGradient, hexToRGBA } from 'react-stockcharts/lib/utils';


import { defineMessages, injectIntl } from 'react-intl';
import { MouseCoordinateY, MouseCoordinateX } from 'react-stockcharts/lib/coordinates';
import { BarSeries } from 'react-stockcharts/lib/series';
import * as grad from '../style/material-dashboard-react';
import fitDimensionsBox from './utils/fitDimensionsBox';
import CustomAreaSeries from './series/CustomAreaSeries';
import D3NumberLocales from '../../utils/locale/D3NumberLocales';
import D3DateTimeLocales from '../../utils/locale/D3DateTimeLocales';
import CustomImage from './annotation/CustomImage';

import axis from './config/axis';

import textureImage from '../../resources/images/textures/pattern_type1_inverted_4x4_opacity100.png';

const canvasGradient = createVerticalLinearGradient([
  { stop: 0, color: hexToRGBA('#b5d0ff', 0.2) },
  { stop: 0.7, color: hexToRGBA('#6fa4fc', 0.4) },
  { stop: 1, color: hexToRGBA('#4286f4', 0.8) },
]);

class AreaChart extends React.Component {
  constructor(props) {
    super(props);
    this.scaleFormat = {
      yearFormat: '%Y',
      quarterFormat: '%b %Y',
      monthFormat: '%b',
      weekFormat: '%d %b',
      dayFormat: '%a %d',
      // hourFormat: "%Hh",
      // minuteFormat: "%H:%M",
      // secondFormat: "%H:%M:%S",
      // milliSecondFormat: "%L"
    };

    this.d3DTLocales = new D3DateTimeLocales();
    const d3Locales = new D3NumberLocales();
    timeFormatDefaultLocale(this.d3DTLocales.getDateTimeLocale('it'));
    formatDefaultLocale(d3Locales.getDateTimeLocale('it'));

    const { color } = props;
    this.config = {
      area: {
        line: {
          strokeWidth: 1,
          hoverStrokeWidth: 4,
          stroke: {
            up: grad[`${color}Gradient`].up,
            down: grad[`${color}Gradient`].down
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
        area: {
          fill: {
            up: grad[`${color}Gradient`].up,
            middleUp: grad[`${color}Gradient`].up,
            middleDown: grad[`${color}Gradient`].down,
            down: grad[`${color}Gradient`].down
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
          xDisplayFormatPattern: '%d-%m-%Y',
          yDisplayFormatPattern: '.0f',
          origin: [10, 0],
          valueStroke: '#fff',
          // fontFamily: null,
          fontSize: 12
        }
      },
      bar: {
        position: 'over',

        height: 70,
        padding: { top: 10, bottom: 0 },
        widthRatio: 0.2,
        yMouseCoordinate: {
          at: 'left',
          orient: 'left'
        },
        textFormat: {
          yAxisNumberFormat: '.0f',
          yMouseNumberFormat: '.1f'
        },
        stroke: false,
        barColor: {
          closeGTOpen: '#00a529',
          closeLEOpen: '#FF0000',
          opacity: 0.6
        },
        barIndicatorColor: '#000aff',
        yAxis: {
          showGrid: false,
          showTicks: true,
          showDomain: true,
          className: 'react-stockcharts-y-axis',
          ticks: 3,
          outerTickSize: 0,
          domainClassName: 'react-stockcharts-axis-domain',
          fill: 'none',
          stroke: '#FFFFFF',
          strokeWidth: 1,
          opacity: 1,
          innerTickSize: 5,
          tickPadding: 6,
          tickStroke: '#000000',
          tickStrokeOpacity: 1,
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          fontSize: 12,
          axisAt: 'left',
          orient: 'left'
        }

      }
    };

    // AREA
    var { stroke, ...other } = this.config.area.line;
    this.area = {};

    this.area.lineConfig = other;
    this.area.stroke = stroke;

    var { fill, ...other } = this.config.area.area;
    this.area.areaConfig = other;
    this.area.fill = fill;

    var { textFormat, ...other } = this.config.area.edgeIndicator;
    this.area.edgeIndicator = other;
    this.area.edgeTextFormat = textFormat;

    const { currentCoordinateActive, currentCoordinateColor } = this.config.area.currentCoordinate;
    this.area.currentCoordinate = currentCoordinateActive;

    if (currentCoordinateColor) {
      this.area.currentCoordinateColor = currentCoordinateColor;
    }

    this.area.showMinValueOnChart = this.config.area.showMinValueOnChart;
    this.area.showMaxValueOnChart = this.config.area.showMaxValueOnChart;

    this.area.singleTooltip = null;
    {
      const { xDisplayFormatPattern, yDisplayFormatPattern, ...otherSingleTooltipStyle } = this.config.area.singleTooltip;
      this.area.singleTooltip = otherSingleTooltipStyle;
      this.area.singleTooltip.xDisplayFormat = timeFormat(xDisplayFormatPattern);

      this.area.singleTooltip2 = { ...this.area.singleTooltip };
      this.area.singleTooltip2.origin = this.area.singleTooltip2.originVal;
      this.area.singleTooltip2.yDisplayFormat = format(yDisplayFormatPattern);
    }
    // ------------------------

    // BAR
    this.bar = {};
    this.bar.height = this.config.bar.height;
    this.bar.padding = this.config.bar.padding;

    this.bar.yAxisNumberFormat = this.config.bar.textFormat.yAxisNumberFormat;
    this.bar.yMouseNumberFormat = this.config.bar.textFormat.yMouseNumberFormat;

    this.bar.stroke = this.config.bar.stroke;

    this.bar.closeGTOpen = this.config.bar.barColor.closeGTOpen;
    this.bar.closeLEOpen = this.config.bar.barColor.closeLEOpen;

    this.bar.barIndicatorColor = this.config.bar.barIndicatorColor;
    this.bar.barOpacity = this.config.bar.barColor.opacity;

    this.bar.yAxis = this.config.bar.yAxis;
    this.bar.widthRatio = this.config.bar.widthRatio;

    this.bar.yMouseCoordinate = this.config.bar.yMouseCoordinate;

    // ---------------------

    // Line of grid
    this.yGrid = axis.yAxis;
    // yGrid = { innerTickSize: -1 * width/*, tickStrokeOpacity: 0.1*/ };
    this.xGrid = axis.xAxis;

    this.xGridSeparator = axis.xAxisSeparator;

    this.mouseCoordinateY = axis.mouseCoordinateY;

    const { xMouseDateFormatPatternDay, xMouseDateFormatPatternMin, ...otherMCX } = axis.mouseCoordinateX;
    this.mouseCoordinateX = otherMCX;
    this.xMouseDateFormat = timeFormat(xMouseDateFormatPatternDay);
  }

  render() {
    const {
      data: initialData, type, width, ratio, height, dataType
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

    const messagesDateLabel = defineMessages({
      greeting: {
        id: 'date.label',
        defaultMessage: 'Date',
        description: 'Label of toltip',
      },
    });

    const messagesTooltip = defineMessages({
      greeting: {
        id: 'chart.monthly.production.tooltip',
        description: 'Label of toltip',
        defaultMessage: 'Power: {pow}w Peak: {peak}w'
      },
    });
    const messagesLabel = defineMessages({
      greeting: {
        id: 'chart.monthly.production.tooltip.label',
        description: 'Label of toltip',
        defaultMessage: 'Production:'
      },
    });

    const extendSize = false;
    // this.height = this.config.height;
    // this.padding = this.config.padding;
    let position = height - this.bar.height;
    if (this.config.bar.position === 'over') {
      // if (height !== null && height !== 'undefined' && height > 0) {
      //     if (!extendSize) {
      //         this.height = ((mainConfig.layout.height - height) * this.config.bar.height / mainConfig.layout.height);
      //     }
      //     position = this.height + sizeOfExternalChart;
      //     // else{
      //     //     this.height = mainConfig.layout.height;
      //     // }
      //     // this.padding.bottom = sizeOfExternalChart-(this.config.padding.bottom+this.config.padding.top);
      //     // this.height = (this.config.height/2) + sizeOfExternalChart;
      // }
    } else if (this.config.position === 'external') {
      position = height;
    }

    const xExtents = [start, end];

    this.yGrid.innerTickSize = -1 * width;

    return (
      <ChartCanvas
        ratio={ratio}
        width={width - 20}
        height={height}
        margin={{
				  left: 50, right: 70, top: 10, bottom: 30
        }}
        seriesName="MSFT"
        data={data}
        type={type}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart id={0} yExtents={d => d.val}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />

          <YAxis key="mcX1" axisAt="right" orient="right" ticks={5} tickFormat={format(this.bar.yMouseNumberFormat)} {...this.yGrid} />
,
          <MouseCoordinateY key="mcCM1" {...this.mouseCoordinateY} displayFormat={format(this.bar.yMouseNumberFormat)} />
          <MouseCoordinateX key="mcCM2" {...this.mouseCoordinateX} displayFormat={this.xMouseDateFormat} />

          {/* <YAxis axisAt="right" orient="right" ticks={5} /> */}
          <CustomAreaSeries key="lsCAS" yAccessor={d => d.val} stroke={this.area.stroke} fill={this.area.fill} {...this.area.lineConfig} {...this.area.areaConfig} />
          {/* <EdgeIndicator displayFormat={format(this.area.edgeTextFormat)} yAccessor={d => d.val} {...this.area.edgeIndicator} /> */}
          <CurrentCoordinate key="ccCAS" yAccessor={d => d.val} fill={this.area.currentCoordinateColor} />
          <Annotate with={CustomImage} when={d => d.maxPlot === true} usingProps={this.area.showMaxValueOnChart} />

          <SingleValueTooltip
            xLabel={this.props.intl.formatMessage(messagesDateLabel.greeting)}
            xAccessor={d => d.date}

            yDisplayFormat={d => this.props.intl.formatMessage(messagesTooltip.greeting, { pow: this.area.singleTooltip2.yDisplayFormat(d.val), peak: this.area.singleTooltip2.yDisplayFormat(d.powPeak) })}
            yAccessor={d => d}
            yLabel={this.props.intl.formatMessage(messagesLabel.greeting)}
            xDisplayFormat={this.area.singleTooltip.xDisplayFormat}
            origin={this.area.singleTooltip.origin}
          />


        </Chart>
        <Chart
          id={2}
          key={2}
          yExtents={[0, d => d.powPeak]}
          height={this.bar.height}
          origin={(w, h) => [0, h - this.bar.height]}
          padding={this.bar.padding}
          onContextMenu={(e) => {}}
        >
          <YAxis ticks={3} tickFormat={format(this.bar.yAxisNumberFormat)} {...this.bar.yAxis} />

          <MouseCoordinateY {...this.bar.yMouseCoordinate} displayFormat={format(this.bar.yMouseNumberFormat)} />

          <BarSeries yAccessor={d => d.powPeak} opacity={this.bar.barOpacity} fill={this.bar.closeGTOpen} stroke={this.bar.stroke} widthRatio={this.bar.widthRatio} />
          <CurrentCoordinate yAccessor={d => d.powPeak} fill={this.bar.barIndicatorColor} />


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
  dataType: PropTypes.string
};

AreaChart.defaultProps = {
  type: 'svg',
};
AreaChart = fitDimensionsBox(injectIntl(AreaChart));

export default AreaChart;
