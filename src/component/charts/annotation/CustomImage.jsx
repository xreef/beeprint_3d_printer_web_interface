"use strict";

import React, { Component } from "react";
import PropTypes from 'prop-types';

import { functor } from "react-stockcharts/lib/utils";

import images from '../utils/images/index'

class CustomImage extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		let { onClick } = this.props;

		if (onClick) {
			let { xScale, yScale, datum } = this.props;
			onClick({ xScale, yScale, datum }, e);
		}
	}
	render() {
		let { className, datum, image, width, height, onClick, tooltip } = this.props;
		let { xAccessor, xScale, yScale } = this.props;

		let { xPos, yPos } = helper(this.props, xAccessor, xScale, yScale);

		return (<g className={className}>

				<image x={xPos} y={yPos}  width={width} height={height} xlinkHref={images[image]}
					   ref={(referencedImage) => { this.referencedImage = referencedImage; }}
					   alt={tooltip}
					   onClick={(e) => onClick(datum, e)}
				/>

		</g>);
	}
}

export function helper(props, xAccessor, xScale, yScale) {
	let { x, y, width, height, datum, plotData } = props;

	let xFunc = functor(x);
	let yFunc = functor(y);

	let [xPos, yPos] = [xFunc({ xScale, xAccessor, datum, plotData }), yFunc({ yScale, datum, plotData })];

	// Subtract image height and a padding bottom
    yPos = yPos - (width/2);
    // center image
	xPos = xPos - (height/2);

	return {
		xPos,
		yPos
	};
}

CustomImage.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	xAccessor: PropTypes.func,
	xScale: PropTypes.func,
	yScale: PropTypes.func,
	datum: PropTypes.object,
	x: PropTypes.func,
	y: PropTypes.func,
	image: PropTypes.string.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
    tooltip: PropTypes.string
};

CustomImage.defaultProps = {
    // fill: '#258900',
	// TODO: Tooltip
	tooltip: "",
    width: 20,
    height: 20,
    x: ({ xScale, xAccessor, datum }) => xScale(xAccessor(datum)),
	className: "react-stockcharts-image",
};

export default CustomImage;