import React from 'react';
import PropTypes from 'prop-types';
import Axis from './Axis.js';
import * as d3 from 'd3';

XYAxis.propTypes = {
  height: PropTypes.number.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired
};

function XYAxis (props) {
  const xSettings = {
    transform: `translate(0, ${props.height})`,
    axis: 'axisBottom',
    scale: props.x,
    ticks: null,
    values: d3.range([0, 24]),
    format: d => d3.timeFormat('%H:%M')(d)
  };

  const ySettings = {
    transform: `translate(0, 0)`,
    axis: 'axisLeft',
    scale: props.y,
    ticks: null,
    format: null
  };

  return (
    <g className="xy-axis">
      <Axis {...props} {...xSettings} />
      <Axis {...props} {...ySettings} />
    </g>
  )
}


export default XYAxis;
