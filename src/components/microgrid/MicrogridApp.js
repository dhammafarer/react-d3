import React from 'react';
import { getSolarIrradiance } from '../../api/solar.js';
import * as d3 from 'd3';
import MicrogridChart from './MicrogridChart.js';

const margin = {top: 30, bottom: 30, left: 30, right: 30};
const size = {
  width: 400 - margin.left - margin.right,
  height: 300 - margin.top - margin.bottom
};

class MicrogridApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    getSolarIrradiance('2010-06-01')
      .then(console.log)
      .then(csv => this.setState({data: csv}));
  }

  render () {
    return (
      <div id="microgrid-app">
        <MicrogridChart {...this.state} {...size} margin={margin}/>
      </div>
    )
  }
}

export default MicrogridApp ;
