import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import LineChart from './LineChart.js';
import XYaxis from './XYaxis.js';
import ChartAnimationOverlay from './ChartAnimationOverlay.js';

const svgSize = props => {
  return {
    width: props.width + props.margin.left + props.margin.right,
    height: props.height + props.margin.top + props.margin.bottom
  };
};

const transform = props => `translate(${props.margin.left}, ${props.margin.bottom})`;

const x = props => { return d3.scaleTime()
  .domain(d3.extent(props.data, d => d.date))
  .range([0, props.width]);
};

const y = props => { return d3.scaleLinear()
  //.domain([0, d3.max(props.data, d => d.value) + 100])
  .domain([0, 1500])
  .range([props.height, 0]);
};

MicrogridChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  timeline: PropTypes.object.isRequired
};


function MicrogridChart (props) {
  const scales = {x: x(props), y: y(props)};

  return (
    <div className="card">
      <svg {...svgSize(props)}>
        <g transform={transform(props)}>
          <LineChart timeline={props.timeline} data={props.data} {...scales}/>
          <ChartAnimationOverlay timeline={props.timeline} height={props.height} width={props.width}/>
          <XYaxis width={props.width} height={props.height} {...scales}/>
        </g>
      </svg>
    </div>
  );
}


export default MicrogridChart;
