import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3';
import { TimelineMax } from 'gsap';

const styles = {
  fill: 'none',
  stroke: 'steelblue',
  strokeWidth: '4px',
  strokeLinecap: 'round'
};

class LineChart extends React.Component {
  componentDidMount () {
    this.tl = new TimelineMax();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.data != this.props.data) {
      let pathLength = this.path.getTotalLength();
      this.tl
        .set(this.path, {'stroke-dasharray': pathLength + " " + pathLength, 'stroke-dashoffset': pathLength})
        .to(this.path, 4, {'stroke-dashoffset': 0, ease: 'Power0.easeNone'});
    }

    if (this.props.playback == false) this.tl.pause();
    if (this.props.playback == true) this.tl.resume();

    //    d3.select(this.path)
    //      .attr('stroke-dasharray', pathLength + " " + pathLength)
    //      .attr('stroke-dashoffset', pathLength)
    //      .transition()
    //      .duration(4000)
    //      .ease(d3.easeLinear)
    //      .attr('stroke-dashoffset', 0);
  }

  render () {
    const line = d3.line()
      .x(d => this.props.x(d.date))
      .y(d => this.props.y(d.value))
      .curve(d3.curveMonotoneX);

    return (
      <path ref={path => this.path = path} {...styles} d={line(this.props.data)}/>
    )
  }
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired
};

export default LineChart
