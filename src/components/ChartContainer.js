import React from 'react';
import ReactDOM from 'react-dom';
import LineChart from './LineChart.js';
import { debounce } from 'lodash';
import * as d3 from 'd3';

const data = [
  {date: 1, count: 3},
  {date: 2, count: 11},
  {date: 3, count: 18},
  {date: 4, count: 2}
]
class ChartContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      size: {w: 0, h: 100},
      data: data
    }
    this.fitToParentSize = this.fitToParentSize.bind(this)
  }

  fitToParentSize () {
    const w = this.chart.offsetWidth;
    const h = this.chart.offsetHeight;
    const currentSize = this.state.size;
    if (w !== currentSize.w || h !== currentSize.h) {
      this.setState({size: {w, h}});
      console.log('new size');
    }
  }
  componentDidMount () {
    window.addEventListener('resize', this.fitToParentSize);
    this.fitToParentSize();
  }

  componentWillReceiveProps () {
    this.fitToParentSize();
  }

  componentWillUnMount () {
    window.removeEventListener('resize', this.fitToParentSize);
  }

  render () {
    const margin = {top: 5, right: 50, bottom: 20, left: 50};
    let w = this.state.size.w - (margin.left + margin.right);
    let h = this.state.size.h - (margin.top + margin.bottom);

    const x = d3.scaleLinear()
      .domain([0, 24])
      .range([0, w]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.state.data, d => d.count) + 2])
      .range([h, 0]);

    let transform = `translate(${margin.left} ${margin.top})`;

    return (
      <div id="chart-container" ref={(chart) => this.chart = chart} style={{border: '1px solid grey'}}>
        <svg width={this.state.size.w} height={this.state.size.h} style={{border: '1px solid red'}}>
          <g transform={transform}>
            <LineChart data={data} x={x} y={y}/>
          </g>
        </svg>
      </div>
    );
  }
}

export default ChartContainer;
