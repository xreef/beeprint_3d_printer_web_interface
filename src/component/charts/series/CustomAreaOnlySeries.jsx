

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { area as d3Area } from 'd3-shape';

import {
  hexToRGBA, isDefined, first, functor
} from 'react-stockcharts/lib/utils';
import { AreaOnlySeries } from 'react-stockcharts/lib/series';

import { guid, getReferenceHeight } from '../../../utils/math/index';
import { fillFlatGradientOnReference, fillGradientOnReference, loadImage } from '../../../utils/canvas/index';

class CustomAreaOnlySeries extends AreaOnlySeries {
  constructor(props) {
    super(props);

    this.state = {
      textureImage: null
    };
    const { textureImage } = props;

    if (textureImage) {
      loadImage(textureImage, (img) => {
        this.setState({ textureImage: img });
      });
    }
  }

  drawOnCanvas(ctx, moreProps) {
    const {
      yAccessor, defined, reference, refPriceOnPlottedData
    } = this.props;
    const {
      fill, stroke, opacity, textureImage
    } = this.props;

    const {
      xScale, chartConfig: { yScale }, plotData, xAccessor
    } = moreProps;

    const yn = getReferenceHeight(((refPriceOnPlottedData) ? ((plotData && plotData.length > 0) ? plotData[0].close : 0) : reference), yScale.domain()[0], yScale.domain()[1], yScale.range()[0], yScale.range()[1]);

    // var newBase = functor(base);

    // ctx.fillStyle = hexToRGBA(fill.up, opacity.up);
    // ctx.strokeStyle = stroke.up;

    if (this.state.textureImage) {
      let points0 = []; let
        points1 = [];

      for (let i = 0; i < plotData.length; i++) {
        const d = plotData[i];
        if (defined(yAccessor(d), i)) {
          const [x, y1, y0] = [xScale(xAccessor(d)), yScale(yAccessor(d)), yn];

          points0.push([x, y0]);
          points1.push([x, y1]);
        } else if (points0.length) {
          segment(points0, points1, ctx);
          points0 = [];
          points1 = [];
        }
      }

      const height = yScale.range()[0];
      if (plotData.length > 0) {
        const gradientThreshold = (yn / height);
        // ctx.strokeStyle = fillStyle(ctx, height, gradientThreshold, stroke.down, stroke.up);
        if (fill.middleUp && fill.middleDown) {
          ctx.fillStyle = fillGradientOnReference(ctx, height, gradientThreshold, hexToRGBA(fill.down, opacity.down), hexToRGBA(fill.middleDown, opacity.middleDown || opacity.down), hexToRGBA(fill.middleUp, opacity.middleUp || opacity.up), hexToRGBA(fill.up, opacity.up));
        } else {
          ctx.fillStyle = fillFlatGradientOnReference(ctx, height, gradientThreshold, hexToRGBA(fill.down, opacity.down), hexToRGBA(fill.up, opacity.up));
        }
      }

      if (points0.length) segment(points0, points1, ctx);

      if (this.state.textureImage) {
        ctx.globalCompositeOperation = 'soft-light';
        ctx.fillStyle = ctx.createPattern(this.state.textureImage, 'repeat');
        if (points0.length) segment(points0, points1, ctx);
      }
    }
  }

