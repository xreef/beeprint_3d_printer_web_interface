
import React from "react";
import PropTypes from "prop-types";
import { formatDefaultLocale, format } from "d3-format";
import { timeFormatDefaultLocale, timeFormat } from "d3-time-format";
import D3DateTimeLocales from "../../../../utils/locale/D3DateTimeLocales";
import D3NumberLocales from "../../../../utils/locale/D3NumberLocales";
import { last, first } from "react-stockcharts/lib/utils";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";

import { scaleTime } from "d3-scale";
import { curveMonotoneX } from "d3-shape";

import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";

const canvasGradient = createVerticalLinearGradient([
	{ stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
	{ stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
	{ stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

class AreaChart extends React.Component {
	constructor(){
		super();
		this.scaleFormat = {
            yearFormat: "%Y",
                quarterFormat: "%b %Y",
                monthFormat: "%b",
                weekFormat: "%d %b",
                dayFormat: "%a %d",
                hourFormat: "%Hh",
                minuteFormat: "%H:%M",
                secondFormat: "%H:%M:%S",
                milliSecondFormat: "%L"
        };

        this.d3DTLocales = new D3DateTimeLocales();
        let d3Locales = new D3NumberLocales();
        timeFormatDefaultLocale( this.d3DTLocales.getDateTimeLocale('it'));
        formatDefaultLocale(d3Locales.getDateTimeLocale('it'));

    }
	render() {
		const { data: initialData, type, width, ratio } = this.props;
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

        const xExtents = [start, end];		return (
			<ChartCanvas ratio={ratio} width={width} height={400}
				margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
				seriesName="MSFT"
				data={data} type={type}
				 xScale={xScale}
				 xAccessor={xAccessor}
				 displayXAccessor={displayXAccessor}
				 xExtents={xExtents}
			>
				<Chart id={0} yExtents={d => d.wattParsed}>
					<defs>
						<linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
							<stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
							<stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
							<stop offset="100%"  stopColor="#4286f4" stopOpacity={0.8} />
						</linearGradient>
					</defs>
					<XAxis axisAt="bottom" orient="bottom" ticks={6} />
					<YAxis axisAt="left" orient="left"  />
					<AreaSeries
						yAccessor={d => d.wattParsed}
						fill="url(#MyGradient)"
						strokeWidth={2}
						interpolation={curveMonotoneX}
						canvasGradient={canvasGradient}
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
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

AreaChart.defaultProps = {
	type: "svg",
};
AreaChart = fitWidth(AreaChart);

export default AreaChart;