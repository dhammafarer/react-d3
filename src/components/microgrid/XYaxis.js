import React from 'react'
import PropTypes from 'prop-types'
import Axis from './Axis.js';

function XYAxis (props) {
  const xSettings = {
    transform: `translate(0, ${props.height})`,
    axis: 'axisBottom',
    scale: props.x
  };

  const ySettings = {
    transform: `translate(0, 0)`,
    axis: 'axisLeft',
    scale: props.y
  };

  return (
    <g className="xy-axis">
      <Axis {...props} {...xSettings} />
      <Axis {...props} {...ySettings} />
    </g>
  )
}


export default XYAxis