  renderSVG(moreProps) {
    const {
      yAccessor, defined, reference, refPriceOnPlottedData
    } = this.props;
    let {
      stroke, fill, className, opacity, textureImage
    } = this.props;

    const {
      xScale, chartConfig: { yScale }, plotData, xAccessor
    } = moreProps;

    const yn = getReferenceHeight(((refPriceOnPlottedData) ? ((plotData && plotData.length > 0) ? plotData[0].close : 0) : reference), yScale.domain()[0], yScale.domain()[1], yScale.range()[0], yScale.range()[1]);
    const areaSeries = d3Area()
      .defined(d => defined(yAccessor(d)))
      .x(d => xScale(xAccessor(d)))
      .y0(yn)
      .y1(d => yScale(yAccessor(d)));

    const d = areaSeries(plotData);
    className = className.concat(isDefined(stroke) ? '' : ' line-stroke');


    const height = yScale.range()[0];
    let gradientThreshold = 0;
    if (plotData.length > 0) {
      const yn = getReferenceHeight(((refPriceOnPlottedData) ? ((plotData && plotData.length > 0) ? plotData[0].close : 0) : reference), yScale.domain()[0], yScale.domain()[1], yScale.range()[0], yScale.range()[1]);

      gradientThreshold = (yn / height);
    }

    const gradientName = `gradientMWArea-${guid()}`;
    const patternName = `patternMWArea-${guid()}`;

    const gradient = (fill.middleUp && fill.middleDown) ? (
      <linearGradient id={gradientName} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor={fill.down} stopOpacity={opacity.down} />
        <stop offset={gradientThreshold} stopColor={fill.middleDown} stopOpacity={opacity.middleDown || opacity.down} />
        <stop offset={gradientThreshold} stopColor={fill.middleUp} stopOpacity={opacity.middleUp || opacity.up} />
        <stop offset="1" stopColor={fill.up} stopOpacity={opacity.up} />
      </linearGradient>
    ) : (
      <linearGradient id={gradientName} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor={fill.down} stopOpacity={opacity.down} />
        <stop offset={gradientThreshold} stopColor={fill.down} stopOpacity={opacity.down} />
        <stop offset={gradientThreshold} stopColor={fill.up} stopOpacity={opacity.up} />
        <stop offset="1" stopColor={fill.up} stopOpacity={opacity.up} />
      </linearGradient>
    );

    return (
      <g>
        {(this.state.textureImage) ? (
          (true) ? (
            <defs>
              <pattern
                id={patternName}
                patternUnits="userSpaceOnUse"
                width={this.state.textureImage.width}
                height={this.state.textureImage.height}
              >
                <image xlinkHref={textureImage} />
              </pattern>
              {gradient}

              <path id="gradientPath" d={d} fill={`url(#${gradientName})`} className={className} />
              <path id="tilePath" d={d} fill={`url(#${patternName})`} className={className} />

              <filter id="merging" colorInterpolationFilters="sRGB" y="0" x="0">
                <feImage href="#gradientPath" result="tile" />
                <feImage href="#tilePath" result="waves" />
                <feMerge>
                  <feMergeNode in="waves" />
                  <feMergeNode in="tile" />
                </feMerge>
              </filter>
            </defs>) : (
              <defs>
                <pattern
                  id={patternName}
                  patternUnits="userSpaceOnUse"
                  width={this.state.textureImage.width}
                  height={this.state.textureImage.height}
                >
                  <image xlinkHref={textureImage} />
                </pattern>
                {gradient}
              </defs>
          )
        ) : (
          <defs>
            {gradient}
          </defs>
        )}
        <path d={d} fill={`url(#${gradientName})`} className={className} />
        <path d={d} fill={`url(#${patternName})`} className={className} />

      </g>
    );
  }
}

CustomAreaOnlySeries.propTypes = {
  className: PropTypes.string,
  yAccessor: PropTypes.func.isRequired,
  fill: PropTypes.object,
  opacity: PropTypes.object,
  defined: PropTypes.func,
  reference: PropTypes.number.isRequired,
  textureImage: PropTypes.string,
  refPriceOnPlottedData: PropTypes.bool
};

CustomAreaOnlySeries.defaultProps = {
  reference: 0,
  className: 'line ',
  fill: {
    up: '#F55854',
    down: '#89BC72'
  },
  opacity: {
    up: 0.5,
    down: 0.5
  },
  defined: d => !isNaN(d),
  refPriceOnPlottedData: false
};


function segment(points0, points1, ctx) {
  ctx.beginPath();
  const [x0, y0] = first(points0);
  ctx.moveTo(x0, y0);

  let i;
  for (i = 0; i < points1.length; i++) {
    const [x1, y1] = points1[i];
    ctx.lineTo(x1, y1);
  }

  for (i = points0.length - 1; i >= 0; i--) {
    const [x0, y0] = points0[i];
    ctx.lineTo(x0, y0);
  }
  ctx.closePath();
  ctx.fill();
}

export default CustomAreaOnlySeries;
