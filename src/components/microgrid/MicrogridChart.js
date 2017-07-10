import React from 'react'
import PropTypes from 'prop-types'

MicrogridChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

function MicrogridChart (props) {
  let svgSize = {
    width: props.width + props.margin.left + props.margin.right,
    height: props.height + props.margin.top + props.margin.bottom
  };

  let transform = `translate(${props.margin.top}, ${props.margin.bottom})`;

  return (
    <svg {...svgSize}>
      <g transform={transform}>
        <circle cx="10" cy="10" r="2"/>
      </g>
    </svg>
  )
}


export default MicrogridChart
