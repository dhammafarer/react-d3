import React from 'react';
import { getSolarIrradiance } from '../../api/solar.js';
import MicrogridChart from './MicrogridChart.js';
import { TimelineMax } from 'gsap';

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
      timeline: new TimelineMax({onUpdate: this.updateSlider.bind(this)}),
      playback: 'pause',
      progress: 0
    }
    this.handleRangeChange = this.handleRangeChange.bind(this)
  }

  handleRangeChange (e) {
    this.state.timeline.pause();
    this.setState({progress: e.target.value});
    this.state.timeline.progress(e.target.value / 100);
  }

  updateSlider () {
    this.setState({progress: this.state.timeline.progress() * 100});
  }

  componentDidMount () {
    getSolarIrradiance('2010-06-01')
      .then(csv => this.setState({data: csv}));
  }

  render () {
    let tl = this.state.timeline;
    return (
      <div id="microgrid-app">
        <div>
          <button onClick={() => tl.play()}>Play</button>
          <button onClick={() => tl.pause()}>Pause</button>
          <button onClick={() => tl.restart()}>Restart</button>
          <input type="range" value={this.state.progress} onChange={this.handleRangeChange}/>
        </div>
        <MicrogridChart {...this.state} {...size} margin={margin}/>
      </div>
    )
  }
}

export default MicrogridApp ;
