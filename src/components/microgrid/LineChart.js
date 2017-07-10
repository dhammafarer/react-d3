import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3';

const styles = {
  fill: 'none',
  stroke: 'steelblue',
  strokeWidth: '3px',
  strokeLinecap: 'round'
};

class LineChart extends React.Component {
  render () {
    const line = d3.line()
      .x(d => this.props.x(d.date))
      .y(d => this.props.y(d.value))
      .curve(d3.curveMonotoneX);

    return (
      <path {...styles} d={line(this.props.data)}/>
    )
  }
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired
};

export default LineChart
