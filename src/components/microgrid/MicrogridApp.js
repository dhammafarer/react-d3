import React from 'react';
import { getSolarIrradiance } from '../../api/solar.js';
import MicrogridChart from './MicrogridChart.js';

const margin = {top: 30, bottom: 30, left: 60, right: 30};
const size = {
  width: 600 - margin.left - margin.right,
  height: 400 - margin.top - margin.bottom
};

class MicrogridApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      playback: false
    }
  }

  componentDidMount () {
    getSolarIrradiance('2010-06-01')
      .then(csv => this.setState({data: csv}));
  }

  render () {
    return (
      <div id="microgrid-app">
        <div>
          <button onClick={() => this.setState({playback: !this.state.playback})}>Playback</button>
        </div>
        <MicrogridChart {...this.state} {...size} margin={margin}/>
      </div>
    )
  }
}

export default MicrogridApp ;
