import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3';

LineChart.propTypes = {
  data: PropTypes.array.isRequired
}

const styles = {
  fill: 'none',
  stroke: 'steelblue',
  strokeWidth: '3px',
  strokeLinecap: 'round'
};

function LineChart (props) {
  const line = d3.line()
    .x(d => props.x(d.date))
    .y(d => props.y(d.value))
    .curve(d3.curveMonotoneX);

  return (
    <path {...styles} d={line(props.data)}/>
  )
}


export default LineChart
