import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3';

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

  const x = props => {
    d3.scaleTime()
      .domain(d3.extent(props.data, d => d.date))
      .range([0, props.width])
  };

  return (
    <svg {...svgSize}>
      <g transform={transform}>
      </g>
    </svg>
  )
}


export default MicrogridChart
