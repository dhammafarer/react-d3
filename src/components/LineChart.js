import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class LineChart extends React.Component {

  render () {
    const {x, y, data} = this.props;
    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.count))
      .curve(d3.curveMonotoneX);

    return (
      <path fill="none" strokeLinecap="round" stroke="salmon" strokeWidth="8" d={line(data)}/>
    )
  }
}

LineChart.propTypes = {
  chartId: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}

LineChart.defaultProps = {
  chartId: 'line-chart',
  data: []
}


export default LineChart;
