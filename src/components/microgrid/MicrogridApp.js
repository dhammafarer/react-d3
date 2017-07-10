import React from 'react';
import { getSolarIrradiance } from '../../api/solar.js';
import MicrogridChart from './MicrogridChart.js';

const margin = {top: 30, bottom: 30, left: 30, right: 30};
const size = {
  width: 600 - margin.left - margin.right,
  height: 400 - margin.top - margin.bottom
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
