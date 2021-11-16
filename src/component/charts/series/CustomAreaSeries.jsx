

import React from 'react';
import PropTypes from 'prop-types';

import CustomLineSeries from './CustomLineSeries';
import CustomAreaOnlySeries from './CustomAreaOnlySeries';

function CustomAreaSeries(props) {
  const { yAccessor } = props;
  const {
    className, opacity, stroke, strokeWidth, fill, textureImage, reference, refPriceOnPlottedData
  } = props;

  return (
    <g className={className}>
      <CustomLineSeries
        reference={reference}
        refPriceOnPlottedData={refPriceOnPlottedData}
        yAccessor={yAccessor}
        stroke={stroke}
        strokeWidth={strokeWidth}
        hoverHighlight={false}
      />
      <CustomAreaOnlySeries
        reference={reference}
        refPriceOnPlottedData={refPriceOnPlottedData}
        yAccessor={yAccessor}
        fill={fill}
        opacity={opacity}
        textureImage={textureImage}
      />
    </g>
  );
}

CustomAreaSeries.propTypes = {
  stroke: PropTypes.object,
  strokeWidth: PropTypes.number,
  fill: PropTypes.object.isRequired,
  opacity: PropTypes.object.isRequired,
  className: PropTypes.string,
  yAccessor: PropTypes.func.isRequired,
  reference: PropTypes.number.isRequired,
  textureImage: PropTypes.string,
  refPriceOnPlottedData: PropTypes.bool
};

CustomAreaSeries.defaultProps = {
  stroke: {
    up: '#F55854',
        		down: '#89BC72'
  },
  strokeWidth: 1,
  opacity: {
   	up: 0.5,
        			down: 0.5
  },
  fill: {
   	up: '#F55854',
        		down: '#89BC72'
  },
  className: 'react-stockcharts-area',
  reference: 0,
  refPriceOnPlottedData: false
};

export default CustomAreaSeries;
