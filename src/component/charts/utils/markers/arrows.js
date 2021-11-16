import React from "react";

let getArrow = (prefix, markerWidth, markerHeight, strokeWidth, markerStroke, markerFill) =>
                        <marker id={prefix+"arrow"} viewBox="0 0 10 10" markerWidth={markerWidth} markerHeight={markerHeight} refX={10-strokeWidth} refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill={markerFill} stroke={markerStroke} />
                        </marker>;

let getCircleArrow = (markerWidth, markerHeight, strokeWidth, markerStroke, markerFill, markerInsideFill) =>
                        <marker id={prefix+"circle-arrow"}  viewBox="0 0 54 54" markerWidth={markerWidth} markerHeight={markerHeight} refX={54-strokeWidth} refY={54/2} orient="auto" markerUnits="strokeWidth">
                            <g>
                                <g>
                                    <path
                                        style={{fill:markerFill}}
                                        d="m 27,53 0,0 C 12.641,53 1,41.359 1,27 l 0,0 C 1,12.641 12.641,1 27,1 l 0,0 c 14.359,0 26,11.641 26,26 l 0,0 C 53,41.359 41.359,53 27,53 Z"
                                    />
                                    <path
                                        style={{fill:markerFill}}
                                        d="M 27,54 C 12.112,54 0,41.888 0,27 0,12.112 12.112,0 27,0 41.888,0 54,12.112 54,27 54,41.888 41.888,54 27,54 Z M 27,2 C 13.215,2 2,13.215 2,27 2,40.785 13.215,52 27,52 40.785,52 52,40.785 52,27 52,13.215 40.785,2 27,2 Z"
                                    />
                                </g>
                                <path style={{fill:markerInsideFill}}
                                      d="m 22.294,40 c -0.256,0 -0.512,-0.098 -0.707,-0.293 -0.391,-0.391 -0.391,-1.023 0,-1.414 L 32.88,27 21.587,15.707 c -0.391,-0.391 -0.391,-1.023 0,-1.414 0.391,-0.391 1.023,-0.391 1.414,0 l 11.498,11.498 c 0.667,0.667 0.667,1.751 0,2.418 L 23.001,39.707 C 22.806,39.902 22.55,40 22.294,40 Z"
                                />
                            </g>
                        </marker>;

module.exports = {
    "arrow": getArrow,
    "circle-arrow": getCircleArrow,
}
