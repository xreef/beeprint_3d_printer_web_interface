"use strict";

import React, { Component } from "react";
import PropTypes from 'prop-types';

import { line as d3Line } from "d3-shape";

import { first, getClosestItemIndexes, strokeDashTypes, getStrokeDasharray } from "react-stockcharts/lib/utils";

import {LineSeries} from "react-stockcharts/lib/series";

import {guid, getReferenceHeight} from '../../../utils/math/index'
import {fillFlatGradientOnReference} from '../../../utils/canvas/index'

class CustomLineSeries extends LineSeries {
    constructor(props) {
        super(props);
    }
    drawOnCanvas(ctx, moreProps) {
        const { yAccessor, stroke, strokeWidth, hoverStrokeWidth, defined, connectNulls, strokeDasharray, reference, refPriceOnPlottedData } = this.props;
        const { xAccessor } = moreProps;

        const { xScale, chartConfig: { yScale }, plotData, hovering } = moreProps;

        ctx.lineWidth = hovering ? hoverStrokeWidth : strokeWidth;

        ctx.strokeStyle = stroke.up;
        ctx.setLineDash(getStrokeDasharray(strokeDasharray).split(","));

        let points = [];
        for (let i = 0; i < plotData.length; i++) {
            let d = plotData[i];
            if (defined(yAccessor(d), i)) {
                let [x, y] = [xScale(xAccessor(d)), yScale(yAccessor(d))];

                points.push([x, y]);
            } else if (points.length) {
                segment(points, ctx);
                points = connectNulls ? points : [];
            }
        }

        let height = yScale.range()[0];
        if (plotData.length > 0) {
            let yn = getReferenceHeight((refPriceOnPlottedData)?plotData[0].close:reference, yScale.domain()[0], yScale.domain()[1], yScale.range()[0], yScale.range()[1]);

            let gradientThreshold = (yn / height);
            ctx.strokeStyle = fillFlatGradientOnReference(ctx, height, gradientThreshold, stroke.down, stroke.up);
        }
        ctx.lineWidth = strokeWidth;

        if (points.length) segment(points, ctx);
    }
    renderSVG(moreProps) {
        const { yAccessor, stroke,fill,  strokeWidth, hoverStrokeWidth, defined, strokeDasharray, reference, refPriceOnPlottedData } = this.props;
        const { xAccessor } = moreProps;

        const { xScale, chartConfig: { yScale }, plotData, hovering } = moreProps;

        let dataSeries = d3Line()
            .defined(d => defined(yAccessor(d)))
            .x(d => xScale(xAccessor(d)))
            .y(d => yScale(yAccessor(d)));

        let d = dataSeries(plotData);

        const { className } = this.props;

        let height = yScale.range()[0];
        let gradientThreshold = 0;
        if (plotData.length > 0) {
            let yn = getReferenceHeight((refPriceOnPlottedData)?plotData[0].close:reference, yScale.domain()[0], yScale.domain()[1], yScale.range()[0], yScale.range()[1]);

            gradientThreshold = (yn / height);
        }
        let gradientName = 'gradientMWLine-'+guid();
        return <g>
			<defs>
				<linearGradient id={gradientName} x1="0" x2="0" y1="0" y2="1">
					<stop offset="0"  stopColor={stroke.down}/>
					<stop offset={gradientThreshold}  stopColor={stroke.down}/>
					<stop offset={gradientThreshold} stopColor={stroke.up}/>
					<stop offset="1" stopColor={stroke.up}/>
				</linearGradient>
			</defs>

			<path 		stroke={'url(#'+gradientName+')'}
						 className={`${className} ${stroke ? "" : " line-stroke"}`}
						 d={d}
						 strokeWidth={hovering ? hoverStrokeWidth : strokeWidth}
						 strokeDasharray={getStrokeDasharray(strokeDasharray)}
						 fill={fill}
			/>;
		</g>
    }

}
// function getReferenceHeight(reference, minDomain, maxDomain, minRange, maxRange){
// 	let height = minRange;
//     let yn;
//
//         let stop = reference;
//         if (stop > maxDomain) yn = maxRange;
//         else if (stop < minDomain) yn = minRange;
//         else yn = height - ((stop - minDomain) / (maxDomain - minDomain) * (minRange - maxRange));
//
//     return yn;
// }
// function fillStyle(ctx, height, gradientThreshold, fillColorUp, fillColorDown) {
//     let fillStyle;
//
//     if (gradientThreshold < 0) {
//         fillStyle = fillColorDown;
//     } else if (gradientThreshold > 1) {
//         fillStyle = fillColorUp;
//     } else {
//         let offset = 0.01;
//         if (gradientThreshold >= 1) offset = 0;
//         fillStyle=ctx.createLinearGradient(0,0,0,height);
//         fillStyle.addColorStop(0,fillColorUp);
//         fillStyle.addColorStop(gradientThreshold,fillColorUp);
//         fillStyle.addColorStop(gradientThreshold + offset,fillColorDown);
//         fillStyle.addColorStop(1,fillColorDown);
//     }
//
//     return fillStyle;
// }

function segment(points, ctx) {
    ctx.beginPath();

    let [x, y] = first(points);
    ctx.moveTo(x, y);
    for (let i = 1; i < points.length; i++) {
        let [x1, y1] = points[i];
        ctx.lineTo(x1, y1);
    }

    ctx.stroke();
}

CustomLineSeries.propTypes = {
    className: PropTypes.string,
    strokeWidth: PropTypes.number,
    stroke: PropTypes.object,
    hoverStrokeWidth: PropTypes.number,
    fill: PropTypes.string,
    defined: PropTypes.func,
    hoverTolerance: PropTypes.number,
    strokeDasharray: PropTypes.oneOf(strokeDashTypes),
    highlightOnHover: PropTypes.bool,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onContextMenu: PropTypes.func,
    yAccessor: PropTypes.func,
    connectNulls: PropTypes.bool,
    reference:  PropTypes.number.isRequired,
    refPriceOnPlottedData: PropTypes.bool
};

CustomLineSeries.defaultProps = {
    reference: 0,
    className: "line ",
    strokeWidth: 1,
    hoverStrokeWidth: 4,
    stroke: {up: "#F55854", down:"#89BC72"},
    fill: "none",
    strokeDasharray: "Solid",
    defined: d => !isNaN(d),
    hoverTolerance: 6,
    highlightOnHover: false,
    connectNulls: false,
    onClick: function(e) { console.log("Click", e); },
    onDoubleClick: function(e) { console.log("Double Click", e); },
    onContextMenu: function(e) { console.log("Right Click", e); },
    refPriceOnPlottedData: false
};

export default CustomLineSeries;
